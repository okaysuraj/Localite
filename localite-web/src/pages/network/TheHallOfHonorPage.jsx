import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Sparkle, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle
} from '@phosphor-icons/react';

export default function TheHallOfHonorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-24 pb-16 px-6 max-w-7xl mx-auto font-sans animate-fade-in">
      
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            The Registry Archive
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            The Hall of Honor
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
            A permanent archive of distinguished sporting achievements and community milestones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/network/prestige')}
            className="px-4 py-2 border border-[var(--border)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-[var(--bg-subtle)] transition-colors"
          >
            Prestige Dashboard
          </button>
        </div>
      </header>

      {/* Featured Milestone Card */}
      <section className="mb-10 bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-600 shrink-0">
          <Trophy size={64} weight="fill" />
        </div>
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-700 text-[10px] font-semibold uppercase tracking-wider">
            <Sparkle size={12} weight="fill" />
            Featured Honor
          </div>
          <h2 className="text-2xl font-semibold text-[var(--fg)]">The Grand Tournament Champion</h2>
          <p className="text-xs md:text-sm text-[var(--fg-muted)] max-w-2xl leading-relaxed">
            Awarded for clinching the Metropolitan Inter-Club Tennis Doubles Championship with an undefeated set record. Commended for exemplary sportsmanship and community leadership.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[var(--fg-muted)] justify-center md:justify-start font-mono">
            <span>Conferred: Autumn 2024</span>
            <span>•</span>
            <span>Patronage: Royal Court Circle</span>
          </div>
        </div>
      </section>

      {/* Honors Bento Grid */}
      <section className="space-y-6">
        <h3 className="text-base font-semibold text-[var(--fg)]">Honors & Conferred Medals</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Master of the Table',
              cat: 'Athletic Excellence',
              desc: 'Champion of the Winter Table Tennis Invitational across 32 seeded players.',
              year: '2024',
              icon: Medal
            },
            {
              title: 'The Gracious Host',
              cat: 'Civic Leadership',
              desc: 'Hosted 25 consecutive cultural salons with 100% attendee satisfaction ratings.',
              year: '2024',
              icon: Crown
            },
            {
              title: 'Fidelity of Presence',
              cat: 'Community Standard',
              desc: 'Over 100 verified attendances with zero unexcused cancellations.',
              year: '2023',
              icon: ShieldCheck
            },
            {
              title: 'Pacesetter of the Court',
              cat: 'Endurance',
              desc: 'Completed 50 official squash spar matches within a single seasonal calendar.',
              year: '2023',
              icon: Trophy
            },
            {
              title: 'Fellow of the Salons',
              cat: 'Literary & Arts',
              desc: 'Curated 12 architectural walkabouts and historical salons in central districts.',
              year: '2023',
              icon: Star
            },
            {
              title: 'Founding Patron',
              cat: 'Honorary Order',
              desc: 'One of the inaugural 100 members who helped establish the Localite standard.',
              year: '2023',
              icon: Sparkle
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[var(--bg)] p-6 rounded-card border border-[var(--border)] hover:border-[var(--fg-muted)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                      <Icon size={20} weight="fill" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-wider bg-[var(--bg-subtle)] px-2 py-1 rounded">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">{item.cat}</p>
                  <h4 className="text-sm font-semibold text-[var(--fg)] mb-2">{item.title}</h4>
                  <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-emerald-600 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle size={14} weight="fill" /> Verified Credential
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
