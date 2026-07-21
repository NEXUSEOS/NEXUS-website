import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  opacity: number
  seed: number
}

function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random(),
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.1 - 0.05,
    size: 0.5 + Math.random() * 2,
    opacity: 0.15 + Math.random() * 0.5,
    seed: Math.random() * Math.PI * 2,
  }))
}

function particleCount(): number {
  if (typeof window === 'undefined') return 120
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return 0
  const budget = getComputedStyle(document.documentElement).getPropertyValue('--cx-particle-budget').trim()
  if (budget) {
    const parsed = parseInt(budget, 10)
    if (!Number.isNaN(parsed)) return parsed
  }
  const w = window.innerWidth
  if (w < 640) return 80
  if (w < 1024) return 140
  return 220
}

/**
 * Lightweight 2D canvas particle field for GitHub Pages shim mode.
 * GPU-friendly requestAnimationFrame loop with depth fog and mouse interaction.
 */
export default function ParticleFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let particles = createParticles(particleCount(), canvas.width, canvas.height)
    let frameId = 0
    let time = 0

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(particleCount(), w, h)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      }
    }

    function onMouseLeave() {
      mouseRef.current.active = false
    }

    function draw() {
      const w = canvas!.width / (window.devicePixelRatio || 1)
      const h = canvas!.height / (window.devicePixelRatio || 1)
      time += 0.016

      ctx!.clearRect(0, 0, w, h)

      // Depth fog gradient
      const fog = ctx!.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.5, w * 0.8)
      fog.addColorStop(0, 'rgba(201, 184, 150, 0.03)')
      fog.addColorStop(1, 'rgba(5, 5, 5, 0)')
      ctx!.fillStyle = fog
      ctx!.fillRect(0, 0, w, h)

      const mouse = mouseRef.current

      for (const p of particles) {
        p.x += p.vx * (0.5 + p.z)
        p.y += p.vy * (0.5 + p.z)

        // Mouse repulsion
        if (mouse.active) {
          const mx = mouse.x * w
          const my = mouse.y * h
          const dx = p.x - mx
          const dy = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          if (dist < 120) {
            const force = (120 - dist) / 120 * 0.02 * p.z
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const twinkle = 0.5 + 0.5 * Math.sin(time * 1.5 + p.seed)
        const depthScale = 0.4 + p.z * 0.8
        const alpha = p.opacity * depthScale * twinkle
        const size = p.size * depthScale

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(201, 184, 150, ${alpha})`
        ctx!.fill()

        // Bloom on bright particles
        if (twinkle > 0.85 && p.z > 0.6) {
          ctx!.beginPath()
          ctx!.arc(p.x, p.y, size * 3, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(201, 184, 150, ${alpha * 0.15})`
          ctx!.fill()
        }
      }

      frameId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="aether-shim-canvas" aria-hidden="true" />
}
