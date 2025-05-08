import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navBarItems = [
        { title: '0. about me 👩🏻‍💻', url: "#aboutme" },
        { title: '1. projects 🌟', url: "#projects" },
        { title: '2. contact 💌', url: "#contact" }
      ];

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined" && window.innerWidth >= 768 && isOpen) {
                setIsOpen(false);
            }
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    const handleNavClick = () => {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <nav className="bg-first fixed w-full z-20 top-0">
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="md:flex md:items-center md:justify-between md:py-1">
                {/* logo + hamburger */}
                <div className="flex items-center justify-between">
                    <a href="#hero" onClick={handleNavClick} className="flex items-center space-x-2">
                        <span className="text-xl font-semibold text-second font-mono whitespace-nowrap">
                        Melanie Escobar
                        </span>
                    </a>

                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center w-9 h-9 justify-center text-sm text-second cursor-pointer"
                            aria-controls="navbar-menu"
                            aria-expanded={isOpen}
                            >
                            <span className="sr-only">Toggle menu</span>
                            {isOpen ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* nav links */}
                <div
                    id="navbar-menu"
                    className={`
                        flex ${isOpen ? 'max-h-[500px] mt-4' : 'max-h-0 mt-0'}
                        flex-col md:flex-row md:justify-end overflow-hidden md:overflow-visible transition-[max-height,margin] duration-300 ease-in-out items-center gap-3 font-mono text-second text-xl md:text-sm
                    `}
                    >
                    
                    {navBarItems.map((x, index) => {
                        return (
                            <a
                                key={index}
                                href={x.url}
                                onClick={handleNavClick}
                                className="relative inline-block group p-4 md:p-1"
                                >
                                <span className="relative z-10">{x.title}</span>
                                <span
                                    className="absolute top-0 left-0 translate-y-7 -translate-x-1.8 w-[90%] h-[50%] md:translate-y-3 md:-translate-x-2 md:w-[98%] md:h-[60%] bg-accent rounded-md z-0 opacity-0 group-hover:opacity-100 transition duration-200"
                                    aria-hidden="true"
                                ></span>
                            </a>
                        );
                    })}

                    <a
                        href="/cert.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-second px-4 py-2 font-medium text-white transition hover:bg-third m-4 md:m-0"
                        >
                        <span className="absolute right-0 -top-10 h-32 w-8 translate-x-12 rotate-12 bg-accent opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                        <span className="relative z-10">3. resume ↗</span>
                    </a>
                </div>
            </div>

        </div>
        </nav>
    )
}

export default Nav