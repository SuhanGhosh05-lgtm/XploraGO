import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, ThemeOption } from './types';

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Dark Slate',
    category: 'dark',
    description: 'Deep twilight slate canvas with vibrant cyan and indigo accents.',
    previewBg: 'bg-slate-950',
    previewCard: 'bg-slate-900 border-slate-800',
    previewAccent: 'bg-cyan-500',
  },
  {
    id: 'light',
    name: 'Light Alpine',
    category: 'light',
    description: 'Clean, crisp light canvas with high-contrast text and sky blue highlights.',
    previewBg: 'bg-slate-50',
    previewCard: 'bg-white border-slate-200',
    previewAccent: 'bg-sky-600',
  },
  {
    id: 'midnight',
    name: 'Midnight Obsidian',
    category: 'dark',
    description: 'Pitch black obsidian canvas with electric violet and neon cyan glows.',
    previewBg: 'bg-zinc-950',
    previewCard: 'bg-zinc-900 border-zinc-800',
    previewAccent: 'bg-violet-500',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    category: 'dark',
    description: 'Warm dusk parchment and bronze canvas with golden amber highlights.',
    previewBg: 'bg-stone-950',
    previewCard: 'bg-stone-900 border-stone-800',
    previewAccent: 'bg-amber-500',
  },
  {
    id: 'emerald',
    name: 'Nordic Emerald',
    category: 'dark',
    description: 'Deep northern forest aurora with jade green and mint accents.',
    previewBg: 'bg-emerald-950',
    previewCard: 'bg-emerald-900 border-emerald-800',
    previewAccent: 'bg-emerald-400',
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleLightDark: () => void;
  isDark: boolean;
  themeOptions: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem('ask_the_place_theme');
      if (stored && ['dark', 'light', 'midnight', 'amber', 'emerald'].includes(stored)) {
        return stored as ThemeMode;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem('ask_the_place_theme', mode);
    } catch (e) {
      console.error('Failed to save theme setting:', e);
    }
  };

  const toggleLightDark = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    // Set attribute on document element for CSS selection
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const isDark = theme !== 'light';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleLightDark,
        isDark,
        themeOptions: THEME_OPTIONS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
