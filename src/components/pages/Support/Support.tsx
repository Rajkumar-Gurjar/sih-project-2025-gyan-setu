import React from 'react';
import { Link } from 'react-router-dom';

export const Support: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-support-bg-dark text-slate-900 dark:text-white font-lexend overflow-x-hidden antialiased transition-colors duration-200 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-support-border-dark px-6 md:px-10 py-3 bg-white/90 dark:bg-support-bg-dark/90 backdrop-blur-md">
        <div className="flex items-center gap-4 dark:text-white text-slate-900">
          <div className="size-8 flex items-center justify-center text-support-primary">
            <span className="material-symbols-outlined text-[32px]">school</span>
          </div>
          <h2 className="dark:text-white text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">GyaanSetu</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <Link className="dark:text-white text-slate-700 hover:text-support-primary text-sm font-medium leading-normal" to="/app/dashboard">Home</Link>
            <Link className="dark:text-white text-slate-700 hover:text-support-primary text-sm font-medium leading-normal" to="/app/lessons">Lessons</Link>
            <Link className="dark:text-white text-slate-700 hover:text-support-primary text-sm font-medium leading-normal" to="/app/progress">My Progress</Link>
            <Link className="text-support-primary text-sm font-bold leading-normal" to="/support">Support</Link>
          </div>
          <div className="flex gap-2">
            <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-support-primary text-support-bg-dark text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-110 transition-all">
              <span className="truncate">Login</span>
            </Link>
            <button aria-label="Language" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-200 dark:bg-support-surface-dark dark:text-white text-slate-900 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3 hover:bg-slate-300 dark:hover:bg-support-border-dark transition-all">
              <span className="material-symbols-outlined text-[20px]">translate</span>
            </button>
            <Link to="/app/profile" aria-label="Profile" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-200 dark:bg-support-surface-dark dark:text-white text-slate-900 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3 hover:bg-slate-300 dark:hover:bg-support-border-dark transition-all">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="flex flex-col flex-1">
        {/* Hero Search Section */}
        <section 
          className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 bg-support-surface-dark bg-cover bg-center" 
          style={{ backgroundImage: 'linear-gradient(rgba(21, 33, 17, 0.85) 0%, rgba(21, 33, 17, 0.95) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9JXe94bXH1wiDqfn9-Oe1Xeo6jw3d_-PpIYCMpyTwg3aEgxuzhW-NdQbwj0QPFZj9QvJmxKKXW3MaKc64C8YPqErtPk5apBBsRMQuJFiff4Xygoks2100AebH08CFAX9Ts3PfRqw37xTWGDX_qPQGOsXeqliKNtAl_vrCR2Ie6v84C_Z-uMJ_hfmHMP5UdmKNQc1Z4C6sKZPrkaBIDlIi-1uu3han-aREvFjwUz1TjYM-gSGwSE_uKPjHykXaotR51iwH4NimtPI")' }}
        >
          <div className="flex flex-col gap-6 text-center max-w-[720px] w-full z-10">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
              How can we help you?
            </h1>
            <h2 className="text-support-text-sec text-lg font-normal leading-normal">
              Search for troubleshooting guides, tutorials, or contact our support team.
            </h2>
            <div className="w-full max-w-[560px] mx-auto mt-4">
              <div className="flex w-full items-stretch rounded-xl h-14 md:h-16 shadow-lg shadow-black/20 focus-within:ring-2 focus-within:ring-support-primary transition-all">
                <div className="text-support-text-sec flex border border-support-border-dark bg-[#1a2b16] items-center justify-center pl-5 rounded-l-xl border-r-0 text-2xl">
                  <span className="material-symbols-outlined text-[24px]">search</span>
                </div>
                <input 
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 bg-[#1a2b16] h-full placeholder:text-support-text-sec/70 px-4 border-y border-support-border-dark border-x-0 text-base md:text-lg font-normal" 
                  placeholder="Try 'download offline' or 'reset password'..." 
                />
                <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-support-border-dark bg-[#1a2b16] pr-2">
                  <button className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-support-primary text-support-bg-dark text-sm md:text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#3ecf15] transition-colors">
                    <span className="truncate">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Container */}
        <div className="flex-1 flex justify-center px-4 md:px-10 py-12 bg-background-light dark:bg-background-dark">
          <div className="w-full max-w-[1080px] flex flex-col gap-12">
            
            {/* Common Topics Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">Browse by Topic</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Topic Cards */}
                {[
                  { icon: 'rocket_launch', title: 'Getting Started', desc: 'Create an account, set up your profile, and start your first lesson.' },
                  { icon: 'cloud_off', title: 'Offline Learning', desc: 'Download lessons for offline use and sync your progress later.' },
                  { icon: 'manage_accounts', title: 'My Account', desc: 'Manage passwords, view progress reports, and update details.' },
                  { icon: 'build', title: 'Technical Fixes', desc: 'Resolve app crashes, slow loading times, and device compatibility.' }
                ].map((topic, i) => (
                  <div key={i} className="group flex flex-col gap-4 rounded-xl bg-white dark:bg-support-surface-dark border border-slate-200 dark:border-support-border-dark p-6 hover:border-support-primary/50 transition-colors cursor-pointer shadow-sm">
                    <div className="size-12 rounded-lg bg-support-primary/20 flex items-center justify-center text-support-primary group-hover:bg-support-primary group-hover:text-support-bg-dark transition-colors">
                      <span className="material-symbols-outlined text-[28px]">{topic.icon}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold">{topic.title}</h3>
                      <p className="text-slate-600 dark:text-support-text-sec text-sm">{topic.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Video Tutorials */}
            <section>
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-6">Video Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video Cards */}
                {[
                  { 
                    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmN6WK5yE4FCHMbw-Ronc2uxsCdzbw2eDaeBX1_ok9kf0CzSwBN56X-8Zfc1111WPwkgyNSnSZ8qlLghS3oP5wwlm7obGpXzIEC0m1PGvXF6UoE15OVEraXg9Rtlaz0jWTc88EXrb3Cjfit0mzfU5Un5VSgteNru0tQt51uvzaOClMkuqdGl9dcNVzmKXVvoluMoWzu6EPlTOLw_q1oXCVSo-KGo59hmUv9LKH3tLS-wAafSdR02z32vcArFUw2e_F3dZrTPzRy4I',
                    title: 'How to download lessons',
                    desc: 'Learn how to save data by downloading full chapters when you have connectivity.'
                  },
                  {
                    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7pxNuAOuKXAczt34neKz8Y5DVHvOuVVilZGjOWJpq3L0rFboGLcH0U1xQKePzxyeRZKX3eNjD8iwZE3C-GWQZYFj3Xv9vV3dq-d0ml_y6tmSGvdkQR_1sqtYcy8yrmk-38D73odQ5faMOb4OyYeEB7O1iIjNpgY2QEMjefleKZ_TPPGd0FbSQkqS1Hg1_FzcdoImxT-xA8I9uOboTjAXznQY-AG_I40TK6OLrKmbd_CR-KBc0EOfsxNu9kZ29lvYnZwoyHsbukH0',
                    title: 'Understanding your progress',
                    desc: 'A quick guide on reading your performance badges and test scores.'
                  }
                ].map((video, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-4 rounded-xl bg-white dark:bg-support-surface-dark p-4 border border-slate-200 dark:border-support-border-dark hover:shadow-md transition-shadow">
                    <div 
                      className="w-full md:w-48 h-32 bg-slate-200 dark:bg-neutral-800 rounded-lg bg-cover bg-center flex items-center justify-center relative overflow-hidden group cursor-pointer shrink-0" 
                      style={{ backgroundImage: `url("${video.thumb}")` }}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                      <div className="size-10 rounded-full bg-white/90 flex items-center justify-center z-10 shadow-lg pl-1">
                        <span className="material-symbols-outlined text-black text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center flex-1 gap-2">
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">{video.title}</h3>
                      <p className="text-slate-600 dark:text-support-text-sec text-sm">{video.desc}</p>
                      <a className="text-support-primary text-sm font-bold flex items-center gap-1 mt-1 hover:underline" href="#">
                        Watch Video <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs Accordion */}
            <section className="rounded-xl bg-slate-50 dark:bg-[#1a2b16] border border-slate-200 dark:border-support-border-dark p-6 md:p-8">
              <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-6">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-4">
                {[
                  { q: 'I forgot my password, how do I reset it?', a: 'To reset your password, go to the login page and click on "Forgot Password". Enter your registered phone number, and you will receive an OTP via SMS to create a new password.' },
                  { q: 'Can I use GyaanSetu without internet?', a: 'Yes! GyaanSetu is designed to work offline. You only need internet to download the lessons initially. Once downloaded, you can learn and take quizzes without any data connection. Your progress will sync automatically when you go back online.' },
                  { q: 'Why are my videos not loading?', a: 'If you are trying to stream videos, ensure you have a stable internet connection. If your connection is poor, we recommend downloading the video first using the "Download" button below the video player.' }
                ].map((faq, i) => (
                  <details key={i} className="group bg-white dark:bg-support-surface-dark rounded-lg border border-slate-200 dark:border-support-border-dark overflow-hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-slate-900 dark:text-white focus:outline-none">
                      <span>{faq.q}</span>
                      <span className="transition group-open:rotate-180">
                        <span className="material-symbols-outlined">expand_more</span>
                      </span>
                    </summary>
                    <div className="border-t border-slate-200 dark:border-support-border-dark p-4 text-slate-600 dark:text-support-text-sec text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Contact Support Section */}
            <section className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 bg-white dark:bg-support-surface-dark rounded-xl p-8 border border-slate-200 dark:border-support-border-dark flex flex-col justify-between">
                <div>
                  <div className="size-12 rounded-full bg-support-primary/20 flex items-center justify-center text-support-primary mb-4">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                  </div>
                  <h2 className="text-slate-900 dark:text-white text-2xl font-bold mb-2">Still need help?</h2>
                  <p className="text-slate-600 dark:text-support-text-sec mb-8">Our support team is available from 9 AM to 6 PM, Monday to Saturday.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <a className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-[#1a2b16] border border-slate-200 dark:border-support-border-dark hover:border-support-primary transition-colors" href="#">
                    <div className="bg-[#25D366] text-white p-2 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-support-text-sec font-medium uppercase tracking-wider">Chat on WhatsApp</p>
                      <p className="text-slate-900 dark:text-white font-bold">+91 98765 43210</p>
                    </div>
                  </a>
                  <a className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-[#1a2b16] border border-slate-200 dark:border-support-border-dark hover:border-support-primary transition-colors" href="#">
                    <div className="bg-blue-500 text-white p-2 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-support-text-sec font-medium uppercase tracking-wider">Email Us</p>
                      <p className="text-slate-900 dark:text-white font-bold">support@gyaansetu.org</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="flex-1 bg-white dark:bg-support-surface-dark rounded-xl p-8 border border-slate-200 dark:border-support-border-dark">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6">Send us a message</h3>
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-700 dark:text-white text-sm font-medium ml-1">Your Name</label>
                    <input className="w-full rounded-lg bg-slate-50 dark:bg-[#1a2b16] border border-slate-300 dark:border-support-border-dark text-slate-900 dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-support-primary focus:border-transparent transition-all" placeholder="Enter your full name" type="text"/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-700 dark:text-white text-sm font-medium ml-1">Phone Number</label>
                    <input className="w-full rounded-lg bg-slate-50 dark:bg-[#1a2b16] border border-slate-300 dark:border-support-border-dark text-slate-900 dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-support-primary focus:border-transparent transition-all" placeholder="Enter your phone number" type="tel"/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-700 dark:text-white text-sm font-medium ml-1">Issue Description</label>
                    <textarea className="w-full rounded-lg bg-slate-50 dark:bg-[#1a2b16] border border-slate-300 dark:border-support-border-dark text-slate-900 dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-support-primary focus:border-transparent transition-all resize-none" placeholder="Describe the problem you are facing..." rows={4}></textarea>
                  </div>
                  <button className="mt-2 w-full rounded-lg bg-support-primary hover:bg-[#3ecf15] text-[#152112] font-bold py-3 px-4 transition-all active:scale-95 shadow-lg shadow-support-primary/20" type="button">
                    Send Message
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-support-surface-dark border-t border-slate-200 dark:border-support-border-dark py-10 px-10">
          <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2 md:items-start items-center">
              <div className="flex items-center gap-2 dark:text-white text-slate-900">
                <span className="material-symbols-outlined text-support-primary">school</span>
                <span className="font-bold text-lg">GyaanSetu</span>
              </div>
              <p className="text-slate-500 dark:text-support-text-sec text-sm">Empowering rural education through technology.</p>
            </div>
            <div className="flex gap-6">
              <a className="text-slate-500 dark:text-support-text-sec hover:text-support-primary text-sm transition-colors" href="#">Privacy Policy</a>
              <a className="text-slate-500 dark:text-support-text-sec hover:text-support-primary text-sm transition-colors" href="#">Terms of Service</a>
              <a className="text-slate-500 dark:text-support-text-sec hover:text-support-primary text-sm transition-colors" href="#">About Us</a>
            </div>
            <p className="text-slate-400 dark:text-[#5c7a4f] text-xs">© 2024 GyaanSetu Foundation.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};
