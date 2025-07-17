import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    // Test database connection
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'API and database working',
      timestamp: new Date().toISOString(),
      connected: !error,
    })
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Backend error',
      error: 'Database connection failed',
    }, { status: 500 })
  }
}