import React, { useCallback, useEffect, useRef } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  isAlgoliaConfigured,
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_KEY,
  ALGOLIA_INDEX_NAME,
} from "../lib/algolia";

/** Hit shape expected from index (DocSearch-style or custom). */
export type AlgoliaHit = {
  objectID: string;
  title?: string;
  url: string;
  hierarchy?: Record<string, string>;
  content?: string;
  _highlightResult?: Record<string, { value?: string }>;
};

function Hit({ hit, onSelect }: { hit: AlgoliaHit; onSelect: () => void }) {
  const title =
    hit.title ??
    hit.hierarchy?.lvl0 ??
    hit.hierarchy?.lvl1 ??
    "Untitled";
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
      <div className="font-medium text-gray-900">{title}</div>
      {subtitle && (
        <div className="text-sm text-gray-600 mt-0.5 line-clamp-2">
          {subtitle}
        </div>
      )}
    </a>
  );
}

function SearchResultsPanel({ onClose }: { onClose: () => void }) {
  const { query } = useSearchBox();
  const { results, status } = useInstantSearch();
  const hasQuery = query.trim().length > 0;
  const resultsMeta = results as { __isArtificial?: boolean; nbHits?: number } | undefined;
  const hasResults =
    Boolean(resultsMeta && !resultsMeta.__isArtificial && (resultsMeta.nbHits ?? 0) > 0);
  const loading = status === "loading" && hasQuery;

  if (!hasQuery) {
    return (
      <div className="px-4 py-6 text-center text-gray-500 text-sm">
        Type to search the site.
      </div>
    );
  }
  if (loading) {
    return (
      <div className="px-4 py-6 text-center text-gray-500 text-sm">
        Searching…
      </div>
    );
  }
  if (!hasResults) {
    return (
      <div className="px-4 py-6 text-center text-gray-500 text-sm">
        No results for &quot;{query}&quot;.
      </div>
    );
  }
  return (
    <Hits<AlgoliaHit>
      hitComponent={({ hit }: { hit: AlgoliaHit }) => (
        <Hit hit={hit} onSelect={onClose} />
      )}
      classNames={{
        list: "divide-y divide-gray-100",
      }}
    />
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

  const searchClient = React.useMemo(
    () => algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY),
    []
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={ALGOLIA_INDEX_NAME}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <div className="max-w-2xl mx-auto pt-4 pb-2 px-4">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none" />
          <SearchBox
            placeholder="Search…"
            autoFocus
            classNames={{
              root: "w-full",
              form: "w-full",
              input:
                "w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brown-400 focus:border-brown-400 outline-none",
              submit: "hidden",
              reset:
                "absolute right-2 p-1 rounded text-gray-400 hover:text-gray-600 focus:outline-none",
            }}
            submitIconComponent={() => null}
            resetIconComponent={() => (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            )}
          />
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 pb-4 max-h-[60vh] overflow-y-auto bg-white rounded-b-lg shadow-lg border border-t-0 border-gray-200">
        <SearchResultsPanel onClose={handleClose} />
      </div>
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
