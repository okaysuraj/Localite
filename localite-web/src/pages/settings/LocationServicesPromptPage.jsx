import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  NavigationArrow, 
  Compass, 
  ShieldCheck, 
  ArrowRight
} from '@phosphor-icons/react';

export default function LocationServicesPromptPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen relative flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Editorial Section */}
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--accent)]"></span>
            <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">
              Proximity Intelligence
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--fg)] leading-tight">
            Discover Your Place <br />
            <span className="text-[var(--accent)] font-normal italic">in the Community</span>
          </h1>
          
          <p className="text-sm md:text-base text-[var(--fg-muted)] max-w-lg leading-relaxed">
            Localite connects you with sports matches, private salons, and verified neighbors within your immediate area. Your exact coordinates are never broadcast publicly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[var(--bg)] p-5 rounded-card border border-[var(--border)]">
              <div className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-3">
                <NavigationArrow size={18} weight="fill" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)] mb-1">
                Frictionless Check-Ins
              </h3>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Step into verified gathering venues and club matches with effortless arrival confirmation.
              </p>
            </div>

            <div className="bg-[var(--bg)] p-5 rounded-card border border-[var(--border)]">
              <div className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-3">
                <Compass size={18} weight="fill" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)] mb-1">
                Curated Hub Radar
              </h3>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Discover private courts and social clubs selected specifically for their sporting and social caliber.
              </p>
            </div>
          </div>
        </div>

        {/* Right Interaction Card */}
        <div className="md:col-span-5">
          <div className="bg-[var(--bg)] rounded-card border border-[var(--border)] p-6 md:p-8 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto mb-2">
                <MapPin size={24} weight="fill" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--fg)]">Enable Location</h2>
              <p className="text-xs text-[var(--fg-muted)]">
                Choose how you prefer to set your home base.
              </p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleContinue}
                className="w-full py-3.5 px-4 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
              >
                <NavigationArrow size={16} weight="bold" />
                <span>Enable Browser Location</span>
                <ArrowRight size={14} />
              </button>

              <div className="relative flex items-center justify-center my-2">
                <div className="w-full border-t border-[var(--border)]"></div>
                <span className="absolute bg-[var(--bg)] px-3 text-[11px] text-[var(--fg-muted)] uppercase tracking-wider">
                  or enter manually
                </span>
              </div>

              <div className="space-y-3">
                <input 
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Bandra West, Mumbai"
                  className="w-full px-4 py-3 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <button 
                  onClick={handleContinue}
                  className="w-full py-3 px-4 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] rounded-card text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Set Custom Area
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-center gap-2 text-[11px] text-[var(--fg-muted)]">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Encrypted coordinates • Never shared with third parties</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
