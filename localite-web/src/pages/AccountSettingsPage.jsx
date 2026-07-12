import React, { useContext, useState } from 'react';
import SettingsLayout from '../components/SettingsLayout';
import { AuthContext } from '../context/AuthContext';

export default function AccountSettingsPage() {
  const { user } = useContext(AuthContext);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <SettingsLayout>
      <div className="space-y-stack-lg animate-fade-in">
        {/* Header Section */}
        <header className="space-y-2 mb-8">
          <h1 className="font-display-lg text-[32px] md:text-display-lg text-primary">Account Settings</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">Manage your premium membership details, secure your identity, and customize your local concierge experience.</p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Personal Details (Large Card) */}
          <section className="col-span-1 md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 space-y-8 border border-surface-variant/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">person</span>
                <h2 className="font-headline-sm text-headline-sm">Personal Details</h2>
              </div>
              <button className="text-secondary font-label-caps text-label-caps hover:underline">Edit All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant opacity-70">Legal Name</label>
                <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between group hover:bg-white hover:shadow-[inset_0_0_0_1.5px_#775a19] transition-all cursor-pointer">
                  <span className="font-body-md text-primary">{user?.username || 'Julian Sterling'}</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant opacity-70">Email Address</label>
                <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between group hover:bg-white hover:shadow-[inset_0_0_0_1.5px_#775a19] transition-all cursor-pointer">
                  <span className="font-body-md text-primary">{user?.email || 'j.sterling@elite.localite.com'}</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant opacity-70">Mobile Phone</label>
                <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between group hover:bg-white hover:shadow-[inset_0_0_0_1.5px_#775a19] transition-all cursor-pointer">
                  <span className="font-body-md text-primary">+1 (555) 012-3456</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant opacity-70">Primary Residence</label>
                <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between group hover:bg-white hover:shadow-[inset_0_0_0_1.5px_#775a19] transition-all cursor-pointer">
                  <span className="font-body-md text-primary">London, Kensington</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                </div>
              </div>
            </div>
          </section>

          {/* Subscription Status (Sidebar Card) */}
          <section className="col-span-1 md:col-span-12 lg:col-span-4 bg-primary text-white rounded-xl p-8 flex flex-col justify-between overflow-hidden relative shadow-sm">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary opacity-20 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
                <span className="font-label-caps text-label-caps text-secondary">Elite Status</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-headline-sm mb-1">Platinum Tier</h2>
                <p className="text-xs text-on-primary-container">Next billing cycle: Oct 12, 2024</p>
              </div>
              <ul className="space-y-3 text-sm opacity-90">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Priority Event Booking
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Private Sports Clubs
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Dedicated Concierge
                </li>
              </ul>
            </div>
            <button className="relative z-10 mt-8 w-full py-3 bg-secondary text-white font-label-caps text-label-caps rounded-lg hover:brightness-110 transition-all active:scale-95">
              Manage Membership
            </button>
          </section>

          {/* Security & Authentication */}
          <section className="col-span-1 md:col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-surface-container-lowest rounded-xl p-8 border border-surface-variant/50 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-secondary">shield_person</span>
                <h2 className="font-headline-sm text-headline-sm">Security & Authentication</h2>
              </div>
              
              <div className="divide-y divide-surface-container">
                {/* Password Row */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-body-md font-bold text-primary">Password</h4>
                    <p className="text-sm text-on-surface-variant">Last changed 4 months ago</p>
                  </div>
                  <button className="px-6 py-2 border border-secondary text-secondary font-label-caps text-label-caps rounded-lg hover:bg-secondary/5 transition-colors active:scale-95 self-start sm:self-auto">
                    Update Password
                  </button>
                </div>
                
                {/* 2FA Row */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-body-md font-bold text-primary">Two-Factor Authentication</h4>
                    <p className="text-sm text-on-surface-variant max-w-sm">Add an extra layer of security to your account with mobile verification.</p>
                  </div>
                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    <span className="text-sm font-bold text-primary">{twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                    <button 
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${twoFactorEnabled ? 'bg-secondary' : 'bg-surface-variant'}`}
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>
                
                {/* Connected Accounts Row */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-body-md font-bold text-primary">Biometric Login</h4>
                    <p className="text-sm text-on-surface-variant">Use FaceID or Fingerprint on trusted devices.</p>
                  </div>
                  <button className="px-6 py-2 border border-secondary text-secondary font-label-caps text-label-caps rounded-lg hover:bg-secondary/5 transition-colors active:scale-95 self-start sm:self-auto">
                    Manage Devices
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Profile Branding/Avatar Large Section */}
          <section className="col-span-1 md:col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center text-center space-y-6 border border-surface-variant/50 shadow-sm">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-inner ring-4 ring-background">
                <img 
                  className="w-full h-full object-cover" 
                  src={user?.profileImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ1BbwaCTUXqMWeuX3CgIY08MCKDAwNYj0KpOyDVK51lw4u1sAbI-w8tynDn25hfGNoLWc_tjkfiWvT-8ktDis9GFf3HNmKTDzMhvGCmETfS9Q1gBYgV7OTVJ1hCUgKOh2dXxi0Y8e5UsYyKh9GLnQDlAGqqmfmIRgYodQZl4DlUgPceFzjpgiJxYIOuM87963j1ssPTU8x3-dYmJe74SFHbkPo6ef5eI71lfJnG9ldj3HRyTxpCvhZA'} 
                  alt="Profile" 
                />
              </div>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm">{user?.username || 'Julian Sterling'}</h3>
              <p className="font-label-caps text-label-caps text-on-surface-variant opacity-60">Elite Member since 2021</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full pt-4">
              <div className="bg-surface-container p-4 rounded-lg">
                <span className="font-label-caps text-[10px] text-on-surface-variant block uppercase">Attended</span>
                <span className="font-headline-sm text-[20px] text-primary">42</span>
              </div>
              <div className="bg-surface-container p-4 rounded-lg">
                <span className="font-label-caps text-[10px] text-on-surface-variant block uppercase">Hosted</span>
                <span className="font-headline-sm text-[20px] text-primary">12</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your profile is visible to other Elite members in the Sports Hub and Gathering registries.
            </p>
          </section>
        </div>

        {/* Footer/Danger Zone */}
        <footer className="pt-stack-md border-t border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-body-md font-bold text-error">Deactivate Account</h4>
            <p className="text-sm text-on-surface-variant">Temporarily disable your profile or permanently delete your data.</p>
          </div>
          <button className="px-8 py-3 bg-surface-container-lowest border border-error text-error font-label-caps text-label-caps rounded-lg hover:bg-error-container/20 transition-all active:scale-95 whitespace-nowrap">
            Close Account
          </button>
        </footer>
      </div>
    </SettingsLayout>
  );
}
