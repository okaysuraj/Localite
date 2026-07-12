import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to welcome carousel after the animation finishes
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 4000); // 4 seconds should be enough for the loader and fade-in animations

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A192F] m-0 overflow-hidden relative">
      {/* Atmospheric Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Deep Gradient Foundation */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#0D1C32] to-[#050B14]"></div>
        
        {/* Subtle Animated Ambient Glow */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none" 
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(81, 95, 120, 0.15) 0%, transparent 70%)' }}
        ></div>
        
        {/* Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')" }}
        ></div>
      </div>

      {/* Main Content Shell */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-container-margin w-full">
        
        {/* Decorative Top Ornament */}
        <div className="mb-stack-lg opacity-40 scale-75 md:scale-100">
          <span className="material-symbols-outlined text-secondary text-[32px] font-thin" style={{ fontVariationSettings: "'wght' 200" }}>
            unfold_more
          </span>
        </div>

        {/* Logo Container */}
        <div className="overflow-hidden mb-6">
          <h1 className="font-display-lg text-[64px] md:text-[88px] text-surface-bright tracking-[-0.04em] leading-none reveal-text">
            LOCALITE
          </h1>
        </div>

        {/* Tagline */}
        <div className="tagline-fade">
          <p className="font-label-caps text-secondary tracking-[0.4em] uppercase mb-stack-lg">
            Intentional Connection
          </p>
        </div>

        {/* Loading Indicator Section */}
        <div className="flex flex-col items-center space-y-4 pt-4 tagline-fade" style={{ animationDelay: '1.4s' }}>
          <div className="gold-loader"></div>
          <span className="font-label-caps text-on-primary-container opacity-40 text-[10px] tracking-[0.2em]">
            CURATING YOUR EXPERIENCE
          </span>
        </div>

      </main>

      {/* Bottom Navigation / Brand Identity Element */}
      <footer className="fixed bottom-12 w-full flex justify-between items-end px-container-margin z-10 opacity-30 tagline-fade" style={{ animationDelay: '1.8s' }}>
        <div className="hidden md:block">
          <p className="font-label-caps text-surface-bright text-[10px]">EST. MMXXIV</p>
        </div>
        <div className="flex space-x-gutter">
          <span className="material-symbols-outlined text-surface-bright text-body-md" style={{ fontVariationSettings: "'wght' 200" }}>language</span>
          <span className="material-symbols-outlined text-surface-bright text-body-md" style={{ fontVariationSettings: "'wght' 200" }}>public</span>
        </div>
        <div className="hidden md:block">
          <p className="font-label-caps text-surface-bright text-[10px]">PARIS — LONDON — NEW YORK</p>
        </div>
      </footer>

      {/* Styles for animations */}
      <style>{`
        .reveal-text {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          animation: text-reveal 1.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }

        @keyframes text-reveal {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .tagline-fade {
          animation: fade-in-up 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;
        }

        @keyframes fade-in-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0.6; }
        }

        .gold-loader {
          width: 140px;
          height: 1px;
          background: rgba(233, 193, 118, 0.1);
          position: relative;
          overflow: hidden;
        }

        .gold-loader::after {
          content: '';
          position: absolute;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #e9c176, transparent);
          animation: loading 2.5s infinite ease-in-out;
        }

        @keyframes loading {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashPage;
