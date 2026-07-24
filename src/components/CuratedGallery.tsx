import React, { useState, useEffect } from 'react';
import { CURATED_LANDMARKS } from '../data/curatedLandmarks';
import { CuratedLandmarkSample, LandmarkDetails } from '../types';
import { Compass, MapPin, Sparkles, ChevronRight, ShieldAlert, Camera, BookOpen, Globe } from 'lucide-react';
import { getLandmarkImageUrl, getRealLandmarkImageUrlAsync } from '../utils/landmarkImages';

interface CuratedGalleryProps {
  onSelectLandmark: (landmark: LandmarkDetails) => void;
}

const CuratedCard: React.FC<{
  item: CuratedLandmarkSample;
  onSelectLandmark: (landmark: LandmarkDetails) => void;
}> = ({ item, onSelectLandmark }) => {
  const initialUrl = getLandmarkImageUrl(item.name, item.location, item.imageUrl);
  const [cardImg, setCardImg] = useState<string>(initialUrl);

  useEffect(() => {
    let isMounted = true;
    if (
      item.name &&
      (!initialUrl.includes('wikimedia.org') &&
        !initialUrl.includes('wikipedia.org') &&
        !initialUrl.startsWith('data:image'))
    ) {
      getRealLandmarkImageUrlAsync(item.name, item.location, initialUrl).then((wikiUrl) => {
        if (isMounted && wikiUrl) {
          setCardImg(wikiUrl);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [item.name, item.location, item.imageUrl]);

  return (
    <div
      onClick={() => onSelectLandmark({ ...item.presetDetails, imageUrl: cardImg })}
      className="group relative rounded-3xl overflow-hidden bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col backdrop-blur-xl"
    >
      {/* Image & Badge */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
        <img
          src={cardImg}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-indigo-500/30 flex items-center gap-1 shadow-md">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>{item.category}</span>
          </div>
          {(cardImg.includes('wikimedia.org') || cardImg.includes('wikipedia.org')) && (
            <div className="px-2 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-[9px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-md">
              <Globe className="h-2.5 w-2.5 text-emerald-400" />
              <span>Wiki Photo</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-extrabold text-lg leading-tight group-hover:text-cyan-300 transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-slate-300 mt-1">
            <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>{item.location}, {item.country}</span>
          </div>
        </div>
      </div>

      {/* Card Content Snippet */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <p className="text-xs text-slate-300 line-clamp-2 italic leading-relaxed">
          "{item.tagline}"
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3 text-indigo-400" />
            <span>History</span>
          </div>
          <div className="flex items-center gap-1">
            <Camera className="h-3 w-3 text-cyan-400" />
            <span>Photos</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldAlert className="h-3 w-3 text-sky-400" />
            <span>Secrets</span>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
          <span>Explore Intelligence</span>
          <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export const CuratedGallery: React.FC<CuratedGalleryProps> = ({ onSelectLandmark }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Historical Monument', 'Sacred Site', 'Natural Wonder'];

  const filtered = selectedCategory === 'All'
    ? CURATED_LANDMARKS
    : CURATED_LANDMARKS.filter(item => item.category === selectedCategory);

  return (
    <section id="curated-section" className="py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <span>Featured Landmark Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Curated World Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Select any destination to unlock instant AI local coffee guides, photo viewpoints, cultural backstories, and etiquette rules.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item: CuratedLandmarkSample) => (
          <CuratedCard key={item.id} item={item} onSelectLandmark={onSelectLandmark} />
        ))}
      </div>
    </section>
  );
};
