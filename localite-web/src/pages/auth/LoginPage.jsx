import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Side: Moody Lifestyle Image */}
      <section className="hidden lg:block lg:w-1/2 relative overflow-hidden h-screen">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/60 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10000ms] hover:scale-110"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCND7zWzQ78FFs0JwWN7LdM6Q7F-FzZ29Su9tVsDgBRwcgkBAjZYXCkGY1SYB1CfAjyj0Gq9JhHF4rli194lJPo4J2vteCfCBuq_4P3K9b7lD6dfLza-idQHZGUf5cpf0FbTGEUWfbRlCFpwbqv4n7sVJ7fzeuUdzP76f8g9fHj136SuBrAvUFUiq9wzvciNuISwnP1TwGURwj1y2ZByYWEoyMCOYJqEo-5lcbuvbAb7B_mVyYDctPYsw')" }}
        ></div>
        {/* Branding Overlay */}
        <div className="absolute bottom-stack-lg left-container-margin z-20 text-white">
          <h1 className="font-display-lg text-display-lg tracking-tighter mb-2">Localite</h1>
          <p className="font-body-lg text-body-lg opacity-80 max-w-md">
            Modern Nobility in Local Gathering. Experience curated community events in your city's most refined venues.
          </p>
        </div>
      </section>

      {/* Right Side: Clean Login Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-container-margin py-stack-lg bg-surface">
        {/* Mobile Header */}
        <div className="lg:hidden mb-stack-md w-full max-w-md text-left">
          <h1 className="font-display-lg text-display-lg tracking-tighter text-primary">Localite</h1>
        </div>

        <div className="w-full max-w-md space-y-stack-md">
          <div className="space-y-unit">
            <h2 className="font-headline-md text-headline-md text-primary">Welcome Back</h2>
            <p className="text-on-surface-variant font-body-md">Sign in to access your curated local experiences.</p>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center font-body-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            <div className="space-y-unit">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">EMAIL ADDRESS</label>
              <input 
                className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl font-body-md text-on-surface form-input-focus transition-all duration-200 outline-none" 
                id="email" 
                placeholder="name@example.com" 
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-unit">
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">PASSWORD</label>
                <Link to="/forgot-password" className="font-label-caps text-label-caps text-secondary hover:underline transition-all">
                  FORGOT PASSWORD?
                </Link>
              </div>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl font-body-md text-on-surface form-input-focus transition-all duration-200 outline-none" 
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-4 rounded-xl luxury-shadow hover:opacity-90 active:scale-[0.98] transition-all duration-200 tracking-widest"
            >
              {loading ? 'VERIFYING...' : 'LOGIN'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink mx-4 font-label-caps text-label-caps text-on-surface-variant">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-unit">
            <button className="w-full flex items-center justify-center gap-3 border border-secondary text-secondary font-label-caps text-label-caps py-4 rounded-xl hover:bg-secondary-container/10 active:scale-[0.98] transition-all duration-200">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>apps</span>
              APPLE
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="pt-stack-md text-center">
            <p className="font-body-md text-on-surface-variant">
              New to the community?{' '}
              <Link to="/signup" className="text-primary font-bold hover:text-secondary transition-colors underline decoration-secondary/30 underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Small Print */}
        <footer className="mt-auto pt-stack-lg max-w-md w-full text-center lg:text-left">
          <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em] leading-relaxed">
            © 2024 Localite. All rights reserved. By signing in, you agree to our{' '}
            <Link to="/terms" className="underline">Terms of Service</Link> and{' '}
            <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </footer>
      </section>
    </main>
  );
};

export default LoginPage;
