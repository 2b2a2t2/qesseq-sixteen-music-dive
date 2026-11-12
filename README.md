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
| 1 | Hero | eyebrow, QESSEQ 16, tagline, CTAs, stats 16 / 64 / 42 / 8, cutout shot |
| 2 | Manifesto | "Everything is live. / Dive in." + LED line |
| 3 | Features | 01 Sequence (interactive step grid + input options) · 02 Learn (lit scale keyboard + list of all 54 scales) · 03 Progressions (Viterbi, all 18 genres listed) · 04 Follow chain · **05 Arpeggiator** · 06 Generate · 07 Control |
| 4 | Modes | ENC / SEQ / KEY family cards + 12 variants + gesture line |
| 5 | Gallery | large stage + 3 switchable views |
| 6 | Specs | 23 rows, incl. speed/1-64 length, pattern tools, recording, arp, scales, progressions, generators, chords, drums, MIDI, open firmware/hardware |
| 7 | Open | open firmware, open hardware (CV/Gate, pedals, I²C, BLE 5) and the free core |
| 8 | Pre-order | mailto order form to `contact@wipidim.com` (no price, no payment) |
| — | Footer | brand, links, slogan |

### Interactive widgets (`js/main.js`)

| Widget | Behaviour |
|--------|-----------|
| Step grid | one 16-pad line (as on the panel) with 6 track tabs — switching track swaps the line, taps toggle pads, animated playhead, horizontal swipe on mobile |
| Arpeggiator | cycles the 9 walk orders (up/down/up-down/random ×2/out-in/in-out/converge/diverge) over a 2-octave span |
| Progressions | cycles all 18 genre grammars, tap a chord to accept, cadence band updates |
| Gallery | thumbnail switcher with fade + caption |
| Order form | validates name/email, then opens `mailto:` with the request pre-filled |

All animation respects `prefers-reduced-motion` and pauses when off-screen
(IntersectionObserver).

### Lists mirrored from the firmware

The 54 scale chips in Learn follow `kScaleName` (`QESSEQ16/Chords.cpp`) using the
panel's full spellings from the name map in `QESSEQ16/ScreenPanel.cpp`; the 18
genres follow `genreNames[GENRE_COUNT]` in `QESSEQ16/genre_data.h` and the widget's
chord examples in `js/main.js` (`GENRES`) use the same order; the 18 drum styles
under Generate follow `kGenreName[DRUM_GENRES]` in `QESSEQ16/Drum.cpp`. Both firmware files
live in the [SC01_SEQPORT](https://github.com/2b2a2t2/SC01_SEQPORT) repository —
regenerate those two blocks from the code if the tables ever change.

## What you'll want to edit

**1. The order email** — `js/main.js`, top of the file:

```js
const CONFIG = {
  orderEmail: 'contact@wipidim.com',   // ← change this
  productName: 'QESSEQ 16'
};
```

The order form builds a `mailto:` with the buyer's details pre-filled. No server,
no fees, no price shown. Swap in Stripe/PayPal later without touching the layout.

**2. Specs** — `index.html`, the `<dl class="specs">` block.

**3. Copy** — all in `index.html`.

**4. Mode colours** — `css/style.css`, `:root`:

```css
--mode-enc:var(--led-violet);  /* Encoder family — purple */
--mode-seq:var(--led-blue);    /* Sequencer family — blue */
--mode-key:var(--led-teal);    /* Keyboard family — teal */
```

These follow the device firmware (`QESSEQ16/Modes.cpp`, `dimColorFor()`), which
lights the mode pads **purple / blue / teal**. `--led-teal` is defined next to
the rest of the LED palette in the same `:root` block. Section accents follow the
same families: the arpeggiator (sequencer) uses `--mode-seq`, the progression
engine and the lit-scale visual (keyboard) use `--mode-key`.

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
