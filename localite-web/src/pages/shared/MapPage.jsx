import React, { useState } from 'react';

const MapPage = () => {
  const [activeFilter, setActiveFilter] = useState('Near Me');
  const [selectedMarker, setSelectedMarker] = useState(null);

  const filters = ['Near Me', 'Social', 'Sports', 'Cafes'];

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      {/* Interactive Map Layer */}
      <div className="absolute inset-0 z-0">
        {/* Simulated Map using a placeholder image with high-end prompt */}
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAStikm5ZuFggF0f5VC-FJ7v0-Sqlb9WXuCP0sPOw6BUPZuedf43Z5ao1s9dniamLdDBsdtRfoiPa4Yu1WB0Bqd8gtBL4QBQ-Rjsl-KHngjxNBmi4brZXYd1BFJ6ENecUtHTJiciqkUHTix5Yb01MJwWB5wVEinZW73aGOOXwJRhloJ4zgxZ5nNAEWRZJVw0vH5dqyuL66cLwWKMOYrPvImGgfp_aPRba8gK07fPveEGmkHmIMMKgl3mg')` }}
        />
        
        {/* Floating Map UI Overlays */}
        {/* Markers */}
        <div 
          className="absolute top-[35%] left-[45%] group cursor-pointer"
          onClick={() => setSelectedMarker('CAFE NOIR')}
        >
          <div className="relative flex flex-col items-center">
            <div className={`p-3 rounded-full shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border-2 border-surface-container-lowest transform transition-transform group-hover:scale-110 ${selectedMarker === 'CAFE NOIR' ? 'bg-primary text-on-primary scale-125' : 'bg-surface-container-lowest text-primary'}`}>
              <span className="material-symbols-outlined text-[20px]">restaurant</span>
            </div>
            <div className="mt-2 bg-surface-container-lowest px-3 py-1 rounded-full shadow-md">
              <span className="font-label-caps text-[10px] text-primary whitespace-nowrap">CAFÉ NOIR</span>
            </div>
          </div>
        </div>

        <div 
          className="absolute top-[20%] left-[25%] group cursor-pointer"
          onClick={() => setSelectedMarker('CLUB COURT')}
        >
          <div className="relative flex flex-col items-center">
            <div className={`p-3 rounded-full shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border-2 border-surface-container-lowest transform transition-transform group-hover:scale-110 ${selectedMarker === 'CLUB COURT' ? 'bg-secondary text-on-secondary scale-125' : 'bg-secondary text-on-secondary'}`}>
              <span className="material-symbols-outlined text-[20px]">sports_tennis</span>
            </div>
            <div className="mt-2 bg-surface-container-lowest px-3 py-1 rounded-full shadow-md">
              <span className="font-label-caps text-[10px] text-primary whitespace-nowrap">CLUB COURT</span>
            </div>
          </div>
        </div>

        <div 
          className="absolute top-[60%] left-[55%] group cursor-pointer"
          onClick={() => setSelectedMarker('SOCIAL GARDEN')}
        >
          <div className="relative flex flex-col items-center">
            <div className={`p-3 rounded-full shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border-2 border-surface-container-lowest transform transition-transform group-hover:scale-110 ${selectedMarker === 'SOCIAL GARDEN' ? 'bg-primary-container text-on-primary-fixed scale-125' : 'bg-primary-container text-on-primary-fixed'}`}>
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <div className="mt-2 bg-surface-container-lowest px-3 py-1 rounded-full shadow-md">
              <span className="font-label-caps text-[10px] text-primary whitespace-nowrap">SOCIAL GARDEN</span>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-gutter bottom-gutter flex flex-col gap-2 z-20">
          <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] overflow-hidden">
            <button className="p-4 hover:bg-surface-container-low transition-colors text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="h-[1px] bg-outline-variant/30 w-full"></div>
            <button className="p-4 hover:bg-surface-container-low transition-colors text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <button className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] text-primary hover:bg-surface-container-low transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Filter Toggle */}
        <div className="absolute left-1/2 -translate-x-1/2 top-stack-md flex gap-4 z-20">
          <div className="flex items-center bg-surface-container-lowest rounded-full shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] px-2 py-2">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-label-caps text-label-caps transition-colors ${activeFilter === filter ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {filter === 'Near Me' && (
                  <span className="material-symbols-outlined text-[18px]">near_me</span>
                )}
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Sidebar Panel */}
      <aside className="absolute left-gutter top-stack-md bottom-gutter w-96 z-10 pointer-events-none">
        <div className="w-full h-full bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col pointer-events-auto border border-white/50 overflow-hidden">
          
          {/* Panel Header */}
          <div className="p-stack-md border-b border-outline-variant/20">
            <div className="flex justify-between items-end mb-1">
              <h2 className="font-headline-sm text-headline-sm text-primary">Active Now</h2>
              <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">7 Happening Today</span>
            </div>
            <p className="text-on-surface-variant font-body-md text-body-md">Discover curated gatherings in your area.</p>
          </div>

          {/* Events List */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-gutter space-y-gutter">
            
            {/* Featured Event Card */}
            <div className="group bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] transition-all duration-300 border border-outline-variant/10 cursor-pointer">
              <div className="relative h-40">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Weekend Art Soiree" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhFXJxR7wGRuaaDE9Bn_o7jvBLNki9-NvI1Yw9sh8TaqVb4W7icwpHxKfI7_VU3GsQ3KoEg77IWHZRY09z3iO9ylA8pqIGNL-gUZAQ17rUx_uQVbrxx6KkbwIh0EukLgTrBn0-KhicOjtMaM2s-n3j5IWNy2nayU2ZMUwK9gG8dTPly7ujOdCFo57qSsiOos0HzYi4G2fnvLzON-P8xO-mvM8t6p2Tn-aPk5f9bjnPvZESf83xBq_BKQ"
                />
                <div className="absolute top-3 left-3 bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-caps text-[10px]">
                  FEATURED
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-sm text-[20px] text-primary leading-tight">Weekend Art Soiree</h3>
                  <span className="text-secondary font-bold text-label-caps">LIVE</span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  <span className="text-label-caps text-[11px] uppercase tracking-wider">The Gilded Gallery, SoHo</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-surface overflow-hidden">
                      <img className="w-full h-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBASPKMEkEiSCnghXd4OfjEja6O--0iezzqMZAZBF-pn8tXYirzIIqLCF1pJm7pwYCGW1UPt77bA8eVk8VqIWOpbylfPIcLBEI4npm6_gWcn6U7BqkX77hT06KnpfdCIjejbF73r4iHJJycO_xfWZU-Z-i4g19Q8_xM8iGcgwINmndz6ycE9aJrNXxvbXJIYJ0vsT20p8-SE6G0TnwMRyR_BqQT0rGuUYtCmWZjOlh8c6kcr4bNT3cbNw"/>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-surface overflow-hidden">
                      <img className="w-full h-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnDzW-gIfJo5D375sVkzdIINqgGRZclqh2mz70UaLf5mjaVc8PvkeMkP6gjWfwXA8bulJ7ja3Av0qry8gupWPGdsk4wIfuIS0QX1vE9nLejlaDA6oo2ER8A5NSSF6_7Txevhd3nl4sNeVWHFmiT_v_AlrBagpVbD2PmAXt9WCowPNT0dp0WGJasmB_gOc3W49uFPqv_eSs_lvtREpogNARxMi1xhak_OvLoFc8ApO4twwiRMNe40IcEw"/>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface flex items-center justify-center z-10">
                      <span className="text-[10px] font-bold">+12</span>
                    </div>
                  </div>
                  <button className="bg-primary text-on-primary px-4 py-1.5 rounded-lg font-label-caps text-[11px] hover:opacity-90 transition-opacity">
                    JOIN NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Event Card */}
            <div className="group bg-surface rounded-xl p-4 shadow-sm hover:shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] transition-all duration-300 border border-outline-variant/10 cursor-pointer">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" alt="Tennis" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk6AgLQsHBx4MR_n7W45Bq-q2_zG21pu1WBF5vDsdDuDPgdX9KIhO0N7GEq16bJdXz44wHfwHO968ISdgna_4KT0falqPx6uYZAu0MROdNiof_gP8BVce_pzowqT5JiRWb0LFiyPs0edRgM7Jn6Nr1-DjNKY6OKPI8QInh9U_WUws33VLiUR7jtaTLxGVl69CrypXldKieVJzvu5MeazUTyWtKHIOCWIol0EjkQG0grcc3Vhu0tZHWiQ"/>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-headline-sm text-[18px] text-primary mb-1">Morning Tennis Mix</h3>
                  <p className="text-on-surface-variant text-label-caps text-[10px] uppercase mb-2">4 Guests Confirmed</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-secondary">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span className="text-label-caps text-[10px]">10:30 AM</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      <span className="text-label-caps text-[10px]">ADVANCED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tertiary Event Card */}
            <div className="group bg-surface rounded-xl p-4 shadow-sm hover:shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] transition-all duration-300 border border-outline-variant/10 cursor-pointer">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" alt="Coffee" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsPmwK1uMb1N91rrMxAXlSvxA3JYVaIeaQls8CUcrGgi6ON_n_l4a-VMnPhxXKuW7iBMc8gbJBIPfT-EP9SqGWwLkauafIO053r9pInjtuKyd6g5K_V9a26_pbr3pOM9G8b1yWYGvPDn2yfEP6IfDaD7K9NoPeOitsX7GMXtJ2aOuMEbdxrgNF9FUpAwDRptuWrsgE4x42p8B_P7ny_LX9P62EzgFaZ4nR6UgkK4oiMGhkNln9Xu6Ucw"/>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-headline-sm text-[18px] text-primary mb-1">Founders Coffee</h3>
                  <p className="text-on-surface-variant text-label-caps text-[10px] uppercase mb-2">8 Guests Confirmed</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-secondary">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      <span className="text-label-caps text-[10px]">STARTED</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      <span className="text-label-caps text-[10px]">COUTURE BREW</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Panel Footer */}
          <div className="p-gutter bg-surface-container-low/50">
            <button className="w-full py-4 border border-secondary text-secondary rounded-xl font-label-caps text-label-caps hover:bg-secondary hover:text-on-secondary transition-all">
              VIEW ALL HAPPENINGS
            </button>
          </div>
        </div>
      </aside>

      {/* Floating Quick Stats */}
      <div className="absolute bottom-gutter left-1/2 -translate-x-1/2 z-20 flex gap-gutter">
        <div className="bg-surface-container-lowest/80 backdrop-blur px-6 py-4 rounded-2xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] border border-white/50 flex items-center gap-gutter">
          <div className="flex flex-col">
            <span className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-tighter">Your Network</span>
            <span className="text-headline-sm text-[20px] text-primary">12 Active</span>
          </div>
          <div className="w-[1px] h-10 bg-outline-variant/30"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-tighter">Nearby Spots</span>
            <span className="text-headline-sm text-[20px] text-primary">42 Places</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
