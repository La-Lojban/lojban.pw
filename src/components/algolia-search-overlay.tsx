import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  InstantSearch,
  SearchBox,
  Configure,
  useInstantSearch,
  useSearchBox,
  useHits,
} from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  isAlgoliaConfigured,
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_KEY,
  ALGOLIA_INDEX_NAME,
} from "../lib/algolia";

/** Mirrors the search input while the debounced query catches up (see `queryHook`). */
const AlgoliaLiveQueryContext = createContext("");

const SEARCH_DEBOUNCE_MS = 200;

/** Hit shape expected from index (section-based: title = section, pageTitle = doc, url may have #anchor). */
export type AlgoliaHit = {
  objectID: string;
  title?: string;
  pageTitle?: string;
  url: string;
  hierarchy?: Record<string, string>;
  content?: string;
  _highlightResult?: Record<string, { value?: string }>;
};

function Hit({ hit, onSelect }: { hit: AlgoliaHit; onSelect: () => void }) {
  const sectionTitle =
    hit.title ?? hit.hierarchy?.lvl0 ?? hit.hierarchy?.lvl1 ?? "Section";
  const pageTitle = hit.pageTitle;
  const subtitle = hit.content
    ? hit.content.slice(0, 120) + (hit.content.length > 120 ? "…" : "")
    : undefined;

  return (
    <a
      href={hit.url}
      className="algolia-hit block px-4 py-3 text-left hover:bg-brown-100 focus:bg-brown-100 focus:outline-none border-b border-gray-200 last:border-b-0"
      onClick={(e) => {
        e.preventDefault();
        onSelect();
        window.location.href = hit.url;
      }}
    >
      <div className="font-medium text-gray-900">{sectionTitle}</div>
      {pageTitle && pageTitle !== sectionTitle && (
        <div className="text-xs text-gray-500 mt-0.5">{pageTitle}</div>
      )}
      {subtitle && (
        <div className="text-sm text-gray-600 mt-0.5 line-clamp-2">
          {subtitle}
        </div>
      )}
    </a>
  );
}

function dedupeHitsByUrl(hits: AlgoliaHit[]) {
  const seen = new Set<string>();
  return hits.filter((h) => {
    if (seen.has(h.url)) return false;
    seen.add(h.url);
    return true;
  });
}

function SearchResultsPanel({ onClose }: { onClose: () => void }) {
  const liveQuery = useContext(AlgoliaLiveQueryContext);
  const { query: indexQuery } = useSearchBox();
  const { results, status } = useInstantSearch();
  const { hits } = useHits<AlgoliaHit>();
  const live = liveQuery.trim();
  const indexed = indexQuery.trim();
  const hasQuery = live.length > 0;
  const debouncing = hasQuery && live !== indexed;
  const resultsMeta = results as { __isArtificial?: boolean; nbHits?: number } | undefined;
  const nbHits =
    resultsMeta && !resultsMeta.__isArtificial ? (resultsMeta.nbHits ?? 0) : 0;
  const byUrl = useMemo(() => dedupeHitsByUrl(hits), [hits]);
  const hasHitsToShow = byUrl.length > 0;
  const loading =
    hasQuery && (status === "loading" || status === "stalled");
  /**
   * Avoid swapping the whole panel for each in-flight request (causes flashing).
   * Keep showing the previous hit list while loading when possible; debounce reduces request churn.
   */
  const showBlockingLoading =
    hasQuery && !hasHitsToShow && (debouncing || loading);

  if (!hasQuery) {
    return (
      <div className="px-4 py-6 text-center text-gray-500 text-sm min-h-[4.5rem] flex items-center justify-center">
        Type to search the site.
      </div>
    );
  }
  if (showBlockingLoading) {
    return (
      <div className="px-4 py-6 text-center text-gray-500 text-sm min-h-[4.5rem] flex items-center justify-center">
        Searching…
      </div>
    );
  }
  if (!debouncing && !loading && nbHits === 0 && !hasHitsToShow) {
    return (
      <div className="px-4 py-6 text-center text-gray-500 text-sm min-h-[4.5rem] flex items-center justify-center">
        No results for &quot;{indexQuery}&quot;.
      </div>
    );
  }
  return (
    <ul className="divide-y divide-gray-100 min-h-[4.5rem]" aria-busy={loading || undefined}>
      {byUrl.map((hit) => (
        <li key={hit.objectID}>
          <Hit hit={hit} onSelect={onClose} />
        </li>
      ))}
    </ul>
  );
}

function InstantSearchInner({ onClose }: { onClose: () => void }) {
  const [liveQuery, setLiveQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    []
  );

  const queryHook = useCallback((q: string, search: (sq: string) => void) => {
    setLiveQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim() === "") {
      search(q);
      return;
    }
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
      search(q);
    }, SEARCH_DEBOUNCE_MS);
  }, []);

  return (
    <AlgoliaLiveQueryContext.Provider value={liveQuery}>
      <Configure hitsPerPage={200} />
      <div className="max-w-2xl mx-auto pt-4 pb-2 px-4">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
          <SearchBox
            placeholder="Search…"
            autoFocus
            queryHook={queryHook}
            classNames={{
              root: "w-full",
              form: "w-full",
              input:
                "w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brown-400 focus:border-brown-400 outline-none",
              submit: "hidden",
              reset: "hidden",
            }}
            submitIconComponent={() => null}
            resetIconComponent={() => null}
          />
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 pb-4 max-h-[60vh] overflow-y-auto bg-white rounded-b-lg shadow-lg border border-t-0 border-gray-200">
        <SearchResultsPanel onClose={onClose} />
      </div>
    </AlgoliaLiveQueryContext.Provider>
  );
}

function SearchOverlayContent({ onClose }: { onClose: () => void }) {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  const searchClient = useMemo(
    () => algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY),
    []
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={ALGOLIA_INDEX_NAME}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <InstantSearchInner onClose={handleClose} />
    </InstantSearch>
  );
}

export default function AlgoliaSearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !isAlgoliaConfigured) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-gray-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="flex justify-end p-2">
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close search"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div ref={overlayRef} className="flex-1 flex flex-col min-h-0">
        <SearchOverlayContent onClose={onClose} />
      </div>
    </div>
  );
}
