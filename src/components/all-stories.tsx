import PostPreview from './post-preview'
import Post from '../types/post'

type Props = {
  posts: Post[]
}

const AllStories = ({ posts }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-16 lg:gap-x-20 gap-y-8 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug.join("~")}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}

export default AllStories
