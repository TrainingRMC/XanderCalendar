# Development Notes

This project is still intentionally lightweight: the live app is served from GitHub Pages, stores shared data in Firebase, and is used as an installed iPhone home-screen app.

## Important Safety Rule

Before changing any of these, warn Justin first because the change may affect the installed iPhone app or require extra testing:

- `sw.js`
- any future `manifest.json`
- app icons or home-screen install assets
- splitting `index.html` into new runtime CSS/JS files
- changing Firebase project config
- changing Firebase database or storage paths

## Current File Layout

- `index.html` - the full app UI, business logic, Firebase Auth/Database/Storage integration, dashboard, calendar, inbox, records, travel, summer planning, expenses, and receipts.
- `sw.js` - push notification service worker only.
- `database.rules.json` - Firebase Realtime Database rules.
- `storage.rules` - Firebase Storage receipt rules.
- `firebase.json` - Firebase deploy configuration.
- `SECURITY_SETUP.md` - setup notes for Firebase security.

## `index.html` Runtime Map

The file has grown in layered feature blocks. Keep new work close to the related block:

- Base runtime: default IPG data, calendar rendering, day editing.
- V7-V10: early Firebase/save overlays, push notifications, travel.
- V12: school calendar, unified inbox, summer proposal flow.
- V13: iPhone dashboard, permanent record/search/export.
- V14: summer planning workflow and April 1 email summary.
- V16: save confidence, retry, local backup safety.
- V17-V18: date notes and summer trade assistant.
- V20: expenses, receipts, paid-date tracking.
- V35: Agreement Center foundation for rules-source/reference notes while preserving the active Indiana IPG engine.

## Refactor Path Toward a Real App

Do this in small stages:

1. Keep behavior in `index.html`, but group related helpers and avoid new global names unless needed.
2. Extract pure data helpers first, such as date math, formatting, expense calculations, and record filtering.
3. Extract feature modules only after the app has a build step or a tested deployment path.
4. Move to an app framework later when App Store packaging begins.

## Test Checklist

Run these before committing:

```bash
node - <<'NODE'
const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script(?![^>]*type=["']module["'])[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
for (let i=0;i<scripts.length;i++) {
  try { new Function(scripts[i]); }
  catch(e) { console.error('Script parse failed', i+1, e.message); process.exit(1); }
}
console.log('Classic scripts parse OK:', scripts.length);
NODE

git diff --check
```

For local browser testing, use a local HTTP server instead of opening the file directly when Firebase sign-in matters.
