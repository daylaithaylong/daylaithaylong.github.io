# Add a floating Google Map widget + show review summary (GitHub Pages)

You are a front-end engineer working on my GitHub Pages static website. Please add an embedded Google Map for my location and optionally display a clean “review summary” on the page.

## Goal
- Embed a Google Map pointing to my location: `https://maps.app.goo.gl/d4QQDNPNAz5pJkUJ9`
- Make it a **floating widget** fixed at the **bottom-right corner**, on a layer above the webpage (like a chat bubble / sticky card).
- Optionally show a nice, clean **rating + number of reviews** somewhere on the page (preferably integrated with the map widget UI).

## Constraints
- GitHub Pages static site only (no backend).
- Keep the UI **minimal, modern, not intrusive**.
- Must be responsive:
  - Desktop: widget visible at bottom-right
  - Mobile: smaller size or collapsible to avoid blocking content
- Must not slow down the page too much (lazy-load if possible).

---

## Task A — Floating map widget (bottom-right overlay)
Implement a floating map card that:
- Uses an **iframe embed** (Google Maps embed) pointing to the correct place.
- Has a small header area with:
  - “Xem bản đồ” / “Google Maps”
  - a button to **expand/collapse** the widget
  - a button/link “Chỉ đường” that opens Google Maps in a new tab
- Default behavior:
  - Collapsed on mobile (or small preview) to avoid covering content
  - Expand on click/tap

### UI requirements
- `position: fixed; right: 16px; bottom: 16px; z-index: 9999;`
- Rounded corners + shadow
- Smooth open/close animation
- Accessible (keyboard focus, aria labels)

---

## Task B — Show rating + review count (best-effort)
I want to display the **star rating** and **number of reviews** (the “reviews summary” shown on Google Maps) as a nice UI element.

### Important note
A static site **cannot reliably fetch live Google review counts** from Google Maps without using an API key or backend.

### Implementation options (choose the best and explain)
1) **Recommended (simple + compliant):** Add a small “Review summary” card with **manually configurable** values:
   - `rating` (e.g. 4.9)
   - `reviewCount` (e.g. 120)
   - link: “Xem đánh giá” -> opens Google Maps place page
   - Put this near the floating map widget or in the contact section.

2) **If feasible without breaking policy:** If the project already uses Google Places API and has an API key, you can fetch rating/review count from Places API and render it. If not, do NOT add keys in code; keep it manual.

### UI requirements for review summary
- Small card style (minimal):
  - ⭐ rating
  - number of reviews in parentheses
  - “Xem đánh giá” link
- Must look consistent with existing site typography/colors.

---

## Deliverables
1) Patch/diff with changes:
   - `index.html` (and/or shared layout)
   - CSS additions
   - minimal JS for toggle/lazy-load
2) Brief explanation of which review-count option you implemented and why.
3) Confirm it works on desktop + mobile and does not block important content.

