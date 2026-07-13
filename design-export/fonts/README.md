# Fonts — nothing to export

**There are zero font files in the Tutorly repo.** I searched the whole tree
(excluding `node_modules`) for `*.woff`, `*.woff2`, `*.otf`, `*.ttf` — no results.
Every font is loaded at runtime from a third-party CDN. So this folder is
intentionally empty; here's where to actually get each family.

| Family | Role | Currently loaded from | Where to get it properly |
|---|---|---|---|
| **Coolvetica** | Headlines (`h1`, `h2`) — the brand's signature display face | `https://fonts.cdnfonts.com/s/13277/coolvetica.woff` (weight 400 only) | **Ray Larabie / Typodermic.** The free version is **personal-use only** — ⚠️ **a commercial license may be required.** Confirm with Daniel. |
| **Satoshi** | Body / UI (`--fontFamily`) | `https://fonts.cdnfonts.com/css/satoshi` | **Fontshare** (Indian Type Foundry) — https://www.fontshare.com/fonts/satoshi. Free for commercial use, but take it from the source, not the CDN mirror. |
| **Lato** | Vestigial — appears in a few component fallback chains | Google Fonts (100/300/400/700/900 + italics) | Google Fonts. Probably droppable. |
| **Inter** | Fallback family only | Sharetribe's CDN (`assets-sharetribecom.sharetribe.com`) | Google Fonts / rsms.me/inter. Sharetribe boilerplate — droppable. |

## For the new landing page

Self-host **Coolvetica** and **Satoshi** with `font-display: swap`.
`fonts.cdnfonts.com` is an unofficial mirror and is a real availability risk
for production.

Coolvetica is the **LCP element** (it renders the hero headline), which is why
the current site already `preload`s it:

```html
<link rel="preload" href="https://fonts.cdnfonts.com/s/13277/coolvetica.woff"
      as="font" type="font/woff" crossorigin>
```

Keep that preload behaviour when you swap in a self-hosted copy.

**Usage rule:** Coolvetica is display-only — `h1`/`h2` and short accents. Everything
else (including `h3`–`h6`, which don't set a family and therefore inherit) is Satoshi.
