import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
})

export const STRIPE_CONFIG = {
  currency: 'usd',
  payment_method_types: ['card'],
  services: {
    color_analysis: {
      price: 4900, // $49.00
      name: 'Color Analysis Service',
      description: 'AI-powered seasonal color analysis with personalized palette',
    },
    personal_shopping: {
      price: 9900, // $99.00
      name: 'Personal Shopping Service',
      description: 'Curated product recommendations based on your color season',
    },
    stylist_consultation: {
      price: 14900, // $149.00
      name: 'Stylist Consultation',
      description: '1-hour video consultation with professional stylist',
    },
  },
}