import React from 'react';
import { TouristMistake } from '../types';
import { ShieldAlert, AlertTriangle, Lightbulb, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';

interface TouristMistakesSectionProps {
  mistakes: TouristMistake[];
  landmarkName: string;
  onAskGemma?: (question: string) => void;
}

export const TouristMistakesSection: React.FC<TouristMistakesSectionProps> = ({ mistakes, landmarkName, onAskGemma }) => {
  if (!mistakes || mistakes.length === 0) return null;

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-rose-950/20 border-rose-500/30',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          icon: ShieldAlert,
          titleColor: 'text-rose-300',
        };
      case 'warning':
        return {
          bg: 'bg-indigo-950/20 border-indigo-500/30',
          badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
          icon: AlertTriangle,
          titleColor: 'text-indigo-300',
        };
      default:
        return {
          bg: 'bg-sky-950/20 border-sky-500/30',
          badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          icon: Lightbulb,
          titleColor: 'text-sky-300',
        };
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Common Tourist Mistakes & Scams to Avoid
            </h2>
            <p className="text-xs text-slate-400">
              Avoid overpriced traps, queue pitfalls, and tourist scams at {landmarkName}
            </p>
          </div>
        </div>

        {onAskGemma && (
          <button
            onClick={() => onAskGemma(`What common tourist traps or scams should I be aware of when visiting ${landmarkName}?`)}
            className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-rose-400" />
            <span>Ask Gemma Trap Hacks</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mistakes.map((item, idx) => {
          const style = getSeverityStyle(item.severity);
          const IconComp = style.icon;

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${style.bg} transition-all flex flex-col justify-between space-y-4`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <IconComp className="h-4 w-4 shrink-0 text-rose-400" />
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {item.severity}
                    </span>
                  </div>
                </div>

                <h3 className={`font-bold text-sm sm:text-base mb-2 ${style.titleColor}`}>
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="space-y-3">
                {/* Better Alternative Box */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Pro Tip / Local Alternative:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {item.alternative}
                  </p>
                </div>

                {onAskGemma && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => onAskGemma(`How do I avoid the tourist trap "${item.title}" at ${landmarkName}? What are the local alternatives?`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-rose-400" />
                      <span>Ask Gemma Trap Advice</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
