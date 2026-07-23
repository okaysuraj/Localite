import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsLayout from '../../components/SettingsLayout';
import { AuthContext } from '../../context/AuthContext';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user?.username || 'Julian Thorne');
  const [profession, setProfession] = useState('Investment Principal');
  const [location, setLocation] = useState('Mayfair, London');
  const [bio, setBio] = useState('Curating experiences at the intersection of venture capital and urban aesthetics.');

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate API call
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "UPDATING...";
    btn.classList.add('opacity-80');
    setTimeout(() => {
      btn.innerText = "PROFILE SAVED";
      btn.classList.replace('bg-primary', 'bg-secondary');
      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.replace('bg-secondary', 'bg-primary');
        btn.classList.remove('opacity-80');
        navigate('/settings');
      }, 1000);
    }, 1000);
  };

  return (
    <SettingsLayout>
      {/* Back Action */}
      <div className="mb-stack-md">
        <button 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all group"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Settings
        </button>
      </div>

      {/* Form Container */}
      <section className="bg-surface-container-lowest rounded-xl p-stack-lg border border-surface-variant/50 shadow-sm animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-stack-lg text-center">
          <h1 className="font-headline-md text-headline-md text-primary mb-2">Edit Your Profile</h1>
          <p className="font-body-md text-on-surface-variant max-w-md">Refine your presence within the Localite community. Your details help us curate better connections.</p>
        </div>

        {/* Avatar Module */}
        <div className="flex flex-col items-center gap-stack-md mb-12">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-inner">
              <img 
                className="w-full h-full object-cover" 
                src={user?.profileImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkvYDpsT5_Ard-BX-mzAHAt6zYa5qXH_a1zcbBHe1YjzWrgwyYxMen7NuH-yTVEIWQurX7PswHbf122vQEYIDW6zD6FtfwkXbadbRqVZ82rfaC4CcLEM1sQR-4WHKm9rrzIAbfV10VYWZmRj-JxvX1FzPCo4hrXnsD6N012H5HfSrQoGXG4beDMEcFfH1m6Iuvjb_uTwM69tM3div17HaNZIFXYEZHs-NL93egEcpIo6HKnm4FwBe7VA'} 
                alt="Avatar Preview" 
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center border-2 border-surface shadow-lg hover:bg-secondary transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-label-caps text-label-caps text-secondary px-3 py-1 bg-secondary-container rounded-full">Verified Localite</span>
            </div>
            <button className="font-label-caps text-label-caps text-primary hover:text-secondary transition-all">Change Profile Photo</button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSave} className="space-y-stack-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Full Name</label>
              <input 
                className="bg-surface-container-low border border-transparent focus:border-secondary focus:bg-white rounded-xl px-4 py-3 font-body-md text-on-surface transition-all outline-none" 
                placeholder="Your full name" 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* Profession */}
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">Profession</label>
              <input 
                className="bg-surface-container-low border border-transparent focus:border-secondary focus:bg-white rounded-xl px-4 py-3 font-body-md text-on-surface transition-all outline-none" 
                placeholder="e.g. Design Architect" 
                type="text" 
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">Primary Location</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">location_on</span>
              <input 
                className="bg-surface-container-low border border-transparent focus:border-secondary focus:bg-white rounded-xl pl-12 pr-4 py-3 w-full font-body-md text-on-surface transition-all outline-none" 
                placeholder="City or District" 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">Personal Narrative (Bio)</label>
            <textarea 
              className="bg-surface-container-low border border-transparent focus:border-secondary focus:bg-white rounded-xl px-4 py-3 font-body-md text-on-surface resize-none transition-all outline-none" 
              placeholder="Share your story, interests, and what you bring to the hub..." 
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <p className="text-[11px] text-on-surface-variant font-body-md text-right">{bio.length} / 300 characters</p>
          </div>

          {/* Interest Tags */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">Community Hubs</label>
            <div className="flex flex-wrap gap-2">
              <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full font-label-caps text-[10px] flex items-center gap-2">Architecture <span className="material-symbols-outlined text-[12px] cursor-pointer">close</span></span>
              <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full font-label-caps text-[10px] flex items-center gap-2">Fine Dining <span className="material-symbols-outlined text-[12px] cursor-pointer">close</span></span>
              <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full font-label-caps text-[10px] flex items-center gap-2">Art History <span className="material-symbols-outlined text-[12px] cursor-pointer">close</span></span>
              <button type="button" className="border border-dashed border-outline-variant text-on-surface-variant px-3 py-1 rounded-full font-label-caps text-[10px] hover:border-primary hover:text-primary transition-all">Add Interest</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-stack-md border-t border-outline-variant/20 mt-stack-md">
            <button type="button" onClick={() => navigate('/settings')} className="font-label-caps text-label-caps text-on-surface-variant hover:text-error transition-all px-6 py-3">Discard Changes</button>
            <button type="submit" className="bg-primary text-white font-label-caps text-label-caps px-10 py-3 rounded-lg shadow-sm hover:bg-opacity-90 transition-all active:scale-[0.98]">Save Profile</button>
          </div>
        </form>
      </section>

      {/* Privacy Notice */}
      <div className="mt-stack-md flex items-start gap-3 p-4 bg-surface-container-low rounded-xl border border-surface-variant/30">
        <span className="material-symbols-outlined text-secondary">shield</span>
        <div>
          <p className="font-label-caps text-[11px] text-primary mb-1">Privacy Guarantee</p>
          <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">Your data is only visible to verified members of the hubs you have joined. We never sell your personal information to third parties.</p>
        </div>
      </div>
    </SettingsLayout>
  );
}
