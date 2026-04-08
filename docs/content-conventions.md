# Content conventions

## Inline typography (books, especially dialogue)

Match the style used in **learn-lojban** (`data/pages/en/books/learn-lojban/`):

- **Lojban** text in running prose (cmavo, brivla, cmene, short Lojban fragments): wrap in `**bold**`.
- **English** when you are quoting, defining, or stressing a term (grammar words like _conversion_, _proposition_, _terminator_, or rhetorical emphasis): use `_italic_`.
- Example sentences (blockquotes): put the **entire** Lojban utterance on the first line in a **single** `**…**` span (do not leave the start of the sentence unbolded), then the English gloss on the next line in `_italics_`.

Do not use bold for ordinary English emphasis if italics carry the meaning more clearly.

## Book chapters

- Chapter files live under `[lang]/books/[book]/`, e.g. `1.md`, `2.md`, `intro.md`.
- A page is treated as a **book chapter** when its path has the form `[lang]/books/[book]/[chapter].md` (i.e. at least four segments, with `books` as the second).
- The book index page is `[lang]/books/[book].md`; chapter pages inherit its front matter when they don’t override it.

### Legacy URLs (old `!` chapter paths)

- Old chapter URLs that used the `!` prefix (e.g. `/en/books/learn-lojban/!1`) should redirect to the new paths (e.g. `/en/books/learn-lojban/1/`).
- **Static export / GitHub Pages:** Legacy `!*` URLs are handled by the **custom 404 page** (`src/pages/404.tsx`), which client-side redirects when the path matches `/:lang/books/:book/!:chapter`. (`next.config.js` does not define `redirects()` because they are ignored for `output: export` and only produced a build warning.)
- Use the new URLs (without `!`) in new links.
