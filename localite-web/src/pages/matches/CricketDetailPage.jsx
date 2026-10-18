import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  ArrowLeft, 
  CalendarBlank, 
  Users, 
  Star, 
  Clock, 
  Broadcast, 
  MapPin, 
  Bell, 
  Ticket 
} from '@phosphor-icons/react';

export default function CricketDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-8 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="space-y-3">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sports
          </button>
          
          <div className="rounded-card border border-[var(--border)] overflow-hidden bg-white relative">
            <div className="h-64 sm:h-80 w-full relative bg-[var(--bg-subtle)] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200" 
                alt="Cricket Pitch" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-10">
                <div className="text-white space-y-2 max-w-2xl">
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-card inline-block">
                    Premier Cricket Division
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-serif text-white">Arena Alpha Cricket Grounds</h1>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Home to local amateur leagues and high-prestige seasonal tournaments featuring natural turf pitches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border border-[var(--border)] text-center space-y-1">
            <Users size={20} className="mx-auto text-[var(--accent)]" />
            <p className="text-2xl font-mono text-[var(--fg)] font-medium">1,240</p>
            <p className="text-[11px] font-mono uppercase text-[var(--fg-muted)]">Active Players</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)] text-center space-y-1">
            <CalendarBlank size={20} className="mx-auto text-[var(--accent)]" />
            <p className="text-2xl font-mono text-[var(--fg)] font-medium">12</p>
            <p className="text-[11px] font-mono uppercase text-[var(--fg-muted)]">Matches Scheduled</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)] text-center space-y-1">
            <Star size={20} className="mx-auto text-[var(--accent)]" />
            <p className="text-2xl font-mono text-[var(--accent)] font-medium">8.4</p>
            <p className="text-[11px] font-mono uppercase text-[var(--fg-muted)]">Avg Prestige Tier</p>
          </div>
          <div className="bg-white p-5 rounded-card border border-[var(--border)] text-center space-y-1">
            <Trophy size={20} className="mx-auto text-[var(--accent)]" />
            <p className="text-2xl font-serif text-[var(--fg)] font-medium">Turf A</p>
            <p className="text-[11px] font-mono uppercase text-[var(--fg-muted)]">Pitch Standard</p>
          </div>
        </div>

        {/* Live Scorecard Card */}
        <div className="bg-[var(--fg)] text-white rounded-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-card bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              Live Tournament Final
            </span>
            <span className="text-xs font-mono text-white/70">Mayfair Knights vs. Westminster Lions</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-4xl sm:text-5xl font-mono font-bold text-white">184 / 4</span>
              <p className="text-xs font-mono text-white/70 mt-1 uppercase">Knights • 18.2 Overs</p>
            </div>
            <div className="sm:max-w-md w-full space-y-2">
              <div className="flex justify-between text-xs text-white/80">
                <span>Striker: J. Sterling (45* from 22)</span>
                <span className="font-mono">Req. RR: 7.2</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full w-[65%]" />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/matches/1/live')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors"
            >
              <Broadcast size={16} />
              Spectate Live Match
            </button>
          </div>
        </div>

        {/* Premier Fixtures List */}
        <div className="bg-white rounded-card border border-[var(--border)] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <h2 className="text-base font-serif text-[var(--fg)]">Premier Fixtures</h2>
            <span className="text-xs font-mono uppercase text-[var(--fg-muted)]">Upcoming Matchups</span>
          </div>

          <div className="space-y-3">
            {[
              { day: '24', month: 'OCT', teamA: 'Regent CC', teamB: 'Belgravia 11', venue: 'Oval Pitch A', time: '14:00' },
              { day: '28', month: 'OCT', teamA: 'Chelsea Royals', teamB: 'Kensington Wanderers', venue: 'Pitch B', time: '15:30' }
            ].map((fix, idx) => (
              <div key={idx} className="p-4 rounded-card border border-[var(--border)] bg-[var(--bg-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-card bg-white border border-[var(--border)] text-center flex flex-col justify-center">
                    <span className="font-mono text-sm font-bold text-[var(--fg)] leading-none">{fix.day}</span>
                    <span className="font-mono text-[9px] text-[var(--fg-muted)] uppercase">{fix.month}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[var(--fg)]">{fix.teamA} vs {fix.teamB}</h4>
                    <p className="text-xs text-[var(--fg-muted)]">{fix.venue} • {fix.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button type="button" className="p-2 rounded-card border border-[var(--border)] bg-white text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
                    <Bell size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigate('/matches/join')}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
                  >
                    <Ticket size={14} />
                    Reserve Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
