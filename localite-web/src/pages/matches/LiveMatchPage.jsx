import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function LiveMatchPage() {
  const { id } = useParams();
  const [matchData, setMatchData] = useState({
    time: "74:22",
    homeTeam: "Kensington United",
    awayTeam: "Belgravia Rovers",
    homeScore: 2,
    awayScore: 1,
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 7, away: 3 },
      passAccuracy: { home: 89, away: 81 },
      xg: { home: 2.14, away: 1.02 },
      corners: { home: 6, away: 3 },
      fouls: { home: 5, away: 9 }
    }
  });

  useEffect(() => {
    // Simulate live updates
    const timer = setInterval(() => {
      setMatchData(prev => {
        let [mins, secs] = prev.time.split(':').map(Number);
        secs++;
        if (secs >= 60) {
          mins++;
          secs = 0;
        }
        return {
          ...prev,
          time: `${mins}:${String(secs).padStart(2, '0')}`
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Scoreboard Header */}
      <section className="relative w-full rounded-[2rem] overflow-hidden bg-primary-container text-white mb-12 shadow-2xl p-8 lg:p-16 min-h-[400px] flex flex-col justify-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full border-[60px] border-secondary-fixed/30"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full border-[60px] border-secondary-fixed/30"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-center gap-12">
          {/* Home Team */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="w-24 h-24 mb-6 rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed">shield</span>
            </div>
            <h2 className="font-headline-md text-[32px] text-secondary-fixed mb-2 font-bold">{matchData.homeTeam}</h2>
            <span className="font-label-caps text-[12px] text-white/50 uppercase tracking-widest">Elite League • Home</span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center justify-center px-8 md:border-x border-white/10 h-full">
            <div className="bg-secondary text-white px-4 py-1 rounded-full font-label-caps text-[10px] mb-4 animate-pulse uppercase tracking-widest">
              LIVE • {matchData.time}
            </div>
            <div className="flex items-center gap-6 mb-6">
              <span className="font-display-lg text-[64px] md:text-[84px] leading-none font-bold">{matchData.homeScore}</span>
              <span className="text-secondary-fixed font-display-lg text-[48px] opacity-50">:</span>
              <span className="font-display-lg text-[64px] md:text-[84px] leading-none font-bold">{matchData.awayScore}</span>
            </div>
            <div className="text-white/60 font-body-md italic">Dominating Possession</div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-24 h-24 mb-6 rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-white">sports_motorsports</span>
            </div>
            <h2 className="font-headline-md text-[32px] text-white mb-2 font-bold">{matchData.awayTeam}</h2>
            <span className="font-label-caps text-[12px] text-white/50 uppercase tracking-widest">Elite League • Away</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] p-6 border border-outline-variant/20 h-full flex flex-col">
          <h3 className="font-headline-sm text-[24px] text-primary mb-6 flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-secondary">analytics</span>
            Match Timeline
          </h3>
          <div className="space-y-0 relative flex-1">
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-outline-variant/30"></div>
            
            <div className="relative pl-12 pb-8 group">
              <div className="absolute left-0 top-1 w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center z-10 border-4 border-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary text-sm">sports_soccer</span>
              </div>
              <div className="flex justify-between items-start mb-1">
                <span className="font-label-caps text-secondary text-[11px] uppercase tracking-widest">68' GOAL</span>
                <span className="font-label-caps text-on-surface-variant text-[11px] uppercase">Kensington</span>
              </div>
              <p className="font-body-md text-primary font-bold">Julian Sterling</p>
              <p className="font-body-md text-on-surface-variant text-sm">Assisted by Marcus Vane</p>
            </div>

            <div className="relative pl-12 pb-8 group">
              <div className="absolute left-0 top-1 w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center z-10 border-4 border-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">cached</span>
              </div>
              <div className="flex justify-between items-start mb-1">
                <span className="font-label-caps text-on-surface-variant text-[11px] uppercase tracking-widest">54' SUB</span>
                <span className="font-label-caps text-on-surface-variant text-[11px] uppercase">Belgravia</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-xs">arrow_downward</span>
                <p className="font-body-md text-on-surface-variant text-sm line-through">D. Sinclair</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xs">arrow_upward</span>
                <p className="font-body-md text-primary text-sm font-bold">O. Thorne</p>
              </div>
            </div>

            <div className="relative pl-12 pb-8 group">
              <div className="absolute left-0 top-1 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center z-10 border-4 border-white group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-sm">style</span>
              </div>
              <div className="flex justify-between items-start mb-1">
                <span className="font-label-caps text-yellow-700 text-[11px] uppercase tracking-widest">41' BOOKING</span>
                <span className="font-label-caps text-on-surface-variant text-[11px] uppercase">Belgravia</span>
              </div>
              <p className="font-body-md text-primary font-bold">Xavier Knight</p>
              <p className="font-body-md text-on-surface-variant text-sm">Tactical Foul</p>
            </div>

            <div className="relative pl-12 pb-8">
              <div className="absolute left-0 top-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center z-10 border-4 border-white">
                <span className="material-symbols-outlined text-white text-sm">timer</span>
              </div>
              <div className="flex justify-between items-start mb-1">
                <span className="font-label-caps text-primary text-[11px] uppercase tracking-widest">45' BREAK</span>
              </div>
              <p className="font-body-md text-primary font-bold">Half Time</p>
              <p className="font-body-md text-on-surface-variant text-sm">Score: 1 - 1</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] p-6 border border-outline-variant/20">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-sm text-[24px] text-primary font-bold">Performance Breakdown</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Kensington</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Belgravia</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-label-caps text-[11px] mb-2 uppercase tracking-widest">
                  <span>Possession</span>
                  <span>{matchData.stats.possession.home}% — {matchData.stats.possession.away}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden flex">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${matchData.stats.possession.home}%` }}></div>
                  <div className="h-full bg-secondary transition-all duration-1000" style={{ width: `${matchData.stats.possession.away}%` }}></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-outline-variant/20">
                <div className="text-center">
                  <p className="font-label-caps text-on-surface-variant text-[10px] mb-1 uppercase tracking-widest">Shots (Target)</p>
                  <p className="font-headline-sm text-[24px] text-primary font-bold">
                    {matchData.stats.shots.home} ({matchData.stats.shotsOnTarget.home}) <span className="text-on-surface-variant font-normal text-sm">— {matchData.stats.shots.away} ({matchData.stats.shotsOnTarget.away})</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-label-caps text-on-surface-variant text-[10px] mb-1 uppercase tracking-widest">Pass Accuracy</p>
                  <p className="font-headline-sm text-[24px] text-primary font-bold">
                    {matchData.stats.passAccuracy.home}% <span className="text-on-surface-variant font-normal text-sm">— {matchData.stats.passAccuracy.away}%</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-label-caps text-on-surface-variant text-[10px] mb-1 uppercase tracking-widest">Expected Goals</p>
                  <p className="font-headline-sm text-[24px] text-primary font-bold">
                    {matchData.stats.xg.home} <span className="text-on-surface-variant font-normal text-sm">— {matchData.stats.xg.away}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] p-6 border-l-4 border-secondary border-y border-r border-outline-variant/20">
              <h4 className="font-label-caps text-[11px] text-on-surface-variant mb-4 uppercase tracking-widest">Total Corners</h4>
              <div className="flex items-end gap-2">
                <span className="font-display-lg text-4xl text-primary font-bold">{matchData.stats.corners.home + matchData.stats.corners.away}</span>
                <span className="font-body-md text-on-surface-variant pb-1">Ken ({matchData.stats.corners.home}) | Bel ({matchData.stats.corners.away})</span>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({length: matchData.stats.corners.home}).map((_, i) => (
                  <div key={`h-${i}`} className="h-1 flex-1 bg-primary rounded-full"></div>
                ))}
                {Array.from({length: matchData.stats.corners.away}).map((_, i) => (
                  <div key={`a-${i}`} className="h-1 flex-1 bg-secondary rounded-full"></div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] p-6 border-l-4 border-error border-y border-r border-outline-variant/20">
              <h4 className="font-label-caps text-[11px] text-on-surface-variant mb-4 uppercase tracking-widest">Total Fouls</h4>
              <div className="flex items-end gap-2">
                <span className="font-display-lg text-4xl text-primary font-bold">{matchData.stats.fouls.home + matchData.stats.fouls.away}</span>
                <span className="font-body-md text-on-surface-variant pb-1">Bel ({matchData.stats.fouls.away}) | Ken ({matchData.stats.fouls.home})</span>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({length: matchData.stats.fouls.home}).map((_, i) => (
                  <div key={`h-${i}`} className="h-1 flex-1 bg-primary/20 rounded-full"></div>
                ))}
                {Array.from({length: matchData.stats.fouls.away}).map((_, i) => (
                  <div key={`a-${i}`} className="h-1 flex-1 bg-error rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
