import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

import { getAvailableSlots, generateMeetingUrl, STYLIST_SERVICES } from '@/lib/calendar-integration'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    const slots = getAvailableSlots(date || undefined)
    
    return NextResponse.json({
      slots,
      services: STYLIST_SERVICES,
    })
  } catch (error) {
    logger.error('Get appointments error:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { date, time, service_type, notes } = await request.json()
    
    const service = STYLIST_SERVICES[service_type as keyof typeof STYLIST_SERVICES]
    if (!service) {
      return NextResponse.json({ error: 'Invalid service type' }, { status: 400 })
    }

    const meetingUrl = generateMeetingUrl()
    
    const { data: appointment, error } = await supabase
      .from('stylist_appointments')
      .insert({
        user_id: user.id,
        stylist_id: '00000000-0000-0000-0000-000000000000', // Default stylist
        appointment_date: `${ date }T${ time }:00`,
        duration_minutes: service.duration,
        service_type,
        status: 'scheduled',
        notes,
        meeting_url: meetingUrl,
        price: service.price,
      })
      .select()
      .single()

    if (error) {
      logger.error('Appointment creation error:', error)
      return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 })
    }

    return NextResponse.json({
      appointment,
      service,
      meeting_url: meetingUrl,
      message: 'Appointment booked successfully',
    })
  } catch (error) {
    logger.error('Book appointment error:', error)
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 })
  }
}