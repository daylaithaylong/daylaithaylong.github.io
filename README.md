# daylaithaylong.github.io

## History data
- Add or change milestone images under `assets/history/<folder>/` (jpg/png/webp) and run `npm run build:history` (or `node tools/gen_history.js`) to regenerate `history.json`.
- Set friendly titles/descriptions in `history-meta.json`; the script keeps those while auto-picking highlight images by filename (`cover/highlight/main/thumb`) or the first image.
- GitHub Actions workflow `.github/workflows/update-history.yml` auto-regenerates and commits `history.json` on pushes that touch history assets or metadata.
