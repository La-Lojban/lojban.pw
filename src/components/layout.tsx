import React, { useState, useEffect, useRef } from "react";
import Footer from "./footer";
import Meta from "./meta";
import { debounce } from "../lib/utils";
import Header from "./header";
import { TocElem } from "../types/toc";
import { Items } from "../lib/api";
import { useRouter } from "next/router";
import PostTitle from "./post-title";
import { TPost } from "../types/post";
import NavigationWidget from "./navigation";

type Props = {
  children: React.ReactNode;
  meta?: { [key: string]: string | undefined };
  toc?: TocElem[];
  path?: string;
  allPosts?: Items[];
  currentLanguage?: string;
  title?: string;
  posts?: Items[];
  post?: TPost;
  siteSection?: string;
  prevPage?: any;
  nextPage?: any;
  currentPageNumber?: number;
};

const Layout = ({
  children,
  meta,
  toc = [],
  path = "",
  allPosts = [],
  currentLanguage = "en",
  title,
  posts,
  post,
  siteSection,
  prevPage,
  nextPage,
  currentPageNumber,
}: Props) => {
  const router = useRouter();

  const articleRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = debounce(() => {
    setIsVisible((articleRef.current?.scrollTop ?? 0) > 60);
  }, 100);

  // Function to handle the click event
  const scrollToTop = () => {
    articleRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(false);
  };

  useEffect(() => {
    const articleElement = articleRef.current;
    if (articleElement) {
      articleElement.addEventListener("scroll", checkScrollTop);

      return () => {
        articleElement.removeEventListener("scroll", checkScrollTop);
      };
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (articleRef.current) {
        articleRef.current.scrollTop = 0;
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (router.isFallback) return <PostTitle>Loading…</PostTitle>;

  return (
    <>
      <Meta meta={meta} title={title} parentSlug={post?.parentSlug} />
      <div className="flex flex-col h-screen print:h-auto">
        <Header
          toc={toc}
          path={router.asPath.replace(/#.*/, "")}
          allPosts={allPosts}
          currentLanguage={currentLanguage}
          posts={posts}
          post={post}
        />
        <article ref={articleRef} className="flex-grow overflow-y-auto">
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
};

export default Layout;
