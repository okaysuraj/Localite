import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LiveMapTrackingPage() {
  const navigate = useNavigate();

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

      <div className="flex flex-1 h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col h-full w-64 bg-surface-container-low border-r border-outline-variant p-4 gap-4 flex-shrink-0 z-40">
          <div className="mb-4 px-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-secondary">stars</span>
              <h2 className="font-headline-sm text-xl text-secondary">Host Admin</h2>
            </div>
            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Managing Gala 2024</p>
          </div>
          <nav className="flex flex-col gap-1 flex-grow">
            <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Overview</span>
            </a>
            <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">group</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Guest List</span>
            </a>
            <a className="flex items-center gap-3 p-3 bg-primary text-on-primary rounded-lg font-bold shadow-md transition-transform" href="#">
              <span className="material-symbols-outlined">explore</span>
              <span className="font-label-caps uppercase tracking-widest text-xs">Map Tracking</span>
            </a>
          </nav>
        </aside>

        {/* Main Content: Map + Sidebar */}
        <main className="flex-grow relative flex overflow-hidden">
          {/* Map Area */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-surface-container-high relative overflow-hidden">
              <img src="https://via.placeholder.com/1200x800" className="w-full h-full object-cover opacity-80 grayscale-[30%]" alt="Map" />
              
              {/* Markers */}
              <div className="absolute top-[45%] left-[55%] animate-bounce">
                <div className="relative flex flex-col items-center">
                  <img src="https://via.placeholder.com/48" className="w-12 h-12 rounded-full border-2 border-white shadow-lg" alt="Marker" />
                  <div className="mt-2 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded border border-outline-variant/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="font-label-caps text-[9px] text-on-surface uppercase tracking-widest">3 MIN ETA</span>
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-10 left-10 flex flex-col gap-4">
                <div className="bg-white/80 backdrop-blur-md p-2 rounded-xl border border-outline-variant/30 shadow-md flex flex-col gap-2">
                  <button className="w-10 h-10 flex items-center justify-center hover:bg-surface transition-colors rounded-lg text-primary"><span className="material-symbols-outlined">add</span></button>
                  <hr className="border-outline-variant/20" />
                  <button className="w-10 h-10 flex items-center justify-center hover:bg-surface transition-colors rounded-lg text-primary"><span className="material-symbols-outlined">remove</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Discovery Sidebar */}
          <aside className="absolute right-0 top-0 h-full w-full md:w-[400px] bg-white/80 backdrop-blur-xl border-l border-outline-variant/40 z-10 flex flex-col">
            <div className="p-8 pb-4">
              <h2 className="font-headline-md text-3xl text-primary mb-2">Live Discovery</h2>
              <div className="flex items-center justify-between">
                <p className="font-label-caps text-on-surface-variant uppercase tracking-widest text-xs">Members In Transit</p>
                <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded font-label-caps text-[10px] uppercase tracking-widest">12 Active</span>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto px-6 space-y-4 pb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10 cursor-pointer hover:shadow-md transition-all">
                <div className="flex gap-4">
                  <img src="https://via.placeholder.com/56" className="w-14 h-14 rounded-full border border-outline-variant" alt="avatar" />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-headline-sm text-lg text-primary">Sophia Valente</h3>
                      <span className="text-secondary font-label-caps text-[10px] font-bold">VIP</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-[16px] text-secondary">distance</span>
                      <p className="text-on-surface-variant text-xs">Heading to: <span className="text-primary font-medium">Mayfair Gala</span></p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-grow h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-secondary w-3/4"></div>
                      </div>
                      <p className="font-label-caps text-[10px] text-primary whitespace-nowrap uppercase tracking-widest">4 MIN ETA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/10 cursor-pointer hover:shadow-md transition-all">
                <div className="flex gap-4">
                  <img src="https://via.placeholder.com/56" className="w-14 h-14 rounded-full border border-outline-variant" alt="avatar" />
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-headline-sm text-lg text-primary">Julian Thorne</h3>
                      <span className="material-symbols-outlined text-[16px] text-green-600">check_circle</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-[16px] text-secondary">flight</span>
                      <p className="text-on-surface-variant text-xs">Arrived at: <span className="text-primary font-medium">Heliport Lounge</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-outline-variant/30">
              <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-caps tracking-widest hover:shadow-lg transition-all uppercase text-xs">
                Broadcast Update
              </button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
