import React from "react";

const Footer = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
                * { font-family: 'Poppins', sans-serif; }
            `}</style>

            <footer className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between overflow-hidden gap-12 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-teal-200/60 to-white mt-10">
                
                {/* Left Section */}
                <div className="flex flex-col sm:flex-wrap sm:flex-row gap-10 md:gap-[60px] xl:gap-[140px] justify-center sm:justify-start text-center sm:text-left">
                    
                    {/* Logo */}
                    <div className="flex justify-center sm:block w-full sm:w-auto">
                        <a href="#">
                            <img src="/logo.svg" alt="logo" className="h-11 w-auto mx-auto sm:mx-0" />
                        </a>
                    </div>

                    {/* Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-12 mt-6 sm:mt-0 w-full sm:w-auto">
                        <div>
                            <p className="text-slate-800 font-semibold">Product</p>
                            <ul className="mt-2 space-y-2">
                                <li><a href="/" className="hover:text-teal-600 transition">Home</a></li>
                                <li><a href="/" className="hover:text-teal-600 transition">Support</a></li>
                                <li><a href="/" className="hover:text-teal-600 transition">Pricing</a></li>
                                <li><a href="/" className="hover:text-teal-600 transition">Affiliate</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-slate-800 font-semibold">Resources</p>
                            <ul className="mt-2 space-y-2">
                                <li><a href="/" className="hover:text-teal-600 transition">Company</a></li>
                                <li><a href="/" className="hover:text-teal-600 transition">Blogs</a></li>
                                <li><a href="/" className="hover:text-teal-600 transition">Community</a></li>
                                <li><a href="/" className="hover:text-teal-600 transition">Careers<span className="text-xs text-white bg-teal-600 rounded-md ml-2 px-2 py-1">We’re hiring!</span></a></li>
                                <li><a href="/" className="hover:text-teal-600 transition">About</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-slate-800 font-semibold">Legal</p>
                            <ul className="mt-2 space-y-2">
                                <li><a href="/" className="hover:text-teal-600 transition">Privacy</a></li>
                                <li><a href="/" className="hover:text-teal-600 transition">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-3">
                    <p className="max-w-60">Making every customer feel valued—no matter the size of your audience.</p>
                    
                    {/* Socials */}
                    <div className="flex items-center gap-4 mt-3 justify-center lg:justify-end">
                        <a href="https://dribbble.com" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 hover:text-teal-500">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 hover:text-teal-500">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="https://x.com" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 hover:text-teal-500">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 hover:text-teal-500">
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                <path d="m10 15 5-3-5-3z" />
                            </svg>
                        </a>
                    </div>

                    <p className="mt-3 text-center lg:text-right">© 2025 resume.</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
