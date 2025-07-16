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

    const supabase = await createClient()
    const ticketNumber = `VW-${Date.now()}`
    
    const { data: ticket } = await supabase.from('tickets').insert({
      ticket_number: ticketNumber,
      customer_email: data.email,
      customer_name: data.name,
      service_type: 'virtual_wardrobe',
      status: 'pending',
      questionnaire_data: {
        wardrobe_size: data.wardrobe_size,
        style_goals: data.style_goals,
        budget: data.budget,
        current_challenges: data.current_challenges,
        wardrobe_photos: data.imageUrl ? [data.imageUrl] : []
      }
    }).select().single()

    if (ticket) {
      await supabase.from('wardrobe_audits').insert({
        ticket_id: ticket.id,
        audit_type: 'virtual_curation',
        wardrobe_items: [],
        outfit_combinations: [],
        gap_analysis: {},
        shopping_recommendations: [],
        status: 'pending'
      })
    }

    await Promise.all([
      sendClientConfirmation(data.email, data.name),
      sendAdminAlert('Virtual Wardrobe Service', { 
        email: data.email, 
        name: data.name, 
        service: 'Virtual Wardrobe Curation' 
      })
    ])

    return NextResponse.json({
      success: true,
      ticket_number: ticketNumber,
      message: 'Virtual wardrobe service booked successfully'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Service booking failed' }, { status: 500 })
  }
}