import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HostDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex">
      {/* SideNavBar */}
      <aside className="h-screen w-64 sticky top-0 bg-surface-container-low flex flex-col p-6 gap-6 shadow-[4px_0_24px_rgba(10,25,47,0.03)] z-50 hidden md:flex">
        <div className="flex flex-col gap-2 mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[32px]">military_tech</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-2xl font-bold text-primary">The Registry</h2>
            <p className="font-label-caps text-[12px] uppercase text-on-surface-variant">Elite Membership</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-4 px-4 py-3 text-primary font-bold bg-surface-container-highest rounded-lg transition-all text-left">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-caps text-[12px] uppercase">Dashboard</span>
          </button>
          <button onClick={() => navigate('/events/catalog')} className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all text-left">
            <span className="material-symbols-outlined">event</span>
            <span className="font-label-caps text-[12px] uppercase">Events</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all text-left">
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-label-caps text-[12px] uppercase">Sports Stats</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all text-left">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="font-label-caps text-[12px] uppercase">Rankings</span>
          </button>
        </nav>
        
        <div className="mt-12">
          <button 
            onClick={() => navigate('/events/create')}
            className="w-full py-4 bg-primary text-white font-label-caps text-[12px] uppercase rounded-xl hover:opacity-90 transition-opacity"
          >
            Host New Event
          </button>
        </div>
        
        <div className="mt-auto flex flex-col gap-2">
          <button className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors text-left">
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-caps text-[12px] uppercase">Support</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-caps text-[12px] uppercase">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TopNavBar */}
        <header className="flex justify-between items-center w-full px-8 py-4 h-20 bg-surface shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <h1 className="font-headline-md text-3xl font-bold text-primary md:hidden">Regal Connection</h1>
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full w-64 focus:ring-1 focus:ring-secondary-container font-body-md text-sm outline-none" 
                placeholder="Search commands..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div 
              className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant cursor-pointer"
              onClick={() => navigate('/profile/setup/final')}
            >
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCwM8hCuf9U_2DzTiK_gD-eTSzwHkfajj9O8B7hfLU8okpaKNkB59TNmdGfNSBgKMyyVFSF92G1USHUq8BafAEPHiRT1GG7eYZYn6LUcYEPhLCqeDZKkWsYNGMLliNuCjNnul6aQNqjnEzVfQhYNNglvxpsAO5Ex1TrD_7ZSG8jrT_vYN5wS3G-MmSXu15YP8Jeo1-zhPULQlqZaNz11FMvMsnHWavzerkJs8UW0g7H2MRTad5u-upJg"
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* Content Shell */}
        <div className="px-6 md:px-8 py-12 flex flex-col gap-12 max-w-[1400px] w-full mx-auto">
          {/* Welcome Header */}
          <section>
            <h2 className="font-display-lg text-5xl font-bold text-primary mb-2">Host Command Center</h2>
            <p className="font-body-lg text-lg text-on-surface-variant">Curate excellence. Overview of your elite gathering ecosystem.</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Grid Column */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between h-40 border border-surface-container-high hover:-translate-y-1 transition-transform">
                  <span className="font-label-caps text-[12px] uppercase text-on-surface-variant">Active Events</span>
                  <div className="flex items-end justify-between">
                    <span className="font-headline-md text-4xl font-bold text-primary leading-none">12</span>
                    <span className="text-secondary font-bold text-sm">+2 this week</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between h-40 border border-surface-container-high hover:-translate-y-1 transition-transform">
                  <span className="font-label-caps text-[12px] uppercase text-on-surface-variant">Total Attendees</span>
                  <div className="flex items-end justify-between">
                    <span className="font-headline-md text-4xl font-bold text-primary leading-none">1,482</span>
                    <span className="text-secondary font-bold text-sm">+18% vs last month</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between h-40 border border-surface-container-high hover:-translate-y-1 transition-transform">
                  <span className="font-label-caps text-[12px] uppercase text-on-surface-variant">Recent Revenue</span>
                  <div className="flex items-end justify-between">
                    <span className="font-headline-md text-4xl font-bold text-primary leading-none">$24.5k</span>
                    <span className="text-secondary font-bold text-sm">Target: $30k</span>
                  </div>
                </div>
              </div>

              {/* Active Events Bento Section */}
              <section className="flex flex-col gap-6">
                <div className="flex justify-between items-end">
                  <h3 className="font-headline-sm text-2xl font-bold text-primary">Live Gatherings</h3>
                  <button className="font-label-caps text-[12px] uppercase text-secondary border-b border-secondary hover:opacity-80 transition-opacity">View Schedule</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Card 1 */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm group border border-surface-container-high cursor-pointer">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU1XaN4eCpK7420UPoS0dogsB_0wcRwRXskhCjl7RvQCz_WXc7KAhh2L2Mi3M8QoZ3AqCz_XFxbWc7w23lI7q9BC_3dKD-tRI2JLd3Gbt89pGLUafqsuyYoPFeFLaHhGOxMMd5jUlPiUdZ3e_OrLfDEnDqNJJc9O9G_jCkNbOhBYG3NHlHqZq0WoeNElP1dZd_vjwSIdLXQuSb_2cAH12DtbHWAn8WZf4DZw7nFLP4vRW0mVHKqm-TGA"
                        alt="Event"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 font-label-caps text-[10px] rounded-full">IN PROGRESS</div>
                    </div>
                    <div className="p-6 flex flex-col gap-2">
                      <h4 className="font-headline-sm text-lg font-bold text-primary">Golden Hour Polo Classic</h4>
                      <div className="flex justify-between mt-2">
                        <div className="flex flex-col">
                          <span className="font-label-caps text-[10px] text-on-surface-variant">ATTENDEES</span>
                          <span className="font-body-md text-sm text-primary font-medium">85 / 100</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-label-caps text-[10px] text-on-surface-variant">STATUS</span>
                          <span className="font-body-md text-sm text-primary font-medium">VIP Seating Filled</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Card 2 */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm group border border-surface-container-high cursor-pointer">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhaOaSak46C0boy0vULAte35u64CvQMDyzUwq3Lx6T0I_94orBCrru5zFSGV4i8owwxLbPYZZdK8YmmW-5klncEuYc6m6dZQ5WsZ3JctSqfc0WwTaTAH5soTsfEbfa2iPEcOoB0N1en1ozIHHzzdIVXRaAqNY6JzaTod8FVFCLJAU-cxFrazBBpmQnxTOyWSsqfEM9TsVQj_zWL3FaAjPaC_2MbrOPibDe1nPy-bOTHRz1Innb7P4PhA"
                        alt="Event"
                      />
                      <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 font-label-caps text-[10px] rounded-full">UPCOMING</div>
                    </div>
                    <div className="p-6 flex flex-col gap-2">
                      <h4 className="font-headline-sm text-lg font-bold text-primary">Founders' Private Lounge</h4>
                      <div className="flex justify-between mt-2">
                        <div className="flex flex-col">
                          <span className="font-label-caps text-[10px] text-on-surface-variant">RSVPS</span>
                          <span className="font-body-md text-sm text-primary font-medium">42 Confirmed</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-label-caps text-[10px] text-on-surface-variant">DOORS</span>
                          <span className="font-body-md text-sm text-primary font-medium">Tomorrow 8PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Network Insights Educational Card */}
              <section className="bg-primary text-white rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden mt-4">
                <div className="absolute top-0 right-0 opacity-10">
                  <span className="material-symbols-outlined text-[120px]">auto_graph</span>
                </div>
                <div className="z-10 flex-1">
                  <h3 className="font-headline-sm text-2xl font-bold mb-2 text-secondary-fixed">Network Insights: Member Retention</h3>
                  <p className="font-body-md text-primary-fixed-dim mb-6 max-w-lg">Based on your recent events, your 'High-Net-Worth' segment has shown a 24% increase in repeat bookings when concierge services are explicitly highlighted in the invite.</p>
                  <button className="border border-secondary-fixed text-secondary-fixed font-label-caps text-[12px] uppercase px-6 py-2 rounded hover:bg-secondary-fixed hover:text-primary transition-all">Download Report</button>
                </div>
              </section>
            </div>

            {/* Sidebar Column */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
              {/* Upcoming Tasks Checklist */}
              <section className="bg-surface-container-low p-6 rounded-xl flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-label-caps text-[12px] uppercase font-bold text-primary">Priority Tasks</h3>
                  <span className="text-secondary font-bold text-xs">3 Pending</span>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-4 p-4 bg-white rounded-lg border border-surface-container-high cursor-pointer hover:border-secondary transition-colors group">
                    <input className="mt-1 rounded-sm border-outline-variant text-secondary focus:ring-secondary" type="checkbox"/>
                    <div className="flex flex-col">
                      <span className="font-body-md text-sm text-primary font-bold group-hover:text-secondary">Confirm Catering for Polo</span>
                      <span className="font-label-caps text-[10px] uppercase text-on-surface-variant mt-1">DUE IN 2 HOURS</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-4 p-4 bg-white rounded-lg border border-surface-container-high cursor-pointer hover:border-secondary transition-colors group">
                    <input className="mt-1 rounded-sm border-outline-variant text-secondary focus:ring-secondary" type="checkbox"/>
                    <div className="flex flex-col">
                      <span className="font-body-md text-sm text-primary font-bold group-hover:text-secondary">Vet New Membership Apps</span>
                      <span className="font-label-caps text-[10px] uppercase text-on-surface-variant mt-1">DUE TODAY</span>
                    </div>
                  </label>
                  <label className="flex items-start gap-4 p-4 bg-white rounded-lg border border-surface-container-high cursor-pointer hover:border-secondary transition-colors group">
                    <input className="mt-1 rounded-sm border-outline-variant text-secondary focus:ring-secondary" type="checkbox"/>
                    <div className="flex flex-col">
                      <span className="font-body-md text-sm text-primary font-bold group-hover:text-secondary">Finalize Invite List</span>
                      <span className="font-label-caps text-[10px] uppercase text-on-surface-variant mt-1">DUE TOMORROW</span>
                    </div>
                  </label>
                </div>
                <button className="text-secondary font-label-caps text-[12px] uppercase text-center py-3 border border-secondary/20 rounded-lg hover:bg-secondary/5 transition-colors">+ Add Task</button>
              </section>

              {/* Recent Activity Feed */}
              <section className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6 border border-surface-container-high">
                <h3 className="font-label-caps text-[12px] uppercase font-bold text-primary">Live Activity</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-start pb-4 border-b border-surface-container-high">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                      <span className="material-symbols-outlined text-sm">person_add</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-primary font-bold">New Booking: Julian Thorne</p>
                      <p className="text-[12px] text-on-surface-variant mt-1">VIP Access for Polo Classic confirmed.</p>
                      <span className="text-[10px] text-outline-variant mt-2 uppercase">2 mins ago</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 border-b border-surface-container-high">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white shrink-0">
                      <span className="material-symbols-outlined text-sm">payments</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-primary font-bold">Payment Received</p>
                      <p className="text-[12px] text-on-surface-variant mt-1">$1,200 from Table #4 Reservation.</p>
                      <span className="text-[10px] text-outline-variant mt-2 uppercase">15 mins ago</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-sm">mail</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-primary font-bold">Private Request</p>
                      <p className="text-[12px] text-on-surface-variant mt-1">Clarissa V. requested specialized transport.</p>
                      <span className="text-[10px] text-outline-variant mt-2 uppercase">45 mins ago</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
