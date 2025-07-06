import { NextResponse } from 'next/server'
import { sendClientConfirmation, sendAdminAlert } from '@/lib/notifications'

export async function GET() {
  try {
    // Test client confirmation email
    const clientResult = await sendClientConfirmation('delivered@resend.dev', 'Test User')
    
    // Test admin alert
    const adminResult = await sendAdminAlert('Test Alert', { 
      email: 'delivered@resend.dev', 
      name: 'Test User' 
    })

    return NextResponse.json({
      success: true,
      clientEmail: clientResult,
      adminAlert: adminResult,
      message: 'Test emails sent successfully'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}