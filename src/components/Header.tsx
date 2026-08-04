import React from 'react';
import { AspectRatio } from '../types';
import { Download, RotateCcw, Sparkles, Smartphone, Square, RectangleVertical, Monitor } from 'lucide-react';

interface HeaderProps {
  aspectRatio: AspectRatio;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  onReset: () => void;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  aspectRatio,
  onAspectRatioChange,
  onReset,
  onExport,
}) => {
  const aspectRatios: { id: AspectRatio; label: string; icon: React.ReactNode }[] = [
    { id: '1:1', label: '1:1', icon: <Square className="w-3.5 h-3.5" /> },
    { id: '9:16', label: '9:16', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: '4:5', label: '4:5', icon: <RectangleVertical className="w-3.5 h-3.5" /> },
    { id: '3:4', label: '3:4', icon: <RectangleVertical className="w-3.5 h-3.5 scale-90" /> },
    { id: '16:9', label: '16:9', icon: <Monitor className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-[#E5E5EA] px-3 py-2.5 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20 ring-1 ring-black/5">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-[#1C1C1E] font-['Plus_Jakarta_Sans']">
              Quotes-OftheDay-
            </h1>
            <span className="text-[10px] text-blue-600 font-semibold tracking-wider uppercase block -mt-1">
              by abie
            </span>
          </div>
        </div>

        {/* Aspect Ratio Picker (Segmented Control) */}
        <div className="hidden md:flex items-center bg-[#E5E5EA]/70 p-1 rounded-xl border border-black/5 shadow-inner">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.id}
              onClick={() => onAspectRatioChange(ratio.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                aspectRatio === ratio.id
                  ? 'bg-white text-[#1C1C1E] shadow-sm font-bold'
                  : 'text-gray-600 hover:text-black hover:bg-black/5'
              }`}
            >
              {ratio.icon}
              <span>{ratio.label}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Reset Kanvas"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 transition-all text-xs font-medium flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-gray-500" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={onExport}
            className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor</span>
          </button>
        </div>
      </div>

      {/* Mobile Aspect Ratio Selector (Scrollable Strip) */}
      <div className="flex md:hidden items-center justify-center gap-1.5 mt-2 pt-2 border-t border-gray-200/60 overflow-x-auto no-scrollbar pb-0.5">
        <span className="text-[11px] text-gray-500 font-medium mr-1 flex-shrink-0">Rasio:</span>
        {aspectRatios.map((ratio) => (
          <button
            key={ratio.id}
            onClick={() => onAspectRatioChange(ratio.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex-shrink-0 ${
              aspectRatio === ratio.id
                ? 'bg-[#007AFF] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            {ratio.icon}
            <span>{ratio.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
