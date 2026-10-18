import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-white">
      <main className="flex flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <div className="overflow-hidden mb-6">
          <h1 className="text-[56px] md:text-[72px] font-semibold text-fg tracking-tight leading-none reveal-text">
            localite
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-body text-fg-muted tagline-fade mb-12">find your people nearby</p>

        {/* Loader */}
        <div className="tagline-fade" style={{ animationDelay: '0.8s' }}>
          <div className="loader-bar" />
        </div>
      </main>
    </div>
  );
};

export default SplashPage;
