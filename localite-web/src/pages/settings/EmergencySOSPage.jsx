import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmergencySOSPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(3);
  const [isHolding, setIsHolding] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const holdTimerRef = useRef(null);
  const intervalRef = useRef(null);

  const startHold = (e) => {
    e.preventDefault();
    if (isTriggered) return;
    setIsHolding(true);
    setTimeLeft(3);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    holdTimerRef.current = setTimeout(() => {
      triggerSOS();
    }, 3000);
  };

  const cancelHold = () => {
    if (isTriggered) return;
    setIsHolding(false);
    clearTimeout(holdTimerRef.current);
    clearInterval(intervalRef.current);
    setTimeLeft(3);
  };

  const triggerSOS = () => {
    setIsTriggered(true);
    setIsHolding(false);
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 500]);
    }
    console.log("SOS TRIGGERED: Location sent to emergency services and trusted contacts.");
  };

  useEffect(() => {
    return () => {
      clearTimeout(holdTimerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="bg-primary-container text-on-primary overflow-hidden h-screen font-body-md text-body-md relative flex flex-col">
      {/* Top Navigation */}
      <header className="flex justify-between items-center px-8 py-6 w-full fixed top-0 z-50 bg-transparent">
        <div className="flex items-center gap-4">
          <span className="font-display-lg text-[24px] md:text-display-lg text-primary-fixed tracking-tighter">Localite</span>
          <div className="h-6 w-[1px] bg-outline-variant/30 hidden md:block"></div>
          <span className="font-label-caps text-label-caps text-secondary-fixed uppercase hidden md:block">Safety Center</span>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-2 rounded-full border border-outline-variant/30 hover:bg-surface-variant/10 transition-all text-on-primary"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
          <span className="font-label-caps text-label-caps hidden sm:block">Exit Emergency Mode</span>
        </button>
      </header>

      {/* Main SOS Portal Canvas */}
      <main className="relative h-screen w-full flex flex-col md:flex-row items-center justify-center pt-20 px-8 gap-8 overflow-hidden z-10">
        
        {/* Left Column: Precise Location & Details */}
        <div className="hidden md:flex flex-col w-1/3 z-10 gap-8">
          <div className="bg-[rgba(27,28,28,0.8)] backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-[16px_0_32px_-12px_rgba(10,25,47,0.2)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span>
              <h2 className="font-label-caps text-label-caps text-on-primary-fixed-variant">Current Precise Location</h2>
            </div>
            
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6 border border-outline-variant/20">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKZFPgOlurszs8YlzuqscQJbiKql2OI3TAf_-ppcK8b5EWracd9nKwpbVlekiIhrr42dh0S0GT9nHE40armH3kVrcPcg88ryhNDoCJwQpxKMDyUvVogWhA8adGX0qzGjTqHZY0Gc34XT1GKOURJQtneFZcLnNq_PsPy30v6V0qImIljkWUHhV-BzWhVIaU_PLpPpHmUQjY6BUjx2AjuHhJ-vnaqUDKS78j3vrREhMThWd1SvyLf4mNLg')"}}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-primary-container/90 px-3 py-1 rounded-full border border-secondary-fixed/50">
                <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                <span className="text-[10px] font-label-caps text-on-primary tracking-widest uppercase">Live Signal</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-label-caps text-label-caps text-on-primary-fixed-variant text-[10px] mb-1">STREET ADDRESS</p>
                <p className="font-headline-sm text-[20px] text-on-primary">12 Grosvenor Square, London</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-label-caps text-label-caps text-on-primary-fixed-variant text-[10px] mb-1">LATITUDE</p>
                  <p className="font-body-md text-on-primary opacity-80">51.5113° N</p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-primary-fixed-variant text-[10px] mb-1">LONGITUDE</p>
                  <p className="font-body-md text-on-primary opacity-80">0.1511° W</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(27,28,28,0.8)] backdrop-blur-md border border-white/10 p-6 rounded-xl border-l-4 !border-l-secondary-fixed">
            <p className="font-label-caps text-label-caps text-secondary-fixed mb-4">EMERGENCY CONTACTS NOTIFIED</p>
            <div className="flex -space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface-container-high flex items-center justify-center text-[12px] font-bold text-primary">JT</div>
              <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface-container-highest flex items-center justify-center text-[12px] font-bold text-primary">EV</div>
              <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface-variant flex items-center justify-center text-[12px] font-bold text-primary">+2</div>
            </div>
            <p className="text-[12px] text-on-primary/60 italic font-body-md">Contacts will receive your live location once SOS is triggered.</p>
          </div>
        </div>

        {/* Center Column: SOS Interaction */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3 z-20 text-center">
          <div className="mb-12">
            <h1 className="font-display-lg text-[32px] md:text-display-lg text-on-primary mb-4">Emergency Portal</h1>
            <p className="font-body-lg text-body-lg text-on-primary/70 max-w-sm mx-auto">Hold the button for 3 seconds to alert local authorities and your concierge team.</p>
          </div>

          {/* The Big Button */}
          <div 
            className="relative group cursor-pointer select-none"
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
          >
            {/* Outer Pulse Rings */}
            <div className={`absolute inset-0 rounded-full bg-error/20 ${isHolding ? 'animate-ping' : ''}`}></div>
            <div className={`absolute inset-0 rounded-full bg-error/10 ${isHolding ? 'animate-ping' : ''}`} style={{animationDelay: '0.75s'}}></div>
            
            {/* Main Button Circle */}
            <div className={`relative w-64 h-64 rounded-full bg-error shadow-[0_0_60px_rgba(186,26,26,0.5)] flex flex-col items-center justify-center transition-all duration-300 ${isHolding ? 'scale-95 shadow-[0_0_80px_rgba(186,26,26,0.7)]' : ''}`}>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="128" cy="128" fill="none" r="120" stroke="rgba(255,255,255,0.2)" strokeWidth="8"></circle>
                <circle 
                  cx="128" cy="128" fill="none" r="120" stroke="white" strokeWidth="8"
                  strokeDasharray="754" 
                  strokeDashoffset={isHolding ? 0 : 754}
                  style={{transition: isHolding ? 'stroke-dashoffset 3s linear' : 'stroke-dashoffset 0.3s ease-out'}}
                ></circle>
              </svg>
              <span className="material-symbols-outlined text-[64px] mb-2 text-white" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
              <span className="font-label-caps text-[20px] tracking-[0.2em] text-white">HOLD TO SOS</span>
              <span className={`absolute bottom-12 font-label-caps text-label-caps text-white transition-opacity duration-300 ${isHolding ? 'opacity-100' : 'opacity-0'}`}>
                TRIGGERING IN {timeLeft}s
              </span>
            </div>
          </div>

          {/* Quick Action Secondary Buttons */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 w-full px-8 sm:px-0 justify-center">
            <button className="px-8 py-4 bg-on-primary text-primary-container rounded-xl font-label-caps text-label-caps flex justify-center items-center gap-3 hover:bg-secondary-fixed transition-colors active:scale-95">
              <span className="material-symbols-outlined text-[20px]">call</span>
              CALL 999
            </button>
            <button className="px-8 py-4 border border-outline-variant/40 text-on-primary rounded-xl font-label-caps text-label-caps flex justify-center items-center gap-3 hover:bg-on-primary/10 transition-colors active:scale-95">
              <span className="material-symbols-outlined text-[20px]">chat</span>
              SILENT CHAT
            </button>
          </div>
        </div>

        {/* Right Column: Safety Status & Resources */}
        <div className="hidden md:flex flex-col w-1/3 z-10 gap-8">
          <div className="bg-[rgba(27,28,28,0.8)] backdrop-blur-md border border-white/10 p-8 rounded-xl">
            <h3 className="font-label-caps text-label-caps text-secondary-fixed mb-6 uppercase tracking-widest">Safety Resources</h3>
            <div className="space-y-6">
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-surface-variant/10 flex items-center justify-center text-secondary-fixed group-hover:bg-secondary-fixed group-hover:text-primary-container transition-all">
                  <span className="material-symbols-outlined">medical_services</span>
                </div>
                <div>
                  <h4 className="font-label-caps text-label-caps text-on-primary">Nearest Hospital</h4>
                  <p className="text-[12px] text-on-primary/60">St. Mary’s Emergency (0.4 miles)</p>
                </div>
              </div>
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-surface-variant/10 flex items-center justify-center text-secondary-fixed group-hover:bg-secondary-fixed group-hover:text-primary-container transition-all">
                  <span className="material-symbols-outlined">local_police</span>
                </div>
                <div>
                  <h4 className="font-label-caps text-label-caps text-on-primary">Police Station</h4>
                  <p className="text-[12px] text-on-primary/60">Savile Row Station (1.2 miles)</p>
                </div>
              </div>
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-surface-variant/10 flex items-center justify-center text-secondary-fixed group-hover:bg-secondary-fixed group-hover:text-primary-container transition-all">
                  <span className="material-symbols-outlined">shield_person</span>
                </div>
                <div>
                  <h4 className="font-label-caps text-label-caps text-on-primary">Concierge Security</h4>
                  <p className="text-[12px] text-on-primary/60">On-site response (2 mins away)</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-outline-variant/10">
              <div className="bg-primary/30 p-4 rounded-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary-fixed text-[20px]">info</span>
                <p className="text-[12px] text-on-primary/80 leading-relaxed italic">
                  Your audio and front camera will begin recording immediately upon activation for evidence collection and situational awareness.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[rgba(27,28,28,0.8)] backdrop-blur-md border border-white/10 p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-label-caps text-[10px] text-on-primary-fixed-variant">BATTERY STATUS</p>
              <p className="font-headline-sm text-[20px] text-on-primary">84%</p>
            </div>
            <div className="w-16 h-8 bg-surface-variant/20 rounded-md p-1">
              <div className="bg-secondary-fixed h-full w-[84%] rounded-sm"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Post-Activation Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-primary-container flex flex-col items-center justify-center text-center transition-opacity duration-700 ${isTriggered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <h2 className="font-display-lg text-[40px] md:text-display-lg text-on-primary mb-2">SOS Dispatched</h2>
        <p className="font-body-lg text-body-lg text-secondary-fixed mb-12">Authorities and contacts have been alerted with your live location.</p>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-1 bg-secondary-fixed rounded-full overflow-hidden">
            <div className="h-full bg-on-primary animate-pulse w-full"></div>
          </div>
          <span className="font-label-caps text-label-caps text-on-primary/60">Establishing live audio link...</span>
        </div>
        <button 
          onClick={() => { setIsTriggered(false); setTimeLeft(3); }} 
          className="mt-12 px-6 py-2 border border-outline-variant/30 text-on-primary/60 rounded-full hover:bg-white/10"
        >
          Dismiss (Demo Only)
        </button>
      </div>

    </div>
  );
}
