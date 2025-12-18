# Fix floating Google Maps widget: use lat/lng from the provided Google Maps place URL

You are a front-end engineer working on my GitHub Pages static site. I already have a floating Google Maps widget (bottom-right), but it currently shows a generic world map / warning and does NOT show my location.

## The correct coordinates (from my Google Maps place URL)
Use the place marker coordinates:
- **lat:** `10.0239479`
- **lng:** `105.7551907`

Google Maps place URL (for reference):
`https://www.google.com/maps/place/D%E1%BA%A1y+l%C3%A1i+th%E1%BA%A7y+Long/@10.0240981,105.755198,20.67z/data=!4m6!3m5!1s0x60edc4504549a0e1:0x9ef6f9d92d269d7b!8m2!3d10.0239479!4d105.7551907!16s%2Fg%2F11t_t835zt?entry=ttu`

## Goal
Make the embedded map display **my exact location** with a marker, and remove the weird warning/incorrect world map behavior.

## Constraints
- Static site only (GitHub Pages). No backend.
- No paid APIs required; use Google Maps iframe embed.
- Keep UI clean, responsive, and lightweight.
- Provide patch/diff.

---

## Task A — Replace the iframe src with a proper embed URL using lat/lng
Do NOT use `maps.app.goo.gl` short links inside iframe.

Use this embed format (preferred):
- `https://www.google.com/maps?q=10.0239479,105.7551907&z=17&output=embed`

Requirements:
- The iframe must show the correct place on load (marker visible).
- Add:
  - `loading="lazy"`
  - `referrerpolicy="no-referrer-when-downgrade"`
- Keep the map inside the floating widget container (no overflow).

---

## Task B — Remove the warning and ensure normal map rendering
After switching to the correct embed URL:
- The warning (“Không thể hiển thị một số nội dung tùy chỉnh…”) should disappear.
- The map should not show a generic world map.
- Ensure the iframe is not blocked by any overlay elements.

---

## Task C — Floating widget UX (bottom-right overlay)
- Keep it fixed bottom-right:
  - `position: fixed; right: 16px; bottom: 16px; z-index: 9999`
- Make it responsive:
  - Desktop size target: ~340–380px wide, ~220–260px tall
  - Mobile: smaller or collapsible so it doesn’t block content
- Add expand/collapse behavior:
  - Collapsed state = small pill/button (e.g. “Bản đồ”)
  - Expanded = iframe visible
- Add a “Chỉ đường” button/link that opens Google Maps in a new tab:
  - Use the provided place URL above OR use:
    - `https://www.google.com/maps?daddr=10.0239479,105.7551907`

---

## Task D — Review summary (manual values only)
Do NOT fetch rating/review count dynamically (no API).
- Display a small “review summary” UI:
  - rating: 4.9
  - reviewCount: 120
- Add “Xem đánh giá” link that opens the Google Maps place URL in a new tab.

---

## Deliverables
1) Patch/diff for modified files.
2) Brief explanation of why using `q=lat,lng&output=embed` fixes the issue.
3) Confirm it works on desktop + mobile and shows the correct location.
