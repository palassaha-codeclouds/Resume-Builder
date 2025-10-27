import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	// Safe defaults
	const personal = data.personal_info || {};
	const experience = data.experience || [];
	// FIX 1: Changed data.project to data.projects
	const projects = data.projects || [];
	const education = data.education || [];
	const skills = data.skills || [];
	const summary = data.professional_summary || "";

	const safeLink = (url) => (url ? url.split("https://")[1] || url : "");

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800">
			{/* Header */}
			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-light mb-3">{personal.full_name || "Your Name"}</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
					{personal.email && (
						<div className="flex items-center gap-2">
							<Mail className="w-4 h-4" />
							<span>{personal.email}</span>
						</div>
					)}
					{personal.phone && (
						<div className="flex items-center gap-2">
							<Phone className="w-4 h-4" />
							<span>{personal.phone}</span>
						</div>
					)}
					{personal.location && (
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4" />
							<span>{personal.location}</span>
						</div>
					)}
					{personal.linkedin && (
						<a target="_blank" rel="noreferrer" href={personal.linkedin} className="flex items-center gap-2">
							<Linkedin className="w-4 h-4" />
							<span className="break-all text-xs">{safeLink(personal.linkedin)}</span>
						</a>
					)}
					{personal.website && (
						<a target="_blank" rel="noreferrer" href={personal.website} className="flex items-center gap-2">
							<Globe className="w-4 h-4" />
							<span className="break-all text-xs">{safeLink(personal.website)}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-8">
				{/* Professional Summary */}
				{summary && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Professional Summary</h2>
						<p className="text-gray-700">{summary}</p>
					</section>
				)}

				{/* Experience */}
				{experience.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">Experience</h2>
						<div className="space-y-6">
							{experience.map((exp, i) => (
								<div key={i} className="relative pl-6 border-l border-gray-200" style={{ borderLeftColor: accentColor }}>
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="text-xl font-medium text-gray-900">{exp.position || "Position"}</h3>
											<p className="font-medium" style={{ color: accentColor }}>
												{exp.company || "Company"}
											</p>
										</div>
										<div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">{exp.description}</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* Projects */}
				{projects.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Projects</h2>
						<div className="space-y-6">
							{projects.map((p, i) => (
								<div key={i} className="relative pl-6 border-l border-gray-200" style={{ borderLeftColor: accentColor }}>
									<h3 className="text-lg font-medium text-gray-900">{p.name || "Project Name"}</h3>
									{p.description && <div className="text-gray-700 leading-relaxed text-sm mt-3">{p.description}</div>}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-8">
					{/* Education */}
					{education.length > 0 && (
						<section>
							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Education</h2>
							<div className="space-y-4">
								{education.map((edu, i) => (
									<div key={i}>
										<h3 className="font-semibold text-gray-900">
											{edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
										</h3>
										<p style={{ color: accentColor }}>{edu.institution || "Institution"}</p>
										<div className="flex justify-between items-center text-sm text-gray-600">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{skills.length > 0 && (
						<section>
							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Skills</h2>
							<div className="flex flex-wrap gap-2">
								{skills.map((skill, i) => (
									<span key={i} className="px-3 py-1 text-sm text-white rounded-full" style={{ backgroundColor: accentColor }}>
										{/* FIX 2: Check for skill_name property if it's an object, otherwise use the skill string */}
										{(skill.skill_name || skill) || "Skill"}
									</span>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
};

export default ModernTemplate;