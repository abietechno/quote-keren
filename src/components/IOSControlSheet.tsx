import React, { useState } from 'react';
import {
  TextLayer,
  BackgroundConfig,
  StickerLayer,
  TemplatePreset,
} from '../types';
import { FONT_OPTIONS, SHADOW_PRESETS, COLOR_SWATCHES, GRADIENT_PRESETS } from '../data/fonts';
import { BACKGROUND_PRESETS } from '../data/backgrounds';
import { FILTER_PRESETS } from '../data/filters';
import { STICKER_PRESETS } from '../data/stickers';
import { TEMPLATE_PRESETS } from '../data/templates';
import {
  Type,
  Layout,
  Palette,
  Wand2,
  Smile,
  Plus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  Layers,
  Sparkles,
  SlidersHorizontal,
  Check,
} from 'lucide-react';

interface IOSControlSheetProps {
  activeTab: 'template' | 'text' | 'background' | 'filter' | 'sticker';
  onTabChange: (tab: 'template' | 'text' | 'background' | 'filter' | 'sticker') => void;
  
  // Text Props
  texts: TextLayer[];
  selectedTextId: string | null;
  onSelectText: (id: string) => void;
  onAddText: () => void;
  onUpdateText: (id: string, updates: Partial<TextLayer>) => void;
  onOpenTextModal: (textLayer?: TextLayer) => void;

  // Background Props
  background: BackgroundConfig;
  onUpdateBackground: (updates: Partial<BackgroundConfig>) => void;
  onSelectPresetBackground: (preset: typeof BACKGROUND_PRESETS[0]) => void;

  // Filter Props
  filterClass: string;
  onSelectFilter: (className: string) => void;

  // Sticker Props
  stickers: StickerLayer[];
  onAddSticker: (content: string, type: 'emoji' | 'graffiti' | 'badge') => void;

  // Template Props
  onApplyTemplate: (template: TemplatePreset) => void;
}

export const IOSControlSheet: React.FC<IOSControlSheetProps> = ({
  activeTab,
  onTabChange,
  texts,
  selectedTextId,
  onSelectText,
  onAddText,
  onUpdateText,
  onOpenTextModal,
  background,
  onUpdateBackground,
  onSelectPresetBackground,
  filterClass,
  onSelectFilter,
  onAddSticker,
  onApplyTemplate,
}) => {
  const selectedText = texts.find((t) => t.id === selectedTextId) || texts[0];

  // Custom Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateBackground({
            type: 'image',
            value: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-xl border-t border-[#E5E5EA] shadow-xl transition-all pb-safe">
      
      {/* iOS Cupertino Segmented Tab Bar */}
      <div className="max-w-4xl mx-auto px-2 pt-2.5 pb-1">
        <div className="flex items-center justify-around bg-[#E5E5EA]/70 p-1 rounded-2xl border border-black/5 shadow-inner">
          <button
            onClick={() => onTabChange('template')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex-1 ${
              activeTab === 'template'
                ? 'bg-white text-[#1C1C1E] shadow-sm ring-1 ring-black/5'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span className="text-[11px] sm:text-xs">Templat</span>
          </button>

          <button
            onClick={() => onTabChange('text')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex-1 ${
              activeTab === 'text'
                ? 'bg-white text-[#1C1C1E] shadow-sm ring-1 ring-black/5'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Type className="w-4 h-4" />
            <span className="text-[11px] sm:text-xs">Teks</span>
          </button>

          <button
            onClick={() => onTabChange('background')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex-1 ${
              activeTab === 'background'
                ? 'bg-white text-[#1C1C1E] shadow-sm ring-1 ring-black/5'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span className="text-[11px] sm:text-xs">Latar</span>
          </button>

          <button
            onClick={() => onTabChange('filter')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex-1 ${
              activeTab === 'filter'
                ? 'bg-white text-[#1C1C1E] shadow-sm ring-1 ring-black/5'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span className="text-[11px] sm:text-xs">Filter</span>
          </button>

          <button
            onClick={() => onTabChange('sticker')}
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex-1 ${
              activeTab === 'sticker'
                ? 'bg-white text-[#1C1C1E] shadow-sm ring-1 ring-black/5'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span className="text-[11px] sm:text-xs">Stiker</span>
          </button>
        </div>
      </div>

      {/* Tab Content Panel */}
      <div className="max-w-4xl mx-auto p-3 sm:p-4 min-h-[220px] max-h-[320px] overflow-y-auto no-scrollbar">
        
        {/* ================= TAB 1: TEMPLATE ================= */}
        {activeTab === 'template' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
                Pilihan Templat Siap Pakai
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TEMPLATE_PRESETS.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => onApplyTemplate(tpl)}
                  className="group relative text-left bg-gray-50 hover:bg-gray-100 p-3 rounded-2xl border border-gray-200/80 hover:border-[#007AFF]/50 transition-all shadow-sm active:scale-98 overflow-hidden"
                >
                  <div className="text-xs font-extrabold text-[#1C1C1E] mb-1 group-hover:text-[#007AFF] transition-colors">
                    {tpl.title}
                  </div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    Kategori: {tpl.category}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-[#007AFF] flex items-center gap-1">
                    <span>Gunakan Templat</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: TEKS ================= */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            {/* Header: Layers & Add Text Button */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
              <div className="flex items-center gap-1.5">
                {texts.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectText(t.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                      selectedTextId === t.id
                        ? 'bg-[#007AFF] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>Layer {idx + 1}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={onAddText}
                className="px-3 py-1.5 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1 shadow-sm flex-shrink-0 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Teks</span>
              </button>
            </div>

            {selectedText ? (
              <div className="space-y-4">
                {/* Edit Text Content Button */}
                <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                  <span className="text-xs text-[#1C1C1E] font-semibold truncate max-w-[200px]">
                    "{selectedText.text || 'Kosong'}"
                  </span>
                  <button
                    onClick={() => onOpenTextModal(selectedText)}
                    className="px-3 py-1 rounded-lg bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-semibold transition-all active:scale-95"
                  >
                    Ubah Kata-kata
                  </button>
                </div>

                {/* Font Selector List */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                    Gaya Font (Google Fonts)
                  </label>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {FONT_OPTIONS.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => onUpdateText(selectedText.id, { fontFamily: font.fontFamily })}
                        className={`px-3 py-2 rounded-xl text-xs font-medium flex-shrink-0 border transition-all ${
                          selectedText.fontFamily === font.fontFamily
                            ? 'bg-blue-50 border-[#007AFF] text-[#007AFF] ring-1 ring-[#007AFF]'
                            : 'bg-gray-50 border-gray-200 text-[#1C1C1E] hover:border-gray-300'
                        }`}
                      >
                        <span style={{ fontFamily: font.fontFamily }} className="text-sm block mb-0.5">
                          {font.previewText || 'Sample'}
                        </span>
                        <span className="text-[10px] text-gray-500 font-sans block">{font.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders: Size, Line Height, Letter Spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200/80">
                  {/* Font Size */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-1">
                      <span>Ukuran Font</span>
                      <span className="text-[#007AFF]">{selectedText.fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="14"
                      max="110"
                      value={selectedText.fontSize}
                      onChange={(e) =>
                        onUpdateText(selectedText.id, { fontSize: Number(e.target.value) })
                      }
                      className="w-full accent-[#007AFF] cursor-pointer"
                    />
                  </div>

                  {/* Letter Spacing */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-1">
                      <span>Jarak Huruf</span>
                      <span className="text-[#007AFF]">{selectedText.letterSpacing}px</span>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="20"
                      value={selectedText.letterSpacing}
                      onChange={(e) =>
                        onUpdateText(selectedText.id, { letterSpacing: Number(e.target.value) })
                      }
                      className="w-full accent-[#007AFF] cursor-pointer"
                    />
                  </div>

                  {/* Rotation */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-1">
                      <span>Rotasi</span>
                      <span className="text-[#007AFF]">{selectedText.rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={selectedText.rotation}
                      onChange={(e) =>
                        onUpdateText(selectedText.id, { rotation: Number(e.target.value) })
                      }
                      className="w-full accent-[#007AFF] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Colors & Gradient Fills */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                    Warna Teks & Gradien
                  </label>

                  {/* Solid Colors */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    <input
                      type="color"
                      value={selectedText.color || '#ffffff'}
                      onChange={(e) =>
                        onUpdateText(selectedText.id, { color: e.target.value, gradientFill: undefined })
                      }
                      className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-0 p-0"
                      title="Pilih Warna Kustom"
                    />
                    {COLOR_SWATCHES.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          onUpdateText(selectedText.id, { color, gradientFill: undefined })
                        }
                        className={`w-7 h-7 rounded-full flex-shrink-0 transition-transform ${
                          selectedText.color === color && !selectedText.gradientFill
                            ? 'scale-110 ring-2 ring-[#007AFF] ring-offset-2 ring-offset-white'
                            : 'hover:scale-105 border border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Gradient Presets */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                    <span className="text-[10px] text-gray-500 font-semibold uppercase flex-shrink-0">Gradien:</span>
                    {GRADIENT_PRESETS.map((grad) => (
                      <button
                        key={grad.name}
                        onClick={() =>
                          onUpdateText(selectedText.id, { gradientFill: grad.css })
                        }
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white flex-shrink-0 border border-black/10 shadow-sm"
                        style={{ background: grad.css }}
                      >
                        {grad.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Alignment & Formatting */}
                <div className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <div className="flex items-center bg-gray-200/70 p-1 rounded-lg">
                    <button
                      onClick={() => onUpdateText(selectedText.id, { textAlign: 'left' })}
                      className={`p-1.5 rounded-md ${
                        selectedText.textAlign === 'left' ? 'bg-[#007AFF] text-white' : 'text-gray-600'
                      }`}
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUpdateText(selectedText.id, { textAlign: 'center' })}
                      className={`p-1.5 rounded-md ${
                        selectedText.textAlign === 'center' ? 'bg-[#007AFF] text-white' : 'text-gray-600'
                      }`}
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUpdateText(selectedText.id, { textAlign: 'right' })}
                      className={`p-1.5 rounded-md ${
                        selectedText.textAlign === 'right' ? 'bg-[#007AFF] text-white' : 'text-gray-600'
                      }`}
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateText(selectedText.id, { bold: !selectedText.bold })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        selectedText.bold ? 'bg-[#007AFF] text-white border-[#007AFF]' : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      B
                    </button>
                    <button
                      onClick={() => onUpdateText(selectedText.id, { italic: !selectedText.italic })}
                      className={`px-2.5 py-1 rounded-lg text-xs italic font-serif border ${
                        selectedText.italic ? 'bg-[#007AFF] text-white border-[#007AFF]' : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      I
                    </button>
                  </div>
                </div>

                {/* Text Shadow / 3D Preset Choice */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                    Efek Bayangan / 3D Graffiti
                  </label>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {SHADOW_PRESETS.map((sh) => (
                      <button
                        key={sh.id}
                        onClick={() => onUpdateText(selectedText.id, { shadowPreset: sh.id })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0 border transition-all ${
                          selectedText.shadowPreset === sh.id
                            ? 'bg-blue-50 border-[#007AFF] text-[#007AFF] ring-1 ring-[#007AFF]'
                            : 'bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                      >
                        {sh.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Outline Stroke Control */}
                <div className="flex items-center justify-between gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#1C1C1E] font-semibold">Garis Tepi (Stroke):</span>
                    <input
                      type="color"
                      value={selectedText.strokeColor || '#000000'}
                      onChange={(e) =>
                        onUpdateText(selectedText.id, { strokeColor: e.target.value })
                      }
                      className="w-6 h-6 rounded-full cursor-pointer bg-transparent border-0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">{selectedText.strokeWidth}px</span>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      value={selectedText.strokeWidth}
                      onChange={(e) =>
                        onUpdateText(selectedText.id, { strokeWidth: Number(e.target.value) })
                      }
                      className="w-24 accent-[#007AFF] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 text-xs">
                Tidak ada teks aktif. Klik 'Tambah Teks' untuk membuat kata-kata baru.
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: LATAR (BACKGROUND) ================= */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            {/* Custom Image Upload & Presets */}
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Opsi Latar Belakang
              </h3>

              <label className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1C1C1E] text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-gray-200 transition-all active:scale-95">
                <Upload className="w-3.5 h-3.5 text-[#007AFF]" />
                <span>Upload Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Background Sliders: Dimming & Blur */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-1">
                  <span>Redupkan Latar (Overlay Dim)</span>
                  <span className="text-[#007AFF]">{Math.round(background.overlayOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.85"
                  step="0.05"
                  value={background.overlayOpacity}
                  onChange={(e) =>
                    onUpdateBackground({ overlayOpacity: Number(e.target.value) })
                  }
                  className="w-full accent-[#007AFF] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-1">
                  <span>Efek Blur Latar</span>
                  <span className="text-[#007AFF]">{background.blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={background.blur}
                  onChange={(e) =>
                    onUpdateBackground({ blur: Number(e.target.value) })
                  }
                  className="w-full accent-[#007AFF] cursor-pointer"
                />
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BACKGROUND_PRESETS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => onSelectPresetBackground(bg)}
                  className={`p-2.5 rounded-2xl border text-left transition-all relative overflow-hidden h-20 flex flex-col justify-end ${
                    background.value === bg.value
                      ? 'border-[#007AFF] ring-2 ring-[#007AFF] shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={
                    bg.type === 'solid'
                      ? { backgroundColor: bg.value }
                      : bg.type === 'gradient' || bg.type === 'texture'
                      ? { background: bg.value }
                      : { backgroundImage: `url(${bg.value})`, backgroundSize: 'cover' }
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="relative z-10 text-[11px] font-bold text-white drop-shadow">
                    {bg.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: FILTER ================= */}
        {activeTab === 'filter' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Filter Warna & Mood Kanvas
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {FILTER_PRESETS.map((fl) => (
                <button
                  key={fl.id}
                  onClick={() => onSelectFilter(fl.className)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    filterClass === fl.className
                      ? 'bg-blue-50 border-[#007AFF] ring-1 ring-[#007AFF] text-[#1C1C1E]'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-xs font-extrabold mb-1 flex items-center justify-between">
                    <span>{fl.name}</span>
                    {filterClass === fl.className && (
                      <Check className="w-4 h-4 text-[#007AFF]" />
                    )}
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight">
                    {fl.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: STIKER ================= */}
        {activeTab === 'sticker' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Stiker & Cap Graffiti (Klik untuk Menambahkan ke Kanvas)
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {STICKER_PRESETS.map((st) => (
                <button
                  key={st.id}
                  onClick={() => onAddSticker(st.content, st.type)}
                  className="bg-gray-50 hover:bg-gray-100 p-3 rounded-2xl border border-gray-200 hover:border-[#007AFF]/50 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
                >
                  <span className="text-2xl sm:text-3xl">{st.content}</span>
                  <span className="text-[10px] text-gray-500 font-semibold truncate w-full text-center">
                    {st.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
