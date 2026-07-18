import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TheHallOfHonorPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-[#fbf9f8] shadow-[0_16px_32px_rgba(10,25,47,0.05)] w-full fixed top-0 z-50">
        <nav className="flex justify-between items-center w-full px-8 py-2 h-20 max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <span className="font-headline-md text-3xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>Regal Connection</span>
            <div className="hidden md:flex gap-4 items-center ml-12">
              <a className="text-[#44474d] hover:text-[#775a19] transition-colors font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Dashboard</a>
              <a className="text-[#44474d] hover:text-[#775a19] transition-colors font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/events')}>Events</a>
              <a className="text-[#44474d] hover:text-[#775a19] transition-colors font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/dashboard/insights')}>Sports Stats</a>
              <a className="text-primary font-bold border-b-2 border-[#e9c176] font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Achievements</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-primary hover:text-[#775a19] transition-colors">notifications</button>
              <button className="material-symbols-outlined text-primary hover:text-[#775a19] transition-colors" onClick={() => navigate('/settings/notifications')}>settings</button>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#eae8e7] overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOk1Md1WdAk5VV4N9XaFGEV61ID6go0csWT6AGVBJyJO9u3NSqrQAfkh5E-vUMtd7Qk6yr0a-vWx_S0EwzhbBVPop5sCxJNdawYo0qgZvYIwLb_okXJ1BMvGmGdwsGIZWYoh_4HhtKLTrx9H80-SudK4GYg3rWhC4fhD13ugQnEFhnQ6NOHa59JRQgWgO0ChA_nljD4SBxV6t7f8cEN5NOXG0b9IBIysJto5E2pEEHKmPThP74BMI2nw" alt="Profile" />
            </div>
          </div>
        </nav>
      </header>

      <div className="flex flex-1 pt-20">
        
        {/* Side Nav */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] w-64 fixed left-0 top-20 bg-[#f5f3f3] shadow-[4px_0_24px_rgba(10,25,47,0.03)] p-4 gap-6 z-40 border-r border-[#eae8e7]">
          <div className="flex flex-col gap-2 mb-6 mt-4">
            <div className="flex items-center gap-2 px-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">military_tech</span>
              </div>
              <div>
                <div className="font-headline-sm text-base font-bold text-primary">The Registry</div>
                <div className="font-label-caps text-[10px] text-[#44474d] uppercase tracking-widest">Elite Membership</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <a className="flex items-center gap-4 p-2 px-4 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Dashboard</span>
            </a>
            <a className="flex items-center gap-4 p-2 px-4 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer" onClick={() => navigate('/events')}>
              <span className="material-symbols-outlined">event</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Events</span>
            </a>
            <a className="flex items-center gap-4 p-2 px-4 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer" onClick={() => navigate('/dashboard/insights')}>
              <span className="material-symbols-outlined">leaderboard</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Sports Stats</span>
            </a>
            <a className="flex items-center gap-4 p-2 px-4 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">emoji_events</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Rankings</span>
            </a>
            <a className="flex items-center gap-4 p-2 px-4 text-primary font-bold bg-[#e4e2e2] rounded-lg cursor-pointer">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>military_tech</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Achievements</span>
            </a>
          </div>
          <div className="flex flex-col gap-2 pt-4 border-t border-[#c5c6cd] mb-4">
            <a className="flex items-center gap-4 p-2 px-4 text-[#44474d] hover:bg-[#eae8e7] rounded-lg cursor-pointer">
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Support</span>
            </a>
            <a className="flex items-center gap-4 p-2 px-4 text-[#44474d] hover:bg-[#eae8e7] rounded-lg cursor-pointer">
              <span className="material-symbols-outlined text-[#ba1a1a]">logout</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Logout</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-0 lg:ml-64 p-8 lg:p-12" style={{ background: 'radial-gradient(circle at top right, rgba(254, 212, 136, 0.1), transparent)' }}>
          
          {/* Hero Header */}
          <div className="max-w-6xl mx-auto mb-12">
            <h1 className="font-display-lg text-5xl font-bold text-primary mb-2">The Hall of Honor</h1>
            <p className="font-body-lg text-lg text-[#44474d] max-w-2xl">A curated archive of your distinguished contributions and triumphs within the Regal Connection circle.</p>
          </div>

          {/* Featured: Next Milestone */}
          <section className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] overflow-hidden flex flex-col md:flex-row border border-[#efeded]">
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-[#fbf9f8] flex items-center justify-center p-8">
                <img className="max-w-full max-h-full object-contain drop-shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeOlYD5l12Jya_6kTAUZYckuVgAuHMos4UU7wZDUsXx8TjNuCe_hXiZAPsdG5RAjuSCLvsJ90Aia1IHXd5EJB5NhUXO_ArqEJgK6UvB1hiNMJ8N1nnP-nL7d7sN4Cda58TfOoBYTu4fhj4Ha8fzI7tsfT6qUe-bBI--05QQyCn8Ig2HFac0DDZmfnMMu7NxLtA8Wb39BGLNagqPuH7stcEgVik253so2br_FfLks0ulGOpLuBbeWhcVw" alt="Featured Medal" />
              </div>
              <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center border-l border-[#efeded]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-label-caps text-[10px] text-[#e9c176] bg-primary px-2 py-1 rounded uppercase tracking-widest font-bold">FEATURED MILESTONE</span>
                </div>
                <h2 className="font-headline-md text-3xl font-bold text-primary mb-2">Guardian of the Grand Pavilion</h2>
                <p className="font-body-md text-base text-[#44474d] mb-6">Awarded to members who have successfully hosted five flagship seasonal events with an excellence rating above 95%.</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="font-label-caps text-[10px] text-[#75777e] uppercase tracking-widest font-bold">PROGRESS TO REWARD</span>
                    <span className="font-body-md text-sm font-bold text-primary">4 / 5 Events</span>
                  </div>
                  <div className="w-full h-2 bg-[#eae8e7] rounded-full overflow-hidden">
                    <div className="h-full bg-[#fed488] w-[80%] shadow-[0_0_8px_rgba(120,90,26,0.3)]"></div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#f5f3f3] rounded-lg border border-[#ffdea5]">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#775a19]">workspace_premium</span>
                    <div>
                      <div className="font-label-caps text-[10px] text-[#785a1a] uppercase tracking-widest font-bold mb-1">PRESTIGE REWARD</div>
                      <div className="font-body-md text-sm text-primary">Private access to the Platinum Lounge & bespoke commemorative medallion.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Grid: Distinguished Contributions */}
          <section className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-2xl font-bold text-primary">Distinguished Contributions</h3>
              <div className="flex gap-4">
                <button className="p-2 rounded border border-[#c5c6cd] text-[#44474d] hover:bg-[#f5f3f3] transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Achievement Card 1 */}
              <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-6 border border-[#efeded] hover:border-[#ffdea5] transition-all group hover:-translate-y-1">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="w-full h-full rounded-full border-4 border-[#ffdea5] flex items-center justify-center bg-white relative z-10 shadow-inner">
                    <span className="material-symbols-outlined text-[#775a19] text-[48px]" style={{fontVariationSettings: "'FILL' 1"}}>military_tech</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] px-2 py-1 rounded-full font-bold z-20">LEGACY</div>
                </div>
                <div className="text-center">
                  <h4 className="font-headline-sm text-[20px] font-bold text-primary mb-2">The Founding Fifty</h4>
                  <p className="font-body-md text-[#44474d] text-sm mb-6">Honoring the inaugural members of the Regal Connection society.</p>
                  <div className="flex justify-center">
                    <div className="text-center">
                      <div className="font-label-caps text-[10px] text-[#75777e] uppercase tracking-widest font-bold">Unlocked</div>
                      <div className="font-body-md font-bold text-primary text-sm">Aug 2023</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Card 2 */}
              <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-6 border border-[#efeded] hover:border-[#ffdea5] transition-all group hover:-translate-y-1">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="w-full h-full rounded-full border-4 border-[#ffdea5] flex items-center justify-center bg-white relative z-10 shadow-inner">
                    <span className="material-symbols-outlined text-[#775a19] text-[48px]" style={{fontVariationSettings: "'FILL' 1"}}>sports_tennis</span>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-headline-sm text-[20px] font-bold text-primary mb-2">Court Virtuoso</h4>
                  <p className="font-body-md text-[#44474d] text-sm mb-6">Secured first place in three consecutive elite tennis invitational rounds.</p>
                  <div className="flex justify-center">
                    <div className="text-center">
                      <div className="font-label-caps text-[10px] text-[#75777e] uppercase tracking-widest font-bold">Unlocked</div>
                      <div className="font-body-md font-bold text-primary text-sm">Oct 2023</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Card 3 */}
              <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-6 border border-[#efeded] hover:border-[#ffdea5] transition-all group hover:-translate-y-1">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="w-full h-full rounded-full border-4 border-[#ffdea5] flex items-center justify-center bg-white relative z-10 shadow-inner">
                    <span className="material-symbols-outlined text-[#775a19] text-[48px]" style={{fontVariationSettings: "'FILL' 1"}}>menu_book</span>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-headline-sm text-[20px] font-bold text-primary mb-2">Curator of Thought</h4>
                  <p className="font-body-md text-[#44474d] text-sm mb-6">Hosted ten high-engagement philosophical salon discussions.</p>
                  <div className="flex justify-center">
                    <div className="text-center">
                      <div className="font-label-caps text-[10px] text-[#75777e] uppercase tracking-widest font-bold">Unlocked</div>
                      <div className="font-body-md font-bold text-primary text-sm">Dec 2023</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Card 4 (Locked) */}
              <div className="bg-[#f5f3f3] rounded-xl shadow-[0_8px_16px_rgba(10,25,47,0.02)] p-6 border border-dashed border-[#c5c6cd] opacity-60">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="w-full h-full rounded-full border-4 border-[#75777e] flex items-center justify-center bg-[#efeded]">
                    <span className="material-symbols-outlined text-[#75777e] text-[48px]">lock</span>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-headline-sm text-[20px] font-bold text-[#44474d] mb-2">Global Ambassador</h4>
                  <p className="font-body-md text-[#44474d] text-sm mb-6">Represent the society in five international city exchanges.</p>
                  <div className="font-label-caps text-[10px] text-[#775a19] font-bold tracking-widest uppercase">1 / 5 COMPLETE</div>
                </div>
              </div>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
