import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import BackgroundCanvas from './components/BackgroundCanvas'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '-10% 0px -70% 0px' 
      }
    )

    const sections = document.querySelectorAll('main > section')
    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  return (
    <div className="app">
      {/* ── Custom cursor ── */}
      <CustomCursor />

      {/* ── Canvas interactive background ── */}
      <BackgroundCanvas />

      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <section id="home"      className="fade-in"><Hero /></section>
        <section id="about"     className="fade-in"><About /></section>
        <section id="skills"    className="fade-in"><Skills /></section>
        <section id="projects"  className="fade-in"><Projects /></section>
        <section id="education" className="fade-in"><Education /></section>
        <section id="contact"   className="fade-in"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}

export default App