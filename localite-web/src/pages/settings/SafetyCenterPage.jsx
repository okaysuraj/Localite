import React, { useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Warning, 
  MapPin, 
  Headset, 
  PhoneCall, 
  Users, 
  CheckCircle, 
  Clock, 
  House, 
  Compass, 
  Car, 
  LockKey,
  X
} from '@phosphor-icons/react';

export default function SafetyCenterPage() {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const navigate = useNavigate();

  return (
    <SettingsLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[var(--border)] pb-8">
          <div>
            <p className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
              Protection & Peace of Mind
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Safety Center
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1">
              Active system alerts, emergency assistance, and vetted protocol management.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowSOSModal(true)}
              className="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-card text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <Warning size={16} weight="fill" />
              Activate SOS
            </button>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Status Monitor */}
          <section className="col-span-1 lg:col-span-8 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
                Live Protection Active
              </span>
              <span className="text-xs text-[var(--fg-muted)]">Encrypted Channel</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[var(--fg)] mb-2">Current Status</h3>
                <p className="text-sm text-[var(--fg-muted)] mb-6 leading-relaxed">
                  Your location sharing is currently active with your <strong className="text-[var(--fg)] font-semibold">Inner Circle</strong>. No security advisories reported in your vicinity.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[var(--bg-subtle)] p-4 rounded-card border border-[var(--border)]">
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-[var(--fg-muted)] mb-1">Local Risk</p>
                    <p className="text-base font-semibold text-emerald-600">Minimal</p>
                  </div>
                  <div className="bg-[var(--bg-subtle)] p-4 rounded-card border border-[var(--border)]">
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-[var(--fg-muted)] mb-1">Concierge</p>
                    <p className="text-base font-semibold text-[var(--fg)]">Online</p>
                  </div>
                  <div className="bg-[var(--bg-subtle)] p-4 rounded-card border border-[var(--border)]">
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-[var(--fg-muted)] mb-1">Response</p>
                    <p className="text-base font-semibold text-[var(--fg)]">~2 min</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-44 aspect-square rounded-card overflow-hidden border border-[var(--border)] relative shrink-0 bg-[var(--bg-subtle)] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-[var(--border)] flex items-center justify-center text-[var(--accent)] z-10">
                  <MapPin size={24} weight="fill" />
                </div>
                <div className="absolute w-24 h-24 rounded-full border border-[var(--accent)]/30 animate-ping"></div>
              </div>
            </div>
          </section>

          {/* Concierge Support */}
          <section className="col-span-1 lg:col-span-4 bg-[var(--fg)] text-white rounded-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white/80 text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldCheck size={16} weight="fill" />
                24/7 Security Team
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Concierge Support</h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Immediate access to our vetted dispatch team for reassurance, transit assistance, and emergency routing.
              </p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/chat')}
                className="w-full bg-white text-[var(--fg)] px-4 py-3 rounded-card text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-95"
              >
                <Headset size={16} weight="bold" />
                Start Live Chat
              </button>
              <button 
                onClick={() => alert("Connecting to Priority Dispatch...")}
                className="w-full border border-white/20 text-white px-4 py-3 rounded-card text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
              >
                <PhoneCall size={16} weight="bold" />
                Priority Call
              </button>
            </div>
          </section>

          {/* Trusted Circles */}
          <section className="col-span-1 lg:col-span-12 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--fg)]">Trusted Circles</h3>
                <p className="text-xs text-[var(--fg-muted)]">Manage the groups and contacts who receive your safety check-ins.</p>
              </div>
              <button 
                onClick={() => navigate('/settings/circles')}
                className="border border-[var(--border)] text-[var(--fg)] px-4 py-2 rounded-card text-xs font-semibold uppercase tracking-wider hover:bg-[var(--bg-subtle)] transition-colors"
              >
                Configure Circles
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Inner Circle */}
              <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-5 hover:border-[var(--accent)] transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="w-9 h-9 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                    <Users size={20} weight="fill" />
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle size={14} weight="fill" /> Active
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[var(--fg)] mb-1">Inner Circle</h4>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] mb-4">
                  4 Members • Full Access
                </p>
                <div className="flex -space-x-2">
                  {['AM', 'JL', 'RK', '+1'].map((init, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border border-white bg-neutral-200 text-[10px] font-bold text-neutral-700 flex items-center justify-center">
                      {init}
                    </div>
                  ))}
                </div>
              </div>

              {/* Gala Group */}
              <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-5 hover:border-[var(--accent)] transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="w-9 h-9 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                    <Clock size={20} weight="fill" />
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--fg-muted)] uppercase tracking-wider">
                    Expires in 4h
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[var(--fg)] mb-1">The Gala Group</h4>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] mb-4">
                  6 Members • Event Only
                </p>
                <div className="flex -space-x-2">
                  {['TR', 'OP', 'EL', '+3'].map((init, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border border-white bg-neutral-200 text-[10px] font-bold text-neutral-700 flex items-center justify-center">
                      {init}
                    </div>
                  ))}
                </div>
              </div>

              {/* Family Estate */}
              <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-5 hover:border-[var(--accent)] transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="w-9 h-9 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                    <House size={20} weight="fill" />
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle size={14} weight="fill" /> Active
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[var(--fg)] mb-1">Family Estate</h4>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] mb-4">
                  2 Members • Always On
                </p>
                <div className="flex -space-x-2">
                  {['PA', 'MA'].map((init, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border border-white bg-neutral-200 text-[10px] font-bold text-neutral-700 flex items-center justify-center">
                      {init}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Safety Guidelines Library */}
          <section className="col-span-1 lg:col-span-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--fg)]">Safety Guidelines & Protocols</h3>
              <button 
                onClick={() => navigate('/settings/guidelines')} 
                className="text-xs font-semibold text-[var(--accent)] hover:underline"
              >
                View Complete Handbook →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  title: 'Arrival Protocols',
                  cat: 'Best Practices',
                  desc: 'How to utilize check-ins and concierge services when arriving at evening venues.',
                  icon: Compass
                },
                {
                  title: 'Private Gathering Safety',
                  cat: 'Gatherings',
                  desc: 'Maintaining privacy, boundary respect, and personal safety during private salons.',
                  icon: Users
                },
                {
                  title: 'Secure Transit & Escort',
                  cat: 'Travel',
                  desc: 'Vetted transportation, designated pickup points, and verified rideshare integration.',
                  icon: Car
                },
                {
                  title: 'Discretion & Identity',
                  cat: 'Digital',
                  desc: 'Safeguarding your digital footprint, coordinates, and event attendance records.',
                  icon: LockKey
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    onClick={() => navigate('/settings/guidelines')}
                    className="p-5 bg-[var(--bg)] border border-[var(--border)] rounded-card hover:border-[var(--accent)] cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-card bg-[var(--bg-subtle)] text-[var(--fg)] flex items-center justify-center mb-3">
                        <Icon size={18} />
                      </div>
                      <p className="text-[10px] uppercase font-semibold tracking-wider text-[var(--accent)] mb-1">{item.cat}</p>
                      <h4 className="text-sm font-semibold text-[var(--fg)] mb-2">{item.title}</h4>
                      <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--fg)] mt-4 flex items-center gap-1">
                      Read guide →
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Emergency Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[var(--bg)] rounded-card p-6 md:p-8 max-w-md w-full text-center border border-[var(--border)] shadow-xl relative">
            <button 
              onClick={() => setShowSOSModal(false)}
              className="absolute top-4 right-4 text-[var(--fg-muted)] hover:text-[var(--fg)]"
            >
              <X size={18} />
            </button>
            <div className="w-14 h-14 bg-rose-500/10 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Warning size={28} weight="fill" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">Activate Emergency SOS?</h2>
            <p className="text-xs text-[var(--fg-muted)] mb-6 leading-relaxed">
              Confirming will instantly notify your Inner Circle contacts with your live location coordinates and dispatch our priority safety response network.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowSOSModal(false)}
                className="border border-[var(--border)] py-2.5 rounded-card text-xs font-semibold text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowSOSModal(false);
                  navigate('/settings/sos');
                }}
                className="bg-rose-600 text-white py-2.5 rounded-card text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-rose-700 active:scale-95 transition-all"
              >
                Confirm SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
