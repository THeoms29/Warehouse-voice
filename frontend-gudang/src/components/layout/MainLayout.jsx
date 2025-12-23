import React from 'react';
import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display">
            <Sidebar />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* TopNavBar for Mobile */}
                <header className="flex items-center justify-between border-b border-[#e5e7eb] dark:border-[#233648] bg-surface-light dark:bg-[#111a22] px-6 py-4 md:hidden">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-xl">warehouse</span>
                        </div>
                        <h2 className="text-base font-bold text-[#111418] dark:text-white">Warehouse Voice</h2>
                    </div>
                    <button className="text-[#637588] dark:text-[#92adc9]">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                {/* Main Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
