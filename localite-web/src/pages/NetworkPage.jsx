import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { UserPlus, UserCheck, Users, MessageSquare } from 'lucide-react';
import DirectMessagePanel from '../components/DirectMessagePanel';

const NetworkPage = () => {
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMessageUser, setActiveMessageUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchPendingRequests();
    
    gsap.fromTo('.network-anim', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_URL + '/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_URL + '/users/connections/pending', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPendingRequests(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnect = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/connect`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Connection request sent!");
      } else {
        const text = await res.text();
        alert(text);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (connectionId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/connections/${connectionId}/accept`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Connection accepted!");
        fetchPendingRequests();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      
      <div className="network-anim mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-display-md text-display-md text-on-surface uppercase tracking-tight mb-2">
            Local <span className="text-lime-vibe">Network</span>
          </h2>
          <p className="font-body-lg text-body-lg text-text-muted">
            Connect with operatives in your sector.
          </p>
        </div>
      </div>

      {pendingRequests.length > 0 && (
        <div className="network-anim mb-12">
          <h3 className="font-headline-sm text-headline-sm text-lime-vibe uppercase tracking-tight mb-6">Pending Connections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingRequests.map(req => (
              <div key={req.connectionId} className="bg-surface-container-low border border-lime-vibe/50 rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <h4 className="font-headline-sm text-on-surface uppercase tracking-tight">{req.requesterName}</h4>
                  <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">Wants to connect</p>
                </div>
                <button 
                  onClick={() => handleAccept(req.connectionId)}
                  className="px-4 py-2 bg-lime-vibe text-primary-container font-label-mono text-xs uppercase tracking-widest hover:bg-white transition-all glow-neon rounded-DEFAULT flex items-center gap-2"
                >
                  <UserCheck size={16} /> Accept
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="network-anim">
        <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight mb-6 flex items-center gap-2">
           <Users size={24} className="text-lime-vibe" /> Sector Directory
        </h3>
        
        {loading ? (
          <div className="py-20 text-center font-label-mono text-lime-vibe uppercase tracking-widest animate-pulse">
            Scanning Network...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div key={user.id} className="bg-surface-container-low border border-surface-variant/20 rounded-2xl p-6 hover:border-lime-vibe/30 transition-colors">
                  <div className="flex justify-between items-start mb-4 border-b border-surface-variant/20 pb-4">
                    <div>
                      <h3 className="font-headline-sm text-lg text-white uppercase tracking-tight flex items-center gap-2">
                        {user.username}
                        {user.isVerified && <span className="material-symbols-outlined text-lime-vibe text-sm" title="Verified Operator">verified</span>}
                      </h3>
                      <p className="font-label-mono text-xs text-lime-vibe uppercase mt-1">{user.neighborhood || 'Sector Unknown'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface-dark border border-surface-variant/50 flex items-center justify-center relative">
                      <span className="material-symbols-outlined text-text-muted text-sm">person</span>
                      <div className="absolute -bottom-2 -right-2 bg-surface-container px-1 rounded-full border border-surface-variant/50">
                        <p className="font-label-mono text-[8px] text-lime-vibe">{user.trustScore}</p>
                      </div>
                    </div>
                  </div>
                
                <p className="font-body-sm text-text-muted mb-6 line-clamp-2 min-h-[40px]">
                  {user.bio || 'No operational biography available.'}
                </p>

                <div className="border-t border-surface-variant/10 pt-4 mb-6">
                  <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mb-2">Specializations</p>
                  <p className="font-body-sm text-on-surface">{user.sportsInterests || 'None'}</p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleConnect(user.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-lime-vibe/50 text-lime-vibe font-label-mono text-xs uppercase tracking-widest hover:bg-lime-vibe/10 transition-colors"
                  >
                    <UserPlus size={14} /> Establish Connection
                  </button>
                  <button 
                    onClick={() => setActiveMessageUser(user)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-surface-variant/50 text-text-muted font-label-mono text-xs uppercase tracking-widest hover:text-white hover:border-white/50 transition-colors"
                  >
                    <MessageSquare size={14} /> Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DirectMessagePanel 
        recipient={activeMessageUser} 
        onClose={() => setActiveMessageUser(null)} 
      />
    </div>
  );
};

export default NetworkPage;
