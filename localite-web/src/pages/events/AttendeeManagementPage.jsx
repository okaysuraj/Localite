import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventRsvps, checkInAttendee } from '../../services/api';
import { 
  MagnifyingGlass, 
  QrCode, 
  ChatCircleDots, 
  Eye, 
  ArrowLeft, 
  Funnel, 
  CheckCircle, 
  Clock, 
  Users, 
  Sparkle,
  ForkKnife,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react';

export default function AttendeeManagementPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAttendees();
  }, [eventId]);

  const fetchAttendees = async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const data = await getEventRsvps(eventId);
      if (Array.isArray(data)) {
        const formatted = data.map((rsvp) => ({
          id: rsvp.id,
          name: rsvp.user?.username || 'Guest Member',
          rsvp: rsvp.ticketId ? `TICKET-${rsvp.ticketId.slice(0, 8)}` : `RSVP-${rsvp.id}`,
          ticketId: rsvp.ticketId,
          status: rsvp.status === 'ATTENDED' ? 'Arrived' : rsvp.status === 'GOING' ? 'Confirmed' : rsvp.status,
          tier: rsvp.user?.isVerified ? 'Verified Local' : 'Member',
          dietary: 'Standard Guest',
          avatar: rsvp.user?.profilePhotoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${rsvp.user?.username || 'Member'}`
        }));
        setAttendees(formatted);
      }
    } catch (err) {
      console.error('Failed to load attendees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualCheckIn = async (ticketId) => {
    if (!ticketId) return;
    try {
      await checkInAttendee(eventId, ticketId);
      alert('Attendee checked in successfully.');
      fetchAttendees();
    } catch (err) {
      alert(err.message || 'Check-in failed');
    }
  };

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-8 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <h1 className="text-2xl sm:text-3xl font-serif text-[var(--fg)]">Guest Management Console</h1>
            <p className="text-xs sm:text-sm text-[var(--fg-muted)]">Oversee attendance, dietary logistics, and gate verification.</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => navigate(`/events/${eventId || '1'}/checkin`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
            >
              <QrCode size={16} />
              Open Scanner
            </button>
          </div>
        </div>

        {/* Bento Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border border-[var(--border)]">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Confirmed Guests</p>
            <p className="text-2xl font-serif text-[var(--fg)] mt-1">{attendees.length}</p>
            <p className="text-[11px] font-mono text-[var(--accent)] mt-0.5">Live Database Roster</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)]">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Checked In</p>
            <p className="text-2xl font-serif text-[var(--fg)] mt-1">{attendees.filter(a => a.status === 'Arrived').length}</p>
            <p className="text-[11px] font-mono text-[var(--fg-muted)] mt-0.5">Verified at Gate</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)]">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Pending Arrival</p>
            <p className="text-2xl font-serif text-[var(--fg)] mt-1">{attendees.filter(a => a.status !== 'Arrived').length}</p>
            <p className="text-[11px] font-mono text-amber-600 mt-0.5">Expected guests</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)]">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Event ID</p>
            <p className="text-2xl font-serif text-[var(--fg)] mt-1">#{eventId || 'N/A'}</p>
            <p className="text-[11px] font-mono text-[var(--fg-muted)] mt-0.5">Active Session</p>
          </div>
        </div>

        {/* Table & Controls Section */}
        <div className="bg-white rounded-card border border-[var(--border)] overflow-hidden">
          {/* Action Row */}
          <div className="p-4 border-b border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 border border-[var(--border)] rounded-card p-1 bg-[var(--bg-subtle)] text-xs font-mono">
              {['all', 'arrived', 'pending', 'waitlist'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-card uppercase tracking-wider transition-colors ${
                    tab === t ? 'bg-white text-[var(--fg)] shadow-xs font-medium' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guest or RSVP..."
                className="w-full pl-9 pr-3 py-1.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-subtle)] border-b border-[var(--border)] text-[11px] font-mono uppercase text-[var(--fg-muted)]">
                <tr>
                  <th className="py-3 px-4 font-normal">Attendee</th>
                  <th className="py-3 px-4 font-normal">Status</th>
                  <th className="py-3 px-4 font-normal">Tier</th>
                  <th className="py-3 px-4 font-normal">Dietary Note</th>
                  <th className="py-3 px-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {attendees.map((guest) => (
                  <tr key={guest.id} className="hover:bg-[var(--bg-subtle)]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={guest.avatar} alt={guest.name} className="w-8 h-8 rounded-full object-cover border border-[var(--border)]" />
                        <div>
                          <p className="font-medium text-[var(--fg)] text-sm">{guest.name}</p>
                          <p className="font-mono text-[11px] text-[var(--fg-muted)]">{guest.rsvp}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-card font-mono text-[10px] uppercase tracking-wider ${
                        guest.status === 'Arrived' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : guest.status === 'En Route' 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {guest.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-[11px] text-[var(--fg)]">{guest.tier}</span>
                    </td>
                    <td className="py-3 px-4 text-[var(--fg-muted)]">
                      {guest.dietary}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {guest.status !== 'Arrived' && guest.ticketId && (
                          <button
                            type="button"
                            onClick={() => handleManualCheckIn(guest.ticketId)}
                            className="px-2 py-1 rounded-card bg-[var(--accent)] text-white text-[10px] font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
                          >
                            Check In
                          </button>
                        )}
                        <button type="button" className="p-1.5 rounded-card border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-white transition-colors" title="Message">
                          <ChatCircleDots size={14} />
                        </button>
                        <button type="button" className="p-1.5 rounded-card border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-white transition-colors" title="View Profile">
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
            <span>Showing 1-4 of 142 guests</span>
            <div className="flex items-center gap-1">
              <button type="button" className="p-1 border border-[var(--border)] rounded-card hover:bg-white transition-colors">
                <CaretLeft size={14} />
              </button>
              <span className="px-2">Page 1</span>
              <button type="button" className="p-1 border border-[var(--border)] rounded-card hover:bg-white transition-colors">
                <CaretRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
