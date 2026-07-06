import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { projectInsertSchema, projectSelectSchema } from "../../db/schemas";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Projects"]

export const list = createRoute({
  path: "/projects",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(projectSelectSchema),
      "The list of projects"
    )
  }
})

export const create = createRoute({
  path: "/projects",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      projectInsertSchema,
      "The project to create"
    )
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      projectSelectSchema,
      "The created project"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(projectInsertSchema),
      "The validation error(s)"
    )
  }
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
