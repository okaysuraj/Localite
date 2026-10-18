import { ShieldCheck, Star } from '@phosphor-icons/react';

export default function ReputationReviewsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-24 pb-16 px-6 max-w-7xl mx-auto font-sans animate-fade-in">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Trust & Community Standing
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Reputation & Vetting
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
            Verified peer feedback, attendance integrity, and host endorsements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Review request link generated and copied to clipboard.')}
            className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm transition-all active:scale-95"
          >
            Request Endorsement
          </button>
        </div>
      </header>

      {/* Metrics Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Overall Standing Card */}
        <div className="md:col-span-2 bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] tracking-wider mb-1">
                  Overall Reliability
                </p>
                <h3 className="text-2xl font-semibold text-[var(--fg)]">Exemplary Standing</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold uppercase tracking-wider">
                Top 2% in District
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-6xl font-bold tracking-tight text-[var(--fg)]">98</span>
              <span className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider">
                / 100 Score
              </span>
            </div>

            <div className="w-full bg-[var(--bg-subtle)] h-2 rounded-full overflow-hidden mb-6">
              <div className="bg-[var(--accent)] h-full rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border)] text-xs">
            <div>
              <p className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] mb-0.5">Attendance</p>
              <p className="font-semibold text-emerald-600 text-sm">100%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] mb-0.5">
                Host Vouches
              </p>
              <p className="font-semibold text-[var(--fg)] text-sm">42 Endorsements</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] mb-0.5">
                Etiquette Violations
              </p>
              <p className="font-semibold text-[var(--fg)] text-sm">0 Reported</p>
            </div>
          </div>
        </div>

        {/* Code of Conduct Badge */}
        <div className="bg-[var(--fg)] text-white rounded-card p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-card bg-white/10 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck size={24} weight="fill" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Verified Noble Standing</h3>
            <p className="text-xs text-white/75 leading-relaxed">
              Your profile satisfies every requirement under the Localite Safety Standard. You are qualified
              for automated fast-track approval on high-demand private gatherings.
            </p>
          </div>

          <div className="pt-6 border-t border-white/15 flex items-center justify-between text-[11px] text-white/60">
            <span>Audit Cycle: Automated</span>
            <span className="text-emerald-400 font-semibold">Active</span>
          </div>
        </div>
      </section>

      {/* Peer Endorsements List */}
      <section className="space-y-6">
        <h3 className="text-base font-semibold text-[var(--fg)]">Recent Host & Peer Endorsements</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              author: 'Aarav Mehta',
              role: 'Tournament Host • Bandra Court',
              text: 'Exceptional competitor and gracious presence. Arrived exactly on time, respected the court facilities, and brought great energy to the tournament.',
              date: '2 weeks ago',
              rating: 5,
            },
            {
              author: 'Elena Vance',
              role: 'Literary Salon Host • Colaba',
              text: 'A pleasure to host. Thoughtful contributions to the discussion and complete respect for private salon boundaries.',
              date: '1 month ago',
              rating: 5,
            },
            {
              author: 'Devika Singhania',
              role: 'Co-organizer • Sunrise Run Club',
              text: 'Consistently reliable sparring partner. Encouraged new members and ensured the group stayed cohesive throughout the 10K session.',
              date: '2 months ago',
              rating: 5,
            },
            {
              author: 'Rohan Kapoor',
              role: 'Host • Rooftop Squash Series',
              text: 'High-caliber play and exemplary sportsmanship. Eager to welcome back anytime.',
              date: '3 months ago',
              rating: 5,
            },
          ].map((review, i) => (
            <div
              key={i}
              className="p-6 bg-[var(--bg)] rounded-card border border-[var(--border)] flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--fg)]">{review.author}</h4>
                    <p className="text-[11px] text-[var(--fg-muted)]">{review.role}</p>
                  </div>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={14} weight="fill" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[var(--fg-muted)] leading-relaxed italic">"{review.text}"</p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[var(--fg-muted)] pt-3 border-t border-[var(--border)]">
                <span>Verified Match Endorsement</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
