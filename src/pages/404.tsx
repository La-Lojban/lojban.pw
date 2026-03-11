import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || done) return;
    const pathname = window.location.pathname.replace(/\/$/, "");
    const search = window.location.search;
    const hash = window.location.hash;

    // 1. Legacy book chapters: /:lang/books/:book/!:chapter → /:lang/books/:book/:chapter/
    const bookChapterMatch = pathname.match(/^(\/[^/]+)\/books\/([^/]+)\/!([^/]+)$/);
    if (bookChapterMatch) {
      const [, lang, book, chapter] = bookChapterMatch;
      const target = `${lang}/books/${book}/${chapter}/${search}${hash}`;
      router.replace(target);
      setDone(true);
      return;
    }

    setDone(true);
  }, [router, done]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404</h1>
      <p>This page could not be found.</p>
    </div>
  );
}
