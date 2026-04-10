/**
 * Mermaid tuning for the Typst PDF pipeline only.
 * `useMaxWidth: true` scales diagrams to the viewport and shrinks label text on dense charts;
 * book mode uses a fixed `themeVariables.fontSize` + `useMaxWidth: false` on supported diagram types.
 * Rasterization (`extractMermaidSvgDivsToImages`) then pins each SVG to its `viewBox` width/height
 * in CSS px so `width="100%"` cannot stretch charts in the Playwright viewport (that was the main
 * source of inconsistent label sizes between diagrams).
 */
export const MERMAID_BOOK_FONT_PX = 18;

/** Injected into the Playwright page when rasterizing existing Mermaid SVGs (foreignObject HTML). */
export const mermaidBookScreenshotStyle = `
div.mermaid {
  display: inline-block;
}
div.mermaid svg foreignObject > div,
div.mermaid svg foreignObject div {
  font-size: ${MERMAID_BOOK_FONT_PX}px !important;
  line-height: 1.35 !important;
}
`;

/** Extra `mermaid.initialize` keys for book PDF (flowchart/gitGraph toggled in markdownToHtml). */
export const remarkMermaidBookPdfExtra = {
  sequence: { useMaxWidth: false },
  gantt: { useMaxWidth: false },
  journey: { useMaxWidth: false },
} as const;
