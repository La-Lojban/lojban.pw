/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  root: "p-8 text-center",
  title: "text-2xl font-semibold",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function NotFoundMessage() {
  return (
    <div className={tw.root}>
      <h1 className={tw.title}>404</h1>
      <p>This page could not be found.</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
/**
 * Custom 404 page. On static export (pnpm start, GitHub Pages) next.config.js
 * redirects() are not run. This page mirrors all redirects from next.config.js
 * so the same rules apply client-side when a missing URL is hit.
 *
 * Current redirects (must stay in sync with next.config.js):
 * 1. Legacy book chapters: /:lang/books/:book/!:chapter → /:lang/books/:book/:chapter/
 */
export default function Custom404() {
  const router = useRouter();
  const didRun = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || didRun.current) return;
    didRun.current = true;
    const pathname = window.location.pathname.replace(/\/$/, "");
    const search = window.location.search;
    const hash = window.location.hash;

    const bookChapterMatch = pathname.match(
      /^(\/[^/]+)\/books\/([^/]+)\/!([^/]+)$/
    );
    if (bookChapterMatch) {
      const [, lang, book, chapter] = bookChapterMatch;
      const target = `${lang}/books/${book}/${chapter}/${search}${hash}`;
      router.replace(target);
      return;
    }
  }, [router]);

  return <NotFoundMessage />;
}
