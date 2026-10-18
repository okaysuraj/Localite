import { useContext, useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { AuthContext } from '../../context/AuthContext';
import { User, Lock, ShieldCheck, Trash } from '@phosphor-icons/react';

export default function AccountSettingsPage() {
  const { user } = useContext(AuthContext);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <SettingsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-1 pb-6 border-b border-border">
          <h1 className="text-2xl font-display font-semibold text-fg tracking-tight">Account Settings</h1>
          <p className="text-xs text-fg-muted">
            Manage your personal login credentials, security preferences, and data privacy.
          </p>
        </div>

        {/* Personal Details */}
        <div className="bg-white border border-border rounded-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <User size={18} className="text-accent" />
            <h2 className="text-base font-display font-semibold text-fg tracking-tight">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="uppercase tracking-wider text-fg-muted">Username</label>
              <div className="p-3 bg-bg-subtle border border-border rounded-btn text-fg flex items-center justify-between">
                <span>{user?.username || 'member'}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="uppercase tracking-wider text-fg-muted">Email Address</label>
              <div className="p-3 bg-bg-subtle border border-border rounded-btn text-fg flex items-center justify-between">
                <span>{user?.email || 'user@example.com'}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="uppercase tracking-wider text-fg-muted">Account Status</label>
              <div className="p-3 bg-bg-subtle border border-border rounded-btn text-fg flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-accent">
                  <ShieldCheck size={14} /> Active Verified Member
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="uppercase tracking-wider text-fg-muted">Member Since</label>
              <div className="p-3 bg-bg-subtle border border-border rounded-btn text-fg">
                <span>August 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="bg-white border border-border rounded-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-accent" />
            <h2 className="text-base font-display font-semibold text-fg tracking-tight">Security & Login</h2>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-bg-subtle border border-border rounded-card">
              <div className="space-y-0.5">
                <p className="text-fg font-medium">Password</p>
                <p className="text-fg-muted text-[11px]">Last changed 3 months ago</p>
              </div>
              <button
                onClick={() => alert('Password reset link sent to your registered email.')}
                className="px-3.5 py-1.5 border border-border bg-white text-fg rounded-btn hover:bg-bg transition-colors self-start sm:self-auto"
              >
                Reset Password
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-bg-subtle border border-border rounded-card">
              <div className="space-y-0.5">
                <p className="text-fg font-medium">Two-Factor Authentication (2FA)</p>
                <p className="text-fg-muted text-[11px]">Require verification code for login attempts</p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`px-3.5 py-1.5 rounded-btn text-xs tracking-wide transition-colors self-start sm:self-auto ${
                  twoFactor ? 'bg-accent text-white' : 'border border-border bg-white text-fg hover:bg-bg'
                }`}
              >
                {twoFactor ? 'Enabled' : 'Enable 2FA'}
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-error/20 rounded-card p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-display font-semibold text-error tracking-tight flex items-center gap-2">
            <Trash size={16} /> Danger Zone
          </h2>
          <p className="text-xs text-fg-muted leading-relaxed">
            Deleting your account will remove your profile, hosted gatherings history, team records, and XP
            stats. This action is permanent.
          </p>
          <button
            onClick={() => {
              if (window.confirm('Are you certain you want to permanently close your account?')) {
                alert('Account closure initiated.');
              }
            }}
            className="px-4 py-2 border border-error/30 text-error hover:bg-error hover:text-white rounded-btn text-xs font-mono tracking-wide transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
}
