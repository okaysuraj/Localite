import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OfflineErrorPage() {
  const navigate = useNavigate();
  const [isReconnecting, setIsReconnecting] = useState(false);

  const handleReconnect = () => {
    setIsReconnecting(true);
    setTimeout(() => {
      setIsReconnecting(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md overflow-hidden min-h-screen">
      
      {/* Background Layer: High-End Atmospheric Photography */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#fbf9f8]"></div>
        <div className="absolute inset-0 opacity-40 mix-blend-multiply transition-transform duration-[20s] ease-in-out scale-105 transform origin-center">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCw4-e7RS_X7K9pJiKexFRp67tIQnQB9ViKANi01fh8sYwg-_HI0s2ChWG00GKq_mQs6kYopxVHZwvmIYhXIS3A1il5ObD-kK21oEr3ZQz1wgTPQifohovAFB6OIZZzUc2M_UC4DupJHF8vIfUtgTPG_XVkV_5_PeD3fpFQpySycTl1NbYRi5Z9fwNHCz57NNhJCFpJGi32StTKgyov6C6HbPhL3KcKWgBXVsJrVLSfbU2h1fAEazPydA')" }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(10,25,47,0.1)_100%)]"></div>
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 text-center">
        
        {/* Branding Anchor (Top Left) */}
        <div className="absolute top-10 left-6 md:left-12">
          <span 
            className="font-headline-md text-3xl font-bold text-primary italic tracking-tight cursor-pointer"
            onClick={() => navigate('/')}
          >
            Localite
          </span>
        </div>
        
        {/* Central Content Cluster */}
        <div className="max-w-3xl space-y-6">
          
          {/* Icon with subtle animation */}
          <div className="inline-flex items-center justify-center w-24 h-24 mb-2 animate-pulse">
            <span className="material-symbols-outlined text-[64px] text-[#775a19]">wifi_off</span>
          </div>
          
          {/* Title: Modern Editorial */}
          <h1 className="font-headline-md text-5xl font-bold text-primary tracking-tight">
            A Moment of Silence
          </h1>
          
          {/* Subtext */}
          <p className="font-body-lg text-lg text-[#44474d] max-w-lg mx-auto leading-relaxed">
            Our digital concierge is momentarily indisposed. While we restore the connection, please enjoy the stillness of the guild.
          </p>
          
          {/* Action Cluster */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-6">
            {/* Primary Action */}
            <button 
              className="group relative overflow-hidden bg-primary text-white px-12 py-4 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.08)] transition-all duration-300 active:scale-95 flex items-center justify-center disabled:opacity-70"
              onClick={handleReconnect}
              disabled={isReconnecting}
            >
              <span className="relative z-10 font-label-caps text-[12px] font-bold uppercase tracking-widest flex items-center gap-2">
                {isReconnecting ? 'CONNECTING...' : 'RECONNECT'}
                <span className={`material-symbols-outlined text-[18px] ${isReconnecting ? 'animate-spin' : ''}`}>refresh</span>
              </span>
              <div className="absolute inset-0 bg-[#775a19] opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
            
            {/* Secondary Action */}
            <button 
              className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#775a19] border border-[#775a19] px-12 py-4 rounded-xl hover:bg-[#f5f3f3] transition-colors active:scale-95"
              onClick={() => navigate('/dashboard')}
            >
              VIEW SAVED PASSES
            </button>
          </div>
        </div>
        
        {/* Status Indicator (Bottom Center) */}
        <div className="absolute bottom-12 left-0 w-full">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full bg-[#ba1a1a] ${!isReconnecting && 'animate-pulse'}`}></div>
            <p className="font-label-caps text-[10px] font-bold text-[#44474d]/60 uppercase tracking-[0.2em]">
              {isReconnecting ? 'ATTEMPTING SECURE HANDSHAKE' : 'CONNECTION TERMINATED • STANDBY'}
            </p>
          </div>
        </div>
        
        {/* Desktop Footer Links (Bottom Right) */}
        <div className="absolute bottom-10 right-6 md:right-12 hidden md:flex items-center gap-4">
          <a className="font-label-caps text-[10px] font-bold text-[#44474d] hover:text-primary transition-colors cursor-pointer uppercase tracking-widest">HELP CENTER</a>
          <span className="w-1 h-1 bg-[#c5c6cd] rounded-full"></span>
          <a className="font-label-caps text-[10px] font-bold text-[#44474d] hover:text-primary transition-colors cursor-pointer uppercase tracking-widest">STATUS PAGE</a>
        </div>
        
      </main>
      
    </div>
  );
}
