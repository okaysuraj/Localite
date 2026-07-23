import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EngagementStatsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] min-h-screen flex flex-col font-body-md">
      {/* TopNavBar */}
      <nav className="w-full top-0 sticky z-50 bg-[#fbf9f8] shadow-sm h-20 flex justify-between items-center px-6 py-2 max-w-full mx-auto">
        <div className="flex items-center gap-6">
          <span 
            className="font-headline-md text-3xl font-bold text-primary tracking-tight cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            Localite
          </span>
          <div className="hidden md:flex ml-12 gap-6">
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] hover:text-[#775a19] uppercase tracking-widest transition-colors cursor-pointer">Explore</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] hover:text-[#775a19] uppercase tracking-widest transition-colors cursor-pointer">Community</a>
            <a className="font-label-caps text-[12px] font-bold text-primary border-b-2 border-[#775a19] uppercase tracking-widest cursor-pointer">Insights</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#775a19] rounded-full"></span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#eae8e7] border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeOXdxtGN84_BUVS2V97FXEbVeZVpaCjViBVm6VThqz0YZO2eNKy2GG3qPkgGOiqOCjROk1wFM6uiujVB8cgZfyDaY9XpOcMsrI45w8QID8olDlbNJnXcBWss4MRj_5RyqHWGVlMiYGRqVdNQ-8VPAAp26vTG9FyJjKEv_4aHq8UYKKhuZl30RoaIcwyfXyNLzvHkWMH9peWGw-I4hV195ovPPJlRMPgBM1VWB1JBR-hSMdTIJAwBeNw" alt="Profile" />
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* SideNavBar */}
        <aside className="hidden md:flex h-[calc(100vh-80px)] w-64 sticky top-20 flex-col p-6 bg-[#f5f3f3] border-r border-[#c5c6cd]">
          <div className="mb-12">
            <p className="font-label-caps text-[12px] font-bold text-[#44474d] opacity-60 uppercase tracking-widest">Management</p>
            <h3 className="font-headline-sm text-2xl font-bold text-primary">Elite Tier</h3>
          </div>
          
          <nav className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-2 p-3 font-body-md text-[#44474d] hover:bg-[#eae8e7] rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-2 p-3 font-body-md text-[#44474d] hover:bg-[#eae8e7] rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined">event</span>
              <span>Events</span>
            </div>
            <div className="flex items-center gap-2 p-3 font-body-md text-[#44474d] hover:bg-[#eae8e7] rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined">location_city</span>
              <span>Venues</span>
            </div>
            <div className="flex items-center gap-2 p-3 font-body-md text-[#44474d] hover:bg-[#eae8e7] rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined">group</span>
              <span>Members</span>
            </div>
            <div className="flex items-center gap-2 p-3 font-body-md bg-[#0d1c32] text-[#76849f] rounded-xl transition-all shadow-sm cursor-pointer">
              <span className="material-symbols-outlined text-white">analytics</span>
              <span className="text-white">Analytics</span>
            </div>
          </nav>
          
          <button className="mt-6 bg-primary text-white py-3 px-4 rounded-xl font-label-caps text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
            Create Event
          </button>
          
          <div className="mt-auto pt-6 border-t border-[#c5c6cd] flex flex-col gap-2">
            <div className="flex items-center gap-2 p-2 font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-2 p-2 font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[18px]">help</span>
              <span>Support</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-12 max-w-7xl mx-auto w-full">
          <header className="mb-12">
            <h1 className="font-headline-md text-5xl font-bold text-primary mb-2">Member Engagement</h1>
            <p className="font-body-lg text-lg text-[#44474d] max-w-2xl">A curated overview of your contribution and influence within the Localite community over the last quarter.</p>
          </header>

          {/* Bento Grid Stats */}
          <div className="grid grid-cols-12 gap-6 mb-12">
            
            {/* Main Activity Chart */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-6 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#efeded]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-headline-sm text-2xl font-bold text-primary">Activity Momentum</h2>
                  <p className="font-label-caps text-[12px] font-bold text-[#44474d] opacity-70 uppercase tracking-widest">Events Attended vs Hosted</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">HOSTED</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#775a19]"></span>
                    <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">ATTENDED</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 relative flex items-end justify-between gap-4 p-4 rounded-lg" style={{ background: 'linear-gradient(180deg, rgba(13, 28, 50, 0.05) 0%, rgba(13, 28, 50, 0) 100%)' }}>
                {/* Simplified Visualization Bars */}
                <div className="flex-1 flex flex-col justify-end gap-1 group">
                  <div className="w-full bg-[#775a19] opacity-40 h-[40%] rounded-t-sm transition-all group-hover:opacity-60"></div>
                  <div className="w-full bg-primary h-[20%] rounded-t-sm transition-all group-hover:scale-y-105"></div>
                  <span className="text-center font-label-caps text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest">JAN</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 group">
                  <div className="w-full bg-[#775a19] opacity-40 h-[65%] rounded-t-sm transition-all group-hover:opacity-60"></div>
                  <div className="w-full bg-primary h-[35%] rounded-t-sm transition-all group-hover:scale-y-105"></div>
                  <span className="text-center font-label-caps text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest">FEB</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 group">
                  <div className="w-full bg-[#775a19] opacity-40 h-[50%] rounded-t-sm transition-all group-hover:opacity-60"></div>
                  <div className="w-full bg-primary h-[45%] rounded-t-sm transition-all group-hover:scale-y-105"></div>
                  <span className="text-center font-label-caps text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest">MAR</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 group">
                  <div className="w-full bg-[#775a19] opacity-40 h-[80%] rounded-t-sm transition-all group-hover:opacity-60"></div>
                  <div className="w-full bg-primary h-[25%] rounded-t-sm transition-all group-hover:scale-y-105"></div>
                  <span className="text-center font-label-caps text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest">APR</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 group">
                  <div className="w-full bg-[#775a19] opacity-40 h-[90%] rounded-t-sm transition-all group-hover:opacity-60"></div>
                  <div className="w-full bg-primary h-[60%] rounded-t-sm transition-all group-hover:scale-y-105"></div>
                  <span className="text-center font-label-caps text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest">MAY</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 group">
                  <div className="w-full bg-[#775a19] opacity-40 h-[70%] rounded-t-sm transition-all group-hover:opacity-60"></div>
                  <div className="w-full bg-primary h-[55%] rounded-t-sm transition-all group-hover:scale-y-105"></div>
                  <span className="text-center font-label-caps text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest">JUN</span>
                </div>
              </div>
            </div>
            
            {/* Top Performing Hubs */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="flex-1 bg-white rounded-xl p-6 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#efeded]">
                <h2 className="font-headline-sm text-2xl font-bold text-primary mb-6">Top Performing Hubs</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW0b9cAlNCXvJvMGMFl87pN4zf3y21-oZtQDowsYN65ccB7LhvR0vAyPFG4UNZrnWv62C-duKvCkgfSiu4yFn4Gp8wOwA7o4sffgtpt_XJ3C6JWAb8Ozay-zXL9ytYXYuqLR_M0Nx6WjBOlsTL6-YeudErJ4zRLbTZxnLqOCNXqXiaalSDspu_j8zEdwuWVg4LgbYtc5OE34b3ctMbzWjxcGcadJI4QpekokTPa9EGhVNbjtzWtTK0fA" alt="The Gentry Club" />
                      </div>
                      <div>
                        <p className="font-body-md text-primary font-bold">The Gentry Club</p>
                        <p className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">92% Engagement</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#775a19] group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </div>
                  
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvSDrRjXDqGJ074n9IMl9stLZi_Da_dssqZzYtKf50MQXXx3A8NGe9fjk6N0IVJiLlYWHy1a4NhBQmQFSmICQz5tfpNK8axwDXuf9Uy5N7XL_qL5J8rKxSF9FueuObEhABYB7iRYPQQTigb8fe41LWLI3vdp17FzjDxBfZA7vENeaFw4Chxf8aP_isxmlcw_Lb3SS73hkbj_aUlm-nerccOuI_sMwjQM3bqkg727hEbj09B5qUXpf6rw" alt="Atelier North" />
                      </div>
                      <div>
                        <p className="font-body-md text-primary font-bold">Atelier North</p>
                        <p className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">84% Engagement</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#775a19] group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 text-[#775a19] border border-[#775a19]/20 py-2 rounded-lg font-label-caps text-[11px] font-bold uppercase tracking-widest hover:bg-[#775a19]/5 transition-colors">
                  VIEW ALL HUBS
                </button>
              </div>
            </div>

            {/* New Connections Section */}
            <div className="col-span-12 bg-white rounded-xl p-6 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#efeded] overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-sm text-2xl font-bold text-primary">New Connections</h2>
                <a className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-widest underline cursor-pointer">View Network</a>
              </div>
              
              <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {/* Connection Card 1 */}
                <div className="min-w-[280px] bg-[#fbf9f8] border border-[#c5c6cd] p-4 rounded-xl flex items-center gap-4 hover:border-[#775a19] transition-colors cursor-pointer">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHYRP9ufmxKJzLM8RoUrHfj6FY3CTcnvrwY5M1YSw0QPaxecLXo-JUeKDX4P1qwEzHx4LYEWyYDEJQWaKhJhVKeNeaYA6iCMgyjcr8lUDPLRPLD1EOYmfgvnSQ1M2OzriQa7nLgoBx-tIS5Xdr7thEEhCfT3nfZHETymkIRRwOA66KkE5O6lDUOdMC4XWHP01Plyopf_ImtXnbQ_cKXFLnlw0TRXzFaxfo_nf1wLtTOixyKcDyZIm_-g" alt="Julian" />
                  </div>
                  <div>
                    <p className="font-body-md font-bold text-primary">Julian Vane</p>
                    <p className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Architechture & Design</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
                      <span className="font-label-caps text-[9px] font-bold text-[#775a19] uppercase tracking-widest">MET AT THE GENTRY</span>
                    </div>
                  </div>
                </div>
                
                {/* Connection Card 2 */}
                <div className="min-w-[280px] bg-[#fbf9f8] border border-[#c5c6cd] p-4 rounded-xl flex items-center gap-4 hover:border-[#775a19] transition-colors cursor-pointer">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4oDfCODL38x2RV4lr3GOLQJzGS-gZ83TlZ5RYJC3AsA-PD8qj7jnVjgTmPhGgOXrLKthJ8XmUIguqQi2aVBtDQ1t62v7GywkQOi3zsNo-2grCwOcGLiGfP1B27ssYeQp1W1OKt8e92-LhNCIMhS3IART_2vmwmSlDBiuBXRgyFjZ3lRffJOQToPrD3aSz4n5TSqhyz5bLmp_B0e7uR1-dD92XYANE0LWPSEs9dmHzutPacroGU6JPzA" alt="Elena" />
                  </div>
                  <div>
                    <p className="font-body-md font-bold text-primary">Elena Rossi</p>
                    <p className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Art Curation</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
                      <span className="font-label-caps text-[9px] font-bold text-[#775a19] uppercase tracking-widest">MET AT ATELIER</span>
                    </div>
                  </div>
                </div>

                {/* Connection Card 3 */}
                <div className="min-w-[280px] bg-[#fbf9f8] border border-[#c5c6cd] p-4 rounded-xl flex items-center gap-4 hover:border-[#775a19] transition-colors cursor-pointer">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfwp3V28rT83XrdSxt_4UwTXdG15nFeSiO0pWTbTIh5Zr64ie-IIgtAL3d6rD6uqpBmU7ANVc8w5cVp3Mby58uIMDTssVbX54ugM0bZn2f9c1GZX5CE4OEtC4sw8oVEQVIHr_2SNl-3FjVY1agXlczopV_3rfF8jagoEexIlnxtijcRnOAVJfPZQPQqL8u_4JBwCNPLvfYDXUCBBJk0suUZ-d5OMSKfbrHpyTlRJSnjZemNz7iFcPYDg" alt="Marcus" />
                  </div>
                  <div>
                    <p className="font-body-md font-bold text-primary">Marcus Thorne</p>
                    <p className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Venture Capital</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
                      <span className="font-label-caps text-[9px] font-bold text-[#775a19] uppercase tracking-widest">NEW MUTUAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#f5f3f3] p-6 rounded-xl border border-[#c5c6cd]/30">
              <span className="material-symbols-outlined text-[#775a19] mb-2">star</span>
              <h3 className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">MEMBER RATING</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-headline-md text-5xl font-bold text-primary">4.9</span>
                <span className="font-body-md text-[#44474d]">/ 5.0</span>
              </div>
              <p className="font-body-md text-[#44474d] mt-2">Top 5% of all hosts this month.</p>
            </div>
            
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#f5f3f3] p-6 rounded-xl border border-[#c5c6cd]/30">
              <span className="material-symbols-outlined text-[#775a19] mb-2">share</span>
              <h3 className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">INFLUENCE RADIUS</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-headline-md text-5xl font-bold text-primary">12k</span>
                <span className="material-symbols-outlined text-[#16a34a] text-[24px]">trending_up</span>
              </div>
              <p className="font-body-md text-[#44474d] mt-2">People reached through your events.</p>
            </div>
            
            <div className="col-span-12 lg:col-span-4 bg-primary text-white p-6 rounded-xl border border-primary relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-label-caps text-[12px] font-bold text-[#b9c7e4] uppercase tracking-widest">NEXT MILESTONE</h3>
                <p className="font-headline-sm text-2xl font-bold mt-4">Ambassador Status</p>
                <div className="w-full bg-white/10 h-1 mt-6 rounded-full overflow-hidden">
                  <div className="bg-[#ffdea5] h-full w-[75%]"></div>
                </div>
                <p className="font-body-md text-[13px] text-white/60 mt-4">Only 4 more hosted events to reach the next tier of rewards and exclusive hub access.</p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#775a19]/10 rounded-full blur-3xl"></div>
            </div>

          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full mt-12 bg-[#efeded] border-t border-[#c5c6cd] flex flex-col md:flex-row justify-between items-center px-6 py-12 gap-6">
        <div>
          <h2 className="font-headline-md text-3xl font-bold text-primary">Localite</h2>
          <p className="font-body-md text-[#44474d] mt-2">© 2024 Localite. Modern Nobility.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] underline-offset-4 transition-all cursor-pointer">Privacy Policy</a>
          <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] underline-offset-4 transition-all cursor-pointer">Terms of Service</a>
          <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] underline-offset-4 transition-all cursor-pointer">Press Kit</a>
          <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] underline-offset-4 transition-all cursor-pointer">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
