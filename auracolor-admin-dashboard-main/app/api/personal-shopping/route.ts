import { sendClientConfirmation, sendAdminAlert } from '@/lib/email-notifications'
import { handleFormData } from '@/lib/file-upload'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

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
    const ticketNumber = `PS-${ Date.now() }`
    
    const { data: ticket } = await supabase.from('tickets').insert({
      ticket_number: ticketNumber,
      customer_email: data.email,
      customer_name: data.name,
      service_type: 'personal_shopping',
      status: 'pending',
      questionnaire_data: {
        budget: data.budget,
        shopping_goals: data.shopping_goals,
        preferred_brands: data.preferred_brands,
        size_info: data.size_info,
        style_preferences: data.style_preferences,
        occasion_needs: data.occasion_needs,
      },
    }).select().single()

    if (ticket) {
      await supabase.from('shopping_sessions').insert({
        ticket_id: ticket.id,
        session_type: 'personal_shopping',
        budget_allocated: data.budget || 150,
        curated_items: [],
        fitting_notes: '',
        purchase_recommendations: [],
        status: 'scheduled',
      })
    }

    await Promise.all([
      sendClientConfirmation(data.email, data.name),
      sendAdminAlert('Personal Shopping Service', { 
        email: data.email, 
        name: data.name, 
        budget: data.budget, 
      }),
    ])

    return NextResponse.json({
      success: true,
      ticket_number: ticketNumber,
      message: 'Personal shopping session booked successfully',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Service booking failed' }, { status: 500 })
  }
}