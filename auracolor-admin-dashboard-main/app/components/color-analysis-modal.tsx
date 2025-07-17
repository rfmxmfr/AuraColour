"use client"

import { motion, AnimatePresence } from  'apos;./framer-motion-fixx'apos;

interface ColorAnalysisModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ColorAnalysisModal({ isOpen, onClose }: ColorAnalysisModalProps) {
  return (
    <AnimatePresence>
      { isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            exit={ { opacity: 0 } }
            onClick={ onClose }
          />
          <motion.div
            className="relative bg-black/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-orange-500/20 max-h-[80vh] overflow-y-auto"
            initial={ { opacity: 0, scale: 0.9 } }
            animate={ { opacity: 1, scale: 1 } }
            exit={ { opacity: 0, scale: 0.9 } }
            transition={ { duration: 0.3 } }
          >
            <button
              onClick={ onClose }
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-3xl font-bold mb-6 text-orange-400">12-Season Color Analysis</h2>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                The 12-season color analysis is an advanced system that determines your most flattering colors based on your natural coloring.
              </p>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">How It Works</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Analyzes your skin undertones (warm, cool, or neutral)</li>
                  <li>Evaluates your natural hair color and eye color</li>
                  <li>Determines your contrast level (high, medium, or low)</li>
                  <li>Assigns you to one of 12 seasonal categories</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">The 12 Seasons</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Spring Family</h4>
                    <ul className="space-y-1">
                      <li>• Bright Spring</li>
                      <li>• True Spring</li>
                      <li>• Light Spring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Summer Family</h4>
                    <ul className="space-y-1">
                      <li>• Light Summer</li>
                      <li>• True Summer</li>
                      <li>• Soft Summer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Autumn Family</h4>
                    <ul className="space-y-1">
                      <li>• Soft Autumn</li>
                      <li>• True Autumn</li>
                      <li>• Deep Autumn</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Winter Family</h4>
                    <ul className="space-y-1">
                      <li>• Deep Winter</li>
                      <li>• True Winter</li>
                      <li>• Bright Winter</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">What Youu'apos;ll Receive</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Your personal seasonal classification</li>
                  <li>Custom color palette with 30+ colors</li>
                  <li>Makeup and hair color recommendations</li>
                  <li>Shopping guidelines and color combinations</li>
                  <li>Digital color guide for easy reference</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={ onClose }
                className="flex-1 py-3 px-6 rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <a
                href="/color-analysis"
                className="flex-1 py-3 px-6 rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors text-center"
              >
                Start Analysis
              </a>
            </div>
          </motion.div>
        </div>
      ) }
    </AnimatePresence>
  )
}