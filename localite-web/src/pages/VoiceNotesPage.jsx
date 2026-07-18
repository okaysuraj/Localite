import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VoiceNotesPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex w-full max-w-7xl mx-auto overflow-hidden h-[calc(100vh-73px)]">
      {/* Left Pane */}
      <aside className="hidden md:flex w-80 border-r border-outline-variant/30 flex-col bg-surface-container-low/40">
        <div className="p-6 border-b border-outline-variant/30">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Journal</h2>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-high/50 border-none focus:ring-1 focus:ring-secondary-fixed-dim text-body-md placeholder:text-on-surface-variant/60" 
              placeholder="Search members..." 
              type="text"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {/* Active Chat */}
          <div className="px-4 py-3 bg-white shadow-sm mx-2 rounded-xl flex items-center gap-3 cursor-pointer mb-2">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest">
                <img src="https://via.placeholder.com/150" alt="Julian" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-on-surface truncate">Julian Thorne</span>
                <span className="text-[10px] font-label-caps text-on-surface-variant">{formatTime(seconds + 17)}</span>
              </div>
              <p className="text-xs text-on-surface-variant truncate">Voice Note • Recording...</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Pane */}
      <section className="flex-1 flex flex-col bg-surface-bright relative">
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-12 max-w-4xl mx-auto w-full pt-12 pb-24">
          
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-lg ring-4 ring-white">
              <img src="https://via.placeholder.com/200" alt="Julian" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-headline-md text-headline-md text-primary mb-1">Julian Thorne</h1>
            <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Active Voice Note</p>
          </div>

          {/* Player Card */}
          <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-outline-variant/20 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <button className="w-14 h-14 shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-all shadow-md">
                <span className="material-symbols-outlined text-3xl">play_arrow</span>
              </button>
              <div className="flex-1 h-12 flex items-center gap-1 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="w-1 bg-secondary-fixed-dim rounded-full transition-all duration-200" style={{height: `${Math.random() * 80 + 20}%`}}></div>
                ))}
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant tabular-nums">2:45</span>
            </div>
            <div className="pt-6 border-t border-outline-variant/10">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-on-surface-variant/40 text-lg">format_quote</span>
                <p className="text-body-lg font-body-lg text-on-surface italic leading-relaxed">
                  "The gallery opens at 7:00 PM tonight. I've secured a table at the corner for our discussion afterward. I think the curation of the new wing perfectly matches the mood we're aiming for..."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recording Dock */}
        <div className="absolute bottom-0 w-full bg-white/70 backdrop-blur-md border-t border-outline-variant/30 px-6 py-8">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="font-label-caps text-label-caps text-on-surface tracking-widest">Recording...</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant tabular-nums ml-2">{formatTime(seconds + 17)}</span>
            </div>

            <div className="flex items-center gap-12">
              <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full border border-outline-variant text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/10 rounded-full blur-xl animate-pulse"></div>
                <button className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center relative z-10 hover:shadow-xl transition-shadow active:scale-95">
                  <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>mic</span>
                </button>
              </div>

              <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:shadow-md transition-all">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            
            <p className="mt-4 text-[10px] font-label-caps text-on-surface-variant/50 uppercase tracking-tighter">Tap to pause or Send to Julian Thorne</p>
          </div>
        </div>
      </section>
    </div>
  );
}
