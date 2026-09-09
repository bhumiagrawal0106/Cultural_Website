import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import SearchBar from '../SearchBar/SearchBar';
import AmbientSoundscape from '../AmbientSoundscape';
import { useYatra } from '../../context/YatraContext';
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
  const { ui, isHindi } = useLanguage();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { setIsDrawerOpen, count: yatraCount } = useYatra();
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

        {/* Omnisearch Trigger Pill */}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/90 px-2.5 py-1.5 sm:px-3.5 text-xs text-gray-600 hover:border-gray-300 hover:bg-gray-100 transition shadow-2xs"
          title="Open Omnisearch (Ctrl+K)"
        >
          <svg className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline font-medium">{isHindi ? 'खोजें (Ctrl+K)...' : 'Omnisearch...'}</span>
          <kbd className="hidden md:inline rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Desktop nav links & Tools */}
        <div className="ml-auto hidden items-center gap-1.5 md:flex">
          <NavLink to="/" end className={linkClass}>
            {ui('home')}
          </NavLink>
          <NavLink to="/compare" className={linkClass}>
            <span className="mr-1">⚖️</span>
            <span>{isHindi ? 'तुलना' : 'Compare'}</span>
          </NavLink>

          {/* Ambient Cultural Soundscape */}
          <div className="mx-1">
            <AmbientSoundscape />
          </div>

          {/* My Yatra Planner Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/90 px-3 py-1 text-xs font-bold text-amber-900 hover:bg-amber-100 transition shadow-2xs"
            title="Open My Yatra Itinerary Planner"
          >
            <span>🧭</span>
            <span>{isHindi ? 'यात्रा' : 'Yatra'}</span>
            {yatraCount > 0 && (
              <span className="h-4 min-w-[16px] rounded-full bg-india-orange px-1 text-[10px] font-extrabold text-white flex items-center justify-center">
                {yatraCount}
              </span>
            )}
          </button>

          {/* My Diary Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-liked-drawer'))}
            className="flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50/90 px-2.5 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100 transition shadow-2xs"
            title="Open My Liked Heritage Diary"
          >
            <span>❤️</span>
            <span className="hidden xl:inline">{isHindi ? 'डायरी' : 'Diary'}</span>
          </button>

          <LanguageToggle className="mx-1" />
          {authControls}
        </div>

        {/* Mobile: Soundscape + Yatra + Hamburger */}
        <div className="ml-auto flex items-center gap-1.5 md:hidden">
          <AmbientSoundscape />
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="rounded-full bg-amber-50 border border-amber-200 p-1.5 text-xs text-amber-800"
            title="My Yatra"
          >
            🧭{yatraCount > 0 && <span className="ml-0.5 font-bold">{yatraCount}</span>}
          </button>
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
            <NavLink to="/compare" className={linkClass}>
              <span className="mr-1">⚖️</span>
              <span>{isHindi ? 'तुलना' : 'Compare'}</span>
            </NavLink>
            <NavLink to="/map3d" className={linkClass}>
              <span className="mr-1">🌐</span>
              <span>{isHindi ? '3D मानचित्र' : '3D Map'}</span>
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
