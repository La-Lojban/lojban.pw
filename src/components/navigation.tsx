/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { memo } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBackwardFast,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  root: "fixed bottom-14 right-4 md:right-auto z-50 md:left-1/2 md:transform md:-translate-x-1/2",
  row: "min-h-14 flex items-center",
  navCluster:
    "bg-white rounded-xl shadow-md p-3 flex items-center space-x-5 mr-6 md:mr-12",
  firstLink:
    "text-brown-400 hover:text-brown-600 transition-colors mr-5",
  pageLink:
    "text-deep-orange-400 hover:text-brown-600 transition-colors",
  pageLinkNext: "text-deep-orange-400 hover:text-brown-600",
  pageNumber:
    "text-gray-600 text-xl font-medium tabular-nums min-w-[1.25em] text-center select-none",
  iconMd: "w-8 h-8",
  scrollBtn:
    "bg-white rounded-xl shadow-md py-3 px-4 transition duration-150 ease-in-out hover:bg-deep-orange-600 group",
  scrollBtnIconWrap: "[&>svg]:w-6 [&>svg]:h-6",
  scrollBtnIcon:
    "text-deep-orange-400 group-hover:text-white transition-colors duration-150 ease-in-out",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function NavFirstSiblingLink({ slugPath }: { slugPath: string }) {
  return (
    <Link href={"/" + slugPath} className={tw.firstLink}>
      <FontAwesomeIcon className={tw.iconMd} icon={faBackwardFast} />
    </Link>
  );
}

function NavPrevLink({ href }: { href: string }) {
  return (
    <Link href={href} className={tw.pageLink}>
      <FontAwesomeIcon className={tw.iconMd} icon={faArrowLeft} />
    </Link>
  );
}

function NavNextLink({ href }: { href: string }) {
  return (
    <Link href={href} className={tw.pageLinkNext}>
      <FontAwesomeIcon className={tw.iconMd} icon={faArrowRight} />
    </Link>
  );
}

function PageNumber({ n }: { n: number }) {
  return <span className={tw.pageNumber}>{n}</span>;
}

function ScrollToTopButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className={tw.scrollBtn} type="button">
      <span className={tw.scrollBtnIconWrap}>
        <FontAwesomeIcon
          icon={faArrowUp}
          className={tw.scrollBtnIcon}
        />
      </span>
    </button>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
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

const NavigationWidget = memo<NavigationWidgetProps>(
  function NavigationWidget({
    firstSiblingSlug,
    prevPage,
    nextPage,
    currentPageNumber = null,
    currentSlug,
    isVisible,
    scrollToTop,
    currentLanguage,
  }) {
    if (!isVisible || !currentLanguage) return <></>;

    const hasNavigation =
      (firstSiblingSlug && firstSiblingSlug !== currentSlug?.join("/")) ||
      prevPage ||
      currentPageNumber !== null ||
      nextPage;

    return (
      <div className={tw.root}>
        <div className={tw.row}>
          {hasNavigation ? (
            <div className={tw.navCluster}>
              {firstSiblingSlug &&
              firstSiblingSlug !== currentSlug?.join("/") ? (
                <NavFirstSiblingLink slugPath={firstSiblingSlug} />
              ) : null}
              {prevPage ? <NavPrevLink href={prevPage} /> : null}
              {currentPageNumber !== null ? (
                <PageNumber n={currentPageNumber} />
              ) : null}
              {nextPage ? <NavNextLink href={nextPage} /> : null}
            </div>
          ) : null}
          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    );
  }
);

export default NavigationWidget;
