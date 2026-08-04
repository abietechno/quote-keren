export interface StickerOption {
  id: string;
  name: string;
  category: 'Spray & Tag' | 'Emoji & Vibe' | 'Badges & Crown';
  content: string; // SVG path or Emoji character or text
  type: 'emoji' | 'graffiti' | 'badge' | 'splatter';
}

export const STICKER_PRESETS: StickerOption[] = [
  // Emojis & Vibes
  { id: 'st-fire', name: 'Api Membara', category: 'Emoji & Vibe', content: '🔥', type: 'emoji' },
  { id: 'st-crown', name: 'Mahkota King', category: 'Badges & Crown', content: '👑', type: 'emoji' },
  { id: 'st-skull', name: 'Tengkorak Street', category: 'Emoji & Vibe', content: '💀', type: 'emoji' },
  { id: 'st-sparkles', name: 'Sparkles Glow', category: 'Emoji & Vibe', content: '✨', type: 'emoji' },
  { id: 'st-spray-can', name: 'Cat Spray', category: 'Spray & Tag', content: '🎨', type: 'emoji' },
  { id: 'st-alien', name: 'Alien Cyber', category: 'Emoji & Vibe', content: '👾', type: 'emoji' },
  { id: 'st-lightning', name: 'Petir Volt', category: 'Emoji & Vibe', content: '⚡', type: 'emoji' },
  { id: 'st-100', name: 'Skor 100', category: 'Badges & Crown', content: '💯', type: 'emoji' },
  { id: 'st-broken-heart', name: 'Patah Hati', category: 'Emoji & Vibe', content: '💔', type: 'emoji' },
  { id: 'st-warning', name: 'Awas Bahaya', category: 'Badges & Crown', content: '⚠️', type: 'emoji' },

  // Text Stamps & Badges
  { id: 'st-original', name: 'Badge Original', category: 'Badges & Crown', content: '🏷️ ORIGINAL', type: 'badge' },
  { id: 'st-top-secret', name: 'Top Secret Tag', category: 'Badges & Crown', content: '⛔ NO LIMIT', type: 'badge' },
  { id: 'st-urban-tag', name: 'Street Tag', category: 'Spray & Tag', content: '💥 GRAFFITI', type: 'badge' },
  { id: 'st-verified', name: 'Verified Badge', category: 'Badges & Crown', content: '☑️ VERIFIED', type: 'badge' },
  { id: 'st-raw', name: 'Raw Energy', category: 'Spray & Tag', content: '⚡ RAW ART', type: 'badge' },
];
