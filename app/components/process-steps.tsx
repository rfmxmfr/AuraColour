'use client'

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import FloatingParticles from "./floating-particles"

export default function ProcessSteps() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      number: "01",
      title: "Upload Your Photo",
      description: "Share a clear photo of yourself in natural lighting for the most accurate color analysis.",
      icon: (
        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      ),
    },
    {
      number: "02", 
      title: "AI Color Analysis",
      description: "Our advanced AI analyzes your skin tone, hair color, and eye color to determine your perfect palette.",
      icon: (
        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="13.5" cy="6.5" fill="currentColor" r=".5" />
          <circle cx="17.5" cy="10.5" fill="currentColor" r=".5" />
          <circle cx="8.5" cy="7.5" fill="currentColor" r=".5" />
          <circle cx="6.5" cy="12.5" fill="currentColor" r=".5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Get Your Results",
      description: "Receive your personalized color palette with detailed recommendations and styling tips.",
      icon: (
        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-20 bg-gray-900/80 backdrop-blur-md relative overflow-hidden">
      <FloatingParticles particleCount={15} opacity={0.15} />
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get your personalized color analysis in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent transform -translate-y-1/2 hidden md:block"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-orange-500/30 ring-4 ring-orange-500/20">
                  {step.icon}
                </div>
                <div className="text-6xl font-bold text-orange-500/20 mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}