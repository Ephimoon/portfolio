import React, {useEffect} from 'react'
import Nav from './components/nav.jsx'
import AboutMe from './sections/aboutme.jsx'
import Projects from './sections/projects.jsx'
import Contact from './sections/contact.jsx'
import Hero from './sections/hero.jsx'

const Portfolio = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    return () => window.removeEventListener('resize', setViewportHeight)
  }, [])

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <Nav />
      <Hero />
      <AboutMe />
      <Projects />
      <Contact />
    </main>
  )
}

export default Portfolio
