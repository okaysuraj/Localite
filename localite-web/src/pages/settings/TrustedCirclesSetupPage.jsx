import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrustedCirclesSetupPage() {
  const navigate = useNavigate();
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex overflow-hidden">
      
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-8 px-6 z-40 w-72 bg-[#f5f3f3] border-r border-[#c5c6cd] shadow-[16px_0_32px_-12px_rgba(10,25,47,0.05)] rounded-r-xl">
        <div className="mb-10">
          <h1 className="font-headline-sm text-2xl font-bold text-primary mb-1">Concierge Console</h1>
          <p className="font-label-caps text-[12px] text-[#84847b] tracking-widest uppercase">Modern Nobility</p>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto">
          <a className="flex items-center gap-4 text-[#84847b] p-3 hover:bg-[#e4e2e2]/50 transition-all rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-caps text-[12px] uppercase tracking-widest">Dashboard</span>
          </a>
          <a className="flex items-center gap-4 text-[#84847b] p-3 hover:bg-[#e4e2e2]/50 transition-all rounded-lg cursor-pointer" onClick={() => navigate('/events')}>
            <span className="material-symbols-outlined">event</span>
            <span className="font-label-caps text-[12px] uppercase tracking-widest">Events</span>
          </a>
          <a className="flex items-center gap-4 text-[#84847b] p-3 hover:bg-[#e4e2e2]/50 transition-all rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">location_on</span>
            <span className="font-label-caps text-[12px] uppercase tracking-widest">Venues</span>
          </a>
          <a className="flex items-center gap-4 text-primary bg-white rounded-lg p-3 font-bold shadow-sm cursor-pointer">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
            <span className="font-label-caps text-[12px] uppercase tracking-widest">Safety Center</span>
          </a>
          <a className="flex items-center gap-4 text-[#84847b] p-3 hover:bg-[#e4e2e2]/50 transition-all rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="font-label-caps text-[12px] uppercase tracking-widest">Admin Tools</span>
          </a>
          <a className="flex items-center gap-4 text-[#84847b] p-3 hover:bg-[#e4e2e2]/50 transition-all rounded-lg cursor-pointer">
            <span className="material-symbols-outlined">history</span>
            <span className="font-label-caps text-[12px] uppercase tracking-widest">Audit Logs</span>
          </a>
        </nav>
        <div className="mt-auto pt-6 border-t border-[#c5c6cd] space-y-4">
          <button className="w-full py-3 bg-primary text-white font-label-caps text-[12px] uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create New Event
          </button>
          <div className="space-y-1">
            <a className="flex items-center gap-4 text-[#44474d] p-2 hover:bg-[#e4e2e2]/30 rounded-lg transition-colors cursor-pointer" onClick={() => navigate('/settings')}>
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Settings</span>
            </a>
            <a className="flex items-center gap-4 text-[#44474d] p-2 hover:bg-[#e4e2e2]/30 rounded-lg transition-colors cursor-pointer">
              <span className="material-symbols-outlined">help_outline</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Support</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 ml-72 h-screen overflow-y-auto bg-[#fbf9f8] flex flex-col">
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-8 w-full sticky top-0 z-50 h-20 bg-[#fbf9f8] shadow-[0_4px_20px_-5px_rgba(10,25,47,0.08)]">
          <div className="flex items-center gap-8">
            <div className="font-display-lg text-4xl font-bold text-primary tracking-tighter cursor-pointer" onClick={() => navigate('/')}>Localite</div>
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d]">search</span>
              <input className="bg-[#f5f3f3] border-none rounded-full py-2 pl-10 pr-4 w-64 font-body-md text-sm focus:ring-1 focus:ring-[#e9c176] transition-all outline-none" placeholder="Search safety protocols..." type="text"/>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">notifications</button>
              <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">mail</button>
              <div className="w-10 h-10 rounded-full bg-[#fed488] flex items-center justify-center overflow-hidden border border-[#c5c6cd] cursor-pointer active:opacity-80" onClick={() => navigate('/profile/setup/final')}>
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXNCQ0f8Y0MLgoW3eqptrQ8Zke5e3tfhxL3b0rvI5c5wVwtAE3l1xx99UnA6ASgdHsko9hFmEDzKRnumcqqFeeYS9Yjr60CVr8EPyzu1F2dl-hUJqXYDn7-ekRR5cSzQM3ZmjflHEOz0jCcf3FE3vqUvVmLyquyVs6rlkti5-4x5m9kk5ppB8bbte-S3mFo91v9GARv042QDQ5UFbM3cn_6NmwEtVPFO2KoB-fwRVepC_eE7gDkiTcEw" alt="Profile" />
              </div>
            </div>
          </nav>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-10 max-w-6xl mx-auto w-full">
          {/* Breadcrumbs & Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label-caps text-[12px] font-bold text-[#84847b] uppercase tracking-widest">Safety Center</span>
              <span className="material-symbols-outlined text-[14px] text-[#c5c6cd]">chevron_right</span>
              <span className="font-label-caps text-[12px] font-bold text-primary uppercase tracking-widest">Trusted Circles</span>
            </div>
            <div className="flex justify-between items-end flex-wrap gap-4">
              <div>
                <h2 className="font-display-lg text-5xl font-bold text-primary mb-2">Trusted Circles</h2>
                <p className="font-body-lg text-lg text-[#44474d] max-w-xl">Configure your safety tethers. Contacts in these circles receive automated check-ins and emergency alerts based on your location and event status.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-full shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] hover:bg-opacity-90 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Add Trusted Contact
              </button>
            </div>
          </div>

          {/* Management Section: Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Main Contacts List */}
            <div className="md:col-span-12 lg:col-span-8 space-y-6">
              <div className="bg-white rounded-xl p-8 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#e4e2e2]/50">
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                  <h3 className="font-headline-sm text-2xl font-bold text-primary">Active Contacts</h3>
                  <div className="flex gap-4 flex-wrap">
                    <span className="font-label-caps text-[12px] font-bold py-1 px-3 bg-[#fed488]/30 text-[#775a19] rounded-full uppercase tracking-widest">3 Registered</span>
                    <span className="font-label-caps text-[12px] font-bold py-1 px-3 bg-[#efeded] text-[#44474d] rounded-full uppercase tracking-widest">2 Pending</span>
                  </div>
                </div>

                {/* Contacts List */}
                <div className="space-y-4">
                  
                  {/* Contact Item 1 */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-lg bg-[#fbf9f8] hover:bg-white transition-colors border border-transparent hover:border-[#c5c6cd]/30 group gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#efeded] border border-[#c5c6cd]">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1xbQWdkYqBjQYdYrZVHAHZjRxpes7jDPfODpUnRRfZfFyBSYfdaXuTCXbBr8_5XVrvlD_kC8SCUnG3xKu5_wfOZ89OifshjX1owx1-84sI8sYb01W2q8ljU3Mxp9szGzl6Uh0H4mTlhihgiCR3tl1ObOoMsPCkV_OlZGtOteo27022y5mkwclfKDTpvkLzlJ3VhwyCySEjmqBrM_omkoD1VCMFEFIC_GzCh9oPtz-kZV08WMbKx-XsQ" alt="Eleanor" />
                      </div>
                      <div>
                        <h4 className="font-body-lg font-bold text-primary">Eleanor Vance</h4>
                        <p className="font-label-caps text-[10px] font-bold text-[#84847b] uppercase tracking-tighter">Primary Contact • Family</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 sm:gap-10">
                      <div className="flex flex-col items-center">
                        <span className="font-label-caps text-[10px] font-bold text-[#84847b] mb-2 uppercase">Notifications</span>
                        <div 
                          className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in cursor-pointer"
                          onClick={() => setToggle1(!toggle1)}
                        >
                          <div className={`absolute block w-5 h-5 rounded-full border-4 border-[#c5c6cd] appearance-none transition-transform duration-200 ease-in ${toggle1 ? 'bg-white translate-x-5' : 'bg-white translate-x-0'}`}></div>
                          <div className={`block overflow-hidden h-5 rounded-full transition-colors duration-200 ${toggle1 ? 'bg-primary' : 'bg-[#efeded]'}`}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-primary transition-all rounded-full hover:bg-[#efeded]">edit</button>
                        <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-[#ba1a1a] transition-all rounded-full hover:bg-[#ffdad6]/20">delete</button>
                      </div>
                    </div>
                  </div>

                  {/* Contact Item 2 */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-lg bg-[#fbf9f8] hover:bg-white transition-colors border border-transparent hover:border-[#c5c6cd]/30 group gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#efeded] border border-[#c5c6cd]">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB81Hz5AuTvQx-2B4zlVcFelN5R3dwQaZOFYsLCVVAURssO54lxvrFaYa8uw_43oy7ZxA7C7W51MF8f8BSB_GA1ACQ0c4U4GOtPyppcINYNiQ_mp_VD5XHCDj1_4LLD43XtmLdOk8siHWTRU37MtfNrKhT4HYa5FH_4lKqqhLEhTYNHmZyXxx6rQc84YxjP95bJRaHIHuwDaWEbiSoy_LtGM3yMtrxDzz09Vwzk4ggkaBRlYGGGP9whQQ" alt="Julian" />
                      </div>
                      <div>
                        <h4 className="font-body-lg font-bold text-primary">Julian Thorne</h4>
                        <p className="font-label-caps text-[10px] font-bold text-[#84847b] uppercase tracking-tighter">Secondary • Professional</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 sm:gap-10">
                      <div className="flex flex-col items-center">
                        <span className="font-label-caps text-[10px] font-bold text-[#84847b] mb-2 uppercase">Notifications</span>
                        <div 
                          className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in cursor-pointer"
                          onClick={() => setToggle2(!toggle2)}
                        >
                          <div className={`absolute block w-5 h-5 rounded-full border-4 border-[#c5c6cd] appearance-none transition-transform duration-200 ease-in ${toggle2 ? 'bg-white translate-x-5' : 'bg-white translate-x-0'}`}></div>
                          <div className={`block overflow-hidden h-5 rounded-full transition-colors duration-200 ${toggle2 ? 'bg-primary' : 'bg-[#efeded]'}`}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-primary transition-all rounded-full hover:bg-[#efeded]">edit</button>
                        <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-[#ba1a1a] transition-all rounded-full hover:bg-[#ffdad6]/20">delete</button>
                      </div>
                    </div>
                  </div>

                  {/* Contact Item 3 (Pending) */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-lg bg-[#fbf9f8]/50 border border-dashed border-[#c5c6cd]/50 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#efeded] flex items-center justify-center opacity-50">
                        <span className="material-symbols-outlined text-[#75777e]">pending</span>
                      </div>
                      <div className="opacity-60">
                        <h4 className="font-body-lg font-bold text-primary">Clarissa H.</h4>
                        <p className="font-label-caps text-[10px] font-bold text-[#84847b] uppercase tracking-tighter">Invitation Sent • Friend</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="px-4 py-1.5 border border-[#c5c6cd] rounded-full font-label-caps text-[10px] font-bold text-[#44474d] hover:bg-[#efeded] transition-all uppercase tracking-widest">Resend Invitation</button>
                      <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-[#ba1a1a] transition-all rounded-full hover:bg-[#ffdad6]/20">close</button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Global Tethers Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#f5f3f3] p-6 rounded-xl border border-[#e4e2e2]/50">
                  <span className="font-label-caps text-[10px] font-bold text-[#84847b] uppercase tracking-widest block mb-2">Check-in Frequency</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-headline-sm text-primary">Every 2h</span>
                    <span className="text-xs text-[#775a19] font-medium">Standard</span>
                  </div>
                </div>
                <div className="bg-[#f5f3f3] p-6 rounded-xl border border-[#e4e2e2]/50">
                  <span className="font-label-caps text-[10px] font-bold text-[#84847b] uppercase tracking-widest block mb-2">Active Geo-Fencing</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-headline-sm text-primary">3 Zones</span>
                    <span className="text-xs text-[#b9c7e4] font-medium">Home, Office</span>
                  </div>
                </div>
                <div className="bg-[#f5f3f3] p-6 rounded-xl border border-[#e4e2e2]/50">
                  <span className="font-label-caps text-[10px] font-bold text-[#84847b] uppercase tracking-widest block mb-2">Last Tether Ping</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-headline-sm text-primary">14m Ago</span>
                    <span className="text-xs text-[#ba1a1a] font-medium">Stable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Insights */}
            <div className="md:col-span-12 lg:col-span-4 space-y-6">
              
              {/* Protocol Settings Card */}
              <div className="bg-primary text-white rounded-xl p-8 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-[180px]" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-headline-sm text-2xl font-bold mb-4">Emergency Protocol</h3>
                  <p className="font-body-md text-[#39475f] mb-6 text-sm opacity-80">Define how the system behaves when a tether is broken or a distress signal is initiated.</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#ffdea5] text-[18px] mt-0.5">check_circle</span>
                      <span className="text-sm font-medium text-white">Broadcast location to all Circles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#ffdea5] text-[18px] mt-0.5">check_circle</span>
                      <span className="text-sm font-medium text-white">Activate front/rear camera recording</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#ffdea5] text-[18px] mt-0.5">check_circle</span>
                      <span className="text-sm font-medium text-white">Auto-dial Localite 24/7 Response</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-[#ffdea5] text-[#261900] font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:brightness-105 active:scale-95 transition-all">Configure Responses</button>
                </div>
              </div>

              {/* Safety Map */}
              <div className="bg-white rounded-xl p-8 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#e4e2e2]/50">
                <h3 className="font-label-caps text-[12px] font-bold text-primary mb-6 uppercase tracking-widest">Safety Coverage Map</h3>
                <div className="aspect-square w-full rounded-lg bg-[#eae8e7] overflow-hidden relative mb-6">
                  <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDH_fcUznpiNrEGiaiLcPHFvlRaji-KAV5qVphT6Dc3UppfF76g4LYPCs8oztbs_szeRk-9CxBxvghY81ywAPL2iC4F51BQcLQvscYlqtdNHzlaufyD_mBCIWqqSPCr1ChoAy_jRHymweonIvxBw5NxiqNMRviCyuU3RvIcoFnJ8qmcdKhjNnldnOc6D_wGABNRxP9WLt5UYVpGXReDmmDymWMOyu-u2lN2KxVLU6cGEpoVKTlIAzyuLg')"}}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#e4e2e2]/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-white text-[10px] font-label-caps font-bold px-2 py-1 rounded uppercase tracking-widest">LIVE UPDATES ACTIVE</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#84847b] font-label-caps font-bold uppercase tracking-widest">Signal Strength</span>
                    <span className="font-bold text-primary">Optimal</span>
                  </div>
                  <div className="w-full bg-[#eae8e7] h-1 rounded-full overflow-hidden">
                    <div className="bg-[#775a19] h-full w-[92%]"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Global Floating Overlay */}
      <div className="fixed bottom-10 right-10 z-50">
        <button 
          className="w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden"
          onClick={() => navigate('/verified-badge-info')}
        >
          <span className="material-symbols-outlined text-[32px] group-hover:rotate-12 transition-transform">sos</span>
          <div className="absolute inset-0 bg-[#ba1a1a] opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
}
