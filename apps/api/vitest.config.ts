import { cloudflareTest } from "@cloudflare/vitest-plugin"
import { defineConfig } from "vitest/config"
import path from "node:path"
import { readD1Migrations } from "./test/read-migrations"

export default defineConfig(async () => {
  // Read all migrations in the `migrations` directory
  const migrationsPath = path.join(import.meta.dirname, "./src/db/migrations")
  const migrations = await readD1Migrations(migrationsPath)

  return {
    plugins: [
      cloudflareTest({
        wrangler: { configPath: "./wrangler.jsonc" },
        miniflare: {
          // Add a test-only binding for migrations, so we can apply them in a
          // setup file
          bindings: { TEST_MIGRATIONS: migrations },
        },
      }),
    ],
    test: {
      setupFiles: ["./test/apply-migrations.ts"],
    },
  }
})
