import { Sparkles } from "lucide-react";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import toast from "react-hot-toast";

const Professional = forwardRef(({ data = "", onChange }, ref) => {
    const [summary, setSummary] = useState(data);

    useEffect(() => {
        onChange(summary);
    }, [summary]);

    useImperativeHandle(ref, () => ({
        validate: () => {
            if (!summary?.trim()) {
                toast.error("Professional summary cannot be empty");
                return false;
            }
            return true;
        }
    }));

    const handleBlur = (e) => {
        if (!e.target.value.trim()) {
            toast.error("Professional summary cannot be empty");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Add summary for your resume here.
                    </p>
                </div>

                {/* <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 rounded-lg hover:bg-green-200 transition-colors">
                    <Sparkles className="size-4" />
                    AI Enhance
                </button> */}
            </div>

            <div>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    onBlur={handleBlur}
                    rows={7}
                    className="w-full p-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                    placeholder="Write a professional summary that highlights your experience and achievements..."
                />
                <p className="text-xs text-gray-500 text-center mt-2">
                    Tip: Keep it concise - focus on your most relevant achievements and
                    skills.
                </p>
            </div>
        </div>
    );
});

export default Professional;
