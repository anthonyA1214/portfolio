import { z } from "@hono/zod-openapi"
import { createSchemaFactory } from "drizzle-orm/zod"
import { project } from "../../db/schemas"

const { createSelectSchema, createInsertSchema } =
  createSchemaFactory<undefined>({ zodInstance: z })
export const projectSelectSchema = createSelectSchema(project)

export const projectInsertSchema = createInsertSchema(project, {
  title: (schema) => schema.min(1).max(200),
  description: (schema) => schema.max(500).optional(),
  liveUrl: () => z.url().optional(),
  repoUrl: () => z.url().optional(),
}).omit({
  id: true,
  slug: true,
  content: true,
  status: true,
  createdAt: true,
  publishedAt: true,
  updatedAt: true,
})
