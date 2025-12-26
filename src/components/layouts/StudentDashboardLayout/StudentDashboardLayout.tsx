import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export const StudentDashboardLayout: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased transition-colors duration-300">
      {/* Sidebar */}
      <aside className="hidden w-72 flex-col border-r border-gray-200 dark:border-[#2e4328] bg-surface-light dark:bg-[#162013] md:flex">
        <div className="flex h-full flex-col justify-between p-6">
          <div className="flex flex-col gap-8">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-background-dark shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold leading-none tracking-tight">GyaanSetu</h1>
                <p className="text-sm font-medium text-gray-500 dark:text-[#a2c398]">Student Portal</p>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              <Link to="/app/dashboard" className="group flex items-center gap-4 rounded-full bg-primary px-4 py-3 text-background-dark transition-all">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                <span className="font-bold">Home</span>
              </Link>
              <Link to="/app/lessons" className="group flex items-center gap-4 rounded-full px-4 py-3 text-gray-600 dark:text-[#a2c398] hover:bg-gray-100 dark:hover:bg-[#2e4328] hover:text-primary dark:hover:text-white transition-all">
                <span className="material-symbols-outlined">menu_book</span>
                <span className="font-medium">Courses</span>
              </Link>
              <Link to="/app/library" className="group flex items-center gap-4 rounded-full px-4 py-3 text-gray-600 dark:text-[#a2c398] hover:bg-gray-100 dark:hover:bg-[#2e4328] hover:text-primary dark:hover:text-white transition-all">
                <span className="material-symbols-outlined">local_library</span>
                <span className="font-medium">Library</span>
              </Link>
              <Link to="/app/achievements" className="group flex items-center gap-4 rounded-full px-4 py-3 text-gray-600 dark:text-[#a2c398] hover:bg-gray-100 dark:hover:bg-[#2e4328] hover:text-primary dark:hover:text-white transition-all">
                <span className="material-symbols-outlined">emoji_events</span>
                <span className="font-medium">Achievements</span>
              </Link>
              <Link to="/app/settings" className="group flex items-center gap-4 rounded-full px-4 py-3 text-gray-600 dark:text-[#a2c398] hover:bg-gray-100 dark:hover:bg-[#2e4328] hover:text-primary dark:hover:text-white transition-all">
                <span className="material-symbols-outlined">settings</span>
                <span className="font-medium">Settings</span>
              </Link>
            </nav>
          </div>
          {/* Sync Status */}
          <div className="rounded-2xl bg-gray-100 dark:bg-[#2e4328] p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              <p className="text-sm font-bold text-gray-700 dark:text-white">System Online</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-[#a2c398]">Last synced: 2 mins ago</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-background-light dark:bg-background-dark">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-gray-200 dark:border-[#2e4328] bg-background-light/80 dark:bg-background-dark/80 px-6 backdrop-blur-md md:px-10">
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-gray-600 dark:text-white">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
            <span className="font-bold text-lg dark:text-white">GyaanSetu</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-800 dark:text-white">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="flex flex-1 justify-end items-center gap-3 md:gap-6">
            {/* Search */}
            <div className="hidden md:flex relative w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-xl">search</span>
              <input className="h-10 w-full rounded-full border-none bg-gray-100 dark:bg-[#2e4328] pl-10 pr-4 text-sm text-gray-800 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary" placeholder="Search lessons..." type="text" />
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex h-10 items-center gap-2 rounded-full bg-gray-100 dark:bg-[#2e4328] px-4 text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#3d5635] transition-colors">
                <span className="material-symbols-outlined text-lg">translate</span>
                <span className="hidden sm:inline">Pbi/Eng</span>
              </button>
            </div>
            {/* Profile */}
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary bg-gray-200" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB694c10Z52tmrxo5AyvOxZ64PXAwD5gNAlHq8RJ9jw4JXaJ8W6A-OHxJxtDuYTONeryxCoU1uRp6Q49zMlSRjWbO4jIV6IiClY7Expucp4bJSN_06hp8EzSy1iEo3-wU2XYtYwYLw2H9CVT5Lvafv_pitars54Czyx-AYAOoa1NGvhwO-_YIIurAf3K3T-xWHMtf9rw0BS5eMo3gvVzHu5hw3ApKGPoKJUN3nSmAWGCjxcS1oNTbCKeGXPuYnu29ei9AHbsC3sAl8')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
          </div>
        </header>
        
        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
};
