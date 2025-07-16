import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    // Test booking confirmation email
    const bookingEmail = await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.com>',
      to: ['delivered@resend.dev'],
      subject: 'Test: Booking Started - Complete Payment',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #21808D;">Booking Started! 💳</h2>
          <p>Hi Test User,</p>
          <p>This is a test of the booking confirmation email.</p>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;"><strong>⚠️ Important:</strong> Please complete your payment to confirm your booking.</p>
          </div>
          <p>Best regards,<br>The AuraColor Team</p>
        </div>
      `
    })

    // Test analyst notification
    const analystEmail = await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.com>',
      to: ['auracoloustyle@gmail.com'],
      subject: 'Test: New Booking Notification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #21808D;">New Service Booking 🎨</h2>
          <p>This is a test notification for the analyst.</p>
          <p><strong>Customer:</strong> Test User<br/>
          <strong>Email:</strong> test@example.com<br/>
          <strong>Service:</strong> 12-Season Color Analysis<br/>
          <strong>Amount:</strong> £75.00</p>
        </div>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'Test emails sent successfully',
      results: {
        bookingEmail: bookingEmail.data?.id,
        analystEmail: analystEmail.data?.id
      }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}