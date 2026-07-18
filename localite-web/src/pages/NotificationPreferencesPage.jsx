import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationPreferencesPage() {
  const navigate = useNavigate();
  const [hubPush, setHubPush] = useState(true);
  const [hubEmail, setHubEmail] = useState(false);
  
  const [eventActivity, setEventActivity] = useState(true);
  const [eventLocation, setEventLocation] = useState(true);
  const [remind24h, setRemind24h] = useState(false);
  const [remind1h, setRemind1h] = useState(true);

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fbf9f8] shadow-sm">
        <div className="flex items-center gap-6">
          <span className="font-headline-sm text-2xl font-bold text-primary tracking-tight cursor-pointer" onClick={() => navigate('/')}>Localite</span>
          <nav className="hidden md:flex gap-8 ml-12">
            <a className="text-[#44474d] font-medium hover:text-primary transition-colors duration-200 font-label-caps text-[12px] font-bold uppercase cursor-pointer">Marketplace</a>
            <a className="text-[#44474d] font-medium hover:text-primary transition-colors duration-200 font-label-caps text-[12px] font-bold uppercase cursor-pointer" onClick={() => navigate('/events')}>Experiences</a>
            <a className="text-[#44474d] font-medium hover:text-primary transition-colors duration-200 font-label-caps text-[12px] font-bold uppercase cursor-pointer">Clubs</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <span className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-transform">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#775a19] rounded-full border-2 border-[#fbf9f8]"></span>
          </div>
          <span className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-transform">settings</span>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxpgE3U9GZ5jVKFhj3GrPm2eete9uMWZPl0AfgjjZuiV_3hWgZ6AsiGcY2jsWaK2Q2mqaUB_7_EtnRLEK-6vBm62aArYfVdtFbXYEn0BY6HEVXHmxApk6IkmAwO7qM2Dtz5as3fYSESqHtpNLZHT3yYkCvZBmsgAA8gRVxr7dLkTlilXw3ihMZm9FMR8NKXOSUPuv4nJK1OyUAlN0atrmHST8FQ63K2DGCn8TgnRgBUxDBiUYg_e8C_A" alt="Profile" />
          </div>
        </div>
      </header>

      <div className="flex pt-16 h-screen overflow-hidden">
        {/* Side Navigation Bar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 py-8 px-4 flex flex-col z-40 bg-[#f5f3f3]">
          <div className="mb-10 px-4">
            <h2 className="font-headline-sm text-2xl font-bold text-primary">Localite Elite</h2>
            <p className="font-body-md text-[#44474d] opacity-70 text-sm">Premium Concierge</p>
          </div>
          <nav className="flex-1 space-y-2">
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer" onClick={() => navigate('/events')}>
              <span className="material-symbols-outlined group-hover:text-primary">event</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Gatherings</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer">
              <span className="material-symbols-outlined group-hover:text-primary">sports_tennis</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Sports Hub</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer">
              <span className="material-symbols-outlined group-hover:text-primary">group</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Members</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer" onClick={() => navigate('/dashboard/insights')}>
              <span className="material-symbols-outlined group-hover:text-primary">insights</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Analytics</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-primary bg-[#fbf9f8] rounded-lg shadow-sm font-bold border-l-4 border-primary cursor-pointer">
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Settings</span>
            </a>
          </nav>
          <div className="mt-auto space-y-2 border-t border-[#c5c6cd] pt-6">
            <a className="flex items-center gap-4 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] rounded-lg transition-all group cursor-pointer">
              <span className="material-symbols-outlined">help_outline</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Help Center</span>
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-all group cursor-pointer">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Log Out</span>
            </a>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="ml-64 flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-12 pb-12">
            
            {/* Header Section */}
            <header className="space-y-2">
              <h1 className="font-display-lg text-5xl font-bold text-primary">Notification Preferences</h1>
              <p className="font-body-lg text-[#44474d] max-w-2xl text-lg">Curate your digital experience. Choose how and when you want to receive updates from your local community and elite circles.</p>
            </header>

            {/* Configuration Workspace */}
            <div className="space-y-8">
              
              {/* Hub Invites Category */}
              <section className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-8 border border-[#efeded]">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#efeded] rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#775a19]">mail</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-2xl font-bold text-primary">Hub Invites</h3>
                      <p className="font-body-md text-[#44474d] opacity-70">Direct invitations to join new private communities and elite local hubs.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-body-md font-semibold text-primary">Push Notifications</p>
                      <p className="text-sm text-[#44474d]">Instant alerts for time-sensitive invitations.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={hubPush} 
                        onChange={() => setHubPush(!hubPush)} 
                      />
                      <div className={`w-11 h-5 rounded-full transition-colors duration-200 ${hubPush ? 'bg-primary' : 'bg-[#e4e2e2]'}`}>
                        <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 shadow-sm ${hubPush ? 'translate-x-[24px]' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-[#c5c6cd]/30">
                    <div>
                      <p className="font-body-md font-semibold text-primary">Email Summaries</p>
                      <p className="text-sm text-[#44474d]">Weekly digests of all pending hub memberships.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={hubEmail} 
                        onChange={() => setHubEmail(!hubEmail)} 
                      />
                      <div className={`w-11 h-5 rounded-full transition-colors duration-200 ${hubEmail ? 'bg-primary' : 'bg-[#e4e2e2]'}`}>
                        <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 shadow-sm ${hubEmail ? 'translate-x-[24px]' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Event Updates Category */}
              <section className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-8 border border-[#efeded]">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#efeded] rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#775a19]">event_note</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-2xl font-bold text-primary">Event Updates</h3>
                      <p className="font-body-md text-[#44474d] opacity-70">Status changes, location reveals, and attendee confirmations.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="font-label-caps text-[12px] font-bold text-[#775a19] tracking-widest uppercase">REAL-TIME</p>
                    <div 
                      className="p-4 bg-[#fbf9f8] rounded-lg border border-[#c5c6cd]/50 flex items-center justify-between cursor-pointer hover:bg-[#efeded] transition-colors"
                      onClick={() => setEventActivity(!eventActivity)}
                    >
                      <span className="text-sm font-medium">New RSVP Activity</span>
                      <span className={`material-symbols-outlined scale-90 ${eventActivity ? 'text-primary' : 'text-[#75777e]'}`} style={eventActivity ? {fontVariationSettings: "'FILL' 1"} : {}}>{eventActivity ? 'check_circle' : 'radio_button_unchecked'}</span>
                    </div>
                    <div 
                      className="p-4 bg-[#fbf9f8] rounded-lg border border-[#c5c6cd]/50 flex items-center justify-between cursor-pointer hover:bg-[#efeded] transition-colors"
                      onClick={() => setEventLocation(!eventLocation)}
                    >
                      <span className="text-sm font-medium">Location Revealed</span>
                      <span className={`material-symbols-outlined scale-90 ${eventLocation ? 'text-primary' : 'text-[#75777e]'}`} style={eventLocation ? {fontVariationSettings: "'FILL' 1"} : {}}>{eventLocation ? 'check_circle' : 'radio_button_unchecked'}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="font-label-caps text-[12px] font-bold text-[#775a19] tracking-widest uppercase">REMINDERS</p>
                    <div 
                      className="p-4 bg-[#fbf9f8] rounded-lg border border-[#c5c6cd]/50 flex items-center justify-between cursor-pointer hover:bg-[#efeded] transition-colors"
                      onClick={() => setRemind24h(!remind24h)}
                    >
                      <span className="text-sm font-medium">24h Before Start</span>
                      <span className={`material-symbols-outlined scale-90 ${remind24h ? 'text-primary' : 'text-[#75777e]'}`} style={remind24h ? {fontVariationSettings: "'FILL' 1"} : {}}>{remind24h ? 'check_circle' : 'radio_button_unchecked'}</span>
                    </div>
                    <div 
                      className="p-4 bg-[#fbf9f8] rounded-lg border border-[#c5c6cd]/50 flex items-center justify-between cursor-pointer hover:bg-[#efeded] transition-colors"
                      onClick={() => setRemind1h(!remind1h)}
                    >
                      <span className="text-sm font-medium">1h Before Start</span>
                      <span className={`material-symbols-outlined scale-90 ${remind1h ? 'text-primary' : 'text-[#75777e]'}`} style={remind1h ? {fontVariationSettings: "'FILL' 1"} : {}}>{remind1h ? 'check_circle' : 'radio_button_unchecked'}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Direct Messages Category */}
              <section className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-8 border border-[#efeded]">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#efeded] rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#775a19]">chat_bubble</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-2xl font-bold text-primary">Direct Messages</h3>
                      <p className="font-body-md text-[#44474d] opacity-70">Conversations with members and concierge support.</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button className="px-6 py-3 bg-primary text-white font-label-caps text-[12px] font-bold tracking-widest uppercase rounded-sm hover:opacity-90 active:scale-95 transition-all">Enable Desktop Audio</button>
                  <button className="px-6 py-3 border border-[#775a19] text-[#775a19] font-label-caps text-[12px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#775a19]/5 transition-all">Manage Chat Rules</button>
                </div>
              </section>

              {/* Community Announcements */}
              <section className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-8 border border-[#efeded]">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#efeded] rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#775a19]">campaign</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-2xl font-bold text-primary">Community Announcements</h3>
                      <p className="font-body-md text-[#44474d] opacity-70">Stay informed about elite circle news and neighborhood events.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-[#fbf9f8] border-l-4 border-[#775a19] rounded-r-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-body-md font-bold">Important Broadcasts</span>
                      <span className="text-[10px] font-label-caps font-bold text-[#775a19] tracking-widest uppercase bg-[#fed488] px-2 py-1 rounded">Always On</span>
                    </div>
                    <p className="text-sm text-[#44474d] mt-2">Critical updates regarding club status or urgent security alerts.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-[#c5c6cd]">
              <button className="text-[#44474d] font-label-caps text-[12px] font-bold tracking-widest uppercase hover:text-primary transition-colors">Discard Changes</button>
              <button className="px-12 py-4 bg-primary text-white font-label-caps text-[12px] font-bold tracking-widest uppercase rounded-sm shadow-md hover:shadow-xl active:scale-95 transition-all">Save Changes</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
