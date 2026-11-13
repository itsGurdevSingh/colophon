# Colophon — The Living Edition

Interactive Figma-to-React prototype: a living editorial publication with an
iris opening sequence, a pinned hero overlapped by a rising Studio sheet,
an explorable CMS workspace, a scroll-driven publication morph, and a quiet
closing chapter.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in a browser.

`npm run build` produces a production bundle in `dist/`.

## What was built

- **Opening (A → B → B2 → C)** — automatic arrival: wordmark + small iris,
  expanded circle with kinetic type, circular portal morphing into the hero
  image rectangle, then a dissolve onto the resolved hero. Skippable, and
  never auto-plays under `prefers-reduced-motion`.
- **Cover deck (the core transition)** — every boundary is a
  hold-while-cover, all top-pinned: the hero holds while Studio covers it;
  each tall chapter scrolls through, holds its tail, and is covered in
  turn; the morph plays inside its pinned stage. Scroll position alone
  drives it, so forward and reverse scrolling just work — no plain
  scrolling anywhere.
- **Interactive Studio** — tabbed CMS workspace (Overview / Editor / Assets /
  New), editable headline and summary with simulated save states, asset
  crops, and Preview + Publish demonstration overlays. Both are optional and
  never block scrolling; publishing tints the `03 GO LIVE` flow marker.
- **Studio → Publication** — a scroll-scrubbed, fully reversible sequence in
  which the draft artwork crops and resolves into the printed Edition 04
  cover. Storytelling, not a confirmation.
- **Closing** — restrained single clip-reveal into the final CTA and footer.
- **Responsive** — desktop, tablet, and mobile layouts follow their Figma
  references; the iris, pin, and morph choreography adapt per breakpoint
  instead of shrinking the desktop version.

## Technical decisions

- **Vite + React + Tailwind v4**, with **zero runtime animation libraries**.
  The pinned overlap is pure CSS `position: sticky` (natively reversible,
  correct touch/keyboard behavior, no JS); the opening is a small timed state
  machine with CSS transitions; the publication morph writes one `--p`
  progress variable per frame and animates with transform/opacity only.
  GSAP/Motion would add weight without improving any of these.
- No UI framework: the editorial components are custom and small.
- Fonts (Fraunces, DM Sans, IBM Plex Mono) via Google Fonts; artwork
  extracted from Figma into `public/images/`.
- Prettier + `prettier-plugin-tailwindcss` (dev only) for formatting.

## Structure

```
src/
  App.jsx                  pin track + editorial sheet composition
  index.css                tokens, sticky math, iris + morph choreography
  hooks/                   useReducedMotion, useScrub, useInView
  components/
    Opening.jsx            A → B → B2 → C arrival sequence
    Hero.jsx               pinned hero + responsive nav/menu
    HeroType.jsx           shared display typography (live + B2 ghost)
    StudioSheet.jsx        studio chapter + flow state
    CmsWorkspace.jsx       explorable CMS, Preview/Publish demos
    FlowRow.jsx            01 Compose — 02 Refine — 03 Go live
    Publication.jsx        scroll-scrubbed edition morph stage
    Closing.jsx            quiet finale + footer
```

## Motion notes

- No scroll snapping, no click gates, no autoplay beyond the opening.
- `overflow-x: clip` (not `hidden`) preserves sticky positioning.
- Reduced motion: opening skipped, scrubs render their final state, all
  decorative transitions collapse to instant.
