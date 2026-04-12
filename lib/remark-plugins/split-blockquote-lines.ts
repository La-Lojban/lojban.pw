import type { Blockquote, Paragraph, PhrasingContent, Root } from "mdast";
import { visit } from "unist-util-visit";

/**
 * In CommonMark, continued `>` lines merge into one paragraph; a line break between
 * `> **Lojban**` and `> _gloss_` becomes a top-level `\n` text node. Split those into
 * separate paragraphs so each source line is its own `<p>` (display block) while
 * `strong` / `emphasis` stay normal inline phrasing.
 */
function splitParagraphLines(children: PhrasingContent[]): PhrasingContent[][] {
  const lines: PhrasingContent[][] = [[]];

  const pushToCurrent = (node: PhrasingContent) => {
    lines[lines.length - 1]!.push(node);
  };

  for (const child of children) {
    if (child.type !== "text" || !child.value.includes("\n")) {
      pushToCurrent(child);
      continue;
    }
    const parts = child.value.split("\n");
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        lines.push([]);
      }
      const piece = parts[i]!;
      if (piece !== "") {
        pushToCurrent({ type: "text", value: piece });
      }
    }
  }

  return lines.filter((group) => group.length > 0);
}

function splitBlockquoteParagraph(p: Paragraph): Paragraph[] {
  const lineGroups = splitParagraphLines(p.children);
  if (lineGroups.length < 2) {
    return [p];
  }
  return lineGroups.map((children) => ({
    type: "paragraph",
    children,
  }));
}

export default function remarkSplitBlockquoteLines() {
  return (tree: Root) => {
    visit(tree, "blockquote", (node: Blockquote) => {
      const next: Blockquote["children"] = [];
      for (const child of node.children) {
        if (child.type === "paragraph") {
          next.push(...splitBlockquoteParagraph(child));
        } else {
          next.push(child);
        }
      }
      node.children = next;
    });
  };
}
