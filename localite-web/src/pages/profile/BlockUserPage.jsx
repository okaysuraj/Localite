import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { blockUser } from '../../services/api';
import { Prohibit, ShieldCheck, CircleNotch, EyeSlash, ChatCircleSlash } from '@phosphor-icons/react';

export default function BlockUserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const targetName = location.state?.targetName || 'User';
  const targetId = location.state?.targetId;

  const handleBlock = async () => {
    setLoading(true);
    try {
      if (targetId) {
        await blockUser(targetId);
      }
      alert(`${targetName} has been restricted from contacting you.`);
      navigate(-1);
    } catch (err) {
      alert(err.message || 'Failed to restrict user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-subtle)] text-[var(--fg)] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[var(--bg)] rounded-card border border-[var(--border)] p-8 shadow-sm space-y-6 animate-fade-in text-center">
        {/* Icon Header */}
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
          <Prohibit size={32} weight="bold" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold text-[var(--fg)] tracking-tight">Restrict {targetName}?</h1>
          <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
            Restricting this member immediately severs communication channels and isolates mutual presence
            across the Localite platform.
          </p>
        </div>

        {/* Consequences list */}
        <div className="bg-[var(--bg-subtle)] p-4 rounded-card border border-[var(--border)] text-left space-y-2.5 text-xs text-[var(--fg-muted)]">
          <div className="flex items-center gap-2.5">
            <ChatCircleSlash size={16} className="text-rose-600 shrink-0" />
            <span>Cannot send you direct messages or salon invitations</span>
          </div>
          <div className="flex items-center gap-2.5">
            <EyeSlash size={16} className="text-rose-600 shrink-0" />
            <span>Hidden from your local search and neighborhood map</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-rose-600 shrink-0" />
            <span>Removed from any mutual trusted circles</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="py-2.5 px-4 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider rounded-card transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleBlock}
            disabled={loading}
            className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            {loading && <CircleNotch size={14} className="animate-spin" />}
            <span>{loading ? 'Restricting...' : 'Confirm Block'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
