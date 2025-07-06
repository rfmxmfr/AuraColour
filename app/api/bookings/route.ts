import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendClientConfirmation, sendAdminAlert } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = await createClient()
    
    const bookingNumber = `BK-${Date.now()}`
    
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        booking_number: bookingNumber,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        service_type: data.service_type,
        preferred_date: data.preferred_date,
        preferred_time: data.preferred_time,
        status: 'pending',
        notes: data.notes
      })
      .select()
      .single()

    if (error) throw error

    await Promise.all([
      sendClientConfirmation(data.email, data.name),
      sendAdminAlert('New Booking', {
        email: data.email,
        name: data.name,
        service: data.service_type,
        booking: bookingNumber
      })
    ])

    return NextResponse.json({
      success: true,
      booking_number: bookingNumber,
      booking_id: booking.id
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    
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