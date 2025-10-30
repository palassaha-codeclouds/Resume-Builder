import React from "react";
import Title from "./Title";

const Features = () => {
    const [hoverIndex, setHoverIndex] = React.useState(null);

    const features = [
        {
            color: "violet",
            bg: "bg-violet-100",
            border: "border-violet-300",
            iconColor: "stroke-violet-600",
            title: "Smart Resume Templates",
            description:
                "Choose from modern, ATS-friendly templates designed to highlight your skills and experience.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6 stroke-violet-600"
                >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
            ),
        },
        {
            color: "green",
            bg: "bg-green-100",
            border: "border-green-300",
            iconColor: "stroke-green-600",
            title: "Export in One Click",
            description:
                "Instantly download your resume in high-quality PDF format without losing layout or styling.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6 stroke-green-600"
                >
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>
            ),
        },
        {
            color: "orange",
            bg: "bg-orange-100",
            border: "border-orange-300",
            iconColor: "stroke-orange-600",
            title: "Section-Based Editing",
            description:
                "Fill and manage all resume sections easily — experience, skills, education, projects, and more.",
            icon: (
                <svg
                    className="size-6 stroke-orange-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 15V3" />
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="m7 10 5 5 5-5" />
                </svg>
            ),
        },
    ];

    return (
        <div id="features">
            <Title title='Build your resume' description='Our simplified portal helps you create professional resume in minutes.'/>
            <section className="w-full py-2 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
                {/* Image */}
                <div className="flex justify-center md:justify-start w-full md:w-1/2">
                    <img
                        className="w-full max-w-lg sm:max-w-xl xl:-ml-20 object-contain"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
                        alt="Features preview"
                    />
                </div>

                {/* Features List */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    {features.map((feature, index) => {
                        const isHovered = hoverIndex === index;
                        return (
                            <div
                                key={index}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                                className={`flex items-start gap-4 p-6 rounded-xl transition-all duration-300 shadow-sm cursor-pointer border 
                                    ${isHovered
                                        ? `${feature.bg} ${feature.border} shadow-md`
                                        : "border-transparent hover:bg-slate-50"
                                    }`}
                            >
                                <div>{feature.icon}</div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-slate-600 mt-1">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </div>
    );
};

export default Features;
