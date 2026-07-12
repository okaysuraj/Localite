import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmptyStatePage = () => {
  useEffect(() => {
    // Smooth appear for the side nav items
    const navItems = document.querySelectorAll('aside nav div');
    navItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-10px)';
      setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 100 * index);
    });
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-surface">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] w-64 sticky top-[80px] bg-surface-container-lowest py-stack-lg border-r border-outline-variant/10 shadow-[24px_0_48px_rgba(10,25,47,0.03)] overflow-y-auto">
        <div className="px-container-margin mb-stack-lg">
          <div className="flex items-center gap-stack-sm mb-2">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            <span className="font-headline-sm text-headline-sm text-primary">The Guild</span>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant">Elite Membership</p>
        </div>
        <nav className="flex-grow">
          <div className="group flex items-center gap-stack-sm px-container-margin py-4 transition-all duration-300 text-primary font-bold border-r-2 border-secondary bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event_seat</span>
            <span className="font-label-caps text-label-caps">Gatherings</span>
          </div>
          <div className="group flex items-center gap-stack-sm px-container-margin py-4 transition-all duration-300 text-on-surface-variant hover:bg-surface-container cursor-pointer">
            <span className="material-symbols-outlined">sports_tennis</span>
            <span className="font-label-caps text-label-caps">Sports</span>
          </div>
          <div className="group flex items-center gap-stack-sm px-container-margin py-4 transition-all duration-300 text-on-surface-variant hover:bg-surface-container cursor-pointer">
            <span className="material-symbols-outlined">groups</span>
            <span className="font-label-caps text-label-caps">Community</span>
          </div>
          <div className="group flex items-center gap-stack-sm px-container-margin py-4 transition-all duration-300 text-on-surface-variant hover:bg-surface-container cursor-pointer">
            <span className="material-symbols-outlined">support_agent</span>
            <span className="font-label-caps text-label-caps">Concierge</span>
          </div>
        </nav>
        <div className="mt-auto px-container-margin flex flex-col gap-unit">
          <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-caps text-label-caps hover:bg-secondary transition-all shadow-[0_16px_32px_rgba(10,25,47,0.05)] active:scale-[0.98]">
            Request Invitation
          </button>
          <div className="flex flex-col mt-stack-md pt-4 border-t border-outline-variant/10">
            <a className="flex items-center gap-stack-sm py-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="font-label-caps text-label-caps">Settings</span>
            </a>
            <a className="flex items-center gap-stack-sm py-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span className="font-label-caps text-label-caps">Support</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Empty State Content */}
      <section className="flex-grow flex items-center justify-center p-stack-lg animate-[fadeInScale_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0_24px_48px_rgba(10,25,47,0.08)] relative overflow-hidden">
          
          {/* Background Decorative Element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl"></div>
          
          {/* Artistic Illustration Component */}
          <div className="relative group">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-[0_16px_32px_rgba(10,25,47,0.05)] group-hover:shadow-[0_24px_48px_rgba(10,25,47,0.08)] transition-all duration-500">
              <img 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                alt="Empty Ballroom" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBADEebTPrCCJLVGYUUqEORZVrhUKlgmN4AdZaNGnd5QlyEflPf1DmuVNYP8_El2YjkCec9WJmnPqS4qetkDrt8mEd8ReRV399PqBipusQm5jEFfuMjPI-o2BuNiVrMjml0cLXrFEWD8wWEpfYwvybhynVgk3j0EoJ1E9h5nNcGtslZ4ynIIbD3HSHQPjU4YSZs9Z93yGFf33UNQCaPLIpw7lH3b7CCC1t1kV2teIteA7wrQY-wdH5FVA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
            
            {/* Overlapping Detail Card */}
            <div className="absolute -bottom-6 -right-6 bg-white/70 backdrop-blur-[12px] border border-white/30 p-6 rounded-xl hidden md:block max-w-[240px]">
              <span className="material-symbols-outlined text-secondary text-3xl mb-2">auto_awesome</span>
              <p className="font-headline-sm text-[18px] leading-tight text-primary mb-1">A Curated Pause</p>
              <p className="text-on-surface-variant text-[14px]">The finest events are currently being architected for the upcoming season.</p>
            </div>
          </div>

          {/* Textual Content & CTAs */}
          <div className="flex flex-col justify-center gap-stack-md text-center md:text-left z-10">
            <div className="space-y-4">
              <span className="font-label-caps text-label-caps text-secondary tracking-[0.2em]">MEMBERSHIP STATUS: ACTIVE</span>
              <h1 className="font-headline-md text-display-lg text-primary leading-tight">The Calendar is Currently Unveiled</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                A moment of quiet before the next grand affair. Use this interval to discover new community hubs or propose a gathering of your own design.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-gutter mt-stack-sm">
              <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-caps text-label-caps tracking-widest hover:bg-secondary hover:shadow-[0_24px_48px_rgba(10,25,47,0.08)] transition-all active:scale-95 flex items-center justify-center gap-2 group">
                <span>Organize</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">add</span>
              </button>
              <Link to="/map" className="border border-secondary text-secondary px-8 py-4 rounded-xl font-label-caps text-label-caps tracking-widest hover:bg-secondary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2">
                <span>Explore Hubs</span>
                <span className="material-symbols-outlined">explore</span>
              </Link>
            </div>

            {/* Subtle Footer Insight */}
            <div className="mt-stack-md flex items-center gap-stack-sm py-4 border-t border-outline-variant/20">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-high overflow-hidden">
                  <img className="w-full h-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvv_ecxdKlINEkdXMe_D3GdjUb30SVQXHv_SzKIG-RiG37iNGcJbOhVp-IrFfv_OfeNwQPmV5EHYZEwhsxzLPYhSObBk_0ecJVd7fVTD0VvopIVdaWGcw4tRaMU2AjdnBC69wsm25sQEJoT5CSuGFaVWgdEOQmRK4qpum6Z5FnYVgsGKyM6Y-a8AYSjBXlJhY9Dxo9M06NsF6k_4VO41KcfJc7IKgNaetIy6a0VUx5ZziyFjFgAimHYA"/>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-high overflow-hidden">
                  <img className="w-full h-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp40wMplqyJ097LwctPGmj_KjtVAxsWvvKL8BDBqjJsEcZy7I5urHAiip8Q2F2WqiK3jDvS8A9uG2vDWnnrmngi1IsqQUUdAjoHkFV478LCVK8JjgpI7j0AVL_syY5imaeMDyTijgaZ8D-y-ta7NJuQ9d3z7XaVHOudjbSMHWhZt5ZJ-qaTlgj7t5NxXClJ1BvRn5B0SPbMrMtC2kOl3iw2-jnaWDeet3WqvTq9-bLDNHyVZGSxNmF9w"/>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-high overflow-hidden">
                  <img className="w-full h-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCOpgBHXLZt5f1LGK6zYzwjRSjv0KcAwnZtDe5xCnRdS0meVxbc8YMPLEsE8MQU3IsvJVxDMHsIaDqtdTbOT2c1WAItSUKIHjvLzJ79wri8eostvi2dAJZYcYTCCwh03Cm1RO84StdSO03fIn9zFR6hRVvPjYHj_vQ8rQJ4dpBpnKLA8WOY9NJ2Qfict_3GDcFerpBLIe6wLd6JWgGFjc-BntVXtgDAG3qkJMnzyEO3xoyy0wwrPyXwA"/>
                </div>
              </div>
              <p className="text-label-caps text-on-surface-variant">248 members active in your vicinity</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmptyStatePage;
