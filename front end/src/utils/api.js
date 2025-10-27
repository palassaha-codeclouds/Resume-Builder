import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

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
            document.cookie = `access_token=${res.data.access_token}; path=/; max-age=3600; SameSite=Lax`;
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

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

export const createResume = async (resumeData) => {
    try {
        const token = getCookie("access_token");
        if (!token) throw new Error("Not authenticated");

        const res = await axios.post(`${API_BASE_URL}/resumes/create`, resumeData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Error creating resume:", err);
        throw err.response?.data || new Error("Failed to create resume");
    }
};

export const getCurrentUser = async () => {
    try {
        const token = getCookie("access_token");
        
        // If no token is found, the user is not logged in. Return null.
        if (!token) {
            return null; 
        }
        
        // Send a GET request to /auth/me with the Bearer token
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
                // Ensure the Authorization header is set as expected by your FastAPI/Depends
                Authorization: `Bearer ${token}`,
            },
            validateStatus: () => true,
            withCredentials: true,
        });

        if (res.status === 200) {
            // Your backend returns the current_user object directly on success
            return res.data; 
        } else if (res.status === 401) {
            // Token expired or invalid. Clear the bad cookie and treat as logged out.
            document.cookie = "access_token=; path=/; Max-Age=-99999999;";
            return null;
        } else {
            // Handle other errors
            throw new Error(res.data.detail || `Failed to fetch user data (Status ${res.status})`);
        }
    } catch (err) {
        console.error("Error fetching current user:", err);
        return null;
    }
};