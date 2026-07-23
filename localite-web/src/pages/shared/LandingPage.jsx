import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Canvas } from '@react-three/fiber';
import { SceneContent } from '../../components/Scene';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const containerRef = useRef(null);
  const [timeline, setTimeline] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  useLayoutEffect(() => {
    // Phase 5: Master GSAP Timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });

    // Set up proxy timing to orchestrate WebGL Scene
    const proxy = { progress: 0 };
    masterTl
      .addLabel('hero', 0)
      .to(proxy, { progress: 1, duration: 1 })
      .addLabel('valueProp', 1)
      .to(proxy, { progress: 2, duration: 1 })
      .addLabel('features', 2)
      .to(proxy, { progress: 3, duration: 1 })
      .addLabel('cta', 3);

    setTimeline(masterTl);

    // Phase 7: UI Animation
    // For a flowing layout, we apply ScrollTriggers to the sections to stagger them in as they enter view.
    // This still respects the "lag slightly" rule because they scrub into view with a delay.
    
    gsap.utils.toArray('.anim-section').forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1.2
          }
        }
      );
    });

    return () => {
      masterTl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* Fixed Background Canvas */}
      <div className="fixed inset-0 z-[-1] w-full h-full opacity-30 pointer-events-none">
        <Canvas>
          {timeline && <SceneContent timeline={timeline} />}
        </Canvas>
      </div>

      {/* Shared Component: TopNavBar */}
      <nav className="bg-surface-dark/80 backdrop-blur-2xl fixed top-0 w-full z-50 border-b border-surface-variant/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-auto">
            {/* The base64 logo provided in HTML */}
            <img src="data:image/png;base64,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" className="h-full object-contain" alt="Logo" />
          </div>
        </div>
        <div className="hidden md:flex space-x-8 items-center font-label-mono text-label-mono uppercase tracking-widest">
          <a className="text-on-surface hover:text-lime-vibe transition-all duration-300 scale-95 active:scale-90" href="#">EVENTS</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-300 scale-95 active:scale-90 hover-glitch" href="#">CLUBS</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-300 scale-95 active:scale-90 hover-glitch" href="#">SOCIETY</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-300 scale-95 active:scale-90 hover-glitch" href="#">MEMBERS</a>
        </div>
        <button 
          onClick={() => navigate('/signup')}
          className="font-label-mono text-label-mono uppercase tracking-widest bg-lime-vibe text-primary-container px-6 py-2 rounded-DEFAULT hover:bg-white transition-colors duration-300 glow-neon scale-95 active:scale-90"
        >
          JOIN NOW
        </button>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-section-gap">
        
        {/* Section 1: Hero */}
        <section className="anim-section min-h-[80vh] flex flex-col justify-center items-start grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
          <div className="col-span-1 md:col-span-10 md:col-start-2 z-10 space-y-8 mix-blend-difference">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tighter uppercase leading-[0.9]">
              REAL WORLD <br/>
              <span className="text-lime-vibe">CONNECTIONS</span>
            </h1>
            <p className="font-body-lg text-body-lg text-text-muted max-w-xl border-l border-surface-variant/20 pl-4">
              Precision social engineering for athletes, creators, and night-owls. We build the ecosystem. You bring the energy.
            </p>
            <div className="pt-8">
              <button className="group relative px-8 py-4 bg-transparent border border-surface-variant text-on-surface font-label-mono text-label-mono uppercase tracking-widest overflow-hidden transition-all hover:border-lime-vibe hover:text-lime-vibe rounded-DEFAULT">
                <span className="relative z-10 flex items-center gap-2">
                  EXPLORE ECOSYSTEM
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
                <div className="absolute inset-0 bg-surface-container-high scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Mission Statement */}
        <section className="anim-section grid grid-cols-1 md:grid-cols-12 gap-gutter items-center border-t border-surface-variant/10 pt-section-gap">
          <div className="col-span-1 md:col-span-4 space-y-4">
            <h2 className="font-label-caps text-label-caps text-lime-vibe uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-lime-vibe rounded-full"></span> 01 // PROTOCOL
            </h2>
            <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
              Beyond the screen, <br/>into the field.
            </h3>
          </div>
          <div className="col-span-1 md:col-span-7 md:col-start-6">
            <p className="font-body-lg text-body-lg text-text-muted">
              Digital portfolios are meaningless without physical execution. LOCALITE merges high-end digital discovery with visceral, real-world events. We provide the infrastructure for premium sports clubs, exclusive society gatherings, and uncompromised athletic performance.
            </p>
            <div className="mt-8 flex gap-4 font-label-mono text-label-mono text-text-muted uppercase">
              <span className="px-3 py-1 border border-surface-variant/20 rounded-DEFAULT">PERFORMANCE</span>
              <span className="px-3 py-1 border border-surface-variant/20 rounded-DEFAULT">NETWORKING</span>
              <span className="px-3 py-1 border border-surface-variant/20 rounded-DEFAULT">EXCLUSIVE</span>
            </div>
          </div>
        </section>

        {/* Section 3: Events Grid (Bento Style) */}
        <section className="anim-section space-y-12 border-t border-surface-variant/10 pt-section-gap">
          <div className="flex justify-between items-end">
            <h2 className="font-label-caps text-label-caps text-lime-vibe uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-lime-vibe rounded-full"></span> 02 // DIRECTORY
            </h2>
            <a className="font-label-mono text-label-mono text-text-muted hover:text-lime-vibe transition-colors flex items-center gap-1 uppercase" href="#">
              View All <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
            {/* Sports Block */}
            <div className="col-span-1 md:col-span-8 group relative rounded-lg border border-surface-variant/20 bg-surface-container-low overflow-hidden hover:border-lime-vibe/50 transition-colors duration-500 flex flex-col justify-end p-8">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALnNwi7d5tRCZNuXSpDdT_2YTV1WKmgJRVKKqIg9yY-5viyMQtSPmntLsJpiRNHmTYguB3dolf8T7c4OqUbQ-y0wL-zf2CTnt27yZ27WWRDyBXuZDt1YYKHwnEUlBKcuQ7KXEE4cAqUc8dAaIJibGVW2SuBqqQmsAo08ff61-6Gvg_3trkRuidNSVlVJn82IaGkcmHAfBY5oJIN-xDp3daz_o78L6y97L6hl39JXJR7nZhr_mkecIQ119cgcCIopXs4Pb576-6BnA')"}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              <div className="relative z-10 space-y-2">
                <div className="font-label-caps text-label-caps text-lime-vibe uppercase tracking-[0.2em]">ACTIVE</div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">Sports &amp; Athletics</h3>
                <p className="font-body-md text-body-md text-text-muted max-w-md line-clamp-2">High-performance leagues, training camps, and courtside access.</p>
              </div>
            </div>
            
            {/* Socials Block */}
            <div className="col-span-1 md:col-span-4 group relative rounded-lg border border-surface-variant/20 bg-surface-container-low overflow-hidden hover:border-lime-vibe/50 transition-colors duration-500 flex flex-col justify-end p-8">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUjwWBnuLxZT5nUhvOG6KQRLrfjeNg-x9Pu3B_d64aGYQDNi_h9mwcmR2pESOTQZCx1Rw0WtufouoBEISm5j7pCNMeW6WsE6hGCszqUcjX5xnj3PrWKayFrH1jPsczlb-mm3WOs8dcakZe9A9AuGBbzvSo-5VrDfCpFkUALY-G7Nta4bmpNeS4DovK8gdNIbibvvahyV-IkQcHnpFKJ1MOpNm5Hynf9f1iyq8uZKxwBOnCC2vY7lz8uFVpbCXwTYYpwyfW6Po3_rY')"}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
              <div className="relative z-10 space-y-2">
                <div className="font-label-caps text-label-caps text-lime-vibe uppercase tracking-[0.2em]">GATHERINGS</div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">Socials</h3>
                <p className="font-body-md text-body-md text-text-muted line-clamp-2">Curated after-hours.</p>
              </div>
            </div>

            {/* Clubs Block */}
            <div className="col-span-1 md:col-span-4 group relative rounded-lg border border-surface-variant/20 bg-surface-container-lowest overflow-hidden hover:border-lime-vibe/50 transition-colors duration-500 flex flex-col justify-between p-8">
              <div className="relative z-10 flex justify-between items-start w-full">
                <span className="material-symbols-outlined text-[32px] text-surface-variant group-hover:text-lime-vibe transition-colors">group_work</span>
                <span className="font-label-mono text-label-mono text-text-muted">REQ. APPROVAL</span>
              </div>
              <div className="relative z-10 space-y-2">
                <div className="font-label-caps text-label-caps text-text-muted uppercase tracking-[0.2em]">SYNDICATES</div>
                <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight">Clubs</h3>
              </div>
            </div>

            {/* Membership CTA Block */}
            <div className="col-span-1 md:col-span-8 bg-lime-vibe text-primary-container rounded-lg p-8 flex flex-col md:flex-row items-start md:items-center justify-between group hover:bg-white transition-colors duration-500">
              <div className="space-y-2 max-w-lg">
                <h3 className="font-headline-md text-headline-md uppercase tracking-tight">Access the Network</h3>
                <p className="font-body-md text-body-md opacity-80">Join the waiting list for early access to premium venues and events.</p>
              </div>
              <button className="mt-6 md:mt-0 px-6 py-3 border border-primary-container font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary-container hover:text-lime-vibe transition-colors rounded-DEFAULT flex items-center gap-2">
                APPLY <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Shared Component: Footer */}
      <footer className="bg-background w-full py-section-gap border-t border-surface-variant/10 flex flex-col items-center justify-center space-y-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="h-12 md:h-16 w-auto mb-4 flex justify-center">
          {/* Logo */}
          <img src="data:image/png;base64,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" className="h-full object-contain" alt="Logo" />
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-label-mono text-label-mono uppercase tracking-widest">
          <a className="text-text-muted hover:text-lime-vibe transition-colors opacity-80 hover:opacity-100" href="#">PRIVACY</a>
          <a className="text-text-muted hover:text-lime-vibe transition-colors opacity-80 hover:opacity-100" href="#">TERMS</a>
          <a className="text-text-muted hover:text-lime-vibe transition-colors opacity-80 hover:opacity-100" href="#">CAREERS</a>
          <a className="text-text-muted hover:text-lime-vibe transition-colors opacity-80 hover:opacity-100" href="#">PRESS</a>
        </div>
        <div className="font-label-mono text-label-mono text-lime-vibe uppercase tracking-widest mt-8 text-center opacity-80">
          © 2024 LOCALITE ECOSYSTEM. PRECISION IN PERFORMANCE.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
