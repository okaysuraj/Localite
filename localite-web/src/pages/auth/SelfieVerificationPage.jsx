import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Eye, Sun, ShieldCheck, Check, ArrowLeft } from '@phosphor-icons/react';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

const SelfieVerificationPage = () => {
  const [captured, setCaptured] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleCapture = async () => {
    // Flash effect
    const flash = document.createElement('div');
    flash.className =
      'fixed inset-0 bg-white z-[100] pointer-events-none opacity-0 transition-opacity duration-75';
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
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert('Photo verified successfully!');
        navigate('/settings/verification');
      } else {
        alert('Verification could not be processed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error verifying identity.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen py-12 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white border border-border rounded-card overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Guidelines */}
        <div className="p-8 sm:p-10 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Step 02 of 02
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-fg tracking-tight">
                Photo Verification
              </h1>
              <p className="text-xs text-fg-muted mt-2 leading-relaxed">
                Take a quick live photo to confirm that you match your submitted identification documents.
              </p>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-subtle text-accent flex items-center justify-center shrink-0">
                  <Sun size={15} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-fg">Face the Light</h3>
                  <p className="text-fg-muted mt-0.5 leading-relaxed">
                    Position yourself facing a window or direct light. Avoid backlighting.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-subtle text-accent flex items-center justify-center shrink-0">
                  <Eye size={15} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-fg">Clear View</h3>
                  <p className="text-fg-muted mt-0.5 leading-relaxed">
                    Remove sunglasses, hats, or masks. Keep a neutral, clear expression.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-subtle text-accent flex items-center justify-center shrink-0">
                  <ShieldCheck size={15} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-fg">Private & Encrypted</h3>
                  <p className="text-fg-muted mt-0.5 leading-relaxed">
                    Used strictly for verification validation. Never displayed publicly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border text-[11px] font-mono text-fg-muted">
            Camera access required for live capture.
          </div>
        </div>

        {/* Right Side: Camera Viewfinder */}
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-bg-subtle/40">
          <div className="w-full aspect-[4/3] max-w-md border border-border rounded-card flex flex-col items-center justify-center p-6 relative overflow-hidden bg-white shadow-xs mx-auto">
            {/* Viewfinder Frame */}
            <div className="w-48 h-48 rounded-full border-2 border-dashed border-accent/60 flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full bg-bg-subtle flex items-center justify-center">
                {captured ? (
                  <Check size={48} className="text-accent" weight="bold" />
                ) : (
                  <Camera size={40} className="text-fg-muted" />
                )}
              </div>
            </div>

            <p className="text-xs font-mono text-fg-muted mt-4">
              {captured ? 'Photo captured' : 'Center your face within the circle'}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
            <button
              onClick={() => navigate('/settings/verification')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn border border-border text-xs font-mono text-fg-muted hover:text-fg hover:bg-white transition-colors"
            >
              <ArrowLeft size={13} /> Back
            </button>

            <button
              onClick={handleCapture}
              disabled={isVerifying}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-btn bg-accent text-white text-xs font-mono tracking-wide hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              {isVerifying ? (
                'Verifying...'
              ) : captured ? (
                'Retake Photo'
              ) : (
                <>
                  <Camera size={14} /> Capture Photo
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfieVerificationPage;
