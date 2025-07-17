import { sendClientConfirmation, sendAdminAlert } from '@/lib/notifications'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = createClient()
    
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      })

    if (error) throw error

    // Send notifications
    await Promise.all([
      sendClientConfirmation(data.email, data.name),
      sendAdminAlert('Contact Message', { email: data.email, name: data.name }),
    ])

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully', 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send message', 
    }, { status: 500 })
  }
}