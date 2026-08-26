import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const VerificationCenterPage = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    if (circleRef.current) {
      const radius = 88;
      const circumference = radius * 2 * Math.PI;
      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      const offset = circumference - (66 / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset;
    }
  }, []);

  return (
    <div className="font-body-md overflow-x-hidden min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-container-margin py-stack-lg flex-grow">
        {/* Header Section with Progress */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-stack-lg mb-stack-lg">
          <div className="max-w-2xl">
            <span className="font-label-caps text-label-caps text-secondary tracking-widest block mb-2">MEMBER TRUST & SAFETY</span>
            <h1 className="font-display-lg text-display-lg text-primary mb-4 leading-tight">Elevate your presence.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Verification ensures a community of integrity. Complete your profile to unlock exclusive hubs and concierge services reserved for our verified circle.
            </p>
          </div>
          <div className="relative flex items-center justify-center p-8 bg-surface-container-lowest rounded-full ethereal-shadow border border-outline-variant/10">
            <svg className="w-48 h-48">
              <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="4"></circle>
              <circle 
                ref={circleRef}
                className="text-secondary" 
                cx="96" cy="96" fill="transparent" r="88" 
                stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.6s ease-in-out', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display-lg text-display-lg text-primary">66%</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">COMPLETE</span>
            </div>
          </div>
        </section>

        {/* Verification Steps Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-stack-lg">
          {/* Step 1: ID (Completed) */}
          <div className="bg-surface-container-lowest p-8 rounded-xl ethereal-shadow flex flex-col border border-secondary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="w-12 h-12 bg-secondary-container/30 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary">badge</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2">Identity Verification</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-auto">Your government-issued identification has been successfully processed and verified.</p>
            <div className="mt-8 flex items-center gap-2 text-secondary font-label-caps text-label-caps">
              VERIFIED
            </div>
          </div>

          {/* Step 2: Selfie (Completed) */}
          <div className="bg-surface-container-lowest p-8 rounded-xl ethereal-shadow flex flex-col border border-secondary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="w-12 h-12 bg-secondary-container/30 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary">face</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2">Biometric Match</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-auto">Live portrait match completed against your identification documents.</p>
            <div className="mt-8 flex items-center gap-2 text-secondary font-label-caps text-label-caps">
              VERIFIED
            </div>
          </div>

          {/* Step 3: Social (Pending) */}
          <div className="bg-primary text-on-primary p-8 rounded-xl ethereal-shadow flex flex-col relative overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-surface-container-highest/20 rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary-fixed">share</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2">Social Connection</h3>
            <p className="font-body-md text-body-md text-on-primary-container mb-auto opacity-80">
              Link your professional or social profile to establish your place in the local community.
            </p>
            <button className="mt-8 w-full bg-secondary text-white font-label-caps text-label-caps py-4 rounded-none tracking-[0.2em] hover:bg-secondary/90 transition-all active:scale-95">
              CONNECT NOW
            </button>
          </div>
        </section>

        {/* Why Verify? Editorial Section */}
        <section className="bg-white rounded-xl ethereal-shadow overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative h-96 lg:h-auto">
            <img 
              className="w-full h-full object-cover" 
              alt="Evening garden gathering"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmcgfphxLdvUcOj9kbdKFaF3hm_SCc6vnfWUdIt3RlPv8TwSGOgI9NPryjZzKev9_CiRqeLa4Y-4cf_8xzVuJjAX9HPxZYmvuybblG-z0_Xyb7XqxX2a7ShCTmy_FhJkvVDpgYUbCrwpoZWit604DAvgGqE26RvzoYdgoHT4o3C1u-ee1hfs2H0aj0BvLPbeX8tKvqYWljF0NaJFCp2kgyys2gB5gvY5ZshMGd5gfSik7VPBPCRRaRlg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="lg:w-1/2 p-stack-lg flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-secondary mb-4">THE VALUE OF TRUST</span>
            <h2 className="font-headline-md text-headline-md mb-6 leading-snug">Curated access for a distinguished community.</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary mb-1">UNCOMPROMISED SAFETY</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Our verification protocols ensure every member you meet is who they say they are.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary">stars</span>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary mb-1">EXCLUSIVE HUBS</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Gain entry to private local hubs and invitation-only events in your neighborhood.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary">support_agent</span>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary mb-1">PREMIUM CONCIERGE</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Verified members enjoy priority booking and bespoke assistance for any gathering.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-stack-lg bg-surface-container-highest border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-container-margin py-stack-md max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2 mb-6 md:mb-0">
            <span className="font-headline-sm text-headline-sm text-primary">Localite</span>
            <p className="font-body-md text-body-md text-on-surface-variant opacity-70">© 2024 Localite. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/privacy" className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all">Privacy Policy</Link>
            <Link to="/terms" className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all">Terms of Service</Link>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all" href="#">Community Guidelines</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all" href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VerificationCenterPage;
