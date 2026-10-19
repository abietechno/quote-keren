import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  Share2,
  Check,
  X,
  Sparkles,
  Image as ImageIcon,
  FileCheck,
  RefreshCw,
  Info,
} from 'lucide-react';
import {
  exportCanvasImage,
  downloadDataUrl,
  getStandardDimensions,
} from '../utils/exportImage';
import { TextLayer, BackgroundConfig, StickerLayer, AspectRatio } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  texts?: TextLayer[];
  background?: BackgroundConfig;
  stickers?: StickerLayer[];
  aspectRatio?: AspectRatio;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  canvasRef,
  texts = [],
  background,
  stickers = [],
  aspectRatio = '1:1',
  onClose,
}) => {
  const [activeFormat, setActiveFormat] = useState<'png' | 'jpeg'>('png');
  const [jpegQuality, setJpegQuality] = useState<number>(0.95);
  const [exporting, setExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<'png' | 'jpeg' | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const dimensions = getStandardDimensions(aspectRatio);

  // Generate preview image
  const generatePreview = useCallback(async (format: 'png' | 'jpeg', quality: number) => {
    if (!canvasRef.current) return;
    setExporting(true);
    setPreviewError(null);

    try {
      const dataUrl = await exportCanvasImage(canvasRef.current, {
        format,
        quality,
        pixelRatio: 2,
        texts,
        background,
        stickers,
        aspectRatio,
      });

      setPreviewUrl(dataUrl);
      setExporting(false);
    } catch (err) {
      console.error('Failed to generate export preview:', err);
      setPreviewError('Gagal memproses gambar pratinjau. Coba lagi atau gunakan tombol unduh langsung.');
      setExporting(false);
    }
  }, [canvasRef, texts, background, stickers, aspectRatio]);

  // Regenerate preview whenever modal opens or format/quality toggles
  useEffect(() => {
    if (isOpen && canvasRef.current) {
      // Small timeout to allow canvas deselect / render pass
      const timer = setTimeout(() => {
        generatePreview(activeFormat, jpegQuality);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setPreviewUrl(null);
      setDownloadSuccess(null);
    }
  }, [isOpen, activeFormat, jpegQuality, generatePreview, canvasRef]);

  if (!isOpen) return null;

  // Trigger download with specific format
  const handleDownload = async (format: 'png' | 'jpeg') => {
    setExporting(true);
    try {
      let dataUrl = previewUrl && activeFormat === format ? previewUrl : null;

      if (!dataUrl && canvasRef.current) {
        dataUrl = await exportCanvasImage(canvasRef.current, {
          format,
          quality: format === 'jpeg' ? jpegQuality : 1.0,
          pixelRatio: 2,
          texts,
          background,
          stickers,
          aspectRatio,
        });
      }

      if (!dataUrl) {
        throw new Error('Tidak dapat menghasilkan file gambar');
      }

      const extension = format === 'png' ? 'png' : 'jpg';
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const filename = `Quotes-by-abie-${timestamp}-${Date.now().toString().slice(-4)}.${extension}`;

      downloadDataUrl(dataUrl, filename);

      setDownloadSuccess(format);
      setExporting(false);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => setDownloadSuccess(null), 3500);
    } catch (err) {
      console.error(`Export download ${format} failed:`, err);
      alert(`Gagal mengunduh file ${format.toUpperCase()}. Silakan coba lagi.`);
      setExporting(false);
    }
  };

  // Copy Image to Clipboard
  const handleCopyClipboard = async () => {
    try {
      let dataUrl = previewUrl;
      if (!dataUrl && canvasRef.current) {
        dataUrl = await exportCanvasImage(canvasRef.current, {
          format: 'png',
          pixelRatio: 2,
          texts,
          background,
          stickers,
          aspectRatio,
        });
      }

      if (!dataUrl) return;

      const res = await fetch(dataUrl);
      const blob = await res.blob();

      if (navigator.clipboard && window.ClipboardItem) {
        // Clipboard API natively accepts image/png
        const pngBlob = blob.type === 'image/png' ? blob : new Blob([blob], { type: 'image/png' });
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': pngBlob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        alert('Fitur salin gambar ke clipboard tidak didukung oleh browser ini. Gunakan tombol Unduh PNG.');
      }
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      alert('Gagal menyalin gambar. Silakan gunakan tombol Unduh.');
    }
  };

  // Share API
  const handleShare = async () => {
    if (!navigator.share) {
      alert('Fitur berbagi langsung tidak didukung di browser ini. Silakan unduh gambar.');
      return;
    }
    try {
      let dataUrl = previewUrl;
      if (!dataUrl && canvasRef.current) {
        dataUrl = await exportCanvasImage(canvasRef.current, {
          format: activeFormat,
          quality: jpegQuality,
          pixelRatio: 2,
          texts,
          background,
          stickers,
          aspectRatio,
        });
      }
      if (!dataUrl) return;

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const ext = activeFormat === 'png' ? 'png' : 'jpg';
      const file = new File([blob], `quotes-by-abie.${ext}`, { type: blob.type });

      await navigator.share({
        title: 'Quotes of the Day - by abie',
        text: 'Lihat karya desain quotes & graffiti buatan saya!',
        files: [file],
      });
    } catch (err) {
      console.log('Share canceled or failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 space-y-4 text-[#1C1C1E] dark:text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#007AFF] to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1C1C1E] dark:text-white leading-tight">
                Ekspor Gambar Quotes
              </h2>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Pilih format <span className="font-bold text-[#007AFF]">PNG</span> atau <span className="font-bold text-amber-500">JPEG</span> berkualitas tinggi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#3A3A3C] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector Pills (PNG vs JPEG) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            <span>Pilih Format Ekspor</span>
            <span className="text-[#007AFF] font-medium lowercase">
              {dimensions.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-[#2C2C2E] rounded-2xl">
            <button
              onClick={() => setActiveFormat('png')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeFormat === 'png'
                  ? 'bg-white dark:bg-[#3A3A3C] text-[#007AFF] shadow-sm font-extrabold ring-1 ring-black/5 dark:ring-white/10'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>PNG (Crisp & Lossless)</span>
            </button>

            <button
              onClick={() => setActiveFormat('jpeg')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeFormat === 'jpeg'
                  ? 'bg-white dark:bg-[#3A3A3C] text-amber-500 shadow-sm font-extrabold ring-1 ring-black/5 dark:ring-white/10'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>JPEG (Kompresi Medsos)</span>
            </button>
          </div>
        </div>

        {/* JPEG Quality Selector (shown only if JPEG is active) */}
        {activeFormat === 'jpeg' && (
          <div className="flex items-center justify-between bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 rounded-xl px-3 py-2 text-xs">
            <span className="font-semibold text-amber-800 dark:text-amber-300">
              Kualitas JPEG:
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { label: '100% Maks', value: 1.0 },
                { label: '92% Rekomendasi', value: 0.92 },
                { label: '80% Ringan', value: 0.8 },
              ].map((q) => (
                <button
                  key={q.value}
                  onClick={() => setJpegQuality(q.value)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                    jpegQuality === q.value
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white/60 dark:bg-[#2C2C2E] text-gray-700 dark:text-gray-300 hover:bg-white'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Image Preview Container */}
        <div className="relative w-full h-[220px] sm:h-[260px] bg-gray-100 dark:bg-[#151516] rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800 p-2 group">
          {exporting && !previewUrl ? (
            <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="w-7 h-7 border-3 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold">Menyiapkan Render Ultra HD...</span>
            </div>
          ) : previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Hasil Ekspor Pratinjau"
                className="max-h-full max-w-full object-contain rounded-xl shadow-lg ring-1 ring-black/10 dark:ring-white/10"
              />
              <button
                onClick={() => generatePreview(activeFormat, jpegQuality)}
                title="Refresh Pratinjau"
                className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400 text-xs text-center px-4">
              <ImageIcon className="w-6 h-6 text-gray-400" />
              <span>{previewError || 'Klik tombol unduh di bawah untuk memulai ekspor.'}</span>
              <button
                onClick={() => generatePreview(activeFormat, jpegQuality)}
                className="px-3 py-1 bg-gray-200 dark:bg-[#2C2C2E] rounded-lg text-xs font-semibold hover:bg-gray-300 text-gray-800 dark:text-gray-200 flex items-center gap-1 mt-1"
              >
                <RefreshCw className="w-3 h-3" /> Muat Ulang Pratinjau
              </button>
            </div>
          )}

          {/* Resolution Badge */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md text-white rounded-md text-[10px] font-mono tracking-wider flex items-center gap-1 pointer-events-none">
            <span>{dimensions.width}×{dimensions.height}</span>
            <span className="text-sky-300 uppercase font-bold">• {activeFormat}</span>
          </div>
        </div>

        {/* Primary Download Buttons (Direct PNG & JPEG) */}
        <div className="space-y-2 pt-1">
          {/* Main Dual Download Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Download PNG Button */}
            <button
              onClick={() => handleDownload('png')}
              disabled={exporting}
              className={`py-3 px-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 disabled:opacity-50 cursor-pointer ${
                downloadSuccess === 'png'
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-[#007AFF] hover:bg-blue-600 text-white shadow-blue-500/25 ring-1 ring-blue-400/30'
              }`}
            >
              {downloadSuccess === 'png' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>PNG Tersimpan!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Unduh File PNG</span>
                </>
              )}
            </button>

            {/* Download JPEG Button */}
            <button
              onClick={() => handleDownload('jpeg')}
              disabled={exporting}
              className={`py-3 px-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 disabled:opacity-50 cursor-pointer ${
                downloadSuccess === 'jpeg'
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/25 ring-1 ring-amber-400/30'
              }`}
            >
              {downloadSuccess === 'jpeg' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>JPEG Tersimpan!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Unduh File JPEG</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Actions: Copy to Clipboard & Share */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCopyClipboard}
              className="py-2.5 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] hover:bg-gray-200 dark:hover:bg-[#3A3A3C] text-gray-800 dark:text-gray-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-gray-200 dark:border-gray-700 transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  <span>Salin Gambar</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] hover:bg-gray-200 dark:hover:bg-[#3A3A3C] text-gray-800 dark:text-gray-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-gray-200 dark:border-gray-700 transition-all active:scale-95 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              <span>Bagikan Langsung</span>
            </button>
          </div>
        </div>

        {/* Helpful Tips Footer */}
        <div className="flex items-start gap-1.5 pt-1 text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
          <Info className="w-3.5 h-3.5 text-[#007AFF] flex-shrink-0 mt-0.5" />
          <p>
            <strong>PNG:</strong> Kualitas tanpa kompresi, terbaik untuk teks tajam. <strong>JPEG:</strong> Ukuran file ringan, pas untuk WhatsApp Status, IG Story & Feed.
          </p>
        </div>

      </div>
    </div>
  );
};
