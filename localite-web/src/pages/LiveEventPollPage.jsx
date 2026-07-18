import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LiveEventPollPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [time, setTime] = useState(252); // 4:12

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timeString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md flex flex-col overflow-x-hidden">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-background border-b border-outline-variant shadow-sm">
        <div className="flex items-center gap-8">
          <span className="font-headline-md text-2xl font-bold text-primary tracking-tight">ELITE CIRCLE</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary font-label-caps px-6 py-2 rounded-lg hover:opacity-80 transition-all uppercase tracking-widest text-xs">Create Event</button>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
            <img src="https://via.placeholder.com/100" alt="Host" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden xl:flex flex-col h-[calc(100vh-73px)] w-64 bg-surface-container-low border-r border-outline-variant shadow-md z-40 p-4 gap-4 sticky top-[73px]">
          <div className="mb-4 px-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-secondary">stars</span>
              <h2 className="font-headline-sm text-xl text-secondary">Host Admin</h2>
            </div>
            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Managing Gala 2024</p>
          </div>
          <nav className="flex flex-col gap-1">
            <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Overview</span>
            </a>
            <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">group</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Guest List</span>
            </a>
            <a className="flex items-center gap-3 p-3 bg-primary text-on-primary rounded-lg font-bold shadow-md transition-transform" href="#">
              <span className="material-symbols-outlined">poll</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Live Polling</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 max-w-[1400px] mx-auto w-full">
          <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label-caps text-secondary uppercase tracking-[0.2em] mb-2 block text-xs">Live Interaction</span>
              <h1 className="font-headline-md text-4xl text-primary">Active Assembly Poll</h1>
              <p className="font-body-lg text-on-surface-variant mt-2 max-w-2xl">Collecting real-time sentiment from the Gala 2024 VVIP circle regarding the upcoming architectural vision.</p>
            </div>
            <div className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="text-center">
                <span className="block font-headline-sm text-2xl text-primary">1,248</span>
                <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase">Votes Cast</span>
              </div>
              <div className="w-[1px] h-12 bg-outline-variant"></div>
              <div className="text-center">
                <span className="block font-headline-sm text-2xl text-secondary">{timeString}</span>
                <span className="block font-label-caps text-[10px] text-on-surface-variant uppercase">Time Left</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Poll Options */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-outline-variant/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                    <span className="font-label-caps text-error text-xs uppercase tracking-widest">Live Now</span>
                  </div>
                </div>
                <h2 className="font-headline-md text-3xl text-primary mb-10 leading-tight">Which signature pavilion design best captures the essence of "Modern Nobility" for the 2025 Summer Soirée?</h2>
                
                <div className="space-y-6">
                  {/* Option A */}
                  <div className="group cursor-pointer" onClick={() => setSelectedOption('a')}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-body-md font-semibold ${selectedOption === 'a' ? 'text-secondary' : 'text-primary'}`}>A. The Floating Glass Atrium</span>
                      <span className="font-label-caps text-secondary text-xs">42%</span>
                    </div>
                    <div className={`h-12 w-full rounded-full overflow-hidden relative border ${selectedOption === 'a' ? 'border-secondary' : 'border-outline-variant/30 bg-surface-container-low'}`}>
                      <div className={`h-full ${selectedOption === 'a' ? 'bg-secondary/20' : 'bg-primary-container'} w-[42%] transition-all duration-1000`}></div>
                    </div>
                  </div>
                  {/* Option B */}
                  <div className="group cursor-pointer" onClick={() => setSelectedOption('b')}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-body-md font-semibold ${selectedOption === 'b' ? 'text-secondary' : 'text-primary'}`}>B. Heritage Oak & Brass Pavilion</span>
                      <span className="font-label-caps text-secondary text-xs">28%</span>
                    </div>
                    <div className={`h-12 w-full rounded-full overflow-hidden relative border ${selectedOption === 'b' ? 'border-secondary' : 'border-outline-variant/30 bg-surface-container-low'}`}>
                      <div className={`h-full ${selectedOption === 'b' ? 'bg-secondary/20' : 'bg-primary/40'} w-[28%] transition-all duration-1000`}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-between pt-8 border-t border-outline-variant/20">
                  <div className="flex -space-x-3">
                    <img src="https://via.placeholder.com/32" className="w-8 h-8 rounded-full border-2 border-white" alt="voter" />
                    <img src="https://via.placeholder.com/32" className="w-8 h-8 rounded-full border-2 border-white" alt="voter" />
                    <img src="https://via.placeholder.com/32" className="w-8 h-8 rounded-full border-2 border-white" alt="voter" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary-container flex items-center justify-center text-[10px] font-bold text-on-secondary-container">+45</div>
                  </div>
                  <span className="font-body-md text-on-surface-variant text-sm italic">Recently voted: Julian V., Elena G., and 45 others</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary p-6 rounded-xl shadow-lg flex flex-col justify-between text-on-primary">
                  <div>
                    <span className="font-label-caps text-[10px] text-on-primary/60 uppercase tracking-widest">Engagement Rate</span>
                    <h3 className="font-headline-md text-4xl mt-2">94.2%</h3>
                    <p className="font-body-md text-sm text-on-primary/70 mt-2">Highest participation recorded this season.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
                <h3 className="font-headline-sm text-2xl text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">history</span>
                  Past Assemblies
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col gap-2 cursor-pointer">
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Nov 12, 2024</span>
                    <p className="font-body-md text-primary hover:text-secondary transition-colors">Preferred Champagne House</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-on-surface-variant">Winner: Dom Pérignon</span>
                      <span class="text-xs text-secondary">88% Match</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-8 py-3 font-label-caps border border-outline text-primary rounded-lg hover:bg-surface-container-low transition-all uppercase tracking-widest text-xs">View Full Archive</button>
              </div>

              <div className="p-6 rounded-xl border-2 border-dashed border-outline-variant/50 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                </div>
                <div>
                  <p className="font-label-caps text-primary uppercase tracking-widest text-xs">Host Admin Controls</p>
                  <p className="text-xs text-on-surface-variant mt-1">Authorized access only for Gala managers.</p>
                </div>
                <div className="flex gap-2 w-full">
                  <button className="flex-1 py-2 font-label-caps text-[10px] uppercase tracking-widest bg-white border border-outline rounded-md hover:bg-surface-container-low">End Poll</button>
                  <button className="flex-1 py-2 font-label-caps text-[10px] uppercase tracking-widest bg-white border border-outline rounded-md hover:bg-surface-container-low">Push Alert</button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
