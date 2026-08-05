import React, { useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Download, Copy, Share2, Check, X, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  canvasRef,
  onClose,
}) => {
  const [exporting, setExporting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen && canvasRef.current) {
      setExporting(true);
      // Capture preview
      toPng(canvasRef.current, { cacheBust: true, pixelRatio: 2 })
        .then((dataUrl) => {
          setPreviewUrl(dataUrl);
          setExporting(false);
        })
        .catch((err) => {
          console.error('Failed to generate canvas preview image', err);
          setExporting(false);
        });
    }
  }, [isOpen, canvasRef]);

  if (!isOpen) return null;

  // Trigger high-res export download
  const handleDownloadPNG = async () => {
    if (!canvasRef.current) return;
    try {
      setExporting(true);
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 3, // High quality 3x resolution
      });

      const link = document.createElement('a');
      link.download = `Quotes-OftheDay-by-abie-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      setDownloaded(true);
      setExporting(false);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });

      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error('Export download failed:', err);
      setExporting(false);
    }
  };

  // Copy Image to Clipboard if browser supports ClipboardItem
  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await toPng(canvasRef.current, { pixelRatio: 2 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        alert('Browser tidak mendukung salin gambar langsung. Gunakan tombol Unduh PNG.');
      }
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
    }
  };

  // Share API
  const handleShare = async () => {
    if (!canvasRef.current || !navigator.share) {
      alert('Fitur berbagi tidak didukung di browser ini. Silakan unduh gambar.');
      return;
    }
    try {
      const dataUrl = await toPng(canvasRef.current, { pixelRatio: 2 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'quotecraft-art.png', { type: 'image/png' });

      await navigator.share({
        title: 'QuoteCraft Art',
        text: 'Lihat karya desain quotes & graffiti buatan saya!',
        files: [file],
      });
    } catch (err) {
      console.log('Share canceled or failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-2xl overflow-hidden p-5 space-y-4 text-[#1C1C1E] dark:text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#007AFF]" />
            <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">Hasil Ekspor Gambar</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Container */}
        <div className="relative w-full min-h-[220px] max-h-[320px] bg-gray-100 dark:bg-[#2C2C2E] rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700 p-2">
          {exporting && !previewUrl ? (
            <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="w-6 h-6 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold">Memproses Gambar High-Res...</span>
            </div>
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt="Hasil Desain Preview"
              className="max-h-[300px] w-auto object-contain rounded-xl shadow-md"
            />
          ) : (
            <div className="text-gray-400 text-xs flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" />
              <span>Gagal memuat pratinjau</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleDownloadPNG}
            disabled={exporting}
            className="w-full py-3 rounded-2xl bg-[#007AFF] hover:bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-98 transition-all disabled:opacity-50"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Berhasil Disimpan ke Galeri!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Simpan Gambar ke Galeri (PNG High Quality)</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyClipboard}
              className="py-2.5 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] hover:bg-gray-200 dark:hover:bg-[#3A3A3C] text-gray-800 dark:text-gray-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-gray-200 dark:border-gray-700 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Tersalin!</span>
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
              className="py-2.5 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] hover:bg-gray-200 dark:hover:bg-[#3A3A3C] text-gray-800 dark:text-gray-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-gray-200 dark:border-gray-700 transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              <span>Bagikan</span>
            </button>
          </div>
        </div>

        {/* Tips Footer */}
        <p className="text-[11px] text-gray-400 text-center leading-tight">
          💡 Tips: Gambar diunduh dalam format jernih siap diposting ke Instagram Story, Feed, TikTok, atau WhatsApp Status.
        </p>

      </div>
    </div>
  );
};
