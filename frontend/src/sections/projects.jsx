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
            image: "/spara1.png",
            description: `For my capstone project, I worked with a team of 7 to build an AI-powered chatbot for a real-world client.  

The chatbot helps businesses respond to potential buyers using advanced language models (OpenAI and Gemini), which can be switched on the fly through an admin panel we built.  

On the backend, we made sure the AI could understand incoming messages, identify the most relevant product, and respond with a personalized video.  

On the frontend, we built a responsive chat interface using React and Tailwind CSS. It supports real-time messaging, video playback, smart chat titles, and includes an admin tool for selecting the AI model.  

To ensure reliability, we wrote tests for both the frontend and backend, and automated the testing and deployment process with Jenkins.  

This project gave me hands-on experience working with AI APIs.`,
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
            image: "/museum1.png",
            description: `I worked with a team of 5 to build a full-stack management system for the Museum of Fine Arts in Houston.  

The platform helps staff manage collections, exhibitions, events, ticket sales, gift shop items, and memberships all in one place.  

My main focus was building features to create, edit, and display artworks and exhibitions. This included image uploads with previews and integration with Azure Blob Storage for secure hosting.  

I also developed a ticket sales reporting page that lets staff download PDF summaries using jsPDF.  

We added user authentication and database triggers to keep the data consistent and secure.  

This project gave me experience building real-world tools that make daily operations more efficient.`
,
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
            image: "/shasta1.png",
            description: `I led a team of 4 to create a platform that connects volunteers with events based on their availability, location, and skills.  

We built two dashboards—one for volunteers to manage their profiles and one for admins to create events and match volunteers automatically.  

The system uses secure login with role-based access, and includes features like dynamic forms, modals, and image uploads using Azure Blob Storage.  

We also built reporting tools that let admins download data as PDFs or CSVs using pdfkit and json2csv.  

This project helped me grow as both a developer and a team lead.`
,
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
        <section ref={sectionRef} id="projects" className="relative snap-start w-full bg-first flex flex-col" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
            {/* Top spacer to push below navbar */}
            <div className="h-12" />

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