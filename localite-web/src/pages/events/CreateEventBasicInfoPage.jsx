import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkle, CaretDown, Users, Lightbulb } from '@phosphor-icons/react';

export default function CreateEventBasicInfoPage() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [narrative, setNarrative] = useState('');

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--fg-muted)] mb-1">
            <span className="font-mono text-xs uppercase tracking-wider">Step 01 / 06</span>
            <div className="h-[1px] w-10 bg-[var(--border)]"></div>
          </div>
          <h1 className="text-3xl font-serif text-[var(--fg)]">The Foundation</h1>
          <p className="text-sm text-[var(--fg-muted)] max-w-2xl">
            Begin your journey by defining the core identity of your gathering. This narrative will be the first impression for your guests.
          </p>
        </header>

        {/* Form Card */}
        <div className="bg-white rounded-card border border-[var(--border)] p-6 sm:p-10 space-y-8">
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/events/create/datetime'); }}>
            {/* Event Name */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Event Name</label>
                <span className={`text-xs font-mono ${eventName.length > 60 ? 'text-red-500' : 'text-[var(--fg-muted)]'}`}>
                  {eventName.length}/60 recommended
                </span>
              </div>
              <input 
                type="text" 
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                maxLength={100}
                placeholder="e.g. Saturday Rooftop Salon & Wine" 
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors"
              />
              <p className="text-xs text-[var(--fg-muted)]">Titles that evoke intention or setting perform best with guests.</p>
            </div>

            {/* Grid: Category & Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Category</label>
                <div className="relative">
                  <select defaultValue="" className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>Select Sphere</option>
                    <option value="art">Art & Culture</option>
                    <option value="gastronomy">Fine Gastronomy</option>
                    <option value="wellness">Holistic Wellness</option>
                    <option value="networking">Professional Discourse</option>
                    <option value="leisure">Refined Leisure</option>
                  </select>
                  <CaretDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--fg-muted)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Intended Audience</label>
                <div className="relative">
                  <select defaultValue="" className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>Select Audience</option>
                    <option value="public">Open Community</option>
                    <option value="members">Verified Members Only</option>
                    <option value="curated">Curated Guest List</option>
                    <option value="inner-circle">Inner Circle</option>
                  </select>
                  <Users size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--fg-muted)]" />
                </div>
              </div>
            </div>

            {/* Narrative / Description */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">The Narrative</label>
                <span className={`text-xs font-mono ${narrative.length > 300 ? 'text-red-500' : 'text-[var(--fg-muted)]'}`}>
                  {narrative.length}/300 recommended
                </span>
              </div>
              <textarea 
                rows="5" 
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder="Describe the atmosphere, the flow of the evening, and what guests should expect to feel..." 
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-4 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors resize-none"
              />
              <div className="flex items-start gap-2.5 bg-[var(--bg-subtle)] p-3 rounded-card border border-[var(--border)]">
                <Lightbulb size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--fg-muted)]">Tip: Use descriptive language. Instead of &ldquo;casual dinner&rdquo;, try &ldquo;a seasonal four-course tasting menu paired with lively discussion&rdquo;.</p>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border)]">
              <button 
                type="button" 
                onClick={() => navigate('/events')}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Hub
              </button>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  type="button" 
                  onClick={() => navigate('/events/create')}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-card border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
                >
                  Full Wizard
                </button>
                <button 
                  type="button"
                  onClick={() => navigate('/events/create')} 
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Visual Guide Card */}
        <div className="rounded-card border border-[var(--border)] p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
              <Sparkle size={20} weight="fill" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-[var(--fg)]">Need guidance curating your gathering?</h4>
              <p className="text-xs text-[var(--fg-muted)]">Explore trending formats, recommended capacities, and seasonal guest preferences.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => navigate('/events')}
            className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:underline shrink-0"
          >
            Browse Examples
          </button>
        </div>
      </main>
    </div>
  );
}
