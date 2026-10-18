import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Broadcast, 
  Clock, 
  MapPin, 
  Users, 
  ArrowLeft, 
  CheckCircle, 
  MagnifyingGlass, 
  Sparkle, 
  Megaphone,
  NavigationArrow
} from '@phosphor-icons/react';

export default function LiveEventDashboardPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [countdown, setCountdown] = useState({ min: 14, sec: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.sec === 0) {
          if (prev.min === 0) return prev;
          return { min: prev.min - 1, sec: 59 };
        }
        return { ...prev, sec: prev.sec - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-8 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-6">
        {/* Top Control Bar */}
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
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="text-2xl sm:text-3xl font-serif text-[var(--fg)]">Vintage Garden Soirée — Live Console</h1>
            </div>
            <p className="text-xs text-[var(--fg-muted)] flex items-center gap-1.5">
              <MapPin size={14} className="text-[var(--fg)]" />
              The Glasshouse Pavilion, Chelsea • Live Coordination Mode
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => navigate(`/events/${eventId || '1'}/checkin`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-card border border-[var(--border)] bg-white text-xs font-mono uppercase tracking-wider text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              Arrival Scanner
            </button>
            <button 
              type="button"
              onClick={() => alert('Announcement broadcast to all checked-in attendees!')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
            >
              <Megaphone size={16} />
              Broadcast Alert
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Venue & Floorplan Area */}
          <div className="lg:col-span-8 bg-white rounded-card border border-[var(--border)] overflow-hidden flex flex-col h-[460px] relative">
            <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-white z-10">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Interactive Spatial Layout</span>
              <div className="flex items-center gap-3 text-xs font-mono text-[var(--fg-muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" /> VIP Pavilion
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-stone-700" /> Dining
                </span>
              </div>
            </div>

            <div className="flex-1 relative bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200" 
                alt="Venue Layout" 
                className="w-full h-full object-cover opacity-20 filter grayscale" 
              />
              
              {/* Floorplan Markers */}
              <div className="absolute top-[35%] left-[40%] flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[var(--accent)] border-2 border-white shadow-md animate-ping" />
                <span className="text-[10px] font-mono bg-white/90 border border-[var(--border)] px-1.5 py-0.5 rounded-card mt-1">Main Stage</span>
              </div>

              <div className="absolute top-[60%] left-[25%] flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-md" />
                <span className="text-[10px] font-mono bg-white/90 border border-[var(--border)] px-1.5 py-0.5 rounded-card mt-1">Reception</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-[var(--border)] px-3 py-1.5 rounded-card text-xs font-mono text-[var(--fg)]">
                Active Zone: Courtyard Garden
              </div>
            </div>
          </div>

          {/* Right: Milestone & Live Guests */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Milestone Card */}
            <div className="bg-[var(--fg)] text-white rounded-card p-6 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-1">Current Milestone</p>
                <h3 className="text-xl font-serif text-white">Curated Champagne Toast</h3>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-bold text-[var(--accent)]">
                  {countdown.min}:{countdown.sec.toString().padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-white/60 uppercase">min remaining</span>
              </div>

              <button 
                type="button"
                onClick={() => alert('Announcement sent!')}
                className="w-full py-2.5 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
              >
                Send Milestone Cue
              </button>
            </div>

            {/* Live Guest List Mini */}
            <div className="bg-white rounded-card border border-[var(--border)] p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Live Attendees</span>
                <span className="text-xs font-mono text-[var(--accent)] font-medium">142 Checked In</span>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-48 pr-1">
                {[
                  { name: 'Julian Thorne', table: 'VVIP • Table 04', status: 'Arrived' },
                  { name: 'Elena Rossi', table: 'Terrace • General', status: 'En Route' },
                  { name: 'Marcus Finch', table: 'Lounge • Table 01', status: 'Arrived' }
                ].map((guest, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-card hover:bg-[var(--bg-subtle)] text-xs transition-colors">
                    <div>
                      <p className="font-medium text-[var(--fg)]">{guest.name}</p>
                      <p className="text-[10px] font-mono text-[var(--fg-muted)]">{guest.table}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-card text-[10px] font-mono uppercase ${
                      guest.status === 'Arrived' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {guest.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex justify-between items-center text-xs font-mono text-[var(--fg-muted)]">
                <span>Arrival Ratio</span>
                <span className="text-[var(--fg)] font-medium">78%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-card border border-[var(--border)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-muted)] block">Capacity Status</span>
            <span className="text-lg font-serif text-[var(--fg)] mt-1 block">142 / 180</span>
          </div>
          <div className="bg-white p-4 rounded-card border border-[var(--border)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-muted)] block">Concierge Alerts</span>
            <span className="text-lg font-serif text-[var(--accent)] mt-1 block">02 Open</span>
          </div>
          <div className="bg-white p-4 rounded-card border border-[var(--border)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-muted)] block">Active Staff</span>
            <span className="text-lg font-serif text-[var(--fg)] mt-1 block">08 Leads</span>
          </div>
          <div className="bg-white p-4 rounded-card border border-[var(--border)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-muted)] block">Event Duration</span>
            <span className="text-lg font-serif text-[var(--fg)] mt-1 block">02h 45m</span>
          </div>
        </div>
      </main>
    </div>
  );
}
