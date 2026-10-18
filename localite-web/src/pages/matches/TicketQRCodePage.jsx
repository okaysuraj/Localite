import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QrCode, ArrowLeft, ShieldCheck, DownloadSimple } from '@phosphor-icons/react';
import { getEventById, getCurrentUser } from '../../services/api';

export default function TicketQRCodePage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(eventId));

  useEffect(() => {
    async function loadData() {
      try {
        const [eventData, userData] = await Promise.all([
          getEventById(eventId).catch(() => null),
          getCurrentUser().catch(() => null),
        ]);
        setEvent(eventData);
        setUser(userData);
      } catch (err) {
        console.error('Failed to load ticket details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (eventId) {
      loadData();
    }
  }, [eventId]);

  const ticketRef = event && user ? `TKT-${event.id}-${user.id}` : `TKT-${eventId || '0000'}`;

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto space-y-6">
        {/* Navigation */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {loading ? (
          <div className="py-24 text-center text-sm text-[var(--fg-muted)] animate-pulse">
            Loading ticket pass details...
          </div>
        ) : (
          /* Minimalist Digital Ticket Pass */
          <div className="bg-white rounded-card border border-[var(--border)] overflow-hidden flex flex-col md:flex-row shadow-sm">
            {/* Visual Left */}
            <div className="md:w-72 h-56 md:h-auto bg-[var(--bg-subtle)] relative shrink-0">
              <img
                src={
                  event?.imageUrl ||
                  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'
                }
                alt={event?.title || 'Event Cover'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-mono uppercase text-white/80 block">Verified Pass</span>
                  <h3 className="text-lg font-serif text-white leading-snug">
                    {event?.title || 'Community Event Pass'}
                  </h3>
                </div>
              </div>
            </div>

            {/* Ticket Details Center */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-b md:border-b-0 md:border-r border-[var(--border)]">
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-2 text-[var(--accent)] font-mono uppercase tracking-wider text-[11px]">
                  <ShieldCheck size={16} />
                  <span>Confirmed Guest • Verified Status</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase block">
                    Date & Timing
                  </span>
                  <p className="text-sm font-medium text-[var(--fg)]">
                    {event?.date ? `${event.date} • ${event.time || 'TBD'}` : 'Scheduled Session'}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase block">
                    Venue & Entrance
                  </span>
                  <p className="text-sm font-medium text-[var(--fg)]">
                    {event?.location || 'Designated Neighborhood Location'}
                  </p>
                  <p className="text-[11px] text-[var(--fg-muted)]">
                    {event?.category || 'Community Gathering'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--border)]">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase block">
                      Guest Name
                    </span>
                    <p className="font-medium text-[var(--fg)] mt-0.5">
                      {user?.username || 'Verified Member'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[var(--fg-muted)] uppercase block">
                      Pass Reference
                    </span>
                    <p className="font-mono text-[var(--fg)] mt-0.5 font-medium">#{ticketRef}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)]"
                >
                  <DownloadSimple size={14} />
                  Save Offline / Print Pass
                </button>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="p-8 md:w-64 bg-[var(--bg-subtle)] flex flex-col items-center justify-center text-center space-y-4 shrink-0">
              <div className="p-3 bg-white rounded-card border border-[var(--border)] shadow-xs">
                <QrCode size={130} className="text-[var(--fg)]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-muted)] block">
                  Gate Scanner
                </span>
                <p className="text-[11px] text-[var(--fg-muted)] mt-0.5">Present code to host at check-in</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
