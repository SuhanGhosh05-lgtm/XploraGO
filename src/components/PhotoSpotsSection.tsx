import React from 'react';
import { PhotoLocation } from '../types';
import { Camera, Clock, Sliders, MapPin, Sparkles, MessageSquare } from 'lucide-react';

interface PhotoSpotsSectionProps {
  photoSpots: PhotoLocation[];
  landmarkName: string;
  onAskGemma?: (question: string) => void;
}

export const PhotoSpotsSection: React.FC<PhotoSpotsSectionProps> = ({ photoSpots, landmarkName, onAskGemma }) => {
  if (!photoSpots || photoSpots.length === 0) return null;

  const getCrowdBadge = (crowd: string) => {
    switch (crowd) {
      case 'Low':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
      case 'High':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      default:
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Best Photo Spots & Golden Hour Vantage Points
            </h2>
            <p className="text-xs text-slate-400">
              Exact camera locations, lens framing tips, and crowd avoidance for {landmarkName}
            </p>
          </div>
        </div>

        {onAskGemma && (
          <button
            onClick={() => onAskGemma(`What are the best secret photography angles and golden hour spots at ${landmarkName}?`)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-cyan-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ask Gemma Photo Tips</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {photoSpots.map((spot, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-sm">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{spot.spotName}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold whitespace-nowrap ${getCrowdBadge(spot.crowdLevel)}`}>
                  {spot.crowdLevel} Crowd
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                {spot.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span className="font-semibold text-slate-200">{spot.bestTime}</span>
              </div>

              <div className="flex items-start gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/60">
                <Sliders className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-300">{spot.cameraTip}</span>
              </div>

              {onAskGemma && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onAskGemma(`What are the best camera settings, lens angles, and lighting advice for photo spot "${spot.spotName}" at ${landmarkName}?`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Ask Gemma Photo Advice</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
