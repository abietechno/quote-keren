import { FontOption, TextShadowPreset } from '../types';

export const FONT_OPTIONS: FontOption[] = [
  // iOS & Modern Clean Fonts
  { name: 'SF Pro Display (iOS)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif', category: 'Quotes', previewText: 'SF Pro Display' },
  { name: 'SF Pro Rounded (iOS)', fontFamily: '"SF Pro Rounded", "SF Compact Rounded", -apple-system, BlinkMacSystemFont, sans-serif', category: 'Quotes', previewText: 'SF Pro Rounded' },
  { name: 'Google Sans / Product', fontFamily: '"Google Sans", "Product Sans", "Plus Jakarta Sans", sans-serif', category: 'Quotes', previewText: 'Google Sans' },
  { name: 'New York Serif (iOS)', fontFamily: '"New York", Georgia, "Playfair Display", serif', category: 'Quotes', previewText: 'New York Serif' },
  { name: 'Plus Jakarta Sans', fontFamily: "'Plus Jakarta Sans', sans-serif", category: 'Quotes', previewText: 'Jakarta Sans' },
  { name: 'Inter Clean', fontFamily: "'Inter', sans-serif", category: 'Quotes', previewText: 'Inter Modern' },
  { name: 'Urbanist Geometric', fontFamily: "'Urbanist', sans-serif", category: 'Quotes', previewText: 'URBANIST' },

  // Display & Heavy Statement
  { name: 'Bebas Neue Bold', fontFamily: "'Bebas Neue', sans-serif", category: 'Display', previewText: 'ALWAYS FORWARD' },
  { name: 'Bricolage Heavy', fontFamily: "'Bricolage Grotesque', sans-serif", category: 'Display', previewText: 'STATEMENT' },
  { name: 'Syne Extra Bold', fontFamily: "'Syne', sans-serif", category: 'Display', previewText: 'CREATIVE' },
  { name: 'Outfit Heavy', fontFamily: "'Outfit', sans-serif", category: 'Display', previewText: 'DISTINCTIVE' },
  { name: 'Oswald Impact', fontFamily: "'Oswald', sans-serif", category: 'Display', previewText: 'STAY STRONG' },
  { name: 'Space Grotesk', fontFamily: "'Space Grotesk', sans-serif", category: 'Display', previewText: 'MODERN WAVE' },
  { name: 'Montserrat Black', fontFamily: "'Montserrat', sans-serif", category: 'Display', previewText: 'NEVER GIVE UP' },
  { name: 'Shrikhand Pop Art', fontFamily: "'Shrikhand', cursive", category: 'Display', previewText: 'POP VIBES' },

  // Graffiti & Street Art
  { name: 'Sedgwick Graffiti', fontFamily: "'Sedgwick Ave Display', cursive", category: 'Graffiti', previewText: 'STREET ART' },
  { name: 'Bungee Shade', fontFamily: "'Bungee Shade', cursive", category: 'Graffiti', previewText: 'GRAFFITI' },
  { name: 'Bungee Inline', fontFamily: "'Bungee Inline', cursive", category: 'Graffiti', previewText: 'URBAN BEAT' },
  { name: 'Black Ops Stencil', fontFamily: "'Black Ops One', cursive", category: 'Graffiti', previewText: 'STENCIL' },
  { name: 'Rock Salt Marker', fontFamily: "'Rock Salt', cursive", category: 'Graffiti', previewText: 'SPRAY TAG' },
  { name: 'Permanent Marker', fontFamily: "'Permanent Marker', cursive", category: 'Graffiti', previewText: 'WILD STYLE' },

  // Elegant Serif & Classic Quotes
  { name: 'Playfair Display', fontFamily: "'Playfair Display', serif", category: 'Quotes', previewText: 'Inspirational' },
  { name: 'Lora Editorial', fontFamily: "'Lora', serif", category: 'Serif', previewText: 'Editorial Vibe' },
  { name: 'Cormorant Garamond', fontFamily: "'Cormorant Garamond', serif", category: 'Serif', previewText: 'Luxury Quote' },
  { name: 'Cinzel Royal', fontFamily: "'Cinzel', serif", category: 'Serif', previewText: 'ELEGANCE' },
  { name: 'Abril Fatface', fontFamily: "'Abril Fatface', serif", category: 'Serif', previewText: 'Classic Quote' },
  { name: 'Special Typewriter', fontFamily: "'Special Elite', cursive", category: 'Serif', previewText: 'Typewriter quote...' },

  // Script & Calligraphy
  { name: 'Pacifico Script', fontFamily: "'Pacifico', cursive", category: 'Script', previewText: 'Aesthetic Vibe' },
  { name: 'Sacramento Elegance', fontFamily: "'Sacramento', cursive", category: 'Script', previewText: 'Soft Calligraphy' },
  { name: 'Caveat Handwritten', fontFamily: "'Caveat', cursive", category: 'Handwriting', previewText: 'Catatan Harian' },
  { name: 'Satisfy Flow', fontFamily: "'Satisfy', cursive", category: 'Script', previewText: 'Pure Emotion' },
  { name: 'Dancing Script', fontFamily: "'Dancing Script', cursive", category: 'Script', previewText: 'Beautiful Words' },
  { name: 'Monoton Retro', fontFamily: "'Monoton', cursive", category: 'Display', previewText: 'RETRO 80S' },
];

export const SHADOW_PRESETS: TextShadowPreset[] = [
  { id: 'none', name: 'Tanpa Bayangan', css: 'none' },
  { id: 'soft', name: 'Soft Drop', css: '0px 4px 12px rgba(0, 0, 0, 0.45)' },
  { id: 'hard-dark', name: 'Hard Shadow', css: '4px 4px 0px rgba(0, 0, 0, 0.9)' },
  { id: 'glow-neon', name: 'Glow Neon', css: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff' },
  { id: 'glow-pink', name: 'Glow Pink', css: '0 0 10px #ff007f, 0 0 20px #ff007f, 0 0 35px #ff007f' },
  { id: 'graffiti-3d', name: '3D Graffiti', css: '2px 2px 0 #000, 4px 4px 0 #000, 6px 6px 0 #000, 8px 8px 12px rgba(0,0,0,0.8)' },
  { id: 'yellow-3d', name: '3D Yellow', css: '2px 2px 0 #f59e0b, 4px 4px 0 #d97706, 6px 6px 0 #000' },
  { id: 'red-outline-glow', name: 'Flame Red', css: '0 0 15px rgba(239, 68, 68, 0.9), 3px 3px 0px #000' },
];

export const COLOR_SWATCHES = [
  '#FFFFFF', '#000000', '#F87171', '#FBBF24', '#34D399', 
  '#60A5FA', '#A78BFA', '#F472B6', '#F59E0B', '#10B981', 
  '#3B82F6', '#8B5CF6', '#EC4899', '#00F0FF', '#FF007F', '#CCFF00'
];

export const GRADIENT_PRESETS = [
  { name: 'Sunset Glow', css: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)' },
  { name: 'Neon Cyber', css: 'linear-gradient(135deg, #00F0FF 0%, #FF007F 100%)' },
  { name: 'Gold Luxury', css: 'linear-gradient(135deg, #FFE000 0%, #799F0C 100%)' },
  { name: 'Acid Graffiti', css: 'linear-gradient(135deg, #CCFF00 0%, #00FF66 100%)' },
  { name: 'Royal Purple', css: 'linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)' },
  { name: 'Ocean Breeze', css: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)' },
  { name: 'Fire Flame', css: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
  { name: 'Cotton Candy', css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
];
