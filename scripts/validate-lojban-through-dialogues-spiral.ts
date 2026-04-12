/**
 * Validates *Lojban Through Dialogues* lesson files for spiral pedagogy:
 * 1) Spaced-recall **| Lojban | English |** rows use only lemmas through the max
 *    lesson cited in the section heading. **| Prompt | Lojban |** blocks under
 *    **#### Challenge** may use vocabulary through the **current** lesson (synthesis).
 * 2) Each lemma from **New words** / **New word** has a non-empty gloss and
 *    appears again later in a spaced-recall block (or Lesson 30 capstone tables),
 *    once that block's heading permits it.
 *
 * Run from repo root:
 *   `npx tsx scripts/validate-lojban-through-dialogues-spiral.ts`
 * Optional:
 *   `--recall-coverage` — also warn when a **New words** lemma never appears in
 *   any later spaced-recall / Lesson 30 capstone table (noisy; heuristic only).
 *   `--no-explain-bodies` — skip dialogue / practice / anticipation checks below.
 *
 * Dialogue “explained” check (default on): tokens in the opening table, practice
 * table, and **Anticipation prompts** / **Final anticipation** (`| Prompt | Lojban |`
 * tables, answers in column 2) must be covered by cumulative **New words**
 * through that lesson, **or** by a consecutive 2–4 gram / skip-1 bigram (same
 * `.i` or `,` in the middle) taken from a **New words** Lojban cell, **or** by a
 * token extracted from this lesson’s **Grammar note** (**bold** / `backticks`).
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const LESSON_DIR = path.join(
  repoRoot,
  "data/pages/en/books/lojban-through-dialogues",
);

/** cmene / borrowings used in examples — not listed as separate New words. */
/**
 * Taught primarily as part of a grammar pattern (not isolated **New words** rows).
 * Lesson numbers = first lesson where the pattern is canonical in this book.
 */
const GRAMMAR_STRUCTURAL_LEMMA: Record<string, number> = {
  nu: 22,
  /** First heavy use + grammar in Lesson 28 (**ba le nu … kei**). */
  kei: 28,
};

const NAME_EXCEPTIONS = new Set(
  [
    "lifri",
    "mentu",
    "linto",
    "lojban",
    "Lifri",
    "Mentu",
    "Linto",
    "LOJBAN",
  ].map((s) => s.toLowerCase()),
);

type LessonData = {
  num: number;
  raw: string;
  newWordRows: { lojbanCell: string; meaningCell: string }[];
  bodyLojbanSnippets: string[];
  grammarMentionTokens: Set<string>;
  spacedRecallBlocks: {
    headingLine: string;
    maxLesson: number | null;
    recallLojbanSnippets: string[];
    challengeLojbanSnippets: string[];
  }[];
  capstoneLojbanSnippets: string[];
};

function readLesson(n: number): string {
  return fs.readFileSync(path.join(LESSON_DIR, `${n}.md`), "utf-8");
}

/** Split Lojban column into lemma keys (slash lists, multi-word rows). */
function lemmasFromLojbanCell(cell: string): string[] {
  const cleaned = cell.replace(/\*\*/g, "").trim();
  if (!cleaned) return [];
  const parts = cleaned.split(/\s*\/\s*/).map((p) => p.trim()).filter(Boolean);
  const out = new Set<string>();
  for (const p of parts) {
    for (const w of p.split(/\s+/).map((x) => x.trim()).filter(Boolean)) {
      out.add(normalizeLemmaKey(w));
    }
  }
  return [...out];
}

function normalizeLemmaKey(s: string): string {
  return s.replace(/\*\*/g, "").trim();
}

/** Lojban cells from markdown tables in a slice (| col1 | col2 |). */
function extractTableLojbanColumn(section: string): string[] {
  const out: string[] = [];
  for (const line of section.split("\n")) {
    if (!line.trim().startsWith("|") || line.includes("---")) continue;
    const cells = line.split("|").map((c) => c.trim());
    if (cells.length >= 3 && cells[1] && cells[1] !== "Lojban") {
      out.push(cells[1]);
    }
  }
  return out;
}

/** `| Prompt | Lojban |` tables: Lojban answers live in the second column. */
function extractPromptLojbanSecondColumn(section: string): string[] {
  const out: string[] = [];
  let inPromptTable = false;
  for (const line of section.split("\n")) {
    if (!line.trim().startsWith("|") || line.includes("---")) continue;
    const cells = line.split("|").map((c) => c.trim());
    if (cells.length < 3) continue;
    const c1 = cells[1].toLowerCase();
    const c2 = cells[2].toLowerCase();
    if (c1 === "lojban" && c2 === "english") {
      inPromptTable = false;
      continue;
    }
    if (c1 === "prompt" && c2 === "lojban") {
      inPromptTable = true;
      continue;
    }
    if (inPromptTable && c1 !== "prompt") {
      const ans = (cells[2] ?? "").trim();
      if (ans) out.push(ans);
    }
  }
  return out;
}

function indexOfFirstNewWordsHeading(content: string): number {
  const a = content.indexOf("**New words**");
  const b = content.indexOf("**New word**");
  if (a === -1) return b;
  if (b === -1) return a;
  return Math.min(a, b);
}

/** Opening dialogue + practice + anticipation Lojban (not spaced recall). */
function parseBodyLojbanSnippets(content: string): string[] {
  const snippets: string[] = [];
  const nw = indexOfFirstNewWordsHeading(content);
  if (nw === -1) return snippets;
  const head = content.slice(0, nw);
  snippets.push(...extractTableLojbanColumn(head));

  const pr = content.indexOf("### Practice dialogue");
  const an =
    content.indexOf("### Anticipation prompts") >= 0
      ? content.indexOf("### Anticipation prompts")
      : content.indexOf("### Final anticipation");
  if (pr !== -1) {
    let end = an !== -1 ? an : content.length;
    const nwAfterPractice = content.indexOf("**New word", pr + 1);
    if (nwAfterPractice !== -1 && (an === -1 || nwAfterPractice < an)) {
      end = nwAfterPractice;
    }
    snippets.push(...extractTableLojbanColumn(content.slice(pr, end)));
  }
  if (an !== -1) {
    let antEnd = content.length;
    const sr = content.indexOf("### Spaced recall");
    const fsr = content.indexOf("### Full spiral review");
    if (sr !== -1) antEnd = Math.min(antEnd, sr);
    if (fsr !== -1) antEnd = Math.min(antEnd, fsr);
    const ant = content.slice(an, antEnd);
    snippets.push(...extractPromptLojbanSecondColumn(ant));
  }
  return snippets;
}

/** Tokens mentioned in **Grammar note:** via **…** or `…`. */
function parseGrammarMentionedTokens(content: string): Set<string> {
  const set = new Set<string>();
  let search = 0;
  while (true) {
    const j = content.indexOf("> **Grammar note:**", search);
    if (j === -1) break;
    const rest = content.slice(j);
    const nextSection = rest.search(/\n(?=### )/);
    const blk =
      nextSection === -1 ? rest : rest.slice(0, nextSection + 1);
    for (const bold of blk.matchAll(/\*\*([^*]+)\*\*/g)) {
      if (/grammar note/i.test(bold[1])) continue;
      for (const t of tokenizeLojbanSnippet(bold[1])) set.add(t);
    }
    for (const bt of blk.matchAll(/`([^`]+)`/g)) {
      for (const t of tokenizeLojbanSnippet(bt[1])) set.add(t);
    }
    search = j + 20;
  }
  return set;
}

/** Consecutive 1..maxN-grams and skip-1 bigrams (w1 .i w2 / w1 , w2) per slash segment. */
function registerPhrasesFromNewWordCell(
  cell: string,
  lessonNum: number,
  phraseFirstLesson: Map<string, number>,
  maxN = 4,
): void {
  const cleaned = cell.replace(/\*\*/g, "").trim();
  if (!cleaned) return;
  const segments = cleaned.split(/\s*\/\s*/).map((p) => p.trim()).filter(Boolean);
  for (const seg of segments) {
    const words = tokenizeLojbanSnippet(seg);
    if (words.length === 0) continue;
    for (let n = 1; n <= Math.min(maxN, words.length); n++) {
      for (let i = 0; i + n <= words.length; i++) {
        const phrase = words.slice(i, i + n).join(" ");
        const prev = phraseFirstLesson.get(phrase);
        if (prev === undefined || lessonNum < prev) {
          phraseFirstLesson.set(phrase, lessonNum);
        }
      }
    }
    for (let i = 0; i + 2 < words.length; i++) {
      const mid = words[i + 1];
      if (mid === ".i" || mid === ",") {
        const skipPhrase = `${words[i]} ${words[i + 2]}`;
        const prev = phraseFirstLesson.get(skipPhrase);
        if (prev === undefined || lessonNum < prev) {
          phraseFirstLesson.set(skipPhrase, lessonNum);
        }
      }
    }
  }
}

function parseNewWordTables(content: string): { lojbanCell: string; meaningCell: string }[] {
  const rows: { lojbanCell: string; meaningCell: string }[] = [];
  const re = /\*\*New words?\*\*\s*\n+/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const start = m.index + m[0].length;
    const rest = content.slice(start);
    const lines = rest.split("\n");
    let i = 0;
    if (lines[i]?.includes("| Lojban |")) i++;
    if (lines[i]?.replace(/\s/g, "").startsWith("|--")) i++;
    for (; i < lines.length; i++) {
      const line = lines[i];
      if (!line?.trim().startsWith("|")) break;
      const cells = line
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
      if (cells.length >= 2 && cells[0] !== "Lojban") {
        rows.push({ lojbanCell: cells[0], meaningCell: cells[1] ?? "" });
      }
    }
  }
  return rows;
}

/** Max lesson number mentioned in heading; cumulative allow 1..max. */
function parseRecallMaxLesson(headingLine: string): number | null {
  const m = headingLine.match(/Lessons?\s+([\d\s,–—\-]+)/i);
  if (!m) return null;
  const nums = [...m[1].matchAll(/\d+/g)].map((x) => parseInt(x[0], 10));
  if (nums.length === 0) return null;
  return Math.max(...nums);
}

function parseSpacedRecallBlocks(content: string): {
  headingLine: string;
  maxLesson: number | null;
  recallLojbanSnippets: string[];
  challengeLojbanSnippets: string[];
}[] {
  const blocks: {
    headingLine: string;
    maxLesson: number | null;
    recallLojbanSnippets: string[];
    challengeLojbanSnippets: string[];
  }[] = [];
  const lines = content.split("\n");
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (!line.startsWith("### Spaced recall")) continue;
    const headingLine = line;
    const maxLesson = parseRecallMaxLesson(headingLine);
    const recallLojbanSnippets: string[] = [];
    const challengeLojbanSnippets: string[] = [];
    let tableMode: "lojban_first" | "prompt_second" | null = null;
    let afterChallenge = false;
    let j = li + 1;
    for (; j < lines.length; j++) {
      const line = lines[j];
      if (line.startsWith("### ") && !line.startsWith("### Spaced recall")) break;
      if (line.startsWith("#### Challenge")) {
        afterChallenge = true;
        tableMode = null;
        continue;
      }
      if (!line.trim().startsWith("|") || line.includes("---")) continue;
      const cells = line.split("|").map((c) => c.trim());
      if (cells.length < 3) continue;
      const c1 = cells[1].toLowerCase();
      const c2 = cells[2].toLowerCase();
      if (c1 === "lojban" && c2 === "english") {
        tableMode = "lojban_first";
        continue;
      }
      if (c1 === "prompt" && c2 === "lojban") {
        tableMode = "prompt_second";
        continue;
      }
      const target = afterChallenge ? challengeLojbanSnippets : recallLojbanSnippets;
      if (tableMode === "lojban_first" && cells[1]) target.push(cells[1]);
      if (tableMode === "prompt_second" && cells[2]) target.push(cells[2]);
    }
    blocks.push({
      headingLine,
      maxLesson,
      recallLojbanSnippets,
      challengeLojbanSnippets,
    });
    li = j - 1;
  }
  return blocks;
}

/** Lesson 30: treat opening dialogue, cumulative vocab, full spiral as capstone recall. */
function parseCapstoneSnippets(content: string): string[] {
  const snippets: string[] = [];
  const lines = content.split("\n");
  let zone: "opening" | "cumulative" | "spiral" | "none" = "opening";
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    if (L.startsWith("### Cumulative vocabulary reference")) {
      zone = "cumulative";
      continue;
    }
    if (L.startsWith("### Final anticipation")) {
      zone = "none";
      continue;
    }
    if (L.startsWith("### Full spiral review")) {
      zone = "spiral";
      continue;
    }
    if (L.startsWith("## ") && i > 0) zone = "opening";
    if (
      (zone === "opening" || zone === "cumulative" || zone === "spiral") &&
      L.trim().startsWith("|") &&
      !L.includes("---")
    ) {
      const cells = L.split("|").map((c) => c.trim());
      if (cells.length >= 3 && cells[1] && cells[1] !== "Lojban") {
        snippets.push(cells[1]);
      }
    }
  }
  return snippets;
}

function tokenizeLojbanSnippet(snippet: string): string[] {
  const t = snippet.replace(/\*\*/g, "");
  return t
    .split(/[\s]+/)
    .map((x) => {
      let w = x.replace(/^[,;:!?…"'[\]()]+/g, "");
      w = w.replace(/[,;:!?…"'[\]()]+$/g, "");
      return w;
    })
    .filter((x) => x.length > 0 && x !== "/");
}

function isIgnorableToken(tok: string): boolean {
  if (/^\d+$/.test(tok)) return true;
  if (/^li[\d.]+$/.test(tok)) return true;
  if (tok === "…") return true;
  if (/^\.+$/.test(tok)) return true;
  if (tok === "/") return true;
  if (/^[a-z]$/i.test(tok)) return true;
  if (/^\.[a-z.']+\.$/i.test(tok)) return true;
  const low = tok.toLowerCase().replace(/^\.+/, "");
  if (NAME_EXCEPTIONS.has(low)) return true;
  if (/^la[.\u200b]?$/i.test(tok)) return true;
  return false;
}

function loadLessons(): LessonData[] {
  const out: LessonData[] = [];
  for (let n = 1; n <= 30; n++) {
    const raw = readLesson(n);
    const newWordRows = parseNewWordTables(raw);
    const bodyLojbanSnippets = parseBodyLojbanSnippets(raw);
    const grammarMentionTokens = parseGrammarMentionedTokens(raw);
    const spacedRecallBlocks = parseSpacedRecallBlocks(raw);
    const capstoneLojbanSnippets = n === 30 ? parseCapstoneSnippets(raw) : [];
    out.push({
      num: n,
      raw,
      newWordRows,
      bodyLojbanSnippets,
      grammarMentionTokens,
      spacedRecallBlocks,
      capstoneLojbanSnippets,
    });
  }
  return out;
}

function buildIntroLesson(lessons: LessonData[]): Map<string, number> {
  const intro = new Map<string, number>();
  for (const L of lessons) {
    for (const row of L.newWordRows) {
      for (const lem of lemmasFromLojbanCell(row.lojbanCell)) {
        if (!intro.has(lem)) intro.set(lem, L.num);
        const lower = lem.toLowerCase();
        if (lower !== lem && !intro.has(lower)) intro.set(lower, L.num);
      }
    }
  }
  for (const [lem, n] of Object.entries(GRAMMAR_STRUCTURAL_LEMMA)) {
    if (!intro.has(lem)) intro.set(lem, n);
  }
  return intro;
}

function lookupIntro(introMap: Map<string, number>, tok: string): number | undefined {
  const low = tok.toLowerCase();
  const dotted =
    !tok.startsWith(".") && /^[a-z']/i.test(tok)
      ? (introMap.get(`.${low}`) ?? introMap.get(`.${tok}`))
      : undefined;
  return introMap.get(tok) ?? introMap.get(low) ?? dotted;
}

function buildPhraseFirstLesson(lessons: LessonData[]): Map<string, number> {
  const phraseFirstLesson = new Map<string, number>();
  for (const L of lessons) {
    for (const row of L.newWordRows) {
      registerPhrasesFromNewWordCell(row.lojbanCell, L.num, phraseFirstLesson);
    }
  }
  return phraseFirstLesson;
}

/** Greedy consume: longest phrase (consecutive or skip-1) introduced by lesson L. */
function consumeExplainedTokens(
  toks: string[],
  lessonNum: number,
  introLesson: Map<string, number>,
  phraseFirstLesson: Map<string, number>,
  grammarTokens: Set<string>,
): { ok: true } | { ok: false; at: number; token: string } {
  const maxN = 4;
  let i = 0;
  while (i < toks.length) {
    if (isIgnorableToken(toks[i])) {
      i++;
      continue;
    }
    let advanced = 0;
    for (let n = Math.min(maxN, toks.length - i); n >= 1; n--) {
      const phrase = toks.slice(i, i + n).join(" ");
      const pIntro = phraseFirstLesson.get(phrase);
      if (pIntro !== undefined && pIntro <= lessonNum) {
        advanced = n;
        break;
      }
    }
    if (advanced === 0 && i + 2 < toks.length) {
      const mid = toks[i + 1];
      if (mid === ".i" || mid === ",") {
        const skipPhrase = `${toks[i]} ${toks[i + 2]}`;
        const sIntro = phraseFirstLesson.get(skipPhrase);
        if (sIntro !== undefined && sIntro <= lessonNum) advanced = 3;
      }
    }
    if (advanced > 0) {
      i += advanced;
      continue;
    }
    const t = toks[i];
    if (grammarTokens.has(t) || grammarTokens.has(t.toLowerCase())) {
      i++;
      continue;
    }
    const intro = lookupIntro(introLesson, t);
    if (intro !== undefined && intro <= lessonNum) {
      i++;
      continue;
    }
    return { ok: false, at: i, token: t };
  }
  return { ok: true };
}

function main(): void {
  const recallCoverage = process.argv.includes("--recall-coverage");
  const explainBodies = !process.argv.includes("--no-explain-bodies");
  const lessons = loadLessons();
  const introLesson = buildIntroLesson(lessons);
  const phraseFirstLesson = buildPhraseFirstLesson(lessons);
  const errors: string[] = [];
  const warnings: string[] = [];
  const warnSeen = new Set<string>();
  const addWarn = (s: string) => {
    if (warnSeen.has(s)) return;
    warnSeen.add(s);
    warnings.push(s);
  };

  for (const L of lessons) {
    for (const row of L.newWordRows) {
      const gloss = row.meaningCell.replace(/\*\*/g, "").trim();
      if (gloss.length < 2) {
        errors.push(
          `Lesson ${L.num}: New word row "${row.lojbanCell}" has empty or too-short Meaning column.`,
        );
      }
    }
  }

  if (explainBodies) {
    for (const L of lessons) {
      for (const snip of L.bodyLojbanSnippets) {
        const toks = tokenizeLojbanSnippet(snip);
        const res = consumeExplainedTokens(
          toks,
          L.num,
          introLesson,
          phraseFirstLesson,
          L.grammarMentionTokens,
        );
        if (!res.ok) {
          errors.push(
            `Lesson ${L.num} body Lojban not covered by **New words** (n/skip-grams), cumulative lemmas through Lesson ${L.num}, or **Grammar note** tokens — near "${res.token}" in: ${snip.slice(0, 120)}${snip.length > 120 ? "…" : ""}`,
          );
        }
      }
    }
  }

  for (const L of lessons) {
    for (const block of L.spacedRecallBlocks) {
      const maxK = block.maxLesson;
      if (maxK !== null) {
        for (const snip of block.recallLojbanSnippets) {
          for (const tok of tokenizeLojbanSnippet(snip)) {
            if (isIgnorableToken(tok)) continue;
            const intro = lookupIntro(introLesson, tok);
            if (intro === undefined) {
              addWarn(
                `Lesson ${L.num} spaced recall (${block.headingLine.trim()}): token "${tok}" not found in any **New words** table (name fragment, typo, or multi-word row split?).`,
              );
              continue;
            }
            if (intro > maxK) {
              errors.push(
                `Lesson ${L.num} spaced recall (${block.headingLine.trim()}): forward reference — "${tok}" first introduced in Lesson ${intro}, but heading allows only through Lesson ${maxK}.`,
              );
            }
          }
        }
      }
      const capK = L.num;
      for (const snip of block.challengeLojbanSnippets) {
        for (const tok of tokenizeLojbanSnippet(snip)) {
          if (isIgnorableToken(tok)) continue;
          const intro = lookupIntro(introLesson, tok);
          if (intro === undefined) {
            addWarn(
              `Lesson ${L.num} spaced recall challenge (${block.headingLine.trim()}): token "${tok}" not found in any **New words** table (name fragment, typo, or multi-word row split?).`,
            );
            continue;
          }
          // Lesson 1 challenge is allowed to preview a little beyond **New words** L1.
          if (L.num > 1 && intro > capK) {
            errors.push(
              `Lesson ${L.num} spaced recall challenge (${block.headingLine.trim()}): forward reference — "${tok}" first introduced in Lesson ${intro}, but challenge should use only vocabulary through Lesson ${capK}.`,
            );
          }
        }
      }
    }
  }

  const cap = lessons.find((x) => x.num === 30)!;
  for (const snip of cap.capstoneLojbanSnippets) {
    for (const tok of tokenizeLojbanSnippet(snip)) {
      if (isIgnorableToken(tok)) continue;
      const intro = lookupIntro(introLesson, tok);
      if (intro === undefined) {
        addWarn(`Lesson 30 capstone: token "${tok}" not in **New words** tables.`);
      }
    }
  }

  if (recallCoverage) {
    for (const [lem, introL] of introLesson) {
      if (introL >= 30) continue;
      let recalled = false;
      for (const L of lessons) {
        if (L.num <= introL) continue;
        const zones: { snippets: string[]; maxK: number | null }[] = [];
        for (const b of L.spacedRecallBlocks) {
          zones.push({ snippets: b.recallLojbanSnippets, maxK: b.maxLesson });
          zones.push({ snippets: b.challengeLojbanSnippets, maxK: L.num });
        }
        if (L.num === 30) {
          zones.push({ snippets: L.capstoneLojbanSnippets, maxK: 30 });
        }
        for (const z of zones) {
          if (z.maxK !== null && z.maxK < introL) continue;
          const hay = z.snippets.join(" ");
          const toks = tokenizeLojbanSnippet(hay);
          if (
            toks.includes(lem) ||
            toks.includes(lem.toLowerCase()) ||
            new RegExp(`(^|[^a-z.'])${escapeRe(lem)}([^a-z.']|$)`, "i").test(
              ` ${hay} `,
            )
          ) {
            recalled = true;
            break;
          }
        }
        if (recalled) break;
      }
      if (!recalled) {
        addWarn(
          `Lemma "${lem}" (introduced Lesson ${introL}) never appears in a later spaced-recall / Lesson 30 capstone zone (check manually — may appear only in main dialogue).`,
        );
      }
    }
  }

  for (const w of warnings) console.warn("WARN:", w);
  for (const e of errors) console.error("ERR:", e);

  if (errors.length) {
    console.error(
      `\nFailed with ${errors.length} error(s), ${warnings.length} warning(s).`,
    );
    process.exit(1);
  }
  const parts = [
    "OK: no spaced-recall scope violations.",
    explainBodies ? "Body explain check on." : "Body explain check skipped (--no-explain-bodies).",
    recallCoverage
      ? `${warnings.length} warning(s) (tokens + recall coverage).`
      : `${warnings.length} token warning(s). Pass --recall-coverage for spiral gap heuristics.`,
  ];
  console.log(parts.join(" "));
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main();
