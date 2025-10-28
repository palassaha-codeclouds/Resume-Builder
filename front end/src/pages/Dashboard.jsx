import {
  FilePenIcon,
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createResume } from "../utils/api";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const loadAllResumes = async () => {
    try {
      const res = await fetch("http://localhost:8000/resumes/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch resumes");

      const data = await res.json();
      setAllResumes(data);
    } catch (err) {
      console.error(err);
      alert("Error loading resumes: " + err.message);
    }
  };

  const createResumeHandler = async (event) => {
    event.preventDefault();
    try {
      const payload = { title };
      const newResume = await createResume(payload);

      setShowCreateResume(false);
      setTitle("");

      navigate(`/app/builder/${newResume.id}`);
    } catch (err) {
      console.error("Error creating resume:", err);
      alert("Failed to create resume: " + (err.detail || err.message));
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/res123`);
  };

  const editTitle = async (event) => {
    event.preventDefault();
  };

  const delResume = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (!confirmDelete) return;

    const token = getCookie("access_token");
    if (!token) {
      alert("Authentication failed. Please log in again.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/resumes/${resumeId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to delete resume");
      }

      setAllResumes((prev) => prev.filter((resume) => resume.id !== resumeId));
      alert("Resume deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting resume: " + err.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-teal-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-full" />
            <p className="text-sm group-hover:text-teal-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-teal-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-full" />
            <p className="text-sm group-hover:text-teal-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume.id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  on
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      delResume(resume.id);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume.id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResumeHandler}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl shadow-xl p-6 w-80 sm:w-96 flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-700">
                Create a Resume
              </h2>

              <input
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-teal-600 focus:ring-teal-600"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Create Resume
              </button>

              <XIcon
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl shadow-xl p-6 w-80 sm:w-96 flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-700">
                Upload Resume
              </h2>

              <input
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-teal-600 focus:ring-teal-600"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select Resume File
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-teal-500 hover:text-teal-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-teal-700">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => {
                    setResume(e.target.files[0]);
                  }}
                />
              </div>

              <button className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Upload Resume
              </button>

              <XIcon
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("false")}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl shadow-xl p-6 w-80 sm:w-96 flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-700">
                Edit Resume Title
              </h2>

              <input
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-teal-600 focus:ring-teal-600"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Update Resume
              </button>

              <XIcon
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
