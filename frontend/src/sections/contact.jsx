import React, { useRef, useState, useEffect } from 'react';
import Form from '../components/form.jsx';
import Footer from '../components/footer.jsx';


const Contact = () => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText("melanie@melesco.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleMail = () => {
    window.open("mailto:melanie@melesco.com");
    setShowOptions(false);
  };

  return (
    <section id="contact" className="relative snap-start w-full bg-white flex flex-col" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
      <div className="h-16" />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-xl w-full px-6 sm:px-10 py-12">
          <h2 className="text-3xl md:text-5xl text-second font-semibold pb-6 font-gaegu text-center">
            ways to reach me!
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            
            <div ref={dropdownRef} className="relative text-left">
              {/* Main trigger */}
              <button
                onClick={() => setShowOptions(prev => !prev)}
                className="relative flex items-center justify-center w-full min-w-[220px] h-[40px] font-semibold bg-accent rounded-lg cursor-pointer transition-all duration-700 focus:outline-none"
              >
                <span
                  className={`absolute transition-all duration-500 ${
                    copied ? 'opacity-0 -translate-y-3 text-third' : 'opacity-100 text-third'
                  }`}
                >
                  melanie@melesco.com
                </span>
                <span
                  className={`absolute transition-all duration-500 ${
                    copied ? 'translate-y-0 opacity-100 text-third' : 'translate-y-3 opacity-0'
                  }`}
                >
                  Copied
                </span>
              </button>

              {/* Dropdown options */}

              <div className={`absolute left-1/2 -translate-x-1/2 w-full bg-accent text-third p-2 rounded-b-md shadow-md flex flex-col items-start z-10 transition-all duration-200 ease-in-out ${showOptions ? 'opacity-100 -translate-y-1.5 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <button onClick={handleMail} className="hover:underline cursor-pointer px-2 py-1 text-center w-full">
                  Mail directly 📩
                </button>
                <button
                  onClick={() => {
                    handleCopy();
                    setShowOptions(false);
                  }}
                  className="hover:underline cursor-pointer px-2 py-1 text-center w-full"
                >
                  Copy 📋
                </button>
              </div>
            </div>

            <a
              href="https://linkedin.com/in/melanie-escobar-marulanda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-second border border-[#0077b5] px-2 py-1 rounded-md flex items-center gap-2 hover:bg-[#0077b5] hover:text-white transition"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" height="20" width="20">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
              LinkedIn
            </a>
          </div>

          <Form />

        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;