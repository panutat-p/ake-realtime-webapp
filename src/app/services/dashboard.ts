import db from '@/app/lib/mysql_connection'
import { customer, film, staff, salesByFilmCategory } from '@/db/schema'
import { SaleChart } from '@/app/api/types/chart'

export async function countStaff(): Promise<number> {
  return db.$count(staff)
}

export async function countFilm(): Promise<number> {
  return db.$count(film)
}

export async function countCustomer(): Promise<number> {
  return db.$count(customer)
}

export async function getSalesByFilmCategory(): Promise<SaleChart[]> {
  return db.select().from(salesByFilmCategory)
}
