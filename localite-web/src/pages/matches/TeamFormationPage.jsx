import React from 'react';

export default function TeamFormationPage() {
  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <main className="max-w-7xl mx-auto px-6 py-12 pb-32">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-label-caps text-[12px] text-secondary mb-2 uppercase tracking-widest">Match Week 12 • Arena Alpha</p>
            <h1 className="font-display-lg text-[48px] text-primary font-bold">Tactical Command</h1>
            <p className="text-on-surface-variant max-w-xl mt-2 font-body-md">Curate the field. Drag participants into their respective sovereign units to balance the competitive landscape.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 border border-secondary text-secondary font-label-caps text-[12px] rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm">
              RESET BOARD
            </button>
            <button className="px-8 py-3 bg-primary text-white font-label-caps text-[12px] rounded-xl hover:opacity-90 transition-all shadow-[0_8px_16px_rgba(10,25,47,0.15)]">
              FINALIZE TEAMS
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
          {/* Reserve Roster */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border border-outline-variant/10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-sm text-[24px] text-primary font-bold">Reserve Roster</h3>
                <span className="bg-surface-container-high px-3 py-1 rounded-full font-label-caps text-[10px]">12 Available</span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {[
                  { name: 'Alexander Thorne', power: 88, class: 'Legend', img: 'https://via.placeholder.com/100' },
                  { name: 'Elena Vance', power: 92, class: 'Elite', img: 'https://via.placeholder.com/100' },
                  { name: 'Julian Saint', power: 79, class: 'Pro', img: 'https://via.placeholder.com/100' },
                  { name: 'Marcus Aurelius', power: 85, class: 'Master', img: 'https://via.placeholder.com/100' },
                ].map((player, idx) => (
                  <div key={idx} className="p-3 bg-white border border-outline-variant/20 rounded-xl flex items-center gap-4 hover:border-secondary/50 transition-all cursor-grab active:cursor-grabbing shadow-sm group">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container">
                      <img src={player.img} alt={player.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-label-caps text-[12px] text-primary">{player.name}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/60">Power: {player.power}</span>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-secondary">{player.class}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-secondary">drag_indicator</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Teams */}
          <div className="col-span-8 grid grid-cols-2 gap-6">
            {/* Team Crest */}
            <div className="bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border border-outline-variant/10 overflow-hidden flex flex-col border-t-4 border-t-primary">
              <div className="p-6 border-b border-outline-variant/10 bg-primary/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>shield</span>
                  <h3 className="font-headline-sm text-[24px] text-primary font-bold">Team Crest</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[12px] text-on-surface-variant">Strategic Core</span>
                  <span className="font-bold text-primary">Rating: 462</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 bg-surface/50 space-y-4 min-h-[400px]">
                <div className="border-2 border-dashed border-outline-variant/40 rounded-xl h-24 flex items-center justify-center bg-surface-container-low/30 hover:border-secondary transition-colors cursor-pointer">
                  <span className="font-label-caps text-[12px] text-on-surface-variant/60 tracking-widest">DROP MEMBER HERE</span>
                </div>
                
                <div className="p-4 bg-white border border-secondary/30 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary">
                      <img src="https://via.placeholder.com/100" alt="Captain" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-label-caps text-[12px] text-primary">Dominic King</h4>
                      <span className="text-[10px] text-secondary font-bold tracking-widest uppercase">Captain</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary block text-xl">94</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Power</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-outline-variant/20 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant">
                      <img src="https://via.placeholder.com/100" alt="Player" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-label-caps text-[12px] text-primary">Sophia Laurent</h4>
                      <span className="text-[10px] text-on-surface-variant font-medium tracking-widest uppercase">Forward</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary block text-xl">88</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Power</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Sovereign */}
            <div className="bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border border-outline-variant/10 overflow-hidden flex flex-col border-t-4 border-t-secondary">
              <div className="p-6 border-b border-outline-variant/10 bg-secondary/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>crown</span>
                  <h3 className="font-headline-sm text-[24px] text-secondary font-bold">Team Sovereign</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[12px] text-on-surface-variant">Defense Legion</span>
                  <span className="font-bold text-secondary">Rating: 448</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 bg-surface/50 space-y-4 min-h-[400px]">
                <div className="p-4 bg-white border border-secondary/30 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary">
                      <img src="https://via.placeholder.com/100" alt="Captain" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-label-caps text-[12px] text-primary">Cassius Reed</h4>
                      <span className="text-[10px] text-secondary font-bold tracking-widest uppercase">Captain</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary block text-xl">91</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Power</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-outline-variant/40 rounded-xl h-24 flex items-center justify-center bg-surface-container-low/30 hover:border-secondary transition-colors cursor-pointer">
                  <span className="font-label-caps text-[12px] text-on-surface-variant/60 tracking-widest">DROP MEMBER HERE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Bar */}
        <div className="bg-primary text-white rounded-2xl p-8 mt-12 flex flex-col md:flex-row md:items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-20 -translate-y-10">
            <span className="material-symbols-outlined text-[240px]">architecture</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-12 z-10">
            <div>
              <span className="font-label-caps text-[12px] text-white/70 block mb-2 tracking-widest uppercase">Reputation Variance</span>
              <div className="flex items-center gap-3">
                <span className="text-[32px] font-bold font-display-lg leading-none">± 3.2%</span>
                <span className="bg-secondary px-2 py-0.5 text-[10px] font-bold rounded-full text-primary tracking-widest">OPTIMAL</span>
              </div>
            </div>
            
            <div className="hidden md:block h-12 w-px bg-white/20"></div>
            
            <div>
              <span className="font-label-caps text-[12px] text-white/70 block mb-2 tracking-widest uppercase">Team Score Prediction</span>
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col">
                  <span className="text-body-md font-bold mb-1">Crest: 82% Win</span>
                  <div className="w-32 h-1.5 bg-white/20 rounded-full">
                    <div className="bg-secondary h-full rounded-full" style={{width: '82%'}}></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-body-md font-bold mb-1">Sovereign: 78% Win</span>
                  <div className="w-32 h-1.5 bg-white/20 rounded-full">
                    <div className="bg-white h-full rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="z-10 mt-8 md:mt-0">
            <button className="bg-secondary text-primary px-10 py-4 rounded-full font-label-caps text-[12px] tracking-widest uppercase shadow-xl hover:scale-105 transition-all font-bold">
              Finalize Teams
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
