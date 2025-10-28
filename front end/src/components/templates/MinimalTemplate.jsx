const MinimalTemplate = ({ data = {}, accentColor = "#000" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const personal = data.personal_info || {};
    const experience = data.experience || [];
    const projects = data.project || [];
    const education = data.education || [];
    const skills = data.skills || [];
    const professionalSummary = data.professional_summary || "";

    return (
        <div className="max-w-4xl mx-auto p-8 print:p-0 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {personal.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && (
                        <span className="break-all">{personal.linkedin}</span>
                    )}
                    {personal.website && (
                        <span className="break-all">{personal.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {professionalSummary && (
                <section className="mb-10">
                    <p className="text-gray-700">{professionalSummary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-10">
                    <h2
                        className="text-sm uppercase tracking-widest mb-6 font-medium"
                        style={{ color: accentColor }}
                    >
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position || ""}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} -{" "}
                                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{exp.company || ""}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-10">
                    <h2
                        className="text-sm uppercase tracking-widest mb-6 font-medium"
                        style={{ color: accentColor }}
                    >
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {projects.map((proj, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-2 justify-between items-baseline"
                            >
                                <h3 className="text-lg font-medium">{proj.name || ""}</h3>
                                {proj.type && (
                                    <p className="text-sm text-gray-500">{proj.type}</p>
                                )}
                                {proj.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {proj.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-10">
                    <h2
                        className="text-sm uppercase tracking-widest mb-6 font-medium"
                        style={{ color: accentColor }}
                    >
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree || ""} {edu.field ? `in ${edu.field}` : ""}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution || ""}</p>
                                    {edu.gpa && (
                                        <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h2
                        className="text-sm uppercase tracking-widest mb-6 font-medium"
                        style={{ color: accentColor }}
                    >
                        Skills
                    </h2>
                    <div className="text-gray-700">{skills.join(" • ")}</div>
                </section>
            )}
        </div>
    );
};

export default MinimalTemplate;
