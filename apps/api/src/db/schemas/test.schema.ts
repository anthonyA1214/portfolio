import { z } from '@hono/zod-openapi'
import { createSchemaFactory } from 'drizzle-orm/zod'
import { pgTable, text, integer } from 'drizzle-orm/pg-core'

const users = pgTable('users', {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  age: integer().notNull()
});

const { createInsertSchema } = createSchemaFactory({ zodInstance: z })


