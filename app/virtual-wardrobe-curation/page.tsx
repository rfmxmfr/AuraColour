"use client"

import { motion } from '../components/framer-motion-fix'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'

export default function VirtualWardrobeCurationPage() {
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
            Virtual Wardrobe Curation
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your existing wardrobe with expert styling and organization for $299
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-400">What is Virtual Wardrobe Curation?</h2>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-300">
                Our virtual wardrobe curation service helps you maximize your existing clothing collection through expert organization, 
                styling guidance, and strategic outfit planning - all done remotely for your convenience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">What's Included</h3>
                  <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Complete closet audit and inventory
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Organization system design
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      30+ outfit combinations created
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Gap analysis and shopping list
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Digital lookbook with styling tips
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Perfect For</h3>
                  <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Busy professionals seeking efficiency
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Those with full closets but nothing to wear
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      People wanting to maximize existing pieces
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Anyone needing wardrobe organization
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Remote styling convenience seekers
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Transform Your Wardrobe?</h2>
              <p className="text-gray-300 mb-6">Complete virtual wardrobe curation service for $299</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/questionnaire"
                  className="py-3 md:py-4 px-6 md:px-8 rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors text-base md:text-lg font-semibold"
                >
                  Start Free Assessment
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