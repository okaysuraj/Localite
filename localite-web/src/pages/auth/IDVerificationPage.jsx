import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadSimple, Sun, Eye, ShieldCheck, Check, ArrowLeft, ArrowRight } from '@phosphor-icons/react';

const IDVerificationPage = () => {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert('Document submitted for review.');
      navigate('/settings/verification');
    }, 1200);
  };

  return (
    <div className="bg-bg min-h-screen py-12 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white border border-border rounded-card overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Guidelines */}
        <div className="p-8 sm:p-10 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Step 01 of 02
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-fg tracking-tight">
                Government ID
              </h1>
              <p className="text-xs text-fg-muted mt-2 leading-relaxed">
                Upload a clear scan or photo of your government-issued identification document.
              </p>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-subtle text-accent flex items-center justify-center shrink-0">
                  <Sun size={15} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-fg">Good Lighting</h3>
                  <p className="text-fg-muted mt-0.5 leading-relaxed">
                    Ensure the document is well-lit without glare, reflections, or harsh shadows.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-subtle text-accent flex items-center justify-center shrink-0">
                  <Eye size={15} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-fg">Sharp & Legible</h3>
                  <p className="text-fg-muted mt-0.5 leading-relaxed">
                    All text fields, birth date, and portrait must be clearly readable.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-bg-subtle text-accent flex items-center justify-center shrink-0">
                  <ShieldCheck size={15} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-fg">Encrypted Storage</h3>
                  <p className="text-fg-muted mt-0.5 leading-relaxed">
                    Identity files are encrypted at rest and never shared with other users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border text-[11px] font-mono text-fg-muted">
            Accepted: Passport, Driver's License, National ID Card.
          </div>
        </div>

        {/* Right Side: Upload Zone */}
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-bg-subtle/40">
          <div
            className={`w-full border border-dashed rounded-card flex flex-col items-center justify-center p-8 transition-colors cursor-pointer bg-white ${
              dragOver ? 'border-accent bg-accent-subtle/30' : 'border-border hover:border-accent/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileSelect}
            />

            {selectedFile ? (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-accent-subtle text-accent flex items-center justify-center mx-auto">
                  <Check size={24} weight="bold" />
                </div>
                <p className="text-xs font-mono font-medium text-fg truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] font-mono text-fg-muted">Click to replace document</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-bg-subtle text-fg-muted flex items-center justify-center mx-auto">
                  <UploadSimple size={24} />
                </div>
                <h3 className="text-sm font-display font-medium text-fg">Upload Document</h3>
                <p className="text-xs text-fg-muted">Drag and drop your file here, or click to browse.</p>
                <span className="inline-block text-[10px] font-mono text-fg-faint">
                  JPG, PNG, PDF up to 10MB
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
            <button
              onClick={() => navigate('/settings/verification')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn border border-border text-xs font-mono text-fg-muted hover:text-fg hover:bg-white transition-colors"
            >
              <ArrowLeft size={13} /> Back
            </button>

            <button
              onClick={handleSubmit}
              disabled={!selectedFile || submitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-btn bg-accent text-white text-xs font-mono tracking-wide hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              {submitting ? 'Verifying...' : 'Submit ID'} <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDVerificationPage;
