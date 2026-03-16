import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span>&lt;</span>Priya<span> /&gt;</span>
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