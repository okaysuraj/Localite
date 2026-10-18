import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  CalendarBlank,
  Trophy,
  Users,
  GearSix,
  Question,
  SignOut,
} from '@phosphor-icons/react';

export default function SettingsLayout({ children }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Events', Icon: CalendarBlank, path: '/events' },
    { name: 'Sports', Icon: Trophy, path: '/sports' },
    { name: 'Community', Icon: Users, path: '/network' },
    { name: 'Settings', Icon: GearSix, path: '/settings', exact: true },
  ];

  return (
    <div className="flex bg-bg min-h-[calc(100vh-65px)]">
      {/* SideNavBar (Hidden on Mobile) */}
      <aside className="w-60 py-6 flex flex-col z-20 bg-white border-r border-border hidden md:flex min-h-full shrink-0">
        <div className="mb-6 px-6">
          <h2 className="text-base font-display font-semibold text-fg tracking-tight">
            Account & Settings
          </h2>
          <p className="text-[11px] font-mono text-fg-muted mt-0.5">
            Preferences & safety
          </p>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isSettings =
              item.name === 'Settings' &&
              location.pathname.startsWith('/settings');
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path) || isSettings;

            const IconComponent = item.Icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2 rounded-btn transition-colors text-xs font-mono tracking-wide ${
                  isActive
                    ? 'bg-accent-subtle text-accent font-medium'
                    : 'text-fg-muted hover:text-fg hover:bg-bg-subtle'
                }`}
              >
                <IconComponent
                  size={16}
                  weight={isActive ? 'bold' : 'regular'}
                />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-border px-3 text-xs font-mono">
          <button
            onClick={() => navigate('/contact')}
            className="flex items-center gap-3 px-3.5 py-2 text-fg-muted hover:text-fg rounded-btn hover:bg-bg-subtle transition-colors w-full text-left"
          >
            <Question size={16} />
            <span>Help & Support</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2 text-error hover:bg-error-subtle rounded-btn transition-colors w-full text-left"
          >
            <SignOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 px-6 py-8 md:py-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">{children || <Outlet />}</div>
      </main>
    </div>
  );
}
