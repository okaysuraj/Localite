import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EmailVerificationPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 4) return;
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Texture Overlay for editorial feel */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }}
      ></div>

      {/* Main Content Shell */}
      <main className="flex-grow flex items-center justify-center px-container-margin py-stack-lg z-10 relative">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(10,25,47,0.08)]">
          {/* Editorial Image Section */}
          <div className="hidden md:block relative h-full min-h-[600px]">
            <div className="absolute inset-0 bg-primary opacity-10 z-10"></div>
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEJnQz17PXtKFOS0crUTkolKJ_8DwrlPxgE4GggKhb4umbq0DrBdUvZecq1Kn8AjIJ-TrmOD-xMAfx4rACTLDzPPjWrBmse1gNGhJb4QrMVvD7-OlItlsYHJj6BWAr3rXGbCx3YpGzTmp015PuY6EnH9-T7pyMQ3y5mLssRjDrIE2lvlE95k0mU2ijBn1oHT2c30uVkECvpMEEdHFgJRtBTjgnwRkQj666TL8dB0JUTzp3HVYl92Rq6A')" }}
            ></div>
            <div className="absolute bottom-12 left-12 right-12 z-20">
              <p className="font-label-caps text-label-caps text-white/70 mb-2">SECURED ENTRY</p>
              <h2 className="font-headline-md text-headline-md text-white">Your privacy is our highest priority.</h2>
            </div>
          </div>

          {/* Verification Content Section */}
          <div className="flex flex-col justify-center items-center p-stack-lg md:p-16 text-center">
            {/* Branding Anchor */}
            <div className="mb-stack-lg">
              <h1 className="font-display-lg text-display-lg text-primary tracking-tighter">Localite</h1>
            </div>

            <div className="max-w-xs w-full">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Verify Your Email</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                A unique 4-digit verification code has been sent to your inbox. Please enter it below to proceed.
              </p>

              {/* OTP Input Group */}
              <form onSubmit={handleSubmit} className="space-y-stack-md">
                <div className="flex justify-between gap-4 mb-stack-md">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      className="otp-input w-16 h-20 text-center font-headline-md text-headline-md bg-surface-container-low border-none rounded-xl transition-all duration-300 outline-none"
                      maxLength="1"
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>

                {/* Primary Action */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-label-caps text-label-caps rounded-xl hover:bg-on-primary-container transition-all duration-300 shadow-[0_8px_16px_-4px_rgba(10,25,47,0.2)]"
                >
                  {loading ? 'VERIFYING...' : 'VERIFY'}
                </button>
              </form>

              {/* Secondary Actions */}
              <div className="mt-stack-md space-y-4">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Didn't receive the code?{' '}
                  <button onClick={handleResend} className="text-secondary font-bold hover:underline transition-all">
                    {resent ? 'Sent!' : 'Resend Code'}
                  </button>
                </p>
                <Link to="/login" className="inline-flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  BACK TO SIGN IN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Editorial Footer */}
      <footer className="z-10 bg-transparent py-stack-sm text-center">
        <p className="font-label-caps text-label-caps text-on-surface-variant opacity-60">
          © 2024 LOCALITE. MODERN NOBILITY IN LOCAL GATHERING.
        </p>
      </footer>
    </div>
  );
};

export default EmailVerificationPage;
