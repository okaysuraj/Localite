import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventById, getEventRsvps } from '../../services/api';
import { 
  ArrowLeft, 
  MagnifyingGlass, 
  CheckCircle, 
  Clock, 
  Star, 
  UserPlus, 
  CalendarBlank,
  ShieldCheck 
} from '@phosphor-icons/react';

export default function EventParticipantsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [eventData, rsvpData] = await Promise.all([
          getEventById(id),
          getEventRsvps(id)
        ]);
        setEvent(eventData);
        setParticipants(rsvpData || []);
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
      <div className="min-h-[50vh] flex items-center justify-center text-xs font-mono text-[var(--fg-muted)]">
        Loading guest roster...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-sm font-serif text-[var(--fg)]">Event not found.</p>
        <button 
          onClick={() => navigate('/events')}
          className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:underline"
        >
          Return to Events
        </button>
      </div>
    );
  }

  const filtered = participants.filter((p) => {
    const matchesSearch = p.user?.username?.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return matchesSearch;
    if (tab === 'attending') return matchesSearch && p.status === 'ATTENDING';
    if (tab === 'waitlist') return matchesSearch && p.status === 'WAITLIST';
    return matchesSearch;
  });

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
              Guest Registry
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">{event.title}</h1>
            <p className="text-xs sm:text-sm text-[var(--fg-muted)] flex items-center gap-2 pt-1">
              <span>{event.date ? new Date(event.date).toLocaleDateString() : 'Date TBD'}</span>
              <span>•</span>
              <span>Host: {event.host?.username || 'Verified Host'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to={`/events/${event.id}`}
              className="px-4 py-2 rounded-card border border-[var(--border)] bg-white text-xs font-mono uppercase tracking-wider text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              View Gathering
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-card border border-[var(--border)] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 border border-[var(--border)] rounded-card p-1 bg-[var(--bg-subtle)] text-xs font-mono">
            {['all', 'attending', 'waitlist'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-card uppercase tracking-wider transition-colors ${
                  tab === t ? 'bg-white text-[var(--fg)] shadow-xs font-medium' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                }`}
              >
                {t} ({t === 'all' ? participants.length : participants.filter((p) => p.status?.toLowerCase() === t).length})
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member..."
              className="w-full pl-9 pr-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div 
              key={p.id}
              className="bg-white rounded-card border border-[var(--border)] p-5 space-y-4 hover:border-[var(--fg-muted)] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--bg-subtle)] shrink-0">
                    <img 
                      src={p.user?.profileImageUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${p.user?.username || 'user'}`}
                      alt={p.user?.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[var(--fg)]">{p.user?.username || 'Member'}</h3>
                    <p className="text-[11px] font-mono text-[var(--fg-muted)]">{p.user?.title || 'Verified Neighbor'}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-card text-[10px] font-mono uppercase tracking-wider ${
                  p.status === 'ATTENDING' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-stone-100 text-stone-600 border border-stone-200'
                }`}>
                  {p.status || 'Registered'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[var(--border)] text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[var(--fg-muted)] uppercase block">Reputation</span>
                  <span className="text-sm font-medium text-[var(--accent)] mt-0.5 flex items-center gap-1">
                    <Star size={12} weight="fill" />
                    {p.user?.reputation || 95}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--fg-muted)] uppercase block">Attendance</span>
                  <span className="text-sm font-medium text-[var(--fg)] mt-0.5 block">
                    {p.user?.attendance || 12} Events
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Invite Box */}
          <div 
            onClick={() => alert('Invite link copied.')}
            className="border-2 border-dashed border-[var(--border)] rounded-card p-6 flex flex-col items-center justify-center text-center gap-2 hover:border-[var(--fg-muted)] hover:bg-white transition-all cursor-pointer min-h-[160px]"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--accent)]">
              <UserPlus size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--fg)]">Invite a Member</p>
              <p className="text-[11px] text-[var(--fg-muted)]">Share a direct invitation link</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
