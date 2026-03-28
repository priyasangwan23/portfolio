import { useEffect, useRef } from 'react'
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaGithub, FaCode 
} from 'react-icons/fa'
import { SiMongodb, SiPostman, SiExpress, SiCplusplus } from 'react-icons/si'
import './Skills.css'

const Skills = () => {
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

    const elements = sectionRef.current.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => elements.forEach((el) => observer.unobserve(el))
  }, [])

  const skills = [
    { icon: <FaHtml5 />, name: 'HTML5', color: '#E34F26', orbit: 'inner', angle: 0 },
    { icon: <FaCss3Alt />, name: 'CSS3', color: '#1572B6', orbit: 'inner', angle: 90 },
    { icon: <FaJs />, name: 'JavaScript', color: '#F7DF1E', orbit: 'inner', angle: 180 },
    { icon: <FaReact />, name: 'React', color: '#61DAFB', orbit: 'inner', angle: 270 },
    
    { icon: <FaNodeJs />, name: 'Node.js', color: '#339933', orbit: 'middle', angle: 45 },
    { icon: <SiExpress />, name: 'Express', color: '#ffffff', orbit: 'middle', angle: 135 },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248', orbit: 'middle', angle: 225 },
    { icon: <SiCplusplus />, name: 'C++', color: '#00599C', orbit: 'middle', angle: 315 },
    
    { icon: <FaGitAlt />, name: 'Git', color: '#F05032', orbit: 'outer', angle: 22.5 },
    { icon: <FaGithub />, name: 'GitHub', color: '#ffffff', orbit: 'outer', angle: 112.5 },
    { icon: <SiPostman />, name: 'Postman', color: '#FF6C37', orbit: 'outer', angle: 202.5 },
    { icon: <FaDatabase />, name: 'SQL', color: '#336791', orbit: 'outer', angle: 292.5 },
  ]

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title animate-on-scroll fade-down">
          Tech <span>Galaxy</span>
        </h2>
        
        <div className="galaxy-container animate-on-scroll fade-up">
          <div className="galaxy-center">
            <div className="core-glow"></div>
            <div className="core-icon"><FaCode /></div>
          </div>
          
          <div className="orbit orbit-inner"></div>
          <div className="orbit orbit-middle"></div>
          <div className="orbit orbit-outer"></div>
          
          <div className="skills-floating">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`skill-orbit-node node-orbit-${skill.orbit}`}
                style={{ 
                  '--angle': `${skill.angle}deg`,
                  '--color': skill.color,
                  '--delay': `${index * 0.1}s`
                }}
              >
                <div className="skill-node-inner">
                  <div className="skill-node-icon">{skill.icon}</div>
                  <span className="skill-node-name">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills