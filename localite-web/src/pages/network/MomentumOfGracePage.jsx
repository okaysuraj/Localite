import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lightning, 
  CalendarCheck, 
  Sparkle, 
  TrendUp, 
  CheckCircle,
  CaretLeft,
  CaretRight,
  Medal,
  ArrowLeft
} from '@phosphor-icons/react';
import { getCurrentUser } from '../../services/api';

export default function MomentumOfGracePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch (err) {
        console.error('Failed to load user momentum:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const streak = user?.currentStreak || 0;
  const longestStreak = user?.longestStreak || streak;
  const eventsAttended = user?.eventsAttended || 0;

  // Generate calendar days
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-24 pb-16 px-6 max-w-7xl mx-auto font-sans animate-fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>
      
      {/* Top Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Habit & Attendance Fidelity
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Momentum of Grace
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
            Celebrating consistent presence, active salon participation, and athletic dedication.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-card bg-amber-400/10 border border-amber-400/20 text-amber-700">
            <Lightning size={18} weight="fill" />
            <span className="text-xs font-semibold uppercase tracking-wider">{streak} Day Active Streak</span>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Streak Calendar Section */}
        <section className="col-span-1 lg:col-span-8 bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--border)]">
            <div>
              <h3 className="text-base font-semibold text-[var(--fg)]">Active Gathering Streak</h3>
              <p className="text-xs text-[var(--fg-muted)]">Verified attendances and host check-ins.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button className="p-1 text-[var(--fg-muted)] hover:text-[var(--fg)]">
                <CaretLeft size={16} />
              </button>
              <span className="text-xs uppercase tracking-wider text-[var(--fg)]">Current Month</span>
              <button className="p-1 text-[var(--fg-muted)] hover:text-[var(--fg)]">
                <CaretRight size={16} />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] mb-3">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* 3 offset days for first week */}
            <div className="aspect-square opacity-0"></div>
            <div className="aspect-square opacity-0"></div>
            <div className="aspect-square opacity-0"></div>

            {daysInMonth.map(day => {
              const isActive = day <= 24 && day % 4 !== 0;
              const isToday = day === 16;
              return (
                <div 
                  key={day}
                  className={`aspect-square rounded-card border p-1.5 flex flex-col justify-between transition-colors ${
                    isToday
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-white font-semibold'
                      : isActive
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700'
                      : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg-muted)]'
                  }`}
                >
                  <span className="text-[11px] leading-none">{day}</span>
                  {isActive && !isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 self-end"></span>
                  )}
                  {isToday && (
                    <span className="text-[8px] uppercase tracking-wider font-bold">Today</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Streak Stats & Milestones */}
        <section className="col-span-1 lg:col-span-4 space-y-6">
          <div className="bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8 space-y-4">
            <h3 className="text-base font-semibold text-[var(--fg)]">Consistency Metrics</h3>
            <div className="space-y-3">
              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex justify-between items-center">
                <span className="text-xs text-[var(--fg-muted)]">Longest Recorded Streak</span>
                <span className="text-sm font-semibold text-[var(--fg)]">{longestStreak} Days</span>
              </div>
              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex justify-between items-center">
                <span className="text-xs text-[var(--fg-muted)]">Attendance Reliability</span>
                <span className="text-sm font-semibold text-emerald-600">{eventsAttended > 0 ? '100%' : 'N/A'}</span>
              </div>
              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex justify-between items-center">
                <span className="text-xs text-[var(--fg-muted)]">Events Attended</span>
                <span className="text-sm font-semibold text-[var(--fg)]">{eventsAttended}</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--fg)] text-white rounded-card p-6 md:p-8 space-y-3">
            <div className="w-10 h-10 rounded-card bg-white/10 flex items-center justify-center text-amber-400">
              <Medal size={20} weight="fill" />
            </div>
            <h4 className="text-base font-semibold text-white">Momentum Reward</h4>
            <p className="text-xs text-white/75 leading-relaxed">
              Reach a 50-day streak to unlock a complimentary guest pass for any private weekend tournament fixture.
            </p>
            <div className="pt-2">
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full" style={{ width: `${(streak / 50) * 100}%` }}></div>
              </div>
              <span className="text-[10px] text-white/60 font-mono mt-1 block text-right">
                {streak} / 50 Days
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
