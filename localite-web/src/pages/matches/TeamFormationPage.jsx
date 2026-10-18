import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkle, 
  Plus, 
  CheckCircle,
  ArrowsLeftRight 
} from '@phosphor-icons/react';

export default function TeamFormationPage() {
  const navigate = useNavigate();

  const [reserves, setReserves] = useState([
    { id: 1, name: 'Alexander Thorne', power: 88, role: 'Midfield' },
    { id: 2, name: 'Elena Vance', power: 92, role: 'Forward' },
    { id: 3, name: 'Julian Saint', power: 79, role: 'Defender' },
    { id: 4, name: 'Marcus Aurelius', power: 85, role: 'Keeper' },
  ]);

  const [teamA, setTeamA] = useState([
    { id: 10, name: 'Dominic King', power: 94, role: 'Captain' },
    { id: 11, name: 'Sophia Laurent', power: 88, role: 'Forward' },
  ]);

  const [teamB, setTeamB] = useState([
    { id: 20, name: 'Cassius Reed', power: 91, role: 'Captain' },
    { id: 21, name: 'Chloe Dubois', power: 86, role: 'Midfield' },
  ]);

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
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
              Match Setup
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">Team Balancing & Formation</h1>
            <p className="text-xs sm:text-sm text-[var(--fg-muted)] max-w-xl mt-1">
              Distribute confirmed players across squads to ensure competitive equilibrium.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => alert('Teams finalized.')}
              className="px-5 py-2.5 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
            >
              Finalize Roster
            </button>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Reserve Roster (Col 4) */}
          <div className="lg:col-span-4 bg-white rounded-card border border-[var(--border)] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">Available Reserves</span>
              <span className="text-xs font-mono text-[var(--accent)]">{reserves.length} Players</span>
            </div>

            <div className="space-y-2">
              {reserves.map((p) => (
                <div 
                  key={p.id}
                  className="p-3 rounded-card border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-medium text-[var(--fg)]">{p.name}</p>
                    <p className="text-[10px] font-mono text-[var(--fg-muted)]">{p.role} • Skill: {p.power}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[var(--accent)] font-medium">Ready</span>
                </div>
              ))}
            </div>
          </div>

          {/* Teams Columns (Col 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Squad Alpha */}
            <div className="bg-white rounded-card border border-[var(--border)] p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <div>
                  <h3 className="text-sm font-medium text-[var(--fg)]">Squad Alpha</h3>
                  <span className="text-[10px] font-mono text-[var(--fg-muted)]">Home Colors</span>
                </div>
                <span className="text-xs font-mono font-medium text-[var(--fg)]">Rating: 182</span>
              </div>

              <div className="space-y-2">
                {teamA.map((p) => (
                  <div key={p.id} className="p-3 rounded-card border border-[var(--border)] bg-white flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-[var(--fg)]">{p.name}</p>
                      <p className="text-[10px] font-mono text-[var(--fg-muted)]">{p.role}</p>
                    </div>
                    <span className="font-mono text-xs font-medium text-[var(--accent)]">{p.power}</span>
                  </div>
                ))}

                <div className="border border-dashed border-[var(--border)] rounded-card p-3 text-center text-xs font-mono text-[var(--fg-muted)]">
                  + Open Roster Slot
                </div>
              </div>
            </div>

            {/* Squad Bravo */}
            <div className="bg-white rounded-card border border-[var(--border)] p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <div>
                  <h3 className="text-sm font-medium text-[var(--fg)]">Squad Bravo</h3>
                  <span className="text-[10px] font-mono text-[var(--fg-muted)]">Away Colors</span>
                </div>
                <span className="text-xs font-mono font-medium text-[var(--fg)]">Rating: 177</span>
              </div>

              <div className="space-y-2">
                {teamB.map((p) => (
                  <div key={p.id} className="p-3 rounded-card border border-[var(--border)] bg-white flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-[var(--fg)]">{p.name}</p>
                      <p className="text-[10px] font-mono text-[var(--fg-muted)]">{p.role}</p>
                    </div>
                    <span className="font-mono text-xs font-medium text-[var(--accent)]">{p.power}</span>
                  </div>
                ))}

                <div className="border border-dashed border-[var(--border)] rounded-card p-3 text-center text-xs font-mono text-[var(--fg-muted)]">
                  + Open Roster Slot
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
