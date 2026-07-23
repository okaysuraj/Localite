import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportEventPage() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('misleading');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard'); // Go back to where it makes sense
    }, 2000);
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col selection:bg-[#fed488]">
      
      {/* TopAppBar */}
      <header className="flex justify-between items-center px-6 w-full sticky top-0 z-50 h-20 bg-[#fbf9f8] shadow-sm">
        <div className="flex items-center gap-8">
          <span className="font-display-lg text-4xl font-bold text-primary tracking-tighter cursor-pointer" onClick={() => navigate('/')}>Localite</span>
          <nav className="hidden md:flex gap-6">
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Explore</a>
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/events')}>My Events</a>
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Concierge</a>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-primary">
          <span className="material-symbols-outlined cursor-pointer hover:text-[#775a19] transition-colors">notifications</span>
          <span className="material-symbols-outlined cursor-pointer hover:text-[#775a19] transition-colors">mail</span>
          <div className="w-10 h-10 rounded-full bg-[#eae8e7] flex items-center justify-center overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3VjGUcPLkttUmj7TWBK3YEK_vBn-B-gfc3Pw6ILCDGsYfHVget8n_m9tqZ5yIDZxUyfWfdSDbiDbaHcawlKG2zuY8O5F8mFb5yMBNYw9UsRDbelciOvikZIAHnarYzrmh7BtOUzC92qfW__XPBDVoEIJ6XIX685hDKasOagiIU0_exOmBRHl4JEEALHiOR3QiEaWzwymOulP1PStQ9YBykSvfp6mb_L_4XCWHx46RmaEAt-7EVmeaBw" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 py-12 gap-6">
        
        {/* Left Column: Context & Branding */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-[#775a19] mb-2">
            <span className="material-symbols-outlined">shield</span>
            <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Trust & Safety</span>
          </div>
          <h1 className="font-display-lg text-5xl font-bold leading-tight mb-4 text-primary">Integrity of the Gathering.</h1>
          <p className="text-[#44474d] font-body-lg text-lg leading-relaxed">
            Localite is built on the foundation of curated excellence. If an event deviates from our standards of safety and authenticity, our community depends on your voice.
          </p>

          {/* Reassurance Card */}
          <div className="mt-6 p-6 rounded-xl bg-[#f5f3f3] border border-[#c5c6cd] shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined">gavel</span>
              </div>
              <div>
                <h4 className="font-label-caps text-[12px] font-bold text-primary uppercase tracking-widest">Protocol Committee</h4>
                <p className="text-xs text-[#44474d]">Reviewal Authority</p>
              </div>
            </div>
            <p className="text-[#44474d] text-sm italic leading-snug">
              "Every report is meticulously examined by our Protocol Committee to ensure the highest standards of our community are upheld. We maintain a zero-tolerance policy for misleading or unsafe environments."
            </p>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          
          {/* Event Summary Card */}
          <section className="bg-white rounded-xl p-6 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] flex flex-col md:flex-row gap-6 border border-[#e4e2e2]">
            <div className="w-32 h-32 md:w-40 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8vP_J90NK5W50Xtx52Fm84j9rbHcIc2tXf0NSoyCoiySUyW1N9MLjmqxx8RrwqDqCxJYZgLL5CQJBbNZhBLJv5nZmvcWFaYSjkLf686Q3yG2AfKzR3P9nL3SG7Dik_GwOe391H8CEnTP1qXHQzsteGQv0gV_Jm6X0jErYDYjWM3PXPg-VwPxAH5WPPgSNdP23LbEakzaSnUoCe8TB_NcOyJwgi87hVdZeUHKyAwj_0QMsEjySud4Bow" alt="Event" />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#775a19]">Reporting Event</span>
              <h2 className="font-headline-sm text-2xl font-bold text-primary">The Midnight Gala: Vernissage & Cocktails</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#44474d] scale-75">person</span>
                  <span className="text-[#44474d] font-medium text-sm">Host: Julian Thorne</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#44474d] scale-75">calendar_today</span>
                  <span className="text-[#44474d] font-medium text-sm">Oct 24, 2023 • 9:00 PM</span>
                </div>
              </div>
            </div>
          </section>

          {/* Report Reason Selection */}
          <form className="bg-white rounded-xl p-8 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#e4e2e2] flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <h3 className="font-label-caps text-[12px] font-bold text-[#84847b] mb-6 uppercase tracking-widest">Select Reason</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Reason Option 1 */}
                <label className="group relative flex items-center p-4 rounded-xl border border-[#c5c6cd] cursor-pointer hover:bg-[#f5f3f3] transition-all duration-300">
                  <input className="hidden peer" name="reason" type="radio" value="misleading" checked={reason === 'misleading'} onChange={() => setReason('misleading')} />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${reason === 'misleading' ? 'border-primary' : 'border-[#c5c6cd]'}`}>
                    {reason === 'misleading' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">Misleading Information</span>
                    <span className="text-xs text-[#44474d]">Incorrect location, time, or false promises.</span>
                  </div>
                </label>
                
                {/* Reason Option 2 */}
                <label className="group relative flex items-center p-4 rounded-xl border border-[#c5c6cd] cursor-pointer hover:bg-[#f5f3f3] transition-all duration-300">
                  <input className="hidden peer" name="reason" type="radio" value="safety" checked={reason === 'safety'} onChange={() => setReason('safety')} />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${reason === 'safety' ? 'border-primary' : 'border-[#c5c6cd]'}`}>
                    {reason === 'safety' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">Safety Concerns</span>
                    <span className="text-xs text-[#44474d]">Potential for harm or dangerous environment.</span>
                  </div>
                </label>

                {/* Reason Option 3 */}
                <label className="group relative flex items-center p-4 rounded-xl border border-[#c5c6cd] cursor-pointer hover:bg-[#f5f3f3] transition-all duration-300">
                  <input className="hidden peer" name="reason" type="radio" value="inappropriate" checked={reason === 'inappropriate'} onChange={() => setReason('inappropriate')} />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${reason === 'inappropriate' ? 'border-primary' : 'border-[#c5c6cd]'}`}>
                    {reason === 'inappropriate' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">Inappropriate Content</span>
                    <span className="text-xs text-[#44474d]">Explicit imagery or discriminatory themes.</span>
                  </div>
                </label>

                {/* Reason Option 4 */}
                <label className="group relative flex items-center p-4 rounded-xl border border-[#c5c6cd] cursor-pointer hover:bg-[#f5f3f3] transition-all duration-300">
                  <input className="hidden peer" name="reason" type="radio" value="spam" checked={reason === 'spam'} onChange={() => setReason('spam')} />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${reason === 'spam' ? 'border-primary' : 'border-[#c5c6cd]'}`}>
                    {reason === 'spam' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">Spam or Scam</span>
                    <span className="text-xs text-[#44474d]">Phishing attempts or commercial solicitation.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <h3 className="font-label-caps text-[12px] font-bold text-[#84847b] mb-4 uppercase tracking-widest">Incident Details</h3>
              <textarea 
                className="w-full bg-[#efeded] border-[1.5px] border-transparent focus:border-[#775a19] focus:bg-white rounded-xl p-4 font-body-md text-primary placeholder:text-[#75777e] outline-none transition-all resize-none" 
                placeholder="Please describe the issue with as much detail as possible. This information is confidential and will only be seen by the Protocol Committee." 
                rows="5"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxLength={500}
              ></textarea>
              <p className={`mt-2 text-xs text-right ${details.length > 450 ? 'text-[#ba1a1a]' : 'text-[#44474d]'}`}>{details.length} / 500 characters</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#e4e2e2]">
              <button 
                className="px-8 py-3 rounded-full border border-[#775a19] text-[#775a19] font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#fed488]/20 transition-all active:scale-95" 
                type="button"
                onClick={() => navigate('/dashboard')}
              >
                CANCEL
              </button>
              <button 
                className="px-10 py-3 rounded-full bg-primary text-white font-label-caps text-[12px] font-bold uppercase tracking-widest shadow-lg hover:opacity-90 transition-all active:scale-95" 
                type="submit"
                disabled={submitted}
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span> 
                    PROCESSING...
                  </span>
                ) : (
                  'SUBMIT REPORT'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Credit */}
      <footer className="mt-auto py-8 text-center border-t border-[#c5c6cd] bg-[#f5f3f3]">
        <p className="font-label-caps text-[12px] font-bold text-[#84847b] uppercase tracking-widest">© 2023 Localite Concierge. Modern Nobility in Community.</p>
      </footer>

      {/* Success Modal */}
      {submitted && (
        <div className="fixed inset-0 bg-[#fbf9f8]/90 backdrop-blur-sm flex items-center justify-center p-6 z-[60]">
          <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] text-center animate-[fade-in_0.5s_ease-out]">
            <div className="w-20 h-20 bg-[#fed488] text-[#775a19] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[40px]">verified_user</span>
            </div>
            <h2 className="font-headline-sm text-3xl font-bold mb-4 text-primary">Report Logged</h2>
            <p className="font-body-md text-[#44474d] mb-8 leading-relaxed">
              Your concerns have been transmitted securely to the Protocol Committee. We value your commitment to the community's integrity.
            </p>
            <button 
              className="w-full py-4 bg-primary text-white font-label-caps text-[12px] font-bold rounded-full tracking-widest uppercase hover:opacity-90 transition-all"
              onClick={() => navigate('/dashboard')}
            >
              RETURN TO EXPLORE
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
