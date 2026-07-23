import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlockUserPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBlock = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md selection:bg-[#fed488] min-h-screen flex flex-col">
      
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center px-6 w-full sticky top-0 z-50 h-20 bg-[#fbf9f8] shadow-[0_4px_20px_-5px_rgba(10,25,47,0.08)]">
        <div className="flex items-center gap-12">
          <span className="font-display-lg text-4xl font-bold text-primary tracking-tighter cursor-pointer" onClick={() => navigate('/')}>Localite</span>
          <nav className="hidden md:flex gap-8">
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</a>
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/events')}>Events</a>
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Venues</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined cursor-pointer text-[#44474d] hover:text-primary transition-colors">notifications</span>
          <span className="material-symbols-outlined cursor-pointer text-[#44474d] hover:text-primary transition-colors">mail</span>
          <div className="w-10 h-10 rounded-full bg-[#eae8e7] overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjp987RMkCD6lqdlHSqx3pd1uEjmmFoeqnVzK4yxvslTrtReAde0DYI8S--lioEFvPamDmoXswZ4kG4Mj73FkrhtOqW_hb6ygDV9n4neAQS5QOk_Ema6DJju4t6LhNpj2LRGkV-DmSZ-4q1UXRWzbMkouwIFd4IKSxrZhRp8ShYavmC_ZazsfHl49Ez8u0kzVBcZM5krQny5EvsTxlAy66sTlyQ-z_WomIe_a_0ra93qqlln5jqC39Wg" alt="Profile" />
          </div>
        </div>
      </header>

      <div className="flex flex-grow relative overflow-hidden">
        
        {/* Side Navigation Shell */}
        <aside className="hidden lg:flex flex-col py-8 px-6 z-40 w-72 bg-[#f5f3f3] border-r border-[#c5c6cd] shadow-[16px_0_32px_-12px_rgba(10,25,47,0.05)]">
          <div className="mb-10">
            <h2 className="font-headline-sm text-2xl font-bold text-primary">Concierge Console</h2>
            <p className="font-label-caps text-[10px] font-bold text-[#775a19] tracking-widest mt-1 uppercase">MODERN NOBILITY</p>
          </div>
          <nav className="flex-grow space-y-2">
            <div className="flex items-center gap-4 text-[#44474d] p-3 hover:bg-[#e4e2e2]/50 transition-all cursor-pointer rounded-lg" onClick={() => navigate('/dashboard')}>
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Dashboard</span>
            </div>
            <div className="flex items-center gap-4 text-[#44474d] p-3 hover:bg-[#e4e2e2]/50 transition-all cursor-pointer rounded-lg" onClick={() => navigate('/events')}>
              <span className="material-symbols-outlined">event</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Events</span>
            </div>
            <div className="flex items-center gap-4 text-[#44474d] p-3 hover:bg-[#e4e2e2]/50 transition-all cursor-pointer rounded-lg">
              <span className="material-symbols-outlined">location_on</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Venues</span>
            </div>
            <div className="flex items-center gap-4 text-primary bg-[#fbf9f8] rounded-lg p-3 border-l-2 border-primary">
              <span className="material-symbols-outlined">security</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Safety Center</span>
            </div>
            <div className="flex items-center gap-4 text-[#44474d] p-3 hover:bg-[#e4e2e2]/50 transition-all cursor-pointer rounded-lg">
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Admin Tools</span>
            </div>
            <div className="flex items-center gap-4 text-[#44474d] p-3 hover:bg-[#e4e2e2]/50 transition-all cursor-pointer rounded-lg">
              <span className="material-symbols-outlined">history</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Audit Logs</span>
            </div>
          </nav>
          <div className="mt-auto space-y-2 pt-6 border-t border-[#c5c6cd]/30">
            <div className="flex items-center gap-4 text-[#44474d] p-3 hover:bg-[#e4e2e2]/50 transition-all cursor-pointer rounded-lg">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Settings</span>
            </div>
            <div className="flex items-center gap-4 text-[#44474d] p-3 hover:bg-[#e4e2e2]/50 transition-all cursor-pointer rounded-lg">
              <span className="material-symbols-outlined">help_outline</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Support</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-6 relative w-full lg:w-[calc(100%-18rem)]">
          {/* Background Atmospheric Element */}
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#fed488] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0d1c32] rounded-full blur-[100px] opacity-40"></div>
          </div>

          {/* Confirm Block Modal */}
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] overflow-hidden border border-[#c5c6cd]/20">
            
            {/* Modal Header */}
            <div className="px-10 pt-10 pb-6 text-center">
              <h1 className="font-headline-md text-3xl font-bold text-primary mb-2">Block Member?</h1>
              <p className="font-body-md text-[#44474d] max-w-md mx-auto">Blocking will restrict all communication and visibility between you and this member.</p>
            </div>

            {/* Profile Card Context */}
            <div className="mx-10 p-6 bg-[#fbf9f8] rounded-lg border border-[#c5c6cd]/30 flex items-center gap-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcwIbUi1IcquC8yBZlBQdHK-GnPLNzz70BFjHyUAMF08xVLVs6X2OA98RP0yT1KR-YHLdvUj0rWkIQFG7kgxSkcZiOAgKKRoHaZDa6rqpbV36IhVj5W53FPYraIES1x2bCx_l13_033nWSzHvhJ_QsvdxA5MCB9kRyiyMuPoahu3-zYW07eLBi4kaLQ9Rct9XIvVc24ESqgI79EgBXQwqREWMbDdEUKULCXla9KiEvipptPHgy9X1hIQ" alt="Member" />
              </div>
              <div className="flex-grow">
                <span className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-widest mb-1 block">Premium Member</span>
                <h2 className="font-headline-sm text-2xl font-bold text-primary">Julian Thorne</h2>
                <p className="font-body-md text-[#44474d] text-sm mt-1">Member since October 2023 • 12 Shared Events</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex gap-1 text-[#e9c176]">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <span className="font-label-caps text-[10px] font-bold text-[#75777e] tracking-widest mt-1">REPUTATION SCORE</span>
              </div>
            </div>

            {/* Consequences List */}
            <div className="px-10 py-8 space-y-6">
              <h3 className="font-label-caps text-[12px] font-bold text-primary border-b border-[#c5c6cd] pb-2 uppercase tracking-widest">CONSEQUENCES OF BLOCKING</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-[#775a19] shrink-0">visibility_off</span>
                  <div>
                    <p className="font-label-caps text-[11px] font-bold text-[#75777e] uppercase tracking-widest mb-1">VISIBILITY</p>
                    <p className="font-body-md text-[#1b1c1c] text-sm leading-tight">They won't be able to find your profile or see your posts.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-[#775a19] shrink-0">block</span>
                  <div>
                    <p className="font-label-caps text-[11px] font-bold text-[#75777e] uppercase tracking-widest mb-1">MESSAGING</p>
                    <p className="font-body-md text-[#1b1c1c] text-sm leading-tight">All existing chats will be archived and new messages disabled.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-[#775a19] shrink-0">event_busy</span>
                  <div>
                    <p className="font-label-caps text-[11px] font-bold text-[#75777e] uppercase tracking-widest mb-1">EVENTS</p>
                    <p className="font-body-md text-[#1b1c1c] text-sm leading-tight">You will not see each other in attendee lists for future gatherings.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-[#775a19] shrink-0">notifications_paused</span>
                  <div>
                    <p className="font-label-caps text-[11px] font-bold text-[#75777e] uppercase tracking-widest mb-1">NOTIFICATIONS</p>
                    <p className="font-body-md text-[#1b1c1c] text-sm leading-tight">We will no longer notify you of any actions taken by this member.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-10 py-8 bg-[#f5f3f3] flex flex-col md:flex-row-reverse gap-4">
              <button 
                className="flex-1 bg-primary text-white py-4 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-[0.98] duration-150 flex justify-center items-center gap-2"
                onClick={handleBlock}
                disabled={loading}
              >
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin text-[16px]">refresh</span> PROCESSING...</>
                ) : (
                  'BLOCK AND REMOVE'
                )}
              </button>
              <button 
                className="flex-1 bg-transparent border border-[#775a19] text-[#775a19] py-4 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#fed488]/20 transition-all active:scale-[0.98] duration-150"
                onClick={() => navigate(-1)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
