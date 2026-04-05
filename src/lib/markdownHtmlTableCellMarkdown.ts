/**
 * GFM parses markdown inside raw HTML when there is a newline after the opening tag (see
 * `speechInnerForHtml` in expandFirstLojbanSpeakerTags). Table cells in authored HTML often omit
 * that, so `**bold**` stays literal. Insert a leading blank line after each `<td>` / `<th>` open.
 *
 * Skips fenced ``` / ~~~ blocks (same idea as markdownNormalizeThematicBreaks).
 */

function markdownFencedCharRanges(markdown: string): [number, number][] {
  const lines = markdown.split("\n");
  const ranges: [number, number][] = [];
  let inFence = false;
  let fenceStart = 0;
  let offset = 0;

  for (const line of lines) {
    const lineStart = offset;
    const lineEnd = offset + line.length;
    const t = line.trimStart();

    if (t.startsWith("```") || t.startsWith("~~~")) {
      if (!inFence) {
        inFence = true;
        fenceStart = lineStart;
      } else {
        inFence = false;
        ranges.push([fenceStart, lineEnd + 1]);
      }
    }
    offset = lineEnd + 1;
  }

  return ranges;
}

function fencedRangeContaining(
  pos: number,
  ranges: [number, number][]
): [number, number] | undefined {
  return ranges.find(([a, b]) => pos >= a && pos < b);
}

function isTableTagOpen(lower: string, md: string, i: number): boolean {
  if (lower.slice(i, i + 6) !== "<table") return false;
  const c = md[i + 6];
  return c === ">" || c === "/" || (c !== undefined && /\s/.test(c));
}

function findNextTableOpen(lower: string, md: string, from: number): number {
  let pos = from;
  while (pos < md.length) {
    const i = lower.indexOf("<table", pos);
    if (i === -1) return -1;
    if (isTableTagOpen(lower, md, i)) return i;
    pos = i + 1;
  }
  return -1;
}

/** Index after `>` of the matching `</table>` for the `<table` at `tableOpen`. */
function endIndexAfterMatchingTableClose(md: string, tableOpen: number): number {
  const lower = md.toLowerCase();
  let depth = 1;
  let pos = md.indexOf(">", tableOpen);
  if (pos === -1) return -1;
  pos++;
  while (pos < md.length && depth > 0) {
    const nextOpen = findNextTableOpen(lower, md, pos);
    const nextClose = lower.indexOf("</table", pos);
    if (nextClose === -1) return -1;
    const useOpen = nextOpen !== -1 && nextOpen < nextClose;
    if (useOpen) {
      depth++;
      const gt = md.indexOf(">", nextOpen);
      if (gt === -1) return -1;
      pos = gt + 1;
    } else {
      depth--;
      const gt = md.indexOf(">", nextClose);
      if (gt === -1) return -1;
      pos = gt + 1;
    }
  }
  return pos;
}

function isTdCellOpen(lower: string, md: string, i: number): boolean {
  if (lower.slice(i, i + 3) !== "<td") return false;
  const c = md[i + 3];
  return c === ">" || c === "/" || (c !== undefined && /\s/.test(c));
}

/** `<th` but not `<thead`. */
function isThCellOpen(lower: string, md: string, i: number): boolean {
  if (lower.slice(i, i + 3) !== "<th") return false;
  const c = md[i + 3];
  if (c === "e") return false;
  return c === ">" || c === "/" || (c !== undefined && /\s/.test(c));
}

function findNextCellTagOpen(html: string, from: number): number {
  const lower = html.toLowerCase();
  let pos = from;
  while (pos < html.length) {
    const iTd = lower.indexOf("<td", pos);
    const iTh = lower.indexOf("<th", pos);
    let next = -1;
    if (iTd === -1) next = iTh;
    else if (iTh === -1) next = iTd;
    else next = Math.min(iTd, iTh);
    if (next === -1) return -1;
    if (isTdCellOpen(lower, html, next) || isThCellOpen(lower, html, next)) {
      return next;
    }
    pos = next + 1;
  }
  return -1;
}

/** Like speechInnerForHtml: ensure markdown can run inside the cell. */
function cellInnerPrefixIfNeeded(afterGt: string): string {
  if (/^\s*\n/.test(afterGt)) return "";
  return "\n\n";
}

function injectCellMarkdownNewlines(tableInnerHtml: string): string {
  let out = "";
  let i = 0;
  const html = tableInnerHtml;
  while (i < html.length) {
    const cell = findNextCellTagOpen(html, i);
    if (cell === -1) {
      out += html.slice(i);
      break;
    }
    out += html.slice(i, cell);
    const gt = html.indexOf(">", cell);
    if (gt === -1) {
      out += html.slice(cell);
      break;
    }
    out += html.slice(cell, gt + 1);
    const rest = html.slice(gt + 1);
    out += cellInnerPrefixIfNeeded(rest);
    i = gt + 1;
  }
  return out;
}

function transformOneTableBlock(block: string): string {
  const lower = block.toLowerCase();
  if (!isTableTagOpen(lower, block, 0)) return block;
  const openGt = block.indexOf(">");
  if (openGt === -1) return block;
  const closeStart = block.toLowerCase().lastIndexOf("</table");
  if (closeStart === -1 || closeStart <= openGt) return block;
  const head = block.slice(0, openGt + 1);
  const middle = block.slice(openGt + 1, closeStart);
  const tail = block.slice(closeStart);
  return head + injectCellMarkdownNewlines(middle) + tail;
}

export function markdownEnableHtmlTableCellMarkdown(markdown: string): string {
  const fenced = markdownFencedCharRanges(markdown);
  const lower = markdown.toLowerCase();
  let out = "";
  let search = 0;

  while (search < markdown.length) {
    const t = findNextTableOpen(lower, markdown, search);
    if (t === -1) {
      out += markdown.slice(search);
      break;
    }
    const fence = fencedRangeContaining(t, fenced);
    if (fence) {
      out += markdown.slice(search, fence[1]);
      search = fence[1];
      continue;
    }
    out += markdown.slice(search, t);
    const end = endIndexAfterMatchingTableClose(markdown, t);
    if (end === -1) {
      out += markdown.slice(t);
      break;
    }
    const block = markdown.slice(t, end);
    out += transformOneTableBlock(block);
    search = end;
  }

  return out;
}
