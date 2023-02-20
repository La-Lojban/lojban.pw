import { RefObject } from 'react'
import Author from './author'
import { GalleryImg } from './gallery-img'
import { TocElem } from './toc'

export type TPost = {
  slug: string[]
  hidden?: boolean
  "meta.title"?: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  toc?: TocElem[]
  imgs?: GalleryImg[]
}

export type PostProps<S> = {
	post: TPost;
  state?: S;
  setState?: React.Dispatch<React.SetStateAction<S>>;
};
