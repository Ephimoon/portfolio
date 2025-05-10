import React, { useState, useEffect, useRef } from 'react'
import Card from '../components/card'

const Projects = () => {
    const [shouldResetCards, setShouldResetCards] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
        setShouldResetCards(entry.isIntersecting === false)
        },
        { threshold: 0.05 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
        if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
    }, [])

    const projects = [
        {
            name: "Volunteer Dashboard",
            image: "/metuki.png",
            description: "Admin dashboard for managing volunteers and events for Shasta's Coogmunity.Admin dashboard for managing volunteers and events for Shasta's Coogmunity.Admin dashboard for managing volunteers and events for Shasta's Coogmunity.Admin dashboard for managing volunteers and events for Shasta's Coogmunity.",
            technologies: [
                { tech_name: "MySQL", tech_image: "/mysql.svg" },
                { tech_name: "Express", tech_image: "/express.svg" },
                { tech_name: "React", tech_image: "/react.svg" },
                { tech_name: "Node.js", tech_image: "/node.svg" }
            ],
            link: "https://coogmunity.org/dashboard",
            github: "https://github.com/Ephimoon/coogmunity"
        },
        {
            name: "Music Visualizer",
            image: "/music-viz.png",
            description: "A live music visualizer using Web Audio API and Canvas animations.",
            technologies: [
                { tech_name: "JavaScript", tech_image: "/js.svg" },
                { tech_name: "Canvas", tech_image: "/canvas.svg" }
            ],
            link: null,
            github: "https://github.com/Ephimoon/music-visualizer"
        },
        {
            name: "Spara AI Chatbot",
            image: "/spara-thumb.png",
            description: "A full-stack AI chatbot using Gemini, Supabase, and FastAPI for sales lead generation. A full-stack AI chatbot using Gemini, Supabase, and FastAPI for sales lead generation. A full-stack AI chatbot using Gemini, Supabase, and FastAPI for sales lead generation. A full-stack AI chatbot using Gemini, Supabase, and FastAPI for sales lead generation.",
            technologies: [
                { tech_name: "React", tech_image: "/react.svg" },
                { tech_name: "Vite", tech_image: "/vite.svg" },
                { tech_name: "FastAPI", tech_image: "/fastapi.svg" }
            ],
            link: null,
            github: null
        }
    ]
      

    return (
        <section ref={sectionRef} id="projects" className="relative min-h-screen snap-start w-full bg-first flex flex-col">
            {/* Top spacer to push below navbar */}
            <div className="h-7" />

            {/* Main content centered vertically */}
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-screen-xl w-full p-10 md:p-15 lg:p-20">
                <h2 className="text-3xl md:text-5xl text-second mb-4 font-semibold pb-3 font-gaegu text-center">
                    Things I’ve worked on ..
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                    <Card key={index} {...project} shouldReset={shouldResetCards} />
                    ))}
                </div>
                </div>
            </div>
        </section>

    )
}

export default Projects