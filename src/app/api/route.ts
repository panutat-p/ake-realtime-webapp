import { NextResponse } from 'next/server'

// GET /api/
export function GET() {
  return NextResponse.json({
    message: 'Next.js is running',
    version: '1.0.0',
  })
}
