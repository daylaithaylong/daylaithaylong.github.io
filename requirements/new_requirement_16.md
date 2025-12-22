# Floating Map widget polish (remove fake review data + icon buttons) — DO NOT break Vietnamese text

You are a front-end engineer working on my GitHub Pages static site. Please update the floating Google Map widget UI. **Important:** previous changes accidentally broke Vietnamese text rendering across the site, so in this task you must be extremely careful to NOT introduce any encoding/font changes.

## Non-negotiable rule: Preserve Vietnamese text rendering
- **Do NOT** change Vietnamese strings/content across the site.
- **Do NOT** re-encode files or replace text with garbled characters.
- **Do NOT** change `<meta charset="UTF-8">` (keep it as-is).
- **Do NOT** change fonts/imports unless absolutely required for the map widget only.
- Keep changes scoped only to the map widget markup/styles/scripts.

If you need to edit files, ensure they remain UTF-8 and Vietnamese displays correctly after changes.

---

## Scope
- Only the files that implement the floating map widget (likely `index.html` + shared CSS/JS used by the widget).
- Do not modify `history.html` or other pages unless the widget is shared there.

---

## Task A — Remove fake rating/review UI (hard-coded data)
Right now the widget shows hard-coded values like:
- “⭐ 4.9”
- “(120 đánh giá)”
- and any combined string like “Đánh giá 4.9 trên 120 lượt”

These are not actual live Google data and are misleading.

### Requirements
1) Remove the entire rating/review display block from the widget UI (not hide).
2) Keep only a clean link such as:
   - “Xem đánh giá trên Google”
   that opens the real Google Maps place page in a new tab.
3) Do not show any numeric rating/review count anywhere in the widget.

Acceptance criteria:
- No fake numbers remain on the widget.
- Users can still click to view real reviews on Google Maps.

---

## Task B — Replace ugly text buttons with minimal icon buttons
The current text buttons “Thu gọn” and “Chỉ đường” look ugly. Replace with icons.

### Requirements
1) Convert the two buttons into **icon-only** buttons:
   - Collapse/Expand button (was “Thu gọn”)
   - Directions button (was “Chỉ đường”)
2) Use inline SVG (preferred) so there are no external dependencies.

### Icon details
- Collapse/Expand:
  - Use a simple minimal arrow icon
  - Arrow points **down** when the widget is collapsed (meaning “expand”)
  - Arrow points **up** when the widget is expanded (meaning “collapse”)
- Directions:
  - Use an icon similar to Google Maps “directions/route” (simple arrow/route style)
3) Accessibility:
   - Collapse button:
     - `aria-label="Thu gọn bản đồ"` when expanded
     - `aria-label="Mở bản đồ"` when collapsed
   - Directions button:
     - `aria-label="Chỉ đường trên Google Maps"`
   - Keep keyboard focus and visible focus styles

### UI styling
- Buttons should look modern:
  - same size (36–40px)
  - circular/rounded
  - subtle hover/focus state
  - icons centered and not stretched

Acceptance criteria:
- No text labels “Thu gọn / Chỉ đường” displayed on buttons.
- Icons look consistent and aesthetic on desktop + mobile.
- Collapse arrow direction changes correctly based on state.
- Directions button still opens Google Maps in a new tab.

---

## Deliverables
1) Patch/diff of the exact changes (HTML/CSS/JS).
2) Brief summary of what was removed/changed.
3) Confirm checklist:
   - ✅ Vietnamese text across the site is unchanged and still displays correctly
   - ✅ Fake review numbers removed
   - ✅ Icon buttons implemented with correct behaviors
