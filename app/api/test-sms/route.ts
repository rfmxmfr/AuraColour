import { NextResponse } from 'next/server'
import { sendSMS } from '@/lib/integrations'

export async function GET() {
  try {
    // Test SMS - replace with your phone number
    const result = await sendSMS('+1234567890', 'Test SMS from AuraColor! 🎨')
    
    return NextResponse.json({
      success: result,
      message: result ? 'SMS sent successfully' : 'SMS failed - check Twilio credentials',
      configured: {
        accountSid: !!process.env.TWILIO_ACCOUNT_SID,
        authToken: !!process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: !!process.env.TWILIO_PHONE_NUMBER
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}