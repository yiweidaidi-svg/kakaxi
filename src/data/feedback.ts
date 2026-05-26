import { FeedbackItem } from '@/types/feedback'

// Discord 社区反馈数据（来源：#community-help 社区求助频道）
// 每天手动录入或从 Discord 复制，isHot = 表情反应 > 5 或 评论 > 3
export const feedbackData: FeedbackItem[] = [
  {
    id: '1',
    title: 'The blue gem/rocks',
    titleZh: '蓝色宝石/岩石是什么？',
    content: 'what are blue gem/rock things you get from cleaning up after a pet?',
    contentZh: '清理宠物之后会得到蓝色宝石/岩石，请问这些是什么？能用来做什么？',
    author: 'Caveman Diaz',
    hoursAgo: 1,
    reactions: 3,
    replies: 3,
    category: 'question',   // 用户提问：游戏道具说明不清晰
    status: 'new',
    isHot: false,
  },
  {
    id: '2',
    title: 'What in the world just happened?',
    titleZh: '刚刚发生了什么？（奇怪的评论突然出现）',
    content: 'weird comment appeared during conversation with UGC',
    contentZh: '和 UGC（用户生成内容）对话时，突然出现了一条奇怪的评论，不确定这是不是应该发的地方',
    author: 'alien civilizations',
    hoursAgo: 2,
    reactions: 0,
    replies: 0,
    category: 'bug',        // 程序故障：对话中出现异常内容
    status: 'new',
    isHot: false,
  },
  {
    id: '3',
    title: 'Warehouse quest help',
    titleZh: '仓库任务求助',
    content: 'met character at bar, told looking for work, picking up package at warehouse',
    contentZh: '在酒吧遇到一个角色，说在找工作，对方让我去仓库取一个包裹——不知道下一步该怎么做',
    author: 'FlastoCash',
    hoursAgo: 3,
    reactions: 3,
    replies: 3,
    category: 'gameplay',   // 游戏玩法：任务流程不清晰，玩家卡关
    status: 'new',
    isHot: false,
  },
  {
    id: '4',
    title: 'Evolved',
    titleZh: '角色进化了，怎么查看变化？',
    content: 'received message saying character evolved, how to see what changed',
    contentZh: '收到提示说角色进化了，但不知道在哪里查看具体变化了什么',
    author: 'Honey',
    hoursAgo: 6,
    reactions: 4,
    replies: 4,
    category: 'gameplay',   // 游戏玩法：进化系统缺少可视化说明
    status: 'new',
    isHot: false,
  },
  {
    id: '5',
    title: 'Why can we no longer choose the base for custom outfits?',
    titleZh: '为什么自定义服装不能选底图了？',
    content: 'Exactly as said',
    contentZh: '之前可以选择服装底图（Base）来自定义造型，现在这个选项消失了——可能是某次版本更新误删了该功能',
    author: 'KamariBVB',
    hoursAgo: 7,
    reactions: 3,
    replies: 3,
    category: 'ux',         // 体验问题：功能被版本更新意外移除，需核查 Changelog
    status: 'in_review',    // 审核中
    isHot: false,
  },
  {
    id: '6',
    title: 'Messages',
    titleZh: '如何回复不在联系人里的人发来的消息？',
    content: "if someone sends message and not a contact, how to reply if don't show up in contacts without inviting to chat?",
    contentZh: '有人给我发消息，但这个人不在我的联系人列表里，我又不想邀请他进聊天——请问有没有办法直接回复？',
    author: 'Diva',
    hoursAgo: 7,
    reactions: 3,
    replies: 3,
    category: 'ux',         // 体验问题：社交功能的操作流程有盲点
    status: 'new',
    isHot: false,
  },
  {
    id: '7',
    title: 'Music creation',
    titleZh: '音乐创作功能一直报错',
    content: 'having issues trying to create music, keeps saying error retry, since last night',
    contentZh: '从昨晚开始，尝试创作音乐时一直提示"错误，请重试"，功能无法正常使用',
    author: 'Audrey D',
    hoursAgo: 8,
    reactions: 1,
    replies: 1,
    category: 'bug',        // 程序故障：音乐创作功能持续报错，影响创意类用户
    status: 'new',
    isHot: false,
  },
  {
    id: '8',
    title: 'Hi! Tons of newbie questions here.',
    titleZh: '新手大量问题集合',
    content: 'super excited about the game but finding it very overwhelming and confusing, have basic newbie questions',
    contentZh: '对游戏很兴奋，但发现一切都很让人困惑，有很多基础新手问题想问',
    author: 'Alice',
    hoursAgo: 10,
    reactions: 5,
    replies: 5,
    category: 'question',   // 用户提问：新手引导（Onboarding）体验存在明显缺口
    status: 'new',
    isHot: true,            // 热门：5个表情 + 5条评论
  },
  {
    id: '9',
    title: "A couple of questions (I'm a newbie hi)",
    titleZh: '新手问题：如何卖自定义服装？发型能换回来吗？',
    content: 'how do you sell custom outfits? need certain level? want different hairstyles but keep original?',
    contentZh: '自定义服装怎么出售？需要达到某个等级吗？想换发型但担心回不到原来的样子，换了之后还能换回来吗？',
    author: 'oCakes',
    hoursAgo: 10,
    reactions: 10,
    replies: 10,
    category: 'question',   // 用户提问：游戏机制说明不足，新手最常见困惑
    status: 'new',
    isHot: true,            // 热门：10个表情 + 10条评论，今日最高热度
  },
  {
    id: '10',
    title: 'Bazaar UGC',
    titleZh: '集市里哪些角色会发布内容？',
    content: 'which characters will post? scrolling trying to find specific ones never see them',
    contentZh: '想知道集市（Bazaar）里哪些角色会发布内容，一直在刷却找不到特定的角色',
    author: 'Hailey',
    hoursAgo: 10,
    reactions: 1,
    replies: 1,
    category: 'gameplay',   // 游戏玩法：集市功能的内容发布机制不透明
    status: 'new',
    isHot: false,
  },
]
