import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  ArrowUpRight, 
  Users, 
  CheckCircle,
  MapPin
} from '@phosphor-icons/react';

export default function SportsCategoriesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const sports = [
    {
      title: 'Tennis',
      category: 'RACQUET',
      matches: 24,
      venues: 12,
      desc: 'Grass, clay, and hardcourt singles and doubles fixtures across top district clubs.',
      accent: '#1A6B4A'
    },
    {
      title: 'Pickleball & Padel',
      category: 'RACQUET',
      matches: 38,
      venues: 16,
      desc: 'Fast-paced social doubles and weekly ranked community round-robins.',
      accent: '#1A6B4A'
    },
    {
      title: 'Cricket & Box Leagues',
      category: 'FIELD',
      matches: 19,
      venues: 8,
      desc: 'Weekend turf tournaments, leather ball test matches, and indoor box cricket.',
      accent: '#1A6B4A'
    },
    {
      title: 'Squash & Racquetball',
      category: 'RACQUET',
      matches: 14,
      venues: 9,
      desc: 'Intense glass-court matches with vetted regional tournament seeds.',
      accent: '#1A6B4A'
    },
    {
      title: 'Golf & Putting Salons',
      category: 'CLUBHOUSE',
      matches: 8,
      venues: 6,
      desc: 'Weekend 18-hole rounds and twilight driving range clinics.',
      accent: '#1A6B4A'
    },
    {
      title: 'Badminton & Shuttle',
      category: 'RACQUET',
      matches: 27,
      venues: 14,
      desc: 'High-speed indoor court matches and mixed doubles ladders.',
      accent: '#1A6B4A'
    }
  ];

  const filteredSports = activeFilter === 'ALL' 
    ? sports 
    : sports.filter(s => s.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen font-sans text-[var(--fg)] animate-fade-in">
      
      {/* Hero Header */}
      <section className="mb-12 border-b border-[var(--border)] pb-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider block">
            The Athletic Registry
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--fg)] leading-tight">
            Athletic Disciplines
          </h1>
          <p className="text-sm md:text-base text-[var(--fg-muted)] leading-relaxed">
            Curated sporting circles where competitive standards meet camaraderie. Choose your discipline to find players, sparring partners, and tournament lobbies.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pt-8">
          {['ALL', 'RACQUET', 'FIELD', 'CLUBHOUSE'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-card text-xs font-semibold uppercase tracking-wider transition-all ${
                activeFilter === filter
                  ? 'bg-[var(--accent)] text-white shadow-sm'
                  : 'bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]'
              }`}
            >
              {filter === 'ALL' ? 'All Disciplines' : filter}
            </button>
          ))}
        </div>
      </section>

      {/* Disciplines Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSports.map((sport, index) => (
          <div
            key={index}
            onClick={() => navigate('/matches')}
            className="p-6 bg-[var(--bg)] rounded-card border border-[var(--border)] hover:border-[var(--accent)] transition-all cursor-pointer flex flex-col justify-between space-y-6 group shadow-sm"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] bg-[var(--bg-subtle)] px-2.5 py-1 rounded-full border border-[var(--border)]">
                  {sport.category}
                </span>
                <span className="p-1 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">
                {sport.title}
              </h2>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                {sport.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--fg-muted)] font-mono">
              <span className="flex items-center gap-1.5">
                <Users size={14} /> {sport.matches} Active Matches
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {sport.venues} Clubs
              </span>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
