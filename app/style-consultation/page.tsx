"use client"

import { motion } from '../components/framer-motion-fix'
import { ThemeProvider } from '../contexts/ThemeContext'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'
import ServiceHero from '../components/service-hero'

export default function StyleConsultationPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-primary" style={{ background: 'var(--bg-primary)' }}>
        <Navbar />
        
        <section className="relative pt-32 pb-20 overflow-hidden">
          <FloatingParticles particleCount={25} opacity={0.2} />
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Style
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Consultation
              </span>
            </motion.h1>
          </div>
        </section>
        
        <ServiceHero 
          title="Discover Your Style"
          subtitle="Transform your wardrobe with expert styling and organization"
          price="$199"
          imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070"
        />

        <section className="relative py-12 md:py-20 overflow-hidden" style={{ background: 'var(--bg-secondary)', backdropFilter: 'blur(12px)' }}>
          <FloatingParticles particleCount={20} opacity={0.15} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="glass-panel rounded-2xl p-6 md:p-8 mb-8 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent">What is Style Consultation?</h2>
                <p className="text-base md:text-lg leading-relaxed mb-6 text-secondary">
                  Our style consultation is a comprehensive session where we analyze your lifestyle, preferences, and goals 
                  to create a personalized style strategy that enhances your confidence and aligns with your authentic self.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">Consultation Includes</h3>
                    <ul className="space-y-3 text-secondary text-sm md:text-base">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Lifestyle and style goals assessment
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Body shape and proportion analysis
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Personal style archetype identification
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Wardrobe planning and strategy
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Personalized style guide and action plan
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">Perfect For</h3>
                    <ul className="space-y-3 text-secondary text-sm md:text-base">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Style transformation beginners
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Career transition styling needs
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Personal brand development
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Confidence building through style
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Budget-conscious style seekers
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-panel rounded-2xl p-6 md:p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-accent">Ready to Discover Your Style?</h2>
                <p className="text-secondary mb-6">Comprehensive style consultation for $199</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/questionnaire"
                    className="py-3 md:py-4 px-6 md:px-8 rounded-full btn-champagne transition-colors text-base md:text-lg font-semibold"
                  >
                    Start Style Quiz
                  </a>
                  <button className="py-3 md:py-4 px-6 md:px-8 rounded-full text-primary bg-gray-600 hover:bg-gray-700 transition-colors text-base md:text-lg font-semibold">
                    Book Consultation
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ThemeProvider>
  )
}