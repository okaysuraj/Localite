import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NotificationPanel from './NotificationPanel';
import { getNotifications } from '../services/api';
import {
  MagnifyingGlass,
  Bell,
  EnvelopeSimple,
  SignOut,
  List,
  X,
  Plus,
  SquaresFour,
} from '@phosphor-icons/react';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState(null);
  const showMobileMenu = mobileMenuPath === location.pathname;
  const setShowMobileMenu = (open) => setMobileMenuPath(open ? location.pathname : null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      getNotifications()
        .then((data) => {
          if (Array.isArray(data)) {
            const unread = data.filter((n) => !n.read).length;
            setUnreadCount(unread);
          }
        })
        .catch(console.error);
    }
  }, [user, showNotifications]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/sports', label: 'Sports' },
    { path: '/events', label: 'Events' },
    { path: '/network', label: 'Community' },
    { path: '/map', label: 'Map' },
  ];

  return (
    <>
      <header className="w-full h-16 sticky top-0 z-50 bg-white border-b border-border">
        <nav className="flex justify-between items-center px-6 max-w-content mx-auto w-full h-full">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <Link to="/welcome" className="text-xl font-semibold text-fg tracking-tight select-none">
              localite
            </Link>

            {/* Desktop nav links */}
            {user && (
              <ul className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-body-sm font-medium transition-colors duration-200 ${
                        isActive(link.path) ? 'text-accent' : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 relative">
            {user ? (
              <>
                {/* Search (desktop) */}
                <Link
                  to="/search"
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-sm text-fg-muted hover:text-fg hover:bg-bg-subtle transition-colors duration-200"
                  title="Search"
                >
                  <MagnifyingGlass size={20} weight="bold" />
                </Link>

                {/* Notifications */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-sm text-fg-muted hover:text-fg hover:bg-bg-subtle transition-colors duration-200 relative"
                  title="Notifications"
                >
                  <Bell size={20} weight="bold" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
                  )}
                </button>
                <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

                {/* Messages */}
                <Link
                  to="/messages"
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-sm text-fg-muted hover:text-fg hover:bg-bg-subtle transition-colors duration-200"
                  title="Messages"
                >
                  <EnvelopeSimple size={20} weight="bold" />
                </Link>

                {/* Create Event CTA */}
                <Link to="/events/create" className="hidden lg:flex btn-primary text-sm py-2 px-4">
                  <Plus size={16} weight="bold" />
                  Create event
                </Link>

                {/* Profile avatar */}
                <Link
                  to="/profile"
                  className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0"
                >
                  <img
                    className="w-full h-full object-cover"
                    alt="Profile"
                    src={
                      user?.avatar ||
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8a7eqv5aRNydd_QlnHZIy6CHVEdi9gc7ZAPy7Sd3kOrJoSNdnojfMPd5tfJIHgtuX5K10sm7QmCkxjNHB5vW_2_fp9oxjhSgW3WOk1IflvudsWKhX91GGj_KWZG6-Xpo6iy3x0XyPQY7ekGiI74V9YBJmY7rBtfRKtEjAsfwOL4a0HxKie7YGQaAST0t8AZfnUddKkjhRutWFhpH6JDVyD5B9OWsvGTRgHIonjMPJ5usRfn46SBNjwg'
                    }
                  />
                </Link>

                {/* Logout (desktop) */}
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-sm text-fg-muted hover:text-error transition-colors duration-200"
                  title="Sign out"
                >
                  <SignOut size={20} weight="bold" />
                </button>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden flex items-center justify-center w-9 h-9 rounded-sm text-fg-muted hover:text-fg transition-colors duration-200"
                >
                  {showMobileMenu ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
                </button>
              </>
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

      {/* Mobile menu overlay */}
      {showMobileMenu && user && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="pt-20 px-6 flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-title py-3 border-b border-border animate-fade-in-up font-medium ${
                  isActive(link.path) ? 'text-accent' : 'text-fg'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}

            <div className="divider my-4" />

            <Link
              to="/search"
              className="flex items-center gap-3 text-body py-3 text-fg-muted animate-fade-in-up"
              style={{ animationDelay: '240ms' }}
            >
              <MagnifyingGlass size={20} weight="bold" />
              Search
            </Link>

            <Link
              to="/messages"
              className="flex items-center gap-3 text-body py-3 text-fg-muted animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <EnvelopeSimple size={20} weight="bold" />
              Messages
            </Link>

            <Link
              to="/notifications"
              className="flex items-center gap-3 text-body py-3 text-fg-muted animate-fade-in-up"
              style={{ animationDelay: '360ms' }}
            >
              <Bell size={20} weight="bold" />
              Notifications
              {unreadCount > 0 && <span className="tag text-micro">{unreadCount}</span>}
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-3 text-body py-3 text-fg-muted animate-fade-in-up"
              style={{ animationDelay: '420ms' }}
            >
              <SquaresFour size={20} weight="bold" />
              Dashboard
            </Link>

            <div className="divider my-4" />

            <Link
              to="/events/create"
              className="btn-primary w-full text-center animate-fade-in-up"
              style={{ animationDelay: '480ms' }}
            >
              Create event
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-body py-3 text-error mt-4 animate-fade-in-up"
              style={{ animationDelay: '540ms' }}
            >
              <SignOut size={20} weight="bold" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
