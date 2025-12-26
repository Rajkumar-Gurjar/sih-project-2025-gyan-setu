import React from 'react';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="layout-content-container mx-auto flex w-full max-w-[1200px] flex-col gap-8 p-4 md:p-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-surface-dark dark:bg-[#2e4328] p-6 md:p-10 shadow-lg">
        {/* Decorative Background */}
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-6 items-center">
            <div 
              className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 rounded-full border-4 border-surface-dark dark:border-[#162013] shadow-xl bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxix6ZDCQ5fIFn0gWURYYEgvFjeeJcU1QKD6vxQvOSAnT3KIo1KsvU1WLKdzIyTq0jADcDlNVJUB4LuE6FYAnlpLHN1xt4GKr7bTHnfkuTVInzbd_VkTNdJysoH_WE8GzvSrTlcyCEnAJ8azvHye5FqQyGIaoBnMrlS8OfP76qUFNWCn1dFa7LTqBg2oahDQ01UNM1-7BkgD1u0tej2aHNygjlqsUJBHBY-xIdArShXIkFvwGnv8fJHNzsWEbgb3FEOYneA1NCJ20')" }}
            ></div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Sat Sri Akal, Aman!</h2>
              <p className="mt-2 text-base md:text-lg text-gray-300 dark:text-[#a2c398]">Class 8 - Roll No 12 • Ready to learn something new?</p>
            </div>
          </div>
          <div className="flex flex-shrink-0">
            <button className="bg-primary hover:bg-green-500 text-[#152012] font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/30 transition-all transform hover:scale-105 flex items-center gap-2">
              <span className="material-symbols-outlined">play_arrow</span>
              Resume Learning
            </button>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white dark:bg-[#1e2b1a] p-6 shadow-sm border border-gray-100 dark:border-none">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
          <p className="text-sm font-medium text-gray-500 dark:text-[#a2c398]">Lessons Completed</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white dark:bg-[#1e2b1a] p-6 shadow-sm border border-gray-100 dark:border-none">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">5 Days</p>
          <p className="text-sm font-medium text-gray-500 dark:text-[#a2c398]">Current Streak</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white dark:bg-[#1e2b1a] p-6 shadow-sm border border-gray-100 dark:border-none">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-green-700 dark:text-primary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">350</p>
          <p className="text-sm font-medium text-gray-500 dark:text-[#a2c398]">Gyaan Points</p>
        </div>
      </div>

      {/* Continue Learning */}
      <section>
        <div className="mb-4 flex items-center justify-between px-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Continue Learning</h3>
          <a className="text-sm font-bold text-primary hover:text-green-400" href="#">View All</a>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
          {/* Card 1 */}
          <div className="group relative flex w-72 flex-none flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#1e2b1a] shadow-sm transition-transform hover:-translate-y-1 border border-gray-100 dark:border-none">
            <div 
              className="h-40 w-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlGsusSN47IqzDkIZl7E8CDwNJov3L8CEaXr_YNR8V4s_mpzRKaOIz7-7zdneAKZLyKnpJKoTnWgXTaMfw6TJubbbrpvschiaJzPU-7TSxVXWRuMFKlG_htzbHK95YTSdfIP7I4AHUcIZtdtuE-B4H1cWPaAIck4xI2ZvFN40yys61nFFzdybkQtby2izqZE3wmfk4PvuVpYuoWbeG5qJNaW10qGgztz5dLOfImawUM0D0ZZsc2FcbJcLNa4CrkEvgS1bkc2q1khc')" }}
            >
              <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">Math</div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h4 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">Basic Arithmetic & Operations</h4>
              <p className="mb-4 text-xs text-gray-500 dark:text-[#a2c398]">Chapter 3 • 15 mins left</p>
              <div className="mt-auto">
                <div className="mb-2 flex justify-between text-xs font-bold text-gray-500 dark:text-[#a2c398]">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-full w-[60%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group relative flex w-72 flex-none flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#1e2b1a] shadow-sm transition-transform hover:-translate-y-1 border border-gray-100 dark:border-none">
            <div 
              className="h-40 w-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQOBIfVLeM6pW_6eSoRWkBUffCLHtKb498NIBYaeNeWTLZsyvO2vLfY68tnUfDwauNOktBJqUgZCIHgP3PmEYlZr7MOhfhOWgbEL5En9meuOhgEkPaT1O8X1WZv-BM4VqYYXPnewJVDXs0rmHNpHpI59AoiQhFHJs_qX-atiP94zoqvtjvd-7LhgnhLpD1PqLz7a59jqGd6X8TD9oc3tqCI8LL86yClG4X3AAQk0U_LfBA9vuqpjBCXp2Mn_iJ4QYqaP6yz2kwaLQ')" }}
            >
              <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">Science</div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h4 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">Introduction to Solar System</h4>
              <p className="mb-4 text-xs text-gray-500 dark:text-[#a2c398]">Chapter 1 • 20 mins left</p>
              <div className="mt-auto">
                <div className="mb-2 flex justify-between text-xs font-bold text-gray-500 dark:text-[#a2c398]">
                  <span>Progress</span>
                  <span>30%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-full w-[30%] rounded-full bg-blue-500"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group relative flex w-72 flex-none flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#1e2b1a] shadow-sm transition-transform hover:-translate-y-1 border border-gray-100 dark:border-none">
            <div 
              className="h-40 w-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIZrlXQbsur5_iTT1P_lRWt7FENqgaxHXV9TiNLYFHTUT7B92MpcdShUIYfVc-vqOj48HBc_XBbNd-8gmg-Tg2WnP1XnYbTl38tnVoCViit_DpjONxEjFsZX3HSlFsRHELPsh1-JFvcQj0ZAO2cviIsq-Y6jpKo4Wsb-itmceYGjWwg8Tet5_YQQKgGrUJ_s8BuNz1Z6WPEsMFE_yklm11mY4qaV384fXXO7jTF2VuT6B8RyEDACViZwFcAjWYeOpsy0_3a-m57AI')" }}
            >
              <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">English</div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h4 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">Verbs and Adjectives</h4>
              <p className="mb-4 text-xs text-gray-500 dark:text-[#a2c398]">Chapter 5 • 5 mins left</p>
              <div className="mt-auto">
                <div className="mb-2 flex justify-between text-xs font-bold text-gray-500 dark:text-[#a2c398]">
                  <span>Progress</span>
                  <span>85%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-full w-[85%] rounded-full bg-orange-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Progress by Subject */}
        <section className="rounded-3xl bg-white dark:bg-[#1e2b1a] p-6 shadow-sm border border-gray-100 dark:border-none">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Subject Progress</h3>
            <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined text-gray-500">more_horiz</span>
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {/* Math */}
            <div>
              <div className="mb-2 flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Mathematics</span>
                </div>
                <span className="text-sm font-bold text-gray-500 dark:text-[#a2c398]">45%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full w-[45%] rounded-full bg-primary"></div>
              </div>
            </div>
            {/* Science */}
            <div>
              <div className="mb-2 flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Science</span>
                </div>
                <span className="text-sm font-bold text-gray-500 dark:text-[#a2c398]">20%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full w-[20%] rounded-full bg-blue-500"></div>
              </div>
            </div>
            {/* English */}
            <div>
              <div className="mb-2 flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">English</span>
                </div>
                <span className="text-sm font-bold text-gray-500 dark:text-[#a2c398]">10%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full w-[10%] rounded-full bg-orange-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="rounded-3xl bg-white dark:bg-[#1e2b1a] p-6 shadow-sm border border-gray-100 dark:border-none">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Badges</h3>
            <a className="text-sm font-bold text-primary hover:text-green-400" href="#">View All</a>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* Unlocked Badge 1 */}
            <div className="flex flex-1 min-w-[120px] flex-col items-center gap-2 rounded-2xl bg-gray-50 dark:bg-[#152012] p-4 text-center border border-gray-100 dark:border-none">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Early Bird</p>
              <p className="text-xs text-gray-500 dark:text-[#a2c398]">Unlocked</p>
            </div>
            {/* Unlocked Badge 2 */}
            <div className="flex flex-1 min-w-[120px] flex-col items-center gap-2 rounded-2xl bg-gray-50 dark:bg-[#152012] p-4 text-center border border-gray-100 dark:border-none">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>calculate</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Math Whiz</p>
              <p className="text-xs text-gray-500 dark:text-[#a2c398]">Unlocked</p>
            </div>
            {/* Locked Badge */}
            <div className="flex flex-1 min-w-[120px] flex-col items-center gap-2 rounded-2xl bg-gray-50 dark:bg-[#152012] p-4 text-center border border-gray-100 dark:border-none opacity-60">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-400">
                <span className="material-symbols-outlined text-4xl">science</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-gray-600 dark:text-gray-300">lock</span>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Scientist</p>
              <p className="text-xs text-gray-500 dark:text-[#a2c398]">Locked</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
