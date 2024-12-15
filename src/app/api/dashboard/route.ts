import { NextResponse } from 'next/server'
import { countCustomer, countFilm, countStaff } from '@/app/services/dashboard'

// GET /api/dashboard
export async function GET() {
  const [customerCount, staffCount, filmCount] = await Promise.all([countCustomer(), countStaff(), countFilm()])

  return NextResponse.json({
    data: {
      countCustomer: customerCount,
      countStaff: staffCount,
      countFilm: filmCount,
    },
  })
}
