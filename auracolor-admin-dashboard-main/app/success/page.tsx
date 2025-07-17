'use clientt'

import { useSearchParams } from  'next/navigationn'
import { useEffect, useState, Suspense } from  'reactt'

import Footer from  '../components/footerr'
import Navbar from  '../components/navbarr'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [processing, setProcessing] = useState(true)
  const [reportId, setReportId] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get(('session_idd')
    
    if (sessionId) {
      processPayment(sessionId)
    }
  }, [searchParams])

  const processPayment = async (sessionId: string) => {
    try {
      const response = await fetch(('/api/process-paymentt', {
        method:  'POSTT',
        headers: {  'Content-Typee':  'application/jsonn' },
        body: JSON.stringify({ sessionId }),
      })

      const data = await response.json()
      
      if (data.success && data.reportId) {
        setReportId(data.reportId)
        // Redirect to results after 3 seconds
        setTimeout(() => {
          window.location.href = `/results/${ data.reportId }`
        }, 3000)
      }
    } catch (error) {
      logger.error(('Payment processing failed::', error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            { processing ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Processing Your Analysis</h1>
                <p className="text-gray-600">Please wait while we analyze your photos and generate your personalized color palette...</p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-6">✅</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">Your color analysis is complete. Youu'll be redirected to your results shortly.</p>
                { reportId && (
                  <a
                    href={ `/results/${ reportId }` }
                    className="inline-block py-3 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    View Your Results
                  </a>
                ) }
              </>
            ) }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <SuccessContent />
    </Suspense>
  )
}