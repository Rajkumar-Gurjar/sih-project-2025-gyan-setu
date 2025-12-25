import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';

/**
 * LessonViewerLayout provides a focused viewing environment for lessons.
 * It includes a minimal header with a back button and a language switcher.
 */
export const LessonViewerLayout: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            {/* Minimal Header for Lesson Viewing */}
            <header className="navbar bg-base-100 border-b border-base-200 px-4 sticky top-0 z-30">
                <div className="flex-none">
                    <button 
                        className="btn btn-ghost btn-circle"
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-1">
                    <h1 className="text-lg font-semibold px-2">Lesson Viewer</h1>
                </div>
                <div className="flex-none gap-2">
                    <LanguageSwitcher />
                </div>
            </header>
            
            {/* Content Area */}
            <main className="flex-1 overflow-auto">
                <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
