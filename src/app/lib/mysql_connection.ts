import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT!),
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
})

const dbSingleTon = () => {
  console.log('🟡 Creating a new DB connection')
  return drizzle({ client: connection })
}

declare const globalThis: {
  dbGlobal: ReturnType<typeof dbSingleTon>
} & typeof global

const db = globalThis.dbGlobal ?? dbSingleTon()

if (process.env.NODE_ENV !== 'production') {
  globalThis.dbGlobal = db
}

export default db
