import db from '@/app/lib/mysql_connection'
import { customer, film, staff } from '@/db/schema'

export async function countStaff(): Promise<number> {
  return db.$count(staff)
}

export async function countFilm(): Promise<number> {
  return db.$count(film)
}

export async function countCustomer(): Promise<number> {
  return db.$count(customer)
}
