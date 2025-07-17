import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    // console.log('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
  case 'payment_intent.succeeded':
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    // console.log(`PaymentIntent for ${ paymentIntent.amount } was successful!`);
    break;
  case 'payment_method.attached':
    const paymentMethod = event.data.object as Stripe.PaymentMethod;
    // console.log('PaymentMethod attached:', paymentMethod.id);
    break;
  default:
    // console.log(`Unhandled event type ${ event.type }`);
  }

  return NextResponse.json({ received: true });
}