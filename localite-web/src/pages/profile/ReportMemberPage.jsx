import { useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';
import { ArrowLeft, PaperPlaneTilt } from '@phosphor-icons/react';

export default function ReportMemberPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetId = location.state?.targetId || 1;
  const [selectedCategory, setSelectedCategory] = useState('Inappropriate Behavior');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async () => {
    if (!confirmed) {
      alert('Please confirm that this report is submitted in good faith.');
      return;
    }
    setIsSubmitting(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const payload = {
        targetType: 'USER',
        targetId: targetId,
        reason: selectedCategory,
        details: details,
      };

      const res = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Report submitted to Concierge Safety board.');
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Inappropriate Behavior',
    'Harassment or Intimidation',
    'Solicitation or Commercial Spam',
    'Misleading Identity or Impersonation',
  ];

  return (
    <SettingsLayout>
      <div className="space-y-8 animate-fade-in pb-12 max-w-3xl">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return</span>
        </button>

        {/* Header */}
        <header className="space-y-2 border-b border-[var(--border)] pb-6">
          <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block">
            Safety Grievance
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">Report Member Incident</h1>
          <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
            Localite maintains strict community standards. All reports are independently investigated by our
            safety board under complete member confidentiality.
          </p>
        </header>

        {/* Incident Form Card */}
        <section className="bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8 space-y-6">
          {/* Violation Category */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] block">
              Nature of Grievance
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-3 text-left rounded-card border text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'border-rose-600 bg-rose-500/5 text-rose-600 font-semibold'
                      : 'border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg)] hover:border-[var(--fg-muted)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] block">
              Specific Details & Observations
            </label>
            <textarea
              rows="4"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what occurred, event date, venue, and any relevant witness context..."
              className="w-full p-3.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)] resize-none"
            />
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-start gap-3 p-3.5 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 rounded text-[var(--accent)] focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-[var(--fg-muted)] leading-relaxed">
              I affirm that this incident report is accurate, submitted in good faith, and complies with
              Localite's integrity code.
            </span>
          </label>

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 border border-[var(--border)] text-xs font-semibold uppercase tracking-wider text-[var(--fg)] rounded-card hover:bg-[var(--bg-subtle)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !confirmed}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm transition-all flex items-center gap-2 active:scale-95"
            >
              <PaperPlaneTilt size={15} weight="bold" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Incident Report'}</span>
            </button>
          </div>
        </section>
      </div>
    </SettingsLayout>
  );
}
