import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendAdminAlert } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = await createClient()
    
    const ticketNumber = `AC-${Date.now()}`
    
    const { data: ticket, error } = await supabase
      .from('tickets')
      .insert({
        ticket_number: ticketNumber,
        customer_email: data.email,
        customer_name: data.name,
        service_type: data.service_type || 'color_analysis',
        status: 'pending',
        priority: data.priority || 'normal',
        image_url: data.image_url,
        questionnaire_data: data.questionnaire_data
      })
      .select()
      .single()

    if (error) throw error

    await sendAdminAlert('New Ticket', {
      email: data.email,
      name: data.name,
      ticket: ticketNumber
    })

    return NextResponse.json({
      success: true,
      ticket_number: ticketNumber,
      ticket_id: ticket.id
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(tickets)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 })
  }
}