import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ForgotPasswordConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-background-light dark:bg-forgot-bg-dark font-lexend text-slate-900 dark:text-white antialiased selection:bg-forgot-primary selection:text-forgot-bg-dark min-h-screen flex flex-col transition-colors duration-300">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header / Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-forgot-border-dark px-6 py-4 md:px-10 bg-white/90 dark:bg-forgot-bg-dark/90 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forgot-primary/20 text-forgot-primary">
              <span className="material-symbols-outlined text-2xl font-bold">school</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">GyaanSetu</h2>
          </div>
          <button className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-transparent border border-slate-200 dark:border-forgot-border-dark px-4 text-sm font-bold leading-normal tracking-[0.015em] text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#2d4625] transition-colors">
            <span className="material-symbols-outlined text-lg">help</span>
            <span className="truncate">Help</span>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6">
          {/* Central Card */}
          <div className="w-full max-w-[480px] flex flex-col items-center rounded-2xl bg-white dark:bg-forgot-card-dark p-8 shadow-xl border border-slate-200 dark:border-forgot-border-dark animate-in fade-in zoom-in duration-300">
            {/* Success Icon */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-forgot-primary/10 dark:bg-forgot-primary/20">
              <span className="material-symbols-outlined text-[48px] text-forgot-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
            </div>
            
            {/* Headline */}
            <h1 className="mb-3 text-center text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              Check your email
            </h1>
            
            {/* Body Text */}
            <div className="mb-8 text-center">
              <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300">
                We have sent a password reset link to <br/>
                <strong className="text-slate-900 dark:text-white">student@gyaansetu.com</strong>
              </p>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Did not receive the email? Check your spam folder or try another email address.
              </p>
            </div>
            
            {/* Action Button */}
            <div className="w-full">
              <button 
                disabled={countdown > 0}
                className="group relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-forgot-primary px-5 text-forgot-bg-dark text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-[#3ecb18] focus:outline-none focus:ring-4 focus:ring-forgot-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined mr-2 text-[20px]">refresh</span>
                <span className="truncate">
                  {countdown > 0 ? `Resend Email (${formatTime(countdown)})` : 'Resend Email'}
                </span>
              </button>
            </div>
            
            {/* Back to Login Link */}
            <Link className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors hover:text-forgot-primary dark:hover:text-forgot-primary" to="/login">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Login
            </Link>
          </div>
          
          {/* Footer Hints (Contextual) */}
          <div className="mt-8 max-w-[480px] text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              If you are having trouble, please contact your class teacher or support administrator.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};
