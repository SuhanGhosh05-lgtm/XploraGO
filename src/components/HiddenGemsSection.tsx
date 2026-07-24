import React from 'react';
import { HiddenGem } from '../types';
import { Compass, Utensils, Eye, Landmark, Navigation, Sparkles, MessageSquare } from 'lucide-react';

interface HiddenGemsSectionProps {
  hiddenGems: HiddenGem[];
  landmarkName: string;
  onAskGemma?: (question: string) => void;
}

export const HiddenGemsSection: React.FC<HiddenGemsSectionProps> = ({ hiddenGems, landmarkName, onAskGemma }) => {
  if (!hiddenGems || hiddenGems.length === 0) return null;

  const getGemIcon = (type: string) => {
    switch (type) {
      case 'eatery':
        return { icon: Utensils, label: 'Local Eatery', color: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20' };
      case 'viewpoint':
        return { icon: Eye, label: 'Secret Viewpoint', color: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20' };
      case 'cultural':
        return { icon: Landmark, label: 'Cultural Spot', color: 'text-sky-300 bg-sky-500/10 border-sky-500/20' };
      default:
        return { icon: Compass, label: 'Nature Spot', color: 'text-teal-300 bg-teal-500/10 border-teal-500/20' };
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Nearby Hidden Gems & Secret Eats
            </h2>
            <p className="text-xs text-slate-400">
              Off-the-beaten-path viewpoints, local cafes, and quiet corners within short walking distance of {landmarkName}
            </p>
          </div>
        </div>

        {onAskGemma && (
          <button
            onClick={() => onAskGemma(`What are the most authentic hidden gems and local food spots within walking distance of ${landmarkName}?`)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-cyan-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ask Gemma Gem Advice</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {hiddenGems.map((gem, idx) => {
          const gemStyle = getGemIcon(gem.type);
          const IconComp = gemStyle.icon;

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 ${gemStyle.color}`}>
                    <IconComp className="h-3 w-3" />
                    {gemStyle.label}
                  </span>

                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    <Navigation className="h-3 w-3 text-cyan-400" />
                    {gem.distance}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white mb-2">
                  {gem.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {gem.description}
                </p>
              </div>

              {onAskGemma && (
                <div className="pt-3 border-t border-slate-900 flex justify-end">
                  <button
                    onClick={() => onAskGemma(`Tell me more about the hidden gem "${gem.name}" near ${landmarkName}. How do I get there and what makes it special?`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Ask Gemma Gem Details</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
