import React, { useState, useEffect } from 'react';
import { LandmarkDetails } from '../types';
import { MapPin, Bookmark, Volume2, VolumeX, Sparkles, ShieldCheck, Share2, Check, ArrowLeft, Globe } from 'lucide-react';
import { getLandmarkImageUrl, getRealLandmarkImageUrlAsync } from '../utils/landmarkImages';

interface LandmarkHeroProps {
  landmark: LandmarkDetails;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenGemmaChat: (initialQuestion?: string) => void;
  onBackToHome: () => void;
}

export const LandmarkHero: React.FC<LandmarkHeroProps> = ({
  landmark,
  isBookmarked,
  onToggleBookmark,
  onOpenGemmaChat,
  onBackToHome,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [displayImg, setDisplayImg] = useState<string>(
    landmark.imageUrl || getLandmarkImageUrl(landmark.name, landmark.location, landmark.imageUrl)
  );

  useEffect(() => {
    let isMounted = true;
    const initial = landmark.imageUrl || getLandmarkImageUrl(landmark.name, landmark.location, landmark.imageUrl);
    setDisplayImg(initial);

    if (
      landmark.name &&
      (!initial.includes('wikimedia.org') &&
        !initial.includes('wikipedia.org') &&
        !initial.startsWith('data:image'))
    ) {
      getRealLandmarkImageUrlAsync(landmark.name, landmark.location, initial).then((wikiUrl) => {
        if (isMounted && wikiUrl) {
          setDisplayImg(wikiUrl);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [landmark.name, landmark.location, landmark.imageUrl]);

  // Audio Speech Synthesis for instant voice narrative
  const playAudioSummary = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      const text = `${landmark.name}, located in ${landmark.location}. ${landmark.tagline}. ${landmark.culturalExplanation.history}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-900/60 border border-slate-800/80 shadow-2xl mb-8 backdrop-blur-xl">
      {/* Background Image with Clean Neutral Vignette for Readability */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-950">
        <img
          src={displayImg}
          alt={landmark.name}
          className="w-full h-full object-cover object-center transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Top Navigation & Badges Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="px-3.5 py-1.5 rounded-full bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md text-xs font-bold text-slate-200 hover:text-white border border-slate-800 transition-all flex items-center gap-1.5 shadow-lg group"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>All Destinations</span>
          </button>

          <div className="flex items-center gap-2">
            {(displayImg.includes('wikimedia.org') || displayImg.includes('wikipedia.org')) && (
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-xs font-semibold text-emerald-300 border border-emerald-500/30 items-center gap-1.5 shadow-lg">
                <Globe className="h-3.5 w-3.5 text-emerald-400" />
                Wikipedia Photo
              </span>
            )}

            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-xs font-semibold text-cyan-300 border border-indigo-500/30 items-center gap-1.5 shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              {landmark.category}
            </span>

            {landmark.confidence > 0 && (
              <span className="px-3 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md text-xs font-semibold text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                {landmark.confidence}% Scan Match
              </span>
            )}

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 backdrop-blur-md transition-colors"
              title="Share Landmark Guide"
            >
              {copied ? <Check className="h-4 w-4 text-cyan-400" /> : <Share2 className="h-4 w-4" />}
            </button>

            <button
              onClick={onToggleBookmark}
              className={`p-2.5 rounded-xl backdrop-blur-md border transition-all ${
                isBookmarked
                  ? 'bg-indigo-600 text-white border-indigo-400 font-bold shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950/80 hover:bg-slate-900 text-slate-300 border-slate-800'
              }`}
              title={isBookmarked ? 'Saved to bookmarks' : 'Save to bookmarks'}
            >
              <Bookmark className="h-4 w-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Hero Title and Info */}
        <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 text-white">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span>{landmark.location}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
            {landmark.name}
          </h1>

          <p className="text-xs sm:text-base text-slate-300 font-medium italic max-w-3xl line-clamp-2">
            "{landmark.tagline}"
          </p>

          {/* Quick Action Bar */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={playAudioSummary}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isPlayingAudio
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 animate-pulse'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="h-4 w-4 text-white" />
                  <span>Pause Audio Guide</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 text-cyan-400" />
                  <span>Listen to Audio Guide</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenGemmaChat()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-500/20 transition-all"
            >
              <Sparkles className="h-4 w-4 text-white" />
              <span>Ask Gemma Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stat Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 bg-slate-950 text-slate-300 p-4 text-xs font-medium border-t border-slate-800/80">
        <div className="p-2 sm:p-3">
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Best Visit Time</span>
          <span className="font-bold text-slate-200 text-xs sm:text-sm">{landmark.bestVisitingTime?.bestTimeOfDay || 'Sunrise / Early Morning'}</span>
        </div>
        <div className="p-2 sm:p-3">
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Best Season</span>
          <span className="font-semibold text-slate-200 text-xs sm:text-sm">{landmark.bestVisitingTime?.bestSeason || 'Spring & Autumn'}</span>
        </div>
        <div className="p-2 sm:p-3">
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Est. Duration</span>
          <span className="font-semibold text-slate-200 text-xs sm:text-sm">{landmark.bestVisitingTime?.averageDuration || '2 - 3 Hours'}</span>
        </div>
        <div className="p-2 sm:p-3">
          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Photo Angles</span>
          <span className="font-bold text-cyan-400 text-xs sm:text-sm">{landmark.bestPhotoLocations?.length || 3} Golden Spots</span>
        </div>
      </div>
    </div>
  );
};
