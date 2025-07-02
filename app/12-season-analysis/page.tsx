"use client"

import { motion } from '../components/framer-motion-fix'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'

export default function TwelveSeasonAnalysisPage() {
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
            12-Season Color Analysis
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover your perfect color palette with our comprehensive seasonal color analysis system.
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-400">What is 12-Season Color Analysis?</h2>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-300">
                The 12-season color analysis is an advanced system that determines your most flattering colors based on your natural coloring. 
                It's more precise than the traditional 4-season system, providing you with a personalized palette that enhances your natural beauty.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">How It Works</h3>
                  <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Analyzes your skin undertones (warm, cool, or neutral)
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Evaluates your natural hair color and eye color
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Determines your contrast level (high, medium, or low)
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Assigns you to one of 12 seasonal categories
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4">What You'll Receive</h3>
                  <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Your personal seasonal classification
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Custom color palette with 30+ colors
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Makeup and hair color recommendations
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Shopping guidelines and color combinations
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      Digital color guide for easy reference
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-black/60 backdrop-blur-md border border-orange-500/20 rounded-2xl p-6 md:p-8 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-orange-400 text-center">The 12 Seasons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center bg-black/40 backdrop-blur-sm border border-orange-500/10 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-400 mb-3">Spring Family</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>Bright Spring</li>
                    <li>True Spring</li>
                    <li>Light Spring</li>
                  </ul>
                </div>
                <div className="text-center bg-black/40 backdrop-blur-sm border border-orange-500/10 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-400 mb-3">Summer Family</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>Light Summer</li>
                    <li>True Summer</li>
                    <li>Soft Summer</li>
                  </ul>
                </div>
                <div className="text-center bg-black/40 backdrop-blur-sm border border-orange-500/10 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-400 mb-3">Autumn Family</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>Soft Autumn</li>
                    <li>True Autumn</li>
                    <li>Deep Autumn</li>
                  </ul>
                </div>
                <div className="text-center bg-black/40 backdrop-blur-sm border border-orange-500/10 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-400 mb-3">Winter Family</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>Deep Winter</li>
                    <li>True Winter</li>
                    <li>Bright Winter</li>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Discover Your Season?</h2>
              <p className="text-gray-300 mb-6">Professional 12-season color analysis for $149</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/questionnaire"
                  className="py-3 md:py-4 px-6 md:px-8 rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors text-base md:text-lg font-semibold"
                >
                  Start Free Mini Analysis
                </a>
                <button className="py-3 md:py-4 px-6 md:px-8 rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors text-base md:text-lg font-semibold">
                  Book Full Analysis
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