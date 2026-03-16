import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="app">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <section id="home" className="fade-in">
          <Hero />
        </section>
        <section id="about" className="fade-in">
          <About />
        </section>
        <section id="skills" className="fade-in">
          <Skills />
        </section>
        <section id="projects" className="fade-in">
          <Projects />
        </section>
        <section id="education" className="fade-in">
          <Education />
        </section>
        <section id="contact" className="fade-in">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App