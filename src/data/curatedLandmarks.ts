import { CuratedLandmarkSample } from '../types';

export const CURATED_LANDMARKS: CuratedLandmarkSample[] = [
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    location: 'Paris',
    country: 'France',
    tagline: 'The Iron Lady of Champ de Mars',
    category: 'Historical Monument',
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'eiffel-tower',
      name: 'Eiffel Tower',
      location: 'Paris, France',
      tagline: 'The Iron Lady of Champ de Mars',
      category: 'Historical Monument',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Erected in 1889 as the centerpiece for the Exposition Universelle (World\'s Fair) celebrating the centennial of the French Revolution. Engineered by Gustave Eiffel\'s firm, it was originally meant to stand for only 20 years.',
        architecturalSignificance: 'A masterpiece of 19th-century puddle iron lattice construction standing 330 meters tall. Composed of 18,038 metallic parts held together by 2.5 million rivets.',
        culturalBackstory: 'Initially despised by prominent French artists who called it "useless and monstrous," it saved itself from demolition by serving as a crucial radio transmission tower during WWI.',
        symbolism: 'Global icon of French elegance, industrial innovation, and romantic freedom.'
      },
      mythsAndLegends: [
        {
          title: 'The Con Man Who Sold the Tower Twice',
          story: 'In 1925, infamous fraudster Victor Lustig posed as a French government official and successfully "sold" the Eiffel Tower for scrap metal to a gullible scrap dealer, fleeing to Vienna with a suitcase of cash!',
          type: 'legend'
        },
        {
          title: 'The Secret Top-Floor Apartment',
          story: 'Gustave Eiffel built a private apartment at the very top reserved exclusively for himself and distinguished guests like Thomas Edison. Rumors spread that secret scientific experiments took place inside.',
          type: 'myth'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Place du Trocadéro Terrace',
          description: 'Elevated panoramic viewpoint looking across the Seine directly at the full height of the tower.',
          bestTime: 'Sunrise or Golden Hour (7:00 AM)',
          cameraTip: 'Use a wide-angle 24mm lens and stand near the marble balustrade before tour buses arrive.',
          crowdLevel: 'Medium'
        },
        {
          spotName: 'Rue de l\'Université',
          description: 'A quiet cobblestone street framing the tower towering dramatically between classic Haussmannian buildings.',
          bestTime: 'Late Afternoon',
          cameraTip: 'Shoot low from ground level up to capture the cobblestones in the foreground.',
          crowdLevel: 'Low'
        },
        {
          spotName: 'Passerelle Debilly Bridge',
          description: 'A pedestrian bridge offering reflection shots over the river Seine without traffic interference.',
          bestTime: 'Blue Hour / Twilight (Sparkle Show)',
          cameraTip: 'Tripod or steady hand for a 1/2s shutter speed to capture the glowing light reflection.',
          crowdLevel: 'Low'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Buying Tickets On-Site Without Reservations',
          description: 'Waiting in the walk-up line can take up to 3 to 4 hours in peak season.',
          severity: 'critical',
          alternative: 'Book official online timed-entry summit tickets 60 days in advance at 1:00 AM French time.'
        },
        {
          title: 'Falling for the "Friendship Bracelet" & Petition Scams',
          description: 'Group distraction artists on the Trocadéro steps or Champ de Mars lawn attempt to tie bracelets or demand signatures while pickpocketing.',
          severity: 'warning',
          alternative: 'Keep hands in pockets, walk with intent, and firmly say "Non, merci".'
        },
        {
          title: 'Paying for Overpriced Cafes directly beneath the tower',
          description: 'Restaurants right on Champ de Mars charge double for lukewarm crêpes.',
          severity: 'tip',
          alternative: 'Walk 5 minutes south to Rue Cler for authentic bakeries and bistro dining.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'Spring (April to May) & Autumn (September to October)',
        bestTimeOfDay: 'Sunrise (6:30 AM) or 8:45 PM for the hourly sparkle display',
        peakHours: '11:00 AM - 5:00 PM',
        averageDuration: '2.5 to 3 hours for summit visit',
        ticketAdvice: 'Stair climbing tickets to Level 2 are cheaper, faster, and offer fantastic panoramic views without elevator lines.',
        weatherTip: 'High winds cause the top summit deck to close periodically; check the live official status app.'
      },
      nearbyHiddenGems: [
        {
          name: 'Musée du Quai Branly Gardens',
          type: 'nature',
          distance: '3 mins walk',
          description: 'A tranquil lush garden designed by Gilles Clément with vertical plant walls framing views of the tower.'
        },
        {
          name: 'Rue Cler Market Street',
          type: 'eatery',
          distance: '7 mins walk',
          description: 'A pedestrian street lined with traditional Parisian cheese shops, charcuterie, and artisanal bakeries.'
        },
        {
          name: 'Allée des Cygnes Viewpoint',
          type: 'viewpoint',
          distance: '10 mins walk',
          description: 'A narrow man-made island in the Seine featuring a miniature Statue of Liberty looking directly towards New York.'
        }
      ],
      localEtiquette: {
        dos: [
          'Greet shopkeepers and security staff with a polite "Bonjour, Madame/Monsieur"',
          'Keep volume low when riding elevator cars or walking residential side streets',
          'Dispose of picnic litter properly in designated bins on Champ de Mars'
        ],
        donts: [
          'Do not buy unauthorized flashing Eiffel souvenirs from street hawkers',
          'Avoid blocking narrow pedestrian bridges for long photo poses',
          'Never carve names or stick decals anywhere on metal pillars'
        ],
        dressCode: 'Smart casual; wear comfortable sturdy walking shoes for stairs and gravel lawns.',
        photographyRules: 'Personal photos are permitted freely. (Note: Commercial redistribution of nighttime lighting photos holds copyright restrictions, though casual personal social media posts are standard practice).',
        tippingAndBehavior: 'Service is included (service compris) at French cafes; leaving a €1–€2 coin for good waiter service is appreciated.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [
          {
            id: 'eiffel-cafe-1',
            name: 'Ten Belles 15ème',
            category: 'cafe',
            description: 'Tucked away down a quiet leafy passage, serving specialty filter coffee, house-baked sourdough pastries, and oat lattes far from tourist noise.',
            addressOrLocation: '17 Rue Linois, 75015 Paris (8 mins walk)',
            bestTime: '8:30 AM - 10:30 AM',
            whyItMatchesUser: "Gemma matched this for your artisan palate: local Parisians flock here for single-origin filter roasts and fresh sourdough cinnamon buns without crowded queue lines.",
            tags: ['Specialty Coffee', 'Quiet Courtyard', 'Local Favorite'],
            priceOrVibe: 'Cozy & Artisanal (€4-€8)'
          },
          {
            id: 'eiffel-cafe-2',
            name: 'Café Bleu Passage',
            category: 'cafe',
            description: 'An understated vintage cafe inside a covered passageway featuring velvet chairs, handwritten daily espresso specials, and quiet book nooks.',
            addressOrLocation: 'Passage Landrieu, 75007 Paris (5 mins walk)',
            bestTime: '2:00 PM - 4:00 PM',
            whyItMatchesUser: "Gemma selected this secret spot because it offers quiet refuge with classic French jazz, perfect for recharging away from heavy street traffic.",
            tags: ['Hidden Alley', 'Bookish Vibe', 'Espresso'],
            priceOrVibe: 'Bohemian Vintage (€3-€6)'
          }
        ],
        localFood: [
          {
            id: 'eiffel-food-1',
            name: "Chez L'Ami Jean - Artisan Bistro",
            category: 'food',
            description: 'Famed Basque-Parisian bistro legendary for slow-braised pork cheek, duck terrine, and the famous oversized vanilla rice pudding bowl.',
            addressOrLocation: '27 Rue Malar, 75007 Paris (9 mins walk)',
            bestTime: 'Dinner (Book 3 days ahead)',
            whyItMatchesUser: "Gemma chose this culinary gem because it epitomizes authentic Parisian soul food cooked with intense passion, loved by off-duty neighborhood chefs.",
            tags: ['Basque Bistro', 'World Class Rice Pudding', 'Foodie Icon'],
            priceOrVibe: 'Hearty Bistro (€35-€60)'
          },
          {
            id: 'eiffel-food-2',
            name: 'Boulangerie Poilâne Grenelle',
            category: 'food',
            description: 'Historic wood-fired bakery serving hand-cut sourdough slices topped with melted Normandy butter, goat cheese, and fresh apple tarts.',
            addressOrLocation: '49 Boulevard de Grenelle (6 mins walk)',
            bestTime: 'Morning 9:00 AM',
            whyItMatchesUser: "Gemma selected Poilâne for your authentic quick-bite cravings: famous 100-year-old sourdough starter baked in traditional stone ovens.",
            tags: ['Wood-fired Bakery', 'Sourdough', 'Quick Local Bite'],
            priceOrVibe: 'Artisanal Bakery (€3-€10)'
          }
        ],
        weekendMarkets: [
          {
            id: 'eiffel-market-1',
            name: 'Marché Saxe-Breteuil (Wednesdays & Saturdays)',
            category: 'market',
            description: 'Considered Paris’s most picturesque open-air market, stretching along tree-lined Avenue de Saxe with direct framing of the Eiffel Tower skyline.',
            addressOrLocation: 'Avenue de Saxe, 75007 Paris (10 mins walk)',
            bestTime: 'Saturday 8:30 AM - 12:30 PM',
            whyItMatchesUser: "Gemma recommends this market so you can sample raw milk Camembert, roasted rotisserie chicken, and fresh lavender honey right alongside local 7th arrondissement residents.",
            tags: ['Open-air Food Market', 'Eiffel Skyline View', 'Artisanal Produce'],
            priceOrVibe: 'Vibrant Local Market (€2-€20)'
          },
          {
            id: 'eiffel-market-2',
            name: 'Puces de Vanves Antique Flea Market',
            category: 'market',
            description: 'An unpretentious weekend flea market packed with vintage French copperware, retro cinema posters, antique fountain pens, and handmade lace.',
            addressOrLocation: 'Avenue Georges Lafenestre (15 mins metro)',
            bestTime: 'Sunday Morning 9:00 AM',
            whyItMatchesUser: "Gemma matched this for your curiosity in rare antiquities: unlike overhyped markets, Vanves retains genuine local treasure-hunting charm.",
            tags: ['Vintage Antiques', 'Flea Market', 'Bargain Treasures'],
            priceOrVibe: 'Eclectic Flea Market'
          }
        ],
        photoSpots: [
          {
            id: 'eiffel-photo-1',
            name: 'Square Rapp Wrought Iron Gate',
            category: 'photo',
            description: 'A secret residential courtyard where ornate Art Nouveau iron gates framed by ivy frame the tower peek-a-boo style.',
            addressOrLocation: '3 Square Rapp, 75007 Paris (4 mins walk)',
            bestTime: 'Late Afternoon Light',
            whyItMatchesUser: "Gemma picked this hidden architecture portal because you can take intimate, cinematic portraits framing the tower through wrought-iron arches with zero tourist crowds.",
            tags: ['Art Nouveau', 'Secret Courtyard', 'Zero Crowds'],
            priceOrVibe: 'Photographer Sanctuary'
          },
          {
            id: 'eiffel-photo-2',
            name: 'Pont de Bir-Hakeim Steel Pillars',
            category: 'photo',
            description: 'Double-deck steel bridge featured in Inception, offering symmetrical steel columns framing passing metro trains and the tower riverfront.',
            addressOrLocation: 'Pont de Bir-Hakeim (7 mins walk)',
            bestTime: 'Golden Hour (6:30 PM)',
            whyItMatchesUser: "Gemma highlights this location for its geometric depth of field and dramatic light reflections across the Seine riverbank.",
            tags: ['Symmetrical Steel', 'Cinema Framing', 'River Reflection'],
            priceOrVibe: 'Architectural Perspective'
          }
        ],
        sunspots: [
          {
            id: 'eiffel-sun-1',
            name: 'Passerelle Debilly Sunrise Pier',
            category: 'sunspot',
            description: 'Pedestrian bridge where early risers watch the golden sun emerge over the Seine river, casting long amber shadows across the iron lattice.',
            addressOrLocation: 'Passerelle Debilly (5 mins walk)',
            bestTime: 'Sunrise (6:15 AM - 7:00 AM)',
            whyItMatchesUser: "Gemma picked this sunrise spot for your peace-seeking morning routine: watch morning mist drift along the river as Paris quietly wakes up.",
            tags: ['Sunrise Gold', 'Seine River Mist', 'Morning Quiet'],
            priceOrVibe: 'Serene Dawn'
          },
          {
            id: 'eiffel-sun-2',
            name: 'Jardin Catherine Labouré Sunset Lawn',
            category: 'sunspot',
            description: 'A former convent vegetable garden hidden behind high stone walls where local families gather on lawns under apple trees during golden hour.',
            addressOrLocation: '29 Rue de Babylone (12 mins walk)',
            bestTime: 'Sunset 7:30 PM',
            whyItMatchesUser: "Gemma selected this secret walled garden so you can enjoy sunset silence under vine arbors surrounded by flowering fruit trees.",
            tags: ['Walled Convent Garden', 'Golden Sunset', 'Hidden Park'],
            priceOrVibe: 'Peaceful Oasis'
          }
        ],
        walkingRoutes: [
          {
            id: 'eiffel-walk-1',
            title: 'Secret Passages & Haussmann Courtyards Loop',
            duration: '45 minutes',
            distance: '2.4 km',
            highlights: ['Rue Saint-Dominique Bakeries', 'Square Rapp Courtyard', 'Quai Branly Vertical Garden', 'Passerelle Debilly Bridge'],
            description: 'A relaxed stroll bypassing busy tour bus avenues. Weave through hidden residential squares, scent-filled artisan bakeries, and quiet river piers.',
            whyItMatchesUser: "Gemma customized this route to match your relaxed exploration pace, avoiding traffic noise while uncovering secret architectural corners."
          }
        ],
        familyFriendlySuggestions: [
          {
            id: 'eiffel-fam-1',
            name: 'Champ de Mars Vintage Carousel & Wooden Puppets',
            category: 'family_local',
            description: 'A traditional 100-year-old wooden carousel with hand-painted horses, alongside the historic Théâtre du Guignol puppet show operating since 1902.',
            addressOrLocation: 'Champ de Mars Garden (3 mins walk)',
            bestTime: '3:00 PM - 5:00 PM',
            whyItMatchesUser: "Gemma chose this local family favorite to give kids a magical slice of authentic Parisian childhood history without long ticket queues.",
            tags: ['Vintage Carousel', 'Guignol Puppets', 'Family Classic'],
            priceOrVibe: 'Wholesome Family Fun (€3-€5)'
          },
          {
            id: 'eiffel-fam-2',
            name: 'Jardin Ranelagh Toy Sailboat Pond',
            category: 'family_local',
            description: 'Local neighborhood park where children push vintage wooden sailboats across a quiet pond using long wooden sticks.',
            addressOrLocation: 'Jardin du Ranelagh (10 mins metro)',
            bestTime: 'Weekend Afternoons',
            whyItMatchesUser: "Gemma selected this local-only playground for its relaxing shade trees, playground slides, and charming vintage sailboat rental tradition.",
            tags: ['Wooden Sailboats', 'Shaded Playground', 'Local Kids Only'],
            priceOrVibe: 'Charming Neighborhood Park'
          }
        ]
      },
      suggestedQuestions: [
        'Why does the Eiffel Tower expand in summer heat?',
        'What is the best spot for a picnic with tower views?',
        'Can you tell me more about Gustave Eiffel\'s secret top-floor room?'
      ]
    }
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra',
    country: 'India',
    tagline: 'An Eternal Monument to Immortal Love',
    category: 'Sacred Site',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'taj-mahal',
      name: 'Taj Mahal',
      location: 'Agra, India',
      tagline: 'An Eternal Monument to Immortal Love',
      category: 'Sacred Site',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Commissioned in 1631 by Mughal Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. Constructed over 22 years using 20,000 artisans and 1,000 elephants.',
        architecturalSignificance: 'The pinnacle of Indo-Islamic architecture. Crafted from translucent white Makrana marble inlayed with 28 types of semi-precious stones (lapis lazuli, jade, turquoise, agate) using delicate Pietra Dura stonecraft.',
        culturalBackstory: 'The four minarets around the mausoleum are intentionally tilted slightly outward so that in the event of an earthquake, they fall away from the main dome.',
        symbolism: 'Universal testament to eternal devotion and earthly representation of Islamic paradise (Jannat).'
      },
      mythsAndLegends: [
        {
          title: 'The Myth of the Black Taj Mahal',
          story: 'Legend claims Shah Jahan planned to build a symmetrical twin mausoleum made of pure black marble across the Yamuna river for himself, but was deposed by his son Aurangzeb before work could begin.',
          type: 'myth'
        },
        {
          title: 'The Cut Hands Myth',
          story: 'A popular folk tale alleges Shah Jahan chopped off the hands of the lead architects so they could never build anything as beautiful again. Historical records prove architects were actually granted pensions and lavish estates.',
          type: 'folklore'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Mehtab Bagh (Moonlight Garden)',
          description: 'Located directly across the Yamuna River, providing unobstructed symmetrical views away from the main crowds.',
          bestTime: 'Sunset',
          cameraTip: 'Use a telephoto lens to compress the river reflection against the marble facade.',
          crowdLevel: 'Low'
        },
        {
          spotName: 'Diana Bench (Central Reflecting Pool)',
          description: 'The iconic reflection bench framing the entire ivory dome in the water.',
          bestTime: 'Gates opening at Sunrise (6:00 AM)',
          cameraTip: 'Arrive at East Gate by 5:30 AM to be first in line for crisp morning light.',
          crowdLevel: 'High'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Bringing Banned Items inside the Security Checkpoint',
          description: 'Tripods, drone equipment, large backpacks, food, tobacco, and phone chargers are strictly confiscated.',
          severity: 'critical',
          alternative: 'Bring only your phone, camera, passport, water bottle, and shoe covers in a small pouch.'
        },
        {
          title: 'Visiting on a Friday',
          description: 'The Taj Mahal complex is closed every Friday for religious prayers.',
          severity: 'warning',
          alternative: 'Plan your Agra itinerary for Saturday through Thursday.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'October to March (cool pleasant weather)',
        bestTimeOfDay: 'Sunrise (6:00 AM) when fog clears and marble glows soft pink',
        peakHours: '10:00 AM - 4:00 PM',
        averageDuration: '2 to 3 hours',
        ticketAdvice: 'Foreign tourists get a separate express security entry line; buy tickets online via ASI portal.',
        weatherTip: 'Morning river fog in December/January can delay visibility until 8:30 AM.'
      },
      nearbyHiddenGems: [
        {
          name: 'Agra Fort Viewpoint',
          type: 'cultural',
          distance: '2.5 km',
          description: 'Red sandstone fortress where Shah Jahan spent his final years gazing at the Taj Mahal from his marble balcony.'
        },
        {
          name: 'Sheroes Hangout Cafe',
          type: 'eatery',
          distance: '1.2 km',
          description: 'Inspiring community cafe run by acid attack survivors serving delicious chai and Indian snacks.'
        }
      ],
      localEtiquette: {
        dos: [
          'Wear provided shoe covers or remove shoes before stepping onto the white marble platform',
          'Maintain quiet respect inside the central burial chamber',
          'Dress modestly covering shoulders and knees out of religious reverence'
        ],
        donts: [
          'Strictly no photography or videography inside the main tomb room',
          'Do not touch or scrape the delicate inlaid stone marble walls',
          'Avoid loud shouting or phone calls anywhere inside the gardens'
        ],
        dressCode: 'Modest attire covering shoulders, collarbones, and knees.',
        photographyRules: 'Permitted anywhere outdoors in the garden; prohibited inside the tomb chamber.',
        tippingAndBehavior: 'Official ASI guides should show valid ID badges; tip ₹200–₹500 for good guide explanations.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [
          {
            id: 'taj-cafe-1',
            name: 'Sheroes Hangout & Secret Library',
            category: 'cafe',
            description: 'A cozy, empowering cafe operated by courageous acid attack survivors, serving hot cardamom chai, lemon tea, fresh pakoras, and a serene community library.',
            addressOrLocation: 'Fatehabad Road, Agra (1.2 km from Taj)',
            bestTime: '4:00 PM - 6:30 PM',
            whyItMatchesUser: "Gemma highlighted Sheroes for your compassionate travel soul: pay-what-you-want delicious chai while directly empowering local women artisans.",
            tags: ['Social Enterprise', 'Cardamom Chai', 'Inspiring Vibe'],
            priceOrVibe: 'Heartwarming & Pay-What-You-Wish'
          },
          {
            id: 'taj-cafe-2',
            name: 'Joney’s Place Rooftop Espresso',
            category: 'cafe',
            description: 'Tiny legendary spot in Taj Ganj functioning since 1978, famous for thick banana lassis, ginger lemon tea, and freshly fried vegetable parathas.',
            addressOrLocation: 'Maji Mandi, Taj Ganj (5 mins walk)',
            bestTime: 'Breakfast (7:30 AM)',
            whyItMatchesUser: "Gemma picked Joney’s because you appreciate authentic backpacker culture: watch sunrise light touch the Taj dome while sipping hot spiced tea.",
            tags: ['Taj Ganj Classic', 'Banana Lassi', 'Rooftop View'],
            priceOrVibe: 'Budget Backpack Gem (₹100-₹250)'
          }
        ],
        localFood: [
          {
            id: 'taj-food-1',
            name: 'Petha Sweets at Panchhi Petha (Noori Gate)',
            category: 'food',
            description: 'Agra’s signature royal Mughal sweet crafted from ash gourd (winter melon) infused with saffron, rosewater, and crushed pistachios.',
            addressOrLocation: 'Noori Gate, Agra Old City',
            bestTime: 'Afternoon 2:00 PM',
            whyItMatchesUser: "Gemma selected original Panchhi Petha for your curious foodie appetite: sample 400-year-old sweetmaking heritage straight from brass cauldrons.",
            tags: ['Mughal Dessert', 'Ash Gourd Petha', 'Heritage Recipe'],
            priceOrVibe: 'Royal Confection (₹150/box)'
          },
          {
            id: 'taj-food-2',
            name: 'Bedai & Jalebi at Deviram Sweets',
            category: 'food',
            description: 'Authentic Agra breakfast: crispy fried spiced dough balls served with spicy potato curry and golden saffron jalebis.',
            addressOrLocation: 'Pratap Pura Crossing, Agra',
            bestTime: 'Sunday Morning 8:00 AM',
            whyItMatchesUser: "Gemma selected this morning local ritual because you love immersing yourself in bustling local street food traditions.",
            tags: ['Local Breakfast', 'Spicy Potato Curry', 'Crispy Jalebi'],
            priceOrVibe: 'Bustling Street Feast (₹60-₹100)'
          }
        ],
        weekendMarkets: [
          {
            id: 'taj-market-1',
            name: 'Sadard Bazaar Artisanal Leather & Brass Market',
            category: 'market',
            description: 'Evening night market famed for hand-carved marble Pietra Dura coasters, genuine leather footwear, and embroidered silk shawls.',
            addressOrLocation: 'Sadar Bazaar, Cantonment Agra',
            bestTime: 'Evening 6:30 PM - 9:00 PM',
            whyItMatchesUser: "Gemma matched Sadar Bazaar for your love of authentic handicrafts, where 5th generation marble inlay carvers demonstrate traditional chisel arts.",
            tags: ['Marble Inlay Craft', 'Night Market', 'Leather Goods'],
            priceOrVibe: 'Bustling Handicraft Bazaar'
          }
        ],
        photoSpots: [
          {
            id: 'taj-photo-1',
            name: 'Kachhpura Village Yamuna Shoreline',
            category: 'photo',
            description: 'Historic Mughal village on the north bank where buffalo graze along the riverbank framing the Taj Mahal across golden waters.',
            addressOrLocation: 'Kachhpura Village (Across Yamuna River)',
            bestTime: 'Golden Hour (5:15 PM)',
            whyItMatchesUser: "Gemma picked this rural viewpoint for your cinematic photography style, capturing the ivory dome reflected in calm river mirrors far away from ticket crowds.",
            tags: ['Riverfront Reflection', 'Rural Village', 'Cinematic Silhouette'],
            priceOrVibe: 'Quiet River Bank'
          }
        ],
        sunspots: [
          {
            id: 'taj-sun-1',
            name: 'Mehtab Bagh Moonlight Garden Sunset',
            category: 'sunspot',
            description: 'Symmetrical Charbagh garden directly opposite the Taj where the ivory marble turns soft amber as the sun dips behind the horizon.',
            addressOrLocation: 'Nagla Devjit, Agra (Opposite Taj)',
            bestTime: 'Sunset 6:00 PM',
            whyItMatchesUser: "Gemma matched this for your golden hour glow preference: experience uninterrupted views of the river and monument without indoor crowds.",
            tags: ['Mughal Garden', 'Amber Sunset', 'Unobstructed View'],
            priceOrVibe: 'Serene Sunset'
          }
        ],
        walkingRoutes: [
          {
            id: 'taj-walk-1',
            title: 'Mughal Heritage Village & Artisan Alley Walk',
            duration: '1 hour',
            distance: '3.0 km',
            highlights: ['Taj East Gate Gardens', 'Taj Ganj Marble Workshops', 'Sheroes Cafe', 'Yamuna River Pier'],
            description: 'A peaceful walking journey connecting green tree-lined sanctuaries, hereditary marble carver workshops, and cozy teahouses.',
            whyItMatchesUser: "Gemma crafted this route for your balanced pace, offering rich cultural interactions with local artisans."
          }
        ],
        familyFriendlySuggestions: [
          {
            id: 'taj-fam-1',
            name: 'Taj Nature Walk Sanctuaries',
            category: 'family_local',
            description: 'A 500-hectare forested nature reserve located just 500m from the East Gate with walking trails, watchtowers, and peacocks.',
            addressOrLocation: 'East Gate Road, Agra (5 mins walk)',
            bestTime: 'Morning 8:00 AM',
            whyItMatchesUser: "Gemma selected this forest sanctuary as a peaceful family refuge where kids can spot wild peacocks, green parakeets, and deer.",
            tags: ['Peacock Trail', 'Forested Watchtowers', 'Kid Friendly'],
            priceOrVibe: 'Nature Sanctuary (₹100)'
          }
        ]
      },
      suggestedQuestions: [
        'How does the Taj Mahal change color throughout the day?',
        'What semi-precious stones were used in the marble inlays?',
        'Where is the best quiet place nearby to drink tea with a view?'
      ]
    }
  },
  {
    id: 'fushimi-inari',
    name: 'Fushimi Inari Taisha',
    location: 'Kyoto',
    country: 'Japan',
    tagline: 'The Pathway of Ten Thousand Vermilion Torii Gates',
    category: 'Sacred Site',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'fushimi-inari',
      name: 'Fushimi Inari Taisha',
      location: 'Kyoto, Japan',
      tagline: 'The Pathway of Ten Thousand Vermilion Torii Gates',
      category: 'Sacred Site',
      confidence: 98,
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Founded in 711 AD before Kyoto became capital. Dedicated to Inari, the Shinto deity of rice, agriculture, prosperity, and business.',
        architecturalSignificance: 'Features over 10,000 vibrant vermilion (vermilion red/orange) torii gates lining a 4km mountain trail up Mount Inari. The cinnabar red color traditionally wards off evil spirits.',
        culturalBackstory: 'Each torii gate is donated by a Japanese company or individual expressing gratitude for business success. Donor names and donation dates are carved in black kanji on the back of each gate.',
        symbolism: 'Spiritual gateway connecting the human physical realm with the sacred world of Kami (spirits).'
      },
      mythsAndLegends: [
        {
          title: 'The Fox Messengers (Kitsune)',
          story: 'Stone foxes throughout the shrine grounds are sacred messengers of Inari. Many hold key keys to grain storehouses or jeweled orbs in their mouths symbolizing divine power.',
          type: 'folklore'
        },
        {
          title: 'The Heavy-Light Stone Test (Omokaru-ishi)',
          story: 'Near Okusha Shrine, lift a stone lantern top after making a wish. If the stone feels lighter than expected, your wish will come true soon!',
          type: 'myth'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Senbon Torii (Dual Gate Tunnel)',
          description: 'The famous dense twin tunnels where the gates split into two parallel walkways.',
          bestTime: '7:00 AM or after 7:00 PM (night illuminated trail)',
          cameraTip: 'Wait patiently for a break in visitors and shoot framed down the center tunnel with depth of field.',
          crowdLevel: 'High'
        },
        {
          spotName: 'Yotsutsuji Intersection Viewpoint',
          description: 'Halfway up Mount Inari offering sweeping sunset views over Kyoto city.',
          bestTime: 'Late Afternoon / Golden Hour',
          cameraTip: 'Use Kyoto skyline as backdrop with cedar forest framing.',
          crowdLevel: 'Medium'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Stopping at the Very First Gate Cluster',
          description: 'Tourists crowd the bottom entrance, creating gridlock.',
          severity: 'tip',
          alternative: 'Walk 10 minutes further up the mountain where 90% of tourists turn around and trails become quiet.'
        },
        {
          title: 'Eating While Walking (Aruki-kui)',
          description: 'Walking while eating food from street stalls is considered disrespectful in Japanese shrine etiquette.',
          severity: 'warning',
          alternative: 'Eat nearby the stall where you purchased food or sit at mountain teahouses.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'Autumn (November foliage) & Spring (Cherry Blossoms)',
        bestTimeOfDay: 'Early Morning (6:30 AM) or Night Walk (Open 24/7!)',
        peakHours: '9:30 AM - 4:00 PM',
        averageDuration: '2 to 3 hours for full loop summit',
        ticketAdvice: 'Free entry! No tickets required.',
        weatherTip: 'The forest shade keeps trails cool, but carry water in summer as humidity climbs.'
      },
      nearbyHiddenGems: [
        {
          name: 'Kandakaraya Teahouse',
          type: 'eatery',
          distance: '20 mins mountain climb',
          description: 'Traditional mountainside teahouse serving hot Kitsune Udon (sweet fried tofu noodle soup) with panoramic forest views.'
        },
        {
          name: 'Tofuku-ji Temple Bridge',
          type: 'cultural',
          distance: '12 mins walk',
          description: 'Zen temple famous for its wooden Tsutenkyo bridge spanning a valley of maples.'
        }
      ],
      localEtiquette: {
        dos: [
          'Perform purification at Temizuya water basin (rinse left hand, right hand, mouth, then scoop handle)',
          'Bow slightly when passing beneath Torii gates',
          'Throw a 5-yen coin (go-en for good luck) in the offering box before double bowing, double clapping, and praying'
        ],
        donts: [
          'Do not walk directly down the exact center of the path (the middle path, Seichu, is reserved for Kami spirits)',
          'Never vandalize, write, or scratch on the wooden torii gates',
          'Keep voices quiet and avoid intrusive tripod setups on narrow steps'
        ],
        dressCode: 'Casual athletic walking gear with comfortable shoes; trails feature many stair steps.',
        photographyRules: 'Permitted along trails; be respectful near worshipping priests and avoid blocking worshippers.',
        tippingAndBehavior: 'No tipping in Japan anywhere; exceptional service is standard.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [
          {
            id: 'inari-cafe-1',
            name: 'Vermillion Espresso Bar & Garden',
            category: 'cafe',
            description: 'Founded by Kyoto locals who lived in Melbourne, serving precise pour-overs and espresso alongside matcha cheesecakes on a forest deck overlooking a tranquil duck pond.',
            addressOrLocation: 'Fushimi Inari Station trail (3 mins walk)',
            bestTime: '9:00 AM - 11:00 AM',
            whyItMatchesUser: "Gemma selected Vermillion for your coffee lover soul: sip single-origin Kyoto roasts while watching bamboo leaves sway over forest waters.",
            tags: ['Specialty Coffee', 'Forest Deck', 'Matcha Cheesecake'],
            priceOrVibe: 'Japanese Modern Espresso (¥500-¥900)'
          },
          {
            id: 'inari-cafe-2',
            name: 'Kandakaraya Mountain Teahouse',
            category: 'cafe',
            description: 'Historic 150-year-old mountain teahouse midway up Mount Inari serving hot green matcha tea, roasted houjicha, and sweet dango rice skewers.',
            addressOrLocation: 'Upper Mountain Trail (25 mins climb)',
            bestTime: 'Mid-climb Rest (11:30 AM)',
            whyItMatchesUser: "Gemma chose Kandakaraya because it rewards hikers with sweeping bird-eye views of southern Kyoto city while resting on tatami mats.",
            tags: ['Tatami Seating', 'Hot Matcha & Dango', 'Mountain Panorama'],
            priceOrVibe: 'Traditional Mountain Teahouse'
          }
        ],
        localFood: [
          {
            id: 'inari-food-1',
            name: 'Kitsune Udon & Inari-zushi at Nezameya',
            category: 'food',
            description: 'Historic restaurant dating back to 1540 (allegedly visited by samurai warlord Toyotomi Hideyoshi), serving sweet fried tofu sushi pouches and grilled eel.',
            addressOrLocation: 'Fushimi Inari Main Approach (2 mins walk)',
            bestTime: 'Lunch (12:00 PM)',
            whyItMatchesUser: "Gemma highlighted Nezameya for your love of ancient culinary roots: fried tofu pockets honor the fox spirits (Kitsune) loved by Inari worshippers.",
            tags: ['400-Year-Old Eatery', 'Kitsune Udon', 'Inari-zushi'],
            priceOrVibe: 'Samurai Era Classic (¥1,000-¥2,200)'
          }
        ],
        weekendMarkets: [
          {
            id: 'inari-market-1',
            name: 'Fushimi Sake District Weekend Brewery Tasting Walk',
            category: 'market',
            description: 'Historic rice wine district 10 minutes south along the canal, lined with willow trees, traditional wooden sake cellars, and weekend craft stalls.',
            addressOrLocation: 'Fushimi Sake District (10 mins train)',
            bestTime: 'Weekend Afternoon 2:00 PM',
            whyItMatchesUser: "Gemma matched Fushimi Sake Cellars for your appreciation of pure underground spring waters and small-batch Junmai Daiginjo sake tastings.",
            tags: ['Sake Breweries', 'Willow Canal Walk', 'Local Crafts'],
            priceOrVibe: 'Scenic Sake Haven'
          }
        ],
        photoSpots: [
          {
            id: 'inari-photo-1',
            name: 'Shin-Semen Torii Forest Tunnel',
            category: 'photo',
            description: 'Upper mountain loop where mossy stone fox altars (Ozuka) and ancient cedar trees create misty sunbeam filter effects.',
            addressOrLocation: 'Upper Mount Inari Trail (30 mins climb)',
            bestTime: 'Early Morning (7:00 AM)',
            whyItMatchesUser: "Gemma selected this upper trail for your photography style: morning light piercing through vermilion arches and green mossy stone lanterns without crowds.",
            tags: ['Mossy Stone Fox Altars', 'Sunbeams', 'Zero Crowds'],
            priceOrVibe: 'Mystical Sanctuary'
          }
        ],
        sunspots: [
          {
            id: 'inari-sun-1',
            name: 'Yotsutsuji Intersection Sunset Over Kyoto',
            category: 'sunspot',
            description: 'Mountain ridge intersection offering panoramic views over Kyoto valley as sunset turns the city skyline soft pink and amber.',
            addressOrLocation: 'Yotsutsuji Lookout (20 mins climb)',
            bestTime: 'Sunset (5:30 PM - 6:15 PM)',
            whyItMatchesUser: "Gemma matched this for your golden hour preference: watch lanterns flicker awake along the forest trail as dusk settles over Kyoto.",
            tags: ['Panoramic Sunset', 'Flickering Lanterns', 'Kyoto City View'],
            priceOrVibe: 'Breathtaking Sunset'
          }
        ],
        walkingRoutes: [
          {
            id: 'inari-walk-1',
            title: 'Mount Inari Sacred Forest Circuit',
            duration: '1.5 hours',
            distance: '4.0 km',
            highlights: ['Senbon Torii', 'Vermillion Cafe Deck', 'Yotsutsuji Viewpoint', 'Bamboo Forest Trail'],
            description: 'A spiritual hiking loop climbing past thousands of gates, mossy stone fox shrines, hidden mountain teahouses, and quiet bamboo groves.',
            whyItMatchesUser: "Gemma designed this route for your active exploration pace, balancing physical activity with peaceful forest meditation."
          }
        ],
        familyFriendlySuggestions: [
          {
            id: 'inari-fam-1',
            name: 'Fox Mask Painting & Senbei Rice Cracker Stalls',
            category: 'family_local',
            description: 'Local artisan shops along the shrine approach where kids can hand-paint ceramic Kitsune fox masks and watch traditional rice crackers toasted over charcoal.',
            addressOrLocation: 'Fushimi Shrine Approach Stalls',
            bestTime: 'Late Afternoon 3:30 PM',
            whyItMatchesUser: "Gemma chose this interactive craft experience so children can take home a personalized hand-painted fox souvenir crafted with local artists.",
            tags: ['Fox Mask Painting', 'Charcoal Rice Crackers', 'Kid Craft'],
            priceOrVibe: 'Fun Hands-On Craft (¥800)'
          }
        ]
      },
      suggestedQuestions: [
        'How much does it cost a Japanese company to sponsor a Torii gate?',
        'Why are fox statues holding keys in their mouths?',
        'Is it safe to walk Mount Inari at night?'
      ]
    }
  },
  {
    id: 'colosseum',
    name: 'Colosseum',
    location: 'Rome',
    country: 'Italy',
    tagline: 'The Flavian Amphitheatre of Gladiatorial Combat',
    category: 'Historical Monument',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'colosseum',
      name: 'Colosseum',
      location: 'Rome, Italy',
      tagline: 'The Flavian Amphitheatre of Gladiatorial Combat',
      category: 'Historical Monument',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Commissioned by Emperor Vespasian in 72 AD and completed in 80 AD under Emperor Titus. Could seat over 50,000 spectators for gladiatorial games, mock sea battles (naumachiae), and public executions.',
        architecturalSignificance: 'Constructed from travertine stone, tuff, and brick-faced concrete. Utilized three tiers of classical arcades: Doric on ground floor, Ionic on second, Corinthian on third.',
        culturalBackstory: 'Underneath the wooden arena floor lay the Hypogeum—a complex two-story subterranean maze of tunnels, trapdoors, and hydraulic lifts that lifted wild beasts and gladiators into the arena.',
        symbolism: 'Monumental symbol of Roman imperial power, spectacle, and engineering prowess.'
      },
      mythsAndLegends: [
        {
          title: 'The Thumbs Down Myth',
          story: 'Hollywood popularized the notion that "thumbs down" meant death and "thumbs up" meant mercy. In ancient Rome, a pollice verso (turned thumb towards chest) symbolized drawing the sword for death, while a closed fist with tucked thumb meant spare him.',
          type: 'myth'
        },
        {
          title: 'The Medieval Ghost Gladiators',
          story: 'In the Middle Ages, locals believed the abandoned ruined Colosseum was a portal to hell where pagan necromancers summoned spirits at night.',
          type: 'legend'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Via Nicola Salvi Upper Balcony',
          description: 'Street balcony located right above the Colosseo Metro station offering an unobstructed elevated angle.',
          bestTime: 'Blue Hour / Sunset',
          cameraTip: 'Position yourself to capture street traffic light trails winding around the illuminated arches.',
          crowdLevel: 'Medium'
        },
        {
          spotName: 'Colle Oppio Park Hill',
          description: 'Lush park overlooking the northeastern outer ring of arches away from crowds.',
          bestTime: 'Morning Light',
          cameraTip: 'Frame through pine tree branches for a scenic framing of ancient stone.',
          crowdLevel: 'Low'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Taking Photos with Costumed "Gladiators"',
          description: 'Men dressed in plastic gladiator outfits pose for photos then aggressively demand €20–€50 per person.',
          severity: 'warning',
          alternative: 'Politely decline and walk away; ignore aggressive street costume hustlers.'
        },
        {
          title: 'Forgetting Passport/ID for Entry',
          description: 'Tickets in Rome are now strictly nominative (printed with your legal name) to stop scalpers.',
          severity: 'critical',
          alternative: 'Bring physical passport matching the exact name on your online ticket.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'Late Autumn (October-November) & Early Spring',
        bestTimeOfDay: 'First slot at 8:30 AM or late afternoon 2 hours before closing',
        peakHours: '10:30 AM - 3:00 PM',
        averageDuration: '3 hours (includes Roman Forum and Palatine Hill)',
        ticketAdvice: 'Full Experience Underground & Arena Floor tickets sell out in seconds; set calendar reminders 30 days prior.',
        weatherTip: 'Summer midday heat in July/August reaches 40°C with zero shade inside the Forum.'
      },
      nearbyHiddenGems: [
        {
          name: 'Basilica of San Clemente',
          type: 'cultural',
          distance: '5 mins walk',
          description: 'A fascinating 3-tiered time capsule building: 12th century church on top of a 4th century basilica on top of a 1st century Roman pagan temple.'
        },
        {
          name: 'Monti Neighborhood Bistros',
          type: 'eatery',
          distance: '7 mins walk',
          description: 'Trendy bohemian quarter packed with authentic trattorias serving carbonara and cacio e pepe.'
        }
      ],
      localEtiquette: {
        dos: [
          'Refill water bottles for free at Rome\'s antique "Nasone" drinking fountains around the perimeter',
          'Keep right on metro escalators and stairwells',
          'Tipping is casual; rounding up bill by €2-€5 is customary for dining'
        ],
        donts: [
          'Never sit or lean heavily on ancient marble fragments',
          'Strictly forbidden to scratch names into ancient stone (carving stone carries heavy fines and jail terms)',
          'Do not buy bottled water from unauthorized street vendors selling sun-heated bottles'
        ],
        dressCode: 'Comfortable walking shoes; shoulders covered if continuing into churches.',
        photographyRules: 'Handheld cameras permitted; tripods and drones strictly forbidden without municipal permit.',
        tippingAndBehavior: 'Coperto (cover charge) is normal on Italian restaurant receipts; tip small change.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [
          {
            id: 'colo-cafe-1',
            name: 'Caffè Caffè & Secret Terrace',
            category: 'cafe',
            description: 'Tucked along Via San Giovanni in Laterano, serving rich Roman espresso, freshly baked pistachio cornetti, and squeezed blood orange juice.',
            addressOrLocation: 'Via San Giovanni in Laterano (3 mins walk)',
            bestTime: 'Morning 8:00 AM - 9:30 AM',
            whyItMatchesUser: "Gemma picked Caffè Caffè for your authentic morning coffee craving: sit alongside local Roman residents before stepping onto the arena stones.",
            tags: ['Pistachio Cornetti', 'Roman Espresso', 'Shaded Sidewalk'],
            priceOrVibe: 'Classic Roman Bar (€2-€5)'
          }
        ],
        localFood: [
          {
            id: 'colo-food-1',
            name: 'Trattoria da Enzo al 29 - Cacio e Pepe & Suppli',
            category: 'food',
            description: 'Authentic Trastevere/Monti trattoria famous for crispy golden fried risotto balls (suppli) and silky handmade rigatoni carbonara.',
            addressOrLocation: 'Via dei Vascellari / Monti Quarter (8 mins walk)',
            bestTime: 'Lunch (Arrive by 12:15 PM)',
            whyItMatchesUser: "Gemma selected Da Enzo for your culinary passion: tasted by generations of Romans who appreciate uncompromised guanciale and Pecorino Romano.",
            tags: ['Carbonara', 'Crispy Suppli', 'Roman Trattoria'],
            priceOrVibe: 'Authentic Roman Feast (€18-€30)'
          }
        ],
        weekendMarkets: [
          {
            id: 'colo-market-1',
            name: 'Mercato di Campagna Amica at Circus Maximus (Weekends)',
            category: 'market',
            description: 'Weekend farmers market housed in an ancient Jewish neighborhood hall near Circus Maximus, featuring local Lazio truffles, olive oil, and aged pecorino.',
            addressOrLocation: 'Via dei Cerchi 75 (10 mins walk)',
            bestTime: 'Saturday 10:00 AM',
            whyItMatchesUser: "Gemma matched this market so you can sample local Lazio honeys, buffalo mozzarella, and artisanal organic wines direct from local farmers.",
            tags: ['Farmers Market', 'Lazio Truffles', 'Local Farmers'],
            priceOrVibe: 'Organic Farmers Market'
          }
        ],
        photoSpots: [
          {
            id: 'colo-photo-1',
            name: 'Giardino degli Aranci (Orange Garden) Keyhole View',
            category: 'photo',
            description: 'Hilltop orange grove on Aventine Hill offering a famous keyhole perspective framing Saint Peter’s Basilica across rose gardens.',
            addressOrLocation: 'Aventine Hill (12 mins walk)',
            bestTime: 'Golden Hour (6:00 PM)',
            whyItMatchesUser: "Gemma highlighted this secret keyhole framing spot for your eye for romantic architectural perspectives with sunset vistas.",
            tags: ['Orange Garden', 'Keyhole Perspective', 'Aventine Hill View'],
            priceOrVibe: 'Romantic Hilltop'
          }
        ],
        sunspots: [
          {
            id: 'colo-sun-1',
            name: 'Terrazza del Pincio Sunset Pier',
            category: 'sunspot',
            description: 'Panoramic hill terrace overlooking Piazza del Popolo where acoustic guitarists play as the Roman sky turns deep violet and crimson.',
            addressOrLocation: 'Pincio Terrace, Villa Borghese Gardens',
            bestTime: 'Sunset (7:00 PM)',
            whyItMatchesUser: "Gemma matched this iconic Roman sunset terrace for your love of music and golden light cascading over ancient domes.",
            tags: ['Panoramic Roman Sunset', 'Live Acoustic Guitar', 'Villa Borghese'],
            priceOrVibe: 'Magical Evening'
          }
        ],
        walkingRoutes: [
          {
            id: 'colo-walk-1',
            title: 'Ancient Suburra & Bohemian Monti Cobblestone Stroll',
            duration: '1 hour',
            distance: '2.8 km',
            highlights: ['Suburra Stairs', 'Piazza della Madonna dei Monti', 'Vintage Clothing Boutiques', 'Basilica San Clemente'],
            description: 'Explore Rome’s oldest plebeian neighborhood, now turned into a vibrant bohemian enclave of ivy-covered alleyways, artisan gelaterias, and fountain plazas.',
            whyItMatchesUser: "Gemma curated this route for your relaxed exploration pace, away from tourist traps and into Roman neighborhood daily life."
          }
        ],
        familyFriendlySuggestions: [
          {
            id: 'colo-fam-1',
            name: 'Colle Oppio Park Playground & Gladiator School',
            category: 'family_local',
            description: 'Lush green park right across from the Colosseum with shaded children’s playgrounds, fountains, and interactive ancient Rome history workshops.',
            addressOrLocation: 'Colle Oppio Park (2 mins walk)',
            bestTime: 'Morning 9:30 AM',
            whyItMatchesUser: "Gemma chose Colle Oppio so kids can burn off energy on tree-shaded slides while parents sip espresso with Colosseum views.",
            tags: ['Shaded Playground', 'Interactive Rome History', 'Family Safe'],
            priceOrVibe: 'Family Park Oasis'
          }
        ]
      },
      suggestedQuestions: [
        'How did ancient Romans flood the Colosseum for sea battle re-enactments?',
        'Where is the best authentic carbonara pasta near the Colosseum?',
        'What was the Hypogeum underground lift system?'
      ]
    }
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    location: 'Cusco',
    country: 'Peru',
    tagline: 'The Lost Citadel of the Incas in the Cloud Forest',
    category: 'Historical Monument',
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'machu-picchu',
      name: 'Machu Picchu',
      location: 'Cusco, Peru',
      tagline: 'The Lost Citadel of the Incas in the Cloud Forest',
      category: 'Historical Monument',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Built around 1450 AD under Inca Emperor Pachacuti as a royal estate and sacred ceremonial complex. Abandoned during the Spanish Conquest and hidden by lush jungle until Hiram Bingham visited in 1911.',
        architecturalSignificance: 'Constructed using Ashlar dry-stone masonry without mortar. Huge granite boulders were cut so precisely that not even a knife blade can fit between stones.',
        culturalBackstory: 'The Citadel was strategically aligned with astronomical events and sacred peaks (Apus), functioning as an observatory and spiritual retreat.',
        symbolism: 'Ultimate symbol of Incan engineering mastery and harmony between human architecture and dramatic Andean nature.'
      },
      mythsAndLegends: [
        {
          title: 'The Intihuatana Sun Tethering Stone',
          story: 'The Intihuatana stone is a sacred astronomical clock. Inca priests believed touching their forehead to the stone connected their spirit directly with the solar deity Inti during solstices.',
          type: 'legend'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Guardhouse Overlook Circuit 1/2',
          description: 'The postcard classic elevated view looking down across the terrace agricultural steps and Huayna Picchu mountain peak.',
          bestTime: 'Morning 7:30 AM as cloud mist clears',
          cameraTip: 'Frame llamas grazing on lower grassy terraces for authentic Andean foreground depth.',
          crowdLevel: 'High'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Arriving Without Acclimatizing in Cusco',
          description: 'Altitude sickness (soroche) at 2,430m can ruin hikes if arriving straight from sea level.',
          severity: 'warning',
          alternative: 'Rest in Cusco or Sacred Valley for 2 days drinking coca leaf tea before visiting.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'Dry Season (May to October)',
        bestTimeOfDay: 'Early Morning 6:00 AM or Late Afternoon 2:30 PM',
        peakHours: '10:00 AM - 1:00 PM',
        averageDuration: '3 to 4 hours',
        ticketAdvice: 'Circuit 1 or 2 tickets must be booked online 3-4 months in advance.',
        weatherTip: 'Mornings often start with mountain fog that dramatically burns off by 8:00 AM.'
      },
      nearbyHiddenGems: [
        {
          name: 'Mandor Waterfall Trail',
          type: 'nature',
          distance: '45 mins walk',
          description: 'A tranquil jungle trail along orchid-lined streams to a hidden mountain waterfall.'
        }
      ],
      localEtiquette: {
        dos: ['Stay on designated circuits and respect rope barriers', 'Chew coca leaves or drink mate de coca for altitude relief'],
        donts: ['Do not touch or lean against ancient mortarless granite walls', 'Drones and plastic single-use bottles are strictly prohibited'],
        dressCode: 'Sturdy hiking boots, layered rain jacket, and sun hat.',
        photographyRules: 'Handheld cameras permitted; tripods are strictly prohibited.',
        tippingAndBehavior: 'Tip local porters, trek guides, and bus drivers generously.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [
          {
            id: 'mp-cafe-1',
            name: 'Tree House Restaurant & Coffee',
            category: 'cafe',
            description: 'Tucked up cobblestone steps in Aguas Calientes, serving organic Peruvian pour-over coffee, alpaca steaks, and Andean craft beers.',
            addressOrLocation: 'Calle Huanacaure, Aguas Calientes',
            bestTime: '4:00 PM - 6:30 PM',
            whyItMatchesUser: 'Gemma selected Tree House for your gourmet Andean palate: taste local cloud forest coffee beans roasted in Sacred Valley.',
            tags: ['Sacred Valley Coffee', 'Earthy Vibe', 'Craft Beer'],
            priceOrVibe: 'Cozy Mountain Bistro'
          }
        ],
        localFood: [],
        weekendMarkets: [],
        photoSpots: [],
        sunspots: [],
        walkingRoutes: [],
        familyFriendlySuggestions: []
      },
      suggestedQuestions: [
        'How did Incas transport massive granite boulders up steep mountain cliffs?',
        'What is the difference between Machu Picchu Circuit 1 and Circuit 2?',
        'Where can I get the famous Machu Picchu passport stamp?'
      ]
    }
  },
  {
    id: 'sagrada-familia',
    name: 'Sagrada Família',
    location: 'Barcelona',
    country: 'Spain',
    tagline: 'Gaudí’s Organic Gothic Basilica of Light and Stone',
    category: 'Sacred Site',
    imageUrl: 'https://images.unsplash.com/photo-1583772603224-f77409f8c6b2?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'sagrada-familia',
      name: 'Sagrada Família',
      location: 'Barcelona, Spain',
      tagline: 'Gaudí’s Organic Gothic Basilica of Light and Stone',
      category: 'Sacred Site',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1583772603224-f77409f8c6b2?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Designed by visionary Catalan architect Antoni Gaudí starting in 1883. Financed entirely by private donations and ticket sales, construction continues after 140+ years.',
        architecturalSignificance: 'A masterpiece of Catalan Modernisme combining Gothic art with organic nature forms. Tree-like columns branch out into vaulted forest ceilings lit by rainbow stained glass.',
        culturalBackstory: 'Gaudí dedicated his final 40 years exclusively to the basilica, sleeping inside his workshop. He is buried inside the crypt.',
        symbolism: 'Spiritual stone forest celebrating creation, light, and Christian symbolism.'
      },
      mythsAndLegends: [
        {
          title: 'The Magic Magic Square Cryptogram',
          story: 'On the Passion Façade, a 4x4 cryptographic stone grid sums to 33 in every direction—the exact age of Jesus Christ at the Crucifixion.',
          type: 'myth'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Plaça de Gaudí Park Pond',
          description: 'Park terrace across the pond offering a full reflection of the Nativity Façade and soaring spires.',
          bestTime: 'Morning Light (8:30 AM)',
          cameraTip: 'Shoot low from the water’s edge to catch the spire reflection between lily pads.',
          crowdLevel: 'Medium'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Buying Tickets at the Gate',
          description: 'On-site ticket booths no longer exist; same-day walk-up tickets are almost always sold out.',
          severity: 'critical',
          alternative: 'Purchase official timed-entry app tickets at least 2 weeks in advance.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'Spring & Autumn',
        bestTimeOfDay: '3:00 PM - 5:00 PM for peak golden stained glass reflections',
        peakHours: '11:00 AM - 2:00 PM',
        averageDuration: '2 hours',
        ticketAdvice: 'Select Nativity Tower access tickets for high-altitude spiral stair views over Barcelona.',
        weatherTip: 'Sunlight streaming through west-facing stained glass creates vivid warm orange hues in late afternoon.'
      },
      nearbyHiddenGems: [
        {
          name: 'Sant Pau Recinte Modernista',
          type: 'cultural',
          distance: '8 mins walk',
          description: 'A stunning Art Nouveau hospital complex designed by Lluís Domènech i Montaner.'
        }
      ],
      localEtiquette: {
        dos: ['Cover shoulders and upper thighs inside the sacred nave', 'Speak softly in reverence'],
        donts: ['No swimwear or hats permitted inside the main sanctuary'],
        dressCode: 'Modest respectful attire covering shoulders and knees.',
        photographyRules: 'Allowed without flash; tripods prohibited.',
        tippingAndBehavior: 'Tipping at local tapas bars is voluntary.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [],
        localFood: [],
        weekendMarkets: [],
        photoSpots: [],
        sunspots: [],
        walkingRoutes: [],
        familyFriendlySuggestions: []
      },
      suggestedQuestions: [
        'Why does the stained glass change colors inside Sagrada Família from morning to afternoon?',
        'When is Sagrada Família officially estimated to finish construction?',
        'What are the hidden symbols inside Gaudí’s column forest?'
      ]
    }
  },
  {
    id: 'victoria-memorial',
    name: 'Victoria Memorial',
    location: 'Kolkata, West Bengal',
    country: 'India',
    tagline: 'The Grand White Marble Jewel of Kolkata’s Cultural Heritage',
    category: 'Historical Monument',
    imageUrl: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'victoria-memorial',
      name: 'Victoria Memorial',
      location: 'Kolkata, West Bengal, India',
      tagline: 'The Grand White Marble Jewel of Kolkata’s Cultural Heritage',
      category: 'Historical Monument',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Commissioned in 1906 by Lord Curzon to commemorate Queen Victoria and opened in 1921. Designed by Sir William Emerson in a grand Indo-Saracenic revival style built with Makrana marble—the same marble used for the Taj Mahal.',
        architecturalSignificance: 'Blends British, Mughal, Venetian, and Islamic architectural styles surrounded by 64 acres of manicured gardens, reflection ponds, and bronze statues.',
        culturalBackstory: 'Houses 25 gallery rooms featuring priceless original paintings, rare historical manuscripts, weapons, and Bengal Renaissance art collections.',
        symbolism: 'Iconic symbol of Kolkata’s transformation into the Cultural Capital of India.'
      },
      mythsAndLegends: [
        {
          title: 'The Angel of Victory Weather Vane',
          story: 'Surmounting the central dome is a 16-foot bronze statue of the Angel of Victory, which rotates with the wind and acts as a lightning conductor for the palace structure.',
          type: 'legend'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'North Gate Reflection Lake',
          description: 'Reflecting pool in front of the main entrance capturing the full white marble facade mirrored in calm water.',
          bestTime: 'Early Morning (6:30 AM - 8:00 AM)',
          cameraTip: 'Use a wide-angle lens close to water level for dramatic reflection symmetries.',
          crowdLevel: 'Low'
        },
        {
          spotName: 'Maidan Gardens Balustrade',
          description: 'Grassy lawns surrounding the garden offering horse-drawn carriage shots with Victoria Memorial in the background.',
          bestTime: 'Sunset Golden Hour',
          cameraTip: 'Warm sunset light illuminates the Makrana marble dome in golden pink tones.',
          crowdLevel: 'Medium'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Skipping the Evening Light & Sound Show',
          description: 'Visitors often leave before sunset, missing the illuminated evening display narrated in Bengali & English.',
          severity: 'tip',
          alternative: 'Stay until 6:30 PM for the garden light projection show.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'Winter (October to March)',
        bestTimeOfDay: 'Morning 7:00 AM for garden walk or 4:00 PM for gallery & sunset',
        peakHours: '1:00 PM - 4:00 PM',
        averageDuration: '2 to 3 hours',
        ticketAdvice: 'Buy garden + museum museum entry online at the gate QR scanner to bypass main ticket lines.',
        weatherTip: 'Kolkata winters offer clear sunny skies and pleasant 20°C temperatures ideal for strolling.'
      },
      nearbyHiddenGems: [
        {
          name: 'Princep Ghat & James Prinsep Monument',
          type: 'nature',
          distance: '10 mins walk',
          description: 'Greek Gothic columns along the Hooghly riverbank with traditional wooden boat rides at sunset.'
        },
        {
          name: 'St. Paul’s Cathedral',
          type: 'cultural',
          distance: '5 mins walk',
          description: 'An Indo-Gothic cathedral with stained glass windows and peaceful garden grounds.'
        }
      ],
      localEtiquette: {
        dos: ['Enjoy a traditional puchka (pani puri) outside Maidan', 'Respect museum silent zones inside galleries'],
        donts: ['Do not step into restricted garden flowerbeds or drop litter'],
        dressCode: 'Casual comfortable attire with walking shoes for expansive lawn walks.',
        photographyRules: 'Allowed in garden areas; flash photography restricted inside museum galleries.',
        tippingAndBehavior: 'Friendly polite interactions; bargaining with local street vendors is customary.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [
          {
            id: 'vm-cafe-1',
            name: 'Flurys Tea Room',
            category: 'cafe',
            description: 'Legendary Park Street tearoom established in 1927, famous for heritage Darjeeling tea, rum balls, and English breakfast.',
            addressOrLocation: 'Park Street, Kolkata (10 mins walk)',
            bestTime: '9:00 AM - 11:30 AM',
            whyItMatchesUser: 'Immerse in Kolkata’s timeless colonial coffee culture with authentic tea pastry pairings.',
            tags: ['Heritage Tearoom', 'Park Street Icon', 'Darjeeling First Flush'],
            priceOrVibe: 'Classic Colonial Nostalgia'
          }
        ],
        localFood: [],
        weekendMarkets: [],
        photoSpots: [],
        sunspots: [],
        walkingRoutes: [],
        familyFriendlySuggestions: []
      },
      suggestedQuestions: [
        'How does the bronze Angel of Victory move atop the Victoria Memorial dome?',
        'What rare paintings are exhibited inside Kolkata’s Victoria Memorial?',
        'Where can I take a traditional wooden boat ride near Victoria Memorial?'
      ]
    }
  },
  {
    id: 'howrah-bridge',
    name: 'Howrah Bridge',
    location: 'Kolkata, West Bengal',
    country: 'India',
    tagline: 'The Engineering Wonder Over the Sacred Hooghly River',
    category: 'Engineering Wonder',
    imageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'howrah-bridge',
      name: 'Howrah Bridge (Rabindra Setu)',
      location: 'Kolkata, West Bengal, India',
      tagline: 'The Engineering Wonder Over the Sacred Hooghly River',
      category: 'Engineering Wonder',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Commissioned during WWII and opened in 1943 without a single nut or bolt in its steel structure. Renamed Rabindra Setu in 1965 after Nobel Laureate Rabindranath Tagore.',
        architecturalSignificance: 'A balanced cantilever bridge constructed using 26,500 tons of high-tensile alloy steel supplied by Tata Steel. It carries over 100,000 vehicles and 150,000 pedestrians daily.',
        culturalBackstory: 'The lifeline connecting Kolkata with Howrah station, immortalized in classic Indian cinema, literature, and art.',
        symbolism: 'Resilient heartbeat of Bengal and one of the busiest cantilever bridges in the world.'
      },
      mythsAndLegends: [
        {
          title: 'Built Without a Single Bolt',
          story: 'The entire steel lattice is held together purely by rivets, engineered so that river current and tidal flow would never compromise its structural integrity.',
          type: 'legend'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Mullick Ghat Flower Market',
          description: 'A 130-year-old vibrant orange marigold flower market directly under the bridge framing orange garlands against steel trusses.',
          bestTime: 'Sunrise (5:30 AM - 7:00 AM)',
          cameraTip: 'Capture portrait shots of flower traders with the gigantic bridge span overhead.',
          crowdLevel: 'High'
        },
        {
          spotName: 'Millennium Park Hooghly River Promenade',
          description: 'Riverfront walkway across from Howrah Railway Station offering wide panoramic sunset views.',
          bestTime: 'Blue Hour / Evening Illumination',
          cameraTip: 'Use long exposure to blur ferry lights on the river water beneath lit steel trusses.',
          crowdLevel: 'Medium'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Taking Photos On the Middle Bridge Walkway Without Permission',
          description: 'Bridge security patrols strict safety zones on the central carriageway.',
          severity: 'warning',
          alternative: 'Take photos from Mullick Ghat, river ferries, or Millennium Park promenade for the best views.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'October to March',
        bestTimeOfDay: 'Sunrise for Flower Market or 6:00 PM for river lighting',
        peakHours: '8:00 AM - 11:00 AM & 5:00 PM - 8:00 PM',
        averageDuration: '1 to 2 hours',
        ticketAdvice: 'Free public access; take the ₹10 local ferry from Howrah Ghat to Babughat for panoramic views.',
        weatherTip: 'Morning river mist in winter creates magical cinematic photography conditions.'
      },
      nearbyHiddenGems: [
        {
          name: 'Mullick Ghat Flower Market',
          type: 'cultural',
          distance: '1 min walk',
          description: 'Asia’s largest flower market bustling with fresh roses, lotus, and marigold traders.'
        }
      ],
      localEtiquette: {
        dos: ['Take a scenic Hooghly ferry ride for ₹10', 'Taste traditional kulhad chai at Mullick Ghat'],
        donts: ['Do not obstruct commuter foot traffic during peak morning rush hour'],
        dressCode: 'Casual comfortable clothes suitable for walking along river ghats.',
        photographyRules: 'Permitted from banks and ferries; avoid blocking traffic on the bridge.',
        tippingAndBehavior: 'Friendly bustling market atmosphere; ask before taking close-up merchant portraits.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [],
        localFood: [],
        weekendMarkets: [],
        photoSpots: [],
        sunspots: [],
        walkingRoutes: [],
        familyFriendlySuggestions: []
      },
      suggestedQuestions: [
        'How was Howrah Bridge built without nuts and bolts?',
        'Where is the best spot to photograph Howrah Bridge at sunset?',
        'What is special about Kolkata’s Mullick Ghat Flower Market under the bridge?'
      ]
    }
  },
  {
    id: 'dakshineswar-temple',
    name: 'Dakshineswar Kali Temple',
    location: 'Kolkata, West Bengal',
    country: 'India',
    tagline: 'Spiritual Sanctuary of Goddess Bhavatarini on the Hooghly',
    category: 'Sacred Site',
    imageUrl: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'dakshineswar-temple',
      name: 'Dakshineswar Kali Temple',
      location: 'Kolkata, West Bengal, India',
      tagline: 'Spiritual Sanctuary of Goddess Bhavatarini on the Hooghly',
      category: 'Sacred Site',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Founded in 1855 by philanthropist Rani Rashmoni after Goddess Kali appeared in her dream. Mystic saint Sri Ramakrishna Paramahamsa served as the chief priest here.',
        architecturalSignificance: 'Classic Bengal Navaratna (nine-spired) style standing on a high platform with 12 adjacent Shiva temples lined along the riverbank.',
        culturalBackstory: 'A epicenter of Bengal spiritual renaissance where Swami Vivekananda met his guru Ramakrishna.',
        symbolism: 'Sacred beacon of universal devotion, harmony, and Bengali spiritual heritage.'
      },
      mythsAndLegends: [
        {
          title: 'Rani Rashmoni’s Divine Dream',
          story: 'When Rani Rashmoni prepared for a pilgrimage to Varanasi, Goddess Kali instructed her in a dream to construct a temple on the banks of the Ganges in Bengal instead.',
          type: 'legend'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Ganges Riverboat Approach',
          description: 'View from the Hooghly river ferry approaching Dakshineswar ghat showing the nine spires reflected in water.',
          bestTime: 'Sunrise (6:00 AM)',
          cameraTip: 'Capture the morning sun lighting up the yellow terracota-style temple walls.',
          crowdLevel: 'Medium'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Visiting During Peak Sunday Midday Queue',
          description: 'Darshan lines can extend up to 2 hours on weekend afternoons.',
          severity: 'warning',
          alternative: 'Visit early weekday morning at 6:30 AM or late afternoon at 4:30 PM.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'October to March (especially during Kali Puja & Diwali)',
        bestTimeOfDay: 'Early Morning 6:00 AM or Evening Sandhya Aarti at 6:30 PM',
        peakHours: '10:00 AM - 1:00 PM',
        averageDuration: '2 hours',
        ticketAdvice: 'Free entrance; shoe deposit counters available at temple entrance.',
        weatherTip: 'Morning breeze off the Hooghly river provides cool spiritual ambiance.'
      },
      nearbyHiddenGems: [
        {
          name: 'Belur Math',
          type: 'cultural',
          distance: '10 mins ferry ride across river',
          description: 'Headquarters of Ramakrishna Math combining Christian, Islamic, and Hindu architectural elements.'
        }
      ],
      localEtiquette: {
        dos: ['Remove footwear before entering temple compound', 'Cross river to Belur Math by local ferry'],
        donts: ['Cell phone cameras are restricted inside the main inner sanctum'],
        dressCode: 'Modest traditional attire covering shoulders and knees.',
        photographyRules: 'Allowed in outer courtyard and ghats; prohibited inside the main deity shrine.',
        tippingAndBehavior: 'Spiritual quietude respected inside prayer halls.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [],
        localFood: [],
        weekendMarkets: [],
        photoSpots: [],
        sunspots: [],
        walkingRoutes: [],
        familyFriendlySuggestions: []
      },
      suggestedQuestions: [
        'What is the connection between Sri Ramakrishna and Dakshineswar Kali Temple?',
        'How can I take the river ferry from Dakshineswar to Belur Math?',
        'What architectural features define Bengal’s Navaratna temple style?'
      ]
    }
  },
  {
    id: 'darjeeling-toy-train',
    name: 'Darjeeling Toy Train',
    location: 'Darjeeling, West Bengal',
    country: 'India',
    tagline: 'UNESCO World Heritage Mountain Steam Railway of the Himalayas',
    category: 'Historical Landmark',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'darjeeling-toy-train',
      name: 'Darjeeling Himalayan Railway',
      location: 'Darjeeling, West Bengal, India',
      tagline: 'UNESCO World Heritage Mountain Steam Railway of the Himalayas',
      category: 'Historical Landmark',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Built between 1879 and 1881 to connect tea estates with plains. Inscribed as a UNESCO World Heritage Site in 1999 as an outstanding example of mountain engineering.',
        architecturalSignificance: 'Operates on a 2-foot narrow gauge using vintage B-Class steam locomotives, navigating steep mountain grades via loops (such as Batasia Loop) and zig-zags.',
        culturalBackstory: 'Iconic symbol of Darjeeling tea hills offering breathtaking views of Mount Kanchenjunga—the world’s 3rd highest peak.',
        symbolism: 'Timeless romance of Himalayan mountain travel.'
      },
      mythsAndLegends: [
        {
          title: 'The Inverted Loop Engineering Solution',
          story: 'When engineers encountered an impassable vertical cliff face near Batasia, local builders suggested spiraling the track around itself in a 360-degree loop to gain height effortlessly.',
          type: 'legend'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Batasia Loop Gardens',
          description: 'A manicured hilltop garden loop where the steam train completes a 360-degree curve with snow-capped Kanchenjunga in the background.',
          bestTime: 'Morning 9:00 AM clear skies',
          cameraTip: 'Stand near the Gorkha War Memorial in the center of the loop for the train framing.',
          crowdLevel: 'Medium'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Not Booking Steam Joyrides in Advance',
          description: 'Steam-engine joyrides between Darjeeling and Ghum sell out weeks ahead during peak spring/autumn seasons.',
          severity: 'warning',
          alternative: 'Reserve official Indian Railways IRCTC steam joyride tickets online at least 30 days prior.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'Spring (March to May) & Autumn (October to December)',
        bestTimeOfDay: 'Morning 8:00 AM for clear mountain visibility',
        peakHours: '10:00 AM - 2:00 PM',
        averageDuration: '2 hours joyride',
        ticketAdvice: 'Choose Steam Locomotive joyrides over Diesel for authentic vintage whistle charm.',
        weatherTip: 'Clear skies after monsoon reveal crystal clear Himalayan snow peak panoramas.'
      },
      nearbyHiddenGems: [
        {
          name: 'Happy Valley Tea Estate',
          type: 'nature',
          distance: '15 mins walk',
          description: 'High-altitude organic tea garden producing world-famous Darjeeling Muscatel tea.'
        }
      ],
      localEtiquette: {
        dos: ['Sip fresh Darjeeling First Flush tea at Mall Road', 'Enjoy morning views of Kanchenjunga from Tiger Hill'],
        donts: ['Do not hang dangerously out of carriage doors on mountain bridges'],
        dressCode: 'Warm layered clothing, fleece jacket, and comfortable boots.',
        photographyRules: 'Photography encouraged throughout the railway route.',
        tippingAndBehavior: 'Warm mountain hospitality; tip train conductors and tea tour guides kindly.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [
          {
            id: 'dj-cafe-1',
            name: 'Keventers Darjeeling',
            category: 'cafe',
            description: 'Historic 110-year-old open-air roof terrace cafe overlooking Mall Road and the Himalayas, famous for English breakfast sausages and hot chocolate.',
            addressOrLocation: 'Mall Road, Darjeeling',
            bestTime: '8:00 AM - 10:30 AM',
            whyItMatchesUser: 'Savor sunlit mountain breakfasts with panoramic views of snow peaks.',
            tags: ['Heritage Terrace', 'Himalayan View', 'Famous English Breakfast'],
            priceOrVibe: 'Charming Mountain Classic'
          }
        ],
        localFood: [],
        weekendMarkets: [],
        photoSpots: [],
        sunspots: [],
        walkingRoutes: [],
        familyFriendlySuggestions: []
      },
      suggestedQuestions: [
        'What is Batasia Loop on the Darjeeling Toy Train route?',
        'When is the best month to view Mount Kanchenjunga from Darjeeling?',
        'How does the narrow-gauge steam engine climb steep Himalayan slopes?'
      ]
    }
  },
  {
    id: 'sundarbans',
    name: 'Sundarbans National Park',
    location: 'West Bengal',
    country: 'India',
    tagline: 'The Royal Realm of Mangroves & Bengal Tigers',
    category: 'Natural Wonder',
    imageUrl: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=1200&q=80',
    presetDetails: {
      id: 'sundarbans',
      name: 'Sundarbans National Park',
      location: 'South 24 Parganas, West Bengal, India',
      tagline: 'The World’s Largest Mangrove Forest & Realm of the Royal Bengal Tiger',
      category: 'Natural Wonder',
      confidence: 99,
      imageUrl: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=1200&q=80',
      culturalExplanation: {
        history: 'Declared a UNESCO World Heritage Site in 1987. Spanning 10,000 sq km across India and Bangladesh delta where the Ganges, Brahmaputra, and Meghna rivers enter the Bay of Bengal.',
        architecturalSignificance: 'Extensive mangrove wilderness dominated by Sundari trees (Heritiera fomes) with dense pneumatophore root systems that adapt to daily saltwater tides.',
        culturalBackstory: 'Protected by local folklore centered around Bonbibi, the guardian forest deity revered by Hindu and Muslim woodcutters alike before entering tiger territory.',
        symbolism: 'World’s only mangrove forest inhabited by swimming Royal Bengal Tigers.'
      },
      mythsAndLegends: [
        {
          title: 'The Legend of Bonbibi',
          story: 'Forest dwellers pray at Bonbibi shrines before venturing into mangrove creeks, believing her divine grace shields villagers from the mystical tiger demon Dakshin Rai.',
          type: 'legend'
        }
      ],
      bestPhotoLocations: [
        {
          spotName: 'Sajnekhali Watchtower Creek',
          description: 'Elevated canopy watchtower overlooking mangrove water channels and freshwater ponds.',
          bestTime: 'Early Morning Boat Safari',
          cameraTip: 'Use a 300mm+ telephoto lens to capture estuarine crocodiles, spotted deer, and kingfishers.',
          crowdLevel: 'Low'
        }
      ],
      commonTouristMistakes: [
        {
          title: 'Expecting Land Jeep Safaris',
          description: 'Sundarbans travel takes place exclusively via boat streams; there are no roads inside the core reserve.',
          severity: 'tip',
          alternative: 'Book eco-friendly registered forest department boat safaris with local naturalists.'
        }
      ],
      bestVisitingTime: {
        bestSeason: 'Winter (November to March)',
        bestTimeOfDay: 'Morning 6:30 AM boat departure for wildlife river basking',
        peakHours: '10:00 AM - 2:00 PM',
        averageDuration: '2 to 3 days river expedition',
        ticketAdvice: 'Forest permits required at Sajnekhali entry point; arrange via registered eco-tour operator.',
        weatherTip: 'Winter days bring pleasant 15-22°C temperatures with high animal sightings near river banks.'
      },
      nearbyHiddenGems: [
        {
          name: 'Dobanki Canopy Walk',
          type: 'nature',
          distance: 'Boat ride from Sajnekhali',
          description: 'A half-kilometer net-fenced elevated canopy walkway offering safe views over dense mangrove tiger habitat.'
        }
      ],
      localEtiquette: {
        dos: ['Wear muted forest colors (khaki, olive, brown)', 'Keep silent on safari boats to avoid startling wildlife'],
        donts: ['Never throw trash into mangrove waterways or play loud music'],
        dressCode: 'Lightweight breathable cotton layers with sun hat and binoculars.',
        photographyRules: 'Permitted from boats and watchtowers; avoid flash.',
        tippingAndBehavior: 'Support local forest guides and boat crews generously.'
      },
      hiddenLocalsGuide: {
        hiddenCafes: [],
        localFood: [],
        weekendMarkets: [],
        photoSpots: [],
        sunspots: [],
        walkingRoutes: [],
        familyFriendlySuggestions: []
      },
      suggestedQuestions: [
        'Why do Royal Bengal Tigers swim in the saltwater channels of the Sundarbans?',
        'Who is Bonbibi and why do forest villagers worship her in Bengal?',
        'How do I book a boat safari in Sundarbans National Park?'
      ]
    }
  }
];

