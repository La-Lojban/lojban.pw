import { RefObject } from 'react'
import Author from './author'
import { GalleryImg } from './gallery-img'
import { TocElem } from './toc'

export type TPost = {
  slug: string[]
  directory?: string
  hidden?: boolean
  "meta.title"?: string
  "meta.description"?: string
  "meta.keywords"?: string
  "meta.author"?: string
  "meta.type"?: string
  "meta.priority"?: number
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: string;
  content: string
  toc?: TocElem[]
  imgs?: GalleryImg[]
  pdf?: boolean;
}

export type PostProps<S> = {
	post: TPost;
  state?: S;
  setState?: React.Dispatch<React.SetStateAction<S>>;
  hasToc?: boolean;
};
