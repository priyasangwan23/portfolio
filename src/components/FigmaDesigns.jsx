import { useEffect, useRef, useState } from 'react'
import { FaFigma, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './FigmaDesigns.css'

const designs = [
  {
    id: 4,
    title: 'StreamVibe OTT UI',
    description: 'A premium, dark-themed OTT streaming platform design template. Features dynamic movie carousels, immersive hero banners, and a seamless media browsing experience.',
    image: '/streamvibe-figma.png',
    link: 'https://www.figma.com/design/Qcm2XzbleEwOlcvwrk3K0Q/OTT-Dark-Theme-Website-UI-Design-Template-for-Media-Streaming--Movies-and-TV---FREE-Editable----Community-?node-id=34-919&t=gECDMdGQJJmgs106-1'
  },
  {
    id: 1,
    title: 'Book my show UI',
    description: 'A modernized interface design for BookMyShow, featuring event highlights, category carousels, trending shows, and a polished user experience.',
    image: '/bookmyshow-figma.png',
    link: 'https://www.figma.com/design/ybGQ0oFi8ljSuHg6fmWO2J/Untitled?node-id=3-2&t=DqdLNGQwTndkXrOF-1'
  },
  {
    id: 2,
    title: 'Quantum Dashboard',
    description: 'A sleek, comprehensive dashboard design for "Quantum", featuring assigned courses, statistics, scheduling, and user profile management.',
    image: '/quantum-figma.png',
    link: 'https://www.figma.com/design/ybGQ0oFi8ljSuHg6fmWO2J/Untitled?node-id=96-5&t=DqdLNGQwTndkXrOF-1'
  },
  {
    id: 3,
    title: 'Designely Studio UI',
    description: 'Comprehensive brand guidelines and a premium eyewear storefront UI including organized layers, rich style options, and lifestyle mockups.',
    image: '/designely-figma.png',
    link: 'https://www.figma.com/design/ybGQ0oFi8ljSuHg6fmWO2J/Untitled?node-id=84-2&t=J5sxoGZNTt0kDlDR-1'
  }
]

const FigmaDesigns = () => {
  const sectionRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Scroll visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const els = sectionRef.current.querySelectorAll('.figma-animate')
    els.forEach((el) => observer.observe(el))
    return () => els.forEach((el) => observer.unobserve(el))
  }, [])

  // Navigation handlers
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % designs.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + designs.length) % designs.length)
  }

  // Calculate card classes based on index difference
  const getCardPositionClass = (idx) => {
    if (idx === currentIndex) return 'figma-focused'
    
    // Previous item (or last item if current is first)
    if (idx === (currentIndex - 1 + designs.length) % designs.length) return 'figma-left'
    
    // Next item (or first item if current is last)
    if (idx === (currentIndex + 1) % designs.length) return 'figma-right'
    
    return 'figma-hidden'
  }

  return (
    <div className="figma-section container" ref={sectionRef}>
      {/* Section Header */}
      <div className="figma-header figma-animate fade-up">
        <span className="figma-eyebrow">
          <FaFigma className="eyebrow-icon" /> UI / UX
        </span>
        <h2 className="section-title">
          <span>Figma</span> Designs
        </h2>
        <p className="figma-subtitle">
          Explore my design work — crafted with precision in Figma.
        </p>
      </div>

      <div className="figma-carousel-wrapper figma-animate fade-up">
        {/* Navigation Arrows */}
        <button className="figma-nav-btn figma-nav-left" onClick={handlePrev} aria-label="Previous Design">
          <FaChevronLeft />
        </button>
        
        <button className="figma-nav-btn figma-nav-right" onClick={handleNext} aria-label="Next Design">
          <FaChevronRight />
        </button>

        <div className="figma-carousel-scene">
          {designs.map((design, index) => {
            const positionClass = getCardPositionClass(index)
            
            return (
              <a
                key={design.id}
                href={design.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`figma-card ${positionClass}`}
                // Disable link opening if the card isn't the main focused one
                onClick={(e) => positionClass !== 'figma-focused' && e.preventDefault()}
              >
                {/* Animated border */}
                <div className="figma-card-border" />

                {/* Image */}
                <div className="figma-card-image">
                  <img
                    src={design.image}
                    alt={`Figma Design — ${design.title}`}
                  />
                  {/* Overlay */}
                  <div className="figma-card-overlay">
                    <div className="overlay-content">
                      <FaFigma className="overlay-figma-icon" />
                      <span className="overlay-text">Open in Figma</span>
                      <FaExternalLinkAlt className="overlay-link-icon" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="figma-card-info">
                  <div className="figma-card-meta">
                    <FaFigma className="meta-icon" />
                    <span className="meta-label">Figma Design</span>
                  </div>
                  <h3 className="figma-card-title">{design.title}</h3>
                  <p className="figma-card-desc">{design.description}</p>
                  <div className="figma-card-cta">
                    <span>View Full Design</span>
                    <FaExternalLinkAlt className="cta-arrow" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FigmaDesigns
