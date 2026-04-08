/** Escape cell text for GFM pipe tables (generator + tests). */
export function escapeMarkdownTableCell(text: string): string {
  if (!text) return "";
  return String(text)
    .replace(/\r\n/g, "\n")
    .replace(/\n+/g, " ")
    .replace(/\|/g, "\\|");
}
