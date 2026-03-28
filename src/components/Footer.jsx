import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <svg
              className="logo-svg"
              width="36"
              height="36"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Priya logo"
            >
              <defs>
                <radialGradient id="footerLogoGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="footerPGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <filter id="footerGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle cx="21" cy="21" r="20" fill="url(#footerLogoGlow)" />
              <circle
                cx="21"
                cy="21"
                r="19"
                stroke="url(#footerPGrad)"
                strokeWidth="1"
                strokeDasharray="12 4"
                strokeLinecap="round"
                opacity="0.6"
                className="logo-ring"
              />
              <circle cx="21" cy="21" r="16" stroke="url(#footerPGrad)" strokeWidth="0.6" opacity="0.25" />
              <text
                x="19"
                y="24"
                fontFamily="'Inter', 'Segoe UI', sans-serif"
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
          
          <p className="footer-description">
            Passionate Full Stack Developer crafting digital experiences with modern technologies.
          </p>
          
          <div className="footer-social">
            <a
              href="https://github.com/priyasangwan23"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/priya-sangwan-a38037395"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/Priyaasangwan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/@Priyaaa-90"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaYoutube />
            </a>
          </div>
          
          <div className="footer-contact">
            <a href="mailto:sangwanpriya200@gmail.com">sangwanpriya200@gmail.com</a>
            <span className="separator">•</span>
            <a href="tel:8307538372">+91 8307538372</a>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">
              &copy; {currentYear} Priya Sangwan. All rights reserved.
            </p>
            <p className="location">
              Based in Sonepat, Haryana
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer