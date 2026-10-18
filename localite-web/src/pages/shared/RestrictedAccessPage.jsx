import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LockKey, 
  Crown, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle
} from '@phosphor-icons/react';

export default function RestrictedAccessPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-[var(--bg)] rounded-card border border-[var(--border)] p-8 md:p-12 shadow-sm text-center space-y-6 animate-fade-in">
        
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-amber-400/10 text-amber-600 flex items-center justify-center mx-auto">
          <LockKey size={32} weight="fill" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] block">
            Membership Privilege Required
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Exclusive Gathering
          </h1>
          <p className="text-xs md:text-sm text-[var(--fg-muted)] leading-relaxed max-w-md mx-auto">
            This experience or sports facility is strictly reserved for verified Fellow and Patron tier members. Upgrade your membership or request an invitation from a host.
          </p>
        </div>

        {/* Feature bullets */}
        <div className="bg-[var(--bg-subtle)] p-5 rounded-card border border-[var(--border)] text-left space-y-2.5 text-xs text-[var(--fg-muted)] max-w-md mx-auto">
          <div className="flex items-center gap-2 text-[var(--fg)] font-semibold mb-1">
            <Crown size={16} className="text-amber-600" />
            <span>Patron Tier Access Unlocks:</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <span>Private evening salon bookings & secret dining</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <span>Tournament court priority reservations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <span>Unlimited guest passes to weekend fixtures</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button 
            onClick={() => navigate('/network/prestige')}
            className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <span>View Prestige Tiers</span>
            <ArrowRight size={14} />
          </button>
          
          <button 
            onClick={() => navigate('/events')}
            className="px-6 py-3 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] rounded-card text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Browse Open Gatherings
          </button>
        </div>

      </div>
    </div>
  );
}
