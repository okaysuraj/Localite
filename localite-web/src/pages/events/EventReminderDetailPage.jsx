import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  CalendarBlank, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  QrCode, 
  ShieldCheck, 
  Sparkle, 
  CoatHanger,
  NavigationArrow 
} from '@phosphor-icons/react';

export default function EventReminderDetailPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes((prev) => {
        if (prev === 0) {
          if (hours > 0) {
            setHours((h) => h - 1);
            return 59;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [hours]);

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <button 
          type="button" 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Agenda
        </button>

        {/* Hero Card */}
        <div className="rounded-card border border-[var(--border)] overflow-hidden bg-white shadow-sm">
          <div className="h-64 sm:h-72 w-full relative bg-[var(--bg-subtle)]">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" 
              alt="Event Hero" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-card">
                  Confirmed Entry
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif text-white">The Winter Masquerade Salon</h1>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Countdown Banner */}
            <div className="p-5 rounded-card border border-[var(--border)] bg-[var(--bg-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block mb-0.5">
                  Live Countdown
                </span>
                <p className="text-xl font-serif text-[var(--fg)]">
                  Gathering begins in {hours}h {minutes}m
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/events/${eventId || '1'}/ticket`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
                >
                  <QrCode size={16} />
                  View Ticket Pass
                </button>
              </div>
            </div>

            {/* Logistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-card border border-[var(--border)] space-y-1.5">
                <div className="flex items-center gap-2 text-[var(--fg)] font-medium">
                  <CalendarBlank size={16} className="text-[var(--accent)]" />
                  <span>Thursday, Oct 24, 2026</span>
                </div>
                <p className="text-[var(--fg-muted)] pl-6">Doors open at 19:30 • Program begins at 20:00</p>
              </div>

              <div className="p-4 rounded-card border border-[var(--border)] space-y-1.5">
                <div className="flex items-center gap-2 text-[var(--fg)] font-medium">
                  <MapPin size={16} className="text-[var(--accent)]" />
                  <span>The Glass Conservatory, Chelsea</span>
                </div>
                <p className="text-[var(--fg-muted)] pl-6">North Pavilion Gate • Valet available</p>
              </div>
            </div>

            {/* Protocol Advice */}
            <div className="p-5 rounded-card border border-[var(--border)] bg-white space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Arrival Protocol</h3>
              <div className="space-y-2 text-xs text-[var(--fg-muted)]">
                <div className="flex items-start gap-2.5">
                  <CoatHanger size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>Attire: Smart evening attire or mask optional. Complimentary coat check on arrival.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>Gate Security: Please have your digital member QR pass ready for instant check-in.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
