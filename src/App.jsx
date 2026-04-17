import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import FigmaDesigns from './components/FigmaDesigns'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import BackgroundCanvas from './components/BackgroundCanvas'
import './App.css'

function App() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  // 1. Initial Scroll (when visiting a URL directly or navigating via clicks)
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    const sectionId = path === '' ? 'home' : path;
    
    // Update state to match URL immediately on link click/direct load
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.pathname]);

  // 2. Scroll Spy: Updates the Navbar and URL while scrolling manually
  useEffect(() => {
    const observerOptions = {
      // Look at the middle portion of the screen
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);

          // Update URL silently in browser history for SEO
          const newPath = sectionId === 'home' ? '/' : `/${sectionId}`;
          if (window.location.pathname !== newPath) {
            window.history.replaceState(null, '', newPath);
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('main > section');
    sections.forEach((section) => observer.observe(section));
    
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      <BackgroundCanvas />

      {/* Header receives the activeSection state for highlight logic */}
      <Header activeSection={activeSection} />
      
      <main>
        <section id="home" className="fade-in"><Hero /></section>
        <section id="about" className="fade-in"><About /></section>
        <section id="skills" className="fade-in"><Skills /></section>
        <section id="projects" className="fade-in"><Projects /></section>
        <section id="designs" className="fade-in"><FigmaDesigns /></section>
        <section id="education" className="fade-in"><Education /></section>
        <section id="certificates" className="fade-in"><Certificates /></section>
        <section id="contact" className="fade-in"><Contact /></section>
      </main>
      
      <Footer />
    </div>
  )
}

export default App