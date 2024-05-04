import React, { useState, useEffect, useRef } from "react";
import Footer from "./footer";
import Meta from "./meta";
import { debounce } from "../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import { TocElem } from "../types/toc";
import { Items } from "../lib/api";
import { useRouter } from "next/router";
import PostTitle from "./post-title";
import { TPost } from "../types/post";

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

  if (router.isFallback) return <PostTitle>Loading…</PostTitle>;

  return (
    <>
      <Meta meta={meta} title={title} />
      <div className="flex flex-col h-screen">
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
        {/* Back to top button */}
        <button
          type="button"
          className={[
            isVisible ? null : "hidden",
            "z-50 !fixed bottom-5 end-5 rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg",
          ]
            .filter(Boolean)
            .join(" ")}
          id="btn-back-to-top"
          onClick={scrollToTop}
        >
          <span className="[&>svg]:w-4">
            <FontAwesomeIcon className="" icon={faArrowUp} />
          </span>
        </button>
      </div>
    </>
  );
};

export default Layout;
