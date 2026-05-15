# Tafhim al-Qur'an Reader

Mobile-first static reader for the legacy `englishtafsir.com` Tafhim al-Qur'an export.

## Run locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

The app fetches the original surah pages from `Quran/<surah>/index.html`, so it should be served over HTTP instead of opened directly from `file://`.

## Direction

Start with a responsive web app or PWA, not a native iOS app. The current source is static HTML plus image assets, and the first product risk is content extraction, footnote behavior, and mobile reading ergonomics. A web app lets those decisions be tested quickly while keeping the door open for a later iOS shell if offline storage, native sharing, or app-store distribution becomes important.

## Current slice

- Surah library for all 114 source pages.
- On-demand parsing of legacy surah HTML.
- Separate history/introduction and reading views.
- Responsive Arabic image rendering.
- Footnote references converted into tappable modal notes.
