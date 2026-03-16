import { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-light">Hi, I'm </span>
              <span className="hero-title-bold">Priya Sangwan</span>
            </h1>
            <h2 className="hero-subtitle">
              Passionate Full Stack Developer
            </h2>
            <p className="hero-description">
              Building digital experiences with modern technologies.
              Specializing in React, Node.js, and cloud-native applications.
            </p>

            <div className="hero-contact-info">
              <div className="hero-contact-item">
                <FaEnvelope className="contact-icon" />
                <span>sangwanpriya200@gmail.com</span>
              </div>
              <div className="hero-contact-item">
                <FaPhone className="contact-icon" />
                <span>8307538372</span>
              </div>
              <div className="hero-contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Sonepat, Haryana</span>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/priyasangwan23"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/priya-sangwan-a38037395"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/Priyaasangwan"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.youtube.com/@Priyaaa-90"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaYoutube />
              </a>
            </div>

            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-outline">
                Get In Touch
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://res.cloudinary.com/dlx4sw12g/image/upload/v1770362923/priya_pic_xwpxno.jpg"
              alt="Priya Sangwan"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero