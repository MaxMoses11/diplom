export type ArticlesWithPagesResponseType = {
  count: number,
  pages: number,
  items: {
    text?: string,
    comments?: any,
    commentsCount?: number,
    id: string,
    title: string,
    description: string,
    image: string,
    date: string,
    category: string,
    url: string
  }[]
}
