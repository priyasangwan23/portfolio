import { useEffect, useRef, useState, useCallback } from 'react'
import {
  FaCalendarCheck,
  FaCartShopping,
  FaBuildingColumns,
  FaShieldHalved,
  FaCode,
  FaSeedling,
  FaRoute,
  FaPalette,
  FaTerminal,
  FaPuzzlePiece,
  FaGhost,
  FaGamepad
} from "react-icons/fa6";
import './Projects.css'

/* ── 3-D tilt on mouse-move ───────────────────────────────── */
const useTilt = () => {
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5   // -0.5 → 0.5
    const y = (e.clientY - top)  / height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)`
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
  }, [])

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

/* ── Single project tile ──────────────────────────────────── */
const ProjectTile = ({ project, index, activeVideo, setActiveVideo }) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt()

  return (
    <div
      ref={ref}
      className={`pt delay-${index % 5}${project.featured ? ' pt--featured' : ''}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* shimmer sweep */}
      <div className="pt-shimmer" />
      {/* animated border glow */}
      <div className="pt-border" />

      {/* header row */}
      <div className="pt-top">
        <span className="pt-icon">{project.icon}</span>
        <div className="pt-meta">
          <h3 className="pt-title">{project.title}</h3>
          <span className="pt-num">#{String(index + 1).padStart(2, '0')}</span>
        </div>
        {project.badge && <span className="pt-badge">{project.badge}</span>}
      </div>

      {/* description */}
      <p className="pt-desc">{project.description}</p>

      {/* video thumbnail */}
      {project.videoId && (
        <div className="pt-video">
          {activeVideo === index ? (
            <iframe
              className="pt-iframe"
              src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
              title={`${project.title} demo`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              className="pt-thumb-btn"
              onClick={() => setActiveVideo(index)}
              aria-label="Play demo video"
            >
              <img
                src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                alt="demo thumbnail"
                className="pt-thumb-img"
              />
              <div className="pt-play">
                <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="pt-play-label">Watch Demo</span>
            </button>
          )}
        </div>
      )}

      {/* static image thumbnail */}
      {!project.videoId && project.image && (
        <div className="pt-video">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="pt-thumb-img"
            style={{ filter: 'brightness(0.85)', cursor: 'default' }}
          />
        </div>
      )}

      {/* tags */}
      <div className="pt-tags">
        {project.tags.map((tag, i) => (
          <span key={i} className="pt-tag">{tag}</span>
        ))}
      </div>

      {/* action row */}
      <div className="pt-actions">
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="pt-btn pt-btn--solid">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Live Demo
        </a>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="pt-btn pt-btn--ghost">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  )
}

const projects = [
  // WITH VIDEO DEMOS
  {
    title: "Calendly Clone",
    description: "Full-featured scheduling app — book meetings, manage availability & sync calendars.",
    link: "https://priya-calendly-clone.netlify.app",
    github: "https://github.com/priyasangwan23",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "clones",
    icon: <FaCalendarCheck />,
    featured: true,
    videoId: "Jt_pGGo2rcs",
    badge: "Featured",
  },
  {
    title: "Flipkart Clone",
    description: "E-commerce clone with product listings, cart & responsive shopping UI.",
    link: "https://priya-flipcart-clone.netlify.app",
    github: "https://github.com/priyasangwan23/Projects/tree/main/Flipcart%20clone",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "clones",
    icon: <FaCartShopping />,
    videoId: "axLChJO5xdA",
  },
  {
    title: "MakerDao Clone",
    description: "Sleek DeFi platform clone showcasing Web3 UI aesthetics & decentralized finance.",
    link: "https://priya-makerdao-clone.netlify.app",
    github: "https://github.com/priyasangwan23/Projects/tree/main/MakerDao",
    tags: ["HTML", "CSS", "Web3 UI"],
    category: "clones",
    icon: <FaBuildingColumns />,
    videoId: "NOtO7EHXQUE",
  },
  {
    title: "Policy Bazaar Clone",
    description: "Insurance marketplace clone with comparison cards & multi-step navigation.",
    link: "https://exquisite-gingersnap-6e6e4c.netlify.app",
    github: "https://github.com/priyasangwan23/Projects/tree/main/clone-policy%20bazaar",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "clones",
    icon: <FaShieldHalved />,
    videoId: "7PuzKDKpX0E",
  },
  {
    title: "Codepen Clone",
    description: "In-browser code editor with live HTML/CSS/JS preview & split-pane interface.",
    link: "https://priya-codepen-clone.netlify.app",
    github: "https://github.com/priyasangwan23/Projects/tree/main/codepen",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "clones",
    icon: <FaCode />,
    videoId: "zUL4Kl9PUwo",
  },
  {
    title: "KiwiKisaan Clone",
    description: "Agri-tech platform clone connecting farmers with markets via a clean modern UI.",
    link: "https://priya-kiwi-kisaan-clone.netlify.app",
    github: "https://github.com/priyasangwan23/Projects/tree/main/kiwi%20kisan",
    tags: ["HTML", "CSS", "AgriTech"],
    category: "clones",
    icon: <FaSeedling />,
    videoId: "D48R9AQi8iA",
  },

  // WITHOUT VIDEO DEMOS
  {
    title: "Routing Project",
    description: "Dynamic routing with nested pages, seamless navigation & real API integration.",
    link: "https://priya-routing-project.netlify.app",
    github: "https://github.com/priyasangwan23",
    tags: ["React", "React Router", "API"],
    category: "react",
    icon: <FaRoute />,
    image: "https://www.themealdb.com/images/media/meals/0s80wo1764374393.jpg",
  },
  {
    title: "Stranger Things",
    description: "Fan-based web experience with atmospheric animations & eerie UI design.",
    link: "https://priya-stranger-things.netlify.app",
    github: "https://github.com/priyasangwan23/stranger-things",
    tags: ["React", "API", "Entertainment"],
    category: "react",
    icon: <FaGhost />,
    image: "https://www.brit.co/media-library/stranger-things-season-5-part-1-ending-will-byers-season-5.jpg?id=62260753&width=400&height=208",
  },
  {
    title: "Drawing App",
    description: "Canvas-based app for freehand drawing, shape tools & color palettes.",
    link: "https://github.com/priyasangwan23/My-Projects/tree/main/Drawing%20App",
    github: "https://github.com/priyasangwan23/My-Projects/tree/main/Drawing%20App",
    tags: ["Canvas API", "JavaScript", "UI/UX"],
    category: "js",
    icon: <FaPalette />,
  },
  {
    title: "Terminal Landing Page",
    description: "Creative terminal-style landing page with typewriter effects & CLI aesthetics.",
    link: "https://github.com/priyasangwan23/My-Projects/tree/main/Terminal%20style%20landing%20page",
    github: "https://github.com/priyasangwan23/My-Projects/tree/main/Terminal%20style%20landing%20page",
    tags: ["Creative", "JavaScript", "Terminal"],
    category: "js",
    icon: <FaTerminal />,
  },
  {
    title: "Chrome Extensions",
    description: "Productivity-boosting browser extensions that enhance everyday workflows.",
    link: "https://github.com/priyasangwan23/Extensions",
    github: "https://github.com/priyasangwan23/Extensions",
    tags: ["Chrome API", "JavaScript", "Browser"],
    category: "js",
    icon: <FaPuzzlePiece />,
  },
  {
    title: "Mini Games",
    description: "Fun interactive browser games built with vanilla JS & Canvas API.",
    link: "https://github.com/priyasangwan23/Games",
    github: "https://github.com/priyasangwan23/Games",
    tags: ["Games", "JavaScript", "Canvas"],
    category: "js",
    icon: <FaGamepad />,
  },
]


/* ── Main section ─────────────────────────────────────────── */
const Projects = () => {
  const sectionRef = useRef(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const els = sectionRef.current.querySelectorAll('.animate-on-scroll')
    els.forEach(el => observer.observe(el))
    return () => els.forEach(el => observer.unobserve(el))
  }, [])

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'react', label: 'React & Fullstack' },
    { id: 'clones', label: 'Clones (HTML/CSS)' },
    { id: 'js', label: 'JavaScript & Creative' }
  ]

  return (
    <section className="projects" ref={sectionRef} id="projects">
      <div className="container">
        <h2 className="section-title animate-on-scroll fade-down">
          My <span>Projects</span>
        </h2>
        <p className="projects-subtitle animate-on-scroll fade-up">
          Ideas turned into real-world applications
        </p>

        {/* Filter Tabs */}
        <div className="projects-filters animate-on-scroll fade-up">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              {activeCategory === cat.id && <span className="filter-dot"></span>}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={`${activeCategory}-${index}`} 
              className="animate-on-scroll visible fade-up"
              style={{ '--item-delay': `${(index % 3) * 0.1}s` }}
            >
              <ProjectTile
                project={project}
                index={index}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects