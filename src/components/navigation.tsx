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
  if (!isVisible || !currentLanguage) return <></>;

  const hasNavigation =
    prevPage || nextPage || parentSlug || currentPageNumber !== null;

  return (
    <div className="fixed bottom-9 right-4 md:right-auto z-50 md:left-1/2 md:transform md:-translate-x-1/2">
    {/* <div className="fixed bottom-9 left-1/2 transform -translate-x-1/2 z-50"> */}

      <div className="h-12 flex">
        {hasNavigation && (
          <div className="bg-white rounded-lg shadow-md p-2 flex items-center space-x-4 mr-6 md:mr-12">
            {parentSlug && parentSlug !== currentSlug?.join("/") && (
              <Link
                href={"/" + parentSlug}
                className="text-brown-400 hover:text-brown-600 transition-colors mr-4"
              >
                <FontAwesomeIcon className="w-6" icon={faBackwardFast} />
              </Link>
            )}
            {prevPage && (
              <Link
                href={prevPage}
                className="text-deep-orange-400 hover:text-brown-600 transition-colors"
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
                className="text-deep-orange-400 hover:text-brown-600"
              >
                <FontAwesomeIcon className="w-6" icon={faArrowRight} />
              </Link>
            )}
          </div>
        )}
        <button
          onClick={scrollToTop}
          className="bg-white rounded-lg shadow-md py-2 px-3 transition duration-150 ease-in-out hover:bg-deep-orange-600 group"
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
