import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/api';
import { auth } from '../../firebase';
import {
  ArrowLeft,
  ArrowRight,
  X,
  Sparkle,
  CalendarBlank,
  MapPin,
  Users,
  ShieldCheck,
  Image as ImageIcon,
} from '@phosphor-icons/react';

export default function CreateEventWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    eventType: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
    cost: '',
    rules: '',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert('Please login to create an event');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        maxAttendees: parseInt(formData.maxAttendees) || 0,
        cost: parseFloat(formData.cost) || 0,
      };

      const newEvent = await createEvent(payload);
      navigate(`/events/${newEvent.id}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create event. Please check the logs.');
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Foundation' },
    { num: 2, label: 'Time & Place' },
    { num: 3, label: 'Capacity & Rules' },
    { num: 4, label: 'Review & Launch' },
  ];

  const renderFoundation = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider font-mono text-[var(--fg-muted)] mb-1">Step 01 / 04</p>
        <h2 className="text-2xl font-serif text-[var(--fg)]">Gathering Foundation</h2>
        <p className="text-sm text-[var(--fg-muted)] mt-1">
          Define the core concept, atmosphere, and intended community.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
            Event Name
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Saturday Rooftop Film Club"
            className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
            >
              <option value="">Select Category</option>
              <option value="Epicurean">Epicurean & Dining</option>
              <option value="Culture">Arts & Culture</option>
              <option value="Wellness">Wellness & Sports</option>
              <option value="Social Hub">Social & Networking</option>
              <option value="Music">Music & Performance</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
              Audience Access
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
            >
              <option value="">Select Access Level</option>
              <option value="Public">Public (Open to All)</option>
              <option value="Members Only">Members Only</option>
              <option value="Invite Only">Invite Only</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
            Description & Narrative
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-4 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors resize-none"
            placeholder="What should guests expect? Share the intention, vibe, and what to bring..."
          />
        </div>
      </div>
    </div>
  );

  const renderDateTimeLocation = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider font-mono text-[var(--fg-muted)] mb-1">Step 02 / 04</p>
        <h2 className="text-2xl font-serif text-[var(--fg)]">Time & Location</h2>
        <p className="text-sm text-[var(--fg-muted)] mt-1">
          Specify when and where your guests will assemble.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
            Date & Time
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
            Venue or Address
          </label>
          <div className="relative">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Botanic Pavilion, North Gardens"
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
            Cover Image URL
          </label>
          <div className="relative">
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>
          {formData.imageUrl && (
            <div className="mt-3 h-32 rounded-card overflow-hidden border border-[var(--border)]">
              <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCapacityRules = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider font-mono text-[var(--fg-muted)] mb-1">Step 03 / 04</p>
        <h2 className="text-2xl font-serif text-[var(--fg)]">Capacity & Guidelines</h2>
        <p className="text-sm text-[var(--fg-muted)] mt-1">
          Set attendee limits, pricing, and etiquette for attendees.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
              Max Attendees
            </label>
            <input
              type="number"
              name="maxAttendees"
              value={formData.maxAttendees}
              onChange={handleChange}
              placeholder="e.g. 24 (0 for unlimited)"
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
              Contribution (USD)
            </label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="0 for free"
              className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] mb-1.5">
            Community Guidelines & Etiquette
          </label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            rows="4"
            className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-4 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors resize-none"
            placeholder="e.g. Punctuality appreciated. BYOB welcome. Respect venue noise limits after 10 PM."
          />
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider font-mono text-[var(--fg-muted)] mb-1">Step 04 / 04</p>
        <h2 className="text-2xl font-serif text-[var(--fg)]">Review & Confirm</h2>
        <p className="text-sm text-[var(--fg-muted)] mt-1">
          Review the details before presenting your gathering to the community.
        </p>
      </div>

      <div className="rounded-card border border-[var(--border)] overflow-hidden bg-white">
        <div className="h-48 w-full bg-[var(--bg-subtle)] relative overflow-hidden">
          {formData.imageUrl ? (
            <img src={formData.imageUrl} alt={formData.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--fg-muted)]">
              <ImageIcon size={32} />
            </div>
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-[var(--border)] px-2.5 py-1 rounded-card text-xs font-mono text-[var(--fg)]">
            {formData.cost > 0 ? `$${formData.cost}` : 'Free'}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-1">
              <span>{formData.category || 'General'}</span>
              <span>•</span>
              <span>{formData.eventType || 'Public'}</span>
            </div>
            <h3 className="text-xl font-serif text-[var(--fg)]">{formData.title || 'Untitled Gathering'}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-y border-[var(--border)] text-xs">
            <div className="flex items-center gap-2 text-[var(--fg-muted)]">
              <CalendarBlank size={16} className="text-[var(--fg)] shrink-0" />
              <span className="truncate">
                {formData.date ? new Date(formData.date).toLocaleString() : 'Date TBD'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[var(--fg-muted)]">
              <MapPin size={16} className="text-[var(--fg)] shrink-0" />
              <span className="truncate">{formData.location || 'Location TBD'}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--fg-muted)]">
              <Users size={16} className="text-[var(--fg)] shrink-0" />
              <span>
                {formData.maxAttendees > 0 ? `Max ${formData.maxAttendees} attendees` : 'Open capacity'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[var(--fg-muted)]">
              <ShieldCheck size={16} className="text-[var(--fg)] shrink-0" />
              <span>Verified Host Only</span>
            </div>
          </div>

          <p className="text-sm text-[var(--fg-muted)] leading-relaxed whitespace-pre-line">
            {formData.description || 'No description provided.'}
          </p>

          {formData.rules && (
            <div className="p-3 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] text-xs text-[var(--fg-muted)]">
              <span className="font-mono uppercase text-[var(--fg)] block mb-1">House Rules</span>
              {formData.rules}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-subtle)] pb-24">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--border)] px-4 sm:px-8 py-3.5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1.5 rounded-card text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <X size={20} />
            </button>
            <h1 className="text-base font-serif text-[var(--fg)]">Host a Gathering</h1>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2">
            {steps.map((s) => (
              <div
                key={s.num}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s.num === step
                    ? 'w-6 bg-[var(--accent)]'
                    : s.num < step
                      ? 'w-2 bg-[var(--fg)]'
                      : 'w-2 bg-[var(--border)]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-card border border-[var(--border)] p-6 sm:p-8">
          {step === 1 && renderFoundation()}
          {step === 2 && renderDateTimeLocation()}
          {step === 3 && renderCapacityRules()}
          {step === 4 && renderReview()}
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[var(--border)] py-3.5 px-4 sm:px-8 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors ${
              step === 1 ? 'invisible pointer-events-none' : ''
            }`}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-card bg-[var(--fg)] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors disabled:opacity-50"
            >
              <Sparkle size={16} weight="fill" />
              {isSubmitting ? 'Publishing...' : 'Publish Gathering'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
