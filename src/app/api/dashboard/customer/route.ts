import { NextResponse } from 'next/server'
import db from '@/app/lib/mysql_connection'
import { customer } from '@/db/schema'
import { countCustomer, countFilm, countStaff } from '@/app/services/dashboard'
import io from '@/socket/server'
import { formatDateToMySQL } from '@/app/lib/date_util'

export type UpdateDashboardEvent = {
  data: {
    countCustomer: number
    countStaff: number
    countFilm: number
  }
}

// POST /api/dashboard/customer
export async function POST() {
  await db.insert(customer).values({
    storeId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    addressId: 1,
    createDate: formatDateToMySQL(new Date()),
  })

  const [customerCount, staffCount, filmCount] = await Promise.all([countCustomer(), countStaff(), countFilm()])

  io!.emit('update_dashboard', {
    data: {
      countCustomer: customerCount,
      countStaff: staffCount,
      countFilm: filmCount,
    },
  })

  return NextResponse.json({
    message: 'Succeeded to add a new customer',
    data: {
      countCustomer: customerCount,
      countStaff: staffCount,
      countFilm: filmCount,
    },
  })
}
