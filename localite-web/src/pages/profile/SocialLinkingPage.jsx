import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LinkedinLogo,
  InstagramLogo,
  XLogo,
  ShieldCheck,
  LockKey,
  LinkBreak,
  ArrowLeft,
  FloppyDisk,
} from '@phosphor-icons/react';
import { getCurrentUser, updateProfile } from '../../services/api';

export default function SocialLinkingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [handles, setHandles] = useState({
    linkedin: '',
    instagram: '',
    twitter: '',
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getCurrentUser();
        setHandles({
          linkedin: user.linkedinHandle || '',
          instagram: user.instagramHandle || '',
          twitter: user.twitterHandle || '',
        });
      } catch (err) {
        console.error('Failed to load user profile for social links:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateProfile({
        linkedinHandle: handles.linkedin.trim(),
        instagramHandle: handles.instagram.trim(),
        twitterHandle: handles.twitter.trim(),
      });
      setMessage('Social accounts updated successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Failed to update social profiles:', err);
      setMessage('Error updating social accounts. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const disconnect = async (network) => {
    const updated = { ...handles, [network]: '' };
    setHandles(updated);
    setSaving(true);
    try {
      const payload = {};
      if (network === 'linkedin') payload.linkedinHandle = '';
      if (network === 'instagram') payload.instagramHandle = '';
      if (network === 'twitter') payload.twitterHandle = '';
      await updateProfile(payload);
      setMessage(`${network.charAt(0).toUpperCase() + network.slice(1)} handle removed.`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error disconnecting network:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-24 pb-16 px-6 max-w-5xl mx-auto font-sans animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Header */}
      <header className="text-center mb-10 space-y-3">
        <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider block">
          Digital Identity
        </span>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
          Connected Profiles
        </h1>
        <p className="text-sm text-[var(--fg-muted)] max-w-xl mx-auto leading-relaxed">
          Link your professional and social profiles to verify community standing. Handles are verified and
          saved directly to your Localite profile.
        </p>
      </header>

      {message && (
        <div className="max-w-xl mx-auto mb-6 p-3 rounded-card bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-xs font-medium text-[var(--accent)] text-center animate-fade-in">
          {message}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-sm text-[var(--fg-muted)] animate-pulse">
          Loading social identities...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LinkedIn */}
            <div className="bg-[var(--bg)] p-6 rounded-card border border-[var(--border)] flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-subtle)] text-[#0A66C2] flex items-center justify-center shrink-0">
                  <LinkedinLogo size={28} weight="fill" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--fg)]">LinkedIn</h3>
                  <p className="text-xs text-[var(--fg-muted)]">Professional identity</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--fg-muted)]">Profile URL or Username</label>
                <input
                  type="text"
                  placeholder="e.g. in/username"
                  value={handles.linkedin}
                  onChange={(e) => setHandles({ ...handles, linkedin: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--accent)] text-[var(--fg)]"
                />
              </div>
              {handles.linkedin && (
                <button
                  type="button"
                  onClick={() => disconnect('linkedin')}
                  className="text-[11px] text-rose-500 hover:text-rose-600 flex items-center gap-1 self-start font-medium"
                >
                  <LinkBreak size={13} /> Disconnect
                </button>
              )}
            </div>

            {/* Instagram */}
            <div className="bg-[var(--bg)] p-6 rounded-card border border-[var(--border)] flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-subtle)] text-[#E1306C] flex items-center justify-center shrink-0">
                  <InstagramLogo size={28} weight="fill" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--fg)]">Instagram</h3>
                  <p className="text-xs text-[var(--fg-muted)]">Lifestyle & events</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--fg-muted)]">Instagram Handle</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-[var(--fg-muted)]">@</span>
                  <input
                    type="text"
                    placeholder="username"
                    value={handles.instagram.replace(/^@/, '')}
                    onChange={(e) =>
                      setHandles({ ...handles, instagram: '@' + e.target.value.replace(/^@/, '') })
                    }
                    className="w-full text-xs pl-7 pr-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--accent)] text-[var(--fg)]"
                  />
                </div>
              </div>
              {handles.instagram && (
                <button
                  type="button"
                  onClick={() => disconnect('instagram')}
                  className="text-[11px] text-rose-500 hover:text-rose-600 flex items-center gap-1 self-start font-medium"
                >
                  <LinkBreak size={13} /> Disconnect
                </button>
              )}
            </div>

            {/* X (Twitter) */}
            <div className="bg-[var(--bg)] p-6 rounded-card border border-[var(--border)] flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-subtle)] text-[var(--fg)] flex items-center justify-center shrink-0">
                  <XLogo size={28} weight="fill" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--fg)]">X (Twitter)</h3>
                  <p className="text-xs text-[var(--fg-muted)]">Discourse & updates</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--fg-muted)]">X Handle</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-[var(--fg-muted)]">@</span>
                  <input
                    type="text"
                    placeholder="username"
                    value={handles.twitter.replace(/^@/, '')}
                    onChange={(e) =>
                      setHandles({ ...handles, twitter: '@' + e.target.value.replace(/^@/, '') })
                    }
                    className="w-full text-xs pl-7 pr-3 py-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--accent)] text-[var(--fg)]"
                  />
                </div>
              </div>
              {handles.twitter && (
                <button
                  type="button"
                  onClick={() => disconnect('twitter')}
                  className="text-[11px] text-rose-500 hover:text-rose-600 flex items-center gap-1 self-start font-medium"
                >
                  <LinkBreak size={13} /> Disconnect
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="py-2.5 px-6 rounded-card bg-[var(--accent)] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--accent)]/90 disabled:opacity-50 transition-all shadow-sm"
            >
              <FloppyDisk size={16} />
              <span>{saving ? 'Saving Changes...' : 'Save Connected Accounts'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Trust & Privacy Assurance Banner */}
      <section className="mt-12 bg-[var(--bg-subtle)] p-6 md:p-8 rounded-card border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            <ShieldCheck size={16} weight="fill" />
            <span>Encrypted Profile Verification</span>
          </div>
          <h4 className="text-base font-semibold text-[var(--fg)]">Zero Credential Exposure</h4>
          <p className="text-xs text-[var(--fg-muted)] max-w-xl leading-relaxed">
            Localite verifies and stores your public identifiers securely. We never ask for your passwords,
            read your private messages, or post on your behalf.
          </p>
        </div>
        <div className="w-12 h-12 rounded-card bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)] shrink-0">
          <LockKey size={22} weight="fill" />
        </div>
      </section>
    </div>
  );
}
