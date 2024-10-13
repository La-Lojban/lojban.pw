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

const Meta = ({
  meta,
  title,
  parentSlug,
}: {
  meta?: TMeta;
  title?: string;
  parentSlug?: string;
}) => {
  meta = meta ?? {};
  let merged: TMeta = { ...metaDefault, ...meta };

  merged["og:title"] = getTag(
    ["og:title", "twitter:title", "title"],
    meta,
    metaDefault
  );
  merged["og:description"] = getTag(
    [
      "meta.description",
      "og:description",
      "twitter:description",
      "description",
    ],
    meta,
    metaDefault
  );
  merged["og:url"] = getTag(["og:url", "twitter:url"], meta, metaDefault);

  merged["twitter:title"] = getTag(
    ["twitter:title", "og:title", "title"],
    meta,
    metaDefault
  );
  merged["twitter:description"] = getTag(
    [
      "meta.description",
      "twitter:description",
      "og:description",
      "description",
    ],
    meta,
    metaDefault
  );
  merged["twitter:url"] = getTag(["twitter:url", "og:url"], meta, metaDefault);
  merged["twitter:image"] = getTag(
    ["twitter:image", "og:image"],
    meta,
    metaDefault
  );

  merged["description"] = getTag(
    [
      "description",
      "meta.description",
      "twitter:description",
      "og:description",
    ],
    meta,
    metaDefault
  );

  delete merged.title;

  const { original, metaJson } = separateMetaKeys(merged);
  merged = { ...metaJson, ...original };

  const icon = getTag(
    ["coverImage", "og:image", "twitter:image"],
    meta,
    metaDefault
  );
  const links_ = (JSON.parse(JSON.stringify(links)) as MetaLink[]).reduce(
    (acc, link) => {
      if (icon && ["mask-icon", "shortcut icon"].includes(link.rel)) {
        link.href = icon;
      }
      return acc.concat([link]);
    },
    [] as MetaLink[]
  );

  if (parentSlug) {
    links_.push({
      rel: "canonical",
      href: "/" + parentSlug,
      sizes: "",
    });
  }

  return (
    <Head>
      {title && <title>{title}</title>}
      {links_.map((el, index: number) => (
        <link
          key={`link_${index}`}
          rel={el.rel}
          type={el.type}
          sizes={el.sizes}
          href={el.href}
          color={el.color}
        />
      ))}
      {Object.entries(removeUndefinedOrNull(merged)).map(([key, value]) => (
        <meta
          key={key}
          property={key.indexOf("og:") === 0 ? key : undefined}
          name={key.indexOf("og:") === -1 ? key : undefined}
          content={value as string}
        />
      ))}
    </Head>
  );
};

export default Meta;
