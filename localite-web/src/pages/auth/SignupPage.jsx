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
      await register(formData.username, formData.email, formData.password);
      navigate('/verify-email');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex items-stretch">
      {/* Left Side: Inspiring Image (Split Screen) */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBgHFu2zLDn-LO_6er6jRuvOVrLkpo3dbJ3PYfA5zc_nlujciTxUu6aXwQpRuuyZcFnSIbxKevRBxBwYTZS_O9xmkrC1qTU7P4LRSxO5S7cO06CXO5aUpeVmKjoSL7mhFy7dmHzvBw1Rw6h1DxUIuTrf2jI7QTuUrdTf1kJRJ_kgwqF2dKf5Mbkqmf0TMAH7P6-u-HVywk6VaxsJCFPEd783pU2rmDesRG1_esfAT1VJ_VkTnkcYjUtcw')" }}
        ></div>
        {/* Brand Identity Overlay */}
        <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white">
          <div className="flex items-center gap-3">
            <span className="font-display-lg text-headline-md tracking-tighter text-secondary-fixed">Localite</span>
          </div>
          <div className="max-w-md">
            <h2 className="font-display-lg text-display-lg mb-4">Elevate your daily gathering.</h2>
            <p className="font-body-lg text-body-lg text-surface-container-highest opacity-90 leading-relaxed">
              Join a curated community where local connections meet exceptional experiences. Designed for the modern discerning individual.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-container-margin py-stack-lg bg-surface">
        <div className="w-full max-w-md">
          {/* Header Mobile Brand (Hidden on Desktop) */}
          <div className="md:hidden mb-8 text-center">
            <span className="font-display-lg text-headline-md tracking-tighter text-primary">Localite</span>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h1 className="font-headline-md text-headline-md mb-2">Create your account</h1>
            <p className="text-on-surface-variant font-body-md">Begin your journey into the Localite community.</p>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center font-body-md mb-6">
              {error}
            </div>
          )}

          {/* Social Sign-Up Options */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors ethereal-shadow">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors ethereal-shadow">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96 0-2.04-.6-3.23-.6-1.2 0-2.34.61-3.21.61-1.48 0-4.04-3.04-4.04-6.04 0-2.9 1.83-4.44 3.56-4.44 1.1 0 1.96.6 2.7.6.71 0 1.76-.64 3-.64 1.1 0 2.45.54 3.2 1.62-2.7 1.25-2.25 4.8-.05 5.75-1 2.37-2.18 3.14-2.93 3.14zm-3.04-14.15c0-1.23.94-2.3 2.1-2.3.1 0 .2 0 .3.02-.06 1.34-.96 2.42-2.05 2.42-.15 0-.27-.02-.35-.04z"></path>
              </svg>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface">Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink mx-4 text-on-surface-variant font-label-caps">OR USE EMAIL</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase" htmlFor="full-name">Full Name</label>
              <input 
                className="w-full bg-surface-container-low border-transparent px-4 py-4 rounded-lg font-body-md text-on-surface placeholder-on-surface-variant/40 form-input-focus transition-all duration-200 outline-none"
                id="full-name" 
                placeholder="Elias Thorne" 
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase" htmlFor="email">Email Address</label>
              <input 
                className="w-full bg-surface-container-low border-transparent px-4 py-4 rounded-lg font-body-md text-on-surface placeholder-on-surface-variant/40 form-input-focus transition-all duration-200 outline-none"
                id="email" 
                placeholder="elias@modernnobility.com" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase" htmlFor="password">Password</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-low border-transparent px-4 py-4 rounded-lg font-body-md text-on-surface placeholder-on-surface-variant/40 form-input-focus transition-all duration-200 outline-none"
                  id="password" 
                  placeholder="••••••••••••" 
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Terms & Privacy */}
            <div className="flex items-start gap-3">
              <div className="flex items-center h-5">
                <input 
                  className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary/20 bg-surface-container-low transition-all cursor-pointer"
                  id="terms" 
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
              </div>
              <label className="text-on-surface-variant font-body-md text-sm leading-tight cursor-pointer" htmlFor="terms">
                I agree to the <Link to="/terms" className="text-secondary font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-secondary font-bold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            {/* Primary Action */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all duration-300 shadow-xl mt-4"
            >
              {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center font-body-md text-on-surface-variant">
            Already part of the community?{' '}
            <Link to="/login" className="text-secondary font-bold hover:underline ml-1">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
