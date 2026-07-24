import React from 'react';
import { Sparkles, Search, Camera, Compass, MapPin, ArrowRight, ShieldCheck, Globe2, Landmark } from 'lucide-react';
import { AnimatedGlobe } from './AnimatedGlobe';

interface HeroSectionProps {
  onSearchFocus: () => void;
  onOpenScanModal: () => void;
  onSelectSampleLocation: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchFocus,
  onOpenScanModal,
  onSelectSampleLocation,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-white/80 dark:bg-slate-900/60 border border-[#E8E2DA] dark:border-slate-800/80 p-6 sm:p-10 lg:p-14 shadow-2xl backdrop-blur-2xl transition-colors duration-300 min-h-[78vh] lg:min-h-[82vh] flex flex-col justify-center">
      {/* Background Ambient Glow Lights */}
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-[#8C7FA3]/15 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-[#D58EBF]/15 dark:bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(243,213,222,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
        {/* Left Column: Headline, Subtitle, CTAs */}
        <div className="lg:col-span-7 space-y-7 text-left">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8E2F4]/70 dark:bg-indigo-500/10 border border-[#D5CBE6] dark:border-indigo-500/20 text-[#8C7FA3] dark:text-indigo-300 text-xs font-bold shadow-xs backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-[#8C7FA3] dark:text-cyan-400" />
            <span>Contextual AI Travel & Cultural Intelligence</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#221F26] dark:text-white tracking-tight leading-[1.12]">
              Unveil World Wonders with{' '}
              <span className="bg-gradient-to-r from-[#8C7FA3] via-[#A193B8] to-[#D58EBF] dark:from-indigo-400 dark:via-sky-300 dark:to-cyan-400 bg-clip-text text-transparent">
                Local Cultural Intelligence
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#686273] dark:text-slate-300 max-w-2xl leading-relaxed pt-1">
              Discover secret neighborhood cafés, exact golden-hour photo angles, authentic ancient folklore, and respectful etiquette for any landmark, university, or city worldwide.
            </p>
          </div>

          {/* Hero Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 max-w-xl">
            <button
              onClick={onSearchFocus}
              className="flex-1 px-6 py-4 rounded-2xl bg-[#8C7FA3] hover:bg-[#796C91] dark:bg-gradient-to-r dark:from-indigo-600 dark:via-sky-600 dark:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-[#8C7FA3]/20 dark:shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="h-4.5 w-4.5 text-white group-hover:scale-110 transition-transform" />
              <span>Search Any Place or Landmark</span>
              <ArrowRight className="h-4.5 w-4.5 ml-auto sm:ml-0 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenScanModal}
              className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-950 hover:bg-[#F6E3E8]/50 dark:hover:bg-slate-800 border border-[#E8E2DA] dark:border-slate-800 text-[#221F26] dark:text-slate-200 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:border-[#8C7FA3] dark:hover:border-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Camera className="h-4.5 w-4.5 text-[#8C7FA3] dark:text-cyan-400" />
              <span>Scan Photo</span>
            </button>
          </div>

          {/* Quick Destination Pill Shortcuts */}
          <div className="pt-2 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#9790A2] dark:text-slate-400 flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5 text-[#8C7FA3] dark:text-cyan-400" />
              <span>Popular Destinations:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Kolkata, WB', query: 'Victoria Memorial, Kolkata' },
                { name: 'Howrah Bridge', query: 'Howrah Bridge, Kolkata' },
                { name: 'Darjeeling, WB', query: 'Darjeeling' },
                { name: 'Sundarbans, WB', query: 'Sundarbans' },
                { name: 'Kyoto, Japan', query: 'Kyoto' },
                { name: 'Rome, Italy', query: 'Rome' },
                { name: 'Paris, France', query: 'Paris' },
                { name: 'Taj Mahal, India', query: 'Taj Mahal' },
              ].map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => onSelectSampleLocation(dest.query)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-950/80 hover:bg-[#E8E2F4] dark:hover:bg-slate-800 border border-[#E8E2DA] dark:border-slate-800/80 text-[#221F26] dark:text-slate-300 hover:text-[#221F26] dark:hover:text-white text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 hover:border-[#8C7FA3] dark:hover:border-indigo-500/30 hover:scale-105 active:scale-95 shadow-xs"
                >
                  <MapPin className="h-3 w-3 text-[#8C7FA3] dark:text-cyan-400" />
                  <span>{dest.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="pt-5 border-t border-[#E8E2DA] dark:border-slate-800/60 grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#221F26] dark:text-white">10,000+</div>
              <div className="text-xs font-medium text-[#686273] dark:text-slate-400">Landmarks Indexed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#8C7FA3] dark:text-indigo-400">Gemma 4</div>
              <div className="text-xs font-medium text-[#686273] dark:text-slate-400">Cultural Reasoning</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#8C7FA3] dark:text-cyan-400">100%</div>
              <div className="text-xs font-medium text-[#686273] dark:text-slate-400">Local Neighborhoods</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Animated Globe Scene */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <AnimatedGlobe onSelectSampleLocation={onSelectSampleLocation} />
        </div>
      </div>
    </div>
  );
};
