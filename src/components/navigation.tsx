import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBackwardFast,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

type NavigationWidgetProps = {
  firstSiblingSlug?: string;
  prevPage?: string | null;
  nextPage?: string | null;
  currentPageNumber?: number;
  currentLanguage?: string;
  currentSlug?: string[];
  isVisible: boolean;
  scrollToTop: () => void;
};

const NavigationWidget: React.FC<NavigationWidgetProps> = ({
  firstSiblingSlug,
  prevPage,
  nextPage,
  currentPageNumber = null,
  currentSlug,
  isVisible,
  scrollToTop,
  currentLanguage,
}) => {
  if (!isVisible || !currentLanguage) return <></>;

  const hasNavigation =
    (firstSiblingSlug && firstSiblingSlug !== currentSlug?.join("/")) ||
    prevPage ||
    currentPageNumber !== null ||
    nextPage;

  return (
    <div className="fixed bottom-9 right-4 md:right-auto z-50 md:left-1/2 md:transform md:-translate-x-1/2">
      <div className="h-12 flex">
        {hasNavigation && (
          <div className="bg-white rounded-lg shadow-md p-2 flex items-center space-x-4 mr-6 md:mr-12">
            {firstSiblingSlug &&
              firstSiblingSlug !== currentSlug?.join("/") && (
                <Link
                  href={"/" + firstSiblingSlug}
                  className="text-brown-400 hover:text-brown-600 transition-colors mr-4 focus:outline-none focus:ring-2 focus:ring-deep-orange-400 focus:ring-offset-2 rounded"
                  aria-label="Go to first page"
                >
                  <FontAwesomeIcon className="w-6" icon={faBackwardFast} />
                </Link>
              )}
            {prevPage && (
              <Link
                href={prevPage}
                className="text-deep-orange-400 hover:text-brown-600 transition-colors focus:outline-none focus:ring-2 focus:ring-deep-orange-400 focus:ring-offset-2 rounded"
                aria-label="Go to previous page"
              >
                <FontAwesomeIcon className="w-6" icon={faArrowLeft} />
              </Link>
            )}
            {currentPageNumber !== null && (
              <span className="text-gray-600" aria-label={`Current page ${currentPageNumber}`}>
                {currentPageNumber}
              </span>
            )}
            {nextPage && (
              <Link
                href={nextPage}
                className="text-deep-orange-400 hover:text-brown-600 focus:outline-none focus:ring-2 focus:ring-deep-orange-400 focus:ring-offset-2 rounded"
                aria-label="Go to next page"
              >
                <FontAwesomeIcon className="w-6" icon={faArrowRight} />
              </Link>
            )}
          </div>
        )}
        <button
          onClick={scrollToTop}
          className="bg-white rounded-lg shadow-md py-2 px-3 min-w-[44px] min-h-[44px] transition duration-150 ease-in-out hover:bg-deep-orange-600 focus:outline-none focus:ring-2 focus:ring-deep-orange-400 focus:ring-offset-2 group"
          aria-label="Scroll to top"
        >
          <span className="[&>svg]:w-4">
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-deep-orange-400 group-hover:text-white transition-colors duration-150 ease-in-out"
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavigationWidget;
