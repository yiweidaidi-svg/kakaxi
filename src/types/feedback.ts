// 反馈分类类型
// bug = 程序故障
// feature_request = 功能建议
// question = 用户提问
// gameplay = 游戏玩法相关
// ux = 界面/体验问题
export type FeedbackCategory = 'bug' | 'feature_request' | 'question' | 'gameplay' | 'ux'

// 处理状态类型
// new = 新建（未处理）
// in_review = 审核中
// task_created = 已创建任务
// resolved = 已解决
export type FeedbackStatus = 'new' | 'in_review' | 'task_created' | 'resolved'

// 每一条 Discord 反馈的数据结构
export interface FeedbackItem {
  id: string           // 编号
  title: string        // 帖子标题（Discord 原文）
  titleZh: string      // 帖子标题（中文翻译）
  content: string      // 帖子内容（Discord 原文）
  contentZh: string    // 帖子内容（中文翻译）
  author: string       // 发帖人用户名
  hoursAgo: number     // 几小时前发帖
  reactions: number    // 表情反应数量（热度指标）
  replies: number      // 评论回复数量（热度指标）
  category: FeedbackCategory  // 分类
  status: FeedbackStatus      // 处理状态
  isHot: boolean       // 是否热门（reactions > 5 或 replies > 3 时为 true）
}
