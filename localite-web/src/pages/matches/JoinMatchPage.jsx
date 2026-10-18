import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';
import { 
  Trophy, 
  MapPin, 
  CalendarBlank, 
  Users, 
  ArrowLeft, 
  Plus, 
  ArrowRight 
} from '@phosphor-icons/react';

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
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/matches/events`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMatches(data || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div className="space-y-1">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-2"
            >
              <ArrowLeft size={16} />
              Return
            </button>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
              Athletic Roster
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">Find Competitive Matches</h1>
            <p className="text-xs sm:text-sm text-[var(--fg-muted)] max-w-xl mt-1">
              Join open court sessions, soccer fixtures, and tennis leagues organized by verified local players.
            </p>
          </div>

          <button 
            type="button" 
            onClick={() => navigate('/matches/create')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors self-start sm:self-auto"
          >
            <Plus size={16} />
            Create Match
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-card border border-[var(--border)] p-12 text-center text-xs font-mono text-[var(--fg-muted)]">
            Scanning active matchups...
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-white rounded-card border border-[var(--border)] p-12 text-center space-y-4">
            <Trophy size={36} className="mx-auto text-[var(--fg-muted)]" />
            <h3 className="text-base font-serif text-[var(--fg)]">No active matches found</h3>
            <p className="text-xs text-[var(--fg-muted)] max-w-sm mx-auto">
              Be the first to host a match on your local courts or grounds.
            </p>
            <button
              type="button"
              onClick={() => navigate('/matches/create')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
            >
              Schedule Match
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div 
                key={match.id}
                onClick={() => navigate(`/events/${match.id}`)}
                className="bg-white rounded-card border border-[var(--border)] overflow-hidden hover:border-[var(--fg-muted)] transition-all cursor-pointer group flex flex-col"
              >
                <div className="h-44 w-full relative bg-[var(--bg-subtle)] overflow-hidden">
                  <img 
                    src={match.imageUrl || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=600'} 
                    alt={match.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-[var(--accent)] text-white px-2.5 py-0.5 rounded-card text-[10px] font-mono">
                    {match.category || 'Athletics'}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[var(--accent)] block">
                      {match.eventType || 'Open Match'}
                    </span>
                    <h3 className="text-base font-serif text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                      {match.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] space-y-1.5 text-xs text-[var(--fg-muted)] font-mono">
                    <div className="flex items-center gap-2">
                      <CalendarBlank size={14} className="text-[var(--fg)] shrink-0" />
                      <span>{match.date ? new Date(match.date).toLocaleString() : 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[var(--fg)] shrink-0" />
                      <span className="truncate">{match.location || 'Local Grounds'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
