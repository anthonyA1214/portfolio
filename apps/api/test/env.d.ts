declare namespace Cloudflare {
  interface Env {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    TEST_MIGRATIONS: import("cloudflare:test").D1Migration[] // Defined in `vitest.config.ts`
  }
}
