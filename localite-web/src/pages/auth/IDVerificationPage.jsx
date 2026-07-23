import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IDVerificationPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      alert(`File "${e.dataTransfer.files[0].name}" selected for verification.`);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      alert(`File "${e.target.files[0].name}" selected for verification.`);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky z-50 bg-[#fbf9f8] shadow-sm h-20 flex justify-between items-center px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <span className="font-display-lg text-4xl font-bold text-primary tracking-tight cursor-pointer" onClick={() => navigate('/')}>Localite</span>
          <nav className="hidden md:flex gap-6">
            <a className="font-label-caps text-[12px] uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Dashboard</a>
            <a className="font-label-caps text-[12px] uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer" onClick={() => navigate('/events')}>Events</a>
            <a className="font-label-caps text-[12px] uppercase tracking-widest text-[#44474d] hover:text-[#775a19] transition-colors duration-300 cursor-pointer">Venues</a>
            <a className="font-label-caps text-[12px] uppercase tracking-widest text-primary border-b-2 border-[#775a19] transition-colors duration-300 cursor-pointer">Members</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-[#f5f3f3] rounded-full px-4 py-2 gap-2 transition-all border border-transparent focus-within:border-[#775a19]">
            <span className="material-symbols-outlined text-[#75777e]">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-base w-48 outline-none" placeholder="Search members..." type="text" />
          </div>
          <button className="material-symbols-outlined text-primary p-2 cursor-pointer hover:opacity-80">notifications</button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyEYmk4OVaPR3QrMM042JawWyZyAeymTD4wI868eCoLLosxfaoxg-0lVZyTyrdUYGP6gN6bMYN1Kd4o3EAIhkHoke2xJYWQmjnbjdpNkq_Du7xG3Z91HJuWe-WRtMHOGzxSq_1jIdj3PIeX4Y-h_43py_RHA5ZSxc4gCrGPsbud96Zy9gJwwuKSJN9W-R8vJIzTJ_Qe2UVDm7BgcIKb9QEQh1LmzlWaNwnOh6hp97Ul_BXl-Y2NKbXaA" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-[0_16px_32px_rgba(10,25,47,0.05)] min-h-[600px] border border-[#efeded]">
          
          {/* Left Side: Instructions */}
          <div className="p-12 bg-[#fbf9f8] flex flex-col justify-center border-r border-[#c5c6cd]">
            <div className="mb-8">
              <span className="font-label-caps text-[12px] text-[#775a19] uppercase tracking-widest font-bold">Step 02/03</span>
              <h1 className="font-display-lg text-5xl font-bold text-primary mt-2">Identity Verification</h1>
              <p className="font-body-lg text-lg text-[#44474d] mt-4 leading-relaxed">
                To maintain the integrity of our community, please provide a high-fidelity image of your government-issued ID.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#efeded] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#775a19]">light_mode</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-[12px] font-bold text-primary tracking-widest uppercase mb-1">Pristine Lighting</h3>
                  <p className="text-base text-[#44474d]">Ensure you are in a brightly lit environment. Avoid direct glare or harsh shadows across the document.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#efeded] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#775a19]">center_focus_strong</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-[12px] font-bold text-primary tracking-widest uppercase mb-1">Clarity & Focus</h3>
                  <p className="text-base text-[#44474d]">All text and your portrait must be perfectly legible. Position the ID within the frame without cutting off edges.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#efeded] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#775a19]">verified_user</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-[12px] font-bold text-primary tracking-widest uppercase mb-1">Secure Processing</h3>
                  <p className="text-base text-[#44474d]">Your data is encrypted and handled with the highest level of privacy as per our Modern Nobility standards.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-[#c5c6cd]">
              <p className="text-[12px] font-bold font-label-caps text-[#44474d] uppercase tracking-widest">Accepted Documents: Passport, Driver's License, National ID Card.</p>
            </div>
          </div>

          {/* Right Side: Upload Area */}
          <div className="p-12 bg-[#f5f3f3] flex flex-col items-center justify-center">
            
            <div 
              className={`w-full aspect-[4/3] max-w-md border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-12 transition-all duration-300 cursor-pointer group relative overflow-hidden bg-white shadow-sm ${dragActive ? 'border-[#775a19] bg-[#eae8e7]' : 'border-[#c5c6cd] hover:border-[#775a19] hover:bg-[#eae8e7]'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
            >
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-[#775a19] text-5xl mb-2">cloud_upload</span>
                <h2 className="font-headline-sm text-2xl font-bold text-primary">Secure Upload</h2>
                <p className="text-base text-[#44474d] mt-2">Drag and drop your file or <span className="text-[#775a19] font-bold underline cursor-pointer">browse</span></p>
                <p className="text-[12px] font-bold font-label-caps uppercase tracking-widest text-[#75777e] mt-4">JPG, PNG or PDF (Max 10MB)</p>
              </div>
              <input 
                ref={fileInputRef}
                accept="image/*,.pdf" 
                className="hidden" 
                type="file" 
                onChange={handleChange}
              />
            </div>
            
            <div className="w-full max-w-md mt-6 space-y-4">
              <button 
                className="w-full bg-primary text-white py-4 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-md"
                onClick={() => navigate('/selfie-verification')}
              >
                Proceed to Scan
              </button>
              <button className="w-full border border-[#775a19] text-[#775a19] py-4 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest hover:bg-[#775a19]/5 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                Use Camera
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-2 text-[#75777e]">
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
              <span className="text-[12px] font-bold font-label-caps uppercase tracking-widest">End-to-End Encrypted</span>
            </div>
            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-12 bg-[#efeded] border-t border-[#c5c6cd] flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display-lg text-4xl font-bold text-primary">Localite</span>
          <p className="text-[12px] font-bold font-label-caps text-[#44474d] uppercase tracking-widest">© 2024 Localite. Modern Nobility.</p>
        </div>
        <div className="flex gap-6">
          <a className="text-[12px] font-bold font-label-caps text-[#44474d] hover:text-primary underline decoration-[#775a19] transition-all duration-300 uppercase tracking-widest cursor-pointer">Privacy Policy</a>
          <a className="text-[12px] font-bold font-label-caps text-[#44474d] hover:text-primary underline decoration-[#775a19] transition-all duration-300 uppercase tracking-widest cursor-pointer">Terms of Service</a>
          <a className="text-[12px] font-bold font-label-caps text-[#44474d] hover:text-primary underline decoration-[#775a19] transition-all duration-300 uppercase tracking-widest cursor-pointer">Press Kit</a>
          <a className="text-[12px] font-bold font-label-caps text-[#44474d] hover:text-primary underline decoration-[#775a19] transition-all duration-300 uppercase tracking-widest cursor-pointer">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
