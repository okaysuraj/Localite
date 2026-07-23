import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LocationSettingsPage() {
  const navigate = useNavigate();
  const [guardian, setGuardian] = useState(true);
  const [discovery, setDiscovery] = useState(true);

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fbf9f8] shadow-sm">
        <div className="font-headline-sm text-2xl font-bold text-primary tracking-tight cursor-pointer" onClick={() => navigate('/')}>Localite</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-[#44474d] font-medium hover:text-primary transition-colors duration-200 cursor-pointer" onClick={() => navigate('/events')}>Gatherings</a>
          <a className="text-[#44474d] font-medium hover:text-primary transition-colors duration-200 cursor-pointer">Sports Hub</a>
          <a className="text-[#44474d] font-medium hover:text-primary transition-colors duration-200 cursor-pointer">Members</a>
          <a className="text-primary font-bold border-b-2 border-[#775a19] transition-colors duration-200 cursor-pointer">Settings</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined cursor-pointer active:scale-95 transition-transform text-[#44474d]">notifications</span>
          <div className="w-8 h-8 rounded-full bg-[#e4e2e2] overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKBA1StoeNRDvJeFElHQSRnMytg8kUAVe2dVCuVgtxdyZ7SqMI1VIbpWo1i5n8WARrzS1CmipENVKz0wltB85q3UTQngGvTJPfU5cWq9hTUtUT1BK8JKGek76fDZbtzRjVOY7hv09IW0Nse7VdNZjoEQNqbQTk79TpYUgvwt-s5UWA7L5ORDJ09A2Va8uklnLUo853owmCPq8KLLCj8mLNeVK2b58ah5DGiDybP_-0tcsYrVamY1epJA" alt="Profile" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 py-8 px-4 flex flex-col z-40 bg-[#f5f3f3] shadow-md">
          <div className="mb-10 px-4">
            <h2 className="font-headline-sm text-2xl font-bold text-primary">Localite Elite</h2>
            <p className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-widest">Premium Concierge</p>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer" onClick={() => navigate('/events')}>
              <span className="material-symbols-outlined">event</span>
              <span className="font-label-caps text-[12px] font-bold uppercase">Gatherings</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">sports_tennis</span>
              <span className="font-label-caps text-[12px] font-bold uppercase">Sports Hub</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">group</span>
              <span className="font-label-caps text-[12px] font-bold uppercase">Members</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer" onClick={() => navigate('/dashboard/insights')}>
              <span className="material-symbols-outlined">insights</span>
              <span className="font-label-caps text-[12px] font-bold uppercase">Analytics</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-primary bg-[#fbf9f8] rounded-lg shadow-sm font-bold cursor-pointer">
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span className="font-label-caps text-[12px] font-bold uppercase">Settings</span>
            </a>
          </div>
          <div className="mt-auto border-t border-[#c5c6cd] pt-4 flex flex-col gap-2">
            <a className="flex items-center gap-4 px-4 py-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">help_outline</span>
              <span className="font-body-md text-base">Help Center</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-2 text-[#44474d] hover:text-[#ba1a1a] transition-colors cursor-pointer">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-md text-base">Log Out</span>
            </a>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="ml-64 flex-1 pt-12 pb-16 px-12 max-w-7xl overflow-y-auto">
          {/* Header Section */}
          <header className="mb-12">
            <h1 className="font-display-lg text-5xl font-bold text-primary mb-2">Location Settings</h1>
            <p className="font-body-lg text-lg text-[#44474d] italic">Your Location, Curated for Your Experience</p>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left Column: Settings Controls */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
              
              {/* Always On Section */}
              <section className="bg-white p-8 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.06)] border border-[#eae8e7] transition-transform hover:scale-[1.005]">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full">
                      <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-2xl font-bold text-primary">Guardian Presence</h3>
                      <p className={`font-label-caps text-[12px] font-bold uppercase tracking-widest mt-1 ${guardian ? 'text-[#775a19]' : 'text-[#44474d]'}`}>Always On</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={guardian} 
                      onChange={() => setGuardian(!guardian)} 
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${guardian ? 'bg-primary' : 'bg-[#e4e2e2]'}`}>
                      <div className={`absolute left-0.5 top-[2px] bg-white w-[20px] h-[20px] rounded-full transition-transform duration-200 shadow-sm ${guardian ? 'translate-x-[24px]' : ''}`}></div>
                    </div>
                  </label>
                </div>
                <p className="text-[#44474d] mb-6 leading-relaxed">
                  The Guardian Presence ensures your emergency contacts and the concierge team are notified of your general location for high-priority gatherings. This encrypted layer remains active in the background to provide a seamless safety net.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#fbf9f8] rounded-lg border border-[#c5c6cd]">
                    <div>
                      <span className="font-label-caps text-[12px] font-bold uppercase text-[#44474d]">GEO-FENCE RADIUS</span>
                      <p className="text-primary font-bold">Priority Zones Only</p>
                    </div>
                    <span className="material-symbols-outlined text-[#775a19] cursor-pointer">chevron_right</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#fbf9f8] rounded-lg border border-[#c5c6cd]">
                    <div>
                      <span className="font-label-caps text-[12px] font-bold uppercase text-[#44474d]">NOTIFICATION FREQUENCY</span>
                      <p className="text-primary font-bold">On Arrival & Departure</p>
                    </div>
                    <span className="material-symbols-outlined text-[#775a19] cursor-pointer">chevron_right</span>
                  </div>
                </div>
              </section>

              {/* While Using Section */}
              <section className="bg-white p-8 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.06)] border border-[#eae8e7] transition-transform hover:scale-[1.005]">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <div className="bg-[#775a19] text-white w-12 h-12 flex items-center justify-center rounded-full">
                      <span className="material-symbols-outlined">explore</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-2xl font-bold text-primary">Smart Discovery</h3>
                      <p className={`font-label-caps text-[12px] font-bold uppercase tracking-widest mt-1 ${discovery ? 'text-[#775a19]' : 'text-[#44474d]'}`}>While Using App</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={discovery} 
                      onChange={() => setDiscovery(!discovery)} 
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${discovery ? 'bg-primary' : 'bg-[#e4e2e2]'}`}>
                      <div className={`absolute left-0.5 top-[2px] bg-white w-[20px] h-[20px] rounded-full transition-transform duration-200 shadow-sm ${discovery ? 'translate-x-[24px]' : ''}`}></div>
                    </div>
                  </label>
                </div>
                <p className="text-[#44474d] mb-6 leading-relaxed">
                  Enable real-time discovery to receive invitations to impromptu sports matches or private elite gatherings within your immediate vicinity. This mode only activates when the application is in use.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-start p-4 rounded-lg border-2 border-primary bg-[#f5f3f3]">
                    <span className="font-label-caps text-[12px] font-bold text-primary mb-1 uppercase">PRECISION</span>
                    <span className="font-headline-sm text-2xl font-bold text-primary">High</span>
                  </button>
                  <button className="flex flex-col items-start p-4 rounded-lg border border-[#c5c6cd] hover:border-[#775a19] transition-colors">
                    <span className="font-label-caps text-[12px] font-bold text-[#44474d] mb-1 uppercase">BATTERY USAGE</span>
                    <span className="font-headline-sm text-2xl font-bold text-primary">Optimized</span>
                  </button>
                </div>
              </section>

            </div>

            {/* Right Column: Map & Integrity */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
              
              {/* Map Preview Card */}
              <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.06)] border border-[#eae8e7] overflow-hidden">
                <div className="p-6 border-b border-[#eae8e7] flex justify-between items-center">
                  <div>
                    <span className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase">CURRENT CONTEXT</span>
                    <h4 className="font-headline-sm text-2xl font-bold text-primary">Mayfair District</h4>
                  </div>
                  <span className="material-symbols-outlined text-[#775a19]">location_on</span>
                </div>
                <div className="h-64 relative">
                  <img className="w-full h-full object-cover grayscale opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhbmztpYuc4P-rP_K--VXaETK-At5y-ebQrDI3b4dyUdrgjHNBogt4vLsEVo3Q65tKw1NsLuPFdDQkU7KNNaD77aZ1F7USP-o7rJ-ORcIMtWT0DOIZp7FRRLcITMmzgMo88bNWFI1Pg-W44c7-DZWGnG74U-4ihwwznwtrECMrr228WapzS9Q55zorYvi1y5m8pyYuWp4hHTa0Yg6y9q67vTYGMk6V8X0g3bFxNF4XnS3OXv_H7FFr7A" alt="Map" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#775a19] rounded-full animate-pulse"></div>
                      <span className="font-body-md text-base font-bold text-primary">Active in Zone</span>
                    </div>
                    <span className="font-label-caps text-[12px] font-bold text-[#775a19] underline cursor-pointer uppercase">UPDATE POSITION</span>
                  </div>
                </div>
              </div>

              {/* Data Integrity Card */}
              <div className="bg-primary text-white p-8 rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.06)] relative overflow-hidden group">
                <h4 className="font-headline-sm text-2xl font-bold mb-4 relative z-10">Data Integrity</h4>
                <p className="text-[#76849f] text-base mb-6 leading-relaxed relative z-10">
                  Localite employs zero-knowledge encryption for all location telemetry. Your precise coordinates are never stored in a readable format on our servers. Access is strictly limited to your authorized Guardian network.
                </p>
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#775a19]" style={{fontVariationSettings: "'FILL' 1"}}>lock_reset</span>
                    <span className="font-label-caps text-[12px] font-bold uppercase">End-to-End Encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#775a19]" style={{fontVariationSettings: "'FILL' 1"}}>history</span>
                    <span className="font-label-caps text-[12px] font-bold uppercase">24h Auto-Purge History</span>
                  </div>
                </div>
                <button className="mt-8 w-full py-4 border border-[#775a19] text-[#775a19] font-label-caps text-[12px] font-bold uppercase hover:bg-[#775a19] hover:text-white transition-all duration-300">
                  DOWNLOAD PRIVACY REPORT
                </button>
              </div>

              {/* Action Footer */}
              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-[#eae8e7] text-[#1b1c1c] font-label-caps text-[12px] font-bold uppercase rounded-lg hover:bg-[#e4e2e2] transition-colors">
                  RESET DEFAULTS
                </button>
                <button className="flex-1 py-4 bg-primary text-white font-label-caps text-[12px] font-bold uppercase rounded-lg shadow-md hover:scale-[1.02] active:scale-95 transition-all">
                  SAVE CONFIGURATION
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
