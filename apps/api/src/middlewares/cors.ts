import { cors } from "hono/cors"
import { createMiddleware } from "hono/factory"

export const corsMiddleware = createMiddleware<{
  Bindings: CloudflareBindings
}>((c, next) => {
  return cors({
    origin: c.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()),
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })(c, next)
})
