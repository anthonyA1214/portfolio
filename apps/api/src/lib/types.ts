import type { OpenAPIHono } from "@hono/zod-openapi"

export interface AppEnv {
  Bindings: CloudflareBindings
}

export type AppOpenAPI = OpenAPIHono<AppEnv>
