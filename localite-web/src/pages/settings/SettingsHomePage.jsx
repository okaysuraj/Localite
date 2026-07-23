import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsLayout from '../../components/SettingsLayout';
import { AuthContext } from '../../context/AuthContext';

export default function SettingsHomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <SettingsLayout>
      {/* Profile Overview Header */}
      <section className="mb-stack-lg animate-fade-in">
        <div className="bg-surface rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden border border-surface-variant/50 shadow-sm">
          <div className="absolute top-0 right-0 p-8">
            <span className="font-label-caps text-label-caps text-secondary bg-secondary-container px-4 py-1 rounded-full">Local Tastemaker</span>
          </div>
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high shadow-inner shrink-0">
            <img className="w-full h-full object-cover" src={user?.profileImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1qiDqa912VQ4ahLu3m6E4_qX8AcQSjYpyVOZNhftrwaPiXL3n11Utone_nzzHBn-TLwImCo9qe0Alsu04BLr1PY7M-6Z8lnrhiccG_l04S7ghg2q71pOlsuR5eADbqYNrWiDszNTxssqSceGJgQ-zFxtwZw7QdK6J-z2ZgM9mK0BHRmd6hm126e1z1kXtJ9_o9YjxV5iQ_3iiDC6gywzFaEfKxUnlgMIYTepsSBzwzetH5fb-wfhOw'} alt="Profile" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-headline-md text-headline-md text-primary mb-2">{user?.username || 'Julian Sterling'}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">{user?.email || 'julian.sterling@localite.com'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-outline uppercase">Member Since</span>
                <span className="font-body-md text-primary font-bold">October 2021</span>
              </div>
              <div className="w-px h-8 bg-outline-variant self-center"></div>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-outline uppercase">Tier</span>
                <span className="font-body-md text-secondary font-bold">Elite Concierge</span>
              </div>
              <div className="w-px h-8 bg-outline-variant self-center"></div>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-outline uppercase">Reputation</span>
                <span className="font-body-md text-primary font-bold">98/100</span>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/settings/profile')} className="bg-primary text-white font-label-caps text-label-caps px-8 py-4 uppercase tracking-widest active:scale-95 transition-transform hover:bg-opacity-90 rounded-lg shadow-sm">
            Edit Profile
          </button>
        </div>
      </section>

      {/* Settings Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Account Section */}
        <div onClick={() => navigate('/settings/account')} className="bg-surface rounded-xl p-8 hover:-translate-y-1 transition-transform cursor-pointer group border border-surface-variant/50 shadow-sm">
          <div className="flex justify-between items-start mb-stack-md">
            <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">person_outline</span>
            </div>
            <span className="material-symbols-outlined text-outline">north_east</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Account</h3>
          <p className="font-body-md text-on-surface-variant mb-6">Manage your subscription, billing details, and personal data exports.</p>
          <ul className="space-y-3">
            <li className="flex items-center justify-between py-2 border-b border-outline-variant/20">
              <span className="font-label-caps text-label-caps text-outline uppercase">Tier Status</span>
              <span className="font-body-md text-primary">Elite</span>
            </li>
            <li className="flex items-center justify-between py-2 border-b border-outline-variant/20">
              <span className="font-label-caps text-label-caps text-outline uppercase">Billing Cycle</span>
              <span className="font-body-md text-primary">Monthly</span>
            </li>
          </ul>
        </div>

        {/* Security Section (For now points to Account or just informative) */}
        <div className="bg-surface rounded-xl p-8 hover:-translate-y-1 transition-transform cursor-pointer group border border-surface-variant/50 shadow-sm">
          <div className="flex justify-between items-start mb-stack-md">
            <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">security</span>
            </div>
            <span className="material-symbols-outlined text-outline">north_east</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Security</h3>
          <p className="font-body-md text-on-surface-variant mb-6">Update your password and manage two-factor authentication settings.</p>
          <div className="bg-surface-container-low p-4 rounded-lg flex items-center gap-4">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span className="font-label-caps text-label-caps text-secondary uppercase">2FA Active</span>
          </div>
        </div>

        {/* Privacy Section */}
        <div onClick={() => navigate('/settings/privacy')} className="bg-surface rounded-xl p-8 hover:-translate-y-1 transition-transform cursor-pointer group border border-surface-variant/50 shadow-sm">
          <div className="flex justify-between items-start mb-stack-md">
            <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">visibility_off</span>
            </div>
            <span className="material-symbols-outlined text-outline">north_east</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Privacy</h3>
          <p className="font-body-md text-on-surface-variant mb-6">Control who sees your attendance and profile status in local circles.</p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-surface-variant text-on-surface-variant font-label-caps text-[10px] rounded uppercase">Private Mode</span>
            <span className="px-3 py-1 bg-surface-variant text-on-surface-variant font-label-caps text-[10px] rounded uppercase">Circle Only</span>
          </div>
        </div>

        {/* Notifications Section */}
        <div onClick={() => navigate('/settings/notifications')} className="md:col-span-2 bg-surface rounded-xl p-8 hover:-translate-y-1 transition-transform group border border-surface-variant/50 shadow-sm cursor-pointer">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary mb-stack-md">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Alerts</h3>
              <p className="font-body-md text-on-surface-variant">Stay informed about new exclusive gatherings and community insights.</p>
            </div>
            <div className="md:w-2/3 space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                <div className="flex flex-col">
                  <span className="font-body-md font-bold text-primary">Push Notifications</span>
                  <span className="font-label-caps text-[10px] text-outline uppercase">Real-time event invites</span>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                <div className="flex flex-col">
                  <span className="font-body-md font-bold text-primary">Email Digest</span>
                  <span className="font-label-caps text-[10px] text-outline uppercase">Weekly gathering summary</span>
                </div>
                <div className="w-12 h-6 bg-outline-variant rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-secondary-container p-8 rounded-xl flex flex-col justify-between border border-secondary/20 shadow-sm">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-secondary-container mb-2">Concierge Support</h3>
            <p className="font-body-md text-on-secondary-fixed-variant mb-6">Need assistance with your membership or hosting an event?</p>
          </div>
          <button className="w-full border border-secondary text-secondary font-label-caps text-label-caps px-6 py-3 uppercase tracking-widest hover:bg-secondary hover:text-white transition-all rounded-lg">
            Connect with Concierge
          </button>
        </div>
      </section>
    </SettingsLayout>
  );
}
