export type FeedbackCategory = 'bug' | 'feature_request' | 'question' | 'gameplay' | 'ux'

export type FeedbackStatus = 'new' | 'in_review' | 'task_created' | 'resolved'

export interface FeedbackItem {
  id: string
  title: string
  content: string
  author: string
  hoursAgo: number
  reactions: number
  replies: number
  category: FeedbackCategory
  status: FeedbackStatus
  isHot: boolean // reactions > 5 OR replies > 3
}
