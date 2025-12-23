import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
    const { user } = useAuth();

    return (
        <aside className="hidden md:flex flex-col w-64 border-r border-[#e5e7eb] dark:border-[#233648] bg-surface-light dark:bg-[#111a22] flex-shrink-0">
            <div className="flex flex-col h-full p-4 justify-between">
                <div className="flex flex-col gap-6">
                    {/* Branding */}
                    <div className="flex items-center gap-3 px-2">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-[28px]">warehouse</span>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight text-[#111418] dark:text-white">Warehouse Voice</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">
                        {[
                            { label: 'Home', icon: 'home', path: '/dashboard' },
                            { label: 'Voice Assistant', icon: 'mic', path: '/voice' },
                            { label: 'History', icon: 'history', path: '/history' },
                            { label: 'Settings', icon: 'settings', path: '/settings' },
                        ].map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                  ${isActive
                                        ? 'bg-primary text-white'
                                        : 'text-[#637588] dark:text-[#92adc9] hover:bg-[#f0f2f4] dark:hover:bg-[#233648]'
                                    }
                `}
                            >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: item.label === 'Home' ? "'FILL' 1" : "" }}>
                                    {item.icon}
                                </span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* User Profile (Sidebar Bottom) */}
                <div className="flex items-center gap-3 px-2 py-2 mt-auto">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMDtE2cLlCt7DXPnE4ybBAqAZf0NAorJiKZotsr4xD_WpIKMWivRF2ta-YTQilXqroF27szz8zNJyq8pClnNuYMX3EteOHLV4931UFpFU8GIDpmCUiE-0oyp_FdszfrSMT8i7qLuucvE3xEbuBt4Qhj2sAvs50xzDHAXGJvEUHxubvnEeI_H1HJf25_SDgK4APTJDtTB8LqBPAwF2IGv2olmwVXPcr9SedWfVzOKaXVNY8zfovQz3iCJzuboY0ItUDh8OsvmWgmbg")' }}
                    ></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#111418] dark:text-white">{user?.name || 'User'}</span>
                        <span className="text-xs text-[#637588] dark:text-[#92adc9]">Admin Gudang</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
