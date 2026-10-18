import React, { useState, useEffect } from 'react';
import {
  User,
  X,
  Star,
  Lightning,
  Trophy,
  Warning,
  ShieldCheck,
} from '@phosphor-icons/react';
import { API_BASE_URL } from '../services/api';

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
      const res = await fetch(
        `${API_BASE_URL}/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      const res = await fetch(
        `${API_BASE_URL}/users/${userId}/is-following`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

      const res = await fetch(
        `${API_BASE_URL}/users/${userId}/${endpoint}`,
        {
          method,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReportUser = async () => {
    if (window.confirm('Are you sure you want to report this user?')) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${API_BASE_URL}/safety/report`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              targetType: 'USER',
              targetId: profile.id,
              reason: 'Inappropriate behavior',
              details: '',
            }),
          }
        );
        if (res.ok) {
          alert('Report submitted successfully.');
          onClose();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading || !profile) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-[60] flex items-center justify-center p-4">
        <div className="bg-white border border-border rounded-card p-6 text-xs font-mono text-fg-muted uppercase tracking-wider flex items-center gap-2 shadow-lg">
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          Loading member profile...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-[60] flex items-center justify-center p-4">
      <div className="bg-white border border-border rounded-card p-6 sm:p-8 max-w-md w-full relative shadow-xl animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-btn text-fg-muted hover:text-fg hover:bg-bg-subtle transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-20 h-20 rounded-full bg-bg-subtle border border-border flex justify-center items-center mb-3">
            <User size={40} className="text-fg-muted" />
          </div>

          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-display font-semibold text-fg tracking-tight">
              {profile.username}
            </h2>
            {profile.isVerified && (
              <ShieldCheck
                size={16}
                className="text-accent shrink-0"
                title="Verified Member"
              />
            )}
          </div>

          <p className="text-xs text-fg-muted mt-1.5 max-w-[85%] leading-relaxed">
            {profile.bio || 'No biography configured.'}
          </p>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-3.5">
            {profile.neighborhood && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-bg-subtle border border-border text-fg">
                {profile.neighborhood}
              </span>
            )}
            {profile.sportsInterests && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-accent-subtle text-accent border border-accent/20">
                {profile.sportsInterests}
              </span>
            )}
            {profile.interests && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-bg-subtle border border-border text-fg">
                {profile.interests}
              </span>
            )}
          </div>

          {/* XP & Badges */}
          <div className="w-full mt-5 bg-bg-subtle rounded-card p-3 border border-border/60">
            <div className="flex justify-between items-center text-[10px] font-mono mb-1">
              <span className="text-accent font-medium inline-flex items-center gap-1">
                <Lightning size={11} /> XP LEVEL
              </span>
              <span className="text-fg-muted">
                {profile.xp || 0} / 1000
              </span>
            </div>
            <div className="w-full bg-white border border-border rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, ((profile.xp || 0) / 1000) * 100)}%`,
                }}
              />
            </div>

            {profile.badges && profile.badges.length > 0 && (
              <div className="flex gap-1.5 justify-center mt-2.5 flex-wrap">
                {profile.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-white border border-border text-fg"
                  >
                    <Trophy size={11} className="text-accent" />
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Follow action */}
          <button
            onClick={handleFollowToggle}
            className={`mt-4 px-6 py-2 rounded-btn text-xs font-mono tracking-wide transition-colors ${
              isFollowing
                ? 'border border-border text-fg-muted hover:border-red-400 hover:text-red-500'
                : 'bg-accent text-white hover:opacity-90'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow Member'}
          </button>
        </div>

        {/* Stats 2x2 grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-5 pt-4 border-t border-border">
          <div className="bg-bg-subtle p-3 rounded-card text-center border border-border/60">
            <p className="text-lg font-display font-semibold text-fg">
              {profile.trustScore}
            </p>
            <p className="text-[10px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">
              Trust Score
            </p>
          </div>
          <div className="bg-bg-subtle p-3 rounded-card text-center border border-border/60">
            <div className="flex items-center justify-center gap-1 text-lg font-display font-semibold text-fg">
              {(profile.averageRating || 0).toFixed(1)}
              <Star size={13} className="text-accent fill-accent" />
            </div>
            <p className="text-[10px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">
              Rating
            </p>
          </div>
          <div className="bg-bg-subtle p-3 rounded-card text-center border border-border/60">
            <p className="text-lg font-display font-semibold text-fg">
              {profile.eventsHosted}
            </p>
            <p className="text-[10px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">
              Hosted
            </p>
          </div>
          <div className="bg-bg-subtle p-3 rounded-card text-center border border-border/60">
            <p className="text-lg font-display font-semibold text-fg">
              {profile.eventsAttended}
            </p>
            <p className="text-[10px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">
              Attended
            </p>
          </div>
        </div>

        {/* Report button */}
        <button
          onClick={handleReportUser}
          className="w-full mt-4 py-1.5 text-[11px] font-mono text-fg-faint hover:text-red-500 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Warning size={13} /> Report Member
        </button>
      </div>
    </div>
  );
};

export default PublicProfileModal;
