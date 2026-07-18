import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEventReviewPublishPage() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePublish = () => {
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate('/events/success'); // or navigate to dashboard
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-[calc(100vh-73px)] relative overflow-x-hidden flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <header className="mb-12">
          <span className="font-label-caps text-label-caps text-secondary mb-2 block tracking-widest">Step 3 of 3</span>
          <h1 className="font-display-lg text-display-lg text-primary">Review & Publish</h1>
          <p className="text-on-surface-variant text-body-lg max-w-2xl mt-4">One final look before your event goes live to the Localite community. Ensure every detail reflects the premium experience you're curating.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Preview Mode */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-outline-variant/10">
              <div className="relative h-[400px] w-full bg-surface-container-high">
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-primary px-4 py-1 rounded-full font-label-caps text-label-caps shadow-sm">Preview Mode</span>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h2 className="font-display-lg text-4xl text-primary font-bold">Midnight Garden Soiree</h2>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-on-surface-variant">share</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6 text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    <span className="font-body-md text-body-md">Oct 24, 2024</span>
                  </div>
                  <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                    <span className="font-body-md text-body-md">The Glass Conservatory</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-body-lg text-on-surface-variant leading-relaxed">
                    Join us for an evening of ethereal elegance in the heart of the city's most prestigious botanical sanctuary. The Midnight Garden Soiree is a curated gathering for those who appreciate the intersection of nature and luxury. Enjoy artisanal cocktails, live string performances, and a bespoke tasting menu under the canopy of century-old ferns and twinkling installations.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-outline-variant/20">
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 uppercase">Experience Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-surface-container-low rounded-lg">
                      <span className="material-symbols-outlined text-secondary block mb-2">liquor</span>
                      <p className="font-body-md text-body-md font-bold text-primary">Premium Bar</p>
                      <p className="text-sm text-on-surface-variant">Bespoke botanical cocktails</p>
                    </div>
                    <div className="p-4 bg-surface-container-low rounded-lg">
                      <span className="material-symbols-outlined text-secondary block mb-2">music_note</span>
                      <p className="font-body-md text-body-md font-bold text-primary">Live Strings</p>
                      <p className="text-sm text-on-surface-variant">Contemporary arrangements</p>
                    </div>
                    <div className="p-4 bg-surface-container-low rounded-lg">
                      <span className="material-symbols-outlined text-secondary block mb-2">workspace_premium</span>
                      <p className="font-body-md text-body-md font-bold text-primary">Exclusive Access</p>
                      <p className="text-sm text-on-surface-variant">Private conservatory tour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary & Controls */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/10">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Event Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Date & Time</span>
                  <span className="font-body-md text-body-md text-primary text-right">Oct 24, 2024<br/>8:00 PM - 1:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Location</span>
                  <span className="font-body-md text-body-md text-primary">The Glass Conservatory</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Admission</span>
                  <span className="font-body-md text-body-md text-primary">$150 / Person</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">Capacity</span>
                  <span className="font-body-md text-body-md text-primary">80 Guests</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full py-3 px-4 border border-secondary text-secondary font-label-caps text-label-caps rounded-lg hover:bg-secondary/5 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Edit Details
                </button>
              </div>
            </div>

            {/* Venue Map Card */}
            <div className="bg-white rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden group cursor-pointer">
              <div className="h-40 bg-surface-container relative">
                <div className="absolute inset-0 flex items-center justify-center bg-outline-variant/20">
                  <div className="bg-white p-2 rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-body-md text-body-md font-bold text-primary">Venue Map</p>
                  <p className="text-xs text-on-surface-variant">Botanic Dr, City South</p>
                </div>
                <span className="material-symbols-outlined text-outline-variant">open_in_new</span>
              </div>
            </div>

            {/* Guidelines Card */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20">
              <div className="flex gap-3">
                <div className="pt-1">
                  <input 
                    type="checkbox" 
                    id="guidelines" 
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                </div>
                <label htmlFor="guidelines" className="text-sm text-on-surface-variant leading-tight cursor-pointer">
                  I confirm this event adheres to the <a href="#" className="text-primary underline">Localite Community Guidelines</a> and maintains our standard of respectful, curated local connection.
                </label>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">verified_user</span>
                <div>
                  <p className="font-body-md text-body-md font-bold">Ready for Review</p>
                  <p className="text-xs opacity-80">Our curators will verify your event within 2 hours of publishing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Actions Sticky */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-outline-variant/20 p-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-6">
          <button className="px-8 py-3 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors">
            Save Draft
          </button>
          <button 
            onClick={handlePublish}
            disabled={!termsAccepted}
            className={`px-10 py-4 font-label-caps text-label-caps rounded-full shadow-lg transition-all flex items-center gap-3 ${termsAccepted ? 'bg-primary text-white hover:shadow-xl hover:opacity-90' : 'bg-outline-variant text-white cursor-not-allowed opacity-70'}`}
          >
            Publish Event
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-surface/90 backdrop-blur-md">
          <div className="bg-white rounded-xl shadow-2xl p-12 max-w-md w-full text-center border border-outline-variant/10">
            <div className="w-24 h-24 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[#785a1a] text-5xl">verified</span>
            </div>
            <h2 className="font-headline-md text-3xl text-primary mb-4 font-bold">Event Published</h2>
            <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
              Your event is now live and visible to the Localite community. Invitations are being sent to relevant members.
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={closeSuccess}
                className="w-full py-4 bg-primary text-white rounded-lg font-label-caps tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                View Public Page
              </button>
              <button 
                onClick={closeSuccess}
                className="w-full py-4 border border-outline text-on-surface-variant rounded-lg font-label-caps tracking-widest uppercase hover:bg-surface-container-low transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
