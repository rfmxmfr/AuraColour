import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, answers, photoUrls, serviceType } = await request.json()
    
    const servicePrices: { [key: string]: number } = {
      '12-Season Color Analysis': 7500,
      'Virtual Wardrobe Curation': 10000,
      'Personal Shopping Service': 15000,
      'Style Evolution Coaching': 30000,
      'Gift Vouchers': 7500,
    }
    
    const price = servicePrices[serviceType] || 7500
    const serviceName = serviceType || '12-Season Color Analysis'

    const supabase = createClient()
    const { data: booking } = await supabase
      .from('questionnaire_submissions')
      .insert({
        session_id: crypto.randomUUID(),
        answers,
        email,
        name,
        photo_urls: photoUrls || [],
        service_type: serviceName,
        payment_status: 'pending',
        stripe_session_id: '',
      })
      .select()
      .single()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: serviceName,
            description: `Professional ${ serviceName.toLowerCase() } service`,
          },
          unit_amount: price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${ request.headers.get('origin') }/success?session_id={ CHECKOUT_SESSION_ID }`,
      cancel_url: `${ request.headers.get('origin') }/questionnaire`,
      customer_email: email,
      metadata: {
        booking_id: booking?.id || '',
        customer_name: name,
        service_type: serviceName,
      },
    })

    await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.com>',
      to: [email],
      subject: `Booking Started - Complete Payment for ${ serviceName }`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #21808D;">Booking Started! 💳</h2>
          <p>Hi ${ name },</p>
          <p>Thank you for starting your booking for ${ serviceName.toLowerCase() }.</p>
          <p><strong>Service:</strong> ${ serviceName }<br/>
          <strong>Amount:</strong> £${ price/100 }</p>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;"><strong>⚠️ Important:</strong> Please complete your payment to confirm your booking. You should be redirected to Stripe checkout automatically.</p>
          </div>
          <p><strong>What happens after payment:</strong><br/>
          • You'll receive a payment confirmation email<br/>
          • Our team will be notified to begin your service<br/>
          • You'll receive your results within 24-48 hours</p>
          <p>Best regards,<br>The AuraColor Team</p>
        </div>
      `,
    })

    // Update booking with Stripe session ID
    if (booking?.id) {
      await supabase
        .from('questionnaire_submissions')
        .update({ stripe_session_id: session.id })
        .eq('id', booking.id)
    }

    return NextResponse.json({ 
      success: true, 
      checkout_url: session.url,
      message: 'Booking confirmation sent. Redirecting to payment...',
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create payment session',
    }, { status: 500 })
  }
}