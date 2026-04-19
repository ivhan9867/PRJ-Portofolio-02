import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const animId = useRef(null)

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`
      }
    }
    window.addEventListener('mousemove', move)

    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x - 20) * 0.13
      ring.current.y += (pos.current.y - ring.current.y - 20) * 0.13
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      animId.current = requestAnimationFrame(lerp)
    }
    animId.current = requestAnimationFrame(lerp)

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true)
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(false)
    }
    document.addEventListener('mouseenter', onEnter, true)
    document.addEventListener('mouseleave', onLeave, true)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(animId.current)
      document.removeEventListener('mouseenter', onEnter, true)
      document.removeEventListener('mouseleave', onLeave, true)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full pointer-events-none z-[99999]"
        style={{ background: '#c9a84c', mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99998] transition-all duration-300 ${
          hovering
            ? 'w-[52px] h-[52px] border-[1.5px] border-[#c9a84c] bg-[rgba(201,168,76,0.06)]'
            : 'w-[40px] h-[40px] border border-[rgba(201,168,76,0.45)]'
        }`}
      />
    </>
  )
}
