import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getLeaderboard } from '../../services/api';
import { Trophy, Star, Sparkle, Crown, Medal, CheckCircle, ArrowRight } from '@phosphor-icons/react';

export default function PrestigeProgressPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState(1);
  const [eventsHosted, setEventsHosted] = useState(0);

  useEffect(() => {
    const fetchGamificationData = async () => {
      try {
        const [userData, lb] = await Promise.all([
          getCurrentUser().catch(() => null),
          getLeaderboard('all').catch(() => []),
        ]);
        if (userData) {
          const userXp = userData.xp || 0;
          setXp(userXp);
          setEventsHosted(userData.eventsHosted || 0);
          const maxXp = 5000;
          const currentProgress = Math.min((userXp / maxXp) * 100, 100);
          setProgress(Math.round(currentProgress));

          if (Array.isArray(lb) && lb.length > 0) {
            const userIndex = lb.findIndex(
              (item) => item.user?.id === userData.id || item.username === userData.username
            );
            setRank(userIndex >= 0 ? userIndex + 1 : 1);
          }
        }
      } catch (err) {
        console.error('Error fetching prestige data:', err);
      }
    };
    fetchGamificationData();
  }, []);

  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-24 pb-16 px-6 max-w-7xl mx-auto font-sans animate-fade-in">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Member Distinction
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Prestige & Standing
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
            Track your contributions, event attendance fidelity, and standing across local salons.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/network/honor')}
            className="px-4 py-2 border border-[var(--border)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-[var(--bg-subtle)] transition-colors"
          >
            Hall of Honor
          </button>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Prestige Card */}
        <section className="col-span-1 lg:col-span-8 bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Circular Progress Gauge */}
          <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                className="text-[var(--border)]"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                className="text-[var(--accent)]"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-semibold text-[var(--fg)]">{progress}%</span>
              <span className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] tracking-wider">
                Level 3
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                Current Standing
              </span>
              <h2 className="text-2xl font-semibold text-[var(--fg)]">Vetted Patron</h2>
              <p className="text-xs text-[var(--fg-muted)] mt-1 leading-relaxed">
                You have accumulated{' '}
                <strong className="text-[var(--fg)] font-semibold">{xp.toLocaleString()} XP</strong>. Earn
                4,200 more XP to achieve Distinguished Fellow tier and unlock priority reservations.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[var(--bg-subtle)] p-3 rounded-card border border-[var(--border)]">
                <p className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] mb-0.5">
                  District Rank
                </p>
                <p className="text-base font-semibold text-[var(--fg)]">#{rank}</p>
              </div>
              <div className="bg-[var(--bg-subtle)] p-3 rounded-card border border-[var(--border)]">
                <p className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] mb-0.5">
                  Gatherings
                </p>
                <p className="text-base font-semibold text-[var(--fg)]">{eventsHosted} Hosted</p>
              </div>
              <div className="bg-[var(--bg-subtle)] p-3 rounded-card border border-[var(--border)]">
                <p className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] mb-0.5">Fidelity</p>
                <p className="text-base font-semibold text-emerald-600">98%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Tier Privileges */}
        <section className="col-span-1 lg:col-span-4 bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
              <Crown size={16} weight="fill" />
              <span>Next Tier Perks</span>
            </div>
            <h3 className="text-lg font-semibold text-[var(--fg)] mb-4">Distinguished Fellow</h3>
            <ul className="space-y-3 text-xs text-[var(--fg-muted)]">
              <li className="flex items-center gap-2">
                <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                <span>Priority booking window (48h advance access)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                <span>Host private matches with zero platform platform fee</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={15} weight="fill" className="text-emerald-600 shrink-0" />
                <span>Distinguished crest on public and attendee rosters</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/events')}
            className="w-full mt-6 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>Explore Gatherings</span>
            <ArrowRight size={14} />
          </button>
        </section>

        {/* Milestones Timeline */}
        <section className="col-span-1 lg:col-span-12 bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8">
          <h3 className="text-base font-semibold text-[var(--fg)] mb-6">Recent Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: 'The Punctual Host',
                desc: 'Hosted 5 gatherings with 100% on-time start records.',
                date: 'Aug 2024',
                icon: Trophy,
              },
              {
                title: 'Sparring Partner',
                desc: 'Completed 10 competitive tennis & squash sessions.',
                date: 'Jul 2024',
                icon: Medal,
              },
              {
                title: 'Grace & Fidelity',
                desc: 'Maintained zero unannounced cancellations over 90 days.',
                date: 'Jun 2024',
                icon: Star,
              },
              {
                title: 'Civic Connector',
                desc: 'Nominated 3 members who successfully gained entry.',
                date: 'May 2024',
                icon: Sparkle,
              },
            ].map((milestone, idx) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-3">
                      <Icon size={18} weight="fill" />
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--fg)] mb-1">{milestone.title}</h4>
                    <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">{milestone.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-wider mt-4 block">
                    {milestone.date}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
