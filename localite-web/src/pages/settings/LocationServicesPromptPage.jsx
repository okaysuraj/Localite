import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LocationServicesPromptPage() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen overflow-x-hidden relative flex items-center justify-center">
      
      {/* Background Layer: Stylized Map */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 grayscale-[0.5] contrast-[0.8]" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdXumDZS1GILmu-yuhZN4IFzKL5PqFEi3YcUrc3ooSCMBh90X9rsULX0-05M-xODYAX1MGeX6m2msFm6eF0GDIV1qSor6_cKjQGBprYLkMTyeHPtIjoTLKf4nxS9Wz56NmpxHWTRgpLybzUT08tlR18cdmG5RExeDJ-l5H4tFFGKDEjzDcsbS4VEU7mproKx_oxLd_SyHf8d8RqXHmGFdaDr4c1afEg8WoX9D9bB3RXqTj29YHtRKoDg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f8]/10 to-[#fbf9f8]"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#775a19] to-transparent opacity-30"></div>

      {/* Content Canvas */}
      <section className="relative z-10 container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left: Editorial Content */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-12 h-px bg-[#775a19]"></span>
              <span className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-[0.2em]">The Localite Connection</span>
            </div>
            <h1 className="font-display-lg text-5xl font-bold text-primary leading-tight">
              Find Your Place <br/>
              <span className="italic text-[#775a19]">in the Circle</span>
            </h1>
            <p className="font-body-lg text-lg text-[#44474d] max-w-lg">
              To curate your membership experience, we use refined proximity intelligence. This ensures every connection made within the guild is seamless, local, and intentional.
            </p>
            
            {/* Feature Bento Grid (Mini) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] group cursor-default">
                <div className="w-10 h-10 rounded-full bg-[#f5f3f3] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[#775a19]">touch_app</span>
                </div>
                <h3 className="font-label-caps text-[12px] font-bold text-primary mb-2 uppercase tracking-widest">Hands-Free Check-ins</h3>
                <p className="text-[13px] leading-relaxed text-[#44474d]">Arrive at curated gatherings without the friction of digital credentials. Your presence is acknowledged with grace.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] group cursor-default">
                <div className="w-10 h-10 rounded-full bg-[#f5f3f3] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[#775a19]">explore</span>
                </div>
                <h3 className="font-label-caps text-[12px] font-bold text-primary mb-2 uppercase tracking-widest">Local Hub Discovery</h3>
                <p className="text-[13px] leading-relaxed text-[#44474d]">Uncover hidden sports clubs and community salons nearby, exclusively selected for their architectural and social caliber.</p>
              </div>
            </div>
          </div>

          {/* Right: Interaction Card */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-8 md:p-10 border border-[#c5c6cd]/30 flex flex-col gap-6">
              <div className="text-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-2" style={{ fontVariationSettings: "'wght' 200" }}>location_on</span>
                <h2 className="font-headline-sm text-2xl font-bold text-primary mb-2">Secure Access</h2>
                <p className="font-body-md text-[#44474d]">Choose how you wish to navigate the guild's map.</p>
              </div>
              <div className="flex flex-col gap-4 mt-2">
                
                {/* Primary CTA */}
                <button 
                  className="bg-primary text-white py-4 px-6 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#39475f] transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 group"
                  onClick={handleContinue}
                >
                  <span className="material-symbols-outlined text-lg">near_me</span>
                  Enable Location
                  <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity translate-x-2">chevron_right</span>
                </button>
                
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#c5c6cd]/50"></div></div>
                  <div className="relative flex justify-center text-xs uppercase tracking-widest text-[#75777e] bg-white px-2">or</div>
                </div>
                
                {/* Manual Entry Section */}
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      className="w-full bg-[#f5f3f3] border-2 border-transparent focus:border-[#775a19] focus:outline-none py-4 px-5 rounded-lg text-primary placeholder:text-[#75777e]/70 transition-colors" 
                      placeholder="Your current residence or hotel..." 
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <button 
                    className="w-full border border-[#775a19] text-[#775a19] py-4 px-6 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#775a19]/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    onClick={handleContinue}
                  >
                    Enter Address Manually
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-center text-[#75777e] leading-relaxed mt-4">
                Your privacy is our priority. Location data is encrypted and never shared with third parties. Review our <a className="underline underline-offset-2 hover:text-primary transition-colors cursor-pointer">Privacy Charter</a>.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Signature Brand Element: Floating Logo */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 opacity-20 pointer-events-none">
        <span className="font-headline-md text-3xl font-bold text-primary italic tracking-tight">Localite</span>
      </div>
      
    </div>
  );
}
