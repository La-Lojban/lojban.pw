# Enabling Algolia search

Site search in the topbar is powered by [Algolia](https://www.algolia.com/). When configured, a search icon appears in the header; clicking it opens an overlay where users can search across the site.

## 1. Get Algolia credentials

1. Create an account at [algolia.com](https://www.algolia.com/) and create an application.
2. In the dashboard, create an **index** (this project uses `lojban-pw`).
3. Note your **Application ID** and get a **Search-Only API Key** (under API Keys — use the key that has “Search” permission only, for security).

## 2. Set environment variables

In the project root (or wherever you run `next` from), set:

```bash
# Algolia (optional – if unset, the search icon is hidden)
NEXT_PUBLIC_ALGOLIA_APP_ID=your_application_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_only_api_key
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=lojban-pw
```

- All three must be set for search to appear; if any is missing, the search UI is disabled.
- Use a **search-only** API key in the frontend, never an admin key.

## 3. Index your content

The UI expects each record in the index to have at least:

- `objectID` (string, unique)
- `url` (string) – full URL or path, e.g. `/en/books/learn-lojban/1`
- `title` (string, optional) – page title
- `content` (string, optional) – snippet used in results and for matching
- `hierarchy` (object, optional) – e.g. `{ lvl0: "Section", lvl1: "Page" }` for breadcrumbs

You can index content in either of these ways.

### Option A: Algolia DocSearch (crawler)

If your site is public and you qualify, you can use [DocSearch](https://docsearch.algolia.com/):

1. Apply at [docsearch.algolia.com/apply](https://docsearch.algolia.com/apply).
2. Once accepted, they provide an index and often a crawler config. Use their index name and the Application ID + Search-Only API Key they give you in the env vars above.
3. The default DocSearch record shape includes `hierarchy` and `content`; the in-site UI works with that.

### Option B: Custom index script (used in CI)

This repo includes a script that indexes all markdown pages to Algolia. It runs automatically in the GitHub Actions workflow after each build (see [Deploying to GitHub Pages](github-pages.md)). You can also run it locally.

**In CI:** The workflow runs `node scripts/algolia-index.js` inside the build container. Set the secret `ALGOLIA_ADMIN_KEY` (and the same App ID / index name used for search) so the script can push records. If those are not set, the script exits without error and the build continues.

**Locally:** From the `src` directory, with env vars set:

```bash
ALGOLIA_APP_ID=your_app_id ALGOLIA_ADMIN_KEY=your_admin_key ALGOLIA_INDEX_NAME=lojban-pw node scripts/algolia-index.js
```

The script walks `data/pages` (or `md_pages` in Docker), reads each `.md` file with gray-matter, and indexes **by section**: it splits the markdown body on headings (`##`, `###`, etc.). Each section becomes one or more records (chunked if over ~8KB) with:
- **url** including a hash to the section (e.g. `/en/books/learn-lojban/1/#introduction`), so results link straight to that part of the page
- **title** = section heading, **pageTitle** = document title, **content** = that section’s markdown
- **hierarchy** from the path

Only the markdown body is indexed (no front matter in `content`). Algolia’s **~10KB limit per record** is respected by chunking long sections. The search UI deduplicates by `url` so each section appears once. Use the **full** `algoliasearch` client (not the lite one) for any custom indexing. Example record shape:

```json
{
  "objectID": "en-books-learn-lojban-1",
  "url": "/en/books/learn-lojban/1",
  "title": "Chapter 1",
  "content": "First 200–500 chars of body text..."
}
```

3. Configure searchable attributes and ranking in the Algolia dashboard (e.g. `title`, `content`, `url`).

<!-- legacy example removed; see Option B above for the built-in script -->

```js
const algoliasearch = require("algoliasearch");
const { getAllPosts } = require("./lib/api"); // adapt path

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

async function indexAll() {
  const posts = await getAllPosts({
    fields: ["slug", "title", "content", "firstHeader"],
    showHidden: false,
    folder: "",
    ignoreTitles: false,
  });
  const records = posts.map((p) => ({
    objectID: p.slug.join("-"),
    url: `/${p.slug.join("/")}`,
    title: p.title || p.firstHeader,
    content: (p.content || "").slice(0, 500),
  }));
  await index.saveObjects(records);
}
```

Run this (or a similar script) after content changes; you can also use Algolia’s API from your CMS or CI.

## 4. Build and run

Install dependencies (this adds `algoliasearch` and `react-instantsearch` if not already present), then start the dev server. From the `src` directory (or project root if that’s where `next` is run):

```bash
pnpm install
pnpm dev
```

With the three `NEXT_PUBLIC_ALGOLIA_*` variables set, the search icon appears in the topbar. Click it to open the overlay, type to search, and use Escape or click outside to close.

## Summary

| Step | Action |
|------|--------|
| 1 | Create Algolia app and index; get Application ID and Search-Only API Key |
| 2 | Set `NEXT_PUBLIC_ALGOLIA_APP_ID`, `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY`, `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` |
| 3 | Index content via DocSearch or your own script so records have `objectID`, `url`, and optionally `title`, `content`, `hierarchy` |
| 4 | Run the site; search appears in the topbar when env is set and index has data |
