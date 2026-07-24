import React from 'react';
import { VisitingTimeInfo } from '../types';
import { Calendar, Clock, Sun, Ticket, CloudSun, Hourglass, Sparkles, MessageSquare } from 'lucide-react';

interface VisitingTimeSectionProps {
  visitingInfo: VisitingTimeInfo;
  landmarkName: string;
  onAskGemma?: (question: string) => void;
}

export const VisitingTimeSection: React.FC<VisitingTimeSectionProps> = ({ visitingInfo, landmarkName, onAskGemma }) => {
  if (!visitingInfo) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Best Visiting Times & Ticket Strategies
            </h2>
            <p className="text-xs text-slate-400">
              Optimal hours, crowd schedules, and ticket hacks for visiting {landmarkName}
            </p>
          </div>
        </div>

        {onAskGemma && (
          <button
            onClick={() => onAskGemma(`What is the best time of day to visit ${landmarkName} and how do I skip lines?`)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-cyan-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ask Gemma Ticket Hacks</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Best Season */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <Sun className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Best Season</span>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{visitingInfo.bestSeason}</p>
          </div>
        </div>

        {/* Best Time of Day */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Ideal Hour</span>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{visitingInfo.bestTimeOfDay}</p>
          </div>
        </div>

        {/* Average Duration */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
            <Hourglass className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Est. Duration</span>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{visitingInfo.averageDuration}</p>
          </div>
        </div>
      </div>

      {/* Detail Cards: Peak Hours, Ticket Advice, Weather Tip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Ticket & Booking Advice */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
              <Ticket className="h-4 w-4" />
              <span>Ticket & Booking Strategy</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {visitingInfo.ticketAdvice}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-2 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`Can you guide me step-by-step on buying tickets and avoiding long queues at ${landmarkName}?`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                <span>Ask Gemma Ticket Advice</span>
              </button>
            </div>
          )}
        </div>

        {/* Weather & Peak Hours */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
              <CloudSun className="h-4 w-4" />
              <span>Weather & Crowd Avoidance</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-1">
              <strong className="text-white">Avoid Peak Hours:</strong> {visitingInfo.peakHours}.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Weather Advice:</strong> {visitingInfo.weatherTip}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-2 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`What are the crowd avoidance hacks and weather preparation tips for visiting ${landmarkName}?`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
                <span>Ask Gemma Crowd Hacks</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
