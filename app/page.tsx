"use client"

import ColorAnalysisHero from "./components/color-analysis-hero"
import Footer from "./components/footer"
import { motion as m } from "./components/framer-motion-fix"
import Gallery from "./components/gallery"
import Navbar from "./components/navbar"
import ProcessSteps from "./components/process-steps"
import { ThemeProvider } from "./contexts/ThemeContext"

export default function Page() {
  return (
    <ThemeProvider>
      <m.main 
        className="min-h-screen text-primary"
        style={ { background:  'apos;apos;var(--bg-primary))'apos;apos; } }
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        transition={ { duration: 0.5 } }
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
