import { useEffect, useRef } from 'react'
import { FaGraduationCap, FaBookOpen, FaLightbulb } from 'react-icons/fa'
import './Education.css'

const Education = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current.querySelectorAll('.edu-animate')
    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <section id="education" className="education" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title edu-animate fade-down">
          <span>Education</span> & Journey
        </h2>

        <div className="education-content">
          <div className="timeline">
            <div className="timeline-line"></div>
            
            {/* Degree Item */}
            <div className="timeline-item edu-animate slide-left">
              <div className="timeline-content">
                <span className="edu-tag">Degree</span>
                <h3 className="timeline-title">Bachelor of Computer Engineering</h3>
                <p className="timeline-subtitle">Coding Gita x Swaminarayan University</p>
                <p className="timeline-description">
                  Currently pursuing my degree in Computer Engineering with focus on 
                  software development, algorithms, and system design.
                </p>
                <div className="timeline-date mobile-only">
                  <span className="date-badge">2025 - Present</span>
                </div>
              </div>
              <div className="timeline-marker">
                <div className="marker-inner"></div>
                <div className="marker-glow"></div>
              </div>
              <div className="timeline-date desktop-only">
                <FaGraduationCap className="timeline-icon" />
                <span>2025 - Present</span>
              </div>
            </div>

            {/* Growth Item */}
            <div className="timeline-item edu-animate slide-right">
              <div className="timeline-date desktop-only">
                <FaLightbulb className="timeline-icon" />
                <span>2024 - Continuous</span>
              </div>
              <div className="timeline-marker">
                <div className="marker-inner"></div>
                <div className="marker-glow"></div>
              </div>
              <div className="timeline-content">
                <span className="edu-tag">Growth</span>
                <h3 className="timeline-title">Skills Development</h3>
                <p className="timeline-subtitle">Self-Taught Programmer</p>
                <p className="timeline-description">
                  Dedicated to mastering modern web technologies through 
                  rigorous project-based learning and research.
                </p>
                <div className="timeline-date mobile-only">
                  <span className="date-badge">Continuous</span>
                </div>
              </div>
            </div>
          </div>

          <div className="education-focus edu-animate fade-up">
            <div className="focus-header">
              <FaBookOpen className="focus-header-icon" />
              <h3 className="focus-title">Academic & Professional Focus</h3>
            </div>
            <div className="focus-grid">
              <div className="focus-column">
                <div className="column-header">
                  <div className="dot"></div>
                  <h4 className="focus-subtitle">Core Foundations</h4>
                </div>
                <ul className="focus-list">
                  <li>Data Structures & Algorithms</li>
                  <li>Database Management</li>
                  <li>System Architecture</li>
                </ul>
              </div>
              <div className="focus-column">
                <div className="column-header">
                  <div className="dot"></div>
                  <h4 className="focus-subtitle">Applied Skills</h4>
                </div>
                <ul className="focus-list">
                  <li>Full Stack Development</li>
                  <li>Clean Code Practices</li>
                  <li>UI/UX Design Logic</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education