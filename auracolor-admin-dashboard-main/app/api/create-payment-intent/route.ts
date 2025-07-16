import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
})

const servicePrices = {
  'color-analysis': 7500,
  'virtual-wardrobe': 10000,
  'personal-shopping': 15000,
  'style-coaching': 30000,
  'gift-vouchers': 7500
}

export async function POST(request: NextRequest) {
  try {
    const { serviceId, clientEmail } = await request.json()
    
    const amount = servicePrices[serviceId as keyof typeof servicePrices]
    if (!amount) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'gbp',
      metadata: { serviceId, clientEmail },
      receipt_email: clientEmail
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: amount / 100
    })

  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
}