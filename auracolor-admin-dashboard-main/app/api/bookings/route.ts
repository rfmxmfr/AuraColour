import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!data.service || !data.name || !data.email) {
      return NextResponse.json(
        { error: 'Service, name, and email are required' },
        { status: 400 }
      )
    }

    const bookingNumber = `BK-${ Date.now() }`
    
    return NextResponse.json({
      success: true,
      booking_number: bookingNumber,
      message: 'Booking received successfully',
    })
    
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}