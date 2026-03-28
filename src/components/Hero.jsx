import { useState, useEffect, useRef } from 'react'
import { FaArrowRight, FaEnvelope } from 'react-icons/fa'
import './Hero.css'

const TYPED_NAME = 'Priya Sangwan'

const Hero = () => {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [doneTyping, setDoneTyping] = useState(false)
  const indexRef = useRef(0)

  // Typewriter effect
  useEffect(() => {
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < TYPED_NAME.length) {
          setDisplayed(TYPED_NAME.slice(0, indexRef.current + 1))
          indexRef.current++
        } else {
          clearInterval(interval)
          setDoneTyping(true)
        }
      }, 80)
      return () => clearInterval(interval)
    }, 600) // small delay so page loads first
    return () => clearTimeout(delay)
  }, [])

  // Blink cursor — stop blinking after name fully typed (keep static cursor)
  useEffect(() => {
    if (doneTyping) return
    const blink = setInterval(() => setShowCursor(p => !p), 530)
    return () => clearInterval(blink)
  }, [doneTyping])

  // 3D tilt on photo
  const wrapperRef = useRef(null)
  const handleMouseMove = (e) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22
    el.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) scale(1.04)`
  }
  const handleMouseLeave = () => {
    if (wrapperRef.current)
      wrapperRef.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  return (
    <div className="hero">
      <div className="hero-bg"></div>
      <div className="hero-particles">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`particle particle-${i + 1}`}></span>
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">

            <div className="hero-badge">
              <span className="badge-dot"></span>
              Available for exciting projects
            </div>

            <h1 className="hero-title">
              <span className="hero-title-light">Hi, I'm </span>
              <span className="hero-title-bold">
                {displayed}
                <span className={`type-cursor ${doneTyping ? 'cursor-done' : ''} ${showCursor ? 'cursor-visible' : 'cursor-hidden'}`}>|</span>
              </span>
            </h1>

            <h2 className="hero-subtitle">
              <span className="role-tag">Full Stack Developer</span>
            </h2>

            <p className="hero-description">
              I craft <span className="highlight">scalable web applications</span> that
              blend elegant design with powerful functionality. Passionate about turning
              complex ideas into intuitive digital experiences using cutting-edge technologies.
            </p>

            <div className="hero-tech-stack">
              {['React', 'Node.js', 'MongoDB', 'Cloud'].map((tech) => (
                <span key={tech} className="tech-pill">{tech}</span>
              ))}
            </div>

            <div className="hero-buttons">
              <a href="#projects" className="hero-btn hero-btn-primary">
                <span className="hero-btn-bg" />
                <span className="hero-btn-content">
                  View My Work
                  <span className="hero-btn-arrow"><FaArrowRight /></span>
                </span>
                <span className="hero-btn-ripple" />
              </a>
              <a href="#contact" className="hero-btn hero-btn-ghost">
                <span className="hero-btn-border" />
                <span className="hero-btn-content">
                  <FaEnvelope className="hero-btn-icon" />
                  Get In Touch
                </span>
              </a>
            </div>

          </div>

          {/* Photo with 3D tilt */}
          <div
            className="hero-image-wrapper"
            ref={wrapperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="hero-image-ring ring-outer"></div>
            <div className="hero-image-ring ring-inner"></div>
            <div className="hero-image-glow"></div>
            <div className="hero-image">
              <img
                src="https://res.cloudinary.com/dlx4sw12g/image/upload/v1770362923/priya_pic_xwpxno.jpg"
                alt="Priya Sangwan"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hero