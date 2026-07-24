import React from 'react';
import { useTheme } from '../ThemeContext';
import { ThemeMode } from '../types';
import { Palette, Sun, Moon, Check, X, Sparkles } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, themeOptions, toggleLightDark, isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 text-slate-100 relative shadow-2xl space-y-6 backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Palette className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Choose Theme</h2>
              <p className="text-xs text-slate-400">Personalize your Ask The Place visual experience</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Light / Dark Quick Switch Banner */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isDark ? 'bg-indigo-500/20 text-cyan-400' : 'bg-amber-500/20 text-amber-500'}`}>
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Quick Mode Toggle</h3>
              <p className="text-xs text-slate-400">Switch instantly between Light and Dark mode</p>
            </div>
          </div>

          <button
            onClick={toggleLightDark}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4" />
                <span>Switch to Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span>Switch to Dark</span>
              </>
            )}
          </button>
        </div>

        {/* Themes Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Available Color Themes</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {themeOptions.map((opt) => {
              const isSelected = theme === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => setTheme(opt.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Theme Color Preview Strip */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className={`h-4 w-4 rounded-full ${opt.previewAccent} border border-white/20 shadow-sm`} />
                      <span className="font-bold text-sm text-white">{opt.name}</span>
                    </div>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-cyan-500 text-slate-950">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{opt.description}</p>

                  {/* Visual Preview Box */}
                  <div className={`w-full h-8 rounded-lg ${opt.previewBg} p-1.5 flex items-center gap-1.5 border border-white/10`}>
                    <div className={`h-full w-12 rounded ${opt.previewCard}`} />
                    <div className={`h-2 w-8 rounded-full ${opt.previewAccent}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end border-t border-slate-800/80">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs border border-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
