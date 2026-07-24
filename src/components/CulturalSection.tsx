import React from 'react';
import { CulturalExplanation } from '../types';
import { BookOpen, Landmark, Sparkles, Feather, Columns, MessageSquare } from 'lucide-react';

interface CulturalSectionProps {
  culturalData: CulturalExplanation;
  landmarkName: string;
  onAskGemma?: (question: string) => void;
}

export const CulturalSection: React.FC<CulturalSectionProps> = ({ culturalData, landmarkName, onAskGemma }) => {
  if (!culturalData) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Cultural & Architectural Deep-Dive
            </h2>
            <p className="text-xs text-slate-400">
              Historical origin, design mastery, and cultural backstory of {landmarkName}
            </p>
          </div>
        </div>

        {onAskGemma && (
          <button
            onClick={() => onAskGemma(`Tell me more about the history, architecture, and cultural backstory of ${landmarkName}.`)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-cyan-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ask Gemma Cultural Insights</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Historical Significance */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3 text-cyan-400 font-bold text-sm">
              <Landmark className="h-4 w-4" />
              <span>Historical Origin</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {culturalData.history}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-3 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`Can you elaborate on the historical origin of ${landmarkName}? Context: ${culturalData.history}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                <span>Ask Gemma History Details</span>
              </button>
            </div>
          )}
        </div>

        {/* Architectural Design */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3 text-sky-400 font-bold text-sm">
              <Columns className="h-4 w-4" />
              <span>Architectural Mastery</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {culturalData.architecturalSignificance}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-3 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`Can you explain the architectural details and secret design elements of ${landmarkName}? Context: ${culturalData.architecturalSignificance}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-sky-400" />
                <span>Ask Gemma Architecture Details</span>
              </button>
            </div>
          )}
        </div>

        {/* Cultural Backstory */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3 text-indigo-400 font-bold text-sm">
              <Feather className="h-4 w-4" />
              <span>Cultural Backstory</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {culturalData.culturalBackstory}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-3 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`What is the cultural tradition and story behind ${landmarkName}? Context: ${culturalData.culturalBackstory}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
                <span>Ask Gemma Backstory</span>
              </button>
            </div>
          )}
        </div>

        {/* Symbolism */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3 text-teal-400 font-bold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>Symbolism & Legacy</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {culturalData.symbolism}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-3 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`What is the symbolic meaning and historical legacy of ${landmarkName}? Context: ${culturalData.symbolism}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-teal-400" />
                <span>Ask Gemma Symbolism</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
