import { FontOption, TextShadowPreset } from '../types';

export const FONT_OPTIONS: FontOption[] = [
  // 1. iOS & Modern Clean Fonts
  { 
    name: 'SF Pro Display (iOS)', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif', 
    category: 'iOS & Clean', 
    previewText: 'SF Pro Display',
    badge: 'Apple'
  },
  { 
    name: 'SF Pro Rounded (iOS)', 
    fontFamily: '"SF Pro Rounded", "SF Compact Rounded", -apple-system, BlinkMacSystemFont, sans-serif', 
    category: 'iOS & Clean', 
    previewText: 'SF Pro Rounded',
    badge: 'Apple'
  },
  { 
    name: 'Google Sans / Product', 
    fontFamily: '"Google Sans", "Product Sans", "Plus Jakarta Sans", sans-serif', 
    category: 'iOS & Clean', 
    previewText: 'Google Sans',
    badge: 'Google'
  },
  { 
    name: 'Plus Jakarta Sans', 
    fontFamily: "'Plus Jakarta Sans', sans-serif", 
    category: 'iOS & Clean', 
    previewText: 'Jakarta Sans' 
  },
  { 
    name: 'Inter Clean', 
    fontFamily: "'Inter', sans-serif", 
    category: 'iOS & Clean', 
    previewText: 'Inter Modern' 
  },
  { 
    name: 'Urbanist Geometric', 
    fontFamily: "'Urbanist', sans-serif", 
    category: 'iOS & Clean', 
    previewText: 'URBANIST' 
  },

  // 2. Display & Heavy Statement
  { 
    name: 'Bebas Neue Bold', 
    fontFamily: "'Bebas Neue', sans-serif", 
    category: 'Display & Heavy', 
    previewText: 'ALWAYS FORWARD',
    badge: 'Popular'
  },
  { 
    name: 'Anton Mega Impact', 
    fontFamily: "'Anton', sans-serif", 
    category: 'Display & Heavy', 
    previewText: 'NEVER STOP',
    badge: 'Bold'
  },
  { 
    name: 'Bricolage Heavy', 
    fontFamily: "'Bricolage Grotesque', sans-serif", 
    category: 'Display & Heavy', 
    previewText: 'STATEMENT' 
  },
  { 
    name: 'Syne Extra Bold', 
    fontFamily: "'Syne', sans-serif", 
    category: 'Display & Heavy', 
    previewText: 'CREATIVE SOUL' 
  },
  { 
    name: 'Outfit Heavy', 
    fontFamily: "'Outfit', sans-serif", 
    category: 'Display & Heavy', 
    previewText: 'DISTINCTIVE' 
  },
  { 
    name: 'Oswald Impact', 
    fontFamily: "'Oswald', sans-serif", 
    category: 'Display & Heavy', 
    previewText: 'STAY STRONG' 
  },
  { 
    name: 'Space Grotesk', 
    fontFamily: "'Space Grotesk', sans-serif", 
    category: 'Display & Heavy', 
    previewText: 'MODERN WAVE' 
  },
  { 
    name: 'Montserrat Black', 
    fontFamily: "'Montserrat', sans-serif", 
    category: 'Display & Heavy', 
    previewText: 'NEVER GIVE UP' 
  },
  { 
    name: 'Shrikhand Pop Art', 
    fontFamily: "'Shrikhand', cursive", 
    category: 'Display & Heavy', 
    previewText: 'POP VIBES' 
  },

  // 3. Graffiti & Street Art
  { 
    name: 'Rubik Wet Paint', 
    fontFamily: "'Rubik Wet Paint', cursive", 
    category: 'Graffiti & Street', 
    previewText: 'DRIP PAINT',
    badge: 'Street'
  },
  { 
    name: 'Sedgwick Graffiti', 
    fontFamily: "'Sedgwick Ave Display', cursive", 
    category: 'Graffiti & Street', 
    previewText: 'STREET ART',
    badge: 'Graffiti'
  },
  { 
    name: 'Rock Salt Marker', 
    fontFamily: "'Rock Salt', cursive", 
    category: 'Graffiti & Street', 
    previewText: 'SPRAY TAG' 
  },
  { 
    name: 'Permanent Marker', 
    fontFamily: "'Permanent Marker', cursive", 
    category: 'Graffiti & Street', 
    previewText: 'WILD STYLE' 
  },
  { 
    name: 'Black Ops Stencil', 
    fontFamily: "'Black Ops One', cursive", 
    category: 'Graffiti & Street', 
    previewText: 'MILITARY STENCIL' 
  },
  { 
    name: 'Bungee Shade 3D', 
    fontFamily: "'Bungee Shade', cursive", 
    category: 'Graffiti & Street', 
    previewText: 'GRAFFITI 3D' 
  },
  { 
    name: 'Bungee Inline', 
    fontFamily: "'Bungee Inline', cursive", 
    category: 'Graffiti & Street', 
    previewText: 'URBAN BEAT' 
  },

  // 4. Retro, Gaming & Cyber
  { 
    name: 'Righteous Synthwave', 
    fontFamily: "'Righteous', cursive", 
    category: 'Retro & Cyber', 
    previewText: 'SYNTHWAVE 84',
    badge: 'Retro'
  },
  { 
    name: 'Audiowide Cyber', 
    fontFamily: "'Audiowide', cursive", 
    category: 'Retro & Cyber', 
    previewText: 'CYBER TECH',
    badge: 'Cyber'
  },
  { 
    name: 'Press Start 2P (8-Bit)', 
    fontFamily: "'Press Start 2P', cursive", 
    category: 'Retro & Cyber', 
    previewText: 'LEVEL UP 99',
    badge: 'Pixel'
  },
  { 
    name: 'Faster One Speed', 
    fontFamily: "'Faster One', cursive", 
    category: 'Retro & Cyber', 
    previewText: 'FAST TRACK' 
  },
  { 
    name: 'Monoton Retro Disco', 
    fontFamily: "'Monoton', cursive", 
    category: 'Retro & Cyber', 
    previewText: 'DISCO 1982' 
  },

  // 5. Elegant Serif & Luxury Editorial
  { 
    name: 'Playfair Display', 
    fontFamily: "'Playfair Display', serif", 
    category: 'Serif & Luxury', 
    previewText: 'Inspirational Life',
    badge: 'Editorial'
  },
  { 
    name: 'Bodoni Moda Luxury', 
    fontFamily: "'Bodoni Moda', serif", 
    category: 'Serif & Luxury', 
    previewText: 'VOGUE EDITORIAL',
    badge: 'Luxury'
  },
  { 
    name: 'DM Serif Display', 
    fontFamily: "'DM Serif Display', serif", 
    category: 'Serif & Luxury', 
    previewText: 'Timeless Beauty' 
  },
  { 
    name: 'Cormorant Garamond', 
    fontFamily: "'Cormorant Garamond', serif", 
    category: 'Serif & Luxury', 
    previewText: 'Philosophy & Wisdom' 
  },
  { 
    name: 'Cinzel Royal Roman', 
    fontFamily: "'Cinzel', serif", 
    category: 'Serif & Luxury', 
    previewText: 'ROMAN HERITAGE' 
  },
  { 
    name: 'New York Serif (iOS)', 
    fontFamily: '"New York", Georgia, "Playfair Display", serif', 
    category: 'Serif & Luxury', 
    previewText: 'New York iOS' 
  },
  { 
    name: 'Abril Fatface', 
    fontFamily: "'Abril Fatface', serif", 
    category: 'Serif & Luxury', 
    previewText: 'Classic Headline' 
  },
  { 
    name: 'Lora Literary', 
    fontFamily: "'Lora', serif", 
    category: 'Serif & Luxury', 
    previewText: 'Literature & Poetry' 
  },
  { 
    name: 'Special Typewriter', 
    fontFamily: "'Special Elite', cursive", 
    category: 'Serif & Luxury', 
    previewText: 'typewriter notes...' 
  },

  // 6. Script, Calligraphy & Estetik
  { 
    name: 'Great Vibes Calligraphy', 
    fontFamily: "'Great Vibes', cursive", 
    category: 'Script & Estetik', 
    previewText: 'Elegance Forever',
    badge: 'Hand'
  },
  { 
    name: 'Sacramento Soft', 
    fontFamily: "'Sacramento', cursive", 
    category: 'Script & Estetik', 
    previewText: 'Aesthetic Whisper' 
  },
  { 
    name: 'Pacifico Beach', 
    fontFamily: "'Pacifico', cursive", 
    category: 'Script & Estetik', 
    previewText: 'Good Vibes Only' 
  },
  { 
    name: 'Caveat Notes', 
    fontFamily: "'Caveat', cursive", 
    category: 'Script & Estetik', 
    previewText: 'Catatan Hati' 
  },
  { 
    name: 'Kalam Casual Brush', 
    fontFamily: "'Kalam', cursive", 
    category: 'Script & Estetik', 
    previewText: 'Sketsa Pikiran' 
  },
  { 
    name: 'Satisfy Flow', 
    fontFamily: "'Satisfy', cursive", 
    category: 'Script & Estetik', 
    previewText: 'Pure Emotion' 
  },
  { 
    name: 'Dancing Script', 
    fontFamily: "'Dancing Script', cursive", 
    category: 'Script & Estetik', 
    previewText: 'Beautiful Soul' 
  },
];

export const SHADOW_PRESETS: TextShadowPreset[] = [
  { id: 'none', name: 'Tanpa Bayangan', css: 'none' },
  { id: 'soft', name: 'Soft Drop', css: '0px 4px 12px rgba(0, 0, 0, 0.45)' },
  { id: 'hard-dark', name: 'Hard Shadow', css: '4px 4px 0px rgba(0, 0, 0, 0.9)' },
  { id: 'glow-neon', name: 'Glow Neon Cyan', css: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff' },
  { id: 'glow-pink', name: 'Glow Pink Neon', css: '0 0 10px #ff007f, 0 0 20px #ff007f, 0 0 35px #ff007f' },
  { id: 'glow-lime', name: 'Glow Lime Acid', css: '0 0 10px #a3e635, 0 0 20px #84cc16, 0 0 35px #65a30d' },
  { id: 'graffiti-3d', name: '3D Graffiti Layer', css: '2px 2px 0 #000, 4px 4px 0 #000, 6px 6px 0 #000, 8px 8px 12px rgba(0,0,0,0.8)' },
  { id: 'yellow-3d', name: '3D Gold Retro', css: '2px 2px 0 #f59e0b, 4px 4px 0 #d97706, 6px 6px 0 #000' },
  { id: 'red-outline-glow', name: 'Flame Red Aura', css: '0 0 15px rgba(239, 68, 68, 0.9), 3px 3px 0px #000' },
  { id: 'glass-glow', name: 'Glass Ambient Glow', css: '0 8px 24px rgba(255, 255, 255, 0.35)' },
];

export const COLOR_SWATCHES = [
  '#FFFFFF', '#000000', '#F87171', '#FBBF24', '#34D399', 
  '#60A5FA', '#A78BFA', '#F472B6', '#F59E0B', '#10B981', 
  '#3B82F6', '#8B5CF6', '#EC4899', '#00F0FF', '#FF007F', '#CCFF00',
  '#E2E8F0', '#94A3B8', '#FDE047', '#FB923C'
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
  { name: 'Titanium Shine', css: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 50%, #e5e7eb 100%)' },
  { name: 'Emerald Mirage', css: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)' },
  { name: 'Cosmic Violet', css: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)' },
];

