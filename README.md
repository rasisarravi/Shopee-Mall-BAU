# Shopee Campaign Creative Tool

A static campaign asset generator for Shopee creative formats. The tool runs fully in the browser with HTML, CSS, and JavaScript only.

## What Is Included

- `index.html` as the entry point
- `styles.css` for the interface
- `script.js` for preview rendering and size-safe downloads
- `assets/fonts/` for ShopeeFont
- `assets/overlays/` for fixed output overlays
- `assets/logos/` for Shopee Mall logo references
- `assets/template-guides/` for layout references

No backend, database, or build step is required.

## GitHub Pages Deployment

1. Create a new GitHub repository.
2. Upload these files and folders to the repository root:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/`
   - `README.md`
3. Open the repository settings.
4. Go to **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/root` folder.
7. Save the settings.

GitHub will publish the tool at:

```text
https://your-username.github.io/your-repository-name/
```

## Local Preview

For the best local test, run a static server from this folder and open the printed local URL:

```bash
python3 -m http.server 5173
```

Opening `index.html` directly from the file system may block canvas image export in some browsers. GitHub Pages serves the files over HTTPS, so downloads work there without a backend.

## Notes

- All asset paths are relative.
- `Undo` / `Redo` (also `Ctrl/Cmd+Z` and `Ctrl/Cmd+Shift+Z`, or `Ctrl+Y`) step back and forward through edits — color picks, toggles, template swaps, image uploads, Remove Background runs, Touch Up saves, and each drag or slider adjustment (one whole drag or slider movement counts as a single step, not one per pixel/tick). The single editor and whichever bulk row you're previewing/editing each keep their own separate undo history.
- The default `KV Color` is Shopee orange (`#EE4D2D`); change it anytime with the color picker, hex field, or swatches.
- Template options are `Mall BAU`, `Mall BAU New Arrival`, and `8.8 Paying Seller`.
- `8.8 Paying Seller` only has artwork for Category Banner and Banner Card — the other three output buttons are disabled while it's selected (and auto-deselected if they were already picked). Its background is a fixed campaign image rather than a flat color, so the `KV Color` picker is disabled and has no effect on this template. Brand Logo, SKU Image, and KSP editing work exactly the same as the other templates.
- Turn on `Hide white logo container` to use the no-container Template 2 overlays.
- By default, the "NEW ARRIVAL" badge (Mall BAU New Arrival template) and the Shopee icon (IG Story & FB Post only) show their colored/branded versions. Turn on `Inverse Logo` if your KV color is light to switch both to plain white instead — it also switches the "Shopee Mall | 100% ORI" tag to a plain white-friendly version on Banner Card & IG Story only (its default red-pill version is unaffected when the toggle is off).
- Turn off `Shopee Mall Logo` to remove the "Shopee Mall | 100% ORI" tag from every output (Mall BAU and Mall BAU New Arrival only — 8.8 Paying Seller's tag is part of its fixed campaign background image and isn't affected by this toggle).
- Enter an image hash or image link, then click `Load Image` to place that image into the SKU area.
- Click `Remove Background` to cut the current SKU photo out from its background, right inside the tool. This runs entirely in your browser (in-browser AI model, via [`@imgly/background-removal`](https://github.com/imgly/background-removal-js)) — the image is never uploaded anywhere. The first use on a given device downloads a one-time ~80MB model (cached afterward by the browser, so later uses are fast). A cleanup pass runs automatically on the result: white or bright areas on the product itself — reflections, glossy spots, or a product's own plain white packaging (like the unprinted plastic edge of a pouch/sachet) — are kept as long as they're attached to the product and their color doesn't actually match the photo's real backdrop, instead of being mistaken for background (this holds even when the AI model itself was confidently wrong about that area); small fully-enclosed gaps inside the product are filled in; the cutout edge gets a light feather instead of a hard jagged line; and only one connected piece is kept, preferring whichever piece covers the most area in the middle of the image (since the product is normally centered there) over a merely bigger stray leftover elsewhere — so a second product, promotional photo, or leftover text the model failed to remove gets discarded automatically. The product itself is never cropped by this cleanup. Since this cleanup step re-runs on whatever the SKU image looks like right now, using `Touch Up` to erase a secondary product or distracting element first, then running `Remove Background` afterward, works as expected — anything already erased stays erased and can't come back during cleanup, even if the model itself gets confused by it. Quality is good for typical product photos but can still be rougher than remove.bg on very fine detail (hair, semi-transparent edges), and on busy multi-subject graphics (ads, banners with several photos) rather than a single centered product shot; use `Touch Up` afterward to clean those up by hand.
- Click `Touch Up` to manually fix the SKU image with an Erase/Restore brush — handy for leftover background bits Remove Background missed, or for correcting a spot where it cut too far into the product. Erase clears pixels to transparent; Restore paints pixels back from the original image, before any Remove Background or Touch Up edits — so it can bring back area Remove Background cut away entirely, not just spots that were left translucent. Adjust brush size with the slider, switch the canvas backdrop between `Checker` / `Light` / `Dark` to make it easier to spot bits that didn't crop cleanly, `Reset` reverts every edit made in that session, and nothing is applied until you click `Save`. Since every output format shares the same underlying SKU image, a save updates all of them at once.
- Uploaded SKU images can be repositioned by dragging them inside each preview.
- SKU images can be zoomed per output from the preview controls.
- Pick a `SKU Background` scene from the thumbnail grid (or `None`). The chosen background applies to every output format, but its position/zoom is adjusted per format since box sizes differ.
- The background only shows through a transparent-background SKU photo (e.g. a background-removed PNG). A fully opaque SKU photo (e.g. a plain JPG) will simply cover it, so the background feature is optional either way.
- When `SKU Background` is set to `None`, the `Background Color` picker (hex or color swatch) controls the flat fill behind the product area instead. It's only active while `None` is selected — pick a scene and this color has no effect, since the scene covers that area completely.
- Each preview card has a `Logo / KSP / SKU / BG` switch (the `BG` option only appears once a background scene is selected) that picks what the slider — and canvas drag — below it controls, per output format:
  - `Logo`: zoom only, no drag — the brand logo always stays centered in its box; zooming in crops closer, zooming out shrinks it, same rounded-rect box either way.
  - `KSP`: a font-size slider instead of a zoom percentage, plus the ability to drag the KSP box up or down directly on the canvas (horizontal position always stays centered — you can't drag it left or right). By default the KSP text auto-shrinks to fit its box; dragging the slider takes manual control of the exact size for that output, which is the way to force where the text wraps — for example, making sure two distinct phrases land on two separate lines instead of auto-fit choosing a different break point. Range is that output format's own designed min/max size.
  - `SKU` / `BG`: unchanged — drag to reposition, slider to zoom.
- The KSP input is limited to 50 characters.
- KSP text color can be changed with the color picker or hex field.
- The output formats are Category Banner, Top Module Banner, IG Story, FB Post, and Banner Card.
- Category Banner, Top Module Banner, and Banner Card are compressed to stay under 250 KB when possible.
- IG Story and FB Post export as full-size PNG because they are not internal-platform assets.
- For size-limited outputs, the app keeps PNG when it is already under the limit. Heavier photo-based assets are automatically exported as JPG (quality reduced, then resolution reduced if needed) to keep the file size below 250 KB. WebP is never used since the downstream internal system only supports PNG and JPG.
- The app can download a single asset or a ZIP containing all selected outputs.

## Bulk Generate From CSV

The `Bulk generate from CSV` panel above the main editor batch-creates assets for many brands at once, without touching the single-image editor below it.

- Click `Download template` for a starter CSV. Columns are `KSP`, `Brand Logo`, `SKU Image`. Brand Logo and SKU Image accept either a Shopee image hash or a direct image link, same as the `Image Hash / Image Link` field in the single editor.
- After uploading, each row defaults to whatever is selected under `Default outputs for new rows` (Category Banner and Banner Card, out of the box, to keep batch runs fast). Every row's output selection can be overridden individually with its own chips.
- Click `Preview & edit` on a row to load that row into the main editor — the exact same sidebar (Template, Brand Logo, Logo Color, SKU Image, SKU Background, KSP, KV Color, output selection) and preview stage used for a single brand, not a separate simplified view. Fetching the row's logo/SKU happens once and is cached, so reopening a row is instant. A banner above the preview stage shows which row you're editing, with a `Back to main editor` button to return to the single-brand editor. Only one row can be open at a time; opening another row closes the previous one.
- Every row is fully independent: Template, KV Color, KSP Text Color, the Logo Color / Hide-container toggles, SKU Background, Brand Logo, SKU Image, KSP text, output selection, and each output's drag position/zoom/logo-zoom/KSP-font-size can all differ per row. New rows start as a copy of whatever the sidebar currently has, then become that row's own settings once you preview/edit it — so ten different brands can have ten different KV colors, text colors, templates, or backgrounds, and each result reflects that row's own configuration.
- `Remove Background` and `Touch Up` both work the same way while previewing a row — they only affect that row's SKU image.
- If a row's template is `8.8 Paying Seller`, that row's output chips are limited to Category Banner and Banner Card (the other three are disabled), same as the single editor.
- `Generate all` uses each row's own settings and keeps any edits made while previewing it. Rows that were never opened export with their default centered framing and whatever settings they started with.
- Rows with a blank cell simply skip that field (no logo, or no SKU image, for that row). Rows whose image fails to load are marked and skipped; the rest of the batch still completes.
- Results download as one flat ZIP — every file is prefixed `row-1-`, `row-2-`, ... instead of being nested in a subfolder per brand.
