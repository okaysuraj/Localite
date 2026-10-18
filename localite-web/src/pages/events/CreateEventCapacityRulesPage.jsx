import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  ShieldCheck, 
  CameraSlash, 
  CoatHanger, 
  Wine, 
  PlusCircle, 
  Paperclip,
  Check 
} from '@phosphor-icons/react';

export default function CreateEventCapacityRulesPage() {
  const navigate = useNavigate();
  const [maxGuests, setMaxGuests] = useState('25');
  const [waitlistMode, setWaitlistMode] = useState('First-come, first-served');
  const [privateGuestList, setPrivateGuestList] = useState(true);
  const [rules, setRules] = useState({
    privacy: true,
    dressCode: false,
    limitedAlcohol: true
  });

  const toggleRule = (key) => setRules((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--fg-muted)] mb-1">
            <span className="font-mono text-xs uppercase tracking-wider">Step 04 / 06</span>
            <div className="h-[1px] w-10 bg-[var(--border)]"></div>
          </div>
          <h1 className="text-3xl font-serif text-[var(--fg)]">Capacity & Guidelines</h1>
          <p className="text-sm text-[var(--fg-muted)] max-w-2xl">
            Define boundaries for attendance, waitlist behavior, and guest conduct to ensure a coherent gathering.
          </p>
        </header>

        {/* Section 1: Logistics */}
        <section className="bg-white p-6 sm:p-8 rounded-card border border-[var(--border)] space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border)]">
            <Users size={18} className="text-[var(--accent)]" />
            <h3 className="text-base font-serif text-[var(--fg)]">Capacity & Access</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Maximum Guests</label>
              <input 
                type="number" 
                value={maxGuests} 
                onChange={(e) => setMaxGuests(e.target.value)}
                placeholder="25" 
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Waitlist Allocation</label>
              <select 
                value={waitlistMode}
                onChange={(e) => setWaitlistMode(e.target.value)}
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
              >
                <option>First-come, first-served</option>
                <option>Host Manual Selection</option>
                <option>Weighted by Reputation Tier</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
            <div>
              <p className="text-sm font-medium text-[var(--fg)]">Private Guest List</p>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">Only approved attendees can see participant profiles.</p>
            </div>
            <button
              type="button"
              onClick={() => setPrivateGuestList(!privateGuestList)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                privateGuestList ? 'bg-[var(--accent)]' : 'bg-gray-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full bg-white transition-transform ${privateGuestList ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </section>

        {/* Section 2: House Rules */}
        <section className="bg-white p-6 sm:p-8 rounded-card border border-[var(--border)] space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border)]">
            <ShieldCheck size={18} className="text-[var(--accent)]" />
            <h3 className="text-base font-serif text-[var(--fg)]">House Rules</h3>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'privacy',
                icon: CameraSlash,
                title: 'Strict Privacy Policy',
                desc: 'No unprompted social media posting or commercial photography without attendee consent.'
              },
              {
                key: 'dressCode',
                icon: CoatHanger,
                title: 'Attire Expectations',
                desc: 'Smart casual or evening attire recommended for the ambiance of this venue.'
              },
              {
                key: 'limitedAlcohol',
                icon: Wine,
                title: 'Conscious Consumption',
                desc: 'Beverage service concludes thirty minutes prior to event conclusion.'
              }
            ].map((rule) => {
              const Icon = rule.icon;
              const active = rules[rule.key];
              return (
                <div 
                  key={rule.key} 
                  onClick={() => toggleRule(rule.key)}
                  className={`p-4 rounded-card border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                    active ? 'border-[var(--accent)] bg-[var(--accent)]/[0.02]' : 'border-[var(--border)] bg-white hover:border-[var(--fg-muted)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-card border shrink-0 mt-0.5 ${active ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border)] text-[var(--fg-muted)]'}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[var(--fg)]">{rule.title}</h4>
                      <p className="text-xs text-[var(--fg-muted)] mt-0.5">{rule.desc}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    active ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'border-[var(--border)] bg-white'
                  }`}>
                    {active && <Check size={12} weight="bold" />}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Custom Notes */}
        <section className="bg-white p-6 sm:p-8 rounded-card border border-[var(--border)] space-y-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Special Instructions for Guests</label>
          <textarea 
            rows="3" 
            placeholder="e.g. Please arrive 15 minutes before showtime. Check coats on level 2."
            className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-4 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors resize-none"
          />
        </section>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <button 
            type="button"
            onClick={() => navigate('/events/create')}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/events/create')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
          >
            Continue to Payment
            <ArrowRight size={16} />
          </button>
        </div>
      </main>
    </div>
  );
}
