import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifiedBadgeInfoPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen selection:bg-[#fed488]">
      
      {/* TopAppBar */}
      <header className="flex justify-between items-center px-6 w-full sticky top-0 z-50 bg-[#fbf9f8] shadow-[0_4px_20px_-5px_rgba(10,25,47,0.08)] h-20">
        <div className="flex items-center gap-8">
          <span className="font-display-lg text-4xl font-bold text-primary tracking-tighter cursor-pointer" onClick={() => navigate('/')}>Localite</span>
          <nav className="hidden md:flex gap-6 items-center">
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/')}>Home</a>
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Explore</a>
            <a className="text-[#44474d] font-bold hover:text-primary transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/events')}>Events</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">notifications</button>
          <button className="material-symbols-outlined p-2 text-[#44474d] hover:text-primary transition-colors cursor-pointer">mail</button>
          <div className="h-10 w-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBao7NIc_J087ob5NBEhLeHCyC41rToI9WkVYn5_ZmPbq8CefcMfTwiUqRro52h7uOFgDcdSrFmnrgcRxpef9rjglP9P1n2Q4MdjNnfr3uWfbfvasC0Y-U7u4dzueNipoGVCodbYqV6TbQjMAv-ObxvSLgrw10J61JmKJm1RnJq6dWM7yp_RKl1fM1v6DBHOGoi5LpQkroLfAQPbEwqanm9eWG_T-7fegupfB8jjrzmvNM3c98yY5hYow" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#f5f3f3] mb-6 shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#775a19]/20 relative">
            <span className="material-symbols-outlined text-5xl text-[#775a19]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            <div className="absolute inset-0 border border-[#775a19]/20 rounded-full animate-pulse scale-125"></div>
          </div>
          <h1 className="font-display-lg text-5xl font-bold text-primary mb-4">The Mark of Distinction</h1>
          <p className="font-body-lg text-lg text-[#44474d] max-w-2xl mx-auto">
            Elevating the standards of our community. The Verified Badge is more than an icon—it is a commitment to authenticity, safety, and modern nobility.
          </p>
        </section>

        {/* Bento Grid: The Process */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Step 1: Identity Attestation */}
          <div className="md:col-span-7 bg-white p-8 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#e4e2e2] flex flex-col gap-4 group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#775a19] text-3xl">fingerprint</span>
              <span className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">Step 01</span>
            </div>
            <h3 className="font-headline-md text-3xl font-bold text-primary">Identity Attestation</h3>
            <p className="text-[#44474d] font-body-md leading-relaxed">
              A secure, encrypted process to confirm your legal identity. We leverage biometric matching and government-issued document verification to ensure every member is exactly who they claim to be.
            </p>
            <div className="mt-auto pt-4 flex gap-4 overflow-hidden h-32">
              <div className="flex-1 rounded-lg bg-[#efeded] h-full relative overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfiwzwmAXqYsC_GkzdoGmSFRmnfbSo5B4hNwy_2senxFQvo8tTor-9oNLO1FdJ0f0exSxe6qUewOi9_JYZkqXluFdQvj5nhP4Hhqllke3Mb1aSCUb0H--Xso3Heik3Wi29pg33SqUrat3d1MQaFt1z4sV5moIv75QNk5ttw_WbCVqhdzrX0EJosmADC3xzlDlCF5WOKHtC4orHw4O7kbOVHjcssrw6F8cYO1-vZZbAro-YWgU9Fh5s9w" alt="Biometric" />
              </div>
              <div className="flex-1 rounded-lg bg-[#efeded] h-full relative overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNYiUNcFvtiN5G2uze-9NYiTPTssd55m3GWGX4Riu0IGWcolL69AwQATQFRrDYGem-R6hsYG6DKJ4DFlfN5z47LldH9FJ1BxYBDKj-4_9mzpudXNjn92TDUIuwMZXapJkKUqFVYsqQGJt-fsMJbfqEPd3dl3wXnnPF94VUCqDBiI-65J5DzdEY36OEIrgC7nXA2WFwAGqq3z0ZZf-oRO3MiUNO3p2Q-sm9iNZkERDH_FhOeha5V8lrsA" alt="ID Card" />
              </div>
            </div>
          </div>

          {/* Step 2: Social Integration */}
          <div className="md:col-span-5 bg-primary text-white p-8 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ffdea5] text-3xl">hub</span>
              <span className="font-label-caps text-[12px] font-bold text-[#ffdea5] uppercase tracking-widest">Step 02</span>
            </div>
            <h3 className="font-headline-md text-3xl font-bold">Social Integration</h3>
            <p className="text-[#76849f] font-body-md leading-relaxed">
              Verify your professional and social presence. Connecting your verified profiles adds a layer of curated history and peer-to-peer accountability to your Localite profile.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center bg-white/10 p-3 rounded-lg border border-white/5">
                <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">LinkedIn Professional</span>
                <span className="material-symbols-outlined text-[#ffdea5]">check_circle</span>
              </div>
              <div className="flex justify-between items-center bg-white/10 p-3 rounded-lg border border-white/5">
                <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest">Corporate Directory</span>
                <span className="material-symbols-outlined text-white/30">add_circle</span>
              </div>
            </div>
          </div>

          {/* Step 3: Reputation Review */}
          <div className="md:col-span-12 bg-white p-8 rounded-xl shadow-[0_16px_32px_-12px_rgba(10,25,47,0.08)] border border-[#e4e2e2] grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#775a19] text-3xl">military_tech</span>
                <span className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest">Step 03</span>
              </div>
              <h3 className="font-headline-md text-3xl font-bold text-primary">Reputation Review</h3>
              <p className="text-[#44474d] font-body-md leading-relaxed">
                Our final tier of verification involves a manual review of your engagement within elite gathering circles. We evaluate contribution history and adherence to the community's code of conduct.
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-[#775a19] text-sm">stars</span>
                  <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">Community Standing</span>
                </li>
                <li className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-[#775a19] text-sm">stars</span>
                  <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">Host Recommendations</span>
                </li>
                <li className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-[#775a19] text-sm">stars</span>
                  <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">Protocol Adherence</span>
                </li>
              </ul>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBpVgTso97rMdGB8asJ5oR0SFeGI_UYR9i9ETm9M8dWq_TlJIdAJl2Vy-09ezQn2J0q8Zk3jlUZulRXe8VZA55uqQT7Cu5SYILQvAg_ORmzWmVVwHWDq60c7pdXegdbggvipWwhwUeBgTlm30Rk8IcInL_qMwyqSeNYMlc3o4xi53GYPAFFReNGbLG6iqyuka1Dc4bGgQcxrn5PZjyja6rOSUHe37Wj3Jjt4K61JmvKIZLCGw9LUajaw" alt="Wax Seal" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-label-caps text-[12px] font-bold uppercase tracking-widest">Final Human Oversight Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-12 flex flex-col items-center gap-6 text-center">
          <div className="h-[1px] w-32 bg-[#fed488]"></div>
          <h2 className="font-headline-md text-3xl font-bold text-primary">Ready to claim your mark?</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="bg-primary text-white px-10 py-4 font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#44474d] transition-all duration-300 shadow-lg active:scale-95"
              onClick={() => navigate('/verification/id')}
            >
              Begin Attestation
            </button>
            <button className="bg-transparent border border-[#775a19] text-[#775a19] px-10 py-4 font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#775a19]/10 transition-all duration-300 active:scale-95">
              View Requirements
            </button>
          </div>
          <p className="font-label-caps text-[12px] font-bold text-[#84847b] uppercase tracking-widest mt-4">
            Est. Processing Time: 48 — 72 Business Hours
          </p>
        </section>
      </main>

      {/* Footer Meta */}
      <footer className="bg-[#f5f3f3] border-t border-[#c5c6cd] py-6 px-6 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-2xl font-bold text-primary">Localite</span>
            <span className="text-[#44474d] font-label-caps font-bold text-[10px] uppercase tracking-widest">© 2024 CONCIERGE CONSOLE</span>
          </div>
          <div className="flex gap-8">
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Privacy Charter</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Safety Protocol</a>
            <a className="font-label-caps text-[12px] font-bold text-[#44474d] uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
