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
      title: "Complete Style Questionnaire",
      description: "Answer a few targeted questions about your preferences, lifestyle, and color goals to personalize your analysis.",
      icon: (
        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Upload Professional Photos",
      description: "Submit three specific photos: full face with hair pulled back, full face with hair down, and wrist showing vein colors for accurate undertone analysis.",
      icon: (
        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Professional Analysis",
      description: "Our certified color analysts review your photos and questionnaire to determine your seasonal color palette using the 12-season system.",
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
      number: "04",
      title: "Receive Detailed Results",
      description: "Get your comprehensive color analysis report delivered to your email within 48 hours, including your seasonal palette, styling guide, and shopping recommendations.",
      icon: (
        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-12 md:py-20 glass relative overflow-hidden">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent transform -translate-y-1/2 hidden lg:block"></div>
          
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
                <div className="w-12 h-12 md:w-16 md:h-16 glass-strong rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto border-4 border-orange-500/30 ring-4 ring-orange-500/20">
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