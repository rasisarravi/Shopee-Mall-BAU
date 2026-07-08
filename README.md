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
- Template options are `Mall BAU` and `Mall BAU New Arrival`.
- Turn on `Hide white logo container` to use the no-container Template 2 overlays.
- Turn on `Orange icon for IG Story & FB Post` when the external Shopee logo needs to stay visible on light KV colors.
- Enter an image hash or image link, then click `Load Image` to place that image into the SKU area.
- Uploaded SKU images can be repositioned by dragging them inside each preview.
- SKU images can be zoomed per output from the preview controls.
- The KSP input is limited to 50 characters.
- KSP text color can be changed with the color picker or hex field.
- The output formats are Category Banner, Top Module Banner, IG Story, FB Post, and Banner Card.
- Category Banner, Top Module Banner, and Banner Card are compressed to stay under 250 KB when possible.
- IG Story and FB Post export as full-size PNG because they are not internal-platform assets.
- For size-limited outputs, the app keeps PNG when it is already under the limit. Heavier photo-based assets are automatically exported as WebP or JPG to keep the file size below 250 KB.
- The app can download a single asset or a ZIP containing all selected outputs.
