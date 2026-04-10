/**
 * Pandoc html→typst emits pixra as `#block[ #figure([#block[ #image(...) ]], caption: [...]) ]`.
 * For the PDF we keep a fixed two-column band: main text on the left, all pixra in that region
 * stacked on the right in source order (queue). Full-width elements (headings, article tables,
 * Mermaid raster) stay outside the band so they span the text block.
 */

/** `#figure(` … matching `)` at depth 0, respecting double-quoted strings. */
function endOfTypstCallWithParens(s: string, openParenIdx: number): number {
  if (s[openParenIdx] !== "(") return -1;
  let depth = 0;
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
    if (c === '"') {
      inStr = true;
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
function endOfBracketContent(s: string, openBracketIdx: number): number {
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
    if (c === '"') {
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

/**
 * One `#block[ ... ]` whose body is only `#figure([#block[ #image(...) ]], caption: [...])`
 * (site pixra). Returns end index and the inner `#figure(...)` source.
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
  const afterOpen = s.slice(openParen + 1);
  if (!afterOpen.startsWith("[#block[")) return null;
  const closeParen = endOfTypstCallWithParens(s, openParen);
  if (closeParen < 0) return null;
  const figureSrc = s.slice(pos, closeParen);
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
  while (true) {
    const t = body.indexOf("align(center)[#table(", search);
    if (t < 0) break;
    const fi = body.lastIndexOf("#figure(", t);
    if (fi < 0) {
      search = t + 1;
      continue;
    }
    const openParen = fi + "#figure".length;
    if (body[openParen] !== "(") {
      search = t + 1;
      continue;
    }
    const figureEnd = endOfTypstCallWithParens(body, openParen);
    if (figureEnd < 0) {
      search = t + 1;
      continue;
    }
    const start = outerBlockChainStart(body, fi);
    const end = skipTrailingBlockClosers(body, figureEnd);
    out.push({ start, end });
    search = end;
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

  let cleaned = flowRest;
  for (let k = ranges.length - 1; k >= 0; k--) {
    const r = ranges[k]!;
    cleaned = cleaned.slice(0, r.start) + cleaned.slice(r.end);
  }
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
  ];
  const segments = splitByFullWidthIntervals(body, intervals);
  let out = "";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!;
    let piece = seg.kind === "full" ? seg.text : transformFlowSegment(seg.text);
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
  return out;
}
