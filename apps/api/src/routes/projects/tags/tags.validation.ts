import { z } from "@hono/zod-openapi"
import { createSchemaFactory } from "drizzle-orm/zod"
import { tag } from "../../../db/schemas/projects.schema"

const { createSelectSchema } = createSchemaFactory<undefined>({
  zodInstance: z,
})

export const tagSelectSchema = createSelectSchema(tag)
