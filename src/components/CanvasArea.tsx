import React, { useRef, useState, useEffect } from 'react';
import { TextLayer, BackgroundConfig, StickerLayer, AspectRatio } from '../types';
import { SHADOW_PRESETS } from '../data/fonts';
import { RotateCw, Trash2, Edit3, Move, Layers } from 'lucide-react';

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  aspectRatio: AspectRatio;
  background: BackgroundConfig;
  filterClass: string;
  texts: TextLayer[];
  stickers: StickerLayer[];
  selectedTextId: string | null;
  selectedStickerId: string | null;
  onSelectText: (id: string | null) => void;
  onSelectSticker: (id: string | null) => void;
  onUpdateText: (id: string, updates: Partial<TextLayer>) => void;
  onUpdateSticker: (id: string, updates: Partial<StickerLayer>) => void;
  onDeleteText: (id: string) => void;
  onDeleteSticker: (id: string) => void;
  onEditTextContent: (textLayer: TextLayer) => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  canvasRef,
  aspectRatio,
  background,
  filterClass,
  texts,
  stickers,
  selectedTextId,
  selectedStickerId,
  onSelectText,
  onSelectSticker,
  onUpdateText,
  onUpdateSticker,
  onDeleteText,
  onDeleteSticker,
  onEditTextContent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<'text' | 'sticker' | 'rotate' | 'scale' | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialRotation, setInitialRotation] = useState<number>(0);
  const [initialScaleOrSize, setInitialScaleOrSize] = useState<number>(0);

  // Guide lines visibility
  const [showSnapH, setShowSnapH] = useState(false);
  const [showSnapV, setShowSnapV] = useState(false);

  // Aspect ratio dimensions mapping for canvas container
  const getAspectRatioStyle = () => {
    switch (aspectRatio) {
      case '1:1':
        return 'aspect-square max-w-[480px]';
      case '9:16':
        return 'aspect-[9/16] max-w-[360px] max-h-[580px]';
      case '4:5':
        return 'aspect-[4/5] max-w-[420px]';
      case '3:4':
        return 'aspect-[3/4] max-w-[440px]';
      case '16:9':
        return 'aspect-[16/9] max-w-[580px]';
      default:
        return 'aspect-square max-w-[480px]';
    }
  };

  // Helper to find shadow CSS string from shadowPreset ID
  const getShadowStyle = (shadowPresetId: string) => {
    const found = SHADOW_PRESETS.find((s) => s.id === shadowPresetId);
    return found ? found.css : 'none';
  };

  // Handle pointer down for Text Layer move
  const handleTextPointerDown = (
    e: React.PointerEvent,
    text: TextLayer,
    action: 'move' | 'rotate' | 'scale'
  ) => {
    e.stopPropagation();
    onSelectText(text.id);
    onSelectSticker(null);

    const canvas = containerRef.current;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });

    if (action === 'move') {
      setDragType('text');
      setInitialPos({ x: text.x, y: text.y });
    } else if (action === 'rotate') {
      setDragType('rotate');
      setInitialRotation(text.rotation);
    } else if (action === 'scale') {
      setDragType('scale');
      setInitialScaleOrSize(text.fontSize);
    }
  };

  // Handle pointer down for Sticker move
  const handleStickerPointerDown = (
    e: React.PointerEvent,
    sticker: StickerLayer
  ) => {
    e.stopPropagation();
    onSelectSticker(sticker.id);
    onSelectText(null);

    setIsDragging(true);
    setDragType('sticker');
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos({ x: sticker.x, y: sticker.y });
  };

  // Global pointer move event handler
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !containerRef.current) return;

      const canvasRect = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      // Convert delta px to canvas percentage
      const deltaPercentX = (deltaX / canvasRect.width) * 100;
      const deltaPercentY = (deltaY / canvasRect.height) * 100;

      if (dragType === 'text' && selectedTextId) {
        let newX = Math.min(100, Math.max(0, initialPos.x + deltaPercentX));
        let newY = Math.min(100, Math.max(0, initialPos.y + deltaPercentY));

        // Snap to center guideline
        const snapThreshold = 1.5; // %
        if (Math.abs(newX - 50) < snapThreshold) {
          newX = 50;
          setShowSnapV(true);
        } else {
          setShowSnapV(false);
        }

        if (Math.abs(newY - 50) < snapThreshold) {
          newY = 50;
          setShowSnapH(true);
        } else {
          setShowSnapH(false);
        }

        onUpdateText(selectedTextId, { x: newX, y: newY });
      } else if (dragType === 'sticker' && selectedStickerId) {
        let newX = Math.min(100, Math.max(0, initialPos.x + deltaPercentX));
        let newY = Math.min(100, Math.max(0, initialPos.y + deltaPercentY));

        onUpdateSticker(selectedStickerId, { x: newX, y: newY });
      } else if (dragType === 'rotate' && selectedTextId) {
        const text = texts.find((t) => t.id === selectedTextId);
        if (text) {
          // Calculate center of text element relative to viewport
          const textCenterX = canvasRect.left + (text.x / 100) * canvasRect.width;
          const textCenterY = canvasRect.top + (text.y / 100) * canvasRect.height;
          
          const angleRad = Math.atan2(e.clientY - textCenterY, e.clientX - textCenterX);
          let angleDeg = Math.round(angleRad * (180 / Math.PI));
          onUpdateText(selectedTextId, { rotation: angleDeg });
        }
      } else if (dragType === 'scale' && selectedTextId) {
        const scaleFactor = 1 + deltaY / 150;
        const newSize = Math.max(12, Math.min(120, Math.round(initialScaleOrSize * scaleFactor)));
        onUpdateText(selectedTextId, { fontSize: newSize });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setDragType(null);
      setShowSnapH(false);
      setShowSnapV(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [
    isDragging,
    dragType,
    dragStart,
    initialPos,
    selectedTextId,
    selectedStickerId,
    initialScaleOrSize,
    texts,
    onUpdateText,
    onUpdateSticker,
  ]);

  // Render background style dynamically
  const renderBackgroundStyle = (): React.CSSProperties => {
    if (background.type === 'solid') {
      return { backgroundColor: background.value };
    }
    if (background.type === 'gradient' || background.type === 'texture') {
      return { background: background.value };
    }
    if (background.type === 'unsplash' || background.type === 'image') {
      return {
        backgroundImage: `url(${background.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return { backgroundColor: '#0a0a0c' };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
      {/* Aspect Ratio Canvas Wrapper */}
      <div
        ref={canvasRef}
        id="quote-canvas-node"
        className={`relative w-full ${getAspectRatioStyle()} rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 ${filterClass}`}
        style={renderBackgroundStyle()}
        onClick={() => {
          onSelectText(null);
          onSelectSticker(null);
        }}
      >
        {/* Container for drag pointer coordinates */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full">
          
          {/* Optional Overlay Dimmer / Color tint */}
          {background.overlayOpacity > 0 && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity"
              style={{
                backgroundColor: background.overlayColor || '#000000',
                opacity: background.overlayOpacity,
              }}
            />
          )}

          {/* Optional Backdrop Blur */}
          {background.blur > 0 && (
            <div
              className="absolute inset-0 pointer-events-none backdrop-blur-md"
              style={{ filter: `blur(${background.blur}px)` }}
            />
          )}

          {/* Center Snap Lines */}
          {showSnapV && (
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-sky-400/80 z-20 pointer-events-none border-r border-dashed border-sky-300" />
          )}
          {showSnapH && (
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-sky-400/80 z-20 pointer-events-none border-b border-dashed border-sky-300" />
          )}

          {/* Stickers Rendering */}
          {stickers.map((st) => {
            const isSelected = selectedStickerId === st.id;
            return (
              <div
                key={st.id}
                onPointerDown={(e) => handleStickerPointerDown(e, st)}
                className={`absolute cursor-grab active:cursor-grabbing transition-transform touch-none select-none ${
                  isSelected ? 'ring-2 ring-blue-500 rounded-lg p-1 bg-blue-500/10' : ''
                }`}
                style={{
                  left: `${st.x}%`,
                  top: `${st.y}%`,
                  transform: `translate(-50%, -50%) rotate(${st.rotation}deg) scale(${st.scale})`,
                }}
              >
                <div className="text-3xl sm:text-4xl filter drop-shadow-md">
                  {st.content}
                </div>
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSticker(st.id);
                    }}
                    className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Text Layers Rendering */}
          {texts.map((t) => {
            const isSelected = selectedTextId === t.id;

            // Generate Stroke Webkit CSS
            const strokeStyle =
              t.strokeWidth > 0
                ? {
                    WebkitTextStroke: `${t.strokeWidth}px ${t.strokeColor || '#000000'}`,
                  }
                : {};

            // Generate Gradient Text fill
            const gradientStyle: React.CSSProperties = t.gradientFill
              ? {
                  backgroundImage: t.gradientFill,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              : { color: t.color };

            return (
              <div
                key={t.id}
                onPointerDown={(e) => handleTextPointerDown(e, t, 'move')}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  onEditTextContent(t);
                }}
                className={`absolute cursor-grab active:cursor-grabbing touch-none select-none group max-w-[90%] transition-shadow ${
                  isSelected
                    ? 'ring-2 ring-blue-500 p-2 sm:p-3 rounded-xl bg-blue-500/10 backdrop-blur-[2px] shadow-2xl'
                    : 'p-1 hover:ring-1 hover:ring-slate-400/30 rounded-lg'
                }`}
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  transform: `translate(-50%, -50%) rotate(${t.rotation}deg)`,
                  opacity: t.opacity,
                  textAlign: t.textAlign,
                }}
              >
                {/* Text Content */}
                <p
                  className="whitespace-pre-line break-words leading-tight tracking-normal transition-all"
                  style={{
                    fontFamily: t.fontFamily,
                    fontSize: `${t.fontSize}px`,
                    lineHeight: t.lineHeight,
                    letterSpacing: `${t.letterSpacing}px`,
                    textTransform: t.textTransform,
                    fontWeight: t.bold ? 'bold' : 'normal',
                    fontStyle: t.italic ? 'italic' : 'normal',
                    textShadow: getShadowStyle(t.shadowPreset),
                    ...strokeStyle,
                    ...gradientStyle,
                  }}
                >
                  {t.text || 'Ketik Kata-kata Disini...'}
                </p>

                {/* Selected Controls Overlay Handles */}
                {isSelected && (
                  <>
                    {/* Delete Handle (Top-Left) */}
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteText(t.id);
                      }}
                      title="Hapus Teks"
                      className="absolute -top-3 -left-3 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white cursor-pointer active:scale-90"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Edit Handle (Bottom-Left) */}
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditTextContent(t);
                      }}
                      title="Edit Kata-Kata"
                      className="absolute -bottom-3 -left-3 w-7 h-7 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white cursor-pointer active:scale-90"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Rotate Handle (Top-Right) */}
                    <div
                      onPointerDown={(e) => handleTextPointerDown(e, t, 'rotate')}
                      title="Putar Teks"
                      className="absolute -top-3 -right-3 w-7 h-7 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white cursor-grab active:cursor-grabbing active:scale-90"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>

                    {/* Scale Handle (Bottom-Right) */}
                    <div
                      onPointerDown={(e) => handleTextPointerDown(e, t, 'scale')}
                      title="Tarik untuk Ubah Ukuran"
                      className="absolute -bottom-3 -right-3 w-7 h-7 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-white cursor-nwse-resize active:scale-90"
                    >
                      <Move className="w-3.5 h-3.5" />
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* Quick Watermark / Brand Badge inside Canvas */}
          <div className="absolute bottom-2 right-3 pointer-events-none opacity-40 text-[10px] text-white/80 font-mono tracking-widest uppercase">
            Quotes-OftheDay- by abie
          </div>

        </div>
      </div>
    </div>
  );
};
