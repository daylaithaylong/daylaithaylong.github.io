# Request: Update only `index.html` (Homepage) — precise DOM edits + keep UI clean

You are a front-end engineer working on my GitHub Pages site. **All changes in this request must be applied ONLY inside `index.html`** (do not modify other pages/files unless absolutely required for layout consistency).

## Goal
Make small, targeted homepage edits to reduce visual clutter (because we already have separate pages for History and Videos) while keeping the layout **clean, modern, and responsive**.

## Constraints
- Keep existing styling and component structure as much as possible.
- Do not break responsive layout on mobile/tablet/desktop.
- If an element or section doesn’t exist exactly as described, **search for the closest matching section/class/id** and apply the intent safely.
- Provide a patch/diff (or clearly show before/after snippets) for `index.html`.

---

## Required changes in `index.html`

### 1) Add a new highlight/feature card (section `id="highlights"`)
In `index.html`, locate:
- `section id="highlights"`
- inside it, the container holding `.feature-card` items

Add **one more** `.feature-card` with this content (Vietnamese, keep it exactly):
> **"Thầy dạy vui tính, chỉ dẫn từ từ, học thoải mái, không áp lực."**

#### Layout requirement
- Rearrange/adjust markup if needed so the new card **does not break the grid**.
- Ensure the cards remain evenly spaced and look consistent across screen sizes.

---

### 2) Move the “Xem hành trình phát triển” button into the hero actions
Find the button with text:
- **"Xem hành trình phát triển"**

Move it to:
- `section class="hero" -> div class="hero-actions"`

Place it **next to** the button:
- **"Kho video học lái"**

#### Layout requirement
- Ensure both buttons align nicely on desktop and stack nicely on mobile.
- Keep consistent button style (primary/secondary as currently used).

---

### 3) Remove the homepage “journey” section
Because we already have a separate History page, remove the entire section:
- `section id="journey"`

Remove it completely from `index.html` (including any internal markup).

---

### 4) Remove the homepage “video CTA” section
Because we already have a separate Video page, remove the entire section:
- `section id="video-cta"`

Remove it completely from `index.html`.

---

### 5) Remove FAQ section and its header button
- Remove the entire section:
  - `section id="faq"` (at the bottom)
- Also remove the corresponding **FAQ button/link** in the header navigation (the header button that scrolls to `#faq` or references FAQ).

---

### 6) Remove the “Cần gấp?” accent info card in courses
In `section id="courses"`, remove the element:
- `div class="info-card accent"`  
  (the one containing the text **"Cần gấp?"**)

Remove only that accent card, and ensure the remaining layout still looks balanced.

---

## Deliverables
1) Provide the updated `index.html` changes as:
   - a unified diff/patch, OR
   - clear “before/after” code snippets with exact locations.
2) Briefly list what you changed (1–2 lines per bullet).
3) Confirm the homepage still looks good on mobile and desktop (no broken grid/spacing).

## Acceptance checklist
- ✅ New highlight card added without breaking layout  
- ✅ “Xem hành trình phát triển” button moved into `.hero-actions` next to “Kho video học lái”  
- ✅ Removed: `#journey`, `#video-cta`, `#faq` sections  
- ✅ Removed: FAQ header button/link  
- ✅ Removed: `.info-card.accent` containing “Cần gấp?”  
- ✅ No visual clutter; layout remains clean and responsive
