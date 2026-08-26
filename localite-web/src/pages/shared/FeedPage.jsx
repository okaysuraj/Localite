import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFeed } from '../../services/api';

const FeedPage = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await getFeed();
        setFeedItems(data);
      } catch (error) {
        console.error("Failed to fetch feed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface-container-lowest">
        <p className="text-secondary font-label-caps animate-pulse tracking-widest">LOADING NETWORK FEED...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-container-margin py-stack-lg">
      <div className="flex justify-between items-end border-b border-surface-container pb-4 mb-stack-md">
        <h2 className="font-display-lg text-display-lg md:text-headline-md">Network Feed</h2>
      </div>

      {feedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-surface-container-low rounded-xl border border-surface-container-high">
          <span className="material-symbols-outlined text-6xl text-outline mb-4">group</span>
          <p className="text-on-surface-variant font-body-md text-center">
            No activity in your network yet. Start following operators!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {feedItems.map((item, index) => (
            <div key={index} className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high p-6 flex flex-col group transition-all duration-300 hover:shadow-md">
              <p className="font-label-caps text-label-caps text-secondary mb-4 uppercase tracking-wider">
                <Link to={`/profile/${item.actor.id}`} className="text-on-surface font-bold hover:underline">
                  {item.actor.username}
                </Link> {item.action.toLowerCase()} an event
              </p>
              
              <div 
                className="flex flex-col md:flex-row gap-6 cursor-pointer"
                onClick={() => navigate(`/events/${item.event.id}`)}
              >
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.event.imageUrl || item.event.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420'} 
                    alt={item.event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-label-caps text-outline mb-1">
                    {item.event.category || item.event.eventType || 'EVENT'}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm mb-2 group-hover:text-primary transition-colors">
                    {item.event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-on-surface-variant text-sm">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {item.event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {item.event.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
