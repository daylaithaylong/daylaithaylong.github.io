# UI/UX Upgrade + New Pages Request (GitHub Pages)

You are a front-end engineer. I have a GitHub Pages static website for my driving center: **Day lái Thầy Long**. The current homepage has a hero banner image, large headline text (“VỮNG TAY LÁI – VỮNG TƯƠNG LAI”), and a top-right **“Liên hệ”** dropdown button (see attached screenshot).

## Goals
1) Upgrade UI/UX so the site looks **clean, modern, smooth**, and is **easy to navigate**.  
2) Add a new page to showcase my driving center’s **history/journey** using a **timeline** layout with images from a folder in the repo.  
3) Move the current **video section** (or create a dedicated video section if it exists on homepage) into a **separate new page**, accessible via a **button** and also via the site navigation.

## Constraints
- Must remain compatible with **GitHub Pages** (no server).
- Keep the overall style **minimal / modern**, not cluttered.
- Responsive (mobile + desktop) and fast (optimize images, lazy-load).
- Keep existing Vietnamese content unless changes improve clarity.
- Do not break existing pages/links.

---

## Task A — Add “History / Hành trình” timeline page
Create a new page, e.g. `history.html` (or `/history/index.html`), and add a navigation link in the header (e.g. “Hành trình” / “Lịch sử”).

### Timeline UI requirements
- A **vertical timeline** (straight line).
- Each milestone includes:
  - `date` (year/month)
  - `title`
  - `desc` (short description)
  - a **horizontal image row** (multiple images per milestone)
- Each milestone may have multiple images displayed **horizontally** (scrollable row or carousel).
- Images must load from a folder inside the repo, e.g. `assets/history/`.
- Prefer data-driven rendering:
  - Create `history.json` (or a JS object) listing milestones + image filenames.
  - The page reads the data and renders the timeline automatically.
- Optional but recommended:
  - Lightbox click-to-zoom
  - Lazy-loading
  - Graceful fallback if an image is missing



### Example data structure (DO NOT break the markdown formatting)
```json
[
  {
    "date": "2019",
    "title": "Khởi đầu",
    "desc": "Bắt đầu nhận học viên và xây nền tảng.",
    "images": ["2019-01.jpg", "2019-02.jpg"]
  },
  {
    "date": "2022",
    "title": "Mở rộng",
    "desc": "Tăng số lượng xe và lịch học linh hoạt hơn.",
    "images": ["2022-01.jpg", "2022-02.jpg", "2022-03.jpg"]
  }
]
```

```md
## Task B — Create a separate “Videos / Video học lái” page + navigation button

Create a new page, e.g. `videos.html` (or `/videos/index.html`), to host all driving-related videos. The homepage should no longer contain the full video section; it should link to this new page.

### B1) Navigation + homepage button
- Add a **header navigation item** (e.g. “Video”) linking to the video page.
- Add a clear **CTA button on the homepage** that navigates to the video page:
  - Example button text: **“Xem video hướng dẫn”** or **“Kho video học lái”**
- Keep the button style consistent with the site (minimal, modern, rounded, subtle shadow/hover).

### B2) Move or rebuild the video section
- If the homepage already has a “video section”, **move it entirely** to the new video page.
- If videos are currently scattered or only linked, create a dedicated “Video Library” section on the new page.

### B3) Video page layout (clean + modern)
- Page header:
  - Title (H1): “Kho video học lái” (or similar)
  - Short intro paragraph (1–2 lines)
- Main content:
  - Responsive **grid of video cards**
  - Each card includes: thumbnail, title, short description, tags, and a “Watch / Xem” action
- Optional but recommended:
  - Tag filter (Beginner / Sa hình / Mẹo thi / Kỹ thuật / Kinh nghiệm)
  - Search input (client-side)

### B4) Data-driven rendering (preferred)
Use a JSON file (recommended) to avoid hardcoding videos in HTML.

- Create `videos.json` (or a JS array) with fields like:
  - `id`
  - `title`
  - `desc`
  - `provider` (youtube/local)
  - `url` or `youtubeId`
  - `thumbnail`
  - `tags` (array)

Example `videos.json` format:
```json
[
  {
    "id": "sa-hinh-01",
    "title": "Lùi chuồng: Mẹo canh vạch nhanh",
    "desc": "Cách canh vô lăng và điểm dừng để vào chuồng chuẩn.",
    "provider": "youtube",
    "youtubeId": "XXXXXXXXXXX",
    "thumbnail": "assets/videos/thumb-sa-hinh-01.jpg",
    "tags": ["Sa hình", "Beginner"]
  }
]
```

- The `videos.html` page should:
  - Load `videos.json`
  - Render the grid automatically
  - Render tag filters based on existing tags

### B5) Video playback behavior
Choose ONE of these approaches (prefer the cleanest UX):
- **Option 1 (recommended):** Click card opens a modal/lightbox with the embedded YouTube player.
- **Option 2:** Click card navigates to a `video-detail.html?id=...` page that loads the correct embed.
- **Option 3:** Inline embed inside card (only if performance is acceptable).

### B6) Performance + accessibility
- Lazy-load thumbnails and avoid loading all YouTube iframes at once (load on click).
- Ensure keyboard navigation works (tab to cards/buttons, ESC closes modal).
- Provide visible focus states and proper contrast.
- Mobile-first spacing and responsive grid (1 column on mobile, 2–3 on desktop).

### B7) Deliverables for Task B
- New page: `videos.html` (and optional `video-detail.html`)
- Data file: `videos.json`
- Updated nav/header in all pages + homepage CTA button
- Any new CSS/JS needed (keep lightweight)

---

## Task C — Homepage UI/UX improvements

Review the current homepage and implement improvements to make it cleaner and easier to find information.

### C1) Must improve (layout + clarity)
- Header/nav alignment, spacing, typography consistency (font size, line height).
- Hero section readability (overlay/contrast so text is readable on background image).
- Clear sections/anchors for quick scanning (e.g. “Ưu điểm”, “Học phí”, “Lịch học”, “Địa điểm”, “FAQ”, “Liên hệ”).
- Clear CTA hierarchy: one primary action + one secondary action.
- Smooth interactions (transitions, hover states, focus states, scroll behavior).

### C2) Dropdown issue (important)
The “Liên hệ” dropdown closes too fast when moving the mouse from the button to the menu. Fix it properly using one of:
- Increase hover-safe area, OR
- Add small open/close delay, OR
- Click-to-toggle + outside click to close  
Must work on desktop + mobile and be accessible (keyboard-friendly).

### C3) Accessibility + performance
- Semantic HTML, keyboard navigation, visible focus states, good contrast.
- Lazy-load images and avoid heavy JS.
- Respect reduced-motion preferences when adding animations.
- Ensure tap targets are large enough on mobile (buttons/links).

### C4) Deliverables for Task C
- Updated homepage HTML/CSS/JS with the improvements above
- Consistent navigation styling across all pages
- No broken links, responsive on mobile + desktop
```



