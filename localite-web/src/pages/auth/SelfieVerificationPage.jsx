import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

const SelfieVerificationPage = () => {
  const [captured, setCaptured] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleCapture = async () => {
    // Flash effect
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-white z-[100] pointer-events-none opacity-0 transition-opacity duration-75';
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = '1';
      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 100);
      }, 100);
    });
    setCaptured(true);
    
    // Wire up to real backend
    setIsVerifying(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;
      const res = await fetch(`${API_URL}/users/verify-identity`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Identity Verified successfully!");
        navigate('/profile'); // or wherever they should go
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error verifying identity.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-stack-lg px-container-margin relative overflow-hidden">
        <div className="max-w-6xl w-full bg-surface-container-lowest rounded-xl ethereal-shadow flex flex-col md:flex-row overflow-hidden border border-surface-variant/30 relative z-10">
          {/* Left Panel: Instructions */}
          <div className="w-full md:w-5/12 p-stack-lg bg-surface-container-low/50 border-r border-surface-variant">
            <div className="mb-stack-md">
              <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest">Security Protocol</span>
              <h1 className="font-headline-md text-headline-md text-primary mb-4">Identity Verification</h1>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                To maintain our community's standards of safety and authenticity, please provide a live selfie. This process is encrypted and handled with the utmost discretion.
              </p>
            </div>

            <div className="space-y-stack-md mt-stack-lg">
              <h2 className="font-label-caps text-label-caps text-primary border-b border-surface-variant pb-2">Checklist for Success</h2>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[20px]">light_mode</span>
                </div>
                <div>
                  <p className="font-body-md font-semibold text-primary">Good Lighting</p>
                  <p className="text-sm text-on-surface-variant">Ensure your face is evenly lit. Avoid strong backlighting.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[20px]">face</span>
                </div>
                <div>
                  <p className="font-body-md font-semibold text-primary">Face Within Circle</p>
                  <p className="text-sm text-on-surface-variant">Position your head so it fits naturally within the camera guide.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[20px]">visibility_off</span>
                </div>
                <div>
                  <p className="font-body-md font-semibold text-primary">No Accessories</p>
                  <p className="text-sm text-on-surface-variant">Please remove any hats, glasses, or masks for clear identification.</p>
                </div>
              </div>
            </div>

            <div className="mt-stack-lg pt-stack-md border-t border-surface-variant">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <span className="text-xs font-label-caps">End-to-End Encrypted Verification</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Camera Viewframe */}
          <div className="w-full md:w-7/12 p-gutter md:p-stack-lg bg-white flex flex-col items-center justify-center min-h-[500px]">
            <div className="relative w-full max-w-md aspect-[4/5] bg-surface-variant rounded-xl overflow-hidden shadow-inner group">
              {/* Camera Feed Placeholder */}
              <div className="absolute inset-0 w-full h-full bg-zinc-900">
                <img 
                  className="w-full h-full object-cover opacity-60" 
                  alt="Camera viewframe preview"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP-F_E346nEH9mmcHLeWTGui4Y-ez88yC9v2sin1h5veuiR_1krONXWV6Q1HaySXp3R657k8P-smn4EKMkImE3GyO3bsd3_NAA6BCKrqJQSv3y1iGvt1mtfg5O3Bn6zVwTHjvUA9LXP-CngC1Wa2sY53V0cYURh5vwP3GPjoOYXxXMT_XkqcBDMToyoz3abG-vVystpm_XhGcYJIy9sWg3pl1qouwazcMigznyTo6nJj7hugdTu0P53Q"
                />
              </div>

              {/* Golden Circle Frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border-2 border-secondary shadow-[0_0_20px_rgba(119,90,25,0.4)]">
                  <div className="scan-line absolute top-0 left-0 right-0"></div>
                </div>
              </div>

              {/* Live Preview Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-label-caps text-white uppercase tracking-tighter">Live Preview</span>
              </div>

              {/* Bottom Instruction */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center px-6">
                <p className="text-white text-center text-xs font-medium drop-shadow-md">Center your face in the golden circle</p>
              </div>
            </div>

            {/* Capture Controls */}
            <div className="mt-stack-md flex flex-col items-center w-full max-w-md">
              <button 
                onClick={handleCapture}
                disabled={isVerifying}
                className="w-full py-4 bg-primary text-white font-label-caps text-label-caps rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">photo_camera</span>
                {isVerifying ? 'Verifying...' : captured ? 'Retake Selfie' : 'Capture Identity Selfie'}
              </button>
              <p className="mt-4 text-xs text-on-surface-variant font-medium">
                By clicking capture, you agree to our <Link to="/privacy" className="text-secondary underline underline-offset-4">Privacy Standards</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-stack-lg bg-surface-container-low mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-start px-container-margin max-w-7xl mx-auto gap-gutter">
          <div className="flex flex-col gap-stack-sm mb-stack-md md:mb-0">
            <span className="font-display-lg-mobile text-display-lg-mobile text-primary">Localite</span>
            <p className="text-on-surface-variant font-body-md max-w-xs">© 2024 Localite. Modern Nobility in Local Connection.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-stack-md md:flex md:gap-gutter">
            <Link to="/terms" className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors duration-200">Terms of Service</Link>
            <Link to="/privacy" className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors duration-200">Privacy Policy</Link>
            <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors duration-200" href="#">Partner Program</a>
            <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors duration-200" href="#">Press Kit</a>
            <Link to="/contact" className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors duration-200">Contact Us</Link>
          </div>
        </div>
      </footer>

      <style>{`
        .camera-overlay {
          mask: radial-gradient(circle 180px at center, transparent 99%, black 100%);
          -webkit-mask: radial-gradient(circle 180px at center, transparent 99%, black 100%);
        }
        .scan-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #775a19, transparent);
          animation: scan 3s ease-in-out infinite;
        }
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SelfieVerificationPage;
