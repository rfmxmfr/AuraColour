'use client'

import { motion } from 'framer-motion'
import ThemeParticles from './theme-particles'

interface ServiceHeroProps {
  title: string
  subtitle: string
  imageUrl: string
  price?: string
}

export default function ServiceHero({ title, subtitle, imageUrl, price }: ServiceHeroProps) {
  return (
    <section className="relative h-[50vh] overflow-hidden">
      <ThemeParticles particleCount={30} opacity={0.4} />
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url("${imageUrl}")`,
            filter: 'brightness(0.4)'
          }}
        />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-4 text-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl text-secondary max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle} {price && `for ${price}`}
        </motion.p>
      </div>
    </section>
  )
}