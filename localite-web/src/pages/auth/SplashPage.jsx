import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const glow = document.querySelector('.ambient-glow');
      if (glow) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(81, 95, 120, 0.2) 0%, transparent 60%)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen m-0 overflow-hidden relative">
      {/* Atmospheric Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Deep Gradient Foundation */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#0D1C32] to-[#050B14]"></div>
        {/* Subtle Animated Ambient Glow */}
        <div 
          className="ambient-glow absolute inset-0 opacity-40 pointer-events-none"
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
          <span className="material-symbols-outlined text-secondary text-[32px]" style={{ fontVariationSettings: "'wght' 200" }}>
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
          <span className="material-symbols-outlined text-surface-bright text-body-md">language</span>
          <span className="material-symbols-outlined text-surface-bright text-body-md">public</span>
        </div>
        <div className="hidden md:block">
          <p className="font-label-caps text-surface-bright text-[10px]">PARIS — LONDON — NEW YORK</p>
        </div>
      </footer>
    </div>
  );
};

export default SplashPage;
