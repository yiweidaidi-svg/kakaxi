export type FeedbackCategory = 'bug' | 'feature_request' | 'question' | 'gameplay' | 'ux'

export interface Feedback {
  id: string
  title: string
  titleZh: string
  author: string
  content: string
  contentZh: string
  category: FeedbackCategory
  reactions: number
  replies: number
  hoursAgo: number
  isHot: boolean
  createdAt: number
}
