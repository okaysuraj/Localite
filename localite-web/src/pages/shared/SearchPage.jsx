import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('EVENTS');

  const tabs = ['EVENTS', 'USERS', 'ACTIVITIES', 'VIRTUAL'];
  const recentSearches = ['Digital Art Exhibition', 'Tennis Tournament', 'Jazz Nights'];

  return (
    <div className="max-w-7xl mx-auto px-container-margin py-stack-lg">
      {/* Search Section */}
      <section className="max-w-3xl mx-auto text-center mb-stack-lg">
        <h1 className="font-display-lg text-display-lg mb-8 text-primary">What are you looking for?</h1>
        <div className="relative group">
          <input 
            className="w-full h-16 pl-14 pr-6 rounded-xl bg-surface-container-lowest shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border border-outline-variant/20 focus:ring-1.5 focus:ring-secondary text-body-lg placeholder:text-outline transition-all" 
            placeholder="Search events, people, or local hubs..." 
            type="text"
          />
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant text-2xl group-focus-within:text-secondary transition-colors">
            search
          </span>
        </div>
      </section>

      {/* Categorized Tabs */}
      <section className="flex justify-center border-b border-surface-container-high mb-stack-md">
        <div className="flex gap-12">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-label-caps transition-all relative ${activeTab === tab ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-secondary" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Searches */}
      <section className="mb-stack-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-label-caps text-on-surface-variant tracking-wider">RECENT SEARCHES</h3>
          <button className="text-xs font-label-caps text-outline hover:text-error transition-colors">CLEAR ALL</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {recentSearches.map(search => (
            <div key={search} className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-full shadow-sm group cursor-pointer hover:border-secondary transition-all">
              <span className="text-body-md text-on-surface">{search}</span>
              <span className="material-symbols-outlined text-sm text-outline group-hover:text-error transition-colors">close</span>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Trends: Bento Layout */}
      <section>
        <div className="flex items-center justify-between mb-stack-md">
          <h2 className="font-headline-md text-headline-md text-primary">Discover Trends</h2>
          <Link to="/categories" className="font-label-caps text-secondary flex items-center gap-2 group">
            VIEW ALL <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Feature Card 1 */}
          <div className="col-span-12 md:col-span-8 group cursor-pointer">
            <div className="relative h-[500px] rounded-xl overflow-hidden bg-white shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="The Golden Era" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfi61YrjgESoZ3eGbewf8Oxfua19eNiTM-89ZNWzyok-n2YH5ugCy12gpng3tb-lp8TM9fhqMRkl2cxy6ZNd28YcMBJTA6f9UmvgRn_zBEQryFStpuubly4_IMYNI7wthNvyVAV2CxHY_GZGL73H2VL2MDT9rK-nw9R7VEz5b8RCFfGtsyNp19DX7FYdftAICunTGLuJB5G7p72pe07-IB2I4GC8Syd5AWzS7zOYsi0R_zHhW9QVIMfw"
              />
              <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                <span className="bg-secondary text-on-secondary px-3 py-1 font-label-caps text-[10px] tracking-widest rounded-sm mb-4 inline-block">
                  PREMIUM EXHIBITION
                </span>
                <h3 className="font-headline-md text-headline-md text-white mb-2">The Golden Era: Digital Rebirth</h3>
                <p className="text-white/80 font-body-md max-w-lg mb-6">
                  Experience the fusion of classic renaissance aesthetics with cutting-edge generative technology.
                </p>
                <div className="flex items-center gap-6 text-white/90">
                  <span className="flex items-center gap-2 font-label-caps text-xs">
                    <span className="material-symbols-outlined text-sm">calendar_today</span> OCT 24, 2024
                  </span>
                  <span className="flex items-center gap-2 font-label-caps text-xs">
                    <span className="material-symbols-outlined text-sm">location_on</span> GRAND ATRIUM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="col-span-12 md:col-span-4 group cursor-pointer">
            <div className="relative h-[500px] rounded-xl overflow-hidden bg-white shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)]">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Skyline Social Hub" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm3lDOhGFFMX9R8UTaa8-RmR9CC3aLcNTT4Q-G-Bm-FHxAWhTn5wtJBIBU-u21q12DuXgrND0fBXdabXvl-4h-ePDMSnX8f9tOlprgubsB9Z-yGDyqMksJJEociJu9wanIzqHe5hHV_jegOXGYowFn7Zh222Ga0jZy2WgEsedc9uRK8dqzBTAeRKAF0AAex38uj1Et44HaMsXzRs-st8lhBBks7nseweXbrnWvw7mruDBUKuNXok5HSw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                <h3 className="font-headline-sm text-headline-sm mb-2">Skyline Social Hub</h3>
                <p className="font-body-md text-sm mb-4">The ultimate destination for the city's creative elite.</p>
                <button className="w-full py-3 border border-white font-label-caps text-xs hover:bg-white hover:text-black transition-colors rounded">
                  EXPLORE HUB
                </button>
              </div>
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 font-label-caps text-[10px] tracking-widest rounded-sm">
                  SOCIAL
                </span>
              </div>
            </div>
          </div>

          {/* Small Trends */}
          <div className="col-span-12 md:col-span-4 group cursor-pointer">
            <div className="bg-white p-8 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] h-full flex flex-col justify-between border-t-4 border-secondary transition-transform hover:-translate-y-1">
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">sports_tennis</span>
                <h3 className="font-headline-sm text-headline-sm mb-3">Founders' Invitational</h3>
                <p className="text-on-surface-variant font-body-md">A private doubles tournament held at the historic Belvedere Courts.</p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container"></div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-secondary-fixed text-[10px] font-bold z-10">
                    +12
                  </div>
                </div>
                <span className="font-label-caps text-secondary text-xs">JOIN WAITLIST</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 group cursor-pointer">
            <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)]">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt="Mixology Masterclass" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUeccCjWs9_yaRGqZfD4N31ATLn8ZyDurEU4HOFBA_AaYyE7pMweboIZZLwKkTJnQ9-LdEWynhz06PStkfO4t9DBVLU45Ufmhhn0dTqAfa5H0A_idHfGcR1-TbMneFICnIlumjoq_2gNASbHucIM7cziYjsc5H917qFkbH43oBBO7p25xYmOXnl-QAQxDGRAwTBlcKmaba1-AloDn6pOtHNE7su3ld2tWxdkbATqruFgx938kOaBb6qA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white font-headline-sm text-headline-sm">Mixology Masterclass</h3>
                <p className="text-white/80 font-label-caps text-xs mt-2">LIMITED TO 12 GUESTS</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 group cursor-pointer">
            <div className="bg-primary text-on-primary p-8 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] h-full flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1">
              <h3 className="font-display-lg text-[32px] text-secondary-fixed mb-4">Join the Inner Circle</h3>
              <p className="font-body-md opacity-80 mb-8">Access private events and curated community benefits.</p>
              <button className="bg-secondary-fixed text-on-secondary-fixed px-8 py-3 font-label-caps tracking-widest text-xs hover:bg-secondary-fixed-dim transition-colors rounded">
                BECOME A MEMBER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Atmospheric */}
      <section className="mt-stack-lg bg-surface-container-low rounded-xl p-stack-md flex flex-col md:flex-row items-center justify-between gap-gutter border border-surface-container-high shadow-sm">
        <div className="max-w-md">
          <h2 className="font-headline-sm text-headline-sm mb-2 text-primary">Weekly Curation</h2>
          <p className="text-on-surface-variant font-body-md">Get a hand-picked selection of the most prestigious local gatherings delivered to your inbox.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input 
            className="bg-white border border-outline-variant/50 rounded-lg px-6 py-3 w-full md:w-64 focus:ring-1 focus:ring-secondary outline-none" 
            placeholder="Email address" 
            type="email"
          />
          <button className="bg-primary text-on-primary px-8 py-3 font-label-caps tracking-widest text-xs whitespace-nowrap rounded hover:opacity-90 transition-opacity">
            SUBSCRIBE
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
