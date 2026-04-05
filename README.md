https://lojban.pw website source code
## Deployment

* edit contents of `data/` folder
* commit&push changes
* CI/CD will deploy changes and publish them in gh-pages branch
* if you fork the repo enable deploying to gh-pages via CI/CD actions

## Local development
* populate `.env` file with:
```
GOOGLE_READONLY_API_KEY=your google api key to read google spreadsheet documents shared to the internet 
GOOGLE_LOJBAN_CORPUS_DOC_ID=1_vkiwqOIOIJPqZTiomzd4ApUSEQXhEY6CeyZD_6c-PA is an example of Lojban corpus Google spreadsheet
```
See [.env.example](.env.example) for optional Algolia variables.

### With Docker
* `make build` - you can use it only once
* `make dev` - run the docker container
	* run `pnpm install` in the docker console
	* `pnpm dev` - run the website in dev mode locally, access it at http://localhost:3298/
	* `pnpm build && pnpm start` - compile to a static folder and run it locally at http://localhost:3298/

### Without Docker
All [src/package.json](src/package.json) scripts are meant to be run from the `src/` directory.

* **Prerequisites:** Node.js 24 or newer (see `engines` in `src/package.json`), [pnpm](https://pnpm.io/) 9.x (matches `packageManager` there), and Python 3 (used by the `start` script to serve the static `out/` folder).
* **Content paths:** Outside Docker, [src/lib/paths.js](src/lib/paths.js) reads site content from the repo’s `data/` tree (`data/pages`, `data/assets`, `data/DNS`, `data/.cache`, `tmp/`). Keep `src/config/` in line with `data/config/` the same way Docker bind-mounts `data/config` onto `src/config/`.
* **Environment:** Docker loads the repo-root `.env` via `--env-file`. Next.js loads `.env` from the app directory, so copy or symlink the root `.env` to `src/.env` (for example from the repo root: `ln -sf ../.env src/.env`) so local runs see the same variables.
* **Commands** (from `src/` after `cd src`):
	* `pnpm install` — install dependencies
	* `pnpm dev` — Next.js dev server (default URL http://localhost:3000/)
	* `pnpm build && pnpm start` — full static build then `python3 -m http.server` on port 3000 (http://localhost:3000/)
	* `pnpm build:test` — build variant used in CI (see script in `src/package.json`)
