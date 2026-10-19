import { toPng, toJpeg } from 'html-to-image';
import { TextLayer, BackgroundConfig, StickerLayer, AspectRatio } from '../types';

export interface ExportOptions {
  format: 'png' | 'jpeg';
  quality?: number; // 0.1 to 1.0, default 0.95
  pixelRatio?: number; // default 2
  texts?: TextLayer[];
  background?: BackgroundConfig;
  stickers?: StickerLayer[];
  aspectRatio?: AspectRatio;
}

// Compute standard high-definition dimensions based on aspect ratio
export function getStandardDimensions(aspectRatio: AspectRatio = '1:1') {
  switch (aspectRatio) {
    case '9:16':
      return { width: 1080, height: 1920, label: '1080 × 1920 (Story/TikTok)' };
    case '4:5':
      return { width: 1080, height: 1350, label: '1080 × 1350 (IG Portrait)' };
    case '3:4':
      return { width: 1080, height: 1440, label: '1080 × 1440 (Portrait)' };
    case '16:9':
      return { width: 1920, height: 1080, label: '1920 × 1080 (Landscape)' };
    case '1:1':
    default:
      return { width: 1080, height: 1080, label: '1080 × 1080 (Square Feed)' };
  }
}

// Download a data URL or Blob reliably across desktop and mobile devices
export function downloadDataUrl(dataUrl: string, filename: string): boolean {
  try {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
    return true;
  } catch (err) {
    console.warn('Blob download fallback to direct anchor click:', err);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
}

// Extract primary font name from a fontFamily string (e.g., "'Plus Jakarta Sans', sans-serif" -> "Plus Jakarta Sans")
function extractFontFamily(fontFamilyStr: string): string {
  const match = fontFamilyStr.split(',')[0].trim().replace(/['"]/g, '');
  return match;
}

// Fetch scoped CSS for only active Google fonts (avoiding 200+ fonts flood)
async function getScopedFontEmbedCSS(texts?: TextLayer[]): Promise<string | undefined> {
  if (!texts || texts.length === 0) return undefined;

  const fontFamilies = Array.from(
    new Set(texts.map((t) => extractFontFamily(t.fontFamily)))
  );

  // System fonts don't need Google Fonts embed
  const webFonts = fontFamilies.filter(
    (name) =>
      !name.includes('SF Pro') &&
      !name.includes('apple-system') &&
      !name.includes('system-ui') &&
      !name.includes('New York') &&
      !name.includes('BlinkMacSystemFont')
  );

  if (webFonts.length === 0) return undefined;

  try {
    const params = webFonts
      .map((name) => `family=${encodeURIComponent(name).replace(/%20/g, '+')}:wght@400;700`)
      .join('&');
    const url = `https://fonts.googleapis.com/css2?${params}&display=swap`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.text();
    }
  } catch (e) {
    console.warn('Could not load scoped Google Fonts for export, continuing with skipFonts', e);
  }
  return undefined;
}

// Fallback HTML5 Canvas 2D Renderer if DOM-to-image fails
export async function renderFallbackCanvas2D(
  texts: TextLayer[] = [],
  background?: BackgroundConfig,
  stickers: StickerLayer[] = [],
  aspectRatio: AspectRatio = '1:1',
  format: 'png' | 'jpeg' = 'png',
  quality: number = 0.95
): Promise<string> {
  const dims = getStandardDimensions(aspectRatio);
  const canvas = document.createElement('canvas');
  canvas.width = dims.width;
  canvas.height = dims.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  // 1. Draw Background
  if (!background || background.type === 'solid') {
    ctx.fillStyle = background?.value || '#0f172a';
    ctx.fillRect(0, 0, dims.width, dims.height);
  } else if (background.type === 'gradient' || background.type === 'texture') {
    // Basic gradient fallback
    const grad = ctx.createLinearGradient(0, 0, dims.width, dims.height);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(1, '#09090b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, dims.width, dims.height);
  } else if (background.type === 'unsplash' || background.type === 'image') {
    ctx.fillStyle = '#1c1c1e';
    ctx.fillRect(0, 0, dims.width, dims.height);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // don't fail, keep fallback bg
        img.src = background.value;
      });
      // Draw cover
      const hRatio = dims.width / img.width;
      const vRatio = dims.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (dims.width - img.width * ratio) / 2;
      const centerShiftY = (dims.height - img.height * ratio) / 2;
      ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    } catch {
      // ignore image load error
    }
  }

  // Overlay dimmer
  if (background?.overlayOpacity && background.overlayOpacity > 0) {
    ctx.fillStyle = background.overlayColor || '#000000';
    ctx.globalAlpha = background.overlayOpacity;
    ctx.fillRect(0, 0, dims.width, dims.height);
    ctx.globalAlpha = 1.0;
  }

  // 2. Draw Stickers
  for (const st of stickers) {
    ctx.save();
    const stX = (st.x / 100) * dims.width;
    const stY = (st.y / 100) * dims.height;
    ctx.translate(stX, stY);
    ctx.rotate((st.rotation * Math.PI) / 180);
    const size = Math.round(50 * st.scale);
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(st.content, 0, 0);
    ctx.restore();
  }

  // 3. Draw Texts
  for (const t of texts) {
    ctx.save();
    const posX = (t.x / 100) * dims.width;
    const posY = (t.y / 100) * dims.height;
    ctx.translate(posX, posY);
    ctx.rotate((t.rotation * Math.PI) / 180);
    ctx.globalAlpha = t.opacity ?? 1;

    // Scale font size proportionally to 1080px base
    const scaledFontSize = Math.round(t.fontSize * (dims.width / 420));
    const fontStyle = t.italic ? 'italic' : 'normal';
    const fontWeight = t.bold ? 'bold' : 'normal';
    const cleanFontFamily = extractFontFamily(t.fontFamily);
    ctx.font = `${fontStyle} ${fontWeight} ${scaledFontSize}px "${cleanFontFamily}", sans-serif`;
    ctx.textAlign = (t.textAlign as CanvasTextAlign) || 'center';
    ctx.textBaseline = 'middle';

    // Shadows
    if (t.shadowPreset === 'soft') {
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 4;
    } else if (t.shadowPreset === 'glow') {
      ctx.shadowColor = 'rgba(255,255,255,0.8)';
      ctx.shadowBlur = 15;
    } else if (t.shadowPreset === 'retro-3d') {
      ctx.shadowColor = '#000000';
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
      ctx.shadowBlur = 0;
    }

    // Text formatting
    let content = t.text || '';
    if (t.textTransform === 'uppercase') content = content.toUpperCase();
    if (t.textTransform === 'lowercase') content = content.toLowerCase();

    const lines = content.split('\n');
    const lineHeightPx = scaledFontSize * (t.lineHeight || 1.2);
    const totalHeight = (lines.length - 1) * lineHeightPx;
    const startY = -totalHeight / 2;

    lines.forEach((line, idx) => {
      const lineY = startY + idx * lineHeightPx;
      if (t.strokeWidth > 0) {
        ctx.strokeStyle = t.strokeColor || '#000000';
        ctx.lineWidth = t.strokeWidth * (dims.width / 420);
        ctx.strokeText(line, 0, lineY);
      }
      ctx.fillStyle = t.color || '#ffffff';
      ctx.fillText(line, 0, lineY);
    });

    ctx.restore();
  }

  // Watermark
  ctx.save();
  ctx.font = '600 16px monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.textAlign = 'right';
  ctx.fillText('QUOTES-OFTHEDAY- BY ABIE', dims.width - 24, dims.height - 24);
  ctx.restore();

  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(mime, quality);
}

// Master Export Function: Tries DOM to image first, seamlessly falls back to Canvas 2D
export async function exportCanvasImage(
  canvasNode: HTMLElement,
  options: ExportOptions
): Promise<string> {
  const {
    format,
    quality = 0.95,
    pixelRatio = 2,
    texts = [],
    background,
    stickers = [],
    aspectRatio = '1:1',
  } = options;

  // Filter function to remove helper lines and active UI handles
  const filter = (node: HTMLElement) => {
    if (!node) return true;
    if (node instanceof HTMLElement) {
      if (
        node.dataset?.exportIgnore === 'true' ||
        node.classList?.contains('export-ignore') ||
        node.tagName === 'BUTTON'
      ) {
        return false;
      }
    }
    return true;
  };

  // Strategy 1: Targeted html-to-image with scoped fonts and clean options
  try {
    const scopedFontCSS = await getScopedFontEmbedCSS(texts);

    const exportConfig = {
      quality,
      pixelRatio,
      cacheBust: false,
      includeQueryParams: true,
      skipFonts: scopedFontCSS ? false : true,
      fontEmbedCSS: scopedFontCSS || '',
      filter,
      style: {
        borderRadius: '0px',
        boxShadow: 'none',
        outline: 'none',
        margin: '0',
      },
      backgroundColor: format === 'jpeg' ? (background?.value || '#000000') : undefined,
    };

    if (format === 'jpeg') {
      const dataUrl = await toJpeg(canvasNode, exportConfig);
      if (dataUrl && dataUrl.length > 100) return dataUrl;
    } else {
      const dataUrl = await toPng(canvasNode, exportConfig);
      if (dataUrl && dataUrl.length > 100) return dataUrl;
    }
  } catch (domError) {
    console.warn('Strategy 1 (DOM-to-image with fonts) failed, trying with skipFonts: true', domError);

    // Strategy 2: Fast retry with skipFonts: true and image placeholders
    try {
      const retryConfig = {
        quality,
        pixelRatio: 2,
        cacheBust: false,
        includeQueryParams: true,
        skipFonts: true,
        filter,
        style: {
          borderRadius: '0px',
          boxShadow: 'none',
        },
        backgroundColor: format === 'jpeg' ? '#000000' : undefined,
      };

      if (format === 'jpeg') {
        const dataUrl = await toJpeg(canvasNode, retryConfig);
        if (dataUrl && dataUrl.length > 100) return dataUrl;
      } else {
        const dataUrl = await toPng(canvasNode, retryConfig);
        if (dataUrl && dataUrl.length > 100) return dataUrl;
      }
    } catch (retryError) {
      console.warn('Strategy 2 (DOM-to-image minimal) failed, falling back to Canvas 2D engine', retryError);
    }
  }

  // Strategy 3: Guaranteed Canvas 2D Render Engine
  console.info('Generating high-res image via Canvas 2D rendering engine...');
  return await renderFallbackCanvas2D(texts, background, stickers, aspectRatio, format, quality);
}
