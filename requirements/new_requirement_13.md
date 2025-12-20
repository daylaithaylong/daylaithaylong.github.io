# History timeline: rename milestones + clean up folders/images to match new ranges (small prompt)

You are a front-end engineer working on my GitHub Pages repo. I already changed the milestone labels (2007–2008, 2012–2014, 2015–2020) but I forgot to update the actual image folders/paths accordingly. Please fix the data + assets so everything matches and no broken images remain.

## Scope
- `assets/history/` folders
- `history.json` (or the data file powering `history.html`)
- `history.html` only if needed (avoid refactors)

## What to do
1) **Scan the repo** to detect the current image folders and filenames under `assets/history/`.
2) Update `history.json` so each milestone points to **existing** image paths (no 404):
   - Milestone A: **2007–2008**
   - Milestone B: **2012–2014**
   - Milestone C: **2015–2020**
   - Keep later milestones (e.g. 2021) unchanged.
3) **Re-organize folders** under `assets/history/` to match the new milestone ranges:
   - Create folders:  
     - `assets/history/2007-2008/`  
     - `assets/history/2012-2014/`  
     - `assets/history/2015-2020/`
   - Move images from old year folders into the correct new range folder.
   - Preserve existing highlight/featured logic:
     - If there is a “cover/highlight/main” file, keep it as highlight.
     - Otherwise pick the first image as highlight.
4) **Delete old folders** that are no longer used (e.g. `2015/`, `2016/`, `2017/`, `2018/`, `2019/`, `2020/`), but only after confirming all files were moved.
5) Ensure `history.html` still renders correctly and no image paths break.

## Deliverables
- Patch/diff showing:
  - folder changes under `assets/history/`
  - updated `history.json` paths
- Confirm there are no missing images (no 404) and timeline still works.
