import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const IDVerificationPage = () => {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      setSelectedFile(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-stack-lg px-container-margin">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden ethereal-shadow min-h-[600px]">
          {/* Left Side: Instructions */}
          <div className="p-stack-lg bg-surface flex flex-col justify-center border-r border-outline-variant">
            <div className="mb-stack-md">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Step 02/03</span>
              <h1 className="font-display-lg text-display-lg text-primary mt-2">Identity Verification</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-stack-sm leading-relaxed">
                To maintain the integrity of our community, please provide a high-fidelity image of your government-issued ID.
              </p>
            </div>

            <div className="space-y-stack-md">
              <div className="flex gap-gutter">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">light_mode</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary">Pristine Lighting</h3>
                  <p className="text-body-md text-on-surface-variant">Ensure you are in a brightly lit environment. Avoid direct glare or harsh shadows across the document.</p>
                </div>
              </div>

              <div className="flex gap-gutter">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">center_focus_strong</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary">Clarity & Focus</h3>
                  <p className="text-body-md text-on-surface-variant">All text and your portrait must be perfectly legible. Position the ID within the frame without cutting off edges.</p>
                </div>
              </div>

              <div className="flex gap-gutter">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">verified_user</span>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-primary">Secure Processing</h3>
                  <p className="text-body-md text-on-surface-variant">Your data is encrypted and handled with the highest level of privacy as per our Modern Nobility standards.</p>
                </div>
              </div>
            </div>

            <div className="mt-stack-lg pt-stack-md border-t border-outline-variant">
              <p className="text-label-caps font-label-caps text-on-surface-variant">Accepted Documents: Passport, Driver's License, National ID Card.</p>
            </div>
          </div>

          {/* Right Side: Upload Area */}
          <div className="p-stack-lg bg-surface-container-low flex flex-col items-center justify-center">
            <div
              className={`w-full aspect-[4/3] max-w-md border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-stack-lg transition-all duration-300 cursor-pointer group relative overflow-hidden bg-white shadow-sm ${
                dragOver ? 'border-secondary bg-secondary/5' : 'border-outline-variant hover:border-secondary hover:bg-surface-container-highest'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-secondary text-5xl mb-stack-sm">cloud_upload</span>
                <h2 className="font-headline-sm text-headline-sm text-primary">Secure Upload</h2>
                {selectedFile ? (
                  <p className="text-body-md text-secondary mt-2 font-bold">{selectedFile.name}</p>
                ) : (
                  <p className="text-body-md text-on-surface-variant mt-2">
                    Drag and drop your file or <span className="text-secondary font-bold underline cursor-pointer">browse</span>
                  </p>
                )}
                <p className="text-label-caps font-label-caps text-outline mt-4">JPG, PNG or PDF (Max 10MB)</p>
              </div>
              <input
                ref={fileInputRef}
                accept="image/*,.pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                onChange={handleFileSelect}
              />
            </div>

            <div className="w-full max-w-md mt-stack-md space-y-gutter">
              <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-md">
                Proceed to Scan
              </button>
              <button className="w-full border border-secondary text-secondary py-4 rounded-lg font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary/5 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                Use Camera
              </button>
            </div>

            <div className="mt-stack-lg flex items-center gap-2 text-outline">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              <span className="text-label-caps font-label-caps">End-to-End Encrypted</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-stack-lg bg-surface-container border-t border-outline-variant flex flex-col md:flex-row justify-between items-center px-container-margin py-stack-lg gap-gutter">
        <div className="flex flex-col items-center md:items-start gap-unit">
          <span className="font-display-lg-mobile text-display-lg-mobile text-primary">Localite</span>
          <p className="text-label-caps font-label-caps text-on-surface-variant">© 2024 Localite. Modern Nobility.</p>
        </div>
        <div className="flex gap-stack-md">
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary underline decoration-secondary transition-all duration-300" href="/privacy">Privacy Policy</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary underline decoration-secondary transition-all duration-300" href="/terms">Terms of Service</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary underline decoration-secondary transition-all duration-300" href="#">Press Kit</a>
          <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary underline decoration-secondary transition-all duration-300" href="/contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default IDVerificationPage;
