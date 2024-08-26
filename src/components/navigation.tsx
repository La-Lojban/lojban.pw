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
  parentSlug?: string;
  prevPage?: string | null;
  nextPage?: string | null;
  currentPageNumber?: number;
  currentLanguage?: string;
  currentSlug?: string[];
  isVisible: boolean;
  scrollToTop: () => void;
};

const NavigationWidget: React.FC<NavigationWidgetProps> = ({
  parentSlug,
  prevPage,
  nextPage,
  currentPageNumber,
  currentSlug,
  isVisible,
  scrollToTop,
  currentLanguage,
}) => {
  if (!isVisible||!currentLanguage) return <></>;

  const hasNavigation =
    prevPage ||
    nextPage ||
    parentSlug ||
    currentPageNumber !== null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="h-12 flex">
        {hasNavigation && (
          <div className="bg-white rounded-lg shadow-md p-2 flex items-center space-x-4 mr-16">
            {parentSlug && parentSlug !== currentSlug?.join("/") && (
              <Link
                href={"/" + parentSlug}
                className="text-brown-300 hover:text-brown-500 transition-colors mr-4"
              >
                <FontAwesomeIcon className="w-6" icon={faBackwardFast} />
              </Link>
            )}
            {prevPage && (
              <Link
                href={prevPage}
                className="text-deep-orange-300 hover:text-brown-500 transition-colors"
              >
                <FontAwesomeIcon className="w-6" icon={faArrowLeft} />
              </Link>
            )}
            {currentPageNumber && (
              <span className="text-gray-600">{currentPageNumber}</span>
            )}
            {nextPage && (
              <Link
                href={nextPage}
                className="text-deep-orange-300 hover:text-deep-brown-500 transition-colors"
              >
                <FontAwesomeIcon className="w-6" icon={faArrowRight} />
              </Link>
            )}
          </div>
        )}
        <button
          onClick={scrollToTop}
          className="rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition-colors"
        >
          <span className="[&>svg]:w-4">
            <FontAwesomeIcon icon={faArrowUp} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavigationWidget;
