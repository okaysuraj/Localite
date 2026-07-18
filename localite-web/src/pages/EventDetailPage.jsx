import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, rsvpToEvent, awardXp } from '../services/api';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  const handleRsvp = async () => {
    setRsvpLoading(true);
    try {
      await rsvpToEvent(id);
      try {
        await awardXp('ATTEND_EVENT');
      } catch (xpErr) {
        console.log('Gamification disabled or failed:', xpErr);
      }
      alert('Successfully requested invitation! (+50 XP)');
      // Refresh event details
      const data = await getEventById(id);
      setEvent(data);
    } catch (error) {
      alert('Failed to request invitation.');
    } finally {
      setRsvpLoading(false);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-background">
        <h1 className="font-display-lg text-4xl text-primary mb-4">Event Not Found</h1>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-secondary text-white rounded-lg font-label-caps"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Hero Section */}
      <section className="relative h-[870px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            className="w-full h-full object-cover" 
            src={event.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZTlEW44hzhEmQbUmglulHRvRbxqYNSgRkw-p_FQlYZFui7hQQM3sRT-MwD4Cy53f6XLW5TuN6XYrDT8K5xVnVvjQyCkHmKooNcq4ziTDdJ9vVYktY3ROLIBXl5qIQsCTLf1rWRDPTlIwkB502ixRoKBY8vfFpOXWCeHwWSSB6ekDmUpygDg9L885nEX1XhRcCG0oBrMKUJFoSXnXnzFHRBLwpV6leCR3c2b_2COlZxiDcSKbjG6YzIw'} 
            alt={event.title} 
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%)' }}></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-container-margin pb-stack-lg max-w-7xl mx-auto right-0 flex flex-col justify-end">
          <div className="max-w-3xl">
            <span className="font-label-caps text-label-caps text-secondary-fixed bg-primary/20 backdrop-blur-md px-stack-sm py-1 rounded-lg mb-stack-sm inline-block">
              {event.category || 'Exclusive Gathering'}
            </span>
            <h1 className="font-display-lg text-display-lg text-white mb-stack-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-stack-md text-white/90">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">calendar_today</span>
                <span className="font-label-caps text-label-caps">
                  {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase() : 'OCTOBER 24, 2024'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">schedule</span>
                <span className="font-label-caps text-label-caps">
                  {event.date ? new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toUpperCase() : '9:00 PM'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">location_on</span>
                <span className="font-label-caps text-label-caps uppercase">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-container-margin py-stack-lg max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
          
          {/* Left Column: The Experience & Curated Guests */}
          <div className="lg:col-span-8 space-y-stack-lg">
            
            {/* Narrative */}
            <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">The Experience</h2>
              <div className="space-y-4 text-on-surface-variant font-body-lg">
                <p>{event.description || 'Join an intimate circle of creators and thinkers for an evening dedicated to the art of the nocturnal conversation.'}</p>
                {event.rules && <p className="mt-4 font-semibold">Rules: {event.rules}</p>}
              </div>
              <div className="mt-stack-md grid grid-cols-2 md:grid-cols-3 gap-gutter">
                <div className="p-stack-sm bg-surface-container-low rounded-lg">
                  <span className="block font-label-caps text-label-caps text-outline mb-1 uppercase">Host</span>
                  <span className="font-body-md text-primary font-semibold">{event.host?.username || 'Localite Concierge'}</span>
                </div>
                <div className="p-stack-sm bg-surface-container-low rounded-lg">
                  <span className="block font-label-caps text-label-caps text-outline mb-1 uppercase">Capacity</span>
                  <span className="font-body-md text-primary font-semibold">{event.maxAttendees > 0 ? `${event.maxAttendees} Guests` : 'Unlimited'}</span>
                </div>
                <div className="p-stack-sm bg-surface-container-low rounded-lg">
                  <span className="block font-label-caps text-label-caps text-outline mb-1 uppercase">Attendees</span>
                  <span className="font-body-md text-primary font-semibold">{event.attendees || 0} Joined</span>
                </div>
              </div>
            </div>

            {/* Curated Guests */}
            <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-end mb-stack-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary">Curated Guests</h2>
                  <p className="font-body-md text-on-surface-variant">A community of visionaries and leaders.</p>
                </div>
                
                {/* Chat and Participants Actions */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => navigate(`/events/${id}/chat`)}
                    className="flex-1 bg-surface-container-low text-primary border border-surface-variant/30 px-6 py-3 rounded-xl font-label-caps text-label-caps tracking-wider hover:bg-surface-variant/20 transition-all flex justify-center items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    GROUP CHAT
                  </button>
                  <button 
                    onClick={() => navigate(`/events/${id}/participants`)}
                    className="flex-1 bg-surface-container-low text-primary border border-surface-variant/30 px-6 py-3 rounded-xl font-label-caps text-label-caps tracking-wider hover:bg-surface-variant/20 transition-all flex justify-center items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">group</span>
                    GUEST LIST
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-stack-md">
                {/* Mock Guests for now, replace with event.rsvps later */}
                {['Elena V.', 'Marcus K.', 'Sarah J.', 'David L.'].map((guest, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full ring-2 ring-transparent ring-offset-2 overflow-hidden transition-transform group-hover:scale-105 group-hover:ring-secondary-container">
                      <img className="w-full h-full object-cover bg-surface-container" src={`https://api.dicebear.com/7.x/notionists/svg?seed=${guest}&backgroundColor=b9c7e4`} alt={guest} />
                    </div>
                    <span className="font-label-caps text-label-caps text-primary">{guest}</span>
                  </div>
                ))}
                {event.attendees > 4 && (
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center border-2 border-dashed border-outline-variant cursor-pointer hover:bg-surface-container-highest transition-colors">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">+{event.attendees - 4}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Actions & Venue */}
          <div className="lg:col-span-4 space-y-stack-lg">
            
            {/* Booking Card */}
            <div className="bg-primary text-white p-stack-md rounded-xl shadow-lg sticky top-24">
              <div className="mb-stack-md">
                <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest">Investment</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display-lg text-headline-md">{event.cost > 0 ? `$${event.cost}` : 'Complimentary'}</span>
                  {event.cost > 0 && <span className="font-label-caps text-label-caps text-white/60">/ PERS.</span>}
                </div>
              </div>
              <div className="space-y-gutter mb-stack-md">
                <button 
                  onClick={handleRsvp}
                  disabled={rsvpLoading}
                  className="w-full py-4 bg-secondary text-white font-label-caps text-label-caps rounded-lg hover:bg-on-secondary-container transition-all active:scale-[0.98] uppercase tracking-widest disabled:opacity-50"
                >
                  {rsvpLoading ? 'Processing...' : 'Request Invitation'}
                </button>
                <button className="w-full py-4 border border-white/20 text-white font-label-caps text-label-caps rounded-lg hover:bg-white/10 transition-all uppercase tracking-widest">
                  Share Event
                </button>
              </div>
              <div className="pt-stack-md border-t border-white/10 flex items-center gap-stack-sm text-white/80">
                <span className="material-symbols-outlined text-secondary-fixed">verified_user</span>
                <span className="font-body-md text-sm">Verified by Localite Concierge</span>
              </div>
            </div>

            {/* The Venue */}
            <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/30">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-stack-sm">The Venue</h3>
              <div className="rounded-lg overflow-hidden h-48 mb-stack-sm relative">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Kun2P3C71Xl9JyqewIWoVJCjlBSHG2VCgx20NjH25chXKhBrG87vSq9jCXJ2StjJ7c75NWwRKpaCkUp4NDNPyMZo1hb50LLLoQEbGb1TYSMy8kBa2K9oxQf2_TvjNNS83Rgs9rtiWuhRMHqwOswFMRahjngD78ozHQq1N24Zwdw8xXWYEsRyUFy6Axup2eJ32YhQwciGgsOqRC4hK41hOOUR5i94TlgSSTAW6XC6hLNKf2bfEDsrTQ" 
                  alt="Map view" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-stack-sm py-2 rounded-full border border-secondary shadow-lg cursor-pointer">
                    <span className="font-label-caps text-label-caps text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                      VIEW ON MAP
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-headline-sm text-lg text-primary">{event.location}</h4>
                <div className="pt-2 flex items-center gap-4 text-secondary">
                  <button className="flex items-center gap-1 font-label-caps text-label-caps hover:underline">
                    <span className="material-symbols-outlined text-base">directions</span> GET DIRECTIONS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
