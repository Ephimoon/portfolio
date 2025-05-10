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
            name: "Spara AI – Capstone Project",
            image: "/metuki.png",
            description: "Developed a full-stack AI chatbot with OpenAI and Gemini integration via LangChain, featuring smart video responses based on the conversation.",
            technologies: [
                { tech_name: "Python", tech_image: "./python.svg" },
                { tech_name: "FastAPI", tech_image: "./fastapi.svg" },
                { tech_name: "React", tech_image: "./react.svg" },
                { tech_name: "TypeScript", tech_image: "./typescript.svg" },
                { tech_name: "Tailwind CSS", tech_image: "./tailwindcss.svg" },
                { tech_name: "LangChain", tech_image: "./langchain.svg" },
                { tech_name: "OpenAI", tech_image: "./openai.svg" },
                { tech_name: "Gemini", tech_image: "./gemini.svg" },
                { tech_name: "Supabase", tech_image: "./supabase.svg" },
                { tech_name: "Docker", tech_image: "./docker.svg" }
            ],
            link: null,
            github: null
        },
        {
            name: "The Museum of Fine Arts, Houston - Full-Stack Management System",
            image: "/metuki.png",
            description: "Built a management system for museum operations, supporting exhibitions, tickets, artwork, and memberships with image uploads, reports, and Azure integration.",
            technologies: [
                { tech_name: "React", tech_image: "./react.svg" },
                { tech_name: "Express.js", tech_image: "./express.svg" },
                { tech_name: "MySQL", tech_image: "./mysql.svg" },
                { tech_name: "Node.js", tech_image: "./nodejs.svg" }
            ],
            link: "https://black-desert-0587dbd10.5.azurestaticapps.net/",
            github: "https://github.com/Ephimoon/MuseumDB"
        },
        {
            name: "Shasta’s Coogmunity Service - Full-Stack Volunteer Management System",
            image: "/metuki.png",
            description: "Led development of a volunteer matching platform with role-based dashboards, authentication, and event matching based on profile data. Includes CSV/PDF reports and Azure image uploads.",
            technologies: [
                { tech_name: "React", tech_image: "./react.svg" },
                { tech_name: "Node.js", tech_image: "./nodejs.svg" },
                { tech_name: "Express", tech_image: "./express.svg" },
                { tech_name: "MongoDB", tech_image: "./mongodb.svg" }
            ],
            link: null,
            github: "https://github.com/Ephimoon/volunteer-fullstack"
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