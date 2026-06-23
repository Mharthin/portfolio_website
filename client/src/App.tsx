import React, { useEffect, useRef, useState } from 'react'
import Header from './components/Header'

export default function App() {
  const [year, setYear] = useState<string | number>('')

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  // Reveal animation setup
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('.reveal'))
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!revealElements.length) return

    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    revealElements.forEach((el) => revealObserver.observe(el))

    return () => revealObserver.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />

      <main id="main">
        <section id="home" className="hero section">
          <div className="container hero-inner reveal">
            <p className="hero-eyebrow">Full-Stack Developer</p>
            <h1 className="hero-title">
              Hi, I'm <span className="text-accent">Martin Kojo Quayson</span>.
              <br />
              I build things for the web.
            </h1>
            <p className="hero-text">
              I'm learning to craft fast, accessible websites and apps — from
              polished frontends to reliable backends. This portfolio is project
              #1: built from scratch, one step at a time.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                View my work
              </a>
              <a className="btn btn-secondary" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <header className="section-header reveal">
              <p className="section-eyebrow">Portfolio</p>
              <h2>Featured projects</h2>
              <p className="section-intro">
                Each card will become a mini case study: what I built, why, and
                what I learned.
              </p>
            </header>

            <div className="project-grid">
              <article className="project-card reveal">
                <div className="project-card-image placeholder-image" aria-hidden="true">
                  <span>01</span>
                </div>
                <div className="project-card-body">
                  <h3>This portfolio site</h3>
                  <p>
                    A responsive personal site built with semantic HTML and modern
                    CSS — my foundation project as I grow toward full-stack
                    development.
                  </p>
                  <ul className="tag-list">
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Git</li>
                  </ul>
                </div>
              </article>

              <article className="project-card reveal">
                <div className="project-card-image placeholder-image" aria-hidden="true">
                  <span>02</span>
                </div>
                <div className="project-card-body">
                  <h3>Coming soon</h3>
                  <p>
                    Your next project goes here — maybe a todo app, weather app,
                    or API-powered dashboard.
                  </p>
                  <ul className="tag-list">
                    <li>JavaScript</li>
                    <li>API</li>
                  </ul>
                </div>
              </article>

              <article className="project-card reveal">
                <div className="project-card-image placeholder-image" aria-hidden="true">
                  <span>03</span>
                </div>
                <div className="project-card-body">
                  <h3>Coming soon</h3>
                  <p>
                    A full-stack project with a backend and database will live
                    here once you're ready for your first full-stack build.
                  </p>
                  <ul className="tag-list">
                    <li>Node.js</li>
                    <li>Database</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="about" className="section section-alt">
          <div className="container about-grid reveal">
            <div className="about-photo">
              <img
                src="/assets/photo.jpg"
                alt="Photo of Martin Kojo Quayson"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  if (t.src.includes('.jpg')) t.src = '/assets/photo.jpeg'
                }}
              />
            </div>
            <div className="about-content">
              <header className="section-header section-header-left">
                <p className="section-eyebrow">About me</p>
                <h2>Curious, persistent, and building every day</h2>
              </header>
              <p>
                I'm a tech enthusiast on the path to becoming a full-stack
                developer. I enjoy understanding how the whole system works —
                from pixels in the browser to data on the server.
              </p>
              <p>
                Right now I'm focused on strong fundamentals: clean HTML, thoughtful
                CSS, and JavaScript basics. Each project in this portfolio is
                deliberate practice toward that long-term goal.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <header className="section-header reveal">
              <p className="section-eyebrow">Toolkit</p>
              <h2>Skills I'm building</h2>
            </header>

            <div className="skills-grid">
              <div className="skill-group reveal">
                <h3>Frontend</h3>
                <ul className="tag-list tag-list-large">
                  <li>HTML5</li>
                  <li>CSS3</li>
                  <li>JavaScript</li>
                  <li>Responsive design</li>
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Vite</li>
                </ul>
              </div>
              <div className="skill-group reveal">
                <h3>Backend (learning)</h3>
                <ul className="tag-list tag-list-large">
                  <li>Node.js</li>
                  <li>REST APIs</li>
                  <li>Databases</li>
                </ul>
              </div>
              <div className="skill-group reveal">
                <h3>Tools</h3>
                <ul className="tag-list tag-list-large">
                  <li>Git & GitHub</li>
                  <li>VS Code / Cursor</li>
                  <li>Chrome DevTools</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt">
          <div className="container contact-inner reveal">
            <header className="section-header reveal">
              <p className="section-eyebrow">Contact</p>
              <h2>Let's connect</h2>
              <p className="section-intro">Open to feedback, collaboration, and junior opportunities.</p>
            </header>

            <div className="contact-links">
              <a className="contact-link" href="mailto:mquayson49@gmail.com">mquayson49@gmail.com</a>
              <a className="contact-link" href="https://github.com/mharthin" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="contact-link" href="https://linkedin.com/in/martquayson49" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            &copy; <span id="year">{year}</span> Martin Kojo Quayson. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
