import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

const resend = new Resend(process.env.RESEND_API_KEY)

// This is your Stripe webhook secret for testing your endpoint locally
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const supabase = await createClient()

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Update the booking status
      if (session.metadata?.booking_id) {
        await supabase
          .from('questionnaire_submissions')
          .update({
            payment_status: 'completed',
            payment_amount: session.amount_total,
            payment_date: new Date().toISOString(),
            status: 'paid',
            stripe_payment_id: session.payment_intent as string
          })
          .eq('id', session.metadata.booking_id)
        
        // Send confirmation email
        if (session.customer_details?.email && session.metadata.customer_name) {
          await resend.emails.send({
            from: 'AuraColor <noreply@auracolor.com>',
            to: [session.customer_details.email],
            subject: 'Payment Confirmed - Your Analysis is Starting',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #21808D;">Payment Confirmed! ✅</h2>
                <p>Hi ${session.metadata.customer_name},</p>
                <p>Thank you for your payment of <strong>£${(session.amount_total! / 100).toFixed(2)}</strong> for ${session.metadata.service_type}.</p>
                <p>Your order is now being processed. Our team has been notified and will begin working on your analysis right away.</p>
                <div style="background: #e6f7ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #0066cc;"><strong>What happens next:</strong></p>
                  <ul style="margin-top: 10px; padding-left: 20px;">
                    <li>Our color analysts will review your photos and questionnaire</li>
                    <li>You'll receive your personalized analysis within 24-48 hours</li>
                    <li>You can check your order status anytime in your account dashboard</li>
                  </ul>
                </div>
                <p>If you have any questions, simply reply to this email.</p>
                <p>Best regards,<br>The AuraColor Team</p>
              </div>
            `
          })
        }
      }
      break
    }
    
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      
      // Find the booking by payment intent
      const { data: submissions } = await supabase
        .from('questionnaire_submissions')
        .select('*')
        .eq('stripe_payment_id', paymentIntent.id)
      
      if (submissions && submissions.length > 0) {
        const submission = submissions[0]
        
        // Update the booking status
        await supabase
          .from('questionnaire_submissions')
          .update({
            payment_status: 'failed',
            status: 'payment_pending'
          })
          .eq('id', submission.id)
        
        // Send payment failed email
        if (submission.email && submission.name) {
          await resend.emails.send({
            from: 'AuraColor <noreply@auracolor.com>',
            to: [submission.email],
            subject: 'Payment Failed - Action Required',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #e53e3e;">Payment Failed</h2>
                <p>Hi ${submission.name},</p>
                <p>We were unable to process your payment for ${submission.service_type}.</p>
                <p>This could be due to insufficient funds, expired card, or other issues with your payment method.</p>
                <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #e53e3e;"><strong>Next steps:</strong></p>
                  <p style="margin-top: 10px;">Please <a href="${process.env.NEXT_PUBLIC_APP_URL}/payment-retry?id=${submission.id}" style="color: #e53e3e; font-weight: bold;">click here</a> to try again with a different payment method.</p>
                </div>
                <p>If you continue to experience issues, please contact our support team.</p>
                <p>Best regards,<br>The AuraColor Team</p>
              </div>
            `
          })
        }
      }
      break
    }
    
    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge
      
      // Find the booking by payment intent
      const { data: submissions } = await supabase
        .from('questionnaire_submissions')
        .select('*')
        .eq('stripe_payment_id', charge.payment_intent)
      
      if (submissions && submissions.length > 0) {
        const submission = submissions[0]
        
        // Update the booking status
        await supabase
          .from('questionnaire_submissions')
          .update({
            payment_status: 'refunded',
            refund_amount: charge.amount_refunded,
            refund_date: new Date().toISOString()
          })
          .eq('id', submission.id)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}