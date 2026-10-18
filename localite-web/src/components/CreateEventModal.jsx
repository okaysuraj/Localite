import React, { useState } from 'react';
import {
  X,
  CalendarBlank,
  MapPin,
  Image as ImageIcon,
  Users,
  ArrowsClockwise,
} from '@phosphor-icons/react';
import { createEvent } from '../services/api';

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
    imageUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
    recurrence: 'NONE',
    recurrenceEndDate: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        cost: parseFloat(formData.cost) || 0,
        maxAttendees: parseInt(formData.maxAttendees, 10) || 50,
        attendees: 0,
      };

      await createEvent(payload);
      onEventCreated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white border border-border rounded-card p-6 sm:p-8 shadow-xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b border-border pb-4">
          <div>
            <h3 className="font-display font-semibold text-lg text-fg tracking-tight">
              Create Event
            </h3>
            <p className="text-xs text-fg-muted mt-0.5">
              Publish an activity for your community.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-btn hover:bg-bg-subtle text-fg-muted hover:text-fg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g. Saturday Morning Football"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Provide details about the gathering..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
              >
                <option value="Sports">Sports</option>
                <option value="Social">Social</option>
                <option value="Fitness">Fitness</option>
                <option value="Networking">Networking</option>
              </select>
            </div>
            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                Visibility
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                Skill Level
              </label>
              <select
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                Price ($)
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                Rules / Notes
              </label>
              <input
                type="text"
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
                placeholder="Optional rules"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5 flex items-center gap-1">
                <Users size={13} /> Max Capacity
              </label>
              <input
                type="number"
                name="maxAttendees"
                required
                value={formData.maxAttendees}
                onChange={handleChange}
                min="1"
                className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-fg-muted mb-1.5 flex items-center gap-1">
              <CalendarBlank size={13} /> Date & Time
            </label>
            <input
              type="datetime-local"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-fg-muted mb-1.5 flex items-center gap-1">
                <ArrowsClockwise size={13} /> Recurrence
              </label>
              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
              >
                <option value="NONE">None</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>

            {formData.recurrence !== 'NONE' && (
              <div>
                <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="recurrenceEndDate"
                  required={formData.recurrence !== 'NONE'}
                  value={formData.recurrenceEndDate}
                  onChange={handleChange}
                  className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block uppercase tracking-wider text-fg-muted mb-1.5 flex items-center gap-1">
              <MapPin size={13} /> Location / Address
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g. Indiranagar Club Ground"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-fg-muted mb-1.5 flex items-center gap-1">
              <ImageIcon size={13} /> Cover Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full bg-bg-subtle border border-border text-fg rounded-btn p-2.5 font-sans text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2.5 border-t border-border mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border text-fg-muted hover:text-fg hover:bg-bg-subtle rounded-btn tracking-wide transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-accent text-white rounded-btn tracking-wide hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
