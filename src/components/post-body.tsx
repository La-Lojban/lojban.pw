import { PostProps } from "../types/post";
import PostHeader from "../components/post-header";
import { buildDOMFromJSONBasic } from "../lib/json2react";

const PostBody = ({ post, state, setState }: PostProps<any>) => {
	const content = buildDOMFromJSONBasic(post.content, { state, setState });
	return (
		<>
			<div className="mb-6 mx-auto w-full bg-gray-100">
				<PostHeader
					title={post.title}
					coverImage={post.coverImage}
					date={post.date}
					author={post.author}
				/>
				{content}
				{/* <div dangerouslySetInnerHTML={{ __html: post?.content }} /> */}
			</div>
		</>
	);
};

export default PostBody;
