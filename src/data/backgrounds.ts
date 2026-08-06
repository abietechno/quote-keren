export interface BackgroundOption {
  id: string;
  name: string;
  type: 'solid' | 'gradient' | 'texture' | 'unsplash';
  value: string;
  category: 'Gradients' | 'Urban Walls' | 'Aesthetic Photos' | 'iOS & Glass' | 'Minimalist' | 'Colors';
  overlayColor?: string;
  overlayOpacity?: number;
}

export const BACKGROUND_PRESETS: BackgroundOption[] = [
  // iOS 18 & Glass Aesthetics
  {
    id: 'ios-mesh-aura',
    name: 'iOS 18 Mesh Aura',
    type: 'gradient',
    value: 'radial-gradient(at 10% 10%, #4f46e5 0px, transparent 50%), radial-gradient(at 90% 10%, #ec4899 0px, transparent 50%), radial-gradient(at 50% 90%, #06b6d4 0px, transparent 50%), radial-gradient(at 0% 100%, #1e1b4b 0px, transparent 50%), #0f172a',
    category: 'iOS & Glass',
  },
  {
    id: 'ios-sunset-glow',
    name: 'iOS Sunset Wave',
    type: 'gradient',
    value: 'radial-gradient(at 0% 0%, #f43f5e 0px, transparent 50%), radial-gradient(at 100% 0%, #fb923c 0px, transparent 50%), radial-gradient(at 50% 100%, #8b5cf6 0px, transparent 50%), #000000',
    category: 'iOS & Glass',
  },
  {
    id: 'ios-emerald-glow',
    name: 'iOS Emerald Dark',
    type: 'gradient',
    value: 'radial-gradient(at 20% 20%, #059669 0px, transparent 50%), radial-gradient(at 80% 80%, #0284c7 0px, transparent 50%), #022c22',
    category: 'iOS & Glass',
  },
  {
    id: 'ios-midnight-glass',
    name: 'iOS Dark Obsidian',
    type: 'gradient',
    value: 'linear-gradient(180deg, #18181b 0%, #09090b 50%, #000000 100%)',
    category: 'iOS & Glass',
  },

  // Urban Wall & Graffiti Textures
  {
    id: 'brick-dark',
    name: 'Tembok Bata Gelap',
    type: 'texture',
    value: 'radial-gradient(circle, #2a2a2a 0%, #111111 100%)',
    category: 'Urban Walls',
    overlayColor: '#000000',
    overlayOpacity: 0.2,
  },
  {
    id: 'concrete-street',
    name: 'Semen Jalanan',
    type: 'texture',
    value: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)',
    category: 'Urban Walls',
    overlayColor: '#000000',
    overlayOpacity: 0.1,
  },
  {
    id: 'asphalt-graffiti',
    name: 'Aspal Malam',
    type: 'texture',
    value: 'radial-gradient(ellipse at center, #1e1e24 0%, #0b0b0e 100%)',
    category: 'Urban Walls',
  },
  {
    id: 'neon-cyber-wall',
    name: 'Neon Grid Night',
    type: 'texture',
    value: 'linear-gradient(135deg, #09090e 0%, #161224 50%, #080312 100%)',
    category: 'Urban Walls',
  },
  {
    id: 'dark-grunge-mural',
    name: 'Street Grunge',
    type: 'texture',
    value: 'radial-gradient(circle at 50% 50%, #3f3f46 0%, #18181b 70%, #09090b 100%)',
    category: 'Urban Walls',
  },

  // Rich Gradients
  {
    id: 'grad-sunset',
    name: 'Sunset Orange',
    type: 'gradient',
    value: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
    category: 'Gradients',
  },
  {
    id: 'grad-midnight',
    name: 'Midnight Blue',
    type: 'gradient',
    value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    category: 'Gradients',
  },
  {
    id: 'grad-aurora',
    name: 'Aurora Neon',
    type: 'gradient',
    value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    category: 'Gradients',
  },
  {
    id: 'grad-purple-haze',
    name: 'Purple Haze',
    type: 'gradient',
    value: 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)',
    category: 'Gradients',
  },
  {
    id: 'grad-gold',
    name: 'Golden Hour',
    type: 'gradient',
    value: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
    category: 'Gradients',
  },
  {
    id: 'grad-cyber-dusk',
    name: 'Cyberpunk Dusk',
    type: 'gradient',
    value: 'linear-gradient(135deg, #2b1055 0%, #7597de 100%)',
    category: 'Gradients',
  },
  {
    id: 'grad-acid-lime',
    name: 'Acid Lime',
    type: 'gradient',
    value: 'linear-gradient(135deg, #10b981 0%, #84cc16 100%)',
    category: 'Gradients',
  },

  // Minimalist & Textures
  {
    id: 'minimal-paper-warm',
    name: 'Kertas Vintage Warm',
    type: 'texture',
    value: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    category: 'Minimalist',
  },
  {
    id: 'minimal-marble-dark',
    name: 'Dark Marble Noir',
    type: 'texture',
    value: 'radial-gradient(circle at top left, #27272a 0%, #09090b 100%)',
    category: 'Minimalist',
  },
  {
    id: 'minimal-sand-beige',
    name: 'Aesthetic Beige',
    type: 'texture',
    value: 'linear-gradient(135deg, #e7e5e4 0%, #d6d3d1 100%)',
    category: 'Minimalist',
  },

  // Unsplash High-Res Aesthetic Photos
  {
    id: 'unsplash-graffiti-1',
    name: 'Wall Spray Art',
    type: 'unsplash',
    value: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1000&auto=format&fit=crop',
    category: 'Aesthetic Photos',
    overlayColor: '#000000',
    overlayOpacity: 0.35,
  },
  {
    id: 'unsplash-city-neon',
    name: 'City Neon Rain',
    type: 'unsplash',
    value: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000&auto=format&fit=crop',
    category: 'Aesthetic Photos',
    overlayColor: '#000000',
    overlayOpacity: 0.4,
  },
  {
    id: 'unsplash-foggy-nature',
    name: 'Aesthetic Fog Forest',
    type: 'unsplash',
    value: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    category: 'Aesthetic Photos',
    overlayColor: '#000000',
    overlayOpacity: 0.25,
  },
  {
    id: 'unsplash-dark-street',
    name: 'Night Street Lights',
    type: 'unsplash',
    value: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop',
    category: 'Aesthetic Photos',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
  },
  {
    id: 'unsplash-starry-night',
    name: 'Cosmic Sky Stars',
    type: 'unsplash',
    value: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop',
    category: 'Aesthetic Photos',
    overlayColor: '#000000',
    overlayOpacity: 0.2,
  },
  {
    id: 'unsplash-minimal-arch',
    name: 'Aesthetic Arch',
    type: 'unsplash',
    value: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
    category: 'Aesthetic Photos',
    overlayColor: '#000000',
    overlayOpacity: 0.2,
  },

  // Solid Colors
  { id: 'solid-black', name: 'Hitam Pekat', type: 'solid', value: '#0a0a0c', category: 'Colors' },
  { id: 'solid-white', name: 'Putih Bersih', type: 'solid', value: '#ffffff', category: 'Colors' },
  { id: 'solid-slate', name: 'Slate iOS', type: 'solid', value: '#1e293b', category: 'Colors' },
  { id: 'solid-cream', name: 'Warm Cream', type: 'solid', value: '#fef3c7', category: 'Colors' },
  { id: 'solid-emerald', name: 'Deep Emerald', type: 'solid', value: '#064e3b', category: 'Colors' },
  { id: 'solid-crimson', name: 'Merah Crimson', type: 'solid', value: '#881337', category: 'Colors' },
  { id: 'solid-indigo', name: 'Royal Indigo', type: 'solid', value: '#1e1b4b', category: 'Colors' },
];
