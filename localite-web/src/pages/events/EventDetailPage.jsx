import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getEventById,
  rsvpToEvent,
  awardXp,
  getEventRsvps,
  buyTicket,
} from '../../services/api';
import {
  CalendarBlank,
  Clock,
  MapPin,
  ChatCircle,
  Users,
  NavigationArrow,
  ShareNetwork,
  ShieldCheck,
} from '@phosphor-icons/react';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  const handleRsvp = async () => {
    setRsvpLoading(true);
    try {
      if (event.cost > 0) {
        await buyTicket(id);
      }
      await rsvpToEvent(id);
      try {
        await awardXp('ATTEND_EVENT');
      } catch (xpErr) {
        console.log('Gamification disabled or failed:', xpErr);
      }
      alert('Successfully requested invitation! (+50 XP)');
      const data = await getEventById(id);
      setEvent(data);
    } catch (error) {
      alert('Failed to request invitation.');
    } finally {
      setRsvpLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, rsvpsData] = await Promise.all([
          getEventById(id),
          getEventRsvps(id),
        ]);
        setEvent(eventData);
        setRsvps(rsvpsData);
      } catch (error) {
        console.error('Failed to fetch event data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center">
        <h1 className="text-title text-fg mb-4">Event not found</h1>
        <button onClick={() => navigate('/explore')} className="btn-primary">
          Back to explore
        </button>
      </div>
    );
  }

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Date TBD';

  const formattedTime = event.date
    ? new Date(event.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Time TBD';

  return (
    <div className="min-h-screen bg-white">
      {/* Cover image */}
      <div className="relative w-full max-h-[480px] aspect-[21/9] overflow-hidden bg-bg-subtle">
        <img
          className="w-full h-full object-cover"
          src={
            event.imageUrl ||
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBZTlEW44hzhEmQbUmglulHRvRbxqYNSgRkw-p_FQlYZFui7hQQM3sRT-MwD4Cy53f6XLW5TuN6XYrDT8K5xVnVvjQyCkHmKooNcq4ziTDdJ9vVYktY3ROLIBXl5qIQsCTLf1rWRDPTlIwkB502ixRoKBY8vfFpOXWCeHwWSSB6ekDmUpygDg9L885nEX1XhRcCG0oBrMKUJFoSXnXnzFHRBLwpV6leCR3c2b_2COlZxiDcSKbjG6YzIw'
          }
          alt={event.title}
        />
      </div>

      {/* Content */}
      <section className="max-w-content mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Event info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header */}
            <div>
              <span className="tag text-micro mb-3 inline-block">
                {event.category || 'Event'}
              </span>
              <h1 className="text-display-sm md:text-display text-fg mb-4">
                {event.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap gap-6 text-body-sm text-fg-muted">
                <span className="flex items-center gap-2">
                  <CalendarBlank
                    size={16}
                    weight="bold"
                    className="text-accent"
                  />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} weight="bold" className="text-accent" />
                  {formattedTime}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} weight="bold" className="text-accent" />
                  {event.location}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-border pt-8">
              <h2 className="text-title-sm text-fg mb-4">About this event</h2>
              <div className="text-body text-fg-muted leading-relaxed space-y-4">
                <p>
                  {event.description ||
                    'Join us for this community event. More details coming soon.'}
                </p>
                {event.rules && (
                  <p className="font-medium text-fg">Rules: {event.rules}</p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-bg-subtle px-4 py-4 rounded-md">
                  <span className="block text-caption text-fg-muted mb-1">
                    Host
                  </span>
                  <span className="text-body-sm font-semibold text-fg">
                    {event.host?.username || 'Localite'}
                  </span>
                </div>
                <div className="bg-bg-subtle px-4 py-4 rounded-md">
                  <span className="block text-caption text-fg-muted mb-1">
                    Capacity
                  </span>
                  <span className="text-body-sm font-semibold text-fg">
                    {event.maxAttendees > 0
                      ? `${event.maxAttendees} spots`
                      : 'Unlimited'}
                  </span>
                </div>
                <div className="bg-bg-subtle px-4 py-4 rounded-md">
                  <span className="block text-caption text-fg-muted mb-1">
                    Attending
                  </span>
                  <span className="text-body-sm font-semibold text-fg">
                    {event.attendees || 0} people
                  </span>
                </div>
              </div>
            </div>

            {/* Attendees */}
            <div className="border-t border-border pt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-title-sm text-fg">Attendees</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/events/${id}/chat`)}
                    className="btn-ghost text-sm py-2 px-4"
                  >
                    <ChatCircle size={16} weight="bold" />
                    Chat
                  </button>
                  <button
                    onClick={() => navigate(`/events/${id}/participants`)}
                    className="btn-ghost text-sm py-2 px-4"
                  >
                    <Users size={16} weight="bold" />
                    All guests
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {rsvps.slice(0, 6).map((rsvp, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(`/profile/u/${rsvp.user.id}`)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border group-hover:border-accent transition-colors">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          rsvp.user.avatarUrl ||
                          `https://api.dicebear.com/7.x/notionists/svg?seed=${rsvp.user.username}&backgroundColor=b9c7e4`
                        }
                        alt={rsvp.user.username}
                      />
                    </div>
                    <span className="text-caption text-fg-muted group-hover:text-accent transition-colors">
                      {rsvp.user.username}
                    </span>
                  </button>
                ))}
                {rsvps.length > 6 && (
                  <button
                    onClick={() => navigate(`/events/${id}/participants`)}
                    className="w-12 h-12 rounded-full bg-bg-subtle flex items-center justify-center border border-border text-caption text-fg-muted hover:border-accent hover:text-accent transition-colors"
                  >
                    +{rsvps.length - 6}
                  </button>
                )}
                {rsvps.length === 0 && (
                  <p className="text-body-sm text-fg-muted">
                    Be the first to join this event.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Action sidebar */}
          <div className="lg:col-span-4">
            <div className="card p-6 sticky top-20 space-y-6">
              {/* Price */}
              <div>
                <span className="text-caption text-fg-muted">Price</span>
                <p className="text-title text-fg">
                  {event.cost > 0 ? `$${event.cost}` : 'Free'}
                  {event.cost > 0 && (
                    <span className="text-body-sm text-fg-muted ml-1">
                      / person
                    </span>
                  )}
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleRsvp}
                  disabled={rsvpLoading}
                  className="btn-primary w-full py-3"
                >
                  {rsvpLoading ? 'Processing...' : 'Join this event'}
                </button>
                <button className="btn-ghost w-full py-3">
                  <ShareNetwork size={16} weight="bold" />
                  Share
                </button>
              </div>

              <div className="border-t border-border pt-4 flex items-center gap-2 text-caption text-fg-muted">
                <ShieldCheck size={16} weight="bold" className="text-accent" />
                Verified by Localite
              </div>
            </div>

            {/* Venue card */}
            <div className="card p-6 mt-4">
              <h3 className="text-body font-semibold text-fg mb-3">Venue</h3>
              <div className="rounded-sm overflow-hidden h-40 mb-3 bg-bg-subtle">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Kun2P3C71Xl9JyqewIWoVJCjlBSHG2VCgx20NjH25chXKhBrG87vSq9jCXJ2StjJ7c75NWwRKpaCkUp4NDNPyMZo1hb50LLLoQEbGb1TYSMy8kBa2K9oxQf2_TvjNNS83Rgs9rtiWuhRMHqwOswFMRahjngD78ozHQq1N24Zwdw8xXWYEsRyUFy6Axup2eJ32YhQwciGgsOqRC4hK41hOOUR5i94TlgSSTAW6XC6hLNKf2bfEDsrTQ"
                  alt="Map view"
                />
              </div>
              <p className="text-body-sm font-medium text-fg mb-2">
                {event.location}
              </p>
              <button className="text-caption text-accent font-medium flex items-center gap-1 hover:underline">
                <NavigationArrow size={14} weight="bold" />
                Get directions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
