import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const JOBS = [
  {
    role: 'Design Lead',
    company: 'Your Company Name',
    period: 'Nov 2023 — Present',
    desc: 'Leading design initiatives, establishing design systems, and mentoring junior designers to produce high-quality product experiences.',
    tags: ['Design System', 'Leadership', 'Product Strategy'],
    current: true,
  },
  {
    role: 'Freelance Designer',
    company: '@yourinstagram',
    period: 'Jun 2020 — Present',
    desc: 'Working with clients across Indonesia and internationally, delivering UI/UX design for mobile apps, websites, and brand identities.',
    tags: ['UI/UX', 'Branding', 'Mobile'],
  },
  {
    role: 'UI/UX Designer',
    company: 'PT. Company Indonesia',
    period: 'Dec 2021 — Oct 2022',
    desc: 'Designed user interfaces for enterprise applications, collaborating closely with developers and product managers.',
    tags: ['Enterprise', 'Web App', 'Research'],
  },
  {
    role: 'Visual Designer',
    company: 'PT. Company Indonesia',
    period: 'Jul 2019 — Mar 2021',
    desc: 'Created visual assets and brand materials for digital and print media campaigns.',
    tags: ['Visual Design', 'Print', 'Branding'],
  },
]

function ExpItem({ job, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-10 py-8 border-b border-white/7 group relative"
    >
      {/* Vertical line on hover */}
      <motion.div
        className="hidden md:block absolute left-[172px] top-0 bottom-0 w-px bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/20 transition-colors duration-500"
      />

      <div className="flex md:flex-col gap-3 md:gap-1 items-start">
        {job.current && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] text-[#4ade80] tracking-wider uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
            Current
          </span>
        )}
        <span className="font-mono text-[0.72rem] text-[#6b6b6b] tracking-wide">{job.period}</span>
      </div>

      <div>
        <h3 className="font-display text-[1.15rem] font-bold mb-1 group-hover:text-[#c9a84c] transition-colors duration-300">
          {job.role}
        </h3>
        <div className="text-[#c9a84c] text-sm mb-3 font-body">{job.company}</div>
        <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">{job.desc}</p>
        <div className="flex flex-wrap gap-2">
          {job.tags.map(t => (
            <span key={t} className="text-[0.68rem] px-2.5 py-1 rounded-full border border-white/8 text-[#6b6b6b]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" className="relative z-10 px-8 md:px-12 py-24 md:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[#c9a84c] mb-4">
          <span className="block w-8 h-px bg-[#c9a84c]" />
          Career
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold">
          Experience
        </h2>
      </motion.div>

      {/* Top border */}
      <div className="border-t border-white/7">
        {JOBS.map((job, i) => (
          <ExpItem key={i} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
