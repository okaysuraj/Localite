import React, { useState, useEffect } from 'react';
import SettingsLayout from '../components/SettingsLayout';
import { auth } from '../firebase';
import { API_URL } from '../config';

export default function NotificationSettingsPage() {
  const [pushInvitations, setPushInvitations] = useState(true);
  const [pushMessages, setPushMessages] = useState(true);
  const [pushLocation, setPushLocation] = useState(false);
  const [safetyAlerts, setSafetyAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState('weekly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const user = await res.json();
        setPushInvitations(user.pushInvitations !== false);
        setPushMessages(user.pushMessages !== false);
        setPushLocation(user.pushLocation || false);
        setSafetyAlerts(user.safetyAlerts !== false);
        setEmailDigest(user.emailDigest || 'weekly');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;
      const payload = {
        pushInvitations,
        pushMessages,
        pushLocation,
        safetyAlerts,
        emailDigest
      };
      
      const res = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert("Notification preferences saved successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SettingsLayout>
      <div className="space-y-stack-lg animate-fade-in pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] mb-2 block">Personalization</span>
            <h2 className="font-display-lg text-[32px] md:text-display-lg text-primary">Notification Settings</h2>
            <p className="font-body-lg text-on-surface-variant mt-2 max-w-xl">Curate your communication preferences to maintain an undisturbed and premium social experience.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="px-6 py-3 border border-secondary text-secondary font-label-caps text-label-caps rounded-xl hover:bg-secondary hover:text-white transition-all">DISCARD</button>
            <button className="px-6 py-3 bg-primary text-white font-label-caps text-label-caps rounded-xl shadow-md active:scale-95 transition-all" onClick={handleSave}>SAVE PREFERENCES</button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Category: Push Notifications */}
          <section className="col-span-1 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 border border-surface-variant/50 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-surface-variant/50 pb-4">
              <span className="material-symbols-outlined text-secondary">notifications_active</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Push Notifications</h3>
            </div>
            <div className="space-y-4">
              
              {/* Setting Item */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-secondary-fixed-dim transition-all group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                    <span className="material-symbols-outlined">celebration</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold text-primary">New Invitations</h4>
                    <p className="text-sm text-on-surface-variant">Instant alerts for exclusive events and private gatherings.</p>
                  </div>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${pushInvitations ? 'bg-primary' : 'bg-surface-variant'}`}
                  onClick={() => setPushInvitations(!pushInvitations)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${pushInvitations ? 'translate-x-6 bg-secondary-fixed-dim' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {/* Setting Item */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-secondary-fixed-dim transition-all group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                    <span className="material-symbols-outlined">forum</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold text-primary">Messages</h4>
                    <p className="text-sm text-on-surface-variant">Real-time chat updates from your local connections.</p>
                  </div>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${pushMessages ? 'bg-primary' : 'bg-surface-variant'}`}
                  onClick={() => setPushMessages(!pushMessages)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${pushMessages ? 'translate-x-6 bg-secondary-fixed-dim' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {/* Setting Item */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-secondary-fixed-dim transition-all group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                    <span className="material-symbols-outlined">near_me</span>
                  </div>
                  <div>
                    <h4 className="font-body-md font-bold text-primary">Location Proximity</h4>
                    <p className="text-sm text-on-surface-variant">Discover hidden gems and elite events nearby as you move.</p>
                  </div>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${pushLocation ? 'bg-primary' : 'bg-surface-variant'}`}
                  onClick={() => setPushLocation(!pushLocation)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${pushLocation ? 'translate-x-6 bg-secondary-fixed-dim' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </section>

          {/* Category: Privacy Settings */}
          <section className="col-span-1 lg:col-span-4 bg-primary text-white rounded-xl p-8 shadow-lg flex flex-col gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-bl-full"></div>
            <div className="relative z-10 flex items-center gap-3 border-b border-white/20 pb-4">
              <span className="material-symbols-outlined text-secondary-fixed-dim">shield</span>
              <h3 className="font-headline-sm text-headline-sm text-white">Privacy</h3>
            </div>
            
            <div className="relative z-10 space-y-8 mt-2">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="pr-4">
                    <h4 className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase tracking-wider mb-1">Safety Alerts</h4>
                    <p className="text-sm text-primary-fixed-dim opacity-80">Critical updates regarding account security and local safety protocols.</p>
                  </div>
                  <button 
                    className={`w-10 h-5 mt-1 rounded-full p-[2px] transition-colors duration-200 shrink-0 ${safetyAlerts ? 'bg-secondary-fixed-dim' : 'bg-on-primary-container'}`}
                    onClick={() => setSafetyAlerts(!safetyAlerts)}
                  >
                    <div className={`w-4 h-4 bg-primary rounded-full shadow-sm transform transition-transform duration-200 ${safetyAlerts ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-primary-container rounded-xl border border-white/10">
                <div className="flex gap-3 mb-3">
                  <span className="material-symbols-outlined text-secondary-fixed-dim">verified_user</span>
                  <span className="font-label-caps text-label-caps text-white uppercase">Vault Status</span>
                </div>
                <p className="text-xs text-on-primary-container leading-relaxed">
                  Your data is encrypted using military-grade standards. We never share your location history with third-party partners.
                </p>
              </div>
            </div>
          </section>

          {/* Category: Email Digests */}
          <section className="col-span-1 lg:col-span-12 bg-surface-container-low rounded-xl p-8 border border-surface-variant/30 flex flex-col md:flex-row gap-8 items-center shadow-sm">
            <div className="md:w-1/3">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-secondary">mail_outline</span>
                <h3 className="font-headline-sm text-headline-sm text-primary">Email Digests</h3>
              </div>
              <p className="text-on-surface-variant font-body-md">Refined summaries of your weekly social calendar and neighborhood highlights.</p>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {['weekly', 'monthly', 'off'].map((freq) => (
                <div 
                  key={freq}
                  onClick={() => setEmailDigest(freq)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all text-center ${
                    emailDigest === freq 
                      ? 'border-secondary bg-surface-container-lowest' 
                      : 'border-transparent bg-surface-container-lowest hover:border-secondary/30'
                  }`}
                >
                  <span className="font-label-caps text-label-caps uppercase block mb-1 opacity-60 text-on-surface-variant">Frequency</span>
                  <span className="font-headline-sm text-headline-sm block text-primary capitalize">{freq}</span>
                  <p className="text-xs text-on-surface-variant mt-2">
                    {freq === 'weekly' ? 'The weekend outlook' : freq === 'monthly' ? 'Executive summary' : 'Minimalist approach'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SettingsLayout>
  );
}
