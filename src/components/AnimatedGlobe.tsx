import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Compass,
  Navigation,
  MapPin,
  Sparkles,
  Globe2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  ChevronRight,
} from 'lucide-react';
import { getLandmarkImageUrl } from '../utils/landmarkImages';

interface LandmarkNode {
  id: string;
  name: string;
  label: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  category: 'Asia' | 'Europe' | 'Americas' | 'Africa & Middle East' | 'Oceania' | 'Wonders';
  description?: string;
}

interface AnimatedGlobeProps {
  onSelectSampleLocation?: (locationName: string) => void;
}

// 35+ World Famous Landmarks with Precise Coordinates
const GLOBAL_LANDMARKS: LandmarkNode[] = [
  // India & South Asia
  {
    id: 'victoria-memorial',
    name: 'Victoria Memorial, Kolkata',
    label: 'Victoria Memorial',
    location: 'Kolkata, West Bengal',
    country: 'India',
    lat: 22.5726,
    lng: 88.3639,
    category: 'Asia',
    description: 'White marble monument surrounded by 64 acres of manicured gardens.',
  },
  {
    id: 'howrah-bridge',
    name: 'Howrah Bridge, Kolkata',
    label: 'Howrah Bridge',
    location: 'Kolkata, West Bengal',
    country: 'India',
    lat: 22.5851,
    lng: 88.3468,
    category: 'Asia',
    description: 'Iconic cantilever bridge over the Hooghly River.',
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal, Agra',
    label: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    country: 'India',
    lat: 27.1767,
    lng: 78.0081,
    category: 'Wonders',
    description: 'UNESCO World Wonder and marble masterpiece of love.',
  },
  {
    id: 'red-fort',
    name: 'Red Fort, Delhi',
    label: 'Red Fort',
    location: 'Old Delhi',
    country: 'India',
    lat: 28.6562,
    lng: 77.241,
    category: 'Asia',
    description: 'Mughal red sandstone fortress and historic royal residency.',
  },
  {
    id: 'golden-temple',
    name: 'Golden Temple, Amritsar',
    label: 'Golden Temple',
    location: 'Amritsar, Punjab',
    country: 'India',
    lat: 31.62,
    lng: 74.8765,
    category: 'Asia',
    description: 'Sacred gold-plated Gurdwara centered in a tranquil holy pool.',
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal, Jaipur',
    label: 'Hawa Mahal',
    location: 'Jaipur, Rajasthan',
    country: 'India',
    lat: 26.9239,
    lng: 75.8267,
    category: 'Asia',
    description: 'Palace of Winds with 953 intricate honeycombed windows.',
  },
  {
    id: 'darjeeling-railway',
    name: 'Darjeeling Himalayan Railway',
    label: 'Darjeeling Train',
    location: 'Darjeeling, West Bengal',
    country: 'India',
    lat: 27.041,
    lng: 88.2663,
    category: 'Asia',
    description: 'Historic steam toy train running through misty mountain tea gardens.',
  },
  {
    id: 'sanchi-stupa',
    name: 'Sanchi Stupa',
    label: 'Sanchi Stupa',
    location: 'Madhya Pradesh',
    country: 'India',
    lat: 23.48,
    lng: 77.74,
    category: 'Asia',
    description: 'Ancient Buddhist sanctuary commissioned by Emperor Ashoka.',
  },

  // East & Southeast Asia
  {
    id: 'fushimi-inari',
    name: 'Fushimi Inari Taisha, Kyoto',
    label: 'Fushimi Inari',
    location: 'Kyoto',
    country: 'Japan',
    lat: 35.0116,
    lng: 135.7681,
    category: 'Asia',
    description: 'Path of 10,000 vibrant vermilion torii gates up Mount Inari.',
  },
  {
    id: 'mount-fuji',
    name: 'Mount Fuji',
    label: 'Mount Fuji',
    location: 'Honshu',
    country: 'Japan',
    lat: 35.3606,
    lng: 138.7274,
    category: 'Asia',
    description: 'Sacred snow-capped stratovolcano and symbol of Japan.',
  },
  {
    id: 'great-wall',
    name: 'Great Wall of China',
    label: 'Great Wall',
    location: 'Beijing',
    country: 'China',
    lat: 40.4319,
    lng: 116.5704,
    category: 'Wonders',
    description: 'Ancient fortification snaking across rugged mountain ridges.',
  },
  {
    id: 'angkor-wat',
    name: 'Angkor Wat',
    label: 'Angkor Wat',
    location: 'Siem Reap',
    country: 'Cambodia',
    lat: 13.4125,
    lng: 103.867,
    category: 'Wonders',
    description: 'Largest religious monument in the world built by the Khmer Empire.',
  },

  // Europe
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower, Paris',
    label: 'Eiffel Tower',
    location: 'Paris',
    country: 'France',
    lat: 48.8584,
    lng: 2.2945,
    category: 'Wonders',
    description: 'Iconic wrought-iron lattice tower overlooking the Seine River.',
  },
  {
    id: 'colosseum',
    name: 'Colosseum, Rome',
    label: 'Colosseum',
    location: 'Rome',
    country: 'Italy',
    lat: 41.8902,
    lng: 12.4922,
    category: 'Wonders',
    description: 'Ancient Roman amphitheater of gladiatorial games.',
  },
  {
    id: 'sagrada-familia',
    name: 'Sagrada Família',
    label: 'Sagrada Família',
    location: 'Barcelona',
    country: 'Spain',
    lat: 41.4036,
    lng: 2.1744,
    category: 'Europe',
    description: 'Gaudí’s breathtaking modernista basilica with towering spires.',
  },
  {
    id: 'big-ben',
    name: 'Big Ben & Parliament',
    label: 'Big Ben',
    location: 'London',
    country: 'United Kingdom',
    lat: 51.5007,
    lng: -0.1246,
    category: 'Europe',
    description: 'Historic gothic clock tower overlooking the Thames in Westminster.',
  },
  {
    id: 'acropolis',
    name: 'Acropolis of Athens',
    label: 'Acropolis',
    location: 'Athens',
    country: 'Greece',
    lat: 37.9715,
    lng: 23.7257,
    category: 'Europe',
    description: 'Ancient citadel containing the Parthenon overlooking Athens.',
  },
  {
    id: 'hagia-sophia',
    name: 'Hagia Sophia',
    label: 'Hagia Sophia',
    location: 'Istanbul',
    country: 'Turkey',
    lat: 41.0086,
    lng: 28.9802,
    category: 'Europe',
    description: 'Byzantine architectural marvel with massive golden domes.',
  },

  // Americas
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    label: 'Machu Picchu',
    location: 'Cusco Region',
    country: 'Peru',
    lat: -13.1631,
    lng: -72.545,
    category: 'Wonders',
    description: 'Mist-shrouded 15th-century Inca citadel high in the Andes Mountains.',
  },
  {
    id: 'statue-of-liberty',
    name: 'Statue of Liberty',
    label: 'Statue of Liberty',
    location: 'New York City',
    country: 'USA',
    lat: 40.6892,
    lng: -74.0445,
    category: 'Americas',
    description: 'Colossal neoclassical copper monument guarding New York Harbor.',
  },
  {
    id: 'chichen-itza',
    name: 'Chichen Itza',
    label: 'Chichen Itza',
    location: 'Yucatán',
    country: 'Mexico',
    lat: 20.6843,
    lng: -88.5678,
    category: 'Wonders',
    description: 'Mayan step-pyramid El Castillo with astronomical alignments.',
  },
  {
    id: 'christ-redeemer',
    name: 'Christ the Redeemer',
    label: 'Christ Redeemer',
    location: 'Rio de Janeiro',
    country: 'Brazil',
    lat: -22.9519,
    lng: -43.2105,
    category: 'Wonders',
    description: 'Art Deco statue atop Corcovado Mountain overlooking Guanabara Bay.',
  },
  {
    id: 'grand-canyon',
    name: 'Grand Canyon',
    label: 'Grand Canyon',
    location: 'Arizona',
    country: 'USA',
    lat: 36.1069,
    lng: -112.1129,
    category: 'Americas',
    description: 'Immense steep-sided canyon carved by the Colorado River.',
  },

  // Middle East & Africa
  {
    id: 'pyramids-giza',
    name: 'Pyramids of Giza',
    label: 'Pyramids of Giza',
    location: 'Cairo',
    country: 'Egypt',
    lat: 29.9792,
    lng: 31.1342,
    category: 'Wonders',
    description: 'Ancient Egyptian royal tombs and Great Sphinx of Giza.',
  },
  {
    id: 'petra',
    name: 'Petra Treasury',
    label: 'Petra',
    location: 'Ma’an',
    country: 'Jordan',
    lat: 30.3285,
    lng: 35.4444,
    category: 'Wonders',
    description: 'Nabataean city carved into vibrant pink sandstone cliffs.',
  },
  {
    id: 'burj-khalifa',
    name: 'Burj Khalifa',
    label: 'Burj Khalifa',
    location: 'Dubai',
    country: 'UAE',
    lat: 25.1972,
    lng: 55.2744,
    category: 'Africa & Middle East',
    description: 'World’s tallest skyscraper piercing the desert skyline.',
  },
  {
    id: 'table-mountain',
    name: 'Table Mountain',
    label: 'Table Mountain',
    location: 'Cape Town',
    country: 'South Africa',
    lat: -33.9628,
    lng: 18.4098,
    category: 'Africa & Middle East',
    description: 'Flat-topped landmark mountain overlooking Cape Town and two oceans.',
  },

  // Oceania
  {
    id: 'sydney-opera-house',
    name: 'Sydney Opera House',
    label: 'Sydney Opera',
    location: 'Sydney',
    country: 'Australia',
    lat: -33.8568,
    lng: 151.2153,
    category: 'Oceania',
    description: 'Multi-venue performing arts center with iconic shell sails.',
  },
  {
    id: 'milford-sound',
    name: 'Milford Sound',
    label: 'Milford Sound',
    location: 'Fiordland',
    country: 'New Zealand',
    lat: -44.6716,
    lng: 167.9258,
    category: 'Oceania',
    description: 'Breathtaking fiord carved by glaciers with towering Mitre Peak.',
  },
];

// Flight connection arcs
const FLIGHT_ARCS = [
  { from: 'victoria-memorial', to: 'darjeeling-railway' },
  { from: 'victoria-memorial', to: 'taj-mahal' },
  { from: 'taj-mahal', to: 'red-fort' },
  { from: 'taj-mahal', to: 'fushimi-inari' },
  { from: 'fushimi-inari', to: 'eiffel-tower' },
  { from: 'eiffel-tower', to: 'colosseum' },
  { from: 'colosseum', to: 'pyramids-giza' },
  { from: 'pyramids-giza', to: 'petra' },
  { from: 'petra', to: 'burj-khalifa' },
  { from: 'eiffel-tower', to: 'statue-of-liberty' },
  { from: 'statue-of-liberty', to: 'machu-picchu' },
  { from: 'machu-picchu', to: 'christ-redeemer' },
  { from: 'sydney-opera-house', to: 'fushimi-inari' },
];

// Procedural coarse continent land dots to render Earth landmasses
const CONTINENT_LAND_POINTS: { lat: number; lng: number }[] = [];
(function generateLandPoints() {
  const addCluster = (
    minLat: number,
    maxLat: number,
    minLng: number,
    maxLng: number,
    step: number = 8
  ) => {
    for (let lat = minLat; lat <= maxLat; lat += step) {
      for (let lng = minLng; lng <= maxLng; lng += step) {
        const noise = Math.sin(lat * 0.2) * Math.cos(lng * 0.2);
        if (noise > -0.45) {
          CONTINENT_LAND_POINTS.push({
            lat: lat + Math.sin(lng) * 1.5,
            lng: lng + Math.cos(lat) * 1.5,
          });
        }
      }
    }
  };

  // Eurasia & India
  addCluster(10, 70, 60, 140, 7);
  addCluster(35, 68, -10, 50, 7);
  // India subcontinent dense
  addCluster(8, 32, 68, 90, 5);
  // Africa
  addCluster(-34, 35, -15, 48, 8);
  // North America
  addCluster(15, 68, -160, -55, 8);
  // South America
  addCluster(-54, 12, -80, -35, 8);
  // Australia / NZ
  addCluster(-42, -12, 112, 178, 8);
})();

export const AnimatedGlobe: React.FC<AnimatedGlobeProps> = ({ onSelectSampleLocation }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Globe View States
  const [rotationX, setRotationX] = useState<number>(-80); // Longitude rotation (deg)
  const [rotationY, setRotationY] = useState<number>(20); // Latitude pitch tilt (deg)
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Hover & Tooltip state
  const [hoveredLandmark, setHoveredLandmark] = useState<LandmarkNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Drag interaction refs
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotXRef = useRef<number>(-80);
  const rotYRef = useRef<number>(20);
  const isAutoSpinRef = useRef<boolean>(true);
  const zoomScaleRef = useRef<number>(1.0);

  // Sync state to refs for high-performance animation loop
  rotXRef.current = rotationX;
  rotYRef.current = rotationY;
  isAutoSpinRef.current = isAutoSpin;
  zoomScaleRef.current = zoomScale;

  // Render animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Map landmark ID to node
    const landmarkMap: Record<string, LandmarkNode> = {};
    GLOBAL_LANDMARKS.forEach((l) => {
      landmarkMap[l.id] = l;
    });

    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.36;
      const radius = baseRadius * zoomScaleRef.current;

      ctx.clearRect(0, 0, width, height);

      // Auto rotation update
      if (isAutoSpinRef.current && !isDraggingRef.current) {
        setRotationX((prev) => {
          const next = prev + 0.22;
          return next > 360 ? next - 360 : next;
        });
      }

      const curRotX = rotXRef.current;
      const curRotY = rotYRef.current;

      // 3D Spherical Projection Helper
      const project3D = (lat: number, lng: number, elevation: number = 0) => {
        const r = radius * (1 + elevation);
        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((lng + curRotX) * Math.PI) / 180;

        // Base 3D coordinates
        const x0 = r * Math.sin(phi) * Math.cos(theta);
        const y0 = r * Math.cos(phi);
        const z0 = r * Math.sin(phi) * Math.sin(theta);

        // Pitch tilt rotation around X axis (Y angle)
        const radY = (curRotY * Math.PI) / 180;
        const y1 = y0 * Math.cos(radY) - z0 * Math.sin(radY);
        const z1 = y0 * Math.sin(radY) + z0 * Math.cos(radY);
        const x1 = x0;

        return {
          x: centerX + x1,
          y: centerY + y1,
          z: z1 / r, // Normalized depth: >0 is facing front camera
        };
      };

      // 1. Atmosphere Space Glow Aura
      const atmosphereGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.85,
        centerX,
        centerY,
        radius * 1.35
      );
      atmosphereGrad.addColorStop(0, 'rgba(140, 127, 163, 0.28)');
      atmosphereGrad.addColorStop(0.5, 'rgba(161, 147, 184, 0.12)');
      atmosphereGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = atmosphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base 3D Dark Marble Globe Sphere Fill with Day-Night Shading
      const sphereGrad = ctx.createRadialGradient(
        centerX - radius * 0.4,
        centerY - radius * 0.4,
        0,
        centerX,
        centerY,
        radius
      );
      sphereGrad.addColorStop(0, 'rgba(38, 33, 52, 0.98)');
      sphereGrad.addColorStop(0.65, 'rgba(22, 19, 30, 0.99)');
      sphereGrad.addColorStop(1, 'rgba(8, 6, 12, 1)');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Globe Rim Outer Outline
      ctx.strokeStyle = 'rgba(180, 165, 205, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 3. Render 3D Latitude & Longitude Grid Lines
      const latGridCount = 8;
      for (let i = 1; i < latGridCount; i++) {
        const latVal = -80 + (i * 160) / latGridCount;
        ctx.beginPath();
        let first = true;
        for (let lngVal = -180; lngVal <= 180; lngVal += 10) {
          const p = project3D(latVal, lngVal);
          if (p.z > -0.1) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = 'rgba(140, 127, 163, 0.14)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const lngGridCount = 12;
      for (let i = 0; i < lngGridCount; i++) {
        const lngVal = -180 + (i * 360) / lngGridCount;
        ctx.beginPath();
        let first = true;
        for (let latVal = -85; latVal <= 85; latVal += 10) {
          const p = project3D(latVal, lngVal);
          if (p.z > -0.1) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = 'rgba(161, 147, 184, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 4. Render Procedural Earth Continents
      CONTINENT_LAND_POINTS.forEach((pt) => {
        const p = project3D(pt.lat, pt.lng);
        if (p.z > -0.05) {
          const dotAlpha = Math.min(1, Math.max(0.12, p.z + 0.3)) * 0.6;
          const dotSize = (1.2 + p.z * 1.2) * (zoomScaleRef.current > 1.2 ? 1.3 : 1.0);
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 165, 205, ${dotAlpha})`;
          ctx.fill();
        }
      });

      // 5. Render Flight Path Arcs
      FLIGHT_ARCS.forEach((arc) => {
        const n1 = landmarkMap[arc.from];
        const n2 = landmarkMap[arc.to];
        if (!n1 || !n2) return;

        const p1 = project3D(n1.lat, n1.lng);
        const p2 = project3D(n2.lat, n2.lng);

        if (p1.z > -0.1 && p2.z > -0.1) {
          const midLat = (n1.lat + n2.lat) / 2;
          const midLng = (n1.lng + n2.lng) / 2;
          const midP = project3D(midLat, midLng, 0.28);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(midP.x, midP.y, p2.x, p2.y);
          ctx.strokeStyle = 'rgba(213, 142, 191, 0.38)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated flying particle
          const progress = (Date.now() / 1800 + Math.abs(n1.lat) * 0.1) % 1;
          const px =
            (1 - progress) * (1 - progress) * p1.x +
            2 * (1 - progress) * progress * midP.x +
            progress * progress * p2.x;
          const py =
            (1 - progress) * (1 - progress) * p1.y +
            2 * (1 - progress) * progress * midP.y +
            progress * progress * p2.y;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#F3D5DE';
          ctx.shadowColor = '#D58EBF';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 6. Render 35+ Global Landmark Nodes & Pins
      const visibleNodes: { landmark: LandmarkNode; proj: { x: number; y: number; z: number } }[] = [];

      GLOBAL_LANDMARKS.forEach((node) => {
        const p = project3D(node.lat, node.lng, 0.02);
        if (p.z > -0.15) {
          visibleNodes.push({ landmark: node, proj: p });
        }
      });

      // Sort nodes by depth Z so front nodes render on top
      visibleNodes.sort((a, b) => a.proj.z - b.proj.z);

      visibleNodes.forEach(({ landmark, proj }) => {
        const alpha = Math.min(1, Math.max(0.2, proj.z + 0.4));
        const isHovered = hoveredLandmark?.id === landmark.id;
        const isFilteredOut =
          activeCategory !== 'All' &&
          activeCategory !== 'Wonders' &&
          landmark.category !== activeCategory &&
          !(activeCategory === 'Wonders' && landmark.category === 'Wonders');

        const baseSize = isHovered ? 7.5 : 4.5 + proj.z * 2.5;
        const size = isFilteredOut ? baseSize * 0.6 : baseSize;
        const nodeAlpha = isFilteredOut ? alpha * 0.35 : alpha;

        // Pulse ring on front nodes
        if (proj.z > 0.2 && !isFilteredOut) {
          const pulse = (Date.now() / 1200 + landmark.lat * 0.1) % 1;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size + pulse * (isHovered ? 20 : 12), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(213, 142, 191, ${(1 - pulse) * 0.5 * nodeAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Core Pin Dot
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? '#FFFFFF'
          : landmark.category === 'Wonders'
          ? `rgba(255, 215, 0, ${nodeAlpha})`
          : `rgba(243, 213, 222, ${nodeAlpha})`;
        ctx.shadowColor = isHovered ? '#FFFFFF' : '#D58EBF';
        ctx.shadowBlur = isHovered ? 16 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw pin stem & label for front-facing prominent landmarks
        if (proj.z > 0.4 && !isFilteredOut) {
          ctx.strokeStyle = `rgba(243, 213, 222, ${nodeAlpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(proj.x, proj.y);
          ctx.lineTo(proj.x + 8, proj.y - 10);
          ctx.stroke();

          ctx.font = `${isHovered ? 'bold 11px' : '10px'} Plus Jakarta Sans, sans-serif`;
          ctx.fillStyle = isHovered ? '#FFFFFF' : `rgba(243, 213, 222, ${nodeAlpha * 0.9})`;
          ctx.fillText(landmark.label, proj.x + 12, proj.y - 12);
        }
      });

      // 7. Equatorial Orbital Ring
      const ringParticleCount = 28;
      for (let p = 0; p < ringParticleCount; p++) {
        const pAngle = (Date.now() / 2000 + (p * Math.PI * 2) / ringParticleCount) % (Math.PI * 2);
        const px = centerX + Math.cos(pAngle) * (radius * 1.22);
        const py = centerY + Math.sin(pAngle) * (radius * 0.35);

        ctx.beginPath();
        ctx.arc(px, py, p % 4 === 0 ? 2 : 1, 0, Math.PI * 2);
        ctx.fillStyle = p % 2 === 0 ? 'rgba(213, 142, 191, 0.75)' : 'rgba(161, 147, 184, 0.5)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [hoveredLandmark, activeCategory]);

  // Pointer Click & Drag Rotation Controls
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMousePosRef.current.x;
        const deltaY = e.clientY - lastMousePosRef.current.y;
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };

        setRotationX((prev) => prev - deltaX * 0.4);
        setRotationY((prev) => Math.max(-75, Math.min(75, prev - deltaY * 0.4)));
        return;
      }

      // Check hover over landmark nodes on 2D projected canvas
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.36 * zoomScaleRef.current;

      const curRotX = rotXRef.current;
      const curRotY = rotYRef.current;

      let closest: LandmarkNode | null = null;
      let minDistance = 18; // Pixel hover radius threshold

      GLOBAL_LANDMARKS.forEach((node) => {
        const r = radius * 1.02;
        const phi = ((90 - node.lat) * Math.PI) / 180;
        const theta = ((node.lng + curRotX) * Math.PI) / 180;

        const x0 = r * Math.sin(phi) * Math.cos(theta);
        const y0 = r * Math.cos(phi);
        const z0 = r * Math.sin(phi) * Math.sin(theta);

        const radY = (curRotY * Math.PI) / 180;
        const y1 = y0 * Math.cos(radY) - z0 * Math.sin(radY);
        const z1 = y0 * Math.sin(radY) + z0 * Math.cos(radY);

        if (z1 / r > -0.15) {
          const px = centerX + x0;
          const py = centerY + y1;
          const dist = Math.hypot(mouseX - px, mouseY - py);
          if (dist < minDistance) {
            minDistance = dist;
            closest = node;
          }
        }
      });

      if (closest) {
        setHoveredLandmark(closest);
        setTooltipPos({ x: mouseX, y: mouseY });
      } else {
        setHoveredLandmark(null);
        setTooltipPos(null);
      }
    },
    []
  );

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignore if uncaptured
      }
    }
  };

  const handleCanvasClick = () => {
    if (hoveredLandmark && onSelectSampleLocation) {
      onSelectSampleLocation(hoveredLandmark.name);
    }
  };

  // Wheel Zoom Control
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomScale((prev) => Math.max(0.7, Math.min(2.2, prev + zoomDelta)));
  };

  // Reset Globe View
  const handleResetView = () => {
    setRotationX(-80);
    setRotationY(20);
    setZoomScale(1.0);
    setIsAutoSpin(true);
  };

  return (
    <div className="relative w-full aspect-square max-w-lg lg:max-w-xl mx-auto flex flex-col items-center justify-center group select-none">
      {/* Background Glow Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#8C7FA3]/20 via-[#D58EBF]/20 to-transparent rounded-full blur-3xl scale-95 transition-all duration-700 group-hover:scale-105 pointer-events-none" />

      {/* Interactive Toolbar Header */}
      <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-[#E8E2DA] dark:border-slate-800 shadow-lg">
          {(['All', 'Asia', 'Europe', 'Americas', 'Wonders'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#8C7FA3] text-white shadow-xs'
                  : 'text-[#686273] dark:text-slate-400 hover:text-[#221F26] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-[#E8E2DA] dark:border-slate-800 shadow-lg">
          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            title={isAutoSpin ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#686273] dark:text-slate-300 transition-colors cursor-pointer"
          >
            {isAutoSpin ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={() => setZoomScale((z) => Math.min(2.2, z + 0.2))}
            title="Zoom In"
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#686273] dark:text-slate-300 transition-colors cursor-pointer"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setZoomScale((z) => Math.max(0.7, z - 0.2))}
            title="Zoom Out"
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#686273] dark:text-slate-300 transition-colors cursor-pointer"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleResetView}
            title="Reset North Orientation"
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#686273] dark:text-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Sphere */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        className={`w-full h-full object-contain drop-shadow-[0_20px_45px_rgba(140,127,163,0.3)] relative z-0 touch-none ${
          hoveredLandmark ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
        }`}
      />

      {/* Interactive Hover Card Tooltip */}
      {hoveredLandmark && tooltipPos && (
        <div
          style={{
            left: Math.min(tooltipPos.x + 12, 280),
            top: Math.max(tooltipPos.y - 120, 20),
          }}
          className="absolute z-30 w-64 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-[#E8E2DA] dark:border-indigo-500/30 shadow-2xl backdrop-blur-xl transition-all duration-150 animate-in fade-in zoom-in-95 pointer-events-none"
        >
          <div className="flex gap-3">
            <img
              src={getLandmarkImageUrl(
                hoveredLandmark.name,
                hoveredLandmark.location
              )}
              alt={hoveredLandmark.name}
              className="w-16 h-16 rounded-xl object-cover border border-[#E8E2DA] dark:border-slate-800 flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <span className="inline-block px-2 py-0.5 rounded-md bg-[#E8E2F4] dark:bg-indigo-500/20 text-[#8C7FA3] dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                {hoveredLandmark.country}
              </span>
              <h4 className="text-xs font-extrabold text-[#221F26] dark:text-white truncate">
                {hoveredLandmark.name}
              </h4>
              <p className="text-[11px] text-[#686273] dark:text-slate-400 line-clamp-2 mt-0.5">
                {hoveredLandmark.description}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#E8E2DA] dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-[#8C7FA3] dark:text-indigo-400">
            <span>Click to explore with AI</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      )}

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-[#E8E2DA] dark:border-slate-800 text-[11px] font-medium text-[#686273] dark:text-slate-300 shadow-sm pointer-events-none">
        <Compass className="h-3.5 w-3.5 text-[#8C7FA3] dark:text-cyan-400 animate-spin-slow" />
        <span>Drag to rotate • Scroll to zoom • Click any pin</span>
      </div>
    </div>
  );
};

