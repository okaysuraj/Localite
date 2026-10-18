import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, NavigationArrow, Plus, Minus, Megaphone } from '@phosphor-icons/react';

export default function LiveMapTrackingPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const membersInTransit = [
    {
      id: 1,
      name: 'Sophia Valente',
      tier: 'Diamond Patron',
      destination: 'Main Pavilion North',
      eta: '4 min ETA',
      status: 'In Transit',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    },
    {
      id: 2,
      name: 'Julian Thorne',
      tier: 'Verified Neighbor',
      destination: 'Heliport & Reception',
      eta: 'Arrived',
      status: 'On Site',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    },
  ];

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-[var(--border)] px-4 sm:px-6 py-3.5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1 rounded-card text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-sm font-medium text-[var(--fg)]">Live Member Transit Map</h1>
            <p className="text-[11px] font-mono text-[var(--fg-muted)]">
              Real-time arrival coordination for Event #{eventId || '1'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
            Live Fleet Active
          </span>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden min-h-[calc(100vh-120px)]">
        {/* Map Center Area */}
        <section className="flex-1 relative bg-[var(--bg-subtle)] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600"
            alt="Venue Map"
            className="w-full h-full object-cover filter grayscale contrast-75 opacity-30"
          />

          {/* Animated Pins */}
          <div className="absolute top-[42%] left-[48%] flex flex-col items-center">
            <div className="w-9 h-9 rounded-full border-2 border-[var(--accent)] bg-white shadow-md overflow-hidden p-0.5 animate-bounce">
              <img
                src={membersInTransit[0].avatar}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="bg-white/95 border border-[var(--border)] px-2 py-0.5 rounded-card text-[10px] font-mono text-[var(--fg)] mt-1 shadow-sm">
              Sophia (4m)
            </span>
          </div>

          <div className="absolute top-[58%] left-[62%] flex flex-col items-center">
            <div className="w-9 h-9 rounded-full border-2 border-emerald-600 bg-white shadow-md overflow-hidden p-0.5">
              <img
                src={membersInTransit[1].avatar}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="bg-white/95 border border-[var(--border)] px-2 py-0.5 rounded-card text-[10px] font-mono text-[var(--fg)] mt-1 shadow-sm">
              Julian (Arrived)
            </span>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-2">
            <div className="bg-white rounded-card border border-[var(--border)] p-1 shadow-sm flex flex-col gap-1">
              <button
                type="button"
                className="p-2 hover:bg-[var(--bg-subtle)] rounded text-[var(--fg)] transition-colors"
              >
                <Plus size={16} />
              </button>
              <div className="h-px bg-[var(--border)]" />
              <button
                type="button"
                className="p-2 hover:bg-[var(--bg-subtle)] rounded text-[var(--fg)] transition-colors"
              >
                <Minus size={16} />
              </button>
            </div>
            <button
              type="button"
              className="p-2.5 bg-white rounded-card border border-[var(--border)] shadow-sm hover:bg-[var(--bg-subtle)] text-[var(--fg)] transition-colors"
            >
              <NavigationArrow size={16} />
            </button>
          </div>
        </section>

        {/* Members in Transit Sidebar */}
        <aside className="w-full md:w-[380px] bg-white border-l border-[var(--border)] flex flex-col z-10 shrink-0">
          <div className="p-5 border-b border-[var(--border)] space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block">
              Arrival Queue
            </span>
            <h2 className="text-base font-serif text-[var(--fg)]">Members En Route</h2>
            <p className="text-xs text-[var(--fg-muted)]">Live telemetry from checked-in mobile passes.</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {membersInTransit.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-card border border-[var(--border)] bg-white hover:border-[var(--fg-muted)] transition-colors space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover border border-[var(--border)]"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[var(--fg)] truncate">{member.name}</h3>
                    <p className="text-[11px] font-mono text-[var(--fg-muted)]">{member.tier}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-card text-[10px] font-mono uppercase ${
                      member.status === 'On Site'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
                  <span>To: {member.destination}</span>
                  <span className="text-[var(--accent)] font-medium">{member.eta}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[var(--border)] bg-white">
            <button
              type="button"
              onClick={() => alert('Broadcast alert triggered.')}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
            >
              <Megaphone size={16} />
              Ping Transit Members
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
