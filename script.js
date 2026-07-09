const DEFAULT_SKU_IMAGE = "";
const FONT_NAME = "ShopeeFontBlack";
const FONT_URL = "assets/fonts/shopee-font-black.ttf";
const OVERLAY_BASE = "assets/overlays/";
const OVERLAY_NO_CONTAINER_BASE = "assets/overlays-no-logo-container/";
const NEW_ARRIVAL_OVERLAY_BASE = "assets/new-arrival/overlays/";
const NEW_ARRIVAL_OVERLAY_NO_CONTAINER_BASE =
  "assets/new-arrival/overlays-no-logo-container/";
const ORANGE_SHOPEE_LOGO_URL = "assets/logos/Shopee-Logo-Vertical-Orange-icon.png";
const NEW_ARRIVAL_LOGO_COLOR_URL = "assets/logos/New-Arrival-Logo-Color.png";
const EXPORT_MAX_BYTES = 250 * 1000;
const EXPORT_TARGET_BYTES = 248 * 1000;
const EXPORT_TYPE = "image/png";
const EXPORT_EXTENSION = "png";
const LOSSY_EXPORT_FORMATS = [
  { type: "image/jpeg", extension: "jpg", label: "JPG", minQuality: 0.01, maxQuality: 0.95 },
];
const DETAIL_LIMIT_SCALES = [0.85, 0.72, 0.6, 0.5, 0.42, 0.35, 0.28, 0.22, 0.16, 0.1, 0.06];
const SIZE_LIMITED_OUTPUTS = new Set(["category-banner", "top-module-banner", "banner-card"]);
const EXTERNAL_SHOPEE_LOGO_OUTPUTS = new Set(["ig-story", "fb-post"]);
const SKU_ZOOM_MIN = 0.1;
const SKU_ZOOM_MAX = 2.5;
const SKU_ZOOM_DEFAULT = 1;
const KSP_MAX_CHARACTERS = 50;
const SKU_BACKGROUND_BASE = "assets/sku-backgrounds/";
const SKU_BACKGROUNDS = [
  { id: "beauty", label: "Beauty", src: `${SKU_BACKGROUND_BASE}beauty.png` },
  { id: "beauty-2", label: "Beauty 2", src: `${SKU_BACKGROUND_BASE}beauty-2.png` },
  { id: "beauty-3", label: "Beauty 3", src: `${SKU_BACKGROUND_BASE}beauty-3.png` },
  {
    id: "beauty-flat-lay-1",
    label: "Beauty Flat Lay 1",
    src: `${SKU_BACKGROUND_BASE}beauty-flat-lay-1.png`,
  },
  {
    id: "beauty-flat-lay-2",
    label: "Beauty Flat Lay 2",
    src: `${SKU_BACKGROUND_BASE}beauty-flat-lay-2.png`,
  },
  {
    id: "generic-flat-lay",
    label: "Generic Flat Lay",
    src: `${SKU_BACKGROUND_BASE}generic-flat-lay.png`,
  },
  {
    id: "generic-podium",
    label: "Generic Podium",
    src: `${SKU_BACKGROUND_BASE}generic-podium.png`,
  },
  { id: "groceries", label: "Groceries", src: `${SKU_BACKGROUND_BASE}groceries.png` },
  { id: "home-living", label: "Home & Living", src: `${SKU_BACKGROUND_BASE}home-living.png` },
  {
    id: "home-living-2",
    label: "Home & Living 2",
    src: `${SKU_BACKGROUND_BASE}home-living-2.png`,
  },
];

const outputMeta = {
  "category-banner": {
    title: "Category Banner",
    width: 1200,
    height: 360,
    overlay: `${OVERLAY_BASE}category-banner.png`,
    overlayNoContainer: `${OVERLAY_NO_CONTAINER_BASE}category-banner.png`,
    newArrivalOverlay: `${NEW_ARRIVAL_OVERLAY_BASE}category-banner.png`,
    newArrivalOverlayNoContainer: `${NEW_ARRIVAL_OVERLAY_NO_CONTAINER_BASE}category-banner.png`,
  },
  "top-module-banner": {
    title: "Top Module Banner",
    width: 1125,
    height: 156,
    overlay: `${OVERLAY_BASE}top-module-banner.png`,
    overlayNoContainer: `${OVERLAY_NO_CONTAINER_BASE}top-module-banner.png`,
    newArrivalOverlay: `${NEW_ARRIVAL_OVERLAY_BASE}top-module-banner.png`,
    newArrivalOverlayNoContainer: `${NEW_ARRIVAL_OVERLAY_NO_CONTAINER_BASE}top-module-banner.png`,
  },
  "ig-story": {
    title: "IG Story",
    width: 1080,
    height: 1920,
    overlay: `${OVERLAY_BASE}ig-story.png`,
    overlayNoContainer: `${OVERLAY_NO_CONTAINER_BASE}ig-story.png`,
    newArrivalOverlay: `${NEW_ARRIVAL_OVERLAY_BASE}ig-story.png`,
    newArrivalOverlayNoContainer: `${NEW_ARRIVAL_OVERLAY_NO_CONTAINER_BASE}ig-story.png`,
  },
  "fb-post": {
    title: "FB Post",
    width: 1200,
    height: 630,
    overlay: `${OVERLAY_BASE}fb-post.png`,
    overlayNoContainer: `${OVERLAY_NO_CONTAINER_BASE}fb-post.png`,
    newArrivalOverlay: `${NEW_ARRIVAL_OVERLAY_BASE}fb-post.png`,
    newArrivalOverlayNoContainer: `${NEW_ARRIVAL_OVERLAY_NO_CONTAINER_BASE}fb-post.png`,
  },
  "banner-card": {
    title: "Banner Card",
    width: 531,
    height: 792,
    overlay: `${OVERLAY_BASE}banner-card.png`,
    overlayNoContainer: `${OVERLAY_NO_CONTAINER_BASE}banner-card.png`,
    newArrivalOverlay: `${NEW_ARRIVAL_OVERLAY_BASE}banner-card.png`,
    newArrivalOverlayNoContainer: `${NEW_ARRIVAL_OVERLAY_NO_CONTAINER_BASE}banner-card.png`,
  },
};

const newArrivalLogoBoxes = {
  "Category Banner": { x: 99.2, y: 117.5, width: 294.4, height: 97.5, radius: 18 },
  "Top Module Banner": { x: 361.5, y: 14.2, width: 198.7, height: 65.9, radius: 12 },
  "IG Story": { x: 282.9, y: 467.2, width: 514.5, height: 170.2, radius: 30 },
  "FB Post": { x: 122.4, y: 264, width: 373.6, height: 124, radius: 23 },
  "Banner Card": { x: 128.8, y: 162.1, width: 274.1, height: 91.3, radius: 17 },
};

const newArrivalKspBoxes = {
  "Category Banner": { x: 50, y: 240, width: 400, height: 90, maxSize: 42, minSize: 22 },
  "Top Module Banner": { x: 332, y: 90, width: 258, height: 58, maxSize: 25, minSize: 14 },
  "IG Story": { x: 135, y: 675, width: 810, height: 150, maxSize: 68, minSize: 34 },
  "FB Post": { x: 72, y: 420, width: 474, height: 110, maxSize: 50, minSize: 28 },
  "Banner Card": { x: 70, y: 270, width: 392, height: 90, maxSize: 42, minSize: 24 },
};

const externalShopeeLogoBoxes = {
  "ig-story": { x: 61, y: 180, width: 114, height: 128 },
  "fb-post": { x: 41, y: 39, width: 66, height: 74 },
};

const externalShopeeLogoClearBoxes = {
  "ig-story": { x: 50, y: 168, width: 138, height: 154 },
  "fb-post": { x: 34, y: 31, width: 82, height: 92 },
};

// Where the "NEW ARRIVAL" badge sits within the Mall BAU New Arrival overlay,
// measured directly off the overlay art at each format's canvas resolution.
// Unlike the Shopee icon swap (IG Story / FB Post only), this applies to
// every output format since the New Arrival badge appears on all of them.
const newArrivalLogoColorBoxes = {
  "category-banner": { x: 101, y: 40, width: 291, height: 53 },
  "top-module-banner": { x: 28, y: 55, width: 244, height: 45 },
  "ig-story": { x: 273, y: 350, width: 534, height: 93 },
  "fb-post": { x: 125, y: 166, width: 368, height: 65 },
  "banner-card": { x: 100, y: 84, width: 331, height: 59 },
};

const newArrivalLogoColorClearBoxes = {
  "category-banner": { x: 93, y: 32, width: 307, height: 69 },
  "top-module-banner": { x: 18, y: 45, width: 264, height: 65 },
  "ig-story": { x: 263, y: 340, width: 554, height: 113 },
  "fb-post": { x: 117, y: 158, width: 384, height: 81 },
  "banner-card": { x: 94, y: 78, width: 343, height: 71 },
};

const state = {
  template: "Mall BAU",
  brandLogoUrl: "",
  brandLogoLabel: "Upload",
  hideLogoContainer: false,
  useOrangeShopeeLogo: false,
  skuImageUrl: DEFAULT_SKU_IMAGE,
  skuImageLabel: "Upload",
  skuLink: "",
  ksp: "EXCLUSIVE LAUNCH DISKON 25%",
  kspColor: "#FFFFFF",
  kvColor: "#315F55",
  outputs: new Set(Object.keys(outputMeta)),
  skuPositions: {},
  skuZooms: {},
  skuBackgroundIndex: -1, // -1 = "None"; 0..N-1 indexes into SKU_BACKGROUNDS
  skuBackgroundPositions: {},
  skuBackgroundZooms: {},
  // Per-output, UI-only: which layer (sku or background) the canvas drag +
  // zoom slider currently controls. Every render "context" (the single
  // editor's `state`, or a bulk row acting as its own context) carries its
  // own copy of this so they never interfere with each other.
  activeLayerByOutput: {},
  hue: 166,
  saturation: 0.48,
  value: 0.37,
};

const els = {
  templateSelect: document.querySelector("#templateSelect"),
  templateLabel: document.querySelector("#templateLabel"),
  brandLogoInput: document.querySelector("#brandLogoInput"),
  brandFileName: document.querySelector("#brandFileName"),
  logoContainerToggle: document.querySelector("#logoContainerToggle"),
  shopeeLogoToggle: document.querySelector("#shopeeLogoToggle"),
  skuImageInput: document.querySelector("#skuImageInput"),
  skuFileName: document.querySelector("#skuFileName"),
  skuLink: document.querySelector("#skuLink"),
  loadSkuLinkButton: document.querySelector("#loadSkuLinkButton"),
  bgPrevButton: document.querySelector("#bgPrevButton"),
  bgNextButton: document.querySelector("#bgNextButton"),
  bgSwatch: document.querySelector("#bgSwatch"),
  bgName: document.querySelector("#bgName"),
  bgCount: document.querySelector("#bgCount"),
  kspInput: document.querySelector("#kspInput"),
  kspCount: document.querySelector("#kspCount"),
  kspColorInput: document.querySelector("#kspColorInput"),
  kspColorHex: document.querySelector("#kspColorHex"),
  kspColorDot: document.querySelector("#kspColorDot"),
  nativeColor: document.querySelector("#nativeColor"),
  hexInput: document.querySelector("#hexInput"),
  hueRange: document.querySelector("#hueRange"),
  colorDot: document.querySelector("#colorDot"),
  colorCanvas: document.querySelector("#colorCanvas"),
  swatchGrid: document.querySelector("#swatchGrid"),
  outputButtons: document.querySelector("#outputButtons"),
  generateButton: document.querySelector("#generateButton"),
  downloadAllButton: document.querySelector("#downloadAllButton"),
  previewList: document.querySelector("#previewList"),
  statusPill: document.querySelector("#statusPill"),
  stageBanner: document.querySelector("#stageBanner"),
  stageBannerText: document.querySelector("#stageBannerText"),
  stageBannerExit: document.querySelector("#stageBannerExit"),
  themeToggle: document.querySelector("#themeToggle"),
  bulkPanel: document.querySelector("#bulkPanel"),
  bulkCsvInput: document.querySelector("#bulkCsvInput"),
  bulkCsvFileName: document.querySelector("#bulkCsvFileName"),
  bulkTemplateButton: document.querySelector("#bulkTemplateButton"),
  bulkDefaultOutputs: document.querySelector("#bulkDefaultOutputs"),
  bulkRows: document.querySelector("#bulkRows"),
  bulkEmptyState: document.querySelector("#bulkEmptyState"),
  bulkSummary: document.querySelector("#bulkSummary"),
  bulkGenerateButton: document.querySelector("#bulkGenerateButton"),
};

const swatches = [
  "#EE4D2D",
  "#D0011B",
  "#113366",
  "#0053DE",
  "#26AA99",
  "#FFBB00",
];

const imageCache = new Map();
const imageContentBounds = new WeakMap();
const zipEncoder = new TextEncoder();
let fontReady;
let renderVersion = 0;
let skuDrag = null;
// null = the main editor is showing/editing the single-brand `state`.
// When set, it's a bulk-CSV row object — the same shared render pipeline
// (createPreviewBlock/drawOutput/downloadCanvas) and every sidebar field
// then read/write that row instead, so it becomes a full editor for that
// row without any separate/duplicated UI.
let activeRow = null;

function editingContext() {
  return activeRow || state;
}

function editingOutputs() {
  return activeRow
    ? BULK_OUTPUT_IDS.filter((outputId) => activeRow.outputs.has(outputId))
    : selectedOutputs();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHsv({ r, g, b }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let h = 0;

  if (delta !== 0) {
    if (max === red) h = 60 * (((green - blue) / delta) % 6);
    else if (max === green) h = 60 * ((blue - red) / delta + 2);
    else h = 60 * ((red - green) / delta + 4);
  }

  return {
    h: h < 0 ? h + 360 : h,
    s: max === 0 ? 0 : delta / max,
    v: max,
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function isHex(value) {
  return /^#[0-9A-F]{6}$/i.test(value);
}

function toCssRgb(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

function titleCaseFileName(fileName) {
  if (!fileName) return "Upload";
  return fileName.length > 24 ? `${fileName.slice(0, 21)}...` : fileName;
}

function normalizedKsp(value) {
  return value.slice(0, KSP_MAX_CHARACTERS);
}

function setStatus(message) {
  els.statusPill.textContent = message;
}

function ensureFont() {
  if (fontReady) return fontReady;

  if (!("FontFace" in window)) {
    fontReady = Promise.resolve();
    return fontReady;
  }

  const face = new FontFace(FONT_NAME, `url("${FONT_URL}")`);
  fontReady = face
    .load()
    .then((loadedFace) => {
      document.fonts.add(loadedFace);
      return document.fonts.load(`44pt ${FONT_NAME}`);
    })
    .catch(() => undefined);

  return fontReady;
}

function loadImage(src) {
  if (!src) return Promise.resolve(null);
  if (imageCache.has(src)) return imageCache.get(src);

  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    if (/^https?:\/\//i.test(src)) image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

  imageCache.set(src, promise);
  return promise;
}

function getImageCandidates(value) {
  const input = value.trim();
  if (!input) return [];
  if (/^(data|blob):/i.test(input)) return [input];
  if (input.startsWith("//")) return [`https:${input}`];

  try {
    const url = new URL(input);
    const fileMatch = url.pathname.match(/\/file\/([^/?#]+)/);
    const candidates = [url.href];
    if (fileMatch?.[1]) {
      const hash = fileMatch[1];
      candidates.push(
        `https://down-id.img.susercontent.com/file/${hash}`,
        `https://cf.shopee.co.id/file/${hash}`,
      );
    }
    return [...new Set(candidates)];
  } catch {
    const hash = input
      .replace(/^["']|["']$/g, "")
      .replace(/^\/?file\//i, "")
      .split(/[?#\s]/)[0]
      .trim();

    if (!hash) return [];

    return [
      `https://down-id.img.susercontent.com/file/${hash}`,
      `https://cf.shopee.co.id/file/${hash}`,
      `https://down-id.img.susercontent.com/file/${hash}_tn`,
      `https://cf.shopee.co.id/file/${hash}_tn`,
    ];
  }
}

function imageLabelFromSource(value) {
  const trimmed = value.trim();
  if (!trimmed) return "Linked image";
  const clean = trimmed.split(/[?#\s]/)[0];
  const lastPart = clean.split("/").filter(Boolean).pop() || "Linked image";
  return titleCaseFileName(lastPart);
}

async function fetchImageObjectUrl(src) {
  if (/^(data|blob):/i.test(src)) return src;

  const response = await fetch(src, {
    mode: "cors",
    credentials: "omit",
  });

  if (!response.ok) throw new Error(`Image request failed with ${response.status}.`);

  const blob = await response.blob();
  if (!blob.type.startsWith("image/")) throw new Error("The link did not return an image.");

  const objectUrl = URL.createObjectURL(blob);
  const image = await loadImage(objectUrl);
  if (!image) {
    URL.revokeObjectURL(objectUrl);
    throw new Error("The image could not be opened.");
  }

  return objectUrl;
}

function setSkuImageUrl(url, labelText) {
  const context = editingContext();
  if (context.skuImageUrl?.startsWith("blob:") && context.skuImageUrl !== url) {
    imageCache.delete(context.skuImageUrl);
    URL.revokeObjectURL(context.skuImageUrl);
  }

  context.skuImageUrl = url;
  context.skuImageLabel = labelText || "Linked image";
  context.skuPositions = {};
  context.skuZooms = {};
  els.skuFileName.textContent = context.skuImageLabel;
}

async function loadSkuImageFromInput() {
  const source = els.skuLink.value.trim();
  const candidates = getImageCandidates(source);

  if (!candidates.length) {
    setStatus("Add image link");
    window.setTimeout(() => setStatus("Ready"), 1800);
    return;
  }

  const originalLabel = els.loadSkuLinkButton.textContent;
  els.loadSkuLinkButton.disabled = true;
  els.loadSkuLinkButton.textContent = "Loading...";
  setStatus("Loading image");

  try {
    let loadedUrl = "";
    let lastError = null;

    for (const candidate of candidates) {
      try {
        loadedUrl = await fetchImageObjectUrl(candidate);
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!loadedUrl) throw lastError || new Error("Image could not be loaded.");

    setSkuImageUrl(loadedUrl, imageLabelFromSource(source));
    await renderPreviews();
    setStatus("Image loaded");
    window.setTimeout(() => setStatus("Ready"), 1400);
  } catch (error) {
    console.error("Image link failed", error);
    setStatus("Image load failed");
    window.setTimeout(() => setStatus("Ready"), 2200);
  } finally {
    els.loadSkuLinkButton.disabled = false;
    els.loadSkuLinkButton.textContent = originalLabel;
  }
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function getCoverMetrics(image, width, height, zoom = SKU_ZOOM_DEFAULT) {
  // Base scale is the "cover" fit (fills the box completely at zoom 1).
  // Zoom can go below 1 to shrink the image smaller than the box, or above
  // 1 to zoom in further — it's a free multiplier on top of cover-fit, not
  // clamped to "must always cover the box".
  const scale =
    Math.max(width / image.naturalWidth, height / image.naturalHeight) *
    clamp(zoom, SKU_ZOOM_MIN, SKU_ZOOM_MAX);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  return { drawWidth, drawHeight };
}

// offsetX/offsetY are raw pixel shifts away from dead-center within the box
// (not a 0-1 alignment fraction), so dragging can move the image freely in
// any direction by any amount, regardless of its size relative to the box.
function drawCover(ctx, image, x, y, width, height, offsetX = 0, offsetY = 0, zoom = SKU_ZOOM_DEFAULT) {
  if (!image) return;
  const { drawWidth, drawHeight } = getCoverMetrics(image, width, height, zoom);
  const dx = x + (width - drawWidth) / 2 + offsetX;
  const dy = y + (height - drawHeight) / 2 + offsetY;
  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
}

function drawContain(ctx, image, x, y, width, height, alignX = 0.5, alignY = 0.5) {
  if (!image) return;
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const dx = x + (width - drawWidth) * alignX;
  const dy = y + (height - drawHeight) * alignY;
  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
}

function getImageContentBounds(image) {
  if (imageContentBounds.has(image)) return imageContentBounds.get(image);

  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const fallback = { x: 0, y: 0, width, height };

  if (!width || !height) return fallback;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  try {
    ctx.drawImage(image, 0, 0);
    const { data } = ctx.getImageData(0, 0, width, height);
    let alphaBounds = null;
    let contentBounds = null;
    let contentPixels = 0;

    const addPoint = (bounds, x, y) => {
      if (!bounds) return { minX: x, minY: y, maxX: x, maxY: y };
      return {
        minX: Math.min(bounds.minX, x),
        minY: Math.min(bounds.minY, y),
        maxX: Math.max(bounds.maxX, x),
        maxY: Math.max(bounds.maxY, y),
      };
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = (y * width + x) * 4;
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const alpha = data[index + 3];

        if (alpha > 10) alphaBounds = addPoint(alphaBounds, x, y);

        const isWhiteSpace = red > 245 && green > 245 && blue > 245;
        if (alpha > 18 && !isWhiteSpace) {
          contentBounds = addPoint(contentBounds, x, y);
          contentPixels += 1;
        }
      }
    }

    const bounds = contentPixels > 12 ? contentBounds : alphaBounds;
    const result = bounds
      ? {
          x: bounds.minX,
          y: bounds.minY,
          width: bounds.maxX - bounds.minX + 1,
          height: bounds.maxY - bounds.minY + 1,
        }
      : fallback;

    imageContentBounds.set(image, result);
    return result;
  } catch {
    imageContentBounds.set(image, fallback);
    return fallback;
  }
}

function drawContainTrimmed(ctx, image, x, y, width, height, alignX = 0.5, alignY = 0.5) {
  if (!image) return;
  const source = getImageContentBounds(image);
  const scale = Math.min(width / source.width, height / source.height);
  const drawWidth = source.width * scale;
  const drawHeight = source.height * scale;
  const dx = x + (width - drawWidth) * alignX;
  const dy = y + (height - drawHeight) * alignY;

  ctx.drawImage(
    image,
    source.x,
    source.y,
    source.width,
    source.height,
    dx,
    dy,
    drawWidth,
    drawHeight,
  );
}

function drawStretch(ctx, image, x, y, width, height) {
  if (!image) return;
  ctx.drawImage(image, x, y, width, height);
}

function splitLongWord(ctx, word, maxWidth) {
  const parts = [];
  let current = "";

  Array.from(word).forEach((character) => {
    const next = `${current}${character}`;
    if (ctx.measureText(next).width <= maxWidth || !current) {
      current = next;
    } else {
      parts.push(current);
      current = character;
    }
  });

  if (current) parts.push(current);
  return parts;
}

function wrapText(ctx, text, maxWidth) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const pieces =
      ctx.measureText(word).width > maxWidth ? splitLongWord(ctx, word, maxWidth) : [word];

    pieces.forEach((piece) => {
      const next = current ? `${current} ${piece}` : piece;
      if (ctx.measureText(next).width <= maxWidth || !current) {
        current = next;
      } else {
        lines.push(current);
        current = piece;
      }
    });
  });

  if (current) lines.push(current);
  return lines;
}

function drawFittedText(ctx, text, box, options = {}) {
  const {
    color = "#FFFFFF",
    align = "center",
    baseline = "middle",
    maxSize = 58.67,
    minSize = 10,
    lineHeight = 1.04,
  } = options;

  let size = maxSize;
  let lines = [];

  while (size >= minSize) {
    ctx.font = `900 ${size}px ${FONT_NAME}, Arial Black, sans-serif`;
    lines = wrapText(ctx, text, box.width);
    if (lines.length * size * lineHeight <= box.height) break;
    size -= 2;
  }

  size = Math.max(size, minSize);

  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.font = `900 ${size}px ${FONT_NAME}, Arial Black, sans-serif`;

  const totalHeight = lines.length * size * lineHeight;
  let startY =
    baseline === "top"
      ? box.y + size / 2
      : box.y + box.height / 2 - totalHeight / 2 + size / 2;
  const x = align === "left" ? box.x : box.x + box.width / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * size * lineHeight);
  });
}

function drawFallbackBrand(ctx, box) {
  ctx.fillStyle = "#72CBBB";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${Math.min(box.height * 0.42, box.width * 0.12)}px ${FONT_NAME}, Arial Black, sans-serif`;
  ctx.fillText("cottonseeds", box.x + box.width / 2, box.y + box.height / 2);
}

function drawBrandLogo(ctx, image, box) {
  ctx.save();
  roundRect(ctx, box.x, box.y, box.width, box.height, box.radius);
  ctx.clip();

  if (image) {
    const insetX = box.width * 0.06;
    const insetY = box.height * 0.1;
    drawContainTrimmed(
      ctx,
      image,
      box.x + insetX,
      box.y + insetY,
      box.width - insetX * 2,
      box.height - insetY * 2,
    );
  } else if (!state.hideLogoContainer) {
    drawFallbackBrand(ctx, box);
  }

  ctx.restore();
}

function getLayout(format) {
  const { width: w, height: h } = format;
  const newArrivalLogo = state.template === "Mall BAU New Arrival"
    ? newArrivalLogoBoxes[format.title]
    : null;
  const newArrivalKsp = state.template === "Mall BAU New Arrival"
    ? newArrivalKspBoxes[format.title]
    : null;

  if (format.title === "Top Module Banner") {
    return {
      kv: { x: 0, y: 0, width: 720, height: h },
      product: { x: 720, y: 0, width: w - 720, height: h },
      logo:
        newArrivalLogo ||
        { x: 35.749, y: 35.248, width: 257.201, height: 85.504, radius: 15.199 },
      ksp:
        newArrivalKsp ||
        { x: 346, y: 28, width: 330, height: 100, maxSize: 58.67, minSize: 30 },
      productAlign: [0.5, 0.62],
    };
  }

  if (format.title === "Category Banner") {
    return {
      kv: { x: 0, y: 0, width: 500, height: h },
      product: { x: 500, y: 0, width: w - 500, height: h },
      logo:
        newArrivalLogo ||
        { x: 88.3, y: 78.903, width: 322.668, height: 107.268, radius: 19.068 },
      ksp:
        newArrivalKsp ||
        { x: 38, y: 202, width: 424, height: 120, maxSize: 58.67, minSize: 34 },
      productAlign: [0.62, 0.58],
    };
  }

  if (format.title === "IG Story") {
    return {
      kv: { x: 0, y: 0, width: w, height: 850 },
      product: { x: 0, y: 850, width: w, height: h - 850 },
      logo:
        newArrivalLogo ||
        { x: 255.742, y: 380.519, width: 568.516, height: 188.998, radius: 33.596 },
      ksp:
        newArrivalKsp ||
        { x: 135, y: 590, width: 810, height: 230, maxSize: 86, minSize: 42 },
      productAlign: [0.5, 0.45],
    };
  }

  if (format.title === "FB Post") {
    return {
      kv: { x: 0, y: 0, width: 607, height: h },
      product: { x: 607, y: 0, width: w - 607, height: h },
      logo:
        newArrivalLogo ||
        { x: 119.976, y: 196.548, width: 342.137, height: 144.934, radius: 23.803 },
      ksp:
        newArrivalKsp ||
        { x: 120, y: 394, width: 344, height: 150, maxSize: 58.67, minSize: 36 },
      productAlign: [0.56, 0.55],
    };
  }

  return {
    kv: { x: 0, y: 0, width: w, height: 414 },
    product: { x: 0, y: 414, width: w, height: h - 414 },
    logo:
      newArrivalLogo ||
      { x: 114.998, y: 91.451, width: 301.003, height: 100.066, radius: 17.787 },
    ksp:
      newArrivalKsp ||
      { x: 70, y: 239, width: 392, height: 128, maxSize: 58.67, minSize: 34 },
    productAlign: [0.5, 0.42],
  };
}

function drawBackground(ctx, format) {
  const layout = getLayout(format);
  ctx.fillStyle = "#FFF3F6";
  ctx.fillRect(0, 0, format.width, format.height);
  ctx.fillStyle = state.kvColor;
  ctx.fillRect(layout.kv.x, layout.kv.y, layout.kv.width, layout.kv.height);
  return layout;
}

// Positions are stored as raw pixel offsets from dead-center (not a 0-1
// alignment fraction), so an image can be dragged freely by any amount in
// any direction regardless of its size relative to the box. When nothing
// has been saved yet, fall back to a per-format default offset derived
// from the old art-directed alignment bias (productAlign), evaluated at
// the default zoom so the initial framing looks the same as before.
function getDefaultLayerOffset(image, layout, productAlign) {
  if (!image) return { x: 0, y: 0 };
  const { drawWidth, drawHeight } = getCoverMetrics(
    image,
    layout.product.width,
    layout.product.height,
    SKU_ZOOM_DEFAULT,
  );
  return {
    x: (layout.product.width - drawWidth) * (productAlign[0] - 0.5),
    y: (layout.product.height - drawHeight) * (productAlign[1] - 0.5),
  };
}

// `context` defaults to the single editor's global `state`, so every
// existing call site keeps working unchanged. A bulk row can also act as
// its own context (it has the same shaped skuPositions/skuZooms/ksp/etc.
// fields), which is what lets each row get independent drag/zoom editing
// without disturbing the single editor or any other row.
function getSkuPosition(outputId, layout = null, image = null, context = state) {
  const savedPosition = context.skuPositions[outputId];
  if (savedPosition) return savedPosition;

  const currentLayout = layout || getLayout(outputMeta[outputId]);
  return getDefaultLayerOffset(image, currentLayout, currentLayout.productAlign);
}

function setSkuPosition(outputId, position, context = state) {
  context.skuPositions[outputId] = {
    x: Number.isFinite(position.x) ? position.x : 0,
    y: Number.isFinite(position.y) ? position.y : 0,
  };
}

function getSkuZoom(outputId, context = state) {
  return context.skuZooms[outputId] || SKU_ZOOM_DEFAULT;
}

function setSkuZoom(outputId, zoom, context = state) {
  context.skuZooms[outputId] = clamp(zoom, SKU_ZOOM_MIN, SKU_ZOOM_MAX);
}

function hasSkuBackground() {
  return state.skuBackgroundIndex >= 0 && state.skuBackgroundIndex < SKU_BACKGROUNDS.length;
}

function getSkuBackgroundSrc() {
  return hasSkuBackground() ? SKU_BACKGROUNDS[state.skuBackgroundIndex].src : "";
}

function getSkuBackgroundLabel() {
  return hasSkuBackground() ? SKU_BACKGROUNDS[state.skuBackgroundIndex].label : "None";
}

// Selection cycles through "None" plus every background, wrapping in both
// directions: -1 (None), 0, 1, ... N-1, back to -1.
function cycleSkuBackground(direction) {
  const total = SKU_BACKGROUNDS.length + 1;
  const currentSlot = state.skuBackgroundIndex + 1;
  const nextSlot = (currentSlot + direction + total) % total;
  state.skuBackgroundIndex = nextSlot - 1;
  if (!hasSkuBackground()) resetActiveLayers();
}

function getSkuBackgroundPosition(outputId, layout = null, image = null) {
  const savedPosition = state.skuBackgroundPositions[outputId];
  if (savedPosition) return savedPosition;

  const currentLayout = layout || getLayout(outputMeta[outputId]);
  return getDefaultLayerOffset(image, currentLayout, currentLayout.productAlign);
}

function setSkuBackgroundPosition(outputId, position) {
  state.skuBackgroundPositions[outputId] = {
    x: Number.isFinite(position.x) ? position.x : 0,
    y: Number.isFinite(position.y) ? position.y : 0,
  };
}

function getSkuBackgroundZoom(outputId) {
  return state.skuBackgroundZooms[outputId] || SKU_ZOOM_DEFAULT;
}

function setSkuBackgroundZoom(outputId, zoom) {
  state.skuBackgroundZooms[outputId] = clamp(zoom, SKU_ZOOM_MIN, SKU_ZOOM_MAX);
}

// Registry so drag/zoom code can operate on "whichever layer is active"
// without branching everywhere. The background side always reads/writes
// the global state (it's shared across the whole batch, not per-row); the
// sku side is bound to whichever context is passed in.
function getSkuLayers(context = state) {
  return {
    sku: {
      getImageUrl: () => context.skuImageUrl,
      getPosition: (outputId, layout, image) => getSkuPosition(outputId, layout, image, context),
      setPosition: (outputId, position) => setSkuPosition(outputId, position, context),
      getZoom: (outputId) => getSkuZoom(outputId, context),
      setZoom: (outputId, zoom) => setSkuZoom(outputId, zoom, context),
    },
    background: {
      getImageUrl: () => getSkuBackgroundSrc(),
      getPosition: getSkuBackgroundPosition,
      setPosition: setSkuBackgroundPosition,
      getZoom: getSkuBackgroundZoom,
      setZoom: setSkuBackgroundZoom,
    },
  };
}

function getActiveLayer(outputId, context = state) {
  return context.activeLayerByOutput[outputId] === "background" ? "background" : "sku";
}

function setActiveLayer(outputId, layerKey, context = state) {
  context.activeLayerByOutput[outputId] = layerKey === "background" ? "background" : "sku";
}

function resetActiveLayers(context = state) {
  Object.keys(context.activeLayerByOutput).forEach((outputId) => {
    context.activeLayerByOutput[outputId] = "sku";
  });
}

function getOverlaySrc(format) {
  if (state.template === "Mall BAU New Arrival") {
    if (state.hideLogoContainer && format.newArrivalOverlayNoContainer) {
      return format.newArrivalOverlayNoContainer;
    }
    return format.newArrivalOverlay;
  }

  if (state.hideLogoContainer && format.overlayNoContainer) return format.overlayNoContainer;
  return format.overlay;
}

async function drawOutput(outputId, canvas, options = {}) {
  const { scale = 1, photoOverride = null, context = state } = options;
  const format = outputMeta[outputId];
  const ctx = canvas.getContext("2d");
  canvas.width = Math.round(format.width * scale);
  canvas.height = Math.round(format.height * scale);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  await ensureFont();

  const shouldUseOrangeShopeeLogo =
    state.useOrangeShopeeLogo && EXTERNAL_SHOPEE_LOGO_OUTPUTS.has(outputId);
  // Applies on every format (not just IG Story / FB Post) since the New
  // Arrival badge shows up on all of them, unlike the Shopee icon swap.
  const shouldUseColorNewArrivalLogo =
    state.useOrangeShopeeLogo &&
    state.template === "Mall BAU New Arrival" &&
    Boolean(newArrivalLogoColorBoxes[outputId]);
  const [brandLogo, skuImage, overlay, orangeShopeeLogo, backgroundImage, newArrivalLogoColor] =
    await Promise.all([
      loadImage(context.brandLogoUrl),
      photoOverride ? Promise.resolve(null) : loadImage(context.skuImageUrl),
      loadImage(getOverlaySrc(format)),
      loadImage(shouldUseOrangeShopeeLogo ? ORANGE_SHOPEE_LOGO_URL : ""),
      photoOverride ? Promise.resolve(null) : loadImage(getSkuBackgroundSrc()),
      loadImage(shouldUseColorNewArrivalLogo ? NEW_ARRIVAL_LOGO_COLOR_URL : ""),
    ]);

  ctx.clearRect(0, 0, format.width, format.height);
  const layout = drawBackground(ctx, format);

  ctx.save();
  ctx.beginPath();
  ctx.rect(layout.product.x, layout.product.y, layout.product.width, layout.product.height);
  ctx.clip();
  if (photoOverride) {
    // Pre-rendered photo layer (possibly softened to shrink file size). Drawing it as a
    // single image here means it never gets re-encoded, so this pass stays lossless for
    // every non-photo pixel (overlay ribbon, logos, KSP text) that gets drawn afterwards.
    ctx.drawImage(
      photoOverride,
      layout.product.x,
      layout.product.y,
      layout.product.width,
      layout.product.height,
    );
  } else {
    if (backgroundImage) {
      // Drawn first so a transparent-background SKU photo shows it through;
      // an opaque SKU photo will simply cover it entirely.
      const bgPosition = getSkuBackgroundPosition(outputId, layout, backgroundImage);
      const bgZoom = getSkuBackgroundZoom(outputId);
      drawCover(
        ctx,
        backgroundImage,
        layout.product.x,
        layout.product.y,
        layout.product.width,
        layout.product.height,
        bgPosition.x,
        bgPosition.y,
        bgZoom,
      );
    }
    const skuPosition = getSkuPosition(outputId, layout, skuImage, context);
    const skuZoom = getSkuZoom(outputId, context);
    drawCover(
      ctx,
      skuImage,
      layout.product.x,
      layout.product.y,
      layout.product.width,
      layout.product.height,
      skuPosition.x,
      skuPosition.y,
      skuZoom,
    );
  }
  ctx.restore();

  // The overlay contains fixed elements from the working file, including the ribbon.
  drawStretch(ctx, overlay, 0, 0, format.width, format.height);
  if (shouldUseOrangeShopeeLogo && orangeShopeeLogo) {
    const clearBox = externalShopeeLogoClearBoxes[outputId];
    const logoBox = externalShopeeLogoBoxes[outputId];
    ctx.fillStyle = state.kvColor;
    ctx.fillRect(clearBox.x, clearBox.y, clearBox.width, clearBox.height);
    // drawContain (not a stretch) keeps the asset's own aspect ratio intact,
    // fitting and centering it inside the box instead of distorting it.
    drawContain(ctx, orangeShopeeLogo, logoBox.x, logoBox.y, logoBox.width, logoBox.height);
  }
  if (shouldUseColorNewArrivalLogo && newArrivalLogoColor) {
    // Same clear-then-redraw technique as the Shopee logo swap above: the
    // white "NEW ARRIVAL" badge is baked into the overlay art, so we paint
    // over it with the flat KV color, then draw the colored version at the
    // exact same spot — position/size never change, only the asset does.
    const naClearBox = newArrivalLogoColorClearBoxes[outputId];
    const naLogoBox = newArrivalLogoColorBoxes[outputId];
    ctx.fillStyle = state.kvColor;
    ctx.fillRect(naClearBox.x, naClearBox.y, naClearBox.width, naClearBox.height);
    drawContain(
      ctx,
      newArrivalLogoColor,
      naLogoBox.x,
      naLogoBox.y,
      naLogoBox.width,
      naLogoBox.height,
    );
  }
  drawBrandLogo(ctx, brandLogo, layout.logo);
  drawFittedText(ctx, context.ksp, layout.ksp, {
    color: state.kspColor,
    maxSize: layout.ksp.maxSize,
    minSize: 10,
  });
}

function canvasPointFromEvent(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function pointInsideBox(point, box) {
  return (
    point.x >= box.x &&
    point.x <= box.x + box.width &&
    point.y >= box.y &&
    point.y <= box.y + box.height
  );
}

function updateLayerPositionFromDrag(outputId, layerKey, image, deltaX, deltaY, context = state) {
  const format = outputMeta[outputId];
  const layout = getLayout(format);
  const layer = getSkuLayers(context)[layerKey];
  const position = layer.getPosition(outputId, layout, image);

  // Pixel-for-pixel drag: the image moves exactly as far as the cursor,
  // with no clamping and no dependence on the image's size relative to
  // the box, so it can be repositioned freely at any zoom level.
  layer.setPosition(outputId, {
    x: position.x + deltaX,
    y: position.y + deltaY,
  });
}

function requestCanvasRedraw(outputId, canvas, context = state) {
  if (canvas.renderFrame) cancelAnimationFrame(canvas.renderFrame);
  canvas.renderFrame = requestAnimationFrame(() => {
    canvas.renderFrame = 0;
    drawOutput(outputId, canvas, { context });
  });
}

function endSkuDrag(event) {
  if (!skuDrag || (event?.pointerId && event.pointerId !== skuDrag.pointerId)) return;
  skuDrag.canvas.classList.remove("is-dragging");
  skuDrag = null;
  setStatus("Ready");
}

function bindSkuDrag(canvas, outputId, context = state) {
  canvas.addEventListener("pointerdown", async (event) => {
    if (event.button !== 0) return;

    const layout = getLayout(outputMeta[outputId]);
    const point = canvasPointFromEvent(canvas, event);
    if (!pointInsideBox(point, layout.product)) return;

    const layerKey = getActiveLayer(outputId, context);
    const image = await loadImage(getSkuLayers(context)[layerKey].getImageUrl());
    if (!image) return;

    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add("is-dragging");
    skuDrag = {
      canvas,
      outputId,
      layerKey,
      context,
      pointerId: event.pointerId,
      image,
      lastPoint: point,
    };
    setStatus("Positioning");
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!skuDrag || skuDrag.canvas !== canvas || skuDrag.pointerId !== event.pointerId) return;

    event.preventDefault();
    const point = canvasPointFromEvent(canvas, event);
    const deltaX = point.x - skuDrag.lastPoint.x;
    const deltaY = point.y - skuDrag.lastPoint.y;
    skuDrag.lastPoint = point;

    updateLayerPositionFromDrag(outputId, skuDrag.layerKey, skuDrag.image, deltaX, deltaY, skuDrag.context);
    requestCanvasRedraw(outputId, canvas, skuDrag.context);
  });

  canvas.addEventListener("pointerup", endSkuDrag);
  canvas.addEventListener("pointercancel", endSkuDrag);
  canvas.addEventListener("lostpointercapture", endSkuDrag);
}

function createPreviewBlock(outputId, context = state, onRerender = renderPreviews) {
  const format = outputMeta[outputId];
  const block = document.createElement("section");
  block.className = "preview-block";
  let canvas;

  const heading = document.createElement("div");
  heading.className = "preview-heading";

  const titleWrap = document.createElement("div");
  const title = document.createElement("h2");
  title.className = "preview-title";
  title.textContent = format.title;

  const meta = document.createElement("p");
  meta.className = "preview-meta";
  meta.textContent = `${format.width} x ${format.height}px`;
  titleWrap.append(title, meta);

  const actions = document.createElement("div");
  actions.className = "preview-actions";

  const activeLayerKey = getActiveLayer(outputId, context);
  const activeLayer = getSkuLayers(context)[activeLayerKey];
  const isBackgroundActive = activeLayerKey === "background";

  if (hasSkuBackground()) {
    const layerSwitch = document.createElement("div");
    layerSwitch.className = "layer-switch";
    layerSwitch.setAttribute("role", "group");
    layerSwitch.setAttribute("aria-label", `${format.title} move target`);

    [
      { key: "sku", label: "SKU" },
      { key: "background", label: "BG" },
    ].forEach(({ key, label }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "layer-switch-btn";
      button.dataset.layer = key;
      button.textContent = label;
      const isActive = key === activeLayerKey;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      layerSwitch.append(button);
    });

    layerSwitch.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-layer]");
      if (!button || button.classList.contains("is-active")) return;
      setActiveLayer(outputId, button.dataset.layer, context);
      onRerender();
    });

    actions.append(layerSwitch);
  }

  const zoomControl = document.createElement("label");
  zoomControl.className = "zoom-control";
  const zoomLabel = document.createElement("span");
  zoomLabel.textContent = isBackgroundActive ? "Background Zoom" : "SKU Zoom";
  const zoomInput = document.createElement("input");
  zoomInput.type = "range";
  zoomInput.min = String(SKU_ZOOM_MIN * 100);
  zoomInput.max = String(SKU_ZOOM_MAX * 100);
  zoomInput.step = "5";
  zoomInput.value = String(Math.round(activeLayer.getZoom(outputId) * 100));
  zoomInput.setAttribute(
    "aria-label",
    `${format.title} ${isBackgroundActive ? "background" : "SKU"} zoom`,
  );
  const zoomValue = document.createElement("span");
  zoomValue.className = "zoom-value";
  zoomValue.textContent = `${zoomInput.value}%`;
  zoomInput.addEventListener("input", () => {
    activeLayer.setZoom(outputId, Number(zoomInput.value) / 100);
    zoomValue.textContent = `${zoomInput.value}%`;
    if (canvas) requestCanvasRedraw(outputId, canvas, context);
  });
  zoomControl.append(zoomLabel, zoomInput, zoomValue);

  const download = document.createElement("button");
  download.type = "button";
  download.className = "download-button";
  download.textContent = "Download";
  download.addEventListener("click", () => downloadCanvas(outputId, context));
  actions.append(zoomControl, download);

  heading.append(titleWrap, actions);

  const shell = document.createElement("div");
  shell.className = "canvas-shell";
  canvas = document.createElement("canvas");
  canvas.className = "asset-canvas";
  const activeLayerHasImage = isBackgroundActive ? hasSkuBackground() : Boolean(context.skuImageUrl);
  if (activeLayerHasImage) canvas.classList.add("can-drag");
  canvas.dataset.output = outputId;
  canvas.setAttribute("aria-label", `${format.title} preview`);
  bindSkuDrag(canvas, outputId, context);
  shell.append(canvas);

  block.append(heading, shell);
  return { block, canvas };
}

async function renderPreviews() {
  const currentVersion = ++renderVersion;
  els.previewList.innerHTML = "";
  document.documentElement.style.setProperty("--kv", state.kvColor);
  els.templateLabel.textContent = state.template;

  const context = editingContext();
  const selected = editingOutputs();

  if (!selected.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = activeRow
      ? "Select at least one output above to preview this row."
      : "Select at least one output to preview.";
    els.previewList.append(empty);
    return;
  }

  setStatus("Rendering");
  const jobs = selected.map((outputId) => {
    const { block, canvas } = createPreviewBlock(outputId, context, renderPreviews);
    els.previewList.append(block);
    return drawOutput(outputId, canvas, { context });
  });

  await Promise.allSettled(jobs);
  if (currentVersion === renderVersion) setStatus("Ready");
}

function drawColorCanvas() {
  const canvas = els.colorCanvas;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const canvasWidth = Math.max(1, Math.round(rect.width * ratio));
  const canvasHeight = Math.max(1, Math.round(rect.height * ratio));

  if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  const { width, height } = canvas;
  const hueColor = rgbToHex(hsvToRgb(state.hue, 1, 1));
  const markerRadius = 7 * ratio;
  const markerOuterRadius = 8.5 * ratio;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = hueColor;
  ctx.fillRect(0, 0, width, height);

  const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
  whiteGradient.addColorStop(0, "#FFFFFF");
  whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = whiteGradient;
  ctx.fillRect(0, 0, width, height);

  const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
  blackGradient.addColorStop(0, "rgba(0,0,0,0)");
  blackGradient.addColorStop(1, "#000000");
  ctx.fillStyle = blackGradient;
  ctx.fillRect(0, 0, width, height);

  const x = state.saturation * width;
  const y = (1 - state.value) * height;
  ctx.beginPath();
  ctx.arc(x, y, markerRadius, 0, Math.PI * 2);
  ctx.lineWidth = 2 * ratio;
  ctx.strokeStyle = "#FFFFFF";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, markerOuterRadius, 0, Math.PI * 2);
  ctx.lineWidth = ratio;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
  ctx.stroke();
}

function updateColorFromCanvas(event) {
  const rect = els.colorCanvas.getBoundingClientRect();
  const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
  const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
  state.saturation = x / rect.width;
  state.value = 1 - y / rect.height;
  setColor(rgbToHex(hsvToRgb(state.hue, state.saturation, state.value)), false);
}

function setColor(hex, syncFromHex = true) {
  const normalized = hex.startsWith("#") ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
  if (!isHex(normalized)) return;

  state.kvColor = normalized;
  els.nativeColor.value = normalized;
  els.hexInput.value = normalized;
  els.colorDot.style.background = normalized;

  if (syncFromHex) {
    const hsv = rgbToHsv(hexToRgb(normalized));
    state.hue = hsv.h;
    state.saturation = hsv.s;
    state.value = hsv.v;
    els.hueRange.value = String(Math.round(state.hue));
  }

  renderSwatchCurrent();
  drawColorCanvas();
  renderPreviews();
}

function setKspColor(hex) {
  const normalized = hex.startsWith("#") ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
  if (!isHex(normalized)) return;

  state.kspColor = normalized;
  els.kspColorInput.value = normalized;
  els.kspColorHex.value = normalized;
  els.kspColorDot.style.background = normalized;
  renderPreviews();
}

function renderSwatches() {
  const fragment = document.createDocumentFragment();

  swatches.forEach((hex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.style.background = hex;
    button.setAttribute("aria-label", `Use color ${hex}`);
    button.addEventListener("click", () => setColor(hex));
    fragment.append(button);
  });

  els.swatchGrid.append(fragment);
  renderSwatchCurrent();
}

function renderSwatchCurrent() {
  const current = toCssRgb(state.kvColor);
  els.swatchGrid.querySelectorAll("button").forEach((button) => {
    button.setAttribute(
      "aria-current",
      button.style.backgroundColor === current ? "true" : "false",
    );
  });
}

function readFile(input, key, labelKey, labelEl) {
  const [file] = input.files;
  if (!file) return;

  const context = editingContext();
  if (context[key]?.startsWith("blob:")) {
    imageCache.delete(context[key]);
    URL.revokeObjectURL(context[key]);
  }

  context[key] = URL.createObjectURL(file);
  context[labelKey] = titleCaseFileName(file.name);
  if (key === "skuImageUrl") {
    context.skuPositions = {};
    context.skuZooms = {};
  }
  labelEl.textContent = context[labelKey];
  renderPreviews();
}

function syncOutputButtons() {
  const outputs = editingContext().outputs;
  els.outputButtons.querySelectorAll("button").forEach((button) => {
    const isSelected = outputs.has(button.dataset.output);
    button.setAttribute("aria-selected", String(isSelected));
  });
}

function syncKspCount() {
  els.kspCount.textContent = `${editingContext().ksp.length}/${KSP_MAX_CHARACTERS}`;
}

// Populates the sidebar's display-only fields (KSP text, image filenames,
// output selection) from whichever context is currently active. Template,
// KV color, toggles, and SKU background stay put — they're shared globally
// and every context already reads them straight from `state`.
function syncEditorFieldsFromContext() {
  const context = editingContext();
  els.kspInput.value = context.ksp;
  syncKspCount();
  els.brandFileName.textContent = context.brandLogoLabel || "Upload";
  els.skuFileName.textContent = context.skuImageLabel || "Upload";
  syncOutputButtons();
}

function selectedOutputs() {
  return Object.keys(outputMeta).filter((output) => state.outputs.has(output));
}

function outputFileName(outputId) {
  const format = outputMeta[outputId];
  return outputFileNameWithExtension(outputId, EXPORT_EXTENSION);
}

function outputFileNameWithExtension(outputId, extension) {
  const format = outputMeta[outputId];
  return `${format.title.replace(/\s+/g, "-").toLowerCase()}-${format.width}x${format.height}.${extension}`;
}

function formatFileSize(bytes) {
  if (bytes >= 1000 * 1000) return `${(bytes / (1000 * 1000)).toFixed(1)} MB`;
  return `${Math.ceil(bytes / 1000)} KB`;
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function canvasToBlob(canvas, type = EXPORT_TYPE, quality = undefined) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas export returned an empty file."));
      }, type, quality);
    } catch (error) {
      reject(error);
    }
  });
}

function isRequestedBlobType(blob, type) {
  return type === EXPORT_TYPE || blob.type === type;
}

async function encodeCanvas(canvas, type = EXPORT_TYPE, quality = undefined) {
  const blob = await canvasToBlob(canvas, type, quality);
  return isRequestedBlobType(blob, type) ? blob : null;
}

function createOpaqueCanvas(canvas) {
  const opaqueCanvas = document.createElement("canvas");
  opaqueCanvas.width = canvas.width;
  opaqueCanvas.height = canvas.height;
  const ctx = opaqueCanvas.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, opaqueCanvas.width, opaqueCanvas.height);
  ctx.drawImage(canvas, 0, 0);
  return opaqueCanvas;
}

function createDetailLimitedCanvas(canvas, scale) {
  const scaledWidth = Math.max(1, Math.round(canvas.width * scale));
  const scaledHeight = Math.max(1, Math.round(canvas.height * scale));
  const smallCanvas = document.createElement("canvas");
  smallCanvas.width = scaledWidth;
  smallCanvas.height = scaledHeight;

  const smallCtx = smallCanvas.getContext("2d");
  smallCtx.imageSmoothingEnabled = true;
  smallCtx.imageSmoothingQuality = "high";
  smallCtx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight);

  const detailCanvas = document.createElement("canvas");
  detailCanvas.width = canvas.width;
  detailCanvas.height = canvas.height;
  const detailCtx = detailCanvas.getContext("2d");
  detailCtx.imageSmoothingEnabled = true;
  detailCtx.imageSmoothingQuality = "high";
  detailCtx.fillStyle = "#FFFFFF";
  detailCtx.fillRect(0, 0, detailCanvas.width, detailCanvas.height);
  detailCtx.drawImage(smallCanvas, 0, 0, detailCanvas.width, detailCanvas.height);
  return detailCanvas;
}

const PHOTO_SOFTEN_QUALITIES = [0.92, 0.82, 0.7, 0.58, 0.46, 0.34, 0.24, 0.16, 0.1, 0.06, 0.03];

// Renders only the SKU photo (the sole photographic, high-entropy region of the banner)
// into its own canvas at the exact size it occupies in the final output. Optionally passes
// it through one JPEG encode/decode round trip to reduce its detail/noise before it gets
// composited back in. Everything else in the banner (KV background, overlay ribbon/badge,
// brand logo, KSP text) is flat graphic content that a lossless PNG encodes near-perfectly,
// so keeping those pixels out of any lossy step is what keeps them crisp.
async function createPhotoLayer(outputId, quality, context = state) {
  const format = outputMeta[outputId];
  const layout = getLayout(format);
  const [skuImage, backgroundImage] = await Promise.all([
    loadImage(context.skuImageUrl),
    loadImage(getSkuBackgroundSrc()),
  ]);

  const photoCanvas = document.createElement("canvas");
  photoCanvas.width = Math.max(1, Math.round(layout.product.width));
  photoCanvas.height = Math.max(1, Math.round(layout.product.height));
  const photoCtx = photoCanvas.getContext("2d");
  photoCtx.imageSmoothingEnabled = true;
  photoCtx.imageSmoothingQuality = "high";
  photoCtx.fillStyle = "#FFFFFF";
  photoCtx.fillRect(0, 0, photoCanvas.width, photoCanvas.height);

  if (backgroundImage) {
    const bgPosition = getSkuBackgroundPosition(outputId, layout, backgroundImage);
    const bgZoom = getSkuBackgroundZoom(outputId);
    drawCover(
      photoCtx,
      backgroundImage,
      0,
      0,
      photoCanvas.width,
      photoCanvas.height,
      bgPosition.x,
      bgPosition.y,
      bgZoom,
    );
  }

  if (skuImage) {
    const skuPosition = getSkuPosition(outputId, layout, skuImage, context);
    const skuZoom = getSkuZoom(outputId, context);
    drawCover(
      photoCtx,
      skuImage,
      0,
      0,
      photoCanvas.width,
      photoCanvas.height,
      skuPosition.x,
      skuPosition.y,
      skuZoom,
    );
  }

  if (!quality || typeof createImageBitmap !== "function") return photoCanvas;

  const jpegBlob = await encodeCanvas(photoCanvas, "image/jpeg", quality);
  if (!jpegBlob) return photoCanvas;

  try {
    const softened = await createImageBitmap(jpegBlob);
    const softCanvas = document.createElement("canvas");
    softCanvas.width = photoCanvas.width;
    softCanvas.height = photoCanvas.height;
    softCanvas.getContext("2d").drawImage(softened, 0, 0);
    return softCanvas;
  } catch {
    return photoCanvas;
  }
}

async function renderPngWithSoftenedPhoto(outputId, quality, context = state) {
  const format = outputMeta[outputId];
  const photoLayer = await createPhotoLayer(outputId, quality, context);
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = format.width;
  exportCanvas.height = format.height;
  await drawOutput(outputId, exportCanvas, { photoOverride: photoLayer, context });
  return exportCanvas;
}

async function createLossyExport(canvas, format) {
  const sourceCanvas = format.type === "image/jpeg" ? createOpaqueCanvas(canvas) : canvas;
  let low = format.minQuality;
  let high = format.maxQuality;
  let bestUnderLimit = null;
  let smallestFile = null;

  for (let attempt = 0; attempt < 9; attempt += 1) {
    const quality = (low + high) / 2;
    const blob = await encodeCanvas(sourceCanvas, format.type, quality);
    if (!blob) return null;

    const file = {
      blob,
      extension: format.extension,
      label: format.label,
      quality,
    };

    if (!smallestFile || blob.size < smallestFile.blob.size) smallestFile = file;

    if (blob.size <= EXPORT_TARGET_BYTES) {
      bestUnderLimit = file;
      low = quality;
    } else {
      high = quality;
    }
  }

  if (!bestUnderLimit) {
    const blob = await encodeCanvas(sourceCanvas, format.type, format.minQuality);
    if (blob) {
      const file = {
        blob,
        extension: format.extension,
        label: format.label,
        quality: format.minQuality,
      };
      if (!smallestFile || blob.size < smallestFile.blob.size) smallestFile = file;
      if (blob.size <= EXPORT_TARGET_BYTES) bestUnderLimit = file;
    }
  }

  return bestUnderLimit || smallestFile;
}

async function createEmergencyExport(canvas) {
  let smallestFile = null;

  for (const scale of DETAIL_LIMIT_SCALES) {
    const detailCanvas = createDetailLimitedCanvas(canvas, scale);
    for (const format of LOSSY_EXPORT_FORMATS) {
      const sourceCanvas =
        format.type === "image/jpeg" ? createOpaqueCanvas(detailCanvas) : detailCanvas;
      const blob = await encodeCanvas(sourceCanvas, format.type, format.minQuality);
      if (!blob) continue;

      const file = {
        blob,
        extension: format.extension,
        label: format.label,
        quality: format.minQuality,
      };

      if (!smallestFile || blob.size < smallestFile.blob.size) smallestFile = file;
      if (blob.size <= EXPORT_TARGET_BYTES) return file;
    }
  }

  return smallestFile;
}

async function renderExportCanvas(outputId, context = state) {
  const format = outputMeta[outputId];
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = format.width;
  exportCanvas.height = format.height;
  const ctx = exportCanvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  await drawOutput(outputId, exportCanvas, { context });
  return exportCanvas;
}

async function createExportFile(outputId, context = state) {
  const canvas = await renderExportCanvas(outputId, context);
  const pngBlob = await encodeCanvas(canvas, EXPORT_TYPE);
  const sizeLimited = SIZE_LIMITED_OUTPUTS.has(outputId);

  if (!sizeLimited) {
    if (!pngBlob) throw new Error("PNG export failed.");
    return {
      name: outputFileName(outputId),
      blob: pngBlob,
      label: "PNG",
      sizeLimited,
    };
  }

  if (pngBlob && pngBlob.size <= EXPORT_TARGET_BYTES) {
    return {
      name: outputFileName(outputId),
      blob: pngBlob,
      label: "PNG",
      sizeLimited,
    };
  }

  let smallestFile = pngBlob
    ? {
        name: outputFileName(outputId),
        blob: pngBlob,
        label: "PNG",
        sizeLimited,
      }
    : null;

  // Try shrinking by softening only the photo region and keeping the ribbon/logo/text
  // crisp, re-exporting as lossless PNG each time, before falling back to full JPEG.
  for (const quality of PHOTO_SOFTEN_QUALITIES) {
    const softCanvas = await renderPngWithSoftenedPhoto(outputId, quality, context);
    const softPngBlob = await encodeCanvas(softCanvas, EXPORT_TYPE);
    if (!softPngBlob) continue;

    const file = {
      name: outputFileName(outputId),
      blob: softPngBlob,
      label: "PNG",
      sizeLimited,
    };

    if (!smallestFile || file.blob.size < smallestFile.blob.size) smallestFile = file;
    if (file.blob.size <= EXPORT_TARGET_BYTES) return file;
  }

  for (const format of LOSSY_EXPORT_FORMATS) {
    const file = await createLossyExport(canvas, format);
    if (!file) continue;

    const namedFile = {
      ...file,
      name: outputFileNameWithExtension(outputId, file.extension),
      sizeLimited,
    };

    if (!smallestFile || namedFile.blob.size < smallestFile.blob.size) {
      smallestFile = namedFile;
    }

    if (namedFile.blob.size <= EXPORT_TARGET_BYTES) return namedFile;
  }

  const emergencyFile = await createEmergencyExport(canvas);
  if (emergencyFile) {
    const namedEmergencyFile = {
      ...emergencyFile,
      name: outputFileNameWithExtension(outputId, emergencyFile.extension),
      sizeLimited,
    };

    if (!smallestFile || namedEmergencyFile.blob.size < smallestFile.blob.size) {
      smallestFile = namedEmergencyFile;
    }

    if (namedEmergencyFile.blob.size <= EXPORT_TARGET_BYTES) return namedEmergencyFile;
  }

  if (smallestFile) return smallestFile;
  throw new Error("No export file was generated.");
}

async function downloadCanvas(outputId, context = state) {
  try {
    setStatus("Compressing");
    const file = await createExportFile(outputId, context);
    downloadBlob(file.blob, file.name);
    setStatus(
      !file.sizeLimited || file.blob.size <= EXPORT_MAX_BYTES
        ? `${file.label} ${formatFileSize(file.blob.size)}`
        : "Over 250 KB",
    );
  } catch (error) {
    console.error("Download failed", error);
    setStatus(error?.name === "SecurityError" ? "Use local server" : "Download failed");
    window.setTimeout(() => setStatus("Ready"), 1800);
  }
}

function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let i = 0; i < table.length; i += 1) {
    let value = i;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[i] = value >>> 0;
  }
  return table;
}

const crcTable = makeCrcTable();

function crc32(bytes) {
  let crc = 0xffffffff;
  bytes.forEach((byte) => {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  });
  return (crc ^ 0xffffffff) >>> 0;
}

function dateToDosTime(date) {
  const year = Math.max(1980, date.getFullYear());
  return {
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
  };
}

function zipHeader(size) {
  return new Uint8Array(size);
}

function writeZipHeader(bytes, values) {
  const view = new DataView(bytes.buffer);
  values.forEach(([offset, size, value]) => {
    if (size === 2) view.setUint16(offset, value, true);
    else view.setUint32(offset, value, true);
  });
}

async function createZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const { date, time } = dateToDosTime(new Date());

  for (const file of files) {
    const nameBytes = zipEncoder.encode(file.name);
    const data = new Uint8Array(await file.blob.arrayBuffer());
    const checksum = crc32(data);
    const localHeader = zipHeader(30 + nameBytes.length);

    writeZipHeader(localHeader, [
      [0, 4, 0x04034b50],
      [4, 2, 20],
      [6, 2, 0],
      [8, 2, 0],
      [10, 2, time],
      [12, 2, date],
      [14, 4, checksum],
      [18, 4, data.length],
      [22, 4, data.length],
      [26, 2, nameBytes.length],
      [28, 2, 0],
    ]);
    localHeader.set(nameBytes, 30);

    const centralHeader = zipHeader(46 + nameBytes.length);
    writeZipHeader(centralHeader, [
      [0, 4, 0x02014b50],
      [4, 2, 20],
      [6, 2, 20],
      [8, 2, 0],
      [10, 2, 0],
      [12, 2, time],
      [14, 2, date],
      [16, 4, checksum],
      [20, 4, data.length],
      [24, 4, data.length],
      [28, 2, nameBytes.length],
      [30, 2, 0],
      [32, 2, 0],
      [34, 2, 0],
      [36, 2, 0],
      [38, 4, 0],
      [42, 4, offset],
    ]);
    centralHeader.set(nameBytes, 46);

    localParts.push(localHeader, data);
    centralParts.push(centralHeader);
    offset += localHeader.length + data.length;
  }

  const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
  const endHeader = zipHeader(22);
  writeZipHeader(endHeader, [
    [0, 4, 0x06054b50],
    [4, 2, 0],
    [6, 2, 0],
    [8, 2, files.length],
    [10, 2, files.length],
    [12, 4, centralSize],
    [16, 4, offset],
    [20, 2, 0],
  ]);

  return new Blob([...localParts, ...centralParts, endHeader], {
    type: "application/zip",
  });
}

async function downloadAll() {
  const context = editingContext();
  const selected = editingOutputs();
  if (!selected.length) {
    setStatus("Select output");
    return;
  }

  els.downloadAllButton.disabled = true;
  const buttonLabel = els.downloadAllButton.textContent;
  els.downloadAllButton.textContent = "Preparing...";

  try {
    await renderPreviews();
    setStatus("Compressing assets");

    const files = [];
    for (const outputId of selected) {
      const file = await createExportFile(outputId, context);
      if (file?.blob) files.push(file);
    }

    if (!files.length) throw new Error("No files were generated.");

    const zip = await createZip(files);
    const zipName = activeRow
      ? `row-${bulkState.rows.indexOf(activeRow) + 1}-assets.zip`
      : "campaign-assets.zip";
    downloadBlob(zip, zipName);
    const hasOversizedFile = files.some(
      (file) => file.sizeLimited && file.blob.size > EXPORT_MAX_BYTES,
    );
    setStatus(hasOversizedFile ? "Some > 250 KB" : "Ready");
  } catch (error) {
    console.error("Download failed", error);
    const isSecurityError = error?.name === "SecurityError";
    setStatus(isSecurityError ? "Use local server" : "Download failed");
    window.setTimeout(() => setStatus("Ready"), 1800);
    return;
  } finally {
    els.downloadAllButton.disabled = false;
    els.downloadAllButton.textContent = buttonLabel;
  }

}

// ---------------------------------------------------------------------------
// Bulk generate from CSV
//
// This is a separate, self-contained workflow that borrows the existing
// single-image render pipeline (createExportFile / drawOutput / the main
// preview stage) rather than duplicating it. Template, KV color, toggles,
// and SKU background always stay whatever the sidebar currently has
// configured — those are shared and apply to every row. Brand logo, SKU
// image, KSP text, output selection, and SKU position/zoom are each row's
// own — clicking "Preview & edit" makes that row the active editing
// context (see `activeRow` above), so the exact same sidebar fields and
// main-stage preview cards used for the single brand become that row's
// editor until you click "Back to main editor".
// ---------------------------------------------------------------------------

const BULK_OUTPUT_IDS = Object.keys(outputMeta);
const BULK_DEFAULT_OUTPUTS = new Set(["category-banner", "banner-card"]);
const BULK_CSV_TEMPLATE =
  "KSP,Brand Logo,SKU Image\r\n" +
  "EXCLUSIVE LAUNCH DISKON 25%,https://cf.shopee.co.id/file/<brand-logo-hash>,https://cf.shopee.co.id/file/<sku-image-hash>\r\n";

const bulkState = {
  rows: [],
  defaultOutputs: new Set(BULK_DEFAULT_OUTPUTS),
};
let bulkRowSeq = 0;

// Minimal RFC4126-style CSV parser: handles quoted fields, embedded commas,
// escaped quotes ("") inside quoted fields, and CRLF/LF line endings.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') inQuotes = true;
    else if (char === ",") pushField();
    else if (char === "\n") pushRow();
    else if (char === "\r") {
      // Ignore; a following \n (if any) triggers the row push.
    } else field += char;
  }

  if (field.length > 0 || row.length > 0) pushRow();

  return rows.filter((cells) => cells.some((cell) => cell.trim() !== ""));
}

function findCsvColumn(header, patterns) {
  return header.findIndex((cell) =>
    patterns.some((pattern) => pattern.test(cell.trim().toLowerCase())),
  );
}

function mapCsvColumns(header) {
  return {
    ksp: findCsvColumn(header, [/^ksp$/, /ksp/]),
    brandLogo: findCsvColumn(header, [/^brand logo$/, /brand[\s_-]*logo/, /\blogo\b/]),
    skuImage: findCsvColumn(header, [/^sku image$/, /sku[\s_-]*image/, /\bsku\b/]),
  };
}

function createBulkRowsFromCsv(text) {
  const table = parseCsv(text);
  if (!table.length) return [];

  const detected = mapCsvColumns(table[0]);
  const headerRecognized = detected.ksp !== -1 || detected.brandLogo !== -1 || detected.skuImage !== -1;
  const columns = headerRecognized ? detected : { ksp: 0, brandLogo: 1, skuImage: 2 };
  const dataRows = headerRecognized ? table.slice(1) : table;

  return dataRows.map((cells) => {
    const kspRaw = (cells[columns.ksp] || "").trim();
    return {
      id: `bulk-row-${(bulkRowSeq += 1)}`,
      kspRaw,
      brandLogoRaw: (cells[columns.brandLogo] || "").trim(),
      skuImageRaw: (cells[columns.skuImage] || "").trim(),
      outputs: new Set(bulkState.defaultOutputs),
      status: "pending",
      statusLabel: "Ready",
      // Each row is its own self-contained editing context — same shape the
      // shared render pipeline expects from `state` — so a row can be
      // previewed/edited independently without touching the single editor.
      brandLogoUrl: "",
      brandLogoLabel: "",
      skuImageUrl: "",
      skuImageLabel: "",
      ksp: normalizedKsp(kspRaw),
      skuPositions: {},
      skuZooms: {},
      activeLayerByOutput: {},
      resolved: false,
      resolving: null,
      imagesFailed: false,
    };
  });
}

// Fetches a row's brand logo + SKU image exactly once, caching the result on
// the row itself. Safe to call repeatedly (e.g. every time a row expands) —
// concurrent calls share the same in-flight promise instead of re-fetching.
function ensureBulkRowResolved(row) {
  if (row.resolved) return Promise.resolve(row);
  if (row.resolving) return row.resolving;

  row.resolving = (async () => {
    try {
      const [brandLogoUrl, skuImageUrl] = await Promise.all([
        row.brandLogoRaw ? resolveBulkImage(row.brandLogoRaw) : Promise.resolve(""),
        row.skuImageRaw ? resolveBulkImage(row.skuImageRaw) : Promise.resolve(""),
      ]);
      row.brandLogoUrl = brandLogoUrl;
      row.brandLogoLabel = row.brandLogoRaw ? imageLabelFromSource(row.brandLogoRaw) : "";
      row.skuImageUrl = skuImageUrl;
      row.skuImageLabel = row.skuImageRaw ? imageLabelFromSource(row.skuImageRaw) : "";
      row.resolved = true;
      row.imagesFailed = false;
      return row;
    } catch (error) {
      console.error("Bulk row image load failed", row, error);
      row.imagesFailed = true;
      throw error;
    } finally {
      row.resolving = null;
    }
  })();

  return row.resolving;
}

// Releases any blob URLs a row is holding onto. Call this when a row is
// removed or the whole CSV is replaced — not after every generate — since
// rows now cache their resolved images across preview + generate.
function releaseBulkRowImages(row) {
  [row.brandLogoUrl, row.skuImageUrl].forEach((url) => {
    if (url?.startsWith("blob:")) {
      imageCache.delete(url);
      URL.revokeObjectURL(url);
    }
  });
}

async function resolveBulkImage(rawValue) {
  const candidates = getImageCandidates(rawValue);
  if (!candidates.length) return "";

  let lastError = null;
  for (const candidate of candidates) {
    try {
      return await fetchImageObjectUrl(candidate);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Image could not be loaded.");
}

function setBulkRowStatus(row, label, kind) {
  row.statusLabel = label;
  row.status = kind;
  const statusEl = els.bulkRows.querySelector(`[data-row-status="${row.id}"]`);
  if (!statusEl) return;
  statusEl.textContent = label;
  statusEl.classList.toggle("is-done", kind === "done");
  statusEl.classList.toggle("is-error", kind === "error");
}

function renderBulkSummary() {
  const totalAssets = bulkState.rows.reduce((sum, row) => sum + row.outputs.size, 0);
  els.bulkSummary.textContent = bulkState.rows.length
    ? `${bulkState.rows.length} row${bulkState.rows.length === 1 ? "" : "s"} × mixed outputs → ${totalAssets} asset${totalAssets === 1 ? "" : "s"}`
    : "";
  els.bulkGenerateButton.disabled = !bulkState.rows.length || totalAssets === 0;
}

function createBulkRowElement(row, index) {
  const el = document.createElement("div");
  el.className = "bulk-row";
  el.dataset.rowId = row.id;
  const isActive = activeRow === row;
  el.classList.toggle("is-editing", isActive);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "bulk-row-remove";
  remove.setAttribute("aria-label", `Remove row ${index + 1}`);
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    if (activeRow === row) exitRowEditing();
    releaseBulkRowImages(row);
    bulkState.rows = bulkState.rows.filter((candidate) => candidate.id !== row.id);
    renderBulkRows();
  });

  const main = document.createElement("div");
  main.className = "bulk-row-main";
  const title = document.createElement("div");
  title.className = "bulk-row-title";
  title.textContent = `Row ${index + 1}`;
  const ksp = document.createElement("div");
  ksp.className = "bulk-row-ksp";
  ksp.textContent = row.kspRaw || "(no KSP text)";
  main.append(title, ksp);

  const outputsRow = document.createElement("div");
  outputsRow.className = "chip-row bulk-row-outputs";
  BULK_OUTPUT_IDS.forEach((outputId) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip-button sm";
    chip.dataset.output = outputId;
    chip.textContent = outputMeta[outputId].title;
    chip.classList.toggle("is-active", row.outputs.has(outputId));
    chip.addEventListener("click", () => {
      if (row.outputs.has(outputId)) row.outputs.delete(outputId);
      else row.outputs.add(outputId);
      chip.classList.toggle("is-active", row.outputs.has(outputId));
      renderBulkSummary();
      if (activeRow === row) {
        syncOutputButtons();
        renderPreviews();
      }
    });
    outputsRow.append(chip);
  });

  const status = document.createElement("span");
  status.className = "bulk-row-status";
  status.textContent = row.statusLabel;
  status.dataset.rowStatus = row.id;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "bulk-row-toggle";
  toggle.textContent = isActive ? "Editing…" : "Preview & edit";
  toggle.setAttribute("aria-pressed", String(isActive));
  toggle.addEventListener("click", () => {
    if (isActive) exitRowEditing();
    else enterRowEditing(row);
  });

  el.append(remove, main, outputsRow, status, toggle);
  return el;
}

// Makes a bulk row the thing the main editor (sidebar fields + preview
// stage) is currently pointed at, reusing that exact same UI instead of a
// separate/simplified editor. Resolves the row's images first (cached after
// the first time), then hands the shared render pipeline the row instead
// of `state`.
async function enterRowEditing(row) {
  els.bulkRows.querySelectorAll(".bulk-row-toggle").forEach((button) => {
    button.disabled = true;
  });
  setStatus("Loading row images...");

  try {
    await ensureBulkRowResolved(row);
  } catch (error) {
    setBulkRowStatus(row, "Image failed", "error");
    setStatus("Image load failed");
    window.setTimeout(() => setStatus("Ready"), 2200);
    els.bulkRows.querySelectorAll(".bulk-row-toggle").forEach((button) => {
      button.disabled = false;
    });
    return;
  }

  activeRow = row;
  syncEditorFieldsFromContext();
  renderStageBanner();
  await renderPreviews();
  renderBulkRows();
}

function exitRowEditing() {
  activeRow = null;
  syncEditorFieldsFromContext();
  renderStageBanner();
  renderPreviews();
  renderBulkRows();
}

function renderStageBanner() {
  if (!els.stageBanner) return;
  if (!activeRow) {
    els.stageBanner.hidden = true;
    return;
  }
  const rowNumber = bulkState.rows.indexOf(activeRow) + 1;
  els.stageBannerText.textContent = rowNumber
    ? `Editing Row ${rowNumber}${activeRow.kspRaw ? ` — ${activeRow.kspRaw}` : ""}`
    : "Editing bulk row";
  els.stageBanner.hidden = false;
}

function renderBulkRows() {
  els.bulkRows.innerHTML = "";
  bulkState.rows.forEach((row, index) => {
    els.bulkRows.append(createBulkRowElement(row, index));
  });
  els.bulkPanel.classList.toggle("has-rows", bulkState.rows.length > 0);
  renderBulkSummary();
}

async function generateBulk() {
  const rowsToRun = bulkState.rows.filter((row) => row.outputs.size > 0);
  if (!rowsToRun.length) {
    setStatus("Add outputs to at least one row");
    window.setTimeout(() => setStatus("Ready"), 1800);
    return;
  }

  els.bulkGenerateButton.disabled = true;
  const originalLabel = els.bulkGenerateButton.textContent;
  els.bulkGenerateButton.textContent = "Generating...";

  // Each row is already its own self-contained editing context (brand
  // logo, SKU image, KSP, positions, zooms), so generation just calls the
  // shared export pipeline once per row/output — no borrowing or restoring
  // the single-image editor's `state`, and no disturbance to its preview.
  const files = [];
  let failed = 0;

  try {
    for (let index = 0; index < rowsToRun.length; index += 1) {
      const row = rowsToRun[index];
      setStatus(`Bulk row ${index + 1} of ${rowsToRun.length}`);

      try {
        await ensureBulkRowResolved(row);
      } catch (error) {
        setBulkRowStatus(row, "Image failed", "error");
        failed += 1;
        continue;
      }

      setBulkRowStatus(row, "Generating...", "pending");

      const rowFolder = `row-${bulkState.rows.indexOf(row) + 1}`;
      let rowFailed = false;
      for (const outputId of row.outputs) {
        try {
          const file = await createExportFile(outputId, row);
          files.push({ ...file, name: `${rowFolder}/${file.name}` });
        } catch (error) {
          console.error("Bulk export failed", row, outputId, error);
          rowFailed = true;
        }
      }

      if (rowFailed) {
        failed += 1;
        setBulkRowStatus(row, "Partial failure", "error");
      } else {
        setBulkRowStatus(row, "Done", "done");
      }
    }

    if (!files.length) throw new Error("No assets were generated.");

    const zip = await createZip(files);
    downloadBlob(zip, "bulk-campaign-assets.zip");
    setStatus(failed ? `Done — ${failed} row(s) failed` : "Bulk generate done");
    window.setTimeout(() => setStatus("Ready"), 2400);
  } catch (error) {
    console.error("Bulk generate failed", error);
    setStatus("Bulk generate failed");
    window.setTimeout(() => setStatus("Ready"), 2400);
  } finally {
    els.bulkGenerateButton.disabled = false;
    els.bulkGenerateButton.textContent = originalLabel;
    renderBulkSummary();
  }
}

els.templateSelect.addEventListener("change", (event) => {
  state.template = event.target.value;
  renderPreviews();
});

els.brandLogoInput.addEventListener("change", () => {
  readFile(els.brandLogoInput, "brandLogoUrl", "brandLogoLabel", els.brandFileName);
});

els.logoContainerToggle.addEventListener("change", (event) => {
  state.hideLogoContainer = event.target.checked;
  renderPreviews();
});

els.shopeeLogoToggle.addEventListener("change", (event) => {
  state.useOrangeShopeeLogo = event.target.checked;
  renderPreviews();
});

els.skuImageInput.addEventListener("change", () => {
  readFile(els.skuImageInput, "skuImageUrl", "skuImageLabel", els.skuFileName);
});

els.skuLink.addEventListener("input", (event) => {
  state.skuLink = event.target.value;
});

els.skuLink.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  loadSkuImageFromInput();
});

els.loadSkuLinkButton.addEventListener("click", loadSkuImageFromInput);

function renderBackgroundPicker() {
  const hasBg = hasSkuBackground();
  if (els.bgSwatch) {
    els.bgSwatch.style.backgroundImage = hasBg ? `url("${getSkuBackgroundSrc()}")` : "";
    els.bgSwatch.classList.toggle("is-empty", !hasBg);
  }
  if (els.bgName) els.bgName.textContent = getSkuBackgroundLabel();
  if (els.bgCount) {
    els.bgCount.textContent = hasBg ? `${state.skuBackgroundIndex + 1}/${SKU_BACKGROUNDS.length}` : "";
  }
}

els.bgPrevButton?.addEventListener("click", () => {
  cycleSkuBackground(-1);
  renderBackgroundPicker();
  renderPreviews();
});

els.bgNextButton?.addEventListener("click", () => {
  cycleSkuBackground(1);
  renderBackgroundPicker();
  renderPreviews();
});

els.kspInput.addEventListener("input", (event) => {
  const value = normalizedKsp(event.target.value);
  if (value !== event.target.value) event.target.value = value;
  const context = editingContext();
  context.ksp = value;
  if (activeRow) {
    activeRow.kspRaw = value;
    renderBulkRows();
  }
  syncKspCount();
  renderPreviews();
});

els.kspColorInput.addEventListener("input", (event) => {
  setKspColor(event.target.value);
});

els.kspColorHex.addEventListener("input", (event) => {
  const value = event.target.value.startsWith("#")
    ? event.target.value
    : `#${event.target.value}`;
  if (isHex(value)) setKspColor(value);
});

els.nativeColor.addEventListener("input", (event) => {
  setColor(event.target.value);
});

els.hexInput.addEventListener("input", (event) => {
  const value = event.target.value.startsWith("#")
    ? event.target.value
    : `#${event.target.value}`;
  if (isHex(value)) setColor(value);
});

els.hueRange.addEventListener("input", (event) => {
  state.hue = Number(event.target.value);
  const nextColor = rgbToHex(hsvToRgb(state.hue, state.saturation, state.value));
  setColor(nextColor, false);
});

els.colorCanvas.addEventListener("pointerdown", (event) => {
  els.colorCanvas.setPointerCapture(event.pointerId);
  updateColorFromCanvas(event);
});

els.colorCanvas.addEventListener("pointermove", (event) => {
  if (event.buttons !== 1) return;
  updateColorFromCanvas(event);
});

window.addEventListener("resize", drawColorCanvas);

els.outputButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-output]");
  if (!button) return;

  const { output } = button.dataset;
  const outputs = editingContext().outputs;
  if (outputs.has(output)) outputs.delete(output);
  else outputs.add(output);

  syncOutputButtons();
  renderPreviews();
  if (activeRow) renderBulkRows();
});

els.generateButton.addEventListener("click", () => {
  els.previewList.classList.remove("is-rendering");
  void els.previewList.offsetWidth;
  els.previewList.classList.add("is-rendering");
  renderPreviews();
});

els.downloadAllButton.addEventListener("click", downloadAll);

els.bulkDefaultOutputs.querySelectorAll("button[data-output]").forEach((button) => {
  button.classList.toggle("is-active", bulkState.defaultOutputs.has(button.dataset.output));
  button.addEventListener("click", () => {
    const { output } = button.dataset;
    if (bulkState.defaultOutputs.has(output)) bulkState.defaultOutputs.delete(output);
    else bulkState.defaultOutputs.add(output);
    button.classList.toggle("is-active", bulkState.defaultOutputs.has(output));
  });
});

els.bulkCsvInput.addEventListener("change", async () => {
  const [file] = els.bulkCsvInput.files;
  if (!file) return;

  try {
    const text = await file.text();
    const newRows = createBulkRowsFromCsv(text);
    if (!newRows.length) {
      setStatus("No rows found in CSV");
      window.setTimeout(() => setStatus("Ready"), 1800);
      return;
    }

    const wasEditingRow = Boolean(activeRow);
    bulkState.rows.forEach(releaseBulkRowImages);
    bulkState.rows = newRows;
    activeRow = null;
    if (wasEditingRow) {
      syncEditorFieldsFromContext();
      renderStageBanner();
      renderPreviews();
    }
    els.bulkCsvFileName.textContent = titleCaseFileName(file.name);
    els.bulkPanel.open = true;
    renderBulkRows();
    setStatus(`${newRows.length} row${newRows.length === 1 ? "" : "s"} loaded`);
    window.setTimeout(() => setStatus("Ready"), 1800);
  } catch (error) {
    console.error("CSV read failed", error);
    setStatus("CSV read failed");
    window.setTimeout(() => setStatus("Ready"), 1800);
  } finally {
    els.bulkCsvInput.value = "";
  }
});

els.bulkTemplateButton.addEventListener("click", () => {
  const blob = new Blob([BULK_CSV_TEMPLATE], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, "bulk-generate-template.csv");
});

els.bulkGenerateButton.addEventListener("click", generateBulk);

els.stageBannerExit?.addEventListener("click", exitRowEditing);

const THEME_STORAGE_KEY = "shopeeMallTheme";

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors (e.g. private browsing).
  }
}

function applyTheme(isLight) {
  if (isLight) document.documentElement.setAttribute("data-theme", "light");
  else document.documentElement.removeAttribute("data-theme");
  if (!els.themeToggle) return;
  els.themeToggle.setAttribute("aria-pressed", String(isLight));
  els.themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode",
  );
}

function initTheme() {
  // Dark is the default; only an explicit "light" preference switches it off.
  applyTheme(getStoredTheme() === "light");
}

els.themeToggle?.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") !== "light";
  applyTheme(isLight);
  setStoredTheme(isLight ? "light" : "dark");
});

renderSwatches();
syncOutputButtons();
syncKspCount();
drawColorCanvas();
setKspColor(state.kspColor);
setColor(state.kvColor);
renderBackgroundPicker();
renderBulkRows();
initTheme();
