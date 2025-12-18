# Request: Homepage cleanup + History page uses real images (GitHub Pages)

You are a front-end engineer working on my GitHub Pages site (static HTML/CSS/JS). My current prompt is unclear—please follow the requirements below and implement the changes cleanly.

## Constraints
- Keep the design **clean, modern, minimal**, and responsive.
- Do not add any server-side code (GitHub Pages only).
- Prefer **small, targeted edits** (don’t rewrite unrelated sections).
- Provide a **patch/diff** (or clear file-by-file code changes).

---

## Task 1 — `index.html`: remove “Lịch học” split-pane
In `index.html`, locate the **split-pane** UI block/section that displays **“Lịch học”** (the two-column / split layout used to present schedule info).

### Requirements
- Remove this “Lịch học” split-pane block completely from `index.html`.
- Ensure the remaining layout does **not** look empty or broken:
  - spacing between adjacent sections should remain consistent
  - no orphaned divs, separators, or anchors
- Do not remove other unrelated “courses” or pricing content unless it is part of that split-pane.

### Deliverable
- Update `index.html` only for this task and confirm the page still looks good on mobile + desktop.

---

## Task 2 — History page: replace placeholders with real images from `assets/history/2015..2021`
I already added real images into the repo at:

- `assets/history/2015/`
- `assets/history/2016/`
- `assets/history/2017/`
- `assets/history/2018/`
- `assets/history/2019/`
- `assets/history/2021/`

Each year folder contains multiple images, and **one “highlight” image** that should be displayed as the **representative image** of that year (bigger, emphasized, or featured).

### Requirements (Timeline rendering)
- On the History page (e.g. `history.html`):
  - Render a **vertical timeline** with milestones for each year **2015 → 2021**.
  - For each year:
    - Show the year label
    - Show a featured/representative **highlight image** (bigger/emphasized)
    - Show the remaining images in a **horizontal row** (scrollable on mobile)
- Replace ALL placeholder images/entries with actual images from those folders.

### Important technical notes (GitHub Pages)
Because static pages cannot list folder contents at runtime, do one of these:
1) **Preferred:** Update `history.json` (or a JS data file) with the real image paths for each year, including which one is the highlight image.
2) If the repo already has a build script, you may generate `history.json` automatically—but keep the output committed so the site works statically.

### Highlight image rule (use best effort)
- If there is an obvious naming convention for the highlight image (e.g. `cover.*`, `highlight.*`, `대표.*`, `main.*`), use it.
- If not, choose the **first** image in the folder as highlight and list the rest as gallery images.
- Do not break if a year has only 1 image (then highlight only, no gallery row).

### UX requirements
- Featured image should be visually emphasized (larger card, stronger shadow, or wider aspect).
- Gallery row should be smooth to scroll and not overflow awkwardly.
- Use lazy-loading for images.
- Optional: lightbox click-to-zoom.

### Deliverables
- Update the History page (`history.html` and related JS/CSS/data file).
- Update `history.json` (or equivalent) so each year 2015–2021 maps to:
  - `year`
  - `highlightImage` (full path)
  - `images[]` (full paths)

Example structure:
```json
[
  {
    "year": "2015",
    "highlightImage": "assets/history/2015/cover.jpg",
    "images": [
      "assets/history/2015/cover.jpg",
      "assets/history/2015/01.jpg",
      "assets/history/2015/02.jpg"
    ]
  }
]
