import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../services/api';

export default function EventsCatalogPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen selection:bg-[#fed488] selection:text-[#785a1a]">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky z-50 bg-[#fbf9f8] shadow-sm h-20">
        <div className="flex justify-between items-center px-8 py-2 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-12">
            <a className="font-display-lg text-4xl font-bold text-primary tracking-tight" href="/">Localite</a>
            <nav className="hidden md:flex items-center gap-8">
              <a className="font-label-caps text-[12px] uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300" href="/dashboard/host">Dashboard</a>
              <a className="font-label-caps text-[12px] uppercase tracking-widest text-primary border-b-2 border-[#775a19] pb-1 transition-colors duration-300" href="/events">Events</a>
              <a className="font-label-caps text-[12px] uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300" href="/map">Venues</a>
              <a className="font-label-caps text-[12px] uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300" href="/team/formation">Members</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d]">search</span>
              <input className="bg-[#f5f3f3] border-none rounded-full pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-[#775a19] text-sm outline-none" placeholder="Explore gatherings..." type="text"/>
            </div>
            <button className="relative cursor-pointer hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-primary">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#775a19] rounded-full"></span>
            </button>
            <div 
              className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer"
              onClick={() => navigate('/profile/setup/final')}
            >
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTK2eC6TXrEcxdkE7WHLh1-E-7qaM7t040iWF9aZXcoPb3QGtj6gs81T_wqHIULyCwt1qiKOxQ8L_YSjxEEpHCgkrFYkvUcYh40J-dp3gYbzpJ4mxqZHCKQACoJeGuyUNDIPBz8FQlEVVbwJLcXeD_76HXKUF2S5Rquhw28bNQ6zMI7iG99c38k_8HG8WnXSykDX4Tmzn4QB5lFccobbyS42NRYMfbHNk0dI7oWTu6ChW08Bq2SL8daA" alt="Avatar"/>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <section className="mb-12 space-y-2">
          <p className="font-label-caps text-[12px] text-[#775a19] uppercase tracking-[0.2em] font-bold">Selected Curations</p>
          <h1 className="font-display-lg text-5xl font-bold text-primary max-w-2xl leading-tight">Elite Gatherings for the Discerning</h1>
        </section>

        {/* Featured Carousel (Simulated Single Large Card) */}
        {events.length > 0 && (
          <section className="mb-12">
            <div className="relative group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#eae8e7] flex flex-col lg:flex-row h-auto lg:h-[500px]">
              <div className="lg:w-2/3 h-[300px] lg:h-full relative overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={events[0].imageUrl || events[0].image} alt={events[0].title}/>
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className="bg-primary text-white px-4 py-1 font-label-caps text-[10px] uppercase font-bold rounded-full">FEATURED</span>
                  {events[0].isHighlighted && <span className="bg-[#775a19] text-white px-4 py-1 font-label-caps text-[10px] uppercase font-bold rounded-full">MEMBERS ONLY</span>}
                </div>
              </div>
              <div className="lg:w-1/3 p-8 flex flex-col justify-between bg-white">
                <div>
                  <p className="font-label-caps text-[10px] uppercase font-bold text-[#775a19] mb-2 tracking-widest">{events[0].date}</p>
                  <h2 className="font-headline-md text-3xl font-bold text-primary mb-4 leading-tight">{events[0].title}</h2>
                  <p className="text-sm text-[#44474d] mb-6">{events[0].description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#775a19] text-[20px]">location_on</span>
                      <span className="text-sm">{events[0].location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#775a19] text-[20px]">group</span>
                      <span className="text-sm">{events[0].attendees || 0} Attending</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-primary text-white py-4 font-label-caps text-[12px] uppercase font-bold tracking-widest hover:bg-[#775a19] transition-all duration-300 rounded-lg" onClick={() => navigate(`/events/${events[0].id}`)}>REQUEST INVITATION</button>
              </div>
            </div>
          </section>
        )}

        {/* Filters & Navigation */}
        <section className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-[#c5c6cd] pb-4">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            <button className="font-label-caps text-[12px] uppercase font-bold text-primary border-b-2 border-primary pb-2 whitespace-nowrap">ALL EVENTS</button>
            <button className="font-label-caps text-[12px] uppercase font-bold text-[#44474d] hover:text-primary transition-colors pb-2 whitespace-nowrap">CULTURAL</button>
            <button className="font-label-caps text-[12px] uppercase font-bold text-[#44474d] hover:text-primary transition-colors pb-2 whitespace-nowrap">SPORTS</button>
            <button className="font-label-caps text-[12px] uppercase font-bold text-[#44474d] hover:text-primary transition-colors pb-2 whitespace-nowrap">NETWORKING</button>
            <button className="font-label-caps text-[12px] uppercase font-bold text-[#44474d] hover:text-primary transition-colors pb-2 whitespace-nowrap">CULINARY</button>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-label-caps text-[10px] uppercase font-bold text-[#44474d]">SORT BY:</span>
            <select className="bg-transparent border-none font-label-caps text-[10px] uppercase font-bold text-primary focus:ring-0 cursor-pointer outline-none">
              <option>SOONEST</option>
              <option>RECENTLY ADDED</option>
              <option>CAPACITY</option>
            </select>
          </div>
        </section>

        {/* Grid View */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             <div className="col-span-full text-center py-12 text-[#44474d]">Loading events...</div>
          ) : (
            events.slice(1).map((event) => (
              <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-[#eae8e7] flex flex-col cursor-pointer" onClick={() => navigate(`/events/${event.id}`)}>
                <div className="h-64 relative">
                  <img className="w-full h-full object-cover" src={event.imageUrl || event.image} alt={event.title} />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 font-label-caps text-[10px] font-bold uppercase rounded">{event.category || event.eventType || 'EVENT'}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-label-caps text-[10px] font-bold uppercase text-[#44474d] tracking-widest">{event.date}</p>
                      <span className="material-symbols-outlined text-[#c5c6cd] hover:text-[#ba1a1a] transition-colors">favorite</span>
                    </div>
                    <h3 className="font-headline-sm text-2xl font-bold text-primary mb-4">{event.title}</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="material-symbols-outlined text-[#775a19] text-sm">location_on</span>
                      <span className="text-sm text-[#44474d]">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#efeded]">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-[#eae8e7]"></div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-[#eae8e7]"></div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-[#eae8e7] flex items-center justify-center text-[10px] font-bold">+{event.attendees || 0}</div>
                    </div>
                    <button className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#775a19] border border-[#775a19] px-4 py-2 hover:bg-[#775a19] hover:text-white transition-all rounded">VIEW DETAILS</button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Card 4 - CTA/Discovery Card */}
          <div className="bg-[#0d1c32] rounded-xl shadow-sm p-8 flex flex-col justify-center items-center text-center space-y-6 md:col-span-2 lg:col-span-3 mt-4">
            <span className="material-symbols-outlined text-[#775a19] text-5xl">event_available</span>
            <div>
              <h3 className="font-headline-sm text-2xl font-bold text-[#76849f] mb-2">Don't see what you're looking for?</h3>
              <p className="text-sm text-[#76849f]/80 max-w-md mx-auto">Suggest a gathering or host your own curated event for the Localite community.</p>
            </div>
            <button className="bg-[#775a19] text-white px-8 py-3 font-label-caps text-[12px] uppercase font-bold tracking-widest rounded-full hover:scale-105 transition-transform" onClick={() => navigate('/events/create')}>PROPOSE EVENT</button>
          </div>
        </section>

        {/* Pagination */}
        <section className="mt-12 flex justify-center items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#c5c6cd] text-[#44474d] hover:border-[#775a19] hover:text-[#775a19] transition-all">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-primary">PAGE 1 OF 4</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#c5c6cd] text-[#44474d] hover:border-[#775a19] hover:text-[#775a19] transition-all">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-12 bg-[#efeded] border-t border-[#c5c6cd]">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-display-lg text-3xl font-bold text-primary tracking-tight">Localite</span>
            <p className="text-sm text-[#44474d] max-w-xs">Connecting the world's most discerning individuals through local, curated excellence.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8">
            <a className="font-label-caps text-[10px] uppercase font-bold tracking-widest text-[#44474d] hover:text-primary underline decoration-[#775a19] transition-all duration-300" href="/">Privacy Policy</a>
            <a className="font-label-caps text-[10px] uppercase font-bold tracking-widest text-[#44474d] hover:text-primary underline decoration-[#775a19] transition-all duration-300" href="/">Terms of Service</a>
            <a className="font-label-caps text-[10px] uppercase font-bold tracking-widest text-[#44474d] hover:text-primary underline decoration-[#775a19] transition-all duration-300" href="/">Press Kit</a>
            <a className="font-label-caps text-[10px] uppercase font-bold tracking-widest text-[#44474d] hover:text-primary underline decoration-[#775a19] transition-all duration-300" href="/">Contact Us</a>
          </nav>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-primary cursor-pointer hover:text-[#775a19] transition-colors">public</span>
              <span className="material-symbols-outlined text-primary cursor-pointer hover:text-[#775a19] transition-colors">share</span>
            </div>
            <p className="font-label-caps text-[10px] uppercase font-bold tracking-widest text-[#44474d]">© 2024 Localite. Modern Nobility.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
