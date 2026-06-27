import React, { useState, useEffect } from 'react';
import { User, X, Star, Activity } from 'lucide-react';

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
      </div>
    </div>
  );
};

export default PublicProfileModal;
