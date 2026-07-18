import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelfieVerificationPage() {
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);

  const handleCapture = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      navigate('/dashboard'); // or next step
    }, 150);
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col relative">
      {/* TopNavBar */}
      <nav className="w-full h-20 bg-[#f5f3f3] shadow-sm shadow-primary/5 sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 max-w-7xl mx-auto w-full h-full">
          <div className="flex items-center gap-6">
            <span className="font-display-lg text-5xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>Localite</span>
            <div className="hidden md:flex gap-4 items-center ml-6">
              <a className="text-[#44474d] font-bold hover:text-[#775a19] transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Discover</a>
              <a className="text-[#44474d] font-bold hover:text-[#775a19] transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer" onClick={() => navigate('/events')}>Events</a>
              <a className="text-[#44474d] font-bold hover:text-[#775a19] transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Members</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <button className="p-2 text-[#44474d] hover:text-primary transition-colors">
                <span className="material-symbols-outlined">mail</span>
              </button>
              <button className="p-2 text-[#44474d] hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>
            <button className="bg-primary text-white px-6 py-2 font-label-caps text-[12px] uppercase tracking-widest rounded-lg hover:opacity-80 transition-opacity font-bold">
              Create Event
            </button>
            <div className="w-10 h-10 rounded-full bg-[#e4e2e2] overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGj58-rF5KDdQz20KamkYO6sV-BatprOmZe5L2vGozUQE8CsMkUlwHxdLVa8eCao3kmhoK7BR1CS6LTE_pK42AReOpIoiCBtHsGbN57haI17G4yn_ENieDz9pWw7Z2VVUSbGUhX-QrLV1Awor5Alni-7FIeP8TB5K7RhWkOcu3ed2HSCoxleKrpoEXI8p57oKwKUlIQb3mrLmXH-M0mvCTzLKPoPUGg9wEOedfMA1hXO4rYk1Se2X0jQ" alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-6 relative overflow-hidden">
        <div className="max-w-6xl w-full bg-white rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] flex flex-col md:flex-row overflow-hidden border border-[#e4e2e2]/30 relative z-10">
          
          {/* Left Panel: Instructions */}
          <div className="w-full md:w-5/12 p-12 bg-[#f5f3f3]/50 border-r border-[#e4e2e2]">
            <div className="mb-6">
              <span className="font-label-caps text-[12px] font-bold text-[#775a19] mb-2 block uppercase tracking-widest">Security Protocol</span>
              <h1 className="font-headline-md text-3xl font-bold text-primary mb-4">Identity Verification</h1>
              <p className="text-[#44474d] font-body-md leading-relaxed text-base">
                To maintain our community's standards of safety and authenticity, please provide a live selfie. This process is encrypted and handled with the utmost discretion.
              </p>
            </div>
            <div className="space-y-6 mt-12">
              <h2 className="font-label-caps text-[12px] font-bold text-primary border-b border-[#e4e2e2] pb-2 uppercase tracking-widest">Checklist for Success</h2>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#775a19]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#775a19] text-[20px]">light_mode</span>
                </div>
                <div>
                  <p className="font-body-md font-bold text-primary">Good Lighting</p>
                  <p className="text-sm text-[#44474d]">Ensure your face is evenly lit. Avoid strong backlighting.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#775a19]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#775a19] text-[20px]">face</span>
                </div>
                <div>
                  <p className="font-body-md font-bold text-primary">Face Within Circle</p>
                  <p className="text-sm text-[#44474d]">Position your head so it fits naturally within the camera guide.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#775a19]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#775a19] text-[20px]">visibility_off</span>
                </div>
                <div>
                  <p className="font-body-md font-bold text-primary">No Accessories</p>
                  <p className="text-sm text-[#44474d]">Please remove any hats, glasses, or masks for clear identification.</p>
                </div>
              </div>

            </div>
            
            <div className="mt-12 pt-6 border-t border-[#e4e2e2]">
              <div className="flex items-center gap-2 text-[#44474d]">
                <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
                <span className="text-xs font-label-caps font-bold uppercase tracking-widest">End-to-End Encrypted Verification</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Camera Viewframe */}
          <div className="w-full md:w-7/12 p-4 md:p-12 bg-white flex flex-col items-center justify-center min-h-[500px]">
            <div className="relative w-full max-w-md aspect-[4/5] bg-[#e4e2e2] rounded-xl overflow-hidden shadow-inner group">
              
              {/* Placeholder for Camera Feed */}
              <div className="absolute inset-0 w-full h-full bg-zinc-900">
                <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP-F_E346nEH9mmcHLeWTGui4Y-ez88yC9v2sin1h5veuiR_1krONXWV6Q1HaySXp3R657k8P-smn4EKMkImE3GyO3bsd3_NAA6BCKrqJQSv3y1iGvt1mtfg5O3Bn6zVwTHjvUA9LXP-CngC1Wa2sY53V0cYURh5vwP3GPjoOYXxXMT_XkqcBDMToyoz3abG-vVystpm_XhGcYJIy9sWg3pl1qouwazcMigznyTo6nJj7hugdTu0P53Q" alt="Camera view" />
              </div>
              
              {/* Face Guide Overlay */}
              <div 
                className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" 
                style={{
                  WebkitMask: 'radial-gradient(circle 180px at center, transparent 99%, black 100%)',
                  mask: 'radial-gradient(circle 180px at center, transparent 99%, black 100%)'
                }}
              ></div>
              
              {/* Decorative Circle Frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[360px] h-[360px] rounded-full border-2 border-dashed border-white/50 animate-[spin_20s_linear_infinite]"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[360px] h-[360px] rounded-full border-2 border-[#775a19] shadow-[0_0_20px_rgba(119,90,25,0.4)] overflow-hidden">
                  {/* Scanning Line Effect */}
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#775a19] to-transparent animate-[scan_3s_ease-in-out_infinite] absolute top-0 left-0"></div>
                </div>
              </div>
              
              {/* UI Elements inside Viewframe */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-label-caps font-bold text-white uppercase tracking-tighter">Live Preview</span>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-6">
                <p className="text-white text-center text-xs font-medium drop-shadow-md">Center your face in the golden circle</p>
              </div>
            </div>
            
            {/* Capture Controls */}
            <div className="mt-6 flex flex-col items-center w-full max-w-md">
              <button 
                className="w-full py-4 bg-primary text-white font-label-caps text-[12px] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                onClick={handleCapture}
              >
                <span className="material-symbols-outlined">photo_camera</span>
                Capture Identity Selfie
              </button>
              <p className="mt-4 text-xs text-[#44474d] font-medium">By clicking capture, you agree to our <a className="text-[#775a19] underline underline-offset-4 cursor-pointer">Privacy Standards</a>.</p>
            </div>
            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#f5f3f3] mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-start px-6 max-w-7xl mx-auto gap-4">
          <div className="flex flex-col gap-2 mb-6 md:mb-0">
            <span className="font-display-lg text-4xl font-bold text-primary">Localite</span>
            <p className="text-[#44474d] font-body-md max-w-xs text-base">© 2024 Localite. Modern Nobility in Local Connection.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:flex md:gap-4">
            <a className="text-[#44474d] font-label-caps text-[12px] font-bold uppercase tracking-widest hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Terms of Service</a>
            <a className="text-[#44474d] font-label-caps text-[12px] font-bold uppercase tracking-widest hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Privacy Policy</a>
            <a className="text-[#44474d] font-label-caps text-[12px] font-bold uppercase tracking-widest hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Partner Program</a>
            <a className="text-[#44474d] font-label-caps text-[12px] font-bold uppercase tracking-widest hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Press Kit</a>
            <a className="text-[#44474d] font-label-caps text-[12px] font-bold uppercase tracking-widest hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* Flash Overlay */}
      {flash && (
        <div className="fixed inset-0 bg-white z-[100] pointer-events-none opacity-100 transition-opacity duration-75"></div>
      )}
      
      {/* Required keyframes for scan line */}
      <style>{`
        @keyframes scan {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
