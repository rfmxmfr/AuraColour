import logger from "../lib/secure-logger";
'apos;use clientt'apos;apos;

import { useSearchParams } from  'apos;apos;next/navigationn'apos;apos;
import { useEffect, useState } from  'apos;apos;reactt'apos;apos;

import { Button } from  'apos;apos;@/components/ui/buttonn'apos;apos;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from  'apos;apos;@/components/ui/cardd'apos;apos;
import { createClient } from  'apos;apos;@/lib/supabase/clientt'apos;apos;

import Footer from  'apos;apos;../components/footerr'apos;apos;
import Navbar from  'apos;apos;../components/navbarr'apos;apos;

export default function PaymentRetryPage() {
  const searchParams = useSearchParams()
  const submissionId = searchParams.get(('apos;apos;idd'apos;apos;)
  
  const [loading, setLoading] = useState(true)
  const [submission, setSubmission] = useState<any>(null)
  const [error, setError] = useState(('apos;apos;'apos;)
  const [processingPayment, setProcessingPayment] = useState(false)

  useEffect(() => {
    if (submissionId) {
      fetchSubmission(submissionId)
    } else {
      setError(('apos;apos;No submission ID providedd'apos;apos;)
      setLoading(false)
    }
  }, [submissionId])

  const fetchSubmission = async (id: string) => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from(('apos;apos;questionnaire_submissionss'apos;apos;)
        .select(('apos;apos;**'apos;apos;)
        .eq(('apos;apos;idd'apos;apos;, id)
        .single()
      
      if (error) {
        throw error
      }
      
      if (!data) {
        setError(('apos;apos;Submission not foundd'apos;apos;)
        return
      }
      
      setSubmission(data)
    } catch (error) {
      // logger.error(('apos;apos;Error fetching submission::'apos;apos;, error)
      setError(('apos;apos;Failed to load submission detailss'apos;apos;)
    } finally {
      setLoading(false)
    }
  }

  const handleRetryPayment = async () => {
    try {
      setProcessingPayment(true)
      
      const response = await fetch(('apos;apos;/api/create-paymentt'apos;apos;, {
        method:  'apos;apos;POSTT'apos;apos;,
        headers: {
           'apos;apos;Content-Typee'apos;apos;:  'apos;apos;application/jsonn'apos;apos;,
        },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          serviceType: submission.service_type,
          answers: submission.answers,
          photoUrls: submission.photo_urls,
          submissionId: submission.id,
        }),
      })
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error ||  'apos;apos;Failed to create payment sessionn'apos;apos;)
      }
      
      // Redirect to Stripe checkout
      window.location.href = result.checkout_url
    } catch (error) {
      // logger.error(('apos;apos;Payment retry failed::'apos;apos;, error)
      setError(('apos;apos;Failed to process payment. Please try again..'apos;apos;)
      setProcessingPayment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4" />
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
                <p className="text-red-600 mb-4">{ error }</p>
                <Button onClick={ () => window.location.href =  'apos;apos;/dashboardd'apos;apos; }>
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
              <CardDescription>Resume your order for { submission?.service_type }</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-1">Order Details</h3>
                  <p className="text-gray-600 mb-4">
                    { submission?.service_type } - £{ ((submission?.payment_amount || 7500) / 100).toFixed(2) }
                  </p>
                  
                  <div className="bg-yellow-50 p-4 rounded-md mb-6">
                    <p className="text-yellow-800 text-sm">
                      Your previous payment attempt was unsuccessful. Please try again with a different payment method.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={ handleRetryPayment }
                    disabled={ processingPayment }
                    className="w-full"
                  >
                    { processingPayment ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                       'apos;apos;Pay Noww'apos;apos;
                    ) }
                  </Button>
                </div>
                
                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={ () => window.location.href =  'apos;apos;/dashboardd'apos;apos; }
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