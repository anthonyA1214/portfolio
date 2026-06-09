import { OpenAPIHono } from "@hono/zod-openapi"
import { secureHeaders } from "hono/secure-headers"
import { corsMiddleware } from "../middlewares/cors"
import { auth } from "./better-auth"
import type { AppEnv } from "./types"

export function createRouter() {
  return new OpenAPIHono<AppEnv>({
    strict: false,
  })
}

export function createApp() {
  const app = createRouter()

  app.use(secureHeaders())
  app.use("/api/*", corsMiddleware)
  app.on(["GET", "POST"], "/api/auth/*", (c) => {
    return auth(c.env).handler(c.req.raw)
  })

  return app
}
