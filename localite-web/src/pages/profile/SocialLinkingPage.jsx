import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SocialLinkingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      
      {/* TopNavBar */}
      <header className="w-full top-0 sticky z-50 bg-[#fbf9f8] shadow-sm h-20">
        <nav className="flex justify-between items-center px-6 py-2 h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <span 
              className="font-headline-md text-3xl font-bold text-primary cursor-pointer tracking-tight"
              onClick={() => navigate('/dashboard')}
            >
              Localite
            </span>
            <div className="hidden md:flex gap-6 ml-8">
              <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Events</a>
              <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Venues</a>
              <a className="font-label-caps text-[12px] font-bold text-primary uppercase tracking-widest border-b-2 border-[#775a19] cursor-pointer">Profile</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="material-symbols-outlined text-primary p-2 cursor-pointer active:opacity-80 transition-all">notifications</button>
            <div className="w-10 h-10 rounded-full bg-[#eae8e7] overflow-hidden border border-[#c5c6cd] cursor-pointer active:opacity-80">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiUbXGuToBcnMryMdMDaK7sKOsrU93uwW6CGer-hAmUn0vylfTO85itakQ_a04GAPWLKMHvYTcwMy3qSZO9T4KFLEntUZ_3UT3vVwbN3Ovs3bkJtOMosjvfAgdIpbPuc9-uyzJcIxg-NCLlFCNIe0bpx-ALv51qkYJKzVuHq8y5RpQR5tWU85cXga4avdRJyKayQLOSv7e25NclDVp2nrQny0NhY1LeSo0O0XwGdoBn7beOVWZSsnHZw" alt="Profile" />
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-12">
        {/* Header Section */}
        <section className="text-center mb-12">
          <h1 className="font-headline-md text-5xl font-bold text-primary mb-2">Connect Your Presence</h1>
          <p className="font-body-lg text-lg text-[#44474d] max-w-2xl mx-auto">
            Curate your digital footprint. Linking your social identities allows for seamless community verification and exclusive invitations within the Localite ecosystem.
          </p>
        </section>

        {/* Bento Layout for Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LinkedIn Card */}
          <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] hover:shadow-[0_24px_48px_-16px_rgba(10,25,47,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#efeded] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">hub</span>
            </div>
            <h3 className="font-headline-sm text-2xl font-bold text-primary mb-2">LinkedIn</h3>
            <p className="font-body-md text-[#44474d] mb-6">Verify your professional credentials and elite industry status.</p>
            <button className="mt-auto w-full py-3 px-6 bg-primary text-white font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 active:scale-95 transition-all">Link Profile</button>
          </div>

          {/* Instagram Card */}
          <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] hover:shadow-[0_24px_48px_-16px_rgba(10,25,47,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#efeded] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">photo_camera</span>
            </div>
            <h3 className="font-headline-sm text-2xl font-bold text-primary mb-2">Instagram</h3>
            <p className="font-body-md text-[#44474d] mb-6">Share your aesthetic journey and local gathering highlights.</p>
            <button className="mt-auto w-full py-3 px-6 bg-primary text-white font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 active:scale-95 transition-all">Link Profile</button>
          </div>

          {/* X Card */}
          <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] hover:shadow-[0_24px_48px_-16px_rgba(10,25,47,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border-2 border-[#775a19]/20">
            <div className="w-16 h-16 rounded-full bg-[#fed488] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[#785a1a] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <h3 className="font-headline-sm text-2xl font-bold text-primary mb-2">X (Twitter)</h3>
            <p className="font-body-md text-[#775a19] mb-6">Linked. Your account is verified for real-time community updates.</p>
            <button className="mt-auto w-full py-3 px-6 border border-[#75777e] text-[#44474d] font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#eae8e7] transition-all">Disconnect</button>
          </div>
        </div>

        {/* Privacy & Trust Section */}
        <section className="mt-12 bg-[#f5f3f3] p-12 rounded-xl border border-[#c5c6cd]/30 text-center">
          <div className="inline-flex items-center gap-2 mb-2 text-[#775a19]">
            <span className="material-symbols-outlined">lock_open</span>
            <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Regal Privacy Protocol</span>
          </div>
          <h2 className="font-headline-md text-3xl font-bold text-primary mb-2">Your Trust is Our Foundation</h2>
          <p className="font-body-md text-[#44474d] max-w-3xl mx-auto leading-relaxed">
            We believe in curated transparency, not intrusive surveillance. Your social data is used exclusively to facilitate authentic connections within the Localite community. We never post on your behalf or share your private data with third parties. All connections are encrypted and managed with the utmost discretion.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a19]">security</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a19]">visibility_off</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Granular Privacy Control</span>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded-xl border border-[#c5c6cd]/20 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)]">
          <div>
            <h4 className="font-headline-sm text-2xl font-bold text-primary">Need assistance?</h4>
            <p className="font-body-md text-[#44474d]">Our concierge team is available to help with account linking.</p>
          </div>
          <button className="px-8 py-4 border border-[#775a19] text-[#775a19] font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#fed488]/10 transition-all">
            Contact Concierge
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-12 bg-[#efeded] border-t border-[#c5c6cd]">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-headline-md text-3xl font-bold text-primary mb-2 italic">Localite</span>
            <p className="font-body-md text-[#44474d]">© 2024 Localite. Modern Nobility.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] underline-offset-4 transition-all duration-300 cursor-pointer">Privacy Policy</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] underline-offset-4 transition-all duration-300 cursor-pointer">Terms of Service</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] underline-offset-4 transition-all duration-300 cursor-pointer">Press Kit</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] underline-offset-4 transition-all duration-300 cursor-pointer">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
