import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../../services/api';
import { 
  CalendarBlank, 
  MapPin, 
  Users, 
  Plus, 
  CaretLeft, 
  CaretRight, 
  BookmarkSimple,
  Sparkle,
  ArrowRight 
} from '@phosphor-icons/react';

export default function EventsCatalogPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const tabs = ['ALL', 'CULTURAL', 'WELLNESS', 'NETWORKING', 'EPICUREAN'];

  const filteredEvents = activeTab === 'ALL' 
    ? events 
    : events.filter((e) => {
        const cat = (e.category || e.eventType || '').toUpperCase();
        return cat.includes(activeTab);
      });

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
              Curated Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">Community Gatherings</h1>
            <p className="text-xs sm:text-sm text-[var(--fg-muted)] max-w-xl mt-1">
              Explore authentic local gatherings, salon dinners, sports matches, and cultural exchanges.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/events/create')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors self-start sm:self-auto"
          >
            <Plus size={16} />
            Host Gathering
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-card text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-[var(--fg)] text-white font-medium' 
                    : 'bg-white border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-[var(--fg-muted)] shrink-0 hidden sm:inline-block">
            {filteredEvents.length} gatherings
          </span>
        </div>

        {/* Event Cards Grid */}
        {loading ? (
          <div className="bg-white rounded-card border border-[var(--border)] p-12 text-center text-xs font-mono text-[var(--fg-muted)]">
            Loading directory...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-card border border-[var(--border)] p-12 text-center space-y-4">
            <CalendarBlank size={36} className="mx-auto text-[var(--fg-muted)]" />
            <h3 className="text-base font-serif text-[var(--fg)]">No events found in this category</h3>
            <p className="text-xs text-[var(--fg-muted)] max-w-sm mx-auto">
              Be the first to introduce a gathering in this sphere.
            </p>
            <button
              type="button"
              onClick={() => navigate('/events/create')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
            >
              Propose Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => (
              <div 
                key={ev.id}
                onClick={() => navigate(`/events/${ev.id}`)}
                className="bg-white rounded-card border border-[var(--border)] overflow-hidden hover:border-[var(--fg-muted)] transition-all cursor-pointer group flex flex-col"
              >
                <div className="h-48 w-full relative bg-[var(--bg-subtle)] overflow-hidden">
                  <img 
                    src={ev.imageUrl || ev.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600'} 
                    alt={ev.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-card text-center border border-[var(--border)]">
                    <span className="block text-[10px] font-mono text-[var(--fg-muted)] uppercase">Date</span>
                    <span className="block text-xs font-mono font-medium text-[var(--fg)]">{ev.date || 'Upcoming'}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-[var(--accent)] text-white px-2.5 py-0.5 rounded-card text-[10px] font-mono">
                    {ev.category || 'Gathering'}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase text-[var(--accent)] block">
                      {ev.eventType || 'Community Access'}
                    </span>
                    <h3 className="text-base font-serif text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-[var(--fg-muted)] line-clamp-2 leading-relaxed">
                      {ev.description || 'Join neighborhood peers for an engaging gathering.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] space-y-1 text-xs text-[var(--fg-muted)]">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[var(--fg)] shrink-0" />
                      <span className="truncate">{ev.location || 'Location provided upon RSVP'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[var(--fg)] shrink-0" />
                      <span>{ev.attendees ? `${ev.attendees} attending` : 'Open capacity'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
