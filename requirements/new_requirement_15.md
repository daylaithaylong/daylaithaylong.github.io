# Fix Vietnamese text rendering (encoding/font) — currently shows garbled characters like “HÃ nh trÃ¬nh…”

You are a front-end engineer working on my GitHub Pages static site. After recent changes, Vietnamese text is displaying in the wrong format (mojibake), e.g.:
- “HÃ nh trÃ¬nh Dạy lái Thầy Long”
- Header/nav labels show broken Vietnamese characters

This indicates a UTF-8 encoding / charset / font loading issue. Please fix it so Vietnamese displays correctly everywhere.

## Scope
- All HTML pages that show the broken text (at least `index.html` and `history.html`)
- Shared CSS/JS only if needed (minimal changes)

---

## Task A — Ensure correct UTF-8 encoding in every HTML page
For each affected HTML file:
1) Ensure the file is saved as **UTF-8** (without changing the actual Vietnamese text content).
2) In `<head>`, ensure this meta tag exists and is placed near the top:
```html
<meta charset="UTF-8" />
