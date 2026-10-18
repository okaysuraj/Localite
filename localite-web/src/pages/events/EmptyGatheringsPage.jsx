import { useNavigate } from 'react-router-dom';
import { CalendarBlank, Plus, Compass, Users } from '@phosphor-icons/react';

export default function EmptyGatheringsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-[calc(100vh-64px)] flex items-center justify-center p-6 sm:p-12">
      <div className="max-w-xl w-full bg-white rounded-card border border-[var(--border)] p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--accent)]">
          <CalendarBlank size={32} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
            Community Schedule
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[var(--fg)]">The Calendar is Clear</h1>
          <p className="text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed max-w-md mx-auto">
            A quiet interval before the next wave of gatherings. Take this opportunity to propose an
            experience of your own or explore neighborhood circles.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/events/create')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
          >
            <Plus size={16} />
            Host a Gathering
          </button>
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-card border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            <Compass size={16} />
            Explore Neighborhood
          </button>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex items-center justify-center gap-2 text-xs font-mono text-[var(--fg-muted)]">
          <Users size={16} className="text-[var(--accent)]" />
          <span>240+ verified members active in your area</span>
        </div>
      </div>
    </div>
  );
}
