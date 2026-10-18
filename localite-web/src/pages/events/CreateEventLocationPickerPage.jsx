import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  MagnifyingGlass, 
  MapPin, 
  Users, 
  BookmarkSimple, 
  CheckCircle,
  Plus, 
  Minus, 
  NavigationArrow 
} from '@phosphor-icons/react';

export default function CreateEventLocationPickerPage() {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const venues = [
    { 
      id: 1, 
      name: 'The Archive Atelier', 
      match: '98% MATCH', 
      desc: 'Chelsea, New York — Quiet Social Club & Library', 
      capacity: '12-40 Guests',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      id: 2, 
      name: 'Lumière Courtyard & Cafe', 
      match: '92% MATCH', 
      desc: 'Tribeca, New York — Artisan Bakery & Garden', 
      capacity: '20-60 Guests',
      img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600' 
    },
    { 
      id: 3, 
      name: 'The Loft Collective', 
      match: '85% MATCH', 
      desc: 'SoHo, New York — Natural Light Industrial Studio', 
      capacity: '15-50 Guests',
      img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=600' 
    }
  ];

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden">
      {/* Side Panel */}
      <aside className="w-full md:w-[460px] bg-white border-r border-[var(--border)] flex flex-col z-20 shrink-0">
        <div className="p-6 border-b border-[var(--border)] space-y-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">Step 03 / 06 — Location</span>
            <h1 className="text-2xl font-serif text-[var(--fg)] mt-1">Select Gathering Space</h1>
            <p className="text-xs text-[var(--fg-muted)] mt-0.5">Find a curated third-place partner or specify your custom venue.</p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partner studios, lofts, venues..." 
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)]/60 focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)] pt-1">
            <span>Curated Partner Venues</span>
            <button 
              type="button" 
              onClick={() => navigate('/events/create')} 
              className="text-[var(--accent)] hover:underline uppercase tracking-wider"
            >
              Manual Address
            </button>
          </div>
        </div>

        {/* Venue List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {venues.map((venue) => {
            const isSelected = selectedVenue?.id === venue.id;
            return (
              <div 
                key={venue.id} 
                onClick={() => setSelectedVenue(venue)}
                className={`rounded-card border transition-all cursor-pointer overflow-hidden ${
                  isSelected 
                    ? 'border-[var(--accent)] bg-[var(--accent)]/[0.02] shadow-sm' 
                    : 'border-[var(--border)] hover:border-[var(--fg-muted)] bg-white'
                }`}
              >
                <div className="h-36 w-full relative overflow-hidden bg-[var(--bg-subtle)]">
                  <img src={venue.img} alt={venue.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-card text-[10px] font-mono text-[var(--fg)] border border-[var(--border)]">
                    {venue.match}
                  </div>
                  {isSelected && (
                    <div className="absolute bottom-2.5 left-2.5 bg-[var(--accent)] text-white px-2.5 py-1 rounded-card text-[10px] font-mono flex items-center gap-1.5 shadow-sm">
                      <CheckCircle size={12} weight="fill" />
                      SELECTED
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium text-[var(--fg)]">{venue.name}</h3>
                    <BookmarkSimple size={16} className={isSelected ? 'text-[var(--accent)]' : 'text-[var(--fg-muted)]'} weight={isSelected ? 'fill' : 'regular'} />
                  </div>
                  <p className="text-xs text-[var(--fg-muted)]">{venue.desc}</p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-[var(--fg-muted)]">
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {venue.capacity}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-white border-t border-[var(--border)] flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate('/events/create')}
            className="p-2.5 rounded-card border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <button 
            type="button"
            onClick={() => navigate('/events/create')}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
          >
            Confirm Location
            <ArrowRight size={16} />
          </button>
        </div>
      </aside>

      {/* Map Preview Area */}
      <section className="flex-1 relative bg-[var(--bg-subtle)] hidden md:block">
        <div className="absolute inset-0 flex items-center justify-center text-[var(--fg-muted)]">
          <div className="text-center space-y-2 max-w-sm p-6 bg-white rounded-card border border-[var(--border)] shadow-sm">
            <MapPin size={32} className="mx-auto text-[var(--accent)]" />
            <h4 className="text-sm font-serif text-[var(--fg)]">Interactive Venue Map</h4>
            <p className="text-xs text-[var(--fg-muted)]">
              {selectedVenue 
                ? `Pin centered on: ${selectedVenue.name} (${selectedVenue.desc})` 
                : 'Select a venue on the left panel or input coordinates directly.'}
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <div className="bg-white rounded-card border border-[var(--border)] p-1 flex flex-col gap-1 shadow-sm">
            <button type="button" className="p-2 hover:bg-[var(--bg-subtle)] rounded text-[var(--fg)] transition-colors">
              <Plus size={16} />
            </button>
            <div className="h-px bg-[var(--border)]" />
            <button type="button" className="p-2 hover:bg-[var(--bg-subtle)] rounded text-[var(--fg)] transition-colors">
              <Minus size={16} />
            </button>
          </div>
          <button type="button" className="p-2.5 bg-white rounded-card border border-[var(--border)] shadow-sm hover:bg-[var(--bg-subtle)] text-[var(--fg)] transition-colors">
            <NavigationArrow size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
