import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function SettingsLayout({ children }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Gatherings', icon: 'event', path: '/dashboard' },
    { name: 'Sports Hub', icon: 'sports_tennis', path: '/categories' },
    { name: 'Members', icon: 'group', path: '/network' },
    { name: 'Settings', icon: 'admin_panel_settings', path: '/settings', exact: true }
  ];

  return (
    <div className="flex bg-background min-h-[calc(100vh-80px)]">
      {/* SideNavBar (Hidden on Mobile) */}
      <aside className="w-64 py-8 flex flex-col z-40 bg-surface-container-low border-r border-outline-variant/30 hidden md:flex min-h-full">
        <div className="mb-10 px-8">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-1">Localite Elite</h2>
          <p className="font-label-caps text-label-caps text-secondary">Premium Concierge</p>
        </div>
        
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);
            
            // Highlight settings tree specially
            const isSettings = item.name === 'Settings' && location.pathname.startsWith('/settings');

            return (
              <NavLink 
                key={item.name}
                to={item.path}
                className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer group ${isSettings ? 'text-primary bg-surface-bright shadow-sm font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined group-hover:text-primary" style={isSettings ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.icon}
                </span>
                <span className="font-label-caps text-label-caps uppercase">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-2 pt-8 border-t border-outline-variant/30 px-4">
          <div className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-label-caps text-label-caps uppercase">Help Center</span>
          </div>
          <div 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-2 text-error hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-caps text-label-caps uppercase">Log Out</span>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 px-container-margin py-8 md:py-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
