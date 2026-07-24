import React, { useState, useEffect } from 'react';
import { LandmarkDetails, TravelPersonality } from './types';
import { CURATED_LANDMARKS } from './data/curatedLandmarks';
import { getLandmarkImageUrl, getRealLandmarkImageUrlAsync } from './utils/landmarkImages';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { AuthModal } from './components/AuthModal';
import { TravelHistoryModal } from './components/TravelHistoryModal';
import { SettingsModal } from './components/SettingsModal';
import { LandmarkScanner } from './components/LandmarkScanner';
import { CuratedGallery } from './components/CuratedGallery';
import { LandmarkHero } from './components/LandmarkHero';
import { CulturalSection } from './components/CulturalSection';
import { MythsSection } from './components/MythsSection';
import { PhotoSpotsSection } from './components/PhotoSpotsSection';
import { TouristMistakesSection } from './components/TouristMistakesSection';
import { VisitingTimeSection } from './components/VisitingTimeSection';
import { HiddenGemsSection } from './components/HiddenGemsSection';
import { HiddenLocalsSection } from './components/HiddenLocalsSection';
import { EtiquetteSection } from './components/EtiquetteSection';
import { GemmaChat } from './components/GemmaChat';
import { SavedLandmarksModal } from './components/SavedLandmarksModal';
import { PersonalityQuizModal } from './components/PersonalityQuizModal';
import { ThemeModal } from './components/ThemeModal';

import {
  BookOpen,
  Flame,
  Camera,
  ShieldAlert,
  Calendar,
  Compass,
  ShieldCheck,
  Sparkles,
  ArrowUp,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Globe,
  Loader2
} from 'lucide-react';

export default function App() {
  // View mode: 'home' (landing page with globe) vs 'landmark' (deep dive landmark details)
  const [viewMode, setViewMode] = useState<'home' | 'landmark'>('home');

  // Active user state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  // Selected active landmark
  const [activeLandmark, setActiveLandmark] = useState<LandmarkDetails>(
    CURATED_LANDMARKS[0].presetDetails
  );

  // AI landmark search loading state
  const [isSearchingLandmark, setIsSearchingLandmark] = useState(false);
  const [searchLoadingMessage, setSearchLoadingMessage] = useState('');

  // User travel personality
  const [userPersonality, setUserPersonality] = useState<TravelPersonality | null>(() => {
    try {
      const stored = localStorage.getItem('ask_the_place_personality');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Saved bookmarks state in localStorage
  const [savedLandmarks, setSavedLandmarks] = useState<LandmarkDetails[]>(() => {
    try {
      const stored = localStorage.getItem('ask_the_place_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // User travel history
  const [travelHistory, setTravelHistory] = useState<LandmarkDetails[]>(() => {
    try {
      const stored = localStorage.getItem('ask_the_place_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modals & Panels
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isGemmaChatOpen, setIsGemmaChatOpen] = useState(false);
  const [gemmaInitialQuestion, setGemmaInitialQuestion] = useState<string | undefined>();
  const [isRefreshingHiddenLocals, setIsRefreshingHiddenLocals] = useState(false);

  // Active sub-tab in landmark detail view
  const [activeSection, setActiveSection] = useState<string>('hiddenlocals');

  // Sync saved to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ask_the_place_saved', JSON.stringify(savedLandmarks));
    } catch (e) {
      console.error('Failed to sync saved landmarks:', e);
    }
  }, [savedLandmarks]);

  // Sync personality to local storage
  useEffect(() => {
    if (userPersonality) {
      try {
        localStorage.setItem('ask_the_place_personality', JSON.stringify(userPersonality));
      } catch (e) {
        console.error('Failed to sync personality:', e);
      }
    }
  }, [userPersonality]);

  // Sync history to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ask_the_place_history', JSON.stringify(travelHistory));
    } catch (e) {
      console.error('Failed to sync history:', e);
    }
  }, [travelHistory]);

  const handleClearHistory = () => {
    setTravelHistory([]);
    try {
      localStorage.removeItem('ask_the_place_history');
    } catch (e) {
      console.error('Failed to clear history:', e);
    }
  };

  const handleRemoveHistoryItem = (id: string) => {
    setTravelHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('ask_the_place_history', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to sync history:', e);
      }
      return updated;
    });
  };

  // Helper for custom location dynamic guide fallback
  const getDynamicFallback = (queryName: string): LandmarkDetails => {
    const matched = CURATED_LANDMARKS.find(
      (c) =>
        c.name.toLowerCase().includes(queryName.toLowerCase()) ||
        c.location.toLowerCase().includes(queryName.toLowerCase())
    );
    if (matched) return matched.presetDetails;

    return {
      id: `place-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: queryName,
      location: 'Global Destination / Point of Interest',
      tagline: `AI Travel & Cultural Exploration Guide for ${queryName}`,
      category: 'Public Institution / Destination',
      confidence: 95,
      imageUrl: getLandmarkImageUrl(queryName),
      culturalExplanation: {
        history: `${queryName} is a prominent local destination valued by visitors and community members alike for its heritage and atmosphere.`,
        architecturalSignificance: `Features architectural elements and layout designed to welcome visitors, students, and local explorers.`,
        culturalBackstory: `Serves as a vibrant hub of daily activity, regional history, and local social life.`,
        symbolism: `Represents community identity, education, or cultural presence in its locality.`,
      },
      mythsAndLegends: [
        {
          title: `The Story of ${queryName}`,
          story: `Local lore speaks of founders and early visitors whose contributions shaped the identity and traditions of ${queryName}.`,
          type: 'legend',
        },
      ],
      bestPhotoLocations: [
        {
          spotName: `Main Entrance & Front Archway`,
          description: `The primary entrance offers the cleanest angle capturing the architecture and main signage of ${queryName}.`,
          bestTime: 'Golden Hour (4:30 PM - 6:00 PM)',
          cameraTip: 'Use wide-angle lens with subtle HDR to capture full perspective.',
          crowdLevel: 'Medium',
        },
      ],
      commonTouristMistakes: [
        {
          title: 'Visiting during peak closed hours or restricted zones',
          description: 'Ensure you check official visitor guidelines or entry permits for private or academic zones.',
          severity: 'warning',
          alternative: 'Stick to public access courtyards, visitor centers, or surrounding vibrant streets.',
        },
      ],
      bestVisitingTime: {
        bestSeason: 'Spring & Autumn',
        bestTimeOfDay: 'Morning to Late Afternoon',
        peakHours: '11:00 AM - 3:00 PM',
        averageDuration: '1.5 to 2.5 hours',
        ticketAdvice: 'Check official visitor portal or security gates upon arrival.',
        weatherTip: 'Carry a lightweight umbrella or sunscreen depending on seasonal weather.',
      },
      nearbyHiddenGems: [
        {
          name: `Local Café & Visitor Lounge near ${queryName}`,
          type: 'eatery',
          distance: '150 meters',
          description: 'Quiet coffee spot serving fresh artisanal brews, local snacks, and relaxed seating.',
        },
        {
          name: `Community Park & Viewpoint`,
          type: 'viewpoint',
          distance: '300 meters',
          description: 'A shaded green lawn or plaza ideal for resting after exploring.',
        },
      ],
      localEtiquette: {
        dos: ['Be respectful of ongoing activities and local rules', 'Maintain polite speech near active study or quiet zones'],
        donts: ['Do not enter restricted administrative or private areas without permission'],
        dressCode: 'Smart casual / respectable attire.',
        photographyRules: 'Permitted in public outdoor spaces. Be mindful of individuals in photos.',
        tippingAndBehavior: 'Standard polite local interaction etiquette applies.',
      },
      suggestedQuestions: [
        `What are the best nearby cafes or street food near ${queryName}?`,
        `Can you tell me the historical background of ${queryName}?`,
        `What are the top photo spots around ${queryName}?`,
      ],
    };
  };

  // Add landmark to history when selected
  const selectLandmark = (landmark: LandmarkDetails) => {
    setActiveLandmark(landmark);
    setViewMode('landmark');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Asynchronously resolve direct Wikipedia photograph for the selected place
    if (
      landmark.name &&
      (!landmark.imageUrl ||
        (!landmark.imageUrl.includes('wikimedia.org') &&
          !landmark.imageUrl.includes('wikipedia.org') &&
          !landmark.imageUrl.startsWith('data:image')))
    ) {
      getRealLandmarkImageUrlAsync(landmark.name, landmark.location, landmark.imageUrl).then(
        (wikiUrl) => {
          if (wikiUrl) {
            setActiveLandmark((prev) =>
              prev.id === landmark.id ? { ...prev, imageUrl: wikiUrl } : prev
            );
          }
        }
      );
    }

    setTravelHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== landmark.id);
      const updated = [landmark, ...filtered].slice(0, 20);
      try {
        localStorage.setItem('ask_the_place_history', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to sync history:', e);
      }
      return updated;
    });
  };

  // Search any place or landmark (by string query or pre-constructed object)
  const handleSearchLocation = async (queryOrLandmark: string | LandmarkDetails) => {
    if (typeof queryOrLandmark !== 'string') {
      selectLandmark(queryOrLandmark);
      return;
    }

    const query = queryOrLandmark.trim();
    if (!query) return;

    const queryLower = query.toLowerCase();

    // Check if user previously scanned or visited this place in travelHistory
    const matchedHistory = travelHistory.find((item) => {
      const nameLower = item.name.toLowerCase();
      return nameLower === queryLower || (queryLower.length > 3 && (nameLower.includes(queryLower) || queryLower.includes(nameLower)));
    });

    if (matchedHistory) {
      selectLandmark(matchedHistory);
      return;
    }

    // Check if query matches a curated landmark exactly
    const matchedCurated = CURATED_LANDMARKS.find(
      (c) =>
        c.name.toLowerCase() === queryLower ||
        c.name.toLowerCase().includes(queryLower)
    );

    if (matchedCurated && (queryLower.length > 3 || matchedCurated.name.toLowerCase() === queryLower)) {
      selectLandmark(matchedCurated.presetDetails);
      return;
    }

    // Call /api/scan-landmark for dynamic Gemma AI global landmark guide
    setIsSearchingLandmark(true);
    setSearchLoadingMessage(`Gemma AI is retrieving local travel intelligence for "${query}"...`);

    try {
      const response = await fetch('/api/scan-landmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textQuery: query }),
      });

      const data = await response.json();
      if (data.success && data.landmark) {
        selectLandmark(data.landmark);
      } else {
        selectLandmark(getDynamicFallback(query));
      }
    } catch (err) {
      console.error('Failed to search landmark via AI:', err);
      selectLandmark(getDynamicFallback(query));
    } finally {
      setIsSearchingLandmark(false);
    }
  };

  const isCurrentBookmarked = savedLandmarks.some((item) => item.id === activeLandmark.id);

  const toggleBookmark = () => {
    if (isCurrentBookmarked) {
      setSavedLandmarks((prev) => prev.filter((item) => item.id !== activeLandmark.id));
    } else {
      setSavedLandmarks((prev) => [...prev, activeLandmark]);
    }
  };

  const removeBookmark = (id: string) => {
    setSavedLandmarks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenGemmaWithQuestion = (q?: string) => {
    setGemmaInitialQuestion(q);
    setIsGemmaChatOpen(true);
  };

  // Generate or refresh hidden locals tailored to user personality
  const handleRefreshHiddenLocals = async (personalityToUse?: TravelPersonality) => {
    const currentPersona = personalityToUse || userPersonality;
    setIsRefreshingHiddenLocals(true);

    try {
      const response = await fetch('/api/generate-hidden-locals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landmarkName: activeLandmark.name,
          location: activeLandmark.location,
          personality: currentPersona,
        }),
      });

      const data = await response.json();
      if (data.success && data.hiddenLocalsGuide) {
        setActiveLandmark((prev) => ({
          ...prev,
          hiddenLocalsGuide: data.hiddenLocalsGuide,
        }));
      }
    } catch (e) {
      console.error('Failed to refresh hidden locals:', e);
    } finally {
      setIsRefreshingHiddenLocals(false);
    }
  };

  const handleSavePersonality = (newPersonality: TravelPersonality) => {
    setUserPersonality(newPersonality);
    handleRefreshHiddenLocals(newPersonality);
  };

  const scrollToCurated = () => {
    const el = document.getElementById('curated-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'hiddenlocals', label: 'Hidden Locals Guide', icon: MapPin },
    { id: 'cultural', label: 'Culture & History', icon: BookOpen },
    { id: 'myths', label: 'Myths & Legends', icon: Flame },
    { id: 'photospots', label: 'Photo Spots', icon: Camera },
    { id: 'mistakes', label: 'Tourist Mistakes', icon: ShieldAlert },
    { id: 'visitingtime', label: 'Best Visit Time', icon: Calendar },
    { id: 'hiddengems', label: 'Hidden Gems', icon: Compass },
    { id: 'etiquette', label: 'Local Etiquette', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Search AI Loading Modal Overlay */}
      {isSearchingLandmark && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 animate-pulse" />
            <div className="h-16 w-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Consulting Gemma AI</h3>
              <p className="text-xs text-slate-300 mt-1">{searchLoadingMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(true)}
        onOpenScanModal={() => setIsScanModalOpen(true)}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onNavigateHome={() => {
          setViewMode('home');
          scrollToTop();
        }}
        onSearchLocation={handleSearchLocation}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        savedCount={savedLandmarks.length}
        user={currentUser}
        viewMode={viewMode}
        activeLandmarkName={activeLandmark?.name}
      />

      {/* Sliding Navigation Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeView={viewMode}
        onNavigateHome={() => {
          setViewMode('home');
          scrollToTop();
        }}
        onNavigateExplore={() => {
          setViewMode('home');
          scrollToCurated();
        }}
        onOpenScanModal={() => setIsScanModalOpen(true)}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenQuizModal={() => setIsQuizModalOpen(true)}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenAboutModal={() => setIsSettingsModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        user={currentUser}
      />

      {/* LANDING PAGE / HOME VIEW */}
      {viewMode === 'home' && (
        <div className="space-y-12 pb-16">
          {/* Hero Section with Interactive Globe */}
          <HeroSection
            onSearchFocus={() => {
              const input = document.getElementById('navbar-search-input') as HTMLInputElement;
              if (input) {
                input.focus();
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                setIsScanModalOpen(true);
              }
            }}
            onOpenScanModal={() => setIsScanModalOpen(true)}
            onSelectSampleLocation={(query) => handleSearchLocation(query)}
          />

          {/* Curated Gallery Section */}
          <div id="curated-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CuratedGallery
              onSelectLandmark={(landmark) => selectLandmark(landmark)}
            />
          </div>
        </div>
      )}

      {/* LANDMARK DEEP-DIVE VIEW */}
      {viewMode === 'landmark' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Back to Home Breadcrumb & Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <button
                onClick={() => {
                  setViewMode('home');
                  scrollToTop();
                }}
                className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors text-slate-300 font-bold"
              >
                <Globe className="h-4 w-4 text-cyan-400" />
                <span>Global Exploration</span>
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-white font-extrabold truncate max-w-[200px] sm:max-w-xs">{activeLandmark.name}</span>
            </div>

            <button
              onClick={() => {
                setViewMode('home');
                scrollToTop();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-indigo-500/20 shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Globe</span>
            </button>
          </div>

          {/* Main Landmark Hero Header */}
          <LandmarkHero
            landmark={activeLandmark}
            isBookmarked={isCurrentBookmarked}
            onToggleBookmark={toggleBookmark}
            onOpenGemmaChat={handleOpenGemmaWithQuestion}
          />

          {/* Feature Navigation Sub-bar */}
          <div className="sticky top-16 z-30 bg-slate-950/90 backdrop-blur-md py-3 border-y border-slate-800/80 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-x-auto scrollbar-none flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-max">
              {sections.map((sec) => {
                const IconComp = sec.icon;
                const isActive = activeSection === sec.id;

                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      const el = document.getElementById(sec.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <IconComp className="h-3.5 w-3.5" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleOpenGemmaWithQuestion()}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-colors shrink-0 shadow-md shadow-indigo-500/20"
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>Ask Gemma</span>
            </button>
          </div>

          {/* FEATURE: HIDDEN LOCALS GUIDE */}
          <section id="hiddenlocals" className="scroll-mt-32">
            <HiddenLocalsSection
              guide={activeLandmark.hiddenLocalsGuide}
              landmarkName={activeLandmark.name}
              personality={userPersonality}
              onOpenQuiz={() => setIsQuizModalOpen(true)}
              onAskGemma={handleOpenGemmaWithQuestion}
              onRefreshHiddenLocals={() => handleRefreshHiddenLocals()}
              isRefreshing={isRefreshingHiddenLocals}
            />
          </section>

          {/* SECTION 1: CULTURAL EXPLANATION */}
          <section id="cultural" className="scroll-mt-32">
            <CulturalSection
              culturalData={activeLandmark.culturalExplanation}
              landmarkName={activeLandmark.name}
              onAskGemma={handleOpenGemmaWithQuestion}
            />
          </section>

          {/* SECTION 2: MYTHS & LEGENDS */}
          <section id="myths" className="scroll-mt-32">
            <MythsSection
              myths={activeLandmark.mythsAndLegends}
              landmarkName={activeLandmark.name}
              onAskGemma={handleOpenGemmaWithQuestion}
            />
          </section>

          {/* SECTION 3: BEST PHOTO LOCATIONS */}
          <section id="photospots" className="scroll-mt-32">
            <PhotoSpotsSection
              photoSpots={activeLandmark.bestPhotoLocations}
              landmarkName={activeLandmark.name}
              onAskGemma={handleOpenGemmaWithQuestion}
            />
          </section>

          {/* SECTION 4: COMMON TOURIST MISTAKES */}
          <section id="mistakes" className="scroll-mt-32">
            <TouristMistakesSection
              mistakes={activeLandmark.commonTouristMistakes}
              landmarkName={activeLandmark.name}
              onAskGemma={handleOpenGemmaWithQuestion}
            />
          </section>

          {/* SECTION 5: BEST VISITING TIME */}
          <section id="visitingtime" className="scroll-mt-32">
            <VisitingTimeSection
              visitingInfo={activeLandmark.bestVisitingTime}
              landmarkName={activeLandmark.name}
              onAskGemma={handleOpenGemmaWithQuestion}
            />
          </section>

          {/* SECTION 6: NEARBY HIDDEN GEMS */}
          <section id="hiddengems" className="scroll-mt-32">
            <HiddenGemsSection
              hiddenGems={activeLandmark.nearbyHiddenGems}
              landmarkName={activeLandmark.name}
              onAskGemma={handleOpenGemmaWithQuestion}
            />
          </section>

          {/* SECTION 7: LOCAL ETIQUETTE */}
          <section id="etiquette" className="scroll-mt-32">
            <EtiquetteSection
              etiquette={activeLandmark.localEtiquette}
              landmarkName={activeLandmark.name}
              onAskGemma={handleOpenGemmaWithQuestion}
            />
          </section>

          {/* CURATED GALLERY */}
          <div className="pt-8 border-t border-slate-800/80">
            <CuratedGallery
              onSelectLandmark={(landmark) => selectLandmark(landmark)}
            />
          </div>
        </main>
      )}

      {/* Floating Gemma Chat Button */}
      <button
        onClick={() => setIsGemmaChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 text-white font-bold shadow-2xl shadow-indigo-500/30 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all group border border-indigo-400/30"
      >
        <div className="relative">
          <Sparkles className="h-5 w-5 text-white" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400 border-2 border-slate-950 animate-ping" />
        </div>
        <span className="text-xs sm:text-sm font-extrabold tracking-tight">Ask Gemma</span>
      </button>

      {/* MODAL: AUTHENTICATION */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(u) => setCurrentUser(u)}
      />

      {/* MODAL: TRAVEL HISTORY / RECENT SEARCHES */}
      <TravelHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={travelHistory}
        onSelectLandmark={(selected) => selectLandmark(selected)}
        onClearHistory={handleClearHistory}
        onRemoveHistoryItem={handleRemoveHistoryItem}
      />

      {/* MODAL: SETTINGS */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      {/* MODAL: THEME SELECTOR */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* MODAL: PERSONALITY QUIZ */}
      {isQuizModalOpen && (
        <PersonalityQuizModal
          currentPersonality={userPersonality}
          onSavePersonality={handleSavePersonality}
          onClose={() => setIsQuizModalOpen(false)}
        />
      )}

      {/* MODAL: SCAN LANDMARK */}
      {isScanModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <LandmarkScanner
            isModal={true}
            onClose={() => setIsScanModalOpen(false)}
            onScanComplete={(newLandmark) => {
              selectLandmark(newLandmark);
              setIsScanModalOpen(false);
            }}
          />
        </div>
      )}

      {/* MODAL: SAVED LANDMARKS */}
      {isSavedModalOpen && (
        <SavedLandmarksModal
          savedLandmarks={savedLandmarks}
          onClose={() => setIsSavedModalOpen(false)}
          onRemoveBookmark={removeBookmark}
          onSelectLandmark={(selected) => selectLandmark(selected)}
        />
      )}

      {/* GEMMA CHAT DRAWER */}
      <GemmaChat
        landmark={activeLandmark}
        isOpen={isGemmaChatOpen}
        onClose={() => setIsGemmaChatOpen(false)}
        initialQuestion={gemmaInitialQuestion}
        onClearInitialQuestion={() => setGemmaInitialQuestion(undefined)}
      />

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ask The Place • AI Contextual Travel Companion</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
