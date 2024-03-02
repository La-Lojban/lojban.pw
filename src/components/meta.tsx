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

const Meta = ({ meta }: { meta?: { [key: string]: string | undefined } }) => {
  const merged: any = { ...metaDefault, ...meta };
  merged["og:description"] =
    merged["og:description"] ??
    merged["meta.description"] ??
    merged["twitter:description"] ??
    merged["description"];

    merged["og:title"] = merged["og:title"] ?? merged["title"];

    merged["twitter:description"] =
    merged["twitter:description"] ??
    merged["meta.description"] ??
    merged["description"];  

    merged["twitter:url"] =
    merged["twitter:url"] ??
    merged["og:url"];  
    
    merged["description"] =
    merged["description"] ??
    merged["meta.description"];

    delete merged.title;

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
      {Object.keys(removeUndefinedOrNull(merged)).map((key: any, index: number) => (
        <meta
          key={`meta_${index}`}
          property={key.indexOf("og:") === 0 ? key : undefined}
          name={key.indexOf("og:") === -1 ? key : undefined}
          content={merged[key]}
        />
      ))}
    </Head>
  );
};

export default Meta;
