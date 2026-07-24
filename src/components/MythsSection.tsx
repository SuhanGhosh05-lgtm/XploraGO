import React from 'react';
import { MythAndLegend } from '../types';
import { Flame, Ghost, Scroll, Sparkles, MessageSquare } from 'lucide-react';

interface MythsSectionProps {
  myths: MythAndLegend[];
  landmarkName: string;
  onAskGemma?: (question: string) => void;
}

export const MythsSection: React.FC<MythsSectionProps> = ({ myths, landmarkName, onAskGemma }) => {
  if (!myths || myths.length === 0) return null;

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'myth':
        return { label: 'Ancient Myth', bg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30', icon: Sparkles };
      case 'ghost_story':
        return { label: 'Ghost Tale', bg: 'bg-sky-500/10 text-sky-300 border-sky-500/30', icon: Ghost };
      case 'legend':
        return { label: 'Historical Legend', bg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30', icon: Flame };
      default:
        return { label: 'Local Folklore', bg: 'bg-teal-500/10 text-teal-300 border-teal-500/30', icon: Scroll };
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Local Myths, Legends & Secret Tales
            </h2>
            <p className="text-xs text-slate-400">
              Folk tales, mystical urban myths, and mysterious lore tied to {landmarkName}
            </p>
          </div>
        </div>

        {onAskGemma && (
          <button
            onClick={() => onAskGemma(`Can you tell me mysterious local legends or folklore about ${landmarkName}?`)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-cyan-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ask Gemma Folklore</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {myths.map((item, idx) => {
          const badge = getTypeBadge(item.type);
          const IconComp = badge.icon;

          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all relative overflow-hidden flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 ${badge.bg}`}>
                    <IconComp className="h-3 w-3" />
                    {badge.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Story #{idx + 1}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.story}
                </p>
              </div>

              {onAskGemma && (
                <div className="pt-3 border-t border-slate-900 flex justify-end">
                  <button
                    onClick={() => onAskGemma(`Tell me the secret details and local lore behind the legend "${item.title}" at ${landmarkName}.`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Ask Gemma Legend Secrets</span>
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
