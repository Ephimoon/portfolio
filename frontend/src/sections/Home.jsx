import { useState, useRef } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Terminal from '../components/Terminal/Terminal'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { links } from '../data/links'

const Home = () => {
  const [externalCommand, setExternalCommand] = useState({ id: 0, command: '' })
  const terminalRef = useRef(null)

  const handleRunCommand = (command) => {
    setExternalCommand((prev) => ({
      id: prev.id + 1,
      command
    }))
    requestAnimationFrame(() => terminalRef.current?.focus())
  }

  return (
    <div className="home" onClick={() => { if (!window.getSelection()?.toString()) terminalRef.current?.focus() }}>
      <Header name={profile.name} onRunCommand={handleRunCommand} />

      <main className="home__main">
        <Terminal
          ref={terminalRef}
          profile={profile}
          projects={projects}
          externalCommand={externalCommand}
        />
      </main>

      <Footer links={links} copyright={profile.copyright} />
    </div>
  )
}

export default Home
