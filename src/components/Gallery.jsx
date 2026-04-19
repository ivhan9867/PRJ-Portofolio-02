import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PHOTOS = [
  { w: 320, h: 420, label: 'Photo 01', bg: '#1a1a1a' },
  { w: 260, h: 420, label: 'Photo 02', bg: '#141a14' },
  { w: 380, h: 420, label: 'Photo 03', bg: '#1a1418' },
  { w: 300, h: 420, label: 'Photo 04', bg: '#141418' },
  { w: 360, h: 420, label: 'Photo 05', bg: '#18141a' },
  { w: 280, h: 420, label: 'Photo 06', bg: '#1a1a14' },
]

export default function Gallery() {
  const { ref: titleRef, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const scrollRef = useRef(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e) => {
    isDown.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = 'grabbing'
  }
  const onMouseLeave = () => {
    isDown.current = false
    scrollRef.current.style.cursor = 'grab'
  }
  const onMouseUp = () => {
    isDown.current = false
    scrollRef.current.style.cursor = 'grab'
  }
  const onMouseMove = (e) => {
    if (!isDown.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
  }

  return (
    <section className="relative z-10 py-20 md:py-28 overflow-hidden bg-[#141414] border-y border-white/7">
      <div className="px-8 md:px-12 mb-8" ref={titleRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[#c9a84c] mb-4">
            <span className="block w-8 h-px bg-[#c9a84c]" />
            Gallery
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold">
            Behind the Scenes
          </h2>
        </motion.div>
      </div>

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="px-8 md:px-12 mb-6"
      >
        <span className="font-mono text-[0.68rem] text-[#6b6b6b] tracking-widest uppercase flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8L22 12M22 12L18 16M22 12H6M6 4L2 8M2 8L6 12M2 8H18"/>
          </svg>
          Drag to explore
        </span>
      </motion.div>

      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex gap-4 px-8 md:px-12 overflow-x-auto select-none"
        style={{ cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PHOTOS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="flex-shrink-0 rounded-2xl overflow-hidden border border-white/7 relative group"
            style={{ width: p.w, height: p.h, background: p.bg }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/5 transition-colors duration-500 z-10" />

            {/* Placeholder content */}
            {/* Replace with: <img src={`/gallery/${i+1}.jpg`} className="w-full h-full object-cover" /> */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
              <span className="font-mono text-[0.68rem] tracking-widest uppercase text-white/15">{p.label}</span>
            </div>

            {/* Number overlay */}
            <div className="absolute top-4 left-4 font-mono text-[0.62rem] text-white/20 tracking-widest">
              {String(i + 1).padStart(2, '0')}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
