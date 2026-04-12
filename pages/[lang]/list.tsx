/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useMemo } from "react";
import AllStories from "../../components/all-stories";
import Layout from "../../components/layout";
import { Items, getAllPosts } from "../../lib/api";
import { TPost } from "../../types/post";
import { GetStaticPropsContext } from "next";
import markdownToHtml from "../../lib/markdownToHtml";
import { site_description, site_title, site_url } from "../../config/config";
import {
  absoluteUrl,
  defaultHreflangXDefault,
  organizationJsonLd,
  webSiteJsonLd,
} from "../../lib/seo";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  outer: "mx-auto pb-6 max-w-7xl px-4 sm:px-6 flex flex-row",
  inner: "mb-8 mt-3 mx-auto max-w-7xl px-4 sm:px-6",
  introHtml: "mb-2",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function ListIndexContent({
  html,
  contentPosts,
  lang,
}: {
  html: string;
  contentPosts: TPost[];
  lang: string;
}) {
  return (
    <div className={tw.outer}>
      <div className={tw.inner}>
        <div
          className={tw.introHtml}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {contentPosts.length > 0 ? (
          <AllStories posts={contentPosts} lang={lang} />
        ) : null}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  siblingPosts: TPost[];
  contentPosts: TPost[];
  indexPost: TPost;
  posts: Items[];
  params: { lang: string };
  hasMath?: boolean;
};

function ListPage({
  posts,
  siblingPosts,
  contentPosts,
  indexPost,
  params,
  hasMath,
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

  return (
    <Layout
      meta={{
        title: indexPost.title,
        "og:url": "/" + indexPost.slug.join("/"),
      }}
      allPosts={siblingPosts as unknown as Items[]}
      currentLanguage={params.lang}
      title={indexPost.title}
      posts={posts}
      alternates={alternates}
      hreflangXDefault={hreflangXDefault}
      jsonLd={jsonLd}
      useArticleShell={false}
      loadKatex={hasMath}
    >
      <ListIndexContent
        html={indexPost?.content ?? ""}
        contentPosts={contentPosts}
        lang={params.lang}
      />
    </Layout>
  );
}

export default ListPage;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ lang: string }>) => {
  if (!params) {
    return { notFound: true };
  }

  let allPosts = await getAllPosts({
    fields: [
      "title",
      "hidden",
      "date",
      "slug",
      "directory",
      "author",
      "coverImage",
      "og:image",
      "icon",
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

  const indexPost = {
    ...allPosts.filter(
      (i) => i.slug[0] === "en" && i.slug[1] === "list" && i.slug.length === 2
    )[0],
    ...allPosts.filter(
      (i) =>
        i.slug[0] === params.lang && i.slug[1] === "list" && i.slug.length === 2
    )[0],
  };

  const { text, hasMath } = await markdownToHtml({
    content: (indexPost.content as string) || "",
    fullPath: indexPost.fullPath as string,
  });

  allPosts = allPosts.map((post) => {
    delete post.content;
    return post;
  });

  const posts = allPosts
    .filter(
      (i) =>
        !i.hidden &&
        i.slug[0] !== params.lang &&
        i.slug[1] === "texts" &&
        i.slug.length === 2
    )
    .map(({ slug }) => {
      return { fullPath: slug[0] + "/list", language: slug[0] };
    });

  const contentPosts = allPosts.filter(
    (i) => !i.hidden && !(i.slug[1] === "list" && i.slug.length === 2)
  );
  const siblingPosts = allPosts.filter((i) => i.slug[0] === params.lang);
  return {
    props: {
      posts,
      contentPosts,
      siblingPosts,
      indexPost: { ...indexPost, content: text },
      params,
      hasMath,
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
      .filter((post) => post.slug.slice(1).join("/") === "list")
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
