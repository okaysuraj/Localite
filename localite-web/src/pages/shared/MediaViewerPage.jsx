import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShareNetwork, DownloadSimple, CaretLeft, CaretRight } from '@phosphor-icons/react';

export default function MediaViewerPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542314831-c6a4d14272de?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=1200',
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-[#111315] text-[#EDECE8] min-h-screen flex flex-col font-sans select-none relative">
      {/* Top Header */}
      <header className="relative z-30 flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold tracking-tight text-white">Event Gallery</span>
          <span className="text-white/30">•</span>
          <span className="text-xs text-white/60 font-mono">
            {activeIndex + 1} of {images.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Image link copied to clipboard.')}
            className="p-2 rounded-card border border-white/15 hover:bg-white/10 text-white transition-colors"
            title="Share"
          >
            <ShareNetwork size={16} />
          </button>
          <button
            onClick={() => alert('Downloading original media file...')}
            className="p-2 rounded-card border border-white/15 hover:bg-white/10 text-white transition-colors"
            title="Download"
          >
            <DownloadSimple size={16} />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-card bg-white text-[#111315] hover:bg-white/90 transition-colors ml-2"
            title="Close viewer"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* Main Canvas Viewport */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-6xl mx-auto w-full">
        <div className="relative w-full aspect-[16/9] max-h-[65vh] rounded-card overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center group shadow-2xl">
          <img src={images[activeIndex]} alt="Event view" className="w-full h-full object-contain" />

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/10"
          >
            <CaretLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/10"
          >
            <CaretRight size={20} />
          </button>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-sm font-semibold text-white">Autumn Soirée & Tennis Exhibition</h2>
          <p className="text-xs text-white/50 mt-0.5">Royal Court Gardens • Verified Member Gallery</p>
        </div>
      </main>

      {/* Filmstrip Bar */}
      <footer className="relative z-20 border-t border-white/10 p-4 bg-[#111315]/80 backdrop-blur-md">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-3 overflow-x-auto">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-20 h-14 rounded-card overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${
                activeIndex === idx
                  ? 'border-emerald-500 scale-105 shadow-md'
                  : 'border-white/20 opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt="thumb" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
