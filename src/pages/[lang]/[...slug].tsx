/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../../components/post-body";
import Layout from "../../components/layout";
import { PageTocSidebar } from "../../components/page-toc-sidebar";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import { PdfDocumentIcon } from "../../components/pdf-document-icon";
import { getPostBySlug, getAllPosts, Items } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import { TPost } from "../../types/post";
import { TocItem } from "../../types/toc";
import { site_description, site_title, site_url } from "../../config/config";
import type { GalleryItem } from "../../components/texts-image-gallery";
import { retainStringValues } from "../../lib/utils";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbItemsFromSlug,
  breadcrumbJsonLd,
  defaultHreflangXDefault,
  organizationJsonLd,
  webSiteJsonLd,
} from "../../lib/seo";

const TextsImageGallery = dynamic(
  () =>
    import("../../components/texts-image-gallery").then(
      (m) => m.TextsImageGallery
    ),
  { ssr: false }
);

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  shell: "mx-auto pb-6 max-w-7xl px-4 sm:px-6 flex flex-row flex-wrap",
  bookNavRow: "w-full flex justify-center mt-2",
  /** Same card as NavigationWidget `navCluster` (no side margin — not beside scroll button). */
  bookNavCluster:
    "bg-white rounded-lg shadow-md p-2.5 flex items-center space-x-4 text-lg",
  /** PDF link inside the cluster: flush hit target, separator only to the right. */
  pdfInBar:
    "inline-flex items-center justify-center shrink-0 p-0 m-0 leading-none rounded-sm text-deep-orange-400 hover:text-brown-600 hover:opacity-90 transition-all border-r border-gray-200 pr-3 print:hidden",
  iconLinkBrown: "text-brown-400 hover:text-brown-600 transition-colors mr-4",
  iconLinkOrange: "text-deep-orange-400 hover:text-brown-600 transition-colors",
  pageNum:
    "text-gray-600 font-medium tabular-nums min-w-[1.25em] text-center select-none",
  spacer: "w-14 shrink-0",
  /** Match NavigationWidget: bolder solid Heroicons via stroke + paint-order. */
  bookIcon: "w-7 h-7 stroke-current [stroke-width:1] [paint-order:stroke_fill]",
  pdfIconInBar: "block h-10 w-10 shrink-0",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function BookChapterPaginationNav({
  resolvedPost,
  prevPage,
  nextPage,
  currentPageNumber,
  pdfHref,
}: {
  resolvedPost: TPost;
  prevPage: string | null;
  nextPage: string | null;
  currentPageNumber?: number;
  pdfHref?: string;
}) {
  if (nextPage === null && prevPage === null) return null;

  return (
    <div className={tw.bookNavRow}>
      <div className={tw.bookNavCluster}>
        {pdfHref ? (
          <a href={pdfHref} className={tw.pdfInBar} title="Download PDF">
            <PdfDocumentIcon className={tw.pdfIconInBar} />
          </a>
        ) : null}
        {resolvedPost.firstSiblingSlug !== undefined &&
        resolvedPost.firstSiblingSlug !== resolvedPost.slug.join("/") ? (
          <Link
            href={"/" + resolvedPost.firstSiblingSlug}
            className={tw.iconLinkBrown}
          >
            <ChevronDoubleLeftIcon className={tw.bookIcon} aria-hidden />
          </Link>
        ) : null}
        {prevPage !== null ? (
          <Link href={prevPage} className={tw.iconLinkOrange}>
            <ArrowLeftIcon className={tw.bookIcon} aria-hidden />
          </Link>
        ) : (
          <div className={tw.spacer} aria-hidden />
        )}
        <span className={tw.pageNum}>{currentPageNumber}</span>
        {nextPage !== null ? (
          <Link href={nextPage} className={tw.iconLinkOrange}>
            <ArrowRightIcon className={tw.bookIcon} aria-hidden />
          </Link>
        ) : (
          <div className={tw.spacer} aria-hidden />
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  post: TPost;
  parentPost?: TPost;
  posts: Items[];
  siblingPosts: Items[];
  currentLanguage: string;
  prevPage: string | null;
  nextPage: string | null;
  currentPageNumber?: number;
  totalPages?: number;
  mergedTocList?: TocItem[] | null;
  hasMath?: boolean;
};

const siteSection = "books";

function SlugPage({
  post,
  parentPost,
  posts,
  siblingPosts,
  currentLanguage,
  prevPage,
  nextPage,
  currentPageNumber,
  mergedTocList,
  hasMath,
}: Props) {
  const resolvedPost = post ?? parentPost;
  const router = useRouter();
  if (!router.isFallback && !resolvedPost?.slug) return <ErrorPage statusCode={404} />;

  const pathBase = router.asPath.replace(/#.*/, "");
  const toc_list: TocItem[] = useMemo(
    () =>
      mergedTocList ??
      (resolvedPost?.toc ?? []).map((i: { depth: unknown; value: string; id: string }) => ({
        depth: parseInt(String(i.depth), 10),
        name: i.value,
        url: `${pathBase}#${i.id}`,
      })),
    [mergedTocList, resolvedPost?.toc, pathBase]
  );
  const hasToc = toc_list.length > 5;

  const [state, setState] = useState<{
    galleryShown: boolean;
    currentImgUrl: string | null;
  }>({ galleryShown: false, currentImgUrl: null });

  const images: GalleryItem[] = useMemo(
    () =>
      (resolvedPost?.imgs ?? []).map((img: { url: string; caption?: string; definition?: string }) => ({
        original: img.url,
        thumbnail: img.url,
        originalTitle: img.caption,
        description: `${img.caption ?? ""} | ${img.definition ?? ""}`,
      })),
    [resolvedPost?.imgs]
  );
  const currentImgIndex = useMemo(
    () => images.findIndex((el) => el.original === state.currentImgUrl),
    [images, state.currentImgUrl]
  );

  const title_core = resolvedPost["meta.title"] ?? resolvedPost.title;
  const title = useMemo(() => {
    const firstHeaderPreview = resolvedPost.firstHeader
      ? resolvedPost.firstHeader.slice(0, 50) +
        (resolvedPost.firstHeader.length > 50 ? "..." : "")
      : "";
    return firstHeaderPreview
      ? `${firstHeaderPreview} | ${title_core}`
      : `${title_core} | ${site_title}`;
  }, [resolvedPost.firstHeader, title_core]);

  const langPosts = posts as unknown as { fullPath: string; language: string }[];

  const alternates = useMemo(() => {
    return langPosts.map((p) => ({
      hreflang: p.language,
      href: absoluteUrl(site_url, `/${p.fullPath}/`)!,
    }));
  }, [langPosts]);

  const hreflangXDefault = useMemo(
    () => defaultHreflangXDefault(langPosts),
    [langPosts]
  );

  const jsonLd = useMemo(() => {
    const canonical = absoluteUrl(
      site_url,
      `/${resolvedPost.slug.join("/")}/`
    )!;
    const headline = title_core;
    const crumbs = breadcrumbItemsFromSlug(resolvedPost.slug, site_url, headline);
    const bc = breadcrumbJsonLd(crumbs);
    return [
      webSiteJsonLd({
        name: site_title,
        url: site_url,
        description: site_description,
      }),
      organizationJsonLd({ name: site_title, url: site_url }),
      articleJsonLd({
        headline,
        url: canonical,
        datePublished: resolvedPost.date,
        authorName: resolvedPost.author?.name,
      }),
      ...(bc ? [bc] : []),
    ];
  }, [resolvedPost, title_core]);

  return (
    <Layout
      meta={{
        ...retainStringValues(resolvedPost, ["content", "fullPath"]),
        title,
        "og:url": "/" + resolvedPost.slug.join("/"),
        "og:type": "article",
      }}
      toc={resolvedPost?.toc}
      tocList={mergedTocList ?? undefined}
      path={pathBase}
      allPosts={siblingPosts}
      currentLanguage={currentLanguage}
      posts={posts}
      post={resolvedPost}
      siteSection={siteSection}
      title={title}
      prevPage={prevPage}
      nextPage={nextPage}
      currentPageNumber={currentPageNumber}
      alternates={alternates}
      hreflangXDefault={hreflangXDefault}
      jsonLd={jsonLd}
      loadKatex={hasMath}
    >
      <div className={tw.shell}>
        <BookChapterPaginationNav
          resolvedPost={resolvedPost}
          prevPage={prevPage}
          nextPage={nextPage}
          currentPageNumber={currentPageNumber}
          pdfHref={
            resolvedPost.slug[1] === siteSection
              ? `/vreji/uencu/${resolvedPost.slug[0]}/${resolvedPost.slug[2]}.pdf`
              : undefined
          }
        />

        {state.galleryShown && resolvedPost.slug[1] === siteSection ? (
          <TextsImageGallery
            items={images}
            startIndex={currentImgIndex}
            onSlide={(currentIndex) => {
              document
                ?.querySelector(`[data-url="${images[currentIndex].original}"]`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            onClick={() => setState((p) => ({ ...p, galleryShown: false }))}
          />
        ) : null}

        <PostBody
          post={{ ...resolvedPost, title: title_core }}
          state={state}
          setState={setState}
          hasToc={hasToc}
          siteSection={siteSection}
          suppressPdfLink={
            resolvedPost.slug[1] === siteSection &&
            (prevPage !== null || nextPage !== null)
          }
        />
        {hasToc ? <PageTocSidebar items={toc_list} /> : null}
      </div>
    </Layout>
  );
}

export default SlugPage;

export type Params = {
  params: {
    slug: string[];
    lang: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug([params.lang].concat(params.slug), [
    "title",
    "hidden",
    "firstHeader",
    "meta.title",
    "description",
    "meta.keywords",
    "meta.author",
    "meta.type",
    "og:image",
    "date",
    "slug",
    "author",
    "content",
    "coverImage",
    "fullPath",
    "relatedSlugs",
    "parentSlug"
  ]);

  const fullSlug = params.lang + "/" + params.slug.join("/");
  const shortSlug = params.slug.join("/");
  const currentLanguage = params.lang;

  const fields = ["slug", "hidden", "title", "directory", "coverImage", "icon"];
  let allPosts = await getAllPosts({
    fields,
    showHidden: true,
    folder: "",
    ignoreTitles: true,
  });
  // const slugForPosts = slug.slice(-1)[0]
  const posts = allPosts.reduce(
    (acc, { slug }) => {
      const fullPath = slug.join("/");
      const shortPath = slug.slice(1).join("/");
      const language = slug[0];
      if (fullSlug === shortPath) {
        acc.push({ fullPath, language });
      } else if (shortSlug === fullPath) {
        acc.push({ fullPath, language: "en" });
      } else if (shortSlug === shortPath && currentLanguage !== language) {
        acc.push({ fullPath, language });
      }
      return acc;
    },
    [{ fullPath: fullSlug, language: params.lang }] as {
      fullPath: string;
      language: string;
    }[]
  );

  allPosts = allPosts.filter(
    (post) => !fields.includes("title") || typeof post.title !== "undefined"
  );
  const { text, toc, imgs, hasMath } = await markdownToHtml({
    content: (post.content as string) || "",
    fullPath: post.fullPath as string,
  });

  const siblingPosts = allPosts.filter((i) => i.slug[0] === params.lang);

  // Build merged ToC for full book when this is a book chapter
  let mergedTocList: TocItem[] | null = null;
  const isBookChapter =
    post.slug[1] === "books" && post.slug.length >= 4;
  if (isBookChapter) {
    const relatedSlugs = (post.relatedSlugs as string[]) || [];
    const currentSlug = post.slug.join("/");
    const allChapterSlugs = [currentSlug, ...relatedSlugs].sort((a, b) => {
      const numA = parseInt(a.split("/").pop()?.replace(/^!/, "") ?? "0", 10);
      const numB = parseInt(b.split("/").pop()?.replace(/^!/, "") ?? "0", 10);
      return numA - numB;
    });
    const merged: TocItem[] = [];
    for (const chapterSlug of allChapterSlugs) {
      const chapterPost = await getPostBySlug(chapterSlug.split("/"), [
        "content",
        "fullPath",
      ]);
      const { toc: chapterToc } = await markdownToHtml({
        content: (chapterPost.content as string) || "",
        fullPath: chapterPost.fullPath as string,
      });
      const basePath = "/" + chapterSlug;
      for (const i of chapterToc ?? []) {
        merged.push({
          depth: parseInt(String((i as any).depth), 10),
          name: (i as any).value,
          url: `${basePath}#${(i as any).id}`,
        });
      }
    }
    mergedTocList = merged;
  }

  // Find prev and next pages
  let prevPage = null,
    nextPage = null,
    currentPageNumber;
  try {
    const relatedSlugs = post.relatedSlugs || [];
    const lastPart = post.slug.slice(-1)[0];
    const currentIndex = parseInt(lastPart.replace(/^!/, ""), 10);
    const prevSlug = post.slug
      .slice(0, post.slug.length - 1)
      .concat((currentIndex - 1).toString())
      .join("/");
    const nextSlug = post.slug
      .slice(0, post.slug.length - 1)
      .concat((currentIndex + 1).toString())
      .join("/");
    if (!relatedSlugs.includes(prevSlug)) prevPage = null;
    else prevPage = "/" + prevSlug;
    if (!relatedSlugs.includes(nextSlug)) nextPage = null;
    else nextPage = "/" + nextSlug;
    currentPageNumber = currentIndex;
    const firstSiblingSlug = allPosts.find(
      (externalPost) =>
        externalPost.slug.join("/") === post.slug.slice(0, -1).join("/")
    );
    if (firstSiblingSlug?.title !== undefined) {
      // post.title = firstSiblingSlug.title;
      const stringifiedSlug = post.slug.join("/");
      const allSiblingPosts = relatedSlugs.concat(stringifiedSlug).sort();
      if (allSiblingPosts[0] !== stringifiedSlug)
        post.firstSiblingSlug = allSiblingPosts[0];
    }
  } catch (error) {}

  return {
    props: {
      posts,
      siblingPosts,
      currentLanguage: currentLanguage ?? "en",
      post: {
        ...post,
        content: text,
        toc,
        imgs,
      },
      prevPage,
      nextPage,
      currentPageNumber,
      ...(mergedTocList && { mergedTocList }),
      hasMath,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts({
    fields: ["slug", "hidden"],
    showHidden: true,
    folder: "",
    ignoreTitles: false,
  });

  return {
    paths: posts
      .filter(
        (post) =>
          !["texts", "list", "welcome"].includes(post.slug.slice(1).join("/"))
      )
      .map((post) => {
        return {
          params: {
            slug: post.slug.slice(1),
            lang: post.slug[0],
          },
        };
      })
      .flat(),
    fallback: false,
  };
}
