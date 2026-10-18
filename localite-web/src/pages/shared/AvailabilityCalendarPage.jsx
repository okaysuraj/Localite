import { useState } from 'react';

import { Sun, CloudSun, Moon, CheckCircle, FloppyDisk, CalendarCheck } from '@phosphor-icons/react';

export default function AvailabilityCalendarPage() {
  const [saved, setSaved] = useState(false);

  const [activeSlots, setActiveSlots] = useState({
    'Mon-M': false,
    'Mon-A': false,
    'Mon-E': true,
    'Tue-M': false,
    'Tue-A': false,
    'Tue-E': true,
    'Wed-M': false,
    'Wed-A': false,
    'Wed-E': true,
    'Thu-M': false,
    'Thu-A': true,
    'Thu-E': false,
    'Fri-M': false,
    'Fri-A': true,
    'Fri-E': true,
    'Sat-M': false,
    'Sat-A': false,
    'Sat-E': true,
    'Sun-M': false,
    'Sun-A': false,
    'Sun-E': false,
  });

  const toggleSlot = (key) => {
    setActiveSlots((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const days = [
    { key: 'Mon', label: 'Monday' },
    { key: 'Tue', label: 'Tuesday' },
    { key: 'Wed', label: 'Wednesday' },
    { key: 'Thu', label: 'Thursday' },
    { key: 'Fri', label: 'Friday' },
    { key: 'Sat', label: 'Saturday' },
    { key: 'Sun', label: 'Sunday' },
  ];

  const times = [
    { code: 'M', label: 'Morning', hours: '08:00 - 12:00', icon: Sun },
    { code: 'A', label: 'Afternoon', hours: '12:00 - 17:00', icon: CloudSun },
    { code: 'E', label: 'Evening', hours: '17:00 - 22:00', icon: Moon },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 min-h-screen font-sans text-[var(--fg)] animate-fade-in">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Match & Gathering Scheduling
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Weekly Availability
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
            Declare your recurring available windows. Hosts and athletic sparring partners will match games to
            your schedule.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 animate-fade-in">
              <CheckCircle size={16} weight="fill" /> Saved
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm active:scale-95 transition-all flex items-center gap-2"
          >
            <FloppyDisk size={16} weight="bold" />
            <span>Save Availability</span>
          </button>
        </div>
      </header>

      {/* Interactive Matrix Grid */}
      <div className="bg-[var(--bg)] rounded-card border border-[var(--border)] overflow-hidden shadow-sm">
        {/* Table Header with Time Windows */}
        <div className="grid grid-cols-4 bg-[var(--bg-subtle)] border-b border-[var(--border)] text-xs font-semibold uppercase tracking-wider text-[var(--fg)] p-4 text-center">
          <span className="text-left pl-2">Day of Week</span>
          {times.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.code} className="flex flex-col items-center">
                <span className="flex items-center gap-1.5">
                  <Icon size={14} className="text-[var(--accent)]" /> {t.label}
                </span>
                <span className="text-[10px] text-[var(--fg-muted)] font-mono font-normal">{t.hours}</span>
              </div>
            );
          })}
        </div>

        {/* Days Rows */}
        <div className="divide-y divide-[var(--border)]">
          {days.map((day) => (
            <div
              key={day.key}
              className="grid grid-cols-4 items-center p-4 hover:bg-[var(--bg-subtle)]/50 transition-colors"
            >
              <span className="text-xs font-semibold text-[var(--fg)] pl-2">{day.label}</span>
              {times.map((t) => {
                const key = `${day.key}-${t.code}`;
                const isActive = activeSlots[key];
                return (
                  <div key={t.code} className="flex justify-center">
                    <button
                      onClick={() => toggleSlot(key)}
                      className={`w-10 h-10 rounded-card flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[var(--accent)] text-white shadow-sm scale-105'
                          : 'bg-[var(--bg-subtle)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)] border border-[var(--border)]'
                      }`}
                      title={`${day.label} ${t.label}: ${isActive ? 'Available' : 'Unavailable'}`}
                    >
                      <CheckCircle size={18} weight={isActive ? 'fill' : 'regular'} />
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Info Callout */}
      <div className="mt-8 p-6 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex items-start gap-3.5 text-xs text-[var(--fg-muted)]">
        <CalendarCheck size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Matches suggested under <strong className="text-[var(--fg)] font-semibold">Find Your Peer</strong>{' '}
          will automatically prioritize opponents whose recurring slots align with yours. You can override
          individual event bookings anytime.
        </p>
      </div>
    </div>
  );
}
