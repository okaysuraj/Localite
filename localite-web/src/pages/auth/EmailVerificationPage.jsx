import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    // Take only the last character if they pasted multiple or typed fast
    newOtp[index] = value.length > 1 ? value.slice(-1) : value;
    setOtp(newOtp);

    // Auto focus next
    if (value !== '' && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 4) return;
    
    setLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1500);
  };

  const handleResend = (e) => {
    const btn = e.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = 'SENDING...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = 'SENT';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 3000);
    }, 1000);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md">
      {/* Header */}
      <header className="w-full top-0 sticky z-50 bg-background flex items-center justify-between px-container-margin py-6 max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 group transition-transform active:scale-95">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase hidden sm:block">Back</span>
        </button>
        <div className="font-display-lg-mobile text-display-lg-mobile tracking-tight text-primary">LOCALITE</div>
        <div className="w-12"></div> {/* Spacer for symmetry */}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-container-margin pb-stack-lg animate-fade-in-up">
        <div className="max-w-md w-full">
          {/* Hero Image */}
          <div className="mb-stack-md relative overflow-hidden rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] h-48 sm:h-64">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent z-10"></div>
            <img 
              className="w-full h-full object-cover" 
              alt="Security" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6Pn0s-rlGp_WV3NLokmsK2Epkwo446eUPdgmOmugLpAbXL9A4wA_TC7L4BrRZIx43bFqXJVzt6gUwmnSKWrCzWPmC1CMIPN36oBFg_5jfccnTs2PqDzq4C01vxTkP7D81cuebtDwMJ6pkfSWExey8dfNfeoNQ3hcnMwf-y8DmLsM4bHMlvsjTb_rGUcivlLg6n0xwb9jDjqIq1y5EgyebACh7tj97KfdMtqPNbleUpfLZCL-OJJBRA"
            />
            <div className="absolute bottom-4 left-6 z-20">
              <span className="font-label-caps text-label-caps text-white/80 tracking-[0.2em] uppercase">Security</span>
            </div>
          </div>

          {/* Content Section */}
          <section className="text-center">
            <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-2">Verify Your Email</h1>
            <p className="font-body-md text-on-surface-variant mb-stack-md">We sent a 4-digit code to your inbox.</p>

            {/* OTP Input Grid */}
            <form onSubmit={handleSubmit} className="space-y-stack-md">
              <div className="flex justify-center gap-4 mb-stack-md">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-16 h-20 text-center text-headline-md font-headline-md bg-surface-container-low border-none rounded-lg transition-all duration-200 outline-none focus:ring-1.5 focus:ring-secondary focus:bg-surface-container-lowest"
                    maxLength={1}
                    required
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{
                      borderWidth: digit ? '1.5px' : '0px',
                      borderColor: digit ? '#775a19' : 'transparent',
                      backgroundColor: digit ? '#ffffff' : '#f5f3f3',
                    }}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  type="submit"
                  disabled={loading || verified}
                  className={`w-full py-4 font-label-caps text-label-caps tracking-widest rounded-lg shadow-lg active:scale-[0.98] transition-all duration-200 ${
                    verified ? 'bg-primary text-surface' : 'bg-secondary text-white hover:opacity-90'
                  }`}
                >
                  {loading ? 'VERIFYING...' : verified ? 'VERIFIED' : 'VERIFY'}
                </button>
                <div className="pt-4">
                  <p className="font-body-md text-on-surface-variant">
                    Didn't receive the code?{' '}
                    <button 
                      type="button" 
                      onClick={handleResend}
                      className="text-secondary font-bold hover:underline underline-offset-4 transition-all"
                    >
                      Resend Code
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center px-container-margin opacity-30 mt-auto">
        <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">LOCALITE COLLECTIVE © 2024 • PRIVACY FIRST</p>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default EmailVerificationPage;
