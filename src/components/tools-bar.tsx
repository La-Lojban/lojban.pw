import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Items } from "../lib/api";
import { TPost } from "../types/post";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

// import { useRouter } from "next/router";

// import langJson from "../config/locales.json";
// const languages = langJson.languages;
// const langDict = Object.keys(languages).sort().reduce(
//   (acc: any, language: string) => ({
//     ...acc,
//     [(languages as any)[language].short]: (languages as any)[language].native,
//   }),
//   {}
// );

export default function ToolsBar({
  posts = [],
  post,
  siteSection,
}: {
  posts: Items[];
  post?: TPost;
  siteSection?: string;
}) {
  // const router = useRouter();
  const hasPdf = post && post.slug[1] === siteSection;
  // const handleLanguageChange = (event: any) => {
  //   const language = event.target.value;
  //   router.push(`/${language}`);
  // };

  return (
    <>
      {posts.length > 0 && (
        <div className="flex-row relative block max-w-sm h-10 mx-auto mb-2 flex justify-start print:hidden">
          {hasPdf && (
            <a
              key={`bangu-pdf`}
              href={`/vreji/uencu/${post.slug[0]}/${post.slug.slice(-1)[0]}.pdf`}
              className="hover:from-lime-200 hover:to-lime-200 ease bg-gradient-to-br from-lime-50 to-white-900 h-10 inline-block py-2 px-3 border border-t-0 border-lime-500 hover:border-lime-600 rounded-b-md shadow-md"
            >
              <FontAwesomeIcon className="w-6" icon={faFilePdf} />
            </a>
          )}
          {/* <div className="relative w-full lg:max-w-sm">
            <select
              className={`h-10 inline-block py-2 px-3 bg-white border border-t-0 border-gray-300 hover:border-gray-400${!hasPdf ? "" : " ml-3"} rounded-b-md shadow-md text-gray-500 outline-none appearance-none`}
              onChange={handleLanguageChange}
            >
              <option selected>
                {langDict[post?.slug[0] ?? router.asPath.split("/")[1] ?? "en"]}
              </option>
              {posts.map((post) => {
                return (
                  <option
                    key={`bangu-${post.language}`}
                    value={post.fullPath as string}
                  >
                    {langDict[post.language as any]}
                  </option>
                );
              })}
            </select>
          </div> */}
          {/* {posts.map((post, index) => {
            return (
              <a
                key={`bangu-${post.language}`}
                href={`/${post.fullPath}` as any}
                className={`h-10 inline-block py-2 px-3 bg-white border border-t-0 border-gray-300 hover:border-gray-400${!hasPdf && index === 0 ? "" : " ml-1"} rounded-b-md shadow-md`}
              >
                {post.language}
              </a>
            );
          })} */}
        </div>
      )}
    </>
  );
}
