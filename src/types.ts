export interface CulturalExplanation {
  history: string;
  architecturalSignificance: string;
  culturalBackstory: string;
  symbolism: string;
}

export interface MythAndLegend {
  title: string;
  story: string;
  type: 'myth' | 'legend' | 'folklore' | 'ghost_story';
}

export interface PhotoLocation {
  spotName: string;
  description: string;
  bestTime: string;
  cameraTip: string;
  crowdLevel: 'Low' | 'Medium' | 'High';
}

export interface TouristMistake {
  title: string;
  description: string;
  severity: 'warning' | 'critical' | 'tip';
  alternative: string;
}

export interface VisitingTimeInfo {
  bestSeason: string;
  bestTimeOfDay: string;
  peakHours: string;
  averageDuration: string;
  ticketAdvice: string;
  weatherTip: string;
}

export interface HiddenGem {
  name: string;
  type: 'viewpoint' | 'eatery' | 'cultural' | 'nature';
  distance: string;
  description: string;
}

export interface LocalEtiquetteInfo {
  dos: string[];
  donts: string[];
  dressCode: string;
  photographyRules: string;
  tippingAndBehavior: string;
}

export interface TravelPersonality {
  archetype: string;
  style: 'foodie' | 'photographer' | 'quiet_seeker' | 'family' | 'culture_explorer';
  pace: 'relaxed' | 'moderate' | 'fast_paced';
  travelCompanion: 'solo' | 'couple' | 'family' | 'friends';
  traits: string[];
  description: string;
}

export interface HiddenLocalRecommendation {
  id: string;
  name: string;
  category: 'cafe' | 'food' | 'market' | 'photo' | 'sunspot' | 'family_local';
  description: string;
  addressOrLocation: string;
  bestTime: string;
  whyItMatchesUser: string; // Gemma's recommendation reasoning
  tags: string[];
  priceOrVibe?: string;
}

export interface WalkingRoute {
  id: string;
  title: string;
  duration: string;
  distance: string;
  highlights: string[];
  description: string;
  whyItMatchesUser: string; // Gemma's recommendation reasoning
}

export interface HiddenLocalsGuide {
  hiddenCafes: HiddenLocalRecommendation[];
  localFood: HiddenLocalRecommendation[];
  weekendMarkets: HiddenLocalRecommendation[];
  photoSpots: HiddenLocalRecommendation[];
  sunspots: HiddenLocalRecommendation[]; // Sunrise/Sunset
  walkingRoutes: WalkingRoute[];
  familyFriendlySuggestions: HiddenLocalRecommendation[];
}

export interface LandmarkDetails {
  id: string;
  name: string;
  location: string;
  tagline: string;
  imageUrl?: string;
  category: string;
  confidence: number;
  culturalExplanation: CulturalExplanation;
  mythsAndLegends: MythAndLegend[];
  bestPhotoLocations: PhotoLocation[];
  commonTouristMistakes: TouristMistake[];
  bestVisitingTime: VisitingTimeInfo;
  nearbyHiddenGems: HiddenGem[];
  localEtiquette: LocalEtiquetteInfo;
  hiddenLocalsGuide?: HiddenLocalsGuide;
  suggestedQuestions: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gemma';
  text: string;
  timestamp: string;
}

export interface CuratedLandmarkSample {
  id: string;
  name: string;
  location: string;
  country: string;
  tagline: string;
  category: string;
  imageUrl: string;
  presetDetails: LandmarkDetails;
}

export type ThemeMode = 'dark' | 'light' | 'midnight' | 'amber' | 'emerald';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  category: 'dark' | 'light';
  description: string;
  previewBg: string;
  previewCard: string;
  previewAccent: string;
}
