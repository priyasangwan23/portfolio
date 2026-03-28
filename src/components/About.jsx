import { useEffect, useRef } from 'react'
import { FaCode, FaGraduationCap, FaGlobe } from 'react-icons/fa'
import './About.css'

const stats = [
  { number: '10+', label: 'Projects', sublabel: 'Shipped' },
  { number: '10+', label: 'Technologies', sublabel: 'Mastered' },
  { number: '24/7', label: 'Learning', sublabel: 'Mindset' },
]

const traits = [
  { icon: <FaCode />,         title: 'My Background',       text: 'Started with C & C++, evolved into a versatile Full Stack Developer mastering the MERN stack and modern web architectures.' },
  { icon: <FaGraduationCap />, title: 'Continuous Learning', text: 'Technology evolves fast, and so do I. A 24/7 learner always exploring emerging tech, new frameworks, and better patterns.' },
  { icon: <FaGlobe />,        title: 'Beyond Coding',       text: 'Open-source contributor, community content creator, and collaborator — building impactful products, one idea at a time.' },
]

const tags = ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 'REST APIs', 'Git', 'Tailwind', 'Cloud']

const About = () => {
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
      { threshold: 0.12 }
    )
    const els = sectionRef.current.querySelectorAll('.animate-on-scroll')
    els.forEach(el => observer.observe(el))
    return () => els.forEach(el => observer.unobserve(el))
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">

        {/* ── Section header ── */}
        <div className="about-header animate-on-scroll fade-down">
          <span className="about-eyebrow">Get to know me</span>
          <h2 className="section-title"><span>About</span> Me</h2>
        </div>

        {/* ── Main split layout ── */}
        <div className="about-split">

          {/* ════ LEFT — narrative timeline ════ */}
          <div className="about-left">
            {traits.map((t, i) => (
              <div
                key={t.title}
                className={`about-timeline-item animate-on-scroll slide-left`}
                style={{ '--item-delay': `${i * 0.13}s` }}
              >
                {/* Connector line + node */}
                <div className="timeline-track">
                  <div className="timeline-node">
                    <span className="timeline-icon">{t.icon}</span>
                  </div>
                  {i < traits.length - 1 && <div className="timeline-line" />}
                </div>

                {/* Content */}
                <div className="timeline-content">
                  <h3 className="timeline-title">{t.title}</h3>
                  <p className="timeline-text">{t.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ════ RIGHT — stats + tags ════ */}
          <div className="about-right">

            {/* Floating stat rings */}
            <div className="about-stats animate-on-scroll slide-right">
              {stats.map((s, i) => (
                <div key={s.label} className="stat-orbit" style={{ '--i': i }}>
                  <div className="stat-ring">
                    <svg className="stat-svg" viewBox="0 0 100 100">
                      <circle className="stat-track" cx="50" cy="50" r="42" />
                      <circle
                        className="stat-fill"
                        cx="50" cy="50" r="42"
                        strokeDasharray="264"
                        strokeDashoffset={264 - 264 * (0.55 + i * 0.15)}
                        style={{ '--delay': `${i * 0.2}s` }}
                      />
                    </svg>
                    <div className="stat-inner">
                      <span className="stat-number">{s.number}</span>
                      <span className="stat-label">{s.label}</span>
                      <span className="stat-sublabel">{s.sublabel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill tag cloud */}
            <div className="about-tags animate-on-scroll fade-up">
              <p className="tags-heading">// tech I work with</p>
              <div className="tags-cloud">
                {tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="about-tag"
                    style={{ '--tag-delay': `${i * 0.06}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative glow orb */}
            <div className="about-glow-orb" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default About