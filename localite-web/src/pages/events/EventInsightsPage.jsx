import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventInsightsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-[#fbf9f8] shadow-sm flex justify-between items-center px-8 z-40">
        <div className="flex items-center gap-6">
          <h1 className="font-headline-md text-3xl font-bold text-primary">Post-Event Intelligence</h1>
          <div className="hidden md:flex bg-[#f5f3f3] px-4 py-2 rounded-full border border-outline-variant/30 items-center gap-2">
            <span className="material-symbols-outlined text-[#44474d]">search</span>
            <input className="bg-transparent border-none outline-none focus:ring-0 text-sm w-48" placeholder="Search archive..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-primary hover:text-secondary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-primary hover:text-secondary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-[#ffdea5] overflow-hidden cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-_V9FiF00EaVAXnJFsUEGbIrD2KoXCSPAFfEu2y2A-3VAhVoP9tkqBeBpKgGwdHUY4zAT9Nkt3y-Grhq8tCS3EPxlFjYDOjrRXSVasgT5BE0EWH3K_eqsRZKycAwcP_6E9cWsUzlX3B7OWMiwy-T0_PC83-lN0WgZ74j8qywQJTtbpxEMl5WTAa4sE4WjecmUe7QEwyoVy8iNe078K-MDcRWAkotfvQxlj3lA3y1r2FIo5SsHem-w9Q" alt="Avatar"/>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SideNavBar */}
        <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-[#f5f3f3] shadow-sm flex-col p-6 gap-6 z-50 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl">
              <span className="material-symbols-outlined text-white">military_tech</span>
            </div>
            <div>
              <h2 className="text-xl font-headline-sm font-bold text-primary">The Registry</h2>
              <p className="text-[10px] font-label-caps uppercase text-[#44474d]">Elite Membership</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1 flex-grow">
            <button onClick={() => navigate('/dashboard/host')} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#eae8e7] transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </button>
            <button className="flex items-center gap-3 px-4 py-3 bg-[#0d1c32]/5 font-bold text-primary rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">event</span> Events
            </button>
            <button onClick={() => navigate('/dashboard/revenue')} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#eae8e7] transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">leaderboard</span> Sports Stats
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#eae8e7] transition-all rounded-lg font-label-caps text-[12px] uppercase">
              <span className="material-symbols-outlined">emoji_events</span> Rankings
            </button>
          </nav>
          <button onClick={() => navigate('/events/create')} className="w-full bg-primary text-white py-3 rounded-xl text-[12px] font-label-caps uppercase shadow-lg hover:opacity-90 active:scale-95 transition-all">
            Host New Event
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-0 md:ml-64 mt-20 p-8 max-w-[1400px]">
          {/* Dashboard Header Summary */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3">
              <p className="text-[12px] font-label-caps uppercase text-secondary mb-2">Summer Gala 2024</p>
              <h2 className="text-5xl font-display-lg font-bold mb-4 text-primary">Strategic Impact Report</h2>
              <div className="flex flex-wrap gap-6 text-[#44474d]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  <span className="text-sm font-medium">August 12, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                  <span className="text-sm font-medium">Belvoir Estate, London</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">group</span>
                  <span className="text-sm font-medium">450 Elite Guests</span>
                </div>
              </div>
            </div>
            <div className="flex items-center lg:justify-end mt-4 lg:mt-0">
              <button className="flex items-center gap-2 border border-primary px-6 py-3 text-[12px] font-label-caps uppercase hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">download</span> Export PDF
              </button>
            </div>
          </section>

          {/* Intelligence Bento Grid */}
          <div className="grid grid-cols-12 gap-6 mb-12">
            {/* Engagement Rate Chart */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-8 shadow-sm border border-[#eae8e7] relative h-[400px] flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-headline-sm font-bold text-primary">Engagement Velocity</h3>
                  <p className="text-[10px] font-label-caps uppercase text-[#75777e] mt-1">Real-time interaction trends</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="text-[10px] font-label-caps uppercase">Engagement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-secondary"></span>
                    <span className="text-[10px] font-label-caps uppercase">Capacity</span>
                  </div>
                </div>
              </div>
              
              {/* Mock Chart Visualization */}
              <div className="flex-1 flex items-end justify-between gap-2 relative mt-4">
                <div className="w-12 bg-primary/20 rounded-t-sm relative h-[40%] hover:h-[45%] transition-all">
                  <div className="absolute inset-x-2 bottom-0 bg-primary h-3/4 rounded-t-sm"></div>
                </div>
                <div className="w-12 bg-primary/20 rounded-t-sm relative h-[60%] hover:h-[65%] transition-all">
                  <div className="absolute inset-x-2 bottom-0 bg-primary h-2/3 rounded-t-sm"></div>
                </div>
                <div className="w-12 bg-primary/20 rounded-t-sm relative h-[90%] hover:h-[95%] transition-all">
                  <div className="absolute inset-x-2 bottom-0 bg-primary h-4/5 rounded-t-sm"></div>
                </div>
                <div className="w-12 bg-primary/20 rounded-t-sm relative h-[75%] hover:h-[80%] transition-all">
                  <div className="absolute inset-x-2 bottom-0 bg-primary h-3/4 rounded-t-sm"></div>
                </div>
                <div className="w-12 bg-primary/20 rounded-t-sm relative h-[100%] hover:h-[105%] transition-all group">
                  <div className="absolute inset-x-2 bottom-0 bg-secondary h-[85%] rounded-t-sm"></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">94% Peak</div>
                </div>
                <div className="w-12 bg-primary/20 rounded-t-sm relative h-[70%] hover:h-[75%] transition-all">
                  <div className="absolute inset-x-2 bottom-0 bg-primary h-3/4 rounded-t-sm"></div>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-[10px] font-label-caps uppercase text-[#75777e]">
                <span>18:00</span><span>19:30</span><span>21:00</span><span>22:30</span><span>00:00</span><span>Peak</span>
              </div>
            </div>

            {/* Satisfaction Score */}
            <div className="col-span-12 lg:col-span-4 bg-primary rounded-xl p-8 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <span className="material-symbols-outlined text-[120px]">star_half</span>
              </div>
              <div>
                <h3 className="text-2xl font-headline-sm font-bold mb-1">Satisfaction Score</h3>
                <p className="text-[10px] font-label-caps uppercase opacity-70">Sentiment Analysis</p>
              </div>
              <div className="my-8">
                <div className="text-[84px] font-headline-md font-bold leading-none mb-2">9.8</div>
                <div className="flex items-center gap-1 text-[#ffdea5]">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star_half</span>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm relative z-10">
                <p className="text-sm italic mb-2">"The curated lounge atmosphere was unparalleled in its sophistication."</p>
                <span className="text-[10px] font-label-caps uppercase opacity-60">— Top Tier Member</span>
              </div>
            </div>
          </div>

          {/* Top Moments */}
          <section className="mb-12">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-3xl font-headline-md font-bold text-primary">Top Moments</h3>
                <p className="text-[12px] font-label-caps uppercase text-[#44474d] mt-1">High-fidelity archival captures</p>
              </div>
              <button className="text-[12px] font-label-caps uppercase text-primary border-b border-primary hover:text-secondary hover:border-secondary transition-all">View All Photos</button>
            </div>
            <div className="grid grid-cols-12 gap-6 h-[400px] md:h-[600px]">
              <div className="col-span-12 md:col-span-6 rounded-xl overflow-hidden shadow-md relative group">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6fChBZh5QbDUHjUhu-FWyG0uczh_-Zs31sTzwtYW-GgyVwdJ7ODfN1msdjHudQhqu3ker8m02X40VZ2RzzlsQU7NlkqB5Fs2lTxWJBVVhvAFr1sDZO2kOHXvwqwPmRzaLE6aaWgOvx6DZJ6vKBdkDLeelXNiR7b3Zmgw2QK1uS3Qt5z3-RpywIrAbyOdUwv4iml6sCsxBvJxl8KIFNbhXkNvd4lTKaMiGDlPScye4pofmZAdS2lCntA" alt="Event Moment 1" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[12px] text-white font-label-caps uppercase font-bold">The Grand Opening Waltz</span>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 flex flex-col gap-6">
                <div className="h-[calc(50%-12px)] rounded-xl overflow-hidden shadow-md relative group">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc-R6OKAUZWc5fexUEabSD-fFYAbthZ3BYtUO3vtboHxovUnP-1Lr9_WEvsYw6WDJNZ4wVnUI4q3QpLpoOh-q3LYuGbEbKFh_adr7CruM2YQiALRJWWQysTSw5K4P09WjtDcuGBaDeKqukY59cWrq4GVHpBl6KQFLs9erXzBcwEhfNwyKZyXhNNP0N-RfIsPdyBRpUjD_K5mA6A45HAHvE4nXIAk1XVVQRcNdk53lxLqZLdVIHnbc31Q" alt="Event Moment 2" />
                </div>
                <div className="h-[calc(50%-12px)] rounded-xl overflow-hidden shadow-md relative group">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYYILr_P_lvktr3TRevjUVB_sneAuBdHvBLsFrwNXr1qIhW1P5guFUfoPG-2nJgH-UYPVthi4vqvTRjwuvBvk4Q6x2T-2gBkkWnxMPAmONpEIaAucB67JmBNQ19eHjHYjnDal8vubIY8wL-k8O8rqVmJQ7ezsByrmgg6wr-lYrO1bujzdCITBhwbBtTUXYslXHLq4ub_VupdVN0MDHMlebQ7Ano8oLhVRI64qsWi-d72Pyy_FNTeOzoA" alt="Event Moment 3" />
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 rounded-xl overflow-hidden shadow-md relative group">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPc6xsbZMuKt38K4Uvi8jIMtth296RmMYkogJrshvABFjNo_HDHMWw6VP38-CgHX6U69Dy7wcFY0PF7E6O4Ynv38P83JYvPqHAPnlYCXWi3-8A-vxAKNID_wfFYb52bHfVin8SszU8so-bXBWGPRhuwOAob9-E4HIGyTX3rDtcZknMShwSj4JcMpVuSdHzuXATULi17iIg-X_FvTbLLl9VPqoREAZpp45ur8VG7brT-JEkVOm6K0EHIA" alt="Event Moment 4" />
              </div>
            </div>
          </section>

          {/* Strategic Recommendations */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#f5f3f3] rounded-xl p-8 border border-[#eae8e7]">
              <h3 className="text-2xl font-headline-sm font-bold mb-6">Strategic Planning Checklist</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-outline-variant/30 hover:border-secondary transition-all cursor-pointer">
                  <div className="w-6 h-6 border-2 border-primary flex items-center justify-center mt-1">
                    <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-label-caps uppercase text-secondary mb-1 block font-bold">Optimization</span>
                    <h4 className="font-bold text-sm text-primary">Expand VIP Lounge Capacity by 15%</h4>
                    <p className="text-xs text-[#44474d] mt-1">Heatmaps showed congestion at peak hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-outline-variant/30 hover:border-secondary transition-all cursor-pointer">
                  <div className="w-6 h-6 border-2 border-outline-variant mt-1"></div>
                  <div>
                    <span className="text-[10px] font-label-caps uppercase text-secondary mb-1 block font-bold">Curation</span>
                    <h4 className="font-bold text-sm text-primary">Digital Concierge Pre-Selection</h4>
                    <p className="text-xs text-[#44474d] mt-1">Allow guests to choose dietary preferences via app.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#e4e2e2] rounded-xl p-8 flex flex-col justify-center text-center items-center">
              <span className="material-symbols-outlined text-[48px] text-primary mb-4">insights</span>
              <h3 className="text-2xl font-headline-sm font-bold mb-4">AI Predictive Modeling</h3>
              <p className="text-sm mb-6 max-w-md">Based on current engagement trends, our model suggests a 22% increase in membership retention if the 'Lounge & Listen' series is expanded to monthly events.</p>
              <button className="bg-primary text-white py-3 px-8 text-[12px] font-label-caps uppercase tracking-widest hover:opacity-90">Generate Projections</button>
            </div>
          </section>

        </main>
      </div>

      {/* Footer Navigation */}
      <footer className="ml-0 md:ml-64 py-8 bg-white border-t border-outline-variant/30 flex flex-col items-center justify-center gap-4 mt-12 z-50">
        <div className="flex gap-6">
          <button className="text-[12px] font-label-caps uppercase text-[#75777e] hover:text-primary transition-all">Privacy Policy</button>
          <button className="text-[12px] font-label-caps uppercase text-[#75777e] hover:text-primary transition-all">Terms of Service</button>
          <button className="text-[12px] font-label-caps uppercase text-[#75777e] hover:text-primary transition-all">Member Charter</button>
        </div>
        <p className="text-[10px] font-label-caps uppercase text-[#75777e] opacity-60">© 2024 Regal Connection. All rights reserved.</p>
      </footer>
    </div>
  );
}
