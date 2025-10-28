import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    // Safe defaults
    const personal_info = data.personal_info || {};
    const experience = data.experience || [];
    const education = data.education || [];
    const projects = data.projects || [];
    const skills = data.skills || [];
    const professional_summary = data.professional_summary || "";

    return (
        <div className="max-w-4xl mx-auto p-8 print:p-0 bg-white text-gray-800 leading-relaxed">
            {/* Header */}
            <header
                className="text-center mb-8 pb-6 border-b-2"
                style={{ borderColor: accentColor }}
            >
                <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    {personal_info.full_name || "Your Name"}
                </h1>
                <p className="uppercase text-gray-700 font-medium text-sm tracking-widest mb-4">
                    {personal_info.profession || "Profession"}
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {personal_info.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{personal_info.email}</span>
                        </div>
                    )}
                    {personal_info.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{personal_info.phone}</span>
                        </div>
                    )}
                    {personal_info.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{personal_info.location}</span>
                        </div>
                    )}
                    {personal_info.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-4" />
                            <span className="break-all">{personal_info.linkedin}</span>
                        </div>
                    )}
                    {personal_info.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span className="break-all">{personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {professional_summary && (
                <section className="mb-6">
                    <h2
                        className="text-xl font-semibold mb-3"
                        style={{ color: accentColor }}
                    >
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        PROFESSIONAL EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div
                                key={index}
                                className="border-l-3 pl-4"
                                style={{ borderColor: accentColor }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {exp.position || "Position"}
                                        </h3>
                                        <p className="text-gray-700 font-medium">
                                            {exp.company || "Company"}
                                        </p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>
                                            {formatDate(exp.start_date)} -{" "}
                                            {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <ul className="list-disc list-outside ml-5 text-gray-700 leading-relaxed space-y-1">
                                        {exp.description
                                            .split("\n")
                                            .map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        PROJECTS
                    </h2>
                    <div className="space-y-3">
                        {projects.map((proj, index) => (
                            <div key={index} className="border-l-3 border-gray-300 pl-6">
                                <h3 className="font-semibold text-gray-800">
                                    {proj.name || "Project Name"}
                                </h3>
                                {proj.type && (
                                    <p className="text-sm mb-1" style={{ color: accentColor }}>
                                        {proj.type}
                                    </p>
                                )}
                                {proj.description && (
                                    <ul className="list-disc list-outside ml-5 text-gray-700 space-y-1">
                                        {proj.description
                                            .split("\n")
                                            .map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        EDUCATION
                    </h2>
                    <div className="space-y-3">
                        {education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700">
                                        {edu.institution || "Institution"}
                                    </p>
                                    {edu.gpa && (
                                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        CORE SKILLS
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                        {skills.map((skill, index) => (
                            <div key={index} className="text-gray-700">
                                • {skill.skill_name || skill || "Skill"}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;
