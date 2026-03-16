import { FaGraduationCap } from 'react-icons/fa'
import './Education.css'

const Education = () => {
  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">
          <span>Education</span> & Background
        </h2>

        <div className="education-content">
          <div className="timeline">
            <div className="timeline-line"></div>
            
            <div className="timeline-item">
              <div className="timeline-content">
                <h3 className="timeline-title">Bachelor of Computer Engineering</h3>
                <p className="timeline-subtitle">Coding Gita x Swaminarayan University</p>
                <p className="timeline-description">
                  Currently pursuing my degree in Computer Engineering with focus on 
                  software development, algorithms, and system design.
                </p>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-date">
                <FaGraduationCap className="timeline-icon" />
                <span>2025 - Present</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-date mobile-only">
                <span>Continuous Learning</span>
              </div>
              <div className="timeline-content">
                <h3 className="timeline-title">Skills Development</h3>
                <p className="timeline-subtitle">Self-Taught Programmer</p>
                <p className="timeline-description">
                  Continuously learning and mastering new technologies through 
                  online courses, documentation, and building real-world projects.
                </p>
              </div>
              <div className="timeline-date desktop-only">
                <span>Continuous Learning</span>
              </div>
            </div>
          </div>

          <div className="education-focus card">
            <h3 className="focus-title">Academic Focus</h3>
            <div className="focus-grid">
              <div className="focus-column">
                <h4 className="focus-subtitle">Core Subjects</h4>
                <ul className="focus-list">
                  <li>Data Structures & Algorithms</li>
                  <li>Database Management Systems</li>
                  <li>Operating Systems</li>
                  <li>Computer Networks</li>
                </ul>
              </div>
              <div className="focus-column">
                <h4 className="focus-subtitle">Current Focus</h4>
                <ul className="focus-list">
                  <li>Full Stack Development</li>
                  <li>Cloud Computing</li>
                  <li>DevOps Practices</li>
                  <li>System Design</li>
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