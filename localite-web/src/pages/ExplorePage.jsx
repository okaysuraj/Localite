import React, { useState, useEffect, useCallback } from 'react';
import EventCard from '../components/EventCard';
import CreateEventModal from '../components/CreateEventModal';
import ChatPanel from '../components/ChatPanel';
import PublicProfileModal from '../components/PublicProfileModal';
import { Plus, MapPin, Map as MapIcon, List as ListIcon, Activity } from 'lucide-react';
import gsap from 'gsap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const ExplorePage = () => {
  const [events, setEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [suggestedPartners, setSuggestedPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeFilter, setTimeFilter] = useState('Any');
  const [location, setLocation] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'map', 'feed'
  const [feedItems, setFeedItems] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // { id, title }
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(import.meta.env.VITE_API_URL + '/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setCurrentUser(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEvents = useCallback(() => {
    setLoading(true);
    let url = import.meta.env.VITE_API_URL + '/events';
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'All') {
      params.append('category', selectedCategory);
    }
    if (timeFilter !== 'Any') {
      params.append('timeFilter', timeFilter.toLowerCase());
    }
    if (location) {
      params.append('lat', location.lat);
      params.append('lng', location.lng);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const token = localStorage.getItem('token');
    
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events", err);
        setLoading(false);
      });

    // Fetch smart matched events
    fetch(import.meta.env.VITE_API_URL + '/matches/events', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setRecommendedEvents(data.slice(0, 5)))
      .catch(err => console.error(err));

    // Fetch suggested partners
    fetch(import.meta.env.VITE_API_URL + '/matches/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setSuggestedPartners(data))
      .catch(err => console.error(err));

  }, [selectedCategory, timeFilter, location]);

  const fetchFeed = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_URL + '/feed', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setFeedItems(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchEvents();
    fetchFeed();
  }, [fetchEvents]);

  // Trigger animations when events change in list mode
  useEffect(() => {
    if (!loading && events.length > 0 && viewMode === 'list') {
      gsap.fromTo('.event-card-anim', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [loading, events, viewMode]);

  useEffect(() => {
    gsap.fromTo('.dashboard-header', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const handleFindNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Could not get your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleEventCreated = () => {
    setShowModal(false);
    fetchEvents();
  };

  const handleRsvp = async (eventId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Successfully RSVP'd!");
        fetchEvents();
      } else {
        alert("Failed to RSVP. You might already be attending or it's full.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Default center (e.g., New York if no geolocation is set)
  const mapCenter = location ? [location.lat, location.lng] : [40.7128, -74.0060];

  return (
    <div className="min-h-screen bg-background pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      
      {/* Header */}
      <div className="dashboard-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="font-display-md text-display-md text-on-surface uppercase tracking-tight mb-2">
            Ecosystem <span className="text-lime-vibe">Directory</span>
          </h2>
          <p className="font-body-lg text-body-lg text-text-muted">
            Discover and participate in premium real-world events.
          </p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex bg-surface-dark border border-surface-variant/30 rounded-DEFAULT overflow-hidden">
             <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 flex items-center gap-2 font-label-mono text-xs uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-surface-variant/50 text-lime-vibe' : 'text-text-muted hover:text-on-surface'}`}
             >
                <ListIcon size={16} /> List
             </button>
             <button 
                onClick={() => setViewMode('map')}
                className={`px-4 py-3 flex items-center gap-2 font-label-mono text-xs uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-surface-variant/50 text-lime-vibe' : 'text-text-muted hover:text-on-surface'}`}
             >
                <MapIcon size={16} /> Map
             </button>
             <button 
                onClick={() => setViewMode('feed')}
                className={`px-4 py-3 flex items-center gap-2 font-label-mono text-xs uppercase tracking-widest transition-all ${viewMode === 'feed' ? 'bg-surface-variant/50 text-lime-vibe' : 'text-text-muted hover:text-on-surface'}`}
             >
                <Activity size={16} /> Feed
             </button>
          </div>

          <button 
            onClick={handleFindNearMe}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-surface-variant/50 text-on-surface font-label-mono text-label-mono uppercase tracking-widest hover:border-lime-vibe hover:text-lime-vibe transition-all rounded-DEFAULT"
          >
            <MapPin size={18} /> Near Me
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-lime-vibe text-primary-container font-label-mono text-label-mono uppercase tracking-widest hover:bg-white transition-all glow-neon rounded-DEFAULT"
          >
            <Plus size={18} /> Initialize
          </button>
        </div>
      </div>
      
      <div className="dashboard-header flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-hide">
        {['All', 'Sports', 'Social', 'Fitness', 'Networking'].map((tag, idx) => (
          <button 
            key={idx} 
            onClick={() => setSelectedCategory(tag)}
            className={`px-5 py-2 font-label-mono text-label-mono uppercase tracking-widest rounded-full border transition-all whitespace-nowrap ${
              selectedCategory === tag 
                ? 'bg-surface-variant/30 border-lime-vibe text-lime-vibe' 
                : 'bg-transparent border-surface-variant/20 text-text-muted hover:border-surface-variant/50 hover:text-on-surface'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="dashboard-header flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide border-b border-surface-variant/10">
        {['Any', 'Today', 'Weekend'].map((tag, idx) => (
          <button 
            key={idx} 
            onClick={() => setTimeFilter(tag)}
            className={`px-4 py-1.5 font-label-mono text-[10px] uppercase tracking-widest rounded-full border transition-all whitespace-nowrap ${
              timeFilter === tag 
                ? 'bg-surface-variant/30 border-lime-vibe text-lime-vibe' 
                : 'bg-transparent border-surface-variant/20 text-text-muted hover:border-surface-variant/50 hover:text-on-surface'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {/* Suggested Partners Section */}
      {suggestedPartners.length > 0 && viewMode === 'list' && (
        <div className="mb-12 border-b border-surface-variant/20 pb-8">
          <h3 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-lime-vibe">group_add</span> SUGGESTED PARTNERS
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {suggestedPartners.map(user => (
              <div 
                key={`partner-${user.id}`} 
                className="min-w-[200px] w-[200px] snap-start bg-surface-container-low border border-surface-variant/30 rounded-xl p-4 text-center cursor-pointer hover:border-lime-vibe/50 transition-colors"
                onClick={() => setSelectedUserId(user.id)}
              >
                <div className="w-16 h-16 rounded-full bg-surface-variant/50 mx-auto mb-3 overflow-hidden">
                  {user.profilePhotoUrl ? (
                    <img src={user.profilePhotoUrl} alt={user.username} className="w-full h-full object-cover" />
                  ) : (
                    <User size={32} className="text-text-muted mt-4 mx-auto" />
                  )}
                </div>
                <h4 className="font-headline-sm text-white">{user.username}</h4>
                <p className="font-label-mono text-[10px] text-lime-vibe uppercase tracking-widest mt-1">
                  Match Score: {user.matchScore}
                </p>
                <p className="font-body-sm text-text-muted text-xs mt-2 line-clamp-2">
                  {user.sportsInterests}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* For You Section */}
      {recommendedEvents.length > 0 && viewMode === 'list' && (
        <div className="mb-12">
          <h3 className="font-headline-sm text-headline-sm text-lime-vibe uppercase tracking-tight mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">stars</span> SMART FEED
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {recommendedEvents.map(event => (
              <div key={`rec-${event.id}`} className="min-w-[300px] w-[300px] snap-start">
                <EventCard 
                  id={event.id}
                  title={event.title}
                  category={event.category}
                  date={new Date(event.date).toLocaleString([], {weekday: 'long', hour: '2-digit', minute:'2-digit'})}
                  rawDate={event.date}
                  location={event.location}
                  attendees={event.attendees}
                  maxAttendees={event.maxAttendees}
                  imageUrl={event.imageUrl}
                  host={event.host}
                  cost={event.cost}
                  skillLevel={event.skillLevel}
                  eventType={event.eventType}
                  isHighlighted={event.highlighted}
                  isHost={currentUser && event.host && currentUser.id === event.host.id}
                  onRsvp={handleRsvp}
                  onChat={(id, title) => setActiveChat({ id, title })}
                  onUserClick={setSelectedUserId}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      {loading ? (
        <div className="py-20 text-center font-label-mono text-lime-vibe uppercase tracking-widest animate-pulse">
          Scanning Network...
        </div>
      ) : viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-surface-variant/20 bg-surface-container-low rounded-lg">
              <p className="font-label-mono text-text-muted uppercase tracking-widest">No active protocols found for this sector.</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="event-card-anim">
                <EventCard 
                  id={event.id}
                  title={event.title}
                  category={event.category}
                  date={new Date(event.date).toLocaleString([], {weekday: 'long', hour: '2-digit', minute:'2-digit'})}
                  rawDate={event.date}
                  location={event.location}
                  attendees={event.attendees}
                  maxAttendees={event.maxAttendees}
                  imageUrl={event.imageUrl}
                  host={event.host}
                  cost={event.cost}
                  skillLevel={event.skillLevel}
                  eventType={event.eventType}
                  isHighlighted={event.highlighted}
                  isHost={currentUser && event.host && currentUser.id === event.host.id}
                  onRsvp={handleRsvp}
                  onChat={(id, title) => setActiveChat({ id, title })}
                  onUserClick={setSelectedUserId}
                />
              </div>
            ))
          )}
        </div>
      ) : viewMode === 'feed' ? (
        <div className="max-w-3xl mx-auto space-y-8">
          {feedItems.length === 0 ? (
            <div className="py-20 text-center border border-surface-variant/20 bg-surface-container-low rounded-lg">
              <p className="font-label-mono text-text-muted uppercase tracking-widest">No activity in your network yet. Start following operators!</p>
            </div>
          ) : (
            feedItems.map((item, idx) => (
              <div key={idx} className="bg-surface-container-low border border-surface-variant/20 rounded-2xl p-6 event-card-anim">
                <p className="font-label-mono text-sm text-lime-vibe uppercase tracking-widest mb-4">
                  <span 
                    className="text-white font-bold cursor-pointer hover:underline"
                    onClick={() => setSelectedUserId(item.actor.id)}
                  >
                    {item.actor.username}
                  </span> {item.action.toLowerCase()} an event
                </p>
                <EventCard 
                  id={item.event.id}
                  title={item.event.title}
                  category={item.event.category}
                  date={new Date(item.event.date).toLocaleString([], {weekday: 'long', hour: '2-digit', minute:'2-digit'})}
                  rawDate={item.event.date}
                  location={item.event.location}
                  attendees={item.event.attendees}
                  maxAttendees={item.event.maxAttendees}
                  imageUrl={item.event.imageUrl}
                  host={item.event.host}
                  cost={item.event.cost}
                  skillLevel={item.event.skillLevel}
                  eventType={item.event.eventType}
                  isHighlighted={item.event.highlighted}
                  isHost={currentUser && item.event.host && currentUser.id === item.event.host.id}
                  onRsvp={handleRsvp}
                  onChat={(id, title) => setActiveChat({ id, title })}
                  onUserClick={setSelectedUserId}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-surface-variant/20 z-0 relative">
          <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {events.map((event) => {
              // Add some slight random noise if latitude/longitude is missing to prevent overlapping at [0,0]
              const lat = event.latitude || mapCenter[0] + (Math.random() - 0.5) * 0.05;
              const lng = event.longitude || mapCenter[1] + (Math.random() - 0.5) * 0.05;
              
              return (
                <Marker key={event.id} position={[lat, lng]}>
                  <Popup>
                    <div className="text-center">
                       <strong className="font-bold text-sm block mb-1">{event.title}</strong>
                       <span className="text-xs text-gray-500 block mb-2">{event.location}</span>
                       <button 
                         onClick={() => handleRsvp(event.id)}
                         className="bg-indigo-600 text-white text-xs px-3 py-1 rounded w-full mb-1"
                       >
                         Join
                       </button>
                       <button 
                         onClick={() => setActiveChat({ id: event.id, title: event.title })}
                         className="bg-gray-800 text-white text-xs px-3 py-1 rounded w-full"
                       >
                         Chat
                       </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}

      {showModal && (
        <CreateEventModal 
          onClose={() => setShowModal(false)} 
          onEventCreated={handleEventCreated} 
        />
      )}

      {activeChat && (
        <ChatPanel 
          eventId={activeChat.id} 
          eventTitle={activeChat.title} 
          onClose={() => setActiveChat(null)} 
        />
      )}

      {selectedUserId && (
        <PublicProfileModal 
          userId={selectedUserId} 
          onClose={() => setSelectedUserId(null)} 
        />
      )}
    </div>
  );
};

export default ExplorePage;
