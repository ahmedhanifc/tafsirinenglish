# Tafsir Reader

[Tafsir Reader](https://tafsir-reader.vercel.app/) is a simple unofficial reading interface for Tafhim al-Qur'an content from [EnglishTafsir.com](https://www.englishtafsir.com/). It keeps the original source attribution visible and focuses on making the reading flow easier by opening footnotes inline instead of requiring back-and-forth scrolling. No new tafsir is added here; the original source remains EnglishTafsir.com.

## Sources

- Tafsir, English translation, introductions, and footnotes come from the bundled EnglishTafsir.com legacy pages in `Quran/`.
- The `original/` folder preserves the matching source archive, including the original Arabic image assets. The reader can show those images as an optional source reference.
- Rendered Arabic Quran text comes from the Quran.com API v4 `quran/verses/uthmani` endpoint and is bundled in `assets/data/quran-uthmani.json`.
- Arabic rendering uses the bundled `Amiri Quran` font from Google Fonts under the SIL Open Font License.
