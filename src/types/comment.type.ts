export type CommentType = {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  action?: string,
  user: {
    id: string,
    name: string
  }
}
