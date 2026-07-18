import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventTimelineUpdatesPage() {
  const navigate = useNavigate();
  const [updateText, setUpdateText] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setUpdateText('');
    }, 1500);
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-[#fbf9f8] border-b border-[#c5c6cd] shadow-sm">
        <div className="flex items-center gap-8">
          <span className="font-headline-md text-3xl font-bold text-primary tracking-tight cursor-pointer" onClick={() => navigate('/')}>ELITE CIRCLE</span>
          <div className="hidden md:flex gap-6">
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/dashboard/host')}>Dashboard</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-primary border-b-2 border-[#775a19] pb-1 cursor-pointer">Events</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary transition-colors cursor-pointer">Circles</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary transition-colors cursor-pointer">Concierge</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777e] text-sm">search</span>
            <input className="bg-[#f5f3f3] border-none rounded-full pl-10 pr-4 py-2 font-body-md text-sm w-64 focus:ring-1 focus:ring-[#775a19] outline-none" placeholder="Search events..." type="text"/>
          </div>
          <button className="bg-primary text-white font-label-caps text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-full hover:opacity-90 transition-all" onClick={() => navigate('/events/create')}>Create Event</button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACcIbxZOJUkp3kNtve0pJDnJmmGAeW0N8gGM5rwgpkx07EGqNRfzTCrUwOfMcMDL25yTuaR6RABd0qXhDbfBf3KvowpTiTf5WGeFp2rjgrlSD91XitrUrY9Doqqzv_bN99a3pZgzRmoMGn_3fGfTELyFYtcXnybDHpBq_y1SOHxqkR0SP59FRHgQ8UlmRWeZ8DprP3aRJef15p_hFiCVHM_WZVWe6oEtOT3M5nWghbZk81oogDWS6nBw" alt="Profile"/>
          </div>
        </div>
      </nav>

      <div className="flex max-w-screen-2xl mx-auto">
        {/* SideNavBar */}
        <aside className="flex flex-col h-[calc(100vh-80px)] sticky top-20 pt-8 pb-8 px-4 gap-4 bg-[#f5f3f3] border-r border-[#c5c6cd]/50 shadow-md w-64 hidden md:flex z-40">
          <div className="px-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">star</span>
              </div>
              <div>
                <p className="font-label-caps text-[10px] font-bold text-[#775a19] tracking-widest uppercase">Host Admin</p>
                <p className="font-headline-sm text-[16px] font-bold text-[#1b1c1c] leading-tight">Gala 2024</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer" onClick={() => navigate('/dashboard/host')}>
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Overview</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">group</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Guest List</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg font-bold translate-x-1 transition-transform duration-200 cursor-pointer">
              <span className="material-symbols-outlined">explore</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Live Updates</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer" onClick={() => navigate('/dashboard/insights')}>
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">poll</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Live Polling</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer" onClick={() => navigate('/dashboard/revenue')}>
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">payments</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Financials</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">settings</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Settings</span>
            </a>
          </nav>
          <div className="mt-auto px-4">
            <button className="w-full bg-[#fed488] text-[#785a1a] py-3 rounded-xl font-label-caps text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Invite VVIP
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 flex flex-col gap-8 w-full">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c5c6cd]/50 pb-6 mb-4">
            <div>
              <h1 className="font-display-lg text-4xl font-bold text-primary mb-2">Event Milestones</h1>
              <p className="font-body-md text-[#44474d] max-w-xl">Curating the real-time narrative of the Grand Winter Gala. Track every pivotal moment from the first arrival to the final toast.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#e4e2e2] text-primary font-label-caps text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-[#c5c6cd] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export Log
              </button>
              <button className="bg-primary text-white font-label-caps text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-lg flex items-center gap-2" onClick={() => navigate('/dashboard')}>
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                Live Dashboard
              </button>
            </div>
          </header>

          {/* Workspace Layout: Timeline & Post Update */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Timeline (Col 5) */}
            <section className="lg:col-span-5 flex flex-col gap-6">
              <h3 className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-[0.2em]">Historical Flow</h3>
              <div className="space-y-0 pl-4 relative">
                <div className="absolute left-[27px] top-8 bottom-4 w-px bg-[#c5c6cd]"></div>
                
                {/* Timeline Item 1 */}
                <div className="relative pb-12 group">
                  <div className="flex gap-4">
                    <div className="relative z-10">
                      <div className="w-[24px] h-[24px] rounded-full bg-primary border-4 border-[#fbf9f8] flex items-center justify-center transition-transform group-hover:scale-125">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div className="flex-1 -mt-1">
                      <span className="font-label-caps text-[10px] font-bold text-[#84847b] uppercase tracking-widest block mb-1">19:30 • COMPLETED</span>
                      <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-2">Grand Ballroom Doors Open</h4>
                      <p className="font-body-md text-[#44474d] text-sm leading-relaxed mb-4">Initial reception guests transitioned to the main hall. Concierge team stationed at all three primary entrances.</p>
                      <div className="rounded-xl overflow-hidden shadow-sm h-48 mb-4">
                        <img className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArepIpVyw6dVd3GEs33Ax6aKicDmXoXhzalPf7-dVeUsTvYj7PPVExwChhIEjSJV_amguTma-0YVJiUkN2ClnpVtGwwDFgtXWJcZPQYAySrRhmTtDHRiczqjy75s3kJ855xp4eRBvxb3SYw-PRbNKH63pDDhhMrjSatCRWxdn-ecRJnKwJ477OpwpA2PdSUy6t-bNcmTV8AE6z5AlFArub0eSuTuxT0NOocfY0sbAHaot8E3jYcsLzwQ" alt="Doors Open"/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative pb-12 group">
                  <div className="flex gap-4">
                    <div className="relative z-10">
                      <div className="w-[24px] h-[24px] rounded-full bg-[#775a19] border-4 border-[#fbf9f8] flex items-center justify-center transition-transform group-hover:scale-125">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div className="flex-1 -mt-1">
                      <span className="font-label-caps text-[10px] font-bold text-[#775a19] uppercase tracking-widest block mb-1">20:15 • IN PROGRESS</span>
                      <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-2">VVIP Toast & Opening Ceremony</h4>
                      <p className="font-body-md text-[#44474d] text-sm leading-relaxed">Keynote speakers are assembling behind the dais. Lighting adjusted to 'Presentation mode' (40% intensity).</p>
                      <div className="mt-4 flex gap-2">
                        <span className="px-3 py-1 bg-[#eae8e7] rounded-full font-label-caps text-[10px] font-bold uppercase tracking-widest text-primary">LIGHTING: SET</span>
                        <span className="px-3 py-1 bg-[#eae8e7] rounded-full font-label-caps text-[10px] font-bold uppercase tracking-widest text-primary">AUDIO: CHECK</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative pb-4 group">
                  <div className="flex gap-4">
                    <div className="relative z-10">
                      <div className="w-[24px] h-[24px] rounded-full bg-[#e4e2e2] border-4 border-[#fbf9f8] flex items-center justify-center transition-transform group-hover:scale-125">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#75777e]"></div>
                      </div>
                    </div>
                    <div className="flex-1 -mt-1 opacity-50">
                      <span className="font-label-caps text-[10px] font-bold text-[#75777e] uppercase tracking-widest block mb-1">21:00 • UPCOMING</span>
                      <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-2">First Course Service</h4>
                      <p className="font-body-md text-[#44474d] text-sm leading-relaxed">Kitchen standing by for 'Go' signal from Floor Manager.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Right: Post Update Workspace (Col 7) */}
            <section className="lg:col-span-7 flex flex-col gap-6 sticky top-24">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e4e2e2]">
                <h3 className="font-headline-sm text-2xl font-bold text-primary mb-6">Broadcast Update</h3>
                <div className="space-y-6">
                  
                  {/* Update Text Area */}
                  <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-[11px] font-bold uppercase tracking-widest text-[#44474d]">ANNOUNCEMENT TEXT</label>
                    <textarea 
                      className="w-full bg-[#f5f3f3] border-none rounded-xl p-4 font-body-md text-primary focus:ring-1 focus:ring-[#775a19] resize-none placeholder:text-[#c5c6cd] outline-none" 
                      placeholder="Share a live update with guests and staff..." 
                      rows="4"
                      value={updateText}
                      onChange={(e) => setUpdateText(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Media Upload Bento */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-[#f5f3f3] border-2 border-dashed border-[#c5c6cd] rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-[#eae8e7] transition-colors cursor-pointer group">
                      <span className="material-symbols-outlined text-[#75777e] group-hover:text-primary transition-colors text-3xl">add_a_photo</span>
                      <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#84847b]">UPLOAD MEDIA</span>
                    </div>
                    <div className="aspect-square relative rounded-xl overflow-hidden group">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZNuU9H12BYbOS3zf3Byjpd8WFqd3xqPjYbvvMgLzcPrJfIKcd_1MAz4ea4LkoivJKUHZr56_ZqPJuDcVVkUls65fLjPiIFK2LMa-N69U892Zg301BtjQbQC5TatuJE7Php4zWsb-S6WshOSYTs4oYCYDTmCfK85PrF-rl05nk0OjIaV9TA7remwCuwTiCFUb1DrCJhftglEA6-oTuUk_rgWj5MN1Clpn3P1ae-t99i-VOaPxLiKAbPw" alt="Table Setting"/>
                      <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#e4e2e2]">
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                      <button className="flex items-center gap-2 text-[#44474d] hover:text-[#775a19] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                        <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Schedule</span>
                      </button>
                      <button className="flex items-center gap-2 text-[#44474d] hover:text-[#775a19] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">group</span>
                        <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Audience: All</span>
                      </button>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                      <button className="flex-1 md:flex-none border border-[#775a19] text-[#775a19] font-label-caps text-[10px] font-bold uppercase tracking-widest px-8 py-3 rounded-lg hover:bg-[#775a19] hover:text-white transition-all">
                        Draft
                      </button>
                      <button 
                        className={`flex-1 md:flex-none text-white font-label-caps text-[10px] font-bold uppercase tracking-widest px-8 py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 ${isPublishing ? 'bg-[#775a19]' : 'bg-primary hover:opacity-90'}`}
                        onClick={handlePublish}
                        disabled={isPublishing}
                      >
                        {isPublishing ? (
                          <><span className="material-symbols-outlined text-sm animate-spin">sync</span> Publishing</>
                        ) : 'Post Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contextual Stats Card */}
              <div className="bg-[#fed488]/10 p-6 rounded-xl border border-[#fed488]/30 flex flex-wrap gap-8 items-center justify-around">
                <div className="text-center">
                  <p className="font-label-caps text-[10px] font-bold text-[#775a19] tracking-widest uppercase mb-1">Guests Checked In</p>
                  <p className="font-display-lg text-[28px] font-bold text-[#785a1a]">142<span className="text-[#775a19]/50 font-body-md text-sm">/180</span></p>
                </div>
                <div className="w-px h-8 bg-[#fed488]/30 hidden sm:block"></div>
                <div className="text-center">
                  <p className="font-label-caps text-[10px] font-bold text-[#775a19] tracking-widest uppercase mb-1">Staff On-Duty</p>
                  <p className="font-display-lg text-[28px] font-bold text-[#785a1a]">24</p>
                </div>
                <div className="w-px h-8 bg-[#fed488]/30 hidden sm:block"></div>
                <div className="text-center">
                  <p className="font-label-caps text-[10px] font-bold text-[#775a19] tracking-widest uppercase mb-1">Live Updates</p>
                  <p className="font-display-lg text-[28px] font-bold text-[#785a1a]">18</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
