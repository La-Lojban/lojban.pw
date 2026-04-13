/**
 * Pandoc html→typst emits site `<pixra>` (in `<p>`) as
 * `#block[ #figure([#block[ #image(...) ]], caption: [...]) ]`.
 * For the PDF we keep a fixed two-column band: main text on the left, queued pixra on the right.
 *
 * **Not queued** (handled inline like the site):
 * - `<speaker>` avatars (`#image` paths containing a speaker infix from
 *   `SPEAKER_AVATAR_IMAGE_PATH_INFICES` in `expandFirstLojbanSpeakerTags.ts`) — same typst shell as
 *   `<pixra>` but must not join the margin stack; `rewriteSpeakerRowTypstBlock` wraps the avatar
 *   column in `#speaker_row_avatar_column` (`speaker-bubble.typ`) so `#figure` matches
 *   `styles/index.css` `.speaker-row__avatar` (not the margin-pixra `show figure` rule).
 * - Bare `<figure><img>` — Pandoc emits `#figure([#image("…");], …)` (semicolon / no inner
 *   `#block[`); that shape never passes `consumePixraImageFigureBlock`.
 *
 * Full-width: headings, article tables, Mermaid raster, `<speaker>` rows (see above).
 */

import {
  speakerAvatarTypstImageGlobalRegex,
  speakerBubblePaletteIndexFromTypstAvatarInner,
  typstSnippetContainsSpeakerAvatarImagePath,
} from "../expandFirstLojbanSpeakerTags";

/**
 * `#figure(` / `table(` … matching `)` at paren-depth 0, respecting double-quoted strings.
 * Ignores `(` / `)` inside `[...]` so captions like `caption: [(see §1)]` do not end the call early.
 */
export function endOfTypstCallWithParens(s: string, openParenIdx: number): number {
  if (s[openParenIdx] !== "(") return -1;
  let depth = 0;
  let bracketDepth = 0;
  let i = openParenIdx;
  let inStr = false;
  while (i < s.length) {
    const c = s[i];
    if (inStr) {
      if (c === "\\" && i + 1 < s.length) {
        i += 2;
        continue;
      }
      if (c === '"') inStr = false;
      i++;
      continue;
    }
    if (c === '"' && (i === 0 || s[i - 1] !== "\\")) {
      inStr = true;
      i++;
      continue;
    }
    if (c === "[") {
      bracketDepth++;
      i++;
      continue;
    }
    if (c === "]") {
      if (bracketDepth > 0) bracketDepth--;
      i++;
      continue;
    }
    if (bracketDepth > 0) {
      i++;
      continue;
    }
    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return -1;
}

/** Content of `[` … `]` starting at `openBracketIdx` (the `[` itself), respecting strings. */
export function endOfBracketContent(s: string, openBracketIdx: number): number {
  if (s[openBracketIdx] !== "[") return -1;
  let depth = 1;
  let i = openBracketIdx + 1;
  let inStr = false;
  while (i < s.length) {
    const c = s[i];
    if (inStr) {
      if (c === "\\" && i + 1 < s.length) {
        i += 2;
        continue;
      }
      if (c === '"') inStr = false;
      i++;
      continue;
    }
    if (c === '"' && (i === 0 || s[i - 1] !== "\\")) {
      inStr = true;
      i++;
      continue;
    }
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return -1;
}

function typstFigureCallLooksLikeSitePixraQueueCandidate(figureSrc: string): boolean {
  if (typstSnippetContainsSpeakerAvatarImagePath(figureSrc)) return false;
  // Bare `<figure><img>` (and similar): inner content is `#image("…");` not `#block[ #image … ]`.
  if (/#image\s*\(\s*"[^"]*"\s*\)\s*;/.test(figureSrc) && !/\[#block\[/.test(figureSrc))
    return false;
  return true;
}

/**
 * One `#block[ ... ]` whose body is only `#figure([#block[ #image(...) ]], caption: [...])`
 * (site `<p><pixra>` output). Returns end index and the inner `#figure(...)` source.
 */
function consumePixraImageFigureBlock(
  s: string,
  start: number
): { end: number; figureSrc: string } | null {
  if (!s.startsWith("#block[", start)) return null;
  let pos = start + "#block[".length;
  while (pos < s.length && /[\s\n\r]/.test(s[pos])) pos++;
  if (!s.startsWith("#figure(", pos)) return null;
  const openParen = pos + "#figure".length;
  if (s[openParen] !== "(") return null;
  if (!s.startsWith("[#block[", openParen + 1)) return null;
  const closeParen = endOfTypstCallWithParens(s, openParen);
  if (closeParen < 0) return null;
  const figureSrc = s.slice(pos, closeParen);
  if (!typstFigureCallLooksLikeSitePixraQueueCandidate(figureSrc)) return null;
  pos = closeParen;
  while (pos < s.length && /[\s\n\r]/.test(s[pos])) pos++;
  if (s[pos] !== "]") return null;
  return { end: pos + 1, figureSrc };
}

interface PixraRange {
  start: number;
  end: number;
  figureSrc: string;
}

function extractPixraRanges(s: string): PixraRange[] {
  const ranges: PixraRange[] = [];
  let searchFrom = 0;
  while (searchFrom < s.length) {
    const i = s.indexOf("#block[", searchFrom);
    if (i < 0) break;
    const m = consumePixraImageFigureBlock(s, i);
    if (m) {
      ranges.push({ start: i, end: m.end, figureSrc: m.figureSrc });
      searchFrom = m.end;
    } else {
      searchFrom = i + 1;
    }
  }
  return ranges;
}

/** Pandoc typst: `=`, `==`, … at line start (single line). */
function headingLineIntervals(body: string): { start: number; end: number }[] {
  const out: { start: number; end: number }[] = [];
  let lineStart = 0;
  for (let i = 0; i <= body.length; i++) {
    if (i === body.length || body[i] === "\n") {
      const line = body.slice(lineStart, i);
      if (/^=+\s+\S/.test(line)) {
        out.push({ start: lineStart, end: i });
      }
      lineStart = i + 1;
    }
  }
  return out;
}

/**
 * Walk back from `#figure(` through only-whitespace gaps to include nested `#block[` wrappers
 * Pandoc often emits `#block[\n#block[\n#block[\n#figure(` for tables.
 */
function outerBlockChainStart(body: string, figureIdx: number): number {
  let pos = figureIdx;
  for (let depth = 0; depth < 12; depth++) {
    const b = body.lastIndexOf("#block[", pos - 1);
    if (b < 0) break;
    const inner = body.slice(b + "#block[".length, pos);
    if (!/^[\s\n\r]*$/.test(inner)) break;
    pos = b;
  }
  return pos;
}

/** After `#figure(...)` `)`, consume Pandoc’s closing `#block[` `]` lines. */
function skipTrailingBlockClosers(body: string, figureCallEnd: number): number {
  let e = figureCallEnd;
  while (e < body.length && /[\s\n\r]/.test(body[e])) e++;
  while (e < body.length && body[e] === "]") {
    e++;
    while (e < body.length && /[\s\n\r]/.test(body[e])) e++;
  }
  return e;
}

/** Article tables: outermost `#block[` … `#figure(` … `align(center)[#table(` … plus trailing `]`. */
function tableFigureIntervals(body: string): { start: number; end: number }[] {
  const out: { start: number; end: number }[] = [];
  let search = 0;
  /** Guard against pathological input / parser edge cases (stuck loop → RangeError on push). */
  const maxTables = 50000;
  while (out.length < maxTables) {
    const t = body.indexOf("align(center)[#table(", search);
    if (t < 0) break;
    // `lastIndexOf("#figure(", t)` can hit a *shorter* figure that ends before `t` (e.g. pixra in
    // prose). That yields `figureEnd <= t`, then `search = end` never passes `t` → infinite loop.
    let fi = body.lastIndexOf("#figure(", t);
    let figureEnd = -1;
    while (fi >= 0) {
      const openParen = fi + "#figure".length;
      if (body[openParen] !== "(") {
        fi = body.lastIndexOf("#figure(", fi - 1);
        continue;
      }
      const fe = endOfTypstCallWithParens(body, openParen);
      if (fe < 0) {
        fi = body.lastIndexOf("#figure(", fi - 1);
        continue;
      }
      if (fe > t) {
        figureEnd = fe;
        break;
      }
      fi = body.lastIndexOf("#figure(", fi - 1);
    }
    if (fi < 0 || figureEnd < 0) {
      search = t + 1;
      continue;
    }
    const start = outerBlockChainStart(body, fi);
    const end = skipTrailingBlockClosers(body, figureEnd);
    out.push({ start, end });
    search = Math.max(end, t + 1);
  }
  return out;
}

/** Mermaid (post `patchBodyTypFile`): `#block[` wrapping `#align(center)[#box(...mermaid-….png)]`. */
function mermaidBlockIntervals(body: string): { start: number; end: number }[] {
  const out: { start: number; end: number }[] = [];
  let search = 0;
  while (true) {
    const m = body.indexOf("mermaid-", search);
    if (m < 0) break;
    const blockStart = body.lastIndexOf("#block[", m);
    if (blockStart < 0 || m - blockStart > 800) {
      search = m + 1;
      continue;
    }
    const inner = body.slice(blockStart, m + 120);
    if (!inner.includes("#align(center)")) {
      search = m + 1;
      continue;
    }
    const openBracketIdx = blockStart + "#block[".length - 1;
    const end = endOfBracketContent(body, openBracketIdx);
    if (end < 0) {
      search = m + 1;
      continue;
    }
    out.push({ start: blockStart, end });
    search = end;
  }
  return out;
}

function collectSpeakerRowTypstIntervals(
  body: string
): { start: number; end: number }[] {
  const out: { start: number; end: number }[] = [];
  const re = speakerAvatarTypstImageGlobalRegex();
  let m: RegExpExecArray | null;
  let skipUntil = -1;
  while ((m = re.exec(body))) {
    if (m.index < skipUntil) continue;
    const outer = findSpeakerRowTypstOuter(body, m.index);
    if (!outer) continue;
    out.push(outer);
    skipUntil = outer.end;
  }
  return out;
}

/**
 * Pandoc html→typst for `<speaker>` rows is a wrapping `#block[` around avatar `#block[#figure…]`
 * plus a sibling `#block[speech]`. Treat each row as full-width (like headings), then rewrite to a
 * two-column Typst grid (avatar | speech) so it matches site HTML and spans the lesson band.
 */
function findSpeakerRowTypstOuter(
  body: string,
  imageIdx: number
): { start: number; end: number } | null {
  let search = imageIdx;
  for (let guard = 0; guard < 120; guard += 1) {
    const b = body.lastIndexOf("#block[", search);
    if (b < 0) return null;
    const openBracketIdx = b + "#block[".length - 1;
    const e = endOfBracketContent(body, openBracketIdx);
    if (e < 0) {
      search = b - 1;
      continue;
    }
    if (imageIdx < b + "#block[".length || imageIdx >= e) {
      search = b - 1;
      continue;
    }
    const inner = body.slice(openBracketIdx + 1, e - 1);
    if (!trySplitSpeakerRowInner(inner)) {
      search = b - 1;
      continue;
    }
    return { start: b, end: e };
  }
  return null;
}

/** Outer `#block` inner must be: avatar `#block[ … ]` then speech `#block[ … ]` only. */
function trySplitSpeakerRowInner(inner: string): { avatarWrap: string; speechWrap: string } | null {
  const trimmed = inner.replace(/^\s+/, "");
  if (!trimmed.startsWith("#block[")) return null;
  const offset = inner.length - trimmed.length;
  const rel0 = offset + trimmed.indexOf("#block[");
  const avOpenBracket = rel0 + "#block[".length - 1;
  const avEnd = endOfBracketContent(inner, avOpenBracket);
  if (avEnd < 0) return null;
  const avatarWrap = inner.slice(rel0, avEnd);
  let pos = avEnd;
  while (pos < inner.length && /\s/.test(inner[pos]!)) pos += 1;
  const spRel = inner.indexOf("#block[", pos);
  if (spRel < 0) return null;
  const spOpenBracket = spRel + "#block[".length - 1;
  const spEnd = endOfBracketContent(inner, spOpenBracket);
  if (spEnd < 0) return null;
  const speechWrap = inner.slice(spRel, spEnd);
  const rest = inner.slice(spEnd).replace(/\s+/g, "");
  if (rest.length > 0) return null;
  const avInner = typstOneBlockInner(avatarWrap);
  if (avInner === null || !typstSnippetContainsSpeakerAvatarImagePath(avInner))
    return null;
  const speechInnerProbe = typstOneBlockInner(speechWrap);
  if (speechInnerProbe === null) return null;
  // Multiface: only the outer avatar wrapper may contain multiple `#figure`s; speech must not be a figure cell.
  if (/^\s*#figure\(/s.test(speechInnerProbe)) return null;
  return { avatarWrap, speechWrap };
}

function typstOneBlockInner(block: string): string | null {
  const t = block.trimStart();
  if (!t.startsWith("#block[")) return null;
  const off = block.length - t.length;
  const b = off + t.indexOf("#block[");
  const openBracketIdx = b + "#block[".length - 1;
  const e = endOfBracketContent(block, openBracketIdx);
  if (e < 0) return null;
  return block.slice(openBracketIdx + 1, e - 1);
}

/**
 * Pandoc-emitted `<speaker>` row → `#speaker_row_avatar_column` + `#speaker_speech_bubble` grid.
 * Single implementation for every book PDF (see `speaker-bubble.typ`).
 */
export function typstSpeakerRowRewrittenBlock(p: {
  multiface: boolean;
  leftColRaw: string;
  bubbleIdx: number;
  speechInner: string;
}): string {
  const { multiface, leftColRaw, bubbleIdx, speechInner } = p;
  const leftCol = `#speaker_row_avatar_column(multiface: ${multiface})[
${leftColRaw}
]`;
  return `#block[
#grid(
  columns: (auto, 1fr),
  column-gutter: 12pt,
  align: (top + left, horizon + left),
)[
${leftCol}
][
#speaker_speech_bubble(${bubbleIdx})[
${speechInner.trim()}
]
]
]
`;
}

function rewriteSpeakerRowTypstBlock(block: string): string {
  const t = block.trim();
  if (!t.startsWith("#block[")) return block;
  const b = t.indexOf("#block[");
  const openBracketIdx = b + "#block[".length - 1;
  const e = endOfBracketContent(t, openBracketIdx);
  if (e < 0) return block;
  const inner = t.slice(openBracketIdx + 1, e - 1);
  const parts = trySplitSpeakerRowInner(inner);
  if (!parts) return block;
  const avatarInner = typstOneBlockInner(parts.avatarWrap);
  const speechInner = typstOneBlockInner(parts.speechWrap);
  if (avatarInner === null || speechInner === null) return block;
  const figCount = (avatarInner.match(/#figure\(/g) ?? []).length;
  const multiface = figCount > 1;
  const leftColRaw = multiface
    ? `#stack(spacing: 0.5em)[
${avatarInner.trim()}
]`
    : avatarInner.trim();
  const bubbleIdx = speakerBubblePaletteIndexFromTypstAvatarInner(avatarInner);
  return typstSpeakerRowRewrittenBlock({
    multiface,
    leftColRaw,
    bubbleIdx,
    speechInner,
  });
}

function rewriteSpeakerRowTypstIfNeeded(segment: string): string {
  if (!typstSnippetContainsSpeakerAvatarImagePath(segment)) return segment;
  const lead = segment.match(/^\s*/)?.[0] ?? "";
  const trimmed = segment.trim();
  if (!trimmed.startsWith("#block[")) return segment;
  const next = rewriteSpeakerRowTypstBlock(trimmed);
  return next === trimmed ? segment : lead + next;
}

/**
 * Final safety pass: rewrite any remaining raw speaker rows that may have slipped through
 * interval slicing (rare Pandoc layouts where one row stays as plain figure + text blocks).
 */
function rewriteResidualSpeakerRows(body: string): string {
  const rows = collectSpeakerRowTypstIntervals(body);
  if (rows.length === 0) return body;
  let out = body;
  for (let i = rows.length - 1; i >= 0; i -= 1) {
    const row = rows[i]!;
    const before = out.slice(0, row.start);
    const target = out.slice(row.start, row.end);
    const after = out.slice(row.end);
    out = before + rewriteSpeakerRowTypstIfNeeded(target) + after;
  }
  return out;
}

/**
 * Brute-force nested block scan fallback: try rewriting every `#block[...]` node in-place.
 * This catches rare rows that are structurally valid speaker rows but missed by interval discovery.
 */
function rewriteSpeakerRowsByBlockScan(body: string): string {
  let out = body;
  let search = 0;
  for (let guard = 0; guard < 30000; guard += 1) {
    const b = out.indexOf("#block[", search);
    if (b < 0) break;
    const open = b + "#block[".length - 1;
    const end = endOfBracketContent(out, open);
    if (end < 0) break;
    const block = out.slice(b, end);
    const rewritten = rewriteSpeakerRowTypstIfNeeded(block);
    if (rewritten !== block) {
      out = out.slice(0, b) + rewritten + out.slice(end);
      search = b + rewritten.length;
      continue;
    }
    search = b + 1;
  }
  return out;
}

function mergeIntervals(
  intervals: { start: number; end: number }[]
): { start: number; end: number }[] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a.start - b.start);
  const out: { start: number; end: number }[] = [];
  for (const iv of sorted) {
    const last = out[out.length - 1];
    if (!last || iv.start > last.end) {
      out.push({ ...iv });
    } else {
      last.end = Math.max(last.end, iv.end);
    }
  }
  return out;
}

function splitByFullWidthIntervals(
  body: string,
  intervals: { start: number; end: number }[]
): { kind: "flow" | "full"; text: string }[] {
  const merged = mergeIntervals(intervals);
  const seg: { kind: "flow" | "full"; text: string }[] = [];
  let cursor = 0;
  for (const iv of merged) {
    if (cursor < iv.start) {
      seg.push({ kind: "flow", text: body.slice(cursor, iv.start) });
    }
    seg.push({ kind: "full", text: body.slice(iv.start, iv.end) });
    cursor = iv.end;
  }
  if (cursor < body.length) {
    seg.push({ kind: "flow", text: body.slice(cursor) });
  }
  return seg;
}

/**
 * Pandoc puts heading anchors on the line after `=== Title` as `<slug>` (HTML label syntax).
 * Those must stay attached to the heading, not inside the pixra `#grid`, or `#link(<slug>)` breaks.
 */
function stripLeadingTypstLabel(flow: string): { rest: string; labelLine: string | null } {
  const trimmed = flow.replace(/^\s+/, "");
  const m = trimmed.match(/^<([a-zA-Z0-9][a-zA-Z0-9-]*)>\s*(?:\n|$)/);
  if (!m) return { rest: flow, labelLine: null };
  const labelLine = m[0]!.replace(/\s+$/, "");
  return { rest: trimmed.slice(m[0]!.length), labelLine };
}

function transformFlowSegment(flow: string): string {
  const { rest: flowRest, labelLine } = stripLeadingTypstLabel(flow);
  const ranges = extractPixraRanges(flowRest);
  if (ranges.length === 0) return flow;

  let pos = 0;
  const kept: string[] = [];
  for (const r of ranges) {
    if (r.start > pos) kept.push(flowRest.slice(pos, r.start));
    pos = r.end;
  }
  if (pos < flowRest.length) kept.push(flowRest.slice(pos));
  let cleaned = kept.join("");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  const figures = ranges.map((r) => r.figureSrc);
  const left = cleaned.trim();

  const gridOnly = !left
    ? `#align(right)[
  #stack(spacing: 0.55em)[
    ${figures.join("\n    ")}
  ]
]
`
    : `#grid(
  columns: (1fr, auto),
  gutter: 2.5mm,
  align: (top + left, top + right),
)[
${left}
][
  #stack(spacing: 0.55em)[
    ${figures.join("\n    ")}
  ]
]
`;

  if (!labelLine) return gridOnly;
  return `${labelLine}\n${gridOnly}`;
}

/**
 * Split on headings, table figures, and Mermaid blocks; move every pixra in each flow slice
 * to the right column (queued in document order).
 */
export function patchBodyTypFloatFigures(body: string): string {
  const intervals = [
    ...headingLineIntervals(body),
    ...tableFigureIntervals(body),
    ...mermaidBlockIntervals(body),
    ...collectSpeakerRowTypstIntervals(body),
  ];
  const segments = splitByFullWidthIntervals(body, intervals);
  let out = "";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!;
    let piece =
      seg.kind === "full"
        ? rewriteSpeakerRowTypstIfNeeded(seg.text)
        : transformFlowSegment(seg.text);
    // Heading/table/mermaid slices exclude the trailing newline; the next flow often starts
    // with `#grid(` — insert `\n` so Typst doesn't glue `==== Section` to `#grid(`.
    if (
      i > 0 &&
      segments[i - 1]!.kind === "full" &&
      seg.kind === "flow" &&
      piece.length > 0 &&
      !piece.startsWith("\n")
    ) {
      piece = "\n" + piece;
    }
    out += piece;
  }
  return rewriteSpeakerRowsByBlockScan(rewriteResidualSpeakerRows(out));
}
