import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string[]
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div className="max-w-md py-4 px-8 align-middle	bg-white shadow-lg rounded-lg">
      {/* <div className="flex justify-center md:justify-end -mt-16">
        <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" />
      </div> */}
      <div>
        <h2 className="text-gray-800 text-2xl text-center">
          <Link as={`/${slug.join("/")}`} href="/[...slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </h2>
        <div className="mt-2 text-gray-600">
          {date && <div className="text-lg mb-4">
            <DateFormatter dateString={date} />
          </div>
          }
          {excerpt && <div className="text-lg leading-relaxed mb-4">{excerpt}</div>}
          {author && <Avatar name={author?.name} picture={author?.picture} />}
        </div>
      </div>
      {/* <div className="flex justify-end mt-4">
    <a href="#" className="text-xl font-medium text-indigo-500">John Doe</a>
  </div>
      <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div> */}
    </div>

  )
}

export default PostPreview
