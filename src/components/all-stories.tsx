import PostPreview from "./post-preview";
import { TPost } from "../types/post";

type Props = {
  posts: TPost[];
};

const AllStories = ({ posts }: Props) => {
  const groupedPosts = posts
    .reduce(
      function (acc, post) {
        const directory =
          post.slug.slice(0, post.slug.length - 1).join("/") ?? "";
        acc[directory] = acc[directory] ?? [];
        acc[directory].push(post);
        return acc;
      },
      {} as { [key: string]: TPost[] }
    )
    ;

  if (Object.keys(groupedPosts).length === 1) {
    return Object.keys(groupedPosts).map((key, index) => (
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-16 lg:gap-x-20 gap-y-8">
        {groupedPosts[key].sort().map((post) => (
          <PostPreview key={post.slug.join("~")} post={post} />
        ))}
      </div>
    ))[0];
  }
  return (
    <div className="listing">
      {Object.keys(groupedPosts).sort().map((key, index) => (
        <div
          key={`section_${index}`}
          className="mb-3 w-full border border-gray-200 rounded-lg shadow"
        >
          <div
            className="bg-white flex flex-wrap text-lg font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50"
            role="tablist"
          >
            <div
              id={`${key}`}
              className="select-none mx-3 my-1 capitalize inline-block text-gray-500 border-gray-100 hover:border-gray-300"
            >
              <span>{key}</span>
              <a className="print:hidden" aria-hidden="true" href={`#${key}`}>
                <span className="in-heading hash">#</span>
              </a>
            </div>
          </div>
          <div>
            <div
              className="px-4 pt-2 pb-4 md:pt-4 md:pb-8"
              role="tabpanel"
              aria-labelledby="about-tab"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8 gap-y-4">
                {groupedPosts[key].sort().map((post) => (
                  <PostPreview key={post.slug.join("~")} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStories;
