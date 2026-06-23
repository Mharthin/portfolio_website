import React, { useEffect, useState } from 'react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    // active link while scrolling
    const sections = Array.from(document.querySelectorAll('section[id]'))
    const links = Array.from(document.querySelectorAll('.nav-link'))

    if (!sections.length || !links.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.getAttribute('id')
          links.forEach((link) => {
            const href = (link as HTMLAnchorElement).getAttribute('href')
            link.classList.toggle('active', href === `#${id}`)
          })
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // close menu on resize
    function onResize() {
      if (window.innerWidth > 768) setNavOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleNavClick(e: React.MouseEvent, href: string) {
    if (!href.startsWith('#')) return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      ;(target as HTMLElement).setAttribute('tabindex', '-1')
      ;(target as HTMLElement).focus({ preventScroll: true })
    }
    setNavOpen(false)
  }

  return (
    <header className={`site-header ${navOpen ? 'nav-open' : ''}`}>
      <div className="container header-inner">
        <a className="logo" href="#home" onClick={(e) => handleNavClick(e, '#home')}>MKQ</a>

        <button
          type="button"
          className="menu-toggle"
          id="menu-toggle"
          aria-expanded={navOpen}
          aria-controls="site-nav"
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setNavOpen((s) => !s)}
        >
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>

        <nav className="site-nav" id="site-nav" aria-label="Primary">
          <ul className="nav-list">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a className="nav-link" href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          id="theme-toggle"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        >
          <svg className="theme-icon theme-icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg className="theme-icon theme-icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </header>
  )
}
