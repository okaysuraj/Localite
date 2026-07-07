import React, { useState } from 'react';
import { X, Calendar, MapPin, Image as ImageIcon, Users, Repeat } from 'lucide-react';

const CreateEventModal = ({ onClose, onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Social',
    skillLevel: 'All',
    cost: 0,
    rules: '',
    eventType: 'Public',
    date: '',
    location: '',
    maxAttendees: 50,
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
    recurrence: 'NONE',
    recurrenceEndDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        cost: parseFloat(formData.cost) || 0,
        maxAttendees: parseInt(formData.maxAttendees, 10) || 50,
        attendees: 0
      };

      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_URL + '/events', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        onEventCreated();
      } else {
        console.error("Failed to create event");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-surface-container-low border border-surface-variant/20 rounded-2xl p-6 shadow-2xl relative animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-surface-variant/10 pb-4">
          <div>
            <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface">Initialize Event</h3>
            <p className="font-label-mono text-xs uppercase tracking-widest text-text-muted mt-1">Deploy a new protocol</p>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-on-surface transition-colors p-2 bg-surface-dark rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Operation Title</label>
            <input 
              type="text" 
              name="title" 
              required 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors" 
              placeholder="e.g. Midnight Run Club"
            />
          </div>

          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="2"
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors resize-none" 
              placeholder="What are we doing?"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors appearance-none"
              >
                <option value="Sports">Sports</option>
                <option value="Social">Social</option>
                <option value="Fitness">Fitness</option>
                <option value="Networking">Networking</option>
              </select>
            </div>
            <div>
              <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Event Type</label>
              <select 
                name="eventType" 
                value={formData.eventType} 
                onChange={handleChange}
                className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors appearance-none"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Skill Level</label>
              <select 
                name="skillLevel" 
                value={formData.skillLevel} 
                onChange={handleChange}
                className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors appearance-none"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Cost ($)</label>
              <input 
                type="number" 
                name="cost" 
                value={formData.cost} 
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2">Rules</label>
              <input 
                type="text" 
                name="rules" 
                value={formData.rules} 
                onChange={handleChange}
                className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors" 
                placeholder="Any rules?"
              />
            </div>
            <div>
              <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2 flex items-center gap-1"><Users size={14}/> Max Capacity</label>
              <input 
                type="number" 
                name="maxAttendees" 
                required 
                value={formData.maxAttendees} 
                onChange={handleChange} 
                min="1"
                className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors" 
              />
            </div>
          </div>

          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2 flex items-center gap-1"><Calendar size={14}/> Date & Time</label>
            <input 
              type="datetime-local" 
              name="date" 
              required 
              value={formData.date} 
              onChange={handleChange}
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2 flex items-center gap-1"><Repeat size={14}/> Recurrence</label>
              <select 
                name="recurrence" 
                value={formData.recurrence} 
                onChange={handleChange}
                className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors appearance-none"
              >
                <option value="NONE">None</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>
            
            {formData.recurrence !== 'NONE' && (
              <div>
                <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2 flex items-center gap-1"><Calendar size={14}/> End Date</label>
                <input 
                  type="datetime-local" 
                  name="recurrenceEndDate" 
                  required={formData.recurrence !== 'NONE'}
                  value={formData.recurrenceEndDate} 
                  onChange={handleChange}
                  className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors" 
                />
              </div>
            )}
          </div>

          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2 flex items-center gap-1"><MapPin size={14}/> Coordinates / Location</label>
            <input 
              type="text" 
              name="location" 
              required 
              value={formData.location} 
              onChange={handleChange}
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors" 
              placeholder="e.g. Central Park Turf 3"
            />
          </div>
          
          <div>
            <label className="block font-label-mono text-xs uppercase tracking-widest text-text-muted mb-2 flex items-center gap-1"><ImageIcon size={14}/> Intel Image URL</label>
            <input 
              type="url" 
              name="imageUrl" 
              required 
              value={formData.imageUrl} 
              onChange={handleChange}
              className="w-full bg-surface-dark border border-surface-variant/30 text-on-surface rounded-lg p-3 font-body-md focus:outline-none focus:border-lime-vibe transition-colors text-sm opacity-80" 
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-surface-variant/10">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-3 border border-surface-variant/50 text-on-surface font-label-mono text-xs uppercase tracking-widest hover:border-surface-variant hover:bg-surface-variant/10 transition-all rounded-DEFAULT"
            >
              Abort
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="px-6 py-3 bg-lime-vibe text-primary-container font-label-mono text-xs uppercase tracking-widest hover:bg-white transition-all glow-neon rounded-DEFAULT"
            >
              {loading ? 'Transmitting...' : 'Execute Protocol'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
