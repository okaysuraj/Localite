import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Crosshair, Plus, Minus, Trophy, Coffee, ArrowRight } from '@phosphor-icons/react';

export default function MapPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Near Me');
  const [selectedVenue, setSelectedVenue] = useState({
    name: 'Club Court Tennis',
    category: 'Athletic Club',
    address: 'Bandra West, Mumbai',
    activeEvents: 3,
    membersCheckedIn: 8,
    desc: 'Four floodlit synthetic clay courts, private locker lounge, and post-match recovery cafe.',
  });

  const venues = [
    {
      id: 1,
      name: 'Club Court Tennis',
      category: 'Athletic Club',
      top: '30%',
      left: '35%',
      icon: Trophy,
      address: 'Bandra West, Mumbai',
      activeEvents: 3,
      membersCheckedIn: 8,
      desc: 'Four floodlit synthetic clay courts, private locker lounge, and post-match recovery cafe.',
    },
    {
      id: 2,
      name: 'Café Noir Salon',
      category: 'Cultural Hub',
      top: '50%',
      left: '55%',
      icon: Coffee,
      address: 'Kala Ghoda, Mumbai',
      activeEvents: 2,
      membersCheckedIn: 14,
      desc: 'Heritage espresso salon hosting weekly architectural lectures and chess tournaments.',
    },
    {
      id: 3,
      name: 'The Rooftop Pickleball',
      category: 'Sports Arena',
      top: '40%',
      left: '70%',
      icon: Trophy,
      address: 'Lower Parel, Mumbai',
      activeEvents: 5,
      membersCheckedIn: 22,
      desc: 'Dedicated dual-court rooftop facility with sunset open-play doubles sessions.',
    },
  ];

  return (
    <div className="relative h-[calc(100vh-73px)] w-full overflow-hidden font-sans text-[var(--fg)] bg-[var(--bg-subtle)]">
      {/* Background Map Simulation Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#1A6B4A_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>

      {/* Floating Filter Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 bg-[var(--bg)]/90 backdrop-blur-md rounded-full border border-[var(--border)] shadow-sm">
        {['Near Me', 'Sports', 'Salons', 'Cafes'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === f
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Map Markers */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {venues.map((v) => {
          const Icon = v.icon;
          const isSelected = selectedVenue?.name === v.name;
          return (
            <div
              key={v.id}
              style={{ top: v.top, left: v.left }}
              onClick={() => setSelectedVenue(v)}
              className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                  isSelected
                    ? 'bg-[var(--accent)] text-white border-white scale-125'
                    : 'bg-[var(--bg)] text-[var(--fg)] border-[var(--border)] group-hover:scale-110'
                }`}
              >
                <Icon size={18} weight="fill" />
              </div>
              <span className="mt-1.5 px-2.5 py-1 bg-[var(--bg)] text-[var(--fg)] text-[10px] font-semibold uppercase tracking-wider rounded-full border border-[var(--border)] shadow-sm whitespace-nowrap">
                {v.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Map Control Buttons */}
      <div className="absolute right-6 bottom-8 z-30 flex flex-col gap-2">
        <div className="flex flex-col bg-[var(--bg)] rounded-card border border-[var(--border)] shadow-sm overflow-hidden">
          <button
            className="p-3 text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
            title="Zoom In"
          >
            <Plus size={16} />
          </button>
          <div className="h-px bg-[var(--border)]"></div>
          <button
            className="p-3 text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
            title="Zoom Out"
          >
            <Minus size={16} />
          </button>
        </div>
        <button
          onClick={() => alert('Re-centering on your current GPS position...')}
          className="p-3 bg-[var(--bg)] text-[var(--fg)] rounded-card border border-[var(--border)] shadow-sm hover:bg-[var(--bg-subtle)] transition-colors"
          title="My Location"
        >
          <Crosshair size={16} />
        </button>
      </div>

      {/* Floating Selected Venue Panel */}
      {selectedVenue && (
        <aside className="absolute left-6 bottom-8 z-30 w-full max-w-sm bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 shadow-xl space-y-4 animate-fade-in">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] block mb-1">
                {selectedVenue.category}
              </span>
              <h3 className="text-lg font-semibold text-[var(--fg)]">{selectedVenue.name}</h3>
              <p className="text-xs text-[var(--fg-muted)] flex items-center gap-1 mt-0.5">
                <MapPin size={13} /> {selectedVenue.address}
              </p>
            </div>
          </div>

          <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{selectedVenue.desc}</p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border)] text-xs text-[var(--fg-muted)] font-mono">
            <div className="bg-[var(--bg-subtle)] p-2.5 rounded-card border border-[var(--border)]">
              <span className="text-[10px] block uppercase text-[var(--fg-muted)]">Active Events</span>
              <span className="font-semibold text-[var(--fg)]">{selectedVenue.activeEvents} Scheduled</span>
            </div>
            <div className="bg-[var(--bg-subtle)] p-2.5 rounded-card border border-[var(--border)]">
              <span className="text-[10px] block uppercase text-[var(--fg-muted)]">Presence</span>
              <span className="font-semibold text-emerald-600">
                {selectedVenue.membersCheckedIn} Checked In
              </span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => navigate('/events')}
              className="flex-1 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>Explore Matches</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
