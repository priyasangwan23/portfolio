import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Header.css'

const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      {/* Animated border line */}
      <div className="header-glow-line" />

      <nav className="navbar container">
        {/* Logo — Left */}
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <svg
            className="logo-svg"
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="PS logo"
          >
            <text
              x="19"
              y="24"
              fontFamily="'Inter', system-ui, sans-serif"
              fontWeight="900"
              fontSize="23"
              fill="#ffffff"
              textAnchor="middle"
              dominantBaseline="middle"
              letterSpacing="-0.05em"
            >
              PS
            </text>
            <circle cx="35" cy="13" r="3.5" fill="#60a5fa" />
          </svg>
        </div>

        {/* Nav Links — Center */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{ '--delay': `${index * 0.07}s` }}
            >
              <span className="nav-link-text">{item.label}</span>
              <span className="nav-link-underline" />
            </button>
          ))}
        </div>

        {/* Resume — Right */}
        <div className="nav-right">
          <a
            href="https://docs.google.com/document/d/1K8bslAiLJwXuwFyAuP0FHh5mN_k1iGyjxBxZUTIthi8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            <span className="resume-btn-shimmer" />
            <span className="resume-btn-label">Resume ↗</span>
          </a>
        </div>

        {/* Hamburger — Mobile */}
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </span>
        </button>
      </nav>
    </header>
  )
}

export default Header