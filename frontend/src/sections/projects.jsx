import React, { useState } from 'react'
import Card from '../components/card'
import CardModal from '../components/cardmodal'

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null)

    const openModal = (project) => setSelectedProject(project)
    const closeModal = () => setSelectedProject(null)

    const projects = [
        {
            name: "Spara AI – Capstone Project",
            image: "/spara1.png",
            moreimages: ["/spara2.png", "/spara3.png", "/spara4.png"],
            description: 
                `For my capstone project, I worked with a team of 7 to build an AI-powered chatbot for a real-world client.

                The chatbot helps businesses respond to potential buyers using advanced language models. We integrated both OpenAI and Gemini using LangChain and built an admin panel that allows staff to switch between models as needed.

                On the backend, we built a system that helps the chatbot understand what the user is asking and find the most relevant product video to respond with. It compares the meaning of the user's message to the topics of each video, using a scoring system to find the best match. If there’s a strong enough match, the chatbot replies with a personalized video. We also added a fallback method to catch slightly weaker matches and make the system more reliable.
                
                If a user interacted with enough relevant videos, they became eligible to speak with a human representative through a built-in point system.
                
                On the frontend, we built a responsive chat interface using React and Tailwind CSS. It supports real-time messaging, video playback, smart chat titles, and admin controls for managing the AI models.
                
                This project gave me hands-on experience with LangChain, OpenAI and Gemini APIs, vector embeddings, cloud storage, and building intelligent full-stack applications.`,
            technologies: [
                { tech_name: "Python", tech_image: "./python.svg" },
                { tech_name: "React", tech_image: "./react.svg" },
                { tech_name: "TypeScript", tech_image: "./typescript.svg" },
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
            moreimages: ["/museum2.png", "/museum3.png", "/museum4.png", "/museum5.png", "/museum6.png", "/museum7.png", "/museum8.png", "/museum9.png", "/museum10.png", "/museum11.png", "/museum12.png", "/museum13.png"],
            description: 
                `As part of my COSC 3380 Database Systems course, I worked with a team of 5 to build a full-stack management system for the Museum of Fine Arts, Houston.
                
                The platform helps museum staff manage everything in one place, including art collections, exhibitions, ticket sales, gift shop items, and memberships.
                
                I focused on developing features to create, edit, delete, and display artworks and exhibitions. This included implementing image uploads with previews and integrating Azure Blob Storage for secure image hosting. I also built a ticket sales reporting page that allows staff to generate and download PDF summaries using jsPDF.
                
                We added user authentication and database triggers to keep the data secure and consistent.
                
                This project gave me hands-on experience working with relational databases, CRUD operations, and building practical tools for a real organization.`,
            technologies: [
                { tech_name: "React", tech_image: "./react.svg" },
                { tech_name: "Express.js", tech_image: "./express.svg" },
                { tech_name: "Node.js", tech_image: "./nodejs.svg" },
                { tech_name: "MySQL", tech_image: "./mysql.svg" }
            ],
            link: null,
            github: "https://github.com/Ephimoon/MuseumDB"
        },
        {
            name: "Shasta’s Coogmunity Service - Full-Stack Volunteer Management System",
            image: "/shasta1.png",
            moreimages: ["/shasta2.png", "/shasta3.png", "/shasta4.png", "/shasta5.png", "/shasta6.png", "/shasta7.png"],
            description: 
                `As part of my COSC 4353 Software Design course, I worked with a team of four to create a full-stack platform that connects volunteers with events based on their availability, location, and skills.
                
                We built two dashboards: 
                • one for volunteers to manage their profiles and update their availability
                • one for admins to create events, view volunteer profiles, and automatically match volunteers to events using custom logic
                
                The system features secure JWT authentication with role-based access, and integrates the LocationIQ API to provide address autocompletion during profile creation and event submission. We also implemented reporting tools that allow admins to export event and volunteer data as PDFs or CSVs using pdfkit and json2csv.
                
                This project helped me grow as a full-stack developer by giving me hands-on experience with both frontend and backend development.`,
            technologies: [
                { tech_name: "MongoDB", tech_image: "./mongodb.svg" },
                { tech_name: "Express", tech_image: "./express.svg" },
                { tech_name: "React", tech_image: "./react.svg" },
                { tech_name: "Node.js", tech_image: "./nodejs.svg" }
            ],
            link: null,
            github: "https://github.com/Ephimoon/volunteer-fullstack"
        }
    ]
      

    return (
        <section id="projects" className="relative md:snap-start w-full bg-first flex flex-col" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
        {/* <div className="h-12 md:h-0" /> */}
        <div className="flex-1 flex items-center justify-center">
            <div className="max-w-screen-2xl w-full p-10 md:p-15 lg:p-20">
                <div className='flex flex-col gap-12 md:mt-[-3rem]'>
                    <h2 className="text-[7vw] md:text-5xl text-second mb-[-2rem] md:mb-0rem md:mb-4 font-semibold font-gaegu text-center whitespace-nowrap">
                        Things I’ve worked on ..
                    </h2>

                    <div className="grid grid-rows-1 md:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                        <Card
                            key={index}
                            image={project.image}
                            name={project.name}
                            onClick={() => openModal(project)}
                        />
                        ))}
                    </div>
                </div>

            </div>
        </div>

        <CardModal project={selectedProject} onClose={closeModal} />
        </section>
    )
}

export default Projects