import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEventCapacityRulesPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body-md min-h-[calc(100vh-73px)] flex">
      {/* SideNavBar is omitted or wrapped by layout in the app */}

      {/* Main Content Canvas */}
      <main className="flex-grow p-6 md:p-12 max-w-5xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12">
          <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-widest">STEP 03 OF 05</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-2">Capacity & House Rules</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Define the intimate boundaries of your gathering. Professional curation requires clear expectations and thoughtful logistics.
          </p>
        </div>

        {/* Creation Flow Form */}
        <div className="space-y-12">
          {/* Section 1: Event Logistics */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">groups</span>
              <h3 className="font-headline-sm text-headline-sm text-primary border-b border-secondary/20 pb-2 flex-grow">Event Logistics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">MAXIMUM GUESTS</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-low border-transparent rounded-lg p-4 text-primary font-body-md outline-none focus:ring-1 focus:ring-secondary" placeholder="e.g. 25" type="number"/>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-caps text-label-caps text-outline">MEMBERS</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">WAITLIST BEHAVIOR</label>
                <select className="w-full bg-surface-container-low border-transparent rounded-lg p-4 text-primary font-body-md outline-none focus:ring-1 focus:ring-secondary appearance-none cursor-pointer">
                  <option>First-come, first-served</option>
                  <option>Host Manual Selection</option>
                  <option>Weighted by Member Tier</option>
                </select>
              </div>
              
              <div className="col-span-1 md:col-span-2 flex items-center justify-between p-4 bg-surface-container-low rounded-lg mt-2">
                <div>
                  <h4 className="font-body-md font-bold text-primary">Private Guest List</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Only approved members can see who else is attending.</p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input className="peer absolute w-0 h-0 opacity-0" id="toggle-guest-list" type="checkbox"/>
                  <label className="block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer peer-checked:bg-secondary transition-colors" htmlFor="toggle-guest-list">
                    <span className="block w-4 h-4 mt-1 ml-1 rounded-full bg-white transition-transform peer-checked:translate-x-6"></span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: House Rules */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">gavel</span>
              <h3 className="font-headline-sm text-headline-sm text-primary border-b border-secondary/20 pb-2 flex-grow">House Rules</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-outline-variant/30 rounded-lg hover:border-secondary transition-colors">
                <div className="p-2 bg-surface-container-high rounded-full">
                  <span className="material-symbols-outlined text-primary">no_photography</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-body-md font-bold text-primary">Strict Privacy Policy</h4>
                  <p className="text-sm text-on-surface-variant mt-1">No social media posting or professional photography without consent.</p>
                </div>
                <div className="relative inline-block w-12 h-6 shrink-0 mt-2">
                  <input className="peer absolute w-0 h-0 opacity-0" defaultChecked id="rule-1" type="checkbox"/>
                  <label className="block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer peer-checked:bg-secondary transition-colors" htmlFor="rule-1">
                    <span className="block w-4 h-4 mt-1 ml-1 rounded-full bg-white transition-transform peer-checked:translate-x-6"></span>
                  </label>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-outline-variant/30 rounded-lg hover:border-secondary transition-colors">
                <div className="p-2 bg-surface-container-high rounded-full">
                  <span className="material-symbols-outlined text-primary">checkroom</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-body-md font-bold text-primary">Formal Dress Code</h4>
                  <p className="text-sm text-on-surface-variant mt-1">Mandatory business casual or formal attire for all attendees.</p>
                </div>
                <div className="relative inline-block w-12 h-6 shrink-0 mt-2">
                  <input className="peer absolute w-0 h-0 opacity-0" id="rule-2" type="checkbox"/>
                  <label className="block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer peer-checked:bg-secondary transition-colors" htmlFor="rule-2">
                    <span className="block w-4 h-4 mt-1 ml-1 rounded-full bg-white transition-transform peer-checked:translate-x-6"></span>
                  </label>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-outline-variant/30 rounded-lg hover:border-secondary transition-colors">
                <div className="p-2 bg-surface-container-high rounded-full">
                  <span className="material-symbols-outlined text-primary">wine_bar</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-body-md font-bold text-primary">Limited Alcohol</h4>
                  <p className="text-sm text-on-surface-variant mt-1">Service ends one hour before event conclusion.</p>
                </div>
                <div className="relative inline-block w-12 h-6 shrink-0 mt-2">
                  <input className="peer absolute w-0 h-0 opacity-0" defaultChecked id="rule-3" type="checkbox"/>
                  <label className="block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer peer-checked:bg-secondary transition-colors" htmlFor="rule-3">
                    <span className="block w-4 h-4 mt-1 ml-1 rounded-full bg-white transition-transform peer-checked:translate-x-6"></span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Custom Requirements */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">edit_note</span>
              <h3 className="font-headline-sm text-headline-sm text-primary border-b border-secondary/20 pb-2 flex-grow">Custom Requirements</h3>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">ADDITIONAL INSTRUCTIONS FOR GUESTS</label>
              <textarea className="w-full h-32 bg-surface-container-low border-transparent rounded-lg p-4 text-primary font-body-md outline-none focus:ring-1 focus:ring-secondary resize-none" placeholder="e.g. Please bring a bottle of your favorite vintage for the tasting segment..."></textarea>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                <span className="font-label-caps text-label-caps text-primary">ADD PRE-SCREENING QUESTION</span>
              </div>
              <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/10 flex items-center gap-2 cursor-pointer hover:bg-secondary/10 transition-colors">
                <span className="material-symbols-outlined text-secondary">attachment</span>
                <span className="font-label-caps text-label-caps text-secondary">ATTACH PDF DISCLOSURE</span>
              </div>
            </div>
          </section>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
            <button 
              onClick={() => navigate('/events/create/location')}
              className="flex items-center gap-2 text-on-surface-variant font-label-caps text-label-caps px-6 py-3 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              BACK
            </button>
            <div className="flex gap-4">
              <button className="font-label-caps text-label-caps text-secondary border border-secondary px-8 py-3 rounded-lg hover:bg-secondary/5 transition-all">
                SAVE DRAFT
              </button>
              <button 
                onClick={() => navigate('/events/create/payment')}
                className="font-label-caps text-label-caps bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all shadow-md"
              >
                CONTINUE TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
