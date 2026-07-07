import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { User, MapPin, Activity, Settings, Save, Star, MessageSquare, TrendingUp, Shield, Award, Zap } from 'lucide-react';
import PublicProfileModal from '../components/PublicProfileModal';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    neighborhood: '',
    sportsInterests: '',
    interests: '',
    age: '',
    gender: '',
    lookingFor: '',
    availability: '',
    xp: 0,
    badges: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    
    gsap.fromTo('.profile-anim', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile({
          username: data.username || '',
          email: data.email || '',
          bio: data.bio || '',
          neighborhood: data.neighborhood || '',
          sportsInterests: data.sportsInterests || '',
          interests: data.interests || '',
          age: data.age || '',
          gender: data.gender || '',
          lookingFor: data.lookingFor || '',
          availability: data.availability || '',
          trustScore: data.trustScore || 0,
          eventsHosted: data.eventsHosted || 0,
          eventsAttended: data.eventsAttended || 0,
          isVerified: data.isVerified || false,
          averageRating: data.averageRating || 0,
          reviewCount: data.reviewCount || 0,
          xp: data.xp || 0,
          badges: data.badges || []
        });

        const reviewRes = await fetch(`${import.meta.env.VITE_API_URL}/users/${data.id}/reviews`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (reviewRes.ok) {
          setReviews(await reviewRes.json());
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/users/me', {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bio: profile.bio,
          neighborhood: profile.neighborhood,
          sportsInterests: profile.sportsInterests,
          interests: profile.interests,
          age: profile.age ? parseInt(profile.age, 10) : null,
          gender: profile.gender,
          lookingFor: profile.lookingFor,
          availability: profile.availability
        })
      });
      if (res.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBoostProfile = async () => {
    if (window.confirm("Pay $4.99 to boost your profile for 30 days? (Mock Payment)")) {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/monetization/boost-profile`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          alert("Payment Successful! Your profile is now boosted.");
          fetchProfile();
        } else {
          alert("Failed to boost profile.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-lime-vibe font-label-mono uppercase tracking-widest">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      
      <div className="profile-anim mb-12 flex justify-between items-center">
        <div>
          <h2 className="font-display-md text-display-md text-on-surface uppercase tracking-tight mb-2">
            Operative <span className="text-lime-vibe">Profile</span>
          </h2>
          <p className="font-body-lg text-body-lg text-text-muted">
            Manage your identity and ecosystem parameters.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleBoostProfile}
            className="flex items-center gap-2 px-6 py-3 font-label-mono text-label-mono uppercase tracking-widest transition-all rounded-DEFAULT bg-surface-dark border border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            title="Premium Feature"
          >
            <Star size={18} /> Boost Profile
          </button>

          <button 
            onClick={() => navigate('/analytics')}
            className="flex items-center gap-2 px-6 py-3 font-label-mono text-label-mono uppercase tracking-widest transition-all rounded-DEFAULT bg-surface-dark border border-lime-vibe/50 text-lime-vibe hover:bg-lime-vibe/10"
          >
            <TrendingUp size={18} /> Analytics
          </button>
          
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center gap-2 px-6 py-3 font-label-mono text-label-mono uppercase tracking-widest transition-all rounded-DEFAULT ${
              isEditing 
              ? 'bg-lime-vibe text-primary-container hover:bg-white glow-neon' 
              : 'border border-surface-variant/50 text-on-surface hover:border-lime-vibe hover:text-lime-vibe'
            }`}
          >
            {isEditing ? <><Save size={18} /> Update Data</> : <><Settings size={18} /> Configure</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: ID Card */}
        <div className="md:col-span-12 space-y-6 profile-anim">
          <div className="bg-surface-container-low border border-surface-variant/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-lime-vibe/10 flex justify-center items-center border-2 border-lime-vibe shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                <User size={64} className="text-lime-vibe" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="font-headline-lg text-headline-md text-white uppercase tracking-tight flex items-center justify-center md:justify-start gap-3">
                  {profile.username}
                  {profile.isVerified && (
                    <span className="text-lime-vibe" title="Verified Operator">✓</span>
                  )}
                </h2>
                <p className="font-body-md text-text-muted mt-2">{profile.email}</p>
                
                {/* XP Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label-mono text-[10px] text-lime-vibe uppercase tracking-widest flex items-center gap-1"><Zap size={12} /> XP LEVEL</span>
                    <span className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest">{profile.xp} / 1000</span>
                  </div>
                  <div className="w-full bg-surface-variant/30 rounded-full h-2 overflow-hidden border border-surface-variant/50">
                    <div className="bg-lime-vibe h-2 rounded-full" style={{ width: `${Math.min(100, (profile.xp / 1000) * 100)}%` }}></div>
                  </div>
                </div>

                {/* Badges */}
                {profile.badges && profile.badges.length > 0 && (
                  <div className="mt-4 flex gap-2 flex-wrap justify-center md:justify-start">
                    {profile.badges.map(badge => (
                      <div key={badge} className="bg-surface-variant/20 border border-lime-vibe/30 px-3 py-1 rounded-full flex items-center gap-2">
                        <Award size={14} className="text-yellow-400" />
                        <span className="font-label-mono text-[10px] text-white uppercase tracking-widest">{badge}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                  <div className="bg-surface-container px-6 py-3 rounded-lg border border-surface-variant/50 text-center">
                    <p className="font-headline-sm text-lime-vibe text-2xl">{profile.trustScore}</p>
                    <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">Trust Score</p>
                  </div>
                  <div className="bg-surface-container px-6 py-3 rounded-lg border border-surface-variant/50 text-center flex flex-col items-center">
                    <div className="flex items-center gap-1 font-headline-sm text-lime-vibe text-2xl">
                      {profile.averageRating.toFixed(1)} <Star size={16} className="fill-lime-vibe" />
                    </div>
                    <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">{profile.reviewCount} Reviews</p>
                  </div>
                  <div className="bg-surface-container px-6 py-3 rounded-lg border border-surface-variant/50 text-center">
                    <p className="font-headline-sm text-white text-2xl">{profile.eventsHosted}</p>
                    <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">Hosted</p>
                  </div>
                  <div className="bg-surface-container px-6 py-3 rounded-lg border border-surface-variant/50 text-center">
                    <p className="font-headline-sm text-white text-2xl">{profile.eventsAttended}</p>
                    <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">Attended</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Parameters */}
        <div className="md:col-span-12 space-y-6 profile-anim">
          <div className="bg-surface-container-low border border-surface-variant/20 rounded-2xl p-8">
            <h4 className="font-label-caps text-label-caps text-lime-vibe uppercase tracking-[0.2em] mb-6 flex items-center gap-2 border-b border-surface-variant/10 pb-4">
              <Activity size={16} /> Operational Parameters
            </h4>

            <div className="space-y-6">
              <div>
                <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Biography</label>
                {isEditing ? (
                  <textarea 
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-4 font-body-md focus:outline-none focus:border-lime-vibe transition-colors resize-none"
                    placeholder="Brief description of your operational capabilities..."
                  />
                ) : (
                  <p className="font-body-md text-on-surface bg-surface-dark/50 p-4 rounded-lg border border-transparent">
                    {profile.bio || 'No biography configured.'}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2 flex items-center gap-2"><MapPin size={14}/> Sector / Neighborhood</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      name="neighborhood"
                      value={profile.neighborhood}
                      onChange={handleChange}
                      className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-4 font-body-md focus:outline-none focus:border-lime-vibe transition-colors"
                      placeholder="e.g. Downtown"
                    />
                  ) : (
                    <p className="font-body-md text-on-surface bg-surface-dark/50 p-4 rounded-lg border border-transparent">
                      {profile.neighborhood || 'Sector Unknown'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Specializations (Sports)</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      name="sportsInterests"
                      value={profile.sportsInterests}
                      onChange={handleChange}
                      className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-4 font-body-md focus:outline-none focus:border-lime-vibe transition-colors"
                      placeholder="e.g. Basketball, Tennis"
                    />
                  ) : (
                    <p className="font-body-md text-on-surface bg-surface-dark/50 p-4 rounded-lg border border-transparent">
                      {profile.sportsInterests || 'No specializations logged.'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">General Interests</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      name="interests"
                      value={profile.interests}
                      onChange={handleChange}
                      className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-4 font-body-md focus:outline-none focus:border-lime-vibe transition-colors"
                      placeholder="e.g. Music, Gaming"
                    />
                  ) : (
                    <p className="font-body-md text-on-surface bg-surface-dark/50 p-4 rounded-lg border border-transparent">
                      {profile.interests || 'Not configured'}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Age</label>
                    {isEditing ? (
                      <input 
                        type="number"
                        name="age"
                        value={profile.age}
                        onChange={handleChange}
                        className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-4 font-body-md focus:outline-none focus:border-lime-vibe transition-colors"
                      />
                    ) : (
                      <p className="font-body-md text-on-surface bg-surface-dark/50 p-4 rounded-lg border border-transparent">
                        {profile.age || '-'}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Gender</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-4 font-body-md focus:outline-none focus:border-lime-vibe transition-colors"
                      />
                    ) : (
                      <p className="font-body-md text-on-surface bg-surface-dark/50 p-4 rounded-lg border border-transparent">
                        {profile.gender || '-'}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Looking For</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      name="lookingFor"
                      value={profile.lookingFor}
                      onChange={handleChange}
                      className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-4 font-body-md focus:outline-none focus:border-lime-vibe transition-colors"
                      placeholder="e.g. friends, sports partners"
                    />
                  ) : (
                    <p className="font-body-md text-on-surface bg-surface-dark/50 p-4 rounded-lg border border-transparent">
                      {profile.lookingFor || 'Not configured'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Availability</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      name="availability"
                      value={profile.availability}
                      onChange={handleChange}
                      className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-4 font-body-md focus:outline-none focus:border-lime-vibe transition-colors"
                      placeholder="e.g. Weekends, Evenings"
                    />
                  ) : (
                    <p className="font-body-md text-on-surface bg-surface-dark/50 p-4 rounded-lg border border-transparent">
                      {profile.availability || 'Not configured'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="bg-surface-container-low border border-surface-variant/20 rounded-2xl p-8 mt-6">
            <h4 className="font-label-caps text-label-caps text-lime-vibe uppercase tracking-[0.2em] mb-6 flex items-center gap-2 border-b border-surface-variant/10 pb-4">
              <MessageSquare size={16} /> Host Reviews
            </h4>
            
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="font-body-md text-text-muted">No reviews available yet.</p>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="bg-surface-dark p-4 rounded-lg border border-surface-variant/30">
                    <div className="flex justify-between items-start mb-2">
                      <button 
                        onClick={() => review.reviewer && setSelectedUserId(review.reviewer.id)}
                        className="font-label-mono text-sm text-lime-vibe hover:underline font-bold"
                      >
                        {review.reviewer?.username || 'Anonymous'}
                      </button>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < review.rating ? "text-lime-vibe fill-lime-vibe" : "text-surface-variant"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="font-body-sm text-text-muted">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {selectedUserId && (
        <PublicProfileModal 
          userId={selectedUserId} 
          onClose={() => setSelectedUserId(null)} 
        />
      )}
    </div>
  );
};

export default ProfilePage;
