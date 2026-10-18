import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarBlank, MapPin, Plus, Clock, Users } from '@phosphor-icons/react';

export default function MyEventsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('joined'); // 'joined' or 'hosted'

  const joinedEvents = [
    {
      id: '1',
      title: 'The Abstract Vernissage',
      category: 'Arts & Culture',
      date: 'Oct 24, 2026',
      time: '19:00',
      location: 'Vanguard Atelier, SoHo',
      role: 'Confirmed Guest',
      host: 'Arthur P.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: '2',
      title: 'Nordic Sound & Architecture Salon',
      category: 'Music & Discourse',
      date: 'Nov 02, 2026',
      time: '20:30',
      location: 'The Timber Pavilion, DUMBO',
      role: 'Waitlist #2',
      host: 'Soren K.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const hostedEvents = [
    {
      id: '3',
      title: 'Midnight Garden Soirée',
      category: 'Epicurean & Tasting',
      date: 'Oct 28, 2026',
      time: '20:00',
      location: 'The Glass Conservatory, Chelsea',
      role: 'Host',
      attendees: '48 / 80 Confirmed',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const currentList = activeTab === 'joined' ? joinedEvents : hostedEvents;

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
              Personal Agenda
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">Your Gatherings</h1>
            <p className="text-xs sm:text-sm text-[var(--fg-muted)] max-w-xl mt-1">
              Curated itinerary of the local experiences you are participating in or hosting.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center bg-white p-1 rounded-card border border-[var(--border)] text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('joined')}
                className={`px-4 py-1.5 rounded-card uppercase tracking-wider transition-colors ${
                  activeTab === 'joined'
                    ? 'bg-[var(--fg)] text-white font-medium'
                    : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                }`}
              >
                Attending ({joinedEvents.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hosted')}
                className={`px-4 py-1.5 rounded-card uppercase tracking-wider transition-colors ${
                  activeTab === 'hosted'
                    ? 'bg-[var(--fg)] text-white font-medium'
                    : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                }`}
              >
                Hosting ({hostedEvents.length})
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate('/events/create')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
            >
              <Plus size={16} />
              Host Event
            </button>
          </div>
        </div>

        {/* Content Grid */}
        {currentList.length === 0 ? (
          <div className="bg-white rounded-card border border-[var(--border)] p-12 text-center space-y-4">
            <CalendarBlank size={36} className="mx-auto text-[var(--fg-muted)]" />
            <h3 className="text-base font-serif text-[var(--fg)]">No events in this category yet</h3>
            <p className="text-xs text-[var(--fg-muted)] max-w-sm mx-auto">
              Explore open gatherings nearby or host an intimate experience of your own.
            </p>
            <button
              type="button"
              onClick={() => navigate('/explore')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
            >
              Discover Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentList.map((ev) => (
              <div
                key={ev.id}
                onClick={() => navigate(`/events/${ev.id}`)}
                className="bg-white rounded-card border border-[var(--border)] overflow-hidden hover:border-[var(--fg-muted)] transition-all cursor-pointer group flex flex-col"
              >
                <div className="h-48 w-full relative bg-[var(--bg-subtle)] overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-card text-center border border-[var(--border)]">
                    <span className="block text-[10px] font-mono text-[var(--fg-muted)] uppercase">Date</span>
                    <span className="block text-xs font-mono font-medium text-[var(--fg)]">{ev.date}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-[var(--accent)] text-white px-2.5 py-0.5 rounded-card text-[10px] font-mono">
                    {ev.role}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase text-[var(--accent)] block">
                      {ev.category}
                    </span>
                    <h3 className="text-base font-serif text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                      {ev.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] space-y-1.5 text-xs text-[var(--fg-muted)]">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[var(--fg)] shrink-0" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[var(--fg)] shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                    {ev.attendees && (
                      <div className="flex items-center gap-2 text-[var(--accent)]">
                        <Users size={14} className="shrink-0" />
                        <span className="font-mono text-[11px]">{ev.attendees}</span>
                      </div>
                    )}
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
