import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CheckCircle } from '@phosphor-icons/react';

export default function ReportEventPage() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('misleading');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/events');
    }, 1800);
  };

  const reportReasons = [
    {
      id: 'misleading',
      title: 'Misleading Information',
      desc: 'Inaccurate date, venue, or false host claims.',
    },
    {
      id: 'safety',
      title: 'Safety Concerns',
      desc: 'Hazardous venue conditions or violation of physical safety.',
    },
    {
      id: 'inappropriate',
      title: 'Code of Conduct Violation',
      desc: 'Discriminatory language or prohibited activity.',
    },
    {
      id: 'spam',
      title: 'Spam or Commercial Solicitation',
      desc: 'Unauthorized promotional spam or scam activity.',
    },
  ];

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-3"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-2 text-[var(--accent)] mb-1">
            <ShieldCheck size={18} weight="fill" />
            <span className="font-mono text-xs uppercase tracking-wider">Community Standards</span>
          </div>
          <h1 className="text-3xl font-serif text-[var(--fg)]">Report a Gathering</h1>
          <p className="text-xs sm:text-sm text-[var(--fg-muted)] max-w-xl mt-1">
            We review every report against our community etiquette to maintain trust and neighborhood safety.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-card border border-[var(--border)] p-6 sm:p-8 space-y-8">
          {/* Target Event Mini Card */}
          <div className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex items-start gap-4">
            <div className="w-16 h-16 rounded-card overflow-hidden bg-white shrink-0 border border-[var(--border)]">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=300"
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-muted)] block">
                Event In Question
              </span>
              <h3 className="text-sm font-medium text-[var(--fg)] mt-0.5">
                The Midnight Gala: Vernissage & Cocktails
              </h3>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">Hosted by Julian Thorne • Oct 24, 2026</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reason Radio Group */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                Select Reason
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reportReasons.map((item) => {
                  const isChecked = reason === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setReason(item.id)}
                      className={`p-4 rounded-card border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[var(--accent)] bg-[var(--accent)]/[0.03]'
                          : 'border-[var(--border)] hover:border-[var(--fg-muted)] bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border)]'
                          }`}
                        >
                          {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <p
                            className={`text-xs font-medium ${isChecked ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)]'}`}
                          >
                            {item.title}
                          </p>
                          <p className="text-[11px] text-[var(--fg-muted)] mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                  Incident Details
                </label>
                <span className="text-xs font-mono text-[var(--fg-muted)]">{details.length} / 500</span>
              </div>
              <textarea
                rows="4"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxLength={500}
                placeholder="Describe what occurred. This information remains strictly confidential between you and the Localite trust team."
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-4 text-xs sm:text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-card border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitted}
                className="px-6 py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors disabled:opacity-50"
              >
                {submitted ? 'Submitting Report...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-card border border-[var(--border)] p-8 max-w-sm w-full text-center space-y-4 shadow-xl">
            <CheckCircle size={40} className="mx-auto text-[var(--accent)]" weight="fill" />
            <h3 className="text-xl font-serif text-[var(--fg)]">Report Received</h3>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              Thank you for helping keep Localite safe. Our safety team will review this gathering within 4
              hours.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
