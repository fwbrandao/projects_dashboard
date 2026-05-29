import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'

/**
 * Ambient neural-net particle field for the hero backdrop.
 * Fully disabled when the user prefers reduced motion.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []

    const color = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#2ff6f6'
    let dotColor = color()

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.5,
      }))
      dotColor = color()
    }
    resize()
    window.addEventListener('resize', resize)

    const hexToRgb = (hex: string) => {
      const m = hex.replace('#', '')
      const n = parseInt(m.length === 3 ? m.replace(/(.)/g, '$1$1') : m, 16)
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    }

    const draw = () => {
      const [r, g, b] = hexToRgb(dotColor)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.12 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},0.4)`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
}
