"use client"

import { motion as m } from "./components/framer-motion-fix"
import ClientProvider from "./components/client-provider"
import { ThemeProvider } from "./contexts/ThemeContext"
import Navbar from "./components/navbar"
import ColorAnalysisHero from "./components/color-analysis-hero"
import Gallery from "./components/gallery"
import ProcessSteps from "./components/process-steps"
import Contact from "./components/contact"
import Footer from "./components/footer"

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
