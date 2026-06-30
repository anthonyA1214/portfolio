import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers";
import { ProjectSelectSchema } from "../../db/schemas";

const tags = ["Projects"]

export const list = createRoute({
  path: "/projects",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(ProjectSelectSchema),
      "The list of projects"
    )
  }
})

export type ListRoute = typeof list
