/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { useMemo } from "react";
import Head from "next/head";
import { links, meta as metaDefault, site_url } from "../config/config";
import {
  absoluteUrl,
  normalizeCanonicalPath,
  ogLocaleFromLang,
} from "../lib/seo";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
// (none — Head children are unstyled)

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
type MetaLink = {
  rel: string;
  type?: string;
  sizes: string;
  href: string;
  color?: string;
};

function DocumentLinks({ links: linkList }: { links: MetaLink[] }) {
  return (
    <>
      {linkList.map((el, index) => (
        <link
          key={el.rel + (el.href ?? "") + index}
          rel={el.rel}
          type={el.type}
          sizes={el.sizes || undefined}
          href={el.href}
          color={el.color}
        />
      ))}
    </>
  );
}

function DocumentMetaTags({
  entries,
}: {
  entries: [string, unknown][];
}) {
  return (
    <>
      {entries.map(([key, value]) => (
        <meta
          key={key}
          property={key.startsWith("og:") ? key : undefined}
          name={!key.startsWith("og:") ? key : undefined}
          content={value as string}
        />
      ))}
    </>
  );
}

function HreflangLinks({
  alternates,
  xDefaultHref,
}: {
  alternates?: { hreflang: string; href: string }[];
  xDefaultHref?: string;
}) {
  if (!alternates?.length && !xDefaultHref) return null;
  return (
    <>
      {alternates?.map((a) => (
        <link
          key={`${a.hreflang}-${a.href}`}
          rel="alternate"
          hrefLang={a.hreflang}
          href={a.href}
        />
      ))}
      {xDefaultHref ? (
        <link rel="alternate" hrefLang="x-default" href={xDefaultHref} />
      ) : null}
    </>
  );
}

function JsonLdScripts({
  blocks,
}: {
  blocks: Record<string, unknown>[];
}) {
  return (
    <>
      {blocks.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type TMeta = { [key: string]: string | undefined };

function removeUndefinedOrNull(obj: Record<string, unknown>) {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

function separateMetaKeys(jsonObj: Record<string, unknown>) {
  const metaObj: Record<string, unknown> = {};
  Object.keys(jsonObj).forEach((key) => {
    if (key.startsWith("meta.")) {
      metaObj[key.replace(/^meta\./, "")] = jsonObj[key];
      delete jsonObj[key];
    }
  });
  return { original: jsonObj, metaJson: metaObj };
}

function getTag(fallbacks: string[], meta: TMeta, metaDef: TMeta) {
  for (const el of fallbacks) {
    if (meta[el]) return meta[el];
  }
  for (const el of fallbacks) {
    if (metaDef[el]) return metaDef[el];
  }
}

function Meta({
  meta: metaProp,
  title,
  canonicalPath: canonicalPathProp,
  currentLanguage = "en",
  alternates,
  hreflangXDefault,
  jsonLd,
  loadKatex,
}: {
  meta?: TMeta;
  title?: string;
  /** Pathname with trailing slash (e.g. from router.asPath); used for canonical + absolutes. */
  canonicalPath?: string;
  currentLanguage?: string;
  alternates?: { hreflang: string; href: string }[];
  hreflangXDefault?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
  loadKatex?: boolean;
}) {
  const meta = metaProp ?? {};

  const merged = useMemo(() => {
    const m: TMeta = { ...metaDefault, ...meta };
    m["og:title"] = getTag(
      ["og:title", "twitter:title", "title"],
      meta,
      metaDefault
    );
    m["og:description"] = getTag(
      [
        "meta.description",
        "og:description",
        "twitter:description",
        "description",
      ],
      meta,
      metaDefault
    );
    m["og:url"] = getTag(["og:url", "twitter:url"], meta, metaDefault);
    m["twitter:title"] = getTag(
      ["twitter:title", "og:title", "title"],
      meta,
      metaDefault
    );
    m["twitter:description"] = getTag(
      [
        "meta.description",
        "twitter:description",
        "og:description",
        "description",
      ],
      meta,
      metaDefault
    );
    m["twitter:url"] = getTag(["twitter:url", "og:url"], meta, metaDefault);
    m["twitter:image"] = getTag(
      ["twitter:image", "og:image"],
      meta,
      metaDefault
    );
    m["description"] = getTag(
      [
        "description",
        "meta.description",
        "twitter:description",
        "og:description",
      ],
      meta,
      metaDefault
    );
    delete m.title;

    m["og:url"] = absoluteUrl(site_url, m["og:url"]) ?? m["og:url"];
    m["twitter:url"] = absoluteUrl(site_url, m["twitter:url"]) ?? m["twitter:url"];
    m["og:image"] = absoluteUrl(site_url, m["og:image"]) ?? m["og:image"];
    m["twitter:image"] =
      absoluteUrl(site_url, m["twitter:image"]) ?? m["twitter:image"];

    m["og:locale"] = ogLocaleFromLang(currentLanguage);

    const { original, metaJson } = separateMetaKeys({
      ...(m as Record<string, unknown>),
    });
    return { ...metaJson, ...original } as TMeta;
  }, [metaProp, currentLanguage]);

  const metaEntries = useMemo(
    () =>
      Object.entries(removeUndefinedOrNull({ ...merged } as Record<string, unknown>)),
    [merged]
  );

  const links_ = useMemo(() => {
    const icon = getTag(
      ["coverImage", "og:image", "twitter:image"],
      meta,
      metaDefault
    );
    const result = (JSON.parse(JSON.stringify(links)) as MetaLink[]).map(
      (link) => {
        if (icon && ["mask-icon", "shortcut icon"].includes(link.rel)) {
          return { ...link, href: icon };
        }
        return link;
      }
    );
    const pathForCanonical = canonicalPathProp
      ? normalizeCanonicalPath(canonicalPathProp)
      : "/";
    const canonicalHref = absoluteUrl(site_url, pathForCanonical);
    if (canonicalHref) {
      result.push({
        rel: "canonical",
        href: canonicalHref,
        sizes: "",
      });
    }
    return result;
  }, [metaProp, canonicalPathProp]);

  const jsonLdBlocks = useMemo(() => {
    if (jsonLd == null) return [];
    return Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  }, [jsonLd]);

  const ogLocaleAlternates = useMemo(() => {
    const other = (alternates ?? [])
      .filter((a) => a.hreflang !== currentLanguage)
      .map((a) => ogLocaleFromLang(a.hreflang));
    return [...new Set(other)];
  }, [alternates, currentLanguage]);

  return (
    <Head>
      {title ? <title>{title}</title> : null}
      {loadKatex ? (
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
      ) : null}
      {currentLanguage === "orv" ? (
        <link
          rel="preload"
          href="/assets/fonts/Monomakh-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ) : (
        <link
          rel="preload"
          href="/assets/fonts/LinLibertine_R.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      )}
      <DocumentLinks links={links_} />
      <HreflangLinks alternates={alternates} xDefaultHref={hreflangXDefault} />
      {ogLocaleAlternates.map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}
      <DocumentMetaTags entries={metaEntries as [string, unknown][]} />
      <JsonLdScripts blocks={jsonLdBlocks} />
    </Head>
  );
}

export default Meta;
