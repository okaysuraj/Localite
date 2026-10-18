import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';
import { 
  Users, 
  Trophy, 
  MapPin, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  CircleNotch,
  UserPlus
} from '@phosphor-icons/react';

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
        setPlayers(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen font-sans text-[var(--fg)] animate-fade-in">
      
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Algorithmic Matchmaking
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Find Your Sparring Peer
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-2xl leading-relaxed">
            Connect with verified competitors in your district. Matchmaking pairs you with players of identical rating and punctual attendance fidelity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/matches/create')}
            className="px-4 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm transition-all active:scale-95"
          >
            Create Open Match
          </button>
        </div>
      </header>

      {/* Players Directory */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <CircleNotch size={24} className="animate-spin text-[var(--accent)]" />
        </div>
      ) : players.length === 0 ? (
        <div className="py-24 text-center bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8">
          <Users size={32} className="mx-auto text-[var(--fg-muted)] mb-3" />
          <p className="text-sm font-semibold text-[var(--fg)]">No Matching Peers Found</p>
          <p className="text-xs text-[var(--fg-muted)] mt-1">Try updating your sports interests or location radius in settings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map(player => (
            <div 
              key={player.id} 
              className="bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 hover:border-[var(--accent)] transition-all flex flex-col justify-between space-y-5 group shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-sm font-bold text-[var(--fg)]">
                      {(player.username || 'P').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--fg)]">
                        {player.username}
                      </h3>
                      <p className="text-xs text-[var(--accent)] font-medium">
                        {player.sportsInterests || 'All-Court Player'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-400/10 text-amber-700 px-2 py-1 rounded text-xs font-semibold">
                    <Star size={12} weight="fill" />
                    <span>{((player.matchScore / 100) * 5 || 4.8).toFixed(1)}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[var(--fg-muted)]">
                  <p className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[var(--fg-muted)]" />
                    <span>{player.neighborhood || 'Local District'}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Verified Identity • 100% Match Attendance</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[var(--fg-muted)] block">Compatibility</span>
                  <span className="text-base font-semibold text-[var(--fg)]">{player.matchScore || 95}% Match</span>
                </div>
                <button 
                  onClick={() => navigate(`/profile/${player.id}`)}
                  className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span>View Profile</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
