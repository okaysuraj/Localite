import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { checkInAttendee } from '../../services/api';
import { QrCode, CheckCircle, ArrowLeft, ShieldCheck, ForkKnife, Wine, Sparkle } from '@phosphor-icons/react';

export default function AttendanceCheckInPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [ticketId, setTicketId] = useState('');
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleValidate = async (e) => {
    if (e) e.preventDefault();
    if (!ticketId.trim()) {
      setStatusMessage('Please enter a valid ticket code.');
      setIsError(true);
      return;
    }

    setIsCheckingIn(true);
    setStatusMessage(null);
    setIsError(false);

    try {
      const res = await checkInAttendee(eventId, ticketId.trim());
      setStatusMessage(res || 'Attendee checked in successfully!');
      setIsError(false);
      setTicketId('');
    } catch (err) {
      console.error(err);
      setStatusMessage(err.message || 'Check-in failed');
      setIsError(true);
    } finally {
      setIsCheckingIn(false);
    }
  };

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-8 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Title */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Event
          </button>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-card">
            Live Check-in Portal
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif text-[var(--fg)]">Guest Arrival & Check-In</h1>
          <p className="text-xs sm:text-sm text-[var(--fg-muted)]">
            Validate attendee tickets directly against the live event roster.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Ticket Input Card */}
          <div className="md:col-span-7 bg-white rounded-card border border-[var(--border)] p-8 flex flex-col items-center justify-center text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
              Ticket Verification
            </span>

            <div className="p-6 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card relative">
              <QrCode size={120} className="text-[var(--fg)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-[var(--border)] text-[var(--accent)]">
                <ShieldCheck size={20} weight="fill" />
              </div>
            </div>

            <form onSubmit={handleValidate} className="w-full space-y-3">
              <input
                type="text"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="Scan or enter Ticket ID (UUID / Pass Code)"
                className="w-full px-4 py-2.5 rounded-btn border border-[var(--border)] text-xs font-mono text-center focus:outline-none focus:border-[var(--accent)]"
              />

              {statusMessage && (
                <div
                  className={`p-3 rounded-btn text-xs font-mono ${isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}
                >
                  {statusMessage}
                </div>
              )}

              <div className="flex gap-3 w-full pt-1">
                <button
                  type="submit"
                  disabled={isCheckingIn}
                  className="flex-1 py-3 rounded-card text-xs font-mono uppercase tracking-wider bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {isCheckingIn ? 'Validating...' : 'Confirm Entry'}
                </button>
              </div>
            </form>
          </div>

          {/* Details & Protocols */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-card border border-[var(--border)] p-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                Arrival Details
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                  <span className="text-[var(--fg-muted)] block text-[11px] font-mono uppercase">
                    Check-in Time
                  </span>
                  <span className="font-mono text-sm text-[var(--fg)] font-medium mt-0.5 block">
                    20:14 PM
                  </span>
                </div>
                <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                  <span className="text-[var(--fg-muted)] block text-[11px] font-mono uppercase">
                    Party Size
                  </span>
                  <span className="font-mono text-sm text-[var(--fg)] font-medium mt-0.5 block">
                    2 Guests
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-card border border-[var(--border)] p-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                Attendee Requirements
              </h4>
              <ul className="space-y-2.5 text-xs text-[var(--fg-muted)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-[var(--accent)] shrink-0 mt-0.5" weight="fill" />
                  <span>Attire: Smart casual or evening attire preferred.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="text-[var(--accent)] shrink-0 mt-0.5" weight="fill" />
                  <span>Access: Private conservatory section access granted.</span>
                </li>
              </ul>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-3 rounded-card border border-[var(--border)]">
                <ForkKnife size={16} className="mx-auto text-[var(--accent)] mb-1" />
                <span className="text-[10px] font-mono text-[var(--fg-muted)] block">Diet</span>
                <span className="text-[11px] text-[var(--fg)] font-medium truncate block">Vegan</span>
              </div>
              <div className="bg-white p-3 rounded-card border border-[var(--border)]">
                <Sparkle size={16} className="mx-auto text-[var(--accent)] mb-1" />
                <span className="text-[10px] font-mono text-[var(--fg-muted)] block">Tier</span>
                <span className="text-[11px] text-[var(--fg)] font-medium truncate block">Founding</span>
              </div>
              <div className="bg-white p-3 rounded-card border border-[var(--border)]">
                <Wine size={16} className="mx-auto text-[var(--accent)] mb-1" />
                <span className="text-[10px] font-mono text-[var(--fg-muted)] block">Area</span>
                <span className="text-[11px] text-[var(--fg)] font-medium truncate block">Row 04</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
