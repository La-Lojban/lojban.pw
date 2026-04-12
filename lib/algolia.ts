/**
 * Algolia search client for the site search overlay.
 * Only used in the browser; env vars must be set for search to appear.
 */
export const ALGOLIA_APP_ID =
  typeof process !== "undefined"
    ? (process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "")
    : "";
export const ALGOLIA_SEARCH_KEY =
  typeof process !== "undefined"
    ? (process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? "")
    : "";
export const ALGOLIA_INDEX_NAME =
  typeof process !== "undefined"
    ? (process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? "")
    : "";

export const isAlgoliaConfigured = Boolean(
  ALGOLIA_APP_ID && ALGOLIA_SEARCH_KEY && ALGOLIA_INDEX_NAME
);
