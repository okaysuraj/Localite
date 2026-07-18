import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEventLocationPickerPage() {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState(null);

  const venues = [
    { id: 1, name: 'The Archive Atelier', match: '98% MATCH', desc: 'Chelsea, New York — Quiet Social Club', img: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Lumière Rooftop', match: '92% MATCH', desc: 'Tribeca, New York — Artisan Cafe', img: 'https://via.placeholder.com/300' },
    { id: 3, name: 'The Loft Collective', match: '85% MATCH', desc: 'SoHo, New York — Industrial Studio', img: 'https://via.placeholder.com/300' }
  ];

  return (
    <div className="bg-surface font-body-md text-on-surface h-[calc(100vh-73px)] flex flex-col md:flex-row overflow-hidden">
      {/* Side Panel: Search & Results */}
      <aside className="w-full md:w-[450px] bg-white border-r border-outline-variant/20 flex flex-col z-20">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Step 03 — Venue</p>
            <h1 className="font-headline-md text-headline-md text-primary">Where shall we gather?</h1>
            <p className="font-body-md text-on-surface-variant">Find the perfect 'Third Place' for your community event.</p>
          </div>
          {/* Search Input Group */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">search</span>
            </div>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-surface-container border-none rounded-xl focus:ring-1.5 focus:ring-secondary placeholder:text-outline-variant font-body-md transition-all outline-none" 
              placeholder="Search curated venues, cafes, studios..." 
              type="text"
            />
          </div>
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
            <h2 className="font-label-caps text-label-caps text-on-surface-variant">Recommended for you</h2>
            <button className="text-secondary font-label-caps text-[10px] uppercase hover:underline">Manual Entry</button>
          </div>
        </div>

        {/* Scrollable Results */}
        <div className="flex-1 overflow-y-auto px-6 pb-12 space-y-6">
          {venues.map(venue => (
            <div 
              key={venue.id} 
              onClick={() => setSelectedVenue(venue)}
              className={`bg-surface rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border overflow-hidden ${selectedVenue?.id === venue.id ? 'border-2 border-secondary/50' : 'border-outline-variant/10'}`}
            >
              <div className="h-48 overflow-hidden relative">
                <img src={venue.img} alt={venue.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-secondary-container/90 backdrop-blur-sm text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-[10px]">
                  {venue.match}
                </div>
                {selectedVenue?.id === venue.id && (
                  <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur-md text-white px-3 py-1 rounded-lg font-label-caps text-[10px] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> SELECTED
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline-sm text-headline-sm text-primary">{venue.name}</h3>
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: selectedVenue?.id === venue.id ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
                </div>
                <p className="font-body-md text-on-surface-variant text-sm">{venue.desc}</p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-outline">group</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">12-40 GUESTS</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Bottom Actions for Sidebar */}
        <div className="p-6 bg-white border-t border-outline-variant/10 shadow-sm flex gap-3">
          <button 
            onClick={() => navigate('/events/create/datetime')}
            className="px-6 bg-surface-container text-primary font-label-caps py-4 rounded-xl flex items-center justify-center hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button 
            onClick={() => navigate('/events/create/description')}
            className="flex-1 bg-primary text-white font-label-caps text-label-caps py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all uppercase"
          >
            Confirm Selection
          </button>
        </div>
      </aside>

      {/* Main Map Area */}
      <section className="flex-1 relative bg-surface-container overflow-hidden hidden md:block">
        {/* Map Placeholder */}
        <div className="absolute inset-0 w-full h-full bg-surface-container-low flex items-center justify-center">
           <img className="w-full h-full object-cover grayscale opacity-80" src="https://via.placeholder.com/1200x800" alt="Map" />
        </div>

        {/* Custom Map Controls */}
        <div className="absolute top-8 right-8 flex flex-col gap-3">
          <div className="bg-white rounded-full shadow-sm p-2 flex flex-col gap-2 border border-outline-variant/20">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container transition-colors rounded-full text-primary">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="h-px bg-outline-variant/30 mx-2"></div>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container transition-colors rounded-full text-primary">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <button className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-primary border border-outline-variant/20 hover:text-secondary transition-all">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Floating Manual Address Entry Action */}
        <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96">
          <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary-container/50 rounded-xl flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">edit_location_alt</span>
            </div>
            <div className="flex-1">
              <p className="font-label-caps text-[10px] text-on-surface-variant">NOT ON THE LIST?</p>
              <p className="font-body-md text-primary font-semibold">Enter Address Manually</p>
            </div>
            <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
          </div>
        </div>
      </section>
    </div>
  );
}
