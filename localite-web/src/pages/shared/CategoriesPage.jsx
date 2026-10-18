import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Sparkle, Users, ArrowRight, Compass, BookOpen } from '@phosphor-icons/react';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState('ALL');

  const categories = [
    {
      title: 'Racquet Sports & Courts',
      type: 'SPORTS',
      count: 54,
      desc: 'Tennis, Pickleball, Squash, and Badminton matches with ranked ladders.',
      icon: Trophy,
    },
    {
      title: 'Cultural & Literary Salons',
      type: 'CULTURE',
      count: 32,
      desc: 'Philosophical symposiums, book debates, poetry evenings, and wine pairings.',
      icon: BookOpen,
    },
    {
      title: 'Outdoor & Track Endurance',
      type: 'SPORTS',
      count: 28,
      desc: 'Morning sunrise runs, cycling peletons, and weekend trail expeditions.',
      icon: Compass,
    },
    {
      title: 'Architecture & Gallery Walkabouts',
      type: 'CULTURE',
      count: 21,
      desc: 'Private collection previews, heritage street tours, and studio visits.',
      icon: Sparkle,
    },
    {
      title: 'Pitch & Field Sports',
      type: 'SPORTS',
      count: 36,
      desc: 'Turf football, box cricket, and weekend basketball pickup sessions.',
      icon: Trophy,
    },
    {
      title: 'Supper Clubs & Culinary Tastings',
      type: 'CULTURE',
      count: 18,
      desc: 'Intimate chef table tastings, secret popups, and artisanal cocktail mixers.',
      icon: Users,
    },
  ];

  const filteredCategories =
    activeType === 'ALL' ? categories : categories.filter((c) => c.type === activeType);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen font-sans text-[var(--fg)] animate-fade-in">
      {/* Header */}
      <section className="mb-12 border-b border-[var(--border)] pb-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider block">
            Event Taxonomy
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--fg)] leading-tight">
            Explore Categories
          </h1>
          <p className="text-sm md:text-base text-[var(--fg-muted)] leading-relaxed">
            From competitive racquet matches to quiet evening architectural salons. Discover the exact cadence
            of gathering that fits your lifestyle.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-8">
          {['ALL', 'SPORTS', 'CULTURE'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-card text-xs font-semibold uppercase tracking-wider transition-all ${
                activeType === t
                  ? 'bg-[var(--accent)] text-white shadow-sm'
                  : 'bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]'
              }`}
            >
              {t === 'ALL' ? 'All Collections' : t === 'SPORTS' ? 'Sports & Athletic' : 'Culture & Arts'}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => navigate('/events')}
              className="p-6 bg-[var(--bg)] rounded-card border border-[var(--border)] hover:border-[var(--accent)] transition-all cursor-pointer flex flex-col justify-between space-y-6 group shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                    <Icon size={20} weight="fill" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] bg-[var(--bg-subtle)] px-2.5 py-1 rounded-full border border-[var(--border)]">
                    {item.count} Events
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[var(--fg)] mb-2">{item.title}</h3>
                <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--accent)]">
                <span>Browse Category</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
