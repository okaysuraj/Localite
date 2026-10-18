import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarBlank, 
  Plus, 
  Compass, 
  ArrowRight 
} from '@phosphor-icons/react';

export default function EmptyStatePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[calc(100vh-80px)] flex items-center justify-center font-sans text-[var(--fg)] animate-fade-in">
      <div className="w-full bg-[var(--bg)] rounded-card border border-[var(--border)] p-8 md:p-16 text-center space-y-6 shadow-sm">
        
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg-muted)] flex items-center justify-center mx-auto">
          <CalendarBlank size={32} />
        </div>

        {/* Text */}
        <div className="space-y-2 max-w-md mx-auto">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] block">
            Calendar Open
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--fg)]">
            No Events Currently Scheduled
          </h1>
          <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
            The calendar is clear for this interval. Propose a gathering of your own design or explore nearby sports clubs and salons.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button 
            onClick={() => navigate('/events/create')}
            className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={15} weight="bold" />
            <span>Propose Gathering</span>
          </button>
          
          <button 
            onClick={() => navigate('/categories')}
            className="px-6 py-3 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] rounded-card text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Compass size={15} />
            <span>Explore Disciplines</span>
          </button>
        </div>

      </div>
    </div>
  );
}
