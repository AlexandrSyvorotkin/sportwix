type MetaItem = {
  content?: string
  name: string
  property: string
}

export interface INEWS {
  body_text: string
  body_text_ru: string
  header_date: string
  header_img: null | string
  header_text: string
  header_text_ru: string
  header_title: string
  header_title_ru: string
  meta_tags: {
    meta: MetaItem[]
    title: string
  }
  rating: number
  slug: string
  source: string
  source_link: string
  tags: []
  uuid: string
}
