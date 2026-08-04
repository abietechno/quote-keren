import { FilterPreset } from '../types';

export const FILTER_PRESETS: FilterPreset[] = [
  {
    id: 'none',
    name: 'Normal',
    className: '',
    description: 'Warna asli tanpa filter',
  },
  {
    id: 'vintage',
    name: 'Vintage Film',
    className: 'filter-vintage',
    description: 'Tone hangat analog film klasik',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    className: 'filter-cyberpunk',
    description: 'Warna neon futuristik biru & magenta',
  },
  {
    id: 'bw',
    name: 'B&W Contrast',
    className: 'filter-bw',
    description: 'Hitam putih tajam bernuansa street art',
  },
  {
    id: 'golden',
    name: 'Golden Hour',
    className: 'filter-golden',
    description: 'Sinar mentari senja yang hangat',
  },
  {
    id: 'neon',
    name: 'Vibrant Neon',
    className: 'filter-neon',
    description: 'Saturasi tinggi dan warna menyala',
  },
  {
    id: 'dramatic',
    name: 'Dramatic Dark',
    className: 'filter-dramatic',
    description: 'Kontras tinggi mood gelap misterius',
  },
  {
    id: 'soft',
    name: 'Soft Aesthetic',
    className: 'filter-soft',
    description: 'Nuansa lembut dan tenang',
  },
  {
    id: 'retro',
    name: 'Retro Sepia',
    className: 'filter-retro',
    description: 'Gaya foto jadul 80an',
  },
];
