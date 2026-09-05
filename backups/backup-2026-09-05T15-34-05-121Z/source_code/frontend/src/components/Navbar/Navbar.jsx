import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import SearchBar from '../SearchBar/SearchBar';
import useScrolled from '../../hooks/useScrolled';

function Brand() {
  const { ui, isHindi } = useLanguage();
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="Bharat Darshan home">
      {/* Indian tricolour flag block with float animation */}
      <span
        className="flex h-9 w-9 flex-col overflow-hidden rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-110 animate-float"
        aria-hidden="true"
      >
        <span className="flex-1 bg-india-orange" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-india-green" />
      </span>
      <span
        className="text-lg font-extrabold tracking-tight text-india-navy transition-all duration-300 group-hover:text-india-saffron"
        lang={isHindi ? 'hi' : 'en'}
      >
        {ui('brand')}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { ui } = useLanguage();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const scrolled = useScrolled(8);

  useEffect(() => setOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) =>
    `btn-ghost relative ${isActive ? 'bg-india-navy/10 text-india-navy font-semibold' : 'text-india-text'}`;

  const authControls = isAuthenticated ? (
    <>
      <NavLink to="/dashboard" className={linkClass}>
        {ui('dashboard')}
      </NavLink>
      {isAdmin && (
        <NavLink to="/admin" className={linkClass}>
          {ui('admin')}
        </NavLink>
      )}
      <span className="hidden text-sm text-gray-500 lg:inline px-1">{user.name}</span>
      <button type="button" onClick={logout} className="btn-outline">
        {ui('logout')}
      </button>
    </>
  ) : (
    <>
      <NavLink to="/login" className={linkClass}>
        {ui('login')}
      </NavLink>
      <Link to="/signup" className="btn-primary">
        {ui('signup')}
      </Link>
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-white/40 shadow-glass'
          : 'bg-white/90 border-b border-gray-100 backdrop-blur-sm'
      }`}
    >
      {/* Tricolour top strip */}
      <div
        className="h-[3px] w-full bg-gradient-to-r from-india-orange via-white to-india-green"
        aria-hidden="true"
      />

      <nav className="container-page flex h-16 items-center gap-4">
        <Brand />

        {/* Search bar (hidden on home page) */}
        <div className="hidden flex-1 md:block md:max-w-md">
          {location.pathname !== '/' && <SearchBar />}
        </div>

        {/* Desktop nav links */}
        <div className="ml-auto hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            {ui('home')}
          </NavLink>
          <NavLink to="/feedback" className={linkClass}>
            {ui('feedback')}
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            {ui('about')}
          </NavLink>
          <LanguageToggle className="mx-1" />
          {authControls}
        </div>

        {/* Mobile: language + hamburger */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={ui('menu')}
            className="rounded-lg p-2 text-india-navy hover:bg-india-navy/5 transition-colors"
          >
            {/* Animated hamburger ↔ X */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-transform duration-200"
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/30 glass px-4 pb-4 pt-3 md:hidden animate-fade-slide-up">
          <SearchBar onNavigate={() => setOpen(false)} />
          <div className="mt-3 flex flex-col gap-1">
            <NavLink to="/" end className={linkClass}>
              {ui('home')}
            </NavLink>
            <NavLink to="/feedback" className={linkClass}>
              {ui('feedback')}
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              {ui('about')}
            </NavLink>
            <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-gray-100/50 pt-3">
              {authControls}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
