'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentRetryPage() {
  const searchParams = useSearchParams()
  const submissionId = searchParams.get('id')
  
  const [loading, setLoading] = useState(true)
  const [submission, setSubmission] = useState<any>(null)
  const [error, setError] = useState('')
  const [processingPayment, setProcessingPayment] = useState(false)

  useEffect(() => {
    if (submissionId) {
      fetchSubmission(submissionId)
    } else {
      setError('No submission ID provided')
      setLoading(false)
    }
  }, [submissionId])

  const fetchSubmission = async (id: string) => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('questionnaire_submissions')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        throw error
      }
      
      if (!data) {
        setError('Submission not found')
        return
      }
      
      setSubmission(data)
    } catch (error) {
      console.error('Error fetching submission:', error)
      setError('Failed to load submission details')
    } finally {
      setLoading(false)
    }
  }

  const handleRetryPayment = async () => {
    try {
      setProcessingPayment(true)
      
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          serviceType: submission.service_type,
          answers: submission.answers,
          photoUrls: submission.photo_urls,
          submissionId: submission.id
        }),
      })
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create payment session')
      }
      
      // Redirect to Stripe checkout
      window.location.href = result.checkout_url
    } catch (error) {
      console.error('Payment retry failed:', error)
      setError('Failed to process payment. Please try again.')
      setProcessingPayment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600">Loading payment details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="max-w-md mx-auto px-6">
            <Card>
              <CardHeader>
                <CardTitle>Error</CardTitle>
                <CardDescription>We encountered a problem</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-md mx-auto px-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Payment</CardTitle>
              <CardDescription>Resume your order for {submission?.service_type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-1">Order Details</h3>
                  <p className="text-gray-600 mb-4">
                    {submission?.service_type} - £{((submission?.payment_amount || 7500) / 100).toFixed(2)}
                  </p>
                  
                  <div className="bg-yellow-50 p-4 rounded-md mb-6">
                    <p className="text-yellow-800 text-sm">
                      Your previous payment attempt was unsuccessful. Please try again with a different payment method.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleRetryPayment}
                    disabled={processingPayment}
                    className="w-full"
                  >
                    {processingPayment ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'Pay Now'
                    )}
                  </Button>
                </div>
                
                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}