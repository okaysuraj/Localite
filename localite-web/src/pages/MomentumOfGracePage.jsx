import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MomentumOfGracePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col p-4 gap-6 bg-[#f5f3f3] shadow-[4px_0_24px_rgba(10,25,47,0.03)] z-50">
        <div className="flex items-center gap-3 px-2 mb-4 mt-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>military_tech</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-2xl font-bold text-primary">The Registry</h1>
            <p className="text-[12px] font-label-caps text-[#44474d]">Elite Membership</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[12px] font-label-caps">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg cursor-pointer" onClick={() => navigate('/events')}>
            <span className="material-symbols-outlined">event</span>
            <span className="text-[12px] font-label-caps">Events</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg cursor-pointer" onClick={() => navigate('/dashboard/insights')}>
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="text-[12px] font-label-caps">Sports Stats</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="text-[12px] font-label-caps">Rankings</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-[#e4e2e2] rounded-lg scale-95 duration-150 cursor-pointer">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>military_tech</span>
            <span className="text-[12px] font-label-caps">Achievements</span>
          </a>
        </nav>
        <div className="mt-auto flex flex-col gap-1 mb-8">
          <button className="w-full bg-primary text-white py-4 text-[12px] font-label-caps rounded-lg mb-4 hover:opacity-90 transition-opacity">
            Host New Event
          </button>
          <a className="flex items-center gap-3 px-4 py-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">help</span>
            <span className="text-[12px] font-label-caps">Support</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-[12px] font-label-caps">Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 pb-32 max-w-7xl mx-auto">
        {/* Top Bar */}
        <header className="flex justify-between items-center h-20 mb-12">
          <div>
            <h2 className="font-headline-md text-3xl font-bold text-primary">Momentum of Grace</h2>
            <p className="text-body-md text-[#44474d]">Your journey of consistent refinement.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a19]" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
              <span className="font-headline-sm text-2xl font-bold text-[#775a19]">42 Day Streak</span>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-[#44474d] cursor-pointer hover:text-primary">notifications</span>
              <span className="material-symbols-outlined text-[#44474d] cursor-pointer hover:text-primary" onClick={() => navigate('/settings/notifications')}>settings</span>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTkMwKXVdq69Km6kRpoAG3yvg3ADPefqnI7k6DxqQfKc_53d6O_pDNIBY1yqFqlFoDTIGl_rTD5IkSNnQXHfnNi03Gjwz89_MWcvrpwPLou0OSb227OZYSh0s-OkwsvLbrvJ7d-K9qMp0Ap7ZjnUv8RMLGojszNsMjQmKcshpO2HBMcC8or7aBT5FZVi8MKzu4ULyEZx5r37fdQrKTLWwz2GajsMITJRCIkGcx4aRjEqFUKl0txBKaJw" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Streak Calendar */}
          <section className="col-span-12 lg:col-span-8 bg-white rounded-xl p-8 shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#efeded]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-sm text-2xl font-bold text-primary">Gracious Consistency</h3>
              <div className="flex items-center gap-4 text-[12px] font-label-caps">
                <button className="material-symbols-outlined text-[#44474d]">chevron_left</button>
                <span className="tracking-widest">NOVEMBER 2024</span>
                <button className="material-symbols-outlined text-[#44474d]">chevron_right</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              <div className="text-[12px] font-label-caps text-[#44474d] opacity-50">SUN</div>
              <div className="text-[12px] font-label-caps text-[#44474d] opacity-50">MON</div>
              <div className="text-[12px] font-label-caps text-[#44474d] opacity-50">TUE</div>
              <div className="text-[12px] font-label-caps text-[#44474d] opacity-50">WED</div>
              <div className="text-[12px] font-label-caps text-[#44474d] opacity-50">THU</div>
              <div className="text-[12px] font-label-caps text-[#44474d] opacity-50">FRI</div>
              <div className="text-[12px] font-label-caps text-[#44474d] opacity-50">SAT</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              <div className="h-24 bg-[#f5f3f3] rounded-lg opacity-20"></div>
              <div className="h-24 bg-[#f5f3f3] rounded-lg opacity-20"></div>
              
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">01</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">02</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-gradient-to-br from-[#fed488] via-[#e9c176] to-[#fed488] text-primary rounded-lg flex flex-col justify-between p-3 shadow-lg border-2 border-[#fed488] hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps font-bold">03</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">04</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">05</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">06</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">07</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">08</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">09</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">10</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">11</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="h-24 bg-primary text-white rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps">12</span>
                <span className="material-symbols-outlined text-sm self-end" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              
              <div className="h-24 bg-white border-2 border-primary rounded-lg flex flex-col justify-between p-3 hover:-translate-y-1 transition-transform">
                <span className="text-[12px] font-label-caps text-primary font-bold">13</span>
                <span className="text-[10px] text-primary font-bold tracking-tighter">TODAY</span>
              </div>
              
              <div className="h-24 bg-[#f5f3f3] rounded-lg flex flex-col justify-between p-3 opacity-40">
                <span className="text-[12px] font-label-caps">14</span>
              </div>
              <div className="h-24 bg-[#f5f3f3] rounded-lg flex flex-col justify-between p-3 opacity-40">
                <span className="text-[12px] font-label-caps">15</span>
              </div>
              <div className="h-24 bg-[#f5f3f3] rounded-lg flex flex-col justify-between p-3 opacity-40">
                <span className="text-[12px] font-label-caps">16</span>
              </div>
              <div className="h-24 bg-[#f5f3f3] rounded-lg flex flex-col justify-between p-3 opacity-40">
                <span className="text-[12px] font-label-caps">17</span>
              </div>
              <div className="h-24 bg-[#f5f3f3] rounded-lg flex flex-col justify-between p-3 opacity-40">
                <span className="text-[12px] font-label-caps">18</span>
              </div>
              <div className="h-24 bg-[#f5f3f3] rounded-lg flex flex-col justify-between p-3 opacity-40">
                <span className="text-[12px] font-label-caps">19</span>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#efeded]">
              <h4 className="text-[12px] font-label-caps text-[#44474d] mb-4">RECOVERY STATUS</h4>
              <div className="flex items-center justify-between p-4 bg-[#f5f3f3] rounded-lg border border-[#c5c6cd]/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#775a19]" style={{fontVariationSettings: "'FILL' 1"}}>shield_with_heart</span>
                  <span className="text-base font-bold text-primary">Grace Period Saved</span>
                </div>
                <span className="text-[12px] font-label-caps bg-[#fed488] text-[#785a1a] px-2 py-1 rounded">2 LEFT</span>
              </div>
              <p className="text-[11px] text-[#44474d] mt-3 italic leading-relaxed">Missed a day? Your membership tier grants 2 automatic saves per cycle to maintain your streak.</p>
            </div>

            <div className="bg-primary text-white rounded-xl p-6 shadow-[0_16px_32px_rgba(10,25,47,0.05)] relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-[12px] font-label-caps text-[#ffdea5] mb-4">PRESTIGE BOOSTS</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-base">Community Multiplier</span>
                    <span className="text-[#e9c176] font-bold">1.5x</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-base">Event Priority</span>
                    <span className="text-[#e9c176] font-bold">Lvl 4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base">Refined Karma</span>
                    <span className="text-[#e9c176] font-bold">+240</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 opacity-20 transform rotate-12">
                <span className="material-symbols-outlined text-9xl">military_tech</span>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#efeded] group">
              <div className="h-48 relative overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxFyxBwGhJyfzbof-tlny1Slvz-YBdgPhJGs77jcqzPyWwdEPy1fB_wXLKI4uLwJ1S2hwRW9wqHnQkB0x1PVc3BDZL4OylY2VJ4YpJiiGgkGI1nPAU5QoNAgykgVn2x9YnfxPKZ7GTi2hsZsWAjfst7Hl4fM6_22RJ1oVi5fCGGKeYmOVy-d03p9_WtlXfRP_Mh7813msZ_GT_wvdIv6LNIj8EfxNTINPn2JppgV0yXahMMGTa1iO-lA" alt="Lounge" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-[12px] font-label-caps text-[#e9c176] tracking-widest bg-black/40 px-2 py-1 backdrop-blur-sm">UNLOCKED AT 50 DAYS</span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-headline-sm text-2xl font-bold text-primary mb-2">The Gilded Parlor</h4>
                <p className="text-base text-[#44474d] mb-4">Exclusive access to our private flagship lounge for members with a 50+ day momentum.</p>
                <button className="w-full border border-[#775a19] text-[#775a19] py-2 text-[12px] font-label-caps hover:bg-[#775a19] hover:text-white transition-all">
                  PREVIEW ACCESS
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Recent Milestones List */}
        <section className="mt-12">
          <h3 className="font-headline-sm text-2xl font-bold text-primary mb-6">Recent Refinements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-[#fed488] flex items-center justify-center text-[#785a1a]">
                <span className="material-symbols-outlined">wine_bar</span>
              </div>
              <div>
                <p className="text-[12px] font-label-caps text-[#44474d]">YESTERDAY</p>
                <p className="text-base font-bold text-primary">Sommelier Masterclass</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-[#fed488] flex items-center justify-center text-[#785a1a]">
                <span className="material-symbols-outlined">stadium</span>
              </div>
              <div>
                <p className="text-[12px] font-label-caps text-[#44474d]">2 DAYS AGO</p>
                <p className="text-base font-bold text-primary">Polo Grounds Invitational</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-[#fed488] flex items-center justify-center text-[#785a1a]">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <div>
                <p className="text-[12px] font-label-caps text-[#44474d]">3 DAYS AGO</p>
                <p className="text-base font-bold text-primary">Private Gallery Tour</p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
