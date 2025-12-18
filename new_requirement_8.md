# Targeted UI cleanup + header/menu icon fixes (index.html + history.html)

You are a front-end engineer working on my GitHub Pages static site. Please apply the changes below with **minimal edits**, keep the site **clean and modern**, and provide a **patch/diff**.

## Scope (ONLY these files unless absolutely necessary)
- `index.html`
- `history.html`
- If needed for icons sizing only: the shared CSS file used by the header/menu (e.g. `styles.css` / `main.css`) — do not refactor unrelated styles.

---

## Task A — `index.html`: remove hero quick-info badges
In `index.html`, locate and remove **all** of the following block(s) to reduce text clutter:

- `<div class="hero-badges" aria-label="Thông tin nhanh"> ... </div>`

Requirements:
- Remove the entire `div.hero-badges` element(s) completely (not hidden via CSS).
- Ensure the hero section spacing still looks balanced after removal:
  - no awkward empty gaps
  - keep hero title/subtitle/buttons aligned nicely

---

## Task B — `history.html`: remove “FAQ” from the header navigation
In `history.html`, there is still a “FAQ” item in the top navigation. Remove it.

Requirements:
- Remove the **FAQ nav link/button** from the header in `history.html`.
- If the FAQ link points to `#faq` or `index.html#faq`, remove that item entirely.
- Do not break spacing/alignment of the remaining header nav items.

---

## Task C — “Liên hệ” dropdown: fix icon sizing/ratio (Facebook + Fanpage icons)
Problem: In the “Liên hệ” dropdown list, the icons look distorted or inconsistent (especially the Facebook icon and the Fanpage icon). Their aspect ratio/size feels “weird”.

Requirements:
- Make all dropdown icons consistent:
  - same width/height (e.g. 36×36 or 40×40)
  - preserve aspect ratio (no stretching)
  - centered inside a fixed icon container
- Use a consistent style for icons:
  - if using `<img>`, apply `object-fit: contain;`
  - if using SVG/font icons, normalize `viewBox` and set fixed dimensions via CSS
- Ensure text alignment remains clean (icon + label + subtext aligned).
- Do not change the dropdown content text, only improve sizing/layout.

Suggested CSS approach (apply to your actual class names):
- Create a wrapper like `.contact-icon` with fixed `width/height` and `displa
