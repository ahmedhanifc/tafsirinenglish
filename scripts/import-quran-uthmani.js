#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const API_URL = "https://api.quran.com/api/v4/quran/verses/uthmani";
const OUT_FILE = path.join(__dirname, "..", "assets", "data", "quran-uthmani.json");
const TOTAL_VERSES = 6236;

async function fetchChapter(chapterNumber) {
  const url = `${API_URL}?chapter_number=${chapterNumber}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Chapter ${chapterNumber} failed with HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload.verses)) {
    throw new Error(`Chapter ${chapterNumber} response did not include a verses array`);
  }

  return payload.verses.map((verse) => {
    if (!verse.verse_key || !verse.text_uthmani) {
      throw new Error(`Chapter ${chapterNumber} included an invalid verse payload`);
    }

    return {
      key: verse.verse_key,
      text: verse.text_uthmani,
    };
  });
}

async function main() {
  const chapters = {};
  let verseCount = 0;

  for (let chapter = 1; chapter <= 114; chapter += 1) {
    const verses = await fetchChapter(chapter);
    chapters[String(chapter)] = verses;
    verseCount += verses.length;
    process.stdout.write(`Imported chapter ${chapter} (${verses.length} verses)\n`);
  }

  if (verseCount !== TOTAL_VERSES) {
    throw new Error(`Expected ${TOTAL_VERSES} verses, received ${verseCount}`);
  }

  const output = {
    source: "Quran.com API v4 quran/verses/uthmani",
    source_url: API_URL,
    script: "uthmani",
    imported_at: new Date().toISOString(),
    verse_count: verseCount,
    chapters,
  };

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(`${OUT_FILE}.tmp`, `${JSON.stringify(output)}\n`, "utf8");
  await fs.rename(`${OUT_FILE}.tmp`, OUT_FILE);
  process.stdout.write(`Wrote ${OUT_FILE}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
