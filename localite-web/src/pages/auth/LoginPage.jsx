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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top AppBar */}
      <header className="w-full top-0 sticky bg-background z-50">
        <div className="flex items-center justify-between px-container-margin py-4 w-full max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="text-primary hover:opacity-80 transition-opacity active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg tracking-tight text-primary">
            LOCALITE
          </h1>
          <div className="w-8"></div> {/* Spacer for center alignment balance */}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-container-margin py-stack-lg relative overflow-hidden">
        {/* Abstract Atmospheric Background Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl"></div>
        
        <div className="w-full max-w-md space-y-stack-md z-10 animate-fade-in-up">
          {/* Header Section */}
          <div className="text-center space-y-stack-sm">
            <h2 className="font-headline-md text-headline-md text-primary">Welcome Back</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Enter your details to rejoin your local circle.
            </p>
          </div>
          
          {/* Login Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_16px_32px_rgba(10,25,47,0.06)] border border-surface-container-high space-y-stack-md">
            {error && (
              <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center font-body-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2 group">
                <label className="block font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-secondary transition-colors" htmlFor="email">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 font-body-md text-primary placeholder:text-on-surface-variant/40 focus:ring-1.5 focus:ring-secondary focus:bg-surface-container-lowest transition-all duration-200 outline-none" 
                    id="email" 
                    name="email" 
                    placeholder="name@domain.com" 
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-center">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant group-focus-within:text-secondary transition-colors" htmlFor="password">
                    PASSWORD
                  </label>
                  <Link to="/forgot-password" className="font-label-caps text-label-caps text-secondary hover:opacity-80 transition-opacity">
                    FORGOT PASSWORD?
                  </Link>
                </div>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 font-body-md text-primary placeholder:text-on-surface-variant/40 focus:ring-1.5 focus:ring-secondary focus:bg-surface-container-lowest transition-all duration-200 outline-none" 
                    id="password" 
                    name="password" 
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

              {/* Login Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-surface py-4 rounded-xl font-label-caps text-label-caps tracking-widest hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg"
              >
                {loading ? 'AUTHENTICATING...' : 'LOGIN'}
              </button>
            </form>

            {/* Social Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-grow bg-outline-variant"></div>
              <span className="font-label-caps text-label-caps text-on-surface-variant/50">OR</span>
              <div className="h-[1px] flex-grow bg-outline-variant"></div>
            </div>

            {/* Secondary Action */}
            <button className="w-full border border-secondary text-secondary py-4 rounded-xl font-label-caps text-label-caps tracking-widest hover:bg-secondary/5 active:scale-[0.98] transition-all">
              CONTINUE WITH APPLE
            </button>
          </div>

          {/* Sign Up Prompt */}
          <div className="text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              New to the circle?{' '}
              <Link to="/signup" className="text-secondary font-bold hover:underline decoration-1 underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="py-stack-md px-container-margin text-center">
        <p className="font-label-caps text-[10px] text-on-surface-variant/40 uppercase tracking-[0.2em]">
          © 2024 Localite Community. All Rights Reserved.
        </p>
      </footer>

      {/* Add some simple styles for animation that would normally be in global css */}
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

export default LoginPage;
