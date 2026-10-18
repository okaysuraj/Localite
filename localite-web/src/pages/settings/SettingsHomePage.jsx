import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsLayout from '../../components/SettingsLayout';
import { AuthContext } from '../../context/AuthContext';
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Bell, 
  ArrowUpRight, 
  Star, 
  Sparkle, 
  Headset,
  HardDrives,
  MapPin
} from '@phosphor-icons/react';

export default function SettingsHomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* Profile Overview Header Card */}
        <div className="bg-white rounded-card border border-[var(--border)] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--bg-subtle)] shrink-0">
            <img 
              src={user?.profileImageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240'} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-serif text-[var(--fg)]">{user?.username || 'Member Profile'}</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-mono">
                <ShieldCheck size={12} weight="fill" />
                Verified
              </span>
            </div>
            <p className="text-xs text-[var(--fg-muted)] font-mono">{user?.email || 'member@localite.org'}</p>
            <p className="text-xs text-[var(--fg-muted)] pt-1">
              Active Member • Reputation Score: <span className="text-[var(--accent)] font-mono font-medium">98/100</span>
            </p>
          </div>

          <button 
            type="button"
            onClick={() => navigate('/settings/profile')}
            className="px-4 py-2 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* Settings Categories Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Account */}
          <div 
            onClick={() => navigate('/settings/account')}
            className="bg-white rounded-card border border-[var(--border)] p-5 hover:border-[var(--fg-muted)] transition-colors cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg)]">
                <User size={18} />
              </div>
              <ArrowUpRight size={16} className="text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--fg)]">Account & Authentication</h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1">Credentials, email changes, linked providers, and session logs.</p>
            </div>
          </div>

          {/* Privacy & Visibility */}
          <div 
            onClick={() => navigate('/settings/privacy')}
            className="bg-white rounded-card border border-[var(--border)] p-5 hover:border-[var(--fg-muted)] transition-colors cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg)]">
                <Lock size={18} />
              </div>
              <ArrowUpRight size={16} className="text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--fg)]">Privacy Controls</h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1">Attendance anonymity, guest list visibility, and discovery privacy.</p>
            </div>
          </div>

          {/* Notifications */}
          <div 
            onClick={() => navigate('/settings/notifications')}
            className="bg-white rounded-card border border-[var(--border)] p-5 hover:border-[var(--fg-muted)] transition-colors cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg)]">
                <Bell size={18} />
              </div>
              <ArrowUpRight size={16} className="text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--fg)]">Alert Preferences</h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1">Direct message pings, gathering milestones, and digests.</p>
            </div>
          </div>

          {/* Location */}
          <div 
            onClick={() => navigate('/settings/location')}
            className="bg-white rounded-card border border-[var(--border)] p-5 hover:border-[var(--fg-muted)] transition-colors cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg)]">
                <MapPin size={18} />
              </div>
              <ArrowUpRight size={16} className="text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--fg)]">Neighborhood Radius</h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1">Primary neighborhood coordinates and event proximity settings.</p>
            </div>
          </div>

          {/* Storage */}
          <div 
            onClick={() => navigate('/settings/storage')}
            className="bg-white rounded-card border border-[var(--border)] p-5 hover:border-[var(--fg-muted)] transition-colors cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--fg)]">
                <HardDrives size={18} />
              </div>
              <ArrowUpRight size={16} className="text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--fg)]">Data & Exports</h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1">Manage cached offline media and request personal data archives.</p>
            </div>
          </div>

          {/* Safety Center */}
          <div 
            onClick={() => navigate('/safety-guidelines')}
            className="bg-white rounded-card border border-[var(--border)] p-5 hover:border-[var(--fg-muted)] transition-colors cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-card bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--accent)]">
                <ShieldCheck size={18} />
              </div>
              <ArrowUpRight size={16} className="text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--fg)]">Trust & Etiquette</h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1">Review community guidelines and trusted emergency circle.</p>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
}
