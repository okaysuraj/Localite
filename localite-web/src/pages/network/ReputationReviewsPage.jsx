import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReputationReviewsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen">
      
      {/* Top Navigation Bar */}
      <nav className="w-full top-0 sticky z-50 bg-[#fbf9f8] shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] h-20 px-6 py-2 flex justify-between items-center max-w-full mx-auto">
        <div className="flex items-center gap-6">
          <h1 className="font-display-lg text-4xl font-bold text-primary tracking-tight cursor-pointer" onClick={() => navigate('/')}>Localite</h1>
          <div className="hidden md:flex items-center ml-10 space-x-8">
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Venues</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-primary border-b-2 border-[#775a19] transition-colors duration-300 pb-1 cursor-pointer">Standing</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d]">search</span>
            <input 
              className="bg-[#f2f0f0] border border-transparent focus:border-[#775a19] focus:outline-none pl-10 pr-4 py-2 rounded-full w-64 font-label-caps text-[10px] font-bold uppercase tracking-widest transition-colors duration-200" 
              placeholder="Search members..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-4 cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd]" onClick={() => navigate('/profile/setup/final')}>
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGtlbsakGel-dUbvMVx3uptuwQuUi29TA6SYRUI-AqYu34cdrloMm50CzNWTUDTxTT_oiTFLe_6CHgdzywoqiI0Gm9i0YyKbTfJJGkqtOHHzmvG5BWeDROmzYDiGlCmRV7cGQqpG7l1yvSUJAUVDYAnZJZghQWqdymFTTjia66eLfyJhHWHziL222zoF6SlYCnRthYjwZN5Yy2rlk2EMUj7gnvnCsqWXVaX9xVOGJrUxK_ZkdZYNo_0w" alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-label-caps text-[12px] font-bold text-[#775a19] mb-2 uppercase tracking-widest">Member Performance</p>
            <h2 className="font-display-lg text-5xl font-bold text-primary mb-4">Community Standing</h2>
            <p className="font-body-lg text-lg text-[#44474d] italic">Refining the art of local gathering through mutual respect and exceptional engagement.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-3 border border-[#775a19] text-[#775a19] font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#775a19] hover:text-white transition-all duration-300">
              REQUEST REVIEW
            </button>
          </div>
        </header>

        {/* Bento Grid for High-Fidelity Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Reputation Score Card */}
          <div className="md:col-span-2 bg-white shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] rounded-xl p-6 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-label-caps text-[12px] font-bold text-[#44474d] mb-1 uppercase tracking-widest">CURRENT RANKING</p>
                  <h3 className="font-headline-md text-3xl font-bold text-primary">Elite Tier</h3>
                </div>
                <div className="bg-[#fed488] px-3 py-1 rounded-full">
                  <p className="font-label-caps text-[10px] font-bold text-[#785a1a] uppercase tracking-widest">TOP 2%</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-7xl font-display-lg font-bold text-primary">98</span>
                <span className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">/ 100</span>
              </div>
              <div className="w-full bg-[#eae8e7] h-1.5 rounded-full overflow-hidden mb-6">
                <div className="bg-primary h-full transition-all duration-1000" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 relative z-10">
              <div>
                <p className="font-label-caps text-[12px] font-bold text-[#75777e] mb-1 uppercase tracking-widest">ATTENDANCE</p>
                <p className="font-body-md text-primary font-bold">100%</p>
              </div>
              <div>
                <p className="font-label-caps text-[12px] font-bold text-[#75777e] mb-1 uppercase tracking-widest">CONTRIBUTION</p>
                <p className="font-body-md text-primary font-bold">High</p>
              </div>
              <div>
                <p className="font-label-caps text-[12px] font-bold text-[#75777e] mb-1 uppercase tracking-widest">VOUCHES</p>
                <p className="font-body-md text-primary font-bold">42</p>
              </div>
            </div>
            {/* Subtle Decorative Background Element */}
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[240px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </div>
          </div>

          {/* Reliability Card */}
          <div className="bg-primary text-white rounded-xl p-6 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-[#ffdea5] text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <h3 className="font-headline-sm text-2xl font-bold mb-2">Reliability</h3>
              <p className="font-body-md text-[#76849f] leading-relaxed">
                Your consistent presence at prestigious local gatherings strengthens the community fabric.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-[#39475f]">
              <div className="flex justify-between items-center">
                <p className="font-label-caps text-[12px] font-bold uppercase tracking-widest">LATE ARRIVALS</p>
                <p className="font-headline-sm text-2xl font-bold text-[#ffdea5]">0</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials / Reviews Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline-sm text-2xl font-bold text-primary">Member Testimonials</h3>
            <div className="flex gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[#775a19]">tune</span>
              <p className="font-label-caps text-[12px] font-bold text-[#44474d] hover:text-[#775a19] uppercase tracking-widest">RECENT FIRST</p>
            </div>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {/* Review 1 */}
            <div className="break-inside-avoid bg-white p-6 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#eae8e7] transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxJcL5jfIrn-OROcWpCcElitLp7TNXVkTFdM4M0e120p4cVd0Svqj45GlvFfS2VeL3Zi_camJPPRfzKdtJkQEg8dsgSrD9zzpUvhED-yjop6wXCL_JX0Z99UixV1gpqMkpRwauMrM7dj0Dp2lH1LwdU_840LmEdP61EqxkUOHitTF7yRlup8HgRH7XACo9VJZdRgyqM9Xx2gxrA_3BU6fIsBh_nqoww4xvqtNlr-marJXwsB4tSgTMwQ" alt="Reviewer" />
                </div>
                <div>
                  <p className="font-label-caps text-[12px] font-bold text-primary uppercase tracking-widest">Clara Harrington</p>
                  <p className="text-[10px] text-[#44474d]">Host of 'The Gallery Evening'</p>
                </div>
              </div>
              <div className="flex text-[#775a19] mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-primary leading-relaxed italic">
                "An absolute pleasure to host. They bring a level of conversation that truly elevates the entire table. Insightful, punctual, and remarkably gracious."
              </p>
              <p className="mt-4 text-[11px] font-label-caps font-bold text-[#75777e] uppercase tracking-widest">OCTOBER 14, 2024</p>
            </div>

            {/* Review 2 */}
            <div className="break-inside-avoid bg-white p-6 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#eae8e7] transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQthL_5dFka9vgs1P-vF62KP3xrGEdiJzhx70H_pHe6A3rz7w9BNP4eK0a9O5hWnIGOp28eZbUKJRu-WXS0ZazQ_rq83zMwKGl32E4M4J0228JA7aQh8g1hPeyOgdKMrPW52b2LfWhntWS0cwWGXDsa0SClCKP3agauPBt77GPW3VbQqVbuM-tdfEDJNG-ZPZJ7wMtEV5LwMempiUUTHO4Sc_voXvOp6g1asqECaQakfeOvd4RvkxFkg" alt="Reviewer" />
                </div>
                <div>
                  <p className="font-label-caps text-[12px] font-bold text-primary uppercase tracking-widest">Julian Vane</p>
                  <p className="text-[10px] text-[#44474d]">Founder, Localite Circle</p>
                </div>
              </div>
              <div className="flex text-[#775a19] mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-primary leading-relaxed italic">
                "Consistently demonstrates the values of our community. Their recent contribution to the charity auction was both generous and humble. A cornerstone member."
              </p>
              <p className="mt-4 text-[11px] font-label-caps font-bold text-[#75777e] uppercase tracking-widest">SEPTEMBER 28, 2024</p>
            </div>

            {/* Review 3 */}
            <div className="break-inside-avoid bg-white p-6 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#eae8e7] transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2LTYfIbl0bQ2EVV63wZU8HxAdYxLKeM44AQbbAKqSrRHqOIhEfeD3fT_aDPxRaBai4n43FhYyVZeoPij6vXmDjjYOYdCwmSPOCaDjOY2eS08O3pkH9_SCeJK-hpJ410D8kaqXF6-j2Yjb2zm2AO4x6I0XJGPb4hRuNlgnQiEqxRXHlpHd2-JrfsbCn-qbNlWxrfDqJrbu1r2jAZ60zqEEAZP9jUN9HVuj3TV7S3BWIvBqZ00n_dim0w" alt="Reviewer" />
                </div>
                <div>
                  <p className="font-label-caps text-[12px] font-bold text-primary uppercase tracking-widest">Sienna Brooks</p>
                  <p className="text-[10px] text-[#44474d]">Member since 2022</p>
                </div>
              </div>
              <div className="flex text-[#775a19] mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-primary leading-relaxed italic">
                "Rarely do you meet someone who listens as intently as they speak. A wonderful addition to any intimate gathering."
              </p>
              <p className="mt-4 text-[11px] font-label-caps font-bold text-[#75777e] uppercase tracking-widest">SEPTEMBER 02, 2024</p>
            </div>
            
            {/* Review 4 */}
            <div className="break-inside-avoid bg-white p-6 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#eae8e7] transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0GMIUEp70vCZaHqErbaN2WGv84eixd54kIN-3aWcVZdaq8P2jrPb5jc4Ft4vVzHdxHMdbwJ2S6aGUq4ujMMsT9g8IQxFVhxqVRhHxFFFdkw7-oo2sNsNMKdcCzRvpkAGLgxhnJzpaRHK-QmF_agkioAUvyjtd4UzOm0mykUHs9tvkckv140Bjk6T-FmHxvpCQ9qZsLPT9L-ym_NI0GH_vuQtBGgVmlJXoGYyjDoF3kwSC_ucdAcaOyA" alt="Reviewer" />
                </div>
                <div>
                  <p className="font-label-caps text-[12px] font-bold text-primary uppercase tracking-widest">Marcus Thorne</p>
                  <p className="text-[10px] text-[#44474d]">Member</p>
                </div>
              </div>
              <div className="flex text-[#775a19] mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-primary leading-relaxed italic">
                "Prompt, reliable, and exceptionally polite. Always a pleasure to see their name on the guest list for my events."
              </p>
              <p className="mt-4 text-[11px] font-label-caps font-bold text-[#75777e] uppercase tracking-widest">AUGUST 19, 2024</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button className="font-label-caps text-[12px] font-bold text-[#44474d] hover:text-primary uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto">
              LOAD MORE STANDING RECORDS
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mt-12 p-6 bg-[#f5f3f3] rounded-xl">
          <h3 className="font-headline-sm text-2xl font-bold text-primary mb-6">Distinctions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-white shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#775a19] text-3xl">wine_bar</span>
              </div>
              <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest">CONNOISSEUR</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-white shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#775a19] text-3xl">handshake</span>
              </div>
              <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest">NETWORKER</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-white shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#775a19] text-3xl">event_available</span>
              </div>
              <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest">PERFECT PRESENCE</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-white shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#775a19] text-3xl">forum</span>
              </div>
              <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest">ENGAGING VOICE</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-12 bg-[#efeded] border-t border-[#c5c6cd] flex flex-col md:flex-row justify-between items-center px-6 py-12 gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-display-lg-mobile text-4xl font-bold text-primary mb-2">Localite</h2>
          <p className="font-body-md text-[#44474d]">© 2024 Localite. Modern Nobility.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] transition-all duration-300 cursor-pointer">Privacy Policy</a>
          <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] transition-all duration-300 cursor-pointer">Terms of Service</a>
          <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] transition-all duration-300 cursor-pointer">Press Kit</a>
          <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary underline decoration-[#775a19] transition-all duration-300 cursor-pointer">Contact Us</a>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-[#44474d] hover:text-primary cursor-pointer transition-colors">public</span>
          <span className="material-symbols-outlined text-[#44474d] hover:text-primary cursor-pointer transition-colors">share</span>
        </div>
      </footer>
    </div>
  );
}
