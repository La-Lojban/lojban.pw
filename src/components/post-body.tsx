// import markdownStyles from '../styles/markdown-styles.module.css'
import PostType from '../types/post'
import PostHeader from '../components/post-header'

type Props = {
  post: PostType
}

const PostBody = ({ post }: Props) => {

  return (
    <>
      <div className="mx-auto w-full md:w-3/5 bg-gray-100">
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
      />
        <div
          // className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
      </div>
    </>
  )
}

export default PostBody
