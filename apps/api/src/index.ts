import { showRoutes } from "hono/dev"
import configureOpenAPI from "./lib/configure-open-api"
import { createApp } from "./lib/create-app"

const app = createApp()

configureOpenAPI(app)
showRoutes(app)

export default app
