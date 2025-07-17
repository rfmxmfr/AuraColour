import { NextRequest, NextResponse } from 'next/server'
import sanitizeHtml from 'sanitize-html'
import { z } from 'zod'

import { sendClientConfirmation, sendAdminAlert } from '@/lib/email-notifications'
import { handleFormData } from '@/lib/file-upload'
import { createClient } from '@/lib/supabase/server'


// Define validation schema for booking data
const bookingSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(5).max(20).optional(),
  service_type: z.string().min(1).max(100),
  preferred_date: z.string().regex(/^\d{ 4 }-\d{ 2 }-\d{ 2 }$/),
  preferred_time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  notes: z.string().max(1000).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    let rawData: any
    
    if (contentType?.includes('multipart/form-data')) {
      rawData = await handleFormData(request)
    } else {
      rawData = await request.json()
    }
    
    // Validate input data
    const validationResult = bookingSchema.safeParse(rawData)
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid booking data', details: validationResult.error.format() }, { status: 400 })
    }
    
    const data = validationResult.data
    
    // Sanitize text inputs
    const sanitizedData = {
      ...data,
      name: sanitizeHtml(data.name),
      service_type: sanitizeHtml(data.service_type),
      notes: data.notes ? sanitizeHtml(data.notes) : undefined,
    }
    
    const supabase = await createClient()
    
    const bookingNumber = `BK-${ Date.now() }`
    
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        booking_number: bookingNumber,
        customer_name: sanitizedData.name,
        customer_email: sanitizedData.email,
        customer_phone: sanitizedData.phone,
        service_type: sanitizedData.service_type,
        preferred_date: sanitizedData.preferred_date,
        preferred_time: sanitizedData.preferred_time,
        status: 'pending',
        notes: sanitizedData.notes,
      })
      .select()
      .single()

    if (error) throw error

    await Promise.all([
      sendClientConfirmation(sanitizedData.email, sanitizedData.name),
      sendAdminAlert('New Booking', {
        email: sanitizedData.email,
        name: sanitizedData.name,
        service: sanitizedData.service_type,
        booking: bookingNumber,
      }),
    ])

    return NextResponse.json({
      success: true,
      booking_number: bookingNumber,
      booking_id: booking.id,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    
    // Build query with pagination
    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    // Apply pagination if valid parameters are provided
    if (limit && /^\d+$/.test(limit)) {
      query = query.limit(parseInt(limit, 10))
    } else {
      query = query.limit(50) // Default limit
    }
    
    if (offset && /^\d+$/.test(offset)) {
      query = query.range(parseInt(offset, 10), parseInt(offset, 10) + (parseInt(limit, 10) || 50) - 1)
    }
    
    const { data: bookings, error } = await query

    if (error) throw error

    // Sanitize any user-generated content in the bookings
    const sanitizedBookings = bookings.map(booking => ({
      ...booking,
      customer_name: sanitizeHtml(booking.customer_name || ''),
      notes: booking.notes ? sanitizeHtml(booking.notes) : null,
    }))

    return NextResponse.json(sanitizedBookings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}