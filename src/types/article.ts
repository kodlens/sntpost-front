import type { User } from "./user"

export interface RelatedLink {
  id?: string
  title?: string
  featured_image?: string
  description?: string
  url?: string
}

export interface Post {
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  description?: string
  content: string
  status?: string
  author_id?: string|number
  category_id?: string|number
  author?: User
  author_name?: string
  featured_image?: string
  image_caption?: string
  publication_date_readable?: string
  publication_date: string
  category?: {
    title?: string
  }
  sections: any[]
  created_at?: string
  comments?: Comment[]
  is_archived?: boolean | number
  related_links?: {
    external?: RelatedLink[]
    internal?: RelatedLink[]
  }
  tags_translated: any[]
  logs: any[]
  by_line?: string
  sub_title?: string
  isFailure: boolean
  data: any[]
  total: number;
  year?:number;
}

export interface Article extends Post {
}

