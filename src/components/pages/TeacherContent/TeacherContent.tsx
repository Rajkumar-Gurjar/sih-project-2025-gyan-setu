import React from 'react';
import { Link } from 'react-router-dom';

export const TeacherContent: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-teacher-bg-dark text-slate-900 dark:text-white font-lexend overflow-hidden flex h-screen w-full selection:bg-teacher-primary selection:text-teacher-bg-dark transition-colors duration-200">
      
      {/* Side Navigation */}
      <aside className="hidden md:flex flex-col w-64 h-full border-r border-teacher-surface-border bg-teacher-bg-dark p-4 justify-between shrink-0">
        <div className="flex flex-col gap-6">
          {/* User Profile / Brand */}
          <div className="flex gap-3 items-center px-2">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-12 shrink-0 border-2 border-teacher-primary/20" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSes0ZC1EsyTq4Yh__e10LcalWua-XoCRPq4vZQyZj9F-KPXybSigUIrq2N_qXTfIX4CcryuAGCIqm5_CBIrOhy3JRMTC8ytyyQQCrCzujYv9gaEauOeZl0zKj934Vg4PwOFEBDb8qTjRuOpso71EkWcezh2PIoHtyuuRpEuoM6L7-O0jb0Z0YJzg3uJnIea3Na1zY2_knhyKiWGxvWdbwgGSqYqLpA6StN57x0CT5HjIPcp-YmD4w0dyqeGWBtSRUttRNJkeMlhI")' }}
            ></div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-white text-base font-bold leading-tight truncate">Mrs. Kaur</h1>
              <p className="text-teacher-text-sec text-xs font-normal leading-normal truncate">Science • Class 5</p>
            </div>
          </div>
          {/* Nav Links */}
          <nav className="flex flex-col gap-2">
            <Link to="/teacher/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-teacher-surface-active transition-colors group">
              <span className="material-symbols-outlined text-teacher-text-sec group-hover:text-white">dashboard</span>
              <p className="text-teacher-text-sec group-hover:text-white text-sm font-medium">Dashboard</p>
            </Link>
            <Link to="/teacher/content" className="flex items-center gap-3 px-4 py-3 rounded-full bg-teacher-primary shadow-lg shadow-teacher-primary/20 text-teacher-bg-dark">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>library_books</span>
              <p className="text-teacher-bg-dark text-sm font-bold">Content</p>
            </Link>
            <Link to="/teacher/students" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-teacher-surface-active transition-colors group">
              <span className="material-symbols-outlined text-teacher-text-sec group-hover:text-white">groups</span>
              <p className="text-teacher-text-sec group-hover:text-white text-sm font-medium">Students</p>
            </Link>
            <Link to="/teacher/analytics" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-teacher-surface-active transition-colors group">
              <span className="material-symbols-outlined text-teacher-text-sec group-hover:text-white">analytics</span>
              <p className="text-teacher-text-sec group-hover:text-white text-sm font-medium">Analytics</p>
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/teacher/settings" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-teacher-surface-active transition-colors group">
            <span className="material-symbols-outlined text-teacher-text-sec group-hover:text-white">settings</span>
            <p className="text-teacher-text-sec group-hover:text-white text-sm font-medium">Settings</p>
          </Link>
          <button className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-10 px-4 bg-teacher-surface-active hover:bg-teacher-surface-border transition-colors text-white text-sm font-bold mt-2">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header Placeholder (visible only on small screens) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-teacher-surface-border bg-teacher-bg-dark">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-teacher-primary">menu</span>
            <span className="font-bold text-lg text-white">GyaanSetu</span>
          </div>
          <div className="size-8 rounded-full bg-teacher-surface-active"></div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-8">
            
            {/* Page Heading Section */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.02em]">Content Management</h1>
                <p className="text-teacher-text-sec text-base font-normal">Curate learning materials for Class 5 - Science</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-teacher-surface-border bg-teacher-surface-dark/50">
                  <span className="material-symbols-outlined text-teacher-text-sec text-sm">wifi_off</span>
                  <span className="text-xs text-teacher-text-sec font-medium">Offline Mode Ready</span>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-full h-10 px-4 bg-teacher-surface-active hover:bg-teacher-surface-border text-white text-sm font-bold transition-colors">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span className="truncate hidden sm:inline">Student View</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Stat 1 */}
              <div className="flex flex-col gap-1 rounded-2xl border border-teacher-surface-border bg-teacher-surface-dark/30 p-5 items-start hover:border-teacher-primary/50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-teacher-primary text-3xl">folder_open</span>
                  <span className="bg-teacher-primary/10 text-teacher-primary text-xs font-bold px-2 py-1 rounded-full">+2 this week</span>
                </div>
                <p className="text-white text-3xl font-bold leading-tight mt-2">12</p>
                <p className="text-teacher-text-sec text-sm font-normal">Active Learning Units</p>
              </div>
              {/* Stat 2 */}
              <div className="flex flex-col gap-1 rounded-2xl border border-teacher-surface-border bg-teacher-surface-dark/30 p-5 items-start hover:border-teacher-primary/50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-teacher-primary text-3xl">quiz</span>
                  <span className="bg-teacher-primary/10 text-teacher-primary text-xs font-bold px-2 py-1 rounded-full">3 Live</span>
                </div>
                <p className="text-white text-3xl font-bold leading-tight mt-2">5</p>
                <p className="text-teacher-text-sec text-sm font-normal">Interactive Quizzes</p>
              </div>
              {/* Stat 3 (Storage) */}
              <div className="flex flex-col gap-1 rounded-2xl border border-teacher-surface-border bg-teacher-surface-dark/30 p-5 items-start w-full hover:border-teacher-primary/50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-teacher-primary text-3xl">cloud_done</span>
                  <span className="text-teacher-text-sec text-xs">9% Used</span>
                </div>
                <div className="w-full flex items-end justify-between mt-2 mb-1">
                  <p className="text-white text-xl font-bold leading-tight">45MB <span className="text-teacher-text-sec text-sm font-normal">/ 500MB</span></p>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-teacher-surface-active rounded-full overflow-hidden">
                  <div className="h-full bg-teacher-primary rounded-full" style={{ width: '9%' }}></div>
                </div>
              </div>
            </div>

            {/* Primary Actions Area */}
            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-3 rounded-full h-14 px-6 bg-teacher-primary hover:bg-[#3ecb15] text-teacher-bg-dark text-base font-bold shadow-lg shadow-teacher-primary/10 transition-all transform hover:scale-[1.01]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
                <span>Upload Material</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 rounded-full h-14 px-6 bg-teacher-surface-active hover:bg-teacher-surface-border text-white text-base font-bold border border-teacher-surface-border transition-all transform hover:scale-[1.01]">
                <span className="material-symbols-outlined">add_circle</span>
                <span>Create Quiz</span>
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-3 rounded-full h-14 px-6 bg-teacher-surface-dark hover:bg-teacher-surface-active text-teacher-text-sec hover:text-white text-base font-bold border border-teacher-surface-border transition-all">
                <span className="material-symbols-outlined">route</span>
                <span>New Learning Path</span>
              </button>
            </div>

            {/* Content Library Section */}
            <div className="flex flex-col gap-6">
              {/* Filters & Search */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96 group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-teacher-text-sec group-focus-within:text-teacher-primary transition-colors">search</span>
                  <input 
                    className="w-full bg-teacher-surface-dark border border-teacher-surface-border text-white rounded-full h-12 pl-12 pr-4 focus:outline-none focus:border-teacher-primary focus:ring-1 focus:ring-teacher-primary placeholder-teacher-text-sec/50 transition-all" 
                    placeholder="Search files, quizzes..." 
                    type="text"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                  <button className="px-4 py-2 rounded-full bg-teacher-primary text-teacher-bg-dark text-sm font-bold whitespace-nowrap">All Items</button>
                  <button className="px-4 py-2 rounded-full bg-teacher-surface-dark border border-teacher-surface-border text-teacher-text-sec hover:text-white hover:border-teacher-text-sec text-sm font-medium whitespace-nowrap transition-colors">Videos</button>
                  <button className="px-4 py-2 rounded-full bg-teacher-surface-dark border border-teacher-surface-border text-teacher-text-sec hover:text-white hover:border-teacher-text-sec text-sm font-medium whitespace-nowrap transition-colors">Documents</button>
                  <button className="px-4 py-2 rounded-full bg-teacher-surface-dark border border-teacher-surface-border text-teacher-text-sec hover:text-white hover:border-teacher-text-sec text-sm font-medium whitespace-nowrap transition-colors">Quizzes</button>
                </div>
              </div>

              {/* Content List */}
              <div className="flex flex-col gap-3">
                {/* List Header (Desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold text-teacher-text-sec uppercase tracking-wider">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>

                {/* Item 1: Video */}
                <div className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 items-center bg-teacher-surface-dark border border-teacher-surface-border hover:border-teacher-primary/30 rounded-2xl p-4 transition-all">
                  <div className="col-span-5 w-full flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-[#2a1b1b] flex items-center justify-center shrink-0 text-red-400">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white font-bold text-base group-hover:text-teacher-primary transition-colors">Photosynthesis Basics</p>
                      <p className="text-teacher-text-sec text-sm">Unit 3: Plant Life</p>
                    </div>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Type:</span>
                    <span className="text-white text-sm font-medium">Video (MP4)</span>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Size:</span>
                    <span className="text-white text-sm font-medium">15.2 MB</span>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Status:</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-900/30 text-yellow-500 border border-yellow-900/50">
                      <span className="size-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                      <span className="text-xs font-bold">Scheduled Oct 12</span>
                    </div>
                  </div>
                  <div className="col-span-1 w-full flex md:justify-end gap-2 mt-4 md:mt-0">
                    <button className="size-9 rounded-full hover:bg-teacher-surface-active flex items-center justify-center text-teacher-text-sec hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button className="size-9 rounded-full hover:bg-red-900/30 flex items-center justify-center text-teacher-text-sec hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>

                {/* Item 2: Quiz */}
                <div className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 items-center bg-teacher-surface-dark border border-teacher-surface-border hover:border-teacher-primary/30 rounded-2xl p-4 transition-all">
                  <div className="col-span-5 w-full flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-[#1b2a24] flex items-center justify-center shrink-0 text-teacher-primary">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stylus</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white font-bold text-base group-hover:text-teacher-primary transition-colors">Chapter 3 Review Quiz</p>
                      <p className="text-teacher-text-sec text-sm">Unit 3: Plant Life</p>
                    </div>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Type:</span>
                    <span className="text-white text-sm font-medium">Interactive</span>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Size:</span>
                    <span className="text-teacher-text-sec text-sm font-medium">--</span>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Status:</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teacher-primary/10 text-teacher-primary border border-teacher-primary/20">
                      <span className="size-1.5 rounded-full bg-teacher-primary"></span>
                      <span className="text-xs font-bold">Published</span>
                    </div>
                  </div>
                  <div className="col-span-1 w-full flex md:justify-end gap-2 mt-4 md:mt-0">
                    <button className="size-9 rounded-full hover:bg-teacher-surface-active flex items-center justify-center text-teacher-text-sec hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button className="size-9 rounded-full hover:bg-red-900/30 flex items-center justify-center text-teacher-text-sec hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>

                {/* Item 3: PDF */}
                <div className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 items-center bg-teacher-surface-dark border border-teacher-surface-border hover:border-teacher-primary/30 rounded-2xl p-4 transition-all">
                  <div className="col-span-5 w-full flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-[#1b222a] flex items-center justify-center shrink-0 text-blue-400">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white font-bold text-base group-hover:text-teacher-primary transition-colors">Lab Safety Guidelines</p>
                      <p className="text-teacher-text-sec text-sm">General Resources</p>
                    </div>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Type:</span>
                    <span className="text-white text-sm font-medium">PDF Document</span>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Size:</span>
                    <span className="text-white text-sm font-medium">2.4 MB</span>
                  </div>
                  <div className="col-span-2 w-full flex md:block items-center justify-between">
                    <span className="md:hidden text-teacher-text-sec text-sm">Status:</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-700/30 text-gray-400 border border-gray-600/30">
                      <span className="size-1.5 rounded-full bg-gray-400"></span>
                      <span className="text-xs font-bold">Draft</span>
                    </div>
                  </div>
                  <div className="col-span-1 w-full flex md:justify-end gap-2 mt-4 md:mt-0">
                    <button className="size-9 rounded-full hover:bg-teacher-surface-active flex items-center justify-center text-teacher-text-sec hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button className="size-9 rounded-full hover:bg-red-900/30 flex items-center justify-center text-teacher-text-sec hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Pagination / Load More */}
              <div className="flex justify-center mt-4">
                <button className="text-teacher-text-sec hover:text-white text-sm font-bold flex items-center gap-1 transition-colors">
                  Load more content
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer Spacer */}
          <div className="h-10"></div>
        </div>
      </main>
    </div>
  );
};
