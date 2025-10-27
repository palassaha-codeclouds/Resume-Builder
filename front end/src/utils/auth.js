// src/utils/auth.js
import api from "./api";

export const registerUser = async (formData) => {
    const payload = {
        user_name: formData.name,   // match backend field
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
    };

    const res = await api.post("/auth/signup", payload);
    return res.data;
};

export const loginUser = async (formData) => {
    const payload = {
        email: formData.email,
        password: formData.password,
    };

    const res = await api.post("/auth/login", payload);
    return res.data;
};

export const getCurrentUser = async () => {
    const res = await api.get("/auth/me");
    return res.data;
};
