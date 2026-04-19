import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', s)
    return () => window.removeEventListener('scroll', s)
  }, [])

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex justify-between items-center transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.88)] backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#"
        className="font-display text-[1.05rem] text-[#f0ede8] hover:text-[#c9a84c] transition-colors duration-300"
      >
        IvhanAfika<span className="text-[#c9a84c]">.</span>
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-[0.8rem] tracking-[0.1em] uppercase text-[#6b6b6b] hover:text-[#f0ede8] transition-colors duration-300 font-body"
          >
            {l.label}
          </a>
        ))}
        <a
          href="mailto:your@email.com"
          className="px-5 py-2 rounded-full border border-[#c9a84c] text-[#c9a84c] text-[0.8rem] tracking-[0.08em] uppercase font-body hover:bg-[#c9a84c] hover:text-black transition-all duration-300"
        >
          Get in Touch
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px] cursor-none"
        onClick={() => setOpen(!open)}
        data-hover
      >
        <span className={`block h-px bg-[#f0ede8] transition-all duration-300 ${open ? 'w-6 rotate-45 translate-y-[6px]' : 'w-6'}`} />
        <span className={`block h-px bg-[#f0ede8] transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4'}`} />
        <span className={`block h-px bg-[#f0ede8] transition-all duration-300 ${open ? 'w-6 -rotate-45 -translate-y-[6px]' : 'w-5'}`} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-white/5 px-8 py-8 flex flex-col gap-6"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[1.1rem] font-display text-[#f0ede8] hover:text-[#c9a84c] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:your@email.com"
              className="self-start px-5 py-2 rounded-full border border-[#c9a84c] text-[#c9a84c] text-sm hover:bg-[#c9a84c] hover:text-black transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
