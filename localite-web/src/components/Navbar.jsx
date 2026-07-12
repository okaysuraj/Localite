import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      fetch(import.meta.env.VITE_API_URL + '/notifications', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => res.json())
      .then(data => {
        const unread = data.filter(n => !n.read).length;
        setUnreadCount(unread);
      })
      .catch(console.error);
    }
  }, [user, showNotifications]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`w-full h-20 sticky top-0 z-50 transition-all duration-300 border-b border-surface-container ${scrolled ? 'shadow-md bg-white/95 backdrop-blur-md' : 'bg-surface shadow-sm shadow-primary/5'}`}>
      <nav className="flex justify-between items-center px-container-margin max-w-7xl mx-auto w-full h-full">
        <div className="flex items-center gap-gutter">
          <Link to="/dashboard" className="font-display-lg text-display-lg text-primary select-none">
            Localite
          </Link>
          <div className="hidden md:flex ml-8 items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-body-md w-64 p-0 outline-none placeholder:text-outline" 
              placeholder="Explore local events..." 
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link 
                to="/dashboard" 
                className={`font-label-caps text-label-caps transition-colors duration-300 ${isActive('/dashboard') ? 'text-primary border-b-2 border-secondary-container pb-1 font-bold' : 'text-on-surface-variant hover:text-secondary'}`}
              >
                Discover
              </Link>
            </li>
            <li>
              <Link 
                to="/map" 
                className={`font-label-caps text-label-caps transition-colors duration-300 ${isActive('/map') ? 'text-primary border-b-2 border-secondary-container pb-1 font-bold' : 'text-on-surface-variant hover:text-secondary'}`}
              >
                Events
              </Link>
            </li>
            <li>
              <Link 
                to="/network" 
                className={`font-label-caps text-label-caps transition-colors duration-300 ${isActive('/network') ? 'text-primary border-b-2 border-secondary-container pb-1 font-bold' : 'text-on-surface-variant hover:text-secondary'}`}
              >
                Members
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors relative"
            >
              notifications
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
              )}
            </button>
            <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

            <Link to="/messages" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" title="Messages">
              mail
            </Link>
            
            <Link to="/create-event" className="hidden lg:block bg-primary text-on-primary font-label-caps text-label-caps px-6 py-2.5 hover:opacity-80 transition-all shadow-md rounded">
              Create Event
            </Link>

            <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant hover:opacity-80 transition-opacity">
              <img 
                className="w-full h-full object-cover" 
                alt="Profile" 
                src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuA8a7eqv5aRNydd_QlnHZIy6CHVEdi9gc7ZAPy7Sd3kOrJoSNdnojfMPd5tfJIHgtuX5K10sm7QmCkxjNHB5vW_2_fp9oxjhSgW3WOk1IflvudsWKhX91GGj_KWZG6-Xpo6iy3x0XyPQY7ekGiI74V9YBJmY7rBtfRKtEjAsfwOL4a0HxKie7YGQaAST0t8AZfnUddKkjhRutWFhpH6JDVyD5B9OWsvGTRgHIonjMPJ5usRfn46SBNjwg"}
              />
            </Link>

            <button onClick={handleLogout} className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors ml-2" title="Logout">
              logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
