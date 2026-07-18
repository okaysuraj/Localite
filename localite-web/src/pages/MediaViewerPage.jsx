import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MediaViewerPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0a0a] text-[#fbf9f8] min-h-screen overflow-hidden flex flex-col font-body-md">
      
      {/* Cinematic Backdrop (Full Bleed) */}
      <div className="fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center brightness-[0.4] scale-105 blur-sm transition-all duration-1000" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_5Mnpll2b0BB_cu6RqDkjTRsjDce8befJTWIVSDjUh_HhSbadRsfHII3mX4CxxeIlGB1CGYrZFulcU8TfuJfz2CrZxvJ1MM72s-_okzNoiBHh697AmKAcfXO9J_sL5NKsO9SkEZcoIMNCASlS2F3QHpxqTEuxaXcHK-3Cg1G5V_qF1hTy7CYRnOWJIZPdc3RyWunG2dMJ5r7DjZmO9tjKune8vuzg6ZiMQL4e0h4RMgERiWL3wwJqgg')" }}
        ></div>
      </div>

      {/* Main Navigation / Top Bar */}
      <header className="relative z-50 flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="font-headline-sm text-2xl font-bold text-white tracking-tight">Gather</span>
          <div className="h-6 w-[1px] bg-white opacity-30 mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e9c176]">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtSdUdKIKS4Yc1SzkNBfM3RAD1-AT0x592gjYra6MkxZqLWmMbOPeaZiZI7icwXVePTjxWPuQ-kbkDYgenUaGOWowNXSV_MdVn8gcuCvjZkm9HhPCYYH8Cyb1WhTw1eLDGGysaHXsVZFuUEJM8P3Q3lyqAktNFia7Ize-dcOgR8aYuup9IkJa-OSpWM_50zQsVf4QWgRsONsLKZeh52oIwPvyaOv7Ei3J0K46V8h0ZDvpRybeRyGAWKA" alt="Curator" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-[#e9c176] uppercase tracking-widest">Curated By</span>
              <span className="font-body-md text-sm font-medium text-white">Julian Thorne</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="bg-white/5 backdrop-blur-md border border-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all active:scale-90" title="Share">
            <span className="material-symbols-outlined text-white">share</span>
          </button>
          <button className="bg-white/5 backdrop-blur-md border border-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all active:scale-90" title="Download">
            <span className="material-symbols-outlined text-white">download</span>
          </button>
          <button 
            className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-black/50 ml-4" 
            title="Close"
            onClick={() => navigate('/dashboard')}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </header>

      {/* Content Canvas */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-6">
        
        {/* Large Scale Focal Image */}
        <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] group">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] ease-linear" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkg6vtipihD6rUYzRxKKoAopmoD2jRzUw5uuMX1iwAb7MBUvcTGvxhLLbTJ6KHK33aTigISsWhtonscA9vg4ftnbxy-f9JqREfZsMUqUu7VLXGEsSE53lYDe8Q-ZcgVdDKFpWCrZx5nCUBCGfAfHuX1Ztsz_s0aRUZuVSHoiQYXLWvI5tvFZIyotMBrnCTELx8QOoxSd7AdoX8Am2-LLxvswlpCiRv9-ftpqOZ-VkiTcSj58YcEQDCUw" 
            alt="Main Photo"
          />
          {/* Contextual Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between px-8">
            <button className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        {/* Typography Branding */}
        <div className="mt-6 text-center max-w-2xl">
          <h1 className="font-display-lg text-5xl font-bold text-white mb-2">Moments from the Soiree</h1>
          <p className="font-body-md text-[#c5c6cd] italic opacity-80">An evening of shared stories, rare vintages, and the quiet elegance of midnight.</p>
        </div>
        
      </main>

      {/* Filmstrip & Footer Controls */}
      <footer className="relative z-20 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Horizontal Filmstrip */}
          <div className="flex items-end gap-4 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden">
            <div className="flex-shrink-0 cursor-pointer w-48 h-32 rounded-lg border-2 border-[#e9c176] overflow-hidden shadow-xl transition-transform hover:-translate-y-2">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0ITx8Bx04GLxU-vgKhfX4zSuKWjkgoZUxVpD5vXdWch0UBnLW8hDFWryo6J0DuLmOPH1WoMiX1_Y75skS1jNbNI5K7FvDCXzzKkLxFYTNrhgofnALa01NVXWuGf38kyEPc4xPBOLn_YIqqXbvCWogfluw-UuQ48crXZcFOKFx8ASIE1QGgJjrhFyT_R1aEYUH1ZB5bX7fhkwY0xWNaXxx5iw5f3U41fKxL5QyrocEggWCw2dPrGr-iA" alt="Thumbnail" />
            </div>
            <div className="flex-shrink-0 cursor-pointer w-40 h-28 rounded-lg border border-white/10 overflow-hidden opacity-60 hover:opacity-100 transition-all hover:-translate-y-2">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbB8b-LmWxsTd0RAaTJsW13OcT3J2pZLg1nirTpqolh1yuU2K5pmH_LwGWZ4s_ycstOf3QReew5M_4hAsYI4Wq3hAIwXfrnWPp1s5snXaE9rGCzKVofm7UUqmT0qC0CKbzClcVa7pFFSYcqyCmpOh2AkDkC7F582ztA2q_0DTl1AjSvDMa7tLkdrtvYgtsYXNd3JB3yI1OJ7GU9NAFTbwY5-jM7xpDsjokvgZ1_GQ9yYC67zqLH3yMDw" alt="Thumbnail" />
            </div>
            <div className="flex-shrink-0 cursor-pointer w-40 h-28 rounded-lg border border-white/10 overflow-hidden opacity-60 hover:opacity-100 transition-all hover:-translate-y-2">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVTsGYzQvgDdBdclKcLDmyAFofSwpvhqaQO_EeClE-muw-kD6MR-kyVAcdpEzB60cCN_NLrOdWhFG75BLnbdnWsapfbN-ujYjzOICSj_1BGo1Kz_lNxAOQTfKNBD1oGgIfk8_3DIPS99kSD_eI-aQ66dqSW6pm9XsVYXpMA8k5xACPTHlE4mlWusPdteDi24_-PBM7fBgLSsQgm10NL6i2amaDAhNlPmaSbuRd2ND8FG7RvqRPZlQeJQ" alt="Thumbnail" />
            </div>
            <div className="flex-shrink-0 cursor-pointer w-40 h-28 rounded-lg border border-white/10 overflow-hidden opacity-60 hover:opacity-100 transition-all hover:-translate-y-2">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYUdoTjNDVUrZAnOJJAAYOdfsKjwvUT-blQG8YS2nSYlJELK2lCgoYYRtKj7Z_tKGuibkJjgAywZfIBX3ds-QFTMdb42nd3QKk8fGU_uk8WNlrvOj2VnxWUZxH01kPgujWRlZv1sM5xCZFOoTT3AtiVhC4J9mKcYdsDerdfzAf0zJycphLVp2x-aGv3WFlr_qTCqSAlR69EjDYfVldMjNtOoeP1bW02OH1YtOlwymbwF2ZMqIjt6SGow" alt="Thumbnail" />
            </div>
            <div className="flex-shrink-0 cursor-pointer w-40 h-28 rounded-lg border border-white/10 overflow-hidden opacity-60 hover:opacity-100 transition-all hover:-translate-y-2">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYOyF9TN2EIP2y7wKPnpgc2VioLibo8hRSG5kXt-wV1rrv3apex5dFB_LgAIABEsiKTgbUaEjTpsI5Lvn6rH4fZKR-v8JL1SErraQCH20I9QGta_2T8_Bnh04Ct8HHeSK7EXwc2HLUKUdM_tFW9_4ZqF_viiCvb0XwaGBsb4KmtTHoIpYKRLUy7phBjHUdfNln8hbzRjV-pDzFxKeadp62QVAbO9vSesNwlJPlircCTBPYe5Bo6byUnQ" alt="Thumbnail" />
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-6">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="font-label-caps text-[10px] text-[#c5c6cd]">LOCATION</span>
                <span className="text-sm font-medium">The Glass House, Kensington</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-[10px] text-[#c5c6cd]">DATE</span>
                <span className="text-sm font-medium">October 14, 2024</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#c5c6cd] font-label-caps text-[10px]">
              <span>© 2024 GATHER MODERN NOBILITY</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
