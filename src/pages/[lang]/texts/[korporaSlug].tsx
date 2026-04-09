/**
 * Korpora texts: one shared template; body comes from `data/assets/korpora-tsv/<slug>.tsv`
 * and optional `data/assets/korpora-tsv/<slug>.md` preamble.
 */
import { useMemo, useState } from "react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import PostBody from "../../../components/post-body";
import Layout from "../../../components/layout";
import { PageTocSidebar } from "../../../components/page-toc-sidebar";
import { getAllPosts, Items } from "../../../lib/api";
import markdownToHtml from "../../../lib/markdownToHtml";
import {
  loadProcessedCorpusFromTsv,
  buildKorporaSectionHtml,
  getCorpusPostFields,
  langKeyFromShort,
  getPreambleMdPath,
  listKorporaTsvBasenames,
  shortFromLangKey,
  korporaLanguageKeys,
  resolveKorporaDisplayTitle,
  resolveKorporaAuthorLine,
  resolveKorporaDescriptionLine,
  readKorporaPreambleBodyMarkdown,
} from "../../../lib/korpora/corpusCore";
import { TPost } from "../../../types/post";
import { GalleryImg } from "../../../types/gallery-img";
import { TocItem } from "../../../types/toc";
import { site_description, site_title, site_url } from "../../../config/config";
import { retainStringValues } from "../../../lib/utils";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbItemsFromSlug,
  breadcrumbJsonLd,
  defaultHreflangXDefault,
  organizationJsonLd,
  webSiteJsonLd,
} from "../../../lib/seo";

const siteSection = "books";

const tw = {
  shell: "mx-auto pb-6 max-w-7xl px-4 sm:px-6 flex flex-row flex-wrap",
} as const;

type PageParams = { lang: string; korporaSlug: string };

export default function KorporaTextPage({
  post,
  posts,
  siblingPosts,
  currentLanguage,
  hasMath,
}: {
  post: TPost;
  posts: Items[];
  siblingPosts: Items[];
  currentLanguage: string;
  hasMath?: boolean;
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) return <ErrorPage statusCode={404} />;

  const pathBase = router.asPath.replace(/#.*/, "");
  const toc_list: TocItem[] = useMemo(
    () =>
      (post?.toc ?? []).map((i: { depth: unknown; value: string; id: string }) => ({
        depth: parseInt(String(i.depth), 10),
        name: i.value,
        url: `${pathBase}#${i.id}`,
      })),
    [post?.toc, pathBase]
  );
  const hasToc = toc_list.length > 5;

  const [state, setState] = useState<{
    galleryShown: boolean;
    currentImgUrl: string | null;
  }>({ galleryShown: false, currentImgUrl: null });

  const title_core = post["meta.title"] ?? post.title;
  const title = useMemo(
    () => `${title_core} | ${site_title}`,
    [title_core]
  );

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
    const crumbs = breadcrumbItemsFromSlug(post.slug, site_url, title_core);
    const bc = breadcrumbJsonLd(crumbs);
    return [
      webSiteJsonLd({
        name: site_title,
        url: site_url,
        description: site_description,
      }),
      organizationJsonLd({ name: site_title, url: site_url }),
      articleJsonLd({
        headline: title_core,
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
        "og:type": "article",
      }}
      toc={post?.toc}
      path={pathBase}
      allPosts={siblingPosts}
      currentLanguage={currentLanguage}
      posts={posts}
      post={post}
      siteSection={siteSection}
      title={title}
      alternates={alternates}
      hreflangXDefault={hreflangXDefault}
      jsonLd={jsonLd}
      loadKatex={hasMath}
    >
      <div className={tw.shell}>
        <PostBody
          post={{ ...post, title: title_core }}
          state={state}
          setState={setState}
          hasToc={hasToc}
          siteSection={siteSection}
          suppressPdfLink={false}
        />
        {hasToc ? <PageTocSidebar items={toc_list} /> : null}
      </div>
    </Layout>
  );
}

export async function getStaticProps({
  params,
}: {
  params: PageParams;
}) {
  const data = loadProcessedCorpusFromTsv(params.korporaSlug);
  if (!data) {
    return { notFound: true };
  }

  const langKey = langKeyFromShort(params.lang);
  const sectionHtml = buildKorporaSectionHtml(data, langKey);
  const meta = getCorpusPostFields(data, langKey);
  const pageTitle = resolveKorporaDisplayTitle(params.korporaSlug, meta.title);
  const authorName = resolveKorporaAuthorLine(params.korporaSlug, meta.author);
  const descriptionLine = resolveKorporaDescriptionLine(
    params.korporaSlug,
    meta.description
  );

  const preamblePath = getPreambleMdPath(params.korporaSlug);
  let preambleHtml = "";
  let toc: Awaited<ReturnType<typeof markdownToHtml>>["toc"] = [];
  let imgs: Awaited<ReturnType<typeof markdownToHtml>>["imgs"] = [];
  let hasMath = false;

  const preambleMd = readKorporaPreambleBodyMarkdown(params.korporaSlug);
  if (preambleMd.length > 0) {
    const conv = await markdownToHtml({
      content: preambleMd,
      fullPath: preamblePath,
    });
    preambleHtml = conv.text;
    toc = conv.toc;
    imgs = conv.imgs;
    hasMath = conv.hasMath;
  }

  const fullHtml = (preambleHtml ? `${preambleHtml}\n\n` : "") + sectionHtml;

  const post: TPost = {
    slug: [params.lang, "texts", params.korporaSlug],
    title: pageTitle,
    "meta.title": pageTitle,
    "meta.type": "korpora",
    "meta.description": descriptionLine,
    "meta.keywords": meta.keywords,
    "meta.author": authorName,
    "meta.priority": meta.priority,
    date: "",
    coverImage: meta.ogImage ?? "",
    author: { name: authorName, picture: "" },
    excerpt: descriptionLine,
    content: fullHtml,
    toc,
    imgs: imgs as GalleryImg[],
    ...(meta.ogImage ? { "og:image": meta.ogImage } : {}),
  };

  const fields = ["slug", "hidden", "title", "directory", "coverImage", "icon"];
  let allPosts = await getAllPosts({
    fields,
    showHidden: true,
    folder: "",
    ignoreTitles: true,
  });

  const fullSlug = `${params.lang}/texts/${params.korporaSlug}`;
  const shortSlug = `texts/${params.korporaSlug}`;
  const currentLanguage = params.lang;
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
    (p) => !fields.includes("title") || typeof p.title !== "undefined"
  );
  const siblingPosts = allPosts.filter((i) => i.slug[0] === params.lang);

  return {
    props: {
      post,
      posts,
      siblingPosts,
      currentLanguage: params.lang,
      hasMath,
    },
  };
}

export async function getStaticPaths() {
  const basenames = listKorporaTsvBasenames();
  const shorts = korporaLanguageKeys.map((k) => shortFromLangKey(k));

  const paths: { params: PageParams }[] = [];
  for (const basename of basenames) {
    for (const lang of shorts) {
      paths.push({ params: { lang, korporaSlug: basename } });
    }
  }

  return { paths, fallback: false };
}
