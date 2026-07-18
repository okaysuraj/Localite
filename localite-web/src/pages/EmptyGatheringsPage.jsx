import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmptyGatheringsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md overflow-x-hidden min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky z-50 bg-[#f5f3f3] shadow-[0_16px_32px_rgba(10,25,47,0.05)]">
        <div className="flex justify-between items-center px-6 py-2 max-w-7xl mx-auto h-20">
          <div className="flex items-center gap-6">
            <span 
              className="font-headline-md text-3xl font-bold text-primary italic tracking-tight cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              Localite
            </span>
            <nav className="hidden md:flex gap-2 ml-8">
              <a className="px-4 py-2 font-label-caps text-[12px] font-bold uppercase tracking-widest text-primary border-b-2 border-[#775a19] cursor-pointer transition-colors duration-300">Gatherings</a>
              <a className="px-4 py-2 font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Sports</a>
              <a className="px-4 py-2 font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Community</a>
              <a className="px-4 py-2 font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Concierge</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d]">search</span>
              <input className="pl-10 pr-4 py-2 w-64 bg-[#efeded] border-1.5 border-transparent focus:bg-white focus:border-[#775a19] transition-all text-[16px] rounded-xl outline-none" placeholder="Search events..." type="text" />
            </div>
            <button className="material-symbols-outlined text-primary hover:text-[#775a19] transition-colors cursor-pointer">notifications</button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#eae8e7] cursor-pointer active:scale-95 transition-transform" onClick={() => navigate('/profile')}>
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVWkndMUAg4O_TkS5tc1zimvvImz6vJW9MhAyyAo6qjCfGB0Zd_OVifmEcqICaUS9Pdb51AaA3fvzCEuyaWAlom8kvQpK7y1BYxeKYtpjwv2QH8MweZY5Uf5WIdEuvrsp3LtEh5TvaJxY4aCBuM1GsLEHMZbHmFqcCMOpWuTcDCNxIS_ejD6T2AqPEOY5GKkqosnQThtRmYtjhTcf8iLFyDHWJZ479GfBegXmei7Bh9ilfvXOaGcsNVw" alt="Profile" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] w-64 sticky top-[80px] bg-white py-12 border-r border-[#c5c6cd]/10 shadow-[24px_0_48px_rgba(10,25,47,0.03)] overflow-y-auto">
          <div className="px-6 mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#775a19]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              <span className="font-headline-sm text-2xl font-bold text-primary">The Guild</span>
            </div>
            <p className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d]">Elite Membership</p>
          </div>
          <nav className="flex-grow">
            <div className="group flex items-center gap-2 px-6 py-4 transition-all duration-300 text-primary font-bold border-r-2 border-[#775a19] bg-[#f5f3f3] cursor-pointer">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>event_seat</span>
              <span className="font-label-caps text-[12px] uppercase tracking-widest">Gatherings</span>
            </div>
            <div className="group flex items-center gap-2 px-6 py-4 transition-all duration-300 text-[#44474d] hover:bg-[#efeded] cursor-pointer">
              <span className="material-symbols-outlined">sports_tennis</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Sports</span>
            </div>
            <div className="group flex items-center gap-2 px-6 py-4 transition-all duration-300 text-[#44474d] hover:bg-[#efeded] cursor-pointer">
              <span className="material-symbols-outlined">groups</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Community</span>
            </div>
            <div className="group flex items-center gap-2 px-6 py-4 transition-all duration-300 text-[#44474d] hover:bg-[#efeded] cursor-pointer">
              <span className="material-symbols-outlined">support_agent</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Concierge</span>
            </div>
          </nav>
          <div className="mt-auto px-6 flex flex-col gap-2">
            <button className="w-full bg-primary text-white py-3 rounded-xl font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#775a19] transition-all shadow-[0_16px_32px_rgba(10,25,47,0.05)] active:scale-[0.98]">
              Request Invitation
            </button>
            <div className="flex flex-col mt-6 pt-4 border-t border-[#c5c6cd]/10">
              <a className="flex items-center gap-2 py-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Settings</span>
              </a>
              <a className="flex items-center gap-2 py-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">help</span>
                <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Support</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Empty State Content */}
        <section className="flex-grow flex items-center justify-center p-12 animate-[fadeInScale_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-xl p-8 md:p-12 shadow-[0_24px_48px_rgba(10,25,47,0.08)] relative overflow-hidden">
            
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ffdea5]/20 rounded-full blur-3xl"></div>
            
            {/* Artistic Illustration Component */}
            <div className="relative group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-[0_16px_32px_rgba(10,25,47,0.05)] group-hover:shadow-[0_24px_48px_rgba(10,25,47,0.08)] transition-all duration-500">
                <img 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBADEebTPrCCJLVGYUUqEORZVrhUKlgmN4AdZaNGnd5QlyEflPf1DmuVNYP8_El2YjkCec9WJmnPqS4qetkDrt8mEd8ReRV399PqBipusQm5jEFfuMjPI-o2BuNiVrMjml0cLXrFEWD8wWEpfYwvybhynVgk3j0EoJ1E9h5nNcGtslZ4ynIIbD3HSHQPjU4YSZs9Z93yGFf33UNQCaPLIpw7lH3b7CCC1t1kV2teIteA7wrQY-wdH5FVA" 
                  alt="Empty Calendar"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              </div>
              {/* Overlapping Detail Card */}
              <div className="absolute -bottom-6 -right-6 bg-white/70 backdrop-blur-md border border-white/30 p-6 rounded-xl hidden md:block max-w-[240px]">
                <span className="material-symbols-outlined text-[#775a19] text-3xl mb-2">auto_awesome</span>
                <p className="font-headline-sm text-[18px] font-bold leading-tight text-primary mb-1">A Curated Pause</p>
                <p className="text-[#44474d] text-[14px]">The finest events are currently being architected for the upcoming season.</p>
              </div>
            </div>

            {/* Textual Content & CTAs */}
            <div className="flex flex-col justify-center gap-6 text-center md:text-left">
              <div className="space-y-4">
                <span className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-[0.2em]">MEMBERSHIP STATUS: ACTIVE</span>
                <h1 className="font-headline-md text-5xl font-bold text-primary leading-tight">The Calendar is Currently Unveiled</h1>
                <p className="font-body-lg text-lg text-[#44474d]">A moment of quiet before the next grand affair. Use this interval to discover new community hubs or propose a gathering of your own design.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button className="bg-primary text-white px-8 py-4 rounded-xl font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#775a19] hover:shadow-[0_24px_48px_rgba(10,25,47,0.08)] transition-all active:scale-95 flex items-center justify-center gap-2 group">
                  <span>Organize a Gathering</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">add</span>
                </button>
                <button 
                  className="border border-[#775a19] text-[#775a19] px-8 py-4 rounded-xl font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#775a19] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                  onClick={() => navigate('/dashboard')}
                >
                  <span>Explore Hubs</span>
                  <span className="material-symbols-outlined">explore</span>
                </button>
              </div>

              {/* Subtle Footer Insight */}
              <div className="mt-6 flex items-center gap-2 py-4 border-t border-[#c5c6cd]/20 justify-center md:justify-start">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#eae8e7] overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvv_ecxdKlINEkdXMe_D3GdjUb30SVQXHv_SzKIG-RiG37iNGcJbOhVp-IrFfv_OfeNwQPmV5EHYZEwhsxzLPYhSObBk_0ecJVd7fVTD0VvopIVdaWGcw4tRaMU2AjdnBC69wsm25sQEJoT5CSuGFaVWgdEOQmRK4qpum6Z5FnYVgsGKyM6Y-a8AYSjBXlJhY9Dxo9M06NsF6k_4VO41KcfJc7IKgNaetIy6a0VUx5ZziyFjFgAimHYA" alt="Member" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#eae8e7] overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp40wMplqyJ097LwctPGmj_KjtVAxsWvvKL8BDBqjJsEcZy7I5urHAiip8Q2F2WqiK3jDvS8A9uG2vDWnnrmngi1IsqQUUdAjoHkFV478LCVK8JjgpI7j0AVL_syY5imaeMDyTijgaZ8D-y-ta7NJuQ9d3z7XaVHOudjbSMHWhZt5ZJ-qaTlgj7t5NxXClJ1BvRn5B0SPbMrMtC2kOl3iw2-jnaWDeet3WqvTq9-bLDNHyVZGSxNmF9w" alt="Member" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#eae8e7] overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCOpgBHXLZt5f1LGK6zYzwjRSjv0KcAwnZtDe5xCnRdS0meVxbc8YMPLEsE8MQU3IsvJVxDMHsIaDqtdTbOT2c1WAItSUKIHjvLzJ79wri8eostvi2dAJZYcYTCCwh03Cm1RO84StdSO03fIn9zFR6hRVvPjYHj_vQ8rQJ4dpBpnKLA8WOY9NJ2Qfict_3GDcFerpBLIe6wLd6JWgGFjc-BntVXtgDAG3qkJMnzyEO3xoyy0wwrPyXwA" alt="Member" />
                  </div>
                </div>
                <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">248 members active in your vicinity</p>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 mt-12 bg-[#f5f3f3] border-t border-[#c5c6cd]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-headline-sm text-2xl font-bold text-primary italic">Localite</span>
            <p className="font-body-md text-[#46473f]">© 2024 Localite. Modern Nobility.</p>
          </div>
          <div className="flex gap-4">
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer">Privacy</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer">Terms</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer">House Rules</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer">Press</a>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-[#eae8e7] flex items-center justify-center cursor-pointer hover:bg-[#775a19] hover:text-white transition-all">
              <span className="material-symbols-outlined text-[18px]">public</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#eae8e7] flex items-center justify-center cursor-pointer hover:bg-[#775a19] hover:text-white transition-all">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
