import React from 'react';
import { LandmarkDetails } from '../types';
import { X, History, MapPin, ArrowRight, Trash2, Globe } from 'lucide-react';
import { getLandmarkImageUrl } from '../utils/landmarkImages';

interface TravelHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: LandmarkDetails[];
  onSelectLandmark: (landmark: LandmarkDetails) => void;
  onClearHistory: () => void;
  onRemoveHistoryItem?: (landmarkId: string) => void;
}

export const TravelHistoryModal: React.FC<TravelHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onSelectLandmark,
  onClearHistory,
  onRemoveHistoryItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-100 relative shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Recent Searches</h2>
              <p className="text-xs text-slate-400">Your recent AI landmark & destination queries</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List */}
        {history.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <Globe className="h-10 w-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">No recent searches. Search or scan any location to get started!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[50vh] overflow-y-auto scrollbar-none pr-1">
            {history.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/30 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 truncate">
                  <img
                    src={getLandmarkImageUrl(item.name, item.location, item.imageUrl)}
                    alt={item.name}
                    className="h-12 w-12 rounded-xl object-cover shrink-0 border border-slate-800"
                  />

                  <div className="truncate">
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onSelectLandmark(item);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-indigo-500/20"
                  >
                    <span>Open</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  {onRemoveHistoryItem && (
                    <button
                      onClick={() => onRemoveHistoryItem(item.id)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {history.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center">
            <button
              onClick={onClearHistory}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-medium transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear History</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
