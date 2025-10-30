import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const Experience = ({ data, onChange }) => {
    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
        };
        onChange([...data, newExperience]);
    };

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const validateField = (field, value, experience) => {
        switch (field) {
            case "company":
                if (!value.trim()) {
                    toast.error("Company name is required");
                    return false;
                }
                break;

            case "position":
                if (!value.trim()) {
                    toast.error("Job title is required");
                    return false;
                }
                break;

            case "start_date":
                if (!value) {
                    toast.error("Start date is required");
                    return false;
                }
                break;

            case "end_date":
                if (!experience.is_current && !value) {
                    toast.error("End date is required unless marked as current job");
                    return false;
                }
                if (
                    experience.start_date &&
                    value &&
                    new Date(value) < new Date(experience.start_date)
                ) {
                    toast.error("End date cannot be before start date");
                    return false;
                }
                break;

            default:
                break;
        }
        return true;
    };

    const validateExperience = () => {
        if (!data || data.length === 0) return true;

        for (const exp of data) {
            const { company, position, start_date, end_date, is_current } = exp;

            if (!company.trim()) {
                toast.error("Please enter the company name for all experiences.");
                return false;
            }

            if (!position.trim()) {
                toast.error(`Please enter the job title for "${company}".`);
                return false;
            }

            if (!start_date) {
                toast.error(`Start date is missing for "${position}" at "${company}".`);
                return false;
            }

            if (!is_current && !end_date) {
                toast.error(
                    `End date is required for "${position}" at "${company}".`
                );
                return false;
            }

            if (end_date && new Date(end_date) < new Date(start_date)) {
                toast.error(
                    `End date cannot be before start date for "${position}" at "${company}".`
                );
                return false;
            }
        }

        return true;
    };

    Experience.validate = validateExperience;

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Professional Experience
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add your job experience (optional).
                    </p>
                </div>

                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 rounded-lg hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No work experience added yet.</p>
                    <p className="text-sm">Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((experience, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg space-y-3"
                        >
                            <div className="flex justify-between items-start">
                                <h4>Experience #{index + 1}</h4>
                                <button
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    value={experience.company || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "company", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        validateField("company", e.target.value, experience)
                                    }
                                    type="text"
                                    placeholder="Company Name *"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                />

                                <input
                                    value={experience.position || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "position", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        validateField("position", e.target.value, experience)
                                    }
                                    type="text"
                                    placeholder="Job Title *"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                />

                                <input
                                    value={experience.start_date || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "start_date", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        validateField("start_date", e.target.value, experience)
                                    }
                                    type="month"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                />

                                <input
                                    value={experience.end_date || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "end_date", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        validateField("end_date", e.target.value, experience)
                                    }
                                    type="month"
                                    disabled={experience.is_current}
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                                />
                            </div>

                            <label className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={experience.is_current || false}
                                    onChange={(e) =>
                                        updateExperience(index, "is_current", e.target.checked)
                                    }
                                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm text-gray-700">
                                    Currently working here
                                </span>
                            </label>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700">
                                        Job Description
                                    </label>
                                    {/* <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                                        <Sparkles className="w-3 h-3" />
                                        Enhance with AI
                                    </button> */}
                                </div>
                                <textarea
                                    value={experience.description || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "description", e.target.value)
                                    }
                                    rows={4}
                                    className="w-full text-sm px-3 py-2 rounded-lg resize-none focus:ring focus:ring-green-500 focus:border-green-500"
                                    placeholder="Describe your key responsibilities and achievements..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Experience;
