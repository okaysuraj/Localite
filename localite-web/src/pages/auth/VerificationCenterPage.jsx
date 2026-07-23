import React, { useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

export default function VerificationCenterPage() {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [socialLinked, setSocialLinked] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/users/verify-identity`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        setSocialLinked(true);
        alert("Social profile linked successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <SettingsLayout>
      <div className="space-y-12 animate-fade-in pb-12">
        {/* Header Section with Progress */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
          <div className="max-w-2xl">
            <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-2 uppercase">MEMBER TRUST & SAFETY</span>
            <h1 className="font-display-lg text-[36px] md:text-display-lg text-primary mb-4 leading-tight">Elevate your presence.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Verification ensures a community of integrity. Complete your profile to unlock exclusive hubs and concierge services reserved for our verified circle.
            </p>
          </div>
          <div className="relative flex items-center justify-center p-8 bg-surface-container-lowest rounded-full shadow-sm border border-outline-variant/10">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="4"></circle>
              <circle 
                className="text-secondary transition-all duration-1000 ease-in-out" 
                cx="96" cy="96" fill="transparent" r="88" 
                stroke="currentColor" 
                strokeDasharray="552.92" 
                strokeDashoffset="188" 
                strokeLinecap="round" 
                strokeWidth="4"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display-lg text-[32px] md:text-display-lg text-primary">66%</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">COMPLETE</span>
            </div>
          </div>
        </section>

        {/* Verification Steps Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Step 1: ID (Completed) */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col border border-secondary/20 relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary">badge</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2 text-primary">Identity Verification</h3>
            <p className="font-body-md text-on-surface-variant mb-auto">Your government-issued identification has been successfully processed and verified.</p>
            <div className="mt-8 flex items-center gap-2 text-secondary font-label-caps text-label-caps tracking-widest uppercase">
              VERIFIED
            </div>
          </div>

          {/* Step 2: Selfie (Completed) */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm flex flex-col border border-secondary/20 relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary">face</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2 text-primary">Biometric Match</h3>
            <p className="font-body-md text-on-surface-variant mb-auto">Live portrait match completed against your identification documents.</p>
            <div className="mt-8 flex items-center gap-2 text-secondary font-label-caps text-label-caps tracking-widest uppercase">
              VERIFIED
            </div>
          </div>

          {/* Step 3: Social (Pending) */}
          <div className="bg-primary text-white p-8 rounded-xl shadow-lg flex flex-col relative overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary-fixed">share</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2 text-white">Social Connection</h3>
            <p className="font-body-md text-on-primary-container mb-auto opacity-80">Link your professional or social profile to establish your place in the local community.</p>
            {socialLinked ? (
              <div className="mt-8 flex items-center justify-center gap-2 text-white font-label-caps text-label-caps tracking-widest uppercase py-4">
                <span className="material-symbols-outlined">check_circle</span>
                VERIFIED
              </div>
            ) : (
              <button 
                onClick={handleVerify}
                disabled={isVerifying}
                className="mt-8 w-full bg-secondary text-white font-label-caps text-label-caps py-4 rounded-lg tracking-[0.2em] hover:bg-secondary/90 transition-all active:scale-95 uppercase disabled:opacity-50"
              >
                {isVerifying ? 'CONNECTING...' : 'CONNECT NOW'}
              </button>
            )}
          </div>
        </section>

        {/* Why Verify? Editorial Section */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col lg:flex-row border border-outline-variant/20">
          <div className="lg:w-1/2 relative h-64 lg:h-auto">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1200" 
              alt="Gathering" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="lg:w-1/2 p-12 flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-secondary mb-4 uppercase tracking-widest">THE VALUE OF TRUST</span>
            <h2 className="font-headline-md text-headline-md mb-8 leading-snug text-primary">Curated access for a distinguished community.</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary mb-2 uppercase tracking-widest">UNCOMPROMISED SAFETY</h4>
                  <p className="font-body-md text-on-surface-variant">Our verification protocols ensure every member you meet is who they say they are.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">stars</span>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary mb-2 uppercase tracking-widest">EXCLUSIVE HUBS</h4>
                  <p className="font-body-md text-on-surface-variant">Gain entry to private local hubs and invitation-only events in your neighborhood.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary text-3xl">support_agent</span>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary mb-2 uppercase tracking-widest">PREMIUM CONCIERGE</h4>
                  <p className="font-body-md text-on-surface-variant">Verified members enjoy priority booking and bespoke assistance for any gathering.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SettingsLayout>
  );
}
