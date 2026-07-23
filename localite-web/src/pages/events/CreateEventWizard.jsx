import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/api';
import { auth } from '../../firebase';

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
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000'
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
      alert("Please login to create an event");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Clean up payload
      const payload = {
        ...formData,
        maxAttendees: parseInt(formData.maxAttendees) || 0,
        cost: parseFloat(formData.cost) || 0,
        // Let backend set host to current user
      };
      
      const newEvent = await createEvent(payload);
      navigate(`/event/${newEvent.id}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create event. Please check the logs.');
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center gap-2 text-secondary mb-2">
      <span className="font-label-caps text-label-caps uppercase tracking-widest">Step 0{step} / 04</span>
      <div className="h-[1px] w-12 bg-secondary-container"></div>
    </div>
  );

  const renderFoundation = () => (
    <div className="space-y-stack-lg animate-fade-in">
      {renderStepIndicator()}
      <h1 className="font-headline-md text-headline-md text-primary mb-2">The Foundation</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">Begin your journey by defining the core identity of your gathering.</p>

      <div className="space-y-4">
        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Event Name</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange}
          placeholder="e.g. Midnight Soirée at the Gallery" 
          className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div className="space-y-4">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary">
            <option value="">Select a Sphere</option>
            <option value="Epicurean">Epicurean</option>
            <option value="Culture">Culture</option>
            <option value="Wellness">Wellness</option>
            <option value="Social Hub">Social Hub</option>
          </select>
        </div>
        <div className="space-y-4">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Intended Audience</label>
          <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary">
            <option value="">Select a Group</option>
            <option value="Public">Public (Open Community)</option>
            <option value="Members Only">Members Only</option>
            <option value="Invite Only">Invite Only</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">The Narrative (Description)</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange}
          rows="4" 
          className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary resize-none"
          placeholder="Describe the atmosphere..."
        />
      </div>
    </div>
  );

  const renderDateTimeLocation = () => (
    <div className="space-y-stack-lg animate-fade-in">
      {renderStepIndicator()}
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Time & Place</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">When and where will this experience unfold?</p>

      <div className="space-y-4">
        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Date & Time</label>
        <input 
          type="datetime-local" 
          name="date" 
          value={formData.date} 
          onChange={handleChange}
          className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary"
        />
      </div>

      <div className="space-y-4">
        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Location</label>
        <input 
          type="text" 
          name="location" 
          value={formData.location} 
          onChange={handleChange}
          placeholder="e.g. The Glass Conservatory, Botanic Gardens" 
          className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary"
        />
      </div>
      
      <div className="space-y-4">
        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Cover Image URL</label>
        <input 
          type="text" 
          name="imageUrl" 
          value={formData.imageUrl} 
          onChange={handleChange}
          placeholder="https://..." 
          className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary"
        />
      </div>
    </div>
  );

  const renderCapacityRules = () => (
    <div className="space-y-stack-lg animate-fade-in">
      {renderStepIndicator()}
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Capacity & Etiquette</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">Set the boundaries for your gathering.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        <div className="space-y-4">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Max Attendees</label>
          <input 
            type="number" 
            name="maxAttendees" 
            value={formData.maxAttendees} 
            onChange={handleChange}
            placeholder="e.g. 50 (0 for unlimited)" 
            className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary"
          />
        </div>
        <div className="space-y-4">
          <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Cost (USD)</label>
          <input 
            type="number" 
            name="cost" 
            value={formData.cost} 
            onChange={handleChange}
            placeholder="e.g. 150 (0 for free)" 
            className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">House Rules</label>
        <textarea 
          name="rules" 
          value={formData.rules} 
          onChange={handleChange}
          rows="3" 
          className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body-md text-primary focus:ring-secondary resize-none"
          placeholder="e.g. Black tie dress code strictly enforced."
        />
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-stack-lg animate-fade-in">
      {renderStepIndicator()}
      <h1 className="font-headline-md text-headline-md text-primary mb-2">Review & Publish</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">Ensure every detail reflects the premium experience you're curating.</p>

      <div className="bg-surface-container-lowest rounded-xl shadow-lg overflow-hidden border border-outline-variant/10">
        <div className="relative h-[250px] w-full">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${formData.imageUrl})` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-6">
            <h2 className="font-display-lg text-3xl text-on-primary">{formData.title || 'Untitled Event'}</h2>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Date</span>
              <span className="font-body-md text-primary">{formData.date || 'TBD'}</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Location</span>
              <span className="font-body-md text-primary">{formData.location || 'TBD'}</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Category</span>
              <span className="font-body-md text-primary">{formData.category || 'TBD'}</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Cost</span>
              <span className="font-body-md text-primary">${formData.cost || '0'}</span>
            </div>
          </div>
          <p className="text-body-md text-on-surface-variant whitespace-pre-wrap">{formData.description || 'No description provided.'}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* TopNavBar */}
      <nav className="w-full top-0 sticky z-50 bg-surface shadow-sm">
        <div className="flex justify-between items-center px-container-margin py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-headline-md text-headline-md tracking-tighter text-primary cursor-pointer" onClick={() => navigate('/')}>Localite</span>
          </div>
          <button onClick={() => navigate('/')} className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all">close</button>
        </div>
      </nav>

      <main className="flex-grow max-w-3xl w-full mx-auto px-container-margin py-stack-lg pb-32">
        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-sm border border-outline-variant/10">
          {step === 1 && renderFoundation()}
          {step === 2 && renderDateTimeLocation()}
          {step === 3 && renderCapacityRules()}
          {step === 4 && renderReview()}
        </div>
      </main>

      {/* Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-outline-variant/20 py-4 px-6 z-50">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button 
            type="button" 
            onClick={prevStep} 
            className={`font-label-caps uppercase text-on-surface-variant hover:text-primary transition-all ${step === 1 ? 'invisible' : ''}`}
          >
            <span className="material-symbols-outlined align-middle mr-2">arrow_back</span>
            Back
          </button>
          
          {step < 4 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="px-8 py-3 rounded-lg bg-primary text-on-primary font-label-caps uppercase hover:opacity-90 shadow-lg transition-all"
            >
              Continue
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg bg-secondary text-white font-label-caps uppercase hover:bg-[#5a4313] shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Event'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
