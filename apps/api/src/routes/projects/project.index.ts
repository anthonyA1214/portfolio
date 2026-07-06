import { createRouter } from "../../lib/create-app";

import * as handlers from "./project.handlers";
import * as routes from "./project.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)

export default router;
