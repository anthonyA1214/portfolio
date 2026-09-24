import { z } from "@hono/zod-openapi"
import { sql } from "drizzle-orm"
import {
  sqliteTable,
  text,
  integer,
  index,
  primaryKey,
} from "drizzle-orm/sqlite-core"
import { createSchemaFactory } from "drizzle-orm/zod"

export const project = sqliteTable("project", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  status: text("status", { enum: ["draft", "published"] })
    .default("draft")
    .notNull(),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const tag = sqliteTable("tag", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
})

export const projectTag = sqliteTable(
  "project_tag",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.tagId] }),
    index("project_tag_projectId_idx").on(table.projectId),
    index("project_tag_tagId_idx").on(table.tagId),
  ]
)

export const projectImage = sqliteTable(
  "project_image",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    projectId: integer("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    usage: text("usage", { enum: ["cover", "inline", "gallery"] })
      .notNull()
      .default("gallery"),
    caption: text("caption"),
    displayOrder: integer("display_order").notNull().default(0),
  },
  (table) => [index("project_image_projectId_idx").on(table.projectId)]
)

// zod schemas

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
