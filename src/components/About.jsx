import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SLOTS = {
  expertise: ['UI/UX Design', 'Product Design', 'Visual Design', 'Interaction'],
  years: ['6+ years', '50+ projects', '10+ clients', '6+ years'],
  role: ['Lead Designer', 'Freelancer', 'Consultant', 'Lead Designer'],
  quality: ['Intuitive Interfaces', 'Engaging Products', 'Bold Visuals', 'Clean Systems'],
}

function SlotMachine({ words, delay = 0 }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % words.length)
    }, 2500 + delay * 300)
    return () => clearInterval(t)
  }, [words, delay])

  return (
    <span className="inline-flex overflow-hidden align-bottom relative" style={{ height: '1.25em' }}>
      {words.map((w, i) => (
        <motion.span
          key={w}
          initial={{ y: '100%', opacity: 0 }}
          animate={i === idx ? { y: '0%', opacity: 1 } : { y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 italic text-[#c9a84c] font-display whitespace-nowrap"
          style={{ lineHeight: '1.25em' }}
        >
          {w}
        </motion.span>
      ))}
      {/* Invisible spacer for width */}
      <span className="invisible font-display whitespace-nowrap" style={{ lineHeight: '1.25em' }}>
        {words.reduce((a, b) => a.length > b.length ? a : b)}
      </span>
    </span>
  )
}

const SKILLS = [
  'UX Design', 'UI Design', 'Product Design', 'User Empathy',
  'Design Systems', 'Front-End Dev', 'Critical Thinking',
  'Problem Solving', 'Interaction Design', 'Usability Testing',
  'Prototyping', 'Mentoring', 'No-Code', 'Visual Design', 'Figma',
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      id="about"
      className="relative z-10 bg-[#141414] border-y border-white/7 px-8 md:px-12 py-24 md:py-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24">
        {/* LEFT sticky */}
        <div className="md:sticky md:top-28 h-fit" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[#c9a84c] mb-4">
              <span className="block w-8 h-px bg-[#c9a84c]" />
              About Me
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold mb-6">
              Who I am
            </h2>
            <p className="text-[#6b6b6b] text-[0.95rem] leading-relaxed border-l-2 border-[#c9a84c] pl-5 mb-8">
              A passionate UI/UX Designer with 6+ years of experience. I bridge the gap between beautiful design and functional, user-centered products that people love to use.
            </p>

            {/* Skills cloud */}
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ borderColor: '#c9a84c', color: '#c9a84c', y: -2 }}
                  className="px-3.5 py-1.5 rounded-full border border-white/10 text-[#6b6b6b] text-[0.78rem] cursor-none transition-colors duration-200"
                  data-hover
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — rolling lines */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          {/* Line 1 */}
          <div className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.3] flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-[#6b6b6b]">Expertised in</span>
            <SlotMachine words={SLOTS.expertise} delay={0} />
          </div>

          {/* Line 2 */}
          <div className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.3] flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-[#6b6b6b]">with over</span>
            <SlotMachine words={SLOTS.years} delay={1} />
            <span className="text-[#6b6b6b]">of experience.</span>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-[#c9a84c]/30 my-2" />

          {/* Line 3 */}
          <div className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.3] flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-[#6b6b6b]">Specializing in crafting</span>
          </div>
          <div className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.3] flex flex-wrap items-end gap-x-3 gap-y-1">
            <SlotMachine words={SLOTS.quality} delay={2} />
          </div>
          <div className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-[1.3] text-[#6b6b6b]">
            that are aesthetic and implementable.
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-[#c9a84c]/30 my-2" />

          {/* Line 4 */}
          <div className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.3] flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-[#6b6b6b]">Currently works as</span>
            <SlotMachine words={SLOTS.role} delay={3} />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/7">
            {[
              { num: '1+', label: 'Years Experience' },
              { num: '50+', label: 'Projects Done' },
              { num: '20+', label: 'Happy Clients' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <div className="font-display text-3xl font-bold text-[#c9a84c] mb-1">{s.num}</div>
                <div className="font-mono text-[0.68rem] text-[#6b6b6b] uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
