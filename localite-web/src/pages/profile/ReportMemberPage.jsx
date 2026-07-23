import React, { useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

export default function ReportMemberPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Inappropriate Behavior');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async () => {
    if (!confirmed) {
      alert("Please confirm the information is accurate.");
      return;
    }
    setIsSubmitting(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const payload = {
        targetType: 'USER',
        targetId: 1, // Mocked target ID for this example
        reason: selectedCategory,
        details: details
      };

      const res = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        alert("Report submitted successfully.");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Harassment',
    'Inappropriate Behavior',
    'Spam or Solicitation',
    'Misleading Identity'
  ];

  return (
    <SettingsLayout>
      <main className="max-w-4xl mx-auto py-12 px-6">
        
        {/* Close / Back Action */}
        <div 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 group cursor-pointer text-on-surface-variant hover:text-primary transition-colors w-fit"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-label-caps text-label-caps uppercase">Return to Community</span>
        </div>

        <section className="bg-surface-container-lowest rounded-xl shadow-sm p-12 border border-outline-variant/20">
          <div className="text-center mb-12">
            <h1 className="font-display-lg text-[32px] md:text-display-lg mb-4 text-primary">Report Formal Incident</h1>
            <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">
              Maintain the integrity of our curated community. Your report is handled with strict confidentiality by our Concierge Safety Team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* User Profile Card */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant px-2 uppercase tracking-widest">Member in Question</h3>
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-secondary-container">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                    alt="Julian Vane"
                  />
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">Julian Vane</h4>
                <p className="font-body-md text-on-surface-variant mb-4">Member since 2021</p>
                <div className="flex gap-2">
                  <span className="bg-surface-variant px-3 py-1 rounded-full font-label-caps text-[10px] text-on-surface uppercase tracking-widest">Verified Identity</span>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl border border-secondary/20 bg-secondary/5">
                <div className="flex gap-2 items-start text-secondary">
                  <span className="material-symbols-outlined text-[18px]">security</span>
                  <span className="font-label-caps text-label-caps uppercase tracking-widest">Privacy Commitment</span>
                </div>
                <p className="mt-2 text-[13px] text-on-surface-variant font-body-md leading-relaxed">
                  Your identity will not be shared with the member being reported. All investigations are conducted privately.
                </p>
              </div>
            </div>

            {/* Reporting Form Content */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Category Selection */}
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-4 block uppercase tracking-widest">Nature of Incident</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button 
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all bg-surface-bright group ${
                        selectedCategory === category 
                          ? 'border-2 border-secondary bg-secondary/5' 
                          : 'border border-outline-variant hover:border-secondary'
                      }`}
                    >
                      <span className={`font-body-md text-primary ${selectedCategory === category ? 'font-bold' : ''}`}>
                        {category}
                      </span>
                      <span 
                        className={`material-symbols-outlined ${selectedCategory === category ? 'text-secondary' : 'text-outline group-hover:text-secondary'}`}
                        style={{ fontVariationSettings: selectedCategory === category ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {selectedCategory === category ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Details Area */}
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-4 block uppercase tracking-widest">Incident Narrative</label>
                <textarea 
                  className="w-full p-4 rounded-lg bg-surface-container-low border-none font-body-md placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary focus:bg-white transition-colors" 
                  placeholder="Please provide a detailed account of the events, including dates and specific interactions..." 
                  rows="5"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                ></textarea>
              </div>

              {/* Evidence Upload */}
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-4 block uppercase tracking-widest">Supporting Documentation</label>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface-bright hover:bg-surface-variant/20 transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-secondary mb-2 transition-colors">cloud_upload</span>
                  <p className="font-body-md text-primary mb-1">Drag & drop evidence here</p>
                  <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Screenshots, PDFs, or photos (Max 10MB)</p>
                </div>
              </div>

              {/* Submission Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-6">
                <div className="flex items-center gap-3">
                  <input 
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer" 
                    id="confirm" 
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                  />
                  <label className="font-body-md text-[14px] text-on-surface-variant cursor-pointer select-none" htmlFor="confirm">
                    I certify this information is accurate.
                  </label>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                  <button 
                    onClick={() => navigate(-1)}
                    className="flex-1 sm:flex-none px-8 py-3 font-label-caps text-label-caps text-secondary border border-secondary rounded-lg hover:bg-secondary/5 transition-all uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-10 py-3 font-label-caps text-label-caps bg-primary text-white rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Community Standards Footer */}
        <footer className="mt-12 border-t border-outline-variant/30 pt-8 flex flex-col items-center">
          <div className="flex gap-8 mb-6">
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors" href="#">Community Guidelines</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors" href="#">Safety Protocol</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors" href="#">Data Protection</a>
          </div>
          <p className="font-label-caps text-[10px] text-on-surface-variant opacity-50 tracking-widest uppercase">Member Security Enforcement • 2024</p>
        </footer>
      </main>
    </SettingsLayout>
  );
}
