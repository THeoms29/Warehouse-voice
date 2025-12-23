import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-[#111418] dark:text-white leading-tight">
                            Halo, {user?.name.split(' ')[0]} 👋
                        </h1>
                        <p className="text-[#637588] dark:text-[#92adc9] mt-1">Welcome back to your command center.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-[#637588] dark:text-[#92adc9] hidden md:block">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}
                        </span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 h-10 px-4 rounded-lg border border-[#e5e7eb] dark:border-[#233648] text-[#111418] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-[#233648] transition-colors text-sm font-semibold"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Total Products */}
                    <div className="flex flex-col gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-[#e5e7eb] dark:border-[#233648]">
                        <div className="flex items-center justify-between">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                <span className="material-symbols-outlined">inventory</span>
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+5%</span>
                        </div>
                        <div>
                            <p className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">Total Products</p>
                            <p className="text-3xl font-bold mt-1 text-[#111418] dark:text-white">1,240</p>
                        </div>
                    </div>

                    {/* Low Stock */}
                    <div className="flex flex-col gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm border border-[#e5e7eb] dark:border-[#233648]">
                        <div className="flex items-center justify-between">
                            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                                <span className="material-symbols-outlined">warning</span>
                            </div>
                            <span className="text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">Action Needed</span>
                        </div>
                        <div>
                            <p className="text-[#637588] dark:text-[#92adc9] text-sm font-medium">Low Stock Items</p>
                            <p className="text-3xl font-bold mt-1 text-[#111418] dark:text-white">12</p>
                        </div>
                    </div>
                </div>

                {/* Main Action Card */}
                <div className="@container">
                    <div className="relative overflow-hidden rounded-2xl bg-primary text-white shadow-lg shadow-blue-500/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 z-0"></div>
                        {/* Abstract pattern background */}
                        <div
                            className="absolute inset-0 opacity-10 z-0 bg-center bg-cover"
                            style={{ backgroundImage: 'url("")' }}
                        ></div>

                        <div className="relative z-10 flex flex-col items-center justify-center gap-6 py-12 px-6 text-center">
                            <div className="size-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/10 animate-pulse">
                                <span className="material-symbols-outlined text-[40px]">mic</span>
                            </div>
                            <div className="max-w-lg space-y-2">
                                <h3 className="text-2xl md:text-4xl font-black tracking-tight">Mulai Voice Assistant</h3>
                                <p className="text-blue-100 text-base md:text-lg">Click the button below or say "Halo Gudang" to start managing your inventory hands-free.</p>
                            </div>
                            <button
                                onClick={() => navigate('/voice')}
                                className="group flex items-center gap-3 bg-white text-primary hover:bg-blue-50 transition-all duration-300 py-4 px-8 rounded-full shadow-xl font-bold text-lg transform hover:-translate-y-1"
                            >
                                <span>Activate Microphone</span>
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-[#111418] dark:text-white">Recent Voice Commands</h3>
                    <div className="rounded-xl border border-[#e5e7eb] dark:border-[#233648] bg-surface-light dark:bg-surface-dark overflow-hidden">
                        <div className="flex flex-col">
                            {/* Item 1 */}
                            <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb] dark:border-[#233648] hover:bg-[#f9fafb] dark:hover:bg-[#1f2937] transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">add_box</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-[#111418] dark:text-white">Stock In: Shoes Nike Air (Size 42)</span>
                                        <span className="text-xs text-[#637588] dark:text-[#92adc9]">Command: "Tambah stok sepatu nike air ukuran 42 sebanyak 50"</span>
                                    </div>
                                </div>
                                <span className="text-xs text-[#637588] dark:text-[#92adc9]">2 mins ago</span>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb] dark:border-[#233648] hover:bg-[#f9fafb] dark:hover:bg-[#1f2937] transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-[#111418] dark:text-white">Check Location: Red T-Shirt</span>
                                        <span className="text-xs text-[#637588] dark:text-[#92adc9]">Command: "Dimana lokasi kaos merah?"</span>
                                    </div>
                                </div>
                                <span className="text-xs text-[#637588] dark:text-[#92adc9]">15 mins ago</span>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-center justify-between p-4 hover:bg-[#f9fafb] dark:hover:bg-[#1f2937] transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-[#111418] dark:text-white">Verify: Shipment #4022</span>
                                        <span className="text-xs text-[#637588] dark:text-[#92adc9]">Command: "Verifikasi pengiriman 4022 sudah siap"</span>
                                    </div>
                                </div>
                                <span className="text-xs text-[#637588] dark:text-[#92adc9]">1 hour ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
