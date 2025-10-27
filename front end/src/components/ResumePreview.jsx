import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  // Safe defaults for all nested fields
  const safeData = {
    personal_info: data.personal_info || {},
    skills: data.skills || [],
    experience: data.experience || [],
    education: data.education || [],
    projects: data.projects || [],
    professional_summary: data.professional_summary || "",
    title: data.title || "",
    template: data.template || "classic",
    accent_color: data.accent_color || "#314158",
    public: data.public || false,
    ...data, // keep any other fields
  };

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={safeData} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={safeData} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={safeData} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "border border-gray-200 print:shadow-none print:border-none " + classes
        }
      >
        {renderTemplate()}
      </div>

      <style>
        {`
          @page {
            size: letter;
            margin: 0;
          }
          @media print {
            html, body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }
            body * {
              visibility: hidden;
            }
            #resume-preview, #resume-preview * {
              visibility: visible;
            }
            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
