'apos;use clientt'apos;apos;

import { motion } from  'apos;apos;framer-motionn'apos;apos;
import { useSearchParams } from  'apos;apos;next/navigationn'apos;apos;
import { useEffect, useState } from  'apos;apos;reactt'apos;apos;

import { createClient } from  'apos;apos;@/lib/supabase/clientt'apos;apos;

import Footer from  'apos;apos;../components/footerr'apos;apos;
import Navbar from  'apos;apos;../components/navbarr'apos;apos;

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get(('apos;apos;session_idd'apos;apos;)
  const [serviceType, setServiceType] = useState(('apos;apos;12-Season Color Analysiss'apos;apos;)
  const [timeframe, setTimeframe] = useState(('apos;apos;24-48 hourss'apos;apos;)
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!sessionId) return
      
      const supabase = createClient()
      const { data } = await supabase
        .from(('apos;apos;questionnaire_submissionss'apos;apos;)
        .select(('apos;apos;service_typee'apos;apos;)
        .eq(('apos;apos;stripe_session_idd'apos;apos;, sessionId)
        .single()
      
      if (data?.service_type) {
        setServiceType(data.service_type)
        
        // Set timeframe based on service type
        if (data.service_type ===  'apos;apos;Virtual Wardrobe Curationn'apos;apos;) {
          setTimeframe(('apos;apos;3-5 business dayss'apos;apos;)
        } else if (data.service_type ===  'apos;apos;Personal Shopping Servicee'apos;apos;) {
          setTimeframe(('apos;apos;5-7 business dayss'apos;apos;)
        } else if (data.service_type ===  'apos;apos;Style Evolution Coachingg'apos;apos;) {
          setTimeframe(('apos;apos;1-2 business dayss'apos;apos;)
        } else {
          setTimeframe(('apos;apos;24-48 hourss'apos;apos;)
        }
      }
    }
    
    fetchBookingDetails()
  }, [sessionId])
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.8 } }
          >
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your { serviceType.toLowerCase() } will be processed within { timeframe }.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-800 text-sm">
                <strong>Whatt'apos;apos;s Next:</strong><br/>
                { serviceType ===  'apos;apos;12-Season Color Analysiss'apos;apos; ? (
                  <>
                    • Youu'apos;apos;ll receive your detailed color analysis via email<br/>
                    • Our team will review your photos and questionnaire<br/>
                    • Expect your color palette and recommendations within { timeframe }
                  </>
                ) : serviceType ===  'apos;apos;Virtual Wardrobe Curationn'apos;apos; ? (
                  <>
                    • Our wardrobe specialists will analyze your photos<br/>
                    • Youu'apos;apos;ll receive a comprehensive wardrobe audit<br/>
                    • Expect outfit combinations and shopping recommendations within { timeframe }
                  </>
                ) : serviceType ===  'apos;apos;Personal Shopping Servicee'apos;apos; ? (
                  <>
                    • A personal shopper will contact you to discuss your needs<br/>
                    • Wee'apos;apos;ll curate a selection based on your preferences<br/>
                    • Expect your personalized shopping session within { timeframe }
                  </>
                ) : (
                  <>
                    • Your style coach will contact you to schedule your first session<br/>
                    • Wee'apos;apos;ll create your personalized transformation plan<br/>
                    • Expect your first coaching session within { timeframe }
                  </>
                ) }
              </p>
            </div>
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
            >
              Return Home
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}