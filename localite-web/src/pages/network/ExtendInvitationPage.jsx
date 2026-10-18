import { useState } from 'react';

import { Copy, Check, PaperPlaneTilt, Sparkle, ShieldCheck } from '@phosphor-icons/react';

export default function ExtendInvitationPage() {
  const [copied, setCopied] = useState(false);
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeEmail, setNomineeEmail] = useState('');
  const [nomineeNote, setNomineeNote] = useState('');
  const [sent, setSent] = useState(false);

  const inviteCode = 'LOCALITE-882-ELITE';

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNominate = (e) => {
    e.preventDefault();
    if (!nomineeName || !nomineeEmail) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setNomineeName('');
      setNomineeEmail('');
      setNomineeNote('');
      alert('Invitation dispatched to prospective member.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-24 pb-16 px-6 max-w-7xl mx-auto font-sans animate-fade-in">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 block">
            Membership Stewardship
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
            Extend the Circle
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
            Nominate individuals of high caliber to join our neighborhood sporting fixtures and cultural
            salons.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
          <span>3 of 5 Invitations Remaining</span>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Personal Invite Cipher Card */}
        <section className="col-span-1 lg:col-span-5 bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <Sparkle size={16} weight="fill" />
              <span>Personal Access Cipher</span>
            </div>

            <h2 className="text-xl font-semibold text-[var(--fg)]">Exclusive Referral Code</h2>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              When a prospective attendee registers using your cipher, their verification is prioritized and
              your personal vouch is permanently inscribed in their member pedigree.
            </p>

            <div className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-semibold tracking-wider text-[var(--fg)]">
                {inviteCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 border border-[var(--border)] hover:bg-[var(--bg)] rounded-card text-xs font-semibold uppercase tracking-wider text-[var(--fg)] flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] text-xs text-[var(--fg-muted)] space-y-2">
            <div className="flex items-center gap-2 text-[var(--fg)] font-semibold">
              <ShieldCheck size={16} className="text-[var(--accent)]" />
              <span>Vouching Responsibility</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              You share reciprocal reputation standing with nominated members during their first 90 days of
              salon and sports participation.
            </p>
          </div>
        </section>

        {/* Direct Nomination Form */}
        <section className="col-span-1 lg:col-span-7 bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8">
          <div className="mb-6 pb-4 border-b border-[var(--border)]">
            <h3 className="text-base font-semibold text-[var(--fg)]">Direct Member Nomination</h3>
            <p className="text-xs text-[var(--fg-muted)]">
              Dispatch a personalized invitation link directly to their inbox.
            </p>
          </div>

          <form onSubmit={handleNominate} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] block mb-1.5">
                Nominee Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Chen"
                value={nomineeName}
                onChange={(e) => setNomineeName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] block mb-1.5">
                Nominee Email Address
              </label>
              <input
                type="email"
                required
                placeholder="maya.chen@example.com"
                value={nomineeEmail}
                onChange={(e) => setNomineeEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] block mb-1.5">
                Personal Note / Recommendation (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="Share why this member would enrich our gatherings and sporting community..."
                value={nomineeNote}
                onChange={(e) => setNomineeNote(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={sent}
                className="px-6 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <PaperPlaneTilt size={15} weight="bold" />
                <span>{sent ? 'Dispatching...' : 'Send Nomination'}</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
