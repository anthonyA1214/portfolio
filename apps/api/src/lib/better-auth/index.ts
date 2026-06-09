import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { drizzle } from "drizzle-orm/d1"
import type { AppEnv } from "../types"
import { betterAuthOptions } from "./options"

export const auth = (env: AppEnv["Bindings"]) => {
  const db = drizzle(env.portfolio_db)

  return betterAuth({
    ...betterAuthOptions,
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
  })
}
