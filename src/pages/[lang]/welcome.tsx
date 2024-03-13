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
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { retainStringValues } from "../../lib/utils";
import AllStories from "../../components/all-stories";
import LanguageBar from "../../components/language-bar";

type Props = {
  post: TPost;
  posts: Items[];
  contentPosts: TPost[];
  siblingPosts: Items[];
  currentLanguage: string;
  params: any;
};

type TocItem = {
  name: string;
  url: string;
  depth: number;
};

const Post = ({
  post,
  posts,
  contentPosts,
  siblingPosts,
  currentLanguage,
  params,
}: Props) => {
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
  const title = title_core ? `${title_core} | ${site_title}` : site_title;
  const pageToRender = (
    <Layout
      meta={{
        ...retainStringValues(post, ["content", "fullPath"]),
        title,
        "og:url": "/" + post.slug.join("/"),
      }}
    >
      <div className="pb-8">
        <Container>
          <Header
            toc={post?.toc}
            path={router.asPath.replace(/#.*/, "")}
            allPosts={siblingPosts}
            currentLanguage={currentLanguage}
          />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <LanguageBar posts={posts} post={post} siteSection="books" />
              <article className="mt-2 mx-auto max-w-7xl px-4 sm:mt-2 sm:px-6 flex md:flex-row flex-wrap">
                <Head>
                  <title>{title}</title>
                </Head>
                {state.galleryShown && (
                  <ImageGallery
                    additionalClass="fullpage"
                    items={images}
                    lazyLoad={true}
                    useTranslate3D={false}
                    showBullets={true}
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
                  posts={contentPosts}
                  lang={params.lang}
                />
                {hasToc && (
                  <nav className="hidden md:block toc w-full md:w-1/5 sticky px-2 bottom-0 md:top-20 h-16 md:h-screen font-medium text-sm overflow-ellipsis">
                    <div
                      id="toc-core"
                      className="toc-core h-4/5 overflow-y-auto"
                    >
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
  params.slug = params.slug ?? ["welcome"];
  const post = getPostBySlug([params.lang].concat(params.slug), [
    "title",
    "hidden",
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
    // "pdf",
  ]);

  const fullSlug = params.lang + "/" + params.slug.join("/");
  const shortSlug = params.slug.join("/");
  const currentLanguage = params.lang;

  const allPosts = await getAllPosts(
    ["slug", "hidden", "title", "directory", "coverImage"],
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

  const contentPosts = allPosts.filter(
    (i) =>
      !(i.slug[1] === "list" && i.slug.length === 2) &&
      i.slug[0] === params.lang &&
      i.slug.length > 2 &&
      i.hidden !== true
  );

  const siblingPosts = allPosts.filter((i) => i.slug[0] === params.lang);
  return {
    props: {
      params,
      posts,
      siblingPosts,
      contentPosts,
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
      .filter((post) => post.slug.slice(1).join("/") === "welcome")
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

// export const config = { amp: 'hybrid' }
