# Shadow Word — Deploy to Vercel

## 1. Install dependencies

```bash
npm install
```

## 2. Run locally to test

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To test on your phone:

- Find your laptop’s IP (e.g. `ipconfig` on Windows, `ifconfig` on Mac/Linux).
- On the same Wi‑Fi, open `http://YOUR_IP:3000` in the phone browser.

## 3. Deploy to Vercel (free)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts (link to existing project or create new). You’ll get a URL like `https://shadow-word-xxx.vercel.app`.

## 4. Share and install

- Share the link. Friends open it in **Safari** (iPhone) or **Chrome** (Android).
- **iPhone:** Share → “Add to Home Screen”. The app icon appears and works offline after first load.
- **Android:** Use the “Install app” / “Add to Home Screen” banner when offered.

## 5. Custom domain (optional, free on Vercel)

1. In [Vercel Dashboard](https://vercel.com/dashboard) open your project.
2. Go to **Settings → Domains**.
3. Add your domain (e.g. `shadowword.game`) and follow the DNS instructions (add the records at your registrar).
4. Vercel will issue a free SSL certificate.

## 6. Updating the app

After code changes, deploy again:

```bash
vercel --prod
```

Users who added the app to their home screen will get the update on next open (service worker and cache will refresh).

## 7. PWA icons

The app expects `public/icon-192.png` and `public/icon-512.png`. To generate proper PWA icons:

1. Create or export a 512×512 logo (e.g. “SW” or a word bubble).
2. Go to [realfavicongenerator.net](https://realfavicongenerator.net/).
3. Upload the image and generate the favicon pack.
4. Download and place `icon-192.png` and `icon-512.png` in `public/`, or use the site’s PWA icon options and replace the paths in `public/manifest.json` if needed.

Until then, add two placeholder PNGs so the app builds and installs correctly:

- `public/icon-192.png` — any 192×192 PNG (e.g. a solid color or “SW” text).
- `public/icon-512.png` — any 512×512 PNG (same design).

You can create them in any image editor or use an online generator. Without these files, the PWA manifest will reference missing assets; the app still runs in the browser.
