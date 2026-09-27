import { z } from "@hono/zod-openapi"
import { createSchemaFactory } from "drizzle-orm/zod"
import { project } from "../../db/schemas"
import { projectImageSelectSchema } from "./images/images.validation"
import { tagSelectSchema } from "./tags/tags.validation"

const { createSelectSchema, createInsertSchema, createUpdateSchema } =
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

export const projectGetOneSchema = projectSelectSchema.extend({
  projectImages: z.array(projectImageSelectSchema),
  tags: z.array(tagSelectSchema),
})

export const projectUpdateSchema = createUpdateSchema(project, {
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
