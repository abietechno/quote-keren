import React, { useState, useRef } from 'react';
import {
  TextLayer,
  BackgroundConfig,
  StickerLayer,
  AspectRatio,
  TemplatePreset,
} from './types';
import { TEMPLATE_PRESETS } from './data/templates';
import { BACKGROUND_PRESETS } from './data/backgrounds';
import { Header } from './components/Header';
import { CanvasArea } from './components/CanvasArea';
import { IOSControlSheet } from './components/IOSControlSheet';
import { TextEditModal } from './components/TextEditModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // App States
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [activeTab, setActiveTab] = useState<'template' | 'text' | 'background' | 'filter' | 'sticker'>('template');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);

  // Initial State loaded from default template (Graffiti Street Wall)
  const defaultTemplate = TEMPLATE_PRESETS[0];

  const [background, setBackground] = useState<BackgroundConfig>(defaultTemplate.background);
  const [filterClass, setFilterClass] = useState<string>(defaultTemplate.filter);

  const [texts, setTexts] = useState<TextLayer[]>(
    defaultTemplate.texts.map((t, idx) => ({
      ...t,
      id: `text-${idx + 1}-${Date.now()}`,
    }))
  );

  const [stickers, setStickers] = useState<StickerLayer[]>(
    (defaultTemplate.stickers || []).map((s, idx) => ({
      ...s,
      id: `sticker-${idx + 1}-${Date.now()}`,
    }))
  );

  const [selectedTextId, setSelectedTextId] = useState<string | null>(
    texts.length > 0 ? texts[0].id : null
  );
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Modals
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [editingTextLayer, setEditingTextLayer] = useState<TextLayer | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Apply Template
  const handleApplyTemplate = (tpl: TemplatePreset) => {
    setBackground(tpl.background);
    setFilterClass(tpl.filter);

    const newTexts = tpl.texts.map((t, idx) => ({
      ...t,
      id: `text-${idx + 1}-${Date.now()}`,
    }));
    setTexts(newTexts);

    const newStickers = (tpl.stickers || []).map((s, idx) => ({
      ...s,
      id: `sticker-${idx + 1}-${Date.now()}`,
    }));
    setStickers(newStickers);

    setSelectedTextId(newTexts.length > 0 ? newTexts[0].id : null);
    setSelectedStickerId(null);
  };

  // Add New Text Layer
  const handleAddText = () => {
    const newTextLayer: TextLayer = {
      id: `text-${Date.now()}`,
      text: 'Ketik Kata-Kata Disini...',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 32,
      color: '#ffffff',
      x: 50,
      y: 50,
      rotation: 0,
      letterSpacing: 1,
      lineHeight: 1.2,
      opacity: 1,
      textAlign: 'center',
      textTransform: 'none',
      shadowPreset: 'soft',
      strokeColor: '#000000',
      strokeWidth: 0,
      bold: true,
    };

    setTexts((prev) => [...prev, newTextLayer]);
    setSelectedTextId(newTextLayer.id);
    setSelectedStickerId(null);
    setEditingTextLayer(newTextLayer);
    setIsTextModalOpen(true);
  };

  // Update Text Layer
  const handleUpdateText = (id: string, updates: Partial<TextLayer>) => {
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  // Delete Text Layer
  const handleDeleteText = (id: string) => {
    setTexts((prev) => prev.filter((t) => t.id !== id));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
  };

  // Open Edit Modal for Text
  const handleOpenTextModal = (textLayer?: TextLayer) => {
    const target = textLayer || texts.find((t) => t.id === selectedTextId) || texts[0];
    if (target) {
      setEditingTextLayer(target);
      setIsTextModalOpen(true);
    }
  };

  // Save Text Content from Modal
  const handleSaveTextContent = (id: string, newText: string) => {
    handleUpdateText(id, { text: newText });
  };

  // Add Sticker
  const handleAddSticker = (content: string, type: 'emoji' | 'graffiti' | 'badge') => {
    const newSticker: StickerLayer = {
      id: `sticker-${Date.now()}`,
      type,
      content,
      x: 50,
      y: 50,
      scale: 1.2,
      rotation: 0,
    };
    setStickers((prev) => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
    setSelectedTextId(null);
  };

  // Update Sticker
  const handleUpdateSticker = (id: string, updates: Partial<StickerLayer>) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  // Delete Sticker
  const handleDeleteSticker = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    if (selectedStickerId === id) {
      setSelectedStickerId(null);
    }
  };

  // Reset Canvas
  const handleResetCanvas = () => {
    handleApplyTemplate(TEMPLATE_PRESETS[0]);
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-[#000000] text-white' : 'bg-[#F2F2F7] text-[#1C1C1E]'} min-h-screen flex flex-col font-['Plus_Jakarta_Sans'] select-none overflow-x-hidden transition-colors duration-300`}>
      
      {/* iOS Cupertino Header */}
      <Header
        aspectRatio={aspectRatio}
        onAspectRatioChange={setAspectRatio}
        onReset={handleResetCanvas}
        onExport={() => setIsExportModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        isDeviceFrame={isDeviceFrame}
        onToggleDeviceFrame={() => setIsDeviceFrame((prev) => !prev)}
      />

      {/* Main Studio Work Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 max-w-6xl w-full mx-auto">
        
        {/* Interactive Drag & Drop Canvas */}
        <CanvasArea
          canvasRef={canvasRef}
          aspectRatio={aspectRatio}
          background={background}
          filterClass={filterClass}
          texts={texts}
          stickers={stickers}
          selectedTextId={selectedTextId}
          selectedStickerId={selectedStickerId}
          onSelectText={setSelectedTextId}
          onSelectSticker={setSelectedStickerId}
          onUpdateText={handleUpdateText}
          onUpdateSticker={handleUpdateSticker}
          onDeleteText={handleDeleteText}
          onDeleteSticker={handleDeleteSticker}
          onEditTextContent={handleOpenTextModal}
          isDeviceFrame={isDeviceFrame}
        />

      </main>

      {/* iOS Cupertino Bottom Control Panel Sheet */}
      <IOSControlSheet
        activeTab={activeTab}
        onTabChange={setActiveTab}
        texts={texts}
        selectedTextId={selectedTextId}
        onSelectText={setSelectedTextId}
        onAddText={handleAddText}
        onUpdateText={handleUpdateText}
        onOpenTextModal={handleOpenTextModal}
        background={background}
        onUpdateBackground={(updates) => setBackground((prev) => ({ ...prev, ...updates }))}
        onSelectPresetBackground={(bg) =>
          setBackground({
            type: bg.type,
            value: bg.value,
            overlayOpacity: bg.overlayOpacity || 0,
            overlayColor: bg.overlayColor || '#000000',
            blur: 0,
          })
        }
        filterClass={filterClass}
        onSelectFilter={setFilterClass}
        stickers={stickers}
        onAddSticker={handleAddSticker}
        onApplyTemplate={handleApplyTemplate}
      />

      {/* Modals */}
      <TextEditModal
        isOpen={isTextModalOpen}
        textLayer={editingTextLayer}
        onClose={() => setIsTextModalOpen(false)}
        onSave={handleSaveTextContent}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        canvasRef={canvasRef}
        onClose={() => setIsExportModalOpen(false)}
      />

    </div>
  );
}
