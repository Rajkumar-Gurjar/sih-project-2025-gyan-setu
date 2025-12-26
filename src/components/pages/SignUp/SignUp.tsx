import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/api/auth.service';
import { useAuthStore } from '../../../store/useAuthStore';

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    
    // Form State
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState(''); // Maps to phone
    const [password, setPassword] = useState(''); // Maps to pin
    const [schoolId, setSchoolId] = useState(''); // Extra field (UI only for now)
    const [grade, setGrade] = useState('');       // Extra field (UI only for now)
    const [language, setLanguage] = useState('punjabi');
    const [showPassword, setShowPassword] = useState(false);
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Mapping new UI fields to existing API contract
            // Note: API expects 'phone' and 'pin'. We map username/email -> phone, password -> pin.
            // Extra fields (schoolId, grade) are collected but not sent to MVP API.
            const response = await authService.register({ 
                name: fullname, 
                phone: username, 
                pin: password, 
                role: 'student' 
            });
            login(response.user, response.token);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-signup-bg-dark text-slate-900 dark:text-white font-lexend min-h-screen flex flex-col overflow-x-hidden selection:bg-signup-primary selection:text-signup-bg-dark transition-colors duration-300">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-[#2d4625] px-6 py-4 md:px-10 sticky top-0 z-50 bg-background-light/80 dark:bg-[#152112]/90 backdrop-blur-md transition-colors duration-300">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                    <div className="size-8 flex items-center justify-center text-signup-primary">
                        <span className="material-symbols-outlined text-3xl">local_library</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">GyaanSetu</h2>
                </div>
                <div className="flex gap-3">
                    <button aria-label="Toggle Theme" className="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-[#2d4625] hover:bg-slate-300 dark:hover:bg-[#3d5e32] transition-colors text-slate-700 dark:text-white">
                        <span className="material-symbols-outlined">contrast</span>
                    </button>
                    <Link to="/login" className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full border border-slate-300 dark:border-signup-border-dark text-sm font-bold hover:bg-slate-100 dark:hover:bg-[#20321b] transition-colors">
                        Log In
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
                <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
                    
                    {/* Left Column: Branding / Context */}
                    <div className="hidden lg:flex flex-col flex-1 gap-8 p-4">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signup-primary/10 border border-signup-primary/20 text-signup-primary text-sm font-medium">
                                <span className="material-symbols-outlined text-[18px]">wifi_off</span>
                                <span>Offline Ready Platform</span>
                            </div>
                            <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                                Education for everyone, everywhere.
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-signup-text-sec max-w-lg leading-relaxed">
                                Access interactive lessons in Punjabi, Hindi, and English without needing an active internet connection.
                            </p>
                        </div>
                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-signup-surface-dark group shadow-2xl">
                            {/* Abstract representation of rural education/digital learning */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#20321b] to-[#152111]"></div>
                            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#4cdf20 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-signup-bg-dark to-transparent z-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-signup-primary flex items-center justify-center text-signup-bg-dark shadow-lg shadow-signup-primary/20">
                                        <span className="material-symbols-outlined">school</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Punjab School Education Board</p>
                                        <p className="text-sm text-signup-text-sec">Curriculum Aligned</p>
                                    </div>
                                </div>
                            </div>
                            <img 
                                alt="Abstract view of students studying outdoors" 
                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 transition-transform duration-700 group-hover:scale-105" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBak8Qj62tn8eIPM5mjvZx4_a6er2Kfnfn4il-OFEjlWdMSaJ0cuPKEpDIv7QK6xYpGF4HbJnoyEleeyDbHUcnLKafNBjkD1VDAcGgozsWRJfbhb9nIGkjaZfAqGSjte9m8hzwSq5qcD3py9J4SSjRwIe3QmJZCbazNBhBexrSZulFPB_M7NVWSsTfqu90kHG2Sb7OOI-76ok4Vd55erBuH9HA0vaEqd-bX_p7nWbMBZKoHhxcgnwlX4Z5XuDBB3Xi-p5Z6U9R7RKw"
                            />
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full lg:w-[480px] shrink-0 mx-auto">
                        <div className="bg-white dark:bg-[#1a2b16] rounded-[2rem] p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-[#2d4625]">
                            <div className="mb-8">
                                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Create Account</h2>
                                <p className="text-slate-500 dark:text-signup-text-sec">Join GyaanSetu to start learning. <br/><span className="font-noto">ਖਾਤਾ ਬਣਾਓ</span></p>
                            </div>
                            
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                {/* Language Selector */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                        Preferred Language <span className="text-signup-text-sec font-normal text-xs ml-1">(ਭਾਸ਼ਾ ਚੁਣੋ)</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'punjabi', label: 'Punjabi', sub: 'ਪੰਜਾਬੀ' },
                                            { id: 'hindi', label: 'Hindi', sub: 'हिंदी' },
                                            { id: 'english', label: 'English', sub: 'English' }
                                        ].map((lang) => (
                                            <label key={lang.id} className="cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name="language" 
                                                    value={lang.id} 
                                                    className="peer sr-only"
                                                    checked={language === lang.id}
                                                    onChange={() => setLanguage(lang.id)}
                                                />
                                                <div className="h-12 flex flex-col items-center justify-center rounded-xl border border-slate-200 dark:border-signup-border-dark bg-slate-50 dark:bg-[#20321b] text-slate-600 dark:text-signup-text-sec peer-checked:border-signup-primary peer-checked:bg-signup-primary/10 peer-checked:text-signup-primary dark:peer-checked:text-signup-primary transition-all">
                                                    <span className="text-xs font-bold">{lang.label}</span>
                                                    <span className="text-[10px] opacity-80">{lang.sub}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="fullname">Full Name</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-signup-text-sec">person</span>
                                        <input 
                                            id="fullname" 
                                            type="text" 
                                            placeholder="Enter your full name" 
                                            className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-[#20321b] border border-slate-200 dark:border-signup-border-dark rounded-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5c7a52] focus:border-signup-primary focus:ring-1 focus:ring-signup-primary focus:outline-none transition-all"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* School Info Row */}
                                <div className="flex gap-4">
                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="schoolid">School ID</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-signup-text-sec text-[20px]">badge</span>
                                            <input 
                                                id="schoolid" 
                                                type="text" 
                                                placeholder="ID Number" 
                                                className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-[#20321b] border border-slate-200 dark:border-signup-border-dark rounded-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5c7a52] focus:border-signup-primary focus:ring-1 focus:ring-signup-primary focus:outline-none transition-all"
                                                value={schoolId}
                                                onChange={(e) => setSchoolId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="grade">Class/Grade</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-signup-text-sec text-[20px] pointer-events-none">school</span>
                                            <select 
                                                id="grade" 
                                                className="w-full h-12 pl-12 pr-10 appearance-none bg-slate-50 dark:bg-[#20321b] border border-slate-200 dark:border-signup-border-dark rounded-full text-slate-900 dark:text-white focus:border-signup-primary focus:ring-1 focus:ring-signup-primary focus:outline-none transition-all cursor-pointer"
                                                value={grade}
                                                onChange={(e) => setGrade(e.target.value)}
                                            >
                                                <option disabled value="">Select</option>
                                                <option value="6">Class 6</option>
                                                <option value="7">Class 7</option>
                                                <option value="8">Class 8</option>
                                                <option value="9">Class 9</option>
                                                <option value="10">Class 10</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-signup-text-sec pointer-events-none text-[20px]">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Username/Email */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="username">Username or Email</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-signup-text-sec">alternate_email</span>
                                        <input 
                                            id="username" 
                                            type="text" 
                                            placeholder="student@example.com" 
                                            className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-[#20321b] border border-slate-200 dark:border-signup-border-dark rounded-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5c7a52] focus:border-signup-primary focus:ring-1 focus:ring-signup-primary focus:outline-none transition-all"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">Password</label>
                                    <div className="relative group/pass">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-signup-text-sec">lock</span>
                                        <input 
                                            id="password" 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="••••••••" 
                                            className="w-full h-12 pl-12 pr-12 bg-slate-50 dark:bg-[#20321b] border border-slate-200 dark:border-signup-border-dark rounded-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5c7a52] focus:border-signup-primary focus:ring-1 focus:ring-signup-primary focus:outline-none transition-all"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-signup-text-sec hover:text-slate-600 dark:hover:text-white rounded-full focus:outline-none"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-[#5c7a52] px-2">Must be at least 8 characters</p>
                                </div>

                                {/* Submit Button */}
                                <button 
                                    type="submit" 
                                    className="w-full h-14 mt-4 bg-signup-primary hover:bg-signup-primary-hover text-[#152112] font-black text-lg rounded-full shadow-lg shadow-signup-primary/25 hover:shadow-signup-primary/40 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span>Creating Account...</span>
                                    ) : (
                                        <>
                                            <span>SIGN UP</span>
                                            <span className="material-symbols-outlined font-bold">arrow_forward</span>
                                        </button>
                                    )}
                                </button>

                                <div className="text-center pt-2">
                                    <p className="text-sm text-slate-500 dark:text-signup-text-sec">
                                        Already have an account? 
                                        <Link to="/login" className="font-bold text-slate-900 dark:text-white hover:text-signup-primary dark:hover:text-signup-primary underline decoration-2 underline-offset-4 decoration-signup-primary/50 hover:decoration-signup-primary transition-all ml-1">
                                            Log In
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer for Context */}
            <footer className="py-6 text-center text-slate-400 dark:text-signup-border-dark text-xs transition-colors duration-300">
                <p>© 2024 GyaanSetu Foundation. Built for Punjab.</p>
            </footer>
        </div>
    );
};