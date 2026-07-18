import React, { useState } from 'react';

export default function MatchHistoryPage() {
  const [activeTab, setActiveTab] = useState('ALL DISCIPLINES');

  const matchHistory = [
    {
      id: 1,
      sport: 'Tennis Championship',
      title: 'The Wimbledon Courtyard Invitational',
      date: 'MAY 14, 2024',
      result: 'VICTORY',
      homeScore: 6,
      awayScore: 4,
      mvp: 'Julian Sterling',
      notes: '"Exceptional court coverage and backhand precision during the second set." — Host Notes',
      image: 'https://via.placeholder.com/600x400'
    },
    {
      id: 2,
      sport: 'League Match | Squash',
      title: 'Midnight Circuit: Round 3',
      date: 'MAY 08, 2024',
      result: 'DEFEAT',
      homeScore: 11,
      awayScore: 13,
      mvp: 'Marcello Rossi',
      notes: '"Tight match, lost on technical errors in the final few points." — Host Notes',
      image: 'https://via.placeholder.com/600x400'
    }
  ];

  return (
    <main className="min-h-screen bg-surface">
      {/* Header & Stats */}
      <header className="pt-12 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="font-label-caps text-[12px] text-secondary mb-2 tracking-widest uppercase">PERSONAL JOURNEY</p>
            <h2 className="font-display-lg text-[48px] text-primary font-bold">Season Chronicles</h2>
          </div>
          <div className="flex gap-4">
            <button className="p-3 bg-white border border-outline-variant/30 rounded-full shadow-lg hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
            </button>
            <button className="p-3 bg-white border border-outline-variant/30 rounded-full shadow-lg hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-primary">share</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col justify-between border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary mb-4 text-3xl">sports_tennis</span>
            <div>
              <p className="font-label-caps text-[12px] text-on-surface-variant uppercase tracking-widest">TOTAL MATCHES</p>
              <h3 className="font-display-lg text-[48px] text-primary leading-none mt-2 font-bold">42</h3>
            </div>
          </div>
          <div className="bg-primary text-white p-8 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col justify-between">
            <span className="material-symbols-outlined text-secondary-fixed mb-4 text-3xl">emoji_events</span>
            <div>
              <p className="font-label-caps text-[12px] text-white/70 uppercase tracking-widest">WIN RATE</p>
              <h3 className="font-display-lg text-[48px] text-white leading-none mt-2 font-bold">68%</h3>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col justify-between border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary mb-4 text-3xl">star</span>
            <div>
              <p className="font-label-caps text-[12px] text-on-surface-variant uppercase tracking-widest">MVP TITLES</p>
              <h3 className="font-display-lg text-[48px] text-primary leading-none mt-2 font-bold">12</h3>
            </div>
          </div>
          <div className="bg-secondary-container/10 p-8 rounded-xl border border-secondary/20 flex flex-col justify-between">
            <span className="material-symbols-outlined text-secondary mb-4 text-3xl">bolt</span>
            <div>
              <p className="font-label-caps text-[12px] text-secondary uppercase tracking-widest">ACTIVE STREAK</p>
              <h3 className="font-display-lg text-[48px] text-primary leading-none mt-2 font-bold">5</h3>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-outline-variant/30 mb-12 overflow-x-auto pb-1">
          {['ALL DISCIPLINES', 'TENNIS', 'SQUASH', 'PADDLE', 'POLO'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-label-caps text-[12px] tracking-widest whitespace-nowrap transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Feed */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="flex flex-col gap-10">
          {matchHistory.map((match, index) => (
            <article key={match.id} className={`flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] group cursor-pointer hover:-translate-y-1 transition-transform ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img src={match.image} alt={match.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              
              <div className="md:w-2/3 p-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="font-label-caps text-[12px] text-secondary uppercase tracking-widest mb-2">{match.sport}</p>
                      <h4 className="font-headline-sm text-[24px] text-primary font-bold">{match.title}</h4>
                    </div>
                    <div className="text-right">
                      <p className="font-label-caps text-[10px] text-on-surface-variant mb-1 tracking-widest uppercase">{match.date}</p>
                      <span className={`px-3 py-1 font-label-caps text-[10px] rounded-full tracking-widest uppercase ${match.result === 'VICTORY' ? 'bg-primary text-white' : 'bg-outline-variant text-on-surface-variant'}`}>
                        {match.result}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 mb-8 py-6 border-y border-outline-variant/20">
                    <div className="flex-1 flex flex-col items-center">
                      <p className="font-label-caps text-[10px] text-on-surface-variant mb-2 tracking-widest uppercase">YOUR SCORE</p>
                      <p className="font-display-lg text-[48px] text-primary font-bold">{match.homeScore} <span className="text-body-lg text-outline font-normal">|</span> {match.homeScore}</p>
                    </div>
                    <div className="px-4 py-2 bg-surface-container rounded-full font-label-caps text-[10px] tracking-tighter">VS</div>
                    <div className="flex-1 flex flex-col items-center">
                      <p className="font-label-caps text-[10px] text-on-surface-variant mb-2 tracking-widest uppercase">OPPONENT</p>
                      <p className="font-display-lg text-[48px] text-outline-variant font-bold">{match.awayScore} <span className="text-body-lg text-outline font-normal">|</span> {match.awayScore}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>military_tech</span>
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase">MVP SELECTION</p>
                      <p className="font-body-md font-semibold">{match.mvp}</p>
                    </div>
                  </div>
                  <div className="max-w-xs italic text-on-surface-variant text-sm border-l-2 border-secondary pl-4">
                    {match.notes}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-10 py-4 border border-outline-variant text-primary font-label-caps text-[12px] tracking-widest uppercase hover:bg-white transition-all rounded-full shadow-[0_8px_16px_rgba(10,25,47,0.05)]">
            LOAD HISTORIC RECORDS
          </button>
        </div>
      </section>
    </main>
  );
}
