import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      {/* ── Custom cursor ── */}
      <CustomCursor />

      {/* ── Canvas interactive background ── */}
      <BackgroundCanvas />

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<section id="home" className="fade-in"><Hero /></section>} />
          <Route path="/about" element={<section id="about" className="fade-in"><About /></section>} />
          <Route path="/skills" element={<section id="skills" className="fade-in"><Skills /></section>} />
          <Route path="/projects" element={<section id="projects" className="fade-in"><Projects /></section>} />
          <Route path="/designs" element={<section id="designs" className="fade-in"><FigmaDesigns /></section>} />
          <Route path="/education" element={<section id="education" className="fade-in"><Education /></section>} />
          <Route path="/certificates" element={<section id="certificates" className="fade-in"><Certificates /></section>} />
          <Route path="/contact" element={<section id="contact" className="fade-in"><Contact /></section>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App