import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PROJECTS = [
  {
    id: 1,
    tag: 'Landing Page Redesign',
    name: 'NoLimitClass Landing Page',
    desc: 'E-learning platform for Indonesia\'s premier gaming creator. Strategic visual overhaul moving away from generic templates to a custom, immersive gaming experience.',
    label: 'NLC',
    color: '#1a1a2e',
    accent: '#4f46e5',
    featured: true,
  },
  {
    id: 2,
    tag: 'UX Redesign',
    name: 'Logitech MXFest',
    desc: 'Redesign focused on improving UX, increasing sign-ups, and driving engagement with a gamified rewards system.',
    label: 'LGT',
    color: '#0a1a0a',
    accent: '#22c55e',
  },
  {
    id: 3,
    tag: 'Mobile App',
    name: 'Plans: Women\'s Health App',
    desc: 'Comprehensive app empowering women throughout their reproductive journey with personalized tools and expert guidance.',
    label: 'PLN',
    color: '#1a0a1a',
    accent: '#ec4899',
  },
  {
    id: 4,
    tag: 'Coming Soon',
    name: 'GoVirtual Mobile Redesign',
    desc: 'UX design for an immersive VR application introducing Indonesia through next-gen experiences.',
    label: 'VR',
    color: '#0a0f1a',
    accent: '#06b6d4',
    comingSoon: true,
  },
]

function TiltCard({ project, index, featured }) {
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])
  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { mouseX.set(0); mouseY.set(0) }

  const { ref: inViewRef, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={(el) => { ref.current = el; inViewRef(el) }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '800px' }}
      className={`relative group cursor-none ${featured ? 'col-span-2' : ''}`}
      data-hover
    >
      <motion.div
        className="relative rounded-2xl border border-white/7 bg-[#141414] overflow-hidden h-full"
        whileHover={{ borderColor: 'rgba(201,168,76,0.35)' }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: '0 0 0 0 rgba(201,168,76,0)' }}
      >
        {/* Moving spotlight on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(300px circle at ${glowX} ${glowY}, rgba(201,168,76,0.07), transparent 70%)`,
          }}
        />

        {/* Thumbnail */}
        <div
          className={`relative overflow-hidden ${featured ? 'h-56 md:h-72' : 'h-44'}`}
          style={{ background: project.color }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(circle at 60% 40%, ${project.accent}, transparent 65%)` }}
          />
          {/* Animated grid lines */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(${project.accent}33 1px, transparent 1px), linear-gradient(90deg, ${project.accent}33 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-[5rem] md:text-[7rem] font-bold opacity-[0.06] select-none"
              style={{ color: project.accent }}
            >
              {project.label}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

          {/* Replace with actual project image: */}
          {/* <img src={`/projects/${project.id}.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> */}
        </div>

        {/* Info */}
        <div className="p-6 md:p-8">
          <span
            className="inline-block text-[0.68rem] tracking-[0.12em] uppercase px-3 py-1 rounded-full border mb-3"
            style={{ color: project.accent, borderColor: `${project.accent}33`, background: `${project.accent}11` }}
          >
            {project.tag}
          </span>
          <h3 className="font-display text-xl font-bold mb-2">{project.name}</h3>
          <p className="text-[#6b6b6b] text-sm leading-relaxed mb-5">{project.desc}</p>
          {project.comingSoon ? (
            <span className="text-sm text-[#6b6b6b] italic">Coming Soon</span>
          ) : (
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#c9a84c] hover:gap-4 transition-all duration-300 font-body"
              data-hover
            >
              View case study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="work" className="relative z-10 px-8 md:px-12 py-24 md:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[#c9a84c] mb-4">
          <span className="block w-8 h-px bg-[#c9a84c]" />
          My Works
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold">
          Projects I've Done
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.id} project={p} index={i} featured={p.featured} />
        ))}
      </div>
    </section>
  )
}
