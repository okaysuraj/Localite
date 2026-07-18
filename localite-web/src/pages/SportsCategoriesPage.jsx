import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SportsCategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        
        {/* Hero Header */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <div className="max-w-2xl">
              <span className="font-label-caps text-[12px] text-secondary mb-4 block tracking-widest uppercase">THE SELECTION</span>
              <h2 className="font-display-lg text-[48px] text-primary font-bold leading-none mb-6">Athletic Disciplines</h2>
              <p className="font-body-lg text-on-surface-variant text-lg leading-relaxed">
                A curated collection of distinguished sports, where tradition meets modern competition. Each discipline is a pathway to mastery and meaningful connection.
              </p>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                <span className="material-symbols-outlined">west</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                <span className="material-symbols-outlined">east</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-6 py-6 border-y border-outline-variant/20">
            <span className="font-label-caps text-[11px] text-outline tracking-widest">FILTER BY TYPE</span>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-2 rounded-full bg-primary text-white font-label-caps text-[11px] uppercase tracking-widest font-bold">ALL DISCIPLINES</button>
              <button className="px-6 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-[11px] uppercase tracking-widest hover:border-secondary hover:text-secondary transition-colors font-bold">RACQUET</button>
              <button className="px-6 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-[11px] uppercase tracking-widest hover:border-secondary hover:text-secondary transition-colors font-bold">EQUESTRIAN</button>
              <button className="px-6 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-[11px] uppercase tracking-widest hover:border-secondary hover:text-secondary transition-colors font-bold">CLUBHOUSE</button>
            </div>
          </div>
        </section>

        {/* Disciplines Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Tennis (Large) */}
          <div className="md:col-span-8 group cursor-pointer">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10"></div>
              <img src="https://via.placeholder.com/1000x800" alt="Tennis" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full flex justify-between items-end">
                <div>
                  <span className="font-label-caps text-[12px] text-secondary mb-2 block tracking-widest uppercase">TRADITION</span>
                  <h3 className="font-display-lg text-[48px] text-white font-bold mb-4">Tennis</h3>
                  <div className="flex gap-8">
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-white/60 mb-1 uppercase tracking-widest">ACTIVE MATCHES</span>
                      <span className="font-headline-sm text-[24px] font-bold text-white">24</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-white/60 mb-1 uppercase tracking-widest">PREMIUM VENUES</span>
                      <span className="font-headline-sm text-[24px] font-bold text-white">12</span>
                    </div>
                  </div>
                </div>
                <button className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <span className="material-symbols-outlined text-3xl font-bold">arrow_outward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Polo (Small) */}
          <div className="md:col-span-4 group cursor-pointer">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10"></div>
              <img src="https://via.placeholder.com/600x800" alt="Polo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20 w-full">
                <span className="font-label-caps text-[12px] text-secondary mb-2 block tracking-widest uppercase">MAJESTY</span>
                <h3 className="font-display-lg text-[42px] text-white font-bold mb-6">Polo</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="font-label-caps text-[10px] text-white/60 uppercase tracking-widest">ACTIVE LOBBIES</span>
                    <span className="font-headline-sm text-[18px] font-bold text-white">08</span>
                  </div>
                  <button className="text-white font-label-caps text-[12px] font-bold flex items-center gap-2 hover:text-secondary transition-colors uppercase tracking-widest">
                    DISCOVER THE SPORT <span className="material-symbols-outlined text-sm">east</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Golf (Medium) */}
          <div className="md:col-span-6 group cursor-pointer">
            <div className="relative h-[450px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10"></div>
              <img src="https://via.placeholder.com/800x600" alt="Golf" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20 w-full flex justify-between items-end">
                <div>
                  <span className="font-label-caps text-[12px] text-secondary mb-2 block tracking-widest uppercase">PRECISION</span>
                  <h3 className="font-display-lg text-[38px] text-white font-bold mb-2">Golf</h3>
                  <p className="text-white/70 font-body-md text-sm max-w-xs">Master the greens across 15 exclusive local estates.</p>
                </div>
                <div className="text-white text-right">
                  <span className="block font-headline-sm text-[24px] font-bold">11</span>
                  <span className="font-label-caps text-[9px] text-white/50 uppercase tracking-widest">OPEN TEE TIMES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cricket (Medium) */}
          <div 
            className="md:col-span-6 group cursor-pointer"
            onClick={() => navigate('/sports/cricket')}
          >
            <div className="relative h-[450px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10"></div>
              <img src="https://via.placeholder.com/800x600" alt="Cricket" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20 w-full flex justify-between items-end">
                <div>
                  <span className="font-label-caps text-[12px] text-secondary mb-2 block tracking-widest uppercase">HERITAGE</span>
                  <h3 className="font-display-lg text-[38px] text-white font-bold mb-2">Cricket</h3>
                  <p className="text-white/70 font-body-md text-sm max-w-xs">Join the weekend leagues at the central division oval.</p>
                </div>
                <div className="text-white text-right">
                  <span className="block font-headline-sm text-[24px] font-bold">05</span>
                  <span className="font-label-caps text-[9px] text-white/50 uppercase tracking-widest">MATCHES TODAY</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Brand Storytelling */}
        <section className="mt-24 py-24 border-t border-outline-variant/20 flex flex-col items-center text-center">
          <div className="w-12 h-1 px-1 bg-secondary mb-12"></div>
          <blockquote className="max-w-4xl">
            <p className="font-display-lg text-[32px] md:text-[48px] text-primary font-bold mb-10 leading-tight italic">
              "Greatness is not merely in the victory, but in the caliber of those you choose to stand beside on the field of play."
            </p>
            <cite className="not-italic flex flex-col items-center">
              <span className="font-label-caps text-[12px] text-primary tracking-widest mb-1 uppercase font-bold">Reginald Vance</span>
              <span className="text-on-surface-variant text-sm font-body-md">Founder, Localite Society</span>
            </cite>
          </blockquote>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl">
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-[32px] text-secondary font-bold mb-2">15k+</span>
              <span className="font-label-caps text-[10px] text-outline uppercase tracking-widest">ELITE MEMBERS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-[32px] text-secondary font-bold mb-2">120</span>
              <span className="font-label-caps text-[10px] text-outline uppercase tracking-widest">GLOBAL VENUES</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-[32px] text-secondary font-bold mb-2">50</span>
              <span className="font-label-caps text-[10px] text-outline uppercase tracking-widest">TOURNAMENTS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-[32px] text-secondary font-bold mb-2">04</span>
              <span className="font-label-caps text-[10px] text-outline uppercase tracking-widest">REGAL DIVISIONS</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
