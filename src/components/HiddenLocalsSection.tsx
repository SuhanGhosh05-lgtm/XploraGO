import React, { useState } from 'react';
import { HiddenLocalsGuide, TravelPersonality, HiddenLocalRecommendation, WalkingRoute } from '../types';
import {
  Compass,
  Coffee,
  Utensils,
  ShoppingBag,
  Camera,
  Sunset,
  Footprints,
  Users,
  Sparkles,
  MapPin,
  Clock,
  MessageSquare,
  RefreshCw,
  Award
} from 'lucide-react';

interface HiddenLocalsSectionProps {
  guide?: HiddenLocalsGuide;
  landmarkName: string;
  personality: TravelPersonality | null;
  onOpenQuiz: () => void;
  onAskGemma: (question: string) => void;
  onRefreshHiddenLocals?: () => void;
  isRefreshing?: boolean;
}

export const HiddenLocalsSection: React.FC<HiddenLocalsSectionProps> = ({
  guide,
  landmarkName,
  personality,
  onOpenQuiz,
  onAskGemma,
  onRefreshHiddenLocals,
  isRefreshing,
}) => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'cafes' | 'food' | 'markets' | 'photo' | 'sunspots' | 'walks' | 'family'
  >('all');

  if (!guide) {
    return (
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-4 text-center backdrop-blur-xl">
        <Compass className="h-10 w-10 text-cyan-400 mx-auto animate-spin-slow" />
        <h3 className="text-lg font-bold text-white">Hidden Locals Guide Loading...</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Gemma is searching for off-the-beaten path cafés, food, and secret sunrise views around {landmarkName}.
        </p>
      </div>
    );
  }

  const categoryTabs = [
    { id: 'all', label: 'All Recommendations', count: (guide.hiddenCafes?.length || 0) + (guide.localFood?.length || 0) + (guide.weekendMarkets?.length || 0) + (guide.photoSpots?.length || 0) + (guide.sunspots?.length || 0) + (guide.walkingRoutes?.length || 0) + (guide.familyFriendlySuggestions?.length || 0) },
    { id: 'cafes', label: 'Hidden Cafés', icon: Coffee, items: guide.hiddenCafes },
    { id: 'food', label: 'Local Food', icon: Utensils, items: guide.localFood },
    { id: 'markets', label: 'Weekend Markets', icon: ShoppingBag, items: guide.weekendMarkets },
    { id: 'photo', label: 'Photography Spots', icon: Camera, items: guide.photoSpots },
    { id: 'sunspots', label: 'Sunrise / Sunset', icon: Sunset, items: guide.sunspots },
    { id: 'walks', label: 'Walking Routes', icon: Footprints, items: guide.walkingRoutes },
    { id: 'family', label: 'Family & Local Only', icon: Users, items: guide.familyFriendlySuggestions },
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-xl">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-cyan-400 p-0.5 shadow-lg flex items-center justify-center shrink-0">
            <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Compass className="h-6 w-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Hidden Locals Guide
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-cyan-300 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider">
                Local-Only Secrets
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Off-the-beaten path cafés, authentic neighborhood eats, weekend markets, and walking routes near {landmarkName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>{personality ? 'Update Personality Quiz' : 'Take Personality Quiz'}</span>
          </button>

          {onRefreshHiddenLocals && (
            <button
              onClick={onRefreshHiddenLocals}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-medium transition-colors disabled:opacity-50"
              title="Refresh recommendations with AI"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* PERSONALITY PROFILE CARD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-950 to-indigo-950/30 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Matched Travel Persona:
              </span>
              <span className="text-sm font-extrabold text-white">
                {personality ? personality.archetype : 'Curious Culture & Local Explorer'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {personality
                ? personality.description
                : 'Take the Personality Quiz above to let Gemma customize recommendation reasonings for your travel pace and style!'}
            </p>
          </div>
        </div>

        {personality?.traits && (
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {personality.traits.map((trait, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-semibold"
              >
                #{trait}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* TABS FILTER */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
        {categoryTabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {IconComp && <IconComp className="h-3.5 w-3.5" />}
              <span>{tab.label}</span>
              {tab.items && (
                <span
                  className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-slate-950 text-cyan-300' : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  {tab.items.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* CONTENT SECTIONS */}

      {/* 1. HIDDEN CAFES */}
      {(activeTab === 'all' || activeTab === 'cafes') && guide.hiddenCafes && guide.hiddenCafes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Coffee className="h-4 w-4" />
            <span>Hidden Cafés & Artisanal Roasters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guide.hiddenCafes.map((cafe) => (
              <RecommendationCard
                key={cafe.id || cafe.name}
                item={cafe}
                icon={Coffee}
                badgeColor="text-cyan-300 bg-cyan-500/10 border-cyan-500/20"
                onAskGemma={() => onAskGemma(`Tell me more about ${cafe.name} near ${landmarkName}. What should I order?`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. LOCAL FOOD */}
      {(activeTab === 'all' || activeTab === 'food') && guide.localFood && guide.localFood.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Utensils className="h-4 w-4" />
            <span>Authentic Local Food & Night Bites</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guide.localFood.map((food) => (
              <RecommendationCard
                key={food.id || food.name}
                item={food}
                icon={Utensils}
                badgeColor="text-sky-300 bg-sky-500/10 border-sky-500/20"
                onAskGemma={() => onAskGemma(`Why is ${food.name} famous among locals near ${landmarkName}?`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. WEEKEND MARKETS */}
      {(activeTab === 'all' || activeTab === 'markets') && guide.weekendMarkets && guide.weekendMarkets.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <ShoppingBag className="h-4 w-4" />
            <span>Weekend Markets & Flea Antiquities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guide.weekendMarkets.map((mkt) => (
              <RecommendationCard
                key={mkt.id || mkt.name}
                item={mkt}
                icon={ShoppingBag}
                badgeColor="text-teal-300 bg-teal-500/10 border-teal-500/20"
                onAskGemma={() => onAskGemma(`What are the best items or crafts to buy at ${mkt.name}?`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. PHOTOGRAPHY SPOTS */}
      {(activeTab === 'all' || activeTab === 'photo') && guide.photoSpots && guide.photoSpots.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Camera className="h-4 w-4" />
            <span>Photography & Geometric Viewpoints</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guide.photoSpots.map((spot) => (
              <RecommendationCard
                key={spot.id || spot.name}
                item={spot}
                icon={Camera}
                badgeColor="text-indigo-300 bg-indigo-500/10 border-indigo-500/20"
                onAskGemma={() => onAskGemma(`What lens or camera settings do you recommend for ${spot.name}?`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. SUNRISE / SUNSET SPOTS */}
      {(activeTab === 'all' || activeTab === 'sunspots') && guide.sunspots && guide.sunspots.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Sunset className="h-4 w-4" />
            <span>Sunrise & Sunset Secret Spots</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guide.sunspots.map((sun) => (
              <RecommendationCard
                key={sun.id || sun.name}
                item={sun}
                icon={Sunset}
                badgeColor="text-cyan-300 bg-cyan-500/10 border-cyan-500/20"
                onAskGemma={() => onAskGemma(`When should I arrive at ${sun.name} to capture the golden glow?`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 6. WALKING ROUTES */}
      {(activeTab === 'all' || activeTab === 'walks') && guide.walkingRoutes && guide.walkingRoutes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Footprints className="h-4 w-4" />
            <span>Curated Walking Routes</span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {guide.walkingRoutes.map((walk) => (
              <WalkingRouteCard
                key={walk.id || walk.title}
                route={walk}
                onAskGemma={() => onAskGemma(`Can you walk me step-by-step through the ${walk.title} route?`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 7. FAMILY FRIENDLY / LOCAL ONLY */}
      {(activeTab === 'all' || activeTab === 'family') && guide.familyFriendlySuggestions && guide.familyFriendlySuggestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Users className="h-4 w-4" />
            <span>Family-Friendly & Local-Only Suggestions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guide.familyFriendlySuggestions.map((fam) => (
              <RecommendationCard
                key={fam.id || fam.name}
                item={fam}
                icon={Users}
                badgeColor="text-sky-300 bg-sky-500/10 border-sky-500/20"
                onAskGemma={() => onAskGemma(`Is ${fam.name} good for kids or strollers? What local activities are nearby?`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component: Recommendation Card with Gemma Reasoning
interface RecommendationCardProps {
  item: HiddenLocalRecommendation;
  icon: any;
  badgeColor: string;
  onAskGemma: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  item,
  icon: IconComp,
  badgeColor,
  onAskGemma,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 group">
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 ${badgeColor}`}>
            <IconComp className="h-3 w-3" />
            <span>{item.priceOrVibe || 'Local Gem'}</span>
          </span>

          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-800">
            <Clock className="h-3 w-3 text-cyan-400" />
            <span>{item.bestTime}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
          {item.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span>{item.addressOrLocation}</span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {item.description}
        </p>

        {/* GEMMA'S REASONING BOX */}
        {item.whyItMatchesUser && (
          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[11px] text-cyan-300 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>Gemma's Recommendation Reasoning:</span>
            </div>
            <p className="italic text-[11px] text-indigo-100/90 leading-relaxed">
              "{item.whyItMatchesUser}"
            </p>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {item.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 text-[10px] font-medium border border-slate-800">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t border-slate-900 flex justify-end">
        <button
          onClick={onAskGemma}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-800 text-xs font-semibold transition-all flex items-center gap-1.5"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Ask Gemma Details</span>
        </button>
      </div>
    </div>
  );
};

// Sub-component: Walking Route Card
interface WalkingRouteCardProps {
  route: WalkingRoute;
  onAskGemma: () => void;
}

const WalkingRouteCard: React.FC<WalkingRouteCardProps> = ({ route, onAskGemma }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <span className="px-2.5 py-1 rounded-full border text-[10px] font-bold text-cyan-300 bg-indigo-500/10 border-indigo-500/20 inline-flex items-center gap-1 mb-2">
            <Footprints className="h-3 w-3" />
            <span>Scenic Route</span>
          </span>
          <h3 className="text-lg font-bold text-white">{route.title}</h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
          <span className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            {route.duration}
          </span>
          <span className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-indigo-400" />
            {route.distance}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        {route.description}
      </p>

      {/* Highlights */}
      {route.highlights && route.highlights.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Route Highlights:
          </span>
          <div className="flex flex-wrap gap-2">
            {route.highlights.map((hl, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 text-xs font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3 text-cyan-400" />
                <span>{hl}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Gemma Reasoning */}
      {route.whyItMatchesUser && (
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[11px] text-cyan-300 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Gemma's Route Customization Reasoning:</span>
          </div>
          <p className="italic text-[11px] text-indigo-100/90 leading-relaxed">
            "{route.whyItMatchesUser}"
          </p>
        </div>
      )}

      <div className="pt-2 flex justify-end">
        <button
          onClick={onAskGemma}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-200 border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Ask Gemma Turn-by-Turn Guidance</span>
        </button>
      </div>
    </div>
  );
};
