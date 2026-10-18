import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleNotch } from '@phosphor-icons/react';

export default function LoadingStatePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-[var(--bg)] text-[var(--fg)] min-h-screen flex flex-col font-sans relative">
      {/* Centered Brand Pulse Indicator */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-[var(--bg)]/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          <CircleNotch size={32} className="animate-spin text-[var(--accent)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)]">
            Synchronizing Localite Network...
          </span>
        </div>
      </div>

      {/* Background Shimmer Skeleton */}
      <main className="max-w-7xl mx-auto px-6 py-24 w-full space-y-8 opacity-40">
        <div className="h-10 w-48 bg-[var(--bg-subtle)] rounded-card animate-pulse border border-[var(--border)]"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] animate-pulse p-6 space-y-4"
            >
              <div className="w-12 h-12 bg-neutral-200 rounded-card"></div>
              <div className="w-3/4 h-4 bg-neutral-200 rounded"></div>
              <div className="w-1/2 h-3 bg-neutral-200 rounded"></div>
            </div>
          ))}
        </div>

        <div className="h-64 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] animate-pulse"></div>
      </main>
    </div>
  );
}
