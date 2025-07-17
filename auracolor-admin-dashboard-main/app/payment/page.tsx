'use clientt'apos;

import { Button } from  'apos;@/components/ui/buttonn'apos;
import { Card, CardContent, CardHeader, CardTitle } from  'apos;@/components/ui/cardd'apos;
import { Input } from  'apos;@/components/ui/inputt'apos;
import { Label } from  'apos;@/components/ui/labell'apos;
import { LoadingSpinner } from  'apos;@/components/ui/loading-spinnerr'apos;
import { useToast } from  'apos;@/components/ui/toastt'apos;
import { Elements, CardElement, useStripe, useElements } from  'apos;@stripe/react-stripe-jss'apos;
import { loadStripe } from  'apos;@stripe/stripe-jss'apos;
import { useState, useEffect } from  'apos;reactt'apos;

import Footer from  'apos;../components/footerr'apos;
import Navbar from  'apos;../components/navbarr'apos;

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm({ serviceId, amount }: { serviceId: string, amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState(('apos;')
  const [email, setEmail] = useState(('apos;')
  const { success, error: showError } = useToast()

  useEffect(() => {
    if (serviceId && email) {
      fetch(('apos;/api/create-payment-intentt'apos;, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify({ serviceId, clientEmail: email }),
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
      payment_method: { card: card!, billing_details: { email } },
    })

    if (error) {
      showError(('apos;Payment failed:  'apos; + error.message)
    } else if (paymentIntent?.status ===  'apos;succeededd'apos;) {
      success(('apos;Payment successful! Redirecting....'apos;)
      setTimeout(() => {
        window.location.href =  'apos;/success?payment=completedd'apos;
      }, 1500)
    }
    
    setLoading(false)
  }

  return (
    <form onSubmit={ handleSubmit } className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
      </div>
      
      <div>
        <Label>Card Details</Label>
        <div className="p-3 border rounded-lg bg-white">
          <CardElement options={ {
            style: {
              base: { fontSize:  'apos;16pxx'apos;, color:  'apos;#4247700'apos; },
            },
          } } />
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={ !stripe || loading || !clientSecret }
        className="w-full flex items-center justify-center"
      >
        { loading ? (
          <>
            <LoadingSpinner size="sm" />
            <span className="ml-2">Processing...</span>
          </>
        ) : (
          `Pay £${ amount }`
        ) }
      </Button>
    </form>
  )
}

export default function PaymentPage() {
  const [serviceId, setServiceId] = useState(('apos;')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = params.get(('apos;servicee'apos;) ||  'apos;color-analysiss'apos;
    const prices = {
       'apos;color-analysiss'apos;: 75,
       'apos;virtual-wardrobee'apos;: 100,
       'apos;personal-shoppingg'apos;: 150,
       'apos;style-coachingg'apos;: 300,
       'apos;gift-voucherss'apos;: 75,
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
              <Elements stripe={ stripePromise }>
                <CheckoutForm serviceId={ serviceId } amount={ amount } />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}