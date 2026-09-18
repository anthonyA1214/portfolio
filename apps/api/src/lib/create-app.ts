import { OpenAPIHono } from "@hono/zod-openapi"
import type { Schema } from "hono"
import { requestId } from "hono/request-id"
import { secureHeaders } from "hono/secure-headers"
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"
import { corsMiddleware } from "../middlewares/cors"
import { auth } from "./better-auth"
import type { AppEnv, AppOpenAPI } from "./types"

export function createRouter() {
  return new OpenAPIHono<AppEnv>({
    strict: false,
    defaultHook,
  })
}

export function createApp() {
  const app = createRouter()
  app.use(requestId()).use(serveEmojiFavicon("🔥"))

  app.use(secureHeaders())
  app.use("/api/*", corsMiddleware)
  app.on(["GET", "POST"], "/api/auth/*", (c) => {
    return auth(c.env).handler(c.req.raw)
  })

  app.notFound(notFound)
  app.onError(onError)

  return app
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route("/api/v1", router)
}
