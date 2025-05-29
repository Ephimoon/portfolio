import React from 'react'

const CardModal = ({ project, onClose }) => {
    if (!project) return null

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const shouldScroll = isMobile && project.technologies.length > 5;
const techList = shouldScroll
  ? [...project.technologies, ...project.technologies]
  : project.technologies;

    return (
        <div className="fixed inset-0 z-50 bg-second/30 flex items-center justify-center" onClick={onClose}>
            <div className="relative bg-white w-full max-w-3xl max-h-[100vh] md:max-h-[90vh] md:rounded-3xl shadow-lg flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Title + Stack */}
                <div className="sticky top-0 bg-white p-4 pt-6 md:pt-12 z-10 flex flex-col items-center text-center">
                    <h2 className="text-xl font-bold font-mono text-second pb-2 px-4">{project.name}</h2>

                    <div className="w-full mt-2 px-2 overflow-hidden sm:overflow-visible">
                        <div className={`flex gap-4 whitespace-nowrap ${shouldScroll ? 'w-max animate-scroll-left-stack' : 'w-full justify-center flex-wrap sm:whitespace-normal sm:animate-none'}`}>
                            {techList.map((tech, i) => (
                                <div key={i + tech.tech_name} className="relative group shrink-0">
                                    <div className="flex flex-col items-center text-center">
                                        <img src={tech.tech_image} alt={tech.tech_name} className="h-6 md:h-8" />
                                        <span className="text-[10px] mt-1 block sm:hidden">{tech.tech_name}</span>
                                        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-third text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 hidden sm:block">
                                            {tech.tech_name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto px-6 py-4 space-y-4">
                    <img src={project.image} alt="main" className="w-full rounded-md p-4" />
                    <p className="p-4 text-lg font-poppins whitespace-pre-line">{project.description}</p>
                    <div className="flex flex-col gap-4 pt-4 px-4">
                        {project.moreimages.map((img, i) => (
                            <img key={i} src={img} alt={`image-${i}`} className="rounded" />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white p-4 px-5 flex justify-between items-center z-10">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-full bg-third text-white font-semibold transition hover:scale-110 duration-200 cursor-pointer"
                        >
                        Close
                    </button>

                    <div className="flex gap-4 items-center">
                        {project.link && (
                        <button
                            onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.link, '_blank')
                            }}
                            className="px-3 py-1 border-2 border-third text-third rounded-xl text-sm font-bold hover:bg-accent transition hover:scale-110 duration-200"
                        >
                            live<span className="inline-block ml-1">↗</span>
                        </button>
                        )}
                        {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-third text-xl transition"
                        >
                            <svg strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-8 hover:scale-125 duration-200">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardModal
