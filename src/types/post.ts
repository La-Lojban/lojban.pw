import { RefObject } from 'react'
import Author from './author'
import { GalleryImg } from './gallery-img'
import { TocElem } from './toc'

export type TPost = {
  slug: string[]
  parentSlug?: string
  firstSiblingSlug?: string
  directory?: string
  firstHeader?: string
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
  "og:image"?: string;
  "og:title"?: string;
  "og:type"?: string;
  "og:url"?: string;
  "og:description"?: string;
  content: string
  contentLength?: number
  toc?: TocElem[]
  imgs?: GalleryImg[]
  pdf?: boolean;
}

export type PostProps<S> = {
	post: TPost;
  posts?: TPost[];
  lang?: string;
  state?: S;
  setState?: React.Dispatch<React.SetStateAction<S>>;
  hasToc?: boolean;
  siteSection?: string;
};
