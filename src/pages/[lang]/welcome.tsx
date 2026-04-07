/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useMemo, type ReactNode } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../../components/post-body";
import Layout from "../../components/layout";
import {
  PageTocSidebar,
  type PageTocItem,
} from "../../components/page-toc-sidebar";
import { getPostBySlug, getAllPosts, Items } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import { TPost } from "../../types/post";
import { site_description, site_title, site_url } from "../../config/config";
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

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const tw = {
  shell: "mx-auto pb-6 max-w-7xl px-4 sm:px-6 flex flex-row",
} as const;

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
function WelcomeMainColumn({ children }: { children: ReactNode }) {
  return <div className={tw.shell}>{children}</div>;
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type Props = {
  post: TPost;
  posts: Items[];
  contentPosts: TPost[];
  siblingPosts: Items[];
  currentLanguage: string;
  params: { slug?: string[]; lang: string };
  hasMath?: boolean;
};

function WelcomePage({
  post,
  posts,
  contentPosts,
  siblingPosts,
  currentLanguage,
  params,
  hasMath,
}: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) return <ErrorPage statusCode={404} />;

  const toc_list: PageTocItem[] = (post?.toc ?? []).map((i: { depth: unknown; value: string; id: string }) => ({
    depth: parseInt(String(i.depth), 10),
    name: i.value,
    url: `${router.asPath.replace(/#.*/, "")}#${i.id}`,
  }));
  const hasToc = toc_list.length > 5;

  const title_core = post["meta.title"] ?? post.title;
  const title = title_core ? `${title_core} | ${site_title}` : site_title;

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

  const jsonLd = useMemo(() => {
    const canonical = absoluteUrl(site_url, `/${post.slug.join("/")}/`)!;
    const headline = title_core ?? site_title;
    const crumbs = breadcrumbItemsFromSlug(post.slug, site_url, headline);
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
        datePublished: post.date,
        authorName: post.author?.name,
      }),
      ...(bc ? [bc] : []),
    ];
  }, [post, title_core]);

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
      title={title}
      posts={posts}
      alternates={alternates}
      hreflangXDefault={hreflangXDefault}
      jsonLd={jsonLd}
      loadKatex={hasMath}
    >
      <WelcomeMainColumn>
        <PostBody
          post={post}
          hasToc={hasToc}
          posts={contentPosts}
          lang={params.lang}
        />
        {hasToc ? <PageTocSidebar items={toc_list} /> : null}
      </WelcomeMainColumn>
    </Layout>
  );
}

export default WelcomePage;

export type Params = {
  params: {
    slug: string[];
    lang: string;
  };
};

export async function getStaticProps({ params }: Params) {
  params.slug = params.slug ?? ["welcome"];
  const post = await getPostBySlug([params.lang].concat(params.slug), [
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
  ]);

  const fullSlug = params.lang + "/" + params.slug.join("/");
  const shortSlug = params.slug.join("/");
  const currentLanguage = params.lang;

  const allPosts = await getAllPosts({
    fields: ["slug", "hidden", "title", "directory", "coverImage", "og:image", "icon"],
    showHidden: true,
    folder: "",
    ignoreTitles: false,
  });
  const posts = allPosts.reduce(
    (acc, { slug, hidden }) => {
      if (hidden) return acc;
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
    [] as { fullPath: string; language: string }[]
  );
  const { text, toc, imgs, hasMath } = await markdownToHtml({
    content: (post.content as string) || "",
    fullPath: post.fullPath as string,
  });

  const contentPosts = allPosts.filter(
    (i) =>
      !i.hidden &&
      !(i.slug[1] === "list" && i.slug.length === 2) &&
      i.slug[0] === params.lang &&
      i.slug.length > 2
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
