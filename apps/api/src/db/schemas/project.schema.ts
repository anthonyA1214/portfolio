import { sql } from "drizzle-orm"
import { sqliteTable, text, integer, index, primaryKey } from "drizzle-orm/sqlite-core"
import { createSchemaFactory } from 'drizzle-orm/zod';
import { z } from '@hono/zod-openapi';

export const project = sqliteTable("project", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  status: text("status", { enum: ["draft", "published"] })
    .default("draft")
    .notNull(),
  coverImage: text("cover_image"),
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
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
})

export const projectTag = sqliteTable("project_tag", {
  projectId: text("project_id").notNull().references(() => project.id),
  tagId: text("tag_id").notNull().references(() => tag.id)
}, (table) => [
  primaryKey({ columns: [table.projectId, table.tagId] }),
  index("project_tag_projectId_idx").on(table.projectId),
  index("project_tag_tagId_idx").on(table.tagId),
])

export const projectImage = sqliteTable("project_image", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => project.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  caption: text("caption"),
  displayOrder: integer("display_order").notNull().default(0),
}, (table) => [index("project_image_projectId_idx").on(table.projectId)])

// zod schemas

const { createSelectSchema } = createSchemaFactory({ zodInstance: z });
export const ProjectSelectSchema = createSelectSchema(project)
