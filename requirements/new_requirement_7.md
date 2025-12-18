# History page layout is “zoom-dependent” — fix CSS so it looks correct at 100% (not only at 33%)

You are a front-end engineer. My `history.html` timeline layout currently looks wrong at normal browser zoom (100%). It only looks “okay” when zoomed out to ~33% (see screenshots). This indicates the layout is using incorrect sizing units / overflow rules / fixed widths/heights.

Please fix the layout so it looks clean and readable at **100% zoom** on desktop, while staying responsive on mobile.

## Scope
- `history.html`
- only the CSS/JS that `history.html` uses (minimal changes)

---

## Problem symptoms (must solve)
- At **100% zoom**, the timeline items are huge / spacing is wrong / images cause awkward overflow.
- At **33% zoom**, the page suddenly looks “correct” (meaning the CSS layout is not scaled appropriately).
- Featured images and gallery thumbnails do not behave consistently across viewport sizes.

---

## Target layout (what “correct” should look like)
For each year milestone:
- Left: year label + title
- Right (or below on small screens): a **featured image card** with a reasonable size
- Below: a **horizontal scroll row** of thumbnails (does NOT wrap into many rows or overflow the page)

### Size targets (desktop)
- Timeline content max width: ~1100–1200px centered
- Featured image card:
  - visual width: up to ~800px (but responsive)
  - visual height: around ~350–450px (ratio-friendly; do NOT distort)
- Thumbnails:
  - fixed height ~88–120px
  - horizontal scroll if there are many images

### Size targets (mobile)
- Single column layout
- Featured image full width of container
- Thumbnails scroll horizontally

---

## Required changes

## Task A — Make the main layout container responsive and zoom-safe
- Remove/avoid any CSS that depends on browser zoom (e.g., fixed pixel widths that exceed viewport, absolute positioning that causes overflow).
- Ensure the main timeline container uses:
  - `max-width` + `margin: 0 auto`
  - comfortable padding
- Ensure timeline cards use fluid widths:
  - `width: 100%` inside the container
  - no hard-coded giant heights

## Task B — Fix featured image sizing (must not appear huge at 100%)
The featured image currently becomes visually massive at 100% zoom.

Implement a stable featured image container:
- `.featured-media` (or similar wrapper)
- Use ONE of these safe patterns (pick the best):
  1) `max-width: 800px; width: 100%; aspect-ratio: 2 / 1; overflow: hidden;`
     - `img { width: 100%; height: 100%; object-fit: cover; }`
  2) If aspect-ratio is not supported in current setup, use:
     - `max-height: 420px; width: 100%; object-fit: cover;`

Acceptance criteria:
- At 100% zoom, featured image is a “card” (not giant).
- No distortion; aspect ratio preserved.

## Task C — Add horizontal scroll for each milestone’s thumbnails
For the gallery thumbnails per milestone:
- Render in a single row using flex:
  - `display: flex; gap: 12px; overflow-x: auto; overflow-y: hidden;`
  - `-webkit-overflow-scrolling: touch;`
- Thumbnails should have consistent size:
  - `height: 96px; width: auto; object-fit: cover; flex: 0 0 auto;`
- Ensure the row does not push the page wider than the viewport.

## Task D — Validate with real zoom expectations
After changes:
- Test at desktop 100% zoom (1920×1080 typical) and confirm layout is correct.
- Also confirm mobile width ~390px behaves correctly.

---

## Deliverables
1) Patch/diff for the files changed.
2) Short explanation of what caused the “looks good only at 33% zoom” issue (e.g., fixed widths, overflow, absolute positions) and how you fixed it.
3) Confirm the page now looks correct at 100% zoom and remains responsive.
