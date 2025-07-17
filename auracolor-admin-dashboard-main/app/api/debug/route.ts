import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      status: 'working',
      env: {
        supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'missing',
        supabase_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'missing',
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    }, { status: 500 })
  }
}