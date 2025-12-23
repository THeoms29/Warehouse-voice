import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Handle PIN submission when complete
    useEffect(() => {
        const pinString = pin.join('');
        if (pinString.length === 6 && !pin.includes('')) {
            handleLogin(pinString);
        }
    }, [pin]);

    const handleLogin = async (pinString) => {
        setLoading(true);
        setError('');

        try {
            await login(pinString);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid PIN. Please try again.');
            setPin(['', '', '', '', '', '']);
            if (inputRefs.current[0]) inputRefs.current[0].focus();

            // Auto-hide error after 3s
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (index, value) => {
        if (value.length > 1) value = value.slice(-1);
        if (!/^\d*$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleKeypadClick = (num) => {
        const firstEmptyIndex = pin.findIndex(d => d === '');
        if (firstEmptyIndex !== -1) {
            handleInput(firstEmptyIndex, num.toString());
        }
    };

    const handleBackspace = () => {
        // Find last filled index
        let lastFilledIndex = 5;
        while (lastFilledIndex >= 0 && pin[lastFilledIndex] === '') {
            lastFilledIndex--;
        }

        if (lastFilledIndex >= 0) {
            const newPin = [...pin];
            newPin[lastFilledIndex] = '';
            setPin(newPin);
            inputRefs.current[lastFilledIndex].focus();
        }
    };

    const handleClear = () => {
        setPin(['', '', '', '', '', '']);
        if (inputRefs.current[0]) inputRefs.current[0].focus();
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-hidden min-h-screen flex flex-col relative transition-colors duration-300">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, #1e2f3f 0%, #101922 70%)' }}></div>

            <div className="relative z-10 flex h-full grow flex-col justify-center items-center p-4">
                {/* Main Login Container */}
                <div className="w-full max-w-[420px] bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up">

                    {/* Header Section */}
                    <div className="flex flex-col items-center pt-8 pb-4 px-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                            <span className="material-symbols-outlined text-[32px]">warehouse</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Warehouse Voice</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Voice Assistant Portal</p>
                    </div>

                    {/* PIN Instructions & Feedback */}
                    <div className="px-6 pb-2 text-center h-[70px]"> { }
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Enter PIN</h2>
                        {!error ? (
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Please enter your 6-digit access PIN</p>
                        ) : (
                            <div className="mt-1 flex items-center justify-center gap-1.5 text-red-500 text-center animate-pulse">
                                <span className="material-symbols-outlined text-[16px]">error</span>
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}
                    </div>

                    {/* PIN Input Fields */}
                    <div className="px-6 py-6 flex justify-center">
                        <fieldset className="flex gap-2 sm:gap-3" disabled={loading}>
                            {pin.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    className="flex h-12 w-10 sm:h-14 sm:w-12 rounded-lg bg-slate-50 dark:bg-[#111a22] border border-slate-200 dark:border-[#324d67] text-center text-xl font-bold text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all placeholder-slate-400 disabled:opacity-50"
                                    type="number" // Mobile sends number keypad
                                    inputMode="numeric"
                                    maxLength={1}
                                    placeholder="-"
                                    value={digit}
                                    onChange={(e) => handleInput(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </fieldset>
                    </div>

                    {/* Touch Keypad */}
                    <div className="px-6 pb-8">
                        <div className="grid grid-cols-3 gap-3 max-w-[320px] mx-auto">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => handleKeypadClick(num)}
                                    disabled={loading}
                                    className="flex items-center justify-center h-14 rounded-lg bg-slate-100 dark:bg-[#233648] hover:bg-slate-200 dark:hover:bg-[#2d455c] active:bg-primary active:text-white transition-colors text-xl font-semibold text-slate-700 dark:text-white shadow-sm disabled:opacity-50"
                                >
                                    {num}
                                </button>
                            ))}

                            <button
                                onClick={handleClear}
                                disabled={loading}
                                className="flex items-center justify-center h-14 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors font-medium text-sm uppercase tracking-wide disabled:opacity-50"
                            >
                                Clear
                            </button>

                            <button
                                onClick={() => handleKeypadClick(0)}
                                disabled={loading}
                                className="flex items-center justify-center h-14 rounded-lg bg-slate-100 dark:bg-[#233648] hover:bg-slate-200 dark:hover:bg-[#2d455c] active:bg-primary active:text-white transition-colors text-xl font-semibold text-slate-700 dark:text-white shadow-sm disabled:opacity-50"
                            >
                                0
                            </button>

                            <button
                                onClick={handleBackspace}
                                disabled={loading}
                                className="flex items-center justify-center h-14 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined">backspace</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer / Info */}
                    <div className="bg-slate-50 dark:bg-[#15202b] px-6 py-4 flex flex-col justify-center items-center border-t border-slate-100 dark:border-slate-800">
                        <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">help</span>
                            Forgot PIN? Contact Supervisor
                        </button>
                    </div>

                    {/* Loading Overlay */}
                    {loading && (
                        <div className="absolute inset-0 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                            <p className="text-slate-600 dark:text-slate-300 font-medium">Verifying Credentials...</p>
                        </div>
                    )}
                </div>

                {/* Bottom Branding */}
                <div className="mt-8 text-center opacity-60">
                    <p className="text-xs text-slate-500 dark:text-slate-500">© 2024 Warehouse Systems Inc.</p>
                </div>
            </div>
        </div>
    );
}
