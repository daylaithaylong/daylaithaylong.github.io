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
