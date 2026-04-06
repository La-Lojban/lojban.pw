/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useMemo } from "react";
import AllStories from "../../components/all-stories";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import { Items, getAllPosts } from "../../lib/api";
import { TPost } from "../../types/post";
import { header, site_description, site_title, site_url } from "../../config/config";
import markdownToHtml from "../../lib/markdownToHtml";
import {
  absoluteUrl,
  defaultHreflangXDefault,
  organizationJsonLd,
  webSiteJsonLd,
} from "../../lib/seo";
import { Params } from "./[...slug]";
import { retainStringValues } from "../../lib/utils";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  outer: "mx-auto pb-6 max-w-7xl px-4 sm:px-6 flex flex-row flex-wrap",
  inner: "mb-8 mt-3 mx-auto max-w-7xl px-4 sm:px-6",
  introHtml: "mb-2",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function TextsIndexContent({
  title,
  ogImage,
  html,
  storyPosts,
}: {
  title?: string;
  ogImage?: string;
  html: string;
  storyPosts: TPost[];
}) {
  return (
    <div className={tw.outer}>
      <div className={tw.inner}>
        <Intro title={title} image={ogImage} />
        <div
          className={tw.introHtml}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {storyPosts.length > 0 ? (
          <AllStories posts={storyPosts} />
        ) : null}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  siblingPosts: Items[];
  allPosts: Items[];
  indexPost: TPost;
  posts: Items[];
  params: { lang: string };
};

const textsHeaderEntry = header.find((item) => item.url === "/texts") as
  | (typeof header)[number]
  | undefined;
const ogImage = (textsHeaderEntry as { "og:image"?: string } | undefined)?.[
  "og:image"
];

function TextsPage({
  siblingPosts,
  allPosts,
  indexPost,
  posts,
  params,
}: Props) {
  const langPosts = posts as unknown as { fullPath: string; language: string }[];

  const alternates = useMemo(
    () =>
      langPosts.map((p) => ({
        hreflang: p.language,
        href: absoluteUrl(site_url, `/${p.fullPath}/`)!,
      })),
    [langPosts]
  );

  const hreflangXDefault = useMemo(
    () => defaultHreflangXDefault(langPosts),
    [langPosts]
  );

  const jsonLd = useMemo(
    () => [
      webSiteJsonLd({
        name: site_title,
        url: site_url,
        description: site_description,
      }),
      organizationJsonLd({ name: site_title, url: site_url }),
    ],
    []
  );

  const storyPosts = allPosts as unknown as TPost[];

  return (
    <Layout
      meta={{
        ...retainStringValues(indexPost, ["content", "fullPath"]),
        title: indexPost.title,
        "og:url": "/" + indexPost.slug.join("/"),
      }}
      allPosts={siblingPosts}
      currentLanguage={params.lang}
      title={indexPost.title}
      posts={posts}
      alternates={alternates}
      hreflangXDefault={hreflangXDefault}
      jsonLd={jsonLd}
      useArticleShell={false}
    >
      <TextsIndexContent
        title={indexPost?.title}
        ogImage={ogImage}
        html={indexPost?.content ?? ""}
        storyPosts={storyPosts}
      />
    </Layout>
  );
}

export default TextsPage;

export const getStaticProps = async ({ params }: Params) => {
  let allPosts = await getAllPosts({
    fields: [
      "title",
      "hidden",
      "date",
      "slug",
      "author",
      "coverImage",
      "icon",
      "og:image",
      "excerpt",
      "author",
      "fullPath",
      "content",
      "meta.title",
      "description",
      "meta.keywords",
      "meta.author",
      "meta.type",
    ],
    showHidden: true,
    folder: "",
    ignoreTitles: false,
  });
  const thisLangPosts = allPosts.filter(
    (i) => i.slug[0] === params.lang && i.slug[1] === "texts"
  );
  const indexPost: Items = {
    ...allPosts.filter(
      (i) => i.slug[0] === "en" && i.slug[1] === "texts" && i.slug.length === 2
    )[0],
    ...thisLangPosts.filter((i) => i.slug.length === 2)[0],
  };
  const { text } = await markdownToHtml({
    content: (indexPost.content as string) || "",
    fullPath: indexPost.fullPath as string,
  });

  allPosts = allPosts.map((post) => {
    post.contentLength = (post.content as string).length;
    delete post.content;
    return post;
  });

  const posts = allPosts
    .filter(
      (i) =>
        i.slug[0] !== params.lang &&
        i.slug[1] === "texts" &&
        i.slug.length === 2
    )
    .map(({ slug }) => {
      return { fullPath: slug.join("/"), language: slug[0] };
    });

  const siblingPosts = allPosts.filter((i) => i.slug[0] === params.lang);
  return {
    props: {
      siblingPosts,
      allPosts: thisLangPosts.filter((i) => i.slug.length > 2),
      indexPost: { ...indexPost, content: text },
      posts,
      params,
    },
  };
};

export async function getStaticPaths() {
  const posts = await getAllPosts({
    fields: ["slug", "hidden"],
    showHidden: true,
    folder: "",
    ignoreTitles: false,
  });
  return {
    paths: posts
      .filter((post) => post.slug.slice(1).join("/") === "texts")
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
