import { PostProps } from "../types/post";
import PostHeader from "../components/post-header";
import { buildDOMFromJSONBasic } from "../lib/json2react";

const PostBody = ({ post, state, setState, hasToc }: PostProps<any>) => {
  const content = buildDOMFromJSONBasic(post.content, { state, setState });
  return (
    <>
      <div
        className={`mb-6 mx-auto w-full print:bg-white ${
          hasToc ? "md:w-3/5 " : ""
        }bg-gray-100`}
      >
        <PostHeader post={post} />
        {content}
        {/* <div dangerouslySetInnerHTML={{ __html: post?.content }} /> */}
      </div>
    </>
  );
};

export default PostBody;
