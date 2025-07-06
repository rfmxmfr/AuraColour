import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Update booking status to confirmed
      const supabase = await createClient()
      await supabase
        .from('questionnaire_submissions')
        .update({ payment_status: 'confirmed' })
        .eq('stripe_session_id', session.id)
      
      // Payment success email to customer
      await resend.emails.send({
        from: 'AuraColor <noreply@auracolor.com>',
        to: [session.customer_email!],
        subject: 'Payment Successful - Service Confirmed',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #21808D;">Payment Successful! ✅</h2>
            <p>Hi ${session.metadata?.customer_name},</p>
            <p>Your payment has been processed successfully. Your ${session.metadata?.service_type} service is now confirmed.</p>
            <p><strong>Service:</strong> ${session.metadata?.service_type}<br/>
            <strong>Amount Paid:</strong> £${(session.amount_total! / 100).toFixed(2)}</p>
            <p><strong>What's Next:</strong><br/>
            • Our team will begin processing your service<br/>
            • You'll receive your results within 24-48 hours<br/>
            • Check your email for updates</p>
            <p>Best regards,<br>The AuraColor Team</p>
          </div>
        `
      })

      // Notification to analyst
      await resend.emails.send({
        from: 'AuraColor <noreply@auracolor.com>',
        to: ['auracoloustyle@gmail.com'],
        subject: `New Booking: ${session.metadata?.service_type}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #21808D;">New Service Booking 🎨</h2>
            <p><strong>Customer:</strong> ${session.metadata?.customer_name}<br/>
            <strong>Email:</strong> ${session.customer_email}<br/>
            <strong>Service:</strong> ${session.metadata?.service_type}<br/>
            <strong>Amount:</strong> £${(session.amount_total! / 100).toFixed(2)}<br/>
            <strong>Booking ID:</strong> ${session.metadata?.booking_id}</p>
            <p>Please process this booking in the admin dashboard.</p>
          </div>
        `
      })
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Payment failed email
      await resend.emails.send({
        from: 'AuraColor <noreply@auracolor.com>',
        to: [session.customer_email!],
        subject: 'Payment Session Expired',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #dc2626;">Payment Session Expired ⏰</h2>
            <p>Hi ${session.metadata?.customer_name},</p>
            <p>Your payment session for ${session.metadata?.service_type} has expired.</p>
            <p>Don't worry! You can easily book again:</p>
            <a href="https://auracolor.com/services" style="background: #21808D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Book Again</a>
            <p>Need help? Reply to this email or contact our support team.</p>
            <p>Best regards,<br>The AuraColor Team</p>
          </div>
        `
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 })
  }
}