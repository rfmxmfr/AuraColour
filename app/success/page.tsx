'use clientt'apos;

import { motion } from  'apos;framer-motionn'apos;
import { useSearchParams } from  'apos;next/navigationn'apos;
import { useEffect, useState } from  'apos;reactt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;

import Footer from  'apos;../components/footerr'apos;
import Navbar from  'apos;../components/navbarr'apos;

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get(('apos;session_idd'apos;)
  const [serviceType, setServiceType] = useState(('apos;12-Season Color Analysiss'apos;)
  const [timeframe, setTimeframe] = useState(('apos;24-48 hourss'apos;)
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!sessionId) return
      
      const supabase = createClient()
      const { data } = await supabase
        .from(('apos;questionnaire_submissionss'apos;)
        .select(('apos;service_typee'apos;)
        .eq(('apos;stripe_session_idd'apos;, sessionId)
        .single()
      
      if (data?.service_type) {
        setServiceType(data.service_type)
        
        // Set timeframe based on service type
        if (data.service_type ===  'apos;Virtual Wardrobe Curationn'apos;) {
          setTimeframe(('apos;3-5 business dayss'apos;)
        } else if (data.service_type ===  'apos;Personal Shopping Servicee'apos;) {
          setTimeframe(('apos;5-7 business dayss'apos;)
        } else if (data.service_type ===  'apos;Style Evolution Coachingg'apos;) {
          setTimeframe(('apos;1-2 business dayss'apos;)
        } else {
          setTimeframe(('apos;24-48 hourss'apos;)
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
                <strong>Whatt'apos;s Next:</strong><br/>
                { serviceType ===  'apos;12-Season Color Analysiss'apos; ? (
                  <>
                    • Youu'apos;ll receive your detailed color analysis via email<br/>
                    • Our team will review your photos and questionnaire<br/>
                    • Expect your color palette and recommendations within { timeframe }
                  </>
                ) : serviceType ===  'apos;Virtual Wardrobe Curationn'apos; ? (
                  <>
                    • Our wardrobe specialists will analyze your photos<br/>
                    • Youu'apos;ll receive a comprehensive wardrobe audit<br/>
                    • Expect outfit combinations and shopping recommendations within { timeframe }
                  </>
                ) : serviceType ===  'apos;Personal Shopping Servicee'apos; ? (
                  <>
                    • A personal shopper will contact you to discuss your needs<br/>
                    • Wee'apos;ll curate a selection based on your preferences<br/>
                    • Expect your personalized shopping session within { timeframe }
                  </>
                ) : (
                  <>
                    • Your style coach will contact you to schedule your first session<br/>
                    • Wee'apos;ll create your personalized transformation plan<br/>
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