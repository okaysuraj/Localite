import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
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
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        login(data.token, data.username);
        navigate('/dashboard');
      } else {
        const msg = await res.text();
        setError(msg || 'Failed to sign up');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden z-0">
      {/* Background Decor */}
      <div className="absolute inset-0 z-[-1] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuALnNwi7d5tRCZNuXSpDdT_2YTV1WKmgJRVKKqIg9yY-5viyMQtSPmntLsJpiRNHmTYguB3dolf8T7c4OqUbQ-y0wL-zf2CTnt27yZ27WWRDyBXuZDt1YYKHwnEUlBKcuQ7KXEE4cAqUc8dAaIJibGVW2SuBqqQmsAo08ff61-6Gvg_3trkRuidNSVlVJn82IaGkcmHAfBY5oJIN-xDp3daz_o78L6y97L6hl39JXJR7nZhr_mkecIQ119cgcCIopXs4Pb576-6BnA')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
      
      <div className="auth-container w-full max-w-md bg-surface-container-low/80 backdrop-blur-xl border border-surface-variant/20 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-lime-vibe p-2 rounded-lg">
               <span className="material-symbols-outlined text-background">location_on</span>
            </div>
            <h1 className="text-2xl font-bold text-on-surface">Localite</h1>
          </Link>
        </div>

        <h2 className="font-headline-md text-headline-md text-on-surface text-center mb-2 uppercase tracking-tight">Create Account</h2>
        <p className="font-body-md text-body-md text-text-muted text-center mb-8">Join the ecosystem. Secure your spot.</p>

        {error && <p className="text-red-400 text-center mb-4 font-label-mono text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-1">Username</label>
            <input 
              type="text" 
              required 
              value={formData.username} 
              onChange={e => setFormData({...formData, username: e.target.value})}
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 focus:outline-none focus:border-lime-vibe focus:ring-1 focus:ring-lime-vibe transition-colors"
              placeholder="e.g. striker99"
            />
          </div>
          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 focus:outline-none focus:border-lime-vibe focus:ring-1 focus:ring-lime-vibe transition-colors"
              placeholder="you@example.com"
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
            INITIALIZE
          </button>
        </form>

        <p className="mt-8 text-center text-text-muted font-body-md text-sm">
          Already verified? <Link to="/login" className="text-lime-vibe hover:underline font-label-mono uppercase tracking-wide ml-1">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
