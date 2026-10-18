import React, { useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { 
  Database, 
  DownloadSimple, 
  Trash, 
  HardDrives, 
  Image, 
  ChatCircle, 
  ClockClockwise,
  CheckCircle
} from '@phosphor-icons/react';

export default function DataStorageSettingsPage() {
  const [clearing, setClearing] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleClearCache = () => {
    setClearing(true);
    setTimeout(() => {
      setClearing(false);
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }, 1000);
  };

  const handleExportData = () => {
    alert("Preparing complete archive of your profile, registrations, and messages. A download link will be dispatched shortly.");
  };

  return (
    <SettingsLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
          <div>
            <p className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
              System & Infrastructure
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Data & Storage
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
              Inspect localized storage usage, manage offline assets, and export your personal archive.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportData}
              className="px-4 py-2.5 border border-[var(--border)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider rounded-card hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-2"
            >
              <DownloadSimple size={16} weight="bold" />
              Export Full Archive
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Storage Consumption Bar */}
          <div className="col-span-1 lg:col-span-8 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)] space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">Storage Utilization</h3>
                <p className="text-xs text-[var(--fg-muted)]">Local device storage utilized by Localite web assets.</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-[var(--fg)]">142.4 MB</span>
                <span className="text-xs text-[var(--fg-muted)] block">of 2.0 GB Allocated</span>
              </div>
            </div>

            {/* Segmented bar */}
            <div className="w-full h-3 bg-[var(--bg-subtle)] rounded-full overflow-hidden flex">
              <div style={{ width: '45%' }} className="bg-[var(--accent)]" title="Event Media: 64 MB"></div>
              <div style={{ width: '25%' }} className="bg-emerald-600" title="Chat Transcripts: 36 MB"></div>
              <div style={{ width: '15%' }} className="bg-sky-600" title="Offline Cache: 22 MB"></div>
              <div style={{ width: '15%' }} className="bg-amber-500" title="Telemetry Logs: 20 MB"></div>
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>
                  <span className="text-[11px] font-semibold text-[var(--fg)]">Media</span>
                </div>
                <p className="text-sm font-semibold text-[var(--fg)]">64.2 MB</p>
                <p className="text-[10px] text-[var(--fg-muted)]">Event photos & banners</p>
              </div>

              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span className="text-[11px] font-semibold text-[var(--fg)]">Transcripts</span>
                </div>
                <p className="text-sm font-semibold text-[var(--fg)]">36.1 MB</p>
                <p className="text-[10px] text-[var(--fg-muted)]">Messages & voice clips</p>
              </div>

              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                  <span className="text-[11px] font-semibold text-[var(--fg)]">Cache</span>
                </div>
                <p className="text-sm font-semibold text-[var(--fg)]">22.0 MB</p>
                <p className="text-[10px] text-[var(--fg-muted)]">IndexedDB & venues</p>
              </div>

              <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-[11px] font-semibold text-[var(--fg)]">Logs</span>
                </div>
                <p className="text-sm font-semibold text-[var(--fg)]">20.1 MB</p>
                <p className="text-[10px] text-[var(--fg-muted)]">Security audit records</p>
              </div>
            </div>
          </div>

          {/* Quick Actions & Maintenance */}
          <div className="col-span-1 lg:col-span-4 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
                <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <HardDrives size={18} weight="fill" />
                </span>
                <h3 className="text-base font-semibold text-[var(--fg)]">Maintenance</h3>
              </div>
              <p className="text-xs text-[var(--fg-muted)] mb-6 leading-relaxed">
                Clearing temporary offline cache re-syncs fresh assets from the cloud without removing your saved conversations or profile status.
              </p>
            </div>

            <div className="space-y-3">
              {cleared && (
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 animate-fade-in">
                  <CheckCircle size={16} weight="fill" /> Local cache flushed successfully
                </div>
              )}
              <button 
                onClick={handleClearCache}
                disabled={clearing}
                className="w-full py-3 px-4 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] rounded-card text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                {clearing ? <ClockClockwise size={16} className="animate-spin" /> : <Trash size={16} />}
                <span>{clearing ? 'Purging Cache...' : 'Clear Local Cache'}</span>
              </button>
            </div>
          </div>

          {/* GDPR / Data Rights Card */}
          <div className="col-span-1 lg:col-span-12 bg-[var(--bg-subtle)] p-6 md:p-8 rounded-card border border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-semibold text-[var(--fg)] mb-1">Right to Erasure & Portability</h4>
              <p className="text-xs text-[var(--fg-muted)] max-w-2xl leading-relaxed">
                Under our digital privacy charter, you maintain absolute ownership of your event history, messages, and uploaded photos. Requesting an erasure initiates an unrecoverable purge across all edge nodes.
              </p>
            </div>
            <button 
              onClick={() => alert("Erasure request submitted to safety dispatch.")}
              className="px-4 py-2 text-rose-600 border border-rose-200 hover:bg-rose-50 text-xs font-semibold uppercase tracking-wider rounded-card transition-colors shrink-0"
            >
              Request Account Purge
            </button>
          </div>

        </div>
      </div>
    </SettingsLayout>
  );
}
