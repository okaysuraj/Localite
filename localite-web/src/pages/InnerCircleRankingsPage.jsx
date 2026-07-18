import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InnerCircleRankingsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      {/* Top Nav Bar */}
      <header className="flex justify-between items-center w-full px-8 py-2 h-20 bg-[#fbf9f8] shadow-[0_16px_32px_rgba(10,25,47,0.05)] sticky top-0 z-40 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <h1 className="font-headline-md text-3xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>Inner Circle Rankings</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d]">search</span>
            <input className="pl-10 pr-4 py-2 bg-[#f5f3f3] border-none rounded-full text-base focus:ring-2 focus:ring-[#fed488] w-64 transition-all" placeholder="Search Members..." type="text" />
          </div>
          <button className="p-2 text-[#44474d] hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-[#44474d] hover:text-primary transition-colors" onClick={() => navigate('/settings/notifications')}>
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-[#eae8e7] overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGgw-2l6xrhn8kvS2f_ZVQQHUuu-ZOhtYb-gidZHuluy2WGvI2UQDIrhwFk_d2AGQHSiRJjogOIpQA0ivx1ncw0izpCBmBMLuBIU5vAdgrDFsGdC248fsoPe9juoW4s6YD7zFvqg1ppSRQyVbd6MOQUgeGwzNv7DzjYI-DyYL1ZpXZHpKe3M6la28fiOt-PcdnETJjBx8lXG3FCtfbKpHmsOB8V-CG7BTLPsSiZSgr_cxmsLr7kkzaHQ" alt="Profile" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] w-64 fixed left-0 top-20 bg-[#f5f3f3] shadow-[4px_0_24px_rgba(10,25,47,0.03)] p-4 gap-6 z-50 border-r border-[#eae8e7]">
          <div className="flex items-center gap-2 mb-6 px-2 mt-4">
            <div className="w-10 h-10 bg-[#0d1c32] rounded-lg flex items-center justify-center text-[#ffdea5]">
              <span className="material-symbols-outlined">military_tech</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-lg font-bold text-primary leading-tight">The Registry</h2>
              <p className="font-label-caps text-[10px] text-[#44474d] uppercase tracking-widest">Elite Membership</p>
            </div>
          </div>
          <nav className="flex-grow space-y-2">
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg group cursor-pointer">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg group cursor-pointer" onClick={() => navigate('/events')}>
              <span className="material-symbols-outlined">event</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Events</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg group cursor-pointer" onClick={() => navigate('/dashboard/insights')}>
              <span className="material-symbols-outlined">leaderboard</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Sports Stats</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-[#e4e2e2] rounded-lg cursor-pointer">
              <span className="material-symbols-outlined">emoji_events</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Rankings</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg group cursor-pointer" onClick={() => navigate('/hallofhonor')}>
              <span className="material-symbols-outlined">military_tech</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Achievements</span>
            </a>
          </nav>
          <div className="mt-auto pt-6 border-t border-[#c5c6cd] space-y-2 mb-4">
            <button className="w-full bg-primary text-white font-label-caps text-[12px] uppercase tracking-widest py-4 rounded-lg hover:opacity-90 transition-all mb-4">
              Host New Event
            </button>
            <a className="flex items-center gap-3 px-4 py-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Support</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[#ba1a1a]">logout</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Logout</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-0 lg:ml-64 p-8 max-w-7xl mx-auto">
          
          {/* Hall of Fame Hero Section */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="font-headline-sm text-2xl font-bold text-primary">Hall of Fame</h2>
              <p className="text-[#44474d] font-body-md">Honoring the most distinguished members of the current season.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-end pb-8">
              
              {/* Rank 2 */}
              <div className="relative group bg-[#0d1c32] rounded-xl p-6 overflow-hidden min-h-[400px] flex flex-col justify-end border border-[#fed488]/20 order-2 lg:order-1 transition-transform hover:-translate-y-2">
                <div className="absolute top-6 right-6">
                  <span className="text-[#e9c176] font-display-lg text-5xl font-bold opacity-30">02</span>
                </div>
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full border-4 border-[#c5c6cd] overflow-hidden mb-2 shadow-[0_16px_32px_rgba(10,25,47,0.05)]">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCCIKifWfRine5FxP9MAjJv4-UzR7iEGvYiuVsJ95W8uMFuzC7YeBdysdJ-mTDQp7AR5qHDc86D0PZpAe2pM7RjuY2A-AAk-p8JVVREowxxgCbPTO2K3yhDwVk49oj_wrxIgud3BGcI0LhTGOZA9SM7mKyuov0hxyUJ-m5XTZyqXuSa6Dhw7RPqtlZ7bpV5Tfxg-Alx7r28g11D9XA-syiKWMrBfLtpoMVMOWkds9_VINa3cm0YIfqNw" alt="Rank 2" />
                  </div>
                  <h3 className="font-headline-sm text-2xl font-bold text-white mb-1">Lady Victoria</h3>
                  <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#e9c176] mb-6">Grandmaster Strategist</p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
                    <div>
                      <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#39475f]">Wins</p>
                      <p className="font-headline-sm text-2xl font-bold text-white">142</p>
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#39475f]">Prestige</p>
                      <p className="font-headline-sm text-2xl font-bold text-white">9.4</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rank 1 - Center Piece */}
              <div className="relative group bg-[#0d1c32] rounded-xl p-6 overflow-hidden min-h-[480px] flex flex-col justify-end border-2 border-[#ffdea5] order-1 lg:order-2 shadow-2xl scale-105 z-10 transition-transform hover:-translate-y-2 hover:scale-105">
                <div className="absolute top-6 right-6">
                  <span className="text-[#ffdea5] font-display-lg text-5xl font-bold">01</span>
                </div>
                <div className="relative z-10">
                  <div className="w-32 h-32 rounded-full border-4 border-[#ffdea5] overflow-hidden mb-2 shadow-[0_16px_32px_rgba(255,222,165,0.2)]">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn4nxelaVjLAeAlyCpoEG_drnRrDLp7TjrTJtJ29KxGHQRvmIOMxJAsv6NoTqnksBuDdouvROoUCZ8RH1k50Kf4Z8uV-qay5FaEWaxELZwhF1eA67xTleiv0RrmiXWDKZDru1zs5VSR-PmYhNbAfmhAdkXjFg4VvO5zlB8UveSA1aMf0xJlR-NgwAfbQVFuYvX-iUc6pDWCJH5vcYNVfhzlWDXg_Y7LgdTLk8sfTjIDQM1xCYYVKSnKA" alt="Rank 1" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline-md text-3xl font-bold text-white">Sir Alexander</h3>
                    <span className="material-symbols-outlined text-[#ffdea5]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                  </div>
                  <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#ffdea5] mb-6">The Undefeated Paragon</p>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#ffdea5]/30">
                    <div>
                      <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#39475f]">Wins</p>
                      <p className="font-headline-sm text-2xl font-bold text-white">284</p>
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#39475f]">Prestige</p>
                      <p className="font-headline-sm text-2xl font-bold text-white">9.9</p>
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#39475f]">Global</p>
                      <p className="font-headline-sm text-2xl font-bold text-white">#1</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rank 3 */}
              <div className="relative group bg-[#0d1c32] rounded-xl p-6 overflow-hidden min-h-[400px] flex flex-col justify-end border border-[#fed488]/20 order-3 lg:order-3 transition-transform hover:-translate-y-2">
                <div className="absolute top-6 right-6">
                  <span className="text-[#e9c176] font-display-lg text-5xl font-bold opacity-30">03</span>
                </div>
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full border-4 border-[#c5c6cd] overflow-hidden mb-2 shadow-[0_16px_32px_rgba(10,25,47,0.05)]">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZULdRT8Q4g_5PpMOuSRnoTpiK96EjQFvwgrTM5Qzrv1cxcqtHjE-PzMDvVCG_j0RwwSNOlsUDbTIdGfroS_IuRD0YghuJvqGnrh8CMwLDkd2lSlNzKVj-TlRkIzul-5Ll8i_Mnr1UQt4DphSypuRDuN_Ei7vfQHX7vIj6dQkWP_ridjfle9vR9RxzxJ5u0mPfdloiJ1xfD72IO8m5o2sqVdIJZMAaYnCBztPSpcwJB2hXm5o5FDqFoA" alt="Rank 3" />
                  </div>
                  <h3 className="font-headline-sm text-2xl font-bold text-white mb-1">Julian Thorne</h3>
                  <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#e9c176] mb-6">Vanguard Champion</p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
                    <div>
                      <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#39475f]">Wins</p>
                      <p className="font-headline-sm text-2xl font-bold text-white">128</p>
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] uppercase tracking-widest text-[#39475f]">Prestige</p>
                      <p className="font-headline-sm text-2xl font-bold text-white">9.1</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* All Competitors Table */}
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] overflow-hidden border border-[#efeded]">
              <div className="px-6 py-6 border-b border-[#c5c6cd] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="font-headline-sm text-2xl font-bold text-primary">All Competitors</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#f5f3f3] text-[#44474d] font-label-caps text-[12px] uppercase tracking-widest rounded-lg hover:bg-[#eae8e7] transition-colors">
                    This Month
                  </button>
                  <button className="px-4 py-2 border border-[#fed488] text-[#775a19] font-label-caps text-[12px] uppercase tracking-widest rounded-lg hover:bg-[#fed488]/10 transition-colors">
                    Export Rankings
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f5f3f3]">
                    <tr>
                      <th className="px-6 py-4 text-left font-label-caps text-[12px] text-[#44474d] uppercase tracking-widest">Rank</th>
                      <th className="px-6 py-4 text-left font-label-caps text-[12px] text-[#44474d] uppercase tracking-widest">Player</th>
                      <th className="px-6 py-4 text-center font-label-caps text-[12px] text-[#44474d] uppercase tracking-widest">Total Wins</th>
                      <th className="px-6 py-4 text-center font-label-caps text-[12px] text-[#44474d] uppercase tracking-widest">Reputation Score</th>
                      <th className="px-6 py-4 text-center font-label-caps text-[12px] text-[#44474d] uppercase tracking-widest">Recent Trend</th>
                      <th className="px-6 py-4 text-right font-label-caps text-[12px] text-[#44474d] uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c5c6cd]">
                    
                    {/* Row 1 */}
                    <tr className="hover:bg-[#fbf9f8] transition-colors group cursor-pointer">
                      <td className="px-6 py-6 font-headline-sm text-2xl font-bold text-[#e9c176]">04</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-lg bg-[#eae8e7] overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPNvMtHAD0ZXRFifi-G3q1pclkxqXFJhkaf30q-JZzXJ_ft6cwQmN8RPhH9usV4hpucrZvEuyTH9MjFHICaKhe7SdImKpzWKT0I4tQ-NV_UHsyKFV75_PpEPz9Yqdcx0FbbtW-Fw3LtuLx1nj30i9R3ohVw6qlRpoBrCmT3TRMBxwmUCaSu1q8v-jswuy6T0NSYZkds16WABfTJqRX3qdZYT7nHREM3jVNmlBnw_O-nXWGRfQHhv8Prw" alt="Player 4" />
                          </div>
                          <div>
                            <p className="font-body-md font-bold text-primary">Eleanor Vance</p>
                            <p className="text-[11px] font-label-caps text-[#44474d] uppercase tracking-widest">Equestrian League</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center font-headline-sm text-2xl font-bold text-primary">94</td>
                      <td className="px-6 py-6 text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-[#fed488]/30 text-[#785a1a] rounded-full">
                          <span className="font-label-caps text-[12px] uppercase tracking-widest">8.8 prestige</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center items-center gap-1">
                          <div className="w-1 h-3 bg-[#e9c176] rounded-full"></div>
                          <div className="w-1 h-5 bg-[#e9c176] rounded-full"></div>
                          <div className="w-1 h-4 bg-[#e9c176] rounded-full"></div>
                          <div className="w-1 h-7 bg-[#e9c176] rounded-full"></div>
                          <div className="w-1 h-8 bg-[#e9c176] rounded-full"></div>
                          <span className="material-symbols-outlined text-green-500 text-sm ml-2">trending_up</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button className="text-[#44474d] hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-[#fbf9f8] transition-colors group cursor-pointer">
                      <td className="px-6 py-6 font-headline-sm text-2xl font-bold text-[#44474d]">05</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-lg bg-[#eae8e7] overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALTCca96ptf4hnxwPNDVcCKCDL2-1nhuxOwhSQwoyPqnDZdWJlx73RUjIyUBRyuXr8RK7PuBLSeU3vDB9D20Wbl-Iu4oS-nCdmQd5yWxwg6O1eG0-TO7kJKJbRB3K1ZpDkNqup88wCdn9agkNhdopsJu5QP89oQd8alACYOzGwkfG7fWE9T7yYs6V-ZsYL0lxkZT3El6L9W3FOdgiSA8guE4-O1TSu0D5jv2W6YjUoSIF_HoaCWHJBKA" alt="Player 5" />
                          </div>
                          <div>
                            <p className="font-body-md font-bold text-primary">Marcus Sterling</p>
                            <p className="text-[11px] font-label-caps text-[#44474d] uppercase tracking-widest">Tennis Pro Circle</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center font-headline-sm text-2xl font-bold text-primary">87</td>
                      <td className="px-6 py-6 text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-[#eae8e7] text-[#44474d] rounded-full">
                          <span className="font-label-caps text-[12px] uppercase tracking-widest">8.4 prestige</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center items-center gap-1">
                          <div className="w-1 h-6 bg-[#75777e] rounded-full"></div>
                          <div className="w-1 h-7 bg-[#75777e] rounded-full"></div>
                          <div className="w-1 h-5 bg-[#75777e] rounded-full"></div>
                          <div className="w-1 h-3 bg-[#75777e] rounded-full"></div>
                          <div className="w-1 h-4 bg-[#75777e] rounded-full"></div>
                          <span className="material-symbols-outlined text-red-400 text-sm ml-2">trending_down</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button className="text-[#44474d] hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-[#fbf9f8] transition-colors group cursor-pointer">
                      <td className="px-6 py-6 font-headline-sm text-2xl font-bold text-[#44474d]">06</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-lg bg-[#eae8e7] overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_y6HpbcfgFk_PfkoAYqazOlHTkSULif3DOxy4udK0TXIS-haMeQ7CwcTxHzqwLG0ajkX_5KSMyhmaLqeol6u5OFA5d8neyDTWvAEY8NHFHqY5tWySFeP3L1Mp6KQ2Ez_EtsGyaZDMZYAzFjkUEbQYssbTY7_geqkzFOa5sO8vYEq2cGUCcq5OGxQF6Hr1kKPC_pkS-M-Dq5tx4xKv1QsYvCT0P7qUb9DmHtSTUgritki3tAbADhxaXA" alt="Player 6" />
                          </div>
                          <div>
                            <p className="font-body-md font-bold text-primary">Helena Dubois</p>
                            <p className="text-[11px] font-label-caps text-[#44474d] uppercase tracking-widest">Chess Masters</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center font-headline-sm text-2xl font-bold text-primary">81</td>
                      <td className="px-6 py-6 text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-[#eae8e7] text-[#44474d] rounded-full">
                          <span className="font-label-caps text-[12px] uppercase tracking-widest">8.1 prestige</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex justify-center items-center gap-1">
                          <div className="w-1 h-2 bg-[#e9c176] rounded-full"></div>
                          <div className="w-1 h-3 bg-[#e9c176] rounded-full"></div>
                          <div className="w-1 h-5 bg-[#e9c176] rounded-full"></div>
                          <div className="w-1 h-6 bg-[#e9c176] rounded-full"></div>
                          <div className="w-1 h-6 bg-[#e9c176] rounded-full"></div>
                          <span className="material-symbols-outlined text-green-500 text-sm ml-2">trending_up</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button className="text-[#44474d] hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Pagination/Footer */}
              <div className="px-6 py-4 bg-[#f5f3f3] flex justify-between items-center">
                <p className="font-label-caps text-[12px] text-[#44474d] uppercase tracking-widest">Showing 1-10 of 248 Members</p>
                <div className="flex items-center gap-4">
                  <button className="p-2 text-[#44474d] hover:text-primary transition-colors disabled:opacity-30" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">1</span>
                    <span className="w-8 h-8 flex items-center justify-center hover:bg-[#eae8e7] rounded font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">2</span>
                    <span className="w-8 h-8 flex items-center justify-center hover:bg-[#eae8e7] rounded font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">3</span>
                  </div>
                  <button className="p-2 text-[#44474d] hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>

            </div>
          </section>

        </main>
      </div>
      
      {/* Page Footer */}
      <footer className="w-full py-6 flex flex-col items-center justify-center gap-2 bg-white border-t border-[#c5c6cd]">
        <p className="font-label-caps text-[12px] text-[#44474d] text-center uppercase tracking-widest">© 2024 Regal Connection. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="font-label-caps text-[12px] text-[#44474d] hover:text-primary transition-colors uppercase tracking-widest cursor-pointer">Privacy Policy</a>
          <a className="font-label-caps text-[12px] text-[#44474d] hover:text-primary transition-colors uppercase tracking-widest cursor-pointer">Terms of Service</a>
          <a className="font-label-caps text-[12px] text-[#44474d] hover:text-primary transition-colors uppercase tracking-widest cursor-pointer">Member Charter</a>
        </div>
      </footer>
    </div>
  );
}
