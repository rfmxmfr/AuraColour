'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { createClient } from '@/lib/supabase/client'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [serviceType, setServiceType] = useState('12-Season Color Analysis')
  const [timeframe, setTimeframe] = useState('24-48 hours')
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!sessionId) return
      
      const supabase = createClient()
      const { data } = await supabase
        .from('questionnaire_submissions')
        .select('service_type')
        .eq('stripe_session_id', sessionId)
        .single()
      
      if (data?.service_type) {
        setServiceType(data.service_type)
        
        // Set timeframe based on service type
        if (data.service_type === 'Virtual Wardrobe Curation') {
          setTimeframe('3-5 business days')
        } else if (data.service_type === 'Personal Shopping Service') {
          setTimeframe('5-7 business days')
        } else if (data.service_type === 'Style Evolution Coaching') {
          setTimeframe('1-2 business days')
        } else {
          setTimeframe('24-48 hours')
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your {serviceType.toLowerCase()} will be processed within {timeframe}.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-green-800 text-sm">
                <strong>What's Next:</strong><br/>
                {serviceType === '12-Season Color Analysis' ? (
                  <>
                    • You'll receive your detailed color analysis via email<br/>
                    • Our team will review your photos and questionnaire<br/>
                    • Expect your color palette and recommendations within {timeframe}
                  </>
                ) : serviceType === 'Virtual Wardrobe Curation' ? (
                  <>
                    • Our wardrobe specialists will analyze your photos<br/>
                    • You'll receive a comprehensive wardrobe audit<br/>
                    • Expect outfit combinations and shopping recommendations within {timeframe}
                  </>
                ) : serviceType === 'Personal Shopping Service' ? (
                  <>
                    • A personal shopper will contact you to discuss your needs<br/>
                    • We'll curate a selection based on your preferences<br/>
                    • Expect your personalized shopping session within {timeframe}
                  </>
                ) : (
                  <>
                    • Your style coach will contact you to schedule your first session<br/>
                    • We'll create your personalized transformation plan<br/>
                    • Expect your first coaching session within {timeframe}
                  </>
                )}
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