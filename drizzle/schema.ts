import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  index,
  primaryKey,
  unique,
  int,
  varchar,
  timestamp,
} from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const user = mysqlTable(
  'user',
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().onUpdateNow(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  },
  (table) => {
    return {
      idxUserEmail: index('idx_user_email').on(table.email),
      userId: primaryKey({ columns: [table.id], name: 'user_id' }),
      ukUserEmail: unique('uk_user_email').on(table.email),
    }
  }
)
