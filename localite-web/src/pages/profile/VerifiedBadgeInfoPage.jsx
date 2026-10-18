import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  IdentificationCard,
  ShareNetwork,
  Trophy,
  CheckCircle,
  ArrowRight,
} from '@phosphor-icons/react';

export default function VerifiedBadgeInfoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-24 pb-16 px-6 max-w-5xl mx-auto font-sans animate-fade-in">
      {/* Top Hero Section */}
      <section className="text-center mb-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={36} weight="fill" />
        </div>
        <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider block">
          Community Trust Standard
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
          The Verified Member Badge
        </h1>
        <p className="text-sm md:text-base text-[var(--fg-muted)] max-w-2xl mx-auto leading-relaxed">
          The mark of verified identity within Localite. It assures event hosts and sporting partners of
          authenticity, punctual attendance, and zero-tolerance safety compliance.
        </p>
      </section>

      {/* Bento Grid: Verification Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Step 1: Legal Identity */}
        <div className="md:col-span-7 bg-[var(--bg)] p-6 md:p-8 rounded-card border border-[var(--border)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
              <IdentificationCard size={18} weight="fill" />
              <span>Step 01 • Identity Attestation</span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">Government-Issued Vetting</h2>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              Automated biometric cross-check with state-issued ID (Passport, Driving License, or Aadhaar)
              ensures zero bot profiles or disguised duplicate accounts.
            </p>
          </div>
          <div className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex items-center gap-3">
            <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
            <span className="text-xs text-[var(--fg-muted)]">
              Encrypted biometric vault • Never stored in unencrypted memory
            </span>
          </div>
        </div>

        {/* Step 2: Social Presence */}
        <div className="md:col-span-5 bg-[var(--bg)] p-6 md:p-8 rounded-card border border-[var(--border)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
              <ShareNetwork size={18} weight="fill" />
              <span>Step 02 • Professional Footprint</span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">Social & Career Linking</h2>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              Connecting verified professional handles ensures peer-to-peer accountability across private
              matches and social salons.
            </p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2.5 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
              <span className="font-medium text-[var(--fg)]">LinkedIn / X Verified</span>
              <CheckCircle size={15} weight="fill" className="text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Step 3: Peer Endorsement */}
        <div className="md:col-span-12 bg-[var(--bg)] p-6 md:p-8 rounded-card border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <Trophy size={18} weight="fill" />
              <span>Step 03 • Community Standing Review</span>
            </div>
            <h3 className="text-xl font-semibold text-[var(--fg)]">Host Review & Attendance Fidelity</h3>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              Completing 3 gatherings or sports fixtures with positive host ratings confers permanent Verified
              distinction onto your public profile.
            </p>
          </div>
          <button
            onClick={() => navigate('/verification')}
            className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 shrink-0 flex items-center gap-2"
          >
            <span>Begin Verification</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
