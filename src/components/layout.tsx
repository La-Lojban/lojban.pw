/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/router";
import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";
import NavigationWidget from "./navigation";
import PostTitle from "./post-title";
import { debounce } from "../lib/utils";
import { getClosestHeaderId } from "../lib/toc";
import { Items } from "../lib/api";
import { TPost } from "../types/post";
import { TocElem, TocItem } from "../types/toc";
import { normalizeCanonicalPath } from "../lib/seo";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  page: "flex flex-col h-screen print:h-auto",
  header: "print:hidden flex-shrink-0",
  skipLink:
    "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow focus:outline-none focus:ring-2 focus:ring-deep-orange-400",
  article: "flex-grow overflow-y-auto",
  /** Offscreen long prose skips layout work until scrolled (print overrides in CSS). */
  articleShell: "min-h-0 article-content-visibility",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function LayoutChrome({
  children,
  meta,
  title,
  canonicalPath,
  headerPath,
  toc,
  tocList,
  allPosts,
  currentLanguage,
  posts,
  post,
  mainRef,
  isVisible,
  scrollToTop,
  prevPage,
  nextPage,
  currentPageNumber,
  alternates,
  hreflangXDefault,
  jsonLd,
  useArticleShell,
  loadKatex,
}: {
  children: ReactNode;
  meta?: { [key: string]: string | undefined };
  title?: string;
  canonicalPath: string;
  headerPath: string;
  toc: TocElem[];
  tocList?: TocItem[];
  allPosts: Items[];
  currentLanguage: string;
  posts?: Items[];
  post?: TPost;
  mainRef: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  scrollToTop: () => void;
  prevPage?: string | null;
  nextPage?: string | null;
  currentPageNumber?: number;
  alternates?: { hreflang: string; href: string }[];
  hreflangXDefault?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
  useArticleShell: boolean;
  loadKatex?: boolean;
}) {
  return (
    <>
      <Meta
        meta={meta}
        title={title}
        canonicalPath={canonicalPath}
        currentLanguage={currentLanguage}
        alternates={alternates}
        hreflangXDefault={hreflangXDefault}
        jsonLd={jsonLd}
        loadKatex={loadKatex}
      />
      <div className={tw.page}>
        <a href="#main-content" className={tw.skipLink}>
          Skip to main content
        </a>
        <header className={tw.header}>
          <Header
            toc={toc}
            tocList={tocList}
            path={headerPath}
            allPosts={allPosts}
            currentLanguage={currentLanguage}
            posts={posts}
            post={post}
          />
        </header>
        <main ref={mainRef} id="main-content" className={tw.article}>
          {useArticleShell ? (
            <article className={tw.articleShell}>{children}</article>
          ) : (
            children
          )}
        </main>
        <Footer />

        <NavigationWidget
          firstSiblingSlug={post?.firstSiblingSlug}
          isVisible={isVisible}
          scrollToTop={scrollToTop}
          prevPage={prevPage}
          nextPage={nextPage}
          currentPageNumber={currentPageNumber}
          currentLanguage={currentLanguage}
        />
      </div>
    </>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  children: ReactNode;
  meta?: { [key: string]: string | undefined };
  toc?: TocElem[];
  tocList?: TocItem[];
  path?: string;
  allPosts?: Items[];
  currentLanguage?: string;
  title?: string;
  posts?: Items[];
  post?: TPost;
  siteSection?: string;
  prevPage?: string | null;
  nextPage?: string | null;
  currentPageNumber?: number;
  alternates?: { hreflang: string; href: string }[];
  hreflangXDefault?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
  /** When true (default), wrap main content in an &lt;article&gt; for single-page posts. */
  useArticleShell?: boolean;
  /** Load KaTeX stylesheet when the page HTML contains rendered math. */
  loadKatex?: boolean;
};

function Layout({
  children,
  meta,
  toc = [],
  tocList,
  path: _path = "",
  allPosts = [],
  currentLanguage = "en",
  title,
  posts,
  post,
  siteSection: _siteSection,
  prevPage,
  nextPage,
  currentPageNumber,
  alternates,
  hreflangXDefault,
  jsonLd,
  useArticleShell = true,
  loadKatex,
}: Props) {
  const router = useRouter();

  const mainRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = useMemo(
    () =>
      debounce(() => {
        setIsVisible((mainRef.current?.scrollTop ?? 0) > 60);
      }, 100),
    []
  );

  const scrollToTop = useCallback(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;
    mainEl.addEventListener("scroll", checkScrollTop);
    return () => mainEl.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (mainRef.current && !url.includes("#")) {
        mainRef.current.scrollTop = 0;
      }
      setTimeout(getClosestHeaderId, 150);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (router.isFallback) return <PostTitle>Loading…</PostTitle>;

  const headerPath = router.asPath.replace(/#.*/, "");
  const canonicalPath = normalizeCanonicalPath(headerPath);

  return (
    <LayoutChrome
      meta={meta}
      title={title}
      canonicalPath={canonicalPath}
      headerPath={headerPath}
      toc={toc}
      tocList={tocList}
      allPosts={allPosts}
      currentLanguage={currentLanguage}
      posts={posts}
      post={post}
      mainRef={mainRef}
      isVisible={isVisible}
      scrollToTop={scrollToTop}
      prevPage={prevPage}
      nextPage={nextPage}
      currentPageNumber={currentPageNumber}
      alternates={alternates}
      hreflangXDefault={hreflangXDefault}
      jsonLd={jsonLd}
      useArticleShell={useArticleShell}
      loadKatex={loadKatex}
    >
      {children}
    </LayoutChrome>
  );
}

export default Layout;
