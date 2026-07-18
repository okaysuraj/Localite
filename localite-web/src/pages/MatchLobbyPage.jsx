import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MatchLobbyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(timer);
            return prev;
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-surface">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row h-full">
        <section className="flex-1 p-6 lg:p-12 overflow-y-auto">
          {/* Briefing Header */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="font-label-caps text-[12px] text-secondary block mb-2 uppercase tracking-widest">PRE-MATCH BRIEFING</span>
                <h1 className="font-display-lg text-[32px] md:text-[48px] text-primary font-bold">Championship Finals</h1>
              </div>
              <div className="text-right hidden md:block">
                <span className="font-label-caps text-[12px] text-on-surface-variant uppercase tracking-widest">COMMENCING IN</span>
                <div className="font-headline-md text-[32px] text-primary tracking-widest">
                  {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-secondary transition-all duration-1000" style={{ width: '75%' }}></div>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-12">
            {/* Team Alpha */}
            <div className="bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] p-6 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <h3 className="font-headline-sm text-[24px] uppercase tracking-wider font-bold">Team Alpha</h3>
                </div>
                <span className="font-label-caps text-[12px] text-on-surface-variant uppercase">2/2 READY</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    <img src="https://via.placeholder.com/50" alt="player" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-primary">Marcus Vane</p>
                      <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Elite Striker</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-label-caps text-[10px] uppercase">Arrived</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    <img src="https://via.placeholder.com/50" alt="player" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-primary">Elena Rossi</p>
                      <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Defensive Lead</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-label-caps text-[10px] uppercase">Arrived</span>
                </div>
              </div>
            </div>

            {/* Team Bravo */}
            <div className="bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] p-6 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <h3 className="font-headline-sm text-[24px] uppercase tracking-wider font-bold">Team Bravo</h3>
                </div>
                <span className="font-label-caps text-[12px] text-on-surface-variant uppercase">1/2 READY</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    <img src="https://via.placeholder.com/50" alt="player" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-primary">Sasha Kim</p>
                      <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Team Captain</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-label-caps text-[10px] uppercase">Arrived</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                  <div className="flex items-center gap-4 opacity-50">
                    <img src="https://via.placeholder.com/50" alt="player" className="w-12 h-12 rounded-full object-cover grayscale" />
                    <div>
                      <p className="font-bold text-primary">Liam O'Connell</p>
                      <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Wingman</p>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-label-caps text-[10px] uppercase">In Transit</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] p-6 border border-outline-variant/20">
              <h4 className="font-label-caps text-[12px] text-primary mb-4 uppercase tracking-widest">LOBBY STATUS & INTEL</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-background rounded-lg text-center border border-outline-variant/10">
                  <p className="text-[10px] font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">WEATHER</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-lg">wb_sunny</span>
                    <span className="font-bold">18°C</span>
                  </div>
                </div>
                <div className="p-3 bg-background rounded-lg text-center border border-outline-variant/10">
                  <p className="text-[10px] font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">SURFACE</p>
                  <p className="font-bold text-primary">PRISTINE</p>
                </div>
                <div className="p-3 bg-background rounded-lg text-center border border-outline-variant/10">
                  <p className="text-[10px] font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">SPECTATORS</p>
                  <p className="font-bold text-primary">124</p>
                </div>
                <div className="p-3 bg-background rounded-lg text-center border border-outline-variant/10">
                  <p className="text-[10px] font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">ELO SPREAD</p>
                  <p className="font-bold text-primary">+/- 15</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-container rounded-xl p-6 flex flex-col justify-between text-white shadow-xl">
              <div>
                <p className="font-label-caps text-[10px] text-white/70 mb-2 uppercase tracking-widest">URGENT ACTION</p>
                <h4 className="font-headline-sm text-[24px] font-bold">Attendance Check</h4>
              </div>
              <button 
                className="w-full mt-6 bg-white text-primary py-3 rounded-xl font-label-caps text-[12px] uppercase tracking-widest hover:bg-secondary-container transition-colors active:scale-95"
                onClick={() => alert('Attendance Confirmed')}
              >
                Confirm Attendance
              </button>
            </div>
          </div>
        </section>

        {/* Lobby Chat Panel */}
        <aside className="w-full lg:w-96 bg-white border-l border-outline-variant/30 flex flex-col h-full z-10">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">forum</span>
              <h3 className="font-label-caps text-[12px] text-primary uppercase tracking-widest">LOBBY CHAT</h3>
            </div>
            <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">LIVE</span>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex gap-3">
              <img src="https://via.placeholder.com/40" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs">Marcus Vane</span>
                  <span className="text-[10px] text-on-surface-variant">14:42</span>
                </div>
                <div className="bg-surface-container-low p-3 rounded-xl rounded-tl-none shadow-sm text-sm">
                  Is everyone bringing the official team kit for the finals?
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-[10px] font-bold">ME</div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-[10px] text-on-surface-variant">14:45</span>
                  <span className="font-bold text-xs">You</span>
                </div>
                <div className="bg-secondary text-white p-3 rounded-xl rounded-tr-none shadow-sm text-sm">
                  Yes, Alpha in Navy, Bravo in Gold. See you on court 1.
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-outline-variant/30 bg-surface-container-lowest">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="w-full bg-surface border-none focus:ring-1 focus:ring-secondary rounded-xl py-3 pl-4 pr-12 text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
