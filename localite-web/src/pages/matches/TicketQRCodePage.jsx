import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TicketQRCodePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen text-on-background font-body-md flex flex-col">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-surface border-b border-outline-variant shadow-sm">
        <div className="flex items-center gap-8">
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Localite</span>
          <nav className="hidden md:flex items-center gap-6">
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#">Explore</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#">My Events</a>
            <a className="font-label-caps text-label-caps text-primary border-b-2 border-secondary pb-1" href="#">Entry Pass</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant">
            <img src="https://via.placeholder.com/100" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* Venue Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x800')" }} />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:grid md:grid-cols-12 gap-8">
          {/* Page Title */}
          <div className="col-span-12 mb-8">
            <h1 className="font-display-lg text-display-lg text-white">Entry Pass</h1>
            <p className="font-label-caps text-label-caps text-secondary-fixed-dim mt-2 tracking-widest uppercase">Confirmed Attendee • Invitation Only</p>
          </div>

          {/* Central Ticket Card */}
          <div className="col-span-12 lg:col-span-8 flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_16px_32px_rgba(10,25,47,0.15)] min-h-[500px]">
            {/* Left Section: Visual */}
            <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden bg-primary">
              <img src="https://via.placeholder.com/400x800" className="w-full h-full object-cover opacity-70" alt="Event" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="font-label-caps text-label-caps opacity-80 mb-2 tracking-widest uppercase">The Winter Gala</span>
                <h2 className="font-headline-sm text-[28px] leading-tight font-bold">The Winter Masquerade</h2>
              </div>
            </div>

            {/* Middle Section: Details */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed border-outline-variant/50">
              <div className="space-y-8">
                <div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant block mb-1 uppercase tracking-widest">Event Date & Time</span>
                  <p className="font-body-lg text-lg text-primary font-bold">Saturday, Dec 21 • 8:00 PM</p>
                </div>
                <div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant block mb-1 uppercase tracking-widest">Venue Location</span>
                  <p className="font-body-lg text-lg text-primary font-bold">Palais Garnier, Paris</p>
                  <p className="font-body-md text-sm text-on-surface-variant">Grand Ballroom, West Wing Entrance</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-label-caps text-[10px] text-on-surface-variant block mb-1 uppercase tracking-widest">Guest</span>
                    <p className="font-body-md text-sm text-primary font-bold">Julian Montgomery</p>
                  </div>
                  <div>
                    <span className="font-label-caps text-[10px] text-on-surface-variant block mb-1 uppercase tracking-widest">Tier</span>
                    <p className="font-body-md text-sm text-secondary font-bold">Gold Tier</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">confirmation_number</span>
                  <div>
                    <span className="font-label-caps text-[10px] text-on-surface-variant block tracking-widest uppercase">Pass ID</span>
                    <span className="font-body-md text-sm font-mono text-primary font-bold">#LM-2024-8842</span>
                  </div>
                </div>
                <button className="hidden md:block bg-primary text-white font-label-caps text-[10px] tracking-widest uppercase py-3 px-6 rounded-full hover:bg-secondary transition-all shadow-md">
                  Add to Wallet
                </button>
              </div>
            </div>

            {/* Right Section: QR */}
            <div className="md:w-64 bg-surface-container-low flex flex-col items-center justify-center p-8 relative">
              {/* Perforation holes */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white hidden md:block shadow-inner" />
              
              <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-outline-variant/30">
                <div className="w-32 h-32 flex items-center justify-center border-4 border-secondary/30 rounded-lg p-2 bg-gradient-to-br from-secondary/5 to-secondary/10">
                  <span className="material-symbols-outlined text-[80px] text-secondary">qr_code_2</span>
                </div>
              </div>
              <span className="font-label-caps text-[10px] text-on-surface-variant text-center tracking-widest uppercase leading-relaxed">Scan at Private Entrance</span>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border-l-4 border-secondary">
              <h3 className="font-headline-sm text-2xl mb-6">Admission Guidelines</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-secondary shrink-0">check_circle</span>
                  <div>
                    <p className="font-label-caps text-[11px] tracking-widest text-primary uppercase mb-1">Dress Code</p>
                    <p className="font-body-md text-sm text-on-surface-variant">Black Tie & Masquerade Mask Mandatory.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-secondary shrink-0">check_circle</span>
                  <div>
                    <p className="font-label-caps text-[11px] tracking-widest text-primary uppercase mb-1">Arrival</p>
                    <p className="font-body-md text-sm text-on-surface-variant">Valet service available from 7:30 PM.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary p-8 rounded-xl text-white shadow-lg">
              <h4 className="font-label-caps text-[11px] tracking-widest text-secondary-fixed uppercase mb-3">Gold Tier Perks</h4>
              <p className="font-body-md text-sm mb-6 opacity-90 italic leading-relaxed">
                "Access to the Royal Lounge & complimentary vintage champagne service."
              </p>
              <button className="w-full py-3 border border-secondary-fixed text-secondary-fixed font-label-caps text-[11px] tracking-widest uppercase rounded-full hover:bg-white/10 transition-colors">
                View Concierge
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
