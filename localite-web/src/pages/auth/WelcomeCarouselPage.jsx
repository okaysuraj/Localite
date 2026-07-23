import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    category: 'CURATED EXPERIENCES',
    title: 'Find Your<br/>Third Place',
    description: 'Discover a collection of sanctuary spaces designed for connection, focus, and refined leisure. From morning roasts to evening toasts.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-09GeNrZdYUchL3mEf9ZwJ3V0FS3dkUdcpvtC9cqViPatMsWovIQC5VUaq-LRxixrgloKawYuFYpNULaSgMqXgyFVKYH75pHAGbgAnLJM27M3u0i6nW0TwMZWZBLPjKIDlRomPLbexhwiNL_uemnyGR904bkLI7j3Sc640V33tEsMdl038mTthf0qtn_TiEq9f-4eLYknq2_O48jtvBB4i2r53MInxgMXoyzTudawQM1rrvGSYgNI5Q'
  },
  {
    category: 'ELITE GATHERINGS',
    title: 'Refined Social<br/>Exchanges',
    description: 'Engage with a community of like-minded individuals in settings that honor the art of conversation and architectural beauty.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSpy0enHxhnTN0tvDLtTwjvcGG-AZUld9qROvoAX0arEy_QnZKFuTtxsx5A4JvvrbkSCu2GQE-FeNug8EnbM6U1SnqIEBUE2oDcSufZyb2plz7Q8pkXRix-vrAbFS0J0TEBcuN9AEKKQ7CM_cDAAkcwFc_ZW-b1ZV6zEKZkd7jzaSvkoEaCWydoPUTvIbV3yjEZYnsuzc5MrVjq85U1MNGwFFMrampgARSIvcWolbxUAhZg9kavuveuQ'
  },
  {
    category: 'MODERN SANCTUARY',
    title: 'The New Home<br/>Of Belonging',
    description: 'Elevating the local experience through deliberate design and exceptional service. Your sanctuary awaits in the heart of the city.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATvVMrZ5hN_NeZoGDw4tvAxDz5fkH3A-hVs17NzcSrfKrzAWxOy4ACLQ-NE-TF8DwaFwzqzqu6q1VB0nuCAyRpaWbPTxWjXmcLJcI6Xakjzru7HSMt6BykxkafMEwj0rMOUybqXgf0X6IYSldTCDz-dN7aDB9GKz_z7rzZz3IGfJTMsX17XSKvswk25b4zib1DRHVVBLNAf2fglsd0FHUQM_fUxnU3IeLob1BugHmzCMiYLh7BF7qzfw'
  }
];

const WelcomeCarouselPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const moveCarousel = (direction) => {
    setCurrentSlide((prev) => (prev + direction + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-secondary-container min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky z-50 bg-surface shadow-[0_16px_32px_-8px_rgba(10,25,47,0.05)]">
        <nav className="flex justify-between items-center h-20 px-container-margin max-w-7xl mx-auto">
          <div className="font-display-lg text-display-lg text-primary tracking-tighter">Localite</div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-primary border-b border-primary pb-1 font-label-caps text-label-caps transition-colors duration-300">Places</Link>
            <Link to="/events" className="text-on-surface-variant pb-1 font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Events</Link>
            <Link to="/sports" className="text-on-surface-variant pb-1 font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Sports</Link>
            <Link to="/network" className="text-on-surface-variant pb-1 font-label-caps text-label-caps hover:text-primary transition-colors duration-300">Community</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-all duration-200">Sign In</Link>
            <Link to="/signup" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-caps text-label-caps hover:opacity-80 transition-opacity">Join Now</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow relative overflow-hidden flex items-center">
        {/* Hero Carousel Container */}
        <div className="max-w-7xl mx-auto px-container-margin py-stack-lg w-full">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Editorial Image */}
            <div className="relative overflow-hidden rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] aspect-[4/5] lg:aspect-square group">
              <div 
                className="absolute inset-0 flex w-[300%] h-full transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1)"
                style={{ transform: `translateX(-${(currentSlide * 100) / SLIDES.length}%)` }}
              >
                {SLIDES.map((slide, index) => (
                  <div 
                    key={index}
                    className="w-1/3 h-full bg-cover bg-center" 
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  ></div>
                ))}
              </div>
              {/* Aesthetic Overlay */}
              <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl"></div>
            </div>

            {/* Right: Content Column */}
            <div className="flex flex-col justify-center space-y-stack-md pr-0 lg:pr-12">
              <div className="relative h-64 overflow-hidden">
                {SLIDES.map((slide, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
                  >
                    <span className="font-label-caps text-label-caps text-secondary mb-2 block">{slide.category}</span>
                    <h1 
                      className="font-display-lg text-display-lg text-primary leading-tight mb-4"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center space-x-8 pt-stack-sm">
                <div className="flex space-x-3 items-center">
                  <button 
                    onClick={() => moveCarousel(-1)}
                    className="group w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant hover:border-primary transition-all duration-300"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_back</span>
                  </button>
                  <button 
                    onClick={() => moveCarousel(1)}
                    className="group w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant hover:border-primary transition-all duration-300"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_forward</span>
                  </button>
                </div>
                
                {/* Pagination Dots */}
                <div className="flex space-x-2">
                  {SLIDES.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-8 bg-black' : 'w-4 bg-surface-container-highest'}`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="pt-stack-md">
                <Link to="/login" className="inline-flex bg-primary text-on-primary px-10 py-5 rounded-none font-label-caps text-label-caps hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-500 shadow-xl items-center gap-3">
                  EXPLORE VENUES
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-stack-lg px-container-margin max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <div className="font-headline-sm text-headline-sm text-primary mb-2">Localite</div>
            <p className="font-body-md text-body-md text-on-surface-variant">© 2024 Localite. Modern Nobility in Local Gathering.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/privacy" className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors">Terms of Service</Link>
            <Link to="/partners" className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors">Venue Partners</Link>
            <Link to="/contact" className="text-on-surface-variant font-label-caps text-label-caps hover:text-secondary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeCarouselPage;
