import { PostProps } from "../types/post";
import PostHeader from "../components/post-header";
import { buildDOMFromJSONBasic } from "../lib/json2react";
import AllStories from "./all-stories";

const PostBody = ({
  post,
  state,
  setState,
  hasToc,
  posts,
  lang,
  siteSection,
}: PostProps<any>) => {
  const content = buildDOMFromJSONBasic(post.content, { state, setState });
  return (
    <>
      <div
        className={`mb-6 mt-3 mx-auto w-full print:bg-white ${
          hasToc ? "md:w-3/5 " : ""
        }bg-gray-100`}
      >
        <PostHeader post={post} siteSection={siteSection} />
        {content}
        {posts && posts.length > 0 && <AllStories posts={posts} lang={lang} />}
        {/* <div dangerouslySetInnerHTML={{ __html: post?.content }} /> */}
      </div>
    </>
  );
};

export default PostBody;
