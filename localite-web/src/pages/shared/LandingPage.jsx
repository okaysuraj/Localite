import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Canvas } from '@react-three/fiber';
import { SceneContent } from '../../components/Scene';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Trophy, 
  Users, 
  Compass, 
  ShieldCheck,
  CheckCircle
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
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
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });

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

    gsap.utils.toArray('.anim-section').forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 55%',
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
    <div ref={containerRef} className="bg-[var(--bg)] text-[var(--fg)] font-sans relative selection:bg-[var(--accent)] selection:text-white">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0 w-full h-full opacity-20 pointer-events-none">
        <Canvas>
          {timeline && <SceneContent timeline={timeline} />}
        </Canvas>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-28">
        
        <section className="anim-section min-h-[75vh] flex flex-col justify-center items-start max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold uppercase tracking-wider">
            <span>Modern Community Infrastructure</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[var(--fg)] leading-[1.05]">
            Real World Gathering. <br />
            <span className="text-[var(--accent)] font-normal italic">Curated Connections.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--fg-muted)] max-w-2xl leading-relaxed">
            Localite connects athletes, creators, and professionals through vetted sports matches, private salons, and verified third spaces.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-2"
            >
              <span>Request Membership</span>
              <ArrowRight size={15} />
            </button>
            <button 
              onClick={() => navigate('/events')}
              className="px-8 py-3.5 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] rounded-card text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Explore Gatherings
            </button>
          </div>
        </section>

        {/* The Protocol Section */}
        <section className="anim-section grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[var(--border)] pt-16">
          <div className="md:col-span-4 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              01 // The Architecture
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)]">
              Beyond the screen, into the physical third place.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-sm text-[var(--fg-muted)] leading-relaxed">
            <p>
              Digital social profiles are meaningless without authentic presence. Localite merges seamless digital matchmaking with verified, real-world events. We provide the protocol and safety infrastructure for premium sports clubs, cultural salons, and uncompromised athletic performance.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-[var(--fg)]">
              <span className="px-3 py-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-full">Racquet Fixtures</span>
              <span className="px-3 py-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-full">Literary Salons</span>
              <span className="px-3 py-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-full">Biometric Vetting</span>
            </div>
          </div>
        </section>

        {/* Directory Bento Section */}
        <section className="anim-section space-y-8 border-t border-[var(--border)] pt-16">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)] block mb-1">
                02 // Collections
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--fg)]">
                Curated Categories
              </h2>
            </div>
            <button 
              onClick={() => navigate('/events')}
              className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1: Sports */}
            <div 
              onClick={() => navigate('/matches')}
              className="md:col-span-7 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8 flex flex-col justify-between hover:border-[var(--accent)] transition-all cursor-pointer space-y-12"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Competitive Sports
                </span>
                <h3 className="text-2xl font-semibold text-[var(--fg)]">
                  Tennis, Squash & Turf Leagues
                </h3>
                <p className="text-xs text-[var(--fg-muted)] max-w-md leading-relaxed">
                  High-caliber leagues, private club access, and verified opponent matching.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">
                <span>Browse Athletic Matches</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Card 2: Culture */}
            <div 
              onClick={() => navigate('/events')}
              className="md:col-span-5 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] p-8 flex flex-col justify-between hover:border-[var(--accent)] transition-all cursor-pointer space-y-12"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Cultural Salons
                </span>
                <h3 className="text-2xl font-semibold text-[var(--fg)]">
                  Architectural & Literary Evenings
                </h3>
                <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                  Curated after-hours gatherings in historic venues and member courtyards.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent)]">
                <span>View Salons</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="anim-section bg-[var(--fg)] text-white rounded-card p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">Access the Localite Circle</h3>
            <p className="text-xs md:text-sm text-white/75 leading-relaxed">
              Membership applications are reviewed weekly to maintain high integrity and safety across all participating venues.
            </p>
          </div>
          <button 
            onClick={() => navigate('/signup')}
            className="px-8 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 shrink-0 flex items-center gap-2"
          >
            <span>Apply for Entry</span>
            <ArrowRight size={14} />
          </button>
        </section>

      </main>
    </div>
  );
}
