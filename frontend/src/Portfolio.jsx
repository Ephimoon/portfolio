import React from 'react'
import Nav from './components/nav.jsx'
import AboutMe from './sections/aboutme.jsx'
import Projects from './sections/projects.jsx'
import Contact from './sections/contact.jsx'
import Hero from './sections/hero.jsx'

const Portfolio = () => {
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
