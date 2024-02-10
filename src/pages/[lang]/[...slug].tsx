import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts, Items } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import { TPost } from "../../types/post";
import { site_title } from "../../config/config";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

type Props = {
  post: TPost;
  preview?: boolean;
  posts: Items[];
  allPosts: Items[];
  currentLanguage: string;
};

type TocItem = {
  name: string;
  url: string;
  depth: number;
};

const Post = ({ post, posts, allPosts, currentLanguage, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) return <ErrorPage statusCode={404} />;

  const toc_list: TocItem[] = (post?.toc ?? []).map((i: any) => ({
    depth: i.depth,
    name: i.value,
    url: `${router.asPath.replace(/#.*/, "")}#${i.id}`,
  }));
  const hasToc = toc_list.length > 5;
  const isBook = post?.slug?.[0] === "books";
  const pdfUrl = `/vreji/uencu/${post?.slug?.[1]}.pdf`;

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
  const title = title_core ? `${title_core} | ${site_title}` : site_title;
  const pageToRender = (
    <Layout preview={preview}>
      <div className="pb-8">
        <Container>
          <Header
            toc={post?.toc}
            path={router.asPath.replace(/#.*/, "")}
            allPosts={allPosts}
            currentLanguage={currentLanguage}
          />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              {posts.length > 0 && (
                <div className="relative block max-w-sm h-10 mx-auto flex justify-around">
                  <div className="h-10 w-16 inline-block py-2 px-4">
                    <FontAwesomeIcon icon={faLanguage} />
                  </div>
                  {posts.map((post) => {
                    return (
                      <a
                        key={`bangu-${post.language}`}
                        href={`/${post.fullPath}` as any}
                        className="h-10 inline-block py-2 px-4 bg-white border border-t-0 border-gray-300 hover:border-gray-400 ml-2"
                      >
                        {post.language}
                      </a>
                    );
                  })}
                </div>
              )}
              <article className="mt-2 mx-auto max-w-7xl px-4 sm:mt-2 sm:px-6 flex md:flex-row flex-wrap">
                <Head>
                  <title>{title}</title>
                  {post?.ogImage && (
                    <meta property="og:image" content={post?.ogImage} />
                  )}
                  <meta property="og:title" content={title} />
                  {post?.["meta.description"] && (
                    <meta
                      property="og:description"
                      content={post?.["meta.description"]}
                    />
                  )}
                  {post?.["meta.description"] && (
                    <meta
                      name="description"
                      content={post?.["meta.description"]}
                    />
                  )}
                  {post?.["meta.keywords"] && (
                    <meta name="keywords" content={post?.["meta.keywords"]} />
                  )}
                  {post?.["meta.author"] && (
                    <meta name="author" content={post?.["meta.author"]} />
                  )}
                </Head>
                {/* <div className="w-1/5 md:flex flex-col md:flex-row md:min-h-screen hidden">
                <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
                  <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
                    <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Flowtrail UI</a>
                    <button className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline">
					<svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
					<path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
					<path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
					</svg>
                    </button>
					</div>
					<nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                    <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Blog</a>
                    <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Portfolio</a>
                    <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">About</a>
                    <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
                    <div className="relative" x-data="{ open: false }">
                      <button className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
					  <span>Dropdown</span>
                        <svg fill="currentColor" viewBox="0 0 20 20" className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
						</button>
						<div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg">
                        <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
						<a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #1</a>
						<a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #2</a>
                          <a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #3</a>
						  </div>
						  </div>
						  </div>
						  </nav>
						  </div>
						</div> */}
                {state.galleryShown && (
                  <ImageGallery
                    additionalClass="fullpage"
                    items={images}
                    startIndex={currentImgIndex}
                    onSlide={(currentIndex) => {
                      document
                        ?.querySelector(
                          `[data-url="${images[currentIndex].original}"]`
                        )
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onClick={() =>
                      setState((p) => ({ ...p, galleryShown: false }))
                    }
                  />
                )}

                <PostBody
                  post={post}
                  state={state}
                  setState={setState}
                  hasToc={hasToc}
                />
                {hasToc && (
                  <nav className="hidden md:block toc w-full md:w-1/5 sticky px-2 bottom-0 md:top-20 h-16 md:h-screen font-medium text-sm overflow-ellipsis">
                    <div
                      id="toc-core"
                      className="toc-core h-4/5 overflow-y-auto"
                    >
                      {isBook && (
                        <Link
                          href={pdfUrl}
                          key={pdfUrl}
                          className={`block font-semibold text-black in-toc hover:no-underline px-3 py-2 lme-ml-0`}
                        >
                          📁 PDF version
                        </Link>
                      )}
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
              </article>
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
  return pageToRender;
};

export default Post;

export type Params = {
  params: {
    slug: string[];
    lang: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug([params.lang].concat(params.slug), [
    "title",
    "hidden",
    "meta.title",
    "meta.description",
    "meta.keywords",
    "meta.author",
    "meta.type",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "fullPath",
  ]);

  const fullSlug = params.lang + "/" + params.slug.join("/");
  const shortSlug = params.slug.join("/");
  const currentLanguage = params.lang;

  const allPosts = await getAllPosts(
    ["slug", "hidden", "title", "directory"],
    true
  );
  const posts = allPosts.reduce(
    (acc, { slug }) => {
      const fullPath = slug.join("/");
      const shortPath = slug.slice(1).join("/");
      const language = slug[0];
      if (fullSlug === shortPath) {
        //the current path is the english version so list the found slug
        acc.push({ fullPath, language });
      } else if (shortSlug === fullPath) {
        //the current path is the X-lang version so list the found english version
        acc.push({ fullPath, language: "en" });
      } else if (shortSlug === shortPath && currentLanguage !== language) {
        //the current path is the X-lang version so list the found Y-lang version
        acc.push({ fullPath, language });
      }
      return acc;
    },
    [] as { fullPath: string; language: string }[]
  );
  const { text, toc, imgs } = await markdownToHtml({
    content: (post.content as string) || "",
    fullPath: post.fullPath as string,
  });

  return {
    props: {
      posts,
      allPosts,
      currentLanguage: currentLanguage ?? "en",
      post: {
        ...post,
        content: text,
        toc,
        imgs,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts(["slug", "hidden"], true);

  return {
    paths: posts
      .filter((post) => post.slug.slice(1).join("/") !== "texts")
      .map((posts) => {
        // if (posts.slug[0] === "en") {
        //   return [
        //     {
        //       params: {
        //         slug: posts.slug,
        //         lang: posts.slug[0],
        //       },
        //     },
        //     {
        //       params: {
        //         slug: posts.slug.slice(1),
        //         lang: posts.slug[0],
        //       },
        //     },
        //   ];
        // }
        return {
          params: {
            slug: posts.slug.slice(1),
            lang: posts.slug[0],
          },
        };
      })
      .flat(),
    fallback: false,
  };
}

// export const config = { amp: 'hybrid' }
