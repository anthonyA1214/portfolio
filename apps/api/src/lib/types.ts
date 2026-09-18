import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi"
import type { Schema } from "hono"

export interface AppEnv {
  Bindings: Env
}

export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppEnv, S>
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>
