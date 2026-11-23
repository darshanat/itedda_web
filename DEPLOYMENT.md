# Production Deployment Guide

iTEDDA is a static single-page React app (Create React App / `react-scripts` 5). There is no backend or API. `npm run build` produces a static `build/` folder that any static host can serve.

## 1. Prerequisites

- Node.js 18 LTS or newer, and npm
- Git access to this repository
- A static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront, or Nginx/Apache)
- A domain name and DNS access (optional)

## 2. Pre-deployment checklist

- [ ] Work is merged into `main` (currently developed on `feat/design_refresh`)
- [ ] `npm ci` completes without errors
- [ ] `npm run build` completes with no ESLint warnings (CI treats warnings as errors when `CI=true`)
- [ ] `npm test -- --watchAll=false` passes
- [ ] The build was checked locally (see section 4)
- [ ] 3D models load (`public/models/`) and Draco decoders are present (`public/draco/`)
- [ ] Images in `public/gallery/` and `public/projects/` display correctly
- [ ] No secrets are committed. `.env` files are git-ignored. This app currently needs no environment variables.

## 3. Build

```bash
npm ci                 # clean, reproducible install from package-lock.json
npm run build          # outputs to ./build
```

The output in `build/` contains the hashed JS and CSS in `static/`, `index.html`, and the copied `public/` assets (`models/`, `draco/`, `gallery/`, `projects/`).

If the 3D models change, regenerate the `.glb` files from the `.wrl` sources before building:

```bash
npm run models         # runs scripts/wrl-to-glb.mjs (needs up to 8 GB RAM)
```

### Hosting under a sub-path

By default, assets are served from `/`. To host under a sub-path (for example `https://example.com/itedda/`), set `"homepage": "/itedda"` in `package.json`, or run `PUBLIC_URL=/itedda npm run build`. The Draco loader reads `process.env.PUBLIC_URL`, so the decoders resolve correctly.

## 4. Verify the build locally

```bash
npx serve -s build
```

Open the URL it prints and check:

- All sections render (Hero, Services, Portfolio, About, Contact)
- The 3D board viewer loads and rotates, and the browser console shows no 404s for `/models/*` or `/draco/*`
- The layout works on mobile widths
- A hard refresh works

## 5. Deployment options

### Option A: Netlify

1. Connect the repository in Netlify.
2. Build command: `npm run build`. Publish directory: `build`.
3. Set the Node version with an environment variable `NODE_VERSION=18` (or higher).
4. Deploy from `main`. Pull requests get deploy previews automatically.

### Option B: Vercel

1. Import the repository.
2. Framework preset: **Create React App**. Build command: `npm run build`. Output directory: `build`.
3. Set the production branch to `main`.

### Option C: Cloudflare Pages / GitHub Pages

- **Cloudflare Pages:** build command `npm run build`, output directory `build`.
- **GitHub Pages:** set `homepage` in `package.json` to the repository URL, then deploy `build/` using a GitHub Actions workflow or the `gh-pages` package.

### Option D: Nginx on a VPS

1. Build locally or in CI, then copy `build/` to the server:
   ```bash
   rsync -avz --delete build/ user@server:/var/www/itedda/
   ```
2. Example server block:
   ```nginx
   server {
       listen 80;
       server_name example.com www.example.com;
       root /var/www/itedda;
       index index.html;

       # Single-page app fallback
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Long-lived cache for hashed build assets
       location /static/ {
           add_header Cache-Control "public, max-age=31536000, immutable";
       }

       # 3D models, Draco decoders and images (not hashed, so cache moderately)
       location ~* \.(glb|gltf|wasm|png|jpg|jpeg|webp|svg)$ {
           add_header Cache-Control "public, max-age=2592000";
       }

       # Never cache the entry point
       location = /index.html {
           add_header Cache-Control "no-cache";
       }

       gzip on;
       gzip_types text/css application/javascript application/json image/svg+xml model/gltf-binary application/wasm;
   }
   ```
3. Enable HTTPS with Let's Encrypt: `sudo certbot --nginx -d example.com -d www.example.com`.
4. Reload Nginx: `sudo nginx -t && sudo systemctl reload nginx`.

### Option E: S3 + CloudFront

1. Upload `build/` to a private S3 bucket: `aws s3 sync build/ s3://BUCKET --delete`.
2. Serve it through CloudFront with Origin Access Control.
3. Set the default root object to `index.html`. Map 403 and 404 responses to `/index.html` with status 200.
4. Invalidate after each release: `aws cloudfront create-invalidation --distribution-id ID --paths "/index.html"`.

## 6. Server requirements

- **MIME types:** `.glb` as `model/gltf-binary` and `.wasm` as `application/wasm`. Most hosts handle this. If Draco decoding fails, check these first.
- **Compression:** enable gzip or brotli for JS, CSS, JSON and WASM. `.glb` files are often already Draco-compressed, so extra compression gives little.
- **HTTPS:** required. Redirect HTTP to HTTPS.
- **SPA fallback:** unknown paths must return `index.html`.

## 7. Recommended security headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

If you add a `Content-Security-Policy`, allow `worker-src blob:` and `script-src 'wasm-unsafe-eval'` so the Three.js Draco decoder works.

## 8. Contact form

The contact form only manages state in the browser and has no backend. Before relying on it in production, connect it to a service (Formspree, Netlify Forms, EmailJS, or your own API). Otherwise, submissions go nowhere.

## 9. Post-deployment checks

- [ ] The site loads over HTTPS with a valid certificate
- [ ] The Network tab shows no 404s for `models/`, `draco/`, `gallery/` or `projects/`
- [ ] The 3D viewer works on desktop and mobile
- [ ] A direct visit and refresh on any URL works
- [ ] Lighthouse scores are acceptable (performance, accessibility, SEO)
- [ ] The title, meta description and favicon are correct in `public/index.html`
- [ ] The contact form delivers messages (if connected)

## 10. Performance notes

- `public/` is about 21 MB (models, gallery and project images). Serve it through a CDN.
- Use optimized image formats (WebP/AVIF) and keep `.glb` files Draco-compressed.
- Hashed files under `static/` can be cached forever. `index.html` must not be cached.

## 11. Rollback

- **Netlify / Vercel / Cloudflare:** promote the previous deployment from the dashboard.
- **Git-based:** `git revert <commit>` on `main` and redeploy.
- **Nginx / S3:** keep the last known-good `build/` as an archive, for example `build-YYYYMMDD.tar.gz`, and restore it. Invalidate the CDN afterward.

## 12. Release workflow (suggested)

1. Branch from `main` (`feat/...`), open a pull request, and check the preview deployment.
2. Merge to `main` after review.
3. Tag the release: `git tag v1.x.x && git push --tags`.
4. The host builds and deploys from `main` (or run the manual steps above).
5. Run the post-deployment checks.

## 13. Troubleshooting

| Symptom | Likely cause and fix |
| --- | --- |
| Blank page after deploy | Wrong `homepage` / `PUBLIC_URL`, so assets 404. Rebuild with the correct path. |
| 404 on page refresh | SPA fallback missing. Add the `try_files` or redirect rule. |
| 3D model does not load | Check `/models/*` paths, the `.glb` MIME type, and the browser console. |
| Draco errors / `wasm` failure | `/draco/` files missing, wrong `application/wasm` MIME type, or a CSP blocking WASM or workers. |
| Build fails in CI on warnings | CI sets `CI=true`. Fix the ESLint warnings, or use `CI=false npm run build` as a stopgap. |
| Out-of-memory in `npm run models` | Raise `--max-old-space-size` or run it on a machine with more RAM. |
| Old content after release | Browser or CDN cached `index.html`. Invalidate the CDN and check the `Cache-Control` headers. |
