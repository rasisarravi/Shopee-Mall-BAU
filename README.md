# Shopee Campaign Creative Tool

A static campaign asset generator for Shopee creative formats. The tool runs fully in the browser with HTML, CSS, and JavaScript only.

## What Is Included

- `index.html` as the entry point
- `styles.css` for the interface
- `script.js` for preview rendering and PNG/ZIP downloads
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
- The KSP input is limited to 31 characters.
- The output formats are Category Banner, Top Module Banner, IG Story, FB Post, and Banner Card.
- The app can download a single PNG or a ZIP containing all selected outputs.
