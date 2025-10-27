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
