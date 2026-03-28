import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const trailRef = useRef([])
  const pos      = useRef({ x: 0, y: 0 })
  const ring     = useRef({ x: 0, y: 0 })
  const raf      = useRef(null)
  const [clicking, setClicking]   = useState(false)
  const [hovering, setHovering]   = useState(false)
  const [visible,  setVisible]    = useState(false)
  const [sparkles, setSparkles]   = useState([])

  /* ── Track mouse ── */
  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      // Hover detection
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isClickable = el?.closest('a, button, [role="button"], input, textarea, select, label, .tech-pill, .hero-btn, .nav-link, .resume-btn')
      setHovering(!!isClickable)
    }

    const onDown = (e) => {
      setClicking(true)
      spawnSparkles(e.clientX, e.clientY)
    }
    const onUp   = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [visible])

  /* ── Animate lag ring ── */
  useEffect(() => {
    const animate = () => {
      // Smooth follow with lerp
      ring.current.x += (pos.current.x - ring.current.x) * 0.13
      ring.current.y += (pos.current.y - ring.current.y) * 0.13

      if (dotRef.current) {
        dotRef.current.style.transform  = `translate(${pos.current.x}px, ${pos.current.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  /* ── Sparkle burst on click ── */
  const spawnSparkles = (x, y) => {
    const count = 8
    const newSparkles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (360 / count) * i,
    }))
    setSparkles(prev => [...prev, ...newSparkles])
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(n => n.id === s.id)))
    }, 700)
  }

  return (
    <>
      {/* Hide default cursor site-wide */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${clicking ? 'cursor-clicking' : ''} ${hovering ? 'cursor-hovering' : ''} ${visible ? 'cursor-visible' : ''}`}
      />

      {/* Outer lagging ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${clicking ? 'cursor-clicking' : ''} ${hovering ? 'cursor-hovering' : ''} ${visible ? 'cursor-visible' : ''}`}
      />

      {/* Sparkles on click */}
      {sparkles.map(s => (
        <span
          key={s.id}
          className="cursor-sparkle"
          style={{
            left: s.x,
            top:  s.y,
            '--angle': `${s.angle}deg`,
          }}
        />
      ))}
    </>
  )
}

export default CustomCursor
