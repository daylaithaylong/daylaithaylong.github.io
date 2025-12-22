#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HISTORY_DIR = path.join(ROOT, 'assets', 'history');
const OUTPUT_FILE = path.join(ROOT, 'history.json');
const META_FILE = path.join(ROOT, 'history-meta.json');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const HIGHLIGHT_HINTS = ['cover', 'highlight', 'main', 'thumb'];

function readJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
}

function listFolders(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));
}

function listImages(folderPath) {
  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTS.has(path.extname(name).toLowerCase()));
}

function dedupeAndSort(files) {
  const seen = new Set();
  const unique = [];

  files.forEach((name) => {
    const key = name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    unique.push(name);
  });

  return unique.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));
}

function pickHighlight(files) {
  const lower = files.map((file) => file.toLowerCase());

  for (const hint of HIGHLIGHT_HINTS) {
    const index = lower.findIndex((name) => name.includes(hint));
    if (index >= 0) return files[index];
  }

  return files[0] || '';
}

function toWebPath(folderName, fileName) {
  return path.posix.join('assets', 'history', folderName, fileName);
}

function buildHistory() {
  const meta = readJson(META_FILE, {});
  const existingHistory = readJson(OUTPUT_FILE, []);
  const existingByYear = Array.isArray(existingHistory)
    ? existingHistory.reduce((acc, item) => {
        if (item && item.year) acc[item.year] = item;
        return acc;
      }, {})
    : {};

  const folders = listFolders(HISTORY_DIR);
  const historyItems = [];

  folders.forEach((folderName) => {
    const images = dedupeAndSort(listImages(path.join(HISTORY_DIR, folderName)));

    if (!images.length) {
      console.warn(`Skipping ${folderName}: no images found`);
      return;
    }

    const highlightFile = pickHighlight(images);
    const highlightImage = highlightFile ? toWebPath(folderName, highlightFile) : '';
    const imagesWithPaths = images.map((file) => toWebPath(folderName, file));

    const metaForFolder = meta[folderName] || {};
    const existing = existingByYear[folderName] || {};

    const title = metaForFolder.title ?? existing.title ?? `Cot moc ${folderName}`;
    const desc = metaForFolder.desc ?? existing.desc ?? '';

    historyItems.push({
      year: folderName,
      title,
      desc,
      highlightImage,
      images: imagesWithPaths,
    });
  });

  return historyItems;
}

function writeHistory(items) {
  const payload = JSON.stringify(items, null, 2) + '\n';
  fs.writeFileSync(OUTPUT_FILE, payload);
}

function main() {
  const items = buildHistory();
  writeHistory(items);
  console.log(`Generated ${items.length} milestone(s) in ${path.relative(ROOT, OUTPUT_FILE)}`);
}

main();
