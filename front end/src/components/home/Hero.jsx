import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ];

    return (
        <>
            <div className="flex flex-col">
                {/* Navbar */}
                <nav className="z-40 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <a href="/">
                        <img src="/logo.svg" alt="logo" className="h-9 sm:h-10 w-auto" />
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-10 text-slate-800">
                        <a href="#" className="hover:text-teal-600 transition">Home</a>
                        <a href="#features" className="hover:text-teal-600 transition">Features</a>
                        <a href="#testimonials" className="hover:text-teal-600 transition">Testimonials</a>
                        <a href="#cta" className="hover:text-teal-600 transition">Contact</a>
                    </div>

                    {/* Buttons */}
                    <div className="hidden md:flex gap-2">
                        <Link
                            to="/app?state=register"
                            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 active:scale-95 transition-all rounded-full text-white text-sm sm:text-base"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/app?state=login"
                            className="px-5 py-2 border hover:bg-slate-50 active:scale-95 transition-all rounded-full text-slate-700 text-sm sm:text-base"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden p-2 rounded-md active:scale-95 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu">
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <a href="#" className="text-white text-xl">Home</a>
                    <a href="#features" className="text-white text-xl">Features</a>
                    <a href="#testimonials" className="text-white text-xl">Testimonials</a>
                    <a href="#cta" className="text-white text-xl">Contact</a>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="p-2 bg-teal-600 hover:bg-teal-700 transition text-white rounded-md"
                    >
                        Close
                    </button>
                </div>

                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center flex-grow text-black px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40 text-center">
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80vw] sm:w-[60vw] md:w-[40vw] aspect-square bg-teal-300 blur-[120px] opacity-30 -z-10"></div>

                    {/* Avatars + Stars */}
                    <div className="flex items-center justify-center flex-wrap gap-3 mt-16 sm:mt-24">
                        <div className="flex -space-x-3 pr-3">
                            {[
                                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
                                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
                                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
                                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
                                'https://randomuser.me/api/portraits/men/75.jpg',
                            ].map((url, i) => (
                                <img
                                    key={i}
                                    src={url}
                                    alt="user"
                                    className="size-8 sm:size-9 object-cover rounded-full border-2 border-white"
                                />
                            ))}
                        </div>
                        <div>
                            <div className="flex justify-center">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-star text-transparent fill-teal-600"
                                        >
                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                        </svg>
                                    ))}
                            </div>
                            <p className="text-sm text-gray-700">Used by 10,000+ users</p>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl text-center mt-8 sm:mt-10 leading-snug sm:leading-[50px] md:leading-[60px] lg:leading-[70px]">
                        Crack your dream job with{' '}
                        <span className="bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                            Perfectly Crafted
                        </span>{' '}
                        resumes.
                    </h1>

                    <p className="max-w-md text-center text-base sm:text-lg my-6 sm:my-8 text-slate-600">
                        Create, edit, and download professional resumes with us.
                    </p>

                    {/* CTA Button */}
                    <Link
                        to="/app?state=register"
                        className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 sm:px-10 h-11 sm:h-12 m-1 ring-1 ring-teal-600 flex items-center justify-center gap-2 transition"
                    >
                        Get Started
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-right"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </section>
            </div>

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                  * {
                    font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>
    );
};

export default Hero;
