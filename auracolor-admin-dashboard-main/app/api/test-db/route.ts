import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('bookings')
      .select('count')
      .limit(1)
    
    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: error.message,
        code: error.code
      })
    }
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connected'
    })
    
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Server error',
      error: error.message
    })
  }
}