# Content conventions

## Book chapters

- Chapter files live under `[lang]/books/[book]/`, e.g. `1.md`, `2.md`, `intro.md`.
- A page is treated as a **book chapter** when its path has the form `[lang]/books/[book]/[chapter].md` (i.e. at least four segments, with `books` as the second).
- The book index page is `[lang]/books/[book].md`; chapter pages inherit its front matter when they don’t override it.

### Legacy URLs (old `!` chapter paths)

- Old chapter URLs that used the `!` prefix (e.g. `/en/books/learn-lojban/!1`) should redirect to the new paths (e.g. `/en/books/learn-lojban/1/`).
- **Static export / GitHub Pages:** The Next.js `redirects()` in `next.config.js` are not applied when serving static files (e.g. `pnpm start` or GitHub Pages). Redirects for legacy `!*` URLs are handled by the **custom 404 page** (`src/pages/404.tsx`), which does a client-side redirect when the missing path matches `/:lang/books/:book/!:chapter`. So old links will work after the 404 page loads.
- Use the new URLs (without `!`) in new links.
