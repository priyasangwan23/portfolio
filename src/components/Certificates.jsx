import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaAward } from 'react-icons/fa';
import './Certificates.css';

const certificates = [
  {
    id: 1,
    title: 'ARTPARK Program',
    description: 'Completion certificate from ARTPARK (AI & Robotics Technology Park) focusing on innovative frameworks and futuristic tech developments.',
    image: 'https://res.cloudinary.com/dujzsrwlk/image/upload/v1775723201/art_park_certificate_yn0avc.jpg',
  },
  {
    id: 2,
    title: 'Be10x AI Mastery',
    description: 'Certified by Be10x for mastering generative AI tools to significantly boost workflow productivity and efficiency.',
    image: 'https://res.cloudinary.com/dujzsrwlk/image/upload/v1775723844/be_10x_certificate_y7gs1o.jpg',
  },
  {
    id: 3,
    title: 'Intro to HTML',
    description: 'Foundational certification covering web structure, semantic markup, and the core principles of front-end development.',
    image: 'https://res.cloudinary.com/dujzsrwlk/image/upload/v1775723985/introduction_to_html_certificate_pjhzdn.jpg',
  }
];

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Wait 6s before sliding
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="certificates-container container">
      <div className="section-header cert-animate fade-up">
        <h2 className="section-title">
          <FaAward className="header-icon" /> Certificates
        </h2>
        <div className="title-underline"></div>
      </div>

      <div className="carousel-wrapper cert-animate fade-up">
        <button className="carousel-btn prev" onClick={prevSlide}>
          <FaChevronLeft />
        </button>

        <div className="carousel-content">
          {certificates.map((cert, index) => {
            let position = 'nextSlide';
            if (index === currentIndex) {
              position = 'activeSlide';
            } else if (
              index === currentIndex - 1 ||
              (currentIndex === 0 && index === certificates.length - 1)
            ) {
              position = 'lastSlide';
            }

            return (
              <article className={`cert-card ${position}`} key={cert.id}>
                <div className="cert-image-container">
                  <img src={cert.image} alt={cert.title} className="cert-image" />
                  <div className="cert-overlay">
                    <a href={cert.image} target="_blank" rel="noopener noreferrer" className="view-btn">View Full</a>
                  </div>
                </div>
                <div className="cert-info">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-desc">{cert.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
      
      <div className="carousel-indicators">
        {certificates.map((_, idx) => (
          <button 
            key={idx} 
            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Certificates;
