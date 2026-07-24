import React, { useState } from 'react';
import { X, Settings, Check, Palette, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, themeOptions, isDark, toggleLightDark } = useTheme();
  const [currency, setCurrency] = useState('USD ($)');
  const [units, setUnits] = useState('Metric (km, m)');
  const [aiTone, setAiTone] = useState('Local Expert Concierge');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-100 relative shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Platform Settings</h2>
              <p className="text-xs text-slate-400">Tailor your AI travel experience & appearance</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Theme Selector Section */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5" />
                <span>Visual Theme Palette</span>
              </label>
              <button
                type="button"
                onClick={toggleLightDark}
                className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1"
              >
                {isDark ? <Sun className="h-3 w-3 text-amber-400" /> : <Moon className="h-3 w-3 text-indigo-400" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {themeOptions.map((opt) => {
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-500/20 border-indigo-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${opt.previewAccent}`} />
                      <span className="text-xs truncate">{opt.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Preferred Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>JPY (¥)</option>
              <option>GBP (£)</option>
              <option>INR (₹)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Distance Units</label>
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option>Metric (km, m)</option>
              <option>Imperial (miles, ft)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Gemma AI Persona Tone</label>
            <select
              value={aiTone}
              onChange={(e) => setAiTone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option>Local Expert Concierge</option>
              <option>Artistic Historian</option>
              <option>Relaxed Backpacker</option>
              <option>Luxury Private Guide</option>
            </select>
          </div>
        </div>

        {/* Action */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Check className="h-4 w-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
