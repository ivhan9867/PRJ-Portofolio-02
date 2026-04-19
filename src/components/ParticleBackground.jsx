import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouse)

    // Particles
    const COUNT = 80
    const particles = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.05,
      color: Math.random() > 0.7 ? '#c9a84c' : '#ffffff',
    }))

    // Flowing orbs (large blobs moving slowly)
    const orbs = [
      { x: canvas.width * 0.7, y: canvas.height * 0.2, vx: 0.12, vy: 0.08, size: 380, hue: 45 },
      { x: canvas.width * 0.2, y: canvas.height * 0.7, vx: -0.08, vy: 0.1, size: 280, hue: 30 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, vx: 0.05, vy: -0.12, size: 200, hue: 50 },
    ]

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.005

      // Draw orbs
      orbs.forEach((orb, i) => {
        orb.x += orb.vx + Math.sin(t + i) * 0.15
        orb.y += orb.vy + Math.cos(t + i * 1.3) * 0.1

        if (orb.x < -orb.size) orb.x = canvas.width + orb.size
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size)
        grad.addColorStop(0, `hsla(${orb.hue}, 65%, 45%, 0.045)`)
        grad.addColorStop(0.5, `hsla(${orb.hue}, 60%, 35%, 0.02)`)
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      // Draw + connect particles
      particles.forEach((p, i) => {
        // Mouse attraction (subtle)
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx += (dx / dist) * 0.003
          p.vy += (dy / dist) * 0.003
        }

        // Dampen
        p.vx *= 0.995
        p.vy *= 0.995

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color === '#c9a84c'
          ? `rgba(201,168,76,${p.alpha})`
          : `rgba(255,255,255,${p.alpha * 0.5})`
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const ex = p.x - q.x
          const ey = p.y - q.y
          const ed = Math.sqrt(ex * ex + ey * ey)
          if (ed < 110) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            const alpha = (1 - ed / 110) * 0.06
            ctx.strokeStyle = `rgba(201,168,76,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  )
}
