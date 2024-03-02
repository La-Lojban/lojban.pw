import Head from "next/head";
import { links, meta as metaDefault } from "../config/config";

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

const Meta = ({ meta }: { meta?: TMeta }) => {
  meta = meta ?? {};
  let merged: TMeta = { ...metaDefault, ...meta };
  
  merged["og:title"] = getTag(
    ["og:title", "twitter:title", "title"],
    meta,
    metaDefault
  );
  merged["og:description"] = getTag(
    [
      "og:description",
      "meta.description",
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
      "twitter:description",
      "meta.description",
      "og:description",
      "description",
    ],
    meta,
    metaDefault
  );
  merged["twitter:url"] = getTag(["twitter:url", "og:url"], meta, metaDefault);

  merged["description"] = getTag(
    [
      "description",
      "twitter:description",
      "meta.description",
      "og:description",
    ],
    meta,
    metaDefault
  );

  delete merged.title;

  const { original, metaJson } = separateMetaKeys(merged);
  merged = { ...metaJson, ...original };
  return (
    <Head>
      {links.map((el: any, index: number) => (
        <link
          key={`link_${index}`}
          rel={el.rel}
          type={el.type}
          sizes={el.sizes}
          href={el.href}
          color={el.color}
        />
      ))}
      {Object.keys(removeUndefinedOrNull(merged)).map(
        (key: any, index: number) => (
          <meta
            key={`meta_${index}`}
            property={key.indexOf("og:") === 0 ? key : undefined}
            name={key.indexOf("og:") === -1 ? key : undefined}
            content={merged[key]}
          />
        )
      )}
    </Head>
  );
};

export default Meta;
