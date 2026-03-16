import './Projects.css'

const Projects = () => {
  const projects = [
    {
      title: "Calendly Clone",
      description: "A full-featured scheduling application similar to Calendly",
      link: "https://priya-calendly-clone.netlify.app",
      github: "https://github.com/priyasangwan23",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Routing Project",
      description: "Complex routing implementation with dynamic pages",
      link: "https://priya-routing-project.netlify.app",
      github: "https://github.com/priyasangwan23",
      tags: ["React", "React Router", "API"]
    },
    {
      title: "Website Clones",
      description: "Collection of popular website clones",
      link: "https://github.com/priyasangwan23/Projects",
      github: "https://github.com/priyasangwan23/Projects",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Drawing App",
      description: "Interactive canvas-based drawing application",
      link: "https://github.com/priyasangwan23/My-Projects/tree/main/Drawing%20App",
      github: "https://github.com/priyasangwan23/My-Projects/tree/main/Drawing%20App",
      tags: ["Canvas API", "JavaScript", "UI/UX"]
    },
    {
      title: "Terminal Landing Page",
      description: "Creative terminal-style portfolio landing page",
      link: "https://github.com/priyasangwan23/My-Projects/tree/main/Terminal%20style%20landing%20page",
      github: "https://github.com/priyasangwan23/My-Projects/tree/main/Terminal%20style%20landing%20page",
      tags: ["Creative", "JavaScript", "Terminal"]
    },
    {
      title: "Chrome Extensions",
      description: "Collection of useful browser extensions",
      link: "https://github.com/priyasangwan23/Extensions",
      github: "https://github.com/priyasangwan23/Extensions",
      tags: ["Chrome API", "JavaScript", "Browser"]
    },
    {
      title: "Stranger Things Project",
      description: "Fan-based project inspired by Stranger Things",
      link: "https://priya-stranger-things.netlify.app",
      github: "https://github.com/priyasangwan23/stranger-things",
      tags: ["React", "API", "Entertainment"]
    },
    {
      title: "Small Games Collection",
      description: "Collection of fun and interactive browser games",
      link: "https://github.com/priyasangwan23/Games",
      github: "https://github.com/priyasangwan23/Games",
      tags: ["Games", "JavaScript", "Canvas"]
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">
          My <span>Projects</span>
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card card">
              <div className="project-header">
                <div className="project-title-wrapper">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-number">#{index + 1}</span>
                </div>
                <p className="project-description">{project.description}</p>
              </div>

              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag">{tag}</span>
                ))}
              </div>

              <div className="project-buttons">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary project-btn"
                >
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline project-btn"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects