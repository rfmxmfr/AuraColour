"use client"

import { motion as m } from "./components/framer-motion-fix"
import { ThemeProvider } from "./contexts/ThemeContext"
import Navbar from "./components/navbar"
import ColorAnalysisHero from "./components/color-analysis-hero"
import Gallery from "./components/gallery"
import ProcessSteps from "./components/process-steps"
import Footer from "./components/footer"

export default function Page() {
  return (
    <ThemeProvider>
      <m.main 
        className="min-h-screen text-primary"
        style={{ background: 'var(--bg-primary)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <ColorAnalysisHero />
        <ProcessSteps />
        <Gallery />
        <Footer />
      </m.main>
    </ThemeProvider>
  )
}
