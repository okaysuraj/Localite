import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsLayout from '../../components/SettingsLayout';
import { AuthContext } from '../../context/AuthContext';
import { getCurrentUser, updateProfile } from '../../services/api';
import { ArrowLeft, Camera, ShieldCheck, MapPin, X, Plus } from '@phosphor-icons/react';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user?.username || '');
  const [profession, setProfession] = useState('Member');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data) {
          if (data.username) setFullName(data.username);
          if (data.neighborhood) setLocation(data.neighborhood);
          if (data.bio) setBio(data.bio);
          if (data.interests) {
            const list = Array.isArray(data.interests)
              ? data.interests
              : data.interests
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);
            setInterests(list);
          }
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };
    fetchUser();
  }, []);

  const handleRemoveInterest = (tag) => {
    setInterests(interests.filter((i) => i !== tag));
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (newTag.trim() && !interests.includes(newTag.trim())) {
      setInterests([...interests, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        bio,
        neighborhood: location,
        interests: interests.join(', '),
      });
      alert('Profile updated successfully.');
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* Back Link */}
        <button
          onClick={() => navigate('/settings')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-muted hover:text-fg transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Settings
        </button>

        {/* Form Container */}
        <div className="bg-white border border-border rounded-card p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h1 className="text-2xl font-display font-semibold text-fg tracking-tight">Edit Profile</h1>
            <p className="text-xs text-fg-muted mt-1">
              Update your public display name, location, and community attributes.
            </p>
          </div>

          {/* Avatar Module */}
          <div className="flex items-center gap-5 pt-2 pb-4 border-b border-border">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-border bg-bg-subtle">
                <img
                  className="w-full h-full object-cover"
                  src={user?.profileImageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`}
                  alt="Avatar"
                />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-accent text-white w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-xs hover:opacity-90 transition-opacity"
              >
                <Camera size={13} />
              </button>
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent-subtle text-accent border border-accent/20">
                <ShieldCheck size={11} /> Verified Member
              </span>
              <p className="text-[11px] font-mono text-fg-muted">JPG or PNG under 5MB</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider text-fg-muted mb-1.5">Display Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-xs text-fg font-sans focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                  Occupation / Field
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-xs text-fg font-sans focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5 flex items-center gap-1">
                <MapPin size={13} /> Primary Neighborhood
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-xs text-fg font-sans focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. Indiranagar, Bangalore"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5">Biography</label>
              <textarea
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-xs text-fg font-sans focus:outline-none focus:border-accent transition-colors resize-none"
              />
              <span className="block text-[10px] text-right text-fg-muted mt-1">{bio.length} / 300</span>
            </div>

            {/* Interest Tags */}
            <div className="space-y-2 pt-2">
              <label className="block uppercase tracking-wider text-fg-muted">Activities & Interests</label>
              <div className="flex flex-wrap gap-1.5 items-center">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-bg-subtle border border-border text-fg"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(tag)}
                      className="text-fg-muted hover:text-fg"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add another interest..."
                  className="bg-bg-subtle border border-border rounded-btn px-3 py-1.5 text-xs text-fg font-sans focus:outline-none focus:border-accent w-48"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="p-1.5 rounded-btn border border-border text-fg-muted hover:text-fg hover:bg-bg-subtle transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-border mt-6">
              <button
                type="button"
                onClick={() => navigate('/settings')}
                className="px-4 py-2 border border-border text-fg-muted hover:text-fg rounded-btn text-xs font-mono tracking-wide transition-colors"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-accent text-white rounded-btn text-xs font-mono tracking-wide hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </SettingsLayout>
  );
}
