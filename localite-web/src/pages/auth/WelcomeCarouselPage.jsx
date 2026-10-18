import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

const SLIDES = [
  {
    title: 'Discover events\nnear you',
    description: 'Find sports matches, community gatherings, and local events happening in your area.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-09GeNrZdYUchL3mEf9ZwJ3V0FS3dkUdcpvtC9cqViPatMsWovIQC5VUaq-LRxixrgloKawYuFYpNULaSgMqXgyFVKYH75pHAGbgAnLJM27M3u0i6nW0TwMZWZBLPjKIDlRomPLbexhwiNL_uemnyGR904bkLI7j3Sc640V33tEsMdl038mTthf0qtn_TiEq9f-4eLYknq2_O48jtvBB4i2r53MInxgMXoyzTudawQM1rrvGSYgNI5Q',
  },
  {
    title: 'Connect with\nyour community',
    description: 'Meet people who share your interests. Join pickup games, group runs, and social meetups.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSpy0enHxhnTN0tvDLtTwjvcGG-AZUld9qROvoAX0arEy_QnZKFuTtxsx5A4JvvrbkSCu2GQE-FeNug8EnbM6U1SnqIEBUE2oDcSufZyb2plz7Q8pkXRix-vrAbFS0J0TEBcuN9AEKKQ7CM_cDAAkcwFc_ZW-b1ZV6zEKZkd7jzaSvkoEaCWydoPUTvIbV3yjEZYnsuzc5MrVjq85U1MNGwFFMrampgARSIvcWolbxUAhZg9kavuveuQ',
  },
  {
    title: 'Make it\nhappen today',
    description: 'Create your own events, organize matches, and build your local network effortlessly.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATvVMrZ5hN_NeZoGDw4tvAxDz5fkH3A-hVs17NzcSrfKrzAWxOy4ACLQ-NE-TF8DwaFwzqzqu6q1VB0nuCAyRpaWbPTxWjXmcLJcI6Xakjzru7HSMt6BykxkafMEwj0rMOUybqXgf0X6IYSldTCDz-dN7aDB9GKz_z7rzZz3IGfJTMsX17XSKvswk25b4zib1DRHVVBLNAf2fglsd0FHUQM_fUxnU3IeLob1BugHmzCMiYLh7BF7qzfw',
  },
];

const WelcomeCarouselPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const moveCarousel = (direction) => {
    setCurrentSlide((prev) => (prev + direction + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      {/* Nav */}
      <header className="w-full h-16 border-b border-border bg-white sticky top-0 z-50">
        <nav className="flex justify-between items-center h-full px-6 max-w-content mx-auto">
          <span className="text-xl font-semibold text-fg tracking-tight">localite</span>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/explore" className="btn-primary text-sm py-2 px-5">
                Go to app
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-body-sm font-medium text-fg-muted hover:text-fg transition-colors"
                >
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-5">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="max-w-content mx-auto px-6 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image carousel */}
            <div className="relative overflow-hidden rounded-md aspect-[4/5] lg:aspect-square bg-bg-subtle">
              {SLIDES.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    opacity: index === currentSlide ? 1 : 0,
                  }}
                />
              ))}
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center">
              <div className="relative h-52 md:h-48 overflow-hidden mb-8">
                {SLIDES.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-600 ${
                      index === currentSlide
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  >
                    <h1 className="text-display text-fg whitespace-pre-line mb-4">{slide.title}</h1>
                    <p className="text-body-lg text-fg-muted max-w-md">{slide.description}</p>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex gap-2">
                  <button
                    onClick={() => moveCarousel(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-sm border border-border text-fg-muted hover:text-fg hover:border-fg-faint transition-all duration-200"
                  >
                    <ArrowLeft size={18} weight="bold" />
                  </button>
                  <button
                    onClick={() => moveCarousel(1)}
                    className="w-10 h-10 flex items-center justify-center rounded-sm border border-border text-fg-muted hover:text-fg hover:border-fg-faint transition-all duration-200"
                  >
                    <ArrowRight size={18} weight="bold" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex gap-1.5">
                  {SLIDES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-400 ${
                        index === currentSlide ? 'w-6 bg-accent' : 'w-3 bg-border'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Link to={user ? '/explore' : '/signup'} className="btn-primary py-3 px-8">
                  Get started
                </Link>
                <Link to="/events" className="btn-ghost py-3 px-8">
                  Browse events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6">
        <div className="max-w-content mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-caption text-fg-faint">&copy; {new Date().getFullYear()} Localite</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-caption text-fg-faint hover:text-fg-muted transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-caption text-fg-faint hover:text-fg-muted transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="text-caption text-fg-faint hover:text-fg-muted transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeCarouselPage;
