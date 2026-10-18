import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { triggerPanic } from '../../services/api';
import { 
  X, 
  MapPin, 
  Warning, 
  PhoneCall, 
  ChatTeardropText, 
  FirstAid, 
  ShieldCheck, 
  BatteryHigh,
  Info
} from '@phosphor-icons/react';

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          triggerPanic(pos.coords.latitude, pos.coords.longitude).catch(console.error);
        },
        () => {
          triggerPanic(null, null).catch(console.error);
        }
      );
    } else {
      triggerPanic(null, null).catch(console.error);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(holdTimerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="bg-[#111315] text-[#EDECE8] min-h-screen relative flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-5 w-full border-b border-white/10 z-40 bg-[#111315]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight text-white">Localite</span>
          <span className="text-white/30">/</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">Emergency Portal</span>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-card border border-white/15 hover:bg-white/5 transition-all text-xs font-medium text-white/80"
        >
          <X size={14} />
          <span>Exit Emergency Mode</span>
        </button>
      </header>

      {/* Main Grid Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Column: Precise Location & Details */}
        <div className="hidden lg:flex flex-col lg:col-span-4 gap-6">
          <div className="bg-[#181A1D] border border-white/10 p-6 rounded-card shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <MapPin size={16} weight="fill" />
              <span>Current GPS Location</span>
            </div>
            
            <div className="relative w-full h-44 rounded-card overflow-hidden mb-5 border border-white/10 bg-[#22262B] flex items-center justify-center">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="relative z-10 w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg animate-pulse">
                <MapPin size={20} weight="fill" />
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#111315]/90 px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Live Triangulated
              </div>
            </div>
            
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] uppercase font-semibold text-white/40 tracking-wider mb-0.5">Approximate Street</p>
                <p className="text-sm font-medium text-white">Connaught Place, Inner Circle</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-white/40 tracking-wider mb-0.5">Latitude</p>
                  <p className="font-mono text-white/80 text-xs">28.6315° N</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-white/40 tracking-wider mb-0.5">Longitude</p>
                  <p className="font-mono text-white/80 text-xs">77.2167° E</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#181A1D] border border-white/10 p-5 rounded-card border-l-2 border-l-rose-500">
            <p className="text-[11px] font-semibold text-white uppercase tracking-wider mb-3">Tethered Contacts Notified</p>
            <div className="flex -space-x-2 mb-3">
              {['JT', 'EV', 'AK', '+2'].map((init, i) => (
                <div key={i} className="w-8 h-8 rounded-full border border-[#181A1D] bg-[#2B3037] text-white flex items-center justify-center text-[10px] font-bold">
                  {init}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/60 leading-relaxed">
              Contacts will instantly receive your coordinates and high-frequency live tracking link once triggered.
            </p>
          </div>
        </div>

        {/* Center Column: SOS Interaction */}
        <div className="flex flex-col items-center justify-center lg:col-span-4 text-center py-6">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">Emergency SOS</h1>
            <p className="text-xs md:text-sm text-white/70 max-w-xs mx-auto leading-relaxed">
              Press and hold the button for 3 seconds to broadcast an urgent alert and summon on-site response.
            </p>
          </div>

          {/* The Hold-to-SOS Button */}
          <div 
            className="relative cursor-pointer select-none group touch-none"
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchStart={startHold}
            onTouchEnd={cancelHold}
          >
            {/* Pulsing ring */}
            <div className={`absolute inset-0 rounded-full bg-rose-600/20 transition-all ${isHolding ? 'scale-125 animate-ping' : ''}`}></div>
            
            {/* Main Button */}
            <div className={`relative w-56 h-56 rounded-full bg-rose-600 shadow-[0_0_50px_rgba(225,29,72,0.35)] flex flex-col items-center justify-center transition-all duration-300 ${isHolding ? 'scale-95 shadow-[0_0_80px_rgba(225,29,72,0.6)]' : 'hover:scale-105'}`}>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="112" cy="112" fill="none" r="102" stroke="rgba(255,255,255,0.2)" strokeWidth="6"></circle>
                <circle 
                  cx="112" cy="112" fill="none" r="102" stroke="white" strokeWidth="6"
                  strokeDasharray="640" 
                  strokeDashoffset={isHolding ? 0 : 640}
                  style={{transition: isHolding ? 'stroke-dashoffset 3s linear' : 'stroke-dashoffset 0.3s ease-out'}}
                ></circle>
              </svg>
              <Warning size={48} weight="fill" className="text-white mb-1" />
              <span className="text-sm font-semibold tracking-widest text-white uppercase">Hold to SOS</span>
              <span className={`absolute bottom-10 text-[11px] font-mono tracking-wider text-white transition-opacity duration-200 ${isHolding ? 'opacity-100' : 'opacity-0'}`}>
                Triggering in {timeLeft}s
              </span>
            </div>
          </div>

          {/* Quick Action Secondary Buttons */}
          <div className="mt-10 flex gap-3 w-full max-w-xs justify-center">
            <button 
              onClick={() => window.open('tel:112')}
              className="flex-1 py-3 px-4 bg-white text-[#111315] rounded-card text-xs font-semibold uppercase tracking-wider flex justify-center items-center gap-2 hover:bg-white/90 transition-all active:scale-95"
            >
              <PhoneCall size={16} weight="bold" />
              Call 112
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="flex-1 py-3 px-4 border border-white/20 text-white rounded-card text-xs font-semibold uppercase tracking-wider flex justify-center items-center gap-2 hover:bg-white/5 transition-all active:scale-95"
            >
              <ChatTeardropText size={16} weight="bold" />
              Silent Chat
            </button>
          </div>
        </div>

        {/* Right Column: Safety Status & Resources */}
        <div className="hidden lg:flex flex-col lg:col-span-4 gap-6">
          <div className="bg-[#181A1D] border border-white/10 p-6 rounded-card">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-5">
              Nearby Emergency Services
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-center p-3 rounded-card bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-card bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                  <FirstAid size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Nearest Emergency Hospital</h4>
                  <p className="text-[11px] text-white/50">Dr. RML Hospital • 0.8 mi</p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-3 rounded-card bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-card bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Nearest Police Station</h4>
                  <p className="text-[11px] text-white/50">Barakhamba Road Post • 0.5 mi</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-start gap-2.5 text-[11px] text-white/70 leading-relaxed">
                <Info size={16} className="text-white/40 shrink-0 mt-0.5" />
                <span>Microphone and location telemetry are queued for automated upload when SOS is confirmed.</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#181A1D] border border-white/10 p-4 rounded-card flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <BatteryHigh size={18} className="text-emerald-400" />
              <span className="text-white/60">Device Battery Status</span>
            </div>
            <span className="font-mono font-semibold text-white">84%</span>
          </div>
        </div>
      </main>

      {/* Post-Activation Overlay */}
      {isTriggered && (
        <div className="fixed inset-0 z-50 bg-[#111315]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-fade-in">
          <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
            <Warning size={32} weight="fill" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">SOS Broadcast Triggered</h2>
          <p className="text-xs md:text-sm text-white/70 max-w-sm mb-8 leading-relaxed">
            Emergency dispatch and your trusted contacts have received your live location coordinates. Keep your device active.
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 animate-pulse w-full"></div>
            </div>
            <span className="text-xs font-medium text-white/50">Establishing live audio tether...</span>
          </div>
          <button 
            onClick={() => { setIsTriggered(false); setTimeLeft(3); }} 
            className="mt-8 px-6 py-2.5 border border-white/20 text-white/70 rounded-card text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            Dismiss Alert (Simulation)
          </button>
        </div>
      )}
    </div>
  );
}
