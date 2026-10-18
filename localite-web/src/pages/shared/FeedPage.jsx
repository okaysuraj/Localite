import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFeed } from '../../services/api';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Sparkle, 
  CircleNotch,
  ArrowRight
} from '@phosphor-icons/react';

export default function FeedPage() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await getFeed();
        setFeedItems(data || []);
      } catch (error) {
        console.error("Failed to fetch feed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen font-sans text-[var(--fg)] animate-fade-in">
      
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Community Stream
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Network Activity Feed
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1">
            Real-time updates from your connections, registered clubs, and local hosts.
          </p>
        </div>
      </header>

      {/* Feed Stream */}
      {loading ? (
        <div className="flex justify-center py-24">
          <CircleNotch size={24} className="animate-spin text-[var(--accent)]" />
        </div>
      ) : feedItems.length === 0 ? (
        <div className="py-24 text-center bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8">
          <Users size={32} className="mx-auto text-[var(--fg-muted)] mb-3" />
          <p className="text-sm font-semibold text-[var(--fg)]">No Network Activity Recorded Yet</p>
          <p className="text-xs text-[var(--fg-muted)] mt-1">Connect with local members or RSVP to upcoming events to populate your feed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 hover:border-[var(--fg-muted)] transition-all space-y-4"
            >
              <div className="flex items-center gap-2 text-xs text-[var(--fg-muted)]">
                <Link to={`/profile/${item.actor?.id}`} className="font-semibold text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
                  {item.actor?.username || 'A member'}
                </Link>
                <span>{item.action?.toLowerCase() || 'published'} an event</span>
              </div>
              
              <div 
                onClick={() => navigate(`/event/${item.event?.id}`)}
                className="flex flex-col sm:flex-row gap-5 p-4 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] cursor-pointer hover:border-[var(--accent)] transition-all"
              >
                {item.event?.imageUrl && (
                  <div className="w-full sm:w-36 h-24 rounded-card overflow-hidden shrink-0 bg-neutral-200">
                    <img 
                      src={item.event.imageUrl} 
                      alt={item.event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] block mb-1">
                      {item.event?.category || 'Gathering'}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--fg)] leading-snug">
                      {item.event?.title || 'Community Gathering'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--fg-muted)] mt-3">
                    {item.event?.date && (
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {item.event.date}
                      </span>
                    )}
                    {item.event?.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={13} /> {item.event.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
