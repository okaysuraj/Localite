import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { API_URL } from '../config';

export default function FindPlayersPage() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestedPlayers();
  }, []);

  const fetchSuggestedPlayers = async () => {
    try {
      setLoading(true);
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/matches/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPlayers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-12">
        <h1 className="font-display-lg text-[32px] md:text-display-lg text-primary mb-2">Find Your Peer</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">Connect with elite-level competitors in your area. Our proprietary matchmaking ensures high-stakes matches with members of impeccable reliability.</p>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map(player => (
            <div key={player.id} className="bg-white rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.06)] transition-transform hover:-translate-y-2 duration-300">
              <div className="relative h-64 w-full bg-surface-container-highest">
                <img 
                  src={player.profilePhotoUrl || 'https://via.placeholder.com/400x300'} 
                  alt={player.username}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[16px]">star</span>
                  <span className="font-bold text-on-surface">{((player.matchScore / 100) * 5).toFixed(1)}</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img 
                      src={player.profilePhotoUrl || 'https://via.placeholder.com/50'}
                      className="w-12 h-12 rounded-full border-2 border-secondary object-cover"
                    />
                    <div>
                      <h3 className="font-headline-sm text-[24px] font-bold text-primary">{player.username}</h3>
                      <p className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">{player.sportsInterests || 'Elite Member'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="bg-surface-container-low px-3 py-1 rounded-lg text-[11px] font-label-caps text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span> VERIFIED
                  </span>
                  <span className="bg-surface-container-low px-3 py-1 rounded-lg text-[11px] font-label-caps text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">location_on</span> {player.neighborhood || 'LOCAL'}
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Match Score</span>
                    <span className="font-body-md font-bold text-primary">{player.matchScore}%</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/profile/${player.id}`)}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-label-caps text-[12px] uppercase tracking-widest hover:bg-primary-container transition-colors active:scale-95"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
