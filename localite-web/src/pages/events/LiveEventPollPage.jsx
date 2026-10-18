import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChartBar, 
  Clock, 
  ArrowLeft, 
  Users, 
  CheckCircle, 
  Megaphone,
  Sparkle,
  Archive
} from '@phosphor-icons/react';

export default function LiveEventPollPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [selectedOption, setSelectedOption] = useState('a');
  const [time, setTime] = useState(252); // 4:12

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timeString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const options = [
    { id: 'a', title: 'The Floating Glass Atrium & Herbarium', votes: 524, pct: 42 },
    { id: 'b', title: 'Heritage Timber & Brass Salon', votes: 349, pct: 28 },
    { id: 'c', title: 'Open Courtyard with Acoustic Pergola', votes: 375, pct: 30 },
  ];

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-8 px-4 sm:px-6">
      <main className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-1"
            >
              <ArrowLeft size={16} />
              Return
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <h1 className="text-2xl sm:text-3xl font-serif text-[var(--fg)]">Live Assembly Poll</h1>
            </div>
            <p className="text-xs text-[var(--fg-muted)]">Real-time attendee voting during the gathering.</p>
          </div>

          <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-card border border-[var(--border)]">
            <div className="text-center">
              <span className="block font-mono text-base font-medium text-[var(--fg)]">1,248</span>
              <span className="block font-mono text-[10px] text-[var(--fg-muted)] uppercase">Votes Cast</span>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div className="text-center">
              <span className="block font-mono text-base font-bold text-[var(--accent)]">{timeString}</span>
              <span className="block font-mono text-[10px] text-[var(--fg-muted)] uppercase">Remaining</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Poll Card */}
          <div className="lg:col-span-8 bg-white rounded-card border border-[var(--border)] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block mb-1">Interactive Topic</span>
              <h2 className="text-xl sm:text-2xl font-serif text-[var(--fg)] leading-snug">
                Which architectural pavilion design best reflects our community vision for the 2027 Summer Gathering?
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4 pt-2">
              {options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`p-4 rounded-card border transition-all cursor-pointer space-y-2 ${
                      isSelected 
                        ? 'border-[var(--accent)] bg-[var(--accent)]/[0.03]' 
                        : 'border-[var(--border)] hover:border-[var(--fg-muted)] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border)]'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)]'}`}>
                          {opt.title}
                        </span>
                      </div>
                      <span className="font-mono font-medium text-[var(--fg)]">{opt.pct}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-[var(--bg-subtle)] rounded-full overflow-hidden border border-[var(--border)]/50">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${isSelected ? 'bg-[var(--accent)]' : 'bg-stone-400'}`}
                        style={{ width: `${opt.pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Meta */}
            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--fg-muted)]">
              <span>94.2% community participation rate</span>
              <span className="font-mono">Real-time STOMP feed active</span>
            </div>
          </div>

          {/* Sidebar Admin Controls */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-card border border-[var(--border)] p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Host Admin Controls</h3>
              <p className="text-xs text-[var(--fg-muted)]">Manage poll duration or publish results directly to the stage screen.</p>
              
              <div className="space-y-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => alert('Results pushed to attendee screens!')}
                  className="w-full py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
                >
                  Push Results to Feed
                </button>
                <button 
                  type="button" 
                  onClick={() => alert('Poll concluded.')}
                  className="w-full py-2.5 rounded-card border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                >
                  Conclude Poll
                </button>
              </div>
            </div>

            {/* Past Assemblies Card */}
            <div className="bg-white rounded-card border border-[var(--border)] p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider">
                <Archive size={16} />
                <span>Previous Assembly Decisions</span>
              </div>
              <div className="text-xs space-y-1">
                <p className="font-medium text-[var(--fg)]">Preferred Acoustic Venue</p>
                <p className="text-[11px] text-[var(--fg-muted)]">Selected: Chelsea Conservatory (78% consensus)</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
