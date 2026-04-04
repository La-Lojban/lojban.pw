/**
 * CommonMark only ends an HTML block with a blank line; a lone `---` on the next line can stay
 * literal text. Converting thematic-break lines to `<hr />` avoids that and avoids setext `---`
 * clashes (e.g. after raw HTML or `<speaker>` before expansion).
 *
 * Skips fenced ``` / ~~~ blocks so `---` inside code samples is unchanged.
 */
export function markdownNormalizeThematicBreaks(markdown: string): string {
  const lines = markdown.split("\n");
  let inFence = false;
  const out: string[] = [];

  for (const line of lines) {
    const t = line.trimStart();
    if (t.startsWith("```") || t.startsWith("~~~")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (
      !inFence &&
      /^ {0,3}(?:---|___|\*\*\*)\s*$/.test(line)
    ) {
      out.push("<hr />");
    } else {
      out.push(line);
    }
  }

  return out.join("\n");
}
