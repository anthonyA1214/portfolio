import { OpenAPIHono } from "@hono/zod-openapi"
import { secureHeaders } from "hono/secure-headers"
import { corsMiddleware } from "../middlewares/cors"
import { auth } from "./better-auth"
import type { AppEnv } from "./types"
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares"
import { requestId } from "hono/request-id"

export function createRouter() {
  return new OpenAPIHono<AppEnv>({
    strict: false,
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
