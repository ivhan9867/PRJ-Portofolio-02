import { useEffect } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Projects from './components/Projects'
import About from './components/About'
import Experience from './components/Experience'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  // Smooth scroll with Lenis
  useEffect(() => {
    let lenis
    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })
        const raf = (time) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch (e) {
        console.log('Lenis not available, using native scroll')
      }
    }
    init()
    return () => { if (lenis) lenis.destroy() }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden grain">
      {/* Grain overlay via class */}
      <ParticleBackground />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <Projects />
        <About />
        <Experience />
        <Gallery />
        <Footer />
      </main>
    </div>
  )
}
