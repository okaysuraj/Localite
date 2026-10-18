import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, getSuggestedPartners } from '../../services/api';
import { MapPin, Users, User } from '@phosphor-icons/react';

const ExplorePage = () => {
  const [events, setEvents] = useState([]);
  const [suggestedPartners, setSuggestedPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [data, partnersData] = await Promise.all([
          getEvents(),
          getSuggestedPartners(),
        ]);
        setEvents(data);
        setSuggestedPartners(partnersData);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      {/* Hero: Featured event */}
      {events.length > 0 && (
        <section className="mb-12">
          <Link
            to={`/events/${events[0].id}`}
            className="block relative w-full aspect-[21/9] overflow-hidden rounded-md bg-bg-subtle group"
          >
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              alt={events[0].title}
              src={events[0].imageUrl || events[0].image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <span className="tag mb-3 inline-block">Featured</span>
              <h1 className="text-display-sm md:text-display text-white mb-2">
                {events[0].title}
              </h1>
              <p className="text-body text-white/80 max-w-xl line-clamp-2">
                {events[0].description}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Events grid */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-title-sm text-fg">Upcoming events</h2>
            <Link
              to="/events"
              className="text-body-sm text-accent font-medium hover:underline"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="card animate-pulse"
                >
                  <div className="aspect-[16/10] bg-bg-subtle" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-16 bg-bg-subtle rounded" />
                    <div className="h-5 w-3/4 bg-bg-subtle rounded" />
                    <div className="h-3 w-1/2 bg-bg-subtle rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.slice(1).map((event, index) => (
                <Link
                  key={event.id || index}
                  to={`/events/${event.id}`}
                  className="card card-hover group"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-bg-subtle">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      alt={event.title}
                      src={event.imageUrl || event.image}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className="tag text-micro mb-3 inline-block">
                      {event.category || event.eventType || 'Event'}
                    </span>
                    <h3 className="text-body font-semibold text-fg mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-200">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-4 text-caption text-fg-muted">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} weight="bold" />
                        {event.location || 'Location TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} weight="bold" />
                        {event.attendees || 0}
                      </span>
                    </div>

                    {event.date && (
                      <p className="text-caption text-fg-faint font-mono mt-3">
                        {event.date}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right: Sidebar */}
        <aside className="lg:col-span-4">
          <div className="card p-6 sticky top-20">
            <h3 className="text-body font-semibold text-fg mb-5">
              People you may know
            </h3>

            <div className="space-y-4">
              {suggestedPartners.length === 0 ? (
                <p className="text-body-sm text-fg-muted">
                  No suggestions right now.
                </p>
              ) : (
                suggestedPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-bg-subtle overflow-hidden flex items-center justify-center flex-shrink-0">
                        {partner.profilePhotoUrl ? (
                          <img
                            className="w-full h-full object-cover"
                            alt={partner.username}
                            src={partner.profilePhotoUrl}
                          />
                        ) : (
                          <User
                            size={16}
                            weight="bold"
                            className="text-fg-faint"
                          />
                        )}
                      </div>
                      <span className="text-body-sm font-medium text-fg">
                        {partner.username}
                      </span>
                    </div>
                    <button className="text-caption text-accent font-medium hover:underline">
                      Follow
                    </button>
                  </div>
                ))
              )}
            </div>

            <Link
              to="/network"
              className="btn-ghost w-full text-center mt-6 text-sm py-2"
            >
              See more
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExplorePage;
