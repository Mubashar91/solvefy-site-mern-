import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const location = useLocation();

    const menuItems = [
        {
            title: 'Dashboard',
            path: '/admin/dashboard',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            title: 'Header Management',
            path: '/admin/header',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            )
        },
        {
            title: 'Logo Management',
            path: '/admin/logo',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'Settings',
            path: '/admin/settings',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#24275F] to-[#5E6FB5] transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'} z-50`}>
            {/* Toggle Button */}
            <div className="flex justify-end p-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 text-white hover:bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#24275F] transition duration-200"
                >
                    {isExpanded ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center p-4">
                <div className="text-white text-2xl font-bold">
                    {isExpanded ? 'Solvefy.io' : 'S'}
                </div>
            </div>

            {/* Menu Items */}
            <nav className="mt-8">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center px-4 py-3 text-white hover:bg-white/20 transition duration-200 ${
                            location.pathname === item.path ? 'bg-white/20' : ''
                        }`}
                    >
                        <div className="flex-shrink-0">
                            {item.icon}
                        </div>
                        <span className={`ml-3 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                            {item.title}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* User Profile */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    <div className={`ml-3 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-white/70">admin@solvefy.io</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 