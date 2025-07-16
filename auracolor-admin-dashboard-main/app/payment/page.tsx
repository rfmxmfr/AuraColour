'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useToast } from '@/components/ui/toast'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm({ serviceId, amount }: { serviceId: string, amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [email, setEmail] = useState('')
  const { success, error: showError } = useToast()

  useEffect(() => {
    if (serviceId && email) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, clientEmail: email })
      })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
    }
  }, [serviceId, email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return

    setLoading(true)
    const card = elements.getElement(CardElement)
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: card!, billing_details: { email } }
    })

    if (error) {
      showError('Payment failed: ' + error.message)
    } else if (paymentIntent?.status === 'succeeded') {
      success('Payment successful! Redirecting...')
      setTimeout(() => {
        window.location.href = '/success?payment=completed'
      }, 1500)
    }
    
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label>Card Details</Label>
        <div className="p-3 border rounded-lg bg-white">
          <CardElement options={{
            style: {
              base: { fontSize: '16px', color: '#424770' }
            }
          }} />
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={!stripe || loading || !clientSecret}
        className="w-full flex items-center justify-center"
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" />
            <span className="ml-2">Processing...</span>
          </>
        ) : (
          `Pay £${amount}`
        )}
      </Button>
    </form>
  )
}

export default function PaymentPage() {
  const [serviceId, setServiceId] = useState('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = params.get('service') || 'color-analysis'
    const prices = {
      'color-analysis': 75,
      'virtual-wardrobe': 100,
      'personal-shopping': 150,
      'style-coaching': 300,
      'gift-vouchers': 75
    }
    setServiceId(service)
    setAmount(prices[service as keyof typeof prices])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Complete Payment</h1>
            <p className="text-xl text-gray-600">Secure payment powered by Stripe</p>
          </div>

          <Card className="bg-white/20 backdrop-blur-xl border border-white/30">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise}>
                <CheckoutForm serviceId={serviceId} amount={amount} />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}