'apos;use clientt'apos;apos;

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function CTASection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={ canvasRef } className="absolute inset-0 h-full w-full bg-black" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h2
          className="text-lg md:text-xl text-gray-300 mb-4"
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.8 } }
        >
          Ready to Transform Your Style?
        </motion.h2>
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6"
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.8, delay: 0.2 } }
        >
          Start Your
          <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Color Journey
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.8, delay: 0.4 } }
        >
          Join thousands who have discovered their perfect palette and transformed their confidence through color.
        </motion.p>
        <motion.button
          className="py-4 px-8 rounded-full text-white text-lg font-semibold relative backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group"
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.8, delay: 0.6 } }
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">Get Started Today</span>
          <span className="ml-2 text-sm bg-purple-500 text-white px-2 py-1 rounded relative z-10">NEW</span>
        </motion.button>
      </div>
    </div>
  )
}