/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
// (none — output is unstyled <time>)

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
// (inline <time>)

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  dateString: string;
};

function DateFormatter({ dateString }: Props) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  return <time dateTime={dateString}>{formatted}</time>;
}

export default DateFormatter;
