import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEventBasicInfoPage() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [narrative, setNarrative] = useState('');

  return (
    <div className="bg-background text-on-background font-body-md min-h-[calc(100vh-73px)] flex flex-col">
      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-12 space-y-2">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Step 01 / 06</span>
            <div className="h-[1px] w-12 bg-secondary-container"></div>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary">The Foundation</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Begin your journey by defining the core identity of your gathering. This narrative will be the first impression for your guests.</p>
        </header>

        {/* Form Section */}
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-outline-variant/10">
          <form className="space-y-12">
            {/* Event Name */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Event Name</label>
                <span className={`text-[10px] font-medium ${eventName.length > 60 ? 'text-error' : 'text-outline'}`}>
                  {eventName.length}/60 Recommended
                </span>
              </div>
              <input 
                type="text" 
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                maxLength={100}
                placeholder="e.g. Midnight Soirée at the Gallery" 
                className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary placeholder:text-outline-variant/60 focus:ring-1.5 focus:ring-secondary transition-all outline-none"
              />
              <p className="text-[12px] text-outline italic">Titles that evoke emotion or setting perform 40% better.</p>
            </div>

            {/* Grid: Category & Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Category</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary appearance-none focus:ring-1.5 focus:ring-secondary transition-all cursor-pointer outline-none">
                    <option value="" disabled selected>Select a Sphere</option>
                    <option value="art">Art & Culture</option>
                    <option value="gastronomy">Fine Gastronomy</option>
                    <option value="wellness">Holistic Wellness</option>
                    <option value="networking">Professional Discourse</option>
                    <option value="leisure">Refined Leisure</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Intended Audience</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary appearance-none focus:ring-1.5 focus:ring-secondary transition-all cursor-pointer outline-none">
                    <option value="" disabled selected>Select a Group</option>
                    <option value="public">Open Community</option>
                    <option value="members">Verified Members Only</option>
                    <option value="curated">Curated Guest List</option>
                    <option value="inner-circle">Inner Circle</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">group</span>
                </div>
              </div>
            </div>

            {/* Narrative / Description */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">The Narrative</label>
                <span className={`text-[10px] font-medium ${narrative.length > 300 ? 'text-error' : 'text-outline'}`}>
                  {narrative.length}/300 Recommended
                </span>
              </div>
              <textarea 
                rows="6" 
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder="Describe the atmosphere, the flow of the evening, and what guests should expect to feel..." 
                className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary placeholder:text-outline-variant/60 focus:ring-1.5 focus:ring-secondary transition-all resize-none outline-none"
              ></textarea>
              <div className="flex items-start gap-2 bg-secondary-container/10 p-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary text-[18px]">lightbulb</span>
                <p className="text-[12px] text-on-secondary-container">Tip: Use sensory language. Instead of 'dinner', try 'a seasonal four-course experience under candlelight'.</p>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-outline-variant/20">
              <button 
                type="button" 
                onClick={() => navigate('/events')}
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-label-caps text-label-caps uppercase group"
              >
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Back to Hub
              </button>
              
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  type="button" 
                  className="flex-1 md:flex-none px-8 py-3 rounded-lg border border-secondary text-secondary font-label-caps text-label-caps uppercase hover:bg-secondary-fixed transition-all active:scale-[0.98]"
                >
                  Save Draft
                </button>
                <button 
                  type="button"
                  onClick={() => navigate('/events/create/datetime')} 
                  className="flex-1 md:flex-none px-8 py-3 rounded-lg bg-primary text-white font-label-caps text-label-caps uppercase hover:opacity-90 shadow-lg active:scale-[0.98] transition-all"
                >
                  Continue to Details
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Atmospheric Bento Visual Guide */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2 relative h-48 rounded-xl overflow-hidden group">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDWg5tcxB5SUz0SrEKgTPOjSKUqSVY4qPo_7jxticaYWbOG7uqpgUfHGNXQLtgA88KSg_Rm9K8P7boQ6Yygy11ubDNLGtLL8gDUSFCDNhufWyVCVsijL6DqAg3QQTuQq29wiig0nc66CKVNBT3EzIdy21OrO9qA7XRBMTGXNKmWnOIfVP2hLHD5fH2oocEjVyXZHIqeRD0zoqh_TmwiH0rNBvqsUff3zwxLRec5jrGFCTO7wPiHvDP7A" alt="Atmosphere" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <span className="text-white font-label-caps text-[10px] uppercase tracking-widest mb-1">Inspiration</span>
              <p className="text-white font-headline-sm text-headline-sm">Curating Atmosphere</p>
            </div>
          </div>
          <div className="bg-surface-container-high rounded-xl p-6 flex flex-col justify-center space-y-3">
            <span className="material-symbols-outlined text-secondary text-[32px]">auto_awesome</span>
            <h4 className="font-headline-sm text-[18px] text-primary">Need a Spark?</h4>
            <p className="font-body-md text-[14px] text-on-surface-variant">Our concierge AI can help refine your narrative based on your community's past preferences.</p>
            <button className="text-secondary font-label-caps text-label-caps uppercase text-[10px] underline decoration-secondary/30 hover:decoration-secondary self-start">Launch Assistant</button>
          </div>
        </section>
      </main>
    </div>
  );
}
