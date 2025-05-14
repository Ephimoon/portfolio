import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const AboutMe = () => {
    const controls = useAnimation()
    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 })
    const [scrollDirection, setScrollDirection] = React.useState(null)

    React.useEffect(() => {
        let lastScrollY = window.scrollY

        const updateScrollDir = () => {
            const currentY = window.scrollY
            if (currentY > lastScrollY) {
                setScrollDirection('down')
            } else if (currentY < lastScrollY) {
                setScrollDirection('up')
            }
            lastScrollY = currentY
        }

        window.addEventListener('scroll', updateScrollDir)
        return () => window.removeEventListener('scroll', updateScrollDir)
    }, [])
  
    React.useEffect(() => {
        if (inView) {
            controls.start('visible')
        } else {
            controls.start('hidden')
        }
    }, [controls, inView, scrollDirection])

    const variants = {
        hidden: {
            opacity: 0,
            y: scrollDirection === 'down' ? 100 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    }

    return (
        <section id="aboutme" className="relative snap-start w-full bg-white flex items-center" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
            <div className="max-w-screen-xl mx-auto w-full">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={variants}
                    className='flex flex-col md:flex-row'
                    >

                    {/* Top spacer to push below navbar */}
                    <div className="h-15" />

                    {/* picture */}
                    <div className="flex items-center justify-center w-full md:w-1/3 p-4">
                        <img src="/metuki.png" alt="Melanie Escobar Marulanda" className="max-h-[15vh] sm:max-h-[25vh] md:max-h-[45vh] lg:max-h-[60vh] w-auto h-auto object-contain rounded-2xl shadow-lg" />
                    </div>

                    {/* text */}
                    <div className='h-2/3 md:h-full md:w-2/3 flex flex-col justify-center items-center p-10 gap-5 font-gaegu font-bold text-second'>
                        <h1 className="text-xl md:text-3xl font-bold relative">
                            a little {" "}
                            <span className="relative z-10">about me</span>
                            {" :)"}
                            <span className="absolute left-16 bottom-1 w-[45%] h-3 md:left-24 md:bottom-1 md:w-[45%] md:h-3 bg-accent opacity-60 -z-0 rounded-md"></span>
                        </h1>
                        <p className='text-sm md:text-xl'>I am a senior at the University of Houston pursuing a degree in Computer Science. As a student, I have worked on full-stack software development, gaining hands-on experience through both coursework and real-world projects.</p>
                        <p className='text-sm md:text-xl'>Outside of tech, I love reading, watching movies, chilling with my cat Tuki, and going for longggg walks to unwind.</p>

                        {/* buttons */}
                        <div className="flex gap-4 mt-4">
                            <a href="/melanie_escobar_marulanda_resume.pdf" className="flex items-center justify-center px-3 py-2 text-sm font-medium bg-accent border-2 border-third text-third rounded-xl hover:bg-third hover:text-white transition-transform duration-200 hover:scale-105">
                                resume
                            </a>

                            <button
                                onClick={() => window.open('https://github.com/Ephimoon', '_blank')}
                                className="items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-transform duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#000,#000),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:scale-105 active:scale-95 h-10 px-4 py-2 inline-flex"
                                >
                                <div className="flex items-center">
                                    <svg className="size-4" viewBox="0 0 438.549 438.549">
                                        <path
                                            d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                                            fill="#fff"
                                        ></path>
                                    </svg>
                                    <span className="ml-1 text-white lg:inline p-1">GitHub</span>
                                </div>
                            </button>

                            <button
                                onClick={() => window.open("https://linkedin.com/in/melanie-escobar-marulanda", "_blank")}
                                className="cursor-pointer flex items-center gap-2 rounded-xl border-2 border-[#0077b5] bg-white text-sm font-medium px-4 py-2 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-transform duration-200 hover:scale-105"
                                >
                                {/* Icon */}
                                <svg viewBox="0 0 16 16" fill="currentColor" height="20" width="20" className="fill-current" >
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg>

                                {/* Text */}
                                <span>LinkedIn</span>
                            </button>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutMe