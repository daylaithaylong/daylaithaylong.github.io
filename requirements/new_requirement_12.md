# Update History timeline milestones (rename + remove 2017/2018) — history.json + history.html

You are a front-end engineer working on my GitHub Pages static site. Please update the History timeline by **renaming milestones** and **removing milestones**. I already moved the photos from 2017 & 2018 into 2016, so you do NOT need to move any images. Provide a patch/diff.

## Scope
- `history.json` (or the data file that drives the timeline)
- `history.html` only if small renderer changes are required
- Do NOT change unrelated pages.

---

## Required changes

### 1) Rename milestone “2015” → “2007–2008”
- Find the milestone currently labeled **2015**.
- Change its displayed year/date to: **2007–2008**.
- Keep all existing images in that milestone unchanged.

### 2) Rename milestone “2016” → “2012–2014”
- Find the milestone currently labeled **2016**.
- Change its displayed year/date to: **2012–2014**.
- Keep its images unchanged (I already consolidated images myself).

### 3) Remove milestones “2017” and “2018”
- Remove the milestones currently labeled **2017** and **2018** entirely from the timeline data so they no longer render on the page.
- Do not attempt to move or merge photos (already done).

### 4) Rename milestone “2019” → “2015–2020”
- Find the milestone currently labeled **2019**.
- Change its displayed year/date to: **2015–2020**.
- Keep its images unchanged.

---

## Ordering rules
- Keep the timeline sorted chronologically.
- Target order should be:
  1) 2007–2008 (was 2015)
  2) 2012–2014 (was 2016)
  3) 2015–2020 (was 2019)
  4) Any later milestones (e.g. 2021) remain after that

---

## Data integrity
- Do not break image paths.
- Do not change highlight/gallery logic beyond what’s required for these label removals/renames.
- Ensure the page still renders with no errors.

---

## Deliverables
1) Patch/diff for `history.json` (and `history.html` only if needed).
2) Short summary of what was renamed/removed.
3) Confirm the timeline renders correctly and in the right order.
