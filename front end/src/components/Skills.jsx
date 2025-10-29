import { Plus, Sparkles, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Skills = ({ data = [], onChange }) => {
    const [newSkill, setNewSkill] = useState("");
    const [skillsData, setSkillsData] = useState(data);

    useEffect(() => {
        onChange(skillsData);
    }, [skillsData]);

    const addSkill = () => {
        const skillTrimmed = newSkill.trim();
        if (skillTrimmed) {
            if (skillsData.some(s => s.skill_name === skillTrimmed)) {
                toast.error("This skill is already added");
                return;
            }
            const updated = [...skillsData, { skill_name: skillTrimmed }];
            setSkillsData(updated);
            setNewSkill("");
        } else {
            toast.error("Skill cannot be empty");
        }
    };

    const removeSkill = (indexToRemove) => {
        const updated = skillsData.filter((_, index) => index !== indexToRemove);
        setSkillsData(updated);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    const validateSkills = () => {
        if (!skillsData.length) {
            toast.error("Add at least one skill");
            return false;
        }
        return true;
    };

    Skills.validate = validateSkills;

    return (
        <div className="space-y-5">
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    Skills
                </h3>
                <p className="text-sm text-gray-500">
                    Add your professional skills below.
                </p>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter a skill"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                    onChange={(e) => setNewSkill(e.target.value)}
                    value={newSkill}
                    onKeyDown={handleKeyPress}
                />
                <button
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="size-4" /> Add
                </button>
            </div>

            {skillsData.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {skillsData.map((skill, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                            {skill.skill_name}
                            <button
                                onClick={() => removeSkill(index)}
                                className="ml-1 hover:bg-green-200 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6 text-gray-500">
                    <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p>No skills added yet.</p>
                    <p className="text-sm">Add your skills above to get started.</p>
                </div>
            )}

            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-sm text-green-800">
                    <strong>Tip:</strong> Add relevant skills that highlight your
                    expertise and strengths. This helps potential employers or
                    collaborators understand your capabilities better.
                </p>
            </div>
        </div>
    );
};

export default Skills;
