import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const WORDS = ['UI/UX Design', 'Product Design', 'Visual Design', 'Interaction Design']

function RollingSlot({ words, delay = 0 }) {
  return (
    <span className="inline-flex overflow-hidden align-bottom" style={{ height: '1.2em' }}>
      <motion.span
        className="flex flex-col"
        animate={{ y: words.map((_, i) => `${-i * 100}%`) }}
        transition={{
          duration: words.length * 2.5,
          repeat: Infinity,
          ease: 'linear',
          times: words.map((_, i) => i / words.length),
          repeatType: 'loop',
        }}
        style={{ lineHeight: '1.2em' }}
      >
        {[...words, words[0]].map((w, i) => (
          <span key={i} className="block text-[#c9a84c] italic font-display" style={{ height: '1.2em', lineHeight: '1.2em' }}>
            {w}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function SplitText({ text, className, delay = 0 }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.025,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: ch === ' ' ? 'inline' : 'inline-block', transformOrigin: 'bottom' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const rotateX = useTransform(springY, [-300, 300], [4, -4])
  const rotateY = useTransform(springX, [-300, 300], [-4, 4])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const onMove = (e) => {
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end pb-16 pt-28 px-8 md:px-12 overflow-hidden z-10"
    >
      {/* Accent line top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16,1,0.3,1] }}
        className="absolute top-28 left-8 md:left-12 right-8 md:right-12 h-px bg-gradient-to-r from-[#c9a84c]/50 via-[#c9a84c]/20 to-transparent origin-left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-end">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[#c9a84c]"
          >
            <span className="block w-6 h-px bg-[#c9a84c]" />
            Front Dev & Basic Cyber Security
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[1.1] font-bold overflow-hidden"
            style={{ perspective: '800px' }}>
            <div className="overflow-hidden">
              <SplitText text="An Architect" className="" delay={0.4} />
            </div>
            <div className="overflow-hidden">
              <SplitText text="of User Minds," className="italic text-[#c9a84c]" delay={0.55} />
            </div>
            <div className="overflow-hidden">
              <SplitText text="based in Indonesia" className="text-[#f0ede8]" delay={0.7} />
            </div>
          </h1>

          {/* Desc */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="text-[#6b6b6b] text-base leading-relaxed max-w-md"
          >
            Redesigning ugly interfaces and experiences from your website or application — crafting something memorable, functional, and beautiful.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex gap-4 items-center flex-wrap"
          >
            <a
              href="mailto:your@email.com"
              data-hover
              className="px-8 py-3.5 bg-[#c9a84c] text-black rounded-full text-sm font-medium font-body hover:bg-[#e2c06b] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)]"
            >
              Contact Me
            </a>
            <a
              href="#work"
              data-hover
              className="px-8 py-3.5 border border-white/10 text-[#f0ede8] rounded-full text-sm font-body hover:border-[#c9a84c]/40 hover:-translate-y-1 transition-all duration-300"
            >
              View Work ↓
            </a>
          </motion.div>
        </div>

        {/* RIGHT — Photo + Badges */}
        <div className="flex justify-center md:justify-end items-end relative">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative"
          >
            {/* Photo frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16,1,0.3,1] }}
              className="relative w-[280px] md:w-[320px]"
            >
              {/* Glow behind */}
              <div className="absolute inset-[-30px] rounded-[200px] bg-[#c9a84c]/8 blur-[60px] pointer-events-none" />

              {/* Image container */}
              <div
                className="w-full aspect-[3/4] rounded-[160px_160px_24px_24px] overflow-hidden bg-[#1a1a1a] border border-white/8 relative"
                style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)' }}
              >
                {/* Replace with: <img src="/your-photo.jpg" className="w-full h-full object-cover" /> */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/15">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="text-xs tracking-widest uppercase text-white/20">Sini Foto Ntar</span>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Badge — years */}
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 1.4 }}
                className="absolute bottom-8 -left-10 bg-[#141414] border border-white/8 rounded-2xl p-4 backdrop-blur-xl"
                style={{ animation: 'float 5s ease-in-out infinite', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              >
                <div className="font-display text-2xl font-bold text-[#c9a84c] leading-none">6+</div>
                <div className="font-mono text-[0.65rem] text-[#6b6b6b] uppercase tracking-widest mt-1">Bulan Exp.</div>
              </motion.div>

              {/* Badge — available */}
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 1.6 }}
                className="absolute top-12 -right-8 bg-[#141414] border border-white/8 rounded-xl px-3.5 py-2.5 backdrop-blur-xl flex items-center gap-2"
                style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              >
                <span className="block w-2 h-2 rounded-full bg-[#4ade80]" style={{ animation: 'pulseDot 2s ease-in-out infinite', boxShadow: '0 0 0 0 rgba(74,222,128,0.5)' }} />
                <span className="font-body text-[0.72rem] text-[#f0ede8]">Online Status</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Rolling stat */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-8 md:left-12 hidden md:flex items-center gap-4"
      >
        <span className="font-mono text-[0.68rem] text-[#6b6b6b] tracking-widest uppercase">Expertised in</span>
        <RollingSlot words={WORDS} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-[#c9a84c]/60 to-transparent"
        />
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#6b6b6b] -rotate-90 origin-center translate-x-4">Scroll</span>
      </motion.div>
    </section>
  )
}
