"use client"

import { motion } from '../components/framer-motion-fix'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'

export default function PersonalShoppingServicePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingParticles particleCount={25} opacity={0.2} />
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Personal Shopping Service
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Curated shopping experience tailored to your style, budget, and color palette for $399
          </motion.p>
        </div>
      </section>

      <section className="relative py-12 md:py-20 bg-gray-900/80 backdrop-blur-md overflow-hidden">
        <FloatingParticles particleCount={20} opacity={0.15} />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-black/60 backdrop-blur-md border border-orange-500/20 rounded-2xl p-6 md:p-8 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-400">What is Personal Shopping Service?</h2>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-300">
                Our personal shopping service provides you with a dedicated stylist who will curate, select, and purchase 
                clothing items that perfectly align with your personal style, color palette, and lifestyle needs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Service Includes</h3>
                  <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Pre-shopping consultation and planning
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Full-day personal shopping session
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Professional styling and fitting
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Budget optimization strategies
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Follow-up styling tips and care guide
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Ideal For</h3>
                  <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Busy executives with limited shopping time
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Special occasion wardrobe needs
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Complete wardrobe overhauls
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Those who dislike shopping but love results
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Investment in professional image
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-black/60 backdrop-blur-md border border-orange-500/20 rounded-2xl p-6 md:p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready for Your Personal Shopping Experience?</h2>
              <p className="text-gray-300 mb-6">Full-day personal shopping service for $399</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/questionnaire"
                  className="py-3 md:py-4 px-6 md:px-8 rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors text-base md:text-lg font-semibold"
                >
                  Start Style Assessment
                </a>
                <button className="py-3 md:py-4 px-6 md:px-8 rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors text-base md:text-lg font-semibold">
                  Book Consultation
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}