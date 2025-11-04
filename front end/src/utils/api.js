import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

const formatDateForBackend = (dateString) => {
    if (!dateString) return null;

    dateString = String(dateString).trim();

    if (!dateString) return null;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }

    if (dateString.includes('T')) {
        return dateString.split('T')[0];
    }

    try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            console.warn("Invalid date:", dateString);
            return null;
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return null;
    }
};

const prepareResumeData = (resumeData) => {
    const prepared = { ...resumeData };

    if (prepared.experience && Array.isArray(prepared.experience)) {
        prepared.experience = prepared.experience.map(exp => ({
            ...exp,
            start_date: formatDateForBackend(exp.start_date),
            end_date: formatDateForBackend(exp.end_date)
        }));
    }

    if (prepared.education && Array.isArray(prepared.education)) {
        prepared.education = prepared.education.map(edu => ({
            ...edu,
            graduation_date: formatDateForBackend(edu.graduation_date)
        }));
    }

    if (prepared.projects && Array.isArray(prepared.projects)) {
        prepared.projects = prepared.projects.map(proj => ({
            ...proj,
            start_date: formatDateForBackend(proj.start_date),
            end_date: formatDateForBackend(proj.end_date)
        }));
    }

    if (prepared.skills && Array.isArray(prepared.skills)) {
        prepared.skills = prepared.skills.map(skill =>
            typeof skill === "string" ? { skill_name: skill } : skill
        );
    }

    return prepared;
};

export const loginUser = async (formData) => {
    try {
        const body = new URLSearchParams({
            username: formData.user_name,
            password: formData.password,
        });

        const res = await axios.post(`${API_BASE_URL}/auth/login`, body, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            validateStatus: () => true,
            withCredentials: true,
        });

        if (res.status !== 200) {
            throw new Error(res.data.detail || "Invalid credentials");
        }

        if (res.data && res.data.access_token) {
            document.cookie = `access_token=${res.data.access_token}; path=/; max-age=3600; SameSite=None; Secure`;
        }

        return res;
    } catch (err) {
        console.error("Login failed:", err);
        throw err;
    }
};

export const registerUser = async (formData) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
            user_name: formData.user_name,
            full_name: formData.full_name || "",
            email: formData.email,
            password: formData.password,
        });
        return res;
    } catch (err) {
        throw err.response?.data || new Error("Signup failed");
    }
};

export const createResume = async (resumeData) => {
    try {
        const token = getCookie("access_token");
        if (!token) throw new Error("User not authenticated");

        const preparedData = prepareResumeData(resumeData);

        console.log("Sending resume data:", preparedData);

        const res = await axios.post(`${API_BASE_URL}/resumes/create`, preparedData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            validateStatus: () => true,
        });

        if (res.status !== 200 && res.status !== 201) {
            console.error("Resume creation failed:", res.data);
            throw new Error(res.data.detail || "Failed to create resume");
        }

        console.log("Resume created successfully:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error creating resume:", err);
        throw err.response?.data || new Error("Unexpected error during resume creation");
    }
};

export const updateResume = async (resumeData) => {
    try {
        const token = getCookie("access_token");
        if (!token) throw new Error("Not authenticated");

        const preparedData = prepareResumeData(resumeData);

        console.log("Updating resume with data:", preparedData);

        const res = await axios.put(
            `${API_BASE_URL}/resumes/update/${resumeData.id}`,
            preparedData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
                validateStatus: () => true,
            }
        );

        if (res.status !== 200) {
            console.error("Resume update failed:", res.data);
            throw new Error(res.data.detail || "Failed to update resume");
        }

        console.log("Resume updated successfully:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error updating resume:", err);
        throw err.response?.data || new Error("Failed to update resume");
    }
};

export const getCurrentUser = async () => {
    try {
        const token = getCookie("access_token");
        console.log("Access token found:", token);

        if (!token) {
            return null;
        }

        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            validateStatus: () => true,
            withCredentials: true,
        });

        if (res.status === 200) {
            return res.data;
        } else if (res.status === 401) {
            document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax;";
            return null;
        } else {
            throw new Error(res.data.detail || `Failed to fetch user data (Status ${res.status})`);
        }
    } catch (err) {
        console.error("Error fetching current user:", err);
        return null;
    }
};