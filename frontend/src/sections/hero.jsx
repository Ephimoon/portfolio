import React from 'react'

const Hero = () => {
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

    return (
        <section id="hero" className="relative min-h-screen snap-start w-full bg-white flex items-center">
            <div className="max-w-screen-xl mx-auto w-full">
                {/* animated background */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {[...Array(60)].map((_, i) => {
                        const isFirst = Math.random() > 0.5;
                        const delay = Math.random() * 6;
                        const duration = 4 + Math.random() * 3; // between 4s and 7s
                        const top = Math.random() * 100;
                        const left = Math.random() * 100;

                        return (
                        <span
                            key={`${i}-${top.toFixed(2)}-${left.toFixed(2)}`}
                            className={`absolute text-sm md:text-lg font-mono animate-teleport ${isFirst ? "text-first" : "text-accent"}`}
                            style={{
                            top: `${top}%`,
                            left: `${left}%`,
                            animationDelay: `${delay}s`,
                            animationDuration: `${duration}s`,
                            }}
                        >
                            01101101 01100101 01101100
                        </span>
                        );
                    })}
                </div>

                {/* main content */}
                {/* Hello, My Name is Melanie Escobar Marulanda */}
                <div className='relative bottom-8'>
                    <div className='p-4 py-10'>
                        <h2 className="text-2xl text-second mb-2 font-semibold pb-2">Hello,</h2>
                        <h3 className="text-2xl text-second mb-4 font-semibold pb-3">My Name is</h3>
                        <h1 className="w-full text-left font-extrabold text-second tracking-wide mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-[5.9vw] xl:text-[76px] lg:whitespace-nowrap">MELANIE ESCOBAR MARULANDA</h1>
                    </div>

                    {/* scrolling text */}
                    <div className="md:w-full md:overflow-x-hidden bg-first rounded-2xl md:rounded-none xl:rounded-2xl text-second font-medium p-4 mx-4 md:mx-0 z-0">
                        <p 
                            className="text-lg md:text-3xl md:inline-block md:whitespace-nowrap md:animate-scroll-left"
                            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}>
                            <ScrollingMessage val={0} />
                            <ScrollingMessage val={1} />
                        </p>
                    </div>
                </div>


                {/* bouncing down arrow fixed to bottom */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-5">
                    <a href="#aboutme" className="text-second text-6xl">↓</a>
                </div>
            </div>

        </section>
    )
}

export default Hero