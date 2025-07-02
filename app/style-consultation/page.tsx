"use client"

import { motion } from '../components/framer-motion-fix'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'

export default function StyleConsultationPage() {
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
            Style Consultation
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive style guidance and personalized fashion roadmap for $199
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-400">What is Style Consultation?</h2>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-300">
                Our style consultation is a comprehensive session where we analyze your lifestyle, preferences, and goals 
                to create a personalized style strategy that enhances your confidence and aligns with your authentic self.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Consultation Includes</h3>
                  <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Lifestyle and style goals assessment
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Body shape and proportion analysis
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Personal style archetype identification
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Wardrobe planning and strategy
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Personalized style guide and action plan
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Perfect For</h3>
                  <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Style transformation beginners
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Career transition styling needs
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Personal brand development
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Confidence building through style
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Budget-conscious style seekers
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Discover Your Style?</h2>
              <p className="text-gray-300 mb-6">Comprehensive style consultation for $199</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/questionnaire"
                  className="py-3 md:py-4 px-6 md:px-8 rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors text-base md:text-lg font-semibold"
                >
                  Start Style Quiz
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