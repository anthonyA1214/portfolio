import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi"
import { Schema } from "hono"

export interface AppEnv {
  Bindings: CloudflareBindings
}

export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppEnv, S>
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>
