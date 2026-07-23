import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

export default function JoinMatchPage() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMatches(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-label-caps text-[12px] text-secondary mb-2 block uppercase tracking-widest">CURATED OPPORTUNITIES</span>
          <h2 className="font-display-lg text-[32px] md:text-[48px] text-primary font-bold">Discover Matches</h2>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-24 bg-surface-container-low rounded-xl">
          <p className="text-on-surface-variant text-lg">No matches available right now.</p>
        </div>
      ) : (
        <>
          {/* Featured Match */}
          {matches.length > 0 && (
            <section className="mb-12">
              <div 
                className="relative w-full h-[400px] md:h-[520px] bg-white rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] group cursor-pointer"
                onClick={() => navigate(`/events/${matches[0].id}`)}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={matches[0].imageUrl || 'https://via.placeholder.com/1200x600'} 
                    alt={matches[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div className="max-w-2xl">
                    <div className="flex gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary text-white font-label-caps text-[10px] tracking-[0.2em] rounded-full">ELITE</span>
                    </div>
                    <h3 className="font-headline-md text-[32px] md:text-[42px] text-white leading-tight mb-2">{matches[0].title}</h3>
                    <p className="text-white/80 font-body-lg mb-6">{matches[0].description}</p>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-white text-sm">location_on</span>
                      <span className="text-white">{matches[0].location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                    <button className="w-full md:w-auto px-10 py-4 bg-white text-primary font-label-caps text-[12px] uppercase tracking-widest rounded-xl hover:bg-surface-container transition-colors shadow-lg active:scale-95">
                      Request Entry
                    </button>
                    <span className="text-white/80 font-label-caps text-[10px]">{new Date(matches[0].date).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Other Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.slice(1).map(match => (
              <div 
                key={match.id} 
                className="bg-white rounded-xl shadow-[0_4px_20px_rgba(10,25,47,0.05)] group overflow-hidden flex flex-col hover:-translate-y-1 transition-transform cursor-pointer"
                onClick={() => navigate(`/events/${match.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={match.imageUrl || 'https://via.placeholder.com/400x300'} 
                    alt={match.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-secondary text-white font-label-caps text-[9px] rounded uppercase tracking-wider">Moderate</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="font-headline-sm text-lg text-primary mb-2 font-bold">{match.title}</h4>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">{match.description}</p>
                  <div className="mt-auto pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Time</span>
                      <span className="text-sm font-bold text-primary">{new Date(match.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Date</span>
                      <span className="text-sm font-bold text-primary">{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-3 border border-secondary text-secondary font-label-caps text-[11px] uppercase tracking-widest rounded-xl hover:bg-secondary hover:text-white transition-all active:scale-95">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
