import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WifiSlash, ArrowClockwise, CircleNotch } from '@phosphor-icons/react';

export default function OfflineErrorPage() {
  const navigate = useNavigate();
  const [isReconnecting, setIsReconnecting] = useState(false);

  const handleReconnect = () => {
    setIsReconnecting(true);
    setTimeout(() => {
      setIsReconnecting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[var(--bg)] rounded-card border border-[var(--border)] p-8 shadow-sm text-center space-y-6 animate-fade-in">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
          <WifiSlash size={32} weight="bold" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 block">
            Connection Interrupted
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">Network Unreachable</h1>
          <p className="text-xs text-[var(--fg-muted)] leading-relaxed max-w-xs mx-auto">
            Unable to establish encrypted handshake with Localite edge servers. Check your internet
            connectivity.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleReconnect}
            disabled={isReconnecting}
            className="w-full py-3 px-4 bg-[var(--accent)] hover:bg-[var(--accent)]/90 disabled:opacity-50 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            {isReconnecting ? (
              <CircleNotch size={15} className="animate-spin" />
            ) : (
              <ArrowClockwise size={15} weight="bold" />
            )}
            <span>{isReconnecting ? 'Attempting Reconnection...' : 'Retry Connection'}</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-2.5 px-4 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] rounded-card text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
