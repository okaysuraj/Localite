import React, { useState, useEffect } from 'react';
import SettingsLayout from '../components/SettingsLayout';
import { auth } from '../firebase';
import { API_URL } from '../config';

export default function PrivacySettingsPage() {
  const [publicProfile, setPublicProfile] = useState(false);
  const [liveActivity, setLiveActivity] = useState(true);
  const [preciseLocation, setPreciseLocation] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
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
        setPublicProfile(user.publicProfile || false);
        setLiveActivity(user.liveActivity !== false);
        setPreciseLocation(user.preciseLocation || false);
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
        publicProfile,
        liveActivity,
        preciseLocation
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
        alert("Privacy settings saved successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SettingsLayout>
      <div className="space-y-stack-lg animate-fade-in pb-12">
        {/* Header Section */}
        <section className="mb-8">
          <p className="font-label-caps text-label-caps text-secondary mb-2 uppercase">Your Digital Sovereignty</p>
          <h1 className="font-headline-md text-headline-md text-primary mb-4">Privacy Controls</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Manage your visibility and digital footprint within the Localite ecosystem. We prioritize your anonymity through zero-knowledge architecture.
          </p>
        </section>

        {/* Bento Grid Layout for Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-stack-lg">
          
          {/* Visibility & Status Card (Large) */}
          <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between border-l-4 border-l-primary border-t border-r border-b border-surface-variant/50 shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">visibility</span>
                <h3 className="font-headline-sm text-headline-sm">Profile & Activity</h3>
              </div>
              <div className="space-y-8">
                
                {/* Toggle Item 1 */}
                <div className="flex items-center justify-between gap-4">
                  <div className="max-w-md">
                    <h4 className="font-body-md font-bold text-primary mb-1">Public Profile Visibility</h4>
                    <p className="text-sm text-on-surface-variant">Allow non-members to view your basic profile information and curated event history.</p>
                  </div>
                  <button 
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${publicProfile ? 'bg-primary' : 'bg-surface-variant'}`}
                    onClick={() => setPublicProfile(!publicProfile)}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${publicProfile ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                
                {/* Toggle Item 2 */}
                <div className="flex items-center justify-between gap-4">
                  <div className="max-w-md">
                    <h4 className="font-body-md font-bold text-primary mb-1">Live Activity Status</h4>
                    <p className="text-sm text-on-surface-variant">Show other members when you are currently active at a venue or gathering.</p>
                  </div>
                  <button 
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${liveActivity ? 'bg-primary' : 'bg-surface-variant'}`}
                    onClick={() => setLiveActivity(!liveActivity)}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${liveActivity ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                
                {/* Toggle Item 3 */}
                <div className="flex items-center justify-between gap-4">
                  <div className="max-w-md">
                    <h4 className="font-body-md font-bold text-primary mb-1">Precise Location Sharing</h4>
                    <p className="text-sm text-on-surface-variant">Share your exact GPS coordinates with attendees of confirmed gatherings only.</p>
                  </div>
                  <button 
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${preciseLocation ? 'bg-primary' : 'bg-surface-variant'}`}
                    onClick={() => setPreciseLocation(!preciseLocation)}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${preciseLocation ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted Circle Management */}
          <div className="md:col-span-1 bg-surface-container-lowest rounded-xl p-8 border-t-4 border-t-secondary border-l border-r border-b border-surface-variant/50 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <h3 className="font-headline-sm text-headline-sm">Trusted Circle</h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">Members in this circle bypass global privacy restrictions to see your full schedule.</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">JV</div>
                  <span className="font-body-md text-primary">Julian V.</span>
                </div>
                <span className="material-symbols-outlined text-error cursor-pointer text-sm">remove_circle</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-sm">EM</div>
                  <span className="font-body-md text-primary">Elena M.</span>
                </div>
                <span className="material-symbols-outlined text-error cursor-pointer text-sm">remove_circle</span>
              </div>
            </div>
            <button className="w-full border border-secondary text-secondary font-label-caps py-3 rounded hover:bg-secondary/10 transition-colors uppercase tracking-widest">
              Add Member
            </button>
          </div>
        </div>

        {/* Blocked Users Dropdown Section */}
        <section className="bg-surface-container-lowest rounded-xl p-8 border border-surface-variant/50 shadow-sm mb-stack-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant">block</span>
              <h3 className="font-headline-sm text-headline-sm">Restricted Access</h3>
            </div>
            <button 
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors" 
              onClick={() => setShowBlocked(!showBlocked)}
            >
              <span className="material-symbols-outlined">{showBlocked ? 'expand_less' : 'expand_more'}</span>
            </button>
          </div>
          
          {showBlocked && (
            <div className="mt-6 overflow-hidden transition-all duration-300 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border border-outline-variant rounded-lg bg-surface-container-low">
                  <div>
                    <p className="font-bold text-primary">Mark Sterling</p>
                    <p className="text-xs text-on-surface-variant">Blocked on Mar 12, 2024</p>
                  </div>
                  <button className="text-sm font-label-caps text-secondary uppercase hover:underline">Unblock</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-outline-variant rounded-lg bg-surface-container-low">
                  <div>
                    <p className="font-bold text-primary">Unknown Member #42</p>
                    <p className="text-xs text-on-surface-variant">Blocked on Jan 05, 2024</p>
                  </div>
                  <button className="text-sm font-label-caps text-secondary uppercase hover:underline">Unblock</button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Zero Knowledge Architecture Messaging */}
        <footer className="bg-primary p-12 rounded-2xl text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full mb-6">
                <p className="font-label-caps text-[10px] tracking-widest text-secondary-fixed uppercase">Encryption Standard: AES-256-GCM</p>
              </div>
              <h2 className="font-headline-md text-headline-md mb-4">Zero-Knowledge Architecture</h2>
              <p className="font-body-md opacity-80 leading-relaxed">
                Your private data is encrypted locally on your device before it ever reaches our servers. Even as the platform provider, Localite has zero technical ability to access your location history, private circles, or identification documents. You hold the only keys.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-white/20 rounded-full flex items-center justify-center p-4">
                <span className="material-symbols-outlined text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>encrypted</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Save Changes Floating Anchor */}
        <div className="mt-stack-md flex justify-end gap-4">
          <button className="font-label-caps text-on-surface-variant px-8 py-3 uppercase hover:bg-surface-variant rounded transition-colors tracking-widest">Discard Changes</button>
          <button className="bg-primary text-white font-label-caps px-10 py-4 uppercase shadow-sm hover:scale-[1.02] active:scale-95 transition-all tracking-widest rounded-lg" onClick={handleSave}>Apply Privacy Manifest</button>
        </div>
      </div>
    </SettingsLayout>
  );
}
