import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
    const { user, logout } = useAuth();

    return (
        <MainLayout>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-[#637588] dark:text-[#92adc9]">
                        <span className="hover:text-white cursor-pointer transition-colors">Home</span>
                        <span>/</span>
                        <span className="text-[#111418] dark:text-white font-medium">Settings</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-[#111418] dark:text-white leading-tight">Settings</h1>
                        <p className="text-[#637588] dark:text-[#92adc9] mt-1">Manage your profile details and account security.</p>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-6 rounded-xl bg-surface-light dark:bg-surface-dark/50 border border-[#e5e7eb] dark:border-[#324d67]">
                    <div className="flex gap-4 items-center">
                        <div className="relative group cursor-pointer">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 border-2 border-primary bg-slate-200 dark:bg-slate-700 flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[#111418] dark:text-white text-xl font-bold leading-tight">{user?.name || 'User'}</p>
                            <p className="text-[#637588] dark:text-[#92adc9] text-sm">{user?.role || 'Staff'} | ID: {user?.id || '-'}</p>
                            <p className="text-primary text-xs font-medium mt-1">WAREHOUSE {user?.warehouse_id || '-'}</p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#e5e7eb] dark:bg-[#324d67] hover:bg-[#d1d5db] dark:hover:bg-[#405f7c] text-[#111418] dark:text-white text-sm font-bold transition-colors">
                            Remove Photo
                        </button>
                        <button className="flex-1 md:flex-none cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors">
                            Upload New
                        </button>
                    </div>
                </div>

                {/* Forms Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
                    {/* Personal Information */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary">person</span>
                            <h3 className="text-lg font-bold text-[#111418] dark:text-white">Personal Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">Full Name</label>
                                <input
                                    className="w-full h-11 bg-white dark:bg-surface-dark rounded-lg border border-[#e5e7eb] dark:border-[#324d67] text-[#111418] dark:text-white px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[#9ca3af] dark:placeholder:text-[#586e84]"
                                    type="text"
                                    defaultValue={user?.name || ''}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">User ID</label>
                                <input
                                    className="w-full h-11 bg-[#f3f4f6] dark:bg-[#1c2b3a] rounded-lg border border-transparent text-[#9ca3af] dark:text-[#586e84] px-4 cursor-not-allowed"
                                    type="text"
                                    disabled
                                    defaultValue={user?.id || ''}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#9ca3af] dark:text-[#586e84] text-[20px]">mail</span>
                                <input
                                    className="w-full h-11 bg-[#f3f4f6] dark:bg-[#1c2b3a] rounded-lg border border-transparent text-[#9ca3af] dark:text-[#586e84] pl-10 pr-4 cursor-not-allowed"
                                    type="email"
                                    disabled
                                    defaultValue={user?.email || 'email@example.com'} // Assuming user object has email, if not it will be undefined
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">Role</label>
                            <input
                                className="w-full h-11 bg-[#f3f4f6] dark:bg-[#1c2b3a] rounded-lg border border-transparent text-[#9ca3af] dark:text-[#586e84] px-4 cursor-not-allowed"
                                disabled
                                type="text"
                                defaultValue={user?.role || 'Staff'}
                            />
                            <p className="text-xs text-[#637588] dark:text-[#586e84]">Roles are managed by the system administrator.</p>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2 pt-4 border-t border-[#e5e7eb] dark:border-[#324d67] lg:border-none lg:pt-0">
                            <span className="material-symbols-outlined text-primary">lock_reset</span>
                            <h3 className="text-lg font-bold text-[#111418] dark:text-white">Change Password</h3>
                        </div>
                        <div className="p-5 bg-surface-light dark:bg-surface-dark/30 rounded-xl border border-[#e5e7eb] dark:border-[#324d67]">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">Current Password</label>
                                    <input
                                        className="w-full h-11 bg-white dark:bg-surface-dark rounded-lg border border-[#e5e7eb] dark:border-[#324d67] text-[#111418] dark:text-white px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[#9ca3af] dark:placeholder:text-[#586e84]"
                                        type="password"
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">New Password</label>
                                        <input
                                            className="w-full h-11 bg-white dark:bg-surface-dark rounded-lg border border-[#e5e7eb] dark:border-[#324d67] text-[#111418] dark:text-white px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[#9ca3af] dark:placeholder:text-[#586e84]"
                                            placeholder="Min 6 chars"
                                            type="password"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">Confirm</label>
                                        <input
                                            className="w-full h-11 bg-white dark:bg-surface-dark rounded-lg border border-[#e5e7eb] dark:border-[#324d67] text-[#111418] dark:text-white px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[#9ca3af] dark:placeholder:text-[#586e84]"
                                            type="password"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="mt-2 flex items-center justify-center gap-2 px-4 h-11 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-500 rounded-lg text-sm font-bold transition-colors w-full"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            Log Out of All Devices
                        </button>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-[#e5e7eb] dark:border-[#324d67]">
                    <button className="px-6 h-11 rounded-lg border border-[#e5e7eb] dark:border-[#324d67] text-[#637588] dark:text-[#92adc9] hover:text-[#111418] dark:hover:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#233648] font-bold text-sm transition-colors">
                        Cancel
                    </button>
                    <button className="px-6 h-11 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/30">
                        Save Changes
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
