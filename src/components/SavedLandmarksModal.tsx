import React from 'react';
import { LandmarkDetails } from '../types';
import { Bookmark, X, MapPin, ChevronRight, Trash2, Compass } from 'lucide-react';
import { getLandmarkImageUrl } from '../utils/landmarkImages';

interface SavedLandmarksModalProps {
  savedLandmarks: LandmarkDetails[];
  onSelectLandmark: (landmark: LandmarkDetails) => void;
  onRemoveBookmark: (id: string) => void;
  onClose: () => void;
}

export const SavedLandmarksModal: React.FC<SavedLandmarksModalProps> = ({
  savedLandmarks,
  onSelectLandmark,
  onRemoveBookmark,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl max-w-2xl w-full p-6 text-slate-100 relative max-h-[85vh] flex flex-col shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white">Saved Travel Guides</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-cyan-300 text-xs font-bold border border-indigo-500/20">
              {savedLandmarks.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedLandmarks.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-3">
              <Compass className="h-12 w-12 mx-auto text-slate-700 animate-spin-slow" />
              <p className="text-sm font-medium text-slate-400">No saved landmarks yet.</p>
              <p className="text-xs text-slate-500">Scan any landmark or browse curated places and tap the bookmark icon!</p>
            </div>
          ) : (
            savedLandmarks.map((landmark) => (
              <div
                key={landmark.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between gap-4 group"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => {
                    onSelectLandmark(landmark);
                    onClose();
                  }}
                >
                  <img
                    src={getLandmarkImageUrl(landmark.name, landmark.location, landmark.imageUrl)}
                    alt={landmark.name}
                    className="h-14 w-14 rounded-xl object-cover shrink-0 border border-slate-800"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {landmark.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                      <MapPin className="h-3 w-3 text-cyan-400" />
                      <span>{landmark.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemoveBookmark(landmark.id)}
                    className="p-2 rounded-xl bg-slate-900 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-800 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => {
                      onSelectLandmark(landmark);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors shadow-sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
