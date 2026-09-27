import { createRouter } from "../../lib/create-app"

import * as handlers from "./projects.handlers"
import * as routes from "./projects.routes"

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)

export default router
