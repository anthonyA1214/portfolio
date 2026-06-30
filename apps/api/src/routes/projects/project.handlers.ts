import { createDb } from "../../db"
import type { AppRouteHandler } from "../../lib/types"
import { ListRoute } from "./project.routes"

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const db = createDb(c.env.portfolio_db)
  const projects = await db.query.project.findMany();
  return c.json(projects);
}
