import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SafetyEtiquetteGuidelinesPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md selection:bg-[#fed488] min-h-screen">
      
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center px-6 w-full sticky top-0 z-50 h-20 bg-[#fbf9f8] shadow-[0_4px_20px_-5px_rgba(10,25,47,0.08)]">
        <div className="flex items-center gap-12">
          <h1 className="font-display-lg text-4xl font-bold text-primary tracking-tighter cursor-pointer" onClick={() => navigate('/')}>Localite</h1>
          <nav className="hidden md:flex gap-8 items-center">
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/dashboard')}>Explore</a>
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/events')}>Events</a>
            <a className="text-primary font-bold border-b-2 border-[#775a19] font-label-caps text-[12px] uppercase tracking-widest cursor-pointer pb-1">Safety Center</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </div>
          <span className="material-symbols-outlined text-primary text-2xl cursor-pointer">mail</span>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcjhW6-5bHH5VqVrtzU53y9Ie8f9erE_1pf0yln8FnjNoPvU0BAa3Xi3LBhiBIiFAdZneyzhv_2-1cFdyPll-IIV-BdNVfHsA1oMREXw2du1b_Xi_qcLBXJyx8XnQTMVMgBCASFTE5MRIH7HgbVSaGGfbbfq_tewCqZUtfJ_adNFrtEXHa-U7XycB3qCk8fzmSED-hfXrV3ZmxCoVh_qnCvfW7lpCheDi2a3D-ysZHgARD5sdod7p0Gw" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center pr-12">
            <span className="font-label-caps text-[12px] font-bold text-[#775a19] mb-4 uppercase tracking-[0.2em]">The Concierge Chronicles</span>
            <h2 className="font-display-lg text-[64px] font-bold leading-tight mb-8">The Protocol: A Guide to Modern Gathering</h2>
            <p className="font-body-lg text-lg text-[#44474d] max-w-xl leading-relaxed">
              True community is built upon the foundation of mutual respect and intentionality. Explore our curated standards for safe, elegant, and meaningful third-place interactions.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 h-[600px] rounded-xl overflow-hidden shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img className="w-full h-full object-cover relative z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyeln8N0r4WkG-eSXu-hlNapgdgP6dex7AgONL9y4odq7S0SPrpiYxM5yrDfmUFlXwOefuUkIilwm1tmm1dFmz1NfwJ_1C1nAUwRnquOsgLfV1DGruAoXBy06qq2eu6RxSdxq_8k7hM5jBcyco-gayhQPML8iQlj38_-OxlY9VUxGR5U5aMECHyxTPeo3hqhNhpJ5ulBqqL6ndQtQn8gDckXJmCtGA36whyaH7ikOvWmPKOhx2AU8sFA" alt="Gathering" />
          </div>
        </section>

        {/* Bento Grid: The Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1 */}
          <div className="p-10 bg-white rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#c5c6cd]/30 group hover:border-[#775a19] transition-colors duration-500">
            <span className="material-symbols-outlined text-[#775a19] text-4xl mb-6">verified_user</span>
            <h3 className="font-headline-sm text-2xl font-bold mb-4">The Golden Standard</h3>
            <p className="font-body-md text-[#44474d]">Every member is verified through a multi-tier identity check, ensuring the circle remains secure and prestigious.</p>
          </div>
          {/* Pillar 2 */}
          <div className="p-10 bg-[#775a19] text-white rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] transform md:translate-y-8">
            <span className="material-symbols-outlined text-[#ffdea5] text-4xl mb-6">handshake</span>
            <h3 className="font-headline-sm text-2xl font-bold mb-4">Etiquette of Presence</h3>
            <p className="font-body-md opacity-90">Being present is more than physical attendance; it is the commitment to engage with curiosity and grace.</p>
          </div>
          {/* Pillar 3 */}
          <div className="p-10 bg-white rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#c5c6cd]/30 group hover:border-[#775a19] transition-colors duration-500">
            <span className="material-symbols-outlined text-[#775a19] text-4xl mb-6">shield_with_heart</span>
            <h3 className="font-headline-sm text-2xl font-bold mb-4">Silent Guardianry</h3>
            <p className="font-body-md text-[#44474d]">Our concierge team monitors real-time feedback to maintain the harmony of every shared space.</p>
          </div>
        </section>

        {/* Main Editorial Content */}
        <article className="max-w-4xl mx-auto py-12 space-y-12">
          <div className="text-center mb-12">
            <div className="inline-block h-px w-24 bg-[#c5c6cd] mb-8"></div>
            <h4 className="font-headline-md text-3xl font-bold italic mb-2">Section I</h4>
            <p className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-widest">Foundations of Respect</p>
          </div>
          <div className="font-body-lg text-lg leading-loose text-primary flex items-start">
            <span className="font-display-lg text-[5rem] leading-[4rem] pr-3 pt-1 text-[#775a19] font-bold float-left">R</span>
            espect within the Localite ecosystem transcends simple politeness. It is the architectural spine of our community. When we gather in third places—those vital spaces between work and home—we enter into a silent covenant with our surroundings and our peers. The Protocol mandates that every interaction begins with a baseline of radical inclusivity and intentional silence where appropriate.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
            <div className="space-y-6">
              <h5 className="font-label-caps text-[12px] font-bold border-b border-[#c5c6cd] pb-2 uppercase tracking-widest">Verification Standards</h5>
              <p className="font-body-md text-[#44474d]">
                Our two-step authentication isn't just a security hurdle; it's a mark of entry into a trusted collective. We require LinkedIn or professional credentials to ensure every 'Localite' is who they claim to be. This transparency fosters an environment where connections can flourish without the shadow of anonymity.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden h-64 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)]">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXD16oG5SVOq6qXyeWmF1kBgruXb7mkEK4FTVQjrq917hs6fNRf2n3GhcTc23u_XPy5I8umRUuagVI0zeJhsTGjaaW61hTahi4_13DnYFtaRIpqd9CyDJL-P-CrCWEspL5ULBWXaY1Ae11XpLdDaUiCNRYP1w1-Zd_Jq1cgQj6gNfUn0A-kCCjOmy0sBg1ouguICg9EZerZyxj2we7fl2ikw2tDCpFFlGdYTJkCWr-GNuNeKsxPdOtQw" alt="Seal" />
            </div>
          </div>

          <div className="font-body-lg text-lg leading-loose text-primary">
            Safe transitions are equally paramount. As an event concludes, we encourage the 'Anchor System'—never leaving a venue alone if the surroundings feel unfamiliar. Our integrated 'Safe Walk' feature allows members to share their live location with a trusted contact or a Localite Concierge until they reach their destination.
          </div>

          {/* Quote Block */}
          <blockquote className="py-12 border-y border-[#c5c6cd]/30 my-16">
            <p className="font-display-lg text-3xl font-bold text-center italic text-primary px-8">
              "True nobility lies not in being superior to another, but in being superior to your former self through communal growth."
            </p>
            <footer className="text-center mt-6 font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-widest">— The Concierge Manifesto</footer>
          </blockquote>

          <div className="text-center mb-12 pt-12">
            <div className="inline-block h-px w-24 bg-[#c5c6cd] mb-8"></div>
            <h4 className="font-headline-md text-3xl font-bold italic mb-2">Section II</h4>
            <p className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-widest">The Third Place Ritual</p>
          </div>
          
          <div className="font-body-lg text-lg leading-loose text-primary">
            To enter a venue is to honor its history. Whether a centuries-old library or a cutting-edge gallery, the space dictates the energy. The Protocol suggests observing the 'Three-Minute Rule': upon arrival, spend three minutes observing the room's temperature—both literal and social—before initiating conversation. This ensures your presence harmonizes with the existing atmosphere rather than disrupting it.
          </div>

          <div className="flex flex-col md:flex-row gap-6 py-12">
            <div className="flex-1 rounded-xl overflow-hidden h-80 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] order-2 md:order-1">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1i1HdHzSz8m2SrSvbdQhS21yaW9qB3MMrMoUQOVuVqqtOj-N110JX9jouloLufoqUmjLTWNQI8reOk4-uVVYMeI0kEFCjQN3l9oRH0UkfrtAqZwmw8cmAKQuU6YpNr-EIbwAsWPeLimW7tlKLw8u-oQ0430FqWtad0lT3g2m4oGuHFva8NdPwILRBHVRyFiY_lCmbfreFKiNZRx2tGBJnz6k8VcnMH_Z-lsaC_K0G4qPwPvS7x3O-wg" alt="Lounge" />
            </div>
            <div className="flex-1 space-y-6 order-1 md:order-2 self-center">
              <h5 className="font-label-caps text-[12px] font-bold border-b border-[#c5c6cd] pb-2 uppercase tracking-widest">Venue Sovereignty</h5>
              <p className="font-body-md text-[#44474d]">
                Each venue partner has the right to enforce their specific house rules. Localite members are ambassadors of our brand; your conduct reflects upon the entire community. We maintain a zero-tolerance policy for any behavior that compromises the comfort or safety of fellow patrons.
              </p>
            </div>
          </div>
        </article>

        {/* Call to Action Footer */}
        <section className="max-w-4xl mx-auto mt-12 p-12 bg-[#eae8e7] rounded-xl text-center space-y-6 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] relative overflow-hidden">
          <h3 className="font-display-lg text-3xl font-bold relative z-10">Uphold the Standard</h3>
          <p className="font-body-md text-[#44474d] max-w-xl mx-auto relative z-10">
            Ready to contribute to the harmony of our community? Confirm your understanding of The Protocol to unlock access to exclusive Tier-1 gatherings.
          </p>
          <div className="flex justify-center gap-4 pt-4 relative z-10">
            <button 
              className="bg-primary text-white px-10 py-4 font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#775a19] transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              I Commit to the Protocol
            </button>
            <button className="border border-[#775a19] text-[#775a19] px-10 py-4 font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#fed488]/20 transition-all duration-300">
              Review Full Bylaws
            </button>
          </div>
        </section>
      </main>

      {/* Footer Area */}
      <footer className="bg-white border-t border-[#c5c6cd] mt-12 py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 space-y-4">
            <h2 className="font-display-lg text-2xl font-bold text-primary tracking-tighter">Localite</h2>
            <p className="text-[#44474d] font-body-md">Curating the modern nobility of social gathering.</p>
          </div>
          <div>
            <h6 className="font-label-caps text-[12px] font-bold uppercase tracking-widest mb-6 text-primary">Discover</h6>
            <ul className="space-y-3 text-[#44474d] font-body-md">
              <li><a className="hover:text-[#775a19] cursor-pointer">Venues</a></li>
              <li><a className="hover:text-[#775a19] cursor-pointer">Events</a></li>
              <li><a className="hover:text-[#775a19] cursor-pointer">The Archive</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-caps text-[12px] font-bold uppercase tracking-widest mb-6 text-primary">Governance</h6>
            <ul className="space-y-3 text-[#44474d] font-body-md">
              <li><a className="hover:text-[#775a19] cursor-pointer">The Protocol</a></li>
              <li><a className="hover:text-[#775a19] cursor-pointer">Privacy</a></li>
              <li><a className="hover:text-[#775a19] cursor-pointer">Terms</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-caps text-[12px] font-bold uppercase tracking-widest mb-6 text-primary">Connect</h6>
            <div className="flex gap-4">
              <span className="material-symbols-outlined cursor-pointer hover:text-[#775a19]">share</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-[#775a19]">mail</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-[#775a19]">public</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-[#c5c6cd]/30 text-center">
          <p className="font-label-caps text-[10px] font-bold text-[#84847b] tracking-widest uppercase">© 2024 Localite Concierge Services. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
