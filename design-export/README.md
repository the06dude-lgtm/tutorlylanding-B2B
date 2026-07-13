# Tutorly — design export

Everything the new landing page needs, pulled out of the `tutorly.it` Sharetribe repo.
Read `TUTORLY_DESIGN_EXTRACTION.md` (one level up) for the full spec — colors, type,
tokens, copy, and the open questions for Daniel. This file is just a map of the assets.

## ⭐ Start here: `mascot/tiers/`

**The four "Badge" files in the repo are not badges — they're the mascot**, sculpted as a
statuette in each tier's material, at **1696×2528** with full 3D shading. These are the
best assets Tutorly owns and the best possible reference for a 3D model.

| File | Material | Ramp (shadow → midtone → highlight) |
|---|---|---|
| `mascot-tier-1-bronze.png` | Polished bronze/copper | `#290800` → **`#833a03`** → `#f4aa52` |
| `mascot-tier-2-silver.png` | Brushed silver/pewter | `#1c1d1d` → **`#7f838b`** → `#e0e5eb` |
| `mascot-tier-3-gold.png` | Polished gold | `#511900` → **`#ca7703`** → `#ffea79` |
| `mascot-tier-4-diamond.png` | **Faceted crystal, rainbow caustics** | `#1a6468` → **`#56a2a4`** → `#d3f4ed` |

The **Diamond** one is already, in spirit, a raytraced glass render. If the brief is
"bolder, more colorful, 3D mascot", the shortest path is **make the Diamond badge real**.

## Folders

| Folder | What's in it |
|---|---|
| `mascot/` | The flat/2D mascot (`tutorly-mascot-front-1630x2042.png` — the canonical one, used as the site's chat button) + a small simplified variant. Plus `tiers/` above. |
| `logo/` | 4 logo lockups. **Every lockup is `mascot + "Tutorly" wordmark`** — the mascot *is* the logo. `tutorly-logo-full-color-5583x2042.png` is the highest-res. `tutorly-logo-mono-navy-*.png` is the one the app actually uses, and contains the **only other pose** (a running side silhouette). |
| `screenshots/` | Live 2× captures of production `tutorly.it` — desktop + mobile, hero + full page. **Visual ground truth**; where the code and the site disagree, trust these. |
| `badges/` | The same 4 tier images under their original "badge" names. Duplicate of `mascot/tiers/` — kept only so the original filenames resolve. |
| `universities/` | 5 social-proof logos: Bocconi, Cattolica, LUISS, Politecnico di Milano, Università degli Studi di Milano. |
| `icons/` | Favicons + app icons. ⚠️ `safari-pinned-tab.svg` is the only SVG in the brand set, and it's a flat monochrome mask — **not** usable as mascot vector art. |
| `fonts/` | **Empty** — there are zero font files in the repo. See `fonts/README.md` for where to license/get Coolvetica and Satoshi. |
| `tutorly-og-*.jpg` | Open Graph / social sharing images. |

## The 60-second version of the brand

- **Navy `#042c44` + gold `#f0b753`**, on warm off-white `#f8f7f4`. Cream topbar `#FFF7EB`.
- **Coolvetica** for headlines (h1/h2 only), **Satoshi** for everything else.
- Primary CTA = **gold gradient, navy text, 16px radius, gold-tinted glow**, lifts 2px on hover.
- Soft and rounded (16–24px radii), never sharp. Everything eases on `cubic-bezier(0.4, 0, 0.2, 1)`.
- The mascot is **built out of the brand navy** — 38% of his pixels are `#042c44` exactly.

## Two traps

1. **Ignore `marketplaceDefaults.css`'s purple** (`#6938ef`). It's dead Sharetribe boilerplate,
   overridden at runtime. Not a Tutorly color. Copy the tokens from `LandingPage.module.css` instead.
2. **`mascot/MISNAMED-not-a-mascot-spotify-promo.png`** is exactly what it says — the repo has a
   file called `tutorly-mascot.png` that is actually a Spotify promo for a song. Don't ship it.
