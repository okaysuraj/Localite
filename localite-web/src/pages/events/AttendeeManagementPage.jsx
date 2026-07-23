import React from 'react';
import { useNavigate } from 'react-router-dom';

const attendees = [
  { id: 1, name: 'Eleanor Sterling', rsvp: 'RSVP-4012', status: 'Arrived', tier: 'Diamond Elite', dietary: 'Vegan, No Gluten', statusColor: 'text-emerald-700 bg-emerald-50' },
  { id: 2, name: 'Julian Vane', rsvp: 'RSVP-4022', status: 'En Route', tier: 'Platinum Member', dietary: 'Shellfish Allergy', statusColor: 'text-amber-700 bg-amber-50' },
  { id: 3, name: 'Beatrice Thorne', rsvp: 'RSVP-4035', status: 'Pending', tier: 'Diamond Elite', dietary: '—', statusColor: 'text-slate-500 bg-slate-100' },
  { id: 4, name: 'Marcus Finch', rsvp: 'RSVP-4048', status: 'Arrived', tier: 'Gold Member', dietary: 'Nut Allergy (Severe)', statusColor: 'text-emerald-700 bg-emerald-50' },
];

export default function AttendeeManagementPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md flex">
      {/* Sidebar */}
      <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex-col p-6 gap-6 border-r border-outline-variant z-50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl text-white">
            <span className="material-symbols-outlined">local_fire_department</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-lg leading-tight text-primary">The Registry</h2>
            <p className="font-label-caps text-[10px] text-on-surface-variant">Elite Membership</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-caps">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-surface-container-highest rounded-lg" href="#">
            <span className="material-symbols-outlined text-secondary">event</span>
            <span className="font-label-caps">Events</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="font-label-caps">Guest List</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 flex-1 p-6 md:p-12 min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-full max-w-xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Search logistics, guests, or tiers..." 
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-transparent rounded-full focus:ring-1 focus:ring-secondary/50 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden">
              <img src="https://via.placeholder.com/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Guest Summary */}
        <section className="mb-12">
          <div className="flex items-baseline gap-4 mb-6">
            <h1 className="font-headline-md text-3xl text-primary">Guest Logistics Console</h1>
            <span className="text-on-surface-variant font-label-caps tracking-widest uppercase">Summer Equinox Gala</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-high shadow-sm">
              <p className="font-label-caps text-on-surface-variant mb-2 tracking-widest uppercase">Total Confirmed</p>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-sm text-3xl text-primary">142</span>
                <span className="text-secondary font-bold text-sm">+12 from yesterday</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-high shadow-sm">
              <p className="font-label-caps text-on-surface-variant mb-2 tracking-widest uppercase">Elite Tier Arrivals</p>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-sm text-3xl text-primary">28</span>
                <span className="text-on-surface-variant text-sm">of 35 invited</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-high shadow-sm">
              <p className="font-label-caps text-on-surface-variant mb-2 tracking-widest uppercase">Dietary Special</p>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-sm text-3xl text-secondary">09</span>
                <span className="text-on-surface-variant text-sm">Critical Actions</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border-2 border-secondary/30 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 text-secondary mb-2">
                <span className="material-symbols-outlined text-[18px]">star</span>
                <p className="font-label-caps tracking-widest uppercase">VIP Highlight</p>
              </div>
              <p className="font-body-md font-bold text-primary">Governor Arrival: 19:45</p>
            </div>
          </div>
        </section>

        {/* Logistics Table */}
        <section className="bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-sm overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row justify-between items-center border-b border-surface-container-high gap-4">
            <div className="flex gap-6">
              <button className="font-label-caps text-primary border-b-2 border-primary pb-1 uppercase tracking-widest">All Guests</button>
              <button className="font-label-caps text-on-surface-variant hover:text-primary transition-colors pb-1 uppercase tracking-widest">Waitlist</button>
              <button className="font-label-caps text-on-surface-variant hover:text-primary transition-colors pb-1 uppercase tracking-widest">Check-out</button>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-outline-variant rounded-lg font-label-caps uppercase tracking-widest hover:bg-surface-container-low transition-all text-xs">
                Filter By Tier
              </button>
              <button 
                onClick={() => navigate('/events/1/checkin')}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-caps uppercase tracking-widest hover:opacity-90 transition-all text-xs flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                Scan QR
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-surface-container-low border-b border-surface-container-high">
                <tr>
                  <th className="p-4 font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase">Name</th>
                  <th className="p-4 font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase">Status</th>
                  <th className="p-4 font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase">Elite Tier</th>
                  <th className="p-4 font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase">Dietary Requirements</th>
                  <th className="p-4 font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {attendees.map(guest => (
                  <tr key={guest.id} className="hover:bg-surface-bright transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={`https://via.placeholder.com/40`} className="w-10 h-10 rounded-full" alt="avatar" />
                        <div>
                          <p className="font-body-md font-bold text-primary">{guest.name}</p>
                          <p className="text-xs text-on-surface-variant">{guest.rsvp}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-label-caps tracking-widest uppercase ${guest.statusColor}`}>
                        {guest.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold font-label-caps text-[10px] tracking-widest uppercase ${guest.tier.includes('Diamond') ? 'text-secondary' : 'text-on-surface-variant'}`}>
                        {guest.tier}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-on-surface-variant italic">{guest.dietary}</p>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-surface-container rounded-lg">
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-surface-container rounded-lg">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-surface-container-low flex justify-between items-center border-t border-surface-container-high">
            <p className="text-[10px] text-on-surface-variant font-label-caps uppercase tracking-widest">Showing 1-4 of 142 guests</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-high">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-high text-sm">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-high text-sm">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-high">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
