# Tafhim al-Qur'an Reader

Mobile-first static reader for the legacy `englishtafsir.com` Tafhim al-Qur'an export.

## Run locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

The app fetches the original surah pages from `Quran/<surah>/index.html`, so it should be served over HTTP instead of opened directly from `file://`.

## Deploy to Vercel

This is a static site with no build step.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, import the repository as a new project.
3. Use the repository root as the Root Directory.
4. Set Framework Preset to `Other`.
5. Leave Build Command empty.
6. Leave Output Directory empty or set it to `.` if Vercel asks for one.
7. Deploy.

After deployment, open `https://<project>.vercel.app/#/surah/1?tab=read`.

## Direction

Start with a responsive web app or PWA, not a native iOS app. The current source is static HTML pages, app assets, and bundled Quran text JSON, and the first product risk is content extraction, footnote behavior, and mobile reading ergonomics. A web app lets those decisions be tested quickly while keeping the door open for a later iOS shell if offline storage, native sharing, or app-store distribution becomes important.

## Current slice

- Surah library for all 114 source pages.
- On-demand parsing of legacy surah HTML.
- Separate history/introduction and reading views.
- Bundled Uthmani Arabic text imported from the public Quran.com API v4 `quran/verses/uthmani` endpoint.
- Footnote references converted into tappable modal notes.

## Import Arabic text

```sh
node scripts/import-quran-uthmani.js
```

This refreshes `assets/data/quran-uthmani.json` and validates that all 6,236 verses were imported.
