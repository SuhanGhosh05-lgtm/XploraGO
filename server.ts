import cors from "cors";


import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, Modality } from '@google/genai';
import { CURATED_LANDMARKS } from './src/data/curatedLandmarks.js';
import { getLandmarkImageUrl, getRealLandmarkImageUrlAsync } from './src/utils/landmarkImages.js';
import { createServer as createViteServer } from 'vite';

dotenv.config({ path: '.env.local' });
console.log("MODEL_NAME =", process.env.MODEL_NAME);

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "https://xplorago.netlify.app"
}));

// Body parser
app.use(express.json({ limit: '20mb' }));

// Lazy init Gemini SDK
function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is missing.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper: Try multiple models sequentially on rate limit (429) or temporary model error
async function generateContentWithFallback(ai: any,params: any,models = [process.env.MODEL_NAME!]) {
  let lastError: any = null;
  for (const modelName of models) {
    try {
      const response = await ai.models.generateContent({
        ...params,
        model: modelName,
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      console.log(`[AI Fallback] Model ${modelName} unavailable, trying next fallback model.`);
      lastError = err;
    }
  }
  throw lastError || new Error('All model fallbacks failed');
}

// Helper: Synthesize rich contextual guide answer when AI services are offline or rate-limited
function generateContextualGemmaAnswer(question: string, landmarkName?: string, landmarkContext?: any): string {
  const qLower = (question || '').toLowerCase();
  const name = landmarkName || landmarkContext?.name || 'this landmark';

  if (landmarkContext) {
    if (qLower.includes('photo') || qLower.includes('camera') || qLower.includes('picture') || qLower.includes('angle') || qLower.includes('view') || qLower.includes('golden hour') || qLower.includes('shot')) {
      const spots = landmarkContext.bestPhotoLocations;
      if (spots && spots.length > 0) {
        const spotList = spots.map((s: any) => `• **${s.spotName}**: ${s.description} *(Best time: ${s.bestTime}, Tip: ${s.cameraTip})*`).join('\n\n');
        return `Here are the top photo vantage points for **${name}**:\n\n${spotList}`;
      }
    }

    if (qLower.includes('history') || qLower.includes('historical') || qLower.includes('origin') || qLower.includes('built') || qLower.includes('when') || qLower.includes('who') || qLower.includes('past') || qLower.includes('architect')) {
      const hist = landmarkContext.culturalExplanation?.history;
      const arch = landmarkContext.culturalExplanation?.architecturalSignificance;
      if (hist) {
        return `Here is the historical origin of **${name}**:\n\n${hist}${arch ? `\n\n**Architectural Mastery**: ${arch}` : ''}`;
      }
    }

    if (qLower.includes('legend') || qLower.includes('myth') || qLower.includes('story') || qLower.includes('tale') || qLower.includes('ghost') || qLower.includes('folklore') || qLower.includes('lore')) {
      const myths = landmarkContext.mythsAndLegends;
      if (myths && myths.length > 0) {
        const stories = myths.map((m: any) => `• **${m.title}**: ${m.story}`).join('\n\n');
        return `Here is local folklore & secret lore tied to **${name}**:\n\n${stories}`;
      }
    }

    if (qLower.includes('ticket') || qLower.includes('queue') || qLower.includes('line') || qLower.includes('time') || qLower.includes('hours') || qLower.includes('crowd') || qLower.includes('visit') || qLower.includes('when to') || qLower.includes('weather')) {
      const v = landmarkContext.bestVisitingTime;
      if (v) {
        return `Visiting recommendations for **${name}**:\n\n• **Best Time of Day**: ${v.bestTimeOfDay}\n• **Best Season**: ${v.bestSeason}\n• **Peak Hours to Avoid**: ${v.peakHours}\n• **Ticket & Entry Strategy**: ${v.ticketAdvice}\n• **Weather Tip**: ${v.weatherTip}`;
      }
    }

    if (qLower.includes('food') || qLower.includes('eat') || qLower.includes('cafe') || qLower.includes('coffee') || qLower.includes('gem') || qLower.includes('restaurant') || qLower.includes('snack') || qLower.includes('hidden')) {
      const gems = landmarkContext.nearbyHiddenGems;
      if (gems && gems.length > 0) {
        const gemList = gems.map((g: any) => `• **${g.name}** (${g.distance}): ${g.description}`).join('\n\n');
        return `Here are top nearby local spots and hidden eats around **${name}**:\n\n${gemList}`;
      }
    }

    if (qLower.includes('wear') || qLower.includes('dress') || qLower.includes('etiquette') || qLower.includes('do') || qLower.includes('dont') || qLower.includes('tip') || qLower.includes('rule') || qLower.includes('custom') || qLower.includes('taboo')) {
      const e = landmarkContext.localEtiquette;
      if (e) {
        const dos = (e.dos || []).map((d: string) => `  - ${d}`).join('\n');
        const donts = (e.donts || []).map((d: string) => `  - ${d}`).join('\n');
        return `Local etiquette guide for **${name}**:\n\n• **Dress Code**: ${e.dressCode}\n• **Photography Rules**: ${e.photographyRules}\n• **DOs**:\n${dos}\n• **DON'Ts**:\n${donts}`;
      }
    }

    if (qLower.includes('mistake') || qLower.includes('scam') || qLower.includes('trap') || qLower.includes('avoid')) {
      const mistakes = landmarkContext.commonTouristMistakes;
      if (mistakes && mistakes.length > 0) {
        const mList = mistakes.map((m: any) => `• **${m.title}**: ${m.description} *(Pro Tip: ${m.alternative})*`).join('\n\n');
        return `Common tourist pitfalls to avoid at **${name}**:\n\n${mList}`;
      }
    }
  }

  return `As Gemma, your guide for **${name}**: Great question about "${question}"! Historically and culturally, ${name} is full of fascinating details. Be sure to explore our interactive tabs for photo spots, ticket advice, local etiquette, and hidden gems nearby!`;
}

// Helper: fallback response generator when AI key is missing or fails
async function getFallbackLandmarkDetails(landmarkNameStr?: string): Promise<any> {
  if (landmarkNameStr && landmarkNameStr.trim().length > 0) {
    const queryName = landmarkNameStr.trim();
    const searchLower = queryName.toLowerCase();
    const matched = CURATED_LANDMARKS.find(
      c => c.name.toLowerCase().includes(searchLower) || c.location.toLowerCase().includes(searchLower)
    );
    if (matched) return matched.presetDetails;

    const resolvedImage = await getRealLandmarkImageUrlAsync(queryName);

    // Dynamically construct structured travel guide for any custom location query
    return {
      id: `place-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: queryName,
      location: 'Global Destination / Point of Interest',
      tagline: `AI Travel & Cultural Exploration Guide for ${queryName}`,
      category: 'Public Institution / Destination',
      confidence: 95,
      imageUrl: resolvedImage,
      culturalExplanation: {
        history: `${queryName} is a notable destination recognized for its unique character, vibrant local presence, and surrounding community.`,
        architecturalSignificance: `Features architectural elements and layout designed to accommodate visitors, students, and community members.`,
        culturalBackstory: `Serves as an active focal point in its locality, bringing together history, daily human activity, and regional heritage.`,
        symbolism: `Symbolizes community identity, learning, or regional culture in its surrounding area.`,
      },
      mythsAndLegends: [
        {
          title: `The Heritage of ${queryName}`,
          story: `Local stories tell of early founders, historical milestones, and notable figures who helped shape ${queryName}.`,
          type: 'legend',
        },
      ],
      bestPhotoLocations: [
        {
          spotName: `Main Entrance & Front Archway`,
          description: `The primary entrance offers the cleanest perspective capturing the architecture and main signage of ${queryName}.`,
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
  }
  return CURATED_LANDMARKS[0].presetDetails;
}

// 1. Endpoint: GET /api/curated-landmarks
app.get('/api/curated-landmarks', (req, res) => {
  res.json({ success: true, landmarks: CURATED_LANDMARKS });
});

// 2. Endpoint: POST /api/scan-landmark
app.post('/api/scan-landmark', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', textQuery } = req.body;
    const ai = getGeminiAI();

    if (!ai) {
      console.warn('Gemini API key missing, returning curated landmark fallback.');
      const fallback = await getFallbackLandmarkDetails(textQuery);
      if (imageBase64) {
        fallback.imageUrl = imageBase64;
      }
      return res.json({
        success: true,
        landmark: fallback,
        isFallback: true,
        notice: 'Using offline landmark guide. Connect GEMINI_API_KEY for dynamic live scanning.'
      });
    }

    const promptText = `
You are "Ask The Place" - an elite world travel expert, architectural historian, university guide, and cultural guide AI named Gemma.
Analyze the provided image and/or text query ("${textQuery || 'Landmark image'}").
The user is searching for a location which may be a landmark, university, college, museum, park, monument, tourist attraction, public place, neighborhood, or city.
Identify or synthesize an exceptionally detailed, accurate, and culturally deep guide for "${textQuery || 'this location'}" covering:
1. Cultural Explanation (history, architectural or academic significance, cultural backstory, symbolism)
2. Local Myths & Legends (authentic folklore, mysterious tales, urban myths, or historical stories)
3. Best Photo Locations (exact photo spots, camera angles, best times of day, crowd level)
4. Common Tourist Mistakes (scams, queue traps, dress violations, entry traps, severity, alternatives)
5. Best Visiting Time (best season, best time of day, peak hours, average duration, ticket/access advice, weather tip)
6. Nearby Hidden Gems (viewpoints, local authentic food/cafes, secret quiet spots nearby)
7. Local Etiquette (dos, donts, dress code, photography rules, tipping & behavior)
8. Suggested Questions (3 enticing starter questions for the user to ask Gemma)

Return strict JSON strictly matching the schema.
`;

    let parts: any[] = [{ text: promptText }];

    if (imageBase64) {
      // Clean base64 string if data URL prefix exists
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    const response = await generateContentWithFallback(ai, {
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING, description: 'Official landmark name' },
            location: { type: Type.STRING, description: 'City, Country' },
            tagline: { type: Type.STRING, description: 'Evocative 1-sentence tagline' },
            category: { type: Type.STRING, description: 'e.g., Historical Monument, Sacred Site, Natural Wonder' },
            confidence: { type: Type.INTEGER, description: '0 to 100 confidence score' },
            culturalExplanation: {
              type: Type.OBJECT,
              properties: {
                history: { type: Type.STRING },
                architecturalSignificance: { type: Type.STRING },
                culturalBackstory: { type: Type.STRING },
                symbolism: { type: Type.STRING },
              },
              required: ['history', 'architecturalSignificance', 'culturalBackstory', 'symbolism'],
            },
            mythsAndLegends: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  story: { type: Type.STRING },
                  type: { type: Type.STRING, description: 'myth, legend, folklore, or ghost_story' },
                },
                required: ['title', 'story', 'type'],
              },
            },
            bestPhotoLocations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  spotName: { type: Type.STRING },
                  description: { type: Type.STRING },
                  bestTime: { type: Type.STRING },
                  cameraTip: { type: Type.STRING },
                  crowdLevel: { type: Type.STRING, description: 'Low, Medium, or High' },
                },
                required: ['spotName', 'description', 'bestTime', 'cameraTip', 'crowdLevel'],
              },
            },
            commonTouristMistakes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, description: 'warning, critical, or tip' },
                  alternative: { type: Type.STRING },
                },
                required: ['title', 'description', 'severity', 'alternative'],
              },
            },
            bestVisitingTime: {
              type: Type.OBJECT,
              properties: {
                bestSeason: { type: Type.STRING },
                bestTimeOfDay: { type: Type.STRING },
                peakHours: { type: Type.STRING },
                averageDuration: { type: Type.STRING },
                ticketAdvice: { type: Type.STRING },
                weatherTip: { type: Type.STRING },
              },
              required: ['bestSeason', 'bestTimeOfDay', 'peakHours', 'averageDuration', 'ticketAdvice', 'weatherTip'],
            },
            nearbyHiddenGems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING, description: 'viewpoint, eatery, cultural, or nature' },
                  distance: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['name', 'type', 'distance', 'description'],
              },
            },
            localEtiquette: {
              type: Type.OBJECT,
              properties: {
                dos: { type: Type.ARRAY, items: { type: Type.STRING } },
                donts: { type: Type.ARRAY, items: { type: Type.STRING } },
                dressCode: { type: Type.STRING },
                photographyRules: { type: Type.STRING },
                tippingAndBehavior: { type: Type.STRING },
              },
              required: ['dos', 'donts', 'dressCode', 'photographyRules', 'tippingAndBehavior'],
            },
            suggestedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            'name',
            'location',
            'tagline',
            'category',
            'confidence',
            'culturalExplanation',
            'mythsAndLegends',
            'bestPhotoLocations',
            'commonTouristMistakes',
            'bestVisitingTime',
            'nearbyHiddenGems',
            'localEtiquette',
            'suggestedQuestions',
          ],
        },
      },
    });

    const jsonText = response.text || '{}';
    const landmarkData = JSON.parse(jsonText);
    if (!landmarkData.id) {
      landmarkData.id = `scan-${Date.now()}`;
    }

    // Use user's scanned image photo if provided; otherwise retrieve real photo
    if (imageBase64) {
      landmarkData.imageUrl = imageBase64;
    } else {
      landmarkData.imageUrl = await getRealLandmarkImageUrlAsync(
        landmarkData.name || textQuery,
        landmarkData.location,
        landmarkData.imageUrl
      );
    }

    res.json({
      success: true,
      landmark: landmarkData,
    });
  } catch (error: any) {
    console.log('[Scan Landmark] AI quota limited or unavailable, serving contextual fallback data.');
    const fallback = await getFallbackLandmarkDetails(req.body?.textQuery);
    if (req.body?.imageBase64) {
      fallback.imageUrl = req.body.imageBase64;
    }
    res.json({
      success: true,
      landmark: fallback,
      isFallback: true,
      errorMsg: error.message,
    });
  }
});

// 3. Endpoint: POST /api/ask-gemma (Context-aware conversational guide)
app.post('/api/ask-gemma', async (req, res) => {
  const { question, landmarkName, landmarkContext, conversationHistory = [] } = req.body;

  try {
    const ai = getGeminiAI();

    if (!ai) {
      return res.json({
        success: true,
        answer: generateContextualGemmaAnswer(question, landmarkName, landmarkContext),
      });
    }

    const systemInstruction = `
You are Gemma, an enthusiastic, culturally knowledgeable, witty, and helpful local travel companion for "Ask The Place".
Current page landmark: ${landmarkName || "Unknown"}.
Current page context: ${JSON.stringify(landmarkContext || {})}.

IMPORTANT:
If the user's question is about another place (for example "Tell me about Princep Ghat"), ignore the current page landmark and answer about the place mentioned by the user.

Do NOT say things like:
- "We flew from Paris..."
- "I'm currently at the Eiffel Tower..."
- "Let's switch gears..."

Simply answer the user's question naturally.

Instructions:
1. Answer the user's question directly with authentic local wisdom, cultural depth, and practical travel insight.
2. Keep your answer engaging, helpful, and concise (1-3 paragraphs).
3. If relevant, mention photo tips, nearby food secrets, local etiquette, or myths.
4. Maintain a warm, encouraging, conversational guide tone ("Gemma").
`;

    // Construct conversation messages format
    const contents: any[] = [];
    if (conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: question }],
    });

    const response = await generateContentWithFallback(ai, {
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    }, [process.env.MODEL_NAME!]);

    res.json({
      success: true,
      answer: response.text || generateContextualGemmaAnswer(question, landmarkName, landmarkContext),
    });
  } catch (error: any) {
    console.log('[Ask Gemma] AI quota limited, synthesizing contextual guide answer.');
    const contextualAnswer = generateContextualGemmaAnswer(question, landmarkName, landmarkContext);
    res.json({
      success: true,
      answer: contextualAnswer,
      isFallback: true,
    });
  }
});

// 4. Endpoint: POST /api/generate-tts
app.post('/api/generate-tts', async (req, res) => {
  try {
    const { text } = req.body;
    const ai = getGeminiAI();

    if (!ai) {
      return res.json({ success: false, error: 'GEMINI_API_KEY missing' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text: `Read with warm travel guide enthusiasm: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ success: true, audioBase64: base64Audio });
    } else {
      res.json({ success: false, error: 'Audio generation produced no output' });
    }
  } catch (error: any) {
    console.log('[TTS API] Audio generation limit reached, client will fallback to browser speech synthesis.');
    res.json({ success: false, error: error.message });
  }
});

// 5. Endpoint: POST /api/generate-hidden-locals
app.post('/api/generate-hidden-locals', async (req, res) => {
  try {
    const { landmarkName, location, personality } = req.body;
    const ai = getGeminiAI();

    if (!ai) {
      // Return curated fallback guide if key missing
      const fallback = await getFallbackLandmarkDetails(landmarkName);
      return res.json({
        success: true,
        hiddenLocalsGuide: fallback.hiddenLocalsGuide || null,
        isFallback: true
      });
    }

    const personaStr = personality
      ? `Archetype: ${personality.archetype}, Style: ${personality.style}, Pace: ${personality.pace}, Companion: ${personality.travelCompanion}, Traits: ${(personality.traits || []).join(', ')}`
      : 'Curious culture seeker looking for off-the-beaten path local gems';

    const promptText = `
You are "Gemma", an elite local travel companion.
The user is visiting ${landmarkName || 'a famous landmark'} in ${location || 'the area'}.
The user's travel personality profile is: "${personaStr}".

Generate a personalized "Hidden Locals" guide strictly for this location and matching this exact user profile.
Cover ALL of these 7 features:
1. hiddenCafes: Hidden cafes & micro-roasters
2. localFood: Authentic local food & street snacks
3. weekendMarkets: Local weekend markets & artisanal flea markets
4. photoSpots: Photography & vantage spots
5. sunspots: Sunrise & sunset secret spots
6. walkingRoutes: Scenic walking routes
7. familyFriendlySuggestions: Family-friendly or local-only spots

CRITICAL REQUIREMENT: For EVERY single recommendation item, include a field "whyItMatchesUser" where you (Gemma) explicitly explain in 1-2 warm sentences WHY this exact recommendation was chosen specifically for their travel personality profile!

Return strict JSON matching the schema.
`;

    const response = await generateContentWithFallback(ai, {
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hiddenCafes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  addressOrLocation: { type: Type.STRING },
                  bestTime: { type: Type.STRING },
                  whyItMatchesUser: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  priceOrVibe: { type: Type.STRING },
                },
                required: ['id', 'name', 'category', 'description', 'addressOrLocation', 'bestTime', 'whyItMatchesUser', 'tags'],
              },
            },
            localFood: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  addressOrLocation: { type: Type.STRING },
                  bestTime: { type: Type.STRING },
                  whyItMatchesUser: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  priceOrVibe: { type: Type.STRING },
                },
                required: ['id', 'name', 'category', 'description', 'addressOrLocation', 'bestTime', 'whyItMatchesUser', 'tags'],
              },
            },
            weekendMarkets: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  addressOrLocation: { type: Type.STRING },
                  bestTime: { type: Type.STRING },
                  whyItMatchesUser: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  priceOrVibe: { type: Type.STRING },
                },
                required: ['id', 'name', 'category', 'description', 'addressOrLocation', 'bestTime', 'whyItMatchesUser', 'tags'],
              },
            },
            photoSpots: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  addressOrLocation: { type: Type.STRING },
                  bestTime: { type: Type.STRING },
                  whyItMatchesUser: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  priceOrVibe: { type: Type.STRING },
                },
                required: ['id', 'name', 'category', 'description', 'addressOrLocation', 'bestTime', 'whyItMatchesUser', 'tags'],
              },
            },
            sunspots: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  addressOrLocation: { type: Type.STRING },
                  bestTime: { type: Type.STRING },
                  whyItMatchesUser: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  priceOrVibe: { type: Type.STRING },
                },
                required: ['id', 'name', 'category', 'description', 'addressOrLocation', 'bestTime', 'whyItMatchesUser', 'tags'],
              },
            },
            walkingRoutes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  distance: { type: Type.STRING },
                  highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                  description: { type: Type.STRING },
                  whyItMatchesUser: { type: Type.STRING },
                },
                required: ['id', 'title', 'duration', 'distance', 'highlights', 'description', 'whyItMatchesUser'],
              },
            },
            familyFriendlySuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  addressOrLocation: { type: Type.STRING },
                  bestTime: { type: Type.STRING },
                  whyItMatchesUser: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  priceOrVibe: { type: Type.STRING },
                },
                required: ['id', 'name', 'category', 'description', 'addressOrLocation', 'bestTime', 'whyItMatchesUser', 'tags'],
              },
            },
          },
          required: ['hiddenCafes', 'localFood', 'weekendMarkets', 'photoSpots', 'sunspots', 'walkingRoutes', 'familyFriendlySuggestions'],
        },
      },
    });

    const jsonText = response.text || '{}';
    const hiddenLocalsGuide = JSON.parse(jsonText);

    res.json({
      success: true,
      hiddenLocalsGuide,
    });
  } catch (error: any) {
    console.log('[Hidden Locals] AI limit reached, using curated local guide fallback.');
    const fallback = await getFallbackLandmarkDetails(req.body?.landmarkName);
    res.json({
      success: true,
      hiddenLocalsGuide: fallback.hiddenLocalsGuide || null,
      isFallback: true,
      error: error.message,
    });
  }
});

// Vite middleware & Production setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ask The Place server running on http://localhost:${PORT}`);
  });
}

startServer();
