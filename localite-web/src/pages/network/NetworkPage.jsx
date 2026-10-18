import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  ChatCircle, 
  MapPin, 
  ShieldCheck,
  CheckCircle,
  Clock
} from '@phosphor-icons/react';
import DirectMessagePanel from '../../components/DirectMessagePanel';
import { API_BASE_URL } from '../../services/api';

const NetworkPage = () => {
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMessageUser, setActiveMessageUser] = useState(null);
  const [connectedIds, setConnectedIds] = useState(new Set());

  useEffect(() => {
    fetchUsers();
    fetchPendingRequests();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_BASE_URL + '/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_BASE_URL + '/users/connections/pending', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPendingRequests(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnect = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/users/${userId}/connect`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setConnectedIds(prev => new Set(prev).add(userId));
      } else {
        const text = await res.text();
        alert(text || "Connection request sent!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (connectionId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/users/connections/${connectionId}/accept`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchPendingRequests();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-24 pb-16 px-6 max-w-7xl mx-auto font-sans animate-fade-in">
      
      {/* Top Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Community Registry
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Local Network
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
            Discover and connect with verified neighbors, match partners, and gathering hosts.
          </p>
        </div>
      </header>

      {/* Pending Connection Invitations */}
      {pendingRequests.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg)]">
              Pending Invitations ({pendingRequests.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingRequests.map(req => (
              <div 
                key={req.connectionId} 
                className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold text-[var(--fg)]">{req.requesterName}</h3>
                  <p className="text-xs text-[var(--fg-muted)] mt-0.5">Wants to connect</p>
                </div>
                <button 
                  onClick={() => handleAccept(req.connectionId)}
                  className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <UserCheck size={16} weight="bold" />
                  <span>Accept</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Member Directory */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-[var(--accent)]" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fg)]">
              Member Directory
            </h2>
          </div>
          <span className="text-xs text-[var(--fg-muted)]">{users.length} Localites</span>
        </div>
        
        {loading ? (
          <div className="py-24 text-center text-xs font-semibold uppercase tracking-widest text-[var(--fg-muted)]">
            Loading Directory...
          </div>
        ) : users.length === 0 ? (
          <div className="py-20 text-center bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8">
            <Users size={32} className="mx-auto text-[var(--fg-muted)] mb-3" />
            <p className="text-sm font-semibold text-[var(--fg)]">No Members Discovered Yet</p>
            <p className="text-xs text-[var(--fg-muted)] mt-1">Check back soon as new verified members join your neighborhood.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => {
              const isSent = connectedIds.has(user.id);
              return (
                <div 
                  key={user.id} 
                  className="bg-[var(--bg)] border border-[var(--border)] rounded-card p-6 flex flex-col justify-between hover:border-[var(--fg-muted)] transition-all"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4 pb-4 border-b border-[var(--border)]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-[var(--fg)]">
                            {user.username || user.name || 'Member'}
                          </h3>
                          {user.isVerified && (
                            <ShieldCheck size={16} weight="fill" className="text-emerald-600" title="Verified Localite" />
                          )}
                        </div>
                        <p className="text-xs text-[var(--accent)] font-medium flex items-center gap-1 mt-1">
                          <MapPin size={13} />
                          <span>{user.neighborhood || 'Local District'}</span>
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--fg)]">
                        {(user.username || user.name || 'M').substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                  
                    <p className="text-xs text-[var(--fg-muted)] mb-4 line-clamp-2 min-h-[32px] leading-relaxed">
                      {user.bio || 'Curating sporting matches and cultural evenings in the local sector.'}
                    </p>

                    {user.sportsInterests && (
                      <div className="mb-6">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] block mb-1">
                          Interests
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {user.sportsInterests.split(',').map((sport, i) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-full text-[var(--fg)]">
                              {sport.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
                    <button 
                      onClick={() => handleConnect(user.id)}
                      disabled={isSent}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-card text-xs font-semibold uppercase tracking-wider transition-all ${
                        isSent 
                          ? 'bg-[var(--bg-subtle)] text-emerald-600 border border-emerald-600/30' 
                          : 'bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white shadow-sm active:scale-95'
                      }`}
                    >
                      {isSent ? <CheckCircle size={14} weight="fill" /> : <UserPlus size={14} />}
                      <span>{isSent ? 'Sent' : 'Connect'}</span>
                    </button>
                    <button 
                      onClick={() => setActiveMessageUser(user)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-card border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <ChatCircle size={14} />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Direct Message Overlay */}
      <DirectMessagePanel 
        recipient={activeMessageUser} 
        onClose={() => setActiveMessageUser(null)} 
      />
    </div>
  );
};

export default NetworkPage;
