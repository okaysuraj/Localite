import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById, getEventRsvps } from '../services/api';

const MOCK_PARTICIPANTS = [
  {
    id: 1,
    user: {
      username: 'Elena Rossi',
      profileImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAegcPXQPVVhWgwHUy1ABMbIesRD5A5PSvgCb34E93-uHbe0A8BsBSiFS7Pg61qH-rHjiv1VvgqhUXEZOlzsflQJQ6NTY64R3woFk33RY3OgxTWN7ghuUHlML5lQiXj6wkz8RgbmizDI8sfWRxu_oDnSvy0KdE9oG-Uao4FFHHY78rczAzj_j_iYehacRlYu9NLigD-Rlvx7BmjnDg_x2tqT206N4c00nNwomQzmjNx6WUuN7_tZUML3w',
      title: 'LUXURY CURATOR',
      reputation: 82,
      attendance: 14
    },
    status: 'ATTENDING'
  },
  {
    id: 2,
    user: {
      username: 'Marcus Chen',
      profileImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6rJOveM2_A_sHt4Zmmwxt1d0NG9sV1oRV6iu2mH31bUxbk6-FjX4cHiGLKBbAjAfLxXm3D7d-oyvQcGJ-Ne5J30UcOIZCRYTljNYJ93h28hpT22TBvO9Qf7kJLreYxBise6b7N3vItcFYP0ulpKHt5UvKzzOtLFANCMfSSboPKjjUsahXHb-e3n617BKqH_S0LSCGZUuNuZlpjClvNXf99ZSC144MTJWc-R2SWF5-LXkVlkjWR5AqKQ',
      title: 'VENTURE ANALYST',
      reputation: 75,
      attendance: 8
    },
    status: 'WAITLIST'
  }
];

export default function EventParticipantsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [eventData, rsvpData] = await Promise.all([
          getEventById(id),
          getEventRsvps(id)
        ]);
        setEvent(eventData);
        // Fallback to mock if empty
        setParticipants(rsvpData.length > 0 ? rsvpData : MOCK_PARTICIPANTS);
      } catch (error) {
        console.error('Failed to fetch event participants data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center min-h-[500px]">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return <div className="p-8 text-center">Event not found.</div>;
  }

  const filteredParticipants = participants.filter(p => 
    p.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-container-margin max-w-7xl mx-auto space-y-stack-lg min-h-screen">
      {/* Event Summary Header */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-stack-sm">
          <div className="flex items-center gap-4">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-caps uppercase">
              {event.eventType || 'Event'}
            </span>
            <span className="text-on-surface-variant font-body-md">
              {event.date ? new Date(event.date).toLocaleDateString() : 'TBD'}
            </span>
          </div>
          <h2 className="font-display-lg text-display-lg text-primary leading-tight">{event.title}</h2>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src={event.host?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAE0Za2iNnaLe2P5NeAp4Ydag7W8aw6An6YlG-Fy61cs1MvWHTxOx5pzUE65OXqcHY36Vy4kAsG96cDhVetxPGma71rhtUA2UspOn_gNWYgkfyTTWk4xUGBoxnDih890yRy8wAJf8zhOyfEKJisGfrU6sldEheG-X7PkIeCkM-OdkqpDFtzTRm4McAa4YzX327BPCIaCtR9hat9R9GW3YCZUVs1I4jV7DXJ4jjbAxUF5Ry4uF1Zzu452g"}
                alt="Host"
              />
            </div>
            <span className="font-body-md font-bold">{event.host?.username || 'Host'}</span>
            <div className="flex items-center gap-1 bg-primary text-on-primary px-2 py-0.5 rounded text-[10px] font-label-caps">
              <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
              VERIFIED HOST
            </div>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start lg:items-end gap-stack-sm">
          <div className="flex gap-4">
            <Link to={`/event/${event.id}`} className="border border-secondary text-secondary px-6 py-3 rounded-xl font-label-caps uppercase hover:bg-secondary-fixed transition-colors">
              View Event
            </Link>
            <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-caps uppercase shadow-lg active:scale-95 transition-transform">
              Edit Event
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Directory Controls */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10">
        <div className="flex flex-wrap gap-3">
          <button className="bg-primary text-on-primary px-6 py-2 rounded-full text-label-caps transition-all">All Members ({participants.length})</button>
          <button className="bg-surface-variant text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container px-6 py-2 rounded-full text-label-caps transition-all">Attending</button>
          <button className="bg-surface-variant text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container px-6 py-2 rounded-full text-label-caps transition-all">Waitlist</button>
        </div>
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">person_search</span>
          <input 
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary-fixed-dim transition-all outline-none" 
            placeholder="Find a guest..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Member Directory Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stack-md">
        {filteredParticipants.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-6 shadow-sm border border-transparent hover:border-secondary-fixed-dim transition-all group flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary-fixed-dim">
                  <img 
                    className="w-full h-full object-cover" 
                    src={p.user.profileImageUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${p.user.username}&backgroundColor=b9c7e4`}
                    alt={p.user.username}
                  />
                </div>
                <div>
                  <h3 className="font-headline-sm text-primary">{p.user.username}</h3>
                  <p className="text-on-surface-variant font-label-caps">{p.user.title || 'MEMBER'}</p>
                </div>
              </div>
              {p.status === 'ATTENDING' && (
                <div className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded text-[10px] font-label-caps">CONFIRMED</div>
              )}
              {p.status === 'WAITLIST' && (
                <div className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded text-[10px] font-label-caps">WAITLIST</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/30">
              <div>
                <p className="text-label-caps text-on-surface-variant">REPUTATION</p>
                <div className="flex items-center gap-1">
                  <span className="font-headline-sm text-secondary">{p.user.reputation || 50}</span>
                  <span className="material-symbols-outlined text-secondary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
              </div>
              <div>
                <p className="text-label-caps text-on-surface-variant">ATTENDANCE</p>
                <p className="font-body-md font-bold text-primary">{p.user.attendance || 0} Events</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-body-md text-on-surface-variant flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${p.status === 'ATTENDING' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                {p.status === 'ATTENDING' ? 'Attending' : 'Pending'}
              </span>
              <button className="text-secondary font-label-caps uppercase hover:underline">View Profile</button>
            </div>
          </div>
        ))}
        
        {/* Add Invite Card */}
        <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-secondary hover:bg-surface-container-low transition-all cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-secondary-container transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-secondary-container text-3xl">person_add</span>
          </div>
          <div className="text-center">
            <h3 className="font-headline-sm text-on-surface-variant">Invite Guest</h3>
            <p className="text-body-md text-on-surface-variant">Add a verified member to the list</p>
          </div>
        </div>
      </section>
    </div>
  );
}
