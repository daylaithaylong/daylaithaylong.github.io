# Fix History Page (history.html) — remove helper text, fix broken featured image, add placeholder for missing featured image

You are a front-end engineer. I attached my repo source as `daylaithaylong.github.io.rar` and a screenshot of the current History page. Please make the following updates (keep the site clean, modern, and responsive). Provide a **patch/diff** (or exact file-by-file changes).

## Scope
- Focus on **History page** only:
  - `history.html`
  - and any related CSS/JS used by the History page (only if needed to fix layout/placeholder).

## Task 1 — Remove the helper line under the History page title
In `history.html`, remove this exact line (it currently appears under the main title):
> `Dữ liệu được lấy từ history.json để bạn dễ cập nhật thêm các mốc mới.`

Requirements:
- Remove it completely from the UI (not just hide it with CSS).
- Do not change the rest of the heading layout.

## Task 2 — Fix broken “highlighted/featured” image sizing
Problem: The featured (highlight) image for each year is visually broken (wrong size / stretched / causes layout issues as in the screenshot).

Requirements:
- Ensure the featured image renders at a logical size and never “breaks” the layout.
- Make it responsive:
  - Full width of its container
  - Stable height behavior (no huge overflow)
  - Preserve aspect ratio
- Suggested approach (you may adjust if current structure differs):
  - Wrap the featured image in a container (e.g. `.featured-media`)
  - Use CSS with `aspect-ratio` (recommended) and `object-fit: cover`

Acceptance criteria:
- The featured image looks like a clean hero card for that year.
- No stretching, no weird cropping, no overlay artifact.
- Works on mobile and desktop.

## Task 3 — Placeholder for years without a featured image
Some years do not have a highlighted/featured image.

Requirement:
- When there is no featured image for a year (missing path or empty value in data), show a **nice SVG placeholder** in the featured image area.
- The placeholder should match the site style (minimal, subtle).
- It can include:
  - a simple icon (camera/photo)
  - the year label (optional)
  - a short text like “Chưa có ảnh nổi bật”

Implementation options (pick the best):
1) **Best UX:** If `highlightImage` is missing, render a placeholder `<div class="featured-placeholder">...</div>` with inline SVG.
2) Also handle broken image URLs:
   - If an image fails to load, swap it to the same placeholder using `onerror` or JS.

Acceptance criteria:
- Every year has a consistent featured area (eith
