// // src/api/resumeApi.js
// const API_BASE_URL = "http://127.0.0.1:8000";

// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//     return null;
// };

// // -------- Fetch all resumes for current user -------- //
// export const fetchAllResumes = async () => {
//     const token = getCookie("access_token");
//     const res = await fetch(`${API_BASE_URL}/resumes/`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     if (!res.ok) throw new Error("Failed to fetch resumes");
//     return await res.json();
// };

// // -------- Fetch single resume by ID -------- //
// export const fetchResumeById = async (resumeId) => {
//     const token = getCookie("access_token");
//     const res = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     if (!res.ok) throw new Error("Failed to load resume");
//     return await res.json();
// };

// // -------- Create a new resume -------- //
// export const createResume = async (resumeData) => {
//     const token = getCookie("access_token");

//     const res = await fetch(`${API_BASE_URL}/resumes/create`, {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(resumeData),
//     });

//     if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.detail || "Failed to create resume");
//     }

//     return await res.json();
// };
