import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const footerBarItems = [
        { title: 'resume', url: "/cert.pdf" },
        { title: 'github', url: "https://github.com/Ephimoon" },
        { title: 'linkedIn', url: "https://www.linkedin.com/in/melanie-escobar-marulanda" }
      ];

    return (
        <nav className="bg-first w-full">
        <div className="max-w-screen-xl mx-auto">
            <div className="md:flex md:items-center md:justify-between md:py-1">

                <h2 className='p-2 text-second font-gaegu'>thank you for stopping by /ᐠ｡ꞈ｡ᐟ✿\</h2>

                <div className={"flex flex-row items-center gap-3 font-gaegu text-second text-sm p-4 md:p-1"}>
                    {footerBarItems.map((x, index) => {
                        return (
                            <a
                                key={index}
                                href={x.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative inline-block group p-1 hover:text-third hover:-translate-y-1 transition duration-200"
                                >
                                {x.title}
                            </a>
                        );
                    })}
                </div>

                <h3 className='p-2 font-mono text-second text-sm'>© made with 💚 by melanie :)</h3>
            </div>

        </div>
        </nav>
    )
}

export default Footer