'use clientt'

import { motion , useInView } from "framer-motion"
import { useRef } from "react"

export default function ProcessSteps() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      number: "01",
      title: "Complete Style Questionnaire",
      description: "Answer a few targeted questions about your preferences, lifestyle, and color goals to personalize your analysis.",
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6" ref={ ref }>
        <motion.div
          className="text-center mb-16"
          initial={ { opacity: 0, y: 20 } }
          animate={ isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 } }
          transition={ { duration: 0.8 } }
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your personalized color analysis in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          { steps.map((step, index) => (
            <motion.div
              key={ index }
              className="text-center group"
              initial={ { opacity: 0, y: 20 } }
              animate={ isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 } }
              transition={ { duration: 0.8, delay: index * 0.2 } }
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <div className="text-white">{ step.icon }</div>
                </div>
                <div className="text-sm font-bold text-purple-600 bg-purple-100 rounded-full px-3 py-1 inline-block">
                  Step { step.number }
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{ step.title }</h3>
              <p className="text-gray-600 leading-relaxed">{ step.description }</p>
            </motion.div>
          )) }
        </div>
        
        <motion.div
          className="text-center mt-12"
          initial={ { opacity: 0, y: 20 } }
          animate={ isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 } }
          transition={ { duration: 0.8, delay: 0.8 } }
        >
          <a 
            href="/questionnaire" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
          >
            Start Your Analysis
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}