import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"
import { createErrorSchema, SlugParamsSchema } from "stoker/openapi/schemas"
import { notFoundSchema } from "../../lib/constants"
import {
  projectGetOneSchema,
  projectInsertSchema,
  projectSelectSchema,
} from "./projects.validation"

const tags = ["Projects"]

export const list = createRoute({
  path: "/projects",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(projectSelectSchema),
      "The list of projects"
    ),
  },
})

export const create = createRoute({
  path: "/projects",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(projectInsertSchema, "The project to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      projectSelectSchema,
      "The created project"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(projectInsertSchema),
      "The validation error(s)"
    ),
  },
})

export const getOne = createRoute({
  path: "/projects/{slug}",
  method: "get",
  request: {
    params: SlugParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      projectGetOneSchema,
      "The requested project"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Project not found"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(SlugParamsSchema),
      "Invalid slug error"
    ),
  },
})

export const patch = createRoute({
  path: "/projects/{slug}",
  method: "patch",
  request: {
    params: SlugParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      projectSelectSchema,
      "The updated project"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Project not found"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(SlugParamsSchema),
      "Invalid slug error"
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
