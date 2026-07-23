import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LiveEventDashboardPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ min: 14, sec: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.sec === 0) {
          if (prev.min === 0) return prev;
          return { min: prev.min - 1, sec: 59 };
        }
        return { ...prev, sec: prev.sec - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md flex flex-col overflow-x-hidden">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-background border-b border-outline-variant shadow-sm">
        <div className="flex items-center gap-6">
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">ELITE CIRCLE</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-caps uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all">
            Create Event
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
            <img src="https://via.placeholder.com/100" alt="Host" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden xl:flex flex-col h-[calc(100vh-73px)] w-64 bg-surface-container-low border-r border-outline-variant shadow-md z-40 p-4 gap-4 sticky top-[73px]">
          <div className="px-2 mb-4">
            <p className="font-label-caps text-secondary text-xs uppercase tracking-widest">Host Admin</p>
            <h3 className="font-headline-sm text-primary text-xl mt-1">Managing Gala 2024</h3>
            <p className="text-[10px] text-on-surface-variant mt-1">Vintage Garden Soiree</p>
          </div>
          <nav className="flex flex-col gap-1">
            <a className="flex items-center gap-3 px-4 py-3 bg-primary text-on-primary rounded-lg font-bold shadow-md transition-transform" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Overview</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">group</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Guest List</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">explore</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Map Tracking</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="font-headline-md text-4xl text-primary mb-2">Vintage Garden Soiree</h1>
              <p className="font-body-md text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">location_on</span> The Glasshouse Pavilion, London
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-label-caps text-secondary uppercase tracking-widest text-[10px]">Live Status</p>
              <p className="font-body-lg text-lg font-bold text-primary flex items-center md:justify-end gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> 142 Active Guests
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
            {/* Left: Venue Map */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden relative border border-outline-variant h-[500px]">
              <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-sm border border-outline-variant">
                <h4 className="font-label-caps text-primary mb-2 uppercase tracking-widest text-[10px]">Interactive Floorplan</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-secondary"></span>
                    <span className="text-xs font-medium">VVIP Lounges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="text-xs font-medium">Dining Area</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-full relative">
                <img src="https://via.placeholder.com/800x600" className="w-full h-full object-cover opacity-60" alt="Map" />
                {/* Simulated Markers */}
                <div className="absolute w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg top-[30%] left-[45%] animate-pulse"></div>
                <div className="absolute w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg top-[55%] left-[20%] animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="absolute w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg top-[42%] left-[68%] animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-outline-variant gap-2">
                <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><span className="material-symbols-outlined">zoom_in</span></button>
                <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><span className="material-symbols-outlined">zoom_out</span></button>
                <div className="w-[1px] bg-outline-variant mx-1"></div>
                <button className="p-2 hover:bg-surface-container rounded-full transition-colors"><span class="material-symbols-outlined">my_location</span></button>
              </div>
            </div>

            {/* Right: Milestone & Guests */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Milestone */}
              <div className="bg-primary-container text-on-primary-container p-6 rounded-xl shadow-md relative overflow-hidden">
                <p className="font-label-caps opacity-70 mb-2 uppercase tracking-widest text-[10px]">Next Milestone</p>
                <h3 className="font-headline-sm text-2xl mb-4 text-white">Champagne Toast</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight text-secondary-container">
                    {countdown.min}:{countdown.sec.toString().padStart(2, '0')}
                  </span>
                  <span className="font-label-caps opacity-70 uppercase tracking-widest text-[10px]">min remaining</span>
                </div>
                <button className="mt-6 w-full py-3 bg-secondary text-white font-label-caps rounded-lg hover:opacity-90 transition-all uppercase tracking-widest text-xs">
                  Broadcast Announcement
                </button>
              </div>

              {/* Guest List Preview */}
              <div className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant flex flex-col overflow-hidden min-h-[250px]">
                <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
                  <h3 className="font-label-caps text-primary uppercase tracking-widest text-xs">Live Guest List</h3>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant cursor-pointer text-[18px]">search</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  <div className="flex items-center justify-between p-3 hover:bg-surface-container-low rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <img src="https://via.placeholder.com/40" className="w-10 h-10 rounded-full" alt="avatar" />
                      <div>
                        <p className="font-body-md font-bold text-primary">Julian Thorne</p>
                        <p className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">VVIP • TABLE 04</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold">ARRIVED</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-surface-container-low rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <img src="https://via.placeholder.com/40" className="w-10 h-10 rounded-full" alt="avatar" />
                      <div>
                        <p className="font-body-md font-bold text-primary">Elena Rossi</p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">GENERAL</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">EN ROUTE</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-high border-t border-outline-variant">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Arrival Progress</span>
                    <span className="font-label-caps text-[10px] text-primary">82%</span>
                  </div>
                  <div className="w-full h-1 bg-outline-variant rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
              <p className="font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest text-[10px]">Total Attendance</p>
              <h3 className="font-headline-sm text-2xl text-primary">156 / 180</h3>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
              <p className="font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest text-[10px]">Service Level</p>
              <h3 className="font-headline-sm text-2xl text-green-700">Excellent</h3>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
              <p className="font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest text-[10px]">Concierge</p>
              <h3 className="font-headline-sm text-2xl text-secondary">3 Pending</h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
