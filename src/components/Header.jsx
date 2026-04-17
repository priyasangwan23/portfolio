import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Header.css'

const Header = ({ activeSection }) => {
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
    { id: 'designs', label: 'Designs' },
    { id: 'education', label: 'Education' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      {/* Animated border line */}
      <div className="header-glow-line" />

      <nav className="navbar container">
        {/* Logo — Left */}
        <Link className="nav-logo" to="/" onClick={() => setIsMenuOpen(false)}>
          <div className="logo-image-wrapper">
            <img
              src="https://res.cloudinary.com/dlx4sw12g/image/upload/v1770362923/priya_pic_xwpxno.jpg"
              alt="Priya Sangwan"
              className="logo-img"
            />
            <div className="logo-ring"></div>
          </div>
        </Link>

        {/* Nav Links — Center */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <NavLink
              key={item.id}
              to={item.id === 'home' ? '/' : `/${item.id}`}
              onClick={handleNavClick}
              // Rely purely on activeSection for the visual 'active' state to stay perfectly synced with scroll
              className={() => `nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{ '--delay': `${index * 0.07}s` }}
            >
              <span className="nav-link-text">{item.label}</span>
              <span className="nav-link-underline" />
            </NavLink>
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