import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CurrencyDollar, 
  Gift, 
  Star, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Info,
  Check 
} from '@phosphor-icons/react';

export default function CreateEventPaymentSetupPage() {
  const navigate = useNavigate();
  const [accessType, setAccessType] = useState('free');
  const [price, setPrice] = useState('45.00');

  const parsedPrice = parseFloat(price) || 0;
  const platformFee = parsedPrice > 0 ? (parsedPrice * 0.05).toFixed(2) : '0.00';
  const processingFee = parsedPrice > 0 ? (parsedPrice * 0.03).toFixed(2) : '0.00';
  const netPerTicket = parsedPrice > 0 ? (parsedPrice - parseFloat(platformFee) - parseFloat(processingFee)).toFixed(2) : '0.00';
  const total = parsedPrice > 0 ? (parseFloat(netPerTicket) * 50).toFixed(2) : '0.00';

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--fg-muted)] mb-1">
            <span className="font-mono text-xs uppercase tracking-wider">Step 05 / 06</span>
            <div className="h-[1px] w-10 bg-[var(--border)]"></div>
          </div>
          <h1 className="text-3xl font-serif text-[var(--fg)]">Access & Ticketing</h1>
          <p className="text-sm text-[var(--fg-muted)] max-w-2xl">
            Define whether your gathering is complimentary or requires ticket purchase and payout logistics.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Free Option */}
            <div 
              onClick={() => setAccessType('free')}
              className={`p-5 rounded-card border transition-all cursor-pointer bg-white ${
                accessType === 'free' ? 'border-[var(--accent)] bg-[var(--accent)]/[0.02]' : 'border-[var(--border)] hover:border-[var(--fg-muted)]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-card border shrink-0 ${accessType === 'free' ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border)] text-[var(--fg-muted)]'}`}>
                    <Gift size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[var(--fg)]">Complimentary Access</h4>
                    <p className="text-xs text-[var(--fg-muted)] mt-0.5">Open to your community members at no charge. Great for social meetups.</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                  accessType === 'free' ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border)]'
                }`}>
                  {accessType === 'free' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </div>

            {/* Paid Option */}
            <div 
              onClick={() => setAccessType('paid')}
              className={`p-5 rounded-card border transition-all cursor-pointer bg-white ${
                accessType === 'paid' ? 'border-[var(--accent)] bg-[var(--accent)]/[0.02]' : 'border-[var(--border)] hover:border-[var(--fg-muted)]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-card border shrink-0 ${accessType === 'paid' ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border)] text-[var(--fg-muted)]'}`}>
                    <CurrencyDollar size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[var(--fg)]">Paid Admission</h4>
                    <p className="text-xs text-[var(--fg-muted)] mt-0.5">Standard ticket pricing processed securely via Stripe or PayPal.</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                  accessType === 'paid' ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border)]'
                }`}>
                  {accessType === 'paid' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>

              {accessType === 'paid' && (
                <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Set Ticket Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[var(--fg-muted)]">$</span>
                    <input 
                      type="number"
                      step="1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="45.00"
                      className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card pl-8 pr-4 py-2.5 text-sm font-mono text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Member Exclusive Option */}
            <div 
              onClick={() => setAccessType('member')}
              className={`p-5 rounded-card border transition-all cursor-pointer bg-white ${
                accessType === 'member' ? 'border-[var(--accent)] bg-[var(--accent)]/[0.02]' : 'border-[var(--border)] hover:border-[var(--fg-muted)]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-card border shrink-0 ${accessType === 'member' ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border)] text-[var(--fg-muted)]'}`}>
                    <Star size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[var(--fg)]">Prestige Members Only</h4>
                    <p className="text-xs text-[var(--fg-muted)] mt-0.5">Complimentary for verified prestige patrons; guests require direct invitation.</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                  accessType === 'member' ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border)]'
                }`}>
                  {accessType === 'member' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </div>

            {/* Payout Recipient Card */}
            <div className="p-5 rounded-card border border-[var(--border)] bg-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-card border border-[var(--border)] text-[var(--fg-muted)]">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Payout Recipient</p>
                  <p className="text-sm text-[var(--fg)] font-medium">Bank Account ending in •••• 4019</p>
                </div>
              </div>
              <button type="button" className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:underline">
                Manage
              </button>
            </div>
          </div>

          {/* Financial Breakdown Card */}
          <aside className="lg:col-span-5 bg-white rounded-card border border-[var(--border)] p-6 space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Summary</p>
              <h3 className="text-lg font-serif text-[var(--fg)] mt-0.5">Estimated Revenue</h3>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between text-[var(--fg-muted)]">
                <span>Base Ticket Price</span>
                <span className="text-[var(--fg)]">${accessType === 'paid' ? parsedPrice.toFixed(2) : '0.00'}</span>
              </div>
              <div className="flex justify-between text-[var(--fg-muted)]">
                <span>Platform Fee (5%)</span>
                <span>-${accessType === 'paid' ? platformFee : '0.00'}</span>
              </div>
              <div className="flex justify-between text-[var(--fg-muted)]">
                <span>Processing Fee (3%)</span>
                <span>-${accessType === 'paid' ? processingFee : '0.00'}</span>
              </div>
              <div className="pt-3 border-t border-[var(--border)] flex justify-between items-baseline">
                <span className="text-[var(--fg)] font-medium">Net / Attendee</span>
                <span className="text-base text-[var(--accent)] font-serif font-bold">${accessType === 'paid' ? netPerTicket : '0.00'}</span>
              </div>
              <div className="flex justify-between items-baseline text-[var(--fg-muted)]">
                <span>Est. Net (50 Cap)</span>
                <span className="text-sm text-[var(--fg)] font-medium">${accessType === 'paid' ? total : '0.00'}</span>
              </div>
            </div>

            <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex gap-2 text-xs text-[var(--fg-muted)]">
              <Info size={14} className="shrink-0 mt-0.5 text-[var(--accent)]" />
              <span>Payouts initiate automatically 48 hours after your gathering concludes.</span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button 
                type="button" 
                onClick={() => navigate('/events/create')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
              >
                Continue to Review
                <ArrowRight size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/events/create')}
                className="w-full py-2.5 rounded-card border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
              >
                Save Draft
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
