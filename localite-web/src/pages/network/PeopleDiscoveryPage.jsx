import { useEffect, useState } from 'react';
import { getUsers, sendConnectionRequest } from '../../services/api';
import {
  Users,
  UserPlus,
  MapPin,
  Briefcase,
  SquaresFour,
  ListBullets,
  ShieldCheck,
  CheckCircle,
} from '@phosphor-icons/react';

export default function PeopleDiscoveryPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filterInterest, setFilterInterest] = useState('all');
  const [connectedIds, setConnectedIds] = useState(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data || []);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleConnect = async (id) => {
    try {
      await sendConnectionRequest(id);
      setConnectedIds((prev) => new Set(prev).add(id));
    } catch (err) {
      console.error('Error sending connection request:', err);
      // Even if already sent or pending, mark as requested
      setConnectedIds((prev) => new Set(prev).add(id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-[calc(100vh-80px)] font-sans text-[var(--fg)] animate-fade-in">
      {/* Header & Filters */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
          <div>
            <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
              Curated Community
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Discover Localites
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
              Connecting you with verified professionals, athletic sparring partners, and salon patrons.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--fg-muted)]">{users.length} active in district</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {['all', 'Tennis', 'Architecture', 'Running', 'Literature'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterInterest(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterInterest === tag
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-subtle)] text-[var(--fg-muted)] hover:text-[var(--fg)] border border-[var(--border)]'
                }`}
              >
                {tag === 'all' ? 'All Passions' : tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-1 rounded-card border border-[var(--border)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'grid' ? 'bg-[var(--bg)] text-[var(--fg)] shadow-sm' : 'text-[var(--fg-muted)]'}`}
              title="Grid view"
            >
              <SquaresFour size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'list' ? 'bg-[var(--bg)] text-[var(--fg)] shadow-sm' : 'text-[var(--fg-muted)]'}`}
              title="List view"
            >
              <ListBullets size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Member Directory */}
      {loading ? (
        <div className="py-24 text-center text-xs font-semibold uppercase tracking-widest text-[var(--fg-muted)]">
          Scanning Neighborhood Directory...
        </div>
      ) : users.length === 0 ? (
        <div className="py-20 text-center bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8">
          <Users size={32} className="mx-auto text-[var(--fg-muted)] mb-3" />
          <p className="text-sm font-semibold text-[var(--fg)]">No Members Found</p>
          <p className="text-xs text-[var(--fg-muted)] mt-1">
            Try widening your filters to see more members.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-3'
          }
        >
          {users.map((user, index) => {
            const isSent = connectedIds.has(user.id || index);
            return (
              <article
                key={user.id || index}
                className={`bg-[var(--bg)] rounded-card border border-[var(--border)] hover:border-[var(--fg-muted)] transition-all overflow-hidden flex flex-col justify-between ${
                  viewMode === 'list' ? 'p-5 md:flex-row md:items-center' : 'p-6'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-sm font-semibold text-[var(--fg)] shrink-0">
                    {(user.name || user.username || 'L').substring(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-[var(--fg)]">
                        {user.name || user.username || 'Localite Member'}
                      </h3>
                      {user.isVerified && (
                        <ShieldCheck
                          size={16}
                          weight="fill"
                          className="text-emerald-600"
                          title="Verified Member"
                        />
                      )}
                    </div>

                    <p className="text-xs text-[var(--accent)] font-medium flex items-center gap-1 mt-0.5">
                      <MapPin size={13} />
                      <span>{user.neighborhood || user.location || 'Local Metro'}</span>
                    </p>

                    {user.profession && (
                      <p className="text-xs text-[var(--fg-muted)] flex items-center gap-1 mt-1">
                        <Briefcase size={13} />
                        <span>{user.profession}</span>
                      </p>
                    )}

                    <p className="text-xs text-[var(--fg-muted)] mt-2 line-clamp-2 leading-relaxed">
                      {user.bio || 'Curating sports sessions and community salons across the neighborhood.'}
                    </p>

                    {user.interests && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {(Array.isArray(user.interests) ? user.interests : user.interests.split(',')).map(
                          (tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-full text-[var(--fg-muted)]"
                            >
                              {tag.trim()}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`mt-5 pt-4 border-t border-[var(--border)] ${viewMode === 'list' ? 'md:mt-0 md:pt-0 md:border-t-0 md:ml-4' : ''}`}
                >
                  <button
                    onClick={() => handleConnect(user.id || index)}
                    disabled={isSent}
                    className={`w-full md:w-auto px-4 py-2 rounded-card text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      isSent
                        ? 'bg-[var(--bg-subtle)] text-emerald-600 border border-emerald-600/30'
                        : 'bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white shadow-sm active:scale-95'
                    }`}
                  >
                    {isSent ? <CheckCircle size={14} weight="fill" /> : <UserPlus size={14} />}
                    <span>{isSent ? 'Invitation Sent' : 'Connect'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
