import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Fire,
  Check,
  Star,
  TrendUp,
  ShieldCheck,
  Trophy,
  Lightning,
  PencilSimple,
  Sparkle,
  ArrowRight,
} from '@phosphor-icons/react';
import PublicProfileModal from '../../components/PublicProfileModal';
import { API_URL as API_BASE_URL } from '../../config';
import { request } from '../../api/apiClient';

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
    instagramHandle: '',
    twitterHandle: '',
    phoneNumber: '',
    isPhoneVerified: false,
    currentStreak: 0,
    longestStreak: 0,
    xp: 0,
    badges: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = () =>
    request('/users/me', { fallback: null }).then(async (data) => {
      if (data) {
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
          instagramHandle: data.instagramHandle || '',
          twitterHandle: data.twitterHandle || '',
          phoneNumber: data.phoneNumber || '',
          isPhoneVerified: data.isPhoneVerified || false,
          currentStreak: data.currentStreak || 0,
          longestStreak: data.longestStreak || 0,
          trustScore: data.trustScore || 0,
          eventsHosted: data.eventsHosted || 0,
          eventsAttended: data.eventsAttended || 0,
          isVerified: data.isVerified || false,
          averageRating: data.averageRating || 0,
          reviewCount: data.reviewCount || 0,
          xp: data.xp || 0,
          badges: data.badges || [],
        });
        setReviews(await request(`/users/${data.id}/reviews`, { fallback: [] }));
      }
      setLoading(false);
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(API_BASE_URL + '/users/me', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: profile.bio,
          neighborhood: profile.neighborhood,
          sportsInterests: profile.sportsInterests,
          interests: profile.interests,
          age: profile.age ? parseInt(profile.age, 10) : null,
          gender: profile.gender,
          lookingFor: profile.lookingFor,
          availability: profile.availability,
          instagramHandle: profile.instagramHandle,
          twitterHandle: profile.twitterHandle,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        alert('Profile updated successfully.');
        fetchProfile();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBoostProfile = async () => {
    if (window.confirm('Boost your profile for 30 days to increase discovery?')) {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${API_BASE_URL}/monetization/boost-profile`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          alert('Success! Your profile is now boosted.');
          fetchProfile();
        } else {
          alert('Failed to boost profile.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleVerifyIdentity = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/users/verify-identity`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert('Identity verified successfully.');
        fetchProfile();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyPhone = async () => {
    if (!profile.phoneNumber) {
      alert('Please enter a phone number first.');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/users/verify-phone`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: profile.phoneNumber }),
      });
      if (res.ok) {
        alert('Phone verified successfully.');
        fetchProfile();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono uppercase tracking-wider text-fg-muted">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12 px-6">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-fg tracking-tight">
              Profile
            </h1>
            <p className="text-sm text-fg-muted mt-1">
              Manage your personal information, activity, and preferences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleBoostProfile}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-btn text-xs font-mono tracking-wide border border-border text-fg hover:bg-bg-subtle transition-colors"
            >
              <Sparkle size={14} className="text-accent" />
              Boost Profile
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-btn text-xs font-mono tracking-wide border border-border text-fg hover:bg-bg-subtle transition-colors"
            >
              <TrendUp size={14} />
              Analytics
            </button>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-btn text-xs font-mono tracking-wide transition-colors ${
                isEditing ? 'bg-accent text-white hover:opacity-90' : 'bg-fg text-white hover:bg-fg/90'
              }`}
            >
              {isEditing ? (
                <>
                  <Check size={14} /> Save Changes
                </>
              ) : (
                <>
                  <PencilSimple size={14} /> Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-border rounded-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-bg-subtle border border-border flex items-center justify-center shrink-0">
              <User size={48} className="text-fg-muted" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-2xl font-display font-semibold text-fg tracking-tight">
                  {profile.username}
                </h2>
                {profile.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-accent-subtle text-accent border border-accent/20 self-center md:self-auto">
                    <ShieldCheck size={12} /> Verified
                  </span>
                )}
              </div>
              <p className="text-sm font-mono text-fg-muted">{profile.email}</p>

              {/* XP Progress Bar */}
              <div className="pt-2 max-w-md">
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className="inline-flex items-center gap-1 text-accent font-medium">
                    <Lightning size={12} /> XP Level
                  </span>
                  <span className="text-fg-muted">{profile.xp} / 1000</span>
                </div>
                <div className="w-full bg-bg-subtle border border-border rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-accent h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (profile.xp / 1000) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Badges */}
              {profile.badges && profile.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                  {profile.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-bg-subtle border border-border text-fg"
                    >
                      <Trophy size={13} className="text-accent" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 mt-6 border-t border-border">
            <div className="bg-bg-subtle border border-border/60 rounded-card p-3.5 text-center">
              <span className="text-xl font-display font-semibold text-fg">{profile.trustScore}</span>
              <p className="text-[11px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">
                Trust Score
              </p>
            </div>
            <div className="bg-bg-subtle border border-border/60 rounded-card p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-xl font-display font-semibold text-fg">
                {profile.averageRating ? profile.averageRating.toFixed(1) : '0.0'}
                <Star size={14} className="text-accent fill-accent" />
              </div>
              <p className="text-[11px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">
                {profile.reviewCount} Reviews
              </p>
            </div>
            <div className="bg-bg-subtle border border-border/60 rounded-card p-3.5 text-center">
              <span className="text-xl font-display font-semibold text-fg">{profile.eventsHosted}</span>
              <p className="text-[11px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">Hosted</p>
            </div>
            <div className="bg-bg-subtle border border-border/60 rounded-card p-3.5 text-center">
              <span className="text-xl font-display font-semibold text-fg">{profile.eventsAttended}</span>
              <p className="text-[11px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">Attended</p>
            </div>
            <div className="bg-bg-subtle border border-border/60 rounded-card p-3.5 text-center col-span-2 sm:col-span-1">
              <div className="flex items-center justify-center gap-1 text-xl font-display font-semibold text-accent">
                {profile.currentStreak}
                <Fire size={14} />
              </div>
              <p className="text-[11px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">
                Day Streak
              </p>
            </div>
          </div>
        </div>

        {/* Details & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bio and Interests - Left 2 Columns */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-border rounded-card p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-display font-semibold text-fg tracking-tight">About & Interests</h3>

              {/* Bio */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-2">
                  Biography
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-bg-subtle border border-border rounded-btn p-3.5 text-sm text-fg focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell others about yourself..."
                  />
                ) : (
                  <p className="text-sm text-fg leading-relaxed bg-bg-subtle/50 p-4 rounded-card border border-border/60">
                    {profile.bio || 'No biography provided yet.'}
                  </p>
                )}
              </div>

              {/* Grid of Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                    Neighborhood / Area
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="neighborhood"
                      value={profile.neighborhood}
                      onChange={handleChange}
                      className="w-full bg-bg-subtle border border-border rounded-btn p-3 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                      placeholder="e.g. Indiranagar, Bangalore"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-fg bg-bg-subtle/50 p-3 rounded-card border border-border/60">
                      <MapPin size={15} className="text-fg-muted shrink-0" />
                      <span>{profile.neighborhood || 'Not specified'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                    Sports & Activities
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="sportsInterests"
                      value={profile.sportsInterests}
                      onChange={handleChange}
                      className="w-full bg-bg-subtle border border-border rounded-btn p-3 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                      placeholder="e.g. Football, Badminton"
                    />
                  ) : (
                    <div className="text-sm text-fg bg-bg-subtle/50 p-3 rounded-card border border-border/60">
                      {profile.sportsInterests || 'None specified'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                    General Interests
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="interests"
                      value={profile.interests}
                      onChange={handleChange}
                      className="w-full bg-bg-subtle border border-border rounded-btn p-3 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                      placeholder="e.g. Reading, Hiking, Tech"
                    />
                  ) : (
                    <div className="text-sm text-fg bg-bg-subtle/50 p-3 rounded-card border border-border/60">
                      {profile.interests || 'None specified'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                    Looking For
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lookingFor"
                      value={profile.lookingFor}
                      onChange={handleChange}
                      className="w-full bg-bg-subtle border border-border rounded-btn p-3 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                      placeholder="e.g. Weekend sports crew"
                    />
                  ) : (
                    <div className="text-sm text-fg bg-bg-subtle/50 p-3 rounded-card border border-border/60">
                      {profile.lookingFor || 'Not specified'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                    Availability
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="availability"
                      value={profile.availability}
                      onChange={handleChange}
                      className="w-full bg-bg-subtle border border-border rounded-btn p-3 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                      placeholder="e.g. Weekday mornings, Weekends"
                    />
                  ) : (
                    <div className="text-sm text-fg bg-bg-subtle/50 p-3 rounded-card border border-border/60">
                      {profile.availability || 'Not specified'}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                      Age
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="age"
                        value={profile.age}
                        onChange={handleChange}
                        className="w-full bg-bg-subtle border border-border rounded-btn p-3 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                      />
                    ) : (
                      <div className="text-sm text-fg bg-bg-subtle/50 p-3 rounded-card border border-border/60">
                        {profile.age || '—'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                      Gender
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="w-full bg-bg-subtle border border-border rounded-btn p-3 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                      />
                    ) : (
                      <div className="text-sm text-fg bg-bg-subtle/50 p-3 rounded-card border border-border/60">
                        {profile.gender || '—'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white border border-border rounded-card p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-semibold text-fg tracking-tight">
                  Host & Peer Reviews
                </h3>
                <span className="text-xs font-mono text-fg-muted">{reviews.length} total</span>
              </div>

              {reviews.length === 0 ? (
                <p className="text-sm text-fg-muted py-4">No reviews recorded yet.</p>
              ) : (
                <div className="divide-y divide-border">
                  {reviews.map((review) => (
                    <div key={review.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => review.reviewer && setSelectedUserId(review.reviewer.id)}
                          className="text-xs font-mono font-medium text-fg hover:text-accent transition-colors"
                        >
                          @{review.reviewer?.username || 'anonymous'}
                        </button>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < review.rating ? 'text-accent fill-accent' : 'text-border fill-border'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-fg-muted">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Verification & Accounts - Right Column */}
          <div className="space-y-6">
            <div className="bg-white border border-border rounded-card p-6 space-y-5">
              <h3 className="text-lg font-display font-semibold text-fg tracking-tight">Verification</h3>

              {/* Phone verification */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted">
                  Phone Number
                </label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleChange}
                      className="flex-1 bg-bg-subtle border border-border rounded-btn p-2.5 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                      placeholder="+91..."
                    />
                    {!profile.isPhoneVerified && (
                      <button
                        onClick={handleVerifyPhone}
                        className="px-3 py-2 text-xs font-mono bg-accent text-white rounded-btn hover:opacity-90 transition-opacity"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-card bg-bg-subtle border border-border/60">
                    <span className="text-xs font-mono text-fg">{profile.phoneNumber || 'Not provided'}</span>
                    {profile.isPhoneVerified ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-subtle text-accent border border-accent/20">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-fg-faint">Unverified</span>
                    )}
                  </div>
                )}
              </div>

              {/* Government ID verification */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted">
                  ID Status
                </label>
                {profile.isVerified ? (
                  <div className="flex items-center gap-2 p-3 rounded-card bg-accent-subtle border border-accent/20 text-accent text-xs font-mono">
                    <ShieldCheck size={16} />
                    <span>Government ID Verified</span>
                  </div>
                ) : (
                  <button
                    onClick={handleVerifyIdentity}
                    className="w-full flex items-center justify-between p-3 rounded-card bg-bg-subtle border border-border hover:border-accent/40 text-left transition-colors text-xs font-mono text-fg"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-fg-muted" />
                      Verify Identity
                    </span>
                    <ArrowRight size={14} className="text-fg-muted" />
                  </button>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white border border-border rounded-card p-6 space-y-4">
              <h3 className="text-lg font-display font-semibold text-fg tracking-tight">Social Accounts</h3>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                  Instagram
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="instagramHandle"
                    value={profile.instagramHandle}
                    onChange={handleChange}
                    className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                    placeholder="@handle"
                  />
                ) : (
                  <div className="p-2.5 rounded-card bg-bg-subtle border border-border/60 text-xs font-mono text-fg">
                    {profile.instagramHandle
                      ? `@${profile.instagramHandle.replace('@', '')}`
                      : 'Not connected'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-fg-muted mb-1.5">
                  Twitter / X
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="twitterHandle"
                    value={profile.twitterHandle}
                    onChange={handleChange}
                    className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-sm text-fg focus:outline-none focus:border-accent transition-colors"
                    placeholder="@handle"
                  />
                ) : (
                  <div className="p-2.5 rounded-card bg-bg-subtle border border-border/60 text-xs font-mono text-fg">
                    {profile.twitterHandle ? `@${profile.twitterHandle.replace('@', '')}` : 'Not connected'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedUserId && (
        <PublicProfileModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}
    </div>
  );
};

export default ProfilePage;
