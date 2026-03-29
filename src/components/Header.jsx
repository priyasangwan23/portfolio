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
          <div className="logo-image-wrapper">
            <img
              src="https://res.cloudinary.com/dlx4sw12g/image/upload/v1770362923/priya_pic_xwpxno.jpg"
              alt="Priya Sangwan"
              className="logo-img"
            />
            <div className="logo-ring"></div>
          </div>
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
          
          {/* Mobile-only Resume Button inside menu */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn mobile-only"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="resume-btn-shimmer" />
            <span className="resume-btn-label">Resume ↗</span>
          </a>
        </div>

        {/* Resume — Right (Desktop only) */}
        <div className="nav-right desktop-only">
          <a
            href="/resume.pdf"
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