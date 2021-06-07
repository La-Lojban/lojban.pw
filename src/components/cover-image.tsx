import cn from 'classnames'
import Link from 'next/link'

type Props = {
  title: string
  src: string
  slug?: string[]
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    src ? <img
      src={src}
      alt={`Cover Image for ${title}`}
    /> : <div />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/${slug}`} href="/pages/[...slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
