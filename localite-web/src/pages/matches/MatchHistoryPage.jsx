import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Star, Fire, Medal } from '@phosphor-icons/react';

export default function MatchHistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ALL DISCIPLINES');

  const matchHistory = [
    {
      id: 1,
      sport: 'Tennis Championship',
      title: 'Wimbledon Courtyard Invitational',
      date: 'May 14, 2026',
      result: 'VICTORY',
      homeScore: 6,
      awayScore: 4,
      mvp: 'Julian Sterling',
      notes: 'Exceptional court coverage and backhand precision during the deciding set.',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      sport: 'Squash League',
      title: 'Midnight Circuit: Round 3',
      date: 'May 08, 2026',
      result: 'DEFEAT',
      homeScore: 11,
      awayScore: 13,
      mvp: 'Marcello Rossi',
      notes: 'Tight match decided by defensive errors in the final few points.',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-2"
            >
              <ArrowLeft size={16} />
              Return
            </button>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
              Personal Record
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">Season Match Chronicles</h1>
            <p className="text-xs sm:text-sm text-[var(--fg-muted)] max-w-xl mt-1">
              Historic record of all competitive league matchups, scoring tallies, and host notes.
            </p>
          </div>
        </div>

        {/* Stats Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border border-[var(--border)] space-y-1">
            <Trophy size={20} className="text-[var(--accent)]" />
            <p className="text-2xl font-mono text-[var(--fg)] font-medium">42</p>
            <p className="text-[11px] font-mono uppercase text-[var(--fg-muted)]">Total Matches</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)] space-y-1">
            <Medal size={20} className="text-[var(--accent)]" />
            <p className="text-2xl font-mono text-[var(--accent)] font-medium">68%</p>
            <p className="text-[11px] font-mono uppercase text-[var(--fg-muted)]">Win Ratio</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)] space-y-1">
            <Star size={20} className="text-[var(--accent)]" />
            <p className="text-2xl font-mono text-[var(--fg)] font-medium">12</p>
            <p className="text-[11px] font-mono uppercase text-[var(--fg-muted)]">MVP Citations</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)] space-y-1">
            <Fire size={20} className="text-amber-600" />
            <p className="text-2xl font-mono text-[var(--fg)] font-medium">5 W</p>
            <p className="text-[11px] font-mono uppercase text-[var(--fg-muted)]">Active Streak</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['ALL DISCIPLINES', 'TENNIS', 'SQUASH', 'PADDLE'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-card text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[var(--fg)] text-white font-medium'
                  : 'bg-white border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Match Records List */}
        <div className="space-y-6">
          {matchHistory.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-card border border-[var(--border)] overflow-hidden flex flex-col md:flex-row hover:border-[var(--fg-muted)] transition-colors"
            >
              <div className="md:w-64 h-48 md:h-auto bg-[var(--bg-subtle)] shrink-0 overflow-hidden">
                <img src={match.image} alt={match.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-[var(--accent)]">
                      {match.sport}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-card text-[10px] font-mono uppercase ${
                        match.result === 'VICTORY'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-stone-100 text-stone-600 border border-stone-200'
                      }`}
                    >
                      {match.result}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-[var(--fg)]">{match.title}</h3>
                  <p className="text-xs font-mono text-[var(--fg-muted)]">{match.date}</p>
                </div>

                <div className="py-3 border-y border-[var(--border)] flex items-center justify-around text-center">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[var(--fg-muted)] block">
                      Your Score
                    </span>
                    <span className="text-3xl font-mono font-bold text-[var(--fg)]">{match.homeScore}</span>
                  </div>
                  <span className="text-xs font-mono text-[var(--fg-muted)]">vs</span>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[var(--fg-muted)] block">
                      Opponent
                    </span>
                    <span className="text-3xl font-mono font-bold text-[var(--fg-muted)]">
                      {match.awayScore}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[var(--fg-muted)]">
                  <div className="flex items-center gap-1.5 font-medium text-[var(--fg)]">
                    <Star size={14} className="text-[var(--accent)]" weight="fill" />
                    <span>MVP: {match.mvp}</span>
                  </div>
                  <p className="italic text-[11px] leading-relaxed max-w-md">&ldquo;{match.notes}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
