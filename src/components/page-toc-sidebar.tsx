/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import Link from "next/link";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  nav: "hidden md:block toc w-full md:w-1/5 sticky px-2 bottom-0 md:top-20 h-16 md:h-screen font-medium text-sm overflow-ellipsis",
  core: "toc-core h-4/5 overflow-y-auto",
  link: "block text-black in-toc hover:no-underline px-3 py-2",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
export type PageTocItem = {
  url: string;
  name: string;
  depth: number;
};

export function PageTocSidebar({ items }: { items: PageTocItem[] }) {
  return (
    <nav aria-label="On this page" className={tw.nav}>
      <div id="toc-core" className={tw.core}>
        {items.map((item) => (
          <Link
            href={item.url}
            key={item.url}
            className={`${tw.link} lme-ml-${(item.depth - 2) * 2}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
