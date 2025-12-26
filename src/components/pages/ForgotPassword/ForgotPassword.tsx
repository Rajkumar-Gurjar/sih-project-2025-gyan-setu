import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPassword: React.FC = () => {
  const [identity, setIdentity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="bg-background-light dark:bg-forgot-bg-dark font-display antialiased min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Subtle Background Pattern/Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, #2d5e23 0%, transparent 50%)' }}>
      </div>

      <main className="flex-1 flex items-center justify-center p-4 relative z-10 w-full">
        <div className="w-full max-w-[480px] animate-in fade-in zoom-in duration-300">
          {/* Card Container */}
          <div className="bg-white dark:bg-forgot-card-dark rounded-xl shadow-2xl border border-gray-100 dark:border-forgot-border-dark overflow-hidden">
            
            {/* Card Header / Logo */}
            <div className="px-8 pt-8 pb-4 text-center">
              <div className="inline-flex items-center gap-3 justify-center mb-6">
                <div className="size-10 rounded-lg bg-forgot-primary/20 flex items-center justify-center text-forgot-primary">
                  <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <h2 className="text-gray-900 dark:text-white text-2xl font-bold tracking-tight">GyaanSetu</h2>
              </div>
              <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight mb-3">
                {isSent ? 'Check Your Mail' : 'Forgot Password?'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed">
                {isSent 
                  ? `We've sent a password reset link to ${identity}. Please check your inbox.`
                  : "Don't worry, it happens. Enter your registered email or username to reset your password."
                }
              </p>
            </div>

            {/* Form Section */}
            <div className="px-8 pb-8 pt-2">
              {!isSent ? (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  {/* Input Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-700 dark:text-gray-200 text-sm font-medium" htmlFor="identity">
                      Email Address or Username
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none group-focus-within:text-forgot-primary transition-colors">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <input 
                        className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-forgot-input-dark border border-gray-200 dark:border-forgot-border-dark rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-forgot-primary/50 focus:border-forgot-primary transition-all font-normal" 
                        id="identity" 
                        name="identity" 
                        placeholder="student@gyaansetu.edu" 
                        required 
                        type="text"
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className="w-full h-12 bg-forgot-primary hover:bg-[#3ec41a] text-forgot-bg-dark font-bold text-base rounded-lg shadow-lg hover:shadow-forgot-primary/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" 
                    type="submit"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? 'Sending...' : 'Send Reset Link'}</span>
                    {!isLoading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setIsSent(false)}
                  className="w-full h-12 bg-forgot-primary hover:bg-[#3ec41a] text-forgot-bg-dark font-bold text-base rounded-lg shadow-lg hover:shadow-forgot-primary/25 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Resend Link</span>
                  <span className="material-symbols-outlined text-xl">refresh</span>
                </button>
              )}

              {/* Footer Link */}
              <div className="mt-8 text-center border-t border-gray-100 dark:border-forgot-border-dark pt-6">
                <Link className="inline-flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-forgot-primary dark:hover:text-forgot-primary transition-colors text-sm font-medium group" to="/login">
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
                  <span>Remember your password? Log in</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Accessibility / Support Helper */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-600 text-xs">
              Need help? Contact your school administrator.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
