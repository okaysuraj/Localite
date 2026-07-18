import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEventDateTimePage() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(11);

  // Mock days
  const days = [];
  for (let i = 1; i <= 22; i++) {
    days.push(i);
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-[calc(100vh-73px)] flex">
      {/* SideNavBar is omitted or wrapped by layout in the app */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Step 02 / 06</span>
            <div className="h-[1px] w-12 bg-secondary-container"></div>
          </div>
          <h1 className="font-display-lg text-display-lg text-primary mb-2">Schedule Your Occasion</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Refine the temporal details of your gathering. Excellence resides in the timing of every interaction.</p>
        </header>

        {/* Bento Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Calendar Section */}
          <section className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-outline-variant/10 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-headline-sm text-headline-sm">Select Date</h2>
              <div className="flex items-center gap-4">
                <button className="p-2 border border-outline-variant rounded-full hover:border-secondary transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                <span className="font-label-caps text-label-caps">September 2024</span>
                <button className="p-2 border border-outline-variant rounded-full hover:border-secondary transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-outline-variant rounded-lg overflow-hidden border border-outline-variant/20">
              {/* Days Header */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-surface-container-low p-4 text-center font-label-caps text-label-caps text-outline uppercase">{day}</div>
              ))}
              
              {/* Mock disabled days */}
              {[25,26,27,28,29,30].map(day => (
                <div key={`d-${day}`} className="bg-white p-4 md:p-8 text-center text-outline-variant/50 cursor-not-allowed">{day}</div>
              ))}

              {/* Active days */}
              {days.map(day => (
                <div 
                  key={day} 
                  onClick={() => setSelectedDay(day)}
                  className={`bg-white p-4 md:p-8 text-center cursor-pointer transition-colors ${selectedDay === day ? 'bg-primary text-white font-bold' : 'hover:bg-surface-container-low text-primary'}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </section>

          {/* Right: Time & Duration Section */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Start Time Card */}
            <section className="bg-white rounded-xl shadow-sm border border-outline-variant/10 p-6 md:p-8">
              <h3 className="font-label-caps text-label-caps text-outline mb-4 uppercase">Start Time</h3>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <select className="w-full bg-surface-container-low p-4 rounded-lg border-none focus:ring-1 focus:ring-secondary font-headline-sm appearance-none cursor-pointer outline-none">
                    <option>19:00 (7:00 PM)</option>
                    <option>20:00 (8:00 PM)</option>
                    <option>21:00 (9:00 PM)</option>
                    <option>22:00 (10:00 PM)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">schedule</span>
                </div>
                <p className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Recommended for gala evenings
                </p>
              </div>
            </section>

            {/* Duration Card */}
            <section className="bg-white rounded-xl shadow-sm border border-outline-variant/10 p-6 md:p-8">
              <h3 className="font-label-caps text-label-caps text-outline mb-4 uppercase">Duration</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-secondary text-secondary font-label-caps text-label-caps rounded-lg bg-secondary-container/10">3 Hours</button>
                <button className="p-4 border border-outline-variant text-on-surface font-label-caps text-label-caps rounded-lg hover:border-secondary transition-colors">4 Hours</button>
                <button className="p-4 border border-outline-variant text-on-surface font-label-caps text-label-caps rounded-lg hover:border-secondary transition-colors">Custom</button>
                <button className="p-4 border border-outline-variant text-on-surface font-label-caps text-label-caps rounded-lg hover:border-secondary transition-colors">Open End</button>
              </div>
            </section>

            {/* Summary / CTA Card */}
            <section className="bg-primary text-white rounded-xl shadow-lg p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-label-caps text-label-caps opacity-70 mb-2 uppercase">EVENT SUMMARY</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">calendar_today</span>
                    <span className="font-headline-sm text-headline-sm">Wed, Sept {selectedDay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">schedule</span>
                    <span className="font-headline-sm text-headline-sm">19:00 — 22:00</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => navigate('/events/create')}
                  className="px-6 py-4 border border-white/30 text-white font-label-caps text-label-caps rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button 
                  onClick={() => navigate('/events/create/location')}
                  className="flex-1 py-4 bg-white text-primary font-label-caps text-label-caps rounded-lg hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2 group"
                >
                  Finalize Date
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
