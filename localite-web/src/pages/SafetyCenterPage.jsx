import React, { useState } from 'react';
import SettingsLayout from '../components/SettingsLayout';
import { useNavigate } from 'react-router-dom';

export default function SafetyCenterPage() {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const navigate = useNavigate();

  return (
    <SettingsLayout>
      <div className="space-y-stack-lg animate-fade-in pb-12">
        {/* Top Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <p className="font-label-caps text-secondary text-label-caps mb-2 tracking-widest uppercase">PROTECTION & PEACE OF MIND</p>
            <h2 className="font-display-lg text-[36px] md:text-display-lg text-primary">Safety Center</h2>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowSOSModal(true)}
              className="w-full md:w-auto bg-error text-white px-8 py-3 rounded-full font-label-caps text-label-caps flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(186,26,26,0.5)] animate-pulse"
            >
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>emergency_share</span>
              ACTIVATE SOS
            </button>
          </div>
        </header>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Status / Live Monitor */}
          <section className="col-span-1 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 border border-surface-variant/50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 font-label-caps text-[10px]">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> SYSTEM ACTIVE
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1">
                <h3 className="font-headline-md text-[24px] md:text-headline-md mb-4 text-primary">Current Status</h3>
                <p className="font-body-md text-on-surface-variant mb-8 max-w-lg leading-relaxed">
                  Your location sharing is currently active with your <span className="text-secondary font-bold">Inner Circle</span>. No security alerts reported in your vicinity.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">LOCAL RISK</p>
                    <p className="font-headline-sm text-headline-sm text-primary">Minimal</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">CONCIERGE</p>
                    <p className="font-headline-sm text-headline-sm text-primary">Online</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-lg hidden sm:block">
                    <p className="font-label-caps text-[10px] text-on-surface-variant mb-1">RESPONSE</p>
                    <p className="font-headline-sm text-headline-sm text-primary">~2 min</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden border border-outline-variant/30 relative">
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center relative">
                  <div className="absolute inset-0 z-0 opacity-40">
                    <img 
                      className="w-full h-full object-cover grayscale" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx9WqeGkbaHaKFC6I76drj2DbyPxexr3l9iEIrgsu_KjfLM3dwqmglNC1CkEf52mAN-PQ8CTF6KOwBvadmtpKF7Mk8X1SbPPphkInSdKkruYLQmjbBFmEquF6fItILhECAEthvDWSvdus1l9oVYL9ZMYAF7T2q2Z30J5DMg2Aw6RwhNbZ4HYHcey7a2KFSIXNtgx5E5fpfwPG6fsG7ckLcq6LTCp-6NLt8-Uoi6hJ5qijuCH2zycLtHA" 
                      alt="Map"
                    />
                  </div>
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center border border-primary/10">
                    <span className="material-symbols-outlined text-primary text-3xl">my_location</span>
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute w-32 h-32 rounded-full border border-primary/20 animate-ping opacity-20"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Live Concierge Support */}
          <section className="col-span-1 lg:col-span-4 bg-primary text-white rounded-xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-2 text-white">Concierge Support</h3>
              <p className="font-body-md text-on-primary-container mb-6 opacity-90">Immediate access to our 24/7 premium safety dispatch team for any assistance.</p>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-white text-primary px-6 py-4 rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-3 transition-all hover:bg-surface-bright active:scale-95 shadow-sm">
                <span className="material-symbols-outlined">support_agent</span>
                START LIVE CHAT
              </button>
              <button className="w-full border border-white/30 text-white px-6 py-4 rounded-lg font-label-caps text-label-caps flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-95">
                <span className="material-symbols-outlined">call</span>
                PRIORITY CALL
              </button>
            </div>
          </section>

          {/* Trusted Circles */}
          <section className="col-span-1 lg:col-span-12 bg-surface-container-lowest rounded-xl p-8 border border-surface-variant/50 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <div>
                <h3 className="font-headline-md text-headline-md mb-2 text-primary">Trusted Circles</h3>
                <p className="font-body-md text-on-surface-variant">Manage the groups who receive your location and safety alerts.</p>
              </div>
              <button className="border border-secondary text-secondary px-6 py-2 rounded-full font-label-caps text-label-caps hover:bg-secondary/5 transition-colors whitespace-nowrap">
                ADD NEW CIRCLE
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Primary Contacts */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 hover:border-secondary transition-all shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-secondary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>family_history</span>
                  <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_vert</span>
                </div>
                <h4 className="font-headline-sm text-[20px] mb-1 text-primary">Inner Circle</h4>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-6 uppercase tracking-widest">4 MEMBERS • FULL ACCESS</p>
                <div className="flex -space-x-2 mb-6">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-secondary-fixed flex items-center justify-center text-[10px] font-bold text-secondary">AM</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-primary-fixed flex items-center justify-center text-[10px] font-bold text-primary">JL</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">RK</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center">
                    <span className="text-[10px] font-bold text-on-surface-variant">+1</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-label-caps text-[10px] uppercase">SYNCED & SECURE</span>
                </div>
              </div>

              {/* Evening Out Group */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 hover:border-secondary transition-all shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-secondary text-3xl">nightlife</span>
                  <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_vert</span>
                </div>
                <h4 className="font-headline-sm text-[20px] mb-1 text-primary">The Gala Group</h4>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-6 uppercase tracking-widest">6 MEMBERS • EVENT ONLY</p>
                <div className="flex -space-x-2 mb-6">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-primary-container flex items-center justify-center text-[10px] font-bold text-white">TR</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-secondary flex items-center justify-center text-[10px] font-bold text-white">OP</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center">
                    <span className="text-[10px] font-bold text-on-surface-variant">+4</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="font-label-caps text-[10px] uppercase">EXPIRES IN 4 HOURS</span>
                </div>
              </div>

              {/* Family Circle */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 hover:border-secondary transition-all shadow-sm hidden md:block">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-secondary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>house</span>
                  <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_vert</span>
                </div>
                <h4 className="font-headline-sm text-[20px] mb-1 text-primary">Family Estate</h4>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-6 uppercase tracking-widest">2 MEMBERS • ALWAYS ON</p>
                <div className="flex -space-x-2 mb-6">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">PA</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">MA</div>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-label-caps text-[10px] uppercase">ACTIVE TRACKING</span>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Guidelines Library */}
          <section className="col-span-1 lg:col-span-12 mt-8">
            <h3 className="font-headline-md text-headline-md mb-6 text-primary">Safety Guidelines</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* Guide 1 */}
              <div className="group cursor-pointer">
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-4 shadow-sm border border-surface-variant/30">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors z-10"></div>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1542314831-c6a4d14272de?auto=format&fit=crop&q=80&w=800" alt="Arrival Protocols"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent z-20"></div>
                  <div className="absolute bottom-0 p-6 z-30">
                    <p className="font-label-caps text-[10px] text-secondary-fixed mb-1 tracking-widest uppercase">BEST PRACTICES</p>
                    <h5 className="text-white font-headline-sm text-[18px]">Arrival Protocols</h5>
                  </div>
                </div>
                <p className="text-on-surface-variant font-body-md line-clamp-2">How to utilize valet and concierge services safely when arriving at elite venues after dusk.</p>
              </div>

              {/* Guide 2 */}
              <div className="group cursor-pointer">
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-4 shadow-sm border border-surface-variant/30">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors z-10"></div>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800" alt="Private Event Security"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent z-20"></div>
                  <div className="absolute bottom-0 p-6 z-30">
                    <p className="font-label-caps text-[10px] text-secondary-fixed mb-1 tracking-widest uppercase">GATHERINGS</p>
                    <h5 className="text-white font-headline-sm text-[18px]">Private Event Security</h5>
                  </div>
                </div>
                <p className="text-on-surface-variant font-body-md line-clamp-2">Maintaining discretion and physical security during private social gatherings and large events.</p>
              </div>

              {/* Guide 3 */}
              <div className="group cursor-pointer">
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-4 shadow-sm border border-surface-variant/30">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors z-10"></div>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=800" alt="Secure Transportation"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent z-20"></div>
                  <div className="absolute bottom-0 p-6 z-30">
                    <p className="font-label-caps text-[10px] text-secondary-fixed mb-1 tracking-widest uppercase">TRAVEL</p>
                    <h5 className="text-white font-headline-sm text-[18px]">Secure Transportation</h5>
                  </div>
                </div>
                <p className="text-on-surface-variant font-body-md line-clamp-2">Vetting private chauffeurs and using Localite’s verified ride-share integration for secure travel.</p>
              </div>

              {/* Guide 4 */}
              <div className="group cursor-pointer">
                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-4 shadow-sm border border-surface-variant/30">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors z-10"></div>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800" alt="Discretion & Identity"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent z-20"></div>
                  <div className="absolute bottom-0 p-6 z-30">
                    <p className="font-label-caps text-[10px] text-secondary-fixed mb-1 tracking-widest uppercase">DIGITAL</p>
                    <h5 className="text-white font-headline-sm text-[18px]">Discretion & Identity</h5>
                  </div>
                </div>
                <p className="text-on-surface-variant font-body-md line-clamp-2">Protecting your digital footprint and location history from unauthorized public access.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Emergency Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 z-[60] bg-primary/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-2xl p-12 max-w-xl w-full text-center shadow-2xl border border-error/20">
            <div className="w-24 h-24 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <span className="material-symbols-outlined text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
            </div>
            <h2 className="font-display-lg text-[32px] md:text-headline-md mb-4 text-primary">Emergency SOS</h2>
            <p className="font-body-lg text-on-surface-variant mb-12">
              By confirming, we will immediately alert your Inner Circle and dispatch a security team to your current location.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setShowSOSModal(false)}
                className="border-2 border-outline-variant py-4 rounded-xl font-label-caps text-label-caps hover:bg-surface-variant/20 transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={() => {
                  setShowSOSModal(false);
                  alert("SOS Activated!");
                }}
                className="bg-error text-white py-4 rounded-xl font-label-caps text-label-caps shadow-lg active:scale-95 transition-all"
              >
                CONFIRM SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
