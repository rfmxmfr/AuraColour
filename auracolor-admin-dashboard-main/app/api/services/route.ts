import { SERVICES } from '@/lib/services/service-config'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    services: SERVICES,
    total_services: SERVICES.length,
  })
}