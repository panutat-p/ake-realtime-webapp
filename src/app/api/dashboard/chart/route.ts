import { NextResponse } from 'next/server'
import { getSalesByFilmCategory } from '@/app/services/dashboard'

// GET /api/dashboard/chart
export async function GET() {
  const data = await getSalesByFilmCategory()

  return NextResponse.json({
    data: data,
  })
}
