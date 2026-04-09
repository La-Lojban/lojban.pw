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
  return `mb-8 mt-3 mx-auto w-full ${
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

function BookPdfCover({ post }: { post: PostProps<unknown>["post"] }) {
  const description =
    post["meta.description"] || post.excerpt || "Lojban book edition";
  return (
    <section className="book-print-cover" aria-hidden>
      <div className="book-print-cover__backdrop" />
      <div className="book-print-cover__inner">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={`${post.title} cover`}
            className="book-print-cover__image"
          />
        ) : null}
        <h1 className="book-print-cover__title">{post.title}</h1>
        <p className="book-print-cover__description">{description}</p>
      </div>
    </section>
  );
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
  const isBookMainPage = isBookPath && post.slug.length === 3;
  const isKorporaTextPage =
    post.slug[1] === "texts" && post.slug.length === 3;
  const showBookStyleCover =
    isBookMainPage || (isKorporaTextPage && Boolean(post.coverImage));

  return (
    <>
      <ArticleShell hasToc={!!hasToc}>
        {showBookStyleCover ? <BookPdfCover post={post} /> : null}
        <div className={isBookPath ? "book-print-content" : undefined}>
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
        </div>
      </ArticleShell>
    </>
  );
}

export default PostBody;
