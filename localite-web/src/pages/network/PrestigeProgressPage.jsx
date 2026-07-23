import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrestigeProgressPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(75);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f8] h-20 shadow-[0_16px_32px_rgba(10,25,47,0.05)] px-8 py-2 flex justify-between items-center w-full">
        <div className="flex items-center gap-6">
          <span className="font-headline-md text-3xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>Regal Connection</span>
          <div className="hidden md:flex gap-4 ml-12">
            <a className="text-primary font-bold border-b-2 border-[#e9c176] hover:text-[#775a19] transition-colors text-[12px] font-label-caps uppercase tracking-widest cursor-pointer">Dashboard</a>
            <a className="text-[#44474d] hover:text-[#775a19] transition-colors text-[12px] font-label-caps uppercase tracking-widest cursor-pointer" onClick={() => navigate('/events')}>Events</a>
            <a className="text-[#44474d] hover:text-[#775a19] transition-colors text-[12px] font-label-caps uppercase tracking-widest cursor-pointer" onClick={() => navigate('/dashboard/insights')}>Stats</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:text-[#775a19] transition-colors active:opacity-80">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 hover:text-[#775a19] transition-colors active:opacity-80" onClick={() => navigate('/settings/notifications')}>
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq1U5o9Z9f-W_1ZFaM2TROjZZyF9BdzFhj-rIQgZWYVuUlWw1Arx4rM4yQaYhka2IL4O9Oj-DpXptEA0sivyB6yOW68De5fKAnlEMWmex9idPVJO_9Vx5Je_tHf7KjtCdxjJEjdr992NKuNgiY0Nf8NVUbebJLmFc92FVzx3ZxtIry9n96JpIU7SIQsYKA6PQDG2YRXSVM7Oad2zGOhzuOzJLrfoJFGQI_27gAeYTZ5KK9_DI4NKmxlA" alt="Profile" />
          </div>
        </div>
      </header>

      {/* Side Nav */}
      <nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-[#f5f3f3] flex-col p-4 pt-28 z-40 border-r border-[#eae8e7]">
        <div className="mb-6 px-2">
          <h2 className="font-headline-sm text-2xl font-bold text-primary">The Registry</h2>
          <p className="text-[12px] font-label-caps text-[#44474d] opacity-70 uppercase tracking-widest">Elite Membership</p>
        </div>
        <div className="flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-[#eae8e7] rounded-lg transition-all active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[12px] font-label-caps uppercase tracking-widest">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all active:scale-95 cursor-pointer" onClick={() => navigate('/events')}>
            <span className="material-symbols-outlined">event</span>
            <span className="text-[12px] font-label-caps uppercase tracking-widest">Events</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all active:scale-95 cursor-pointer" onClick={() => navigate('/dashboard/insights')}>
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="text-[12px] font-label-caps uppercase tracking-widest">Sports Stats</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="text-[12px] font-label-caps uppercase tracking-widest">Rankings</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined">military_tech</span>
            <span className="text-[12px] font-label-caps uppercase tracking-widest">Achievements</span>
          </a>
        </div>
        <button className="mt-6 bg-primary text-white py-3 rounded-lg text-[12px] font-label-caps uppercase tracking-widest hover:opacity-90 transition-opacity">
          Host New Event
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-64 pt-28 pb-12 px-8 max-w-6xl mx-auto">
        
        {/* Hero: Prestige Analytics Hub */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-stretch">
            
            {/* Large Analytics Card */}
            <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] flex-1 p-8 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#efeded" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#000" strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display-lg text-5xl font-bold leading-none">{progress}</span>
                    <span className="text-[12px] font-label-caps uppercase tracking-widest text-[#44474d] mt-1">Percentile</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="font-headline-md text-4xl font-bold mb-2">Prestige Analytics</h1>
                  <p className="text-body-md text-[#44474d] max-w-md mb-8">Your ascent to the Platinum Tier is 84% complete. Maintaining your current engagement level will secure your position by next month's gala.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[10px] font-label-caps uppercase tracking-widest text-[#44474d]">Global Rank</p>
                      <p className="font-headline-sm text-2xl font-bold mt-1">#124</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label-caps uppercase tracking-widest text-[#44474d]">Loyalty Score</p>
                      <p className="font-headline-sm text-2xl font-bold mt-1">9.8</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label-caps uppercase tracking-widest text-[#44474d]">Network</p>
                      <p className="font-headline-sm text-2xl font-bold mt-1">2.4k</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label-caps uppercase tracking-widest text-[#44474d]">Impact</p>
                      <p className="font-headline-sm text-2xl font-bold mt-1">High</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#fed488] opacity-10 blur-3xl rounded-full"></div>
            </div>

            {/* Sidebar: Gold Tier Privileges */}
            <div className="w-full lg:w-80 bg-primary text-white p-8 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] flex flex-col relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <span className="material-symbols-outlined text-[#ffdea5]" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
                <h3 className="text-[12px] font-label-caps uppercase tracking-widest">Gold Tier Privileges</h3>
              </div>
              <ul className="flex flex-col gap-4 mb-8 flex-1 relative z-10">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#e9c176] text-sm mt-1">check_circle</span>
                  <span className="text-body-md opacity-90 leading-snug">Priority access to The Equinox Ball 2024.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#e9c176] text-sm mt-1">check_circle</span>
                  <span className="text-body-md opacity-90 leading-snug">Complimentary valet at all affiliate clubhouses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#e9c176] text-sm mt-1">check_circle</span>
                  <span className="text-body-md opacity-90 leading-snug">Quarterly "Mastermind" networking lunch.</span>
                </li>
              </ul>
              <button className="w-full border border-[#ffdea5] text-[#ffdea5] py-3 rounded-lg text-[12px] font-label-caps uppercase tracking-widest hover:bg-[#ffdea5] hover:text-primary transition-all relative z-10">
                VIEW ALL REWARDS
              </button>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffdea5] opacity-5 blur-2xl rounded-full"></div>
            </div>

          </div>
        </section>

        {/* Bento Grid: XP Breakdown & Editorial Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* XP Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] p-8">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-headline-sm text-2xl font-bold">XP Breakdown</h2>
              <span className="text-[10px] font-label-caps uppercase tracking-widest text-[#44474d]">Updated Hourly</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#f5f3f3] p-4 rounded-lg border-l-4 border-primary">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary">fitness_center</span>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-primary">Sportsmanship</span>
                </div>
                <p className="font-headline-sm text-2xl font-bold mb-2">2,450 <span className="text-base font-normal text-[#44474d]">/ 3k</span></p>
                <div className="w-full bg-[#c5c6cd] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[81%]"></div>
                </div>
                <p className="text-sm text-[#44474d] mt-2 italic">"The Virtuous Athlete" status active.</p>
              </div>

              <div className="bg-[#f5f3f3] p-4 rounded-lg border-l-4 border-[#775a19]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#775a19]">celebration</span>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-[#775a19]">Hosting</span>
                </div>
                <p className="font-headline-sm text-2xl font-bold mb-2">1,820 <span className="text-base font-normal text-[#44474d]">/ 2k</span></p>
                <div className="w-full bg-[#c5c6cd] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#775a19] h-full w-[91%]"></div>
                </div>
                <p className="text-sm text-[#44474d] mt-2 italic">Next milestone: Royal Steward.</p>
              </div>

              <div className="bg-[#f5f3f3] p-4 rounded-lg border-l-4 border-[#84847b]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#84847b]">groups</span>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-[#84847b]">Participation</span>
                </div>
                <p className="font-headline-sm text-2xl font-bold mb-2">4,100 <span className="text-base font-normal text-[#44474d]">/ 5k</span></p>
                <div className="w-full bg-[#c5c6cd] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#84847b] h-full w-[82%]"></div>
                </div>
                <p className="text-sm text-[#44474d] mt-2 italic">Attendance streak: 12 weeks.</p>
              </div>
            </div>

            {/* Performance Graph Placeholder */}
            <div className="mt-8 h-48 w-full bg-[#fbf9f8] flex items-end justify-between px-6 pb-2 relative overflow-hidden group rounded-lg border border-[#eae8e7]">
              <div className="absolute top-4 left-4 text-[10px] font-label-caps uppercase tracking-widest text-[#44474d] opacity-50">Monthly Velocity</div>
              <div className="w-12 bg-[#0d1c32] h-[25%] rounded-t-sm group-hover:h-[33%] transition-all duration-500 opacity-90"></div>
              <div className="w-12 bg-[#0d1c32] h-[50%] rounded-t-sm group-hover:h-[75%] transition-all duration-500 delay-75 opacity-90"></div>
              <div className="w-12 bg-[#0d1c32] h-[33%] rounded-t-sm group-hover:h-[50%] transition-all duration-500 delay-100 opacity-90"></div>
              <div className="w-12 bg-[#0d1c32] h-[75%] rounded-t-sm group-hover:h-[100%] transition-all duration-500 delay-150 opacity-90"></div>
              <div className="w-12 bg-[#0d1c32] h-[66%] rounded-t-sm group-hover:h-[83%] transition-all duration-500 delay-200 opacity-90"></div>
              <div className="w-12 bg-[#0d1c32] h-[83%] rounded-t-sm group-hover:h-[100%] transition-all duration-500 delay-250 opacity-90"></div>
            </div>
          </div>

          {/* Recent Accolades Feed */}
          <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] p-8 flex flex-col h-full overflow-hidden">
            <h2 className="font-headline-sm text-2xl font-bold mb-6">Recent Accolades</h2>
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-6 custom-scrollbar">
              
              <article className="flex gap-4 group cursor-pointer">
                <div className="w-16 h-16 shrink-0 bg-[#fed488]/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#785a1a] text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
                </div>
                <div>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-[#775a19] font-bold">ACHIEVED 2 DAYS AGO</span>
                  <h4 className="font-headline-sm text-lg font-bold leading-tight mb-1">The Concierge’s Choice</h4>
                  <p className="text-sm text-[#44474d]">Awarded for 10 consecutive event hostings with 4.9+ star ratings.</p>
                </div>
              </article>

              <article className="flex gap-4 group cursor-pointer">
                <div className="w-16 h-16 shrink-0 bg-[#d6e3ff]/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#0d1c32] text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>military_tech</span>
                </div>
                <div>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-primary font-bold">ACHIEVED 1 WEEK AGO</span>
                  <h4 className="font-headline-sm text-lg font-bold leading-tight mb-1">Iron Endurance</h4>
                  <p className="text-sm text-[#44474d]">Maintained top-tier athletic stats in the Squash Regional Open.</p>
                </div>
              </article>

              <article className="flex gap-4 group cursor-pointer">
                <div className="w-16 h-16 shrink-0 bg-[#e4e2e2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#75777e] text-3xl">verified</span>
                </div>
                <div>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-[#44474d] font-bold">ACHIEVED OCT 12</span>
                  <h4 className="font-headline-sm text-lg font-bold leading-tight mb-1">Charter Vanguard</h4>
                  <p className="text-sm text-[#44474d]">Recognized for contribution to the 2024 Member Charter revision.</p>
                </div>
              </article>
              
              <button className="text-[10px] font-label-caps uppercase tracking-widest text-primary border-t border-[#c5c6cd] pt-4 hover:underline transition-all mt-auto self-start">
                VIEW COMPLETE TROPHY ROOM
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
