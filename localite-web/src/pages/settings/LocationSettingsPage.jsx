import React, { useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { 
  MapPin, 
  ShieldCheck, 
  Compass, 
  Broadcast, 
  CheckCircle,
  FloppyDisk
} from '@phosphor-icons/react';

export default function LocationSettingsPage() {
  const [guardian, setGuardian] = useState(true);
  const [discovery, setDiscovery] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SettingsLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
          <div>
            <p className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
              Telemetry & Geo-Fencing
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Location Settings
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
              Manage automatic check-in triggers, neighborhood discovery, and safety guardian tracking.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle size={16} weight="fill" /> Saved
              </span>
            )}
            <button 
              onClick={handleSave}
              className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <FloppyDisk size={16} weight="bold" />
              Save Configuration
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Guardian Presence */}
          <div className="bg-[var(--bg)] p-6 md:p-8 rounded-card border border-[var(--border)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <ShieldCheck size={22} weight="fill" />
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${guardian ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setGuardian(!guardian)}
                  aria-label="Toggle guardian presence"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${guardian ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <h3 className="text-base font-semibold text-[var(--fg)] mb-1">Guardian Presence Mode</h3>
              <p className="text-xs text-[var(--accent)] font-semibold uppercase tracking-wider mb-3">
                {guardian ? 'Active Telemetry' : 'Standby Mode'}
              </p>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Automatically monitors your safe transit home from evening gatherings. If transit abruptly stalls without resolution, your inner circle receives an automated reassurance ping.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--fg-muted)]">
              <span>Battery impact: &lt; 1% daily</span>
              <span className="font-semibold text-[var(--fg)]">Always On</span>
            </div>
          </div>

          {/* Local Discovery Radar */}
          <div className="bg-[var(--bg)] p-6 md:p-8 rounded-card border border-[var(--border)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <Broadcast size={22} weight="fill" />
                </div>
                <button 
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${discovery ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                  onClick={() => setDiscovery(!discovery)}
                  aria-label="Toggle discovery radar"
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${discovery ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <h3 className="text-base font-semibold text-[var(--fg)] mb-1">Curated Venue Radar</h3>
              <p className="text-xs text-[var(--accent)] font-semibold uppercase tracking-wider mb-3">
                {discovery ? 'Proximity Active' : 'Passive Browsing'}
              </p>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                Surfaces verified partner venues, rooftop pickleball courts, and private member salons within a 3-mile radius of your immediate position.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--fg-muted)]">
              <span>Privacy tier: Zero coordinate logs</span>
              <span className="font-semibold text-[var(--fg)]">Geofenced</span>
            </div>
          </div>

          {/* Geofence Permissions Information Banner */}
          <div className="col-span-1 md:col-span-2 bg-[var(--bg-subtle)] p-6 rounded-card border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-card bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] flex items-center justify-center shrink-0">
                <Compass size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--fg)]">System Location Permission Status</h4>
                <p className="text-xs text-[var(--fg-muted)]">Location services are enabled in your current browser session.</p>
              </div>
            </div>
            <button 
              onClick={() => alert("Re-querying browser geolocation API...")}
              className="px-4 py-2 border border-[var(--border)] text-xs font-semibold uppercase tracking-wider text-[var(--fg)] rounded-card hover:bg-[var(--bg)] transition-colors shrink-0"
            >
              Verify Permission
            </button>
          </div>

        </div>
      </div>
    </SettingsLayout>
  );
}
