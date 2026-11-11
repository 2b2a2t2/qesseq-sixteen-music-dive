# WipidiM — QESSEQ 16

Product site for the **QESSEQ 16** sequencer by **WipidiM** — *High Music Dive*.

Design system ported from the reference build
([qesseq-sixteen-music-dive.lovable.app](https://qesseq-sixteen-music-dive.lovable.app)):
deep abyssal navy surfaces, brushed-steel type gradients, LED colour palette,
grid lines and glow shadows. Titles use **Nasalization** (Typodermic), body text
Manrope, labels JetBrains Mono.

## Open it

Double-click `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

No build step, no dependencies. Plain HTML / CSS / JS.

## Files

```
index.html          the whole page
css/style.css       design tokens + all styling + breakpoints (1024 / 860 / 640)
js/main.js          nav, overlay menu, scroll reveals, 4 interactive widgets, order form
README.md

assets/web/         images actually referenced by the page
  qesseq16-angle-cutout.webp      1386×792   product cutouts (transparent)
  qesseq16-front-cutout.webp      1263×714
  qesseq16-top-cutout.webp        1411×832
  qesseq16-*-cutout-lg.webp       2000 px    retina sources for hero/feature/gallery
  logo-white.png                  512×527    WipidiM mark (white)
  logo-spin.gif                   192×192    animated record mark — header logo (48 frames, ~114 KB)
  favicon.png                     192×192
  SEQ.jpg SEQ2.jpg SEQ3.jpg logo.jpg         your original photos (not used by the page)

nasalization/      Nasalization Rg.otf (title font) + Typodermic EULA
```

The product cutouts and white logo come from the reference build's assets.

**Photo names vs. what they actually show** (the file names came from the
reference build and don't match the pictures):

| File | Actual view | Gallery label |
|------|-------------|---------------|
| `qesseq16-angle-cutout` | three-quarter from the **left** | Angle |
| `qesseq16-front-cutout` | straight **down from above** | Top |
| `qesseq16-top-cutout` | three-quarter from the **front** | Front |

Update the captions/alt text in `index.html` together if you ever swap these.

## Page layout

| # | Section | Contents |
|---|---------|----------|
| — | Header | spinning WipidiM record logo, nav, Pre-order CTA, hamburger + overlay menu |
| 1 | Hero | eyebrow, QESSEQ 16, tagline, CTAs, stats 16 / 64 / 48 / 8, cutout shot |
| 2 | Manifesto | "Everything is live. / Dive in." + LED line |
| 3 | Features | 01 Sequence (interactive step grid) · 02 Generate · **03 Arpeggiator** · **04 Progressions** · 05 Follow chain · 06 Control |
| 4 | Modes | ENC / SEQ / KEY family cards + 12 variants + gesture line |
| 5 | Gallery | large stage + 3 switchable views |
| 6 | Specs | 15 rows, incl. arp, progressions, generators, drums, MIDI |
| 7 | Pre-order | mailto order form (no price, no payment) |
| — | Footer | brand, links, slogan |

### Interactive widgets (`js/main.js`)

| Widget | Behaviour |
|--------|-----------|
| Step grid | 6 tracks × 16 pads, tap to toggle, animated playhead, horizontal swipe on mobile |
| Arpeggiator | cycles the 9 walk orders (up/down/up-down/random ×2/out-in/in-out/converge/diverge) over a 2-octave span |
| Progressions | cycles genre proposals (18 genre grammars referenced), tap a chord to accept, cadence band updates |
| Gallery | thumbnail switcher with fade + caption |
| Order form | validates name/email, then opens `mailto:` with the request pre-filled |

All animation respects `prefers-reduced-motion` and pauses when off-screen
(IntersectionObserver).

## What you'll want to edit

**1. The order email** — `js/main.js`, top of the file:

```js
const CONFIG = {
  orderEmail: 'orders@wipidim.com',   // ← change this
  productName: 'QESSEQ 16'
};
```

The order form builds a `mailto:` with the buyer's details pre-filled. No server,
no fees, no price shown. Swap in Stripe/PayPal later without touching the layout.

**2. Specs** — `index.html`, the `<dl class="specs">` block.

**3. Copy** — all in `index.html`.

**4. Mode colours** — `css/style.css`, `:root`:

```css
--mode-enc:var(--led-blue);    /* Encoder family */
--mode-seq:var(--led-cyan);    /* Sequencer family */
--mode-key:var(--led-green);   /* Keyboard family */
```

These follow the reference site's palette (blue / cyan / green). The device
firmware (`QESSEQ16/Modes.cpp`, `dimColorFor()`) lights the mode pads
**purple / blue / sea-green** — if you want the site to match the hardware,
change the three values above to `var(--led-violet)` / `var(--led-blue)` /
`var(--led-green)`.

**5. Images** — replace files in `assets/web/`; keep the `-lg.webp` retina
variants in sync (2000 px wide) so Lighthouse stays happy.

`assets/web/logo-spin.gif` is derived from the original `wipidim.gif` in this
folder (948 px, 2.5 MB → white-on-transparent, 192 px, ~114 KB). Regenerate it
the same way if you ever change the mark: recolour the dark artwork to white,
drop everything else to transparent, keep all 48 frames at 30 ms.

## Checks run

- Lighthouse: **Accessibility 100 · Best Practices 100 · SEO 100**, zero failed audits
- Zero console errors
- Widgets exercised in-browser: step toggle + playhead, arp walk cycling, chord
  accept, gallery switch, nav sticky state, menu open/close/Escape/aria, form validation
- 390 px mobile check: no horizontal overflow, hamburger nav, single-column
  sections, swipeable step grid with hint, 2000 px gallery stage source

## Deploy

Upload the whole folder to any static host — Netlify, Vercel, GitHub Pages,
Cloudflare Pages, or plain shared hosting. No server required.
