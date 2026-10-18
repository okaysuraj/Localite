import { useNavigate } from 'react-router-dom';
import { Users, Star, Lightning, CalendarBlank } from '@phosphor-icons/react';

export default function EngagementStatsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-bg min-h-screen py-10 px-6">
      <div className="max-w-content mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-display font-semibold text-fg tracking-tight">
              Community Engagement
            </h1>
            <p className="text-sm text-fg-muted mt-1">
              Overview of your interaction frequency, peer connections, and participation momentum.
            </p>
          </div>

          <button
            onClick={() => navigate('/events')}
            className="px-4 py-2 text-xs font-mono bg-accent text-white rounded-btn hover:opacity-90 transition-opacity self-start md:self-auto"
          >
            Explore Gatherings
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Trust Index</span>
              <Star size={16} className="text-accent fill-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">98 / 100</p>
            <span className="text-[11px] font-mono text-accent">Top 5% of community</span>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Attendance Rate</span>
              <CalendarBlank size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">94%</p>
            <span className="text-[11px] font-mono text-fg-muted">16 out of 17 RSVP'd</span>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Local Connections</span>
              <Users size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">42</p>
            <span className="text-[11px] font-mono text-accent">+8 this quarter</span>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Engagement Tier</span>
              <Lightning size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">Active Peer</p>
            <span className="text-[11px] font-mono text-fg-muted">Tier 2 contributor</span>
          </div>
        </div>

        {/* Breakdown Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white border border-border rounded-card p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              Participation Rhythm
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-fg font-medium">Sports & Active Matches</span>
                  <span className="text-fg-muted">65% of your activity</span>
                </div>
                <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden border border-border">
                  <div className="bg-accent h-full rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-fg font-medium">Community Socials & Meetups</span>
                  <span className="text-fg-muted">25% of your activity</span>
                </div>
                <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden border border-border">
                  <div className="bg-accent h-full rounded-full" style={{ width: '25%' }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-fg font-medium">Hosted Events</span>
                  <span className="text-fg-muted">10% of your activity</span>
                </div>
                <div className="w-full bg-bg-subtle h-2 rounded-full overflow-hidden border border-border">
                  <div className="bg-accent h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-border rounded-card p-6 space-y-4">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              Community Milestones
            </h2>

            <div className="space-y-3 divide-y divide-border/60">
              <div className="pt-2 first:pt-0 space-y-1">
                <p className="text-xs font-mono text-accent font-medium">Reliable Attendee</p>
                <p className="text-xs text-fg leading-relaxed">
                  Attended 10 consecutive events without any cancellation.
                </p>
              </div>

              <div className="pt-3 space-y-1">
                <p className="text-xs font-mono text-accent font-medium">First-time Host</p>
                <p className="text-xs text-fg leading-relaxed">
                  Successfully organized and hosted your first local gathering.
                </p>
              </div>

              <div className="pt-3 space-y-1">
                <p className="text-xs font-mono text-fg-muted font-medium">Sports Leader (In Progress)</p>
                <p className="text-xs text-fg-muted leading-relaxed">
                  Host 3 more football or badminton games to unlock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
