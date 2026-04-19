# lojban.pw

Static [Next.js](https://nextjs.org/) site (export to `out/`) for Lojban courses, texts, and articles. Content lives under `data/`; the app code, `pages/`, and `public/` sit at the **repository root** next to `data/`.

## Requirements

- **Node.js** 24+ and **pnpm** 10.x (see `engines` and `packageManager` in [package.json](package.json))
- **Python 3** for the `pnpm start` static server
- **Docker** (optional) for the same environment as CI — see [Makefile](Makefile)

## Layout


| Path           | Role                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------ |
| `data/pages/`  | Markdown pages (bind-mounted to `md_pages/` in Docker)                                     |
| `data/assets/` | Images, audio, korpora TSVs (served as `/assets/`* via `public/assets` → `../data/assets`) |
| `data/config/` | Site copy shared with editors; keep in sync with [config/config.ts](config/config.ts)      |
| `data/DNS/`    | Static service files copied into `out/` on build                                           |
| `data/.cache/` | Build cache (e.g. PDF intermediates under `vreji/`)                                        |
| `lib/paths.js` | Resolves `data/*` paths locally and overlay paths under `/app` in Docker                   |


## Environment

Put secrets and overrides in a **repo-root** `.env`. Next.js loads `.env` from the project directory (the repo root), so no extra symlink is required.

## Commands

Install and run from the **repository root**:

```bash
pnpm install
pnpm dev          # Next dev server
pnpm build        # Full production build (korpora, Next export, sitemap, book PDFs, static copies)
pnpm build:test   # Lighter build used in CI (no full korpora/print pipeline)
pnpm start        # Serve `out/` on port 3000 (Python)
pnpm typecheck
pnpm korpora:cnino   # Optional: fetch spreadsheet TSVs into archive/ (see scripts/korpora.ts)
```

CI builds inside the Playwright Docker image (see [Dockerfile](Dockerfile)); the workflow bind-mounts the repo at `/app` and overlays `data/config`, `data/pages`, `data/assets`, and `node_modules` — see [.github/workflows/main.yml](.github/workflows/main.yml).

## Docker dev shell

```bash
make build   # build image
make dev     # run container with repo mounted at /app, bash on exec
```

## Docs

Editor-facing notes: [docs/content-conventions.md](docs/content-conventions.md).