import React from 'react';
import { Link } from 'react-router-dom';

export const DigitalLiteracy: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-digilit-bg-dark text-slate-900 dark:text-white font-lexend antialiased overflow-hidden flex h-screen w-full transition-colors duration-200">
      
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[280px] flex-col bg-digilit-bg-dark border-r border-digilit-surface-highlight p-4 shrink-0 h-full overflow-y-auto">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-lg shadow-digilit-primary/20" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDktrCoetV1zCU34MicbLGzR2XrIqGUPEoO0L9kSNauYF35m4UkwqEF5pQydoJbtKb6K5finruBL0jdzMZUgh8l8vWRPw898p-4G9BtrJO6PT6IDbZVLUYGfYyEMgr5INW7zmpz7fzWRIPir3UxTt2bPgWuqGEgjxkMxaj6q75zYermGIaLDPMzc4gRBOO8wS70zdJ7XyvkwPSY1whU2hafi1Hp8mqzHMr_oBvuwR689uoPKASw3GEIcEpYBxhtOqur9O0gsnN19iE")' }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-white text-xl font-bold tracking-tight">GyaanSetu</h1>
                <p className="text-digilit-text-sec text-xs font-medium">Student Portal</p>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              <Link to="/app/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-digilit-surface-highlight text-digilit-text-sec hover:text-white transition-colors group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link to="/app/modules" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-digilit-primary text-digilit-bg-dark shadow-md shadow-digilit-primary/20 transition-colors">
                <span className="material-symbols-outlined">menu_book</span>
                <span className="text-sm font-bold">Modules</span>
              </Link>
              <Link to="/app/assessments" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-digilit-surface-highlight text-digilit-text-sec hover:text-white transition-colors group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">assignment</span>
                <span className="text-sm font-medium">Assessments</span>
              </Link>
              <Link to="/app/certificates" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-digilit-surface-highlight text-digilit-text-sec hover:text-white transition-colors group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">workspace_premium</span>
                <span className="text-sm font-medium">Certificates</span>
              </Link>
              <Link to="/app/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-digilit-surface-highlight text-digilit-text-sec hover:text-white transition-colors group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">settings</span>
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </nav>
          </div>
          {/* Bottom Actions */}
          <div className="p-4 rounded-xl bg-digilit-surface-dark border border-digilit-surface-highlight">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-digilit-primary/20 p-2 rounded-full text-digilit-primary">
                <span className="material-symbols-outlined text-xl">school</span>
              </div>
              <div>
                <p className="text-xs text-digilit-text-sec">Current Goal</p>
                <p className="text-sm font-bold text-white">Literacy Expert</p>
              </div>
            </div>
            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
              <div className="bg-digilit-primary h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navigation */}
        <header className="h-16 border-b border-digilit-surface-highlight bg-digilit-bg-dark flex items-center justify-between px-6 lg:px-10 shrink-0 z-20">
          <div className="flex items-center gap-4 text-white lg:hidden">
            <button className="p-1">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="font-bold text-lg">GyaanSetu</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <h2 className="text-white text-lg font-bold">Digital Literacy</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button className="hidden sm:flex items-center gap-2 bg-digilit-surface-highlight hover:bg-[#36522d] px-3 py-1.5 rounded-full text-white text-sm font-bold transition-colors border border-transparent hover:border-digilit-primary/50">
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span>EN</span>
            </button>
            <div className="h-6 w-px bg-digilit-surface-highlight mx-1"></div>
            <button className="relative text-digilit-text-sec hover:text-white transition-colors p-1">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full border border-digilit-bg-dark"></span>
            </button>
            <button className="flex items-center gap-2 pl-2">
              <div 
                className="size-9 rounded-full bg-cover bg-center border-2 border-digilit-surface-highlight" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAU3xRhJyx6XrWFCq3IE6JWMS9ohNW0re7RIpSMNOtgwX6XE5Hn0PcTo-RQdVSnEoh4xCdx67EaF_b1vLc99yJ6vLtrM1Hp3exzUrmgQFUvMnc3ZtgPHD2zwZ3Og1CRGF-U_wIQ-RiHMtGfUgD2Y-Q4NqK-04-gcMn7E4JVo4LjLYnhCwykvgzC30GLI_y3nHm-D2HFMa2POdN_rAa6GIjcX1TtLWjKdN10cJDVPnERXMpsu-U_Aea504CSyhmVu5KfvTOb3968jgs")' }}
              ></div>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">
            {/* Page Heading & Stats Combined */}
            <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-end">
              <div className="flex flex-col gap-2 max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Digital Literacy Modules</h1>
                <p className="text-digilit-text-sec text-base md:text-lg">Master essential computer skills and earn your certification. Your gateway to the digital world.</p>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full xl:w-auto">
                <div className="flex flex-col gap-1 p-4 rounded-xl bg-digilit-surface-dark border border-digilit-surface-highlight">
                  <span className="text-digilit-text-sec text-xs uppercase tracking-wider font-semibold">Completed</span>
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <div className="flex flex-col gap-1 p-4 rounded-xl bg-digilit-surface-dark border border-digilit-surface-highlight">
                  <span className="text-digilit-text-sec text-xs uppercase tracking-wider font-semibold">In Progress</span>
                  <span className="text-white text-2xl font-bold text-digilit-primary">2</span>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col gap-1 p-4 rounded-xl bg-digilit-surface-dark border border-digilit-surface-highlight">
                  <span className="text-digilit-text-sec text-xs uppercase tracking-wider font-semibold">Certificates</span>
                  <span className="text-white text-2xl font-bold">0</span>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-digilit-text-sec group-focus-within:text-digilit-primary transition-colors">search</span>
                </div>
                <input 
                  className="block w-full pl-12 pr-4 py-3.5 bg-digilit-surface-dark border border-digilit-surface-highlight rounded-xl text-white placeholder-digilit-text-sec focus:outline-none focus:border-digilit-primary focus:ring-1 focus:ring-digilit-primary transition-all" 
                  placeholder="Search for a module (e.g. Internet)..." 
                  type="text"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <button className="px-6 py-3.5 rounded-xl bg-digilit-primary text-digilit-bg-dark font-bold text-sm whitespace-nowrap shadow-lg shadow-digilit-primary/20">All Modules</button>
                <button className="px-6 py-3.5 rounded-xl bg-digilit-surface-dark text-digilit-text-sec hover:text-white border border-digilit-surface-highlight font-semibold text-sm whitespace-nowrap transition-colors">In Progress</button>
                <button className="px-6 py-3.5 rounded-xl bg-digilit-surface-dark text-digilit-text-sec hover:text-white border border-digilit-surface-highlight font-semibold text-sm whitespace-nowrap transition-colors">Completed</button>
                <button className="px-6 py-3.5 rounded-xl bg-digilit-surface-dark text-digilit-text-sec hover:text-white border border-digilit-surface-highlight font-semibold text-sm whitespace-nowrap transition-colors">Downloaded</button>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Module Card 1: Completed */}
              <div className="group relative flex flex-col bg-digilit-surface-dark border border-digilit-surface-highlight rounded-2xl overflow-hidden hover:border-digilit-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-digilit-primary/5">
                <div className="h-40 bg-[#1a2518] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-digilit-surface-dark to-transparent z-10"></div>
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD132POWQPdUxVrsNoaLX6yZlWPO_bM88G-zSDbOt9PUztMM7LEbTl6CcN_Q7RBhSI35Qr0sRZC7p8Vo7gm4Za04NmFK3qZZH5KvQjz3MwEJ1YCG3TxlQj_8HtEqL1urnEYKi1WPn803tJIvamqxm2L0_Ap1XYGr8RMDI5prSW6OUi5-xwOIFHpKQO9krYgJ2YNPG7_CVNuvf-e9Ifs9q3iDYNetW_LfY0U4peu4Sg778YOjSyrlGlkhImEsPmC32GwqlalIJ7bYiI")' }}
                  ></div>
                  <div className="absolute top-4 right-4 z-20 bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Completed
                  </div>
                  <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md rounded-full p-2 text-white" title="Available Offline">
                    <span className="material-symbols-outlined text-[20px]">cloud_done</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1 group-hover:text-digilit-primary transition-colors">Computer Basics</h3>
                    <p className="text-digilit-text-sec text-sm line-clamp-2">Learn about hardware, mouse control, keyboard shortcuts, and file management.</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-digilit-text-sec font-medium mt-auto">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">menu_book</span> 8 Lessons</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 2h 30m</span>
                  </div>
                  <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-full rounded-full"></div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-digilit-surface-highlight text-white font-bold text-sm hover:bg-[#3d5e32] transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">restart_alt</span>
                    Review Module
                  </button>
                </div>
              </div>

              {/* Module Card 2: In Progress */}
              <div className="group relative flex flex-col bg-digilit-surface-dark border border-digilit-surface-highlight rounded-2xl overflow-hidden hover:border-digilit-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-digilit-primary/5">
                <div className="h-40 bg-[#1a2518] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-digilit-surface-dark to-transparent z-10"></div>
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWW4FU_tLN1KVg4F4DNg8SK2CeEy-HDiArT_gDvZY39iyeBnEYECAHJQCCwRPAcKb82GkzGc6ZR9Mu_saHzGKvLOcp-dZQpeC7O6ydhC4teFNv0j7ToQm7rPDvHc6VWXKv7rJopKBSGS7tw_yF2WWcPmWMpgCmWhSt8TnGtVu3F8fBhhqj6gLw2eBK1D-IwbERoylr_Mm3kWxZc6uDcH1uyXzBjVv8aXq-z0WgGIHAO6Hu-t8GsuIY6KtQNnjwnMyoz4ROJsQ21PU")' }}
                  ></div>
                  <div className="absolute top-4 right-4 z-20 bg-digilit-primary/20 backdrop-blur-md border border-digilit-primary/30 text-digilit-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">timelapse</span>
                    In Progress
                  </div>
                  <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md rounded-full p-2 text-white" title="Available Offline">
                    <span className="material-symbols-outlined text-[20px]">cloud_done</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1 group-hover:text-digilit-primary transition-colors">Internet Fundamentals</h3>
                    <p className="text-digilit-text-sec text-sm line-clamp-2">How to browse the web safely, search effectively, and understand URLs.</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-digilit-text-sec font-medium mt-auto">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">menu_book</span> 12 Lessons</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 4h 15m</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-digilit-primary">45% Complete</span>
                      <span className="text-digilit-text-sec">5/12</span>
                    </div>
                    <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                      <div className="bg-digilit-primary h-full rounded-full relative overflow-hidden" style={{ width: '45%' }}>
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-digilit-primary text-digilit-bg-dark font-bold text-sm hover:bg-digilit-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-digilit-primary/20 hover:shadow-digilit-primary/40">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Continue Learning
                  </button>
                </div>
              </div>

              {/* Module Card 3: In Progress (Another one) */}
              <div className="group relative flex flex-col bg-digilit-surface-dark border border-digilit-surface-highlight rounded-2xl overflow-hidden hover:border-digilit-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-digilit-primary/5">
                <div className="h-40 bg-[#1a2518] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-digilit-surface-dark to-transparent z-10"></div>
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6AeFdYmU9Py4RTRdIY1O4uy44Ib3raex1EQw1E3cb0VR8FBoHcJBQxLfLCuF7ZqHvw0MzPkAW9TGn2wUq4xmc8IkzqjsoaZ8qAf3Odws88Xr4mOlZBy1qpAb7g1W8kHwqKPNdtd2XR6lWyJDSLFctGZF8eQHSvp5iogkJM0-M6XWgBW7A8c49KuT06sXNCWxoCZOYOyggjv-4IkqE-WYZlI3cjcroqXbTu_N6S453dqp_qKGs_Biuc-90OXs1LqsnPplVyRr__Hk")' }}
                  ></div>
                  <div className="absolute top-4 right-4 z-20 bg-digilit-primary/20 backdrop-blur-md border border-digilit-primary/30 text-digilit-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">timelapse</span>
                    In Progress
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1 group-hover:text-digilit-primary transition-colors">Keyboard Mastery</h3>
                    <p className="text-digilit-text-sec text-sm line-clamp-2">Improve your typing speed and accuracy with interactive exercises.</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-digilit-text-sec font-medium mt-auto">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">menu_book</span> 6 Lessons</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 1h 45m</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-digilit-primary">12% Complete</span>
                      <span className="text-digilit-text-sec">1/6</span>
                    </div>
                    <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                      <div className="bg-digilit-primary h-full rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-digilit-primary text-digilit-bg-dark font-bold text-sm hover:bg-digilit-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-digilit-primary/20 hover:shadow-digilit-primary/40">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Continue Learning
                  </button>
                </div>
              </div>

              {/* Module Card 4: Not Started */}
              <div className="group relative flex flex-col bg-digilit-surface-dark border border-digilit-surface-highlight rounded-2xl overflow-hidden hover:border-digilit-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-digilit-primary/5 opacity-90 hover:opacity-100">
                <div className="h-40 bg-[#1a2518] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-digilit-surface-dark to-transparent z-10"></div>
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCDKUjWzfbO2lsKfnxqAtgLehdSIZin9c7J7Iz3fPDUS9qeGWk9Fi073Mdi9F_hLYmIk5Gn2YfyGvEYe_nrZZctsNRaNSirkq9prwZ-dHYeYxEOSJceKFvtiLeq-x2sRpANMo3k7l36cw8YBn8RiPBeB7H5mXHsIe1W3MmlyPIv6iLK89sbxwk2LJa5MMJHq3QL1blocgZx7WK6nVJgkfmkjGkLGMBR-kngcLdK5jkqFE5cIlOzlmjYitzF8lJOi-8BMYLsVFhQhg")' }}
                  ></div>
                  <div className="absolute top-4 right-4 z-20 bg-gray-500/20 backdrop-blur-md border border-gray-500/30 text-gray-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">radio_button_unchecked</span>
                    Not Started
                  </div>
                  <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md rounded-full p-2 text-digilit-text-sec" title="Download Required">
                    <span className="material-symbols-outlined text-[20px]">cloud_download</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1 group-hover:text-digilit-primary transition-colors">Digital Safety</h3>
                    <p className="text-digilit-text-sec text-sm line-clamp-2">Passwords, privacy settings, and how to avoid common online scams.</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-digilit-text-sec font-medium mt-auto">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">menu_book</span> 5 Lessons</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 2h 00m</span>
                  </div>
                  <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                    <div className="bg-digilit-primary h-full w-0 rounded-full"></div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-digilit-surface-highlight text-white font-bold text-sm hover:bg-digilit-primary hover:text-digilit-bg-dark transition-all flex items-center justify-center gap-2 group/btn">
                    <span className="material-symbols-outlined">download_for_offline</span>
                    Start Module
                  </button>
                </div>
              </div>

              {/* Module Card 5: Locked */}
              <div className="group relative flex flex-col bg-digilit-surface-dark border border-digilit-surface-highlight rounded-2xl overflow-hidden opacity-60">
                <div className="h-40 bg-[#1a2518] relative overflow-hidden">
                  <div className="absolute inset-0 bg-digilit-surface-dark/60 z-20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-digilit-text-sec">lock</span>
                  </div>
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-30 grayscale" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYr9Uh3XSW5899GAzij4cAWBiC_5xXkR1x1NQqa6yMZsMU9k22y8fzgRnCcYeU9kjqQY5Z8EQA24YDJFwC11KgX7UUmQp1mLKBHRTi78uR-Ulwt-EXv4Bpzl8M4CJSzpteFAjCNXXjoPZpv23wcBG3Ayf1MwfZ4FKEh9up_I9zf0MSdNxDtPXI0H4hbJ3bJLn-u3MTMtwHwG6_CPB8nB3BJDe6WQohaBG-lKGUgKRc_7KYMS48fSVT3swi37W0nvci72oysZE-I2A")' }}
                  ></div>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-gray-300 text-xl font-bold mb-1">Communication Tools</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">Email basics, video calling etiquette, and messaging apps.</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mt-auto">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">menu_book</span> 7 Lessons</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 3h 00m</span>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-transparent border border-digilit-surface-highlight text-gray-400 font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Complete Prerequisites
                  </button>
                </div>
              </div>

              {/* Certificate Promo Card */}
              <div className="group relative flex flex-col bg-gradient-to-br from-digilit-surface-highlight to-digilit-bg-dark border border-[#406336] rounded-2xl overflow-hidden hover:border-digilit-primary/50 transition-all duration-300">
                <div className="p-8 flex flex-col flex-1 items-center text-center justify-center gap-4">
                  <div className="size-16 rounded-full bg-digilit-primary/20 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-4xl text-digilit-primary animate-pulse">workspace_premium</span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">Earn Your Certificate</h3>
                    <p className="text-digilit-text-sec text-sm">Complete all 5 modules to unlock your official GyaanSetu Digital Literacy Certification.</p>
                  </div>
                  <button className="mt-2 px-6 py-2 rounded-full border border-digilit-primary text-digilit-primary text-sm font-bold hover:bg-digilit-primary hover:text-digilit-bg-dark transition-colors">
                    View Details
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
