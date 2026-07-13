# Tutorly — Design System Extraction Brief

> **STATUS: ✅ EXTRACTION COMPLETE.** All values below were read from the real
> code in this repo (not guessed). Assets have been physically copied into
> `./design-export/`. Screenshots are live captures of production `tutorly.it`.

---

## 🚨 READ THIS FIRST — questions for Daniel

1. **❓ ASK DANIEL — There is NO vector/source file for the mascot anywhere in this repo.**
   No `.svg`, `.ai`, `.fig`, `.glb`, `.blend`, or `.spline` file exists.
   **If you have the original vector/Illustrator/Figma file — or whatever was used to
   produce the sculpted tier renders — please dig it out; it would still be the best
   possible input for the 3D model.**
   *(Good news: this is less of a blocker than it first appeared — see the tier mascots
   in §4B. The four "Badge" files are actually the mascot sculpted in bronze/silver/gold/
   diamond at **1696×2528**, with full 3D shading. Those are excellent modelling references.
   **Whoever made those may still have the source file — ask them.**)*

2. **❓ ASK DANIEL — `public/static/icons/tutorly-mascot.png` is NOT the mascot.**
   Despite the filename, that file is a **Spotify promo graphic for a song called "Love"
   by Daniele Stella** (black/purple, album art, "10.6k streams worldwide"). It appears to
   have been copied into the icons folder by mistake. **Is this a stray file that should be
   deleted from the repo?** It is *not* used as the mascot anywhere in code.

3. **❓ ASK DANIEL — Only ONE mascot pose exists** (front-facing, winking, holding a
   tablet) — though it now comes in **six treatments** (flat, small-flat, and sculpted in
   bronze/silver/gold/diamond). There are still **no side, back, or 3/4 angles**, so for a
   3D model the unseen sides must be invented. **Which pose should be the hero pose, and
   what motion do you want ("travel in 3D")?** Also: **should the 3D mascot pick up one of
   the tier materials** (the diamond/crystal one is spectacular), or stay flat-colour?

4. **❓ ASK DANIEL — `public/static/icons/site.webmanifest` still says `"name": "Biketribe"`**
   (the Sharetribe demo marketplace) and `theme_color: #ffffff`. Leftover boilerplate —
   should be corrected to Tutorly / `#042c44`.

5. **❓ ASK DANIEL — The site has no dark mode.** Do you want the new landing page to have one?

---

## 0. Repo orientation

- **Framework / template:** `➜ ANSWER:` **Sharetribe Web Template (FTW / "sharetribe-scripts")**, React 18 + Redux Toolkit, server-side rendered via Express (`server/index.js`). Package name `app`, version `10.1.2`. Not Next.js, not CRA (it's CRA-derived via `sharetribe-scripts`).
- **Styling method:** `➜ ANSWER:` **CSS Modules** (`*.module.css`) + **PostCSS** with plain CSS custom properties. No Tailwind, no styled-components, no Sass. Global tokens live in `:root`; components compose global classes via `composes: buttonPrimary from global;`.
- **Where global design tokens live:** `➜ ANSWER:`
  - [src/styles/marketplaceDefaults.css](src/styles/marketplaceDefaults.css) — the global `:root` token block (colors, fonts, spacing, shadows, radii, z-index) **and** the global button classes.
  - [src/styles/customMediaQueries.css](src/styles/customMediaQueries.css) — breakpoints.
  - [src/containers/LandingPage/LandingPage.module.css](src/containers/LandingPage/LandingPage.module.css) — **⚠️ IMPORTANT: this file has its OWN, richer `:root` token set** that is the *actual* current brand system (gold/navy/sand). It is more up-to-date than the global file. **This is the one to copy for the new landing page.**
- **Where brand config lives (Sharetribe):** `➜ ANSWER:` [src/config/configBranding.js](src/config/configBranding.js) (marketplace color + logo + OG images). Also `src/config/configDefault.js`, `configLayout.js`.
- **Build/run command:** `➜ ANSWER:` `yarn dev` (runs `sharetribe-scripts start` on frontend + `nodemon server/apiServer.js` on port 3500 concurrently). Production: `yarn build` then `yarn start`. Requires Sharetribe API credentials in `.env` — **you cannot boot this app without them.**
- **Node version / package manager:** `➜ ANSWER:` **Node 22.x** (per `engines` in package.json) / **Yarn 1.x** (yarn.lock present).

---

## 1. Color palette (EXACT values)

The brand is **deep navy + gold**, on a warm off-white/cream base. The palette is
defined in **two places** — the global Sharetribe file, and the LandingPage module.
**The LandingPage module is the real, current brand system.**

| Role | Hex | Where in code (file:var) | Notes |
|------|-----|--------------------------|-------|
| Primary / brand | `#042c44` | `configBranding.js:marketplaceColor`; `LandingPage.module.css:--color-primary` | "Blu profondo Tutorly" (deep navy). The single most important brand color. |
| Primary hover/dark | `#2E2E2E` | `LandingPage.module.css:--color-primary-light` | Confusingly named "light" but it's a near-black charcoal. Used as the 2nd stop of `--gradient-blue`. |
| Secondary / accent | `#f0b753` | `LandingPage.module.css:--color-accent-gold`; `marketplaceDefaults.css:--colorPrimaryButton` | **Tutorly gold.** This is the CTA / accent color and carries the whole brand energy. |
| Accent hover/dark | `#d9a03d` | `LandingPage.module.css:--color-accent-gold-dark`; `--colorPrimaryButtonDark` | Second stop of the gold gradient. |
| Accent light | `#f5c673` | `marketplaceDefaults.css:--colorPrimaryButtonLight` | Used on button hover (gradient flips lighter). |
| Background (page) | `#f8f7f4` | `LandingPage.module.css:--color-off-white` / `--color-gray-50` | Warm off-white, NOT pure white. Hero section background. |
| Topbar background | `#FFF7EB` | `TopbarDesktop.module.css:8` | **Cream/ivory topbar** — very visible in the screenshots, and *not* in the token file. Don't miss this. |
| Surface / card bg | `#FFFFFF` | `--color-white` | Cards are pure white on the warm off-white page. |
| Sand / beige | `#e7dbc8` | `--color-sand-beige` / `--color-gray-200` | The warm neutral that makes the brand feel "premium" rather than corporate. |
| Text primary | `#042c44` | Brand navy is also the body text color on the landing page | Headings + body. `html` global default is `--colorGrey700` = `hsl(240 3% 30%)` ≈ `#4b4b52`. |
| Text muted/secondary | `#4B5563` | `--color-gray-600` | Also `#94a3b8` used as input placeholder. |
| Border/divider | `rgba(4, 44, 68, 0.12)` | `marketplaceDefaults.css:.marketplaceInputStyles` | Borders are **tinted navy at low alpha**, not grey. Topbar border: `rgba(4,44,68,0.06)`. |
| Success | `#138041` | `marketplaceDefaults.css:--colorSuccess` | + Dark `#0d542a`, Light `#1aad57`, Subtle `#f0fff6` |
| Error/attention | `#e7000b` | `--colorFail` | + Dark `#cc0000`, Subtle `#fff0f0`. Attention: `#ffaa00`, Dark `#b25900`, Subtle `#fff7f0` |
| Any gradients used | see below | `LandingPage.module.css` | Gold gradient is the signature. |

### Gradients (full CSS)

```css
/* from: src/containers/LandingPage/LandingPage.module.css (:root) */
--gradient-gold: linear-gradient(135deg, #f0b753 0%, #d9a03d 100%);
--gradient-blue: linear-gradient(135deg, #042c44 0%, #2E2E2E 100%);

/* The signature "mesh" background — soft 4-corner radial wash.
   This is what gives the page its warm, non-flat feel. */
--gradient-mesh:
  radial-gradient(at 0%   0%,   rgba(240, 183, 83,  0.08) 0px, transparent 50%),
  radial-gradient(at 100% 0%,   rgba(4, 44, 68,     0.08) 0px, transparent 50%),
  radial-gradient(at 100% 100%, rgba(231, 219, 200, 0.15) 0px, transparent 50%),
  radial-gradient(at 0%   100%, rgba(46, 46, 46,    0.08) 0px, transparent 50%);

/* Applied to the hero like so: */
.heroSection {
  background-color: var(--color-off-white);      /* fallback for LCP */
  background: var(--gradient-mesh), var(--color-off-white);
}
```

### ⭐ Tier system palette (bronze → diamond)

This is a **major brand element** (tutors are ranked). Defined in JS, not CSS:

```js
/* from: src/containers/LandingPage/LandingPage.js:570-610 */
{ tierKey: 'Bronze',  lessons: '0-10',   commission: '25%',
  color: '#CD7F32', gradient: 'linear-gradient(135deg, #CD7F32 0%, #8B5E3C 100%)',
  glowColor: 'rgba(205, 127, 50, 0.3)' },
{ tierKey: 'Silver',  lessons: '10-50',  commission: '22%',
  color: '#A8B5C4', gradient: 'linear-gradient(135deg, #C0C0C0 0%, #8A9BAE 100%)',
  glowColor: 'rgba(192, 192, 192, 0.35)' },
{ tierKey: 'Gold',    lessons: '50-200', commission: '20%',
  color: '#F0B753', gradient: 'linear-gradient(135deg, #F0B753 0%, #D4943A 100%)',
  glowColor: 'rgba(240, 183, 83, 0.35)' },
{ tierKey: 'Diamond', lessons: '200+',   commission: '15%',
  color: '#00D4FF', gradient: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
  glowColor: 'rgba(0, 212, 255, 0.3)' },
```
> Note: `#00D4FF` (electric cyan, Diamond tier) is the **only** bright/saturated color
> in the whole brand. If the new landing wants "bolder and more colorful", this cyan is
> the sanctioned place to pull from — it's already brand-legal.

### The raw token block (this is the one to copy)

```css
/* from: src/containers/LandingPage/LandingPage.module.css */
:root {
  /* Typography */
  --font-display: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Colors - Brand Palette */
  --color-primary: #042c44;
  --color-primary-light: #2E2E2E;
  --color-ice-blue: #2E2E2E;
  --color-sand-beige: #e7dbc8;
  --color-off-white: #f8f7f4;
  --color-light-gray: #f5f5f5;

  /* Accent */
  --color-accent-gold: #f0b753;
  --color-accent-gold-dark: #d9a03d;

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-50: #f8f7f4;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #e7dbc8;
  --color-gray-300: #D1D5DB;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-900: #111827;

  /* Gradients */
  --gradient-gold: linear-gradient(135deg, #f0b753 0%, #d9a03d 100%);
  --gradient-blue: linear-gradient(135deg, #042c44 0%, #2E2E2E 100%);
  --gradient-mesh:
    radial-gradient(at 0% 0%, rgba(240, 183, 83, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(4, 44, 68, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(231, 219, 200, 0.15) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(46, 46, 46, 0.08) 0px, transparent 50%);

  /* Spacing */
  --space-xs: 8px;   --space-sm: 16px;  --space-md: 24px;
  --space-lg: 32px;  --space-xl: 48px;  --space-2xl: 64px;

  /* Radius */
  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px; --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.16);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.2);

  /* Transitions */
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### ⚠️ Colors defined in JS config (not CSS)

```js
/* from: src/config/configBranding.js */
import logoImage from '../assets/logo.png';
import facebookImage from '../assets/tutorly-og-1200x630.jpg';
import twitterImage from '../assets/tutorly-og-600x314.jpg';

// Colore principale marketplace — Blu profondo Tutorly
export const marketplaceColor = '#042c44';

export const logoImageDesktopURL = logoImage;
export const logoImageMobileURL = logoImage;

export const logoSettings = {
  height: 80,
  format: 'image',
};
```

> **⚠️ Legacy trap:** `marketplaceDefaults.css` still contains a leftover **purple**
> from the Sharetribe boilerplate — `--marketplaceColor: #6938ef`, `--marketplaceColorLight:
> #4a12e2`, `--marketplaceColorDark: #8d68f3`. **This purple is NOT a Tutorly brand color.**
> It is overridden at runtime by `configBranding.js` (`#042c44`). Ignore the purple entirely;
> do not carry it into the new landing page.

---

## 2. Typography

- **Primary font family (headings):** `➜ ANSWER:` **Coolvetica** — weight **400 only** (that's the only weight loaded). This is the rounded, retro-geometric display face you see in "Ripetizioni online con il tuo tutor perfetto". It's the brand's signature. Fallback chain: `'Coolvetica', 'Satoshi', Helvetica, Arial, sans-serif`.
- **Body font family:** `➜ ANSWER:` **Satoshi** — the full variable family from CDN Fonts. Fallback: `-apple-system, BlinkMacSystemFont, 'Inter', Helvetica, Arial, sans-serif`. **Lato** is also loaded from Google Fonts (weights 100/300/400/700/900 + italics) and appears as a fallback in some component CSS, but is largely vestigial. **Inter** is loaded as a full fallback family from Sharetribe's CDN.
- **How fonts are loaded:** `➜ ANSWER:` **All from external CDNs via `<link>` + `@font-face` in the raw HTML head.** None are bundled or self-hosted in the repo. Coolvetica and Satoshi both come from `fonts.cdnfonts.com`, which is a **third-party CDN and a real availability/licensing risk for a new production site** — see §8.

### Exact font-loading code

```html
<!-- from: public/index.html (<head>) -->

<!-- Tutorly Brand Fonts -->
<!-- Google Fonts: Lato (Body) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://assets-sharetribecom.sharetribe.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">

<!-- Preload Critical Font -->
<link rel="preload" href="https://fonts.cdnfonts.com/s/13277/coolvetica.woff" as="font" type="font/woff" crossorigin>

<!-- Satoshi Font (Moved from CSS import) -->
<link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet">

<style>
  /* Optimized Coolvetica from CDN with display: swap */
  @font-face {
    font-family: 'Coolvetica';
    font-style: normal;
    font-weight: 400;
    font-display: swap; /* Critical for LCP */
    src: local('Coolvetica'), url('https://fonts.cdnfonts.com/s/13277/coolvetica.woff') format('woff');
  }
  /* ...plus 16 @font-face blocks for Inter 100–900 + italics, all served from
     https://assets-sharetribecom.sharetribe.com/webfonts/inter/static-web/ ... */
</style>
```

There is also a stray CSS-level import (the head `<link>` was meant to replace it):
```css
/* from: src/components/ListingCard/ListingCard.module.css:2 */
@import url('https://fonts.cdnfonts.com/css/satoshi');
```

### Type scale

```css
/* from: src/styles/marketplaceDefaults.css */
/* Font families + weights */
--fontFamily: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Inter', Helvetica, Arial, sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
--fontFamilyHeading: 'Coolvetica', 'Satoshi', Helvetica, Arial, sans-serif;

--fontWeightRegular:  400;
--fontWeightMedium:   500;
--fontWeightSemiBold: 600;
--fontWeightBold:     700;
--fontWeightHeavy:    800;
--fontWeightBlack:    900;

/* Headings — mobile first, desktop in @media (--viewportMedium) = min-width 768px */
h1 {
  font-family: var(--fontFamilyHeading);   /* Coolvetica */
  font-size: 24px; line-height: 24px;
  font-weight: var(--fontWeightBlack);     /* 900 — but Coolvetica only ships 400,
                                              so this renders as synthetic/faux bold */
  margin: 18px 0;
  @media (--viewportMedium) { font-size: 64px; line-height: 64px; margin: 24px 0; }
}
h2 {
  font-family: var(--fontFamilyHeading);
  font-size: 21px; line-height: 24px; font-weight: var(--fontWeightBold);
  @media (--viewportMedium) { font-size: 40px; line-height: 56px; }
}
h3 { font-size: 18px; line-height: 24px; font-weight: 700;
     @media (--viewportMedium) { font-size: 30px; line-height: 40px; } }
h4 { font-size: 21px; line-height: 30px; font-weight: 700; }
h5 { font-size: 14px; line-height: 18px; font-weight: 500; }
h6 { font-size: 12px; line-height: 18px; font-weight: 700; text-transform: uppercase; }

/* Body */
html, li, p, pre {
  font-family: var(--fontFamily);          /* Satoshi */
  font-weight: var(--fontWeightMedium);    /* 500 — body is medium, not regular */
  font-size: 14px; line-height: 24px;
  @media (--viewportMedium) { font-size: 16px; line-height: 24px; }
}

/* Utility text sizes */
.textLarge  { font-size: 20px; line-height: 30px; font-weight: 500; }
.textSmall  { font-size: 14px; line-height: 18px; font-weight: 500; letter-spacing: -0.1px; }
.textXSmall { font-size: 13px; line-height: 18px; font-weight: 500; }
```

> **Note on h3–h6:** they do **not** set `font-family`, so they inherit Satoshi (body font),
> **not** Coolvetica. Only `h1` and `h2` are Coolvetica. That's a real, deliberate-looking
> rule of the current design: *Coolvetica for hero/section titles only.*

- **Are any font files self-hosted in the repo?** `➜ ANSWER:` **NOT FOUND — no font files exist in this repo.** I searched the entire tree (excluding `node_modules`) for `*.woff`, `*.woff2`, `*.otf`, `*.ttf` — zero results. There is no `src/assets/fonts/` directory. `./design-export/fonts/` was created but is **empty**, with a README explaining where to get each font. **All four families are loaded from third-party CDNs at runtime.**

---

## 3. Logo & brand marks

**Every logo lockup is `mascot + "Tutorly" wordmark`** — the mascot *is* part of the logo.
The wordmark is set in **Coolvetica**, in brand navy `#042c44`.

- **Primary logo file(s):** `➜ ANSWER:`
  | Original path | Exported to | Format / size | What it is |
  |---|---|---|---|
  | `src/assets/logo.png` | `design-export/logo/tutorly-logo-mono-navy-2666x757.png` | PNG, 2666×757, transparent | **The one actually used in the app** (imported by `configBranding.js`). Solid-navy **monochrome silhouette** mascot in a *running/leaping side pose*, holding a phone with motion lines. + "Tutorly" wordmark. |
  | `src/assets/logo3.png` | `design-export/logo/tutorly-logo-full-color-5583x2042.png` | PNG, **5583×2042** (highest-res asset in repo), transparent | **Full-color** mascot (front-facing, winking, tablet, 3 gold stars) + wordmark. **Best-quality logo available.** |
  | `src/assets/logo6.png` | `design-export/logo/tutorly-logo6-2746x780.png` | PNG, 2746×780 | Another variant. |
  | `public/static/icons/tutorly-logo.png` | `design-export/logo/tutorly-logo-compact-1280x689.png` | PNG, 1280×689 | Compact/stacked lockup, full-color mascot, tighter crop. Duplicated at `public/static/tutorly-logo.png`. |

- **Logo variants (light bg / dark bg / mark-only / wordmark):** `➜ ANSWER:`
  - **Light-bg:** all four above (navy artwork, transparent bg) — these only work on light backgrounds.
  - **Dark-bg / knockout / white version:** **NOT FOUND.** There is no white or inverted logo anywhere in the repo. **The new landing page will need one made** if any section uses the navy `--gradient-blue` background (and the existing footer *is* dark navy — see screenshots).
  - **Mark-only:** `src/assets/iconcina.png` (the mascot alone — see §4).
  - **Wordmark-only:** **NOT FOUND.** No text-only lockup exists.
- **Favicon / app icons:** `➜ ANSWER:` copied into `design-export/icons/` — `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180×180), `android-chrome-192x192.png`, `android-chrome-512x512.png`, `safari-pinned-tab.svg`. Source: `public/static/icons/` (which also holds `favicon.ico`, `mstile-150x150.png`, `browserconfig.xml`).
  - ⚠️ `safari-pinned-tab.svg` is the **only SVG in the brand set** — but it's a flat monochrome mask, not usable as mascot vector art.
  - ⚠️ `site.webmanifest` still says **"Biketribe"** (see question 4 at top).
- **How the logo is rendered in code (sizing/spacing):** `➜ ANSWER:`

```js
/* from: src/config/configBranding.js */
export const logoSettings = {
  height: 80,        // one of the 4 allowed heights: 24 | 36 | 48 | 80
  format: 'image',
};
```
```js
/* from: src/components/Logo/Logo.js — only 4 discrete heights are permitted */
const HEIGHT_24 = 24;  const HEIGHT_36 = 36;
const HEIGHT_48 = 48;  const HEIGHT_80 = 80;
const HEIGHT_OPTIONS = [HEIGHT_24, HEIGHT_36, HEIGHT_48, HEIGHT_80];
```
```css
/* from: src/components/Logo/Logo.module.css */
.root { display: inline-block; }
.logo { display: block; }
.logo24 { height: 24px; }  .logo36 { height: 36px; }
.logo48 { height: 48px; }  .logo80 { height: 80px; }
.logo img { display: block; height: 100%; width: auto; }  /* height-locked, width auto */
```
```css
/* from: src/styles/marketplaceDefaults.css — the topbar reserves this much height */
--Topbar_logoHeight: 25px;
--CheckoutPage_logoHeight: 25px;
--CheckoutPage_logoHeightDesktop: 27px;
```
> **The rule:** the logo is always **height-constrained, width-auto**. Never stretch it.

- **Preferred clear-space / min size rules, if documented:** `➜ ANSWER:` **NOT FOUND** — no brand guidelines doc, no clear-space spec exists anywhere in the repo. The only enforced constraint is the 4 discrete heights above. ❓ ASK DANIEL if a brand guidelines PDF exists outside the repo.

---

## 4. The MASCOT

**The mascot is a cheerful graduate boy** — pale skin, dark navy hair, wearing a **navy
graduation cap (mortarboard) with tassel**, **winking one eye**, rosy cheeks, freckles,
big smile, wearing a **navy gown/robe**, **holding a tablet/phone**, with a **gold star**
bursting behind his hands and **three gold stars floating above his cap**.

- **Mascot source file(s):** `➜ ANSWER:` **Everything below is exported into `design-export/mascot/`.**

  **A. Flat / 2D vector-style artwork (the canonical brand mascot)**
  | Original path | Exported to | Format / resolution |
  |---|---|---|
  | `src/assets/iconcina.png` | `mascot/tutorly-mascot-front-1630x2042.png` | **PNG raster, 1630×2042, transparent bg.** ⭐ The canonical flat mascot. Used as the floating chat button + video-call banner icon. |
  | `src/assets/icons/mascotte.png` | `mascot/tutorly-mascot-flat-small-480.png` | PNG, 500×500 — **a small/simplified variant** (cleaner, fewer details, tighter crop). Low-res; reference only. |
  | `src/assets/logo3.png` | `logo/tutorly-logo-full-color-5583x2042.png` | PNG, 5583×2042 — **contains the flat mascot at the highest resolution of any flat asset** (inside the lockup). ⭐ **Crop the mascot out of THIS if you need max-res flat art.** |
  | `src/assets/logo.png` | `logo/tutorly-logo-mono-navy-2666x757.png` | PNG — the **only other pose**: a navy silhouette in a *running/leaping side view*. Motion reference only, no interior detail. |
  | `public/static/icons/tutorly-mascot.png` | `mascot/MISNAMED-not-a-mascot-spotify-promo.png` | ⚠️ **NOT THE MASCOT** — a Spotify promo image (see question 2 at top). Exported only so you can confirm & delete it. |

  **B. ⭐⭐ THE TIER MASCOTS — sculpted 3D-shaded renders (`design-export/mascot/tiers/`)**

  **These are the most valuable assets in the entire repo for a 3D project, and they were
  hiding behind the filename "Badge".** They are not badges or medals — **each one is the
  exact same mascot, in the exact same pose, sculpted as a statuette in that tier's
  material**, with real volumetric shading, specular highlights, ambient occlusion and
  cast shadows. **Somebody has already done the "what does this character look like with
  depth?" work.**

  | Original path | Exported to | Resolution | Material |
  |---|---|---|---|
  | `src/assets/Badge bronzo.png` | `mascot/tiers/mascot-tier-1-bronze.png` | **1696×2528** (3.3 MB) | Polished **bronze/copper** — warm, burnished, dark patina in the recesses |
  | `src/assets/Badge argento.png` | `mascot/tiers/mascot-tier-2-silver.png` | **1696×2528** (3.3 MB) | Brushed **silver/pewter** — cool grey, crisp black outlines, chrome-like highlights |
  | `src/assets/Badge oro.png` | `mascot/tiers/mascot-tier-3-gold.png` | **1696×2528** (3.1 MB) | Polished **gold** — richest of the metals, hot yellow-white speculars |
  | `src/assets/Badge diamante.png` | `mascot/tiers/mascot-tier-4-diamond.png` | **1696×2594** (4.3 MB) | **Faceted diamond/crystal** — translucent, low-poly gem facets, **rainbow caustics + prismatic refraction**. Visually the most spectacular asset Tutorly owns. |

  > **Why this matters:** these four renders effectively *are* a 3D turnaround's worth of
  > lighting and material information for the front view. They tell the 3D artist the
  > silhouette in volume, where the forms round over, how the cap/hair/gown/star/tablet
  > read as separate solids, and four ready-made PBR material treatments. The **Diamond**
  > one is already, in spirit, a raytraced glass render — that's your "bolder, more
  > colorful, 3D" direction sitting right there, pre-approved and already in production.

- **Is it vector (SVG/AI) or raster (PNG/JPG)?** `➜ ANSWER:` **RASTER ONLY — 🚩 STILL FLAGGING THIS, but it's much less painful than it first looked.**
  I searched the whole repo (excluding `node_modules`) for `.svg`, `.ai`, `.eps`, `.pdf`,
  `.fig`, `.sketch`, `.blend`, `.glb`, `.gltf`, `.spline`. **No vector or 3D source file of
  the mascot exists.** BUT: the tier renders are **1696×2528 at ~3–4 MB**, which is a
  genuinely high-quality raster reference — far better than the 1630×2042 flat PNG I first
  found. **A 3D artist can absolutely work from the tier renders.** The original vector
  would still be better (see question 1), but this is no longer a blocker.

- **All poses / expressions / angles available:** `➜ ANSWER:` **One pose, but now in six treatments.**

  **Pose (only one exists):** front-facing, **winking one eye**, big smile, rosy cheeks,
  freckles, graduation cap with tassel, gown, **holding a tablet/phone**, gold star bursting
  behind the hands, **three stars floating above the cap**.

  **Treatments of that pose:**
  1. **Flat/2D full color** — `iconcina.png` (the brand default)
  2. **Flat/2D simplified small** — `icons/mascotte.png`
  3. **Sculpted bronze** — `Badge bronzo.png` ⭐ 3D-shaded
  4. **Sculpted silver** — `Badge argento.png` ⭐ 3D-shaded
  5. **Sculpted gold** — `Badge oro.png` ⭐ 3D-shaded
  6. **Faceted diamond/crystal** — `Badge diamante.png` ⭐ 3D-shaded, translucent

  **Plus one separate pose, silhouette only:** a **running/leaping side view**, arm raised
  holding a phone, with motion lines — but it's a **flat navy silhouette with no face and no
  interior detail** (`logo.png`). Attitude/motion reference only.

  - **There is still NO side profile, NO back view, NO 3/4 turn with visible detail, and NO
    alternate facial expressions.** For a 3D model, **the back and sides of the character
    must be invented** — but the tier renders give you far more volumetric information about
    the front than flat art ever could.

- **Mascot color values (exact hex for each part):** `➜ ANSWER:` I sampled these directly from the pixels of `iconcina.png` (opaque pixels only, sorted by coverage):

  | Part | Hex | % of artwork |
  |---|---|---|
  | Cap, hair, gown, eye pupils, outlines | **`#042c44`** | 38.1% — *exactly the brand navy* |
  | Face / skin (main) | **`#f3cfbf`** | 18.4% |
  | Stars, star burst, freckle dots | **`#ffbb04`** | 6.1% — a **more saturated gold** than the UI gold `#f0b753` |
  | Skin shadow / secondary skin tone | **`#f1b9a7`** | 3.1% |
  | Hair highlight (lighter navy) | **`#084467`** | 3.0% |
  | Ear/nose/mouth line, deep skin shadow | **`#de9379`** | 1.4% |
  | Blush / rosy cheeks | **`#faabaa`** | 1.0% |
  | Star shadow / darker gold | `#f0a500`–`#ffb700` range | <1% |

  > **Key insight for 3D:** the mascot is built from **the brand navy `#042c44` itself** —
  > it isn't a separate character palette bolted on. Navy = 38% of the artwork. The gold
  > used in the mascot (`#ffbb04`) is *punchier* than the UI gold (`#f0b753`); if you want
  > "bolder and more colorful", **the mascot's own gold is your license to go brighter.**

  **Tier mascot material ramps** — the sculpted renders are photorealistic (thousands of
  shades), so a single flat hex is meaningless. What a 3D artist actually needs is the
  **shadow → midtone → highlight ramp** per material. I sampled these directly from the
  pixels (transparent + pure-white background excluded):

  | Tier | Deepest shadow | Midtone (base) | Highlight | Average | Material notes |
  |---|---|---|---|---|---|
  | **Bronze** | `#290800` | **`#833a03`** | `#f4aa52` | `#814416` | Warm copper. Very dark, almost-black patina in the recesses; wide value range. |
  | **Silver** | `#1c1d1d` | **`#7f838b`** | `#e0e5eb` | `#7f8288` | Cool neutral grey, slight blue cast. Crisp near-black outlines. Most "metallic" contrast. |
  | **Gold** | `#511900` | **`#ca7703`** | `#ffea79` | `#bc791d` | Richest metal. Hot yellow-white speculars (`#ffea79`) — brighter than any UI gold. |
  | **Diamond** | `#1a6468` | **`#56a2a4`** | `#d3f4ed` | `#63a3a3` | Translucent teal-cyan crystal. Faceted, with **rainbow caustics** (small prismatic rainbow flecks) — the only place in the whole brand where full-spectrum color appears. |

  > **Note:** the Diamond render's teal-cyan midtone `#56a2a4` is a softer, more
  > *material* cousin of the Diamond-tier UI color `#00D4FF`. If you're pushing "bolder
  > and more colorful", the Diamond mascot is the strongest precedent in the brand — it's
  > already translucent, already refractive, already rainbow, and already shipped.

- **Mascot name / personality, if defined anywhere in copy or brand docs:** `➜ ANSWER:` **NOT FOUND — the mascot has no name anywhere in the codebase.** The file is called `iconcina.png` ("little icon" in Italian) — a filename, not a name. There are no brand docs describing his personality. ❓ **ASK DANIEL: does the mascot have a name?** (Personality, as *inferred from the art*: cheeky, encouraging, confident, a bit of a show-off — he winks, he's got a star, he's already graduated.)

- **Any existing animation of the mascot (Lottie/GIF/video)?** `➜ ANSWER:` **NOT FOUND.** No Lottie JSON, no GIF, no video of the mascot. He is **only ever a static PNG**. He *is* used as a live UI element in three places, but never animated:
  - `src/components/FloatingChatWidget/FloatingChatWidget.js:5` — `import iconcina from '../../assets/iconcina.png'` — **he's the floating chat button** (visible bottom-right of the desktop screenshot).
  - `src/components/VideoCallRoom/VideoCallRoom.js:20,387` — the "5 minutes remaining" banner icon during a video lesson.
  - `src/containers/LandingPage/LandingPage.js:17-20` — **the four sculpted tier mascots**, rendered in the tier cards. These *do* get CSS motion applied to them (a `drop-shadow` glow in the tier color that intensifies on hover, plus a staggered entrance) — see §5. That is the closest thing to an existing mascot animation.

- **Is there a source file (Figma/Illustrator/Blender/.glb/.spline)?** `➜ ANSWER:` **NOT FOUND — searched the entire repo. This is the single biggest gap in the handoff. See question 1 at the top.**

❓ ASK DANIEL: which mascot pose should be the "hero" pose, and should it travel/move
(e.g. "travel in 3D") — describe the intended motion.
`➜ ANSWER:` **UNANSWERED — needs Daniel.** My suggestion, for what it's worth: the
**running/leaping side pose from `logo.png`** is the only asset that already implies
*motion*, and it reads as "racing to help you" — which lines up perfectly with the
product's core promise ("*in pochi minuti*" / "niente liste d'attesa"). The front
winking pose is the "hello" pose; the leaping pose is the "let's go" pose.

---

## 5. Visual style & components

- **Border radius scale:** `➜ ANSWER:` **Two competing scales — use the LandingPage one.**
  - **Current/brand (LandingPage):** `--radius-sm: 8px`, `--radius-md: 16px`, `--radius-lg: 24px`, `--radius-full: 9999px`. Buttons use **16px**, cards use **24px**, inputs use **12px**, pills use `9999px`.
  - **Legacy (global, Sharetribe default):** `--borderRadius: 2px`, `--borderRadiusMedium: 4px`. **These 2px/4px values are boilerplate leftovers — the brand is soft and rounded, not sharp. Ignore them.**

- **Shadow styles:** `➜ ANSWER:`
```css
/* Current brand scale — from LandingPage.module.css */
--shadow-sm: 0 2px 8px  rgba(0, 0, 0, 0.08);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.16);
--shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.2);

/* The signature: gold-TINTED shadow under primary CTAs (not a neutral grey shadow) */
box-shadow: 0 4px 12px rgba(240, 183, 83, 0.25);   /* rest */
box-shadow: 0 6px 20px rgba(240, 183, 83, 0.4);    /* hover */

/* Legacy global scale — from marketplaceDefaults.css */
--boxShadow:             0 2px 4px  0 rgba(0, 0, 0, 0.1);
--boxShadowLight:        0 2px 4px  0 rgba(0, 0, 0, 0.05);
--boxShadowPopup:        0 8px 16px 0 rgba(0, 0, 0, 0.3);
--boxShadowButton:       0 4px 8px  0 rgba(0, 0, 0, 0.1);
--boxShadowListingCard:  0 0 50px   0 rgba(0, 0, 0, 0.1);
--boxShadowFilterButton: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
```
> **The one rule that matters:** primary CTAs cast a **gold-tinted glow**, not a grey shadow.

- **Button styles — primary + secondary:**

```css
/* from: src/styles/marketplaceDefaults.css */

/* PRIMARY — the gold gradient CTA. This is THE brand button. */
.buttonPrimary {
  display: block;
  width: 100%;
  min-height: 56px;
  padding: 16px 0;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  font-family: var(--fontFamily);   /* Satoshi */
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 16px;                                     /* soft, pill-ish */
  box-shadow: 0 4px 12px rgba(240, 183, 83, 0.25);         /* gold glow */

  /* Tutorly gold gradient — note the text is NAVY on gold, not white */
  background: linear-gradient(135deg, var(--colorPrimaryButton) 0%, var(--colorPrimaryButtonDark) 100%);
  color: #042c44;

  @media (--viewportMedium) { padding: 20px 0; }
}
.buttonPrimary:focus,
.buttonPrimary:hover {
  outline: none;
  box-shadow: 0 6px 20px rgba(240, 183, 83, 0.4);          /* glow intensifies */
  background: linear-gradient(135deg, var(--colorPrimaryButtonLight) 0%, var(--colorPrimaryButton) 100%);
  color: #042c44;
  transform: translateY(-2px);                             /* lifts on hover */
}
.buttonPrimary:disabled {
  box-shadow: none;
  cursor: not-allowed;
  background: var(--colorGrey100);
  color: var(--colorGrey700);
}

/* SECONDARY — quiet white button with a hairline border */
.buttonSecondary {
  display: block;
  width: 100%;
  min-height: 56px;
  padding: 16px 0;

  transition: all var(--transitionStyleButton);            /* ease-in-out 0.1s */
  cursor: pointer;

  font-weight: var(--fontWeightSemiBold);
  text-align: center;
  text-decoration: none;

  border: 1px solid var(--colorGrey100);
  border-radius: var(--borderRadiusMedium);                /* NOTE: only 4px — legacy */

  background-color: var(--colorSecondaryButton);           /* white */
  color: var(--colorGrey700);

  @media (--viewportMedium) { padding: 20px 0; }
}
.buttonSecondary:focus,
.buttonSecondary:hover {
  outline: none;
  box-shadow: var(--boxShadowButton);
  border-color: var(--colorGrey300);
}
```
> ⚠️ Note the inconsistency: the **primary** button was modernised to 16px radius + gradient
> + lift, but the **secondary** button was left on the old 4px-radius Sharetribe defaults.
> **For the new landing page, give the secondary button a matching 16px radius** — the
> live site's actual secondary CTAs (e.g. "Accedi", the white pills) already look rounded.

```css
/* Inputs — from src/styles/marketplaceDefaults.css (.marketplaceInputStyles) */
.marketplaceInputStyles {
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 12px;
  border: 2px solid rgba(4, 44, 68, 0.12);   /* navy-tinted, 2px */
  font-family: var(--fontFamily);
  font-size: 15px;
  color: #042c44;
  transition: all ease-in-out 150ms;
  &::placeholder { color: #94a3b8; }
  @media (--viewportMedium) { padding: 14px 20px; line-height: 28px; font-size: 16px; }
}
.marketplaceInputStyles:hover  { border-color: rgba(4, 44, 68, 0.25); }
.marketplaceInputStyles:focus  {
  border-color: #f0b753;                              /* focus ring is GOLD */
  box-shadow: 0 0 0 3px rgba(240, 183, 83, 0.15);
}
```

```css
/* Cards — from src/containers/LandingPage/LandingPage.module.css */
.featureCard {
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);                    /* 24px */
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
/* Gold wash sweeps in on hover */
.featureCard::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(240, 183, 83, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.featureCard:hover::before { opacity: 1; }
```

- **Spacing system:** `➜ ANSWER:` **Two systems, again.**
  - **Current (LandingPage):** an 8px-based scale — `--space-xs: 8px`, `sm: 16px`, `md: 24px`, `lg: 32px`, `xl: 48px`, `2xl: 64px`. **Use this.**
  - **Legacy (global):** `--spacingUnit: 6px` (mobile) / `--spacingUnitDesktop: 8px` (desktop). The Sharetribe convention is that all margins/paddings are multiples of 6 on mobile and 8 on desktop — you can see this reflected in the odd `margin-top: 18px` / `padding: 3px 0` values throughout the heading styles.
  - **Content width:** `--contentMaxWidth: 1056px`; `--contentMaxWidthPages: 1120px`. The LandingPage hero container is `max-width: 1100px`.
  - **Topbar height:** `--topbarHeight: 60px` (mobile) / `--topbarHeightDesktop: 72px`.

- **Iconography:** `➜ ANSWER:` **Custom inline SVGs — no icon library.** There is no Feather/Lucide/FontAwesome/Heroicons dependency in `package.json`. Icons live as individual React components in [src/components/](src/components/) (e.g. `IconSearch`, `IconClose`, `IconArrowHead`, `IconCheckmark`, `IconSpinner`, etc.) plus a folder of raw SVGs at `src/assets/icons/`. Style, from the screenshots: **simple, single-weight line/solid icons**, usually in navy or gold, often inside a small round gold-tinted chip (see the ✓ pills under the hero search box). The tier system uses **4 illustrated PNGs** instead of icons — and, as covered in §4B, **those are actually the mascot sculpted in each tier's material**, not abstract medals. Exported twice for convenience: as `design-export/badges/` (badge-bronze/silver/gold/diamond.png) and, more usefully, as `design-export/mascot/tiers/` (mascot-tier-1-bronze … mascot-tier-4-diamond.png).

- **Imagery style:** `➜ ANSWER:` **Real photography, warm-toned, heavily faded back.** The hero is not an illustration — it's a **looping video of real tutors/students** in a library setting, laid under the text at **30% opacity** over the warm mesh gradient. The overall effect: *soft, warm, human, out-of-focus background; crisp navy type in front.*
```css
/* from: src/containers/LandingPage/LandingPage.module.css */
.heroVideo {
  position: absolute; top: -10%; left: 0;
  width: 100%; height: 130%;
  object-fit: cover;
  z-index: 0;
  opacity: 0;
}
.heroVideoActive { opacity: 0.3; }   /* ← the whole photographic layer sits at 30% */
```
  - Hero videos (3, rotating): `public/static/videos/tutor1.mp4`, `tutor2.mp4`, `tutor3.mp4` (referenced at `LandingPage.js:241-243`).
  - Team/tutor headshots: `public/static/images/*.jpg` (real people — `daniele-stella.jpg`, `adiya-alimova.jpg`, `allegra-santelli.jpg`, `gabriele-brichetti.jpg`).
  - University logos (**5**, exported to `design-export/universities/`): `bocconi.png`, `cattolica.png`, `luiss.png`, `politecnico-milano.png`, `universita-studi-milano.png` — i.e. Bocconi, Cattolica, LUISS, Politecnico di Milano, Università degli Studi di Milano. These are the social-proof logos for the "Tutor dalle migliori università" section.
  - Screenshots exported to `design-export/screenshots/` — see §7.
  - ⚠️ A code comment at `LandingPage.js:662` reads *"Poster removed by request — keep an empty poster element"* and `index.html` says *"Hero poster removed from preload to avoid showing personal image on landing"* — **Daniel deliberately removed a personal photo from the hero.** Be careful about reintroducing identifiable personal imagery.

- **Any existing animations / micro-interactions worth carrying over:** `➜ ANSWER:` Yes — these define the "feel":
  - **The easing curve is the brand's signature:** `cubic-bezier(0.4, 0, 0.2, 1)` used at three speeds (`--transition-fast: 0.15s`, `--transition-normal: 0.3s`, `--transition-slow: 0.5s`). Everything eases with this.
  - **Primary CTA lifts on hover:** `transform: translateY(-2px)` + the gold glow intensifies from `0 4px 12px rgba(240,183,83,.25)` → `0 6px 20px rgba(240,183,83,.4)`.
  - **Tier cards glow:** each card gets a `radial-gradient(circle, var(--tier-glow) 0%, transparent 70%)` orb behind it, and the badge gets `filter: drop-shadow(0 6px 20px var(--tier-glow))`, intensifying to `drop-shadow(0 10px 36px var(--tier-glow)) brightness(1.1)` on hover.
  - **Cards sweep gold on hover** (the `::before` gold wash above).
  - **Staggered card entrance:** `animationDelay: ${idx * 0.1}s` (`LandingPage.js:1415`).
  - **Shimmer sweep:** `linear-gradient(90deg, transparent, rgba(4,44,68,0.1), transparent)` used as a moving highlight.
  - Legacy global transitions: `--transitionStyle: ease-in 0.2s`, `--transitionStyleButton: ease-in-out 0.1s`.

- **Dark mode?** `➜ ANSWER:` **NO — there is no dark mode.** I grepped the whole `src/` tree for `prefers-color-scheme` — **zero matches.** No `[data-theme]`, no theme toggle, no dark token set. The site is light-only. *(Note: the site does use a **dark navy footer/CTA section** — visible at the bottom of the desktop screenshot — but that's a dark *section*, not a dark *mode*.)* ❓ See question 5 at the top.

---

## 6. Copy, tone & product facts

- **Tagline / one-liner currently used:** `➜ ANSWER:` There is no single registered "tagline" string, but the **hero headline is the de-facto tagline**:
  > ## **"Ripetizioni online con il tuo tutor _perfetto_ in pochi minuti"**
  > *(Online tutoring with your perfect tutor, in minutes)*

  It's assembled from three keys, with the middle word rendered in **gold** as the accent:
  ```js
  /* from: src/translations/it.json */
  "LandingPage.heroTitle":       "Ripetizioni online con il tuo tutor"
  "LandingPage.heroTitleAccent": "perfetto"          // ← rendered in gold #f0b753
  "LandingPage.heroTitleEnd":    "in pochi minuti"
  ```
  The English equivalent is shorter and punchier:
  ```js
  /* from: src/translations/en.json */
  "LandingPage.heroTitle": "Find your"  "heroTitleAccent": "perfect"  "heroTitleEnd": "tutor instantly"
  ```

- **How Tutorly describes what it does (real hero/about copy):** `➜ ANSWER:`

  **Hero subtitle (the 3-line version actually on screen; `<accent>` = gold):**
  > "Tutor **verificati**, lezioni private online.
  > Niente liste d'attesa. Niente ritardi.
  > Aiuto **immediato**, a prezzi **accessibili**."
  >
  > *(Verified tutors, private online lessons. No waiting lists. No delays. Immediate help, at affordable prices.)*

  **Hero subtitle (single-line variant):**
  > "Progettato per connetterti con tutor verificati. Niente liste d'attesa. Niente ritardi. Solo aiuto di qualità quando ne hai bisogno."

  **SEO meta description — the most complete "what we do" statement:**
  > "Trova il tuo tutor online in pochi minuti su Tutorly. Ripetizioni economiche di matematica, fisica, statistica, economia, inglese e preparazione IB, SAT e maturità. Tutor verificati, lezioni private sicure e prezzi accessibili per studenti di ogni livello."
  >
  > *(Find your online tutor in minutes on Tutorly. Affordable tutoring in maths, physics, statistics, economics, English, and prep for IB, SAT and maturità. Verified tutors, safe private lessons, affordable prices for students at every level.)*

  **SEO title:** `"Ripetizioni Online Economiche con Tutor Verificati | Tutorly"`

  **Section headlines (all real, from `it.json`):**
  | Section | Headline |
  |---|---|
  | Instant tutoring | **"Trova un tutor in pochi minuti"** — *"Salta l'attesa. Connettiti con tutor verificati istantaneamente e inizia a imparare subito."* |
  | Universities | **"Tutor dalle migliori università"** |
  | Tier system | **"Abbinamento intelligente attraverso il nostro Sistema di Tier e Band"** — *"Ogni tutor è classificato per qualifiche, esperienza e risultati comprovati."* |
  | Virtual classrooms | **"Aule virtuali per la preparazione agli esami"** — *"Progettato per IB, SAT e esami di ammissione universitaria... 60%\* di risparmio rispetto alle lezioni private."* |
  | Certificate | **"Ottieni un Certificato Verificato per il tuo LinkedIn & CV"** — *(for tutors: 12+ months & 20+ lessons → official "Certificato di Eccellenza Tutorly")* |
  | Final CTA | **"Inizia le tue ripetizioni online con tutor verificati"** — *"Tutor delle migliori università italiane. Prenotazione immediata. Niente liste d'attesa."* |

  **Trust badges under the hero search:** "Tutor di Primo Livello" · "Verificati" · "Garanzia Soddisfatti o Rimborsati"

- **Primary audiences & how each is addressed:** `➜ ANSWER:` **Two-sided marketplace — students/parents and tutors. No schools/agencies.**
  - **Students (demand side)** — the primary audience, and who the landing page speaks to. Segmented by **Italian school system**, hard-coded in `LandingPage.js:22+`: *liceo scientifico, liceo classico, liceo linguistico, liceo scienze umane, liceo artistico, istituto tecnico economico, istituto tecnico tecnologico, scuola media, scuola elementare*, plus **exam prep**: *IB Diploma, SAT, maturità, test-medicina, test-ingegneria, test-bocconi*. Each maps to its own subject list (Matematica, Fisica, Latino, Greco, Logica…). Addressed on **speed, price, safety, verification**.
  - **Tutors (supply side)** — addressed on **earnings & status**: the 4-tier progression (Bronze 25% → Silver 22% → Gold 20% → **Diamond 15%** commission, each with its own sculpted mascot statuette — see §4B) and the LinkedIn/CV **Certificate of Excellence**. CTA: "Diventa un Tutor". Tutors are pitched as coming from *"le migliori università italiane"* — Bocconi, Cattolica, LUISS, Politecnico di Milano, Università degli Studi di Milano.
  - **NOT addressed:** schools or agencies — there is no B2B/institutional messaging anywhere.

- **Tone of voice:** `➜ ANSWER:` **Reassuring, direct, and anxiety-removing — with a playful mascot as the counterweight.** The rhetorical signature is the **short negative triplet**: *"Niente liste d'attesa. Niente ritardi."* ("No waiting lists. No delays.") — it sells by naming and killing the frustration, then promising speed. Copy is *benefit-led and concrete* (minutes, %, verified, guaranteed), never fluffy or academic. Formality: **informal "tu"** throughout (*"il tuo tutor"*, *"Trova un tutor"*), never the formal *"Lei"*. Net: **trustworthy and premium in the type/palette, warm and friendly in the mascot/rounded shapes.** Not corporate, not childish.

- **Languages:** `➜ ANSWER:` **Italian-first, with a full English translation.** `src/translations/it.json` (the live/default locale — the production site renders in Italian) and `src/translations/en.json`. There's a language switcher in the topbar (🇮🇹 flag, visible top-left of the desktop screenshot). **The new landing page should be built Italian-first.**

- **Key CTAs and their destinations:** `➜ ANSWER:`
  | CTA (IT) | English | Role |
  |---|---|---|
  | **"Cerca →"** | Search | The hero's primary action — submits the subject/school search box |
  | **"Registrati"** | Sign up | Gold button, top-right of topbar |
  | **"Accedi"** | Log in | White/ghost button, top-right of topbar |
  | **"Trova un Tutor Ora"** | Find a tutor now | `LandingPage.finalCtaPrimary` — the bottom-of-page primary CTA |
  | **"Diventa un Tutor"** | Become a tutor | `LandingPage.finalCtaSecondary` — the supply-side CTA |
  | **"Trova un Tutor Istantaneo"** | Find an instant tutor | Instant-tutoring section |
  | **"Sfoglia le Lezioni dal Vivo"** | Browse live lessons | Virtual classroom section |
  | **"Incontra i Nostri Tutor"** | Meet our tutors | University/Bocconi section |
  | **"Inizia il Tuo Viaggio"** | Start your journey | Certificate section (aimed at tutors) |
  - The hero also has a **two-tab switcher**: **"Prenota una Lezione"** *(Book a lesson — "Scegli data e orario")* vs **"Tutoraggio Istantaneo"** *(Instant tutoring — "Connettiti in minuti")*. **This tab pair is the core product proposition — worth preserving on the new landing page.**

---

## 7. Screenshots

Captured from **live production `tutorly.it`** on 2026-07-13 via headless Chrome
(Puppeteer), at **2× device pixel ratio**, with the cookie banner pre-dismissed and
lazy-loaded sections scrolled into view. Exported to `design-export/screenshots/`:

`➜ ANSWER:`
| File | Viewport | Contents |
|---|---|---|
| `desktop-home-1440.png` | 1440×full-page @2x | **Full-page desktop home** — hero, instant tutoring, tiers, universities, classrooms, certificate, dark-navy final CTA, footer |
| `desktop-hero-1440.png` | 1440×900 @2x | **Above-the-fold desktop hero** — cream topbar + logo, Coolvetica headline with gold accent, search card, trust pills, mascot chat widget |
| `mobile-home-390.png` | 390×full-page @2x | **Full-page mobile home** (iPhone-class viewport) |
| `mobile-hero-390.png` | 390×844 @2x | **Above-the-fold mobile hero** |

> These are **visual ground truth** — where the code and the live site disagree, trust the
> screenshots. (Example: the cream `#FFF7EB` topbar is glaringly obvious in the screenshot
> but is buried in a component file, not in any token block.)

---

## 8. Anything else the new-landing AI should know

**🚩 The single biggest risk: the fonts are on a third-party CDN.**
Both **Coolvetica** and **Satoshi** are loaded from `fonts.cdnfonts.com` — an unofficial
mirror. Nothing is self-hosted; there are **zero font files in this repo**. For a new
production landing page you should:
- **Satoshi** → license properly from **Fontshare** (Indian Type Foundry) and self-host. It's free for personal/commercial use via Fontshare, but take it from the source, not a mirror.
- **Coolvetica** → by **Ray Larabie / Typodermic**. The free version is personal-use-only; **a commercial license may be required.** ❓ **ASK DANIEL whether Tutorly has a Coolvetica license.** This matters — Coolvetica *is* the brand's voice.
- Self-host both with `font-display: swap`. Coolvetica is the LCP element (the hero headline); it's already `preload`ed for that reason.

**Two token systems exist. Use the right one.**
`marketplaceDefaults.css` is the *Sharetribe boilerplate* with Tutorly colors patched over the top — it still contains dead purple (`#6938ef`) and 2px radii. `LandingPage.module.css`'s `:root` is the *actual current brand system* (gold/navy/sand, 8–24px radii, cubic-bezier motion). **Copy the LandingPage tokens; ignore the legacy ones.**

**Brand don'ts:**
- ❌ **Never use the purple `#6938ef`.** It's dead Sharetribe boilerplate, not a Tutorly color.
- ❌ **Don't put white text on the gold button.** Primary CTA text is **navy `#042c44` on gold** — that's deliberate, and it's also what keeps it accessible.
- ❌ **Don't use grey drop-shadows on gold CTAs.** They cast a **gold-tinted glow**.
- ❌ **Don't stretch the logo** — height-locked, width-auto, at one of 24/36/48/80px.
- ❌ **Don't reintroduce identifiable personal photos into the hero** — Daniel explicitly removed one (see the code comments cited in §5).
- ❌ **Don't set body copy in Coolvetica.** It's display-only: `h1`/`h2` and short accents. Everything else is Satoshi.

**Things that must NOT change:**
- The navy **`#042c44`** + gold **`#f0b753`** pairing — it's the entire brand, and the mascot is literally built out of the navy.
- **Coolvetica for headlines.** It's the most recognisable thing about the identity.
- The **mascot is part of the logo**, not a separate decoration.
- The core promise in the copy: **speed + verified + affordable** ("in pochi minuti", "niente liste d'attesa", "tutor verificati").

**Where to push "bolder & more colorful" (brand-legal headroom):**
1. ⭐ **The sculpted tier mascots (§4B) are the single biggest unlock.** They are already
   3D-shaded, already material-rich, and already in production — nobody has to approve
   anything new. **The Diamond one in particular** (translucent faceted crystal with
   rainbow caustics) is *already* the "bold, colorful, 3D" direction, shipped. If the new
   landing wants a 3D hero mascot, **the strongest possible argument is "make the Diamond
   badge real."**
2. **The mascot's own gold `#ffbb04`** is punchier than the UI gold `#f0b753` — and the gold
   tier render's speculars go to `#ffea79`. Going brighter is already sanctioned by the artwork.
3. **Diamond-tier cyan `#00D4FF`** is the only saturated hue in the UI system and is already in
   production. It's your legitimate contrast/pop color against all that navy — and it's backed
   up by the Diamond mascot's teal-crystal material (`#56a2a4` midtone).
4. The **`--gradient-mesh`** currently runs at 0.08–0.15 alpha. Cranking those alphas up is the
   cheapest way to add color without inventing anything new.
5. The **tier glows** (`drop-shadow(0 6px 20px var(--tier-glow))` + radial orbs) are the most
   "3D-ready" effect already in the system — they were literally built to sit under the sculpted
   mascots, so they'll sit naturally under a 3D one.

**Practical notes:**
- Node **22.x** required; **Yarn 1.x**. `yarn dev` **will not boot without Sharetribe API credentials** in `.env` — this is why the screenshots were taken from production rather than a local build.
- Breakpoints come from `src/styles/customMediaQueries.css` (`--viewportMedium` ≈ 768px is the main one used throughout).
- There are **~45 stray `.md` files at the repo root** (implementation notes, e.g. `LIVEKIT_DESIGN_TUTORLY.md`, `MOBILE_OPTIMIZATION_SUMMARY.md`). None are brand guidelines. **NOT FOUND: any real brand-guidelines document, in this repo or referenced from it.**
- **NOT FOUND:** any white/knockout logo, any wordmark-only lockup, any mascot vector, any mascot animation, any dark-mode palette, any mascot name.

---

## ✅ Completion checklist

- [x] Every color in §1 has an exact hex + source file.
- [x] Fonts in §2 named with exact loading code. *(⚠️ zero font files in repo — all CDN; `design-export/fonts/` contains a README pointing to the sources.)*
- [x] Logo files physically copied into `./design-export/logo/` — 4 lockups.
- [x] Mascot art copied into `./design-export/mascot/` at best available quality — **including all 4 sculpted tier mascots at 1696×2528 in `mascot/tiers/`** (bronze, silver, gold, diamond), plus the flat mascot (1630×2042), the small flat variant (500×500), and the higher-res flat copy embedded in `logo3.png`. **Source file located? NO — none exists. Flagged at top.**
- [x] Button/card/shadow/radius values pasted in §5.
- [x] Real product copy captured in §6 (no placeholders) — pulled from `it.json`/`en.json`.
- [x] Screenshots exported in §7 — 4 live captures of production at 2×.
- [x] Every `➜ ANSWER:` filled or marked `NOT FOUND`.
- [x] All `❓ ASK DANIEL:` questions surfaced clearly at the top for Daniel.

> **Extraction complete — hand `TUTORLY_DESIGN_EXTRACTION.md` and the `design-export/`
> folder to the landing project.**
>
> Daniel: please answer the **5 questions at the top of this file** before the new landing
> page starts — especially **#1 (is there a mascot vector/source file anywhere?)**, which
> is the difference between modelling the 3D mascot cleanly and re-drawing him by eye
> from a PNG.
