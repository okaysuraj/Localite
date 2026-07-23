import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RestrictedAccessPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] font-body-md text-[#1b1c1c] min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-[#f5f3f3] shadow-[0_16px_32px_rgba(10,25,47,0.05)]">
        <div className="flex justify-between items-center px-6 py-2 max-w-7xl mx-auto h-20">
          <div className="flex items-center gap-4">
            <span 
              className="font-headline-md text-3xl font-bold text-primary italic tracking-tight cursor-pointer transition-transform active:scale-95"
              onClick={() => navigate('/dashboard')}
            >
              Localite
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer" onClick={() => navigate('/events')}>Gatherings</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Sports</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Community</a>
            <a className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-primary border-b-2 border-[#775a19] py-1 cursor-pointer">Concierge</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-[#44474d] cursor-pointer hover:text-[#775a19] transition-colors">notifications</button>
            <div 
              className="w-10 h-10 rounded-full bg-[#eae8e7] overflow-hidden cursor-pointer transition-transform active:scale-95"
              onClick={() => navigate('/profile')}
            >
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBReAKggFnsTCBpWDLB81rZdQzBYxwRr7xZrn9-W5S1RxRd_ErBp4hsBfVeR8dvbuaECq1TRxwSB7UfZsVOm_dcMoMwNZxkJWMENWKMYU9-bJZDMI-oBBLM1K0mxNDGqRTv0J3e5Wm8KTWbqSPxWpAwgpNkYen7Cffzy_9DC7S9KRQPu-WKKT26e0BBglrAlDKXvoMnYdYRQ_hUZOqiT_K1edMwUU1kL76ya2AGHFl9UdOh6pxKsijxwQ" 
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative overflow-hidden px-6 py-12">
        {/* Abstract Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(119,90,25,0.1),transparent)]"></div>
        </div>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Visual Side */}
          <div className="hidden md:block">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#775a19]/5 rounded-xl blur-2xl transition-all duration-700 group-hover:bg-[#775a19]/10"></div>
              <div className="relative aspect-[4/5] bg-white rounded-xl overflow-hidden shadow-[0_16px_32px_rgba(10,25,47,0.05)] border border-[#c5c6cd]/10">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
                <img 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgSBxCHiBmhF2W_qaCrsVolgEFSDEXr36MOQoJTAiaDyEiu-svMpJWMhGrdzFzS_XdmgzX5bsxF7V7OhCCoI1gW2X2X73GKUROBmSr1p5h5EWzLNdWUeos477kPYsNNQvOl_ynhAwSVwpYmIrJ_72TmzRXq4UFeYP3sspMIdBePcMgY-rfUxTanv3iZPKPDBLTGaXMpjhZ-cm43rbOcYEq5DGaGfB0nG1Y8g1OIrugeRz2AGyP4L_EWg" 
                  alt="Elite Lounge"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/80 to-transparent z-20">
                  <span className="font-label-caps text-[12px] font-bold text-[#ffdea5] uppercase tracking-widest block mb-2">The Guild Standard</span>
                  <p className="font-headline-sm text-2xl font-bold text-white italic">"Excellence is not an act, but a habit."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-16 h-1 bg-[#775a19] mb-6"></div>
            <span className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-[0.2em] mb-4">MEMBERSHIP REQUIRED</span>
            <h1 className="font-display-lg text-5xl font-bold text-primary mb-6 leading-tight">Reserved for the Exquisite Few</h1>
            <p className="font-body-lg text-lg text-[#44474d] mb-12 max-w-md">
              The requested experience is a curated privilege, strictly reserved for our <span className="text-primary font-bold">Gold Tier</span> members and above. Excellence requires discernment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="bg-primary text-white font-label-caps text-[12px] font-bold uppercase tracking-widest px-8 py-4 rounded-lg shadow-xl hover:bg-[#39475f] transition-all active:scale-95 flex items-center justify-center gap-2">
                View Membership Tiers
                <span className="material-symbols-outlined text-[18px]">military_tech</span>
              </button>
              <button 
                className="border border-[#775a19] text-[#775a19] font-label-caps text-[12px] font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-[#775a19]/5 transition-all active:scale-95 flex items-center justify-center gap-2"
                onClick={() => navigate('/dashboard')}
              >
                Return to Explore
                <span className="material-symbols-outlined text-[18px]">explore</span>
              </button>
            </div>

            <div className="mt-12 pt-6 border-t border-[#c5c6cd]/30 w-full">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[#fbf9f8] bg-[#efeded] overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd4jZuyMngorqJCB8zeVuKkWZdKTvQC36j1KtU14aSy_BD2QyqceH2AA5Xk-JjV1Qsg_IofPH8ywE7Z2wDV5z_Ch17ZcTjRvV8g8s1yoMtNeT0qEMZWudVGLFpLNddGZjoWTVCUTJRlwKf63JhfUojygAd_SKmI-iXc5O8T9G7chIxXFmo5i_psDSGad6DbgHSmMOuUdUxZieeL6qevJeQJb49bccc6YAAdVwgv-AfFv3IF8azDL1dXw" alt="Member" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#fbf9f8] bg-[#efeded] overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQJKCfRfbWdeK-3Gol-2TyA6CMuQsUplzp8W8vAyUPczts6XpnbnCPuesR3yJHvqTByUELffkeCNnjwTig3XGT1VQIXe1VDzkGQqFlpFij-vubPLyJF4s3FaWwMxE5hJ0rlpfCzdfpYQUVCnD9c5N8ifcRBCWTMmX8mq2frTXPSx3HnOgB6OmwOo033KIMAk7-zC_Vlc6OIWRfQFVZIuoWjzqgtxjyGJGF5u7ZophrQhm-imbimmuAVw" alt="Member" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#fbf9f8] bg-[#efeded] overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvrVtUXaEuvwIXwH7VwbFTaXq5H4BCkMFiiMLI8HDe7qkWmtALXC4XN45ncNbovV8njGrsxlE2zjlXQitg1xfzonykvjImCuKvQGBXycMkJ5cPbgpofrkA8gX-HXCidlpVCZvBmXku9sngZvfrGjYfH2orXQgCZlQZl_LUTJDIs3CFjpwzjL3OHpc-QsT3oy92pSBCikmoXCj5UQGqdUAQ5aw9kJ0WpiLlNjhthxc2p58VBVyk58GfXw" alt="Member" />
                  </div>
                </div>
                <p className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Joined by 1,200+ Elite Members</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 mt-12 bg-[#f5f3f3] border-t border-[#c5c6cd]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-headline-sm text-2xl font-bold text-primary">Localite</span>
            <p className="font-body-md text-[#46473f]">© 2024 Localite. Modern Nobility.</p>
          </div>
          <div className="flex gap-6">
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer">Privacy</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer">Terms</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer">House Rules</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors underline-offset-4 hover:underline cursor-pointer">Press</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
