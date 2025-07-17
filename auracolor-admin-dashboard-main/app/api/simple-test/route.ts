import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'working',
    message: 'API endpoint is functional',
    timestamp: new Date().toISOString(),
  })
}