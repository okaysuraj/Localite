import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight, Clock, CalendarBlank, Info } from '@phosphor-icons/react';

export default function CreateEventDateTimePage() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(11);
  const [duration, setDuration] = useState('3 Hours');

  const days = Array.from({ length: 22 }, (_, i) => i + 1);

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--fg-muted)] mb-1">
            <span className="font-mono text-xs uppercase tracking-wider">Step 02 / 06</span>
            <div className="h-[1px] w-10 bg-[var(--border)]"></div>
          </div>
          <h1 className="text-3xl font-serif text-[var(--fg)]">Schedule Date & Time</h1>
          <p className="text-sm text-[var(--fg-muted)] max-w-2xl">
            Select the date and time window for your gathering. Clear scheduling helps attendees plan their attendance.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar Section */}
          <section className="lg:col-span-7 bg-white rounded-card border border-[var(--border)] p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-serif text-[var(--fg)]">Select Date</h2>
              <div className="flex items-center gap-3">
                <button type="button" className="p-1.5 border border-[var(--border)] rounded-card hover:border-[var(--fg)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
                  <CaretLeft size={16} />
                </button>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg)]">September 2026</span>
                <button type="button" className="p-1.5 border border-[var(--border)] rounded-card hover:border-[var(--fg)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
                  <CaretRight size={16} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-2 text-[11px] font-mono uppercase text-[var(--fg-muted)]">
                  {day}
                </div>
              ))}
              
              {[25, 26, 27, 28, 29, 30].map((day) => (
                <div key={`d-${day}`} className="py-3 text-xs text-[var(--fg-muted)]/30 cursor-not-allowed">
                  {day}
                </div>
              ))}

              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`py-3 text-xs font-mono rounded-card transition-colors ${
                    selectedDay === day
                      ? 'bg-[var(--accent)] text-white font-medium'
                      : 'hover:bg-[var(--bg-subtle)] text-[var(--fg)]'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </section>

          {/* Time & Duration Section */}
          <aside className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-card border border-[var(--border)] p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Start Time</h3>
              <div className="relative">
                <select className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors appearance-none cursor-pointer">
                  <option>19:00 (7:00 PM)</option>
                  <option>20:00 (8:00 PM)</option>
                  <option>21:00 (9:00 PM)</option>
                  <option>22:00 (10:00 PM)</option>
                </select>
                <Clock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--fg-muted)]" />
              </div>
              <p className="text-xs text-[var(--fg-muted)] flex items-center gap-1.5">
                <Info size={14} className="text-[var(--accent)] shrink-0" />
                Evening windows usually generate peak community attendance.
              </p>
            </div>

            <div className="bg-white rounded-card border border-[var(--border)] p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Expected Duration</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {['2 Hours', '3 Hours', '4 Hours', 'Open End'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setDuration(opt)}
                    className={`py-2.5 px-3 rounded-card text-xs font-mono transition-colors border ${
                      duration === opt 
                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-medium' 
                        : 'border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg-muted)]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & Continue Card */}
            <div className="bg-[var(--fg)] text-white rounded-card p-6 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">Timing Summary</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarBlank size={16} className="text-[var(--accent)] shrink-0" />
                    <span>Wed, Sept {selectedDay}, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Clock size={16} className="text-[var(--accent)] shrink-0" />
                    <span>19:00 — ({duration})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/events/create')}
                  className="p-3 rounded-card border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/events/create')}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-card bg-white text-[var(--fg)] text-xs font-mono uppercase tracking-wider hover:bg-white/90 transition-colors"
                >
                  Confirm Date & Time
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
