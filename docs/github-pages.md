# Deploying to GitHub Pages

The site is a static Next.js export and deploys to GitHub Pages via GitHub Actions.

## 1. Enable GitHub Pages from Actions

1. Open your repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Save. No need to pick a branch; the workflow will deploy when it runs.

## 2. Deploy

- **Automatic:** Push to the `main` branch. The workflow builds and deploys.
- **Scheduled:** The workflow also runs every 3 days (cron).
- **Manual:** **Actions** → **CI/CD with Docker** → **Run workflow** → **Run workflow**.

After a successful run, the **deploy** job publishes the artifact. The site URL is shown in the job summary and is usually:

`https://<username>.github.io/<repo>/`  
or, for a custom domain, whatever you set in **Settings → Pages**.

## 3. What the workflow does

1. **Build:** Checks out the repo, builds the app in Docker (runs `pnpm cicd`: full build, PDFs, copies static output to a single directory).
2. **Algolia index:** Runs `node scripts/algolia-index.js` to push all markdown pages to the Algolia index `lojban-pw`. Requires the secret `ALGOLIA_ADMIN_KEY` (and the same App ID used for search); if not set, indexing is skipped and the build continues.
3. **Upload:** Uploads that directory as the GitHub Pages artifact.
4. **Deploy:** The `deploy-pages` action publishes it.

The workflow already has `contents: read`, `pages: write`, and `id-token: write`.

## 4. Optional: Search on the deployed site

To enable Algolia search on the **deployed** site, the build must see the Algolia env vars (they are baked into the static export). Add them as **repository secrets** and the workflow will pass them into the build:

1. **Settings** → **Secrets and variables** → **Actions** → **New repository secret** for each:
   - `NEXT_PUBLIC_ALGOLIA_APP_ID` — your Algolia Application ID  
   - `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` — your Algolia **search-only** API key  
   - `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` — index name (`lojban-pw` for this project)  
   - `ALGOLIA_ADMIN_KEY` — your Algolia **admin** API key (so CI can run the index script and push records to `lojban-pw`)

2. Re-run the workflow (or push a commit). The Docker build step passes these into the container so the exported site has search enabled.

If these secrets are not set, the deployed site still works; the search icon is simply hidden.

## Summary

| Step | Action |
|------|--------|
| 1 | Settings → Pages → Source = **GitHub Actions** |
| 2 | Push to `main` (or run the workflow manually) |
| 3 | (Optional) Add Algolia secrets for search on the live site |
