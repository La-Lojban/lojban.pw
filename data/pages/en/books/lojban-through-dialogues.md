---
icon: 🗣️
title: Lojban Through Dialogues
description: Immersive situational dialogue course with Lifri, Mentu, and Linto — learn Lojban through conversations, context, and built-in spiral review
og:image: /assets/pixra/books/lojban-through-dialogues/cover.webp
coverImage: /assets/pixra/books/lojban-through-dialogues/cover.webp
palette: sienna
---

<!--
  =============================================================================
  DEVELOPER / MAINTAINER / AI — COURSE PRINCIPLES (keep in sync when editing)
  =============================================================================
  Copy this block into prompts or project rules when extending this book.

  PEDAGOGY (Pimsleur-style, written medium)
  - Dialogue-first: each lesson opens with a situational table (Lojban | English).
  - Passive then active: learner reads, then speaks (anticipation prompts).
  - New vocabulary: target roughly 3–5 **New words** per lesson; every Lojban
    form in dialogues, practice, prompts, spaced recall, and challenges must
    either (a) appear in that lesson’s **New words**, (b) have been introduced
    in an earlier lesson’s **New words**, (c) be explained in that lesson’s
    **Grammar note** as a teachable pattern (e.g. lo nu … kei), or (d) be a
    documented exception (character names with **la**, **mi'e la …**, etc.).
  - Anticipation prompts: learner produces Lojban before revealing the answer.
    Use a markdown table **| Prompt | Lojban |** (English in column 1, answer in
    column 2), not blockquotes with italic answers.
  - Spaced recall: **| Lojban | English |** rows must use **only** material
    already taught through the lesson range in the section title (no forward
    references). Under **#### Challenge**, use **| Prompt | Lojban |** (answer in
    column 2); the validator treats challenges as synthesis through the **current**
    lesson’s vocabulary (Lesson 1 may preview slightly beyond that lesson’s **New
    words**).
  - Lesson 0 explains the learner workflow; Lesson 1 is the baseline (recall
    may be minimal); Lesson 30 may use a capstone layout (cumulative tables).

  PRAGMATICS & ACCURACY
  - Prefer attested, high-frequency phrasing from shared corpora over clever
    but rare constructions (e.g. **ma cmene do**, **zo … cmene mi**, **ma nuzba**).
  - Grammar and place structures: **The Lojban Reference Grammar** (CLL) under
    data/pages/en/books/cll/ is authoritative when pedagogy and correctness
    conflict with informal textbook habits.
  - When introducing **cmene**, **zo**, **se**-conversion of **cmene**, etc.,
    align examples with CLL and with corpus/dictionary rows (see Sources).

  CHARACTERS & ASSETS
  - Core cast: Lifri (**la lifri**), Mentu (**la mentu**), Linto (**la linto**).
    In English copy, name **Lifri** and **Linto** directly; do not use **he** / **him** / **his** for Linto or Lifri.
  - Speaker tags use sprites under data/assets/pixra/books/lojban-through-dialogues/;
    keep naming consistent with expandFirstLojbanSpeakerTags (if applicable).

  SPRITES (illustration manifest — mirror gismu-tiktok/lojban-through-dialogues-images.js)
  - Canonical generator + prompts: `gismu-tiktok/lojban-through-dialogues-images.js` (ITEMS array +
    prefix strings), usually as a sibling checkout next to `lojban.pw` (same parent folder as this
    repo). Regenerate or add expressions there first, then export WebP into
    `data/assets/pixra/books/lojban-through-dialogues/` (see site paths below).
  - On disk / URLs: `cover.webp` at book pixra root; expression sprites `icons/lif1.webp` …
    `icons/lif8.webp`, `icons/bla1.webp` … `icons/bla8.webp`, `icons/lin1.webp` … `icons/lin8.webp`.
    Markdown `<speaker sprite="lif2">` maps to stem `lif2` → that basename under `icons/`.
  - Pipeline roots (not always shipped on lojban.pw): **lif0**, **bla0**, **lin0** — square reference
    portraits built from first-lojban WebP sources; Lifri’s root enforces a **modest dress** canon for
    all later **lif*** frames. **Cover** composes the three roots at a table on **solid flat white**.
  - Shared sprite rules (generation): anime, flat colour (no gradients), Miyazaki / Studio Ghibli–like
    warmth, clean line art, bust or half-body, solid flat white background, 512×512, **no text** in
    the image (no lettering, speech bubbles, signs, watermarks).

  Sprite meanings (expression index N = 1…8; same mood labels in the JS file):
  - **Lifri** `lifN` — guide, young woman, modest dress locked to lif0 reference:
    lif1 calm friendly baseline (“we are learning together”); lif2 explaining / teaching, light gesture;
    lif3 puzzled or mild concern; lif4 dry / deadpan comic timing; lif5 warm enthusiasm / encouragement;
    lif6 playful delight after a joke; lif7 sheepish / apologetic; lif8 gentle correction, kind but firm.
  - **Mentu** `blaN` — learner, young man:
    bla1 calm friendly baseline; bla2 curious / leaning in; bla3 confused or lost; bla4 mild annoyance /
    pushback (playful, not hostile); bla5 thinking, hand on chin; bla6 wry confidence / “got it”;
    bla7 pleased “aha” / satisfied; bla8 weary or overwhelmed.
  - **Linto** `linN` — learner, young woman, blonde:
    lin1 curious / open, beginner enthusiasm; lin2 confused or lost; lin3 energized / hyped; lin4
    prickly or annoyed (mild eyeroll energy); lin5 thinking, finger on chin; lin6 smug or wry quiet
    pride; lin7 pleased “aha” / got it; lin8 weary or overwhelmed (homework groan).
  - **cover** — book cover: Lifri, Mentu, Linto (same faces/outfits as roots) as friends around a
    minimal plain table, clearly discussing; whole frame solid flat white; no extra people; learning /
    Lojban vibe; no readable text.

  SOURCES (verify new lines against these before merge)
  - data/assets/korpora-tsv/muplis-database.tsv — natural dialogue snippets.
  - data/assets/korpora-tsv/dictionary-with-examples.tsv — valsi + attested
    example bridi (good sanity check for **cmene**, **zo**, etc.).
  - archive/dictionaries/cmavo.tsv — cmavo glosses / selma’o cross-check.
  - data/pages/en/books/cll/ — full grammar; cite chapter/section in grammar
    notes when introducing a non-obvious rule.
  - External: Pimsleur methodology (dialogue + graduated recall + anticipation);
    use as design intent, not as a licence to overload vocabulary per lesson.

  STANDARD LESSON SKELETON (lessons 1–29; adapt for capstone)
  1) Speaker intro  2) Opening dialogue table  3) **New words**
  4) **Grammar note** (when needed) — in Markdown use a blockquote with the
     title alone on the first line, then the body on following `>` lines, e.g.
     `> **Grammar note:**` then `> …explanation…`.  5) **Practice dialogue**
  6) **Anticipation prompts** — table **| Prompt | Lojban |** (Lojban in column 2).
  7) **Spaced recall** — table **| Lojban | English |**; then **#### Challenge**
     and **| Prompt | Lojban |** (Lojban in column 2). Do not use **> Challenge**
     blockquotes with *(...)* answers.
  Maintain parallel English glosses; keep tone conversational.

  FUTURE WORK CHECKLIST
  - Grep for tokens in lesson bodies not listed in cumulative vocabulary / New
    words; fix or explain before shipping.
  - After adding lessons, update Lesson 30 cumulative reference and this file’s
    @include list if the book grows.
  - Re-read spaced-recall headings vs table contents after any edit touching
    vocabulary order.

  AUTOMATED VALIDATION (spiral + glosses)
  - Script: scripts/validate-lojban-through-dialogues-spiral.ts
  - Run (repo root): npx tsx scripts/validate-lojban-through-dialogues-spiral.ts
  - Optional: add --recall-coverage for a noisy heuristic that flags **New words**
    lemmas never appearing in a later spaced-recall or Lesson 30 capstone table.
  - Optional: --no-explain-bodies disables the dialogue / practice / anticipation
    “explained” pass (on by default).
  - What it checks by default:
    (1) Every **New words** row has a Meaning gloss (length ≥ 2 after trim).
    (2) **| Lojban | English |** rows under **Spaced recall** respect the heading
        (cumulative vocabulary through the greatest lesson number in the title).
        **| Prompt | Lojban |** rows under **#### Challenge** may use lemmas
        through the **current** lesson (see script comments). Lesson 1 challenge
        skips strict forward-reference on that block only.
    (3) Lesson 30 opening dialogue, cumulative vocabulary, and full spiral tables
        use only known lemmas (same **New words** map + a tiny grammar-only list
        for **nu** / **kei**).
    (4) Opening + practice + anticipation Lojban is “explained”: greedy longest
        match against consecutive 1–4 grams from **New words** cells (slash
        segments), skip-1 bigrams across **.i** or `,`, cumulative lemmas through
        that lesson, and tokens pulled from **Grammar note** (**bold** / `backticks`).
  - Exit 1 on any forward-reference violation; token unknowns are warnings unless
    you tighten the script later. CI can run the default command after lesson edits.
  =============================================================================
-->

@include "lojban-through-dialogues/0.md"

@include "lojban-through-dialogues/1.md"

@include "lojban-through-dialogues/2.md"

@include "lojban-through-dialogues/3.md"

@include "lojban-through-dialogues/4.md"

@include "lojban-through-dialogues/5.md"

@include "lojban-through-dialogues/6.md"

@include "lojban-through-dialogues/7.md"

@include "lojban-through-dialogues/8.md"

@include "lojban-through-dialogues/9.md"

@include "lojban-through-dialogues/10.md"

@include "lojban-through-dialogues/11.md"

@include "lojban-through-dialogues/12.md"

@include "lojban-through-dialogues/13.md"

@include "lojban-through-dialogues/14.md"

@include "lojban-through-dialogues/15.md"

@include "lojban-through-dialogues/16.md"

@include "lojban-through-dialogues/17.md"

@include "lojban-through-dialogues/18.md"

@include "lojban-through-dialogues/19.md"

@include "lojban-through-dialogues/20.md"

@include "lojban-through-dialogues/21.md"

@include "lojban-through-dialogues/22.md"

@include "lojban-through-dialogues/23.md"

@include "lojban-through-dialogues/24.md"

@include "lojban-through-dialogues/25.md"

@include "lojban-through-dialogues/26.md"

@include "lojban-through-dialogues/27.md"

@include "lojban-through-dialogues/28.md"

@include "lojban-through-dialogues/29.md"

@include "lojban-through-dialogues/30.md"
