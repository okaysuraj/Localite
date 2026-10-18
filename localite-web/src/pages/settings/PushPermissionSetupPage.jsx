import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  ShieldCheck, 
  Sparkle, 
  CircleNotch,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react';

export default function PushPermissionSetupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Enable Notifications');

  const handleEnable = () => {
    setLoading(true);
    setStatus('');
    setTimeout(() => {
      setStatus('Preferences Saved');
      setLoading(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    }, 1000);
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[var(--bg)] rounded-card border border-[var(--border)] p-8 shadow-sm text-center space-y-6 animate-fade-in">
        
        {/* Icon Cluster */}
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto relative">
          <Bell size={28} weight="fill" />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-neutral-900 flex items-center justify-center text-[10px] shadow-sm">
            <Sparkle size={12} weight="fill" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Stay in the Circle
          </h1>
          <p className="text-xs text-[var(--fg-muted)] leading-relaxed max-w-xs mx-auto">
            Receive real-time invitations to curated sports matches, gathering RSVP status changes, and critical safety check-ins.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button 
            onClick={handleEnable}
            disabled={loading || status === 'Preferences Saved'}
            className="w-full py-3.5 px-4 bg-[var(--accent)] hover:bg-[var(--accent)]/90 disabled:opacity-75 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
          >
            {loading && <CircleNotch size={16} className="animate-spin" />}
            {status === 'Preferences Saved' && <CheckCircle size={16} weight="fill" />}
            <span>{status}</span>
          </button>
          
          <button 
            onClick={handleSkip}
            className="w-full py-3 px-4 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg-muted)] hover:text-[var(--fg)] rounded-card text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Maybe Later
          </button>
        </div>

        {/* Security / No Spam Guarantees */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-center gap-6 text-[11px] text-[var(--fg-muted)]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>No Spam</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
          <div className="flex items-center gap-1.5">
            <Sparkle size={14} className="text-[var(--accent)]" />
            <span>Curated Only</span>
          </div>
        </div>

      </div>
    </div>
  );
}
