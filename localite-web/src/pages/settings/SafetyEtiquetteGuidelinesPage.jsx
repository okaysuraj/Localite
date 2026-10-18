import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Handshake, 
  Heart, 
  LockKey, 
  ArrowLeft,
  Compass,
  CheckCircle,
  Users
} from '@phosphor-icons/react';

export default function SafetyEtiquetteGuidelinesPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg)] text-[var(--fg)] min-h-screen font-sans selection:bg-[var(--accent)] selection:text-white">
      {/* Sub-header Navigation */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-subtle)] px-6 py-4 sticky top-16 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Safety Center
          </button>
          <span className="text-xs font-mono text-[var(--fg-muted)] uppercase tracking-widest">
            Protocol v2.4 • Active
          </span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16">
        {/* Title Header */}
        <header className="space-y-4 border-b border-[var(--border)] pb-12">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              Community Standards & Code of Presence
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)] leading-tight">
            The Gathering Protocol: A Standard of Mutual Respect
          </h1>
          <p className="text-base text-[var(--fg-muted)] max-w-2xl leading-relaxed">
            Genuine connection thrives when expectations are transparent and personal boundaries are inviolable. This protocol defines the conduct expected across every Localite gathering and sports fixture.
          </p>
        </header>

        {/* Three Pillars Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] space-y-3">
            <div className="w-10 h-10 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
              <ShieldCheck size={22} weight="fill" />
            </div>
            <h3 className="text-base font-semibold text-[var(--fg)]">Verified Identity</h3>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              Every member is verified prior to booking private events, ensuring trust without public vulnerability.
            </p>
          </div>

          <div className="p-6 bg-[var(--fg)] text-white rounded-card space-y-3">
            <div className="w-10 h-10 rounded-card bg-white/10 text-white flex items-center justify-center">
              <Handshake size={22} weight="fill" />
            </div>
            <h3 className="text-base font-semibold text-white">Etiquette of Presence</h3>
            <p className="text-xs text-white/75 leading-relaxed">
              Attendance requires commitment. Be punctual, engage with intentionality, and respect host parameters.
            </p>
          </div>

          <div className="p-6 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] space-y-3">
            <div className="w-10 h-10 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
              <Heart size={22} weight="fill" />
            </div>
            <h3 className="text-base font-semibold text-[var(--fg)]">Silent Guardianry</h3>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              Our safety concierge and host review system immediately steps in if inappropriate conduct occurs.
            </p>
          </div>
        </section>

        {/* Editorial Articles */}
        <article className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--fg)] tracking-tight">
              1. Punctuality & Reservation Commitment
            </h2>
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
              Localite gatherings operate with strict capacity limits to maintain high-quality experiences. When an RSVP is confirmed, a host reserves physical space and provisions on your behalf. Repeated late cancellations without notice degrade your community prestige standing and may restrict reservations for curated gatherings.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--fg)] tracking-tight">
              2. Personal Boundaries & Discretion
            </h2>
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
              Discretion is the bedrock of our community. Attendees must never capture photographs or videos of fellow participants without express verbal consent. Business solicitation and aggressive networking during social salons or leisure sporting fixtures are strictly discouraged.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--fg)] tracking-tight">
              3. The Anchor System for Safe Departure
            </h2>
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
              We recommend utilizing our integrated 'Anchor System' when attending evening gatherings in unfamiliar districts. Before departing, activate your Guardian presence or verify that a fellow attendee or host has confirmed your safe transit to rideshare or private transit.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--fg)] tracking-tight">
              4. Immediate Reporting & Zero-Tolerance Policy
            </h2>
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
              Harassment, unwanted physical advances, discrimination, or abusive conduct result in immediate, permanent revocation of platform access. If you experience or witness inappropriate behavior at any Localite event, reach out immediately to your on-site host or use the Safety Center to flag the account for review.
            </p>
          </section>
        </article>

        {/* Closing Contact Card */}
        <div className="bg-[var(--bg-subtle)] p-8 rounded-card border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-[var(--fg)] mb-1">Have an etiquette or safety inquiry?</h3>
            <p className="text-xs text-[var(--fg-muted)]">Our concierge safety board reviews incident reports 24/7.</p>
          </div>
          <button 
            onClick={() => navigate('/contact')}
            className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm transition-all shrink-0"
          >
            Contact Safety Board
          </button>
        </div>
      </main>
    </div>
  );
}
