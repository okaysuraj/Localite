import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RevenueDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-[#fbf9f8] shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-8 py-4 h-20">
          <div className="flex items-center gap-6">
            <span className="font-headline-md text-3xl font-bold text-primary">Regal Connection</span>
            <div className="hidden md:flex ml-12 gap-6">
              <button className="text-on-surface-variant hover:text-secondary transition-colors font-label-caps text-[12px] uppercase">Members</button>
              <button className="text-primary font-bold border-b-2 border-secondary font-label-caps text-[12px] uppercase">Financials</button>
              <button className="text-on-surface-variant hover:text-secondary transition-colors font-label-caps text-[12px] uppercase">Inventory</button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-64 hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60">search</span>
              <input className="w-full bg-white border border-outline-variant/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-secondary-container outline-none" placeholder="Search transactions..." type="text"/>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-all">
                <span className="material-symbols-outlined text-primary">notifications</span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-all">
                <span className="material-symbols-outlined text-primary">settings</span>
              </button>
              <div 
                className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant cursor-pointer"
                onClick={() => navigate('/profile/setup/final')}
              >
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIq2FqdRzwvImZe9gE76GF6glx7Jv4szZVTHe2-UXd2bCxSUL65Mqi9Dx7mekSUpCcgH8OhwO-WT9yCUSsVf3EPA18Dn1ns6EBQwsbjTZmY4UkhttbTGt7Yoh3eKVvaLTNOXeKX1wA2ZykRP1jgfsehyH5J8Y0X69_ScmgODbZZ_yVW1hSY9EOQJW65yWBkpsJkbmRp82rzqBXb69sfDwQLySsT08KVEOTbeUtlzYeUHjJsKCe2PPScg" alt="Avatar"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* SideNavBar */}
        <aside className="hidden md:flex w-64 fixed left-0 top-20 bottom-0 bg-[#f5f3f3] shadow-sm p-6 flex-col gap-6 z-40 overflow-y-auto">
          <div className="flex items-center gap-3 px-2 py-4">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[20px]">account_balance</span>
            </div>
            <div>
              <p className="font-headline-sm text-xl font-bold text-primary leading-tight">The Registry</p>
              <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase">ELITE MEMBERSHIP</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <button onClick={() => navigate('/dashboard/host')} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">event</span> Events
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-[#e4e2e2] rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined text-[#775a19]">payments</span> Revenue Dashboard
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">leaderboard</span> Rankings
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">military_tech</span> Achievements
            </button>
          </nav>
          
          <button onClick={() => navigate('/events/create')} className="mt-4 w-full bg-primary text-white font-label-caps text-[12px] py-4 rounded-xl uppercase tracking-widest hover:opacity-90 transition-opacity">
            Host New Event
          </button>
          
          <div className="mt-auto border-t border-outline-variant/30 pt-4 flex flex-col gap-1">
            <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">help</span> Support
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">logout</span> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8 max-w-[1200px]">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="font-display-lg text-5xl font-bold text-primary mb-2">Financial Overview</h1>
              <p className="text-body-lg text-on-surface-variant">Real-time revenue tracking for Regal Connection elite circuits.</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 border border-secondary text-secondary font-label-caps text-[12px] uppercase px-6 py-3 rounded-full hover:bg-secondary/5 transition-all">
                <span className="material-symbols-outlined">download</span> Export PDF
              </button>
              <button className="flex items-center gap-2 bg-primary text-white font-label-caps text-[12px] uppercase px-8 py-3 rounded-full hover:shadow-lg transition-all">
                Withdraw Funds
              </button>
            </div>
          </header>

          {/* Large Chart Section */}
          <section className="mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-outline-variant/20 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-label-caps text-[12px] text-on-surface-variant mb-1 uppercase tracking-widest">TOTAL EARNINGS (QUARTERLY)</p>
                  <h2 className="font-headline-md text-4xl font-bold text-primary">$432,850.00</h2>
                </div>
                <div className="bg-[#fed488]/30 px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
                  <span className="text-[#785a1a] font-bold text-xs">+12.4% MoM</span>
                </div>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-64 w-full relative mt-4">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#fed488" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#fed488" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,150 Q100,140 200,120 T400,160 T600,100 T800,40 V200 H0 Z" fill="url(#gradient)"></path>
                  <path d="M0,150 Q100,140 200,120 T400,160 T600,100 T800,40" fill="none" stroke="#775a19" strokeLinecap="round" strokeWidth="3"></path>
                  <circle cx="800" cy="40" fill="#000000" r="6"></circle>
                </svg>
                <div className="absolute inset-0 flex items-end justify-between px-2 opacity-40 text-[10px] font-label-caps uppercase pb-1">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                </div>
              </div>
            </div>
          </section>

          {/* Revenue Breakdown Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Ticket Sales */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/20 border-l-4 border-l-primary hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#f5f3f3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">confirmation_number</span>
                </div>
                <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">WEEKLY VIEW</span>
              </div>
              <p className="font-label-caps text-[12px] uppercase text-on-surface-variant mb-1">TICKET SALES</p>
              <h3 className="font-headline-sm text-2xl font-bold text-primary">$285,400.00</h3>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-[#eae8e7] rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '75%' }}></div>
                </div>
                <span className="text-xs font-bold text-primary">75%</span>
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/20 border-l-4 border-l-secondary hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#f5f3f3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">concierge</span>
                </div>
                <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">WEEKLY VIEW</span>
              </div>
              <p className="font-label-caps text-[12px] uppercase text-on-surface-variant mb-1">PREMIUM ADD-ONS</p>
              <h3 className="font-headline-sm text-2xl font-bold text-primary">$124,150.00</h3>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-[#eae8e7] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#fed488] to-[#e9c176]" style={{ width: '45%' }}></div>
                </div>
                <span className="text-xs font-bold text-primary">45%</span>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/20 border-l-4 border-l-[#75777e] hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#f5f3f3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#75777e]">volunteer_activism</span>
                </div>
                <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">WEEKLY VIEW</span>
              </div>
              <p className="font-label-caps text-[12px] uppercase text-on-surface-variant mb-1">MEMBER GRATUITIES</p>
              <h3 className="font-headline-sm text-2xl font-bold text-primary">$23,300.00</h3>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-[#eae8e7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#75777e]" style={{ width: '20%' }}></div>
                </div>
                <span className="text-xs font-bold text-primary">20%</span>
              </div>
            </div>
          </section>

          {/* Recent Payouts Table */}
          <section className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
            <div className="px-6 py-6 flex justify-between items-center border-b border-outline-variant/20">
              <h3 className="font-headline-sm text-2xl font-bold text-primary">Recent Payouts</h3>
              <div className="flex items-center gap-4">
                <div className="flex border border-outline-variant/30 rounded-lg overflow-hidden">
                  <button className="px-4 py-2 bg-[#eae8e7] text-primary font-label-caps text-[10px] uppercase">ALL</button>
                  <button className="px-4 py-2 hover:bg-[#f5f3f3] text-on-surface-variant font-label-caps text-[10px] uppercase transition-colors">PENDING</button>
                  <button className="px-4 py-2 hover:bg-[#f5f3f3] text-on-surface-variant font-label-caps text-[10px] uppercase transition-colors">COMPLETED</button>
                </div>
                <button className="p-2 border border-outline-variant/30 rounded-lg hover:bg-[#f5f3f3] transition-colors">
                  <span className="material-symbols-outlined text-[#44474d]">filter_list</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f5f3f3] border-b border-outline-variant/20">
                    <th className="px-6 py-4 font-label-caps text-[12px] uppercase text-[#75777e]">TRANSACTION ID</th>
                    <th className="px-6 py-4 font-label-caps text-[12px] uppercase text-[#75777e]">DATE</th>
                    <th className="px-6 py-4 font-label-caps text-[12px] uppercase text-[#75777e]">DESTINATION</th>
                    <th className="px-6 py-4 font-label-caps text-[12px] uppercase text-[#75777e] text-right">AMOUNT</th>
                    <th className="px-6 py-4 font-label-caps text-[12px] uppercase text-[#75777e]">STATUS</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-[#fbf9f8] transition-colors">
                    <td className="px-6 py-5 font-medium text-body-md">#RC-10928374</td>
                    <td className="px-6 py-5 text-on-surface-variant text-body-md">Oct 24, 2024</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#fed488] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px] text-[#785a1a]">account_balance</span>
                        </div>
                        <span className="text-body-md">Chase Personal •••• 9921</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-bold text-body-md text-primary">$12,450.00</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase">Settled</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="material-symbols-outlined text-on-surface-variant opacity-60 hover:opacity-100">more_vert</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#fbf9f8] transition-colors">
                    <td className="px-6 py-5 font-medium text-body-md">#RC-10928365</td>
                    <td className="px-6 py-5 text-on-surface-variant text-body-md">Oct 21, 2024</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px] text-white">wallet</span>
                        </div>
                        <span className="text-body-md">Gold Vault Account</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-bold text-body-md text-primary">$45,000.00</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full uppercase">Processing</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="material-symbols-outlined text-on-surface-variant opacity-60 hover:opacity-100">more_vert</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#fbf9f8] transition-colors">
                    <td className="px-6 py-5 font-medium text-body-md">#RC-10928322</td>
                    <td className="px-6 py-5 text-on-surface-variant text-body-md">Oct 18, 2024</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#fed488] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px] text-[#785a1a]">account_balance</span>
                        </div>
                        <span className="text-body-md">HSBC Platinum •••• 4402</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-bold text-body-md text-primary">$8,900.00</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full uppercase">Settled</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="material-symbols-outlined text-on-surface-variant opacity-60 hover:opacity-100">more_vert</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-outline-variant/20 flex justify-center">
              <button className="text-secondary font-label-caps text-[12px] uppercase hover:underline">View All Historical Payouts</button>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-outline-variant/20 w-full py-8 mt-auto z-50">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex gap-6 mb-2">
            <button className="text-on-surface-variant hover:text-primary transition-all font-label-caps text-[12px] uppercase">Privacy Policy</button>
            <button className="text-on-surface-variant hover:text-primary transition-all font-label-caps text-[12px] uppercase">Terms of Service</button>
            <button className="text-on-surface-variant hover:text-primary transition-all font-label-caps text-[12px] uppercase">Member Charter</button>
          </div>
          <p className="text-[#75777e] font-label-caps text-[10px] uppercase">© 2024 REGAL CONNECTION. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
