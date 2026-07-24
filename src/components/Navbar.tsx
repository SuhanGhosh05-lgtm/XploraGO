import React, { useState, useRef, useEffect } from 'react';
import { Menu, Camera, Bookmark, Search, Sparkles, Compass, X, ArrowRight, ArrowLeft, Sun, Moon, Palette } from 'lucide-react';
import { CURATED_LANDMARKS } from '../data/curatedLandmarks';
import { LandmarkDetails } from '../types';
import { useTheme } from '../ThemeContext';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenScanModal: () => void;
  onOpenSavedModal: () => void;
  onOpenThemeModal: () => void;
  onNavigateHome: () => void;
  onSearchLocation: (queryOrLandmark: string | LandmarkDetails) => void;
  onOpenAuthModal: () => void;
  savedCount: number;
  user: { name: string; email: string } | null;
  viewMode?: 'home' | 'landmark';
  activeLandmarkName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onOpenScanModal,
  onOpenSavedModal,
  onOpenThemeModal,
  onNavigateHome,
  onSearchLocation,
  onOpenAuthModal,
  savedCount,
  user,
  viewMode,
  activeLandmarkName,
}) => {
  const { isDark, toggleLightDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results
  const matchingLandmarks = searchQuery.trim()
    ? CURATED_LANDMARKS.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : CURATED_LANDMARKS.slice(0, 5);

  const handleSelectSearchResult = (item: typeof CURATED_LANDMARKS[0]) => {
    onSearchLocation(item.presetDetails);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Check if exact match exists, else pass string
    const match = CURATED_LANDMARKS.find(
      (item) =>
        item.name.toLowerCase() === searchQuery.trim().toLowerCase() ||
        item.location.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    if (match) {
      onSearchLocation(match.presetDetails);
    } else {
      onSearchLocation(searchQuery.trim());
    }

    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* LEFT: Hamburger Menu + Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800/80 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all shadow-sm"
            title="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="h-4 w-4 text-cyan-400" />
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Ask The Place
                </h1>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-indigo-500/10 text-cyan-300 border border-indigo-500/20">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">AI Travel Intelligence</p>
            </div>
          </div>

          {/* Dedicated Back Button when viewing a Landmark */}
          {viewMode === 'landmark' && (
            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shrink-0 active:scale-95"
              title="Return to Global Exploration"
            >
              <ArrowLeft className="h-4 w-4 text-cyan-400" />
              <span className="hidden md:inline">Back to Globe</span>
            </button>
          )}
        </div>

        {/* CENTER: Smart Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-md mx-2 sm:mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search landmarks, cities, museums, hidden gems..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-8 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-400 text-xs font-medium focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-12 left-0 right-0 z-50 bg-slate-950/95 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl space-y-1 max-h-80 overflow-y-auto scrollbar-none animate-fade-in">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center justify-between">
                <span>{searchQuery ? 'Search Suggestions' : 'Popular Destinations'}</span>
                <Sparkles className="h-3 w-3 text-cyan-400" />
              </div>

              {matchingLandmarks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectSearchResult(item)}
                  className="p-2.5 rounded-xl hover:bg-slate-900 cursor-pointer transition-colors flex items-center justify-between gap-2 group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-8 w-8 rounded-lg object-cover shrink-0 border border-slate-800"
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {item.location}, {item.country} • {item.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                </div>
              ))}

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 text-xs font-bold border border-indigo-500/30 transition-all flex items-center justify-center gap-2 mt-1"
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Ask Gemma AI about "{searchQuery}"</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Actions (Theme Toggle, Theme Selector, Scan, Saved, Auth) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Light / Dark Toggle */}
          <button
            onClick={toggleLightDark}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-indigo-500/40 transition-all shadow-sm"
            title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* Theme Palette Modal Opener */}
          <button
            onClick={onOpenThemeModal}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-indigo-500/40 transition-all shadow-sm hidden sm:flex"
            title="Choose Theme Palette"
          >
            <Palette className="h-4 w-4 text-cyan-400" />
          </button>

          <button
            onClick={onOpenSavedModal}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all flex items-center gap-1.5 relative text-xs font-semibold"
            title="Saved Landmarks"
          >
            <Bookmark className="h-4 w-4 text-cyan-400" />
            <span className="hidden md:inline">Saved</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold bg-indigo-600 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenScanModal}
            className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
            title="Scan Photo"
          >
            <Camera className="h-4 w-4 text-cyan-400" />
            <span className="hidden lg:inline">Scan Photo</span>
          </button>

          {/* User Sign In / Profile */}
          {user ? (
            <div
              onClick={onOpenAuthModal}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer flex items-center gap-2 transition-all"
            >
              <div className="h-6 w-6 rounded-lg bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-200 max-w-[80px] truncate">
                {user.name}
              </span>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
