import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Items } from "../lib/api";
import { TPost } from "../types/post";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export default function LanguageBar({
  posts = [],
  post,
  siteSection,
}: {
  posts: Items[];
  post?: TPost;
  siteSection?: string;
}) {
  const hasPdf = post && post.slug[1] === siteSection;
  return (
    <>
      {posts.length > 0 && (
        <div className="relative block max-w-sm h-10 mx-auto mb-2 flex justify-around print:hidden">
          {hasPdf && (
            <a
              key={`bangu-pdf`}
              href={`/vreji/uencu/${post.slug[0]}/${post.slug.slice(-1)[0]}.pdf`}
              className="hover:from-lime-200 hover:to-lime-200 ease bg-gradient-to-br from-lime-50 to-white-900 h-10 inline-block py-2 px-3 border border-t-0 border-lime-500 hover:border-lime-600 rounded-b-md shadow-md"
            >
              <FontAwesomeIcon className="w-6" icon={faFilePdf} />
            </a>
          )}
          {posts.map((post, index) => {
            return (
              <a
                key={`bangu-${post.language}`}
                href={`/${post.fullPath}` as any}
                className={`h-10 inline-block py-2 px-3 bg-white border border-t-0 border-gray-300 hover:border-gray-400${!hasPdf && index === 0 ? "" : " ml-1"} rounded-b-md shadow-md`}
              >
                {post.language}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
