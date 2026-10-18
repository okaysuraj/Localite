import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  IdentificationCard,
  User,
  ShareNetwork,
  LockKey,
  Trophy,
} from '@phosphor-icons/react';

const VerificationCenterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-bg min-h-screen py-10 px-6">
      <div className="max-w-content mx-auto space-y-10">
        {/* Header with circular progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono text-accent uppercase tracking-wider block">
              Trust & Community Safety
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-semibold text-fg tracking-tight">
              Member Verification
            </h1>
            <p className="text-sm text-fg-muted leading-relaxed">
              Verification ensures authentic local connections. Complete your verification to earn the verified badge and host gatherings with confidence.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white border border-border rounded-card p-4 sm:p-5 shrink-0 self-start md:self-auto">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="23"
                  fill="transparent"
                  stroke="#E8E8E8"
                  strokeWidth="3.5"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="23"
                  fill="transparent"
                  stroke="#1A6B4A"
                  strokeWidth="3.5"
                  strokeDasharray="144"
                  strokeDashoffset="48"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute font-display font-semibold text-xs text-fg">
                66%
              </span>
            </div>
            <div>
              <p className="text-xs font-display font-semibold text-fg">
                2 of 3 Completed
              </p>
              <p className="text-[11px] font-mono text-accent mt-0.5">
                Nearly verified
              </p>
            </div>
          </div>
        </div>

        {/* Verification Steps Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1: ID Verified */}
          <div className="bg-white border border-border rounded-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-accent-subtle text-accent flex items-center justify-center">
                  <IdentificationCard size={20} />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent-subtle text-accent border border-accent/20">
                  <Check size={11} weight="bold" /> Verified
                </span>
              </div>
              <div>
                <h3 className="text-base font-display font-semibold text-fg tracking-tight">
                  Government ID
                </h3>
                <p className="text-xs text-fg-muted mt-1 leading-relaxed">
                  Your identity documents have been verified against official records.
                </p>
              </div>
            </div>
            <p className="text-[10px] font-mono text-fg-muted">
              Completed on Sep 10, 2026
            </p>
          </div>

          {/* Step 2: Photo Match Verified */}
          <div className="bg-white border border-border rounded-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-accent-subtle text-accent flex items-center justify-center">
                  <User size={20} />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent-subtle text-accent border border-accent/20">
                  <Check size={11} weight="bold" /> Verified
                </span>
              </div>
              <div>
                <h3 className="text-base font-display font-semibold text-fg tracking-tight">
                  Photo Verification
                </h3>
                <p className="text-xs text-fg-muted mt-1 leading-relaxed">
                  Live selfie matched with your identification photo.
                </p>
              </div>
            </div>
            <p className="text-[10px] font-mono text-fg-muted">
              Completed on Sep 10, 2026
            </p>
          </div>

          {/* Step 3: Social / Phone */}
          <div className="bg-white border border-accent/40 rounded-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-bg-subtle text-fg flex items-center justify-center">
                  <ShareNetwork size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-bg-subtle text-fg-muted border border-border">
                  Pending
                </span>
              </div>
              <div>
                <h3 className="text-base font-display font-semibold text-fg tracking-tight">
                  Social or Phone Link
                </h3>
                <p className="text-xs text-fg-muted mt-1 leading-relaxed">
                  Link an Instagram, X, or verified phone number to establish cross-network presence.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="w-full py-2 bg-accent text-white rounded-btn text-xs font-mono tracking-wide hover:opacity-90 transition-opacity"
            >
              Connect Profile
            </button>
          </div>
        </div>

        {/* Why Verify Educational Bento */}
        <div className="bg-white border border-border rounded-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              Why Verification Matters
            </h2>
            <p className="text-xs text-fg-muted">
              Built on transparency, respect, and accountable community participation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-bg-subtle flex items-center justify-center text-accent">
                <LockKey size={16} />
              </div>
              <h3 className="font-display font-semibold text-sm text-fg">
                Accountability First
              </h3>
              <p className="text-xs text-fg-muted leading-relaxed">
                Knowing everyone is verified drastically reduces no-shows and ensures dependable gatherings.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-bg-subtle flex items-center justify-center text-accent">
                <ShieldCheck size={16} />
              </div>
              <h3 className="font-display font-semibold text-sm text-fg">
                Verified Badge
              </h3>
              <p className="text-xs text-fg-muted leading-relaxed">
                Display the verified badge next to your name when joining teams, matches, and local events.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-bg-subtle flex items-center justify-center text-accent">
                <Trophy size={16} />
              </div>
              <h3 className="font-display font-semibold text-sm text-fg">
                Hosting Privileges
              </h3>
              <p className="text-xs text-fg-muted leading-relaxed">
                Verified organizers can create ticketed gatherings, private leagues, and high-capacity events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCenterPage;
