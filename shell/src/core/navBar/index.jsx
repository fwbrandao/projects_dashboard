import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'HUB', path: '/' },
  { label: 'SHOWCASE', path: '/data-science' },
  { label: 'WORK', path: '/work' },
  { label: 'BIO', path: '/bio' },
];

const NavBar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(13,11,33,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(72,69,94,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="no-underline flex items-baseline gap-1">
          <span className="text-xl font-extrabold tracking-tight text-on-surface font-headline">
            ARCHITECT
          </span>
          <span className="text-xl font-extrabold text-cyan-400 font-headline">.OS</span>
        </Link>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`text-xs font-bold tracking-[0.15em] uppercase no-underline transition-all duration-300 pb-1 ${
                isActive(link.path)
                  ? 'text-on-surface border-b-2 border-on-surface'
                  : 'text-on-surface-variant/60 hover:text-on-surface border-b-2 border-transparent'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant/50 hover:text-cyan-300 transition-colors">
            <span className="material-symbols-outlined text-xl">mail</span>
          </button>
          <button className="p-2 text-on-surface-variant/50 hover:text-cyan-300 transition-colors">
            <span className="material-symbols-outlined text-xl">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
