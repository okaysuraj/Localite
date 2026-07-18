import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventReminderDetailPage() {
  const navigate = useNavigate();
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes(prev => {
        if (prev === 0) {
          if (hours > 0) {
            setHours(h => h - 1);
            return 59;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [hours]);

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen selection:bg-[#ffdea5] selection:text-[#261900] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky bg-[#fbf9f8] shadow-sm flex justify-between items-center h-20 px-8 z-50">
        <div className="flex items-center gap-8 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-8">
            <span className="font-headline-md text-3xl font-bold text-primary select-none cursor-pointer" onClick={() => navigate('/')}>Localite</span>
            <nav className="hidden md:flex items-center gap-6 ml-8">
              <a className="text-[#44474d] font-medium hover:text-[#775a19] transition-colors duration-300 font-body-md cursor-pointer" onClick={() => navigate('/dashboard/host')}>Home</a>
              <a className="text-primary font-bold border-b-2 border-[#e9c176] hover:text-[#775a19] transition-colors duration-300 font-body-md cursor-pointer" onClick={() => navigate('/events')}>My Events</a>
              <a className="text-[#44474d] font-medium hover:text-[#775a19] transition-colors duration-300 font-body-md cursor-pointer" onClick={() => navigate('/events')}>Explore</a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d]">search</span>
              <input className="pl-10 pr-4 py-2 bg-[#f5f3f3] border-none rounded-full w-64 focus:ring-1 focus:ring-[#e9c176] transition-all outline-none" placeholder="Search experiences..." type="text"/>
            </div>
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-primary cursor-pointer transition-transform active:scale-95">notifications</button>
              <button className="material-symbols-outlined text-primary cursor-pointer transition-transform active:scale-95">mail</button>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer transition-transform active:scale-95" onClick={() => navigate('/profile/setup/final')}>
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwNnZHYuouQhIiA007cdolg0ywPMy-vdhuHmslEWxweqjQ8hmy_NjWb5DHPfXfUhPW08uIHWvQh-1r8NQOTNf-WF_9iC3CvKwgCZZKzejVqAX6oQehT-RsvnZ5RUI1a5orKKQatqN10wx-T9UvVAF8NUUWqcnbmn0V503wX6o51aVW0kUX4jPZ7oyt97HyG0CBPW74mfPNTZrIRI-lCBvqW9mvu6OmoHA-xNSQn3jWoQ-9-LybeQWQ3g" alt="Profile"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFVNk7mclz3rYRLmirV_YfIM4-mDV6JLmXDBuQcM9s2DImaQ2X8a5iQaPLSYcPu2EELeLi6d2f7QfJl5nVyb4tPZU5LK6xXjCrDsaTJk0iz082Yki17s3jDdFD7WIegtw2iv6F_cRo2S_2d2TdOgPatmEnjO5ZRnBuA0ZPfA8RykLm9F39fllbjWOIoS_ON2pRaa95MSgzpq8lOygivs1zAUyELQw7rn-n7EOWqesI-tbOi2eKah5hgA')" }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#fbf9f8]"></div>
          </div>
          
          {/* Floating Back Action */}
          <div className="absolute top-8 left-8 z-20">
            <button className="flex items-center gap-2 text-[#1b1c1c] hover:text-[#775a19] transition-all duration-300 group" onClick={() => navigate('/dashboard/host')}>
              <span className="material-symbols-outlined bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm group-hover:bg-primary group-hover:text-white">arrow_back</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-white">Back to Dashboard</span>
            </button>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex flex-col justify-end pb-12">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-[#ffdea5] text-[#261900] font-label-caps text-[10px] font-bold uppercase tracking-[0.2em] mb-4 rounded-sm">Confidential Invitation</span>
              <h1 className="font-display-lg text-5xl font-bold text-white mb-2 leading-tight">The Winter Masquerade</h1>
              <p className="font-body-lg text-white/90 italic border-l-2 border-[#e9c176] pl-4 text-lg">A night of curated mystery at the Palais Garnier.</p>
            </div>
          </div>
        </section>

        {/* Focus Content */}
        <section className="max-w-7xl mx-auto px-8 -mt-24 pb-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Central Focused Card */}
            <div className="lg:col-span-7 bg-white p-10 rounded-xl shadow-lg border border-[#e4e2e2]/50 backdrop-blur-md">
              <div className="flex flex-col gap-8">
                
                {/* Countdown Row */}
                <div className="flex items-center justify-between border-b border-[#e4e2e2] pb-6">
                  <div>
                    <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#775a19] animate-pulse"></span>
                      <h3 className="font-headline-sm text-2xl font-bold text-primary">Arriving in {hours} hours</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase mb-1">Entry Opens</p>
                    <p className="font-body-md font-bold text-primary text-lg">20:00 CET</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase">Location</p>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#775a19] pt-1">location_on</span>
                      <div>
                        <p className="font-body-md font-bold text-primary">Palais Garnier</p>
                        <p className="font-body-md text-[#44474d]">Place de l'Opéra, 75009 Paris</p>
                        <a className="text-[#775a19] font-label-caps text-[10px] font-bold underline tracking-widest mt-2 inline-block cursor-pointer">OPEN IN MAPS</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase">Attire Code</p>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#775a19] pt-1">checkroom</span>
                      <div>
                        <p className="font-body-md font-bold text-primary">Black Tie & Mask Required</p>
                        <p className="font-body-md text-[#44474d]">Formal evening wear with an Venetian-style mask.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main CTA */}
                <div className="mt-4">
                  <button className="w-full bg-primary text-white py-6 rounded-lg font-label-caps text-[12px] font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#44474d] hover:shadow-xl active:scale-95 flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined">confirmation_number</span>
                    View Entry Pass
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Actions & Info */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Concierge Card */}
              <div className="bg-[#0d1c32] p-8 rounded-xl shadow-sm text-[#76849f] relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-headline-sm text-2xl font-bold text-[#d6e3ff] mb-2">Dedicated Concierge</h4>
                  <p className="font-body-md mb-6 opacity-80 text-white">Your personal host is available to assist with valet, seating requests, or last-minute adjustments.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 px-4 font-label-caps text-[12px] font-bold transition-all duration-300 rounded flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">support_agent</span>
                      Contact Host
                    </button>
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 px-4 font-label-caps text-[12px] font-bold transition-all duration-300 rounded flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">edit</span>
                      Modify Booking
                    </button>
                  </div>
                </div>
                {/* Abstract glow effect */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#775a19]/20 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700"></div>
              </div>

              {/* Weather/Context Info */}
              <div className="bg-[#eae8e7] p-6 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[#775a19]">cloudy_snowing</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase">Evening Forecast</p>
                    <p className="font-body-md font-bold text-primary">2°C | Light Snow</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase">Valet Available</p>
                  <p className="font-body-md font-bold text-[#775a19]">Yes</p>
                </div>
              </div>

              {/* Location Mini Map */}
              <div className="relative h-48 rounded-xl overflow-hidden shadow-sm border border-[#e4e2e2]">
                <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAP0IiBpqWbxEfmwTavBhWXoZDRffwGGtjMaKubVV1tHBYSvYdqmSrdW_vXV41kz6aJS4LiptJiHjvY6gCUTjs35HgNClUK1z66aODiL7QToOZss-BAKiQmyrrZiDe9j6qtBrf9SH6BfONN2rFlv0WwKjhmIZao9myo8Ptg4CXOKfSI0C7Wt41MlW74C6HVMSUhPVOM2ThBPX5rsJWwBJRAUbAfoqY8phV5hib07vbHVG5L03jp8E1rnA')" }}>
                </div>
                <div className="absolute inset-0 bg-primary/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <span className="material-symbols-outlined text-[#775a19]">location_on</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Attendance & Preferences */}
        <section className="max-w-7xl mx-auto px-8 py-12 border-t border-[#e4e2e2]/50">
          <h2 className="font-headline-sm text-2xl font-bold mb-6 text-primary">Event Essentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-[#e4e2e2]/30">
              <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase mb-3">Your Table</p>
              <p className="font-headline-sm text-2xl font-bold text-primary">Etoile 04</p>
              <p className="font-body-md text-[#44474d] mt-2 text-sm">Preferred seating near the main stage confirmed.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-[#e4e2e2]/30">
              <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase mb-3">Dietary</p>
              <p className="font-headline-sm text-2xl font-bold text-primary">Pescatarian</p>
              <p className="font-body-md text-[#44474d] mt-2 text-sm">Chef prepared alternatives available upon arrival.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-[#e4e2e2]/30">
              <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase mb-3">Plus One</p>
              <p className="font-headline-sm text-2xl font-bold text-primary">Confirmed</p>
              <p className="font-body-md text-[#44474d] mt-2 text-sm">Guest: Isabella Valentine</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-[#e4e2e2]/30">
              <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase mb-3">Photography</p>
              <p className="font-headline-sm text-2xl font-bold text-primary">Private</p>
              <p className="font-body-md text-[#44474d] mt-2 text-sm">Official event photos will be shared discreetly.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5f3f3] border-t border-[#e4e2e2] mt-12 py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-headline-sm text-2xl font-bold text-primary mb-2">Localite</span>
            <p className="font-body-md text-[#44474d] opacity-60 text-sm">The pinnacle of local discovery.</p>
          </div>
          <div className="flex gap-6">
            <a className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary cursor-pointer">Privacy</a>
            <a className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary cursor-pointer">Concierge Terms</a>
            <a className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#44474d] hover:text-primary cursor-pointer">Support</a>
          </div>
          <div className="text-right hidden md:block">
            <p className="font-label-caps text-[10px] font-bold text-[#44474d] opacity-40 uppercase">© 2024 Localite Experiences Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
