const DEFAULT_SKU_IMAGE = "";
const FONT_NAME = "ShopeeFontBlack";
const FONT_URL = "assets/fonts/shopee-font-black.ttf";
const OVERLAY_BASE = "assets/overlays/";
const EXPORT_MAX_BYTES = 250 * 1024;
const EXPORT_TYPE = "image/png";
const EXPORT_EXTENSION = "png";

const outputMeta = {
  "category-banner": {
    title: "Category Banner",
    width: 1200,
    height: 360,
    overlay: `${OVERLAY_BASE}category-banner.png`,
  },
  "top-module-banner": {
    title: "Top Module Banner",
    width: 1125,
    height: 156,
    overlay: `${OVERLAY_BASE}top-module-banner.png`,
  },
  "ig-story": {
    title: "IG Story",
    width: 1080,
    height: 1920,
    overlay: `${OVERLAY_BASE}ig-story.png`,
  },
  "fb-post": {
    title: "FB Post",
    width: 1200,
    height: 630,
    overlay: `${OVERLAY_BASE}fb-post.png`,
  },
  "banner-card": {
    title: "Banner Card",
    width: 531,
    height: 792,
    overlay: `${OVERLAY_BASE}banner-card.png`,
  },
};

const state = {
  template: "Mall BAU",
  brandLogoUrl: "",
  skuImageUrl: DEFAULT_SKU_IMAGE,
  skuLink: "",
  ksp: "EXCLUSIVE LAUNCH DISKON 25%",
  kvColor: "#315F55",
  outputs: new Set(Object.keys(outputMeta)),
  hue: 166,
  saturation: 0.48,
  value: 0.37,
};

const els = {
  templateSelect: document.querySelector("#templateSelect"),
  templateLabel: document.querySelector("#templateLabel"),
  brandLogoInput: document.querySelector("#brandLogoInput"),
  brandFileName: document.querySelector("#brandFileName"),
  skuImageInput: document.querySelector("#skuImageInput"),
  skuFileName: document.querySelector("#skuFileName"),
  skuLink: document.querySelector("#skuLink"),
  kspInput: document.querySelector("#kspInput"),
  kspCount: document.querySelector("#kspCount"),
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
  return value.toUpperCase().slice(0, 31);
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
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

  imageCache.set(src, promise);
  return promise;
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

function drawCover(ctx, image, x, y, width, height, alignX = 0.5, alignY = 0.5) {
  if (!image) return;
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const dx = x + (width - drawWidth) * alignX;
  const dy = y + (height - drawHeight) * alignY;
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

function wrapText(ctx, text, maxWidth) {
  const words = text.trim().split(/\s+/);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !current) {
      current = next;
    } else {
      lines.push(current);
      current = word;
    }
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
    minSize = 24,
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

function drawBrandCard(ctx, image, box) {
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  roundRect(ctx, box.x, box.y, box.width, box.height, box.radius);
  ctx.fill();
  roundRect(ctx, box.x, box.y, box.width, box.height, box.radius);
  ctx.clip();

  if (image) {
    drawContainTrimmed(
      ctx,
      image,
      box.x + box.width * 0.06,
      box.y + box.height * 0.1,
      box.width * 0.88,
      box.height * 0.8,
    );
  } else {
    drawFallbackBrand(ctx, box);
  }

  ctx.restore();
}

function getLayout(format) {
  const { width: w, height: h } = format;

  if (format.title === "Top Module Banner") {
    return {
      kv: { x: 0, y: 0, width: 720, height: h },
      product: { x: 720, y: 0, width: w - 720, height: h },
      logo: { x: 35.749, y: 35.248, width: 257.201, height: 85.504, radius: 15.199 },
      ksp: { x: 346, y: 28, width: 330, height: 100, maxSize: 58.67, minSize: 30 },
      productAlign: [0.5, 0.62],
    };
  }

  if (format.title === "Category Banner") {
    return {
      kv: { x: 0, y: 0, width: 500, height: h },
      product: { x: 500, y: 0, width: w - 500, height: h },
      logo: { x: 88.3, y: 78.903, width: 322.668, height: 107.268, radius: 19.068 },
      ksp: { x: 38, y: 202, width: 424, height: 120, maxSize: 58.67, minSize: 34 },
      productAlign: [0.62, 0.58],
    };
  }

  if (format.title === "IG Story") {
    return {
      kv: { x: 0, y: 0, width: w, height: 850 },
      product: { x: 0, y: 850, width: w, height: h - 850 },
      logo: { x: 255.742, y: 380.519, width: 568.516, height: 188.998, radius: 33.596 },
      ksp: { x: 180, y: 615, width: 720, height: 190, maxSize: 58.67, minSize: 36 },
      productAlign: [0.5, 0.45],
    };
  }

  if (format.title === "FB Post") {
    return {
      kv: { x: 0, y: 0, width: 607, height: h },
      product: { x: 607, y: 0, width: w - 607, height: h },
      logo: { x: 119.976, y: 196.548, width: 342.137, height: 144.934, radius: 23.803 },
      ksp: { x: 120, y: 394, width: 344, height: 150, maxSize: 58.67, minSize: 36 },
      productAlign: [0.56, 0.55],
    };
  }

  return {
    kv: { x: 0, y: 0, width: w, height: 414 },
    product: { x: 0, y: 414, width: w, height: h - 414 },
    logo: { x: 114.998, y: 91.451, width: 301.003, height: 100.066, radius: 17.787 },
    ksp: { x: 70, y: 239, width: 392, height: 128, maxSize: 58.67, minSize: 34 },
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

async function drawOutput(outputId, canvas, options = {}) {
  const { scale = 1 } = options;
  const format = outputMeta[outputId];
  const ctx = canvas.getContext("2d");
  canvas.width = Math.round(format.width * scale);
  canvas.height = Math.round(format.height * scale);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  await ensureFont();

  const [brandLogo, skuImage, overlay] = await Promise.all([
    loadImage(state.brandLogoUrl),
    loadImage(state.skuImageUrl),
    loadImage(format.overlay),
  ]);

  ctx.clearRect(0, 0, format.width, format.height);
  const layout = drawBackground(ctx, format);

  ctx.save();
  ctx.beginPath();
  ctx.rect(layout.product.x, layout.product.y, layout.product.width, layout.product.height);
  ctx.clip();
  drawCover(
    ctx,
    skuImage,
    layout.product.x,
    layout.product.y,
    layout.product.width,
    layout.product.height,
    layout.productAlign[0],
    layout.productAlign[1],
  );
  ctx.restore();

  // The overlay contains fixed elements from the working file, including the ribbon.
  drawStretch(ctx, overlay, 0, 0, format.width, format.height);
  drawBrandCard(ctx, brandLogo, layout.logo);
  drawFittedText(ctx, state.ksp, layout.ksp, {
    maxSize: layout.ksp.maxSize,
    minSize: layout.ksp.minSize,
  });
}

function createPreviewBlock(outputId) {
  const format = outputMeta[outputId];
  const block = document.createElement("section");
  block.className = "preview-block";

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

  const download = document.createElement("button");
  download.type = "button";
  download.className = "download-button";
  download.textContent = "Download PNG";
  download.addEventListener("click", () => downloadCanvas(outputId));

  heading.append(titleWrap, download);

  const shell = document.createElement("div");
  shell.className = "canvas-shell";
  const canvas = document.createElement("canvas");
  canvas.className = "asset-canvas";
  canvas.dataset.output = outputId;
  canvas.setAttribute("aria-label", `${format.title} preview`);
  shell.append(canvas);

  block.append(heading, shell);
  return { block, canvas };
}

async function renderPreviews() {
  const currentVersion = ++renderVersion;
  els.previewList.innerHTML = "";
  document.documentElement.style.setProperty("--kv", state.kvColor);
  els.templateLabel.textContent = state.template;

  const selected = selectedOutputs();

  if (!selected.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Select at least one output to preview.";
    els.previewList.append(empty);
    return;
  }

  setStatus("Rendering");
  const jobs = selected.map((outputId) => {
    const { block, canvas } = createPreviewBlock(outputId);
    els.previewList.append(block);
    return drawOutput(outputId, canvas);
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

function readFile(input, key, label) {
  const [file] = input.files;
  if (!file) return;

  if (state[key]?.startsWith("blob:")) {
    imageCache.delete(state[key]);
    URL.revokeObjectURL(state[key]);
  }

  state[key] = URL.createObjectURL(file);
  label.textContent = titleCaseFileName(file.name);
  renderPreviews();
}

function syncOutputButtons() {
  els.outputButtons.querySelectorAll("button").forEach((button) => {
    const isSelected = state.outputs.has(button.dataset.output);
    button.setAttribute("aria-selected", String(isSelected));
  });
}

function syncKspCount() {
  els.kspCount.textContent = `${state.ksp.length}/31`;
}

function selectedOutputs() {
  return Object.keys(outputMeta).filter((output) => state.outputs.has(output));
}

function outputFileName(outputId) {
  const format = outputMeta[outputId];
  return `${format.title.replace(/\s+/g, "-").toLowerCase()}-${format.width}x${format.height}.${EXPORT_EXTENSION}`;
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

function canvasToBlob(canvas, type = EXPORT_TYPE) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas export returned an empty file."));
      }, type);
    } catch (error) {
      reject(error);
    }
  });
}

async function renderExportCanvas(outputId) {
  const format = outputMeta[outputId];
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = format.width;
  exportCanvas.height = format.height;
  const ctx = exportCanvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  await drawOutput(outputId, exportCanvas);
  return exportCanvas;
}

async function createExportBlob(outputId) {
  const canvas = await renderExportCanvas(outputId);
  return canvasToBlob(canvas, EXPORT_TYPE);
}

async function downloadCanvas(outputId) {
  try {
    setStatus("Exporting PNG");
    const blob = await createExportBlob(outputId);
    downloadBlob(blob, outputFileName(outputId));
    setStatus(blob.size <= EXPORT_MAX_BYTES ? "Ready" : "Over 250 KB");
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
  const selected = selectedOutputs();
  if (!selected.length) {
    setStatus("Select output");
    return;
  }

  els.downloadAllButton.disabled = true;
  const buttonLabel = els.downloadAllButton.textContent;
  els.downloadAllButton.textContent = "Preparing...";

  try {
    await renderPreviews();
    setStatus("Exporting PNGs");

    const files = [];
    for (const outputId of selected) {
      const blob = await createExportBlob(outputId);
      if (blob) files.push({ name: outputFileName(outputId), blob });
    }

    if (!files.length) throw new Error("No PNG files were generated.");

    const zip = await createZip(files);
    downloadBlob(zip, "campaign-assets.zip");
    const hasOversizedFile = files.some((file) => file.blob.size > EXPORT_MAX_BYTES);
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

els.templateSelect.addEventListener("change", (event) => {
  state.template = event.target.value;
  renderPreviews();
});

els.brandLogoInput.addEventListener("change", () => {
  readFile(els.brandLogoInput, "brandLogoUrl", els.brandFileName);
});

els.skuImageInput.addEventListener("change", () => {
  readFile(els.skuImageInput, "skuImageUrl", els.skuFileName);
});

els.skuLink.addEventListener("input", (event) => {
  state.skuLink = event.target.value;
});

els.kspInput.addEventListener("input", (event) => {
  const value = normalizedKsp(event.target.value);
  if (value !== event.target.value) event.target.value = value;
  state.ksp = value;
  syncKspCount();
  renderPreviews();
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
  if (state.outputs.has(output)) state.outputs.delete(output);
  else state.outputs.add(output);

  syncOutputButtons();
  renderPreviews();
});

els.generateButton.addEventListener("click", () => {
  els.previewList.classList.remove("is-rendering");
  void els.previewList.offsetWidth;
  els.previewList.classList.add("is-rendering");
  renderPreviews();
});

els.downloadAllButton.addEventListener("click", downloadAll);

renderSwatches();
syncOutputButtons();
syncKspCount();
drawColorCanvas();
setColor(state.kvColor);
