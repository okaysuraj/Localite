import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  ChartBar, 
  SoccerBall, 
  Sparkle 
} from '@phosphor-icons/react';

export default function LiveMatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      corners: { home: 6, away: 3 },
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMatchData((prev) => {
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
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-8 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-6">
        {/* Navigation */}
        <button 
          type="button" 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Match Lobby
        </button>

        {/* Minimalist Editorial Scoreboard */}
        <div className="bg-[var(--fg)] text-white rounded-card p-6 sm:p-10 relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Division Play
            </span>
            <span className="text-white/60">Match #{id || '104'}</span>
          </div>

          <div className="py-8 grid grid-cols-3 items-center text-center gap-4">
            {/* Home */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">Home Club</span>
              <h2 className="text-xl sm:text-2xl font-serif text-white">{matchData.homeTeam}</h2>
              <span className="text-xs font-mono text-[var(--accent)]">Premier Flight</span>
            </div>

            {/* Score & Time */}
            <div className="space-y-2">
              <div className="text-4xl sm:text-6xl font-mono font-bold tracking-tight text-white">
                {matchData.homeScore} : {matchData.awayScore}
              </div>
              <span className="inline-block px-3 py-1 rounded-card bg-white/10 text-xs font-mono text-white/90">
                {matchData.time}
              </span>
            </div>

            {/* Away */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">Away Club</span>
              <h2 className="text-xl sm:text-2xl font-serif text-white">{matchData.awayTeam}</h2>
              <span className="text-xs font-mono text-white/60">Premier Flight</span>
            </div>
          </div>
        </div>

        {/* Match Statistics & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Live Timeline */}
          <div className="lg:col-span-5 bg-white rounded-card border border-[var(--border)] p-6 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Key Match Events</h3>

            <div className="space-y-4 text-xs font-mono">
              {[
                { time: "68'", team: 'Kensington', text: 'Goal! Header by L. Vance from cross.', icon: SoccerBall },
                { time: "54'", team: 'Belgravia', text: 'Yellow Card for tackle outside the box.', icon: ShieldCheck },
                { time: "22'", team: 'Belgravia', text: 'Goal! Penalty scored into bottom right.', icon: SoccerBall },
                { time: "11'", team: 'Kensington', text: 'Goal! Low strike from distance.', icon: SoccerBall },
              ].map((ev, i) => {
                const Icon = ev.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)]">
                    <span className="text-sm font-bold text-[var(--accent)]">{ev.time}</span>
                    <div className="flex-1">
                      <p className="font-medium text-[var(--fg)]">{ev.team}</p>
                      <p className="text-[11px] text-[var(--fg-muted)] mt-0.5">{ev.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Match Stats */}
          <div className="lg:col-span-7 bg-white rounded-card border border-[var(--border)] p-6 space-y-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Statistical Overview</h3>

            <div className="space-y-4 text-xs font-mono">
              {[
                { label: 'Possession', home: `${matchData.stats.possession.home}%`, away: `${matchData.stats.possession.away}%`, homePct: matchData.stats.possession.home },
                { label: 'Total Shots', home: matchData.stats.shots.home, away: matchData.stats.shots.away, homePct: 60 },
                { label: 'Shots on Target', home: matchData.stats.shotsOnTarget.home, away: matchData.stats.shotsOnTarget.away, homePct: 70 },
                { label: 'Passing Accuracy', home: `${matchData.stats.passAccuracy.home}%`, away: `${matchData.stats.passAccuracy.away}%`, homePct: 52 },
                { label: 'Corner Kicks', home: matchData.stats.corners.home, away: matchData.stats.corners.away, homePct: 66 },
              ].map((stat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[var(--fg)]">
                    <span className="font-medium">{stat.home}</span>
                    <span className="text-[var(--fg-muted)] uppercase text-[10px]">{stat.label}</span>
                    <span className="font-medium">{stat.away}</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--bg-subtle)] rounded-full overflow-hidden flex">
                    <div className="bg-[var(--accent)] h-full" style={{ width: `${stat.homePct}%` }} />
                    <div className="bg-stone-300 h-full flex-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
