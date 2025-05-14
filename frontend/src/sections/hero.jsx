import React, {useState, useEffect, useRef} from 'react'

const Hero = () => {
    const codeSnippets = [
        `#include <iostream>\n\nint main() {\n  std::cout << "Hello World";\n  return 0;\n}`,
        `print("Hello World")`,
        `cat('Hello World')`,
        `println('Hello World');`,
        `console.log('Hello World')`,
        `<!DOCTYPE html>\n<html>\n  <head>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>`
    ]

    const ScrollingMessage = ({ val }) => (
        <span className={val === 0 ? "" : "hidden md:inline"}>
            🌟 I’m a{" "}
            <span className="relative inline-block z-20">
                <span className="absolute -left-1 bottom-[-3px] w-full h-[60%] md:-left-2 md:bottom-[-5px] md:w-full md:h-[60%] bg-accent rounded-md -z-10" aria-hidden="true"></span>
                full-stack software developer
            </span>{" "}
            and{" "}
            <span className="relative inline-block z-20">
                <span className="absolute -left-1 bottom-[-3px] w-full h-[60%] md:-left-2 md:bottom-[-5px] md:w-full md:h-[60%] bg-accent rounded-md -z-10" aria-hidden="true"></span>
                CS student
            </span>{" "}
            passionate about turning ideas into meaningful products. 👩🏻‍💻
        </span>
    )

    const [showArrow, setShowArrow] = useState(true)

    const contentRef = useRef(null)

    useEffect(() => {
    const checkSpace = () => {
        const hero = document.getElementById("hero")
        const content = contentRef.current
        if (hero && content) {
            const heroRect = hero.getBoundingClientRect()
            const contentRect = content.getBoundingClientRect()
            const space = heroRect.bottom - contentRect.bottom

            setShowArrow(space > 85) // show arrow only if there's 85px of space below content
        }
    }

    checkSpace()
    window.addEventListener("resize", checkSpace)
    window.addEventListener("scroll", checkSpace)
    return () => {
        window.removeEventListener("resize", checkSpace)
        window.removeEventListener("scroll", checkSpace)
    }
    }, [])

    return (
        <section id="hero" className="relative min-h-screen snap-start w-full flex items-center">

            <div className="max-w-screen-xl mx-auto w-full hero-content" ref={contentRef}>
                {/* animated background */}
                <div className="absolute inset-0 -z-40 overflow-hidden pointer-events-none">
                    {[...Array(50)].map((_, i) => {
                        const snippet = codeSnippets[i % codeSnippets.length] // rotate or randomize
                        const isFirst = Math.random() > 0.5
                        const delay = Math.random() * 6
                        const duration = 4 + Math.random() * 3
                        const top = Math.random() * 85
                        const left = Math.random() * 85

                        return (
                            <pre
                                key={`${i}-${top.toFixed(2)}-${left.toFixed(2)}`}
                                className={`absolute text-[10px] md:text-xs lg:text-sm font-mono animate-teleport whitespace-pre leading-tight ${isFirst ? "text-first" : "text-accent"}`}
                                style={{
                                    top: `${top}%`,
                                    left: `${left}%`,
                                    animationDelay: `${delay}s`,
                                    animationDuration: `${duration}s`,
                                }}
                                >
                                {snippet}
                            </pre>
                        )
                    })}
                </div>
                
                {/* Top spacer to push below navbar */}
                {/* <div className="h-9" /> */}

                {/* main content */}
                <div className='pt-9 md:pt-0'>
                    <div className='p-4 py-10'>
                        <h2 className="text-xl sm:text-2xl text-second mb-2 font-semibold sm:pb-2">Hello,</h2>
                        <h3 className="text-xl sm:text-2xl text-second mb-4 font-semibold sm:pb-3">My Name is</h3>
                        <h1 className="w-full text-left font-extrabold text-second tracking-wide sm:mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-[5.9vw] xl:text-[76px] lg:whitespace-nowrap">MELANIE ESCOBAR MARULANDA</h1>
                    </div>

                    {/* scrolling text */}
                    <div className="md:w-full md:overflow-x-hidden bg-first rounded-2xl md:rounded-none xl:rounded-2xl text-second font-medium p-4 mx-4 md:mx-0">
                        <p 
                            className="sm:text-lg md:text-3xl md:inline-block md:whitespace-nowrap md:animate-scroll-left"
                            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}>
                            <ScrollingMessage val={0} />
                            <ScrollingMessage val={1} />
                        </p>
                    </div>
                    
                    {/* bouncing down arrow fixed to bottom */}
                    {showArrow && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
                            <a href="#aboutme" className="text-second text-6xl">↓</a>
                        </div>
                    )}
                </div>
            </div>

        </section>
    )
}

export default Hero