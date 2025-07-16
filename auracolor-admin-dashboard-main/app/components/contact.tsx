"use client"

import { motion } from "framer-motion"
import FloatingParticles from "./floating-particles"

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-zinc-900 py-20">
      <FloatingParticles particleCount={18} opacity={0.18} />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl text-white">Get in Touch</h2>
          <p className="mb-8 text-gray-400">
            Ready to discover your perfect colors? Let's start your style transformation journey together.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="flex h-10 w-full rounded-md border border-orange-500/30 bg-black/60 backdrop-blur-md px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                name="name"
                placeholder="Your name"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="flex h-10 w-full rounded-md border border-orange-500/30 bg-black/60 backdrop-blur-md px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                name="email"
                placeholder="your@email.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="flex w-full rounded-md border border-orange-500/30 bg-black/60 backdrop-blur-md px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[120px] resize-vertical"
                name="message"
                placeholder="Tell me about your style goals..."
              />
            </div>
            <motion.button
              className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0 opacity-30">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 50 }).map((_, i) => (
            <line key={i} x1={i * 2} y1="0" x2={i * 2} y2="100" stroke="white" strokeWidth="0.1" />
          ))}
        </svg>
      </div>
      <FloatingParticles particleCount={18} opacity={0.18} />
    </section>
  )
}