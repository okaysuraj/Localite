import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingStatePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md overflow-hidden min-h-screen">
      
      {/* Loading Overlay Center Anchor */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-6">
          {/* Brand Logo Pulsing */}
          <div className="animate-[logo-pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] flex flex-col items-center">
            <span className="font-headline-md text-4xl font-bold text-primary italic tracking-tight">Localite</span>
            <span className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-[0.2em] mt-1">MODERN NOBILITY</span>
          </div>
          {/* Progress Track (Subtle) */}
          <div className="w-48 h-[1px] bg-[#c5c6cd]/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-[#775a19] w-1/3 animate-[shimmer_1.5s_infinite_ease-in-out]"></div>
          </div>
        </div>
      </div>

      {/* Main Skeleton UI Layout */}
      <div className="flex h-screen opacity-40 blur-[1px]">
        {/* Predicted SideNavBar Skeleton */}
        <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col py-12 border-r border-[#c5c6cd]/10 bg-white shadow-[24px_0_48px_rgba(10,25,47,0.03)]">
          <div className="px-6 mb-12">
            <div className="w-32 h-8 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
            <div className="w-24 h-4 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg mt-2"></div>
          </div>
          <nav className="flex-1 px-4 space-y-4">
            <div className="flex items-center gap-4 px-4 py-3 bg-[#f5f3f3] border-r-2 border-[#775a19]">
              <div className="w-6 h-6 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-full"></div>
              <div className="w-24 h-4 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
            </div>
            {/* Nav Item Repeats */}
            <div className="flex items-center gap-4 px-4 py-3">
              <div className="w-6 h-6 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-full"></div>
              <div className="w-20 h-4 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
            </div>
            <div className="flex items-center gap-4 px-4 py-3">
              <div className="w-6 h-6 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-full"></div>
              <div className="w-28 h-4 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
            </div>
            <div className="flex items-center gap-4 px-4 py-3">
              <div className="w-6 h-6 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-full"></div>
              <div className="w-24 h-4 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
            </div>
          </nav>
          <div className="px-6 mt-auto pt-6 border-t border-[#c5c6cd]/10">
            <div className="w-full h-12 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-xl"></div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="ml-64 flex-1 overflow-y-auto">
          {/* Predicted TopAppBar Skeleton */}
          <header className="w-full top-0 sticky z-30 bg-[#f5f3f3] shadow-[0_16px_32px_rgba(10,25,47,0.05)]">
            <div className="flex justify-between items-center px-6 py-2 max-w-7xl mx-auto h-16">
              <div className="flex items-center gap-4">
                <div className="w-48 h-10 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-full"></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-6 h-6 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-full"></div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            {/* Hero/Featured Bento Section */}
            <section className="grid grid-cols-12 gap-4 h-[420px]">
              <div className="col-span-8 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)]"></div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="flex-1 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)]"></div>
                <div className="flex-1 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)]"></div>
              </div>
            </section>

            {/* Section Title Skeleton */}
            <div className="space-y-2">
              <div className="w-64 h-8 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
              <div className="w-48 h-4 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg opacity-50"></div>
            </div>

            {/* Grid of Cards */}
            <section className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-[0_16px_32px_rgba(10,25,47,0.05)] overflow-hidden flex flex-col h-[380px]">
                  <div className="h-48 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear]"></div>
                  <div className="p-6 space-y-4">
                    <div className="w-3/4 h-6 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
                      <div className="w-5/6 h-4 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
                    </div>
                    <div className="pt-4 flex justify-between items-center">
                      <div className="w-24 h-4 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
                      <div className="w-16 h-8 bg-gradient-to-r from-[#f5f3f3] via-[#efeded] to-[#f5f3f3] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* List/Membership Section Skeleton */}
            <section className="bg-[#f5f3f3] rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-full"></div>
                <div className="space-y-2">
                  <div className="w-48 h-6 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
                  <div className="w-64 h-4 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg opacity-60"></div>
                </div>
              </div>
              <div className="w-40 h-12 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-xl"></div>
            </section>
          </div>

          {/* Predicted Footer Skeleton */}
          <footer className="w-full py-12 mt-12 bg-[#f5f3f3] border-t border-[#c5c6cd]/20">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-4">
              <div className="w-32 h-6 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
              <div className="flex gap-4">
                <div className="w-16 h-4 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
                <div className="w-16 h-4 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
                <div className="w-16 h-4 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
              </div>
              <div className="w-48 h-4 bg-gradient-to-r from-[#efeded] via-[#e4e2e2] to-[#efeded] bg-[length:1000px_100%] animate-[shimmer_2s_infinite_linear] rounded-lg"></div>
            </div>
          </footer>
        </main>
      </div>

    </div>
  );
}
