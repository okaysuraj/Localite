import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(".auth-container", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden z-0">
      {/* Background Decor */}
      <div className="absolute inset-0 z-[-1] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUjwWBnuLxZT5nUhvOG6KQRLrfjeNg-x9Pu3B_d64aGYQDNi_h9mwcmR2pESOTQZCx1Rw0WtufouoBEISm5j7pCNMeW6WsE6hGCszqUcjX5xnj3PrWKayFrH1jPsczlb-mm3WOs8dcakZe9A9AuGBbzvSo-5VrDfCpFkUALY-G7Nta4bmpNeS4DovK8gdNIbibvvahyV-IkQcHnpFKJ1MOpNm5Hynf9f1iyq8uZKxwBOnCC2vY7lz8uFVpbCXwTYYpwyfW6Po3_rY')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
      
      <div className="auth-container w-full max-w-md bg-surface-container-low/80 backdrop-blur-xl border border-surface-variant/20 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-lime-vibe p-2 rounded-lg">
               <span className="material-symbols-outlined text-background">location_on</span>
            </div>
            <h1 className="text-2xl font-bold text-on-surface">Localite</h1>
          </Link>
        </div>

        <h2 className="font-headline-md text-headline-md text-on-surface text-center mb-2 uppercase tracking-tight">Access Hub</h2>
        <p className="font-body-md text-body-md text-text-muted text-center mb-8">Enter your credentials to continue.</p>

        {error && <p className="text-red-400 text-center mb-4 font-label-mono text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 focus:outline-none focus:border-lime-vibe focus:ring-1 focus:ring-lime-vibe transition-colors"
              placeholder="e.g. you@example.com"
            />
          </div>
          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 focus:outline-none focus:border-lime-vibe focus:ring-1 focus:ring-lime-vibe transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full mt-6 bg-lime-vibe text-primary-container font-label-mono text-label-mono uppercase tracking-widest py-3 rounded-lg hover:bg-white transition-all glow-neon active:scale-[0.98]"
          >
            AUTHENTICATE
          </button>
        </form>

        <p className="mt-8 text-center text-text-muted font-body-md text-sm">
          No access yet? <Link to="/signup" className="text-lime-vibe hover:underline font-label-mono uppercase tracking-wide ml-1">Apply here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
