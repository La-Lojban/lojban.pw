import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { isAlgoliaConfigured } from "../lib/algolia";

export function AlgoliaSearchTrigger({
  onOpen,
  getColor,
}: {
  onOpen: () => void;
  getColor: (className: string) => string;
}) {
  if (!isAlgoliaConfigured) return null;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`ml-2 p-2 rounded-md ${getColor("bg-deep-orange-300")} ${getColor("hover:bg-deep-orange-200")} text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white transition-all duration-150 hover:shadow-md`}
      aria-label="Search"
    >
      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
