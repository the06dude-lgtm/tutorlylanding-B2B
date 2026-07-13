# Tutorly Landing Page — Build Brief

> Drop this file into the empty project folder. It's the spec for building
> `tutorly-landing`, the public marketing + tutor-signup entry site.

---

## 1. What this project is

A **standalone marketing landing page** for Tutorly, hosted on its **own domain
`tutorly.it`**, separate from the main app. It replaces an old B2C site that
costs $50/mo — this new page is free to host on Vercel (Hobby tier).

It has **two jobs**:
1. **Explain what Tutorly does** (for schools / agencies / students) with a
   modern, high-design feel — including a 3D animated hero.
2. **Recruit tutors** — a section lower on the page that drives tutors to sign up.

This is a **temporary but polished** placeholder while the main platform is
finished. Treat it as a real product page, not a throwaway.

---

## 2. Critical architecture rule — DO NOT build auth here

**This landing page does NOT create accounts and does NOT talk to Supabase.**

- The main app owns all authentication. It lives on a **separate domain**:
  `tutorlypartners.it`.
- The tutor "Sign up" / "Become a tutor" buttons are just **links** to:
  `https://tutorlypartners.it/signup`
- Account creation, Supabase, redirects to the tutor portal — all handled by the
  main app, not here.
- ⚠️ **Do not add Supabase keys, auth logic, or a signup form that writes to a
  database in this project.** If you think you need it, you're solving it in the
  wrong place. Keep this site static and keyless.

(Why: cross-domain Supabase sessions don't share cookies cleanly, and putting
keys on a public marketing site is a needless risk. The app already has working
auth — reuse it via a link.)

---

## 3. Tech stack

- **Next.js** (App Router, latest) + **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Spline** for the 3D hero animation (visual, no 3D coding)
- **Plain CSS / Tailwind + framer-motion (optional)** for all other motion
  (scroll reveals, parallax, gradient blobs)
- Deployed on **Vercel** (Hobby / free tier)

No database, no API routes needed for v1. Pure frontend + one external Spline
scene URL.

---

## 4. Dependencies to install

```bash
# scaffold (if folder is empty)
npx create-next-app@latest . --typescript --tailwind --app --eslint

# 3D hero
npm install @splinetool/react-spline @splinetool/runtime

# optional but recommended for scroll/reveal animation
npm install framer-motion
```

---

## 5. The 3D hero — how Spline is used

The hero uses a **Spline scene** exported from spline.design as a `.splinecode`
URL. The user (Daniel) will provide the real scene URL — until then use a
placeholder and make it easy to swap.

**Behavior:** the Spline animation plays and ends on a black screen. When it
resolves, the **landing headline + tutor CTA fade in on top** (HTML content, not
3D). So the black screen is the dramatic reveal moment.

**Rules for the Spline embed:**
- **Lazy-load it** with `next/dynamic` and `ssr: false` — it must NOT block first
  paint. It's a ~1–2MB external asset loaded from Spline's cloud at runtime.
- Render the hero text/CTA in normal HTML on top, hidden, then reveal it via an
  `onLoad` handler (timed to when the intro finishes) so the page feels instant
  even while the scene loads.
- Respect `prefers-reduced-motion`: if the user has it on, skip/settle the
  animation and show the content immediately.

**Reference implementation for the hero:**

```tsx
// app/components/Hero.tsx
'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Spline
        scene="https://prod.spline.design/REPLACE_ME/scene.splinecode"
        onLoad={() => setTimeout(() => setRevealed(true), 3000)}
        className="absolute inset-0"
      />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center
          text-center transition-opacity duration-1000
          ${revealed ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Tutorly
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/70">
          {/* tagline — what Tutorly does */}
        </p>
        <a
          href="https://tutorlypartners.it/signup"
          className="mt-8 rounded-full px-8 py-3 font-semibold bg-white text-black"
        >
          Become a tutor
        </a>
      </div>
    </section>
  );
}
```

> When exporting from Spline, choose the **Next.js / React** target (gives the
> `@splinetool/react-spline` component). Do NOT export as Three.js or raw GLB.

---

## 6. Page structure (sections, top to bottom)

1. **Hero** — Spline 3D animation → reveals headline + primary CTA.
2. **What Tutorly is** — short, clear explanation of the product / value.
3. **For schools & agencies** — who it's for, key benefits.
4. **How it works** — a few simple steps.
5. **Become a tutor** — the recruitment section. Explain why tutors should join,
   with a prominent CTA linking to `https://tutorlypartners.it/signup`.
6. **Footer** — logo, contact email, minimal links.

Sections 2–6 use **CSS / Tailwind + scroll-reveal animation** (framer-motion or
IntersectionObserver). Keep them light and fast — the 3D budget is spent on the
hero only.

---

## 7. Design direction

- Modern, premium, "TikTok product page" energy — but not cluttered.
- One bold moment (the 3D hero); everything else calm and clean.
- **Dark theme** works well as the base given the hero ends on black; ensure text
  contrast is strong.
- Real copy, no lorem ipsum. Write from the reader's side (a school evaluating a
  tutoring service; a tutor deciding whether to join).
- Responsive: must look great on mobile (most TikTok traffic is mobile). The
  Spline scene should scale/behave on small screens — test it.
- Accessibility: visible focus states on links/buttons, respect
  `prefers-reduced-motion`.

---

## 8. Environment / config

- No `.env` secrets required for v1 (no backend).
- The only external config is the **Spline scene URL** — keep it in one obvious
  place (e.g. a constant or an env var `NEXT_PUBLIC_SPLINE_SCENE`) so it's easy
  to swap.
- The signup link target `https://tutorlypartners.it/signup` should also be a
  single constant so it's easy to change if the app domain changes.

---

## 9. Deploying to Vercel (free) + domain

1. Push this repo to GitHub.
2. In Vercel: **New Project → import the repo** → it auto-detects Next.js →
   Deploy. (No build config needed.)
3. In the Vercel project → **Settings → Domains**, add:
   - `tutorly.it`
   - `www.tutorly.it`
4. Vercel shows the DNS records to set. At the **domain registrar**
   (GoDaddy / Namecheap — where DNS is currently managed):
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`
   (Use whatever exact values Vercel displays — they're authoritative.)
5. Wait for DNS to propagate + SSL to issue (minutes to a couple hours).
6. Verify `https://tutorly.it` loads this page.
7. **Only then** cancel the old $50/mo hosting.

> Note: the main app (`tutorlypartners.it`) is a **separate** Vercel project /
> repo. Don't touch it here — just link to it.

---

## 10. Definition of done (v1)

- [ ] Next.js + Tailwind project runs locally (`npm run dev`).
- [ ] Spline hero embedded, lazy-loaded, reveals headline + CTA, respects
      reduced-motion.
- [ ] All 6 sections present with real copy, responsive on mobile.
- [ ] "Become a tutor" CTAs link to `https://tutorlypartners.it/signup`.
- [ ] No Supabase / auth / secrets in this repo.
- [ ] Builds clean (`npm run build`) with no errors.
- [ ] Deployed to Vercel, reachable at `tutorly.it`.

---

## 11. Things NOT to do

- ❌ Don't build a signup form or auth here.
- ❌ Don't add Supabase, a database, or any secret keys.
- ❌ Don't export Spline as Three.js/GLB — use the Next.js/React component.
- ❌ Don't let the Spline scene block first paint — always lazy-load.
- ❌ Don't touch the main app repo — this is standalone.
