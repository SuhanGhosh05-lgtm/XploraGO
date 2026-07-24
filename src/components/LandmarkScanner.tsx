import React, { useState, useRef } from 'react';
import { Camera, Upload, Search, X, Sparkles, AlertCircle, MapPin } from 'lucide-react';
import { CURATED_LANDMARKS } from '../data/curatedLandmarks';

interface LandmarkScannerProps {
  onScanComplete: (landmarkData: any) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const LandmarkScanner: React.FC<LandmarkScannerProps> = ({
  onScanComplete,
  onClose,
  isModal = false,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'search'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textQuery, setTextQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('Initializing landmark scanner...');
  const [error, setError] = useState<string | null>(null);

  // Camera stream refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Sample landmark photos for 1-click scanning
  const samplePhotos = CURATED_LANDMARKS.slice(0, 4);

  // Helper to resize/compress uploaded images for fast transmission & memory efficiency
  const compressImage = (dataUrl: string, maxDim = 1200, quality = 0.85): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        setError('Image file size should be less than 20MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawUrl = event.target?.result as string;
        if (rawUrl) {
          const optimized = await compressImage(rawUrl);
          setSelectedImage(optimized);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawUrl = event.target?.result as string;
        if (rawUrl) {
          const optimized = await compressImage(rawUrl);
          setSelectedImage(optimized);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Camera start
  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access device camera. Please check browser permissions or upload an image.');
    }
  };

  // Camera stop
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Snap photo from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setSelectedImage(dataUrl);
        stopCamera();
        setActiveTab('upload');
      }
    }
  };

  // Execute scan API request
  const runScan = async (sampleUrl?: string) => {
    const imageToUse = sampleUrl || selectedImage;
    if (!imageToUse && !textQuery.trim()) {
      setError('Please upload/snap a photo or type a landmark name.');
      return;
    }

    setIsScanning(true);
    setError(null);

    const steps = [
      'Scanning architectural patterns...',
      'Matching global landmark databases...',
      'Uncovering ancient folklore & myths...',
      'Mapping golden hour camera spots...',
      'Compiling tourist traps & local etiquette...',
      'Consulting Gemma AI travel guide...',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length;
      setScanStep(steps[currentStep]);
    }, 1100);

    try {
      const response = await fetch('https://xplorago.onrender.com/api/scan-landmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageToUse,
          textQuery: textQuery.trim(),
        }),
      });

      const data = await response.json();
      clearInterval(interval);

      if (data.success && data.landmark) {
        if (imageToUse) {
          data.landmark.imageUrl = imageToUse;
        }
        onScanComplete(data.landmark);
        if (onClose) onClose();
      } else {
        setError(data.errorMsg || 'Failed to analyze landmark. Please try again or select a curated landmark.');
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error('Scan error:', err);
      setError('Network request failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className={`bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 shadow-2xl text-slate-100 backdrop-blur-2xl ${isModal ? 'max-w-2xl w-full mx-auto relative' : ''}`}>
      {/* Modal Close */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Title */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-extrabold text-white">
            AI Landmark Scanner
          </h2>
        </div>
        <p className="text-xs text-slate-300">
          Upload a photo or search by name. Gemma AI will decode history, myths, best photo angles, and local rules instantly.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 mb-5 text-xs font-semibold">
        <button
          onClick={() => {
            stopCamera();
            setActiveTab('upload');
          }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
            activeTab === 'upload'
              ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Upload className="h-4 w-4" />
          Upload Photo
        </button>

        <button
          onClick={() => {
            setActiveTab('camera');
            startCamera();
          }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
            activeTab === 'camera'
              ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Camera className="h-4 w-4" />
          Live Camera
        </button>

        <button
          onClick={() => {
            stopCamera();
            setActiveTab('search');
          }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
            activeTab === 'search'
              ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Search className="h-4 w-4" />
          Search Name
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* TAB CONTENT: UPLOAD */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          {selectedImage ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-video max-h-64 flex items-center justify-center group">
              <img src={selectedImage} alt="Scanned preview" className="h-full w-full object-cover" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-rose-900/80 transition-colors"
                title="Remove photo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-8 text-center bg-slate-950/60 transition-all cursor-pointer"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="landmark-file-input"
              />
              <label htmlFor="landmark-file-input" className="cursor-pointer block space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-cyan-400 border border-indigo-500/20 flex items-center justify-center mx-auto">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Click to upload or drag & drop a landmark photo
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports JPG, PNG, WEBP up to 15MB
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Quick 1-Click Sample Photos */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Or Try 1-Click Sample Photos:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {samplePhotos.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedImage(sample.imageUrl);
                    runScan(sample.imageUrl);
                  }}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 text-left flex items-center gap-2 group transition-all"
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="h-9 w-9 rounded-lg object-cover border border-slate-800 shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                      {sample.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{sample.location}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CAMERA */}
      {activeTab === 'camera' && (
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-video flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
            <canvas ref={canvasRef} className="hidden" />
            {!isCameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 p-4 text-center">
                <Camera className="h-10 w-10 text-indigo-400 mb-2 animate-bounce" />
                <p className="text-xs text-slate-400">Camera preview inactive</p>
                <button
                  onClick={startCamera}
                  className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                >
                  Enable Device Camera
                </button>
              </div>
            )}
          </div>

          {isCameraActive && (
            <button
              onClick={capturePhoto}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20"
            >
              <Camera className="h-4 w-4" />
              Snap Landmark Photo
            </button>
          )}
        </div>
      )}

      {/* TAB CONTENT: SEARCH */}
      {activeTab === 'search' && (
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300">
            Type Landmark Name or Historic Location
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={textQuery}
              onChange={(e) => setTextQuery(e.target.value)}
              placeholder="e.g. Sagrada Familia Barcelona, Mount Fuji, Machu Picchu..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && runScan()}
            />
          </div>
        </div>
      )}

      {/* SCANNING RADAR OVERLAY */}
      {isScanning ? (
        <div className="mt-6 p-6 rounded-2xl bg-slate-950/90 border border-indigo-500/30 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
          {/* Scanning laser beam line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <div className="h-full w-full rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <p className="text-sm font-extrabold text-cyan-300">{scanStep}</p>
            <p className="text-xs text-slate-400 mt-1">Gemma AI is processing architectural markers...</p>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <button
            onClick={() => runScan()}
            disabled={!selectedImage && !textQuery.trim()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="h-4 w-4 text-white" />
            <span>Analyze Landmark with Gemma AI</span>
          </button>
        </div>
      )}
    </div>
  );
};
