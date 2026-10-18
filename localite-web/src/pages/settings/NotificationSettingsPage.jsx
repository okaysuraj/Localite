import React, { useState, useEffect } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { auth } from '../../firebase';
import { API_URL } from '../../config';
import { 
  Bell, 
  ChatCircle, 
  MapPin, 
  ShieldCheck, 
  Envelope, 
  CheckCircle,
  FloppyDisk
} from '@phosphor-icons/react';

export default function NotificationSettingsPage() {
  const [pushInvitations, setPushInvitations] = useState(true);
  const [pushMessages, setPushMessages] = useState(true);
  const [pushLocation, setPushLocation] = useState(false);
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState('weekly');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const user = await res.json();
        setPushInvitations(user.pushInvitations !== false);
        setPushMessages(user.pushMessages !== false);
        setPushLocation(user.pushLocation || false);
        setSafetyAlerts(user.safetyAlerts !== false);
        setEmailDigest(user.emailDigest || 'weekly');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;
      const payload = {
        pushInvitations,
        pushMessages,
        pushLocation,
        safetyAlerts,
        emailDigest
      };
      
      const res = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
          <div>
            <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
              Preferences & Delivery
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Notification Settings
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
              Curate notifications across invitations, direct messaging, and periodic community digests.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {savedSuccess && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle size={16} weight="fill" /> Saved
              </span>
            )}
            <button 
              onClick={fetchSettings}
              className="px-4 py-2.5 border border-[var(--border)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-[var(--bg-subtle)] transition-colors"
            >
              Reset
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <FloppyDisk size={16} weight="bold" />
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Push Notifications Section */}
          <section className="col-span-1 lg:col-span-8 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)] flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
              <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                <Bell size={18} weight="fill" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">Push Notifications</h3>
                <p className="text-xs text-[var(--fg-muted)]">Delivered in real-time to your mobile and desktop devices.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Invitations */}
              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex gap-3.5 items-center">
                  <div className="w-9 h-9 rounded-card bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <Envelope size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--fg)]">Invitations & RSVPs</h4>
                    <p className="text-xs text-[var(--fg-muted)]">Instant alerts for gathering invites and status changes.</p>
                  </div>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${pushInvitations ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setPushInvitations(!pushInvitations)}
                  aria-label="Toggle invitations notification"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${pushInvitations ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {/* Messages */}
              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex gap-3.5 items-center">
                  <div className="w-9 h-9 rounded-card bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <ChatCircle size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--fg)]">Direct Messages & Groups</h4>
                    <p className="text-xs text-[var(--fg-muted)]">Activity updates from private chats and event rooms.</p>
                  </div>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${pushMessages ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setPushMessages(!pushMessages)}
                  aria-label="Toggle messages notification"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${pushMessages ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {/* Location Proximity */}
              <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex gap-3.5 items-center">
                  <div className="w-9 h-9 rounded-card bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--fg)]">Location Proximity</h4>
                    <p className="text-xs text-[var(--fg-muted)]">Nearby sports sessions, matches, and salons as you explore.</p>
                  </div>
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${pushLocation ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setPushLocation(!pushLocation)}
                  aria-label="Toggle location notification"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${pushLocation ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </section>

          {/* Privacy & Safety Alerts Section */}
          <section className="col-span-1 lg:col-span-4 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4 mb-5">
                <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <ShieldCheck size={18} weight="fill" />
                </span>
                <h3 className="text-base font-semibold text-[var(--fg)]">Safety Critical</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)] mb-1">Safety Advisories</h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Critical notices regarding local emergency alerts and account integrity.
                    </p>
                  </div>
                  <button 
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${safetyAlerts ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                    onClick={() => setSafetyAlerts(!safetyAlerts)}
                    aria-label="Toggle safety alerts"
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${safetyAlerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] mt-6">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] block mb-1">
                Zero Marketing Noise
              </span>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Localite operates under strict notification etiquette. We do not transmit promotional push notifications.
              </p>
            </div>
          </section>

          {/* Email Digest Section */}
          <section className="col-span-1 lg:col-span-12 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">Email Digest Cadence</h3>
                <p className="text-xs text-[var(--fg-muted)]">Periodic editorial summaries of matches, gatherings, and community leaders.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'weekly', title: 'Weekly Brief', desc: 'Weekend outlook and newly scheduled events in your city.' },
                { id: 'monthly', title: 'Monthly Summary', desc: 'Executive recap of your attendance, prestige progress, and network.' },
                { id: 'off', title: 'Completely Off', desc: 'Receive only transaction receipts and critical account security notices.' }
              ].map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setEmailDigest(item.id)}
                  className={`p-5 rounded-card border cursor-pointer transition-all ${
                    emailDigest === item.id 
                      ? 'border-[var(--accent)] bg-[var(--accent)]/5' 
                      : 'border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--fg-muted)]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-[var(--fg)]">{item.title}</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${emailDigest === item.id ? 'border-[var(--accent)]' : 'border-[var(--border)]'}`}>
                      {emailDigest === item.id && <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SettingsLayout>
  );
}
