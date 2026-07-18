import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { API_URL } from '../config';

export default function CreateMatchPage() {
  const navigate = useNavigate();
  const [sport, setSport] = useState('Tennis (Singles)');
  const [level, setLevel] = useState('Amateur');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [isPrivate, setIsPrivate] = useState(false);
  const [houseRules, setHouseRules] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert('Date and time are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const payload = {
        title: `${level} ${sport} Match`,
        category: sport.split(' ')[0], 
        skillLevel: level,
        eventType: isPrivate ? 'Private Match' : 'Public Match',
        date: `${date}T${time}:00`,
        maxAttendees: maxPlayers,
        rules: houseRules,
        location: 'The Heritage Club, Court 4', 
        cost: 0,
      };

      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert('Match created successfully!');
        navigate(-1);
      } else {
        const errorData = await res.text();
        alert(errorData || 'Failed to create match');
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="font-display-lg text-[32px] md:text-display-lg mb-2 text-primary">Create New Match</h2>
        <p className="text-on-surface-variant max-w-2xl font-body-md">Configure your private or open tournament. Set the standards for play, choose your venue, and invite members of the local elite community.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Form Details */}
        <div className="md:col-span-8 space-y-8">
          
          <section className="bg-surface-container-lowest rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.06)] p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Match Fundamentals</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface-variant">Sport Category</label>
                <input 
                  type="text" 
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  placeholder="e.g. Tennis (Singles)"
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 font-body-md focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface-variant">Competitive Level</label>
                <div className="flex gap-2">
                  {['Novice', 'Amateur', 'Elite'].map((lvl) => (
                    <button 
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`flex-1 py-4 rounded-xl font-label-caps text-[12px] uppercase tracking-widest transition-all ${
                        level === lvl 
                          ? 'bg-secondary-container text-secondary border-2 border-secondary' 
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border-2 border-transparent'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface-variant">Schedule Date</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 font-body-md focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface-variant">Start Time</label>
                <input 
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-xl p-4 font-body-md focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.06)] p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Participant Dynamics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface-variant">Player Count</label>
                  <span className="font-bold text-secondary">{maxPlayers} Players</span>
                </div>
                <input 
                  type="range"
                  min="2"
                  max="16"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                  className="w-full accent-secondary h-2 bg-surface-container-low rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-4">
                <label className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface-variant">Privacy Setting</label>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">lock</span>
                    <div>
                      <p className="font-bold text-sm">Private Match</p>
                      <p className="text-xs text-on-surface-variant">Invite-only access</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.06)] p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Etiquette & Standards</h3>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface-variant">House Rules</label>
              <textarea 
                className="w-full bg-surface-container-low border-none rounded-xl p-4 font-body-md text-on-surface resize-none focus:ring-2 focus:ring-secondary"
                rows="4"
                value={houseRules}
                onChange={(e) => setHouseRules(e.target.value)}
                placeholder="Specify any local court etiquette or membership requirements..."
              ></textarea>
            </div>
          </section>

        </div>

        {/* Right Column: Sticky Summary */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-primary-container p-8 rounded-xl shadow-lg sticky top-24">
            <h4 className="font-label-caps text-[12px] uppercase tracking-widest text-secondary mb-6">Live Match Draft</h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">sports_tennis</span>
                </div>
                <div>
                  <p className="text-white font-bold">{sport}</p>
                  <p className="text-xs text-white/70">{level} Division</p>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Date</span>
                  <span className="text-white">{date || 'TBD'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60">Players</span>
                  <span className="text-white">{maxPlayers} Spots</span>
                </div>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-4 bg-secondary text-secondary-container rounded-xl font-label-caps text-[12px] uppercase tracking-widest hover:bg-secondary/90 shadow-lg transition-all"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Match'}
              </button>
            </div>
          </div>
        </div>

      </form>
    </main>
  );
}
