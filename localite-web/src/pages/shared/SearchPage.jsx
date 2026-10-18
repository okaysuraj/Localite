import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlass, X, ArrowRight, Calendar, MapPin, TrendUp } from '@phosphor-icons/react';

export default function SearchPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('EVENTS');
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Tennis Tournament',
    'Digital Art Exhibition',
    'Pickleball Salon',
    'Jazz Evenings',
  ]);

  const tabs = ['EVENTS', 'MEMBERS', 'SPORTS', 'CLUBS'];

  const handleRemoveRecent = (item) => {
    setRecentSearches(recentSearches.filter((s) => s !== item));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 5)]);
    }
    navigate(`/events?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen font-sans text-[var(--fg)] animate-fade-in">
      {/* Search Bar Section */}
      <section className="max-w-3xl mx-auto text-center mb-12 space-y-6">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
          Search the Network
        </h1>
        <form onSubmit={handleSearchSubmit} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sports matches, gatherings, or members..."
            className="w-full h-14 pl-12 pr-28 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] shadow-sm transition-all"
          />
          <MagnifyingGlass
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] group-focus-within:text-[var(--accent)] transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Search
          </button>
        </form>
      </section>

      {/* Filter Tabs */}
      <section className="flex justify-center border-b border-[var(--border)] mb-8">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-all relative ${
                activeTab === tab ? 'text-[var(--accent)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <section className="mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[var(--fg-muted)]">
              Recent Inquiries
            </span>
            <button
              onClick={handleClearAll}
              className="text-[10px] uppercase font-semibold tracking-wider text-[var(--fg-muted)] hover:text-rose-600 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <div
                key={search}
                className="flex items-center gap-2 bg-[var(--bg-subtle)] border border-[var(--border)] px-3 py-1.5 rounded-full text-xs font-medium text-[var(--fg)] hover:border-[var(--fg-muted)] transition-all cursor-pointer"
              >
                <span
                  onClick={() => {
                    setQuery(search);
                    navigate(`/events?search=${encodeURIComponent(search)}`);
                  }}
                >
                  {search}
                </span>
                <button
                  onClick={() => handleRemoveRecent(search)}
                  className="text-[var(--fg-muted)] hover:text-[var(--fg)]"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Discover Trends Bento Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <div className="flex items-center gap-2">
            <TrendUp size={18} className="text-[var(--accent)]" />
            <h2 className="text-base font-semibold text-[var(--fg)]">Curated Trending Gatherings</h2>
          </div>
          <Link
            to="/events"
            className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 hover:underline"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Feature 1 */}
          <div
            onClick={() => navigate('/events')}
            className="col-span-1 md:col-span-8 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8 flex flex-col justify-between hover:border-[var(--fg-muted)] transition-all cursor-pointer relative overflow-hidden"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] bg-[var(--bg)] px-2.5 py-1 rounded-full border border-[var(--border)] inline-block mb-4">
                Premier Tournament
              </span>
              <h3 className="text-2xl font-semibold text-[var(--fg)] mb-2">
                Metropolitan Doubles Tennis Championship
              </h3>
              <p className="text-xs text-[var(--fg-muted)] max-w-lg leading-relaxed mb-6">
                Tier-1 seeded clay court tournament hosted at the Royal Tennis Grounds. Limited to 16 vetted
                pairs.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-[var(--fg-muted)] pt-4 border-t border-[var(--border)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> Oct 24, 2024
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> Central Club Grounds
              </span>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            onClick={() => navigate('/events')}
            className="col-span-1 md:col-span-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8 flex flex-col justify-between hover:border-[var(--fg-muted)] transition-all cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] bg-[var(--bg)] px-2.5 py-1 rounded-full border border-[var(--border)] inline-block mb-4">
                Cultural Salon
              </span>
              <h3 className="text-xl font-semibold text-[var(--fg)] mb-2">Private Architectural Walkabout</h3>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed mb-6">
                Curated exploration of heritage district facades followed by evening coffee conversation.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-[var(--fg-muted)] pt-4 border-t border-[var(--border)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> Nov 02, 2024
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
