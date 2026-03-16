import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">
          <span>About</span> Me
        </h2>
        
        <div className="about-content">
          <div className="about-card card">
            <p className="about-text">
              I'm a passionate Full Stack Developer with expertise in building modern web applications 
              using cutting-edge technologies. My journey in programming started with C and C++, 
              and I've since mastered the MERN stack and various web technologies.
            </p>
            <p className="about-text">
              What drives me is the challenge of turning complex problems into simple, beautiful, 
              and intuitive designs. I believe in writing clean, efficient code and creating 
              seamless user experiences.
            </p>
            <p className="about-text">
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or creating content to share my knowledge with the developer 
              community.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card card">
              <div className="stat-number">10+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-card card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Learning Mindset</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About