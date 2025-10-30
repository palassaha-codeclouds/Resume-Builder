import React from "react";
import { Check, Layout } from "lucide-react";

import classicPreview from "../assets/classic.png";
import modernPreview from "../assets/modern.png";
import minimalPreview from "../assets/minimal.png";

const TemplateForm = ({ data, onChange }) => {
  const handleTemplateSelect = (templateId) => {
    onChange({ ...data, template: templateId });
  };

  const templates = [
    {
      id: "classic",
      name: "Classic",
      image: classicPreview,
      preview:
        "A clean, traditional resume format with clear sections and professional typography.",
    },
    {
      id: "modern",
      name: "Modern",
      image: modernPreview,
      preview:
        "Sleek design with strategic use of color and modern font choices.",
    },
    {
      id: "minimal",
      name: "Minimal",
      image: minimalPreview,
      preview: "Ultra-clean design that puts your content front and center.",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Layout className="size-4 text-teal-600" />
        Choose Resume Template
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Select the template style you want for your resume.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              data.template === template.id
                ? "border-teal-500 bg-teal-50 shadow-sm"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            {data.template === template.id && (
              <div className="absolute top-2 right-2">
                <div className="size-5 bg-teal-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
            )}

            <img
              src={template.image}
              alt={`${template.name} Preview`}
              className="w-full object-contain rounded-md mb-3 bg-gray-100"
            />

            <h4 className="font-medium text-gray-800">{template.name}</h4>
            <p className="text-xs text-gray-500 italic mt-1">
              {template.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateForm;
