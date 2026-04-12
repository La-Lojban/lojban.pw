/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  hr: "border-accent-2 mt-28 mb-24",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function SeparatorLine() {
  return <hr className={tw.hr} />;
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
function SectionSeparator() {
  return <SeparatorLine />;
}

export default SectionSeparator;
