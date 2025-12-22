# Make History page auto-update images (no manual editing of history.json)

You are a front-end engineer. My site is hosted on GitHub Pages (static). Today `history.html` fetches `history.json`, but I change/add images frequently and updating JSON manually is annoying.

## Important constraint
Client-side JavaScript on GitHub Pages cannot reliably list folders (no directory listing). So a truly “scan /assets/history folders at runtime” approach is NOT possible without an API or a generated manifest.

## Goal
Implement a “dynamic” workflow where I can just drop images into `assets/history/<milestone>/` folders and the site automatically updates, with minimal manual work.

---

## Preferred solution (Option A): Auto-generate history.json via script + optional GitHub Actions
### A1) Create a generator script
Add a script (Node.js or Python) that:
1) Scans `assets/history/**` for image files (`.jpg .jpeg .png .webp`).
2) Treats each direct subfolder as a milestone (e.g. `assets/history/2015/`, `assets/history/2016/`, or `assets/history/2015-2020/`).
3) Outputs/overwrites `history.json` in the format currently used by `history.html`:
   - `year` (or `date` label derived from folder name)
   - `title` (e.g. `Cột mốc <folderName>` unless already mapped)
   - `desc` (optional: keep existing if a mapping file exists)
   - `highlightImage`: choose by naming convention (`cover|highlight|main|thumb`), else first image
   - `images[]`: all images sorted by filename
4) Ensures stable ordering and no duplicates.

### A2) Keep existing descriptions
I still want meaningful descriptions per milestone. Implement one of:
- Maintain a small `history-meta.json` mapping `{folderName: {title, desc}}`, merged into generated output, OR
- Preserve `title/desc` from existing `history.json` by matching folderName, while refreshing image lists.

### A3) How I run it
- Add an npm script or simple command:
  - `npm run build:history` OR `python tools/gen_history.py`
- Document it in README (2–3 lines).

### A4) Optional: GitHub Actions automation
Add a GitHub Action workflow:
- Trigger on push when files change under `assets/history/**`
- Run the generator
- Commit updated `history.json` back to the repo automatically

---

