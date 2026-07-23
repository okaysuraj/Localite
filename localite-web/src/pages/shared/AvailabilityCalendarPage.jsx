import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AvailabilityCalendarPage() {
  const navigate = useNavigate();

  // Simple state to simulate grid clicks
  const [activeSlots, setActiveSlots] = useState({
    'Mon-M': false, 'Mon-A': false, 'Mon-E': true,
    'Tue-M': false, 'Tue-A': false, 'Tue-E': true,
    'Wed-M': false, 'Wed-A': false, 'Wed-E': true,
    'Thu-M': false, 'Thu-A': true,  'Thu-E': false,
    'Fri-M': false, 'Fri-A': true,  'Fri-E': true,
    'Sat-M': false, 'Sat-A': false, 'Sat-E': true,
    'Sun-M': false, 'Sun-A': false, 'Sun-E': false,
  });

  const toggleSlot = (key) => {
    setActiveSlots(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = ['12', '13', '14', '15', '16', '17', '18'];

  const SlotButton = ({ day, timeCode, icon, iconActive }) => {
    const key = `${day}-${timeCode}`;
    const isActive = activeSlots[key];
    
    return (
      <button 
        className={`p-8 border-r border-outline-variant/10 transition-all flex flex-col items-center justify-center gap-1 active:scale-95 ${isActive ? 'bg-[#0d1c32] text-white' : 'hover:border-[#775a19] hover:bg-[#f5f3f3]'}`}
        onClick={() => toggleSlot(key)}
      >
        <span className="material-symbols-outlined text-[20px]">
          {isActive ? iconActive : icon}
        </span>
      </button>
    );
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky z-50 bg-[#fbf9f8] shadow-sm">
        <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-headline-md text-3xl font-bold tracking-tighter text-primary cursor-pointer" onClick={() => navigate('/')}>Localite</span>
            <nav className="hidden md:flex gap-6 ml-8">
              <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/events')}>Events</a>
              <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/team/formation')}>Members</a>
              <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/map')}>Hubs</a>
              <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-primary border-b-2 border-[#775a19] pb-1 cursor-pointer">Concierge</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-[#f5f3f3] px-4 py-2 rounded-full border border-[#c5c6cd]/30">
              <span className="material-symbols-outlined text-[#75777e] text-[20px] mr-2">search</span>
              <input className="bg-transparent border-none focus:ring-0 font-body-md text-sm placeholder:text-[#c5c6cd] w-48 outline-none" placeholder="Search members..." type="text"/>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#44474d] cursor-pointer hover:text-[#775a19] transition-all">notifications</span>
              <span className="material-symbols-outlined text-[#44474d] cursor-pointer hover:text-[#775a19] transition-all">chat_bubble</span>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8uGY4-2mxhbK3HAAFx9zfXKE_8h70cOgO2NVdKsL8D-yoz6hH3t1_1EsHxH2w6kryNDTo6YgJEqEc2UmZuj44fFx5P_poecHxNEMEX6zXaVaUEVwm7rHDWxwxq8_SNAChFhs3b2C95_5-iB0w2bdh6CzE5kNRC5Iw23UGjyNsjDBaffr_D0qEZM7wUdT73eo5N0jmrjKoKq3SVPAa6E6seyoELQmJN_Anw4IZk6JzzOUxR6mgK0lOcA" alt="Profile"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 h-fit sticky top-24 bg-white border border-[#c5c6cd]/20 rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h2 className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#775a19] mb-2">Concierge Panel</h2>
            <div className="flex items-center gap-3 p-2 bg-[#efeded] rounded-lg">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              <span className="font-body-md font-bold">Scheduling</span>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 p-3 text-[#44474d] hover:bg-[#f5f3f3] rounded-xl transition-all cursor-pointer" onClick={() => navigate('/dashboard/host')}>
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-body-md">Overview</span>
            </a>
            <a className="flex items-center gap-3 p-3 bg-[#fed488] text-[#785a1a] rounded-xl cursor-pointer">
              <span className="material-symbols-outlined">event_available</span>
              <span className="font-body-md font-bold">Availability</span>
            </a>
            <a className="flex items-center gap-3 p-3 text-[#44474d] hover:bg-[#f5f3f3] rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined">group</span>
              <span className="font-body-md">Member Sync</span>
            </a>
            <a className="flex items-center gap-3 p-3 text-[#44474d] hover:bg-[#f5f3f3] rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-body-md">Preferences</span>
            </a>
          </nav>
          
          <div className="mt-12 pt-6 border-t border-[#c5c6cd]/20">
            {/* Pro Tip Box */}
            <div className="bg-[#ffdea5]/30 p-4 rounded-xl border border-[#775a19]/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#775a19] text-lg">lightbulb</span>
                <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#775a19]">Pro Tip</span>
              </div>
              <p className="font-body-md text-[#785a1a] text-sm leading-relaxed">
                Opening evening slots on Thursdays increases your high-tier discovery rate by 42%.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <div className="flex-1">
          <header className="mb-6">
            <h1 className="font-headline-md text-4xl font-bold text-primary mb-2">Weekly Availability</h1>
            <p className="font-body-md text-[#44474d]">Set your preferred gathering windows to streamline concierge matchmaking.</p>
          </header>

          {/* Calendar Grid Card */}
          <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-[#eae8e7]">
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b border-[#c5c6cd]/20">
              <div className="p-4 border-r border-[#c5c6cd]/20 bg-[#f5f3f3]"></div>
              {days.map((day, idx) => (
                <div key={day} className={`p-4 text-center ${idx < 6 ? 'border-r border-[#c5c6cd]/20' : ''}`}>
                  <span className={`font-label-caps text-[12px] font-bold uppercase tracking-widest block ${day === 'Thu' ? 'text-primary' : 'text-[#75777e]'}`}>{day}</span>
                  <span className={`font-headline-sm text-2xl font-bold ${day === 'Thu' ? 'text-[#775a19]' : ''}`}>{dates[idx]}</span>
                </div>
              ))}
            </div>

            {/* Morning Row */}
            <div className="grid grid-cols-8 border-b border-[#c5c6cd]/20 group">
              <div className="p-6 flex items-center justify-center border-r border-[#c5c6cd]/20 bg-[#f5f3f3]/50">
                <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#75777e] -rotate-90">Morning</span>
              </div>
              {days.map((day) => (
                <SlotButton key={`m-${day}`} day={day} timeCode="M" icon="sunny" iconActive="check_circle" />
              ))}
            </div>

            {/* Afternoon Row */}
            <div className="grid grid-cols-8 border-b border-[#c5c6cd]/20 group">
              <div className="p-6 flex items-center justify-center border-r border-[#c5c6cd]/20 bg-[#f5f3f3]/50">
                <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#75777e] -rotate-90">Afternoon</span>
              </div>
              {days.map((day) => (
                <SlotButton key={`a-${day}`} day={day} timeCode="A" icon="wb_twilight" iconActive="check_circle" />
              ))}
            </div>

            {/* Evening Row */}
            <div className="grid grid-cols-8 group">
              <div className="p-6 flex items-center justify-center border-r border-[#c5c6cd]/20 bg-[#f5f3f3]/50">
                <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#75777e] -rotate-90">Evening</span>
              </div>
              {days.map((day) => (
                <SlotButton key={`e-${day}`} day={day} timeCode="E" icon="dark_mode" iconActive="check_circle" />
              ))}
            </div>
          </section>

          {/* Bottom Sections: Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Notification Tiers */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#eae8e7]">
              <h3 className="font-headline-sm text-2xl font-bold mb-4">Notification Tiers</h3>
              <div className="space-y-4">
                <label className="flex items-start gap-4 p-4 border border-[#c5c6cd]/40 rounded-xl cursor-pointer hover:bg-[#f5f3f3] transition-colors">
                  <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded border-[#75777e] text-primary focus:ring-primary cursor-pointer"/>
                  <div>
                    <span className="font-body-md font-bold block">Priority Sync</span>
                    <span className="font-body-md text-sm text-[#44474d]">Instant alerts for exclusive private events and high-tier member requests.</span>
                  </div>
                </label>
                <label className="flex items-start gap-4 p-4 border border-[#c5c6cd]/40 rounded-xl cursor-pointer hover:bg-[#f5f3f3] transition-colors">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-[#75777e] text-primary focus:ring-primary cursor-pointer"/>
                  <div>
                    <span className="font-body-md font-bold block">Guest Discovery</span>
                    <span className="font-body-md text-sm text-[#44474d]">Receive weekly digests of new members matching your interests.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Sync Controls */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline-sm text-2xl font-bold text-white">Calendar Sync</h3>
                  <span className="material-symbols-outlined text-[#ffdea5]">sync</span>
                </div>
                <p className="font-body-md text-[#76849f] mb-6">Connect your external calendar to automatically block out busy periods and avoid double bookings.</p>
                
                <div className="flex flex-wrap gap-3">
                  <div className="bg-[#eae8e7]/10 px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 cursor-pointer hover:bg-[#eae8e7]/20 transition-colors">
                    <span className="material-symbols-outlined text-sm">link</span>
                    <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">Google Calendar</span>
                  </div>
                  <div className="bg-[#eae8e7]/10 px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 cursor-pointer hover:bg-[#eae8e7]/20 transition-colors">
                    <span className="material-symbols-outlined text-sm">link</span>
                    <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">Apple iCal</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-8 bg-[#775a19] py-4 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#fed488] hover:text-[#785a1a] transition-all active:scale-95 text-white w-full">
                Save Changes & Update Schedule
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-12 bg-[#eae8e7] border-t border-[#c5c6cd]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <span className="font-headline-sm text-2xl font-bold text-primary">Localite</span>
            <p className="font-body-md text-sm text-[#44474d] mt-1">© 2024 Localite. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] underline transition-all cursor-pointer">Privacy Policy</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] underline transition-all cursor-pointer">Terms of Service</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] underline transition-all cursor-pointer">Community Guidelines</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] underline transition-all cursor-pointer">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
