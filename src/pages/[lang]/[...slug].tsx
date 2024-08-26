import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../../components/post-body";
import Layout from "../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBackwardFast,
} from "@fortawesome/free-solid-svg-icons";

import { getPostBySlug, getAllPosts, Items } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import { TPost } from "../../types/post";
import { site_title } from "../../config/config";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { retainStringValues } from "../../lib/utils";

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
};

type TocItem = {
  name: string;
  url: string;
  depth: number;
};

const siteSection = "books";

const Post = ({
  post,
  parentPost,
  posts,
  siblingPosts,
  currentLanguage,
  prevPage,
  nextPage,
  currentPageNumber,
}: Props) => {
  post = post ?? parentPost;
  const router = useRouter();
  if (!router.isFallback && !post?.slug) return <ErrorPage statusCode={404} />;

  const toc_list: TocItem[] = (post?.toc ?? []).map((i: any) => ({
    depth: i.depth,
    name: i.value,
    url: `${router.asPath.replace(/#.*/, "")}#${i.id}`,
  }));
  const hasToc = toc_list.length > 5;

  type GalleryState = { galleryShown: boolean; currentImgUrl: string | null };
  const [state, setState]: [
    GalleryState,
    React.Dispatch<React.SetStateAction<GalleryState>>,
  ] = useState({ galleryShown: false, currentImgUrl: null } as GalleryState);

  const images: ReactImageGalleryItem[] = (post?.imgs ?? []).map((img) => ({
    original: img.url,
    thumbnail: img.url,
    originalTitle: img.caption,
    description: `${img.caption} | ${img.definition}`,
  }));
  const currentImgIndex = images.findIndex(
    (element) => element.original === state.currentImgUrl
  );

  const title_core = post["meta.title"] ?? post.title;
  const firstHeaderPreview = post.firstHeader
    ? post.firstHeader.slice(0, 50) +
      (post.firstHeader.length > 50 ? "..." : "")
    : "";

  const title = firstHeaderPreview
    ? `${firstHeaderPreview} | ${title_core}`
    : `${title_core} | ${site_title}`;
  return (
    <Layout
      meta={{
        ...retainStringValues(post, ["content", "fullPath"]),
        title,
        "og:url": "/" + post.slug.join("/"),
      }}
      toc={post?.toc}
      path={router.asPath.replace(/#.*/, "")}
      allPosts={siblingPosts}
      currentLanguage={currentLanguage}
      posts={posts}
      post={post}
      siteSection={siteSection}
      title={title}
    >
      <div className="mx-auto pb-6 max-w-7xl px-4 sm:px-6 flex flex-row flex-wrap select-none">
        {/* Navigation links */}
        {(nextPage !== null || prevPage !== null) && (
          <div className="w-full flex justify-center mt-2 items-center space-x-8">
            {post.parentSlug !== undefined &&
            post.parentSlug !== post.slug.join("/") ? (
              <Link
                href={"/" + post.parentSlug}
                className="text-brown-300 hover:text-brown-500 transition-colors"
              >
                <FontAwesomeIcon className="w-6" icon={faBackwardFast} />
              </Link>
            ) : (
              <div />
            )}
            {prevPage !== null ? (
              <Link
                href={prevPage}
                className="text-deep-orange-300 hover:text-brown-500 transition-colors"
              >
                <FontAwesomeIcon className="w-6" icon={faArrowLeft} />
              </Link>
            ) : (
              <div className="w-12" />
            )}
            <span className="text-gray-600">{currentPageNumber}</span>
            {nextPage !== null ? (
              <Link
                href={nextPage}
                className="text-deep-orange-300 hover:text-deep-brown-500 transition-colors"
              >
                <FontAwesomeIcon className="w-6" icon={faArrowRight} />
              </Link>
            ) : (
              <div className="w-12" />
            )}
          </div>
        )}

        {state.galleryShown && post.slug[1] === siteSection && (
          <ImageGallery
            additionalClass="fullpage"
            items={images}
            lazyLoad={true}
            useTranslate3D={false}
            showBullets={false}
            startIndex={currentImgIndex}
            onSlide={(currentIndex) => {
              document
                ?.querySelector(`[data-url="${images[currentIndex].original}"]`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            onClick={() => setState((p) => ({ ...p, galleryShown: false }))}
          />
        )}

        <PostBody
          post={{ ...post, title: title_core }}
          state={state}
          setState={setState}
          hasToc={hasToc}
          siteSection={siteSection}
        />
        {hasToc && (
          <nav className="hidden md:block toc w-full md:w-1/5 sticky px-2 bottom-0 md:top-20 h-16 md:h-screen font-medium text-sm overflow-ellipsis">
            <div id="toc-core" className="toc-core h-4/5 overflow-y-auto">
              {toc_list.map((item) => (
                <Link
                  href={item.url}
                  key={item.url}
                  className={`block text-black in-toc hover:no-underline px-3 py-2 lme-ml-${
                    (item.depth - 2) * 2
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </Layout>
  );
};

export default Post;

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
  const { text, toc, imgs } = await markdownToHtml({
    content: (post.content as string) || "",
    fullPath: post.fullPath as string,
  });

  const siblingPosts = allPosts.filter((i) => i.slug[0] === params.lang);

  // Find prev and next pages
  let prevPage = null,
    nextPage = null,
    currentPageNumber;
  try {
    const relatedSlugs = post.relatedSlugs || [];
    const currentIndex = parseInt(post.slug.slice(-1)[0].replace(/!/g, ""));
    prevPage = post.slug
      .slice(0, post.slug.length - 1)
      .concat("!" + (currentIndex - 1).toString())
      .join("/");
    if (!relatedSlugs.includes(prevPage)) prevPage = null;
    else prevPage = "/" + prevPage;
    nextPage = post.slug
      .slice(0, post.slug.length - 1)
      .concat("!" + (currentIndex + 1).toString())
      .join("/");
    if (!relatedSlugs.includes(nextPage)) nextPage = null;
    else nextPage = "/" + nextPage;
    currentPageNumber = currentIndex;
    const parentSlug = allPosts.find(
      (externalPost) =>
        externalPost.slug.join("/") === post.slug.slice(0, -1).join("/")
    );
    if (parentSlug?.title !== undefined && post.title === undefined) {
      post.title = parentSlug.title;
      post.parentPost = parentSlug;
      const stringifiedSlug = post.slug.join("/");
      const allSiblingPosts = relatedSlugs.concat(stringifiedSlug).sort();
      if (allSiblingPosts[0] !== stringifiedSlug)
        post.parentSlug = allSiblingPosts[0];
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
