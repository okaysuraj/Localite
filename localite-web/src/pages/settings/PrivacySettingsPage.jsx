import { useState, useEffect } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { auth } from '../../firebase';
import { API_URL } from '../../config';
import {
  Eye,
  Users,
  Prohibit,
  CheckCircle,
  CaretDown,
  CaretUp,
  LockKey,
  FloppyDisk,
  UserMinus,
} from '@phosphor-icons/react';

export default function PrivacySettingsPage() {
  const [publicProfile, setPublicProfile] = useState(false);
  const [liveActivity, setLiveActivity] = useState(true);
  const [preciseLocation, setPreciseLocation] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) return;
        const res = await fetch(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const user = await res.json();
          setPublicProfile(user.publicProfile || false);
          setLiveActivity(user.liveActivity !== false);
          setPreciseLocation(user.preciseLocation || false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;
      const payload = {
        publicProfile,
        liveActivity,
        preciseLocation,
      };

      const res = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
          <div>
            <p className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
              Digital Sovereignty
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Privacy Controls
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
              Govern your personal discoverability, real-time presence broadcast, and telemetry sharing.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {savedSuccess && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle size={16} weight="fill" /> Saved
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <FloppyDisk size={16} weight="bold" />
              {saving ? 'Saving...' : 'Apply Privacy Settings'}
            </button>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile & Presence Controls */}
          <div className="md:col-span-2 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
                <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <Eye size={18} weight="fill" />
                </span>
                <h3 className="text-base font-semibold text-[var(--fg)]">Discoverability & Visibility</h3>
              </div>
              <div className="space-y-6">
                {/* Public Profile */}
                <div className="flex items-center justify-between gap-4">
                  <div className="max-w-md">
                    <h4 className="text-sm font-semibold text-[var(--fg)] mb-0.5">
                      Public Profile Visibility
                    </h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Allow non-authenticated guests and prospective members to view your bio and attended
                      public gatherings.
                    </p>
                  </div>
                  <button
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${publicProfile ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                    onClick={() => setPublicProfile(!publicProfile)}
                    aria-label="Toggle public profile"
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${publicProfile ? 'translate-x-5' : 'translate-x-0'}`}
                    ></div>
                  </button>
                </div>

                {/* Live Activity */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
                  <div className="max-w-md">
                    <h4 className="text-sm font-semibold text-[var(--fg)] mb-0.5">Live Presence Indicator</h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Show other attendees when you are currently checked-in at a match, clubhouse, or
                      gathering.
                    </p>
                  </div>
                  <button
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${liveActivity ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                    onClick={() => setLiveActivity(!liveActivity)}
                    aria-label="Toggle live activity"
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${liveActivity ? 'translate-x-5' : 'translate-x-0'}`}
                    ></div>
                  </button>
                </div>

                {/* Precise Location */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
                  <div className="max-w-md">
                    <h4 className="text-sm font-semibold text-[var(--fg)] mb-0.5">
                      High-Precision GPS Broadcast
                    </h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Transmit meter-level coordinates to attendees of confirmed sports fixtures and private
                      gatherings.
                    </p>
                  </div>
                  <button
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${preciseLocation ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                    onClick={() => setPreciseLocation(!preciseLocation)}
                    aria-label="Toggle precise location"
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${preciseLocation ? 'translate-x-5' : 'translate-x-0'}`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted Circle Bypass Card */}
          <div className="md:col-span-1 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
                <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <Users size={18} weight="fill" />
                </span>
                <h3 className="text-base font-semibold text-[var(--fg)]">Trusted Circle</h3>
              </div>
              <p className="text-xs text-[var(--fg-muted)] mb-5 leading-relaxed">
                Members in your circle bypass restrictions to view your live attendance and coordinate
                directly.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  { name: 'Julian Vance', role: 'Inner Circle', initials: 'JV' },
                  { name: 'Elena Morse', role: 'Inner Circle', initials: 'EM' },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-[10px] font-bold">
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[var(--fg)] leading-none mb-1">
                          {member.name}
                        </p>
                        <p className="text-[10px] text-[var(--fg-muted)]">{member.role}</p>
                      </div>
                    </div>
                    <button
                      className="text-[var(--fg-muted)] hover:text-rose-600 transition-colors p-1"
                      title="Remove member"
                    >
                      <UserMinus size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => alert('Open Contact Picker...')}
              className="w-full border border-[var(--border)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider py-2.5 rounded-card hover:bg-[var(--bg-subtle)] transition-colors"
            >
              Add Contact
            </button>
          </div>
        </div>

        {/* Restricted & Blocked Members Section */}
        <section className="bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)]">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowBlocked(!showBlocked)}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-card bg-neutral-100 text-[var(--fg)] flex items-center justify-center">
                <Prohibit size={18} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">Restricted & Blocked Members</h3>
                <p className="text-xs text-[var(--fg-muted)]">
                  Manage accounts restricted from finding you or viewing your gatherings.
                </p>
              </div>
            </div>
            <button className="p-2 text-[var(--fg-muted)] hover:text-[var(--fg)]">
              {showBlocked ? <CaretUp size={16} /> : <CaretDown size={16} />}
            </button>
          </div>

          {showBlocked && (
            <div className="mt-6 pt-6 border-t border-[var(--border)] animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3.5 border border-[var(--border)] rounded-card bg-[var(--bg-subtle)]">
                  <div>
                    <p className="text-xs font-semibold text-[var(--fg)]">Mark Sterling</p>
                    <p className="text-[11px] text-[var(--fg-muted)]">Restricted on Mar 12, 2024</p>
                  </div>
                  <button
                    onClick={() => alert('User unblocked')}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    Unblock
                  </button>
                </div>
                <div className="flex items-center justify-between p-3.5 border border-[var(--border)] rounded-card bg-[var(--bg-subtle)]">
                  <div>
                    <p className="text-xs font-semibold text-[var(--fg)]">Anonymous Attendee #42</p>
                    <p className="text-[11px] text-[var(--fg-muted)]">Restricted on Jan 05, 2024</p>
                  </div>
                  <button
                    onClick={() => alert('User unblocked')}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    Unblock
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Zero-Knowledge Security Notice */}
        <footer className="bg-[var(--fg)] p-6 md:p-8 rounded-card text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block mb-1">
              End-to-End Local Isolation
            </span>
            <h4 className="text-base font-semibold text-white mb-2">Private By Design</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Your sensitive coordinates and circle memberships are protected via zero-knowledge tokens. We do
              not monetize, aggregate, or distribute member geolocation profiles.
            </p>
          </div>
          <div className="w-12 h-12 rounded-card bg-white/10 flex items-center justify-center text-white shrink-0">
            <LockKey size={24} weight="fill" />
          </div>
        </footer>
      </div>
    </SettingsLayout>
  );
}
