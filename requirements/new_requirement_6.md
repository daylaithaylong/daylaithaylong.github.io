# History page: downscale featured images (display ~800×400) without breaking aspect ratio/UI

You are a front-end engineer working on my GitHub Pages static site. Please fix the **featured (highlight) image** on `history.html`. The raw featured image files are very large (e.g. ~4014×518), so even if CSS constrains layout, it still renders too big and impacts UI/performance.

## Scope
- `history.html`
- only the CSS/JS that `history.html` uses (minimal changes)

---

## Goal
Make the featured image display at approximately **800×400** (approximate means you can keep the image’s natural ratio). The UI must remain clean and responsive.

### Hard requirements
1) **Do not stretch or distort** the image:
   - Preserve aspect ratio (no squishing).
2) Featured image must never overflow or break layout on any screen size:
   - Desktop: looks like a wide hero card, not giant.
   - Mobile: scales down smoothly.
3) Prefer a solution that also improves loading performance.

---

## Implementation requirements (choose the best practical option)
### Option A (recommended): CSS + container constraints (no image processing)
- Wrap featured image in a `.featured-media` container with a fixed visual size target:
  - target display width: up to ~800px
  - target display height: ~400px (or ratio-friendly)
- Use:
  - `max-width: 800px; width: 100%;`
  - `aspect-ratio: 2 / 1;` (or an appropriate ratio that works best with our images)
  - `max-height` constraints (e.g. 420px)
  - `object-fit: cover;` to avoid distortion
- Ensure container is centered and matches the card spacing.

### Option B (best performance): Generate resized featured images + use them
If the repo already contains very large featured images, create a **resized copy** for each featured image (e.g. `featured-800.webp` or `featured-800.jpg`) and update the data (`history.json` or equivalent) to reference the smaller file.

Requirements for Option B:
- Keep aspect ratio when resizing; aim for around **800px wide** and around **400px tall**
