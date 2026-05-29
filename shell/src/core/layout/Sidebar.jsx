import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/' },
  { icon: 'category', label: 'Categories', path: '/categories' },
  { icon: 'person', label: 'Profile', path: '/profile' },
  { icon: 'settings', label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 flex flex-col p-6 glass-sidebar bg-slate-900/40 z-50 rounded-r-lg">
      {/* Logo */}
      <div className="mb-12 px-4">
        <Link to="/" className="block">
          <h1 className="text-2xl font-bold text-cyan-100 tracking-tighter font-headline">
            ProjectOS
          </h1>
          <p className="text-xs text-on-surface-variant tracking-widest uppercase mt-1 opacity-60">
            V3.0 Precision
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive(item.path)
                ? 'bg-cyan-500/10 text-cyan-300 font-semibold shadow-[inset_0_0_10px_rgba(0,245,245,0.2)]'
                : 'text-indigo-200/60 hover:bg-indigo-500/20 hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive(item.path) ? 'text-cyan-400' : ''}`}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="mt-auto p-4 flex items-center gap-3 bg-surface-container-low rounded-lg border border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-fuchsia-500 flex items-center justify-center p-[2px]">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-cyan-300">
            FB
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface">Brandao</p>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-tight">
            Lead Architect
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
