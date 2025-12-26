import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/api/auth.service';
import { useAuthStore } from '../../../store/useAuthStore';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); // Using password field as per design, mapping to PIN or Password in backend
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Mapping username/password to phone/pin for the existing API
            // Assuming username field captures phone and password field captures PIN
            const response = await authService.login({ phone: username, pin: password });
            login(response.user, response.token);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error && err.message === 'UNAUTHORIZED' 
                ? 'Invalid credentials' 
                : 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[480px] flex flex-col gap-6 md:gap-8 animate-in fade-in zoom-in duration-300">
            {/* Hero Text */}
            <div className="flex flex-col items-center text-center space-y-2">
                <h1 className="text-white tracking-tight text-[32px] md:text-4xl font-bold leading-tight px-4">Welcome back</h1>
                <p className="text-login-text-sec text-base font-normal leading-normal px-4">
                    Log in to continue your learning journey.
                </p>
            </div>

            {/* Login Card */}
            <div className="bg-login-surface-dark/50 backdrop-blur-sm border border-login-border-dark rounded-lg p-6 md:p-8 shadow-xl w-full">
                <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 rounded-lg bg-red-900/50 border border-red-700 text-red-200 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Username Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-base font-medium leading-normal pl-1" htmlFor="username">Username or Mobile Number</label>
                        <div className="relative flex items-center w-full">
                            <input 
                                autoComplete="username" 
                                className="w-full h-14 bg-[#152211] text-white placeholder:text-login-text-sec/70 border border-login-border-dark rounded-full px-6 pr-12 focus:outline-none focus:border-login-primary focus:ring-1 focus:ring-login-primary transition-all text-base" 
                                id="username" 
                                placeholder="Enter your username" 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <span className="material-symbols-outlined absolute right-5 text-login-text-sec pointer-events-none">person</span>
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-base font-medium leading-normal pl-1" htmlFor="password">Password</label>
                        <div className="relative flex items-center w-full">
                            <input 
                                autoComplete="current-password" 
                                className="w-full h-14 bg-[#152211] text-white placeholder:text-login-text-sec/70 border border-login-border-dark rounded-full px-6 pr-12 focus:outline-none focus:border-login-primary focus:ring-1 focus:ring-login-primary transition-all text-base" 
                                id="password" 
                                placeholder="Enter your password" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="material-symbols-outlined absolute right-5 text-login-text-sec pointer-events-none">lock</span>
                        </div>
                    </div>

                    {/* Options Row */}
                    <div className="flex items-center justify-between text-sm px-1">
                        <label className="flex items-center gap-2.5 text-white cursor-pointer group select-none">
                            <div className="relative flex items-center">
                                <input className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-login-border-dark bg-[#152211] checked:bg-login-primary checked:border-login-primary transition-all" type="checkbox"/>
                                <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-black opacity-0 peer-checked:opacity-100 pointer-events-none font-bold">check</span>
                            </div>
                            <span className="group-hover:text-login-primary transition-colors text-login-text-sec group-hover:text-white">Remember me</span>
                        </label>
                        <a className="text-login-primary font-bold hover:text-white transition-colors" href="#">Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <button 
                        className="mt-2 w-full h-14 bg-login-primary hover:bg-login-primary/90 text-[#142210] text-lg font-bold rounded-full transition-all shadow-[0_4px_20px_rgba(70,236,19,0.2)] hover:shadow-[0_4px_30px_rgba(70,236,19,0.4)] flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span>Signing in...</span>
                        ) : (
                            <>
                                <span>Start Learning</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Sign Up Footer */}
            <div className="text-center pb-6">
                <p className="text-login-text-sec text-base">
                    Don't have an account? 
                    <Link className="text-login-primary font-bold hover:underline hover:text-white transition-colors ml-1" to="/signup">Register Now</Link>
                </p>
            </div>
        </div>
    );
};