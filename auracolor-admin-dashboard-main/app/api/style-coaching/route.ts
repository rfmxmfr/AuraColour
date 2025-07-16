import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendClientConfirmation, sendAdminAlert } from '@/lib/email-notifications'
import { handleFormData } from '@/lib/file-upload'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    let data: any
    
    if (contentType?.includes('multipart/form-data')) {
      data = await handleFormData(request)
    } else {
      data = await request.json()
    }

    const supabase = createClient()
    const ticketNumber = `SC-${Date.now()}`
    
    const { data: ticket } = await supabase.from('tickets').insert({
      ticket_number: ticketNumber,
      customer_email: data.email,
      customer_name: data.name,
      service_type: 'style_coaching',
      status: 'pending',
      questionnaire_data: {
        current_style_challenges: data.current_style_challenges,
        style_goals: data.style_goals,
        lifestyle: data.lifestyle,
        confidence_level: data.confidence_level,
        transformation_areas: data.transformation_areas,
        commitment_level: data.commitment_level
      }
    }).select().single()

    if (ticket) {
      await supabase.from('coaching_programs').insert({
        ticket_id: ticket.id,
        program_type: 'style_evolution',
        duration_months: 3,
        sessions_included: 6,
        makeover_included: true,
        confidence_coaching: true,
        progress_tracking: {},
        status: 'enrolled'
      })
    }

    await Promise.all([
      sendClientConfirmation(data.email, data.name),
      sendAdminAlert('Style Evolution Coaching', { 
        email: data.email, 
        name: data.name, 
        program: '3-Month Style Evolution' 
      })
    ])

    return NextResponse.json({
      success: true,
      ticket_number: ticketNumber,
      message: 'Style coaching program enrollment successful'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Service booking failed' }, { status: 500 })
  }
}