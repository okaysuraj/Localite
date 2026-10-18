import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChartLineUp, 
  CurrencyDollar, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Sparkle, 
  Users, 
  DownloadSimple 
} from '@phosphor-icons/react';

export default function EventPlanningAnalyticsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-2"
            >
              <ArrowLeft size={16} />
              Return
            </button>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
              Event Intelligence
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">Pre-Event Strategy Console</h1>
            <p className="text-xs sm:text-sm text-[var(--fg-muted)] max-w-xl mt-1">
              Predictive demand modeling and community sentiment analysis for upcoming gatherings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => alert('Report generated.')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-card border border-[var(--border)] bg-white text-xs font-mono uppercase tracking-wider text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <DownloadSimple size={16} />
              Export
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/events/create')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
            >
              Host Event
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Projected Attendance Bar Chart */}
          <section className="col-span-12 lg:col-span-8 bg-white rounded-card p-6 border border-[var(--border)] space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-serif text-[var(--fg)]">Projected Attendance Dynamics</h3>
                <p className="text-xs font-mono text-[var(--fg-muted)] mt-0.5">Forecasted demand distribution across weekday segments</p>
              </div>
              <span className="text-xs font-mono bg-[var(--bg-subtle)] border border-[var(--border)] px-2.5 py-1 rounded-card text-[var(--fg)]">
                Confidence 91%
              </span>
            </div>

            {/* Visual Bars */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { day: 'Mon', val: 142, h: '35%' },
                { day: 'Tue', val: 210, h: '52%' },
                { day: 'Wed', val: 285, h: '70%', highlight: true },
                { day: 'Thu', val: 180, h: '44%' },
                { day: 'Fri', val: 320, h: '88%', top: true },
                { day: 'Sat', val: 350, h: '95%', top: true },
                { day: 'Sun', val: 200, h: '50%' }
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-[var(--bg-subtle)] rounded-t-card h-44 flex items-end p-1">
                    <div 
                      className={`w-full rounded-t-card transition-all duration-500 ${
                        item.top 
                          ? 'bg-[var(--accent)]' 
                          : item.highlight 
                          ? 'bg-[var(--fg)]' 
                          : 'bg-stone-300'
                      }`}
                      style={{ height: item.h }}
                      title={`${item.val} guests`}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[var(--fg-muted)] uppercase">{item.day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Price Optimization */}
          <section className="col-span-12 lg:col-span-4 bg-white rounded-card p-6 border border-[var(--border)] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block">Optimization Engine</span>
              <h3 className="text-lg font-serif text-[var(--fg)]">Optimal Ticket Pricing</h3>
              <p className="text-xs text-[var(--fg-muted)]">Calculated against local member willingness-to-pay and venue capacity.</p>

              <div className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] text-center space-y-1 my-4">
                <span className="text-[10px] font-mono uppercase text-[var(--fg-muted)] block">Recommended Window</span>
                <span className="text-3xl font-mono font-bold text-[var(--fg)]">$125 — $175</span>
                <span className="text-[11px] font-mono text-[var(--accent)] block mt-1">Expected Fill Rate: 94%</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[var(--border)] text-[var(--fg-muted)]">
                  <span>Marginal Demand Lift</span>
                  <span className="text-[var(--fg)]">+14.2%</span>
                </div>
                <div className="flex justify-between py-1 text-[var(--fg-muted)]">
                  <span>Revenue Peak Target</span>
                  <span className="text-[var(--fg)] font-medium">$155.00</span>
                </div>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => navigate('/events/create')}
              className="w-full py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
            >
              Apply to Event
            </button>
          </section>

          {/* Geographical Interest */}
          <section className="col-span-12 lg:col-span-7 bg-white rounded-card p-6 border border-[var(--border)] space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-serif text-[var(--fg)]">Regional Heatmap</h3>
                <p className="text-xs font-mono text-[var(--fg-muted)] mt-0.5">Neighborhood concentration of RSVP interest</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { neighborhood: 'SoHo & NoHo', match: '92% Demand', count: '412 members' },
                { neighborhood: 'West Village', match: '84% Demand', count: '320 members' },
                { neighborhood: 'Chelsea Arts District', match: '78% Demand', count: '290 members' },
                { neighborhood: 'DUMBO Waterfront', match: '65% Demand', count: '185 members' }
              ].map((loc, idx) => (
                <div key={idx} className="p-3.5 rounded-card border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-medium text-[var(--fg)]">{loc.neighborhood}</p>
                    <p className="font-mono text-[10px] text-[var(--fg-muted)] mt-0.5">{loc.count}</p>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--accent)] font-medium">{loc.match}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Strategic Recommendation */}
          <section className="col-span-12 lg:col-span-5 bg-white rounded-card p-6 border border-[var(--border)] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Sparkle size={18} weight="fill" />
                <h3 className="text-base font-serif text-[var(--fg)]">Curator Insight</h3>
              </div>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Localite community preferences indicate an 18% surge in affinity for acoustic salons and intimate dining over standard cocktail mixers this season.
              </p>
            </div>

            <div className="p-3.5 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] text-xs font-mono space-y-1">
              <span className="text-[10px] uppercase text-[var(--fg-muted)] block">Recommended Concept</span>
              <span className="text-[var(--fg)] font-medium block">Seasonal Table + Chamber Duo</span>
            </div>

            <button 
              type="button" 
              onClick={() => navigate('/events/create')}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:underline"
            >
              Draft Intimate Gathering
              <ArrowRight size={14} />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
