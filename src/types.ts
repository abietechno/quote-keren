export type AspectRatio = '1:1' | '9:16' | '4:5' | '16:9' | '3:4';

export interface TextShadowPreset {
  id: string;
  name: string;
  css: string;
}

export interface TextLayer {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number; // in px
  color: string; // hex or rgba
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  rotation: number; // degrees -180 to 180
  letterSpacing: number; // in px
  lineHeight: number; // ratio e.g. 1.2
  opacity: number; // 0 to 1
  textAlign: 'left' | 'center' | 'right';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  shadowPreset: string; // 'none' | 'soft' | 'glow-neon' | 'graffiti-3d' | 'drop-dark' | 'hard-outline'
  strokeColor: string;
  strokeWidth: number;
  gradientFill?: string; // e.g. 'linear-gradient(45deg, #f3ec78, #af4261)'
  bold?: boolean;
  italic?: boolean;
}

export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'texture' | 'image' | 'unsplash';
  value: string;
  overlayOpacity: number; // 0 to 1
  overlayColor: string;
  blur: number; // 0 to 20
}

export interface StickerLayer {
  id: string;
  type: 'emoji' | 'graffiti' | 'badge' | 'splatter';
  content: string; // emoji character or svg/image representation
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface FilterPreset {
  id: string;
  name: string;
  className: string;
  description: string;
}

export interface TemplatePreset {
  id: string;
  title: string;
  category: 'Graffiti' | 'Quotes' | 'Minimalist' | 'Aesthetic' | 'Neon' | 'Street';
  thumbnailUrl?: string;
  background: BackgroundConfig;
  filter: string;
  texts: Omit<TextLayer, 'id'>[];
  stickers?: Omit<StickerLayer, 'id'>[];
}

export interface FontOption {
  name: string;
  fontFamily: string;
  category: 'Graffiti' | 'Quotes' | 'Display' | 'Serif' | 'Script' | 'Handwriting';
  previewText?: string;
}
