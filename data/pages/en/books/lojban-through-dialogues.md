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
  - Dialogue-first: each lesson opens with a situational table: column 1 is a **dialogue-sprite** portrait
    (`<dialogue-sprite url="/assets/pixra/books/lojban-through-dialogues/icons/<stem>.webp" />` — small borderless image, not a figure card), then **Lojban | English**.
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
  - Dialogue tables: column 1 uses `<dialogue-sprite url="…/icons/<stem>.webp" />` (rendered as a small borderless **img**, not `<pixra>` / figure chrome), aligned with the scene’s `<speaker sprite>` / `<speakers multiface sprites>` tag; stems **lifN** / **blaN** / **linN** per the manifest below. Site: `config/transformers.ts` + `styles/index.css`; PDF: Pandoc **html→typst** emits `#box(width: …, image(…))` in table cells (`lib/typst-book/build-learn-lojban.ts` width patch).

  SPRITES (what each asset shows — stems align with `lojban-through-dialogues-images.js` ITEMS)
  - On disk / URLs: `cover.webp` at book pixra root; expression sprites `icons/lif1.webp` …
    `icons/lif8.webp`, `icons/bla1.webp` … `icons/bla8.webp`, `icons/lin1.webp` … `icons/lin8.webp`.
    Markdown `<speaker sprite="lif2">` maps to stem `lif2` → that basename under `icons/`.
  - Pipeline-only roots (optional on site): **lif0**, **bla0**, **lin0** — square reference portraits
    from first-lojban sources; Lifri’s root sets a modest-dress canon for all **lif*** frames.

  **lif0** — Root reference portrait: Lifri facing the viewer, bust or half-body, calm approachable
    “guide” presence. Clothing: modest dress suitable for the course mascot (not the source sketch outfit).

  **lif1** — Lifri (guide), young woman: calm friendly baseline—soft smile, relaxed; default “we are learning together” face.

  **lif2** — Lifri (guide): explaining / teaching—open hand or light pointing gesture, engaged didactic focus, not over-excited.

  **lif3** — Lifri (guide): puzzled or mild concern—slight frown, raised or knit brows; “something is odd or tricky” (not cartoon shock).

  **lif4** — Lifri (guide): dry / deadpan / understated comic timing—flat or minimal mouth, knowing or tired eyes; teasing one-liner energy.

  **lif5** — Lifri (guide): warm enthusiasm or encouragement—bright eyes, open positive energy; praise, welcome, or exciting news.

  **lif6** — Lifri (guide): playful delight—amused smile, comedic payoff after a jokey line.

  **lif7** — Lifri (guide): sheepish or apologetic—awkward friendly smile, hand behind head or rub neck; “oops I rambled” warmth.

  **lif8** — Lifri (guide): gentle correction—firm but kind eyes, slight forward lean; “not quite” teaching moment, no anger.

  **bla0** — Root reference portrait: Mentu only, facing the viewer, bust or half-body, calm approachable peer presence; plain flat white backdrop.

  **bla1** — Mentu (learner), young man: calm friendly baseline—relaxed smile; approachable peer energy.

  **bla2** — Mentu: curious / asking—leaning in, interested eyes; follow-up questions, “what about…?”

  **bla3** — Mentu: confused or lost—furrowed brow, uncertain mouth; “wait, what?”

  **bla4** — Mentu: mild annoyance or pushback—narrow eyes, tight mouth; playful complaint, not hostile.

  **bla5** — Mentu: thinking—hand on chin or distant thoughtful gaze; working through a pattern.

  **bla6** — Mentu: wry confidence—half-smile; understated “got it” without showing off.

  **bla7** — Mentu: pleased “aha” / satisfied—eyes brighten, warm smile; clean insight landed.

  **bla8** — Mentu: weary or overwhelmed—droopy lids, small exhale; “that is a lot to digest.”

  **lin0** — Root reference portrait: Linto only, facing the viewer, bust or half-body, calm approachable peer presence; plain flat white backdrop.

  **lin1** — Linto (learner), young woman, blonde: curious / open—bright interested eyes; beginner-friendly enthusiasm.

  **lin2** — Linto: confused or lost—furrowed brow, uncertain mouth; fuzzy concept, “wait, what?”

  **lin3** — Linto: energized / hyped—animated smile; playful excitement or “I am on fire!”

  **lin4** — Linto: prickly or annoyed—narrow eyes, eyeroll energy; mild complaint about a weird example.

  **lin5** — Linto: thinking / chewing on it—finger on chin; ambiguity, deep pattern, hmm.

  **lin6** — Linto: smug or wry—half-smile, relaxed pride; “naturally,” pattern mastered quietly.

  **lin7** — Linto: pleased “aha” / got it—warm satisfied smile; summary punchline, “simple!” after understanding.

  **lin8** — Linto: weary or overwhelmed—droopy eyelids, small groan; homework groan, exhausted cute.

  **cover** — Course cover for “Lojban Through Dialogues”: Lifri, Mentu, and Linto (same faces, hair, clothing, and age as their reference portraits) as friends around a simple table, clearly discussing something—warm engaged poses, eye contact, small gestures. Entire frame solid flat white behind them (no room interior, sky, or gradient); only the three characters and a minimal plain table. Learning / Lojban discussion vibe; no extra characters; no readable text, signs, lettering, or logos.

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
  1) Speaker intro  2) Opening dialogue table (dialogue-sprite | Lojban | English)  3) **New words**
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
