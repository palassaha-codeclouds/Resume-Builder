import { Plus, Trash2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const Project = ({ data, onChange }) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: "",
        };
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const validateField = (field, value) => {
        if (!value.trim()) {
            toast.error(`${field.replace("_", " ")} is required`);
            return false;
        }
        return true;
    };

    const validateProjects = () => {
        let valid = true;

        for (const [index, project] of data.entries()) {
            if (!project.name?.trim()) {
                toast.error(`Project #${index + 1}: Name is required`);
                valid = false;
            }
            if (!project.type?.trim()) {
                toast.error(`Project #${index + 1}: Type is required`);
                valid = false;
            }
            if (!project.description?.trim()) {
                toast.error(`Project #${index + 1}: Description is required`);
                valid = false;
            }
        }

        return valid;
    };

    Project.validate = validateProjects;

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Project Details
                    </h3>
                    <p className="text-sm text-gray-500">Add your project details.</p>
                </div>

                <button
                    onClick={addProject}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 rounded-lg hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>

            <div className="space-y-4 mt-6">
                {data.map((project, index) => (
                    <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg space-y-3"
                    >
                        <div className="flex justify-between items-start">
                            <h4>Project #{index + 1}</h4>
                            <button
                                onClick={() => removeProject(index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>

                        <div className="grid gap-3">
                            <input
                                value={project.name || ""}
                                onChange={(e) =>
                                    updateProject(index, "name", e.target.value)
                                }
                                onBlur={(e) =>
                                    validateField("Project Name", e.target.value)
                                }
                                type="text"
                                placeholder="Project Name"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                            />

                            <input
                                value={project.type || ""}
                                onChange={(e) =>
                                    updateProject(index, "type", e.target.value)
                                }
                                onBlur={(e) =>
                                    validateField("Project Type", e.target.value)
                                }
                                type="text"
                                placeholder="Project Type"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                            />

                            <textarea
                                rows={4}
                                value={project.description || ""}
                                onChange={(e) =>
                                    updateProject(index, "description", e.target.value)
                                }
                                onBlur={(e) =>
                                    validateField("Project Description", e.target.value)
                                }
                                placeholder="Project Description"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Project;
