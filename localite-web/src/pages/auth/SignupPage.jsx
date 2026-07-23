import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await register(formData.username, formData.email, formData.password);
      // Depending on auth flow, they might need to verify email or they get logged in directly.
      // Usually after signup they go to a verification page or dashboard.
      // Let's redirect to email verification
      navigate('/verify-email');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-background">
        <div className="flex items-center justify-between px-container-margin py-4 w-full max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg tracking-tight text-primary">
            LOCALITE
          </h1>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-container-margin py-stack-lg relative z-10">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Header Section */}
          <div className="text-center mb-stack-md">
            <h2 className="font-headline-md text-headline-md text-primary mb-2">Modern Nobility</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Join an exclusive community of local explorers.</p>
          </div>

          {/* Sign Up Form Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_16px_32px_rgba(10,25,47,0.06)] border border-surface-container-high">
            {error && (
              <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center font-body-md mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2 group">
                <label className="font-label-caps text-label-caps text-on-surface-variant block group-focus-within:text-secondary transition-colors" htmlFor="full-name">
                  FULL NAME
                </label>
                <input 
                  className="w-full px-4 py-3 rounded-lg bg-surface-container border-none focus:ring-1.5 focus:ring-secondary focus:bg-surface-container-lowest transition-all font-body-md text-primary outline-none" 
                  id="full-name" 
                  placeholder="E.g. Alexander Sterling" 
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2 group">
                <label className="font-label-caps text-label-caps text-on-surface-variant block group-focus-within:text-secondary transition-colors" htmlFor="email">
                  EMAIL ADDRESS
                </label>
                <input 
                  className="w-full px-4 py-3 rounded-lg bg-surface-container border-none focus:ring-1.5 focus:ring-secondary focus:bg-surface-container-lowest transition-all font-body-md text-primary outline-none" 
                  id="email" 
                  placeholder="alexander@domain.com" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Password */}
              <div className="space-y-2 group">
                <label className="font-label-caps text-label-caps text-on-surface-variant block group-focus-within:text-secondary transition-colors" htmlFor="password">
                  PASSWORD
                </label>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-3 rounded-lg bg-surface-container border-none focus:ring-1.5 focus:ring-secondary focus:bg-surface-container-lowest transition-all font-body-md text-primary outline-none" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" 
                  >
                    <span className="material-symbols-outlined text-sm">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start space-x-3 pt-2">
                <input 
                  className="mt-1 h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer" 
                  id="terms" 
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label className="font-body-md text-[14px] text-on-surface-variant cursor-pointer" htmlFor="terms">
                  I agree to the <Link to="/terms" className="text-secondary font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-secondary font-bold hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              {/* Primary Action Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-secondary text-on-secondary font-label-caps text-label-caps py-4 rounded-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center space-x-2" 
              >
                <span>{loading ? 'CREATING...' : 'CREATE ACCOUNT'}</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </form>

            {/* Alternative Methods */}
            <div className="mt-8">
              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-surface-container-high w-full absolute"></div>
                <span className="bg-surface-container-lowest px-4 font-label-caps text-[10px] text-on-surface-variant relative z-10">
                  OR SIGN UP WITH
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-outline-variant rounded-lg font-label-caps text-[11px] text-primary hover:bg-surface-container-low transition-colors">
                  <img alt="Google" className="w-4 h-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC88LUQftJkoLgw5N899fw5XXxqmL7NbAws7K0i8Hn3KSRh69eDIbo_Udfe0SP_PakYkDvrIwO7PtY4-u0AjdCYHYD_NtqnY9aycmgkEF5ghra-sxpqWfgl1oaosvBWJqkNvnwSoxlslurQEwNcsJXJmw_v8qPJZlB5pexQKExegYPfVIp_yy7MokB5dYWmLd38CGww2-GRQwwCVhDITyh4pDJgIVvgTPhOgpYCUcHKiOz_9cHcIVaeBA"/>
                  <span>GOOGLE</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-outline-variant rounded-lg font-label-caps text-[11px] text-primary hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>apps</span>
                  <span>APPLE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center mt-stack-md font-body-md text-on-surface-variant">
            Already have an account? 
            <Link to="/login" className="text-secondary font-bold hover:underline ml-1">Login</Link>
          </p>
        </div>
      </main>

      {/* Visual Accent Element */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-full opacity-10 pointer-events-none overflow-hidden hidden md:block">
        <div 
          className="w-full h-full bg-cover" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrQFQhyCfRisbe8C8CZY98mgcZVh3HP8FpzuFudyEtaKZsROu9keLzVanNpJESweJn6iCEH_pEbYYfJv8Q7zyARj6QXE1n1-mC_hvDuRyFJue91taNukcM1WZk52iE7Je4CcpfQ9hKtgiDZKitqA3ErCxGm3XrrgEFGIwwp8pCoSuU6rG6iWlXZTnchObfjDdNG9NOpMbOb4He8lz0GwXQ21_LRDH_hBpeQ-BaE_3LW8Zmw5oWzF65dQ')" }}
        ></div>
      </div>

      <footer className="py-8 px-container-margin border-t border-surface-container-high mt-auto z-10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="font-label-caps text-[10px] text-on-surface-variant">© 2024 LOCALITE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="font-label-caps text-[10px] text-on-surface-variant hover:text-secondary transition-colors">PRIVACY</Link>
            <Link to="/legal" className="font-label-caps text-[10px] text-on-surface-variant hover:text-secondary transition-colors">LEGAL</Link>
            <Link to="/contact" className="font-label-caps text-[10px] text-on-surface-variant hover:text-secondary transition-colors">CONTACT</Link>
          </div>
        </div>
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

export default SignupPage;
