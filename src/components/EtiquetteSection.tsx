import React from 'react';
import { LocalEtiquetteInfo } from '../types';
import { ShieldCheck, CheckCircle2, XCircle, Shirt, Camera, HeartHandshake, Sparkles, MessageSquare } from 'lucide-react';

interface EtiquetteSectionProps {
  etiquette: LocalEtiquetteInfo;
  landmarkName: string;
  onAskGemma?: (question: string) => void;
}

export const EtiquetteSection: React.FC<EtiquetteSectionProps> = ({ etiquette, landmarkName, onAskGemma }) => {
  if (!etiquette) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Local Cultural Etiquette & Protocols
            </h2>
            <p className="text-xs text-slate-400">
              Respectful behavior, dress codes, hand gestures, and photo customs at {landmarkName}
            </p>
          </div>
        </div>

        {onAskGemma && (
          <button
            onClick={() => onAskGemma(`What are the essential dress code rules, tipping habits, and cultural customs for visiting ${landmarkName}?`)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-cyan-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ask Gemma Etiquette Rules</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DOs List */}
        <div className="p-5 rounded-2xl bg-teal-950/20 border border-teal-500/20 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>DOs (Respectful Practices)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {etiquette.dos?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {onAskGemma && (
            <div className="pt-2 border-t border-teal-500/20 flex justify-end">
              <button
                onClick={() => onAskGemma(`Can you explain local respectful customs and polite greetings when visiting ${landmarkName}?`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-teal-400" />
                <span>Ask Gemma Respectful Dos</span>
              </button>
            </div>
          )}
        </div>

        {/* DON'Ts List */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
              <XCircle className="h-4 w-4" />
              <span>DON'Ts (Cultural Faux Pas)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {etiquette.donts?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {onAskGemma && (
            <div className="pt-2 border-t border-rose-500/20 flex justify-end">
              <button
                onClick={() => onAskGemma(`What are offensive gestures, taboo behaviors, or cultural mistakes to avoid at ${landmarkName}?`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5 text-rose-400" />
                <span>Ask Gemma Cultural Taboos</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dress Code, Photo Rules, Tipping */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
              <Shirt className="h-4 w-4" />
              <span>Dress Code Guidance</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {etiquette.dressCode}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-2 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`What should I wear when visiting ${landmarkName}? What is the dress code?`)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-[11px] font-medium transition-all flex items-center gap-1"
              >
                <MessageSquare className="h-3 w-3 text-cyan-400" />
                <span>Dress Code Tips</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs mb-1">
              <Camera className="h-4 w-4" />
              <span>Photography Protocol</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {etiquette.photographyRules}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-2 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`Are tripods, flash photography, or drones allowed at ${landmarkName}?`)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-[11px] font-medium transition-all flex items-center gap-1"
              >
                <MessageSquare className="h-3 w-3 text-teal-400" />
                <span>Photo Rules</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1">
              <HeartHandshake className="h-4 w-4" />
              <span>Tipping & Gesture Custom</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {etiquette.tippingAndBehavior}
            </p>
          </div>

          {onAskGemma && (
            <div className="pt-2 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => onAskGemma(`What is the local tipping expectation and polite hand gestures at ${landmarkName}?`)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-[11px] font-medium transition-all flex items-center gap-1"
              >
                <MessageSquare className="h-3 w-3 text-indigo-400" />
                <span>Tipping Custom</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
