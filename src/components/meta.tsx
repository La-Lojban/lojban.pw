import { useMemo } from "react";
import Head from "next/head";
import { links, meta as metaDefault } from "../config/config";

type MetaLink = {
  rel: string;
  type?: string;
  sizes: string;
  href: string;
  color?: string;
};

function removeUndefinedOrNull(obj: any) {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

function separateMetaKeys(jsonObj: any) {
  const metaObj: any = {};
  Object.keys(jsonObj).forEach((key) => {
    if (key.startsWith("meta.")) {
      metaObj[key.replace(/^meta\./, "")] = jsonObj[key];
      delete jsonObj[key];
    }
  });
  return { original: jsonObj, metaJson: metaObj };
}

type TMeta = { [key: string]: string | undefined };

function getTag(fallbacks: string[], meta: TMeta, metaDefault: TMeta) {
  for (const el of fallbacks) {
    if (meta[el]) return meta[el];
  }
  for (const el of fallbacks) {
    if (metaDefault[el]) return metaDefault[el];
  }
}

function Meta({
  meta: metaProp,
  title,
  parentSlug,
}: {
  meta?: TMeta;
  title?: string;
  parentSlug?: string;
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
    const { original, metaJson } = separateMetaKeys(m);
    return { ...metaJson, ...original };
  }, [metaProp]);

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
    if (parentSlug) {
      result.push({ rel: "canonical", href: "/" + parentSlug, sizes: "" });
    }
    return result;
  }, [metaProp, parentSlug]);

  const metaEntries = useMemo(
    () => Object.entries(removeUndefinedOrNull(merged)),
    [merged]
  );

  return (
    <Head>
      {title && <title>{title}</title>}
      {links_.map((el, index) => (
        <link
          key={el.rel + (el.href ?? "") + index}
          rel={el.rel}
          type={el.type}
          sizes={el.sizes}
          href={el.href}
          color={el.color}
        />
      ))}
      {metaEntries.map(([key, value]) => (
        <meta
          key={key}
          property={key.startsWith("og:") ? key : undefined}
          name={!key.startsWith("og:") ? key : undefined}
          content={value as string}
        />
      ))}
    </Head>
  );
}

export default Meta;
