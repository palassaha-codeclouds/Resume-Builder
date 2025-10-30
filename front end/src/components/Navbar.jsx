import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/api"; 
import { LogOut } from "lucide-react";

const Navbar = () => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userData = await getCurrentUser();
                if (userData) {
                    setUser(userData); 
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logoutUser = () => {
        document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax;";
        setUser(null); 
        navigate("/");
    };

    const displayUserName = user?.full_name || "Guest";

    return (
        <div className="shadow bg-white">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
                <Link to="/">
                    <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
                </Link>
                <div className="flex items-center gap-4 text-sm">
                    <p className="max-sm:hidden">Hi, {displayUserName}</p>
                    <button
                        onClick={logoutUser}
                        className="bg-white hover:bg-slate-50 border border-gray-300 px-5 py-1.5 rounded-full active:scale-95 transition-all flex gap-x-2 items-center"
                    >
                        <LogOut size={20}/>
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;