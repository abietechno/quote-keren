import React, { useState, useEffect } from 'react';
import { TextLayer } from '../types';
import { X, Check, Sparkles, MessageSquare } from 'lucide-react';

interface TextEditModalProps {
  isOpen: boolean;
  textLayer: TextLayer | null;
  onClose: () => void;
  onSave: (id: string, text: string) => void;
}

const QUOTE_SUGGESTIONS = [
  'TETAP TENANG, SEMUA ADA PROSESNYA',
  'NO LIMITS, JUST DREAMS',
  'Dream Big. Work Hard. Stay Humble.',
  'Street Art is Freedom',
  'Hidup adalah petualangan, nikmati jalannya.',
  'CREATION OVER CHAOS',
  'Jangan berhenti sampai kamu bangga.',
  'STAY HUNGRY. STAY FOOLISH.',
  'Fokus pada tujuan, abaikan keraguan.',
  'WILD & FREE',
];

export const TextEditModal: React.FC<TextEditModalProps> = ({
  isOpen,
  textLayer,
  onClose,
  onSave,
}) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (textLayer) {
      setInputText(textLayer.text);
    }
  }, [textLayer]);

  if (!isOpen || !textLayer) return null;

  const handleSave = () => {
    onSave(textLayer.id, inputText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      {/* iOS Cupertino Modal Card */}
      <div className="w-full max-w-lg bg-white dark:bg-[#1C1C1E] border-t sm:border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 space-y-4 text-[#1C1C1E] dark:text-white">
        
        {/* iOS Pull Indicator Pill */}
        <div className="w-9 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto -mt-1 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#007AFF]" />
            <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">Edit Kata-Kata Quotes / Tag</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Text Area */}
        <div>
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tulis kata-kata motivasi, quotes, atau nama tag graffiti kamu..."
            className="w-full bg-gray-50 dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] outline-none resize-none transition-all"
            autoFocus
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Saran Kata-kata Cepat:
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto no-scrollbar">
            {QUOTE_SUGGESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(q)}
                className="px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] hover:bg-gray-200 dark:hover:bg-[#3A3A3C] text-gray-700 dark:text-gray-300 text-xs font-medium border border-gray-200 dark:border-gray-700 transition-all active:scale-95 text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200 text-xs font-semibold transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>

      </div>
    </div>
  );
};
