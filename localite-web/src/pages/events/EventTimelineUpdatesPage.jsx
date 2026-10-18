import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Broadcast, 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  Camera, 
  PaperPlaneTilt, 
  Users, 
  Sparkle 
} from '@phosphor-icons/react';

export default function EventTimelineUpdatesPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [updateText, setUpdateText] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    if (!updateText.trim()) return;
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setUpdateText('');
      alert('Timeline update posted.');
    }, 800);
  };

  const timelineItems = [
    {
      time: '19:30',
      status: 'Completed',
      title: 'Grand Conservatory Doors Open',
      desc: 'Guests transitioned into main gallery foyer. Concierge verification completed.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600'
    },
    {
      time: '20:15',
      status: 'In Progress',
      title: 'Curated Welcome Toast & Duo Performance',
      desc: 'Chamber strings duo initiated set. First seasonal tasting course served.'
    },
    {
      time: '21:00',
      status: 'Upcoming',
      title: 'Salon Keynote & Community Discussion',
      desc: 'Guest speakers assembling in the north alcove.'
    }
  ];

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-8 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-1"
            >
              <ArrowLeft size={16} />
              Return
            </button>
            <h1 className="text-2xl sm:text-3xl font-serif text-[var(--fg)]">Live Event Timeline & Broadcasts</h1>
            <p className="text-xs text-[var(--fg-muted)]">Post real-time status cues and track milestone progression for guests.</p>
          </div>

          <button 
            type="button" 
            onClick={() => navigate('/events/1/live/dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors self-start sm:self-auto"
          >
            <Broadcast size={16} />
            Live Console
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Timeline Feed */}
          <section className="lg:col-span-5 bg-white rounded-card border border-[var(--border)] p-6 space-y-6">
            <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--fg-muted)]">Event Sequence</h2>

            <div className="space-y-6 relative pl-4 border-l border-[var(--border)]">
              {timelineItems.map((item, idx) => (
                <div key={idx} className="relative group space-y-2">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--accent)] border-2 border-white ring-1 ring-[var(--border)]" />
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--fg)] font-medium">{item.time}</span>
                    <span className={`px-2 py-0.5 rounded-card text-[10px] uppercase ${
                      item.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : item.status === 'In Progress' 
                        ? 'bg-[var(--accent)]/10 text-[var(--accent)]' 
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-[var(--fg)]">{item.title}</h3>
                  <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{item.desc}</p>
                  {item.image && (
                    <div className="h-32 rounded-card overflow-hidden border border-[var(--border)] mt-2">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Broadcast Composer */}
          <section className="lg:col-span-7 bg-white rounded-card border border-[var(--border)] p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block">Live Broadcast</span>
              <h2 className="text-lg font-serif text-[var(--fg)]">Post Milestone Announcement</h2>
              <p className="text-xs text-[var(--fg-muted)]">Updates appear immediately in all attendee feeds and on venue displays.</p>
            </div>

            <div className="space-y-4">
              <textarea 
                rows="4"
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                placeholder="Share a timely update with your attendees (e.g. Tasting flight commencing on the terrace)..."
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-4 text-xs sm:text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors resize-none"
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert('Photo upload simulated')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-card border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
                >
                  <Camera size={16} />
                  Attach Photo
                </button>

                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isPublishing || !updateText.trim()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors disabled:opacity-50"
                >
                  <PaperPlaneTilt size={16} />
                  {isPublishing ? 'Broadcasting...' : 'Broadcast to Guests'}
                </button>
              </div>
            </div>

            {/* Quick Pulse Metrics */}
            <div className="pt-4 border-t border-[var(--border)] grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <span className="text-[10px] text-[var(--fg-muted)] uppercase block">Checked-In</span>
                <span className="text-sm font-medium text-[var(--fg)] mt-0.5 block">142 Guests</span>
              </div>
              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <span className="text-[10px] text-[var(--fg-muted)] uppercase block">Updates Sent</span>
                <span className="text-sm font-medium text-[var(--fg)] mt-0.5 block">08 Posts</span>
              </div>
              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <span className="text-[10px] text-[var(--fg-muted)] uppercase block">Staff On Gate</span>
                <span className="text-sm font-medium text-[var(--fg)] mt-0.5 block">04 Leads</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
