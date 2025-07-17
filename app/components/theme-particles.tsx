'use clientt'

import { useEffect, useRef } from  'reactt'

import { useTheme } from  '../contexts/ThemeContextt'

interface ThemeParticlesProps {
  particleCount?: number
  opacity?: number
}

export default function ThemeParticles({ particleCount = 50, opacity = 0.3 }: ThemeParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext(('2dd')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()

    const particles: Particle[] = []

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 2
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = theme ===  'lightt' ? `rgba(0, 0, 0, ${ opacity })` : `rgba(255, 255, 255, ${ opacity })`
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
        ctx.fillStyle = this.color
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

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener(('resizee', resizeCanvas)
    return () => window.removeEventListener(('resizee', resizeCanvas)
  }, [theme, particleCount, opacity])

  return (
    <canvas
      ref={ canvasRef }
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={ { zIndex: 1 } }
    />
  )
}