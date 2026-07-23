import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AttendanceCheckInPage() {
  const navigate = useNavigate();
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleValidate = () => {
    setIsCheckingIn(true);
    setTimeout(() => {
      setIsCheckingIn(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-surface min-h-screen text-on-surface font-body-md flex flex-col">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-background border-b border-outline-variant shadow-sm">
        <div className="font-headline-md text-headline-md font-bold text-primary tracking-tight">ELITE CIRCLE</div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#">Dashboard</a>
          <a className="font-label-caps text-label-caps text-primary border-b-2 border-secondary pb-1" href="#">Events</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#">Circles</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors" href="#">Concierge</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary px-6 py-2 font-label-caps text-label-caps rounded-xl hover:opacity-80 transition-all uppercase">
            Create Event
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant">
            <img 
              className="w-full h-full object-cover" 
              src="https://via.placeholder.com/100" 
              alt="Profile" 
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col w-64 bg-surface-container-low border-r border-outline-variant pt-12 pb-8 px-4 gap-2">
          <div className="px-4 mb-6">
            <p className="font-label-caps text-label-caps text-secondary uppercase">Host Admin</p>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Managing Gala 2024</h3>
          </div>
          <nav className="flex-1 space-y-2">
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps text-label-caps">Overview</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 bg-primary text-on-primary rounded-lg font-bold shadow-md transform translate-x-1 transition-transform" href="#">
              <span className="material-symbols-outlined">group</span>
              <span className="font-label-caps text-label-caps">Guest List</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">explore</span>
              <span className="font-label-caps text-label-caps">Map Tracking</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
              <span className="material-symbols-outlined">poll</span>
              <span className="font-label-caps text-label-caps">Live Polling</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-12">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Page Header */}
            <div className="text-center space-y-2">
              <h1 className="font-display-lg text-display-lg text-primary">Arrival Management</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">Welcome to the Midnight Gala. Please present this portal to the host concierge upon entry.</p>
            </div>

            {/* Central Check-In Bento */}
            <div className="grid grid-cols-12 gap-6">
              
              {/* QR Entry Card */}
              <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-xl p-12 shadow-[0_16px_32px_-4px_rgba(10,25,47,0.08)] flex flex-col items-center justify-center border border-outline-variant/30 hover:border-secondary/40 transition-colors">
                <div className="font-label-caps text-label-caps text-secondary mb-8">SECURE ACCESS PASS</div>
                
                <div className="relative p-6 bg-white border-2 border-primary rounded-xl mb-8">
                  <div className="w-64 h-64 bg-background relative overflow-hidden flex items-center justify-center border-dashed border-2 border-outline/30 rounded-lg">
                    <span className="material-symbols-outlined text-8xl text-primary/80">qr_code_2</span>
                    <div className="absolute bg-white p-2 rounded-full border border-primary">
                      <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="font-headline-sm text-headline-sm text-primary">JULIAN VANCE-ROSS</h2>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">MEMBER ID: #EC-992-B</p>
                </div>

                <div className="mt-8 flex gap-4 w-full">
                  <button 
                    onClick={handleValidate}
                    disabled={isCheckingIn}
                    className="flex-1 bg-primary text-on-primary py-4 font-label-caps text-label-caps rounded-xl hover:scale-[0.99] transition-transform active:scale-95"
                  >
                    {isCheckingIn ? 'VALIDATING...' : success ? 'ENTRY GRANTED' : 'VALIDATE ENTRY'}
                  </button>
                  <button className="px-6 border border-outline text-primary rounded-xl hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">print</span>
                  </button>
                </div>
              </div>

              {/* Guest Protocol & Stats Card */}
              <div className="col-span-12 lg:col-span-5 space-y-6">
                
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30">
                  <h3 className="font-label-caps text-label-caps text-secondary mb-4">ARRIVAL DATA</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-lg border border-outline-variant/20">
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">TIME</p>
                      <p className="font-headline-sm text-headline-sm text-primary">20:14</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-outline-variant/20">
                      <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">PARTY</p>
                      <p className="font-headline-sm text-headline-sm text-primary">02</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 flex-1">
                  <div className="h-32 bg-surface-container-highest" />
                  <div className="p-6 space-y-4">
                    <h3 className="font-headline-sm text-headline-sm text-primary">Guest Protocol</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span>
                        <div>
                          <p className="font-label-caps text-label-caps text-primary">DRESS CODE</p>
                          <p className="font-body-md text-sm text-on-surface-variant">Black Tie Optional. Sharp tailoring preferred.</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span>
                        <div>
                          <p className="font-label-caps text-label-caps text-primary">VALET SERVICE</p>
                          <p className="font-body-md text-sm text-on-surface-variant">Complimentary secure parking at the North Entrance.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* Secondary Info Row */}
              <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined">restaurant</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">DINING PREF</p>
                    <p className="font-body-md text-sm font-bold mt-1">Vegan, No Gluten</p>
                  </div>
                </div>
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                    <span className="material-symbols-outlined">workspace_premium</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">MEMBERSHIP</p>
                    <p className="font-body-md text-sm font-bold mt-1">Gold Tier Founder</p>
                  </div>
                </div>
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined">local_bar</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">TABLE ASSIGN</p>
                    <p className="font-body-md text-sm font-bold mt-1">Terrace, Row 04</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
