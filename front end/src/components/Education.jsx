import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const Education = ({ data, onChange }) => {
    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
        };
        onChange([...data, newEducation]);
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const validateField = (field, value, education) => {
        switch (field) {
            case "institution":
                if (!value.trim()) {
                    toast.error("Institution name is required");
                    return false;
                }
                break;

            case "degree":
                if (!value.trim()) {
                    toast.error("Degree is required");
                    return false;
                }
                break;

            case "field":
                if (!value.trim()) {
                    toast.error("Field of study is required");
                    return false;
                }
                break;

            case "graduation_date":
                if (!value) {
                    toast.error("Graduation date is required");
                    return false;
                }
                break;

            case "gpa":
                if (value && !/^\d+(\.\d+)?$/.test(value)) {
                    toast.error("GPA must be a numeric value");
                    return false;
                }
                const gpaValue = parseFloat(value);
                if (value && (gpaValue < 0 || gpaValue > 10)) {
                    toast.error("GPA must be between 0 and 10");
                    return false;
                }
                break;

            default:
                break;
        }
        return true;
    };

    const validateEducation = () => {
        if (!data || data.length === 0) return true;

        for (const edu of data) {
            if (!edu.institution?.trim()) {
                toast.error("Institution name is required");
                return false;
            }
            if (!edu.degree?.trim()) {
                toast.error(`Degree is required for "${edu.institution || "an entry"}"`);
                return false;
            }
            if (!edu.field?.trim()) {
                toast.error(`Field of study is required for "${edu.institution || "an entry"}"`);
                return false;
            }
            if (!edu.graduation_date) {
                toast.error(`Graduation date is required for "${edu.institution || "an entry"}"`);
                return false;
            }
            if (edu.gpa && (!/^\d+(\.\d+)?$/.test(edu.gpa) || edu.gpa < 0 || edu.gpa > 10)) {
                toast.error(`Invalid GPA for "${edu.institution || "an entry"}"`);
                return false;
            }
        }
        return true;
    };

    Education.validate = validateEducation;

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Education
                    </h3>
                    <p className="text-sm text-gray-500">Add your education details.</p>
                </div>

                <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 rounded-lg hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Education
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No education added yet.</p>
                    <p className="text-sm">Click "Add Education" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((education, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg space-y-3"
                        >
                            <div className="flex justify-between items-start">
                                <h4>Education #{index + 1}</h4>
                                <button
                                    onClick={() => removeEducation(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    value={education.institution || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "institution", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        validateField("institution", e.target.value, education)
                                    }
                                    type="text"
                                    placeholder="Institute Name *"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                />

                                <input
                                    value={education.degree || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "degree", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        validateField("degree", e.target.value, education)
                                    }
                                    type="text"
                                    placeholder="Degree (e.g. B.Sc, M.A) *"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                />

                                <input
                                    value={education.field || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "field", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        validateField("field", e.target.value, education)
                                    }
                                    type="text"
                                    placeholder="Field of Study *"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                />

                                <input
                                    value={education.graduation_date || ""}
                                    onChange={(e) =>
                                        updateEducation(index, "graduation_date", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        validateField("graduation_date", e.target.value, education)
                                    }
                                    type="month"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                />

                                <input
                                    value={education.gpa || ""}
                                    onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                                    onBlur={(e) => validateField("gpa", e.target.value, education)}
                                    type="text"
                                    placeholder="GPA"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Education;
