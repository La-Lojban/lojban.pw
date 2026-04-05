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

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  page: "flex flex-col h-screen print:h-auto",
  article: "flex-grow overflow-y-auto",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function LayoutChrome({
  children,
  meta,
  title,
  parentSlug,
  headerPath,
  toc,
  tocList,
  allPosts,
  currentLanguage,
  posts,
  post,
  articleRef,
  isVisible,
  scrollToTop,
  prevPage,
  nextPage,
  currentPageNumber,
}: {
  children: ReactNode;
  meta?: { [key: string]: string | undefined };
  title?: string;
  parentSlug?: string;
  headerPath: string;
  toc: TocElem[];
  tocList?: TocItem[];
  allPosts: Items[];
  currentLanguage: string;
  posts?: Items[];
  post?: TPost;
  articleRef: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  scrollToTop: () => void;
  prevPage?: string | null;
  nextPage?: string | null;
  currentPageNumber?: number;
}) {
  return (
    <>
      <Meta meta={meta} title={title} parentSlug={parentSlug} />
      <div className={tw.page}>
        <Header
          toc={toc}
          tocList={tocList}
          path={headerPath}
          allPosts={allPosts}
          currentLanguage={currentLanguage}
          posts={posts}
          post={post}
        />
        <article ref={articleRef} className={tw.article}>
          {children}
        </article>
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
}: Props) {
  const router = useRouter();

  const articleRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = useMemo(
    () =>
      debounce(() => {
        setIsVisible((articleRef.current?.scrollTop ?? 0) > 60);
      }, 100),
    []
  );

  const scrollToTop = useCallback(() => {
    articleRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const articleElement = articleRef.current;
    if (!articleElement) return;
    articleElement.addEventListener("scroll", checkScrollTop);
    return () => articleElement.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (articleRef.current && !url.includes("#")) {
        articleRef.current.scrollTop = 0;
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

  return (
    <LayoutChrome
      meta={meta}
      title={title}
      parentSlug={post?.parentSlug}
      headerPath={headerPath}
      toc={toc}
      tocList={tocList}
      allPosts={allPosts}
      currentLanguage={currentLanguage}
      posts={posts}
      post={post}
      articleRef={articleRef}
      isVisible={isVisible}
      scrollToTop={scrollToTop}
      prevPage={prevPage}
      nextPage={nextPage}
      currentPageNumber={currentPageNumber}
    >
      {children}
    </LayoutChrome>
  );
}

export default Layout;
