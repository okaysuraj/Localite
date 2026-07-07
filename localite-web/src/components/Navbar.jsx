import React, { useContext, useState, useEffect } from 'react';
import { MapPin, Search, User, LogOut, Users, Bell, Trophy, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
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
  }, [user, showNotifications]); // Refresh count when panel closes

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-dark/80 backdrop-blur-2xl border-b border-surface-variant/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 animate-slide-down">
      <Link to="/dashboard" className="flex items-center gap-2 group">
        <div className="bg-lime-vibe p-2 rounded-lg group-hover:scale-105 transition-transform">
           <MapPin size={24} className="text-background" />
        </div>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">Localite</h1>
      </Link>
      
      <div className="flex gap-4 items-center relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 text-text-muted hover:text-lime-vibe transition-colors relative"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </button>
        <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

        <Link to="/network" className="p-2 text-text-muted hover:text-lime-vibe transition-colors bg-surface-variant/10 rounded-full">
          <Users size={20} />
        </Link>
        <Link to="/admin" className="p-2 text-text-muted hover:text-lime-vibe transition-colors bg-surface-variant/10 rounded-full" title="Admin">
          <Shield size={20} />
        </Link>
        <Link to="/leaderboard" className="p-2 text-text-muted hover:text-lime-vibe transition-colors bg-surface-variant/10 rounded-full">
          <Trophy size={20} />
        </Link>
        <Link to="/dashboard" className="p-2 text-text-muted hover:text-lime-vibe transition-colors">
          <Search size={20} />
        </Link>
        <Link to="/profile" className="p-2 text-text-muted hover:text-lime-vibe transition-colors bg-surface-variant/10 rounded-full">
          <User size={20} />
        </Link>
        <button onClick={handleLogout} className="p-2 text-text-muted hover:text-red-400 transition-colors">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
