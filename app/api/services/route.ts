import { NextResponse } from 'next/server'
import { SERVICES } from '@/lib/services/service-config'

export async function GET() {
  return NextResponse.json({
    services: SERVICES,
    total_services: SERVICES.length
  })
}