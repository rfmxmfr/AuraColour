"use client"

import { motion } from '../components/framer-motion-fix'
import { ThemeProvider } from '../contexts/ThemeContext'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'
import ServiceHero from '../components/service-hero'

export default function TwelveSeasonAnalysisPage() {
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
            12-Season
            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Color Analysis
            </span>
          </motion.h1>
        </div>
      </section>
      
      <ServiceHero 
        title="Discover Your Style"
        subtitle="Transform your wardrobe with expert styling and organization"
        price="$149"
        imageUrl="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080"
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent">What is 12-Season Color Analysis?</h2>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-secondary">
                The 12-season color analysis is an advanced system that determines your most flattering colors based on your natural coloring. 
                It's more precise than the traditional 4-season system, providing you with a personalized palette that enhances your natural beauty.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">How It Works</h3>
                  <ul className="space-y-3 text-secondary text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Analyzes your skin undertones (warm, cool, or neutral)
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Evaluates your natural hair color and eye color
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Determines your contrast level (high, medium, or low)
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Assigns you to one of 12 seasonal categories
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">What You'll Receive</h3>
                  <ul className="space-y-3 text-secondary text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Your personal seasonal classification
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Custom color palette with 30+ colors
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Makeup and hair color recommendations
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Shopping guidelines and color combinations
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Digital color guide for easy reference
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-panel rounded-2xl p-6 md:p-8 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-accent text-center">The 12 Seasons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center glass-panel-light rounded-lg p-4">
                  <h4 className="font-semibold text-accent mb-3">Spring Family</h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    <li>Bright Spring</li>
                    <li>True Spring</li>
                    <li>Light Spring</li>
                  </ul>
                </div>
                <div className="text-center glass-panel-light rounded-lg p-4">
                  <h4 className="font-semibold text-accent mb-3">Summer Family</h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    <li>Light Summer</li>
                    <li>True Summer</li>
                    <li>Soft Summer</li>
                  </ul>
                </div>
                <div className="text-center glass-panel-light rounded-lg p-4">
                  <h4 className="font-semibold text-accent mb-3">Autumn Family</h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    <li>Soft Autumn</li>
                    <li>True Autumn</li>
                    <li>Deep Autumn</li>
                  </ul>
                </div>
                <div className="text-center glass-panel-light rounded-lg p-4">
                  <h4 className="font-semibold text-accent mb-3">Winter Family</h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    <li>Deep Winter</li>
                    <li>True Winter</li>
                    <li>Bright Winter</li>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-accent">Ready to Discover Your Season?</h2>
              <div className="text-center mb-4">
                <span className="text-sm text-accent">🔥 Limited time: 50% off first consultation</span>
              </div>
              <p className="text-secondary mb-6">Professional 12-season color analysis - Regular $149, Today $74</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/questionnaire"
                  className="py-3 md:py-4 px-6 md:px-8 rounded-full btn-champagne transition-colors text-base md:text-lg font-semibold"
                >
                  Get My FREE Analysis (Worth $149)
                </a>
                <button className="py-3 md:py-4 px-6 md:px-8 rounded-full btn-secondary transition-colors text-base md:text-lg font-semibold">
                  Book My Full Analysis - $74 Today
                </button>
              </div>
              <div className="text-center mt-3">
                <span className="text-xs text-secondary">✅ Join 500+ satisfied clients • 🔒 100% satisfaction guarantee</span>
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