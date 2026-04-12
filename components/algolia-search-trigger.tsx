/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { isAlgoliaConfigured } from "../lib/algolia";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  buttonBase:
    "mx-2 p-2 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white transition-all duration-150 hover:shadow-md",
  icon: "h-5 w-5",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function SearchOpenButton({
  onOpen,
  className,
}: {
  onOpen: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={className}
      aria-label="Search"
    >
      <MagnifyingGlassIcon className={tw.icon} aria-hidden="true" />
    </button>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
export function AlgoliaSearchTrigger({
  onOpen,
  getColor,
}: {
  onOpen: () => void;
  getColor: (className: string) => string;
}) {
  if (!isAlgoliaConfigured) return null;

  const className = `${tw.buttonBase} ${getColor("bg-deep-orange-300")} ${getColor("hover:bg-deep-orange-200")}`;

  return <SearchOpenButton onOpen={onOpen} className={className} />;
}
