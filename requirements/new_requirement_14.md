# Update history.json with newly added images + polish floating map buttons (icon-only)

You are a front-end engineer working on my GitHub Pages repo. Please implement the tasks below with minimal changes and provide a patch/diff. Ensure the website does not break (no missing paths, no JS errors, responsive layout).

## Scope
- `history.json` (and the History page renderer only if needed)
- `assets/history/**` (already contains new images I added)
- Floating map widget files:
  - `index.html` (or whichever page contains the widget)
  - the shared CSS/JS used by the widget (minimal edits)

---

## Task 1 — History: auto-include newly added images into `history.json`
I added many new images into the existing milestone folders under `assets/history/`. They are not listed in `history.json`, so they don’t show on the web.

### Requirements
1) Scan `assets/history/**` and find all image files (jpg/png/webp).
2) Update `history.json` so each milestone includes **all images that exist in its folder**:
   - Add new filenames that are missing in `images[]`.
   - Do not remove existing entries unless they point to missing files.
3) Ensure there are **no broken paths**:
   - Remove or fix entries that reference files that don’t exist.
4) Avoid duplicates:
   - Ensure each image appears only once per milestone.
5) Highlight logic:
   - If `highlightImage` exists and the file exists, keep it.
   - If `highlightImage` is missing or its file is missing, choose a highlight image:
     - Prefer filenames containing: `cover`, `highlight`, `main`, `thumb`
     - Otherwise pick the first image (sorted by filename).
   - If a highlight image is also present in `images[]`, that’s OK, but do not duplicate it.
6) Sorting:
   - Keep images sorted by filename for stable ordering.
   - Keep milestone order unchanged.

### Acceptance criteria
- All new images appear on the History page after rebuild.
- No 404 images and no page layout break.

---

## Task 2 — Floating map widget: replace “Thu gọn” & “Chỉ đường” text with icon buttons
The current text buttons look ugly and not aesthetic. Replace them with clean icon buttons.

### Requirements
1) Replace the two buttons:
   - “Thu gọn” (collapse)
   - “Chỉ đường” (directions)
   with **icon-only buttons** (or icon + tooltip).
2) Use inline SVG icons (preferred) or an icon set already used in the repo.
3) Accessibility:
   - Add `aria-label="Thu gọn bản đồ"` for collapse button
   - Add `aria-label="Chỉ đường trên Google Maps"` for directions button
4) Visual consistency:
   - Same size for both buttons (e.g. 36–40px square)
   - Rounded/circular style, subtle hover/focus states
   - Icons should not look stretched (preserve aspect ratio)
5) Preserve behavior:
   - Collapse button toggles widget open/close
   - Directions button opens Google Maps in a new tab (existing link behavior)

---

## Deliverables
1) Patch/diff for all changed files.
2) Short summary of:
   - how you updated `history.json` (how images were discovered, how highlight chosen)
   - how you changed the map buttons (which icons, where applied)
3) Confirm:
   - History page loads with all new images and no missing paths
   - Map widget buttons look clean on desktop + mobile and remain accessible
