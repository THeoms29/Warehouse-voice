import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { api } from '../services/api';

export default function HistoryPage() {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredHistory = historyData.filter(item =>
        item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.action.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const logs = await api.getActivityLog();
                // Map backend data to UI format
                const formattedLogs = logs.map(log => ({
                    time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    user: log.user_name,
                    action: log.type === 'masuk' ? 'Restock' : 'Voice Pick',
                    product: log.product_name,
                    sku: 'SKU-' + log.id, // Fallback/Mock SKU for now
                    qty: log.type === 'keluar' ? -log.quantity : log.quantity,
                    location: 'Zone A', // Fallback location
                    type: log.type === 'masuk' ? 'in' : 'out',
                    notes: log.notes
                }));
                setHistoryData(formattedLogs);
            } catch (error) {
                console.error("Failed to load history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <MainLayout>
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background-light dark:bg-background-dark h-full">
                <div className="flex flex-col w-full max-w-[1400px] mx-auto">
                    {/* Header Title */}
                    <div className="flex flex-wrap justify-between items-end gap-3 px-6 pt-2 pb-6">
                        <div className="flex min-w-72 flex-col gap-2">
                            <h1 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Voice Command History</h1>
                            <p className="text-[#637588] dark:text-[#92adc9] text-base font-normal leading-normal">Audit trail of warehouse operations and stock movements</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="px-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-[#111a22] rounded-xl border border-slate-200 dark:border-[#233648] p-5 flex items-center justify-between shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#637588] dark:text-[#92adc9] text-sm font-medium uppercase tracking-wide">Items Picked</span>
                                    <span className="text-red-500 dark:text-red-400 text-2xl font-bold font-mono">
                                        {Math.abs(historyData.filter(d => d.type === 'out').reduce((acc, curr) => acc + curr.qty, 0))}
                                    </span>
                                    <span className="text-[#637588] dark:text-[#92adc9] text-xs">Outgoing Stock</span>
                                </div>
                                <div className="size-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                                    <span className="material-symbols-outlined">arrow_downward</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#111a22] rounded-xl border border-slate-200 dark:border-[#233648] p-5 flex items-center justify-between shadow-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#637588] dark:text-[#92adc9] text-sm font-medium uppercase tracking-wide">Restocked</span>
                                    <span className="text-emerald-500 dark:text-emerald-400 text-2xl font-bold font-mono">
                                        {historyData.filter(d => d.type === 'in').reduce((acc, curr) => acc + curr.qty, 0)}
                                    </span>
                                    <span className="text-[#637588] dark:text-[#92adc9] text-xs">Incoming Stock</span>
                                </div>
                                <div className="size-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                                    <span className="material-symbols-outlined">arrow_upward</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="px-6 pb-6 sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm md:static md:bg-transparent md:backdrop-blur-none">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                            <div className="w-full">
                                <label className="flex flex-col h-12 w-full">
                                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-slate-200 dark:ring-[#233648] focus-within:ring-primary transition-all bg-white dark:bg-[#1a2632]">
                                        <div className="text-[#637588] dark:text-[#92adc9] flex border-none items-center justify-center pl-4 rounded-l-lg" style={{ minWidth: '48px' }}>
                                            <span className="material-symbols-outlined">search</span>
                                        </div>
                                        <input
                                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#111418] dark:text-white focus:outline-0 border-none bg-transparent h-full placeholder:text-[#637588] dark:placeholder:text-[#92adc9] px-4 pl-2 text-base font-normal leading-normal"
                                            placeholder="Search by SKU, product, or user..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="px-6 pb-10 flex flex-col gap-6">
                        <div className="w-full">
                            <div className="rounded-xl border border-slate-200 dark:border-[#233648] bg-white dark:bg-[#111a22] overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-[#1a2632] border-b border-slate-200 dark:border-[#233648]">
                                                <th className="p-4 text-xs font-bold tracking-wider text-[#637588] dark:text-[#92adc9] uppercase">Time</th>
                                                <th className="p-4 text-xs font-bold tracking-wider text-[#637588] dark:text-[#92adc9] uppercase">Operator</th>
                                                <th className="p-4 text-xs font-bold tracking-wider text-[#637588] dark:text-[#92adc9] uppercase">Action</th>
                                                <th className="p-4 text-xs font-bold tracking-wider text-[#637588] dark:text-[#92adc9] uppercase">Product</th>
                                                <th className="p-4 text-xs font-bold tracking-wider text-[#637588] dark:text-[#92adc9] uppercase text-right">Quantity</th>
                                                <th className="p-4 text-xs font-bold tracking-wider text-[#637588] dark:text-[#92adc9] uppercase text-right">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-[#233648]">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="6" className="p-8 text-center text-[#637588] dark:text-[#92adc9]">Loading history data...</td>
                                                </tr>
                                            ) : filteredHistory.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="p-8 text-center text-[#637588] dark:text-[#92adc9]">No history found.</td>
                                                </tr>
                                            ) : (
                                                filteredHistory.map((item, index) => (
                                                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-[#1a2632] transition-colors group">
                                                        <td className="p-4 text-sm text-[#111418] dark:text-white whitespace-nowrap font-mono text-slate-500 dark:text-[#92adc9]">{item.time}</td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">
                                                                <div className="bg-center bg-cover rounded-full size-8 border border-slate-200 dark:border-[#233648] bg-slate-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCi44OVdBFKoxcbg5YczNL9hKjWID81zxczaeNXM-dC7gPZlqTErDMQXPzHXkWFKVOCV4DzRgPWAK0GAcnrA7e-WgAabGPHjYcsPdHhtcGrpfibKoZSN2RNx2cDhdRAUc7_iR-Onb-cLNEcSrzt745hMLBKpFFg9bXgmILYN8hXKMuYHpzoDxhNANAtL35VtlX7mg1hpSQ-cFiIqvKeDGlhnROD7vG_oo0xsIGEkhmbBf-1y9ADbdFpMPSZM_G-4ZycDnRpCak3BTMDO85jTNDPwybLRgQjcCtR8CtKCEkBTrlKPBQy14ElMu26XdPN8")' }}></div>
                                                                <span className="text-[#111418] dark:text-white text-sm font-medium">{item.user}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-2">
                                                                <div className="p-1.5 rounded bg-slate-100 dark:bg-[#233648] text-[#111418] dark:text-white">
                                                                    <span className="material-symbols-outlined text-sm">
                                                                        {item.action.includes('Voice') ? 'mic' : item.action.includes('Adjustment') ? 'edit_note' : 'qr_code_scanner'}
                                                                    </span>
                                                                </div>
                                                                <span className="text-[#111418] dark:text-white text-sm">{item.action}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 max-w-[200px]">
                                                            <div className="flex flex-col">
                                                                <span className="text-[#111418] dark:text-white text-sm font-medium truncate">{item.product}</span>
                                                                <span className="text-[#637588] dark:text-[#92adc9] text-xs font-mono">{item.sku}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-right whitespace-nowrap">
                                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-md border ${item.type === 'out' ? 'bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20' :
                                                                item.type === 'in' ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20' :
                                                                    'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20'
                                                                }`}>
                                                                <span className="material-symbols-outlined text-xs mr-1">
                                                                    {item.type === 'out' ? 'arrow_downward' : item.type === 'in' ? 'arrow_upward' : 'remove'}
                                                                </span>
                                                                <span className="text-sm font-bold">{item.qty > 0 ? '+' : ''}{item.qty}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-right text-[#637588] dark:text-[#92adc9] text-sm font-mono">{item.location}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
