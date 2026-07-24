import React, { useState } from 'react';
import { TravelPersonality } from '../types';
import { Sparkles, X, Compass, Coffee, Camera, Users, Heart, CheckCircle2, ArrowRight, ArrowLeft, Trophy, MapPin, Check } from 'lucide-react';

interface PersonalityQuizModalProps {
  currentPersonality: TravelPersonality | null;
  onSavePersonality: (personality: TravelPersonality) => void;
  onClose: () => void;
}

export const PersonalityQuizModal: React.FC<PersonalityQuizModalProps> = ({
  currentPersonality,
  onSavePersonality,
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const [completedPersona, setCompletedPersona] = useState<TravelPersonality | null>(null);

  // Selected state for quiz answers
  const [vibe, setVibe] = useState<'foodie' | 'photographer' | 'quiet_seeker' | 'family' | 'culture_explorer'>(
    currentPersonality?.style || 'foodie'
  );
  const [pace, setPace] = useState<'relaxed' | 'moderate' | 'fast_paced'>(
    currentPersonality?.pace || 'relaxed'
  );
  const [companion, setCompanion] = useState<'solo' | 'couple' | 'family' | 'friends'>(
    currentPersonality?.travelCompanion || 'solo'
  );

  const calculatePersona = (): TravelPersonality => {
    let archetype = 'Artisanal Alleyway Flâneur';
    let traits: string[] = [];
    let description = '';

    if (vibe === 'foodie') {
      archetype = companion === 'family' ? 'Family Foodie Adventurer' : 'Artisanal Coffee & Street Bite Seeker';
      traits = ['Culinary Explorer', 'Micro-Roastery Enthusiast', 'Local Flavor Collector'];
      description = 'You seek out authentic kitchen secrets, heritage recipes, and quiet coffee courtyards off the main tourist track.';
    } else if (vibe === 'photographer') {
      archetype = 'Golden Hour & Geometric Framing Specialist';
      traits = ['Cinematic Lens', 'Sunrise Early Riser', 'Secret Alleyway Perspective'];
      description = 'You travel for golden reflections, dramatic architecture lines, and quiet vantage spots untouched by crowds.';
    } else if (vibe === 'quiet_seeker') {
      archetype = 'Serene Sanctuary & Courtyard Dreamer';
      traits = ['Peaceful Mind', 'Hidden Garden Lover', 'Quiet Bench Reader'];
      description = 'You value tranquility, secret convent gardens, and quiet teahouses where you can absorb local atmosphere.';
    } else if (vibe === 'family') {
      archetype = 'Safe & Wholesome Local Family Trailblazer';
      traits = ['Interactive Crafts', 'Shaded Playground Explorer', 'Kid-Safe Local Delights'];
      description = 'You love discovering local playgrounds, puppet shows, and hands-on artisan workshops that create lasting family memories.';
    } else {
      archetype = 'Heritage History & Flea Antiquities Explorer';
      traits = ['Artisan Crafts', 'Historical Curiosity', 'Flea Market Bargain Finder'];
      description = 'You thrive on 400-year-old market stalls, antique copperware, and centuries-old local stories.';
    }

    return {
      archetype,
      style: vibe,
      pace,
      travelCompanion: companion,
      traits,
      description,
    };
  };

  const handleFinishQuestions = () => {
    const persona = calculatePersona();
    setCompletedPersona(persona);
    setStep(3); // Go to confirmation page
  };

  const handleApplyPersonaAndExplore = () => {
    if (completedPersona) {
      onSavePersonality(completedPersona);
    } else {
      onSavePersonality(calculatePersona());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-100 relative shadow-2xl space-y-6 backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Travel Style Quiz</h2>
              <p className="text-xs text-slate-400">Personalize Gemma's local travel recommendations</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Question Steps */}
        {step === 0 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Question 1 of 3</span>
              <h3 className="text-lg font-bold text-white">What is your primary travel vibe?</h3>
              <p className="text-xs text-slate-400">This helps Gemma tailor cafés, street food, and secret spots for you.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'foodie', label: 'Foodie & Coffee Lover', desc: 'Hidden cafes, street food, micro-roasters', icon: Coffee },
                { id: 'photographer', label: 'Photography & Sunset Hunter', desc: 'Golden hour vantage points & geometric views', icon: Camera },
                { id: 'quiet_seeker', label: 'Quiet Sanctuary Wanderer', desc: 'Hidden convent gardens & quiet benches', icon: Compass },
                { id: 'family', label: 'Family & Local Playgrounds', desc: 'Kid-friendly crafts, carousels, safe parks', icon: Users },
                { id: 'culture_explorer', label: 'History & Flea Markets', desc: 'Antiques, artisanal leather, local markets', icon: Heart },
              ].map((opt) => {
                const IconComp = opt.icon;
                const isSelected = vibe === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => setVibe(opt.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                      isSelected
                        ? 'bg-indigo-600/20 border-cyan-400 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-cyan-400/50'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <IconComp className={`h-5 w-5 transition-colors ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                      {isSelected ? (
                        <CheckCircle2 className="h-5 w-5 text-cyan-400 fill-cyan-400/20" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-700" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{opt.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-2 text-xs sm:text-sm shadow-md hover:shadow-indigo-500/30 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Question 2 of 3</span>
              <h3 className="text-lg font-bold text-white">How do you prefer to explore a neighborhood?</h3>
              <p className="text-xs text-slate-400">Controls walking route lengths and suggested schedule speed.</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'relaxed', label: 'Slow & Relaxed', desc: 'Leisurely coffee breaks, quiet park sitting, 30-min walking loops' },
                { id: 'moderate', label: 'Balanced & Steady', desc: 'Mix of walking, local eats, and scenic viewpoints (1 hour loops)' },
                { id: 'fast_paced', label: 'Energetic Explorer', desc: 'Cover multiple neighborhood corners and market streets quickly' },
              ].map((opt) => {
                const isSelected = pace === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => setPace(opt.id as any)}
                    className={`p-4 rounded-2xl border w-full text-left transition-all duration-200 flex items-center justify-between cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
                      isSelected
                        ? 'bg-indigo-600/20 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400/50'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900/80'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-white">{opt.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 fill-cyan-400/20" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(0)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-2 text-xs sm:text-sm shadow-md hover:shadow-indigo-500/30 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Question 3 of 3</span>
              <h3 className="text-lg font-bold text-white">Who is traveling with you?</h3>
              <p className="text-xs text-slate-400">Tailors safety, seating, and activity recommendations.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'solo', label: 'Solo Adventurer', desc: 'Independent, flexible, quiet seating' },
                { id: 'couple', label: 'Romantic Couple', desc: 'Sunset spots, intimate cafes, scenic walks' },
                { id: 'family', label: 'Family with Kids', desc: 'Safe parks, playgrounds, kid-friendly food' },
                { id: 'friends', label: 'Group of Friends', desc: 'Lively markets, food sharing, photo spots' },
              ].map((opt) => {
                const isSelected = companion === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => setCompanion(opt.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                      isSelected
                        ? 'bg-indigo-600/20 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400/50'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900/80'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-white">{opt.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{opt.desc}</div>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-1 fill-cyan-400/20" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-slate-700 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleFinishQuestions}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold transition-all flex items-center gap-2 text-xs sm:text-sm shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Calculate Persona</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Quiz Completion Confirmation Page */}
        {step === 3 && completedPersona && (
          <div className="space-y-6 text-center animate-fade-in py-2">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-cyan-400 p-0.5 mx-auto shadow-xl shadow-indigo-500/30 flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <Trophy className="h-8 w-8 text-cyan-400" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" />
                <span>Quiz Completed Successfully</span>
              </span>
              <h3 className="text-2xl font-black text-white">{completedPersona.archetype}</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {completedPersona.description}
              </p>
            </div>

            {/* Persona Traits */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {completedPersona.traits.map((trait, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  <span>{trait}</span>
                </span>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 space-y-1 max-w-md mx-auto">
              <p className="font-bold text-white flex items-center justify-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                <span>Personalized Intelligence Unlocked</span>
              </p>
              <p className="text-slate-300">Gemma will now prioritize local secret spots, cafes, and walking routes matching your travel persona.</p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setStep(0)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold"
              >
                Retake Quiz
              </button>
              <button
                onClick={handleApplyPersonaAndExplore}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Personalized Recommendations</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
