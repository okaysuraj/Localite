import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

const PeopleDiscoveryPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('article').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-container-margin py-stack-lg min-h-[calc(100vh-80px)]">
      {/* Header & Filters */}
      <section className="mb-stack-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter border-b border-surface-variant pb-stack-md">
          <div className="space-y-2">
            <h1 className="font-display-lg text-display-lg text-primary">Discover Localites</h1>
            <p className="font-body-lg text-on-surface-variant max-w-xl">
              Connecting you with a curated circle of professionals and enthusiasts in your neighborhood.
            </p>
          </div>
          <button className="bg-transparent border border-secondary text-secondary font-label-caps px-8 py-3 rounded-full hover:bg-secondary hover:text-on-secondary transition-all duration-300 flex items-center gap-2">
            <span className="material-symbols-outlined">group_add</span>
            Expand Your Circle
          </button>
        </div>
        
        <div className="mt-stack-md flex flex-wrap items-center gap-gutter">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-surface-variant hover:border-secondary transition-colors group">
            <span className="material-symbols-outlined text-secondary">distance</span>
            <span className="font-label-caps">Distance</span>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">expand_more</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-surface-variant hover:border-secondary transition-colors group">
            <span className="material-symbols-outlined text-secondary">interests</span>
            <span className="font-label-caps">Interests: Tennis, Architecture, Jazz</span>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">expand_more</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full border border-surface-variant hover:border-secondary transition-colors group">
            <span className="material-symbols-outlined text-secondary">work</span>
            <span className="font-label-caps">Profession</span>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">expand_more</span>
          </button>
          
          <div className="ml-auto flex items-center gap-stack-sm">
            <span className="text-on-surface-variant font-label-caps">View:</span>
            <button className="material-symbols-outlined p-2 text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</button>
            <button className="material-symbols-outlined p-2 text-outline hover:text-primary transition-colors">view_list</button>
          </div>
        </div>
      </section>

      {/* Member Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
        
        {loading ? (
          <p className="text-on-surface-variant font-body-md py-4">Finding localites...</p>
        ) : (
          users.map((user, index) => (
            <article key={user.id || index} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] hover:shadow-[0_24px_48px_-12px_rgba(10,25,47,0.12)] transition-all duration-500 group cursor-pointer border border-outline-variant/10 hover:border-primary/20">
              <div className="h-80 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={user.name || user.username} 
                  src={user.image || user.profilePhotoUrl}
                />
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                  <span className="font-label-caps text-[10px] text-primary">{user.distance || user.neighborhood}</span>
                </div>
              </div>
              <div className="p-stack-md space-y-4">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{user.name || user.username}</h3>
                  <p className="font-label-caps text-secondary">{user.role || user.bio}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(user.interests || []).length > 0 ? (
                    (Array.isArray(user.interests) ? user.interests : user.interests.split(',')).map((interest, i) => (
                      <span key={i} className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-[11px] font-label-caps">{interest.trim()}</span>
                    ))
                  ) : (
                    <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-[11px] font-label-caps">No interests listed</span>
                  )}
                </div>
                <button className="w-full py-3 border border-outline-variant hover:border-primary font-label-caps text-primary transition-colors rounded-lg">
                  Connect
                </button>
              </div>
            </article>
          ))
        )}

        {/* CTA Card */}
        <article className="bg-primary flex flex-col items-center justify-center p-stack-md rounded-xl text-center space-y-6 shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border border-primary relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary to-transparent group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="z-10 space-y-4 flex flex-col items-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-4xl">verified</span>
            </div>
            <h3 className="font-display-lg text-[32px] text-on-primary">Join the Inner Circle</h3>
            <p className="text-on-primary/70 font-body-md max-w-[240px]">Be featured in our elite directory and unlock premium community features.</p>
            <button className="bg-secondary text-on-secondary font-label-caps px-8 py-3 rounded-full hover:bg-secondary-fixed-dim transition-colors">
              Apply Now
            </button>
          </div>
        </article>
      </div>

      {/* Pagination / Load More */}
      <div className="mt-stack-lg flex flex-col items-center gap-gutter">
        <button className="bg-surface-container border border-surface-variant px-12 py-4 rounded-full font-label-caps text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2">
          Load More Localites
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
        <p className="text-on-surface-variant font-label-caps text-xs">Showing 5 of 248 Members</p>
      </div>
    </div>
  );
};

export default PeopleDiscoveryPage;
