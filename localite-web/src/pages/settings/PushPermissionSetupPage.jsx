import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PushPermissionSetupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Enable Notifications');

  const handleEnable = () => {
    setLoading(true);
    setStatus('');
    setTimeout(() => {
      setStatus('Preferences Saved');
      setLoading(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    }, 1200);
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen flex items-center justify-center overflow-hidden relative">
      
      {/* Blurred Background Atmosphere */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 opacity-40" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqryiHkKPcBTpEWIBCINf46nFiYKh3HVN3EVFnhUqLCIOGTU0foGIlXecvz50T_f9MrIp1lU_Tk8eLzZNi21Gaj4d_vpMYIJUTGd6-bUkmulbHB1iKxKPWa5nV2Jg4Tl6gMHgoItDeMdQfLAwXFMKKB_X-8A5Qt3-q-GAbrtgRfAfNby9IkzkWtQDJkXxH6hPKswpQ6O78vsM1G5iMbHY94Rn6xXqQQcOUbUFNaUkpqGl358q-ukho5g')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#fbf9f8] via-transparent to-[#fbf9f8] opacity-90"></div>
      </div>

      {/* Main Content Portal */}
      <main className="relative z-10 w-full max-w-2xl px-6">
        
        {/* Portal Card */}
        <div className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] p-12 text-center flex flex-col items-center gap-6 border border-white/50 overflow-hidden relative group transform transition-transform duration-500 hover:scale-[1.01]">
          
          {/* Subtle Texture Overlays */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e9c176] via-[#000000] to-[#e9c176] opacity-40"></div>
          
          {/* Icon Cluster */}
          <div className="relative mb-2">
            <div className="w-24 h-24 rounded-full bg-[#eae8e7] flex items-center justify-center relative overflow-hidden group-hover:bg-[#efeded] transition-colors">
              <span className="material-symbols-outlined text-primary text-[48px] transition-transform duration-500 group-hover:scale-110" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
              {/* Decorative Ring */}
              <div className="absolute inset-0 border-2 border-[#e9c176]/30 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
            </div>
            {/* Mini Float Icon */}
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#fed488] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[#785a1a] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          
          {/* Typography Group */}
          <div className="space-y-2 max-w-md mx-auto">
            <h1 className="font-display-lg text-5xl font-bold text-primary tracking-tight">Stay Connected</h1>
            <p className="font-body-lg text-lg text-[#44474d] leading-relaxed">
              Experience the pulse of your community with real-time updates on curated events and exclusive local invitations.
            </p>
          </div>
          
          {/* Action Cluster */}
          <div className="flex flex-col gap-4 w-full max-w-xs pt-4">
            <button 
              className={`py-4 px-8 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                status === 'Preferences Saved' ? 'bg-[#775a19] text-white' : 'bg-primary text-white hover:bg-[#303030] active:scale-95'
              }`}
              onClick={handleEnable}
              disabled={loading || status === 'Preferences Saved'}
            >
              {loading && <span className="material-symbols-outlined animate-spin text-lg">refresh</span>}
              {status}
            </button>
            <button 
              className="bg-transparent border border-[#775a19] text-[#775a19] py-4 px-8 rounded-lg font-label-caps text-[12px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#f5f3f3] active:scale-95"
              onClick={handleSkip}
            >
              Maybe Later
            </button>
          </div>
          
          {/* Trust Badge Divider */}
          <div className="w-16 h-px bg-[#c5c6cd]/30 my-2"></div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 w-full">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a19] text-[20px]">verified_user</span>
              <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a19] text-[20px]">auto_awesome</span>
              <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">No Spam</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a19] text-[20px]">settings_suggest</span>
              <span className="font-label-caps text-[10px] font-bold text-[#44474d] uppercase tracking-widest">Full Control</span>
            </div>
          </div>
          
        </div>
        
        {/* Secondary Context Message */}
        <p className="mt-6 text-center font-label-caps text-[12px] font-bold text-[#44474d]/60 uppercase tracking-widest">
          * You can adjust your preferences anytime in the Localite account settings.
        </p>
        
      </main>
      
    </div>
  );
}
