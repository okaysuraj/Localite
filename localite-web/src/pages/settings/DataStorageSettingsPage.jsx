import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DataStorageSettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fbf9f8] shadow-sm">
        <div className="flex items-center gap-4">
          <span className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/settings/notifications')}>System / Administration</span>
          <span className="material-symbols-outlined text-sm text-[#75777e]">chevron_right</span>
          <span className="font-label-caps text-[12px] font-bold text-primary uppercase tracking-widest">Technical Management</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777e] scale-90">search</span>
            <input 
              className="pl-10 pr-4 py-1.5 bg-[#f5f3f3] border-none rounded-full text-sm w-64 focus:ring-1 focus:ring-[#775a19] transition-all outline-none" 
              placeholder="Search settings..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-4 text-primary">
            <span className="material-symbols-outlined cursor-pointer hover:text-[#775a19] transition-colors" onClick={() => navigate('/settings/notifications')}>notifications</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-[#775a19] transition-colors">settings</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbF_CwY0Ck52OX41sBSbaUPYKfLEMGNFm_zE3afPh2VfKberCKbdQiI99fdso6k5hBCC8ctFxV0qBbx97Xnrhe-FW7eKkpx7SIyFJJZT34NZcmBhJBMkJctAGaGIJvMrJZl8RdQOy_vpGhKt9La13xg0CXCAmywanqI_79Qd7Y1Hb62o7ErjCzKGrDR9yFPz2D6UDpJIktea-Wi1PS727g8u7R96DZZ71mNsO9eLgq__uBoqjGA75s2w" alt="Profile" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 py-8 px-4 flex flex-col z-40 bg-[#f5f3f3] shadow-md">
          <div className="mb-12 px-4">
            <h1 className="font-headline-sm text-2xl font-bold text-primary">Localite Elite</h1>
            <p className="font-label-caps text-[12px] font-bold text-[#44474d] opacity-70 uppercase tracking-widest">Premium Concierge</p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer" onClick={() => navigate('/events')}>
              <span className="material-symbols-outlined">event</span>
              <span className="font-body-md text-base">Gatherings</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">sports_tennis</span>
              <span className="font-body-md text-base">Sports Hub</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">group</span>
              <span className="font-body-md text-base">Members</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer" onClick={() => navigate('/dashboard/insights')}>
              <span className="material-symbols-outlined">insights</span>
              <span className="font-body-md text-base">Analytics</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-primary bg-[#fbf9f8] rounded-lg shadow-sm font-bold cursor-pointer">
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span className="font-body-md text-base">Settings</span>
            </a>
          </div>
          <button className="mt-8 mb-12 mx-4 py-3 bg-primary text-white font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity">
            Host New Event
          </button>
          <div className="border-t border-[#c5c6cd] pt-8 flex flex-col gap-2">
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">help_outline</span>
              <span className="font-body-md text-base">Help Center</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all cursor-pointer text-[#ba1a1a]">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-md text-base">Log Out</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 flex flex-col pt-8 pb-16 px-8 max-w-7xl mx-auto w-full">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="font-headline-md text-4xl font-bold text-primary">Technical Management</h2>
              <p className="font-body-md text-base text-[#44474d] max-w-2xl">Configure and optimize your enterprise data infrastructure. Monitor real-time storage consumption and manage localized assets.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 border border-[#775a19] text-[#775a19] font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#775a19] hover:text-white transition-all flex items-center gap-2">
                <span className="material-symbols-outlined scale-90">download</span>
                Full Data Export
              </button>
            </div>
          </div>

          {/* Bento Grid: Storage Consumption */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            
            {/* Main Storage Breakdown */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-8 shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-headline-sm text-2xl font-bold text-primary">Storage Consumption</h3>
                  <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest mt-1">Global capacity utilization: 74.2%</p>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-4xl font-bold text-primary">2.8 <span className="text-base font-normal">TB</span></span>
                  <p className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-widest mt-1">of 4.0 TB Used</p>
                </div>
              </div>
              
              {/* Visual Breakdown Bar */}
              <div className="h-12 w-full flex rounded-full overflow-hidden bg-[#efeded] mb-10">
                <div className="h-full bg-primary flex items-center justify-center relative group cursor-pointer" style={{ width: '55%' }}>
                  <div className="absolute -top-10 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Media: 1.54 TB</div>
                </div>
                <div className="h-full bg-[#775a19] flex items-center justify-center relative group cursor-pointer" style={{ width: '25%' }}>
                  <div className="absolute -top-10 bg-[#775a19] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Databases: 0.7 TB</div>
                </div>
                <div className="h-full bg-[#76849f] flex items-center justify-center relative group cursor-pointer" style={{ width: '15%' }}>
                  <div className="absolute -top-10 bg-[#76849f] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Logs: 0.42 TB</div>
                </div>
                <div className="h-full bg-[#c5c6cd] opacity-40" style={{ width: '5%' }}></div>
              </div>
              
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Media & Assets</span>
                  </div>
                  <p className="font-headline-sm text-2xl font-bold text-primary">1.54 TB</p>
                  <p className="text-[12px] text-[#44474d]">42,801 objects cached</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#775a19]"></div>
                    <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Databases</span>
                  </div>
                  <p className="font-headline-sm text-2xl font-bold text-primary">0.70 TB</p>
                  <p className="text-[12px] text-[#44474d]">SQL & NoSQL instances</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#76849f]"></div>
                    <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">System Logs</span>
                  </div>
                  <p className="font-headline-sm text-2xl font-bold text-primary">0.42 TB</p>
                  <p className="text-[12px] text-[#44474d]">Retention: 90 days</p>
                </div>
              </div>
            </div>

            {/* Cache Management Tool */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-xl p-8 shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-[#775a19]">bolt</span>
                  <h3 className="font-headline-sm text-2xl font-bold text-primary">Cache Engine</h3>
                </div>
                <p className="font-body-md text-base text-[#44474d] mb-6">Current cache efficiency: 94.8%. Frequent purges maintain low latency.</p>
                <div className="p-4 bg-[#fbf9f8] rounded-lg border border-[#e4e2e2] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Cache Volume</span>
                    <span className="font-body-md text-base font-bold">12.4 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Last Purge</span>
                    <span className="font-body-md text-base">2h 14m ago</span>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full py-3 bg-primary text-white font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined scale-90">delete_sweep</span>
                Purge All Cache
              </button>
            </div>
            
          </div>

          {/* Asset Breakdown List */}
          <div className="bg-white rounded-xl overflow-hidden shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#eae8e7]">
            <div className="px-8 py-6 border-b border-[#eae8e7] flex justify-between items-center">
              <h3 className="font-headline-sm text-2xl font-bold text-primary">Localized Asset Breakdown</h3>
              <button className="px-3 py-1 text-[#44474d] border border-[#c5c6cd] rounded-md hover:bg-[#fbf9f8] transition-colors">
                <span className="material-symbols-outlined scale-90">filter_list</span>
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#f5f3f3]">
                <tr>
                  <th className="px-8 py-4 font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">File Count</th>
                  <th className="px-8 py-4 font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">Weight</th>
                  <th className="px-8 py-4 font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">Hot Storage</th>
                  <th className="px-8 py-4 font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e7]">
                
                {/* Images */}
                <tr className="hover:bg-[#fbf9f8] transition-colors cursor-pointer group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#fed488]/30 flex items-center justify-center text-[#775a19]">
                        <span className="material-symbols-outlined">image</span>
                      </div>
                      <div>
                        <p className="font-body-md text-base font-semibold">High-Res Media</p>
                        <p className="text-[12px] text-[#44474d]">JPG, PNG, WebP</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-body-md text-base">24,512</td>
                  <td className="px-8 py-6 font-body-md text-base">842.1 GB</td>
                  <td className="px-8 py-6">
                    <div className="w-24 h-1.5 bg-[#efeded] rounded-full overflow-hidden">
                      <div className="h-full bg-[#775a19]" style={{ width: '90%' }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="p-2 text-[#75777e] hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </td>
                </tr>

                {/* Videos */}
                <tr className="hover:bg-[#fbf9f8] transition-colors cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0d1c32]/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">movie</span>
                      </div>
                      <div>
                        <p className="font-body-md text-base font-semibold">Event Footnotes</p>
                        <p className="text-[12px] text-[#44474d]">MP4, MOV (4K)</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-body-md text-base">1,104</td>
                  <td className="px-8 py-6 font-body-md text-base">702.4 GB</td>
                  <td className="px-8 py-6">
                    <div className="w-24 h-1.5 bg-[#efeded] rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="p-2 text-[#75777e] hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </td>
                </tr>

                {/* Logs */}
                <tr className="hover:bg-[#fbf9f8] transition-colors cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#e4e2e2] flex items-center justify-center text-[#44474d]">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div>
                        <p className="font-body-md text-base font-semibold">Operational Logs</p>
                        <p className="text-[12px] text-[#44474d]">System traces & Audits</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-body-md text-base">115,000+</td>
                  <td className="px-8 py-6 font-body-md text-base">420.0 GB</td>
                  <td className="px-8 py-6">
                    <div className="w-24 h-1.5 bg-[#efeded] rounded-full overflow-hidden">
                      <div className="h-full bg-[#76849f]" style={{ width: '20%' }}></div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="p-2 text-[#75777e] hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          
          {/* Footnote / Status */}
          <div className="flex justify-between items-center pt-8 opacity-60 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">Cluster Status: Healthy</span>
            </div>
            <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">Auto-archiving enabled for files &gt; 180 days</span>
          </div>

        </main>
      </div>
    </div>
  );
}
