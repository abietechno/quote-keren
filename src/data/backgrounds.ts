export interface BackgroundOption {
  id: string;
  name: string;
  type: 'solid' | 'gradient' | 'texture' | 'unsplash';
  value: string;
  category: 'Gradients' | 'Urban Walls' | 'Aesthetic Photos' | 'Colors' | 'Minimalist';
  overlayColor?: string;
  overlayOpacity?: number;
}

export const BACKGROUND_PRESETS: BackgroundOption[] = [
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

  // Gradients
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
    id: 'grad-ios-dark',
    name: 'iOS Obsidian',
    type: 'gradient',
    value: 'linear-gradient(180deg, #1c1c1e 0%, #000000 100%)',
    category: 'Gradients',
  },

  // Unsplash High-Res Photos
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
    name: 'Aesthetic Fog',
    type: 'unsplash',
    value: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    category: 'Aesthetic Photos',
    overlayColor: '#000000',
    overlayOpacity: 0.25,
  },
  {
    id: 'unsplash-dark-street',
    name: 'Night Street',
    type: 'unsplash',
    value: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop',
    category: 'Aesthetic Photos',
    overlayColor: '#000000',
    overlayOpacity: 0.3,
  },

  // Solid Colors
  { id: 'solid-black', name: 'Hitam Pekat', type: 'solid', value: '#0a0a0c', category: 'Colors' },
  { id: 'solid-white', name: 'Putih Bersih', type: 'solid', value: '#ffffff', category: 'Colors' },
  { id: 'solid-slate', name: 'Slate iOS', type: 'solid', value: '#1e293b', category: 'Colors' },
  { id: 'solid-cream', name: 'Kertas Warm Cream', type: 'solid', value: '#fef3c7', category: 'Colors' },
  { id: 'solid-crimson', name: 'Merah Crimson', type: 'solid', value: '#881337', category: 'Colors' },
];
