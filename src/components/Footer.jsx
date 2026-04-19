import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function AnimatedText({ text, className }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

export default function Footer() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const canvasRef = useRef(null)

  // Animated wave background for CTA
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        const amp = 18 + i * 8
        const freq = 0.008 - i * 0.001
        const phase = t + i * 1.2
        const y0 = canvas.height * (0.35 + i * 0.12)

        ctx.moveTo(0, y0)
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = y0 + Math.sin(x * freq + phase) * amp + Math.cos(x * freq * 0.5 + phase * 0.7) * (amp * 0.5)
          ctx.lineTo(x, y)
        }
        const alpha = (0.06 - i * 0.01)
        ctx.strokeStyle = `rgba(201,168,76,${alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  const socials = [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Dribbble', href: '#' },
  ]

  return (
    <>
      {/* CTA Section */}
      <section
        id="contact"
        className="relative z-10 bg-[#141414] border-t border-white/7 overflow-hidden"
        style={{ minHeight: 420 }}
      >
        {/* Wave canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-[#c9a84c]/6 rounded-full blur-[100px]" />
        </div>

        <div className="relative px-8 md:px-12 py-28 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-[#c9a84c] mb-6"
          >
            Let's Work Together
          </motion.div>

          <AnimatedText
            text="Let's Upgrade Your"
            className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.1] mb-1"
          />
          <AnimatedText
            text="Website / Application."
            className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.1] italic text-[#c9a84c] mb-10"
          />

          <motion.a
            href="mailto:your@email.com"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 bg-[#c9a84c] text-black rounded-full font-medium font-body text-base hover:bg-[#e2c06b] transition-all duration-300 hover:shadow-[0_16px_50px_rgba(201,168,76,0.4)]"
            data-hover
          >
            Contact Me
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 md:px-12 py-7 border-t border-white/7 bg-[#0a0a0a]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display text-[0.88rem] text-[#6b6b6b]">
            © Your Name 2025
          </div>
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-mono text-[0.72rem] tracking-[0.1em] uppercase text-[#6b6b6b] hover:text-[#c9a84c] transition-colors duration-300"
                data-hover
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
