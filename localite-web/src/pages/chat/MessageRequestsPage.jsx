import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPendingRequests, acceptRequest, declineRequest } from '../../services/api';
import { 
  Tray, 
  EnvelopeOpen, 
  UserCheck, 
  X, 
  ShieldCheck, 
  CheckCircle,
  Clock
} from '@phosphor-icons/react';

export default function MessageRequestsPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getPendingRequests();
      const formatted = (data || []).map(req => ({
        id: req.connectionId,
        name: req.requesterName,
        message: 'Would like to connect with you on Localite.',
        date: 'Recently'
      }));
      setRequests(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'connect') {
        await acceptRequest(id);
      } else if (action === 'decline') {
        await declineRequest(id);
      }
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error(`Error performing ${action} on request:`, error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[var(--bg)] text-[var(--fg)] max-w-7xl mx-auto px-6 py-24 font-sans animate-fade-in">
      
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Direct Messaging
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Message Requests
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
            Incoming communications from prospective connections and event co-participants.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/messages')}
            className="px-4 py-2 border border-[var(--border)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-2"
          >
            <Tray size={16} />
            <span>Primary Inbox</span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Status Column */}
        <aside className="md:col-span-4 space-y-6">
          <div className="bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--fg)]">Navigation</h3>
            <div className="space-y-1 text-xs">
              <button 
                onClick={() => navigate('/messages')}
                className="w-full flex items-center justify-between p-2.5 rounded-card text-[var(--fg-muted)] hover:bg-[var(--bg-subtle)] transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <Tray size={16} /> Primary Inbox
                </span>
              </button>
              <div className="w-full flex items-center justify-between p-2.5 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] font-semibold text-left">
                <span className="flex items-center gap-2">
                  <EnvelopeOpen size={16} weight="fill" /> Pending Requests
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)] text-white">
                  {requests.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-6 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[var(--fg)] font-semibold">
              <ShieldCheck size={16} className="text-[var(--accent)]" />
              <span>Trust-Filtered Inflow</span>
            </div>
            <p className="text-[11px] text-[var(--fg-muted)] leading-relaxed">
              Message requests from unvetted accounts are held here. Accepting grants full direct messaging access.
            </p>
          </div>
        </aside>

        {/* Right Requests List */}
        <section className="md:col-span-8">
          {loading ? (
            <div className="py-24 text-center text-xs font-semibold uppercase tracking-widest text-[var(--fg-muted)]">
              Loading Requests...
            </div>
          ) : requests.length === 0 ? (
            <div className="py-24 text-center bg-[var(--bg)] rounded-card border border-[var(--border)] p-8">
              <EnvelopeOpen size={32} className="mx-auto text-[var(--fg-muted)] mb-3" />
              <p className="text-sm font-semibold text-[var(--fg)]">No Pending Message Requests</p>
              <p className="text-xs text-[var(--fg-muted)] mt-1">Your inbox is clear of unsolicited inquiries.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map(req => (
                <div 
                  key={req.id} 
                  className="p-6 bg-[var(--bg)] rounded-card border border-[var(--border)] hover:border-[var(--fg-muted)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-sm font-semibold text-[var(--fg)] shrink-0">
                      {(req.name || 'M').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--fg)]">{req.name}</h3>
                      <p className="text-xs text-[var(--fg-muted)] mt-1 leading-relaxed">"{req.message}"</p>
                      <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase tracking-wider block mt-2">
                        {req.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handleAction(req.id, 'decline')}
                      className="px-4 py-2 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg-muted)] hover:text-rose-600 rounded-card text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <X size={14} />
                      <span>Decline</span>
                    </button>
                    <button 
                      onClick={() => handleAction(req.id, 'connect')}
                      className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <UserCheck size={14} weight="bold" />
                      <span>Accept</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
