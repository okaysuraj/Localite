import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExtendInvitationPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('REGAL-882-ELITE');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md overflow-x-hidden min-h-screen flex flex-col">
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 left-0 w-full h-20 flex justify-between items-center px-6 py-2 bg-[#fbf9f8] shadow-[0_16px_32px_rgba(10,25,47,0.05)] z-50">
        <div className="flex items-center gap-6 max-w-7xl w-full mx-auto">
          <span 
            className="font-headline-md text-3xl font-bold text-primary cursor-pointer tracking-tight"
            onClick={() => navigate('/dashboard')}
          >
            Regal Connection
          </span>
          <div className="hidden md:flex gap-6 ml-12 flex-grow">
            <a className="text-[#44474d] hover:text-[#775a19] transition-colors font-label-caps uppercase tracking-widest text-[12px] font-bold cursor-pointer">Dashboard</a>
            <a className="text-[#44474d] hover:text-[#775a19] transition-colors font-label-caps uppercase tracking-widest text-[12px] font-bold cursor-pointer">Events</a>
            <a className="text-primary font-bold border-b-2 border-[#ffdea5] font-label-caps uppercase tracking-widest text-[12px] cursor-pointer">The Registry</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-primary p-2 hover:bg-[#efeded] transition-all rounded-full cursor-pointer">notifications</button>
            <button className="material-symbols-outlined text-primary p-2 hover:bg-[#efeded] transition-all rounded-full cursor-pointer">settings</button>
            <div className="w-10 h-10 rounded-full bg-[#eae8e7] border border-[#c5c6cd] overflow-hidden cursor-pointer" onClick={() => navigate('/profile')}>
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyNbSxlVf-9qhIc9R-B0OQJFWk8z9XnCpkQyCto_eVJlBEWjcOdYN2yL_CIx2xz6SiLGl-peqt_SIhgQ7KkLuDU6CmPkxWztMawIC1oHbJCqnr0JdMXVYNojvMFXsKVkV2He32ip-3zJEJXTNK9kq_ckElmv2bPD3eXjuvBLmi_Wd9T9SuoeK8MBzPVTk3k-Bfldti8tcW7y6XBkElXC2hVfe3PQD9JOYCqCS2hSibCDfkwks1mYj1aA" alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 pt-20">
        {/* Sidebar Shell */}
        <aside className="hidden md:flex w-64 fixed left-0 top-20 h-[calc(100vh-80px)] flex-col p-4 gap-6 bg-[#f5f3f3] shadow-[4px_0_24px_rgba(10,25,47,0.03)] z-40">
          <div className="px-4 mb-6">
            <h2 className="font-headline-sm text-2xl font-bold text-primary">The Registry</h2>
            <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest opacity-70">Elite Membership</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-2 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg group cursor-pointer">
              <span className="material-symbols-outlined group-hover:text-primary">dashboard</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">DASHBOARD</span>
            </a>
            <a className="flex items-center gap-2 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg group cursor-pointer">
              <span className="material-symbols-outlined group-hover:text-primary">event</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">EVENTS</span>
            </a>
            <a className="flex items-center gap-2 px-4 py-3 text-primary font-bold bg-[#e4e2e2] rounded-lg cursor-pointer">
              <span className="material-symbols-outlined">leaderboard</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">RANKINGS</span>
            </a>
            <a className="flex items-center gap-2 px-4 py-3 text-[#44474d] hover:bg-[#eae8e7] transition-all rounded-lg group cursor-pointer">
              <span className="material-symbols-outlined group-hover:text-primary">emoji_events</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">ACHIEVEMENTS</span>
            </a>
          </nav>
          <div className="mt-auto flex flex-col gap-2">
            <button className="bg-primary text-white py-4 px-4 font-label-caps text-[12px] font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all mb-4 rounded-lg">
              HOST NEW EVENT
            </button>
            <a className="flex items-center gap-2 px-4 py-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">SUPPORT</span>
            </a>
            <a className="flex items-center gap-2 px-4 py-2 text-[#44474d] hover:text-[#ba1a1a] transition-colors cursor-pointer">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">LOGOUT</span>
            </a>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="md:ml-64 flex-1">
          <div className="max-w-6xl mx-auto px-6 py-12">
            
            {/* Header Section */}
            <header className="mb-12">
              <h1 className="font-display-lg text-5xl font-bold text-primary mb-2">Extend the Invitation</h1>
              <p className="font-body-lg text-lg text-[#44474d] max-w-2xl">Shape the future of our guild. Nominate individuals of distinction to join the inner circle and unlock greater tiers of influence.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Personal Cipher Card (CTA) */}
              <section className="lg:col-span-4 flex flex-col">
                <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-6 h-full flex flex-col hover:shadow-[0_24px_48px_rgba(10,25,47,0.08)] transition-all duration-300">
                  <div className="flex flex-col items-center text-center gap-2 mb-6">
                    <span className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-[0.2em] mb-2">Your Identity</span>
                    <h3 className="font-headline-sm text-2xl font-bold text-primary">Personal Cipher</h3>
                  </div>
                  
                  <div 
                    className="relative bg-[#f5f3f3] rounded-lg p-6 border border-[#c5c6cd]/30 flex flex-col items-center justify-center gap-4 group cursor-pointer overflow-hidden"
                    onClick={handleCopy}
                  >
                    <div className="absolute inset-0 bg-[#775a19]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="font-headline-md text-3xl font-bold tracking-[0.1em] text-primary select-all">REGAL-882-ELITE</span>
                    <div className="flex items-center gap-2 text-[#775a19]">
                      <span className="material-symbols-outlined text-[20px]">content_copy</span>
                      <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">COPY WORDMARK</span>
                    </div>
                    {copied && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-3 rounded-full transition-opacity">COPIED</div>
                    )}
                  </div>
                  
                  <p className="mt-6 text-[#44474d] font-body-md text-sm leading-relaxed">
                    Provide this cipher to peers. Each successful enrollment via your wordmark increases your standing within the <span className="italic">Modern Nobility</span> network.
                  </p>
                  
                  <div className="mt-auto pt-6 flex flex-col gap-3">
                    <button className="bg-primary text-white py-3 font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:bg-opacity-90 active:scale-95 transition-all">DIRECT SHARE</button>
                    <button className="border border-[#775a19] text-[#775a19] py-3 font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#775a19]/5 active:scale-95 transition-all">GENERATIVE INVITE</button>
                  </div>
                </div>
              </section>

              {/* Tiers of Influence (Progress Tracker) */}
              <section className="lg:col-span-8">
                <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-6">
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      <span className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-[0.2em] mb-2">Progress</span>
                      <h3 className="font-headline-sm text-2xl font-bold text-primary">Tiers of Influence</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-sm text-2xl font-bold text-primary">07</span>
                      <span className="font-label-caps text-[12px] font-bold text-[#44474d] ml-2">/ 10 Points</span>
                    </div>
                  </div>

                  {/* Horizontal Roadmap */}
                  <div className="relative pt-12 pb-8 overflow-hidden md:overflow-visible">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2" style={{ background: 'linear-gradient(90deg, #000000 0%, #000000 65%, #c5c6cd 65%, #c5c6cd 100%)' }}></div>
                    
                    <div className="relative flex justify-between">
                      {/* Point 1: Initiated */}
                      <div className="flex flex-col items-center gap-4 relative z-10 w-24">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg border-4 border-white">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </div>
                        <div className="text-center w-full">
                          <p className="font-label-caps text-[12px] font-bold text-primary truncate">INITIATED</p>
                          <p className="text-[11px] text-[#44474d] truncate">Guild Entry</p>
                        </div>
                      </div>

                      {/* Point 2: Sovereign Entry */}
                      <div className="flex flex-col items-center gap-4 relative z-10 w-24">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg border-4 border-white">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                        <div className="text-center w-full">
                          <p className="font-label-caps text-[12px] font-bold text-primary truncate">SOVEREIGN</p>
                          <p className="text-[11px] text-[#44474d] truncate">Lounge Access</p>
                        </div>
                      </div>

                      {/* Point 3: Elite Status (Current Goal) */}
                      <div className="flex flex-col items-center gap-4 relative z-10 w-24">
                        <div className="w-16 h-16 -mt-2 rounded-full bg-white border-2 border-[#775a19] flex items-center justify-center text-[#775a19] shadow-[0_0_20px_rgba(119,90,25,0.2)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                          <span className="material-symbols-outlined text-[32px]">shield</span>
                        </div>
                        <div className="text-center w-full">
                          <p className="font-label-caps text-[12px] font-bold text-[#775a19] truncate">ELITE STATUS</p>
                          <p className="text-[11px] text-[#44474d] truncate">Priority Concierge</p>
                        </div>
                      </div>

                      {/* Point 4: Grand Chancellor */}
                      <div className="flex flex-col items-center gap-4 relative z-10 opacity-40 hidden sm:flex w-24">
                        <div className="w-12 h-12 rounded-full bg-[#e4e2e2] flex items-center justify-center text-[#44474d] border-4 border-white">
                          <span className="material-symbols-outlined">workspace_premium</span>
                        </div>
                        <div className="text-center w-full">
                          <p className="font-label-caps text-[12px] font-bold truncate">CHANCELLOR</p>
                          <p className="text-[11px] text-[#44474d] truncate">Governance Voting</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#efeded] rounded-lg border-l-4 border-[#775a19]">
                    <p className="font-body-md text-sm text-primary">
                      <strong className="font-bold">Next Milestone:</strong> Invite 3 more qualified members to unlock <span className="font-bold text-[#775a19]">Elite Status</span>. This grants immediate access to the 24/7 Global Concierge and annual Founders' Gala.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Successful Attestations (Detailed List) */}
            <section className="mt-12">
              <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] overflow-hidden">
                <div className="p-6 border-b border-[#c5c6cd]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="font-headline-sm text-2xl font-bold text-primary">Successful Attestations</h3>
                  <div className="relative w-full sm:w-auto">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474d] text-[20px]">search</span>
                    <input className="pl-10 pr-4 py-2 bg-[#f5f3f3] border-none rounded-lg text-sm focus:ring-1 focus:ring-[#775a19] outline-none font-body-md w-full sm:w-64" placeholder="Search members..." type="text" />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-[#eae8e7]/30">
                      <tr>
                        <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Member</th>
                        <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Enrollment Date</th>
                        <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Contribution</th>
                        <th className="px-6 py-4 font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c5c6cd]/20">
                      {/* Row 1 */}
                      <tr className="hover:bg-[#efeded]/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#efeded]">
                              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsoHLm0s6h5_1OWZT_7fhbD2Id8i1gPlpmFOFRmPDhaHorxakKGb1kcv-3GF-x-DgwFLqHcolyPY7ILAbDxnsghP3k36rHw-JbgmJ9Zf46actyqGO8d87rA7NQPXEiGRlx_55M_ucWH6kMYeloCz-c8WhGP1P8NUeASTPI-O-ed0eAG8f3_cU9fqHL9vBqDOv77rYlb35l4dCFtlqT-5cBxKlwhGQWmnEbmsN64WIywS7WQXb1ed19ig" alt="Julianne" />
                            </div>
                            <div>
                              <p className="font-body-md font-bold text-primary">Julianne V. Sterling</p>
                              <p className="text-xs text-[#44474d]">Archivist Class</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-body-md text-primary">Oct 12, 2023</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fed488] text-[#785a1a] text-[11px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span> Sovereign
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-body-md text-primary">+2 Influence Pts</p>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="material-symbols-outlined text-[#44474d] hover:text-primary transition-colors cursor-pointer p-2">more_horiz</button>
                        </td>
                      </tr>
                      
                      {/* Row 2 */}
                      <tr className="hover:bg-[#efeded]/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#efeded]">
                              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiScf3wMkKT4SdjwdAZ8AqscQBCMtAz5TjSZM6ixCdaZBcW6-xMHEKndljDuDCtrk7a-jReKj-2XvJZtLA7mieRM0dAuu-WOz9BXrVFYCD4rAPZw9YGp68JmSeaM1-O6glRTQ1AN5Ti-z7uto4TJkezo5zs2UX5ckxsJD8vvR_I_KUbzuqsjeANN-gLoXAlOqFmzWOJE6oIRVD7SRmeZPlgPxh2s9yx15XKwKxIsiKKqIQt4NX-61v8g" alt="Arthur" />
                            </div>
                            <div>
                              <p className="font-body-md font-bold text-primary">Arthur P. Hawthorne</p>
                              <p className="text-xs text-[#44474d]">Patron Class</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-body-md text-primary">Nov 04, 2023</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e4e2e2] text-[#44474d] text-[11px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#75777e]"></span> Active
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-body-md text-primary">+3 Influence Pts</p>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="material-symbols-outlined text-[#44474d] hover:text-primary transition-colors cursor-pointer p-2">more_horiz</button>
                        </td>
                      </tr>
                      
                      {/* Row 3 */}
                      <tr className="hover:bg-[#efeded]/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#efeded]">
                              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp3UD3qtCIz-9pS5AgCu6jnfSeQ6bsZhS4CtXfpwjJvfZ3-ssm0UDDsSad7wWjqLZi__WVUABKNrMSIr1jTZIK9mqzRGzdPNTJOtXih1Afxl2EAjN7vivChF6Co5sPj9Xe8pk4Ixe1Y27P5Y1_zgsJvvZ4OUQA6mmiMLicsZvKXuEl-BsTaQpqy1aOFScsh6KLMydFOGmIcEkB7W_6thd85Ycjef3-AbcmFZnpP2mMxInRZLmo1hbNQQ" alt="Elara" />
                            </div>
                            <div>
                              <p className="font-body-md font-bold text-primary">Elara Montague</p>
                              <p className="text-xs text-[#44474d]">Curator Class</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-body-md text-primary">Dec 28, 2023</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d1c32] text-[#76849f] text-[11px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Elite
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-body-md text-primary">+2 Influence Pts</p>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="material-symbols-outlined text-[#44474d] hover:text-primary transition-colors cursor-pointer p-2">more_horiz</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 flex justify-between items-center bg-[#f5f3f3]/50">
                  <p className="text-xs text-[#44474d] font-body-md">Showing 3 of 14 Attestations</p>
                  <div className="flex gap-2">
                    <button className="p-2 border border-[#c5c6cd] rounded-lg hover:bg-[#efeded] transition-all cursor-pointer"><span className="material-symbols-outlined">chevron_left</span></button>
                    <button className="p-2 border border-[#c5c6cd] rounded-lg hover:bg-[#efeded] transition-all cursor-pointer"><span className="material-symbols-outlined">chevron_right</span></button>
                  </div>
                </div>
              </div>
            </section>
            
          </div>
        </main>
      </div>

      {/* Footer Shell */}
      <footer className="md:ml-64 w-auto py-6 mt-auto bg-white border-t border-[#c5c6cd] z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-2 text-center">
          <p className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">© 2024 REGAL CONNECTION. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 mt-2">
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] hover:text-primary transition-colors underline cursor-pointer">PRIVACY POLICY</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] hover:text-primary transition-colors underline cursor-pointer">TERMS OF SERVICE</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] hover:text-primary transition-colors underline cursor-pointer">MEMBER CHARTER</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
