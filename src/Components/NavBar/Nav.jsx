import React from 'react'; 
import { useAuth } from '../../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const handleClick = async () => {
        if (user) {
            try {
                await logout();
                navigate("/login");
            } catch (err) {
                console.error("Logout failed:", err);
            }
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            {/* Modern Navigation Bar */}
            <nav className="navbar bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-xl print:hidden border-b border-white/20">
                <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-6 py-3">
                    {/* Logo/Brand with icon */}
                    <div 
                        className="flex items-center space-x-3 cursor-pointer group" 
                        onClick={() => user ? navigate("/dashboard") : navigate("/")}
                    >
                        <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                            ExpenseTracker
                        </h1>
                    </div>
                    
                    {/* User Info and Actions */}
                    <div className="flex items-center space-x-6">
                        {/* User profile with avatar */}
                        <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium max-w-32 truncate">
                                {user?.email || "Guest"}
                            </span>
                        </div>

                        {/* Action Button */}
                        <button 
                            onClick={handleClick} 
                            className={`
                                relative overflow-hidden group px-6 py-2.5 rounded-full font-semibold text-sm
                                transition-all duration-300 transform hover:scale-105 active:scale-95
                                ${user 
                                    ? "bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-red-500/25" 
                                    : "bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg hover:shadow-white/25"
                                }
                            `}
                        >
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            
                            {/* Button content */}
                            <span className="relative flex items-center space-x-2">
                                {user ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Logout</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Login</span>
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;