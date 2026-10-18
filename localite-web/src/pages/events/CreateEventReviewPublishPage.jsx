import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarBlank, 
  MapPin, 
  ShareNetwork, 
  Star, 
  Wine, 
  MusicNotes, 
  Sparkle, 
  PencilSimple, 
  ArrowRight, 
  CheckCircle,
  ShieldCheck,
  Check
} from '@phosphor-icons/react';

export default function CreateEventReviewPublishPage() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePublish = () => {
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate('/events');
  };

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--fg-muted)] mb-1">
            <span className="font-mono text-xs uppercase tracking-wider">Step 06 / 06</span>
            <div className="h-[1px] w-10 bg-[var(--border)]"></div>
          </div>
          <h1 className="text-3xl font-serif text-[var(--fg)]">Review & Publish</h1>
          <p className="text-sm text-[var(--fg-muted)] max-w-2xl">
            Preview your gathering before opening it to the community. Confirm all details reflect your intended atmosphere.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Preview */}
          <div className="lg:col-span-8 bg-white rounded-card border border-[var(--border)] overflow-hidden">
            <div className="h-64 sm:h-80 w-full relative bg-[var(--bg-subtle)] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000" 
                alt="Event cover" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[var(--border)] px-3 py-1 rounded-card text-xs font-mono text-[var(--fg)]">
                Live Preview
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block mb-1">
                    Epicurean & Culture • Curated
                  </span>
                  <h2 className="text-2xl font-serif text-[var(--fg)]">Midnight Garden Soirée</h2>
                </div>
                <div className="flex items-center gap-2 text-[var(--fg-muted)]">
                  <button type="button" className="p-2 border border-[var(--border)] rounded-card hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors">
                    <ShareNetwork size={16} />
                  </button>
                  <button type="button" className="p-2 border border-[var(--border)] rounded-card hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors">
                    <Star size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--fg-muted)] py-3 border-y border-[var(--border)]">
                <div className="flex items-center gap-1.5">
                  <CalendarBlank size={16} className="text-[var(--fg)]" />
                  <span>Oct 24, 2026 • 20:00 - 01:00</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-[var(--fg)]" />
                  <span>The Glass Conservatory, Chelsea</span>
                </div>
              </div>

              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                Join us for an evening of quiet elegance in the heart of the botanical sanctuary. The Midnight Garden Soirée is a curated gathering featuring artisanal refreshments, acoustic string arrangements, and seasonal fare under the glass canopy.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-card border border-[var(--border)] bg-[var(--bg-subtle)] space-y-1">
                  <Wine size={18} className="text-[var(--accent)]" />
                  <p className="text-xs font-medium text-[var(--fg)]">Curated Tasting</p>
                  <p className="text-[11px] text-[var(--fg-muted)]">Seasonal botanical pairing</p>
                </div>
                <div className="p-3.5 rounded-card border border-[var(--border)] bg-[var(--bg-subtle)] space-y-1">
                  <MusicNotes size={18} className="text-[var(--accent)]" />
                  <p className="text-xs font-medium text-[var(--fg)]">Acoustic Strings</p>
                  <p className="text-[11px] text-[var(--fg-muted)]">Live duo performance</p>
                </div>
                <div className="p-3.5 rounded-card border border-[var(--border)] bg-[var(--bg-subtle)] space-y-1">
                  <Sparkle size={18} className="text-[var(--accent)]" />
                  <p className="text-xs font-medium text-[var(--fg)]">Access Tier</p>
                  <p className="text-[11px] text-[var(--fg-muted)]">Verified guest list</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Confirmation Card */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-card border border-[var(--border)] p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Event Logistics</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span className="text-[var(--fg-muted)]">Date & Time</span>
                  <span className="font-mono text-[var(--fg)] text-right">Oct 24, 2026<br />20:00 - 01:00</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span className="text-[var(--fg-muted)]">Location</span>
                  <span className="text-[var(--fg)]">Chelsea, NY</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--border)]">
                  <span className="text-[var(--fg-muted)]">Admission</span>
                  <span className="font-mono text-[var(--fg)]">$150 / guest</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[var(--fg-muted)]">Capacity</span>
                  <span className="font-mono text-[var(--fg)]">80 Guests max</span>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => navigate('/events/create')}
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-card border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
              >
                <PencilSimple size={14} />
                Edit Details
              </button>
            </div>

            {/* Terms checkbox */}
            <div className="bg-white rounded-card border border-[var(--border)] p-4 flex items-start gap-3">
              <input 
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-[var(--fg-muted)] cursor-pointer select-none">
                I verify that this gathering adheres to Localite's community etiquette and standards for authentic, respectful neighborhood connection.
              </label>
            </div>

            {/* Verification Notice */}
            <div className="bg-white rounded-card border border-[var(--border)] p-4 flex items-start gap-3">
              <ShieldCheck size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[var(--fg)]">Host Trust Guarantee</p>
                <p className="text-[11px] text-[var(--fg-muted)] mt-0.5">Your host reputation badge will accompany this gathering's listing.</p>
              </div>
            </div>

            {/* Publish CTA */}
            <button 
              type="button"
              onClick={handlePublish}
              disabled={!termsAccepted}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Publish Gathering
              <ArrowRight size={16} />
            </button>
          </aside>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-card border border-[var(--border)] p-8 max-w-md w-full text-center space-y-6 shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto">
              <CheckCircle size={32} weight="fill" />
            </div>
            <div>
              <h3 className="text-xl font-serif text-[var(--fg)]">Gathering Published</h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1.5 leading-relaxed">
                Your event is now live and listed in the community feed. Members matching your category will receive notifications.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button 
                type="button" 
                onClick={closeSuccess}
                className="w-full py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
              >
                View Gathering Page
              </button>
              <button 
                type="button" 
                onClick={closeSuccess}
                className="w-full py-2.5 rounded-card border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
              >
                Return to Events
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
