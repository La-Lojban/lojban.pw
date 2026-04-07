/**
 * Renders a Simple Icons brand glyph (currentColor, 24×24 viewBox).
 */
import type { SimpleIcon } from "simple-icons";

export function BrandIcon({
  icon,
  className,
}: {
  icon: SimpleIcon;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
}
