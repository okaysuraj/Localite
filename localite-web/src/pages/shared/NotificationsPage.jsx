import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CalendarCheck, 
  ShieldCheck, 
  CheckCircle, 
  Check,
  CircleNotch
} from '@phosphor-icons/react';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ACTIVITY');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-24 min-h-screen font-sans text-[var(--fg)] animate-fade-in">
      
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            System & Community Updates
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Notifications
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1">
            Real-time activity regarding gathering invitations, matches, and safety advisories.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-[var(--border)] mb-8">
        <button 
          className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
            activeTab === 'ACTIVITY' ? 'text-[var(--accent)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
          }`}
          onClick={() => setActiveTab('ACTIVITY')}
        >
          Activity
          {activeTab === 'ACTIVITY' && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[var(--accent)]"></div>
          )}
        </button>
        <button 
          className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
            activeTab === 'COMMUNITY' ? 'text-[var(--accent)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
          }`}
          onClick={() => setActiveTab('COMMUNITY')}
        >
          Community
          {activeTab === 'COMMUNITY' && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[var(--accent)]"></div>
          )}
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <CircleNotch size={24} className="animate-spin text-[var(--accent)]" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-24 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8">
          <Bell size={32} className="mx-auto text-[var(--fg-muted)] mb-3" />
          <p className="text-sm font-semibold text-[var(--fg)]">No Unread Notifications</p>
          <p className="text-xs text-[var(--fg-muted)] mt-1">You are completely up to date with your community schedule.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(notif => {
            const timeStr = new Date(notif.createdAt || Date.now()).toLocaleDateString([], {
              month: 'short',
              day: 'numeric'
            });
            const isRead = notif.read;

            return (
              <div 
                key={notif.id} 
                onClick={() => handleMarkAsRead(notif.id)}
                className={`p-5 rounded-card border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isRead 
                    ? 'bg-[var(--bg)] border-[var(--border)] opacity-60' 
                    : 'bg-[var(--bg-subtle)] border-[var(--border)] hover:border-[var(--accent)]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-card flex items-center justify-center shrink-0 ${
                    notif.type === 'EVENT' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-[var(--accent)]/10 text-[var(--accent)]'
                  }`}>
                    {notif.type === 'EVENT' ? <CalendarCheck size={18} /> : <ShieldCheck size={18} />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                        {notif.type || 'NOTIFICATION'}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--fg-muted)]">• {timeStr}</span>
                    </div>
                    <p className="text-xs text-[var(--fg)] leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>

                {!isRead && (
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" title="Unread"></span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
