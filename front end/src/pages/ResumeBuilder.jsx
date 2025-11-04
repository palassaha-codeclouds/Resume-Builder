import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  Share2Icon,
  icons,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import Professional from "../components/Professional";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Project from "../components/Project";
import Skills from "../components/Skills";
import TemplateForm from "../components/TemplateForm";

import { createResume, updateResume } from "../utils/api";
import { usePDF } from "react-to-pdf";
import html2pdf from "html2pdf.js";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    title: "",
    professional_summary: "",
    template: "classic",
    accent_color: "#314158",
    is_public: false,
    personal_info: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      profession: "",
    },
    skills: [],
    experience: [],
    education: [],
    projects: [],
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sections = [
    { id: "template", name: "Select Template", icon: User },
    { id: "personal", name: "Personal info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    try {
      if (!resumeId) return;

      const res = await fetch(`https://resume-builder-8cmy.onrender.com/resumes/${resumeId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to load resume");

      const data = await res.json();

      // nested fields
      setResumeData({
        id: data.id || "",
        title: data.title || "",
        personal_info: data.personal_info || {},
        professional_summary: data.professional_summary || "",
        experience: data.experience || [],
        education: data.education || [],
        projects: data.projects || [],
        skills: data.skills || [],
        template: data.template || "classic",
        accent_color: data.accent_color || "#314158",
        is_public: data.is_public || false,
      });

      document.title = data.title || "Resume Builder";
    } catch (err) {
      console.error(err);
      toast.error("Error loading resume: " + err.message);
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  const downloadResume = async () => {
    const element = targetRef.current;

    element.classList.add("w-[713px]");

    const icons = targetRef.current.querySelectorAll(".icon-text");

    icons.forEach((icon) => {
      icon.classList.add("translate-y-[-7px]", "z-50");
    });

    const opt = {
      margin: 0,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };
    await html2pdf().set(opt).from(element).save();

    icons.forEach((icon) => {
      icon.classList.remove("translate-y-[-7px]", "z-50");
    });

    element.classList.remove("w-[713px]");
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app/dashboard"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600 border-none transition-all duration-2000"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {activeSection.id === "template" && (
                  <TemplateForm
                    data={resumeData}
                    onChange={(updatedData) => setResumeData(updatedData)}
                  />
                )}
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "summary" && (
                  <Professional
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "experience" && (
                  <Experience
                    data={resumeData.experience || []}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <Education
                    data={resumeData.education || []}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}
                {activeSection.id === "projects" && (
                  <Project
                    data={resumeData.projects || []}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, projects: data }))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <Skills
                    data={resumeData.skills || []}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              <button
                onClick={async () => {
                  const validPersonal = PersonalInfoForm.validate?.(
                    resumeData.personal_info
                  );
                  const validProfessional = Professional.validate?.(
                    resumeData.professional_summary
                  );
                  const validExperience = Experience.validate?.(
                    resumeData.experience
                  );
                  const validEducation = Education.validate?.(
                    resumeData.education
                  );
                  const validProject = Project.validate?.(resumeData.projects);
                  const validSkill = Skills.validate?.(resumeData.skills);

                  if (
                    validPersonal === false ||
                    validExperience === false ||
                    validEducation === false ||
                    validProject === false ||
                    validSkill === false ||
                    validProfessional === false
                  ) {
                    // toast.error("Please fix validation errors before saving.");
                    console.log("Validation failed:");
                    return;
                  }

                  try {
                    let res;

                    if (resumeData.id) {
                      res = await updateResume(resumeData);
                      toast.success(
                        `Resume "${res.title}" updated successfully!`
                      );
                    } else {
                      res = await createResume(resumeData);
                      toast.success(
                        `Resume "${res.title}" created successfully!`
                      );
                      setResumeData((prev) => ({ ...prev, id: res.id }));
                    }

                    console.log("Saved resume:", res);
                  } catch (err) {
                    console.error("Error saving resume:", err);

                    let msg = "Failed to save resume";
                    if (err.response?.data?.detail)
                      msg = err.response.data.detail;
                    else if (err.message) msg = err.message;

                    toast.error(msg);
                  }
                }}
                className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                <button
                  onClick={downloadResume}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>

            <ResumePreview
              ref={targetRef}
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
