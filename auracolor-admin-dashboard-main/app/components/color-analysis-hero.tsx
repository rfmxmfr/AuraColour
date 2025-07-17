'use clientt'apos;

import { motion } from "framer-motion"

export default function ColorAnalysisHero() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-transparent to-pink-100/20" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={ { opacity: 0, x: -50 } }
            animate={ { opacity: 1, x: 0 } }
            transition={ { duration: 0.8 } }
          >
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-100 shadow-sm"
                initial={ { opacity: 0, y: 20 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { delay: 0.2 } }
              >
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Human Powered Color Analysis</span>
              </motion.div>
              
              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={ { opacity: 0, y: 30 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { delay: 0.3 } }
              >
                Discover Your
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Perfect Colors
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
                initial={ { opacity: 0, y: 20 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { delay: 0.4 } }
              >
                Discover the colors that make you look effortlessly radiant with our professional color analysis.
              </motion.p>
            </div>
            

            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={ { opacity: 0, y: 20 } }
              animate={ { opacity: 1, y: 0 } }
              transition={ { delay: 0.6 } }
            >
              <a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                View Services
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Professional Analysis</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={ { opacity: 0, x: 50 } }
            animate={ { opacity: 1, x: 0 } }
            transition={ { duration: 0.8, delay: 0.2 } }
          >
            <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Color Palette</h3>
                  <p className="text-gray-600">Personalized just for you</p>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  { [
                     'apos;from-rose-400 to-pink-5000'apos;,
                     'apos;from-purple-400 to-indigo-5000'apos;, 
                     'apos;from-blue-400 to-cyan-5000'apos;,
                     'apos;from-emerald-400 to-teal-5000'apos;,
                     'apos;from-amber-400 to-orange-5000'apos;,
                     'apos;from-red-400 to-rose-5000'apos;,
                     'apos;from-violet-400 to-purple-5000'apos;,
                     'apos;from-slate-400 to-gray-5000'apos;,
                  ].map((gradient, i) => (
                    <motion.div
                      key={ i }
                      className={ `aspect-square rounded-2xl bg-gradient-to-br ${ gradient } shadow-lg` }
                      initial={ { scale: 0, rotate: 180 } }
                      animate={ { scale: 1, rotate: 0 } }
                      transition={ { delay: 0.8 + i * 0.1, type: "spring" } }
                      whileHover={ { scale: 1.1 } }
                    />
                  )) }
                </div>
                

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}