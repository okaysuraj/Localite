import React, { useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { 
  Bell, 
  Envelope, 
  CalendarCheck, 
  Clock, 
  MapPin, 
  CheckCircle,
  FloppyDisk
} from '@phosphor-icons/react';

export default function NotificationPreferencesPage() {
  const [hubPush, setHubPush] = useState(true);
  const [hubEmail, setHubEmail] = useState(false);
  const [eventActivity, setEventActivity] = useState(true);
  const [eventLocation, setEventLocation] = useState(true);
  const [remind24h, setRemind24h] = useState(false);
  const [remind1h, setRemind1h] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SettingsLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
          <div>
            <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
              Event & Channel Etiquette
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Notification Preferences
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
              Fine-tune automated reminders, club invites, and event activity dispatches.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle size={16} weight="fill" /> Saved
              </span>
            )}
            <button 
              onClick={handleSave}
              className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <FloppyDisk size={16} weight="bold" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-6">
          
          {/* Hub & Club Invites */}
          <section className="bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
              <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <Envelope size={18} weight="fill" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">Hub & Salon Invites</h3>
                <p className="text-xs text-[var(--fg-muted)]">Control how host invitations reach you.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--fg)]">Push Dispatch</h4>
                  <p className="text-xs text-[var(--fg-muted)]">Immediate banner alert upon host invite.</p>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${hubPush ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setHubPush(!hubPush)}
                  aria-label="Toggle hub push"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${hubPush ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--fg)]">Email Notification</h4>
                  <p className="text-xs text-[var(--fg-muted)]">Send formal RSVP card to registered email.</p>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${hubEmail ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setHubEmail(!hubEmail)}
                  aria-label="Toggle hub email"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${hubEmail ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </section>

          {/* Event Reminders */}
          <section className="bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
              <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <CalendarCheck size={18} weight="fill" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">Attendance Reminders</h3>
                <p className="text-xs text-[var(--fg-muted)]">Automated alerts before confirmed sessions begin.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[var(--fg-muted)]" />
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--fg)]">24 Hours Prior</h4>
                    <p className="text-xs text-[var(--fg-muted)]">Day-before briefing with dress code and attendee preview.</p>
                  </div>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${remind24h ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setRemind24h(!remind24h)}
                  aria-label="Toggle 24h reminder"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${remind24h ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[var(--fg-muted)]" />
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--fg)]">1 Hour Prior</h4>
                    <p className="text-xs text-[var(--fg-muted)]">Navigation alert with entry QR code access.</p>
                  </div>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${remind1h ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setRemind1h(!remind1h)}
                  aria-label="Toggle 1h reminder"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${remind1h ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </section>

          {/* Real-Time Event Updates */}
          <section className="bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
              <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <Bell size={18} weight="fill" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">Live Event Activity</h3>
                <p className="text-xs text-[var(--fg-muted)]">Updates during an active match or gathering.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--fg)]">Host Broadcasts & Timeline</h4>
                  <p className="text-xs text-[var(--fg-muted)]">Live schedule shifts, room adjustments, and announcements.</p>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${eventActivity ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setEventActivity(!eventActivity)}
                  aria-label="Toggle host announcements"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${eventActivity ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[var(--fg-muted)]" />
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--fg)]">Venue Arrival Triggers</h4>
                    <p className="text-xs text-[var(--fg-muted)]">Auto-open entry badge when walking into venue geofence.</p>
                  </div>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${eventLocation ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setEventLocation(!eventLocation)}
                  aria-label="Toggle venue arrival triggers"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${eventLocation ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </SettingsLayout>
  );
}
