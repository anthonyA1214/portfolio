import { showRoutes } from "hono/dev"
import configureOpenAPI from "./lib/configure-open-api"
import { createApp } from "./lib/create-app"
import index from "./routes/index.route"
import projects from "./routes/projects/project.index"

const app = createApp()

configureOpenAPI(app)

const routes = [index, projects];
routes.forEach((route) => {
  app.route("/api/v1/", route)
})

showRoutes(app)

export default app
