# UI polish: Contact dropdown text alignment + History milestones meaningful descriptions

You are a front-end engineer working on my GitHub Pages static site. Please apply the changes below with minimal edits, keep the UI clean/modern, and provide a patch/diff.

## Scope
- `index.html` (contact dropdown UI)
- `history.html` + `history.json` (or whatever data file is used to render the timeline milestones)
- Related CSS/JS only if needed for layout/text wrapping

---

## Task A — Contact dropdown: fix line breaks + keep all items consistent
In the “Liên hệ” dropdown menu (contact list), the 2nd line text is inconsistent:

- “TikTok Video hướng dẫn” currently appears on the same line and looks cramped.
- “Fanpage Cập nhật thông tin” also needs consistent wrapping.

### Requirements
1) Make the secondary text line-break nicely so each item has the same structure:
   - Line 1: platform name (Facebook cá nhân / TikTok / Fanpage)
   - Line 2: short description (Kết nối trực tiếp / Video hướng dẫn / Cập nhật thông tin)
2) The layout of all 3 items must be visually consistent:
   - same icon size and alignment
   - same typography (font size/weight) for title vs subtitle
   - same spacing between title and subtitle
3) Implementation preference:
   - Do NOT hardcode `<br>` unless necessary.
   - Prefer using HTML structure like:
     - `<div class="label">TikTok</div>`
     - `<div class="sub">Video hướng dẫn</div>`
   - Or CSS that forces the subtitle to display on a new line (e.g. `display:block`).

Acceptance criteria:
- All 3 items look uniform (title on top, subtitle below) and readable at normal zoom.
- No awkward wrapping that makes only one item different.

---

## Task B — History timeline: add meaningful descriptions for each milestone/year
On `history.html`, each year milestone should include a meaningful description text (1–2 sentences) to make the timeline more engaging.

Please update the timeline data (preferably `history.json`) to include `desc` (or update the existing field) for these years:

- **2015:** “Chiếc xe đầu tiên”  
- **2016:** Continue adding more cars (Vietnamese phrasing; keep natural)  
- **2017–2018:** “Được nhiều anh chị yêu mến và ủng hộ” (can refine)  
- **2019:** Upgrade both teachers/team and vehicles (Vietnamese phrasing; keep natural)  
- **2021:** Enough cars and teachers to provide professional, high-quality, private service (Vietnamese phrasing; keep natural)

### Requirements
1) Improve the Vietnamese copy to be smooth and professional, but still warm and friendly.
2) If your data is strictly one milestone per year:
   - Put **2017** and **2018** as separate milestones with consistent wording, OR
   - Keep one milestone and choose either 2017 or 2018 (whichever fits the current data format).
   - Do NOT break the renderer.
3) Ensure `history.html` renders the description under each year title (if it doesn’t already, add it).

Example target structure:
```json
{
  "year": "2015",
  "title": "Cột mốc 2015",
  "desc": "Chiếc xe đầu tiên — khởi đầu cho hành trình Dạy lái Thầy Long.",
  "highlightImage": "...",
  "images": ["..."]
}
```
# Acceptance criteria:

1. Each year shows a short description below the milestone title.

2. Copy feels meaningful and consistent across years.

# Deliverables
Patch/diff for:
- index.html (dropdown text structure/wrapping)
- history.json (or equivalent data file)
- history.html (render description if needed)
- CSS/JS if you touched them
