import slugify from "slugify"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { createDb } from "../../db"
import { project as projects } from "../../db/schemas"
import type { AppRouteHandler } from "../../lib/types"
import type { CreateRoute, ListRoute } from "./project.routes"

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const db = createDb(c.env.portfolio_db)
  const projects = await db.query.project.findMany()
  return c.json(projects)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const db = createDb(c.env.portfolio_db)
  const project = c.req.valid("json")
  const [inserted] = await db
    .insert(projects)
    .values({
      ...project,
      slug: slugify(project.title, { lower: true, strict: true }),
    })
    .returning()
  return c.json(inserted, HttpStatusCodes.CREATED)
}
