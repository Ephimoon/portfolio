import React, { useState, useEffect } from 'react'

const Card = ({ name, image, description, technologies, link, github, shouldReset }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleCardClick = () => setIsOpen((prev) => !prev)

    // Close card if section is scrolled away
    useEffect(() => {
    if (shouldReset) {
        setIsOpen(false)
    }
    }, [shouldReset])

    // Close card on resize
    useEffect(() => {
    const handleResize = () => setIsOpen(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div onClick={handleCardClick} className="bg-white rounded-xl shadow-md overflow-hidden relative transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer mx-auto w-full max-w-xs sm:max-w-sm md:max-w-none">
            {/* Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">

                {/* Image */}
                <img
                    src={image}
                    alt={name}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ${
                    isOpen ? '-translate-y-full' : ''
                    }`}
                />

                {/* Slide-up content */}
                <div
                    className={`absolute w-full h-full bg-white px-5 py-6 transition-all duration-300 flex flex-col justify-between ${
                    isOpen ? 'top-0' : 'top-full'
                    }`}
                >
                    <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                        <h3 className="text-center font-semibold text-lg text-black">{name}</h3>
                        <div className="flex justify-center items-center gap-3 mt-2 mb-4">
                            {technologies.map((tech, i) => (
                            <img key={i} src={tech.tech_image} alt={tech.tech_name} className="h-6" />
                            ))}
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">{description}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        {link ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(link, '_blank')
                                }}
                                className="px-3 py-1 border-2 border-third text-third rounded-xl text-sm font-bold hover:bg-accent transition hover:scale-110 duration-200"
                                >
                                live<span className="inline-block ml-1">↗</span>
                            </button>
                        ) : (
                            <div />
                        )}
                        {github && (
                            <a
                                href={github}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-third text-xl transition"
                                >
                                <svg strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" className="w-8 hover:scale-125 duration-200 hover:stroke-accent">
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

export default Card
