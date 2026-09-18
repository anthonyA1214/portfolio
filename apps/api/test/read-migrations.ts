import fs from "node:fs"
import path from "node:path"

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type D1Migration = {
  name: string
  queries: string[]
}

/**
 * Drop-in replacement for @cloudflare/vitest-plugin's readD1Migrations.
 *
 * Why this exists: the built-in readD1Migrations only scans for flat
 * `.sql` files directly inside the migrations folder (its own source
 * does `fs.readdirSync(migrationsPath).filter(name => name.endsWith(".sql"))`
 * with no recursion). drizzle-kit@1.0.0-rc.4 no longer generates that
 * layout — it now writes each migration as its own timestamped folder
 * (`migrations/<timestamp>_<name>/migration.sql` + `snapshot.json`),
 * so the built-in reader silently finds zero migrations and the test
 * D1 database never gets its schema applied.
 *
 * This reads that per-folder layout instead, splitting each
 * migration.sql into individual queries with the same
 * `unstable_splitSqlQuery` helper wrangler itself uses, and returns
 * the same { name, queries }[] shape so it's a drop-in swap wherever
 * readD1Migrations was called — no changes needed to
 * test/apply-migrations.ts or test/env.d.ts.
 *
 * Remove this once @cloudflare/vitest-plugin supports drizzle-kit's
 * nested migration folders natively.
 */
export async function readD1Migrations(
  migrationsPath: string
): Promise<D1Migration[]> {
  // noinspection SuspiciousTypeOfGuard
  if (typeof migrationsPath !== "string") {
    throw new TypeError(
      "Failed to execute 'readD1Migrations': parameter 1 is not of type 'string'."
    )
  }

  const { unstable_splitSqlQuery } = await import("wrangler") // (lazy)

  return fs
    .readdirSync(migrationsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name)) // timestamp prefix sorts chronologically
    .map((entry) => {
      const sql = fs.readFileSync(
        path.join(migrationsPath, entry.name, "migration.sql"),
        "utf8"
      )
      return { name: entry.name, queries: unstable_splitSqlQuery(sql) }
    })
}
