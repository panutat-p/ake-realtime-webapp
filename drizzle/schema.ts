import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, timestamp } from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const user = mysqlTable(
  'user',
  {
    id: int({ unsigned: true }).autoincrement().notNull(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().onUpdateNow(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  },
  (table) => {
    return {
      userId: primaryKey({ columns: [table.id], name: 'user_id' }),
    }
  }
)
