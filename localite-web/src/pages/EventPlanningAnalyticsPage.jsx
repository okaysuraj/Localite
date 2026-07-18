import React from 'react';

export default function EventPlanningAnalyticsPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-[calc(100vh-73px)]">
      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-12">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
              <span className="font-label-caps text-label-caps uppercase">Events</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-label-caps text-label-caps uppercase text-secondary">Analytics</span>
            </nav>
            <h1 className="font-display-lg text-4xl font-bold text-primary">Pre-Event Strategy</h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant mt-2 max-w-2xl">Leverage predictive modeling and community sentiment to optimize your next elite gathering.</p>
          </div>
          <div className="flex gap-4">
            <button className="border border-secondary-container text-secondary px-6 py-3 rounded-xl font-label-caps text-label-caps uppercase hover:bg-secondary-container/10 transition-colors">Export Report</button>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-label-caps text-label-caps uppercase shadow-md hover:opacity-90 transition-all">Launch Event</button>
          </div>
        </header>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Projected Attendance Chart */}
          <section className="col-span-12 lg:col-span-8 bg-white rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-headline-sm text-2xl font-bold text-primary">Projected Attendance</h3>
                <p className="font-label-caps text-label-caps uppercase text-on-surface-variant mt-1">Forecasted Engagement by Day</p>
              </div>
              <div className="flex bg-surface-container-low p-1 rounded-lg">
                <button className="px-4 py-1 bg-white rounded-md text-label-caps font-bold shadow-sm">Daily</button>
                <button className="px-4 py-1 text-label-caps text-on-surface-variant opacity-60">Weekly</button>
              </div>
            </div>

            {/* Simple Mock Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-4 px-4">
              {[
                { day: 'Mon', val: 142, h: '32%' },
                { day: 'Tue', val: 210, h: '48%' },
                { day: 'Wed', val: 285, h: '64%', active: true },
                { day: 'Thu', val: 180, h: '40%' },
                { day: 'Fri', val: 245, h: '56%' },
                { day: 'Sat', val: 268, h: '60%', highlight: true },
                { day: 'Sun', val: 155, h: '36%' }
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className={`w-full rounded-t-lg relative cursor-pointer transition-colors ${item.highlight ? 'bg-secondary hover:bg-secondary/80' : item.active ? 'bg-primary hover:bg-primary/80' : 'bg-surface-container-high hover:bg-secondary-container'}`} 
                    style={{ height: item.h }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.val}
                    </div>
                  </div>
                  <span className={`font-label-caps text-[10px] uppercase ${item.active ? 'font-bold text-primary' : 'opacity-60'}`}>{item.day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Ideal Ticket Price */}
          <section className="col-span-12 lg:col-span-4 bg-primary text-white rounded-xl p-6 shadow-md flex flex-col relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary-fixed">diamond</span>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed">Optimization Tool</span>
              </div>
              <h3 className="font-headline-sm text-2xl font-bold mb-2">Ideal Ticket Price</h3>
              <p className="font-body-md text-primary-fixed-dim mb-6 opacity-80">Based on membership tier and historical venue performance.</p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 mb-6">
                <span className="font-label-caps text-[10px] uppercase opacity-60">Suggested Range</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-headline-md text-secondary-fixed font-bold">$125</span>
                  <span className="text-xl font-body-lg opacity-40">—</span>
                  <span className="text-4xl font-headline-md font-bold">$185</span>
                </div>
                <p className="text-[12px] mt-4 text-secondary-fixed font-medium">Confidence Interval: 94%</p>
              </div>
              
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-label-caps text-[10px] uppercase opacity-60">Demand Lift</span>
                  <span className="font-body-md">+12.4%</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-label-caps text-[10px] uppercase opacity-60">Revenue Peak</span>
                  <span className="font-body-md">$155.00</span>
                </li>
              </ul>
              
              <button className="mt-8 w-full bg-secondary-fixed text-primary font-label-caps text-label-caps uppercase py-3 rounded-lg font-bold hover:bg-secondary-fixed-dim transition-all">Apply to Draft</button>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -right-8 -bottom-8 opacity-5">
              <span className="material-symbols-outlined text-[200px]">payments</span>
            </div>
          </section>

          {/* Geographical Interest */}
          <section className="col-span-12 lg:col-span-7 bg-white rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline-sm text-2xl font-bold text-primary">Geographical Interest</h3>
                <p className="font-label-caps text-label-caps uppercase text-on-surface-variant mt-1">District-Based Demand Analysis</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              {/* Map Placeholder */}
              <div className="flex-1 h-64 rounded-xl overflow-hidden relative border border-outline-variant/20 bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-outline-variant text-4xl">map</span>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm">
                  <p className="text-[10px] font-label-caps text-label-caps uppercase font-bold text-primary">Top District</p>
                  <p className="text-lg font-bold">Kensington High</p>
                </div>
              </div>
              
              {/* District List */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-body-md font-medium">Mayfair Central</span>
                  </div>
                  <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">88% Match</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-outline-variant/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary opacity-60"></span>
                    <span className="font-body-md">Chelsea Waterfront</span>
                  </div>
                  <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">74% Match</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-outline-variant/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary opacity-40"></span>
                    <span className="font-body-md">Belgravia South</span>
                  </div>
                  <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">61% Match</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-outline-variant/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary opacity-20"></span>
                    <span className="font-body-md">Marylebone Village</span>
                  </div>
                  <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">45% Match</span>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Recommendation */}
          <section className="col-span-12 lg:col-span-5 bg-surface-container-high rounded-xl p-6 shadow-sm border border-outline-variant/10 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h3 className="font-headline-sm text-2xl font-bold text-primary">Strategic Recommendation</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-outline-variant/20">
                  <p className="text-body-md italic text-on-surface">"Community data suggests a 22% increase in engagement for events focused on 'Sustainable Polo' in the Kensington area this quarter."</p>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-outline-variant/10">
                    <span className="material-symbols-outlined text-[18px] text-secondary">groups</span>
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Voted by 124 Ambassadors</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/50 rounded-xl border border-outline-variant/10">
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant opacity-60">Key Theme</span>
                    <p className="font-headline-sm text-lg font-bold text-primary mt-1">Equestrian Ethics</p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-xl border border-outline-variant/10">
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant opacity-60">Viral Factor</span>
                    <p className="font-headline-sm text-lg font-bold text-primary mt-1">High (8.4/10)</p>
                  </div>
                </div>
              </div>
              <button className="mt-6 flex items-center gap-2 text-primary font-bold font-label-caps text-[10px] uppercase group-hover:text-secondary transition-colors">
                Unlock Advanced Insights 
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
            {/* Background Icon */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <span className="material-symbols-outlined text-[120px]">psychology</span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
