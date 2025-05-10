import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import ConfirmModal from './confirmmodal';

const Form = () => {
    const formRef = useRef();
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState({ name: false, email: false });
    const [showModal, setShowModal] = useState(false);
    const [pendingSubmit, setPendingSubmit] = useState(false); 

    const sendEmail = (e) => {
        e.preventDefault();

        const form = formRef.current;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const message = form.message.value.trim();

        const hasErrors = {
        name: name === '',
        email: !emailPattern.test(email),
        message: message === '',
        };

        setErrors(hasErrors);

        if (hasErrors.name || hasErrors.email || hasErrors.message) return;

        setPendingSubmit(true);
        setShowModal(true);
    };

    const confirmAndSend = () => {
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(
            () => {
                setDone(true);
                formRef.current.reset();
                setErrors({ name: false, email: false, message: false });
            },
            (error) => {
                console.error('FAILED...', error);
                alert("Something went wrong. Try again later.");
            }
        );
        setShowModal(false);
        setPendingSubmit(false);
    };

    useEffect(() => {
        if (!done) return;
      
        const handleClick = () => setDone(false);
      
        document.addEventListener("mousedown", handleClick);

        const timeout = setTimeout(() => setDone(false), 5000);
        return () => {
          document.removeEventListener("mousedown", handleClick);
          clearTimeout(timeout);
        };
    }, [done]);
    
    return (
        <div>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        className={`w-full p-3 rounded-md border ${
                        errors.name ? 'border-red-500' : 'border-second'
                        } bg-first text-second placeholder-second focus:outline-none`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">Name is required.</p>
                    )}
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className={`w-full p-3 rounded-md border ${
                        errors.email ? 'border-red-500' : 'border-second'
                        } bg-first text-second placeholder-second focus:outline-none`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>
                    )}
                </div>

                <div>
                    <textarea
                        name="message"
                        placeholder="write your message here !!"
                        rows="6"
                        className={`w-full p-3 rounded-md border ${
                            errors.message ? 'border-red-500' : 'border-second'
                            } bg-first text-second placeholder-second focus:outline-none`}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">Message is required.</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-second text-white py-3 rounded-md hover:scale-105 transition-transform cursor-pointer"
                    >
                    submit
                </button>

                {done && (
                <p className="text-center text-green-600 pt-2">
                    Thanks! Your message has been sent.
                </p>
                )}
            </form>

            {showModal && (
                <ConfirmModal
                    onConfirm={confirmAndSend}
                    onCancel={() => {
                    setShowModal(false);
                    setPendingSubmit(false);
                    }}
                />
            )}
        </div>
    );
};

export default Form;
