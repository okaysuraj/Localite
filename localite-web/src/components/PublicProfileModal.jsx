import React, { useState, useEffect } from 'react';
import { User, X, Star, Zap, Award, AlertTriangle } from 'lucide-react';

const PublicProfileModal = ({ userId, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchProfile();
    checkFollowing();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      // To fetch a public profile, we need a generic users endpoint or just use the existing one if modified
      // Let's assume we create/have GET /api/users/{id}
      // Wait, there's no GET /api/users/{id} yet. I need to add that in UserController!
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProfile(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowing = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/is-following`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setIsFollowing(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const token = localStorage.getItem('token');
      const method = isFollowing ? 'DELETE' : 'POST';
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/${endpoint}`, {
        method,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReportUser = async () => {
    if (window.confirm("Are you sure you want to report this user?")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/safety/report`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ targetType: 'USER', targetId: profile.id, reason: 'Inappropriate behavior', details: '' })
        });
        if (res.ok) {
          alert("Report submitted successfully.");
          onClose(); // Auto-close or maybe we don't need to close, just give feedback
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading || !profile) {
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
        <div className="text-lime-vibe font-label-mono uppercase tracking-widest animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-surface-dark border border-surface-variant/30 rounded-2xl p-8 max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-24 h-24 rounded-full bg-lime-vibe/10 flex justify-center items-center border-2 border-lime-vibe shadow-[0_0_15px_rgba(204,255,0,0.3)] mb-4">
            <User size={48} className="text-lime-vibe" />
          </div>
          <h2 className="font-headline-md text-white uppercase tracking-tight flex items-center gap-2">
            {profile.username}
            {profile.isVerified && <span className="text-lime-vibe text-sm" title="Verified">✓</span>}
          </h2>
          <p className="font-body-sm text-text-muted mt-2 max-w-[80%]">{profile.bio || 'No biography configured.'}</p>

          <div className="flex flex-wrap gap-3 justify-center mt-4 text-xs text-text-muted bg-surface-container px-4 py-2 rounded-lg">
            {profile.neighborhood && <span><strong className="text-lime-vibe">Loc:</strong> {profile.neighborhood}</span>}
            {profile.age && <span><strong className="text-lime-vibe">Age:</strong> {profile.age}</span>}
            {profile.gender && <span><strong className="text-lime-vibe">Gender:</strong> {profile.gender}</span>}
          </div>
          {(profile.sportsInterests || profile.interests) && (
            <div className="flex flex-wrap gap-3 justify-center mt-2 text-xs text-text-muted bg-surface-container px-4 py-2 rounded-lg">
              {profile.sportsInterests && <span><strong className="text-lime-vibe">Sports:</strong> {profile.sportsInterests}</span>}
              {profile.interests && <span><strong className="text-lime-vibe">Interests:</strong> {profile.interests}</span>}
            </div>
          )}
          {(profile.lookingFor || profile.availability) && (
            <div className="flex flex-wrap gap-3 justify-center mt-2 text-xs text-text-muted bg-surface-container px-4 py-2 rounded-lg">
              {profile.lookingFor && <span><strong className="text-lime-vibe">Looking for:</strong> {profile.lookingFor}</span>}
              {profile.availability && <span><strong className="text-lime-vibe">Availability:</strong> {profile.availability}</span>}
            </div>
          )}

          {/* XP & Badges */}
          <div className="w-full mt-4 bg-surface-variant/10 rounded-lg p-3 border border-surface-variant/30">
            <div className="flex justify-between items-center mb-1 px-1">
              <span className="font-label-mono text-[10px] text-lime-vibe uppercase tracking-widest flex items-center gap-1"><Zap size={10} /> XP LEVEL</span>
              <span className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest">{profile.xp || 0} / 1000</span>
            </div>
            <div className="w-full bg-surface-variant/30 rounded-full h-1.5 overflow-hidden">
              <div className="bg-lime-vibe h-1.5 rounded-full shadow-[0_0_8px_rgba(204,255,0,0.5)]" style={{ width: `${Math.min(100, ((profile.xp || 0) / 1000) * 100)}%` }}></div>
            </div>
            
            {profile.badges && profile.badges.length > 0 && (
              <div className="flex gap-2 justify-center mt-3 flex-wrap">
                {profile.badges.map(badge => (
                  <div key={badge} className="bg-surface-dark border border-lime-vibe/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Award size={12} className="text-yellow-400" />
                    <span className="font-label-mono text-[9px] text-white uppercase tracking-widest">{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={handleFollowToggle}
            className={`mt-6 px-8 py-2 font-label-mono text-sm uppercase tracking-widest transition-all rounded-full border ${
              isFollowing 
                ? 'bg-transparent border-surface-variant/50 text-text-muted hover:border-red-500 hover:text-red-500' 
                : 'bg-lime-vibe border-lime-vibe text-primary-container hover:bg-white glow-neon'
            }`}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-surface-variant/20">
          <div className="bg-surface-container p-4 rounded-lg text-center">
            <p className="font-headline-sm text-lime-vibe text-xl">{profile.trustScore}</p>
            <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">Trust Score</p>
          </div>
          <div className="bg-surface-container p-4 rounded-lg text-center flex flex-col items-center">
            <div className="flex items-center gap-1 font-headline-sm text-lime-vibe text-xl">
              {(profile.averageRating || 0).toFixed(1)} <Star size={14} className="fill-lime-vibe" />
            </div>
            <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">Rating</p>
          </div>
          <div className="bg-surface-container p-4 rounded-lg text-center">
            <p className="font-headline-sm text-white text-xl">{profile.eventsHosted}</p>
            <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">Hosted</p>
          </div>
          <div className="bg-surface-container p-4 rounded-lg text-center">
            <p className="font-headline-sm text-white text-xl">{profile.eventsAttended}</p>
            <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">Attended</p>
          </div>
        </div>

        <button 
          onClick={handleReportUser}
          className="w-full mt-4 py-2 font-label-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-red-500 flex items-center justify-center gap-1 transition-colors"
        >
          <AlertTriangle size={12} /> Report User
        </button>
      </div>
    </div>
  );
};

export default PublicProfileModal;
