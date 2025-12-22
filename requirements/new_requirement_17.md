# Re-apply ONLY the map widget enhancements — ZERO changes to Vietnamese text (critical)

You are a front-end engineer. I will revert my latest commit because Codex corrupted Vietnamese text in many HTML pages (mojibake). HOWEVER, that commit also contained real improvements to my floating Google Map widget, and I still want to keep/re-apply those map enhancements.

## Absolute non-negotiable rules (must follow)
1) **DO NOT modify any Vietnamese text content anywhere** (no rewording, no formatting, no escaping changes).
2) **DO NOT run prettify/format on whole HTML files.** Only do minimal, targeted edits inside the map widget code block.
3) **DO NOT change file encoding.** All edited files must remain UTF-8.
4) **DO NOT touch any page sections unrelated to the map widget.** No header, hero, timeline, cards, etc.
5) Your output must be a minimal diff. If you need to add new HTML, add it inside the existing map widget container only.

## Safety workflow (required)
- First, locate the floating map widget implementation (HTML container + related CSS + related JS).
- Only edit those files/sections.
- Before finalizing, verify that Vietnamese strings in `index.html` / `history.html` are unchanged outside the map widget block.

---

## Goal
Re-apply the map widget enhancements after I revert the corrupted commit, while keeping all Vietnamese text intact.

### Map enhancements to keep / re-implement
**Task A — Remove fake rating/review numbers**
- Remove any hard-coded rating/review UI such as:
  - “⭐ 4.9”, “(120 đánh giá)”, or “Đánh giá 4.9 trên 120 lượt”
- Replace with a single link (no numbers):
  - “Xem đánh giá trên Google” (opens Google Maps place URL in a new tab)

**Task B — Replace “Thu gọn” and “Chỉ đường” text buttons with icon-only buttons**
- Replace the text buttons with icon buttons using inline SVG (no external libs).
- Collapse/expand button:
  - minimal arrow icon
  - arrow points **down** when collapsed, **up** when expanded
  - update `aria-label` appropriately:
    - collapsed: `aria-label="Mở bản đồ"`
    - expanded: `aria-label="Thu gọn bản đồ"`
- Directions button:
  - simple “directions/route” style icon (Google Maps-like)
  - `aria-label="Chỉ đường trên Google Maps"`
  - opens directions in new tab using my lat/lng:
    - `https://www.google.com/maps?daddr=10.0239479,105.7551907`

**Task C — Keep the map embed correct**
- Ensure iframe uses proper embed URL (not maps.app.goo.gl):
  - `https://www.google.com/maps?q=10.0239479,105.7551907&z=17&output=embed`
- Add:
  - `loading="lazy"`
  - `referrerpolicy="no-referrer-when-downgrade"`
- Keep widget responsive and not blocking content on mobile.

---

## Implementation constraints
- Prefer to implement icons and UI using:
  - inline SVG
  - small CSS additions scoped to the widget container (e.g. `.map-widget ...`)
- If you need to change CSS:
  - ONLY add/modify rules under a clearly scoped selector for the widget
  - DO NOT touch global typography/fonts

---

## Deliverables
1) Minimal patch/diff only (HTML/CSS/JS) for the map widget.
2) Confirm:
   - ✅ Vietnamese text across the site is unchanged (no mojibake)
   - ✅ fake rating/review numbers removed
   - ✅ icon buttons implemented with correct behavior + aria-labels
   - ✅ map embed shows correct location
