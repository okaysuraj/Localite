import React from 'react';

export default function CricketDetailPage() {
  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <main className="pb-24">
        {/* Hero Section */}
        <section className="relative h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://via.placeholder.com/1600x900" alt="Cricket Grounds" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full max-w-7xl mx-auto">
            <span className="font-label-caps text-[12px] text-secondary-fixed bg-primary/40 backdrop-blur-sm px-3 py-1 rounded mb-4 inline-block tracking-widest uppercase">Elite Cricket Grounds</span>
            <h1 className="font-display-lg text-[48px] text-white mb-2 font-bold">Arena Alpha</h1>
            <p className="font-body-lg text-white/80 max-w-2xl text-lg">The premier destination for local cricket excellence. Home to the Royal Elite Division, featuring world-class turf pitches and a community of high-prestige talent.</p>
            <div className="flex gap-4 mt-8">
              <button className="bg-primary text-white font-label-caps text-[12px] px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform tracking-widest uppercase">Book a Session</button>
              <button className="border border-white text-white font-label-caps text-[12px] px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-all tracking-widest uppercase">View Arena Rules</button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="px-6 py-12 max-w-7xl mx-auto -mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col items-center justify-center text-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-secondary mb-2 text-4xl">sports_cricket</span>
              <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest">Active Players</p>
              <h3 className="font-headline-sm text-[24px] text-primary font-bold">1,240</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col items-center justify-center text-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-secondary mb-2 text-4xl">event_available</span>
              <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest">Matches Today</p>
              <h3 className="font-headline-sm text-[24px] text-primary font-bold">12</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col items-center justify-center text-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-secondary mb-2 text-4xl">stars</span>
              <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest">Avg Prestige</p>
              <h3 className="font-headline-sm text-[24px] text-primary font-bold">8.4</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col items-center justify-center text-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-secondary mb-2 text-4xl">stadium</span>
              <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest">Pitch Quality</p>
              <h3 className="font-headline-sm text-[24px] text-primary font-bold">Elite</h3>
            </div>
          </div>
        </section>

        {/* Live Match (Bento) */}
        <section className="px-6 py-6 max-w-7xl mx-auto">
          <div className="bg-primary text-white p-8 rounded-xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <span className="bg-error px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> LIVE
                </span>
                <div className="text-right">
                  <p className="font-label-caps text-[10px] text-white/70 uppercase tracking-widest">Tournament Finals</p>
                  <p className="text-white font-medium">Mayfair Knights vs. Westminster Lions</p>
                </div>
              </div>
              <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <p className="text-5xl font-bold tracking-tighter">184/4</p>
                  <p className="font-label-caps text-[12px] text-white/70 uppercase tracking-widest mt-2">KNIGHTS (18.2 OV)</p>
                </div>
                <div className="hidden md:block h-16 w-px bg-white/30"></div>
                <div className="flex-grow">
                  <p className="text-sm italic text-white/80 mb-3">Striker: James Sterling (45* from 22)</p>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[65%]"></div>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full md:w-auto px-8 py-3 bg-white text-primary font-label-caps text-[12px] uppercase tracking-widest rounded-lg hover:bg-surface-container transition-colors font-bold">
                Spectate Live Broadcast
              </button>
            </div>
          </div>
        </section>

        {/* Premier Fixtures */}
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline-md text-[32px] text-primary font-bold">Premier Fixtures</h2>
              <p className="text-on-surface-variant font-body-md">The upcoming elite encounters at Arena Alpha.</p>
            </div>
            <a className="text-secondary font-label-caps text-[12px] border-b border-secondary tracking-widest uppercase hover:text-primary transition-colors cursor-pointer">Full Schedule</a>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white p-6 rounded-xl shadow-[0_8px_16px_-4px_rgba(10,25,47,0.05)] flex flex-col md:flex-row items-center gap-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
              <div className="text-center min-w-[80px]">
                <p className="font-display-lg text-[32px] text-primary font-bold leading-none">24</p>
                <p className="font-label-caps text-[10px] text-outline uppercase tracking-widest mt-1">OCT</p>
              </div>
              
              <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex flex-col items-center md:items-end text-center md:text-right">
                  <h4 className="font-bold text-lg">Regent CC</h4>
                  <span className="text-xs text-outline">Prestige: 8.9</span>
                </div>
                <div className="bg-surface-container text-outline px-3 py-1 rounded-full text-xs font-bold italic">VS</div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <h4 className="font-bold text-lg">Belgravia 11</h4>
                  <span className="text-xs text-outline">Prestige: 9.1</span>
                </div>
              </div>
              
              <div className="hidden lg:flex flex-col items-center border-x border-outline-variant/30 px-12">
                <span className="font-label-caps text-[10px] text-outline uppercase tracking-widest mb-1">Ground</span>
                <span className="font-body-md font-medium">Lord's Estate Oval</span>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                <button className="p-3 rounded-xl border border-outline-variant hover:bg-secondary-container hover:border-secondary hover:text-secondary transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined">notifications_active</span>
                </button>
                <button className="flex-1 md:flex-none px-6 py-3 bg-primary text-white font-label-caps text-[12px] uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity font-bold">
                  Tickets
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
