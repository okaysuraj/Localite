import { useNavigate } from 'react-router-dom';
import { CalendarBlank, MapPin, Users, DownloadSimple, ArrowLeft, Star } from '@phosphor-icons/react';

export default function EventInsightsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-2"
            >
              <ArrowLeft size={16} />
              Return
            </button>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
              Post-Event Archive
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">Gathering Impact Report</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--fg-muted)] pt-1">
              <span className="flex items-center gap-1.5">
                <CalendarBlank size={14} className="text-[var(--fg)]" />
                Oct 24, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[var(--fg)]" />
                Chelsea Conservatory, NY
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-[var(--fg)]" />
                78 Verified Attendees
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('PDF export generated.')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-card border border-[var(--border)] bg-white text-xs font-mono uppercase tracking-wider text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors self-start sm:self-auto"
          >
            <DownloadSimple size={16} />
            Export Archive
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Velocity Bar Chart */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-card p-6 border border-[var(--border)] space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-serif text-[var(--fg)]">Attendance Velocity</h3>
                <p className="text-xs font-mono text-[var(--fg-muted)] mt-0.5">
                  Real-time arrival rate throughout the evening
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--accent)]">Peak: 21:30</span>
            </div>

            <div className="h-52 flex items-end justify-between gap-3 pt-4 px-2">
              {[
                { time: '18:00', pct: 25 },
                { time: '19:00', pct: 55 },
                { time: '20:00', pct: 88, highlight: true },
                { time: '21:00', pct: 98, top: true },
                { time: '22:00', pct: 80 },
                { time: '23:00', pct: 40 },
              ].map((slot, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-[var(--bg-subtle)] rounded-t-card h-40 flex items-end p-1">
                    <div
                      className={`w-full rounded-t-card transition-all duration-500 ${
                        slot.top ? 'bg-[var(--accent)]' : slot.highlight ? 'bg-[var(--fg)]' : 'bg-stone-300'
                      }`}
                      style={{ height: `${slot.pct}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[var(--fg-muted)]">{slot.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Satisfaction Score */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-card p-6 border border-[var(--border)] flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block mb-1">
                Attendee Sentiment
              </span>
              <h3 className="text-lg font-serif text-[var(--fg)]">Satisfaction Score</h3>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">Post-event rating and host score impact</p>
            </div>

            <div className="text-center py-2">
              <span className="text-5xl font-mono font-bold text-[var(--fg)] block">9.8</span>
              <div className="flex items-center justify-center gap-1 text-[var(--accent)] mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} weight="fill" />
                ))}
              </div>
              <span className="text-[11px] font-mono text-[var(--fg-muted)] mt-1 block">
                Based on 64 community reviews
              </span>
            </div>

            <div className="p-3.5 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] text-xs text-[var(--fg-muted)] italic">
              &ldquo;The atmosphere and seating layout fostered incredible neighborhood conversation.&rdquo;
            </div>
          </div>

          {/* Key Insights & Highlights */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-card border border-[var(--border)] space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                Check-in Efficiency
              </span>
              <p className="text-2xl font-mono text-[var(--fg)] font-medium">98.4%</p>
              <p className="text-xs text-[var(--fg-muted)]">Average gate scan time: 1.2 seconds</p>
            </div>
            <div className="bg-white p-5 rounded-card border border-[var(--border)] space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                Repeat Members
              </span>
              <p className="text-2xl font-mono text-[var(--fg)] font-medium">42 Guests</p>
              <p className="text-xs text-[var(--fg-muted)]">Over 50% attended past events with this host</p>
            </div>
            <div className="bg-white p-5 rounded-card border border-[var(--border)] space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                Host Reputation XP
              </span>
              <p className="text-2xl font-mono text-[var(--accent)] font-medium">+350 XP</p>
              <p className="text-xs text-[var(--fg-muted)]">Awarded for high attendance rating</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
