import { FeedbackItem } from '@/types/feedback'
import CategoryBadge from './CategoryBadge'
import StatusBadge from './StatusBadge'

interface FeedbackCardProps {
  item: FeedbackItem
  highlight?: boolean  // highlight = true 时显示橙色高亮边框（热门帖子专用）
}

export default function FeedbackCard({ item, highlight = false }: FeedbackCardProps) {
  return (
    <div
      className={`rounded-xl p-4 border transition-colors ${
        highlight
          ? 'bg-[#1a1208] border-yellow-800 hover:border-yellow-700'
          : 'bg-[#111111] border-[#1f1f1f] hover:border-[#2d2d2d]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">

          {/* 标签行：热门标记 + 分类 + 处理状态 */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {item.isHot && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-orange-950 text-orange-400 border border-orange-800">
                🔥 热门
              </span>
            )}
            <CategoryBadge category={item.category} />
            <StatusBadge status={item.status} />
          </div>

          {/* 标题：英文原文 + 中文翻译 */}
          <h3 className="text-[#f0f0f0] font-medium text-sm leading-snug mt-1">{item.title}</h3>
          <p className="text-[#aaaaaa] text-xs mt-0.5 italic">{item.titleZh}</p>

          {/* 内容：中文翻译（方便理解） */}
          <p className="text-[#888888] text-xs mt-2 line-clamp-2">{item.contentZh}</p>

          {/* 发帖人 + 发帖时间 */}
          <p className="text-[#444444] text-xs mt-2">
            <span className="text-[#666666]">@{item.author}</span> · {item.hoursAgo}小时前
          </p>
        </div>

        {/* 右侧：表情反应数 + 评论数 */}
        <div className="flex flex-col items-end gap-2 shrink-0 text-right">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#888888]" title="表情反应数量">
              👍 {item.reactions}
            </span>
            <span className="text-xs text-[#888888]" title="评论回复数量">
              💬 {item.replies}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
