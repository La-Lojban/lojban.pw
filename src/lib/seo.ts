import { site_url } from "../config/config";

export function absoluteUrl(
  base: string,
  pathOrUrl: string | undefined | null
): string | undefined {
  if (pathOrUrl == null || pathOrUrl === "") return undefined;
  const p = String(pathOrUrl).trim();
  if (/^https?:\/\//i.test(p)) return p;
  const baseNorm = base.replace(/\/$/, "");
  const pathNorm = p.startsWith("/") ? p : `/${p}`;
  return `${baseNorm}${pathNorm}`;
}

/** Path with trailing slash for canonical URLs (matches Next `trailingSlash`). */
export function normalizeCanonicalPath(asPath: string): string {
  const noHash = asPath.replace(/#.*/, "");
  const pathOnly = noHash.split("?")[0];
  if (pathOnly === "" || pathOnly === "/") return "/";
  const withSlash = pathOnly.endsWith("/") ? pathOnly : `${pathOnly}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}

/** Matches top-level dirs under data/pages/ (locale URL segments). */
const OG_LOCALE: Record<string, string> = {
  de: "de_DE",
  en: "en_US",
  eo: "eo",
  es: "es_ES",
  fr: "fr_FR",
  orv: "orv_RU",
  pt: "pt_BR",
  ru: "ru_RU",
  tl: "fil_PH",
  tok: "tok",
};

export function ogLocaleFromLang(lang: string): string {
  return OG_LOCALE[lang] ?? `${lang}_${lang.toUpperCase()}`;
}

export function webSiteJsonLd(opts: {
  name: string;
  url: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: opts.name,
    url: opts.url,
    ...(opts.description ? { description: opts.description } : {}),
  };
}

export function organizationJsonLd(opts: { name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: opts.name,
    url: opts.url,
  };
}

export function articleJsonLd(opts: {
  headline: string;
  url: string;
  datePublished?: string;
  authorName?: string;
}) {
  const o: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    url: opts.url,
  };
  if (opts.datePublished) o.datePublished = opts.datePublished;
  if (opts.authorName) {
    o.author = {
      "@type": "Person",
      name: opts.authorName,
    };
  }
  return o;
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Build breadcrumb items from URL path segments (uses slug parts as labels). */
export function breadcrumbItemsFromSlug(
  slug: string[],
  baseUrl: string,
  lastLabel?: string
): { name: string; url: string }[] {
  const base = baseUrl.replace(/\/$/, "");
  const items: { name: string; url: string }[] = [];
  for (let i = 0; i < slug.length; i++) {
    const segment = slug[i];
    const path = slug.slice(0, i + 1).join("/");
    const isLast = i === slug.length - 1;
    const name = isLast && lastLabel ? lastLabel : segment;
    items.push({
      name,
      url: `${base}/${path}/`,
    });
  }
  return items;
}

export function defaultHreflangXDefault(
  alternates: { language: string; fullPath: string }[],
  siteUrl: string = site_url
): string | undefined {
  const en = alternates.find((a) => a.language === "en");
  if (en) return absoluteUrl(siteUrl, `/${en.fullPath}/`);
  const first = alternates[0];
  if (first) return absoluteUrl(siteUrl, `/${first.fullPath}/`);
  return undefined;
}
