import React from 'react';
import {
  Home,
  Globe,
  Camera,
  Bookmark,
  Sparkles,
  History,
  Settings,
  Info,
  X,
  ChevronRight,
  Shield,
  Palette,
  Sun,
  Moon,
  Compass
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'home' | 'landmark';
  onNavigateHome: () => void;
  onNavigateExplore: () => void;
  onOpenScanModal: () => void;
  onOpenSavedModal: () => void;
  onOpenQuizModal: () => void;
  onOpenHistoryModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenAboutModal: () => void;
  onOpenAuthModal: () => void;
  onOpenThemeModal: () => void;
  user: { name: string; email: string } | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeView,
  onNavigateHome,
  onNavigateExplore,
  onOpenScanModal,
  onOpenSavedModal,
  onOpenQuizModal,
  onOpenHistoryModal,
  onOpenSettingsModal,
  onOpenAboutModal,
  onOpenAuthModal,
  onOpenThemeModal,
  user
}) => {
  const { isDark, toggleLightDark, theme } = useTheme();

  if (!isOpen) return null;

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => {
        onNavigateHome();
        onClose();
      },
      active: activeView === 'home',
    },
    {
      id: 'explore',
      label: 'Explore Destinations',
      icon: Globe,
      action: () => {
        onNavigateExplore();
        onClose();
      },
      active: false,
    },
    {
      id: 'scan',
      label: 'Scan Landmark',
      icon: Camera,
      action: () => {
        onOpenScanModal();
        onClose();
      },
      highlight: true,
    },
    {
      id: 'saved',
      label: 'Saved Places',
      icon: Bookmark,
      action: () => {
        onOpenSavedModal();
        onClose();
      },
    },
    {
      id: 'quiz',
      label: 'Travel Quiz',
      icon: Sparkles,
      action: () => {
        onOpenQuizModal();
        onClose();
      },
    },
    {
      id: 'history',
      label: 'Recent Searches',
      icon: History,
      action: () => {
        onOpenHistoryModal();
        onClose();
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => {
        onOpenSettingsModal();
        onClose();
      },
    },
    {
      id: 'about',
      label: 'About App',
      icon: Info,
      action: () => {
        onOpenAboutModal();
        onClose();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 backdrop-blur-md transition-opacity animate-fade-in ${
          isDark ? 'bg-slate-950/80' : 'bg-black/30'
        }`}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-xs sm:max-w-sm flex flex-col justify-between h-full p-6 z-10 shadow-2xl backdrop-blur-2xl animate-slide-right border-r transition-colors duration-200 ${
          isDark
            ? 'bg-slate-950/95 border-slate-800/80 text-slate-100'
            : 'bg-[#FAF8F5]/98 border-[#E8E2DA] text-[#221F26]'
        }`}
      >
        {/* Header Section */}
        <div className="space-y-5">
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              isDark ? 'border-slate-800/80' : 'border-[#E8E2DA]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-2xl p-0.5 shadow-md flex items-center justify-center ${
                  isDark
                    ? 'bg-gradient-to-tr from-indigo-500 to-cyan-500 shadow-indigo-500/20'
                    : 'bg-[#E8E2F4] border border-[#D5CBE6]'
                }`}
              >
                <div
                  className={`h-full w-full rounded-[14px] flex items-center justify-center ${
                    isDark ? 'bg-slate-950' : 'bg-[#FAF8F5]'
                  }`}
                >
                  <Compass className={`h-5 w-5 ${isDark ? 'text-cyan-400' : 'text-[#8C7FA3]'}`} />
                </div>
              </div>
              <div>
                <h2 className={`text-base font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#221F26]'}`}>
                  Ask The Place
                </h2>
                <p className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-indigo-400' : 'text-[#8C7FA3]'}`}>
                  AI Travel Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'bg-white border-[#E8E2DA] text-[#686273] hover:text-[#221F26] hover:bg-[#E8E2F4]'
              }`}
              title="Close Navigation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Theme Quick Toggle & Palette Button */}
          <div
            className={`p-3 rounded-2xl border flex items-center justify-between gap-2 shadow-xs transition-colors ${
              isDark
                ? 'bg-slate-900/80 border-slate-800'
                : 'bg-white/80 border-[#E8E2DA]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <button
                onClick={toggleLightDark}
                className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-cyan-300'
                    : 'bg-[#FAF8F5] border-[#E8E2DA] text-[#221F26] hover:bg-[#E8E2F4]'
                }`}
                title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
              >
                {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-[#8C7FA3]" />}
              </button>
              <div>
                <div className={`text-xs font-bold capitalize ${isDark ? 'text-white' : 'text-[#221F26]'}`}>
                  {theme} Mode
                </div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-[#686273]'}`}>
                  {isDark ? 'Dark Mode Active' : 'Light Pastel Active'}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onOpenThemeModal();
                onClose();
              }}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95 ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-cyan-400 hover:text-cyan-300'
                  : 'bg-[#8C7FA3] border-[#8C7FA3] text-white hover:bg-[#796C91] shadow-xs'
              }`}
            >
              <Palette className="h-3.5 w-3.5" />
              <span>Themes</span>
            </button>
          </div>

          {/* User / Guest Account Box */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 shadow-xs transition-colors ${
              isDark
                ? 'bg-slate-900/80 border-slate-800'
                : 'bg-white/80 border-[#E8E2DA]'
            }`}
          >
            {user ? (
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-xl font-bold flex items-center justify-center text-xs shadow-xs ${
                    isDark
                      ? 'bg-gradient-to-tr from-indigo-500 to-sky-400 text-white'
                      : 'bg-[#8C7FA3] text-white'
                  }`}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="truncate">
                  <div className={`text-xs font-bold truncate ${isDark ? 'text-slate-100' : 'text-[#221F26]'}`}>
                    {user.name}
                  </div>
                  <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-[#686273]'}`}>
                    {user.email}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 w-full justify-between">
                <div className="flex items-center gap-2">
                  <Shield className={`h-4 w-4 ${isDark ? 'text-indigo-400' : 'text-[#8C7FA3]'}`} />
                  <span className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-[#221F26]'}`}>
                    Guest Explorer
                  </span>
                </div>
                <button
                  onClick={() => {
                    onOpenAuthModal();
                    onClose();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95 ${
                    isDark
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                      : 'bg-[#8C7FA3] hover:bg-[#796C91] text-white shadow-[#8C7FA3]/20'
                  }`}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2 max-h-[55vh] overflow-y-auto scrollbar-none pr-1">
            {navItems.map((item) => {
              const IconComp = item.icon;

              let buttonStyle = '';
              let iconStyle = '';

              if (item.active) {
                buttonStyle = isDark
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-lg shadow-indigo-500/25 font-bold scale-[1.02]'
                  : 'bg-[#8C7FA3] text-white shadow-sm font-bold scale-[1.02] border border-[#8C7FA3]';
                iconStyle = 'text-white';
              } else if (item.highlight) {
                buttonStyle = isDark
                  ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 hover:scale-[1.02] hover:shadow-md'
                  : 'bg-[#F6E3E8] text-[#221F26] border border-[#E8BECB]/60 hover:bg-[#F3D5DE] hover:scale-[1.02] hover:shadow-xs';
                iconStyle = isDark ? 'text-cyan-400' : 'text-[#8C7FA3]';
              } else {
                buttonStyle = isDark
                  ? 'text-slate-300 hover:bg-slate-900/90 hover:text-white border border-transparent hover:border-slate-800 hover:scale-[1.02] hover:shadow-md hover:backdrop-blur-md'
                  : 'text-[#5E5868] hover:bg-[#E8E2F4]/60 hover:text-[#221F26] border border-transparent hover:border-[#E8E2DA] hover:scale-[1.02] hover:shadow-xs hover:backdrop-blur-md';
                iconStyle = isDark
                  ? 'text-slate-400 group-hover:text-cyan-400'
                  : 'text-[#686273] group-hover:text-[#8C7FA3]';
              }

              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full p-3 rounded-2xl text-xs font-semibold transition-all duration-200 flex items-center justify-between group cursor-pointer active:scale-[0.98] ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp
                      className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${iconStyle}`}
                    />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div
          className={`pt-4 border-t text-[10px] space-y-1 transition-colors ${
            isDark
              ? 'border-slate-900 text-slate-500'
              : 'border-[#E8E2DA] text-[#9790A2]'
          }`}
        >
          <p>Powered by Gemini AI Travel Engine</p>
          <p>© {new Date().getFullYear()} Ask The Place • Premium Edition</p>
        </div>
      </div>
    </div>
  );
};
