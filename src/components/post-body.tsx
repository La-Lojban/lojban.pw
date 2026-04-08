/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useMemo, type ReactNode } from "react";
import PostHeader from "../components/post-header";
import { buildDOMFromJSONBasic } from "../lib/json2react";
import { PostProps } from "../types/post";
import AllStories from "./all-stories";
import KorporaTableClient from "./korpora-table-client";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
function articleShellClass(hasToc: boolean) {
  return `mb-8 mt-3 mx-auto w-full print:bg-white ${
    hasToc ? "md:w-3/5 " : ""
  }bg-gray-100`;
}

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function ContentWrapperClasses({ isBookPath }: { isBookPath: boolean }) {
  return (
    <div
      className={["simple_blockquotes", "lojbo", isBookPath ? "cukta" : null]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function ArticleShell({
  hasToc,
  children,
}: {
  hasToc: boolean;
  children: ReactNode;
}) {
  return <div className={articleShellClass(hasToc)}>{children}</div>;
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
function PostBody({
  post,
  state,
  setState,
  hasToc,
  posts,
  lang,
  siteSection,
  suppressPdfLink,
}: PostProps<{ galleryShown: boolean; currentImgUrl: string | null }>) {
  const content = useMemo(
    () => buildDOMFromJSONBasic(post.content, { state, setState }),
    [post.content, state, setState]
  );
  const isBookPath = post.slug[1] === "books";

  return (
    <>
      <ArticleShell hasToc={!!hasToc}>
        <PostHeader
          post={post}
          siteSection={siteSection}
          suppressPdfLink={suppressPdfLink}
        />
        <ContentWrapperClasses isBookPath={isBookPath} />
        {content}
        {post["meta.type"] === "korpora" ? (
          <KorporaTableClient storageSlug={post.slug.slice(1).join("/")} />
        ) : null}
        {posts && posts.length > 0 ? (
          <AllStories posts={posts} lang={lang} />
        ) : null}
      </ArticleShell>
    </>
  );
}

export default PostBody;
