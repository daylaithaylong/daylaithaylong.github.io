CRITICAL:
- Use repository edit tools to change ONLY the map widget code block.
- Do NOT reformat or rewrite whole HTML files.
- Output a minimal diff and apply only those lines.
- Do NOT modify any Vietnamese text anywhere (byte-for-byte).
- After edits, run a quick grep check: search for mojibake patterns (Ã, Â, á») and revert if any appear.
You will edit my repo directly.

HARD RULES:
1) Modify ONLY the floating map widget section (HTML container + its scoped CSS/JS).
2) Do NOT reformat / rewrite any other part of index.html/history.html.
3) Do NOT modify Vietnamese text anywhere (byte-for-byte). If unsure, DO NOT TOUCH it.
4) After changes, run a check: search edited files for “Ã” or “á»”. If found, revert your changes.

Tasks:
- Remove the fake review block (“Đánh giá 4.9…”, any hard-coded rating/review count).
- Replace “Thu gọn” and “Chỉ đường” text buttons with icon-only inline SVG buttons (arrow up/down for collapse; directions icon for directions). Keep aria-labels.
- Keep correct embed URL using lat/lng.

Deliverable:
- Commit-ready changes with minimal diffs and no Vietnamese corruption.
