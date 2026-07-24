import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
  const navigate = useNavigate();

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
            <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-4">Verify Your Email</h1>
            <p className="font-body-md text-on-surface-variant mb-stack-lg">
              We've sent a verification email to your inbox. Go to your mail, click on the verification link, and then return to log in.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-4 font-label-caps text-label-caps tracking-widest rounded-lg shadow-lg active:scale-[0.98] transition-all duration-200 bg-secondary text-white hover:opacity-90"
              >
                GO TO LOGIN
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center px-container-margin opacity-30 mt-auto">
        <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">LOCALITE COLLECTIVE © 2026 • PRIVACY FIRST</p>
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
