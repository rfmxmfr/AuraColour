"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import FloatingParticles from "./floating-particles"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const services = [
    {
      title: "Color Analysis",
      description: "Discover your perfect color palette with our comprehensive seasonal color analysis.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080",
      link: "/12-season-analysis"
    },
    {
      title: "Style Consultation", 
      description: "Get personalized styling advice tailored to your unique preferences and lifestyle.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
      link: "/style-consultation"
    },
    {
      title: "Virtual Wardrobe",
      description: "Transform your closet with strategic wardrobe planning and organization services.",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074",
      link: "/virtual-wardrobe-curation"
    },
    {
      title: "Personal Shopping",
      description: "Curated shopping experience tailored to your style, budget, and color palette.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
      link: "/personal-shopping-service"
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: 'var(--bg-secondary)', backdropFilter: 'blur(12px)' }}>
      <FloatingParticles particleCount={20} opacity={0.2} />
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-accent">Our Services</h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Professional styling services designed to enhance your natural beauty and boost your confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group glass-champagne rounded-lg text-center h-full transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="inline-block bg-black/80 backdrop-blur-md p-4 rounded-full mb-6 relative z-10 -mt-16" style={{boxShadow: '0 0 0 8px #F7E7CE33'}}>
                  {index === 0 && (
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="13.5" cy="6.5" fill="currentColor" r=".5" />
                      <circle cx="17.5" cy="10.5" fill="currentColor" r=".5" />
                      <circle cx="8.5" cy="7.5" fill="currentColor" r=".5" />
                      <circle cx="6.5" cy="12.5" fill="currentColor" r=".5" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
                <p className="text-secondary mb-6">{service.description}</p>
                <div className="transition-opacity duration-300">
                  <a href={service.link} className="inline-block btn-champagne px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                    Learn More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}