"use client"

import { motion as m, motion } from "./components/framer-motion-fix"
import ClientProvider from "./components/client-provider"
import { ThemeProvider } from "./contexts/ThemeContext"
import Navbar from "./components/navbar"
import ColorAnalysisHero from "./components/color-analysis-hero"
import Gallery from "./components/gallery"
import ProcessSteps from "./components/process-steps"
import Contact from "./components/contact"
import Footer from "./components/footer"
import ThemeParticles from "./components/theme-particles"

export default function Page() {
  return (
    <ThemeProvider>
      <ClientProvider>
        <m.main 
          className="min-h-screen text-primary"
          style={{ background: 'var(--bg-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
      <Navbar />
      <ColorAnalysisHero />
      
      <section className="relative h-[50vh] overflow-hidden -mt-16">
        <ThemeParticles particleCount={30} opacity={0.4} />
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: 'url("https://photos.fife.usercontent.google.com/pw/AP1GczMl5615TjmR0ZoYdq4j_gOlGW405GJPdyd7XLoGTEORh6A04x5niMwD3w=w1576-h1576-s-no-gm?authuser=0")',
              filter: 'brightness(0.4)'
            }}
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-accent shadow-lg"
            style={{ backgroundColor: 'var(--champagne-primary)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </section>
      
      <ProcessSteps />
      <Gallery />
      <div className="hidden">
        <Contact />
      </div>
      <Footer />
        </m.main>
      </ClientProvider>
    </ThemeProvider>
  )
}
