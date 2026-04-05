/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { parseISO, format } from "date-fns";

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
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "LLLL	d, yyyy")}
    </time>
  );
}

export default DateFormatter;
