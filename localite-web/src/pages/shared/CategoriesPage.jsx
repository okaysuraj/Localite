import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-8');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex bg-surface min-h-[calc(100vh-80px)]">
      {/* SideNavBar (Specific to Categories) */}
      <aside className="hidden md:flex flex-col py-stack-lg w-72 bg-surface-container-lowest border-r border-outline-variant/30 shadow-[4px_0_24px_rgba(10,25,47,0.05)] sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto">
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-[18px] text-primary">Royal Sports</h2>
              <p className="text-[10px] font-label-caps text-secondary uppercase tracking-widest">Elite Division</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/categories" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-low transition-all group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">military_tech</span>
            Royal Sports
          </Link>
          <Link to="#" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-low transition-all group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">history</span>
            Match History
          </Link>
          <Link to="/network" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-low transition-all group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">group</span>
            Member Directory
          </Link>
          <Link to="#" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-low transition-all group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">calendar_today</span>
            Court Booking
          </Link>
          <Link to="#" className="flex items-center gap-4 px-4 py-3 font-label-caps text-label-caps transition-all group border-r-4 border-secondary bg-secondary-container/20">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>castle</span>
            <span className="text-primary">Club House</span>
          </Link>
        </nav>
        
        <div className="px-8 mt-10 mb-8">
          <button className="w-full py-4 border border-secondary text-secondary font-label-caps text-label-caps rounded-xl hover:bg-secondary hover:text-on-secondary transition-colors">
            Join Tournament
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-12 pb-24 px-container-margin overflow-x-hidden">
        {/* Hero Header */}
        <section className="mb-stack-lg animate-fade-in">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-stack-md gap-6">
            <div className="max-w-2xl">
              <span className="font-label-caps text-label-caps text-secondary mb-4 block tracking-widest">THE SELECTION</span>
              <h2 className="font-display-lg text-[48px] leading-none mb-6 text-primary">Athletic Disciplines</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                A curated collection of distinguished sports, where tradition meets modern competition. Each discipline is a pathway to mastery and meaningful connection.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                <span className="material-symbols-outlined">west</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                <span className="material-symbols-outlined">east</span>
              </button>
            </div>
          </div>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-6 py-6 border-y border-outline-variant/20">
            <span className="font-label-caps text-[11px] text-outline">FILTER BY TYPE</span>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-caps text-[11px]">ALL DISCIPLINES</button>
              <button className="px-6 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-[11px] hover:border-secondary transition-colors">RACQUET</button>
              <button className="px-6 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-[11px] hover:border-secondary transition-colors">EQUESTRIAN</button>
              <button className="px-6 py-2 rounded-full border border-outline-variant/30 text-on-surface-variant font-label-caps text-[11px] hover:border-secondary transition-colors">CLUBHOUSE</button>
            </div>
          </div>
        </section>

        {/* Disciplines Bento Grid */}
        <section className="grid grid-cols-12 gap-gutter">
          {/* Card: Tennis (Large) */}
          <div className="col-span-12 lg:col-span-8 group cursor-pointer">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(10,25,47,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10"></div>
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Tennis" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUg8QrDPQJk75uhkvDQh_5r_1od6bLcWWDl2xGwc-NovzRMlETtljT3uiGuZaqFCWM3HIK4vQdjeY6IHdcGbbr1PhlVlk5EHIXS-hc4pRqlLAh2s0fQiHa7BFOgeTV--Z8FwytAMmSQVlyQFunstpp57vXpRXQKaN8JlKDh7BTtglO7zEuXBIOZQEDA-cBKNQP1BzFkw-NHQhnpi3lkiyR1SOiQHR4jKNjvNQVJNSgfoepPvHly6RHNw"
              />
              <div className="absolute bottom-0 left-0 p-12 z-20 w-full flex justify-between items-end">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-[0.2em]">TRADITION</span>
                  <h3 className="font-display-lg text-white text-[56px] mb-4">Tennis</h3>
                  <div className="flex gap-8">
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-white/60 mb-1">ACTIVE MATCHES</span>
                      <span className="font-headline-sm text-white">24</span>
                    </div>
                    <div class="flex flex-col">
                      <span className="font-label-caps text-[10px] text-white/60 mb-1">PREMIUM VENUES</span>
                      <span className="font-headline-sm text-white">12</span>
                    </div>
                  </div>
                </div>
                <button className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <span className="material-symbols-outlined text-3xl">arrow_outward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card: Polo (Small) */}
          <div className="col-span-12 lg:col-span-4 group cursor-pointer">
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(10,25,47,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10"></div>
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Polo" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6-QYCloEn4YPVifuHqvUSVPSOnrE8JgjvRMp11MZIqsLHkaaUQ4-0qm6yGlNjO8avzbXaogcMHrNk6h0-8YMNWx2_18FDXa-ptZKjlLpQzGR4WirbnxNKqsWKDMimzQkstS-LV_fLFYrCq47TUx2RD2m98U4J_DkGkWYx6BKedTBNl-OSFMrSVN8SGL44pT11TqhZ0D0HKD5zrNcvq336VBoW-q6Pb7yS5S6sxDu001sXTGp5_q_9oQ"
              />
              <div className="absolute bottom-0 left-0 p-10 z-20">
                <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-[0.2em]">MAJESTY</span>
                <h3 className="font-display-lg text-white text-[42px] mb-6">Polo</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="font-label-caps text-[10px] text-white/60">ACTIVE LOBBIES</span>
                    <span className="font-headline-sm text-white text-[18px]">08</span>
                  </div>
                  <button className="text-white font-label-caps text-[12px] flex items-center gap-2 hover:text-secondary transition-colors">
                    DISCOVER THE SPORT <span className="material-symbols-outlined text-sm">east</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Golf (Medium) */}
          <div className="col-span-12 lg:col-span-6 group cursor-pointer">
            <div className="relative h-[450px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(10,25,47,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10"></div>
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Golf" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgQspEnJ36dCN3YJVDXpOM3-aqisOi65bF5flfSdAQuQA3Dx5BkbD8Y4dK-icVIPnigBpJ_OAOjOlAODJwM0-1UmepuVGCvlS2Lc75NahAVUv-KwRmKBgIVpihw2YTdIdPYQzeo6xz9zD2M4UMLn5WP-S3RIyvrRewjrh0hzDMPpjeDwzD2PWT5Mr6mgvLHKurZ7_OQaQztCCr6mKQnPtuQujxB3poiky9iW1Bwbxz4ohMT4Z0RCPIog"
              />
              <div className="absolute bottom-0 left-0 p-10 z-20 w-full flex justify-between items-end">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-[0.2em]">PRECISION</span>
                  <h3 className="font-display-lg text-white text-[38px] mb-2">Golf</h3>
                  <p className="text-white/70 font-body-md text-sm max-w-xs">Master the greens across 15 exclusive local estates.</p>
                </div>
                <div className="text-white text-right">
                  <span className="block font-headline-sm">11</span>
                  <span className="font-label-caps text-[9px] text-white/50">OPEN TEE TIMES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Cricket (Medium) */}
          <div className="col-span-12 lg:col-span-6 group cursor-pointer">
            <div className="relative h-[450px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(10,25,47,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10"></div>
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Cricket" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzUC_MM3iIfr1bRDeWexWi9u1Wxvj9sPgOUK8kMnoLnVD7_7_1dYNbr4VpcAd-m8eTDBDy7PXE97pvP_fVMTF51tZXhY2aC0Lumn8_7pJAUlx6BltTBlzLrUmgvhPsYKbJcsuauZB2MU3_EWyxus1Q6QUKfsL7yR2l9bgpyERBnfkVfnGAv0f0t9TG4HrK8ixWKQvVvUeIMN1puiVP46oXfYsrgR6iZ0hilhIIhX4ImGKPb22uO9StUQ"
              />
              <div className="absolute bottom-0 left-0 p-10 z-20 w-full flex justify-between items-end">
                <div>
                  <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-[0.2em]">HERITAGE</span>
                  <h3 className="font-display-lg text-white text-[38px] mb-2">Cricket</h3>
                  <p className="text-white/70 font-body-md text-sm max-w-xs">Join the weekend leagues at the central division oval.</p>
                </div>
                <div className="text-white text-right">
                  <span className="block font-headline-sm">05</span>
                  <span className="font-label-caps text-[9px] text-white/50">MATCHES TODAY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Storytelling / Quote Section */}
        <section className="mt-stack-lg py-24 border-t border-outline-variant/20 flex flex-col items-center text-center animate-on-scroll">
          <div className="w-12 h-1 px-1 bg-secondary mb-12"></div>
          <blockquote className="max-w-4xl">
            <p className="font-display-lg text-headline-md md:text-display-lg text-primary mb-10 leading-tight italic">
              "Greatness is not merely in the victory, but in the caliber of those you choose to stand beside on the field of play."
            </p>
            <cite className="not-italic flex flex-col items-center">
              <span className="font-label-caps text-label-caps text-primary tracking-widest mb-1 uppercase">Reginald Vance</span>
              <span className="text-on-surface-variant text-sm font-body-md">Founder, Localite Society</span>
            </cite>
          </blockquote>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl">
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-headline-md text-secondary mb-2">15k+</span>
              <span className="font-label-caps text-[10px] text-outline">ELITE MEMBERS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-headline-md text-secondary mb-2">120</span>
              <span className="font-label-caps text-[10px] text-outline">GLOBAL VENUES</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-headline-md text-secondary mb-2">50</span>
              <span className="font-label-caps text-[10px] text-outline">TOURNAMENTS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-headline-md text-secondary mb-2">04</span>
              <span className="font-label-caps text-[10px] text-outline">REGAL DIVISIONS</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CategoriesPage;
