import slugify from "slugify"
import * as HttpStatusCodes from "stoker/http-status-codes"
import * as HttpStatusPhrases from "stoker/http-status-phrases"
import { createDb } from "../../db"
import { project as projects } from "../../db/schemas"
import type { AppRouteHandler } from "../../lib/types"
import type { CreateRoute, ListRoute, GetOneRoute } from "./projects.routes"

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

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const db = createDb(c.env.portfolio_db)
  const { slug } = c.req.valid("param")
  const project = await db.query.project.findFirst({
    where: { slug },
    with: {
      projectImages: true,
      tags: true,
    },
  })
  if (!project) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    )
  }
  return c.json(project, HttpStatusCodes.OK)
}
